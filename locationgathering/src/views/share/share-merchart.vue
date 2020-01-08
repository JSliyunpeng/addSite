<template>
  <div class="add_merchant">
    <div v-show="!showYoulaihui">
      <div class="header">
        <span class="callback" @click="callback"></span>
        <p class="title">基础信息</p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item style="font-size: 20px;" label="合作类型" prop="youlaitType">
          <cube-button @click="showPickerType"
                       :style="ruleForm.youlaitType===2||ruleForm.youlaitType===3?'color:#606266;':''"
                       style="width:100%;height: 100%;font-size: 14px;text-align: left; background-color: #fff; color: #ccc;">
            {{ruleForm.youlaitType===2?'游莱驿':(ruleForm.youlaitType===3?'游莱家':typeText)}}
          </cube-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder="请填写公司名称（无公司填写个人姓名）"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="所在城市" prop="companyCity">
          <cube-button @click="addressPicker.show()"
                       :style="ruleForm.companyCity?'color:#606266;':''"
                       style="width:100%;height: 100%;font-size: 14px;text-align: left; background-color: #fff; color: #ccc;">
            {{cityText}}
          </cube-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="公司地址" prop="regionCompany">
          <el-input v-model="ruleForm.regionCompany" placeholder="请填写公司地址"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="联系人" prop="mContacts">
          <el-input v-model="ruleForm.mContacts" placeholder="请填写公司联系人姓名"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11" minlength="11" placeholder="请填写联系人手机号码"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="签约日期" prop="signingTime">
          <cube-button @click="showPickerTime"
                       :style="ruleForm.signingTime?'color:#606266;':''"
                       style="width:100%;height: 100%;font-size: 14px;text-align: left; background-color: #fff; color: #ccc;">
            {{ruleForm.signingTime}}
          </cube-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="QQ" prop="qqNumber">
          <el-input v-model="ruleForm.qqNumber" maxlength="15" placeholder="请填写QQ号码（选填）"></el-input>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="编号" prop="code" style="position: relative">
          <el-input v-model="ruleForm.code" placeholder="编号可填写或自动生成"></el-input>
          <el-button class="biaohao_btn" @click="createCode">生成编号</el-button>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <!--        <div style="font-size: 14px;color: #cccc;line-height: 1.5;padding: 0 20px;">自动生成编号前，请选择正确的所在地区 如:惠济区(河南省-郑州市)</div>-->
        <el-form-item label="管理信息">
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
        <el-form-item label="游莱汇" prop="pid">
          <el-button @click="showYoulaihui = true"
                     :style="ruleForm.pid?'color:#606266;':''"
                     style="width:100%;height: 100%;border: none;text-align: left; font-size: 14px;color: #ccc;">
            {{youlaihuiName}}
          </el-button>
          <span class="icon"></span>
        </el-form-item>
        <div style="width: 100%;height: 1px;"></div>
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
        <!--        <div class="merchant_bottom">-->
        <!--          <el-form-item style="width: 100%;padding: 20px 0 80px 0;border-bottom: none;">-->
        <!--            <el-button @click="toDetial" :disabled="!ruleForm.mid" class="jixu" style="margin-left: -30%" type="primary">-->
        <!--              继续填写营地信息-->
        <!--            </el-button>-->
        <!--            <el-button class="jixu" style="margin-left: 5%;" @click="submitForm('ruleForm')">保存</el-button>-->
        <!--          </el-form-item>-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <button-->
        <!--            class="jixu_btn"-->
        <!--            @click="submitForm('ruleForm')"-->
        <!--          >保存-->
        <!--          </button>-->
        <!--        </div>-->
        <el-button class="jixu_btn" @click="submitForm('ruleForm')">保存</el-button>
      </el-form>
      <!--图片生成-->
<!--      <v-generate :youlaitType="ruleForm.youlaitType" :id="$route.query.id" v-if="isGenerate"-->
<!--                  @btnImg="btnImg"></v-generate>-->
    </div>
    <v-youlaihui-list @toShowYoulaihui="ShowYoulaihuiClk" v-if="showYoulaihui"></v-youlaihui-list>
    <!--    <div class="popup">自动生成编号前，请选择正确的所在地区 如:惠济区(河南省-郑州市)</div>-->
  </div>
</template>

<script>
  import {provinceList, cityList, areaList} from '@/assets/area.js'
  import youlaihuiList from '@/views/add-merchant/components/youlaihui-list.vue'
  // import generateImg from './children/generate-img'
  import axios from 'axios'
  import html2canvas from 'html2canvas'

  const siteTypeList = [{text: "游莱驿", value: 2}, {text: "游莱家", value: 3}]
  export default {
    components: {
      vYoulaihuiList: youlaihuiList,
      // vGenerate: generateImg
    },
    data() {
      return {
        mid: '',
        showYoulaihui: false,
        isGenerate: false,
        youlaihuiName: '请选择所属游莱汇公司',
        cityText: '请选择公司所在城市',
        typeText: '请选择',
        cityId: '',
        addressPicker: {},
        SigningTime1: '请选择签约时间',
        ruleForm: {
          // mid: '',
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
        },
      };
    },
    mounted() {
      this.initPickerAddress()
    },
    methods: {
      submitForm(formName) {
        this.ruleForm.youlaihuiName=this.youlaihuiName
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = {...this.ruleForm}
            // delete form.mid
            form.createBy = sessionStorage.getItem('bankId')
            this.$axios.post('/h5/addYoulaiBaseInfo', form).then(res => {
              let result = res.data
              if (res.data.code == 200) {
                this.isGenerate = true
                this.$router.push({
                  path: '/generateImg',
                  query: {
                    youlaitType: this.ruleForm.youlaitType,
                    id: this.$route.query.id
                  }
                })
              } else {
                this.$createDialog({
                  type: 'alert',
                  title: '',
                  content: res.data.message
                }).show()
              }
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
      initPickerAddress() { // 选择城市初始化
        this.$axios.get('/h5/getListByCube').then(res => {
          // let result = res.data
          // const cityList = result.citys
          // console.log(cityList)
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
        })
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
          this.youlaihuiName = value.name
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
      callback() {
        this.$router.go(-1);
      },
    },
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
      padding-top: 120px;

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

    .jixu_btn {
      /*position: fixed;*/
      /*bottom: 40px;*/
      width: 90%;
      margin: 100px 0 100px 5%;
      height: 88px;
      /*left: 5%;*/
      font-size: 32px;
      color: #fff;
      background: linear-gradient(90deg, #ff6e4d, #f1474b);
      /*border-radius: 44px !important;*/
      /*border-bottom: none !important;*/
      /*padding-right: 40px;*/
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

  .merchant_bottom {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }

</style>

