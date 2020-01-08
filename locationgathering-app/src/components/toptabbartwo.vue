<template>
  <div class="toptabbartwo">
    <div class="tab_box">
      <div class="tab">
        <div @click="active(0)">
          区域
          <span class="area_icon"></span>
        </div>
      </div>
      <div class="border_l"></div>
      <div class="tab">
        <div @click="active(1)">
          类型
          <span class="type_icon"></span>
        </div>
      </div>
    </div>
    <div class="tab_content" v-show="show">
      <ul class="area_box clearfix" v-show="index===0">
        <li class="type_list" :class="qvyuIndex==qvyuNum?'type_active':''" @click="siteClick(qvyuIndex,item)" v-for="(item,qvyuIndex) in qvyulists" :key="qvyuIndex">{{item.regionName}}</li>
      </ul>
      <ul class="type_box clearfix" v-show="index===1">
        <li class="type_list" :class="typeIndex==typeNum?'type_active':''" @click="typeClick(typeIndex,item)" v-for="(item,typeIndex) in typeList" :key="typeIndex">{{item}}</li>

      </ul>
      <div class="button_box">
        <div class="button" :class="buttonIndex===0?'active':''" @click="reset(0)">重置</div>
        <div class="button" :class="buttonIndex===1?'active':''" @click="confirm(1)">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      buttonIndex: 0,
      show: false,
      typeNum:0,
      qvyuNum:0,
      typeList:[
        '全部',
        '住宿',
        '水电桩',
        '停车位',
        '淋浴',
        '洗衣房',
        '饮食',
        '商店'

      ],
      listValue:'全部'
    };
  },
  props:{
    qvyulists:{
      type:Array,
      default:()=>[]
    }
  },
  methods: {
    typeClick(index,value){
      this.typeNum=index
      this.$emit('toType',value)
      // this.listValue=value
      // this.$store.commit('ListType',this.listValue)
    },
    siteClick(index,value){
      this.qvyuNum=index
      this.$emit('toQvyu',value)
      // this.listValue=value
      // this.$store.commit('ListType',this.listValue)
    },

    active(index) {
      this.index = index;
      this.show = true;
    },
    reset(index) {
      // this.buttonIndex = index;
      this.qvyuNum = 0
      this.typeNum = 0
      this.$emit('resetSearch')
    },
    confirm(index) {
      // this.buttonIndex = index;
      this.show = false;
      this.$emit('search')
    }
  }
};
</script>


<style lang="scss" scoped>
.toptabbartwo {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 128px;
  left: 0;
  background-color: #fff;
  .tab_box {
    position: relative;
    display: flex;
    width: 100%;
    height: 88px;
    color: #000;
    line-height: 30pt;
    text-align: center;
    border-bottom: 1px solid  #EEEEEE ;/*no*/
    // background-color: pink;
    .tab {
      flex: 1;
      font-size: 28px;
      div {
        padding: 0 5pt;
        width: 30%;
        margin: 0 auto;
        height: 100%;
        span {
          display: inline-block;
          width: 15px;
          height: 20px;
        }
        .area_icon {
          background-image: url(../../public/img/btn/enter.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          transform:rotate(90deg);
        }
        .type_icon {
          background-image: url(../../public/img/btn/enter.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          transform:rotate(90deg);
        }
      }
      .active {
        color: rgba(26, 188, 156, 1);
        border-bottom: 1px solid rgba(26, 188, 156, 1);
      }

    }
    .border_l {
      position: absolute;
      z-index: 999;
      top: 50%;
      left: 50%;
      margin-top: -26px;
      width: 2px;
      height: 52px;
      background-color: #eeeeee;
      // border-left: 1px solid #eeeeee; /*no*/
    }
  }
  .tab_content {
    width: 100%;
    ul {
      padding: 20px;
      margin: 0 auto;
      li {
        float: left;
        padding: 10px 0;
        width: 20%;
        text-align: center;
        border: 1px solid #fff;/*no*/
      }
      .type_active {
        color: #F1474B;
        border: 1px solid #F1474B;/*no*/
      }
      .type_list {
        /*width: 19%;*/
        line-height: 1.5;
        margin: 8px 0;
        border-radius: 30px;
        background-color: #F9F9F9;
      }
    }
    .button_box {
      display: flex;
      width: 100%;
      height: 30pt;
      text-align: center;
      line-height: 30pt;
      border-top: 1px solid rgba(228, 228, 228, 1);/*no*/
      border-bottom: 1px solid rgba(228, 228, 228, 1);/*no*/
      .button {
        flex: 1;
        color: #000;
      }
      .active {
        color: #fff;
        background-color: #f1474b;
      }
    }
  }
}
</style>
