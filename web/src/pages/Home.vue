<template>
  <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" show-password></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="form.captcha" style="width: 60%; margin-right: 10px;"></el-input>
      <el-button type="text" @click="generateCaptcha">获取验证码</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      generatedCaptcha: ''
    }
  },
  methods: {
    generateCaptcha() {
      // 这里可以调用后端接口生成验证码
      // 为了演示，我们生成一个简单的随机数验证码
      this.generatedCaptcha = Math.random().toString(36).substring(2, 6).toUpperCase();
      alert('验证码: ' + this.generatedCaptcha);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.captcha.toUpperCase() === this.generatedCaptcha) {
            alert('提交成功!');
            // 这里可以添加登录逻辑
          } else {
            this.$message.error('验证码错误!');
          }
        } else {
          console.log('验证失败!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 300px;
  margin: 0 auto;
}
</style>