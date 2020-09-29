<template>
  <div @click="commonClick" class="wrap">
    <div class="input-box">
      <input class="input" confirm-type="done" :placeholder="$t(1045)" type="digit" v-model="Order_Code" />
    </div>
    <button @click="subFn" class="sub" type="warn">{{$t(1046)}}</button>
  </div>
</template>

<script>
import { getOrderDetail } from '../../common/fetch'
import { error } from '../../common'
import { pageMixin } from '../../common/mixin'

import T from '@/common/langue/i18n'
export default {
  name: 'checkByCode',
  mixins: [pageMixin],
  data () {
    return {
      Order_Code: ''
    }
  },
  methods: {
    subFn () {
      const Order_Code = this.Order_Code
      if (!Order_Code) {
        error(T._(1045))
        return
      }

      // 不要穿User_ID
      getOrderDetail({ Order_Code }, { noUid: true }).then(res => {
        if (res.data.Order_Status == 2) {
          this.Order_Code = ''
          uni.navigateTo({
            url: '/pagesA/order/checkOrderInfo?Order_Code=' + Order_Code
          })
        } else {
          error(T._(1046))
        }
      }).catch(e => {
        error(e.msg)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    padding: 40rpx 20rpx;

    .input-box {
      height: 180rpx;

      box-sizing: border-box;
      border: 1px solid $wzw-primary-color;
      border-radius: 10rpx;

      .input {
        margin: 39rpx 0;
        padding: 20rpx;
        font-size: 50rpx;
        line-height: 60rpx;
        height: 60rpx;
        font-weight: 300;
        color: #555;

        &::placeholder {
          color: #CAC8C8;
        }
      }

    }

    .sub {
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 750rpx;
      z-index: 3;
    }
  }
</style>
