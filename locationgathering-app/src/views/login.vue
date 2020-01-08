<template>
  <div class="login">
    <div class="content">
      <img src="../../public/img/login/logo.png" alt>
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label class="user_phone" for="mui-input-clear"></label>
          <input
            type="text"
            id="mui-input-clear"
            class="mui-input-clear input_mindin"
            v-model="account"
            :placeholder="namePlaceholder"
            @blur="inputValue"
          >
          <span class="clear_user" @click="clearUser"></span>
        </div>
        <div class="mui-input-row">
          <label class="user_pwd" for="mui-input-password"></label>
          <input
            :type="pwdType"
            id="mui-input-password"
            class="mui-input-password input_mindin"
            v-model="password"
            :placeholder="pwdPlaceholder"
            @blur="inputValue"
          >
          <span class="icon pwd_type" :class="pwdTypeActive==0?'icon pwd_type':'pwd_type_active'"
                @click="clearPwd"></span>
        </div>
        <router-link to="/register" style="float: right;margin:10px 0 15px 0; font-size: 14px;color: #F1474B;">注册账号</router-link>
        <div class="warning" v-show="warning">{{waringText}}</div>
        <button type="button" @click="login" class="btn mui-btn mui-btn-primary mui-btn-block">确认</button>
      </form>
    </div>
  </div>
</template>
<script>
  import tabbar from "../components/tabbar";
  import mock from "../../common/mock.js";
  import qs from "qs";
  import {constants} from "crypto";

  export default {
    data() {
      return {
        account: "1375603382",
        password: "123456",
        warning: false,
        waringText: '',
        warningValue: "",
        namePlaceholder: "请输入用户名",
        pwdPlaceholder: "请输入密码",
        pwdType: "password",
        pwdTypeActive: 0
      };
    },
    components: {
      vTabbar: tabbar
    },
    created() {
    },
    methods: {
      inputValue(value, warning) {
        this.warning = false;
        // if (value == "") {
        //   this.warning = true;
        //   this.warningValue = warning;
        // } else {
        //   this.warning = false;
        // }
      },
      waringTextShow(text) {
        this.waringText = text
        this.warning = true;
      },
      login() {
        this.password == '' || this.account == '' ? this.waringTextShow('请输入用户名和密码') : this.$axios
        .get(this.base +"/login", {params: {password: this.password, account: this.account, loginType: 2}})
        .then(res => {
          if (res.data.code != 200) {
            this.waringTextShow(res.data.message)
          } else if (res.data.code == 200) {
            let token = res.data.token;
            this.$store.dispatch("Login", res.data)
            sessionStorage.setItem('userView',JSON.stringify(res.data.data))
            window.localStorage.setItem('userView',JSON.stringify(res.data.data))
            this.$router.push("/");
          }else {
            this.waringTextShow('未知错误请联系管理员！')
          }
        })
      },
      clearUser() {
        this.account = "";
      },
      clearPwd() {
        this.pwdTypeActive = this.pwdTypeActive == 0 ? 1 : 0
        this.pwdType = this.pwdType == "password" ? "text" : "password";
      }
    }
  };
</script>


<style lang="scss">
  .login {
    .content {
      img {
        display: block;
        width: 227px;
        height: 227px;
        margin: 0 auto;
      }

      .form {
        .el-form-item {
          overflow: hidden;
          height: 98px;
          padding: 0 142px;
          border-top: none;
          border-bottom: 2px solid rgba(238, 238, 238, 1); /*no*/
          // background-color: pink;
        }

        .el-form-item__content {
          margin: 0;

          .el-form-item__label::before {
            display: none;
          }

          label {
            padding: 10pt;
            width: 50px;
            height: 50px;
            margin: 25px 19px;
            padding: 0;
            // background-color: pink;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-top: 149px;
    background-color: #fff;

    .content {
      img {
        display: block;
        width: 227px;
        height: 227px;
        margin: 0 auto;
      }

      .mui-input-group {
        width: 500px;
        margin: 100px auto 0 auto;

        .mui-input-row {
          overflow: hidden;
          height: 98px;
          border-top: none;
          border-bottom: 2px solid rgba(238, 238, 238, 1); /*no*/
          label {
            padding: 10pt;
            width: 50px;
            height: 50px;
            margin: 25px 19px;
            padding: 0;
            // background-color: pink;
          }

          ::-webkit-input-placeholder {
            font-size: 14px; /*no*/
            line-height: normal;
          }

          .user_phone {
            background-image: url(../../public/img/login/phone.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .user_pwd {
            background-image: url(../../public/img/login/password.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .user_pwd_active {
            background-image: url(../../public/img/login/password.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          input {
            float: left;
            position: relative;
            // background-color: pink;
            vertical-align: middle;
            bottom: 0px;
            height: 96px;
            width: 80%;
            font-size: 32px;
            padding: 0;
          }

          input::placeholder {
            font-size: 28px;
          }

          span {
            display: block;
            position: relative;
            width: 24px;
            height: 24px;
            // background-color: pink;
            float: right;
            margin-top: -55px;
          }

          .clear_user {
            background-image: url(../../public/img/login/clear.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .pwd_type {
            background-image: url(../../public/img/login/show_t.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .pwd_type_active {
            background-image: url(../../public/img/login/show_f.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }

        .mui-input-row:after {
          height: 0;
        }

        .warning {
          // height: 10px;
          color: rgba(241, 71, 75, 1);
          font-size: 24px;
          // background-color: pink;
          margin: 40px 0 0 20px;
        }

        .btn {
          width: 500px;
          height: 88px;
          margin-top: 77px;
          border: none;
          border-radius: 44px;
          font-size: 16px; /*no*/
          background: linear-gradient(
              90deg,
              rgba(255, 110, 77, 1),
              rgba(241, 71, 75, 1)
          );
        }
      }

      .mui-input-group:before {
        height: 0;
      }

      .mui-input-group:after {
        height: 0;
      }
    }
  }
</style>

