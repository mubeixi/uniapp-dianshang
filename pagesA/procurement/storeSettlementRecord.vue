<template>
  <view @click="commonClick" class="wrap">
    <div class="defaults" v-if="list.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
    <view :key="index" @click="noShow" class="list" v-for="(item,index) of list">
      <view class="listText">
        {{$t(1652)}}
        <text class="msg">{{item.time_period}}</text>
      </view>
      <view class="listText">
        {{$t(1653)}}
        <text class="msg">¥{{item.Order_TotalAmount}}</text>
      </view>
      <view class="listText">
        {{$t(1654)}}
        <text class="msg">{{item.Distribute_Balance}}</text>
      </view>
      <view class="listText">
        {{$t(1655)}}:
        <text class="msg">¥{{item.Shipping_fee}}</text>
      </view>
      <view class="listText">
        {{$t(1656)}}
        <text class="msg">¥{{item.service_fee}}</text>
      </view>
      <view class="listText">
        {{$t(1657)}}
        <text class="msg">¥{{item.back_amount}}</text>
      </view>
      <view class="listText">
        {{$t(1658)}}
        <text class="msg color">¥{{item.Stores_Balance}}</text>
      </view>
      <view class="listText">
        {{$t(1659)}}
        <text class="msg color">{{item.status_txt}}</text>
        <image @click.stop='changge(index)' class="img" src="/static/procurement/i.png"
               v-if="item.status_txt==$t(1660)"></image>
        <view class="tips" v-if="item.status_txt==$t(1661)&&item.isShow">
          <view class="sanjiaoxing"></view>
          {{item.reject_reason}}
        </view>
      </view>
    </view>

  </view>
</template>

<script>

import { getSettlements } from '../../common/fetch.js'
import { mapGetters } from 'vuex'
import { pageMixin } from '../../common/mixin'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      list: [],
      page: 1,
      pageSize: 4,
      totalCount: 0
    }
  },
  onShow () {
    this.getSettlements()
  },
  onReachBottom () {
    if (this.list.length < this.totalCount) {
      this.page++
      this.getSettlements()
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  methods: {
    noShow () {
      for (const item of this.list) {
        item.isShow = false
      }
    },
    changge (index) {
      this.list[index].isShow = !this.list[index].isShow
    },
    getSettlements () {
      const data = {
        store_id: this.Stores_ID,
        page: this.page,
        pageSize: this.pageSize
      }
      getSettlements(data).then(res => {
        for (const item of res.data) {
          item.isShow = false
        }
        this.list = this.list.concat(res.data)
        this.totalCount = res.totalCount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #f6f6f6;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 30rpx 20rpx 0rpx 20rpx;

    .list {
      width: 710rpx;
      background: #FFFFFF;
      border-radius: 10rpx;
      box-sizing: border-box;
      padding: 23rpx 0rpx 30rpx 25rpx;
      font-size: 26rpx;
      margin-bottom: 20rpx;
      color: #333333;

      .listText {
        position: relative;
        height: 60rpx;
        line-height: 60rpx;

        .msg {
          color: #777777;
          margin-left: 10rpx;
        }

        .color {
          color: #F43131;
        }

        .img {
          width: 22rpx;
          height: 22rpx;
          margin-left: 20rpx;
        }
      }
    }
  }

  .tips {
    position: absolute;
    left: 130rpx;
    max-width: 400rpx;
    font-size: 12px;
    line-height: 40rpx;
    padding: 20rpx;
    background: #fff;
    box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);

    .sanjiaoxing {
      position: absolute;
      top: -14rpx;
      background-color: #fff;
      transform: rotate(70deg);
      width: 15rpx;
      height: 30rpx;
      border: 2rpx solid #fff;
      border-right: 0;
      border-bottom: 0;
      box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);
    }
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
</style>
