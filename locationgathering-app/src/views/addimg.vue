<template>
  <div class="addimg">
    <div id="header" class="mui-bar mui-bar-nav">
      <h1 class="mui-title">{{title}}</h1>
      <button class="callback" @click="back"></button>
    </div>
    <div class="hint">最多上传10张图片</div>
    <!-- 上传图片 -->
    <div class="content">
      <el-upload
        ref="upload"
        action="/guns/gunsApi/kaptcha/uploads"
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
</template>

<script>
export default {
  data() {
    return {
      title: "",
      dialogImageUrl: "",
      dialogVisible: false,
      imgObj: null,
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
      this.$router.go(-1);
      // this.$router.push({ path: "/addposition" });
    },
    limitMax() {
      console.log("上传超过最大限制");
    },
    imgUpdate() {  //图片数组传递给添加页面
      this.imgListObj(this.imgObj)
      this.imgObj = []
      this.$router.push({
        name: "addposition",
        params: { imgUrl: this.imgUrl}
      });
    },
    change(file, fileList) {},
    prview(file) {},
    imgListObj(value){ //封装图片名称，返回名称为对象
      let imgUrl = this.$store.state.imgUrl;
      let arr=[]
      value.forEach(e=>{
        arr.push({name:e.name,url:e.response.data[0]})
      })
      if (this.title == "门头") {
        imgUrl.mentouImg = arr;
      } else if (this.title == "户外") {
        imgUrl.outdoorImg = arr;
      } else if (this.title == "住宿") {
        imgUrl.zhusuImg = arr;
      } else if (this.title == "美食") {
        imgUrl.meishiImg = arr;
      } else if (this.title == "配套设施") {
        imgUrl.peitaoImg = arr;
      } else if (this.title == "娱乐设施") {
        imgUrl.yuleImg = arr;
      } else {
      }
    },
    upSuccess(response, file, fileList) {
      this.imgObj=fileList
    }
  },
  created() {
    this.title = this.$route.params.title;
  }
};
</script>

<style lang="scss" scoped>
.addimg {
  position: absolute;
  width: 100%;
  height: 100%;
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


