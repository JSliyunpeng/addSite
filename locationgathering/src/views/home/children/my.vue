<template>
  <div class="my">
    <div class="user">
      <img class="user_face" v-if="avatar" :src="'http://106.12.163.166:8000'+avatar" alt>
      <div v-else class="user_face"></div>
      <div class="box">
        <p class="user_name">{{name}}</p>
        <p class="user_id">{{account}}</p>
      </div>
    </div>
    <div class="lists">
      <router-link class="list" :to="{path:'/myInput', query:{type:2}}">
        <div class="list_icon"></div>
        游莱驿
        <span style="position: absolute; right: 35px; color: #ccc;">查看列表</span>
        <span class="icon"></span>
      </router-link>
      <router-link class="list" :to="{path:'/myInput', query:{type:3}}">
        <div class="list_icon"></div>
        游莱家
        <span style="position: absolute; right: 35px; color: #ccc">查看列表</span>
        <span class="icon"></span>
      </router-link>
    </div>
    <div class="login_out" @click="loginOut">退出登录</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:sessionStorage.getItem('name'),
        account:sessionStorage.getItem('accountUser'),
        avatar:sessionStorage.getItem('avatar'),
      };
    },
    methods: {
      loginOut() {
        this.$store.dispatch('UserLogout')
        this.$router.push({path:'/login'})
      }
    },
    created() {
      this.$store.state.tabbarActiveIndex = 1
      this.$axios.get('/h5/user/view').then(res => {
        sessionStorage.setItem('accountUser',res.data.account)
        sessionStorage.setItem('name',res.data.name)
      })
    }
  };
</script>

<style lang="scss" scoped>
  .list_icon {
    background: url('../../../../public/img/site/xingxing.png');
    background-size: 100% 100%;
    width: 40px;
    height: 40px;
    float: left;
    margin: 25px 20px 0;
  }

  .my {
    .user {
      width: 100%;
      height: 400px;
      background: linear-gradient(
          137deg,
          rgba(255, 110, 77, 1),
          rgba(241, 71, 75, 1)
      );

      .user_face {
        display: block;
        float: left;
        width: 140px;
        height: 140px;
        margin: 130px 0 0 40px;
        border-radius: 50%;
        background-color: #fff;
        background-image: url('../../../../public/img/tabbar/home_active.png');
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }

      .box {
        height: 74px;
        float: left;
        margin: 130px 0 0 20px;
        padding: 28px 0 38px 0;
        text-align: left;

        .user_name {
          height: 38px;
          line-height: 38px;
          font-size: 36px;
          color: #fff;
        }

        .user_id {
          height: 24px;
          margin-top: 18px;
          color: #fff;
          font-size: 24px;
        }
      }
    }

    .lists {
      width: 100%;
      margin-top: 50px;

      .list {
        display: block;
        width: 100%;
        height: 100px;
        margin-top: -1px;
        line-height: 100px;
        font-size: 28px;
        color: #666666;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;

        .icon {
          display: inline-block;
          float: right;
          margin: 43px 40px 0 0;
          width: 12px;
          height: 20px;
          // background-color: pink;
          background-image: url(../../../../public/img/icons/goto.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }

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
          background-image: url(../../../../public/img/btn/btn_callback.png);
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
              background-image: url(../../../../public/img/site/hotel.png);
            }

            .petrol_station {
              background-image: url(../../../../public/img/site/hotel.png);
            }

            .toilet {
              background-image: url(../../../../public/img/site/hotel.png);
            }

            .washer {
              background-image: url(../../../../public/img/site/hotel.png);
            }

            .bathroom {
              background-image: url(../../../../public/img/site/hotel.png);
            }

            .store {
              background-image: url(../../../../public/img/site/hotel.png);
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
            background-image: url(../../../../public/img/site/position_type.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .login_out {
      position: absolute;
      bottom: 200px;
      left: 50%;
      margin-left: -335px;
      width:670px;
      height:88px;
      font-size: 18px;/*no*/
      background:linear-gradient(90deg,rgba(255,110,77,1),rgba(241,71,75,1));
      border-radius:44px;
      text-align: center;
      line-height: 88px;
      color: #fff;
    }
  }
</style>


