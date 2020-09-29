<template>
  <view class="store-bg">
    <div @click="open(1)" class="store-item">
      <image :src="'/static/client/store/dailishang.png'|domain" class="img-full"></image>
      <div class="store-title">{{$t(1728)}}</div>
      <image class="store-img" src="/static/store/dailishanggo.png"></image>
    </div>

    <div @click="open(2)" class="store-item">
      <image :src="'/static/client/store/shequ.png'|domain" class="img-full"></image>
      <div class="store-title">{{$t(1729)}}</div>
      <image class="store-img" src="/static/store/shequgo.png"></image>
    </div>
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {}
  },
  methods: {
    open (item) {
      uni.navigateTo({
        url: '/pagesA/store/storeShare?type=' + item
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .store-bg {
    background-color: #FFFFFF;
    height: 100vh;
    padding-top: 60rpx;
    box-sizing: border-box;
  }

  .store-item {
    width: 750rpx;
    height: 256rpx;
    margin-bottom: 46rpx;
    position: relative;
  }

  .store-title {
    font-size: 36rpx;
    height: 36rpx;
    line-height: 36rpx;
    font-weight: bold;
    position: absolute;
    top: 110rpx;
    left: 320rpx;
    color: #FFFFFF;
  }

  .img-full {
    width: 100%;
    height: 100%;
  }

  .store-img {
    width: 100rpx;
    height: 66rpx;
    position: absolute;
    top: 94rpx;
    right: 68rpx;
  }
</style>
