<template>
  <div class="position_map">
    <v-map :pointList="pointList" :showcenterPonit="false" :isShowMap="isShowMap"
           v-on:toDetialShow="getDetialShow"></v-map>
    <transition name="fade">
      <div class="details" v-show="detialContent.name && $store.state.mapMiniCard">
        <div class="close" @click="close"></div>
        <router-link class="site" :to="{path:'/details',query:{id:detialContent.id,distance:detialContent.distance}}">
          <img class="site_img" v-if="detialContent.imagesF" :src="process_env+detialContent.imagesF" alt>
          <img class="site_img" v-else :src="require('../../../../../../public/img/search/none_search.png')" alt>
          <div class="site_content">
            <h6 class="Site_title">{{detialContent.name}}</h6>
            <div class="site_icon" v-if="detialContent.tabshows">
            <span :class="iconclass" v-show="(detialContent.tabshows).includes(iconIndex+1)"
                  v-for="(iconclass,iconIndex) in siteIconList"></span>
            </div>
            <p class="site_text">距您{{detialContent.distance}}千米</p>
            <div class="site_card"></div>
          </div>
        </router-link>
      </div>
    </transition>
  </div>
</template>
<script>
  import map from "@/components/map.vue";

  export default {
    components: {
      vMap: map
    },
    data() {
      return {
        process_env:process.env.VUE_APP_SERVICE_IMAGES_URL,
        pointList: [],
        detialShow: false,
        detialContent: {},
        imgUrl: '',
        isShowMap: false,
        siteIconList: ['hotel', 'petrol_station', 'toilet', 'washer', 'bathroom', 'store']
      };
    },
    methods: {
      getDetialShow(data) {
        this.detialShow = data.show
        this.$store.commit('mapMiniCard', true)
        this.detialContent = data.res
        // for (let key in JSON.parse(this.detialContent.images)) {
        //   this.detialContent.imagesF = JSON.parse(this.detialContent.images)[key][0].url
        //   return
        // }
      },
      close() {
        this.$store.commit('mapMiniCard', false)
        this.detialShow = false
      },
      getStr(value, startstr, endstr) {
        let groupInfo = JSON.stringify(value);
        let starts = groupInfo.indexOf(startstr);
        let ends = groupInfo.indexOf(endstr);
        start = start + 2;
        ends = ends - 1;
        let count = ends - starts;
        let numChar = "";
        for (let j = 0; j <= count; j++) {
          numChar = numChar + groupInfo.charAt(starts + j);
        }
        return numChar = numChar.replace(/(^\s*)|(\s*$)/g, "");
      },
      tabbarIndex() {
        this.$store.commit('toptabbarActiveIndex', 1)
      }
    },
    created() {
      this.tabbarIndex()
      this.$axios
      .get("http://106.12.163.166:8000/h5/youlaYi/list", {
        params: {
          condtion: {
            sort: 0,
            coordinateX: window.localStorage.getItem('startLng'),
            coordinateY: window.localStorage.getItem('startLat'),
          },
          youlaitType: 0
        }
      })
      .then(res => {
        let result = res.data;
        let images = {}
        result.forEach(element => {
          images = JSON.parse(element.images)
          element.distanceShow = false
          element.tabshows = element.tabs ? ((element.tabs).split(',')).map(Number) : []
          if (images) {
            for (let key in images) {
              if(images[key].length>0){
                element.imagesF = images[key][0].url
                return
              }
            }
          }
        })
        this.pointList = result
        let that = this
        let time = setInterval(function () {
          if (AMap) {
            clearInterval(time)
            that.pointList.forEach(element => {
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

        // for (let i = 0; i < res.length; i++) {
        //   let lnglat = {}
        //   lnglat.mid = res[i].mid
        //   lnglat.lng = res[i].coordinateX
        //   lnglat.lat = res[i].coordinateY
        //   this.pointList.push(lnglat)
        // }
      })
    },
    mounted() {
      this.isShowMap = true
    }
  };
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    height: 0 !important
  }

  .position_map {
    /*position: fixed;*/
    width: 100%;
    height: 100%;

    .details {
      position: fixed;
      /*position: absolute;*/
      z-index: 99;
      bottom: 98px;
      width: 100%;
      height: 264px;
      background-color: #fff;

      .close {
        width: 120px;
        height: 10px;
        margin: 14px auto 0 auto;
        border-radius: 4px;
        background: #DDDDDD;
      }

      .site {
        display: block;
        padding: 40px;

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
          // background-color: pink;
          .Site_title {
            height: 35px;
            line-height: 36px;
            margin: 0;
            color: #333333;
            font-size: 28px;
            font-weight: 900;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .site_icon {
            margin: 15px 0 0 0;
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
            margin-top: 20px;
            color: #999999;
            font-size: 24px;
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
</style>

