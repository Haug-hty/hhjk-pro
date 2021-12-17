<template>
  <div class="login-content">
    <div class="login-logo">
      <div class="child">
        <img src="@/assets/logo_1024x1024.png" alt="" width="100px" height="100px">
      </div>
      
    </div>
    <div class="login-title">
      <van-cell class="title-name">
        <span>用户登录</span>
      </van-cell>
      <van-cell-group>
        <van-field
          left-icon="user-o"
          class="login-username"
          v-model="username"
          placeholder="请输入用户名"
          @change="changeBut()"
        />
        <van-field
          left-icon="passed"
          class="login-password"
          v-model="password"
          type="password"
          placeholder="请输入密码"
          @change="changeBut()"
        />
      </van-cell-group>
    </div>
    <div style="text-align:center;">
      <van-button :class="this.logoButton?'login-button-true':'login-button'" @click="login">登录</van-button>
    </div>
    <div class="login-footer">
      <div>
        <van-checkbox icon-size="20px" v-model="checkValue">同意《用户服务协议》</van-checkbox>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";
import Cookies from "js-cookie";
import { loginIn } from "@/api/login.js";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  data() {
    return {
      num: 0,
      username: "",
      password: "",
      checkValue: false,
      logoButton: false,
      openid:"",
      clientType:"",
      status:"",
    };
  },
  created() {
    // 移动端使用时开启，app打包时关闭
    this.getCookie();
    this.changeBut();
    this.getUrlInfo();
  },
  methods: {
    /** 获取cookie信息 */
    getCookie() {
      console.log(Cookies);
      const usernameCoo = Cookies.get("username");
      const passwordCoo = Cookies.get("password");
      const rememberMeCoo = Cookies.get("rememberMe");
      this.username === undefined ? this.username : usernameCoo,
      this.password === undefined ? this.password : passwordCoo,
      this.rememberMe === undefined ? false : Boolean(rememberMeCoo)
      
    },
    /**  改变登录按钮的样式 */
    changeBut(){
      if(this.username && this.password){
        this.logoButton = true
      } else {
        this.logoButton = false
      }
      
    },
    /** 用户登录 */
    login() {
      if(!this.checkValue){
       return this.$toast('查看并同意《用户服务协议》就可以继续登录');
      }
      let params = {
        password: this.password,
        username: this.username.trim(),
        openid: this.openid,
        clientType: this.clientType,
        status: this.status,
      };
      loginIn(params)
        .then(res => {
          if (res.data.code !== 0) {
            this.loading = false;
          } else {
            setToken(res.data.data["PRIVATE-TOKEN"]);
            this.$router.push({ path: this.redirect || "/scheme" });
          }
        })
        .catch(() => {
          this.loading = false;
          // this.getCode();
        });
    },
    getUrlInfo(){
      console.log(this.$route)
      if(this.$route.query.status=="binded"){
        setToken(this.$route.query["PRIVATE-TOKEN"]);
        this.$router.push({ path: "/scheme" });
      } else {
        this.openid = this.$route.query.openid
        this.status = this.$route.query.status
        this.clientType = this.$route.query.clientType
      }
    }
  },
  components: {},
  computed: {
    ...mapGetters(["number"]),
    ...mapState({
      number: state => state.home.number
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.login-content {
  .mb(98);
}

.login-logo {
  position:relative;
  height: 25%;
  width: 100%;
  .child{
    position:absolute;
    width:25%;
    height:50%;
    left:50%;
    top:50%;
    margin-left:-10%;
    margin-top:-10%;
    }
}

.login-title {
  // margin-top: 4.33rem;
  // margin-left: 0rem;
  // width: 9.995rem;
  width: 100%;
  height: 5.117rem;
  text-align: center;
  .title-name {
    margin-left: 1.266rem;
    width: 7.463rem;
    height: 1.279rem;
    padding: 0.276rem;
    border: 0;
    span {
      color: rgba(30, 34, 45, 1);
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 0.533rem;
    }
  }
  .login-username {
    margin-top: 0.853rem;
    margin-bottom: 0.426rem;
    margin-left: 1.266rem;
    padding: 0.346rem;
    width: 7.463rem;
    height: 1.279rem;
    border-radius: 0.746rem;
    background: rgba(0, 0, 0, 0.04);
    color: rgba(193, 199, 206, 1);
    font-family: PingFang SC;
    font-size: 0.426rem;
  }
  .login-password {
    margin-left: 1.266rem;
    width: 7.463rem;
    height: 1.279rem;
    padding: 0.346rem;
    border-radius: 0.746rem;
    background: rgba(0, 0, 0, 0.04);
    color: rgba(193, 199, 206, 1);
    font-family: PingFang SC;
    font-size: 0.426rem;
  }
}

/deep/ .van-cell::after {
  border: 0;
}

/deep/ [class*="van-hairline"]::after {
  border: 0;
}

.login-button {
  margin-top: 0.853rem;
  width: 7.463rem;
  height: 1.279rem;
  opacity: 0.5;
  border-radius: 2.665rem;
  background: rgba(0, 87, 255, 0.5);
  box-shadow: 0rem 0.177rem 0.142rem rgba(0, 87, 255, 0.14),
    0rem 0.334rem 0.267rem rgba(0, 87, 255, 0.18);
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 0.453rem;
  pointer-events: none;
}

.login-button-true {
  margin-top: 0.853rem;
  width: 7.463rem;
  height: 1.279rem;
  border-radius: 2.665rem;
  background: rgba(44, 104, 255, 1);
  box-shadow: 0px 6.7px 5.3px rgba(0, 87, 255, 0.14), 0px 12.5px 10px rgba(0, 87, 255, 0.18);
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 0.453rem;
  

}

.login-footer {
  width: 100%;
  position: fixed;
  bottom: 20%;
  margin-top: 3.68rem;
  text-align: center;
  color: rgba(132, 141, 150, 1);
  font-family: PingFang SC;
  font-size: 0.373rem;
  div {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
