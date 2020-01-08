<template>
  <div class="index_list">
    <div class="title">
      城市
      <!--      <span class="back" @click="back">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;返回</span>-->
      <span class="back" @click="back"></span>
    </div>
    <div class="site clearfix">
      <div class="current">当前城市<span>{{isCity==''?'请选择城市':isCity}}</span></div>
<!--      <div class="location">定位城市<span class="icon">&nbsp;&nbsp;&nbsp;&nbsp;{{indexLists.location.addressComponent.city}}</span></div>-->
    </div>
    <cube-index-list
      class="list"
      :data="cityData"
      @title-click="clickTitle">
      <cube-index-list-group
        v-for="(group, index) in cityData"
        :key="index"
        :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem(item)">
          <div class="custom-item">{{item.regionName}}</div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list>
  </div>
</template>

<script>
  import {provinceList, cityList, areaList} from '@/assets/area.js'
  export default {
    data() {
      return {
        title: 'Current City: BEIJING',
        cityData: [],
        indexListShow: false,
        isCity:''

      }
    },
    props: {
      indexLists: {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
      selectItem(item) {
        this.isCity = item.regionName
        this.$emit('toCloseIndexList', {show: false, item: item})
      },
      clickTitle(title) {
      },
      back() {
        this.$emit('toCloseIndexList', false)
      }
    },
    created() {
      this.indexListShow = this.CityList
      // this.$axios.get('/gunsApi/region/listShi', {params: {isType: true, type: 2, limit: 10000}}).then(result => {
      //   let lists = result.data.data.data
      //   for (let i in lists) {
      //     let obj = {}
      //     obj.name = i
      //     obj.items = lists[i]
      //     this.cityData.push(obj)
      //   }
      // })
    }
  }
</script>

<style lang="scss" scoped>
  .index_list {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;

    .title {
      position: absolute;
      z-index: 9999;
      width: 100%;
      height: 88px;
      line-height: 88px;
      font-size: 16px; /*no*/
      text-align: center;
      border-bottom: 1px solid #F2F2F2; /*no*/
      .back {
        position: absolute;
        bottom: 20px;
        width: 40px;
        height: 40px;
        left: 40px;
        color: #f1474b;
        line-height: 35px;
        font-size: 16px; /*no*/
        /*background-color: skyblue;*/
        background-image: url(../../public/img/btn/btn_callback.png);
        background-repeat: no-repeat;
        background-size: 40px 35px;
      }
    }

    .site {
      position: absolute;
      display: flex;
      z-index: 9999;
      width: 100%;
      height: 80px;
      line-height: 80px;
      padding: 0 40px;
      margin-top: 128px;
      color: #999999;
      font-size: 28px;

      div {
        flex: 1;

        span {
          color: #f1474b;
          margin-left: 40px;
        }
      }

      .current {
      }

      .location {
        right: 0;

        .icon {
          background-image: url(../../public/img/icons/select_position.png);
          background-repeat: no-repeat;
          -webkit-background-size: 20px 30px;
          background-size: 20px 30px;
        }
      }
    }

    .list {
      margin-top: 208px;
      padding-bottom: 200px;
    }
  }
</style>
<style>
  h1, h2, h3, h4, h5, h6 {
    height: 60px;
    margin: 0 !important;

  }

  .cube-index-list-fixed {
    display: none;
    padding: 0 40px;
    font-size: 28px !important;
  }

  .cube-index-list-anchor {
    height: 60px;
    line-height: 60px !important;
    padding: 0 40px !important;
    font-size: 28px !important;
  }

  .cube-index-list-nav-item {
    padding: 0 40px;
    color: #999999 !important;
    font-size: 32px !important;
  }

  .cube-index-list-nav {
    right: 20px;
    top: 40%;
  }

  .cube-index-list-item {
    height: 60px;
    line-height: 60px;
    padding: 0 40px;
    color: #999999;
    font-size: 28px;
    border-bottom: 1px solid #F2F2F2; /*no*/

  }

  .cube-scroll-content {
    padding-bottom: 100px !important;
  }
</style>
<!--<style lang="scss">-->
<!--  .custom-item {-->
<!--    position: relative;-->
<!--    height: 70px;-->
<!--    line-height: 70px;-->
<!--    padding: 0 16px;-->

<!--  }-->

<!--  // 用自定义样式，覆写内置的默认样式-->
<!--  .cube-index-list-content {-->
<!--    background-color: #222;-->
<!--    color: #909090;-->
<!--  }-->

<!--  .cube-index-list-anchor {-->
<!--    background-color: #333;-->
<!--    height: 30px;-->
<!--    line-height: 30px;-->
<!--    padding: 0 0 0 20px;-->
<!--  }-->

<!--  .cube-index-list-nav {-->
<!--    padding: 20px 0;-->
<!--    border-radius: 10px;-->
<!--    background: rgba(0, 0, 0, .3);-->

<!--    ul {-->
<!--      li {-->
<!--        padding: 3px;-->
<!--        font-size: 12px;-->
<!--        color: #909090;-->
<!--      }-->
<!--      .active{-->
<!--        color: #ffcd32;-->
<!--      }-->

<!--    }-->
<!--  }-->
<!--</style>-->
