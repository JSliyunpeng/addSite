<template>
  <div class="myInput">
    <div class="header">
      <span class="callback" @click="callback"></span>
      <p class="title">{{type==2?'游莱驿':'游莱家'}}</p>
    </div>
    <div v-if="isNoList">真的没有了</div>
    <div v-else class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="lists"
        :options="options"
        @pulling-up="onPullingUp">
        <div class="list clear-fix" v-for="item in lists" :key="item.mid">
          <div class="title clear-fix">
            <h6 class="title_text">{{item.name || '未命名'}}
              <div :class="type==2?'title_btn':'title_btn_ylj'">{{item.youlaitType==2?'游莱驿':'游莱家'}}</div>
            </h6>

          </div>
          <router-link :to="{path:'/details',query:{id: item.mid}}">
            <p>公司：{{item.companyName}}</p>
            <p>联系人：{{item.mContacts}}</p>
            <p>更新日期：{{new Date(item.updateTime).format('yyyy-MM-dd hh:mm:ss')}}</p>
          </router-link>
          <div class="list_btn_box">
            <router-link class="toEdit" :to="{path:'/addposition',query:{id: item.id}}">编辑营地</router-link>
            <router-link class="toEdit" :to="{path:'/addMerchant',query:{id: item.id}}">编辑公司</router-link>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lists: [],
        listsLength: 0,
        page: 1,
        isNoList: false,
        type: this.$route.query.type
      }
    },
    computed: {
      options() {
        return {
          pullUpLoad: {
            threshold: 50,
            stopTime: 1000,
            txt: {more: "上拉加载更多", noMore: "没有更多了"}
          },
          scrollbar: false,
          startY: 0
        }
      }

    },
    methods: {
      getLists() {
        this.$axios.get('/h5/youlaYi/list', {
          params: {
            condtion: {sort: 3, isManager: true, isMyYoulai: true},
            // condtion: {sort: 3,isManager: true},
            limit: 10,
            page: this.page,
            youlaitType: this.type
          }
        }).then(res => {
          this.page++
          let result = res.data
          this.lists = this.lists.concat(result)
          this.listsLength = result.length
          result.length == 0 ? this.isNoList = true : this.isNoList = false
        })
      },
      onPullingUp() {
        // 上滑更新数据
        this.listsLength < 10 ? this.$refs.scroll.forceUpdate() : this.getLists()
      },
      callback() {
        this.$router.push({path: '/my'})
      }
    },
    created() {
      this.getLists()
    }
  }
</script>


<style lang="scss" scoped>
  .myInput {
    position: absolute;
    width: 100%;
    height: 100%;

    .header {
      position: absolute;
      z-index: 9999;
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #EEEEEE; /*no*/
      background-color: #fff;

      .callback {
        position: absolute;
        top: 20px;
        left: 40px;
        width: 40px;
        height: 40px;
        background-image: url(../../public/img/btn/btn_callback.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .title {
        line-height: 80px;
        margin: 0 auto;
        font-size: 16px; /*no*/
        text-align: center;
      }
    }

    .scroll-list-wrap {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 80px 40px 0 40px;
      height: 100%;

      .list {
        padding: 20px 0 20px 0;
        /*border-top: 1px solid #E4E4E4;*/
        border-bottom: 1px solid #E4E4E4;

        .title {
          height: 70px;
          /*background-color: red;*/

          .title_text {
            color: #000;
            /*float: left;*/
            font-weight: 700;
            line-height: 70px;
            font-size: 18px; /*no*/
          }

          .title_btn {
            float: right;
            width: 110px;
            height: 50px;
            padding: 0 10px;
            /*margin-top: 6px;*/
            text-align: center;
            line-height: 50px;
            color: #ffffff;
            border-radius: 8px;
            font-size: 12px; /*no*/
            background: linear-gradient(90deg, rgba(255, 110, 77, 1), rgba(241, 71, 75, 1));
          }

          .title_btn_ylj {
            float: right;
            width: 110px;
            height: 50px;
            padding: 0 10px;
            /*margin-top: 6px;*/
            text-align: center;
            line-height: 50px;
            color: #ffffff;
            border-radius: 8px;
            font-size: 14px;
            background-color: #0EAFC0 !important;
          }
        }

        p {
          text-align: left;
          font-size: 14px; /*no*/
          line-height: 40px;
        }

        .toEdit {
          float: right;
          padding: 20px;
          margin-top: 10px;
          margin-left: 30px;
          color: #fff;
          border-radius: 10px;
          border: 1px solid #cccccc; /*no*/
          color: #ccc;
        }
      }
    }
  }

</style>
