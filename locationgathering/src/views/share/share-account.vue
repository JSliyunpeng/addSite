<template>
  <div class="add_merchant">
    <div v-show="!showYoulaihui">
      <div class="header">
        <span class="callback" @click="callback"></span>
        <p class="title">账号信息</p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h2 class="share_title">商家账号（用于登陆商家后台）</h2>
        <el-form-item label="管理员姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请填写管理员姓名"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="ruleForm.account" maxlength="12" minlength="6"
                    placeholder="使用6-12位（字母或数字）作为账号名"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入6-20位数字字母密码"
                    autocomplete="off"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <h2 class="share_title">安全手机（用于商家收入提现安全认证）</h2>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请填写手机号"/>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="短信验证：" prop="verificationCode" class="verificationCode">
          <el-input v-model="ruleForm.verificationCode" placeholder="请输入短信验证码">
            <!--            <el-button class="code" v-if="isCount == true" slot="append" @click="sendOut('account/phoneAuth')">发送验证码</el-button>-->
            <!--            <el-button v-if="isData == true" slot="append" disabled>{{ count }}秒</el-button>-->
            <!--            <el-button class="code" v-if="resend == true" slot="append" @click="sendOut('account/phoneAuth')">重新发送</el-button>-->
          </el-input>
          <div class="code" v-if="isCount == true" @click="sendOut">发送验证码</div>
          <div class="code" v-if="isData == true" disabled>{{ count }}秒</div>
          <div class="code" v-if="resend == true" @click="sendOut">重新发送</div>
          <div class="tips" v-if="isTips">{{tips}}</div>
        </el-form-item>
        <el-form-item class="jixu">
          <!--          <el-button @click="toDetial" :disabled="!ruleForm.mid" class="jixu" style="margin-left: -30%" type="primary">-->
          <!--            继续填写基础信息-->
          <!--          </el-button>-->
          <el-button @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--    <div class="popup">自动生成编号前，请选择正确的所在地区 如:惠济区(河南省-郑州市)</div>-->
  </div>
</template>

<script>
  import youlaihuiList from '@/views/add-merchant/components/youlaihui-list.vue'

  const siteTypeList = [{text: "游莱驿", value: 2}, {text: "游莱家", value: 3}]
  export default {
    components: {
      vYoulaihuiList: youlaihuiList
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateAccount = (rule, value, callback) => {
        // const reg = /^[\d_a-zA-Z]{2,6}$/ //必须是字母和数字混合
        const reg = /^[0-9a-zA-Z]*$/g
        if (!reg.test(value)) {
          callback(new Error('格式不对哦'))
        } else {
          callback()
        }
      };
      var validatePhone = (rule, value, callback) => {
        const reg = /^1[34578]\d{9}$/
        if (!reg.test(value)) {
          callback(new Error('手机号码格式不对'))
        } else {
          callback()
        }
      }
      return {
        mid: '',
        showYoulaihui: false,
        // youlaihuiName: '请选择所属游莱汇公司',
        // cityText: '请选择公司所在城市',
        // typeText: '请选择',
        // cityId: '',
        // addressPicker: {},
        // SigningTime1: '请选择签约时间',
        isCount: true, // 倒计时显示
        count: 60, // 倒计时
        timer: '', // 倒计时表示
        resend: false, // 重新发送
        isData: false, // 时间
        ruleForm: {
          // mid: false,
          name: '',//管理员姓名
          account: '',//登录账号
          password: '',//登录密码
          checkPass: '', // 再次确认密码
          phone: '', // 手机号
          verificationCode: '', // 验证码
          // tabs: []
        },
        rules: {
          name: [
            {required: true, message: '请完善管理员姓名', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请完善登录账号', trigger: 'blur'},
            {validator: validateAccount, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {required: true, min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change'},
            {validator: validatePass, trigger: 'blur'},
            {validator: validateAccount, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'change'},
            {validator: validatePass2, trigger: 'blur'},
            {validator: validateAccount, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {max: 11, min: 11, message: '请输入正确的手机号', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          // verificationCode: [
          //   {required: true, message: '请输入验证码', trigger: 'blur'},
          // ]
        },
        tips: '', // 提示信息
        isTips: false // 提示信息是否显示
      };
    },
    methods: {
      // 倒计时
      countDown() {
        this.count = this.count - 1
        if (this.count <= 0) {
          this.count = 60
          this.isData = false
          this.isCount = false
          this.resend = true
          clearInterval(this.timer)
        }
      },
      sendOut(url, val) { // 发送验证码
        const reg = /^1[34578]\d{9}$/
        if (!this.ruleForm.phone) {
          // this.tips = '手机号不能为空'
          // this.isTips = true
          // setTimeout(() => {
          //   this.isTips = false
          // }, 2000)
            this.$createDialog({
                type: 'alert',
                title: '',
                content: '手机号不能为空'
            }).show()
          return;
        } else if (!reg.test(this.ruleForm.phone)) {
          // this.tips = '手机格式不对'
          // this.isTips = true
          // setTimeout(() => {
          //   this.isTips = false
          // }, 2000)
            this.$createDialog({
                type: 'alert',
                title: '',
                content: '手机格式不对'
            }).show()
          return;
        } else {
          this.$axios.get('/ylManager/account/phoneAuth', {
            params: {
              phone: this.ruleForm.phone
            }
          }).then(res => {
            this.timer = setInterval(this.countDown, 1000)
            this.isData = true
            this.isCount = false
            this.resend = false
          })
        }

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {...this.ruleForm}
            delete form.checkPass
            // form.createBy =  this.$route.query.bankId
            form.createBy =  sessionStorage.getItem('bankId')
            form.createBy =  1000
            this.$axios.post('/register', form).then(res => {
              if (res.data.code == 200) {
                this.$createDialog({
                  type: 'alert',
                  title: '',
                  content: '保存成功'
                }).show()
                this.$router.push({path: '/shareMerchart'})
                  sessionStorage.setItem('account',JSON.stringify(this.ruleForm))
              } else {
                this.$createDialog({
                  type: 'alert',
                  title: '',
                  content: res.data.message
                }).show()
              }
              // 保存成功跳转下一个页面
              // this.$router.push({path: "/addMerchant", query: {id: this.mid}});
            })
              .catch(() => {
                let text = res.message
                this.$createDialog({
                  type: 'alert',
                  title: '',
                  content: '保存失败！请刷新后重试！'
                }).show()
              })
          } else {
            return false;
          }
        });
      },
      toDetial() {
        this.$router.push({path: "/addMerchant", query: {id: this.mid}});
      },
      callback() {
        window.history.back(-1);
      },
    },
    created() {
    }
  }
</script>

<style lang="scss">
  .share_title {
    margin-left: 5%;
    line-height: 80px
  }

  .add_merchant {
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

    .el-form {
      padding-top: 80px;

      .el-form-item {
        height: 90px;
        margin-left: 40px;
        margin-bottom: 0;
        border-bottom: 1px solid #EEEEEE; /*no*/
        .el-form-item__label {
          height: 90px;
          text-align: left;
          line-height: 90px;
          font-size: 28px;
        }

        .el-form-item__content {
          height: 100%;
          border: none;

          .el-input {
            height: 40%;
            margin-top: 5%;
            font-size: 24px; /*no*/
            .el-input__inner {
              height: 100%;
              border: none;
              line-height: normal;
              padding: 0!important;
            }
          }

          .el-form-item__error {
            top: 72%;
            z-index: 100;
            font-size: 12px; /*no*/

          }
        }

      }

    }

    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
      background: linear-gradient(90deg, rgba(255, 110, 77, 1), rgba(241, 71, 75, 1));
    }

    .popup {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -200px 0 0 -200px;
      width: 400px;
      height: 400px;
      padding: 50px;
      font-size: 16px; /*no*/
      line-height: 1.5;
      text-align: center;
      background-color: skyblue;
    }

    .cube-select {
      height: 100%;
    }

    .cube-select::after {
      height: 170px;
      border: none;
    }

    .cube-select-placeholder {
      font-size: 32px;
      margin: 10px 40px 0 0;
    }

    cube-picker-title-group {
      background-color: skyblue !important;
    }

    .cube-dialog-title-def {
      font-size: 16px !important; /*no*/
    }

    .cube-dialog-content-def > p {
      font-size: 16px !important; /*no*/
    }

    .cube-dialog-btn {
      font-size: 16px !important; /*no*/
    }

    .icon {
      position: absolute;
      right: 40px;
      top: 33px;
      width: 12px;
      height: 20px;
      background-image: url(../../../public/img/btn/enter.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .jixu {
      border-bottom: none !important;
      padding-right: 40px;
      margin-top: 20px;

      .el-form-item__content {
        margin: 0 !important;

        button {
          height: 88px;
          color: #fff;
          border: none;
          width: 100%;
          box-sizing: border-box;
          font-size: 18px; /*no*/
          border-radius: 10px;
          padding: 20px 40px;
          background: linear-gradient(90deg, rgba(255, 110, 77, 1), rgba(241, 71, 75, 1));
        }
      }
    }

    .biaohao_btn {
      position: absolute;
      top: 15px;
      right: 15px;
      height: 60px;
      border: none;
      color: #ffffff;
      font-size: 28px;
      border-radius: 10px;
      background: linear-gradient(90deg, rgba(255, 110, 77, 1), rgba(241, 71, 75, 1));
    }

    .form_item {
      height: 90px;
      line-height: 90px;
      font-size: 28px;
      margin-left: -200px;
    }
  }

  .verificationCode {
    position: relative;

    .el-form-item__content {
      margin-right: 170px;
    }

    .code {
      position: absolute;
      right: -140px;
      top: 20px;
      font-size: 12px;/*no*/
      line-height: 40px;
      border: 1px solid #1386ea;
      /*border-radius: 5px;*/
      color: #1386ea;
      padding: 5px 10px;
    }
  }

  .tips {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    border-radius: 20px;
    text-align: center;
  }
</style>
