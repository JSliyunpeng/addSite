<template>
  <!-- <div class="mui-content"> -->
  <div class="mui-contentaaa">
    <div class="search" @click="serach">
      <span class="search_icon"></span>
<!--      <span class="search_text" v-if="$store.state.toptabbarActiveIndex==0">搜索</span>-->
      <span class="search_text">搜索</span>
    </div>
    <!-- 顶部tab -->
    <div class="toptab">
      <div id="segmentedControl" class="mui-segmented-control">
        <router-link
          class="toptabbar"
          :class="$store.state.toptabbarActiveIndex==0?'toptabbar_active':''"
          @click.native="toptabbarActive(0)"
          :to="{name: 'position'}"
        >营地
        </router-link>
        <!--        {name:'positionmap'}-->
        <router-link
          class="toptabbar"
          :class="$store.state.toptabbarActiveIndex==1?'toptabbar_active':''"
          @click.native="toptabbarActive(1)"
          :to="{path: '/positionmap', query: {lng: this.$store.state.startLngLat.lng,lat: this.$store.state.startLngLat.lat}}"
        >地图
        </router-link>
      </div>
    </div>
    <!--    <v-toptabbartwo></v-toptabbartwo>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import toptabbartwo from "../../../../components/toptabbartwo";
  import mapbox from "../../../../components/map";

  export default {
    name: "toptabbar",
    data() {
      return {
        listShow: false,
      };
    },
    components: {
      vToptabbartwo: toptabbartwo,
      vMap: mapbox
    },
    methods: {
      serach() {
        this.$router.push({path: '/search', query: {lng: this.$store.state.startLngLat.lng,lat: this.$store.state.startLngLat.lat}})
      },
      toptabbarActive(index) {
        this.$store.commit('toptabbarActiveIndex', index)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .mui-contentaaa {
    background-color: #fff;

    .search {
      position: fixed;
      z-index: 999;
      top: 73px;
      right: 20px;
      width: 96px;
      height: 28px;
      padding: 10px 0;
      color: #f1474b;
      font-size: 28px;

      .search_icon {
        display: inline-block;
        position: relative;
        top: -6px;
        width: 28px;
        height: 28px;
        margin-top: 0;
        background-image: url(../../../../../public/img/site/search.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .search_text {
        position: relative;
        top: -11px;
        margin-left: 7px;
      }
    }

    .toptab {
      position: fixed;
      z-index: 998;
      background-color: #fff;
      padding-top: 54px;
      padding-bottom: 45px;

      .mui-segmented-control {
        margin: 0 auto;
        width: 50%;
        height: 52px;
        border: 1px solid #f1474b; /*no*/
        border-radius: 10px;

        .toptabbar {
          display: inline-block;
          width: 50%;
          height: 100%;
          line-height: 58px;
          color: #f1474b;
          font-size: 28px;
          text-align: center;
          border: none;
        }

        .toptabbar_active {
          color: #fff;
          background-color: #f1474b;
        }

        .mui-active {
          color: #fff;
          background-color: #f1474b;
          border-left: none;
          border-right: none;
        }
      }
    }
  }

  .mui-control-content {
    height: 100% !important;
  }

  .map_box {
    position: absolute;
    width: 100%;
    height: 100% !important;
  }
</style>

