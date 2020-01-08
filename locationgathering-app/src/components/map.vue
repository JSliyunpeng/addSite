<template>
  <div class="map">
    map
    <div class="center_ponit" v-if="showcenterPonit"></div>
  </div>
</template>
<script>
  import {MapLoader, initMap} from "../../common/map.js";

  export default {
    data() {
      return {
        that: null,
        mapBox: null,
        lat: null,
        lng: null,
        coordinate: null,
        da: this.$store.state.mapObj,
        pointClkShow: false
      };
    },
    props: ["pointList","showcenterPonit","isShowMap"],
    methods: {
      init() {
        this.mapBox = document.querySelector(".map");
        let map = initMap(AMap, this.mapBox);
        let _this = this;
        this.$store.state.map = map;
        MapLoader().then(
          AMap => {
            let adCode = 410000;
            let depth = 2;
            let markerCheck;
            let center; //当前地图中心点坐标
            let lnglat; //逆地理编码坐标
            let positionName;
            let geocoderReault;
            let markers = [];
            let geocoder = new AMap.Geocoder({ // 城市中心点编码 // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              city: "全国"
            });
            //渲染坐标点
            if (_this.pointList) {
              let setTime = setInterval(function () {
                if (_this.pointList.length > 0) {
                  clearInterval(setTime);
                  var endIcon = new AMap.Icon({
                    size: new AMap.Size(26, 30),
                    image: require('../../public/img/map/positionicon.png'),
                    imageSize: new AMap.Size(26, 30),
                  });
                  var clickIcon = new AMap.Icon({
                    size: new AMap.Size(66, 70),
                    image: require('../../public/img/map/position_icon_click.png'),
                    imageSize: new AMap.Size(66, 70),
                  })

                  for (let i = 0; i < _this.pointList.length; i++) {
                    if((JSON.parse(_this.pointList[i].lnglat))){
                      let marker = new AMap.Marker({
                        position: new AMap.LngLat((JSON.parse(_this.pointList[i].lnglat)).lng, (JSON.parse(_this.pointList[i].lnglat)).lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        icon: endIcon,
                        clickable: true,
                        id: 1,
                        title: _this.pointList[i].id
                      });
                      marker.on('click', function (e) {
                        _this.pointList.forEach(item => {
                          if(e.target.B.title==item.id) {
                            let res = item
                            _this.$emit("toDetialShow", {show: true, res: res})//父元素传递坐标id
                            markerCheck ? map.remove(markerCheck) : false//删除坐标点
                            markerCheck = new AMap.Marker({
                              position: new AMap.LngLat((JSON.parse(_this.pointList[i].lnglat)).lng, (JSON.parse(_this.pointList[i].lnglat)).lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                              icon: clickIcon,
                              clickable: true,
                              offset: new AMap.Pixel(-29, -60), // 相对于基点的偏移位置,
                              id: 1,
                            });
                            map.add(markerCheck)
                            markerCheck.on('click', function () {
                              _this.$store.commit('mapMiniCard',false)
                              map.remove(markerCheck)
                            })
                          }
                        })
                      })
                      markers.push(marker);
                    }

                  }
                  map.add(markers);
                }
              }, 1000);
            }
            let placeSearch = new AMap.PlaceSearch({ // 位置附近提示
              city: "全国"
            });

            map.on('touchend', mapTouchEnd)

            function mapTouchEnd() { //地图触摸停止事件
              center = map.getCenter(); //获取当前地图中心点坐标
              lnglat = [center.lng, center.lat];
              _this.$store.commit("lnglat", lnglat);
              // 逆地理编码获取位置
              if (lnglat) {
                geocoder.getAddress(lnglat, function (status, result) {
                  geocoderReault = result
                  if (status === "complete" && result.info === "OK") { // result为对应的地理位置详细信息
                    _this.$store.commit("getLocation", result); //坐标完整数据
                    positionName = result.regeocode.formattedAddress; //编码后的位置名字
                    placeSearch.search(positionName, function (status, result) {
                      if (result) { // 查询成功时，result即对应匹配的POI信息
                        _this.$store.commit("getLocationNear", result);
                        lnglat = null;
                      }
                    });
                  }
                });
              }
            }
            map.plugin(["AMap.ToolBar"], function () {
              //加载缩放工具条
              var tool = new AMap.ToolBar({
                position: "LT",
                buttonOffset: new AMap.Pixel(100, 100),
              });
              map.addControl(tool);
            });

            //打开APP自动定位当前位置
            var geolocation = new AMap.Geolocation({
              enableHighAccuracy: true, //是否使用高精度定位，默认:true
              timeout: 10000, //超过10秒后停止定位，默认：无穷大
              maximumAge: 0, //定位结果缓存0毫秒，默认：0
              convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true, //显示定位按钮，默认：true
              buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
              // showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              markerOptions: {
                //自定义定位点样式，同Marker的Options
                offset: new AMap.Pixel(-18, -36),
                content: '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
              }
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();

            function onComplete() { // 定位成功
              const toast = _this.$createToast({
                txt: '定位成功',
                type: 'txt',
                zIndex: 999
              })
              toast.show()
              mapTouchEnd()
            }
            AMap.event.addListener(geolocation, "complete", onComplete);
            AMap.event.addListener(geolocation, "error", () => {}); //返回定位出错信息

            let p = document.querySelector('.amap-geo')
            p.addEventListener('click', function (e) {
              const toast = _this.$createToast({
                txt: '定位中',
                type: 'txt',
                zIndex: 999

              })
              toast.show()
            })


          },
          e => {
            console.log("地图加载失败", e);
          }
        );
      }
    },
    mounted() {
      let setTime=setInterval(()=>{
        if(this.isShowMap) {
          this.init();
          clearInterval(setTime)
        }
      },500)
    }
  };
</script>

<style lang="scss" scoped>
  .map {
    position: absolute;
    height: 100%;
    width: 100%;

    .center_ponit {
      position: absolute;
      z-index: 999;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -30px;
      width: 60px;
      height: 60px;
      // background-color: pink;
      background-image: url(../../public/img/map/center.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .toast {
      z-index: 9999 !important;
      bottom: 200px;
    }
    .cube-poapup {
      bottom: -600px!important;
    }
  }
</style>


