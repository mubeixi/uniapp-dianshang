<template>
  <view class="swiper wrap fun-preview-swiper">
    <!--      :class="{single:swiper.value.list.length<2}"-->
    <!-- style="height:375rpx" -->
    <!--      @load="HandleImgLoad"-->
    <!--      :style="[getSingleStyle()]"-->
    <div @click="go(swiper.value.list[0])" class="single" style="display: flex;" v-if="swiper.value.list.length==1">
      <image :src="domainFunc(swiper.value.list[0].img_src)" mode="widthFix"
             style="width: 750rpx;vertical-align: top;" />
      <!-- <div class="cover-full" :style="{backgroundImage:'url('+domainFunc(swiper.value.list[0].img_src)+')'}"></div> -->
    </div>
    <!-- style="height:375rpx" -->
    <swiper :autoplay="swiper.config.autoplay" :duration="500" :indicator-dots="swiper.value.list.length>1" :interval="swiper.config.interval|str2num" :style="{height:swipwerH}"
            @change="changeHeightFn"
            circular="true"
            class="swiper-box" indicator-active-color="rgba(255, 255, 255, .7)" indicator-color="rgba(255, 255, 255, .3)"
            style="width:750rpx;" v-else>
      <swiper-item :key="idx" @click="go(item)" v-for="(item,idx) in swiper.value.list">
        <image :id="'js-swiper-item'+idx" :src="domainFunc(item.img_src)" @load="imgLoad($event,idx)" class="swiper-item "
               mode="widthFix" style="width: 750rpx;vertical-align: top;height: 100%;"></image>
        <!-- <view class="swiper-item" :style="{backgroundImage:'url('+domainFunc(item.img_src)+')'}"></view> -->
      </swiper-item>
    </swiper>

  </view>
</template>
<script>
import { domainFn } from '../../common/filter'

export default {
  props: {
    index: {
      required: true
    },
    confData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      singleW: null,
      singleH: null,
      swipwerH: '150px',
      fullWidth: null,
      height_list: [],
      swiper: {
        config: {},
        value: {
          list: []
        }
      }
    }
  },
  computed: {
    style () {
      return ''
      // return deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
    }
  },
  filters: {
    // 保存的是秒
    str2num (val) {
      return parseInt(val) * 1000
    }
  },
  watch: {},
  components: {},
  methods: {
    // 用第一张图片做初始化高度
    imgLoad (e, idx) {
      // 只有第一个的时候才改
      if (e.currentTarget.id === 'js-swiper-item0') {
        this.swipwerH = e.detail.height / e.detail.width * 750 + 'rpx'
      }
      // this.height_list.push(e.detail.height + 'rpx')
      // 换成宽高比
      this.$set(this.height_list, idx, e.detail.height / e.detail.width)
    },
    // 滚动的时候灵活设置个高度
    changeHeightFn (e) {
      const _self = this
      const idx = e.detail.current
      _self.swipwerH = this.height_list[idx] * 750 + 'rpx'
      // const query = uni.createSelectorQuery().in(this);
      // query.select(`#js-swiper-item${idx}`).boundingClientRect(style => {
      //     _self.swipwerH = style.height + 'px'
      // }).exec();
    },
    getSingleStyle () {
      if (this.singleH && this.singleW) {
        const h = this.fullWidth * this.singleH / this.singleW
        const w = this.fullWidth
        return {
          height: h + 'px',
          width: w + 'px'
        }
      }
      return {}
    },
    HandleImgLoad (e) {
      this.singleW = e.detail.width
      this.singleH = e.detail.height
    },
    go (item) {
      this.$fun.linkTo(item)
    },
    domainFunc (url) {
      return domainFn(url)
    }

    // ...mapActions(),
  },
  mounted () {
  },
  created () {
    const res = uni.getSystemInfoSync()
    this.fullWidth = res.screenWidth

    this.swiper = this.confData
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/app.less";

  .single {
    image {
      // width: auto !important;
      //height: auto;
      // position: absolute;
    }
  }

  .swiper-box {
    .swiper-item {
      width: 750 rpx;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-color: #f8f8f8;
      background-position: center;
    }
  }

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
