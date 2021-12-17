<template>
  <div class="main-page-body">
    <div class="header-body">
      <div class="user-div">
        <p class="user-name">{{user.realName}}</p>
        <p class="user-tel">{{user.tel}}</p>
      </div>
    </div>
    <div class="content-page">    
          <div v-for="item in orgList" v-bind:key="item.id">
            <div class="scheme-card" v-if="!item.choosen" @click="changeOrg(item)">
              <van-row >
                <van-col span="18">
                  <div class="title-div">
                    <span>{{item.org.name}}</span>
                    
                  </div>
                </van-col> 
                <van-col span="6">
                  <div class="detile-div">
                    剩余方案:<span class="detile-div-num">{{item.inProcessNum}}</span>
                  </div>          
                </van-col>
              </van-row>
              <van-row>
                <van-col span="20">
                  <div class="speed-progress-title">
                    <div style="width:30%;float:left;"><span>完成度</span></div>                 
                    <div style="width:50%;float:left;margin:4% 0;"><van-progress color="rgba(44, 104, 255, 1)" :percentage="item.perScore"  stroke-width="8" /></div>
                  </div>
                </van-col>
                  
              </van-row>

            </div>
            <div class="scheme-card" v-if="item.choosen" @click="changeOrg(item)">
              <van-row >
                <van-col span="18">
                  <div class="title-div" >
                    <span>{{item.org.name}}</span>
                    
                  </div>
                </van-col> 
                <van-col span="6">
                  <div class="detile-div">
                    剩余方案:<span class="detile-div-num">{{item.inProcessNum}}</span>
                  </div>          
                </van-col>
              </van-row>
              <van-row>
                <van-col span="20">
                  <div class="speed-progress-title">
                    <div style="width:30%;float:left;"><span>完成度</span></div>                 
                    <div style="width:50%;float:left;margin:4% 0;"><van-progress  color="rgba(44, 104, 255, 1)" :percentage="item.perScore"  stroke-width="8" /></div>
                    <div ></div>
                  </div>
                </van-col>
                <van-col span="4">
                  <van-icon size="40" color="#00DB00" name="passed" />
                </van-col>
                  
              </van-row>

            </div>
            
              
            
          </div>
          
    </div>
    <div style="text-align: center;"><van-button class="footer-button" @click="loginOutUser">注销登录</van-button></div>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import { getUserProfile, loginOut, getOrgList, changeOrg} from "@/api/scheme.js";
import { Dialog } from "vant"
export default {
  data () {
    return {
      num: 0,
      user: {},
      roleGroup: {},
      postGroup: {},
      orgList:[],
      nowOrg:0,
    }
  },
  created() {
    this.getUser()
    
  },
  mounted(){
    
  },
  methods: {
    /** 获取当前用户信息 */
    getUser() {
      getUserProfile().then(response => {
        console.log(response);
        this.nowOrg = response.data.data.orgId
        this.user = response.data.data;
        
        this.getUserOrg()
      });
    },
    /** 获取当前用户机构信息 */
    getUserOrg() {
      getOrgList().then(response => {
        response.data.data.forEach(item=>{
            item.perScore = Math.round(item.completeNum / (item.inProcessNum + item.completeNum)* 10000) / 100 ;
            if(item.orgId === this.nowOrg){
              item.choosen =true
            } else {
              item.choosen = false
            }
          
        })
        this.orgList = response.data.data;
      });
    },
    /** 切换组织机构 */
    changeOrg(info){
      Dialog.confirm({
          title: '确认操作',
          message: '是否更换组织机构',
        })
          .then(() => {
            // on confirm
            changeOrg(info.orgId).then((res) => {
              this.getUser()
              location.reload()
          })
          })
          .catch(() => {
            // on cancel
          });
    },
    /** 退出登录 */
    loginOutUser(){
      Dialog.confirm({
          title: '提示',
          message: '确定注销并退出系统吗？',
        })
          .then(() => {
            // on confirm
            loginOut().then(() => {
              this.$router.push({ path: "/login" });
              // location.reload()
          })
          })
          .catch(() => {
            // on cancel
          });
    }
    
  },
  components: {
    commonHeader
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-page-body{
  width: 100%;
  height: 100vh;
  .header-body {
    // position: absolute;
    width: 100%;
    height: 30%;
    background: rgba(44, 104, 255, 1);
    text-align: center;
    margin-top: -5%;
    .user-div {
      position: relative;
      top:25%;
      transform:translateY(-50%);
      transform:translateX(-20%);
      .user-name {
        color: rgba(255, 255, 255, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 20px;
      }
      .user-tel {
        opacity: 0.7;
        color: rgba(255, 255, 255, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 14px;
      }
    }
  };
  .content-page {
    margin-top: -20%;
    padding: 5%;
    height: 70vh;
    overflow-y: auto;
    text-align: center;
    .scheme-card {
      margin: 0 auto 5%;
      padding: 2% 0 5%;
      border-radius: 8px; 
      background-color: #ffffff;      
    }
    .title-div {
        width: 80%;
        height: 50px;
        line-height: 50px;
        padding: 0 5%;
        text-align: left;
        color: rgba(30, 34, 45, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 20px;
        overflow: hidden;
        // background: #eee
      }
      .detile-div {
        color: rgba(132, 141, 150, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 15px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin-left: -50%; 
        .detile-div-num {
          margin-left: 5%;
          color: rgba(44, 104, 255, 1);
          font-family: PingFang SC;
          font-weight: 500;
          font-size: 15px;
        }
      }
      .speed-progress-title{
        height: 30px;
        line-height: 30px;
        color: rgba(132, 141, 150, 1);
        font-family: PingFang SC;
        font-weight: 500;
        font-size: 17px;
        margin: 0 5%;
      }
  }
  .footer-button {
      position: absolute;
      bottom: 8vh;
      width: 60%;
      height: 40px;
      border-radius: 63px;
      background: rgba(44, 104, 255, 1);
      margin-left: -30%;
      padding: 8% 0;
      color: rgba(255, 255, 255, 1);
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 0.453rem;    
  }
}

</style>
