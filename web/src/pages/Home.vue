<template>
  <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input
        v-model="form.captcha"
        style="width: 60%; margin-right: 10px"
      ></el-input>
      <div v-html="svg"></div>
      <el-button type="text" @click="generateCaptcha()">获取验证码</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')"
        >登录</el-button
      >
      <el-button @click="forget()">忘记密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      svg: '',
      form: {
        username: '',
        password: '',
        captcha: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      generatedCaptcha: '',
    };
  },
  mounted() {
    this.generateCaptcha();
  },
  methods: {
    forget() {
      axios
        .post('http://localhost:3000/login/forget', {
          email: 'kkxx.ll@qq.com',
        })
        .then((res) => {
          console.log(res);
        });
    },
    generateCaptcha() {
      axios.get('http://localhost:3000/public/getcaptcha').then((res) => {
        this.svg = res.data.svg;
      });
    },
    submitForm(formName) {
      axios
        .post('http://localhost:3000/login/login', {
          username: 'kkxx.ll@qq.com',
          password: '123456',
          code: this.form.captcha
        })
        .then((res) => {
          console.log(res);
        });
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     if (this.form.captcha.toUpperCase() === this.generatedCaptcha) {
      //       alert('提交成功!');
      //       // 这里可以添加登录逻辑
      //     } else {
      //       this.$message.error('验证码错误!');
      //     }
      //   } else {
      //     console.log('验证失败!');
      //     return false;
      //   }
      // });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.el-form {
  width: 300px;
  margin: 0 auto;
}
</style>
