<template>
  <div @click="commonClick" class="wrap">
    <!-- #ifndef H5 -->
    <image :src="'/static/client/check_by_scan.jpg'|domain" @click="scanFn" class="scan" />
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <image :src="'/static/client/check_by_scan.jpg'|domain" @click="scanFn" class="scan" v-if="iswx" />
    <!-- #endif -->

    <image :src="'/static/client/check_by_code.jpg'|domain" @click="toCode" class="code" />
  </div>
</template>

<script>
import { isWeiXin } from '../../common/tool'
import { pageMixin, scanMixin } from '../../common/mixin'
import { error } from '../../common'

export default {
  mixins: [pageMixin, scanMixin],
  name: 'checkChannel',
  data () {
    return {
      iswx: isWeiXin()
    }
  },
  methods: {
    toCode () {
      uni.navigateTo({
        url: '/pagesA/order/checkByCode'
      })
    },
    scanFn () {
      const _self = this
      this.openScanFn(1, true, 1, 1).then(origin => {
        const rt = _self.translateQrData(origin)

        // params默认空对象不报错
        const { act = '', params = {} } = rt

        if (act === 'IsVirtualOrderCheck' && params.Order_Code) {
          uni.navigateTo({
            url: '/pagesA/order/checkOrderInfo?Order_Code=' + params.Order_Code
          })
        } else {
          error('参数有误')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    height: 100vh;
    background: white;
    padding-top: 120rpx;

    .scan, .code {
      width: 750rpx;
      height: 350rpx;
    }

    .scan {
      /*margin-top: 120rpx;*/
      margin-bottom: 70rpx;
    }

    .code {

    }
  }
</style>
