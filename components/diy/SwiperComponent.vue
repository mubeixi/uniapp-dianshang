<template>
  <view class="swiper wrap fun-preview-swiper" >
<!--      :class="{single:swiper.value.list.length<2}"-->
<!-- style="height:375rpx" -->
<!--      @load="HandleImgLoad"-->
      <!--      :style="[getSingleStyle()]"-->
    <div v-if="swiper.value.list.length==1"  @click="go(swiper.value.list[0])" class="single" style="display: flex;" >
		<image mode="widthFix"  style="width: 750rpx;vertical-align: top;"  :src="domainFunc(swiper.value.list[0].img_src)"/>
      <!-- <div class="cover-full" :style="{backgroundImage:'url('+domainFunc(swiper.value.list[0].img_src)+')'}"></div> -->
    </div>
	<!-- style="height:375rpx" -->
    <swiper v-else  class="swiper-box" style="height:350rpx"
            indicator-color="rgba(255, 255, 255, .3)"
            indicator-active-color="rgba(255, 255, 255, .7)"
            :indicator-dots="swiper.value.list.length>1" :autoplay="swiper.config.autoplay" circular="true" :interval="swiper.config.interval|str2num" :duration="500">
      <swiper-item @click="go(item)" v-for="(item,idx) in swiper.value.list" :key="idx">
<!--        <image mode="widthFix" class="swiper-item" style="width: 750rpx;vertical-align: top;"  :src="domainFunc(item.img_src)"></image>-->
        <view class="swiper-item" :style="{backgroundImage:'url('+domainFunc(item.img_src)+')'}"></view>
      </swiper-item>
    </swiper>

  </view>
</template>
<script>
  import {domainFn} from "../../common/filter";

  export default {
    props: {
      index: {
        required: true,
      },
      confData: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
          singleW:null,
          singleH:null,
          fullWidth:null,
        swiper: {
          config:{},
          value:{
            list:[]
          }
        },
      };
    },
    computed: {
      style() {
        // return deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
      },
    },
    filters: {
      //保存的是秒
      str2num(val) {
        return parseInt(val)*1000
      }
    },
    watch: {

    },
    components: {},
    methods: {
    getSingleStyle(){

        console.log(this.singleH,this.singleW)
        if(this.singleH && this.singleW){
            let h = this.fullWidth*this.singleH/this.singleW;
            let w = this.fullWidth;
            console.log({height:h+'px',width:w+'px'})
            return {height:h+'px',width:w+'px'}
        }
        return {}
    },
    HandleImgLoad(e){
        console.log(e)
        this.singleW = e.detail.width;
        this.singleH = e.detail.height;

    },
      go(item){
        this.$fun.linkTo(item)
      },
      domainFunc(url) {
        return domainFn(url)
      },

      // ...mapActions(),
    },
    created() {

        const res = uni.getSystemInfoSync();
        this.fullWidth = res.screenWidth;

      this.swiper = this.confData;
    }
  }
</script>


<style scoped lang="less">
  @import "../../static/css/app.less";

	.single{
        image{
            // width: auto !important;
            //height: auto;
            // position: absolute;
        }
    }

    .swiper-box{
      .swiper-item{
        width: 750rpx;
        height:350rpx;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: #f8f8f8;
        background-position: center;
      }
    }

  //image{will-change: transform}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .cover-full {
    .cover-full-bg(cover, 0);
    /*height: 100%;*/
  }


  /*swiper {*/
  /*    height: 100%;*/
  /*}*/

</style>
