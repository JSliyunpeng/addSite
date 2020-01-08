<template>
  <div>
    <div class="register">
      <div class="header">
        <span class="callback" @click="callback"></span>
        <p class="title">游莱注册说明</p>
      </div>
      <div class="register_content">
        <div class="register_text clearfix">
          <div class="register_left"></div>
          <div class="register_right">
            <div class="register_img_top">1、商家账号注册</div>
            <div class="register_img">登录游莱驿或游莱家业务管理后台，申请账户余额提现、查看订单记录等。</div>
            <div class="register_img_bottom"></div>
          </div>
        </div>
        <div class="register_text clearfix">
          <div class="register_left_company" style="float: right"></div>
          <div class="register_right" style="float: left;">
            <div class="register_img_top register_img_top_right">2、填写公司信息</div>
            <div class="register_img_right register_img">
              请填写公司名称、城市、地址、联系人、电话等真实信息，
              且在业务员的指导下选择所属 "游莱驿"
            </div>
            <div class="register_img_bottom_right register_img_bottom"></div>
          </div>
        </div>
        <div class="register_text clearfix" >
          <div class="register_left_account"></div>
          <div class="register_right">
            <div class="register_img_top">3、保存账号信息</div>
            <div class="register_img">
              账户创建成功后，保存账户信息至本人手机设备并妥善保管，
              不要轻易向他人泄露账号信息，避免发生账号丢失等损失。
            </div>
            <div class="register_img_bottom"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-button-row">
      <button
        type="submit"
        class="register_btn"
        @click="toRegister()"
      >我要注册
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    callback() {
        window.history.back(-1);
    },
    toRegister() {
      if (this.$route.query.bankId && this.$route.query.bankId !== 'undefined') {
          sessionStorage.setItem('bankId',this.$route.query.bankId)
          this.$router.push({
              path: '/shareAccount'
          })
      }else {
          this.$createDialog({
              type: 'alert',
              title: '',
              content: '无推荐人'
          }).show()
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #EEEEEE; /*no*/
    background-color: #fff;

    .callback {
      position: absolute;
      top: 25px;
      left: 40px;
      width: 40px;
      height: 40px;
      background-image: url(../../../public/img/btn/btn_callback.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .title {
      line-height: 80px;
      margin: 0 auto;
      font-size: 16px; /*no*/
      text-align: center;
    }
  }

  .register_content {
    padding: 224px 66px 0;
    background: #fff;
    /*height: 20px;*/

    .register_text {
      margin-bottom: 140px;
    }

    .register_left,.register_left_company,.register_left_account {
      width: 120px;
      height: 120px;
      float: left;
    }

    .register_left {
      background: url('../../../public/img/register/zhuce.png');
      background-size: 100% 100%;
    }

    .register_left_company {
      background: url('../../../public/img/register/bianji.png');
      background-size: 100% 100%;
      float: right;
    }

    .register_left_account {
      background: url('../../../public/img/register/tupian.png');
      background-size: 100% 100%;
    }

    .register_right {
      float: right;

      .register_img_top {
        width: 484px;
        height: 70px;
        background: url('../../../public/img/register/1.png');
        background-size: 100% 100%;
        font-size:28px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(241,71,75,1);
        box-sizing: border-box;
        padding: 30px 0 0 40px;
      }

      .register_img_top_right {
        background: url('../../../public/img/register/4.png');
        background-size: 100% 100%;
        padding: 30px 0 0 20px;
        /*margin-left: 22px;*/
      }

      .register_img {
        width: 484px;
        /*height: 120px;*/
        background: url('../../../public/img/register/2.png');
        background-size: 100% 100%;
        padding: 0 10px 0 40px;
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height: 36px;
        box-sizing: border-box;
      }

      .register_img_right {
        background: url('../../../public/img/register/5.png');
        background-size: 100% 100%;
        padding: 0 40px 0 20px;
      }

      .register_img_bottom {
        width: 484px;
        height: 40px;
        background: url('../../../public/img/register/3.png');
        background-size: 100% 100%;
      }

      .register_img_bottom_right {
        background: url('../../../public/img/register/6.png');
        background-size: 100% 100%;
      }
    }
  }

  .register_btn {
    position: fixed;
    bottom: 40px;
    width: 90%;
    left: 5%;
    font-size: 32px;
    color: #fff;
    line-height: 80px;
    background: linear-gradient(90deg, #ff6e4d, #f1474b);
    border-radius: 44px !important;
  }
</style>
