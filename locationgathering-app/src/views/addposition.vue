<template>
  <div class="add_position">
    <div id="header" class="mui-bar mui-bar-nav">
      <h1 class="mui-title">营地信息</h1>
      <button class="callback" @click="back"></button>
    </div>
    <form class="mui-input-group">
      <!-- 营地名称 -->
      <div class="mui-input-row site site_name">
        <span class="color_red">*</span>
        <span class="lable">营地名称</span>
        <input
          id="yingdiname"
          type="text"
          class="mui-input-clear"
          v-model="prams.name"
          v-on:focus="hide('name')"
          placeholder="请填写营地标题（不超过20个字）"
        >
        <span class="mui-icon mui-icon-clear mui-hidden"></span>
      </div>
      <div class="warning_text" v-show="youlaiFlag.name">请填写完整的营地名称</div>
      <!-- 营地地址 -->
      <div class="mui-input-row site site_location">
        <span class="color_red">*</span>
        <span class="lable">营地地址</span>
        <div @click="hide('regionCompany')" class="inmap"
             :style="prams.regionCompany!=''?'color:#000':''">
          <div style="height: 100%;width: 100%; color: #333" @click="openMap">
            <selectposition v-if="isMap" @goBack="goBack" @positon="positon"></selectposition>
            {{prams.regionViews===''?'请选择营地地址':prams.regionViews}}
            <span class="icon_position"></span>
          </div>
        </div>
      </div>
      <div class="warning_text" v-show="youlaiFlag.regionCompany">请选择营地地址</div>
      <!-- 联系电话 -->
      <div class="mui-input-row site site_phone">
        <span class="color_red">*</span>
        <span class="lable">联系电话</span>
        <input
          id="phone"
          type="text"
          oninput="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
          class="mui-input-clear"
          v-model="prams.consultPhone"
          v-on:focus="hide('phone')"
          placeholder="请填写营地的咨询电话"
        >
      </div>
      <div class="warning_text" v-show="youlaiFlag.phone">请完善联系电话</div>
      <!-- 营地介绍 -->
      <div class="mui-input-row site site_introduce">
        <span class="color_red">*</span>
        <span class="lable">营地介绍</span>
      </div>
      <div class="textarea_box">
        <textarea
          id="yingdi"
          class="textarea mui-content"
          rows="5"
          placeholder="请输入营地介绍内容（300字内）"
          spellcheck="false"
          data-gramm="false"
          style="line-height: 21px;"
          v-on:focus="hide('descriptions')"
          v-model="prams.descriptions"
        ></textarea>
      </div>
      <div class="warning_text" v-show="youlaiFlag.descriptions">请输入营地介绍</div>
      <!-- 基础服务 -->
      <div class="site site_introduce">
        <span class="color_red">*</span>
        <span class="lable">基础服务</span>
        <span class="site_introduce_text">选择营地支持的基础服务</span>
      </div>
      <ul class="basic_service clearfix">
        <li
          v-for="(item,index) in serviesList"
          :class="{checked:prams.tabs.includes(index+1)}"
          @click="serviceCheckedBox(index+1,item.name)"
          :key="index"
        >
          <div>{{item.name}}</div>
        </li>
      </ul>
      <!-- 娱乐设施  -->
      <div class="mui-input-row site site_introduce">
        <span class="color_red">*</span>
        <span class="lable">娱乐设施</span>
        <span class="site_introduce_text">选择营地支持的娱乐设施</span>
      </div>
      <ul class="basic_service clearfix">
        <li
          v-for="(item,index) in recreationalList"
          :class="{checked:prams.tabs.includes(index+22)}"
          @click="serviceCheckedBox(index+22,item.name)"
          :key="index"
        >
          <div>{{item.name}}</div>
        </li>
      </ul>
      <!-- 收费标准 -->
      <div class="mui-input-row site site_introduce">
        <span class="color_red">*</span>
        <span class="lable">收费标准</span>
      </div>
      <div class="textarea_box">
        <textarea
          id="shoufei"
          class="textarea mui-content"
          rows="5"
          placeholder="请输入营地收费内容"
          spellcheck="false"
          data-gramm="false"
          style="line-height: 21px;"
          v-model="prams.cost"
          v-on:focus="hide('introduce')"
        ></textarea>
      </div>
      <div class="warning_text" v-show="youlaiFlag.introduce">请完善收费标准</div>
      <!-- 上传营地图片 -->
      <div class="mui-input-row site site_img">
        <span class="color_red">*</span>
        <span class="lable">上传营地照片</span>
        <!-- <router-link class="add_img_btn" to="/selectposition"> -->
        <div class="add_img_btn" @click="selectImgType = true">
          <span class="camera"></span>
          <span class="color_red">&nbsp;&nbsp;添加照片</span>
        </div>
      </div>
      <!-- 户外照片 -->
      <div v-for="(title,key) in imgList" v-if="title && title.length > 0">
        <div class="mentou">
          <div class="text">{{key}}</div>
        </div>
        <div class="img_box clearfix">
          <div class="img_box_inner" v-for="(item,index) in title">
            <span class="icon" @click="deleteImg(title,index)"></span>
            <img :key="index" :src="process_env+item.url">
          </div>
        </div>
      </div>
      <div class="padding_bottom"></div>
      <!--      上传按钮-->
      <div class="mui-button-row">
        <button
          type="submit"
          class="btn mui-btn mui-btn-success mui-btn-block"
          onclick="return false;"
          @click="submit"
        >保存
        </button>
      </div>

    </form>
    <cube-popup type="my-popup" ref="myPopup4">
      <div class="sesscuseMoudle">
        <div class="icon"></div>
        <p class="text">上传成功</p>
      </div>
    </cube-popup>
    <select-img-type :close="close" v-if="selectImgType" v-on:selectImgUrl="selectImgUrl"></select-img-type>
  </div>
</template>

<script>
  import selectimgtype from "../components/selectimgtype";
  import selectposition from './selectposition'

  export default {
    components: {
      selectImgType: selectimgtype,
      selectposition: selectposition
    },
    data() {
      return {
        isMid: {},
        process_env: process.env.VUE_APP_SERVICE_IMAGES_URL,
        isMap: false,
        imgUrl: {
          mentouImg: [],
          outdoorImg: []
        },
        imgTitle: ['门头', '户外', '住宿', '美食', '配套设施', '娱乐设施'],
        imgList: {},
        selectImgType: false,
        positionImg: this.$store.state.positionImg,
        mentouImg: [],
        outdoorImg: [],
        options: [
          {
            value: "2",
            label: "游莱驿"
          },
          {
            value: "3",
            label: "游莱家"
          }
        ],
        value: "",
        prams: {
          name: '',//营地名称
          coordinate: "", //坐标
          coordinateX: '', //坐标
          coordinateY: '', //坐标
          regionCompany: '',
          regionView: '请选择营地地址',//地址
          mContacts: "", //联系人
          phone: "", //联系电话
          descriptions: "", //介绍
          cost: "", //收费标准
          tabnames: [],//基础服务，娱乐设施标签名
          tabs: [], //基础服务，娱乐设施标签id
          regionProvince: '',  //所属省份
          regionCity: '',//所属城市
          regionArea: '',//所属区
          mid: false,
          images: '',
          consultPhone: '',
          regionViews: '请选择营地地址',
          lnglat: {}
        }, //营地上传对象
        images: {}, //图片
        // siteName: "", //名称
        coordinate: "", //坐标
        regionCompany: "请选择营地地址", //地址
        tabnames: [],//基础服务，娱乐设施标签名
        tabs: [], //基础服务，娱乐设施标签id
        regionProvince: '',//省份
        regionCity: '',//城市
        regionArea: '',//区
        companyCity: '',//公司所在城市
        serviceArr: [], //基础服务事件
        recreationalArr: [], //娱乐设施事件
        serviesList: [
          {
            'mid': '1',
            'name': '房车营位'
          },
          {
            'mid': '2',
            'name': '自驾车位'
          },
          {
            'mid': '3',
            'name': '旅馆住宿'
          },
          {
            'mid': '4',
            'name': '帐篷住宿'
          },
          {
            'mid': '5',
            'name': '房车住宿'
          },
          {
            'mid': '6',
            'name': '水电桩'
          },
          {
            'mid': '7',
            'name': '餐厅'
          },
          {
            'mid': '8',
            'name': '供电'
          },
          {
            'mid': '9',
            'name': '供水'
          },
          {
            'mid': '10',
            'name': '便利店'
          },
          {
            'mid': '11',
            'name': '洗衣店'
          },
          {
            'mid': '12',
            'name': '沐浴间'
          },
          {
            'mid': '13',
            'name': '卫生间'
          },
          {
            'mid': '14',
            'name': '公共厨房'
          },
          {
            'mid': '15',
            'name': 'Wi-Fi'
          },
          {
            'mid': '16',
            'name': '烧烤'
          },
          {
            'mid': '17',
            'name': '有线电视'
          },
          {
            'mid': '18',
            'name': '监控设备'
          },
          {
            'mid': '19',
            'name': '急救中心'
          },
          {
            'mid': '20',
            'name': '可带宠物'
          },
          {
            'mid': '21',
            'name': '户外用品'
          }
        ],//服务列表
        recreationalList: [
          {
            'mid': '22',
            'name': '儿童乐园'
          },
          {
            'mid': '23',
            'name': '垂钓'
          },
          {
            'mid': '24',
            'name': '水上运动'
          },
          {
            'mid': '25',
            'name': '蔬果采摘'
          },
          {
            'mid': '26',
            'name': 'KTV'
          },
          {
            'mid': '27',
            'name': '户外拓展'
          },
          {
            'mid': '28',
            'name': '真人CS'
          },
          {
            'mid': '29',
            'name': '球类运动'
          },
          {
            'mid': '30',
            'name': '电影放映'
          },
          {
            'mid': '31',
            'name': '亲自乐园'
          },
          {
            'mid': '32',
            'name': '汽车越野'
          }
        ],//娱乐列表
        youlaiFlag: {
          youlaitType: false,
          name: false,
          regionCompany: false,
          mContacts: false,
          phone: false,
          descriptions: false,
          introduce: false
        }
      };
    },
    methods: {
      selectImgUrl(data) {
        let imgUrl = data;
        if (imgUrl) {
          this.imgList['门头'] = this.imgList['门头'] ? this.imgList['门头'].concat(imgUrl['mentouImg']) : imgUrl['mentouImg']
          this.imgList['美食'] = this.imgList['美食'] ? this.imgList['美食'].concat(imgUrl['meishiImg']) : imgUrl['meishiImg']
          this.imgList['户外'] = this.imgList['户外'] ? this.imgList['户外'].concat(imgUrl['outdoorImg']) : imgUrl['outdoorImg']
          this.imgList['配套设施'] = this.imgList['配套设施'] ? this.imgList['配套设施'].concat(imgUrl['peitaoImg']) : imgUrl['peitaoImg']
          this.imgList['娱乐设施'] = this.imgList['娱乐设施'] ? this.imgList['娱乐设施'].concat(imgUrl['yuleImg']) : imgUrl['yuleImg']
          this.imgList['住宿'] = this.imgList['住宿'] ? this.imgList['住宿'].concat(imgUrl['zhusuImg']) : imgUrl['zhusuImg']
          imgUrl['mentouImg'] = []
          imgUrl['meishiImg'] = []
          imgUrl['outdoorImg'] = []
          imgUrl['peitaoImg'] = []
          imgUrl['yuleImg'] = []
          imgUrl['zhusuImg'] = []
        }
      },
      positon(e) {
        event.stopPropagation()
        this.prams.regionViews = e.name
        // this.prams.regionViews
        this.prams.lnglat = JSON.stringify({lng: e.lng, lat: e.lat})
        // this.prams.LngLat=e.lat
        this.isMap = false
      },
      goBack: function () {
        event.stopPropagation()
        this.isMap = false
      },
      openMap() {
        event.stopPropagation()
        this.isMap = true
      },
      hide(value) {
        event.stopPropagation()
        this.youlaiFlag[value] = false
      },
      close() {
        this.selectImgType = false;
      },
      deleteImg(imgUrl, index) {
        imgUrl.splice(index, 1)
      },
      back() {
        this.$router.go(-1);
      },
      showPopup() {
        const component = this.$refs.myPopup4
        component.show()
        setTimeout(() => {
          component.hide()
          this.$router.push({path: '/'})
        }, 5000)
      },
      serviceCheckedBox(index, name) {
        if (this.prams.tabs.includes(index)) {
          const indexT = this.prams.tabs.indexOf(index)
          this.prams.tabs.splice(indexT, 1)
          this.prams.tabnames.splice(indexT, 1)
        } else {
          this.prams.tabs.push(index)
          this.prams.tabnames.push(name)
        }
      },
      init() {
        this.$axios.get('http://106.12.163.166:8000/h5/youlaYi/view', {params: this.isMid}).then(res => {
          let result = res.data
          console.log('result', result)
          this.prams = result
          this.prams.tabs = result.tabs ? (result.tabs).split(',').map(Number) : []
          if (result.images) {
            this.imgList = JSON.parse(result.images)
          }
          // this.prams.tabnames = result.tabnames ? JSON.parse(result.tabnames) : []
          this.prams.tabnames = result.tabnames ? result.tabnames.split(',') : []
          // this.prams.tabs = tabsArray
          // let tabs = [...this.prams.tabs]
          // console.log('tabs',tabs)
          // this.prams.tabs.splice(0,this.prams.tabs.length)
          // for (let i = 0; i < tabs.length; i++) {
          //   if (tabs[i] === true) {
          //     this.prams.tabs.push(i + 1)
          //   }
          // }
        })
      },
      submit() {
        this.prams.images = JSON.stringify(this.imgList);
        this.prams.name || (this.youlaiFlag.name = true)
        if (!this.prams.regionView || this.prams.regionView == '请选择营地地址') {
          this.youlaiFlag.regionCompany = true
        }
        if (!this.prams.mContacts) {
          this.youlaiFlag.mContacts = true
        }
        if (this.prams.phone == '') {
          this.youlaiFlag.phone = true
        }
        if (this.prams.descriptions == '') {
          this.youlaiFlag.descriptions = true
        }
        if (this.prams.cost === undefined) {
          this.youlaiFlag.introduce = true
        }
        let params = this.prams
        params.tabs = params.tabs.join(',');
        params.tabnames = (params.tabnames).toString()
        params.updateTime = new Date().format('yyyy-MM-dd hh:mm:ss')
        delete params.signingTime
        console.log(params)
        this.$axios.post("http://106.12.163.166:8000/h5/youlaYi/update", params).then(result => {
          if (result) {
            this.showPopup()
          }
        }).catch((err) => {
          this.$createDialog({
            type: 'alert',
            title: '',
            content: err
          }).show()
        })
      },
    },
    created() {
      this.imgList = {}
      this.prams.mid = this.$route.query.id ? this.$route.query.id : this.$route.query.mid
      this.isMid = this.$route.query.id ? {id: this.$route.query.id} : {mid: this.$route.query.mid}
      if (this.prams.mid) {
        this.init()
      } else {
        this.$router.push({path: '/'})
      }
    },
  };
</script>


<style>
  cube-picker-title {
    font-size: 40px !important;
    line-height: 1 !important;
  }

  .imgdemo {
    position: absolute;
    z-index: 999999;
    background-color: #fff;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    float: left;
    width: 162px;
    height: 122px;
    margin-left: 20px;
    margin-bottom: 20px;
    display: block;
  }

</style>
<style lang="scss" scoped>
  .add_position {
    .lable {
      display: inline-block;
      width: 200px;
      padding-left: 5px;
    }

    .mui-bar {
      height: 80px;
      // padding: 65px 0 0 0;
      padding: 0;
      border-bottom: 1px solid #eeeeee;
      box-shadow: none;
      background-color: #fff;

      .mui-title {
        z-index: 999;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 65px;
        line-height: 64px;
        font-size: 36px;
        // font-weight: 900;
        // background-color: red;
      }

      .callback {
        z-index: 9999;
        top: 25px;
        margin: 0 0 0 40px;
        width: 40px;
        height: 40px;
        border: none;
        // background-color: red;
        background-image: url(../../public/img/btn/btn_callback.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .callback:active {
        background-color: #fff !important;
      }
    }

    .mui-input-group {
      /*background-color: #fff;*/
      padding-bottom: 0;
    }

    .bottombgc {
      position: absolute;
      width: 100%;
      height: 100px;
    }

    form {
      margin-top: 60px;
      padding-bottom: 100px;
      position: absolute;
      width: 100%;
      // height: 100%;
      background-color: #f6f6f6;

      .warning_text {
        height: 28px;
        text-align: right;
        padding-right: 40px;
        color: #ff6e4d;
        line-height: 28px;
        background-color: #fff;
        position: relative;
        z-index: 0;
        font-size: 24px;
        bottom: 26px;
      }

      .site {
        height: 89px;
        width: 100%;
        padding: 0 40px;
        line-height: 89px;
        font-size: 28px;
        background-color: #ffffff;
        border-bottom: 2px solid rgba(242, 242, 242, 1);


        label {
          width: 133px;
          height: 89px;
          padding: 0;
          line-height: 89px;
          // font-size: 28px;
        }

        input {
          width: 445px;
          height: 100%;
          font-size: 28px;
          color: #333333;
        }
      }

      .site_type {
        position: relative;
        /*margin-bottom: 20px;*/
        border: none;

        .el-select {
          position: absolute;
          z-index: 999;
          right: 40px;

          :-moz-placeholder {
            text-align: right;
            font-size: 28px;
          }

          ::-moz-placeholder {
            text-align: right;
            font-size: 28px;
          }

          ::-webkit-input-placeholder {
            text-align: right;
            font-size: 28px;
          }

          input {
            font-size: 28px !important;
          }
        }

        .cube-select {
          position: absolute;
          line-height: 70px;
          width: 66%;
          z-index: auto;
          font-size: 28px;
          top: 0;
          left: 200px;
        }

        .icon {
          position: absolute;
          right: 40px;
          top: 50%;
          width: 12px;
          height: 20px;
          margin-top: -10px;
          // background-color: skyblue;
          background-image: url(../../public/img/btn/enter.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .cube-select::after {
          border: none;
        }
      }

      .site_name {
        margin-top: 20px;
      }

      .site_location {
        .inmap {
          position: relative;
          float: right;
          width: 445px;
          height: 88px;
          color: #ccc;

          .icon_position {
            position: absolute;
            right: 0;
            top: 50%;
            width: 12px;
            height: 20px;
            margin-top: -10px;
            // background-color: skyblue;
            background-image: url(../../public/img/btn/enter.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .site_phone {
        border: none;
        margin-bottom: 20px;
      }

      .site_introduce {
        .site_introduce_text {
          float: right;
          margin: 0;
          color: #999999;
          font-size: 24px;
          text-align: right;
        }
      }

      .site_img {
        label {
          width: 200px;
        }

        .add_img_btn {
          float: right;
          width: 200px;
          height: 100%;
          border: none;
          text-align: right;

          .camera {
            display: inline-block;
            position: relative;
            top: 10px;
            width: 40px;
            height: 40px;
            color: #f1474b;
            // background-color: red;
            background-image: url(../../public/img/addposition/camera.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    .sesscuseMoudle {
      width: 175px;
      height: 160px;
      padding-top: 25px;
      background-color: #000;
      opacity: 0.6;
      border-radius: 20px;

      .icon {
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border-radius: 50%;
        background-image: url(../../public/img/icons/suceese.png);
        background-repeat: no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }

      p {
        height: 28px;
        text-align: center;
        font-size: 28px;
        margin-top: 20px;
        color: #fff;
      }
    }

    .textarea_box {
      width: 100%;
      margin-bottom: 20px;
      padding: 40px;
      background-color: #fff;
    }

    .textarea {
      display: block;
      font-size: 28px;
      // border: 1px solid #ccc;
      background-color: #f6f6f6;
    }

    .basic_service {
      width: 100%;
      padding: 10px 10px;
      margin: 0 10px 10px 20px;
      margin: 0 !important;
      text-align: center;
      background-color: #fff;

      li {
        float: left;
        width: 23%;
        margin: 10px 1%;
        color: #ccc;
        border: 1px solid #ccc; /*no*/
        border-radius: 10px;
        // background-color: red;
        div {
          // width: 100%;
          padding: 20px 0;
          // color: #999999;
          font-size: 24px;
        }

        li.checked {
          background-color: #f1474b;
          color: #fff !important;
          border: 1px solid #fff !important; /*no*/
        }
      }
    }

    .mentou {
      padding: 10pt;
      background-color: #fff;

      .text {
        height: 30px;
        line-height: 32px;
        font-size: 28px;
        border-left: 2px solid #f1474b; /*no*/
      }
    }

    .padding_bottom {
      height: 100px;
      background-color: #ffffff;
    }


    .img_box {

      width: 100%;

      .img_box_inner {
        position: relative;
        float: left;
        width: 162px;
        height: 122px;
        margin: 0 0 20px 20px;

        .icon {
          position: absolute;
          right: 0;
          width: 24px;
          height: 24px;
          background-image: url(../../public/img/addimg/delete.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        img {
          float: left;
          width: 162px;
          height: 122px;
        }
      }

    }

    .mentou_list {
      background-color: #fff;
    }

    .btn {
      /*position: fixed;*/
      width: 90%;
      /*bottom: 30px;*/
      /*left: 50%;*/
      font-size: 32px;
      border: none;
      border-radius: 44px;
      background: linear-gradient(90deg, #ff6e4d, #f1474b);
    }
  }

  .color_red {
    color: #f1474b;
    font-size: 28px;
  }

  .mui-input-group .mui-input-row:after {
    background-color: #fff;
  }

  .el-select-dropdown__item {
    font-size: 28px;
  }

  .aa {
    position: fixed;
    z-index: 9999;
    height: 64px; /*no*/
    width: 100px; /*no*/
    top: 0;
    background-color: skyblue;
  }

  li.checked {
    background-color: #f1474b;
    color: #fff !important;
    border: 1px solid #fff !important; /*no*/
  }

  .mui-button-row {
    height: 100% !important;
    padding-bottom: 80px;
    background: #fff;

    .btn {
      margin: 0 auto;
    }

    /*padding: 0;*/
  }
</style>

