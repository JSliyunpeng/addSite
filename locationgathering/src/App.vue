<template>
  <div id="app">
    <!-- <router-view >
    </router-view>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  export default {
    name: "app"
  };
</script>


<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  html{
    /*font-size: 54px !important;!*no*!*/
  }
  body {
    max-width: 1024px;
    width: 100%;
  }

  #app {
    max-width: 1024px; /*no*/
    /*min-width: 320px; !*no*!*/
    width: 100%;
    margin: 0 auto;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #fff;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    font-size: 0;
  }

  .float_l {
    float: left;
  }

  .float_r {
    float: right;
  }

  li {
    list-style: none;
  }

  input {
    margin: 0 !important;
  }

  h4 {
    margin: 0;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background-color: rgb(0, 0, 0) !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  }

  // 地图样式
  .amap-geolocation-con {
    left: auto !important;
    right: 20px !important;
    top: 237px !important;

    .amap-geo {
      width: 80px;
      height: 80px;
      border: none;
      border-radius: 50%;
      background-color: #ffffff;
      background-image: url(../public/img/map/button_position.png);
      background-repeat: no-repeat;
      background-size: 50% 50%;
      box-shadow: 0px 3px 7px 0px rgba(4, 0, 0, 0.2);
    }
  }

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #ccc;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ccc;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #ccc;
  }

  .mui-table-view-cell:after {
    height: 0 !important;
  }

  .button:enabled:active {
    color: #fff;
    background-color: #fff !important;
  }

  // elementui样式
  .el-select-dropdown__item {
    height: 50px !important;
    line-height: 50px !important;
  }

  .el-input {
    font-size: 28px !important;

    input {
      font-size: 28px !important;
    }
  }

  .bscroll-indicator {
    overflow: hidden !important;
  }

  .cube-select-placeholder {
    float: right !important;
  }

  .cube-select-icon {
    display: none;
  }

  .cube-picker-cancel,
  .cube-picker-confirm,
  .cube-picker-title,
  .cube-picker-wheel-item {
    font-size: 32px !important;
  }

  .cube-picker-title {
    line-height: 60px !important;
  }

  .cube-picker-wheel-item {
    /*height: 50px !important;*/
    // line-height: 50px;
    // // background-color: pink;
  }

  .cube-dialog-title-def {
    font-size: 16px !important; /*no*/
  }

  .cube-dialog-content-def > p {
    line-height: 1.5;
    text-align: center;
    font-size: 16px !important; /*no*/
  }

  .cube-dialog-btn {
    font-size: 16px !important; /*no*/
  }

  .cube-dialog-main {
    width: 400px !important;
  }

  .el-button:focus, .el-button:hover {
    background-color: #fff !important;
  }

  .amap-logo {
    display: none !important;
  }

  .amap-copyright {
    display: none !important;
  }

  .cube-btn {
    padding: 0 !important;
    box-sizing: border-box;
  }

  .el-input__inner {
    border: none;
    padding: 0 !important;
    line-height: normal;
  }


</style>
