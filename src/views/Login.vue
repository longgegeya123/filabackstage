<template>
  <div class="login">
    
    <div class="login_window">
      <div class="graphic">
        <img src="../assets/f9673da9fe04a1e.gif" />
      </div>
      <el-form
        :model="LoginValidateForm"
        ref="LoginValidateForm"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input v-model="LoginValidateForm.username" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="LoginValidateForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('LoginValidateForm')">登录</el-button>
          <el-button @click="resetForm('LoginValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions,mapState,mapMutations} from "vuex";
export default {
  name: "Login",
  data() {
    return {
      LoginValidateForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  created() {},
  methods: {
    ...mapActions("lxlVuex", ["UserLogin"]),
    ...mapMutations("lxlVuex",["GetUserName"]),
    submitForm(formName) {
        let _this = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { data: res } = await this.UserLogin(this.LoginValidateForm);
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg);
          }
          window.sessionStorage.setItem('token',res.data.token);
          let Uname = res.data.username;
          this.GetUserName(Uname)
          this.$router.push('/home')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
        this.LoginValidateForm.username="";
        this.LoginValidateForm.password="";
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background: #2b4b6b;
  .login_window {
    width: 450px;
    height: 300px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 6px;
    transform: translate(-50%, -50%);
    .graphic {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: #eee;
      padding: 10px;
      box-shadow: 0 0 10px #eeee;
      img {
        display: block;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: #eeeeee;
      }
    }
    .demo-ruleForm {
      margin-top: 90px;
      padding: 0 20px;
      .btn {
        width: 160px;
        position: absolute;
        right: 14px;
      }
    }
  }
}
</style>