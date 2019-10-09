<template>
  <view class="swiper wrap fun-preview-swiper" :class="{single:swiper.value.list.length<2}">

    <swiper style="height:375upx" class="swiper"
            indicator-color="rgba(255, 255, 255, .3)"
            indicator-active-color="rgba(255, 255, 255, .7)"
            :indicator-dots="swiper.value.list.length>1" :autoplay="swiper.config.autoplay" :interval="swiper.config.interval|str2num" :duration="1000">

      <swiper-item @click="go(item)" v-for="(item,idx) in swiper.value.list" :key="idx">
        <image class="swiper-item" style="width: 750upx"  mode="scaleToFill" :src="domainFunc(item.img_src)"></image>
<!--        <view class="swiper-item cover-full" :style="{backgroundImage:'url('+domainFunc(item.img_src)+')'}"></view>-->
      </swiper-item>
    </swiper>

  </view>
</template>
<script>
  import {domain} from "../../common/filter";

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
        swiper: {},
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
      go(item){
        this.$fun.linkTo(item)
      },
      domainFunc(url) {
        return domain(url)
      },
      setData(item, index) {
        // console.log('hehe',this.search)
        // @ts-ignore
        this.$store.commit('activeAttr', this.swiper);// 这里点击之后，setAttr马上就有响应。

        // @ts-ignore
        this.$store.commit('tabIndex', this.index);

        // 用vuex就不要一层层传递了，头都晕了
        // this.$emit('setData', this.img.attrData)
      },
      // ...mapActions(),
    },
    created() {

      this.swiper = this.confData;
    }
  }
</script>


<style scoped lang="less">
  @import "../../static/css/app.less";

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
    .cover-full-bg(cover, 50%);
    /*height: 100%;*/
  }

</style>
