<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="账户角色" prop="job">
      <el-input v-model="user.job" disabled />
    </el-form-item> 
    <el-form-item label="手机号码" prop="tel">
      <el-input v-model="user.tel" maxlength="11" />
    </el-form-item>
    <el-form-item label="账户名" prop="username">
      <el-input v-model="user.username" maxlength="50" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <!-- <el-button type="danger" size="mini" @click="close">关闭</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user.js";

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
       
        tel: [
          // { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // console.log(this.user)
          updateUserProfile(this.user).then(response => {
              this.$message("修改成功");
            
          });
        }
      });
    },
    // close() {
    //   // this.$store.dispatch("tagsView/delView", this.$route);
    //   this.$router.push({ path: "/index" });
    // }
  }
};
</script>
