<template>
  <div class="selectpositipon">
    <div id="header" class="hearder mui-bar mui-bar-nav">
      <h1 class="mui-title">选择营地地址</h1>
      <button class="callback" @click="back"></button>
      <div class="enter" @click="selectPositionOk">确定</div>
    </div>
<!--    <v-map class="map" :showcenterPonit="true"></v-map>-->
    <v-map :showcenterPonit="true" :isShowMap="true"></v-map>
    <div class="position scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="$store.state.locationNearObj"
        @pulling-up="onPullingUp"
        :options="options">
        <ul class="clearfix">
          <li
            v-for="(item,index) in $store.state.locationNearObj"
            @click="selectPositon(item.id,item.name,item.address,item.location.lng,item.location.lat)"
            :key="index"
          >
            <span class="icon" v-show="item.id===locationId"></span>
            <h6>{{item.name}}</h6>
            <p>{{item.address}}</p>
          </li>
        </ul>

      </cube-scroll>
    </div>
  </div>
</template>
<script>
  import map from "../components/map";
  export default {
    data() {
      return {
        map: null,
        locationId: null,
        positon: {},
        options: {
          pullUpLoad: {},
          scrollbar: false,
          startY:0
        }
      };
    },
    components: {
      vMap: map
    },
    methods: {
      selectPositon(id, name, address, lng, lat) {
        this.locationId = id;
        this.maps = this.$store.state.map;
        this.maps.setCenter([lng, lat]);
        // 位置对象
        this.positon.id = id;
        this.positon.lng = lng;
        this.positon.lat = lat;
        this.positon.name = name;
        this.positon.address = address;
      },
      back() {
        // this.$router.push({path: "/addposition"});
        this.$emit('goBack')
      },
      onPullingUp() {
        this.$refs.scroll.forceUpdate()
      },
      selectPositionOk() {
        this.$emit('positon', this.positon)
        // this.$router.push({
        //   name: "addposition",
        //   params: {positon: this.positon}
        // });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .selectpositipon {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999999;
  }

  .hearder {
    height: 88px;
  }
  .mui-bar {
    // padding: 65px 0 0 0;
    padding: 0;
    border-bottom: 1px solid #eeeeee;
    box-shadow: none;
    background-color: #fff;

    .mui-title {
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 88px;
      line-height: 100px;
      font-size: 36px;
      // font-weight: 900;
      // background-color: red;
    }

    .callback {
      top: 30px;
      margin: 0 0 0 40px;
      width: 40px;
      height: 40px;
      border: none;
      background-image: url(../../public/img/btn/btn_callback.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .enter {
      position: absolute;
      top: 28px;
      right: 44px;
      width: 80px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color: #fff;
      border-radius: 4px;
      background: rgba(241, 71, 75, 1);
      border-radius: 4px;
    }
  }

  .map {
    .amap-geolocation-con {
      bottom: 150pt !important;
    }
  }

  .position {
    height: 400px;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;


    li {
      position: relative;
      // height: 100px;
      width: 100%;
      padding: 10px 80px 10px 40px;
      border-bottom: 1px solid #eeeeee; /*no*/
      .icon {
        position: absolute;
        top: 50%;
        margin-top: -20px;
        right: 40px;
        width: 40px;
        height: 40px;
        // background-color: pink;
        background-image: url(../../public/img/map/enter.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      h6 {
        height: 40px;
        line-height: 40px;
        color: #333333;
        font-size: 28px;
      }

      p {
        font-size: 24px;
        height: 30px;
        line-height:30px;
      }
    }
  }
</style>


