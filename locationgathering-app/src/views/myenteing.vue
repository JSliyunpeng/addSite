<template>
  <div class="my_entering">
    <div class="title">
      <span class="back" @click="back"></span>
      我录入的营地
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="lists"
        :options="options"
        @pulling-up="onPullingUp">
        <router-link class="site" to="/details" v-for="item in lists">
          <img class="site_img" src="'/guns/'" alt>
          <div class="site_content">
            <h6 class="Site_title">aaaaaaaa</h6>
            <div class="site_icon">
              <span class="hotel"></span>
              <span class="petrol_station"></span>
              <span class="toilet"></span>
              <span class="washer"></span>
              <span class="bathroom"></span>
              <span class="store"></span>
            </div>
            <p class="site_text">距您100千米</p>
            <div class="site_card"></div>
          </div>
        </router-link>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lists: []
      }
    },
    computed: {
      options() {
        return {
          pullUpLoad: {
            threshold: 150,
            txt: {more: '加载完毕', noMore: '真的没有更多了'}
          },
          scrollbar: false,

        }
      },
    },
    methods: {
      onPullingUp() {
        // 模拟更新数据
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.lists.push(Math.random())
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      },
      back(){
        this.$router.push({path:'/my'})
      }
    },
    created() {
      for (let i = 0; i < 20; i++) {
        this.lists.push(i)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my_entering {
    position: absolute;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .title {
      position: absolute;
      z-index: 998;
      width: 100%;
      height: 128px;
      font-size: 36px;
      line-height: 160px;
      text-align: center;
      border-bottom: 1px solid #EEEEEE; /*no*/
      background-color: #ffffff;

      .back {
        position: absolute;
        left: 40px;
        bottom: 26px;
        width: 22px;
        height: 40px;
        background-image: url(../../public/img/btn/btn_callback.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .scroll-list-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 120px 40px 80px;
    .site {
      display: block;
      padding: 40px;
      border-bottom: 1px solid #EEE;

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
          height: 30px;
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
          margin: 15px 0;
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
            background-image: url(../../public/img/site/hotel.png);
          }

          .toilet {
            background-image: url(../../public/img/site/hotel.png);
          }

          .washer {
            background-image: url(../../public/img/site/hotel.png);
          }

          .bathroom {
            background-image: url(../../public/img/site/hotel.png);
          }

          .store {
            background-image: url(../../public/img/site/hotel.png);
          }
        }

        .site_text {
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
</style>
