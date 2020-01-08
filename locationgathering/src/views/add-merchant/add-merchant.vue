<template>
  <div class="add_merchant">
    <div v-show="!showYoulaihui">
      <div class="header">
        <span class="callback" @click="callback"></span>
        <p class="title">基础信息</p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item style="font-size: 20px;" label="合作类型" prop="youlaitType" v-if="initStatus > -1">
          <cube-button @click="showPickerType"
                       :style="ruleForm.youlaitType==2||ruleForm.youlaitType==3?'color:#606266;':''"
                       class="select_button">
            {{ruleForm.youlaitType==2?'游莱驿':(ruleForm.youlaitType==3?'游莱家':typeText)}}
          </cube-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder="请填写公司名称（无公司填写个人姓名）"></el-input>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="所在城市" prop="companyCity">
          <cube-button @click="addressPicker.show()"
                       :style="ruleForm.companyCity?'color:#606266;':''"
                       class="select_button">
<!--            {{ruleForm.regionView!=''?ruleForm.regionView:cityText}}-->
            {{ruleForm.regionView}}
          </cube-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="公司地址" prop="regionCompany">
          <el-input v-model="ruleForm.regionCompany" placeholder="请填写公司地址"></el-input>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="联系人" prop="mContacts">
          <el-input v-model="ruleForm.mContacts" placeholder="请填写公司联系人姓名"></el-input>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11" minlength="11" placeholder="请填写联系人手机号码"></el-input>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="签约日期" prop="signingTime">
          <cube-button @click="showPickerTime"
                       :style="ruleForm.signingTime?'color:#606266;':''"
                       class="select_button">
            {{new Date(ruleForm.signingTime).format('yyyy-MM-dd hh:mm:ss')}}
          </cube-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="QQ" prop="qqNumber">
          <el-input v-model="ruleForm.qqNumber" maxlength="15" placeholder="请填写QQ号码（选填）"></el-input>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="编号" prop="code" style="position: relative">
          <el-input v-model="ruleForm.code" placeholder="编号可填写或自动生成"></el-input>
          <el-button class="biaohao_btn" @click="createCode">生成编号</el-button>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <!--        <div style="font-size: 14px;color: #cccc;line-height: 1.5;padding: 0 20px;">自动生成编号前，请选择正确的所在地区 如:惠济区(河南省-郑州市)</div>-->
        <el-form-item label="管理信息">
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
        <el-form-item label="游莱汇" prop="pid">
          <el-button @click="showYoulaihui = true"
                     :style="ruleForm.pid?'color:#606266;':''"
                     class="select_button">
            {{ruleForm.youlaihuiName}}
          </el-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%; height: 1px;"></div>
<!--        <el-form-item>-->
<!--          <div class="form_item">管理员账号（该账号仅可登录商家后台）</div>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="管理员姓名" prop="realname">-->
<!--          <el-input v-model="ruleForm.realname" placeholder="请填写管理员姓名"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="登录账号" prop="account">-->
<!--          <el-input v-model="ruleForm.account" maxlength="12" minlength="6"-->
<!--                    placeholder="使用6-12位（字母或数字）作为账号名"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item v-if="!ruleForm.mid" label="登录密码" prop="password">-->
<!--          <el-input v-model="ruleForm.password" placeholder="初始密码请设置为123456"></el-input>-->
<!--        </el-form-item>-->
        <div class="merchant_bottom">
<!--          <el-form-item style="padding: 20px 0 80px 0;border-bottom: none;">-->
            <el-button @click="toDetial" :disabled="!ruleForm.id" class="jixu" type="primary">
              继续填写营地信息
            </el-button>
            <el-button class="jixu" style="margin-left: 5%;" @click="submitForm('ruleForm')">保存</el-button>
<!--          </el-form-item>-->
        </div>
      </el-form>
    </div>
    <v-youlaihui-list @toShowYoulaihui="ShowYoulaihuiClk" v-if="showYoulaihui"></v-youlaihui-list>
    <!--    <div class="popup">自动生成编号前，请选择正确的所在地区 如:惠济区(河南省-郑州市)</div>-->
  </div>
</template>

<script>
  import {provinceList, cityList, areaList} from '@/assets/area.js'
  import youlaihuiList from '@/views/add-merchant/components/youlaihui-list.vue'

  const siteTypeList = [{text: "游莱驿", value: 2}, {text: "游莱家", value: 3}]
  export default {
    components: {
      vYoulaihuiList: youlaihuiList
    },
    data() {
      return {
        initStatus: -2,
        mid: '',
        showYoulaihui: false,
        // youlaihuiName: '请选择所属游莱汇公司',
        // cityText: '请选择公司所在城市',
        typeText: '请选择',
        cityId: '',
        addressPicker: {},
        SigningTime1: '请选择签约时间',
        ruleForm: {
          mid: false,
          regionView:'请选择公司所在城市',
          youlaihuiName: '请选择所属游莱汇公司',
          youlaitType: '',//合作类型
          companyName: '',//公司名称
          companyCity: '',//所在城市
          regionCompany: '',//公司地址
          mContacts: '',//联系人
          phone: '',//手机号
          signingTime: '',// 签约日期
          qqNumber: '',//qq
          code: '',//编号
          pid: '',//游莱汇
          // realname: '',//管理员姓名
          // account: '',//登录账号
          // password: '',//登录密码
          tabs: []
        },
        rules: {
          youlaitType: [
            {required: true, message: '请选择合作类型', trigger: 'blur'}
          ],
          companyName: [
            {required: true, message: '请完善公司名称', trigger: 'blur'}
          ],
          regionCompany: [
            {required: true, message: '请完善公司地址', trigger: 'blur'}
          ],
          companyCity: [
            {required: true, message: '请完善所在城市', trigger: 'blur'}
          ],
          mContacts: [
            {required: true, message: '请完善联系人', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请完善手机号', trigger: 'blur'},
          ],
          signingTime: [
            {required: true, message: '请完善签约时间', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请完善编号', trigger: 'blur'}
          ],
          pid: [
            {required: true, message: '请完善游莱汇', trigger: 'blur'}
          ],
          realname: [
            {required: true, message: '请完善管理员姓名', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请完善登录账号', trigger: 'blur'},
          ],
          password: [
            {required: this.detialBtn, message: '请完善登录密码', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {...this.ruleForm}
            if(form.mid === true || form.mid === false) {
              delete form.midel-form-item__content
            }
            form.youlaihuiName=this.ruleForm.youlaihuiName
            form.signingTime=new Date(form.signingTime).format('yyyy-MM-dd')
            form.updateTime=new Date(form.updateTime).format('yyyy-MM-dd')
            this.$axios.post('/h5/youlaYi/update', form).then(res => {
              let result = res.data
              console.log(result)
              this.ruleForm = result
              this.mid = result.id
              this.$createDialog({
                type: 'alert',
                title: '',
                content: '保存成功'
              }).show()
            })
              .catch((err) => {
                  this.$createDialog({
                      type: 'alert',
                      title: '',
                      content: err
                  }).show()
              })
          } else {
            return false;
          }
        });
      },
      toDetial() {
        this.$router.push({path: "/addposition", query: {id: this.mid}});
      },
      showPickerType() {//合作类型选择器
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '营地类型',
            data: [siteTypeList],
            onSelect: (selectedVal, selectedIndex, selectedText) => {
              this.typeText = selectedText[0]
              this.ruleForm.youlaitType = selectedVal[0]
            }
          })
        }
        this.picker.show()
      },
      showPickerTime() { //签约时间选择器
        if (!this.formatPicker) {
          this.formatPicker = this.$createDatePicker({
            title: '选择时间',
            min: new Date(1999, 1, 1),
            max: new Date(2030, 12, 31),
            value: new Date(),
            columnOrder: ['year', 'month', 'date',],
            format: {
              year: 'YYYY年',
              month: 'MM月',
              date: 'D 日'
            },
            onSelect: (selectedVal, selectedIndex, selectedText) => {
              this.ruleForm.signingTime = new Date(selectedVal).format("yyyy-MM-dd");
              this.SigningTime1 = selectedText[0] + selectedText[1] + selectedText[2]
              // this.ruleForm.signingTime =toString(selectedIndex[0]) + '-' + toString(selectedIndex[1]) + '-' + toString(selectedIndex[2])
            }
          })
        }
        this.formatPicker.show()
      },
      ShowYoulaihuiClk(value) {
        this.showYoulaihui = false
        if (value.name) {
          this.ruleForm.pid = value.mid
          this.ruleForm.youlaihuiName = value.name
        }
      },
      createCode() { // 创建编号
        if (this.ruleForm.youlaitType != '' && this.cityId != '') {
          this.$axios.get('/h5/createCode', {
            params: {
              Type: this.ruleForm.youlaitType,
              regionId: this.cityId
            }
          }).then(res => {
            this.ruleForm.code = res.data
          })
        } else {
          this.$createDialog({
            type: 'alert',
            title: '提示！',
            content: '自动生成编号前，请选择正确的所在地区 如:惠济区(河南省-郑州市)'
          }).show()
        }
      },
      initPickerAddress() { // 选择城市初始化
        this.$axios.get('/h5/getListByCube').then(res => {
          // let result = res.data.data
          // const cityList = result.citys
          // const areaList = result.areas
          // const addressData = result.provinces
          // addressData.forEach(province => {
          //   province.children = cityList[province.value]
          //   province.children.forEach(city => {
          //     city.children = areaList[city.value]
          //   })
          // })
          const addressData = provinceList
          addressData.forEach(province => {
            province.children = cityList[province.value]
            province.children.forEach(city => {
              city.children = areaList[city.value]
            })
          })
          this.addressPicker = this.$createCascadePicker({//所在城市选择器
            title: '选择城市',
            data: addressData,
            onSelect: (selectedVal, selectedIndex, selectedText) => {
              this.cityText = selectedText[0] + selectedText[1] + selectedText[2]
              this.ruleForm.regionView = selectedText[0] + selectedText[1] + selectedText[2]
              this.ruleForm.companyCity = selectedVal[2]
              this.cityId = selectedVal[2]
            }
          })
          this.initStatus++
        })
      },
      callback() {
        this.$router.go(-1);
      },
      init() { // 初始化方法
        if (this.mid) {
          this.$axios.get('/h5/youlaYi/view', {params: {id: this.$route.query.id}}).then(res => {
            let result = res.data
            console.log(result)
            // this.$axios.get('/ylManager/youlaihui/getYoulaiCompany', {params: {youlaitType: 1}}).then(res => {
            //     res.data.data.forEach(item => {
            //         if (item.mid == result.pid) {
            //             this.youlaihuiName = item.companyName
            //         }
            //     })
            //     this.cityText = result.regionView
            // })
            this.ruleForm = result
            if (result.tabs) {
              for (let i = 0; i < result.tabs.length; i++) {
                if (result.tabs[i]) {
                  this.ruleForm.tabs.push(i + 1)
                }
              }
            }
          })
          this.initStatus++
        }
        this.initPickerAddress()
      }
    },
    created() {
      if (this.$route.query.id) {
        this.mid = this.$route.query.id
      }
      this.init()
    }
  }
</script>

<style lang="scss">
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
        line-height: 100px;
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
              border: none;
              padding: 0!important;
              line-height: normal;
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
      height: 88px;
      color: #fff;
      border: none;
      font-size: 18px; /*no*/
      border-radius: 10px;
      padding: 20px 40px;
      background: linear-gradient(90deg, rgba(255, 110, 77, 1), rgba(241, 71, 75, 1));
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

    .select_button {
      width: 100%;
      height: 100%;
      font-size: 28px;
      text-align: left;
      border: none;
      background-color: #fff;
      color: #ccc;
    }

    .form_item {
      height: 90px;
      line-height: 90px;
      font-size: 28px;
      margin-left: 40px;
      border-bottom: 1px solid #EEEEEE;/*no*/
    }
    .submit_btn {
      padding: 40px 0 100px 10%;
    }
    .show_account {
      font-size: 28px;
      line-height: 90px;
      padding-left: 4%;
    }
    .message_text {
      height: 100px;
    }
  }

  .merchant_bottom {
    /*position: fixed;*/
    /*bottom: 50px;*/
    /*right: 0px;*/
    /*width: 100%;*/
    margin: 50px 0;
    text-align: center;

  }
</style>

