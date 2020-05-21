<template>
  <view class="fengTitle">
    <view class="fengTitleLeft">
      <view class="xiao"></view>
      <view class="da"></view>
    </view>
    <view class="fengTitleCenter">
      {{title}}
    </view>
    <view class="fengTitleRight">
      <view class="da"></view>
      <view class="xiao"></view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
  .fengTitle {
    height: 80 rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .fengTitleLeft, .fengTitleRight {
      display: flex;
      height: 80 rpx;
      align-items: center;

      .da {
        width: 16 rpx;
        height: 16 rpx;
        border-radius: 50%;
        background-color: #F43131;
      }

      .xiao {
        width: 9 rpx;
        height: 9 rpx;
        border-radius: 50%;
        background-color: #F43131;
      }
    }

    .fengTitleLeft {
      .da {
        margin-left: 10 rpx;
      }
    }

    .fengTitleRight {
      .da {
        margin-right: 10 rpx;
      }
    }

    .fengTitleCenter {
      height: 80 rpx;
      line-height: 80 rpx;
      font-size: 30 rpx;
      color: #333333;
      font-weight: 500;
      margin-left: 20 rpx;
      margin-right: 20 rpx;
    }

  }
</style>
