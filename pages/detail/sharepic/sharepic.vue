<template>
  <view @click="commonClick" class="wrap">
    <view :style="{backgroundImage:'url('+domainFunc('/uploadfiles/wkbq6nc2kc/image/5daa7f9be1.jpg')+')'}"
          class="bg"></view>
    <view class="moneybox font14" v-if="initData.DisSwitch==1">{{$t('351x0')}}<span class="font14"
                                                                         style="color: #f43838">￥</span><span
    class="money">{{info.money}}</span></view>
    <view @click="preview" class="imgbox">
      <image :src="info.img_url" class="img"></image>
    </view>
  </view>
</template>

<script>
import { ls } from '../../../common/tool'
import { pageMixin } from '../../../common/mixin'
import { domainFn } from '../../../common/filter'
import { mapGetters } from 'vuex'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      info: {}
    }
  },
  computed: {
    ...mapGetters(['initData'])
  },
  methods: {
    domainFunc (url) {
      return domainFn((url))
    },
    preview () {
      uni.previewImage({
        urls: [this.info.img_url],
        indicator: 'default',
        current: 0
      })
    }
  },
  created () {
    this.info = ls.get('temp_sharepic_info')

    uni.showToast({
      position: 'top',
      icon: 'none',
      title: T._('351d0')
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../../assets/css/app.less";

  .wrap {
    padding: 20rpx;
    position: relative;

    .bg {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 0;
      .cover-full-bg(cover, 0, #f2f2f2);
      //background-image: url("");
    }

    .moneybox {
      position: relative;
      z-index: 2;
      height: 180rpx;
      line-height: 180rpx;
      text-align: center;
      color: #555;
      border-radius: 6px;
      overflow: hidden;
      .cover-full-bg(contain, 0, #f2f2f2);
      background-image: url("/static/moneybox.png");

      .money {
        color: #f43838;
        font-size: 18px;
      }
    }

    .imgbox {
      position: relative;
      z-index: 2;
      margin-top: 40rpx;

      .img {
        width: 710rpx;
        height: 1100rpx;

      }
    }
  }
</style>
