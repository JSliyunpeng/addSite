<template>
  <div>
    <!--图片生成-->
    <div class="mask">
    </div>
    <div class="mask_content">
      <div class="mask_title">
        游莱账号信息
      </div>
      <div class="mask_text" id="capture" v-if="!photoUrl">
        <p>管理员: {{information.name}}</p>
        <p>登录账号: {{information.account}}</p>
        <p>安全手机: {{information.phone}}</p>
        <p>商家后台:<span style="font-size: 14px"> www.zzulike.com/h5s/admin/</span></p>
        <p>商家类型: {{youlaitType==2?'游莱驿':(youlaitType==3?'游莱家':'')}}</p>
      </div>
      <img crossOrigin="*" class="img" :src="photoUrl" v-else id="img" alt="">
      <div class="mui-button-row">
        <p class="btn_img">
          长按中间白色区域保存到相册
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    import html2canvas from 'html2canvas'
  export default {
      data() {
          return {
              tips: '',
              photoUrl: '',
              information: '', // 信息
              youlaitType: ''
          }
      },
      created() {
          this.information = JSON.parse(sessionStorage.getItem('account'))
          this.youlaitType = this.$route.query.youlaitType
      },
      mounted() {
          if (this.information) {
              this.generateImg()
          }
      },
      methods: {
          generateImg() {
              var _this = this
              html2canvas(document.getElementById('capture')).then(function (canvas) {
                  _this.photoUrl = canvas.toDataURL()
              });
          },
      }
  }
</script>

<style scoped lang="scss">
  .img {
    width: 540px;
    height: 420px;
  }
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.5);
  }

  .mask_content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 540px;
    box-sizing: border-box;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 30px;

    .mask_title {
      line-height: 88px;
      background: #F1474B;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      text-align: center;
      font-size: 36px;
      color: #fff;
    }

    .mask_text {
      padding: 40px;
      /*position: absolute;*/
      /*background: #fff;*/
      /*left: 0;*/
      /*top: 86px;*/

      p {
        line-height: 54px;
        color: #333;
        font-size: 30px;
      }
    }

    .btn_img {
      width: 90%;
      /*background: #FF6E4D;*/
      color: #FF6E4D;
      font-size: 30px;
      font-weight: bold;
      line-height: 80px;
      /*background: linear-gradient(90deg, #ff6e4d, #f1474b);*/
      /*border-radius: 44px !important;*/
      margin: 0 auto 36px;
    }
  }

  .tips {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 30px;
    background:rgba(0,0,0,.5);
    color: #fff;
    border-radius: 20px;
    text-align: center;
    z-index: 99999;
  }

</style>
