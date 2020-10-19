<template>
  <view @click="commonClick" class="all">
    <!-- <page-title title="会员充值"></page-title> -->
    <view class="yue">
      <image :src="'/static/client/blance/storePay.jpg'|domain" class="image"></image>
      <view class="yueq">
        {{$t('2345x0')}}
      </view>
      <view class="pricsw">
        {{info.User_Money}}
      </view>
    </view>

    <view class="inputs">
      <image :src="'/static/client/check/money.png'|domain" class="image"></image>
      <input class="input" :placeholder="$t('2345x1')" type="text" v-model="money">
    </view>
    <view class="inputs">
      <image :src="'/static/client/check/password.png'|domain" class="image"></image>
      <input class="input" :placeholder="$t('2345x2')" type="password" v-model="passwd">
    </view>
    <view class="zhu">
      {{$t('2345x3')}}
    </view>
    <view @click="confirm" class="queren">
      {{$t('2345x4')}}
    </view>
  </view>
</template>

<script>
import { get_user_info, storeConsume } from '../../common/fetch.js'
import { pageMixin } from '../../common/mixin'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      info: {},
      passwd: '',
      money: '',
      isClicked: false
    }
  },
  methods: {
    confirm () {
      if (this.isClicked) {
        return
      }

      this.isClicked = true
      if (this.passwd == '') {
        uni.showToast({
          title: T._('2345d0'),
          icon: 'none'
        })
        this.isClicked = false
        return
      }
      if (this.money == '' || isNaN(this.money) || this.money < 0) {
        uni.showToast({
          title: T._('2345d1'),
          icon: 'none'
        })
        this.isClicked = false
        return
      }
      storeConsume({
        passwd: this.passwd,
        money: this.money
      }).then(res => {
        uni.showToast({
          title: res.msg,
          duration: 1500
        })
        setTimeout(() => {
          this.isClicked = false
          uni.navigateBack({
            delta: 1
          })
        }, 1500)
      }, err => {
        this.isClicked = false
        uni.showToast({
          title: err.msg,
          icon: 'none'
        })
      })
    }
  },
  onShow () {
    get_user_info().then(res => {
      this.info = res.data
    }, err => {
    }).catch()
  }
}
</script>

<style lang="scss" scoped>
  .all {
    box-sizing: border-box;
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .yue {
    width: 650rpx;
    height: 300rpx;
    margin: 0 auto;
    padding-top: 44rpx;
    position: relative;

    .image {
      width: 100%;
      height: 100%;
    }

    .yueq {
      position: absolute;
      top: 83rpx;
      left: 49rpx;
      font-size: 28rpx;
      height: 27rpx;
      line-height: 27rpx;
      color: #FFFFFF;
    }

    .pricsw {
      position: absolute;
      top: 144rpx;
      left: 49rpx;
      font-size: 60rpx;
      height: 46rpx;
      line-height: 46rpx;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

  .inputs {
    margin-top: 40rpx;
    height: 101rpx;
    margin-left: 52rpx;
    margin-right: 52rpx;
    width: 646rpx;
    font-size: 28rpx;
    border-bottom: 2rpx solid #F4F4F4;
    display: flex;
    align-items: center;

    .image {
      width: 34rpx;
      height: 40rpx;
    }

    .input {
      margin-left: 19rpx;
      width: 100%;
      height: 101rpx;
      line-height: 101rpx;
    }
  }

  .queren {
    width: 648rpx;
    height: 84rpx;
    line-height: 84rpx;
    text-align: center;
    background: linear-gradient(107deg, rgba(255, 92, 51, 1), rgba(255, 182, 81, 1));
    box-shadow: 0px 6rpx 14rpx 0px rgba(255, 51, 92, 0.35);
    border-radius: 20rpx;
    margin: 0 auto;
    margin-top: 147rpx;
    font-size: 28rpx;
    color: #FFFFFF;
    font-weight: 400;
  }

  .zhu {
    margin: 0 auto;
    margin-top: 28rpx;
    width: 645rpx;
    font-size: 22rpx;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 36rpx;
  }
</style>
