<template>
<div>
  <div >
    <common-header :tittle="tittle" :showback="false" :showinput="true" v-on:searchValue="searchValue"></common-header>
  </div>  
  
  <van-tabs style="margin-top:20%;" v-model="activeName" color="rgb(44, 104, 255)" title-active-color="rgba(44, 104, 255, 1)">
      <van-tab title="录入中" name="sampling" >
        <div class="content-page">    
          <div class="scheme-card" v-for="item in workSchemeList" v-bind:key="item.id">
            <van-row @click="evaluationForm(item)" >
                <van-col span="3">
                <div style="height:55px">
                  <img src="../../assets/icon/river_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==1">
                  <img src="../../assets/icon/lake_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==2">
                  <img src="../../assets/icon/reservoir_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==3">
                </div>          
              </van-col>
              <van-col span="18">
                <div class="title-div">
                  {{item.name}}
                </div>
              </van-col>
              <van-col span="3">
                <div class="detile-div">
                  详情
                  <van-icon name="arrow"></van-icon>
                </div>          
              </van-col>
              
            </van-row>
            <hr class="title-divider">
            <van-row>
              <van-col span="10">
                <div class="speed-progress-title">
                  <span>完成指标</span>
                </div>
              </van-col>
              <van-col span="10">
                <div style="margin-top:4%"><van-progress pivot-text="" color="rgba(44, 104, 255, 1)" :percentage="item.per"  stroke-width="8" /></div>
                
              </van-col>
              <van-col span="4">
                <div style="margin-top:4%"><span>{{item.inputNum}}/{{item.totalNum}}</span></div>
                
              </van-col>
            </van-row>
          </div>
          
        </div>
            
      </van-tab>
      <van-tab title="已完成" name="calculation">
        <div class="content-page">    
          <div class="scheme-card card-complete" v-for="item in completeSchemeList" v-bind:key="item.id">
            <van-row @click="evaluationForm(item)" >
                <van-col span="3">
                <div>
                  <img src="../../assets/icon/river_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==1">
                  <img src="../../assets/icon/lake_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==2">
                  <img src="../../assets/icon/reservoir_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==3">
                </div>          
              </van-col>
              <van-col span="18">
                <div class="title-div">
                  <span>{{item.name}}</span>
                  
                </div>
              </van-col>
              <van-col span="3">
                <div class="detile-div">
                  详情
                  <van-icon name="arrow"></van-icon>
                </div>          
              </van-col>
              
            </van-row>
          </div>
        </div>
      </van-tab>
      
    </van-tabs>
    <van-pagination class="footer-pagination"  v-model="currentPage" :page-count="pages" mode="simple" @change="handlePageChange" />
    
  

</div>
  
</template>

<script>
import commonHeader from "common/common-header";
import { schemeList } from "@/api/scheme.js";

export default {
  data() {
    return {
      tittle: "评估",
      num: 0,
      workSchemeList: [],
      completeSchemeList:[],
      picUp:false,
      dialogForm:{},
      activeName:"sampling",
      currentPage:1,
      pages:1,
      pageSize:10,
      name:"",
      rlType:undefined,
    };
  },
  created() {
    this.getSchemeList();
    
  },
  methods: {    
    /** 列表查询，包括照片类型的数量 */
    getSchemeList() {
      let params = {
        pageSize: 10,
        pageNum: this.currentPage,
        name : this.name,
        rlType : this.rlType,
      };
      schemeList(params).then(res => {
        console.log(res);
        this.completeSchemeList = []
          this.workSchemeList = []
        res.data.data.list.forEach(item=>{          
          if(item.processState==3){
            this.completeSchemeList.push(item)
          }else {
            item.per = Math.round(item.inputNum / item.totalNum * 10000) / 100 ;
            this.workSchemeList.push(item)
          }
        })
        this.pages = res.data.data.pages
        
      });
    },
    /** 跳转评估页面 */
    evaluationForm(info) {
      this.$router.push({
        name:"assessment",
        query:{
          schemeId:info.id,
          status:info.processState
        }
      })
    },
    /** 条件查询内容 */
    searchValue(value,value2) {
      // childValue就是子组件传过来的值
        this.name= value,
        this.rlType = value2,
        this.getSchemeList()
    },

    /** 分页 */
    handlePageChange(val){
      this.currentPage =val
      this.getSchemeList()
    },
  },
  components: {
    commonHeader
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

.content-page {
  padding: 5%;
  height: 70vh;
  overflow-y: auto;
  text-align: center;
  .scheme-card {
    margin: 0 auto 8%;
    padding-bottom: 5%;
    border-radius: 8px; 
    background-color: #ffffff;
    .scheme-card-icon {
      margin: 20% 20%;
    }
    .title-div {
      width: 80%;
      height: 50px;
      line-height: 50px;
      padding: 0 2%;
      text-align: left;
      vertical-align: middle;
      font-size: 0.453rem;
      font-weight: 500;
      color: rgba(30,34,45,1);
      overflow: hidden;
    }
    .detile-div {
      color: rgba(132, 141, 150, 1);
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin-left: -50%; 
    }
    .title-divider{
      border: 0.027rem solid;
      color: rgba(0, 0, 0, 0.04);
      width: 90%;
      margin-top: 0;      
    }
    .speed-progress-title {
      color: rgba(132, 141, 150, 1);
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 0.453rem;
    }
    .speed-progress-icon {
      padding: 10px
    }
    .speed-progress-number{
      height:20px;
      line-height: 20px;
    }
  }
  .card-complete {
    padding-bottom: 0;
  }
}
.footer-pagination{
  position: fixed;
  .bottom(98);
  width: 100%
}
</style>
