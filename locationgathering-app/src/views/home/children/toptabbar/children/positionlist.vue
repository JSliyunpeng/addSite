<template>
  <div class="scroll-list-wrap">
    <cube-scroll ref="scroll" :data="siteList" :options="options" @pulling-up="onPullingUp">
      <ul>
        <li class="padding_top"></li>
        <li class="" v-for="(item,index) in siteList" :key="index">
          <router-link class="site" :to="{name:'details',query: {id:item.id,distance:item.distance}}">
            <img v-if="item.imagesF" class="site_img" :src="process_env+item.imagesF" alt>
            <img v-else class="site_img" :src="require('../../../../../../public/img/search/none_search.png')" alt>
            <div class="site_content">
              <h6 class="Site_title">{{item.name}}</h6>
              <div class="site_icon" v-show="item.tabshows">
                              <span :class="iconclass" v-show="(item.tabshows).includes(iconIndex+1)"
                                    v-for="(iconclass,iconIndex) in siteIconList"></span>
              </div>
              <p class="site_text">距您<span v-show="item.distanceShow">{{item.distance}}</span>千米</p>
              <div class="site_card"></div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="no_search" v-if="searchListLength">
        <div class="img"></div>
        <p class="text">没有找到匹配的搜索结果</p>
      </div>
    </cube-scroll>
    <v-toptabbartwo v-on:toType="typeValue" v-on:toQvyu="qvyuValue" v-on:resetSearch="resset" v-on:search="search"
                    :qvyulists="qvyulist"></v-toptabbartwo>
    <div class="city" @click="goCityList">城市</div>
    <v-indexlist v-on:toCloseIndexList="CloseIndexList" :indexLists="indexListObj" v-show="CityList"></v-indexlist>
    <div class="map" style="display: none"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import toptabbartwo from "@/components/toptabbartwo";
  import indexList from '@/components/indexlist'

  import {MapLoader, initMap} from "../../../../../../common/map";

  export default {
    data() {
      return {
        process_env:process.env.VUE_APP_SERVICE_IMAGES_URL,
        searchListLength: false,
        resLength: 10,
        city: '',
        siteList: [],
        CityList: false,
        page: 0,
        qvyulist: [{regionName: '全部'}],
        qvyu: '0',
        indexListObj: {
          location: {
            addressComponent: {
              city: '北京'
            }
          }
        },
        driving: {},
        lngLat: [],
        startLngLat: {lng: 113.620187, lat: 34.860162},
        siteIconList: ['hotel', 'petrol_station', 'toilet', 'washer', 'bathroom', 'store'],
        siteListParams: {
          condtion: {
            sort: 0,
            coordinateX: '',
            coordinateY: '',
            city: '',
            tab: '全部'
          },
          youlaitType: 0
        }
      };
    },
    components: {
      vToptabbartwo: toptabbartwo,
      vIndexlist: indexList
    },
    computed: {
      options() {
        return {
          pullUpLoad: {
            threshold: 50,
            stopTime: 1000,
            txt: {more: "上拉加载更多", noMore: "真的没有了"}
          },
          scrollbar: false,
          startY: 0
        };
      }
    },
    methods: {
      getSiteList() {
        this.$axios.get("http://106.12.163.166:8000/h5/youlaYi/list", {  //获取列表
          params: {
            condtion: {
              tab: this.siteListParams.condtion.tab,
              city: this.siteListParams.condtion.city,
              area: this.siteListParams.condtion.area
            },
            limit: 10,
            page: ++this.page,
            youlaitType: 2,
          }
        }).then(res => {
          let result = res.data
          let images = {}
          if(result.length>0){
            result.forEach(element => {
              images = JSON.parse(element.images)
              element.distanceShow = false
              element.tabshows = element.tabs ? ((element.tabs).split(',')).map(Number) : []
              if(images){
                for (let key in images) {
                  if(images[key].length>0){
                    element.imagesF = images[key][0].url
                    return
                  }

                }
              }

            })
          }
          this.siteList = this.siteList.concat(result)
          this.siteList.length > 0 ? this.searchListLength = false : this.searchListLength = true
          let that = this
          let time = setInterval(function () {
            if (AMap) {
              clearInterval(time)
              that.siteList.forEach(element => {
                let driving = new AMap.Driving({
                  // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                  policy: AMap.DrivingPolicy.LEAST_TIME
                })
                var startLngLat = [window.localStorage.getItem('startLng'), window.localStorage.getItem('startLat')]
                if (element.lnglat) {
                  let lnglat = JSON.parse(element.lnglat)
                  var endLngLat = [lnglat.lng, lnglat.lat]
                  driving.search(startLngLat, endLngLat, function (status, result) {
                    element.distanceShow = true
                    element.distance = ((result.routes[0].distance) / 1000).toFixed(2)
                  })
                }
              })
            }
          }, 500)

          if (result < 10) {
            this.$refs.scroll.forceUpdate()
          }
        })
      },
      goCityList() { //显示城市组件
        this.CityList = true
      },
      CloseIndexList(value) {  //获取区域列表
        this.qvyulist = [{regionName: '全部'}]
        this.CityList = value.show
        this.city = value.item
        if (value) {
          this.$axios.get('http://106.12.163.166:8000/gunsApi/region/list', {params: {pid: value.item.id}}).then(result => {
            (result.data.data.data).forEach(name => {
              this.qvyulist.push(name)
            })
          })
          this.siteListParams.condtion.area = ''
          this.siteListParams.condtion.city = value.item.id
          this.$axios.get('http://106.12.163.166:8000/gunsApi/youlaYi/list', {
            params: this.siteListParams,
          }).then(result => {
            this.siteList = result.data.data.data;
          })
        }

      },
      resset() {
        this.siteListParams.condtion.area = ''
        this.siteListParams.condtion.tab = '全部'
        this.siteListParams.condtion.city = this.city.id
        this.siteList=[]
        this.page = 0
        this.getSiteList()
        // this.$axios.get('/h5/youlaYi/list', {
        //   params: this.siteListParams,
        // }).then(result => {
        //   this.siteList = result.data;
        // })
      },
      search() {
        this.page = 0
        this.$axios.get('http://106.12.163.166:8000/h5/youlaYi/list', {
          params: {
            condtion: {
              tab: this.siteListParams.condtion.tab,
              city: this.siteListParams.condtion.city,
              area: this.siteListParams.condtion.area
            },
            limit: 10,
            page: ++this.page,
            youlaitType: 0
          },
        }).then(res => {
          // this.siteList = result.data;
          let result = res.data
          result.length > 0 ? this.searchListLength = false : this.searchListLength = true
          this.siteList = []
          let images = {}
          result.forEach(element => {
            images = JSON.parse(element.images)
            element.distanceShow = false
            element.tabshows = element.tabs ? ((element.tabs).split(',')).map(Number) : []
            for (let key in images) {
              if(images[key].length>0){
                element.imagesF = images[key][0].url
                return
              }
            }
          })
          this.siteList = this.siteList.concat(result)
          let that = this
          let time = setInterval(function () {
            if (AMap) {
              clearInterval(time)
              that.siteList.forEach(element => {
                let driving = new AMap.Driving({
                  // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                  policy: AMap.DrivingPolicy.LEAST_TIME
                })
                var startLngLat = [window.localStorage.getItem('startLng'), window.localStorage.getItem('startLat')]
                if (element.lnglat) {
                  let lnglat = JSON.parse(element.lnglat)
                  var endLngLat = [lnglat.lng, lnglat.lat]
                  driving.search(startLngLat, endLngLat, function (status, result) {
                    element.distanceShow = true
                    element.distance = ((result.routes[0].distance) / 1000).toFixed(2)
                  })
                }
              })
            }
          }, 500)
        })
      },
      typeValue(value) { //获取类型列表
        this.siteListParams.condtion.tab = value
        // this.$axios.get('/h5/youlaYi/list', {
        //   params: {condtion: {tab: value, city: this.qvyu},limit: 2,
        //     page: ++this.page,},
        // }).then(result => {
        //   this.siteList = result.data.data.data;
        // })
      },
      qvyuValue(value) {
        this.qvyu = value
        if (value.id) {
          this.siteListParams.condtion.city = ''
          this.siteListParams.condtion.area = value.id
          // this.$axios.get('/gunsApi/youlaYi/list', {
          //   params: this.siteListParams,
          // }).then(result => {
          //   this.siteList = result.data.data.data;
          // })
        } else {
          this.siteListParams.condtion.area = ''
          this.siteListParams.condtion.city = this.city.id
          // this.$axios.get('/gunsApi/youlaYi/list', {params: this.siteListParams}).then(result => {
          //   this.siteList = result.data.data.data
          // })
        }

      },
      onPullingUp() {// 上滑加载数据
        this.getSiteList()
      },
      initGeolocation() {
        let sessionStartLng = window.localStorage.getItem('startLng')
        if (sessionStartLng == null) {
          this.initMyMap()
        } else {
          this.getSiteList()
        }

      },
      initMyMap() {
        this.mapBox = document.querySelector(".map");
        initMap(AMap, this.mapBox);
        let that = this;
        MapLoader().then(
        AMap => {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认：true
            timeout: 1000, // 设置定位超时时间，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'  //  定位按钮的排放位置
          })
          geolocation.getCurrentPosition()  //定位到当前位置
          AMap.event.addListener(geolocation, 'complete', (data) => {// 具体的定位信息
            that.startLngLat = data.position
            window.localStorage.setItem('startLng', data.position.lng)
            window.localStorage.setItem('startLat', data.position.lat)
            that.siteListParams.condtion.coordinateX = that.startLngLat.lng
            that.siteListParams.condtion.coordinateY = that.startLngLat.lat
            that.$store.commit('startLngLat', that.startLngLat)
            that.getSiteList()
          }) //定位成功
          AMap.event.addListener(geolocation, 'error', (data) => {
            window.localStorage.setItem('startLng', that.startLngLat.lng)
            window.localStorage.setItem('startLat', that.startLngLat.lat)
            that.getSiteList()
          })
        },
        e => {
          console.log("地图加载失败", e);
        }
        )
      }
    },
    created() {
      this.$store.commit('tabbarActive', 0)
    },
    mounted() {
      // console.log(process.env.VUE_APP_BASE_API)
      // this.process_env=process.env.VUE_APP_SERVICE_IMAGES_URL
      this.initGeolocation()
    }
  };
</script>

<style lang="scss" scoped>
  .scroll-list-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 40px;
    // background-color: pink;
    ul {
      padding-bottom: 100px;

      .padding_top {
        padding-top: 210px;
        border: none;
      }

      li {
        border-bottom: 1px solid #eeeeee; /*no*/
        .site {
          display: block;
          padding: 40px 0;

          .site_img {
            float: left;
            width: 160px;
            height: 160px;
            background: rgba(255, 255, 255, 1);
            border-radius: 10px;
          }

          .site_content {
            width: 100%;
            height: 160px;
            padding-left: 190px;
            /*background-color: pink;*/
            .Site_title {
              height: 40px;
              line-height: 40px;
              margin: 0;
              color: #333333;
              font-size: 28px;
              font-weight: 900;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              /*background-color: skyblue;*/
            }

            .site_icon {
              margin: 5px 0 0 0;
              width: 100%;
              height: 32px;
              color: #ffcc00;

              span {
                display: inline-block;
                width: 32px;
                height: 32px;
                margin-right: 10px;
                // background-color: red;
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }

              .hotel {
                background-image: url(../../../../../../public/img/site/hotel.png);
              }

              .petrol_station {
                background-image: url(../../../../../../public/img/site/petrol_station.png);
              }

              .toilet {
                background-image: url(../../../../../../public/img/site/toilet.png);
              }

              .washer {
                background-image: url(../../../../../../public/img/site/washer.png);
              }

              .bathroom {
                background-image: url(../../../../../../public/img/site/bathroom.png);
              }

              .store {
                background-image: url(../../../../../../public/img/site/store.png);
              }
            }

            .site_text {
              color: #999999;
              font-size: 24px;
              padding-top: 15px;
            }

            .site_card {
              width: 112px;
              height: 32px;
              margin-top: 15px;
              background-image: url(../../../../../../public/img/site/position_type.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }

    .no_search {
      display: flex;
      position: absolute;
      z-index: 999;
      top: 128px;
      width: 100%;
      height: 100%;
      justify-content: center; /*子元素水平居中*/
      /*align-items: center; !*子元素垂直居中*!*/
      .img {
        width: 400px;
        height: 400px;
        margin: 100px auto 0 auto;
        background-image: url('../../../../../../public/img/search/none_search.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .text {
        position: absolute;
        font-size: 16px; /*no*/
        margin-top: 550px;
        color: #666666;
        font-weight: 700;
      }
    }

    .city {
      position: fixed;
      z-index: 999;
      top: 80px;
      left: 40px;
      font-size: 32px;
      color: #f1474b;
    }

    .city_content {

    }

  }
</style>
