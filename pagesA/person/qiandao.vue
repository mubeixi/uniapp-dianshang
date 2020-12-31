<template>
  <view @click="commonClick" class="all" v-if="pro">
    <view class="top">
      <!--			<image :src="'/static/client/task/left.png'|domain" class="goBack" @click="goBack"></image>-->
      <!--			<view class="titles">每日签到</view>-->
      <view @click="signinMethod" class="yuan">
        <image :src="'/static/client/task/yuan.png'|domain" class="image"></image>
        <image :src="'/static/client/task/qiandao.png'|domain" class="qiandao image"></image>
        <view class="qiandaoliji">
          {{pro.signin?$t('1634x0'):$t('1634x1')}}
        </view>
      </view>
      <view class="msg">
        {{$t('1634x2')}}
      </view>
    </view>

    <view class="jilu">
      <view :key="index" class="chang" v-for="(item,index) in continue_">
        <image :src="'/static/client/task/checked.png'|domain" class="image" v-if="index<continues"></image>
        <image :src="'/static/client/task/unchecked.png'|domain" class="image" v-else></image>
        <view class="view">
			<block v-if="$p('zh-cn')">第{{index+1}}天</block>
			<block v-if="$p('en-us')">Day {{index+1}}</block>
        </view>
      </view>
    </view>
    <view class="err">
      <image :src="'/static/client/task/err.png'|domain" class="image" mode=""></image>
      {{$t('1634x3')}}
    </view>
    <view class="last" v-if="pro">
      {{pro.desc}}
    </view>
  </view>
</template>

<script>
import { goBack } from '../../common/tool.js'
import { pageMixin } from '../../common/mixin'
import { getSignin, signin } from '../../common/fetch.js'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      continue_: [],
      continues: 0,
      pro: null
    }
  },
  onShow() {
	 if (!this.$fun.checkIsLogin(1)) return
    this.getSignin()
  },
  methods: {
    // 签到
    signinMethod () {
      if (!this.$fun.checkIsLogin(1)) return
      if (this.pro.signin == 1) {
        uni.showToast({
          title: T._('1634d0'),
          icon: 'none'
        })
      }
      if (this.pro.show == 2 && this.pro.signin != 1) {
        signin().then(res => {
          this.pro.signin = 1
          this.getSignin()
          uni.showToast({
            title: res.msg,
            duration: 2500,
            icon: 'none'
          })
        }).catch(e => {
        })
      } else {
        uni.navigateTo({
          url: '/pages/person/person'
        })
      }
    },
    getSignin () {
      getSignin().then(res => {
        this.pro = res.data
        const tempArr = []
        tempArr.length = parseInt(res.data.continue_)
        this.continue_ = tempArr
        this.continues = parseInt(res.data.continue)
      }, err => {

      })
    },
    goBack () {
      goBack()
    }
  }
}
</script>

<style lang="scss" scoped>
  .all {
    box-sizing: border-box;
    min-height: 100vh;
    background-color: #FFFFFF !important;

    .top {
      width: 750rpx;
      height: 447rpx;
      background: linear-gradient(#E74744, #FAB067);
      position: relative;

      .goBack {

        width: 20rpx;
        height: 30rpx;
        position: absolute;
        top: 35rpx;
        left: 20rpx;
      }

      .titles {
        color: #FFFFFF;
        font-size: 32rpx;

        position: absolute;
        top: 34rpx;
        left: 310rpx;
        height: 31rpx;
        line-height: 31rpx;
      }

      .yuan {
        width: 261rpx;
        height: 262rpx;

        position: absolute;
        top: 108rpx;
        left: 240rpx;

        .qiandaoliji {
          height: 26rpx;
          line-height: 26rpx;
          font-size: 28rpx;
          color: #F43131;
          position: absolute;
          top: 157rpx;
		  text-align: center;
		  width: 100%;
        }

        .qiandao {
          width: 46rpx !important;
          height: 46rpx !important;
          position: absolute;
          top: 85rpx;
          left: 107rpx;
        }

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .msg {
        width: 750rpx;
        height: 22rpx;
        line-height: 22rpx;
        font-size: 22rpx;
        color: #FFFFFF;
        text-align: center;
        position: absolute;
        bottom: 29rpx;
        text-align: center;
      }
    }

    .jilu {
      margin: 0 auto;
      margin-top: 44rpx;
      width: 690rpx;
      padding: 44rpx 0rpx 10rpx 20rpx;
      display: flex;
      flex-wrap: wrap;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 16rpx 0px rgba(0, 0, 0, 0.25);
      border-radius: 15rpx;

      .chang {
        width: 107rpx;
        height: 127rpx;
        margin-bottom: 53rpx;
        margin-right: 25rpx;
        position: relative;

        .image {
          width: 100%;
          height: 100%;
        }

        .view {
          width: 107rpx;
          height: 45rpx;
          line-height: 45rpx;
          font-size: 20rpx;
          color: #666666;
          text-align: center;
          position: absolute;
          bottom: 5rpx;
        }
      }
    }

    .err {
      margin-top: 47rpx;
      margin-left: 32rpx;
      height: 23rpx;
      font-size: 24rpx;
      color: #999999;
      display: flex;
      align-items: center;

      .image {
        width: 22rpx;
        height: 23rpx;
        margin-right: 9rpx;
      }
    }

    .last {
      margin-top: 19rpx;
      margin-left: 32rpx;
      margin-right: 47rpx;
      font-size: 20rpx;
      color: #999999;
      height: 40rpx;
      line-height: 40rpx;
    }

  }
</style>
