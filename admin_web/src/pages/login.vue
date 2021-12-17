<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">河湖健康管理评估平台</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <!-- <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
          @keyup.enter.native="handleLogin">
          <!-- <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" /> -->
        </el-input>
      </el-form-item>
       <!-- 验证码 -->
      <!-- <el-form-item prop="vertify_code">
          <el-input v-model="loginForm.vertify_code" placeholder="验证码" prefix-icon="el-icon-key">
          <template slot="append">
              <div class="login-code" @click="refreshCode" title="看不清？点击切换">
                  <vertify-code :identifyCode="identifyCode"></vertify-code>
              </div>
          </template>
          </el-input>
      </el-form-item> -->
      <!-- <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" />
          </div>
        </el-form-item> -->
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 上海协济科技有限公司</span>
    </div>
  </div>
</template>

<script>
  import { login } from "@/api/login/login";
  import Cookies from "js-cookie";
  import { getToken, setToken, removeToken } from '@/utils/auth'
  // import { encrypt, decrypt } from '@/utils/jsencrypt'
  
  // import VertifyCode from '../components/VertifyCode'

  export default {
    name: "Login",
    data() {
      return {
        codeUrl: "",
        cookiePassword: "",
        // 验证码组件
        // identifyCodes: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
        // identifyCode: '',
        loginForm: {
          username: "admin",
          password: "admin123",
          rememberMe: false,
          // vertify_code: "",
          // uuid: ""
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", message: "用户名不能为空" }
          ],
          password: [
            { required: true, trigger: "blur", message: "密码不能为空" }
          ],
          // code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
          // 验证码输入是否正确
          // vertify_code: [
          //   {
          //     required: true,
          //     message: '请输入验证码',
          //     trigger: 'blur'
          //   },
          //   { required: true, validator: this.validateCode, change: 'blur' }]
        },
        loading: false,
        redirect: undefined
      };
    },
    // components: { VertifyCode }, // 注册组件
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      // this.getCode();
      this.getCookie();
    },
    methods: {
      // getCode() {
      //   getCodeImg().then(res => {
      //     this.codeUrl = "data:image/gif;base64," + res.img;
      //     this.loginForm.uuid = res.uuid;
      //   });
      // },
      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const rememberMe = Cookies.get('rememberMe')
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password: password === undefined ? this.loginForm.password : password,
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        };
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.loginForm.rememberMe) {
              Cookies.set("username", this.loginForm.username, { expires: 30 });
              Cookies.set("password", this.loginForm.password, { expires: 30 });
              Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove('rememberMe');
            }
            let params = {
              username: this.loginForm.username.trim(),
              password: this.loginForm.password
            }
            login(params)
              .then((res) => {
                console.log(res)
                if (res.data.code !== 0) {
                  this.loading = false;
                } else {
                  setToken(res.data.data["PRIVATE-TOKEN"])
                  console.log(getToken())
                  this.$router.push({ path: this.redirect || "/index" });
                }

              })
              .catch(() => {
                this.loading = false;
                // this.getCode();
              });
          }
        });
      },

      // // 验证码
      // randomNum (min, max) {
      //   return Math.floor(Math.random() * (max - min) + min)
      // },
      // // 生成随机验证码
      // makeCode (o, l) {
      //   for (let i = 0; i < l; i++) {
      //     this.identifyCode += this.identifyCodes[
      //       this.randomNum(0, this.identifyCodes.length)
      //       ]
      //   }
      //   // console.log('identifyCode: ' + this.identifyCode)
      // },
      // // 验证码刷新
      // refreshCode () {
      //   this.identifyCode = ''
      //   this.makeCode(this.identifyCodes, 4)
      // },
      // // 验证码输入校验
      // validateCode (rule, value, callback) {
      //   if (value !== this.identifyCode) {
      //     callback(new Error('验证码验证错误！请输入正确的验证码！'))
      //   } else {
      //     callback()
      //   }
      // }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../assets/login-background.jpg");
    background-size: cover;
  }

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 300px;
    padding: 25px 25px 5px 25px;

    .el-input {
      height: 38px;

      input {
        height: 38px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }

  .login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .login-code {
    cursor: pointer;
    margin: 0;
  }
</style>