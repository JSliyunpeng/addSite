<template>
  <div>
    <div class="tabbar">
      <div class="tabbar_box">
        <!-- 首页 -->
        <div class="tab">
          <router-link
            class="router_link"
            :class="activeIndex===0?'active':''"
            to="/"
            @click.native="active(0)"
          >
            <span class="icon" :class="activeIndex===0?'home_icon_active':'home_icon'"></span>
            <span class="text">营地</span>
          </router-link>
        </div>
        <!-- 添加 -->
        <div class="add">
          <!--分享-->
<!--          <div class="add_circle" @click="vshareShow = !vshareShow">邀</div>-->
          <router-link class="add_circle" to="/shareMerchart">+</router-link>
          <!--        <div class="add_circle -mob-share-open">邀</div>-->
        </div>
        <!-- 我的 -->
        <div class="tab">
          <router-link
            class="router_link"
            :class="activeIndex===1?'active':''"
            :to="{ name: 'my'}"
            @click.native="active(1)"
          >
            <span class="icon" :class="activeIndex===1?'my_icon_active':'my_icon'"></span>
            <span class="text">我的</span>
          </router-link>
          <!-- <router-link
            class="router_link"
            :class="activeIndex===1?'active':''"
            to="/my"
            @click.native="active(1)"
          >
            <span class="icon" :class="activeIndex===1?'my_icon_active':'my_icon'"></span>
            <span class="text">我的</span>
          </router-link>-->
        </div>
      </div>
    </div>
    <!--分享-->
    <transition name="fade">
      <div class="bdsharebuttonbox" data-tag="share_1" v-show="vshareShow">
        <a class="bds_weixin" data-cmd="weixin"></a>
        <a class="bds_sqq" data-cmd="sqq"></a>
        <!--      复制链接-->
        <a class="bds_copy"
           v-clipboard:copy="vshareConfig.common.bdUrl"
           v-clipboard:success="copy"
           v-clipboard:error="copyError"
        ></a>
      </div>
    </transition>
    <div class="tips" v-if="isTips">{{copyTipText}}</div>
  </div>
</template>
<script>
  export default {
    name: "home",
    data() {
      return {
        activeIndex: this.$store.state.tabbarActiveIndex,
        copyTipText: 'error',
        person: {bankId: ''},
        index: 0,
        isTips: false,
        vshareShow: false,
        vshareConfig: {
          common: {
            bdText: '自定义分享内容',
            bdDesc: '自定义分享摘要',
            bdUrl: '',
            bdPic: '自定义分享图片'
          },
          share: [{
            "bdSize": 32
          }],
        }
      };
    },
    mounted() {
      this.$axios.get('http://106.12.163.166:8000/h5/view').then(res => {
        this.person = res.data
        if (this.person.bankId) {
          this.$nextTick(() => {
            this.init()
          })
        }
      })
    },
    methods: {
      async init() {
        // this.vshareConfig.common.bdUrl = 'http://192.168.8.6:8080/camp_entry/mAddSite/#/register?bankId=' + this.person.bankId
        this.vshareConfig.common.bdUrl = process.env.VUE_APP_BASE_SHARE + this.person.bankId
        window._bd_share_config = this.vshareConfig
        document.getElementsByTagName('body')[0].appendChild(document.createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5);
        if(window._bd_share_main) {
          window._bd_share_main.init()//初始化share，解决跳转页面之后返回无法分享问题//
        }
      },
      copy(e) { // 复制链接成功
        this.copyTipText = '复制成功'
        this.isTips = true
        setTimeout(() => {
          this.isTips = false
        }, 2000)
      },
      copyError(e) {// 复制链接失败
        this.isTips = true
        this.copyTipText = '复制失败，请重新复制！'
        setTimeout(() => {
          this.isTips = false
        }, 2000)
      },
      active(index) {
        this.$store.commit("tabbarActive", index);
        this.$store.commit("toptabbarActiveIndex", index);
        this.activeIndex = this.$store.state.tabbarActiveIndex;
      },
    }
  };
</script>

<style lang="scss" scoped>
  .share {
    background: rgba(0, 0, 0, .5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
  }

  .icon_copy {
    background: url('../../public/img/site/copy.png')
  }

  .share_content {
    background: #fff;
    height: 200px;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 999;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    height: 0 !important
  }

  .tabbar {
    position: fixed;
    width: 100%;
    height: 98px;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    // line-height: 45pt;
    text-align: center;
    border-top: 1px solid rgba(228, 228, 228, 1);
    background-color: #fff;

    a {
      color: #000;
    }

    .tabbar_box {
      position: relative;
      display: flex;
      height: 100%;
      width: 586px;
      margin: 0 auto;
      // background-color: pink;
      .tab {
        flex: 1;

        .router_link {
          display: block;
          margin: 0 auto;
          padding-top: 13px;
          width: 80px;
          height: 100%;

          span {
            display: block;
          }

          .icon {
            width: 48px;
            height: 48px;
            // background-color: pink;
            margin: 0 auto;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .home_icon {
            background-image: url(../../public/img/tabbar/home.png);
          }

          .home_icon_active {
            background-image: url(../../public/img/tabbar/home_active.png);
          }

          .my_icon {
            background-image: url(../../public/img/tabbar/my.png);
          }

          .my_icon_active {
            background-image: url(../../public/img/tabbar/my_active.png);
          }

          .text {
            margin-top: 4px; /*no*/
            color: #a8abb0;
          }
        }

        .active {
          color: #454545;

          .text {
            color: #454545;
          }
        }
      }

      .tab:first-child {
        margin-right: 20%;
      }

      .tab:last-child {
        margin-left: 20%;
      }

      .add {
        position: absolute;
        z-index: 999;
        left: 50%;
        top: -42px;
        width: 72px;
        height: 72px;
        margin-left: -42px;
        border-radius: 50%;
        border: 1px solid rgba(228, 228, 228, 1);
        background-color: #fff;

        .add_circle {
          position: absolute;
          z-index: 999;
          left: 1px;
          width: 72px;
          height: 72px;
          line-height: 72px;
          /*margin: 5px 0 0 4px;*/
          border-radius: 50%;
          font-size: 36px;
          // border: 1px solid rgba(228, 228, 228, 1);
          /*background-color: skyblue;*/
          /*background-image: url(../../public/img/tabbar/add.png);*/
          /*background-repeat: no-repeat;*/
          /*background-size: 100% 100%;*/
        }

        .add_rectangle {
          position: absolute;
          z-index: 998;
          left: 0;
          bottom: 0;
          width: 108%;
          height: 52%;
          margin-top: -1px;
          margin-left: -3px;
          margin-bottom: -1px;
          background-color: #fff;
        }
      }
    }
  }

  .bds_sqq {
    width: 120px;
    height: 120px;
    padding-left: 0 !important;
    background: url(../../public/img/register/qq.png);
    background-size: 100% 100%;
    background-position: 0 0 !important;
    margin: 0;
    float: left;
    margin-right: 20px;

    p {
      margin-top: 120px;
      line-height: 40px;
      font-size: 30px;
    }
  }

  .bds_weixin {
    width: 120px;
    height: 120px;
    padding-left: 0 !important;
    background: url(../../public/img/register/weixin.png);
    background-size: 100% 100%;
    background-position: 0 0 !important;
    margin: 0;
    float: left;
    margin-right: 20px;

    p {
      margin-top: 120px;
      line-height: 40px;
      font-size: 30px;
    }
  }

  .bds_copy {
    float: left;
    width: 120px;
    height: 120px;
    padding-left: 0 !important;
    background: url(../../public/img/register/copy.png);
    background-size: 105% 105% !important;
    background-position: 0 0 !important;
    margin: 0;
    margin-right: 20px;

    p {
      margin-top: 120px;
      line-height: 40px;
      font-size: 30px;
    }
  }

  .bdsharebuttonbox {
    background: #fff;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    z-index: 90;
    bottom: 0;
    height: 310px;
    border-top: 1px solid #e4e4e4;
  }

  .fade-enter-active, .fade-leave-active {
    bottom: -40px;
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    bottom: -260px;
  }

  .tips {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    border-radius: 20px;
    text-align: center;
    z-index: 999999999;
  }
</style>

<style>
  .bd_weixin_popup {
    height: auto !important;
  }
</style>

