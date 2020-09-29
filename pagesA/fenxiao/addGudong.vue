<template>
  <view @click="commonClick" class="myall">
    <view style="height: 10px;width: 100%;"></view>
    <view class="three">
      <view class="haha">
        {{$t(762)}}
      </view>
      <input class="inputs" :placeholder="$t(763)" placeholder-class="place" type="text" v-model="arr.apply_name">
    </view>
    <view class="three">
      <view class="haha">
        {{$t(764)}}
      </view>
      <input @blur="isTell" class="inputs" :placeholder="$t(765)" placeholder-class="place" type="number"
             v-model="arr.apply_mobile">
    </view>
    <view @click="submit" class="four">
      {{$t(766)}}
    </view>
    <view @click="goRecord" class="five">
      {{$t(767)}}
      <image :src="'/static/client/fenxiao/chakan.png'|domain" class="image"></image>
    </view>
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import { shaApply } from '../../common/fetch.js'
import { checkMobile } from '../../common/tool.js'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      arr: {
        apply_name: '',
        apply_mobile: ''
      }
    }
  },
  methods: {
    goRecord () {
      uni.navigateTo({
        url: '/pagesA/fenxiao/regionRecord?index=2'
      })
    },
    submit () {
      if (!this.arr.apply_name) {
        uni.showToast({
          title: T._(762),
          icon: 'none'
        })
        return
      } else if (!(checkMobile(this.arr.apply_mobile))) {
        uni.showToast({
          title: T._(763),
          icon: 'none'
        })
        return
      }
      const info = {}
      info.apply_name = this.arr.apply_name
      info.apply_mobile = this.arr.apply_mobile
      shaApply(info).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(function () {
          uni.navigateTo({
            url: '/pagesA/fenxiao/gudong'
          })
        }, 1000)
      }).catch(e => {

      })
    },
    isTell () {
      if (!(checkMobile(this.arr.apply_mobile))) {
        uni.showToast({
          title: T._(764),
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .three {
    height: 88rpx;
    line-height: 88rpx;
    width: 710rpx;
    margin: 0 auto;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    align-items: center;

    .haha {
      font-size: 30rpx;
      color: #333333;
      margin-right: 42rpx;
    }

    .inputs {
      height: 88rpx;
      line-height: 88rpx;
      font-size: 28rpx;
      color: #333333;
    }

    .place {
      font-size: 28rpx;
      color: #CAC8C8;
    }

    .myRadio {
      height: 88rpx;
      display: flex;

      .myRadioQ {
        height: 88rpx;
        display: flex;
        margin-right: 17rpx;

        .radio {
          transform: scale(0.7);
        }

        .mbx {
          font-size: 28rpx;
          color: #777777;
          margin-left: 13rpx;
        }
      }
    }

  }

  .four {
    width: 490rpx;
    height: 75rpx;
    line-height: 75rpx;
    text-align: center;
    background: rgba(244, 49, 49, 1);
    border-radius: 10rpx;
    margin: 0 auto;
    margin-top: 70rpx;
    font-size: 30rpx;
    color: #FFFFFF;
  }

  .five {
    height: 23rpx;
    line-height: 23rpx;
    width: 174rpx;
    margin: 0 auto;
    margin-top: 21rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);

    .image {
      width: 12rpx;
      height: 20rpx;
      margin-left: 10rpx;
    }
  }

</style>
