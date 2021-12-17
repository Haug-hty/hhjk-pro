<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <!-- <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model="user.oldPassword" placeholder="请输入旧密码" type="password" />
    </el-form-item> -->
    <el-form-item label="新密码" prop="pwd">
      <el-input v-model="user.pwd" placeholder="请输入新密码" type="password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" placeholder="请确认密码" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <!-- <el-button type="danger" size="mini" @click="close">关闭</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/index";
import { loginOut } from "@/api/login/login"

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.pwd !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      test: "1test",
      // user: {
      //   pwd: undefined,
      //   confirmPassword: undefined
      // },
      // 表单校验
      rules: {
        pwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log(this.user)
          updateUserPwd(this.user).then(
            response => {
              loginOut().then(() => {
                        this.$router.push({ path: "/login" });
                        // location.reload()
                    })
            }
          );
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    }
  }
};
</script>
