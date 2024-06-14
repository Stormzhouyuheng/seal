<template>
  <div class="dragImg" style="width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;">
    <div ref="cantMove" class="cantMove">
      此区域禁止放置签名
    </div>
    <div ref="canMove" style="position: relative;width: 100%;height: 100%;overflow: hidden;">
      <div id="pic" ref="dragDiv" :style="{ height: imgSize('h'), width: imgSize('w'), top: addPx(top) }" class="backIcon"
        style="left: 47%;transform:translate(-1px,-1px);position: absolute;z-index: 233;">
        <div v-drag="{ that }" onclick="" style="width: 100%;height: 100%;position: absolute;">
          <!-- <div v-show="showOption" class="imgBtn" style="right: 100%">
            <a class="pointer" @click="destroySelf()"><i class="el-icon-delete"></i></a>
            <a @click="imgEnlarge()"><i class="el-icon-zoom-in"></i></a>
            <a @click="imgNarrow()"><i class="el-icon-zoom-out"></i></a>
          </div> -->
          <img :class="'imgType_' + imgType" style="width: 100%;" :src="imgSrc" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import defaultImg from '../../assets/sign.png';
export default {
  name: "DragImg",
  // watch: {
  //   showOption: {
  //     handler(n1, n2) {
  //       console.log(n1);
  //       console.log(n2);
  //     }
  //   },
  // },
  props: {
    imgData: {
      type: String,
      default: ''
    },
    imgType: {
      type: String,
      default: 'seal'
    },
    top: {
      type: Number,
      default: 0
    },
    isReuse: {
      type: Boolean,
      default: false
    },
    currentPageNum: {
      type: String,
      default: "1"
    },
    deleteDragImg: {
      type: Function,
      value: null,
    },
    photoSize: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      that: this,
      showOption: true,
      imgSrc: '',
      imgWidth: 150,
      imgHeight: 150,
      position: { x: 0, y: 0 },
      cx: '', cy: '', x: '', y: '', l: '', t: '', r: '', b: '',
      curx: 0, cury: 0,
      testValue: "",
      //限制的移动区域
      limitXMax: 0.9,//最大移动的X轴百分比
      limitYMax: 0.9,
      limitXMin: 0,
      limitYMin: 0.2,
      xStr: '',
      yStr: '',
      cWidth: document.documentElement.clientWidth,
      cHeight: document.documentElement.clientHeight,
      cLimitXMax: this.cWidth * this.limitXMax,
      cLimitXMin: this.cWidth * this.limitXMin,
      cLimitYMax: this.cHeight * this.limitYMax,
      cLimitYMin: this.cHeight * this.limitYMin,
      overThis: null,
    }
  },

  //初始化加载项
  created() {
    this.overThis = this;
  },
  directives: {
    drag: {
      bind: function (el, binding) {
        let oDiv = el;   //当前元素
        let that = binding.value.that;
        oDiv.onmousedown = function (e) {
          //禁止拖动区域显示
          // binding.value
          // let cantMove = that.$refs['cantMove'];
          // cantMove.style.zIndex = '500';

          e.preventDefault();
          let bw = document.body.clientWidth;
          let bh = document.body.clientHeight;
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;
          // 计算两边坐标
          document.onmousemove = function (e) {
            let l = 0, t = 0;
            // 拖动边界
            if (e.clientX >= bw) {
              l = bw - disX;
            } else if (e.clientX <= 0) {
              {
                l = 0 - disX;
              }
            } else {
              l = e.clientX - disX;
            }
            if (e.clientY >= bh) {
              t = bh - disY;
            } else if (e.clientY <= 0) {
              t = 0 - disY;
            } else {
              t = e.clientY - disY;
            }
            //移动当前元素
            oDiv.style.left = l + 'px';
            oDiv.style.top = t + 'px';
          };
          // 鼠标停止移动时，事件移除
          document.onmouseup = function (e) {
            //禁止拖动区域隐藏
            // let cantMove = that.$refs['cantMove'];
            // cantMove.style.zIndex = '-1';

            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  methods: {
    closeOption() {
      this.showOption = this.showOption ? false : true;
    },

    addPx(value) {
      return value += 'px';
    },
    imgSize(type) {
      if (type == 'w') {
        return this.imgWidth + 'px';
      }
      return this.imgHeight + 'px';
    },
    imgEnlarge() {
      this.imgWidth += 10;
      this.imgHeight += 3;
    },
    imgNarrow() {
      this.imgWidth -= 10;
      this.imgHeight -= 3;
    },
    destroySelf() {
      this.deleteDragImg(this.isReuse);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    // 实现移动端拖拽
    phoneDown(event) {

      // //禁止拖动区域显示
      let cantMove = this.$refs['cantMove'];
      cantMove.style.zIndex = '500';

      let moveDiv = this.$refs['dragDiv'];

      this.position.x = moveDiv.offsetLeft;
      this.l = moveDiv.offsetLeft;
      this.position.y = moveDiv.offsetTop;
      this.t = moveDiv.offsetTop;

      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      //光标起始位置
      this.cx = touch.clientX;
      this.cy = touch.clientY;
    },
    phoneMove(event) {
      let moveDiv = this.$refs['dragDiv'];
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      event.preventDefault(); //阻止body滚动
      //光标偏移量
      this.curx = touch.clientX - this.cx;
      this.cury = touch.clientY - this.cy;

      //DOM 运动边界判断
      if (this.curx > 0) {//向右
        this.curx = Math.abs(this.curx) > this.r ? this.r : this.curx;
      } else { //向左
        this.curx = Math.abs(this.curx) > this.l ? -this.l : this.curx;
      }
      if (this.cury > 0) {//向下
        this.cury = Math.abs(this.cury) > this.b ? this.b : this.cury
      } else { //向上
        this.cury = Math.abs(this.cury) > this.t ? -this.t : this.cury
      }
      //获取屏幕大小，得出限制的XY轴值

      // let nLimitXMax = this.cWidth * this.limitXMax;
      // let nLimitXMin = this.cWidth * this.limitXMin;
      // let nLimitYMax = this.cHeight * this.limitYMax;
      // let nLimitYMin = this.cHeight * this.limitYMin;
      // this.curx = this.curx > this.cLimitXMax?this.cLimitXMax:this.curx;
      // this.curx = this.curx < this.cLimitXMin?this.cLimitXMin:this.curx;
      // this.cury = this.cury > this.cLimitYMax?this.cLimitYMax:this.cury;
      // this.cury = this.cury < this.cLimitYMin?this.cLimitYMin:this.cury;

      //当前位置

      // this.curx = touch.clientX > nLimitXMax?0:this.curx;
      // this.curx = touch.clientX < nLimitXMin?0:this.curx;
      // this.cury = touch.clientY > nLimitYMax?0:this.cury;
      // this.cury = touch.clientY < nLimitYMin?0:this.cury;


      //DOM 运动
      moveDiv.style.transform = `translate(${this.curx}px,${this.cury}px)`;
    },
    phoneEnd() {
      //
      // //禁止拖动区域隐藏
      let cantMove = this.$refs['cantMove'];
      cantMove.style.zIndex = '-1';

      let moveDiv = this.$refs['dragDiv'];
      //光标松开,记录盒子的位移。
      // console.log(moveDiv.style.transform);

      let aa = parseInt(moveDiv.style.transform.match(/-?(\d)+/g)[0]); //获取X偏移量
      let bb = parseInt(moveDiv.style.transform.match(/-?(\d)+/g)[1]); //获取Y偏移量

      // console.log( aa)
      // console.log( bb)
      let ax = parseInt(this.position.x) + aa;  //DOMX轴偏移量

      let by = parseInt(this.position.y) + bb;  //DOMY轴偏移量
      // this.xStr = moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[0];
      // this.yStr = moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[1];
      // 处理吸边
      //ax = ax>this.w/2?this.w-this.x:0;
      //end 时，重绘DOM位置，并清空transform的值。
      moveDiv.style.left = ax + 'px';
      moveDiv.style.top = by + 'px';
      moveDiv.style.transform = '';
      //可移动边界判断
      this.l = ax;
      this.t = by;
      this.r = this.w - this.l - this.x;
      this.b = this.h - this.t - this.y;

    }
  },
  mounted() {
    this.testValue = this.imgType;
    // this.imgWidth = this.imgType=='sign'?350:150
    // console.log('this.photoSize', this.photoSize);
    this.imgWidth = this.photoSize.width
    this.imgHeight = this.photoSize.height
    //如果不是第一页
    // console.log("this.currentPageNum")
    // console.log(this.currentPageNum)
    // if(this.currentPageNum !== "1"){
    let cantMove = this.$refs['cantMove'];
    cantMove.style.display = 'none';
    let canMove = this.$refs['canMove'];
    canMove.style.height = '100%';
    // }

    //初始化时设置图片的位置
    //通过当前页面的宽高获取到中间点，将图片放在中间
    //
    // let cWidth = document.documentElement.clientWidth;
    // let cHeight = document.documentElement.clientHeight;

    // cWidth = cWidth / 3.3;
    // cHeight = cHeight / 3.3;
    //
    let moveDiv = this.$refs['dragDiv'];
    // moveDiv.style.transform = `translate(`+cWidth+`px,`+cHeight+`px)`;
    //
    //图片设置
    if (this.imgData) {
      this.imgSrc = this.imgData;
    } else {
      this.imgSrc = defaultImg
    }
    //拖动功能
    // let moveDiv = this.$refs['dragDiv'];
    this.w = document.documentElement.clientWidth || document.body.clientWidth;
    this.h = document.documentElement.clientHeight || document.body.clientHeight;
    this.x = moveDiv.offsetWidth;
    this.y = moveDiv.offsetHeight;
    //使用二级事件绑定，解决浏览器警告，可自行查询
    moveDiv.addEventListener('touchstart', this.phoneDown, { passive: false })
    moveDiv.addEventListener('touchmove', this.phoneMove, { passive: false })
    moveDiv.addEventListener('touchend', this.phoneEnd, { passive: false })

    // let cantMove = this.$refs['cantMove'];
    // moveDiv.addEventListener('touchmove', this.showCantMove, {passive: false})
    // moveDiv.addEventListener('touchmove', this.showCantMove, {passive: false})

    //PC端鼠标拖动
    // moveDiv.addEventListener('mousedown', this.pcStart, {passive: false})
    // moveDiv.addEventListener('mousemove', this.pcMove, {passive: false})
    // moveDiv.addEventListener('mouseup', this.pcStop, {passive: false})
    //可移动边界判断
    this.l = moveDiv.offsetLeft;
    this.t = moveDiv.offsetTop;
    this.r = this.w - this.l - this.x;
    this.b = this.h - this.t - this.y;
  }
}
</script>
  
<style>
.imgBtn {
  position: absolute;
  width: 40px;
  max-height: 110px;
  font-size: 40px;
  background: #409EFF;
}

.imgBtn a {
  color: #fff !important;
  padding: 2px 4px;
  margin: 2px 0px;
  text-align: center;
  display: block;
  font-size: 20px;
}
#pic img{
  height: 100% !important;
}

.backIcon div {
  /*width: 100%;*/
  /*height: 100%;*/
  position: absolute;
}

.backIcon {
  /*height: 500px;*/
}

.cantMove {
  height: 2.3rem;
  z-index: -1;
  position: relative;
  background: rgba(73, 65, 65, 0.22);
  border-radius: 0 0 0.3rem 0.3rem;
  backdrop-filter: blur(0.052667rem);
  text-align: center;
  padding-top: 20%;
  color: #ff5c5c;
  font-weight: bold;
  font-size: 0.5rem;
}
</style>
  