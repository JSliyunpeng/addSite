<template>
  <div>
    <div class="details" v-show="detailsShow">
      <div id="header" class="mui-bar mui-bar-nav" style="position: fixed">
        <h1 class="mui-title">营地详情</h1>
        <button @click="back" class="callback"></button>

        <!--        <button class="edit mui-pull-left" @click="toAddMerchant"></button>-->
      </div>
      <swiper v-if="detialObj.lbts" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(slide, index) in detialObj.lbts" :key="index">
          <img :src="process_env + slide.url" alt>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="content">
        <div class="title_box">
          <div class="title">
            <h4 class="title_text">{{detialObj.name}}</h4>
            <span class="title_icon"></span>
            <p class="title_distance">距您{{$route.query.distance}}km</p>
          </div>
        </div>
        <!-- 介绍 -->
        <div class="introduce">
          <div class="headline">介绍</div>
          <p class="introduce_text">{{detialObj.descriptions}}</p>
        </div>
        <!-- 服务 -->

        <!-- 服务 -->
        <div class="server_headline">服务</div>
        <!--      基础服务-->
        <div class="server" :class="{'server_height':serveListShow=== false}">
          <div class="arial">{{serverList[0].name}}</div>
          <ul class="server_list clearfix">
            <li v-for="(list,index) in serverList[0].list" :key="index">
              <div v-if="tabs.includes(parseInt(serverList[0].list[index].mid))">
                <img :src="require('@/assets/img/detial/homeFuwuicon'+  (list.mid - 1)  + '@3x.png')" alt="">
                <span>{{list.name}}</span>
              </div>
              <div v-else style="color: #ccc">
                <img :src="require('@/assets/img/detial/homeFuwuiconhui'+  (list.mid - 1)  + '@3x.png')" alt="">
                <span>{{list.name}}</span>
              </div>
            </li>
          </ul>
        </div>
        <!--      娱乐服务-->
        <div class="server" v-show="serveListShow">
          <div class="arial">{{serverList[1].name}}</div>
          <ul class="server_list clearfix">
            <li v-for="(list,index) in serverList[1].list" :key="index">
              <div v-if="tabs.includes(parseInt(serverList[1].list[index].mid))">
                <img :src="require('@/assets/img/detial/homeFuwuicon'+  (list.mid - 1)  + '@3x.png')" alt="">
                <span>{{list.name}}</span>
              </div>
              <div v-else style="color: #ccc">
                <img :src="require('@/assets/img/detial/homeFuwuiconhui'+  (list.mid - 1)  + '@3x.png')" alt="">
                <span>{{list.name}}</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 收起服务 -->
        <div class="up_server" @click="serveListShow=!serveListShow">{{serveListShow?'收起所有服务':'展开所有服务'}}</div>
        <!-- 收费标准 -->
        <div class="server">
          <div class="headline">收费标准</div>
          <div class="arial clear-fix">{{detialObj.cost}}</div>
        </div>
        <!-- 营地图片 -->
        <div class="camp_img_title server headline">
          营地图片
          <div class="camp_img_all" @click="showImgAll">
            查看全部
            <span class="camp_img_all_icon"></span>
          </div>
        </div>
        <ul class="camp_img_content clearfix">
          <li v-for="(slide, index) in detialObj.lbts" :key="index">
            <img class="img" :src="process_env+slide.url"></img>
            <span class="text">{{slide.name}}</span>
          </li>
        </ul>
        <!-- 地图导航 -->
        <div class="server map_nav">
          <div class="headline">地图导航</div>
        </div>
        <div class="map_map">
          <div class="detial_map_box">
            <div class="detial_map">
              <p class="position">{{detialObj.regionViews}}</p>
              <!--禁止地图拖动填充层-->
              <div class="filling_layer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="all_img" v-show="imgAllShow">
      <div class="title">
        <div class="title_inner">
          <span @click="showImgAll"></span>
          <h1>营地图片</h1>
        </div>
      </div>
      <div v-for="(listImages,listImagesIndex) in detialObj.listImage" :key="listImagesIndex">
        <div class="all_img_list">
          <div class="name">
            {{listImages.name}}
          </div>
          <img @click="detialImgClk(listImagesIndex)" v-for="(img,imgIndex) in listImages.list"
               :src="process_env+img.url" :key="imgIndex" alt="">
        </div>
      </div>
    </div>

    <div class="img_detial" v-show="imgDetialShow">
      <span @click="imgDetialShow=false;imgAllShow=true" class="back"></span>
      <swiper class="img_detial_siper" v-if="imgDetialObj.length>0" :options="imgswiperOption" ref="mySwiper">
        <swiper-slide v-for="(slide, index) in imgDetialObj" :key="index">
          <img style="width: 100%;height: 100%" :src="process_env + slide.url" alt>
        </swiper-slide>
        <div class="img-swiper-pagination" slot="pagination"></div>
      </swiper>
      <ul class="lists">
        <li @click="detialImgClk(0)" :class="imglistIndex==0?'list_active':'list'">门头</li>
        <li @click="detialImgClk(1)" :class="imglistIndex==1?'list_active':'list'">户外</li>
        <li @click="detialImgClk(2)" :class="imglistIndex==2?'list_active':'list'">娱乐</li>
        <li @click="detialImgClk(3)" :class="imglistIndex==3?'list_active':'list'">住宿</li>
        <li @click="detialImgClk(4)" :class="imglistIndex==4?'list_active':'list'">配套</li>
        <li @click="detialImgClk(5)" :class="imglistIndex==5?'list_active':'list'">美食</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import map from '../components/map'
  import {MapLoader, initMap} from '../../common/map'

  export default {
    name: "carrousel",
    components: {
      vMap: map
    },
    data() {
      return {
        process_env:process.env.VUE_APP_SERVICE_IMAGES_URL,
        distance: '',
        mid: '',
        detialObj: {},
        // swiperOption: {
        //   initialSlide: 1, //设定初始化时slide的索引。
        //   direction: "horizontal", //Slides的滑动方向，可设置水平(Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。)或垂直(vertical)。
        //   speed: 2000, //切换速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间。
        //   grabCursor: true, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
        //   // loop: true, //循环轮播
        //   // autoplay: {
        //   //   //自动切换
        //   //   delay: 2000,
        //   //   disableOnInteraction: false
        //   // },
        //   navigation: {
        //     //前进后退按钮
        //     nextEl: ".swiper-button-next",
        //     prevEl: ".swiper-button-prev"
        //   },
        //   pagination: {
        //     //分页器
        //     el: ".swiper-pagination",
        //     type: "fraction"
        //   }
        // },
        swiperSlides: [1, 2, 3, 4, 5],
        swiperOption: {
          direction: "horizontal", //Slides的滑动方向，可设置水平(Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。)或垂直(vertical)。
          speed: 1000, //切换速度
          loop: true, //循环轮播
          // autoplay:true,
          autoplay: {
            //自动切换
            delay: 2000,
            stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
            disableOnInteraction: false
          },
          navigation: {
            //前进后退按钮
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          pagination: {
            //分页器
            el: ".swiper-pagination",
            type: "fraction"
          }
        },
        imgswiperOption: {
          direction: "horizontal", //Slides的滑动方向，可设置水平(Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。)或垂直(vertical)。
          // loop:true,
          pagination: {
            //分页器
            el: ".img-swiper-pagination",
            type: "fraction"
          }
        },
        serveListShow: false,
        imgAllShow: false,
        tabs: [],
        imglistIndex: 1,
        detailsShow: true,
        imgDetialShow: false,
        imgDetialObj: [],
        serverList: [
          {
            name: '基础服务',
            list: [
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
            ],
          },
          {
            name: '娱乐设施',
            list: [
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
            ]
          }
        ],
      };
    },
    methods: {
      toAddMerchant() {
        this.$router.push({path: '/addMerchant', query: {id: this.mid}})
      },
      detialImgClk(val) {
        this.imglistIndex = val
        this.imgDetialObj = this.detialObj.listImage[val] ? this.detialObj.listImage[val].list : []
        this.imgDetialShow = true
        this.imgAllShow = false
      },
      showImgAll() {
        if (this.detailsShow) {
          this.detailsShow = false
          this.imgAllShow = true
        } else {
          this.detailsShow = true
          this.imgAllShow = false
        }
      },
      back() {
        // this.$router.go(-1);
        this.$store.commit('toptabbarActiveIndex', 0)
        this.$router.go(-1);
      },
      // showImgAll() {
      //   if (this.detailsShow) {
      //     this.detailsShow = false
      //     this.imgAllShow = true
      //   } else {
      //     this.detailsShow = true
      //     this.imgAllShow = false
      //   }
      // }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {
      this.mid = this.$route.query.id
      this.distance = this.$route.query.distance
      this.$axios.get('http://106.12.163.166:8000/h5/youlaYi/view', {params: {id: this.mid}}).then(result => {
        this.detialObj = result.data
        console.log('this.detialObj',this.detialObj)
        this.detialObj.lbts = []
        this.detialObj.listImage = []
        let images = JSON.parse(this.detialObj.images)
        if (images) {
          for (let key in images) {
            this.detialObj.listImage.push({name: key, list: images[key]})
            if(images[key].length>0){
              this.detialObj.lbts.push({name: key, url: images[key][0].url ? images[key][0].url : ''})
            }
          }
        }
        // for(let key in JSON.parse(this.detialObj.images)){
        //   this.detialObj.listImage.push({name:key,list:JSON.parse(this.detialObj.images)[key]})
        //   this.detialObj.lbts.push({name:key,url:JSON.parse(this.detialObj.images)[key][0].url})
        // }
        if(this.detialObj.tabs.length>0){
          console.log('this.tabs',this.tabs)
          this.tabs = (this.detialObj.tabs).split(',').map(Number) ? (this.detialObj.tabs).split(',').map(Number) : []
        }
      })
    },
    mounted() {
      let setTime = setInterval(() => {
        // if (this.detialObj.coordinateX) {
        clearInterval(setTime)
        this.mapBox = document.querySelector(".detial_map_box");
        let map = initMap(AMap, this.mapBox);
        let that = this;
        MapLoader().then(
        AMap => {
          if(that.detialObj.lnglat) {
            let lng = (JSON.parse(that.detialObj.lnglat)).lng
            let lat = (JSON.parse(that.detialObj.lnglat)).lat
            let position = new AMap.LngLat(lng, lat);  // 标准写法
            map.setCenter(position);

            var endIcon = new AMap.Icon({
              size: new AMap.Size(58, 65),
              image: require('../../public/img/map/position_icon_click.png'),
              imageSize: new AMap.Size(58, 65),
              // imageOffset: new AMap.Pixel(-95, -3)
            });

            let marker = new AMap.Marker({
              position: new AMap.LngLat(lng, lat),
              offset: new AMap.Pixel(-10, -10),
              icon: endIcon, // 添加 Icon 图标 URL
              title: '北京'
            });
            map.add(marker);
          }

        },
        e => {
          console.log("地图加载失败", e);
        }
        )
        // }
      }, 1000)

    }
  };
</script>

<style lang="scss" scoped>
  .details {
    .mui-bar {
      position: absolute;
      z-index: 999;
      top: 0;
      left: 0;
      height: 80px;
      padding: 0;
      border-bottom: 1px solid #eeeeee; /*no*/
      box-shadow: none;
      background-color: #fff;
      // background-color: pink;
      .mui-title {
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 65px;
        line-height: 64px;
        font-size: 36px;
      }

      .callback {
        top: 25px;
        width: 40px;
        height: 40px;
        margin: 0 0 0 30px;
        border: none;
        background-image: url(../../public/img/btn/btn_callback.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .edit {
        float: right;
        top: 72px;
        width: 40px;
        height: 40px;
        margin: 0 36px 0 0;
        border: none;
        background-image: url(../../public/img/btn/edit.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }

    .swiper-container {
      margin-top: 80px;
      width: 100%;
      height: 562px;
      // background-color: pink;
      .swiper-slide {
        // background-color: hotpink;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .swiper-pagination-fraction {
        width: 80px;
        height: 44px;
        line-height: 44px;
        opacity: 0.6;
        color: #fff;
        font-size: 28px;
        border-radius: 22px;
        background: rgba(0, 0, 0, 1);
      }
    }

    .content {
      width: 100%;
      padding: 20px 0 0 0;
      // background-color: pink;
      .title_box {
        padding: 0px 40px 0 40px;

        .title {
          width: 100%;
          height: 146px;
          border-bottom: 1px solid #eeeeee; /*no*/
          // background-color: skyblue;
          .title_text {
            height: 75px;
            margin: 0;

            line-height: 75px;
            font-size: 36px;
            font-weight: 600;
            // background-color: hotpink;
          }

          .title_icon {
            display: inline-block;
            width: 112px;
            height: 32px;
            padding-left: 40px;
            border-radius: 6px;
            background-image: url(../../public/img/site/position_type.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .title_distance {
            display: inline-block;
            float: right;
            height: 24px;
            color: #999999;
            font-size: 24px;
            line-height: 24px;
          }
        }
      }

      .introduce {
        padding: 0px 40px 0 40px;

        .introduce_text {
          // width: 671px;
          // height: 123px;
          font-size: 28px;
          font-family: "PingFangSC-Regular";
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 48px;
        }
      }

      .server_headline {
        height: 64px;
        font-size: 32px;
        font-family: PingFangSC-Medium;
        padding-left: 40px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 64px;
      }

      .server {
        padding: 0px 40px 0 40px;
      }

      .hidden_serve {
        height: 0;
      }

      .server_list {
        padding-top: 20px;
        // padding: 20px 28px 0 28px;
        li {
          float: left;
          width: 20%;
          text-align: center;
          // padding-left: 1%;
          padding-bottom: 50px;
          font-size: 24px;

          img {
            display: block;
            width: 48px;
            height: 48px;
            margin: 0 auto;
            /*background-color: red;*/
            /*background-image: url(../../public/img/site/hotel.png);*/
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          span {
            margin-top: 13px;
            display: block;
            line-height: 30px;
          }
        }
      }

      .up_server {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-bottom: 27px;
        text-align: center;
        color: #4582ff;
        font-size: 28px;
      }

      .camp_img_title {
        margin-top: 40px;

        .camp_img_all {
          display: inline-block;
          float: right;
          width: 120px;
          height: 24px;
          color: #999999;
          font-size: 24px;

          .camp_img_all_icon {
            display: inline-block;
            /*background-color: red;*/
            width: 12px;
            height: 20px;
            background-image: url(../../public/img/btn/enter.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .camp_img_content {
        li {
          float: left;
          margin-left: 40px;
          margin-top: 40px;

          span {
            display: block;
            text-align: center;
          }

          .img {
            width: 196px;
            height: 148px;
          }

          .text {
            margin-top: 20px;
            font-size: 24px;
          }
        }
      }

      .map_nav {
        margin-top: 60px;
      }

      .map_map {
        position: relative;
        width: 674px;
        height: 380px;
        overflow: hidden;
        margin: 30px auto 68px auto;

        .detial_map_box {
          position: absolute;
          width: 774px;
          height: 580px;
          left: -100px;
          top: -200px;
          margin: 30px auto 68px auto;
        }
      }

      .detial_map {
        position: absolute;
        left: 0px;
        top: 80px;
        width: 774px;
        height: 460px;
        overflow: hidden;

        .filling_layer { // 填充层
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 2;
        }

        .position {
          position: absolute;
          left: 140px;
          bottom: 10px;
          z-index: 9999;
          width: 590px;
          height: 80px;
          padding-left: 20px;
          line-height: 80px;
          font-size: 24px;
          border-radius: 10px;
          background-color: #fff;
        }
      }

      .headline {
        // width: 61px;
        height: 64px;
        font-size: 32px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 64px;
      }

      .arial {
        /*height: 34px;*/
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 34px;
      }
    }

  }

  .all_img {
    position: absolute;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .title {
      position: fixed;
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #EEEEEE; /*no*/
      background-color: #fff;

      .title_inner {
        position: relative;
        height: 80px;
        line-height: 80px;
        text-align: center;

        span {
          position: absolute;
          left: 40px;
          top: 25px;
          width: 40px;
          height: 40px;
          /*background-color: red;*/
          background-image: url(../../public/img/btn/btn_callback.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        h1 {
          margin: 0;
          height: 94px;
          line-height: 80px;
          text-align: center;
        }
      }
    }

    .all_img_list {
      width: 100%;
      padding: 36px 20px 0 20px;

      .name {
        height: 32px;
        padding-left: 13px;
        font-size: 32px;
        line-height: 32px;
        border-left: 2px solid #F1474B; /*no*/
        /*background-color: red;*/
      }

      img {
        width: 315px;
        height: 236px;
        margin: 20px 20px 0 20px;
      }
    }

    .padding_80 {
      padding-top: 80px;
    }
  }

  .img_detial {
    position: absolute;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;

    .back {
      position: absolute;
      top: 65px;
      left: 30px;
      width: 40px;
      height: 40px;
      background-image: url(../../public/img/btn/btn_callback.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .img_detial_siper {
      height: 600px;
      margin-top: 40%;

      img {
        width: 100%;
      }
    }

    .lists {
      position: absolute;
      left: 50%;
      margin-left: -330px;
      bottom: 100px;

      .list {
        float: left;
        width: 100px;
        height: 44px;
        line-height: 44px;
        margin: 20px 5px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 255, 255, 1); /* no */
        border-radius: 32px;

      }

      .list_active {
        float: left;
        width: 100px;
        height: 44px;
        line-height: 44px;
        margin: 20px 5px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 1); /* no */
        background: rgba(255, 255, 255, 1);
        border-radius: 32px;

      }
    }
  }

  .server_height {
    height: 170px;
    overflow: hidden
  }
</style>
<style lang="scss">
  // 分页器位置
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    left: 85% !important;
    bottom: 20px;
  }

</style>


