<template>
  <div class="youlaihuiList">
    <div class="header">
      <span @click="callback" class="callback"></span>
      <p class="title">我录入的营地</p>
    </div>
<!--    <cube-input class="search"-->
<!--                v-model="value"-->
<!--                placeholder="请输入游莱汇名"-->
<!--    ></cube-input>-->
    <div class="radio_box">
      <div class="scroll-list-wrap">
        <cube-scroll
          ref="scroll"
          :data="youlaihuiLists"
          :options="options"
          @pulling-up="onPullingUp">
          <cube-radio-group>
            <cube-radio
              v-for="(option, index) in youlaihuiLists"
              :key="index"
              :option="{label:option.name,value:option.mid}"
              v-model="youlaihuiId">
            </cube-radio>
          </cube-radio-group>
        </cube-scroll>
      </div>
    </div>
    <el-button class="submit" @click="callback">确定</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 0,
        youlaihuiLists: [],
        youlaihuiId: '',
        value: '',
        selected: '',
        pull: [{name: 'pull'}],
      }
    },
    computed: {
      options() {
        return {
          pullUpLoad: {
            threshold: 50,
            stopTime: 1000,
            txt: {more: "上拉加载更多", noMore: "真的没有了"},
            vidible: false
          },
          scrollbar: false,
          startY: 0
        };
      }
    },
    methods: {
      getYoulaihuiLists() {
        this.$axios.get('http://106.12.163.166:8000/h5/getYoulaiCompany', {params: {youlaitType: 1}}).then(res => {
          this.youlaihuiLists = this.youlaihuiLists.concat(res.data)
        })
      },
      onPullingUp() {
        // 模拟更新数据
        if(this.youlaihuiLists.length>0) {
          this.$refs.scroll.forceUpdate()
        }else {
          this.getYoulaihuiLists()
        }

      },
      callback() {
        let toYoulaihui = {}
        this.youlaihuiLists.forEach(item => {
          if (item.mid == this.youlaihuiId) {
            toYoulaihui = item
          }
        })
        this.$emit('toShowYoulaihui', toYoulaihui)
      }
    },
    mounted() {
      this.getYoulaihuiLists()
    }
  }
</script>

<style lang="scss">
  .youlaihuiList {
    width: 100%;
    position: absolute;
    height: 100%;

    .header {
      position: relative;
      width: 100%;
      height: 120px;
      border-bottom: 1px solid #EEEEEE; /*no*/
      .callback {
        position: absolute;
        top: 45px;
        left: 40px;
        width: 22px;
        height: 40px;
        background-image: url(../../../../public/img/btn/btn_callback.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .title {
        line-height: 140px;
        margin: 0 auto;
        font-size: 16px; /*no*/
        text-align: center;
      }
    }

    .search {
      margin: 150px 40px 0 40px;

      .cube-input-field {
        height: 60px;
        border: none;
        margin-top: 20px;
        font-size: 14px; /*no*/
        text-align: center;
        border-radius: 10px;
      }
    }

    .radio_box {
      padding: 100px 40px 10px;
      font-size: 16px; /*no*/
      .scroll-list-wrap {
        height: 700px;
      }
    }
    .border-top-1px::before,.border-bottom-1px::after {
      border: none;
    }

    .submit {
      position: relative;
      left: 50%;
      top: 40px;
      margin-left: -40%;
      width: 80%;
      height: 80px;
      color: #fff;
      font-size: 16px; /*no*/
      border: 1px solid #ffffff; /*no*/
      border-radius: 10px; /*no*/
      background: linear-gradient(90deg, rgba(255, 110, 77, 1), rgba(241, 71, 75, 1));
    }
  }
</style>
