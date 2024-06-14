<template>
  <div>
    <!-- <div @click="closeSign()" style="width: 100%; height: 100%; background: rgb(0,0,0);position: absolute;z-index: 222;opacity: 0.4;">
    </div> -->
    <div class="singPanel">
      <div class="qianming-container" >
        <span style="margin: 0.3rem;">请在下方灰色区域内手写签名</span>
        <span @click="closeSign" style="cursor: pointer;margin: 0.3rem 0.5rem;position: absolute;top: 0px;right: 0px;">X</span>
        <div ref="esignDiv" style="background: rgb(246, 246, 246);border: 1px dashed rgb(185, 185, 185);margin: 0.3rem;border-radius: 0.2rem;overflow: hidden;">
        <vueEsign ref="esign" style="width: 100%!important;height:83vh !important;margin-left: -0.3rem; "
                  :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" ></vueEsign>
        </div>
        <div class="contro-container" >
          <el-button type="danger" @click="handleReset">清空画板</el-button>
          <el-button type="primary" @click="handleGenerate">确定签名</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueEsign from 'vue-esign'
export default {
  name: 'SignImg',
  components: {
    vueEsign
  },
  props: {
    showFunction: {
      type: Function,
      value: null,
    },
    signImgUrl: {
      type: String,
      value: '',
    },
    signImgBase64: {
      type: String,
      value: '',
    },
    signSuccess: {
      type: Function,
      value: null,
    },
  },
  data() {
    return {
      lineWidth: 2,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false,
      // windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      // windowWidth: 0,
    }
  },
  methods: {
    //清空画板..
    handleReset() {
      this.$refs.esign.reset();
      this.resultImg = ''
    },
    closeSign(){
      this.handleReset();
      if(this.showFunction){
        this.showFunction();
      }
    },
    reuseSign(){
      this.handleReset();
      this.signSuccess?this.signSuccess(this.signImgBase64,true):'';
    },
    //生成签名图片..
    handleGenerate() {
      this.$refs.esign.generate().then(res => {
        this.handleReset();
        this.signSuccess?this.signSuccess(res):'';
      }).catch(err => {
        console.log(err)
        // this.$message.error('请签名之后提交！')
        alert("请签名之后提交");
      })
    },
    //将base64转换为文件..
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type: mime});
    }
  }
}
</script>

<style scoped>
.singPanel{
  position: fixed;z-index: 233;bottom: 0px;width: 50%;left: 50%;min-width: 500px;transform: translate(-50%);
}
/* .contro-container button{
  border: none;
  padding: 0.126rem 0.62rem;
  line-height: 0.61333rem;
  border-radius: 0.105333rem;
  font-weight: bolder;
  margin: 0.02667rem 0.4667rem;
} */
.contro-container {
  width: 100%;
  padding: 7px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  /*background-color: #D3D3D3;*/
  /*position: absolute;*/
  /*bottom: 0px;*/
}

.qianming-container {  border-radius: 0.2rem 0.2rem 0 0;
  background: #fff;
  position: relative;padding-top: 0.36rem;
  font-size: 0.4333rem;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 95%;
  margin-left: 2.5%;
  margin-top: 20px;
}

canvas {
  min-width: 100%;
}
</style>
