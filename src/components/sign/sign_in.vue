<template>

  <div class="limiter">
    <div class="container-login100" style="background-color: #00dbde">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <div class="login100-form">
          <span class="login100-form-title p-b-49">登陆</span>

          <div class="wrap-input100 validate-input m-b-23" data-validate="请输入用户名">
            <span class="label-input100">用户名</span>
            <input v-model="name" class="input100" type="text" name="username" placeholder="请输入用户名" autocomplete="off">
            <span class="focus-input100" data-symbol="N"></span>
          </div>

          <div class="wrap-input100 validate-input" data-validate="请输入密码">
            <span class="label-input100">密码</span>
            <input v-model="password" class="input100" type="password" name="pass" placeholder="请输入密码">
            <span class="focus-input100" data-symbol="P"></span>
          </div>

          <div class="text-right p-t-8 p-b-31">
            <a href="javascript:">系统不愿意提供找回密码的功能！</a>
          </div>

          <div class="container-login100-form-btn">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn"></div>
              <button @click="sign_up" class="login100-form-btn">登 陆</button>
            </div>
          </div>

          <div class="flex-col-c p-t-25">
            <a href="javascript:" class="txt2">立即注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'


  export default {
    name: "sign_in",
    data: function () {
      return {
        name: "",
        password: "",

        code: 0
      }
    },

    methods: {
      sign_up: function () {
        axios.post('/api/v1/sign_in', {
          "username": this.name,
          "password": this.password
        }).then((response) => {
          this.code = response.data['code'];
          if (this.code == 0) {
            console.log("succeeded");
            this.$router.push("hot-web")
          } else {
            console.log("failed")
          }
        })
      },


    }
  }
</script>

<style scoped>

</style>
