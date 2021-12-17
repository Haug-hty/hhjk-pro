<template>
<div>
  <div >
    <common-header :tittle="tittle" :showback="false" :showinput="true" v-on:searchValue="searchValue"></common-header>
    <!-- <div ></div> -->
  </div>  
  <div class="content-page">
    <div class="scheme-card" v-for="item in workSchemeList" v-bind:key="item.id">
      <van-row @click="schemePic(item)" >
          <van-col span="3">
          <div>
            <img src="../../assets/icon/river_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==1">
            <img src="../../assets/icon/lake_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==2">
            <img src="../../assets/icon/reservoir_icon_index.png" alt="" class="scheme-card-icon" v-if="item.rlType==3">
          </div>          
        </van-col>
        <van-col span="18">
          <div class="title-div">
             <!-- {{item.name + '--' + item.rlInfoVo.name}}  -->
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
      <van-row style="margin:5% auto 0;">
        <van-col span="8">
          <p class="pic-num-title"><van-icon name="edit" />
          采样</p>
          <p @click="simplingIn(item)"><span class="pic-num-style">{{item.caiYangPicNum}}</span>张</p>
        </van-col>
        <van-col span="8">
          <p class="pic-num-title"><van-icon name="desktop-o" />计算</p>
          <p @click="calculationIn(item)"><span class="pic-num-style">{{item.jiSuanPicNum}}</span>张</p>
        </van-col>
        <van-col span="8">
          <p class="pic-num-title"><van-icon name="apps-o" />其他</p>
          <p @click="otherIn(item)"><span class="pic-num-style">{{item.otherPicNum}}</span>张</p>
        </van-col>
      </van-row>
    </div>
    
  </div>
  <van-pagination class="footer-pagination" v-model="currentPage" :page-count="pages" mode="simple" @change="handlePageChange" />
</div>
  
</template>

<script>
import commonHeader from "common/common-header";
import { schemeListPic } from "@/api/scheme.js";

export default {
  data() {
    return {
      tittle: "照片上传",
      num: 0,
      workSchemeList: [],
      picUp:false,
      dialogForm:{},
      currentPage:1,
      pages:1,
      pageSize: 10,
      name:"",
      rlType:undefined,
    };
  },
  created() {
    this.getSchemeList();
  },
  methods: {
    /** 条件查询内容 */
    searchValue(value,value2) {
        // childValue就是子组件传过来的值
          this.name = value,
          this.rlType = value2
          this.getSchemeList()
      },
    /** 列表查询，包括照片类型的数量 */
    getSchemeList() {
      let params = {
          name: this.name,
          rlType: this.rlType,
          pageSize: this.pageSize,
          pageNum: this.currentPage
      };
      schemeListPic(params).then(res => {
        this.workSchemeList = res.data.data.list;
        this.pages = res.data.data.pages
      });
    },
    /** 分页 */
      handlePageChange(val){
        this.currentPage =val
        this.getSchemeList()
      },
    /** 跳转具体照片页面 */
    schemePic(info) {
      this.$router.push({
        name:"tabList",
        query:{
          id:info.id,
          activeName:"sampling"
        }
      })
    },
    /** 采样入口跳转 */
    simplingIn(info){
      this.$router.push({
        name:"tabList",
        query:{
          id:info.id,
          activeName:"sampling"
        }
      })
    },
    /** 计算入口跳转 */
    calculationIn(info){
      this.$router.push({
        name:"tabList",
        query:{
          id:info.id,
          activeName:"calculation"
        }
      })
    },
    /** 其他入口跳转 */
    otherIn(info){
      this.$router.push({
        name:"tabList",
        query:{
          id:info.id,
          activeName:"other"
        }
      })
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
  margin-top: 20%;
  height: 76vh;
  overflow-y: auto;
  text-align: center;
  .scheme-card {
    // height: 3rem;
    margin: 1% auto 8%;
    // margin-top:0.427rem;
    padding-bottom: 10%;
    border-radius: 8px; 
    background-color: #ffffff;
    // text-align: center;
    // vertical-align: middle;
    .scheme-card-icon {
      margin: 20% 20%;
    }
    .title-div {
      height: 50px;
      line-height: 50px;
      text-align: left;
      padding: 0 2%;
      font-size: 16px;
      font-weight: 500;
      color: rgba(30,34,45,1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .detile-div {
      height: 50px;
      line-height: 50px;
      color: rgba(132, 141, 150, 1);
      text-align: center;
      /* vertical-align: middle; */
      /* height: 100px; */
      /* margin: 30% 0% 0%; */
      // margin-top: 30%;
      margin-left: -50%; 
    }
    .title-divider{
      border: 0.027rem solid;
      color: rgba(0, 0, 0, 0.04);
      width: 80%;
      margin-top: 0;
      
    }
    .pic-num-title {
      // width: 0.5rem;
      height: 0.533rem;
      color: rgba(132, 141, 150, 1);
      font-weight: 500;
      font-size: 0.373rem;
    }
    .pic-num-style {
      width: 0.56rem;
      height: 0.747rem;
      // background: rgba(44, 104, 255, 1);
      text-align: right;
      color: rgba(44, 104, 255, 1);
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 0.533rem;
      margin-right: 5%; 
    }
  }
}
.footer-pagination{
  position: fixed;
  .bottom(98);
  width: 100%
}
</style>
