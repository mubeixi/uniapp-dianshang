<template>
  <view @click="commonClick">
    <!--请按提示完成支付宝支付-->
    <!--分享引导框开始-->
    <div @click="isShowGuide=false" class="hide guide_box" v-show="isShowGuide">
      <div class="guide">
        <image :src="'/static/client/pay/alipay.jpg'|domain" class="guideimg" mode="aspectFit" />
      </div>
    </div>
    <!--分享引导框结束-->
  </view>
</template>

<script>
import { GetQueryByString, isWeiXin, ls } from '../../../common/tool'
import { getTempData } from '../../../common/fetch'
import { pageMixin } from '../../../common/mixin'

export default {
  mixins: [pageMixin],
  data () {
    return {
      isShowGuide: true
    }
  },
  onLoad (options) {
    ls.set('users_id', GetQueryByString(location.href, 'users_id'))

    if (!isWeiXin() && options.nocestr) {
      const nocestr = options.nocestr

      getTempData({ key: nocestr }).then(res => {
        document.body.innerHTML = res.data
        // document.write(redirect)
        document.getElementById('alipaysubmit').submit()
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less">
  .guide_box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    text-align: right;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      z-index: 2;

    }

    .guide {
      /*width: 750rpx;*/
      /*height: 100vh;*/
      position: absolute;
      top: 0;

      .guideimg {
        width: 750rpx;
        height: 1334rpx;
      }

    }

    .guide_point {
      position: relative;
      z-index: 33;
      width: 375rpx;
      height: 475rpx;
      margin-right: 10px;
    }

    .guide_btn {
      width: 189rpx;
      height: 63rpx;
      margin-right: 20px;
    }
  }

</style>
