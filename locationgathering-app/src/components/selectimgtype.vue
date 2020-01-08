<template>
  <div class="select_img_type">
    <div class="addimg" v-show="addimgShow">
      <div class="mui-bar mui-bar-nav">
        <h1 class="mui-title">{{title}}</h1>
        <button class="callback" @click="back"></button>
      </div>
      <div class="hint">最多上传10张图片</div>
      <!-- 上传图片 -->
      <div class="content">
        <el-upload
          ref="upload"
          action="http://106.12.163.166:8000/ajax"
          list-type="picture-card"
          name="files"
          :data="upData"
          :on-change="change"
          :on-preview="prview"
          :on-success="upSuccess"
          :limit="10"
          :multiple="true"
          :auto-upload="true"
          :on-exceed="limitMax"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </div>

      <div class="mui-button-row">
        <button
          type="button"
          class="btn mui-btn mui-btn-success mui-btn-block"
          onclick="return false;"
          @click="imgUpdate"
        >保存</button>
      </div>
    </div>

    <div class="select"  v-show="!addimgShow">
      <div class="select_title">选择营地图片类型</div>
      <ul class="select_list clearfix">
        <li class="list" @click="toAddImg(item)" v-for="(item,index) in typeList" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      close: {
        required: true,
        type: Function
      }
    },
    data() {
      return {
        typeList: ["门头", "户外", "住宿", "美食", "配套设施", "娱乐设施"],


        title: "",
        dialogImageUrl: "",
        dialogVisible: false,
        imgObj: null,
        addimgShow:false,
        upData: { model: "images" },
        // upHeader: { Authorization: this.$store.state.token },
        imgUrl: {
          mentouImg: [],
          outdoorImg: []
        }
      };
    },
    methods: {
      handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      back() {
        this.close();
        // this.$router.push({ path: "/addposition" });
      },
      limitMax() {
        console.log("上传超过最大限制");
      },
      imgUpdate() {  //图片数组传递给添加页面
        this.imgListObj(this.imgObj)
        this.imgObj = []
        this.$emit('selectImgUrl',this.imgUrl)
        this.close();
        // this.$router.push({
        //   name: "addposition",
        //   params: { imgUrl: this.imgUrl}
        // });
      },
      change(file, fileList) {},
      prview(file) {},
      imgListObj(value){ //封装图片名称，返回名称为对象
        console.log(value)
        this.imgUrl = this.$store.state.imgUrl;
        let arr=[]
        value.forEach(e=>{
          console.log('e',e)
          // arr.push({name:e.name,url:e.response.data[0]})
          arr.push({name:e.name,url:e.response.url})
        })
        console.log('arr',arr)
        if (this.title == "门头") {
          this.imgUrl.mentouImg = arr;
        } else if (this.title == "户外") {
          this.imgUrl.outdoorImg = arr;
        } else if (this.title == "住宿") {
          this.imgUrl.zhusuImg = arr;
        } else if (this.title == "美食") {
          this.imgUrl.meishiImg = arr;
        } else if (this.title == "配套设施") {
          this.imgUrl.peitaoImg = arr;
        } else if (this.title == "娱乐设施") {
          this.imgUrl.yuleImg = arr;
        } else {
        }
      },
      upSuccess(response, file, fileList) {
        this.imgObj=fileList
      },
      toAddImg(item) {
        // this.close();
        this.title=item
        this.addimgShow=true
        // this.$router.push({name: "addimg", params: {title: item}});
      }
    }
  };
</script>


<style lang="scss" scoped>
  .select_img_type {
    position: fixed;
    z-index: 9999;
    // top: -100px;
    width: 100%;
    height: 100%;
    font-size: 28px;
    background-color: rgba(0, 0, 0, 0.52);
    .select {
      width: 500px;
      height: 640px;
      margin: 20px auto 40px auto;
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      .select_title {
        width: 500px;
        height: 90px;
        font-size: 32px;
        line-height: 90px;
        font-weight: 500;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        font-family: PingFangSC-Medium;
        border-radius: 20px 20px 0px 0px;
        background: rgba(241, 71, 75, 1);

      }
      .list {
        width: 100%;
        height: 88px;
        line-height: 88px;
        font-size: 28px;
        text-align: center;
      }
    }
    .addimg {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #fff;
      .mui-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 130px;
        padding: 0;
        border-bottom: 1px solid #eeeeee; /*no*/
        box-shadow: none;
        background-color: #fff;
        .mui-title {
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 94px;
          line-height: 94px;
          font-size: 36px;
        }
        .callback {
          top: 62px;
          width: 40px;
          height: 40px;
          margin: 0 0 0 40px;
          border: none;
          background-image: url(../../public/img/btn/btn_callback.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .callback:active {
          background-color: #fff !important;
        }
      }
      .content {
        width: 100%;
        padding-left: 3%;
        padding-top: 20px;
        // background-color: pink;
      }
      .hint {
        height: 40px;
        margin: 130px 0 0 0;
        line-height: 44px;
        text-align: center;
        color: #ffae00;
        background-color: #f6f6f6;
      }
      .btn {
        position: fixed;
        left: 50%;
        margin-left: -335px;
        bottom: 10px;
        width: 670px;
        height: 88px;
        font-size: 32px;
        border: 0;
        border-radius: 44px;
        background: linear-gradient(90deg, #ff6e4d, #f1474b);
      }
    }
  }
</style>
<style lang="scss">
  .addimg {
    .el-upload-list__item {
      width: 162px !important;
      height: 122px !important;
      // margin: 0 2% 1% 2% !important;
      margin: 0 0 1% 2% !important;
      border-radius: 0 !important;
      border: none !important;
      // border: 2px solid #f1474b !important; /*no*/
    }
    .el-upload-list__item-status-label {
      right: 0 !important;
      top: 0 !important;
      width: 24px;
      height: 24px;
      transform: none !important;
      background-color: #dcdcdc !important;
      background-image: url(../../public/img/addimg/delete.png) !important;
      background-repeat: no-repeat !important;
      background-size: 100% 100% !important;
    }
    .el-icon-check:before {
      content: "";
    }
    .el-upload--picture-card {
      width: 162px !important;
      height: 122px !important;
      margin: 0 2% 1% 2% !important;
      border: none !important; /*no*/
      border-radius: 0 !important;
      background-color: #dcdcdc;
      background-image: url(../../public/img/addimg/camera.png) !important;
      background-repeat: no-repeat !important;
      background-size: 56px 56px !important;
      background-position: 53px 20px;
    }
    .el-icon-plus:before {
      display: block;
      content: "添加照片";
      margin-top: 77px;
      font-size: 12px;
    }
  }
</style>

