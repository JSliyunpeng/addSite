<template>
  <div class="hearder">
    <span class="back" @click="back"></span>
    <div class="text">{{title}}</div>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .hearder {
    position: relative;
    height: 130px;
    border-bottom: 1px solid #EEEEEE;
    .back {
      position: absolute;
      bottom: 26px;
      left: 40px;
      width: 22px;
      width: 22px;
      height: 40px;
      background-image: url(../../public/img/btn/btn_callback.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .text {
      position: absolute;
      bottom: 26px;
      left: 50%;
      width: 142px;
      margin-left: -71px;
      font-size: 34px;
    }
  }
</style>
