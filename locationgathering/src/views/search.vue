<template>
  <div class="search">
    <div class="search_box">
      <div class="search_input_box">
        <span class="search_icon"></span>
        <input type="serch" @keypress="inputBlur" class="input" v-model="searchValue" v-on:input='clearList' @blur="inputBlur"
               :placeholder="placeholderText">
      </div>
      <span class="cancle" @click="cancle">取消</span>
    </div>
    <div class="content">
      <div class="scroll-list-wrap" v-if="lists.length>0">
        <cube-scroll
          ref="scroll"
          :data="lists"
          :options="options"
          @pulling-up="onPullingUp">
          <router-link class="site" v-show="item" v-for="(item,index) in lists" :key="index"
                       :to="{name:'details',query: {id:item.id}}">
            <img v-if="item.imagesF" class="site_img" :src="'http://106.12.163.166:8000'+item.imagesF" alt>
            <img v-else class="site_img" :src="require('../../public/img/search/none_search.png')" alt>
            <div class="site_content">
              <h6 class="Site_title">{{item.name}}</h6>
              <div class="site_icon" v-if="item.tabshows">
                <span :class="iconclass" v-show="(item.tabshows).includes(iconIndex+1)"
                      v-for="(iconclass,iconIndex) in siteIconList"></span>

              </div>
              <p class="site_text">距您{{item.distance}}千米</p>
              <div class="site_card"></div>
            </div>
          </router-link>
        </cube-scroll>
      </div>
      <div class="no_search" v-if="searchListLength">
        <div class="img"></div>
        <p class="text">没有找到匹配的搜索结果</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {MapLoader, initMap} from "../../common/map";

  export default {
    data() {
      return {
        placeholderText: '请输入地区、景区、营地名称...',
        lists: [],
        searchValue: '',
        searchListLength: false,
        siteIconList: ['hotel', 'petrol_station', 'toilet', 'washer', 'bathroom', 'store'],
      }
    },
    computed: {
      options() {
        return {
          pullUpLoad: {
            threshold: 150,
            txt: {more: '', noMore: ''}
          },
          scrollbar: false,

        }
      }
    },
    methods: {
      onPullingUp() {
        // 上拉加载
        this.$refs.scroll.forceUpdate()
      },
      cancle() {
        this.$store.commit('toptabbarActiveIndex', 0)
        this.$router.push({path: "/"})
      },
      inputBlur() {
        // let startLngLat = this.$store.state.startLngLat
        this.$axios.get('/h5/youlaYi/list', {
          params: {
            condtion: {
              likeName: this.searchValue
            }
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
          this.lists = this.lists.concat(result)
          this.lists.length > 0 ? this.searchListLength = false : this.searchListLength = true
          let that = this
          let time = setInterval(function () {
            if (AMap) {
              clearInterval(time)
              that.lists.forEach(element => {
                let driving = new AMap.Driving({
                  // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                  policy: AMap.DrivingPolicy.LEAST_TIME
                })
                var startLngLat = [sessionStorage.getItem('startLng'), sessionStorage.getItem('startLat')]
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
          // let result = res.data
          result.length > 0 ? this.searchListLength = false : this.searchListLength = true
          // this.lists = result
        })
      },
      clearList() {
        this.lists = []
      }
    },
    created() {
    }
  }
</script>


<style lang="scss" scoped>
  .search {
    position: fixed;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    /*background-color: pink;*/
    .search_box {
      position: relative;
      height: 128px;
      padding: 0 30px;
      border-bottom: 1px solid #EEEEEE; /*no*/

      .search_input_box {
        position: absolute;
        bottom: 12px;
        width: 100%;
        width: 590px;
        height: 64px;
        background: rgba(246, 247, 249, 1);
        border-radius: 32px;


        .search_icon {
          position: absolute;
          left: 30px;
          bottom: 10px;
          width: 40px;
          height: 40px;
          background-image: url(../../public/img/search/search.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .input {
          height: 64px;
          width: 590px;
          border: none;
          padding-left: 80px;
          font-size: 28px;
          background-color: #F6F7F9;
          border-radius: 32px;
        }

      }

      .cancle {
        position: absolute;
        right: 30px;
        bottom: 30px;
        color: #666666;
        font-size: 28px;
      }
    }

    .content {
      width: 100%;
      height: 100%;
      /*margin-top: 50px;*/

      .scroll-list-wrap {
        width: 100%;
        height: 100%;
        padding: 0 40px 80px;
        /*padding: 120px 40px 80px;*/

        .site {
          display: block;
          padding: 40px;
          border-bottom: 1px solid #EEEEEE; /*no*/

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
              height: 40px;
              line-height: 40px;
              margin: 0;
              color: #333333;
              font-size: 28px;
              font-weight: 900;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .site_icon {
              margin-top: 8px;
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
                background-image: url(../../public/img/site/hotel.png);
              }

              .petrol_station {
                background-image: url(../../public/img/site/petrol_station.png);
              }

              .toilet {
                background-image: url(../../public/img/site/toilet.png);
              }

              .washer {
                background-image: url(../../public/img/site/washer.png);
              }

              .bathroom {
                background-image: url(../../public/img/site/bathroom.png);
              }

              .store {
                background-image: url(../../public/img/site/store.png);
              }
            }

            .site_text {
              margin-top: 15px;
              color: #999999;
              font-size: 24px;

            }

            .site_card {
              width: 112px;
              height: 32px;
              margin-top: 15px;
              background-image: url(../../public/img/site/position_type.png);
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
        background-image: url(../../public/img/search/none_search.png);
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
  }
</style>
