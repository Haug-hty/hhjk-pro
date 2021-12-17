<template>
  <div class="header-box">
    <!-- <van-nav-bar
      :title="tittle"
      :left-arrow="showback"
      @click-left="back"
    /> -->
    <div>
      <van-search class="header-search-field" v-model="schemeName" placeholder="请输入项目名称" @focus="searchTest()" @search="onSearch"/>
      <van-icon v-if="!showmore" style="float:right;margin-top:-40px;margin-right:10px;" size="30px" name="filter-o" @click="onSearch" />
      <van-icon v-if="showmore" style="float:right;margin-top:-40px;margin-right:10px;" color="rgba(44, 104, 255, 1)" size="30px" name="filter-o" @click="onSearch" />
    </div>
      <div v-if="showmore">
        <div class="target-card">
                <p class="simpling-pic-schemename">
                    <span class="flag-title">丨</span>
                    河湖类型
                </p>
                <div class="rlType-div">
                  <van-row type="flex" justify="space-around">
                    <van-col span="6"><van-button :class="this.rlType==1?'rltype-button-choosen':'rltype-button'" round size="large" @click="changeRltype(1)">河流</van-button></van-col>
                    <van-col span="6"><van-button :class="this.rlType==2?'rltype-button-choosen':'rltype-button'" round size="large" @click="changeRltype(2)">湖泊</van-button></van-col>
                    <van-col span="6"><van-button :class="this.rlType==3?'rltype-button-choosen':'rltype-button'" round size="large" @click="changeRltype(3)">水库</van-button></van-col>
                  </van-row>

                </div>
                <div class="footer-div">
                  <van-row type="flex" justify="space-around">
                    <van-col span="9"><van-button  round size="large" type="default" @click="cancel()">取消</van-button></van-col>
                    <van-col span="9"><van-button  round size="large" type="info" @click="submit()">确认</van-button></van-col>
                  </van-row>

                </div>
                
                
            </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schemeName:undefined,
      rlType:undefined,
      showmore:false,
    };
  },
  props: {
    showinput: {
      type: Boolean,
      default: false
    },
    tittle: {
      type: String,
      default: "标题"
    },
    showback: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    back() {
      this.$router.goBack();
    },
    onSearch(){
      this.showmore = !this.showmore
    },
    changeRltype(info){
      this.rlType = parseInt(info)      
    },
    cancel(){
      this.schemeName =""
      this.rlType = undefined
      this.$emit('searchValue', this.schemeName,this.rlType)
      this.showmore = false
    },
    submit(){

      this.$emit('searchValue', this.schemeName,this.rlType)
      this.showmore = false
    },
    searchTest(){
      this.showmore = true
    },
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.header-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  .header-search-field {
        margin: 5% 0 0 0;
        margin-left: 5%;
        padding: 1%;
        width: 80%;
        height: 10%;
        border-radius: 0.746rem;
        background: rgba(0, 0, 0, 0.035);
        color: rgba(193, 199, 206, 1);
        font-family: PingFang SC;
        font-size: 0.426rem;
      }
  
  }
  


/deep/ [class*="van-hairline"]::after {
  border: 0;
}

.target-card {
        width: auto;
        padding: 5% 0 0 0;
        // padding-bottom: 10%;
        margin-bottom: 5%;
        background: rgba(255, 255, 255, 1);
        p{
            margin-top: 0;
        }
        
        .simpling-pic-schemename {
            color: rgba(30, 34, 45, 1);
            font-weight: 500;
            font-size: 0.453rem;
            padding: 0 5% ;
            .flag-title {
                width: 1px;
                height: 20px;
                color: rgba(44, 104, 255, 1);
            }
        }

        .rlType-div {
          margin: 8% 0 0 0;
          .rltype-button {
            background: rgba(242, 242, 242, 1);;
            border: none;
            color: rgba(30, 34, 45, 1);
            font-family: PingFang SC;
            font-size: 13px;
            line-height: 13px;
          }

          .rltype-button-choosen {
            background: rgba(44, 104, 255, 1);
            border: none;
            color: rgba(255, 255, 255, 1);
            font-family: PingFang SC;
            font-size: 13px;
            line-height: 13px;
          }
        }
        
        .footer-div{
          margin: 10% 0 2% 0;
        }

        
    }
</style>
