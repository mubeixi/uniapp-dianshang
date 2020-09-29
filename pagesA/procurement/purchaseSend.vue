<template>
  <view @click="commonClick" style="padding-bottom: 100rpx;">

    <view class="marginAuto">
      <view class="blockDiv" v-for="item in backInfo.prod_list">
        <view class="imgDiv">
          <image :src="item.prod_img" class="imgHund"></image>
        </view>
        <view class="textRight">
          <view class="productName">
            {{item.prod_name}}
          </view>
          <view class="bottomDiv">
            <view class="skuCount" v-if="item.attr_info.attr_name">
              {{item.attr_info.attr_name}}
            </view>
            <view class="noattr" v-else>

            </view>
            <view class="allPrice">
              ×{{item.prod_count}}
            </view>
          </view>
          <view class="buttonLast">
            <view class="viewFont">
              ¥<span class="spanFont">{{item.prod_price}}</span>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="orderDetail">
      <view class="orderDetailTop">
        <view class="leftDiv"></view>
        <view>{{$t(1321)}}</view>
      </view>

      <view class="orderDetailBottom">
        <view class="viewHeight">
          {{$t(1322)}}<span class="fontColor">{{backInfo.id}}</span>
        </view>
        <view class="viewHeight">
          {{$t(1323)}} ¥<span class="fontColor">{{backInfo.price}}</span>
        </view>
        <view class="viewHeight">
          {{$t(1324)}} <span class="fontColor">{{backInfo.reason}}</span>
        </view>
        <!-- <view class="viewHeight">
          {{$t(1325)}}： <span class="fontColorRed">¥</span><span class=" fontColor fontColorRed">12315465</span>
        </view> -->
        <view class="viewHeight">
          {{$t(1326)}} <span class="fontColor">{{backInfo.create_at}}</span>
        </view>
        <view class="viewHeight">
          {{$t(1327)}} <span class="fontColor">{{backInfo.receive_name}}</span>
        </view>
        <view class="viewHeight">
          {{$t(1328)}}： <span class="fontColor">{{backInfo.status_desc}}</span>
        </view>
      </view>
    </view>
    <view class="orderDetail">
      <view class="orderDetailTop">
        <view class="leftDiv"></view>
        <view>{{$t(1329)}}</view>
      </view>
      <view class="orderDetailOther">
        <view class="inputView">
          <view style="width: 200rpx;">
            {{$t(1330)}}
          </view>
          <template>
            <block v-if="index == 1">
              <image class="selected" mode="" src="/static/procurement/selected.png"></image>
            </block>
            <block v-else>
              <view @click="change(1)" class="noselected"></view>
            </block>
            <view style="margin: 0 20rpx;">{{$t(1331)}}</view>
          </template>
          <template>
            <block v-if="index == 1">
              <view @click="change(2)" class="noselected"></view>
            </block>
            <block v-else>
              <image class="selected" mode="" src="/static/procurement/selected.png"></image>
            </block>
            <view style="margin-left: 20rpx;">{{$t(1332)}}</view>
          </template>
        </view>
        <view class="inputView" v-if="index == 1">
          <view style="width: 200rpx;">
            {{$t(1333)}}
          </view>
          <view style="width: 100%;text-align: right;">
            <!-- {{ship_name?ship_name:'请选择快递公司'}}
            <image class="right" src="/static/top.png" mode=""></image> -->
            {{this.shipping[1]}}
          </view>
        </view>
        <view class="inputView" v-if="index == 1">
          <view style="width: 200rpx;">
            {{$t(1334)}}
          </view>
          <view style="width: 100%;">
            <input :placeholder="$t(1335)" style="width: 100%;" type="text" v-model="shipping_no">
          </view>
        </view>
      </view>
    </view>
    <view @click="submit" class="submit">
      {{$t(1336)}}
    </view>
    <popupLayer :direction="'top'" ref="method">
      <view class="bMbx">
        <view class="fMbx">{{$t(1337)}}</view>
        <view :key="shipid" @click="changeCurrent(shipid)" class="iMbx" v-for="(ship,shipid) in shipping">
          <view>
            {{ship}}
          </view>
          <view>
            <image class="selected" mode="" src="/static/procurement/selected.png" v-if="current == shipid"></image>
            <view class="noselected" v-else></view>
          </view>
        </view>
      </view>
    </popupLayer>
  </view>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import { getShipping, getStoreProdBackOrderDetail, storeProdBackOrderSend } from '../../common/fetch.js'
import { mapGetters } from 'vuex'
import { pageMixin } from '../../common/mixin'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      index: 1,
      order_id: '',
      backInfo: {},
      shipping: {}, // 快递公司
      current: 0,
      shipping_no: ''// 快递单号
    }
  },
  components: {
    popupLayer
  },
  computed: {
    ...mapGetters(['Stores_ID']),
    ship_name: function () {
      return this.shipping[this.current]
    }
  },
  onShow () {

  },
  onLoad (options) {
    if (options.order_id) {
      this.order_id = options.order_id
      this.getShipping()
      this.getStoreProdBackOrderDetail()
    } else {
      uni.showToast({
        title: T._(1321),
        icon: 'none'
      })
      uni.navigateBack({
        delta: 1
      })
    }
  },
  onReachBottom () {

  },
  methods: {
    changeCurrent (shipid) {
      this.current = shipid
      this.$refs.method.close()
    },
    // 修改方式
    changeMethod () {
      this.$refs.method.show()
    },
    change (index) {
      this.index = index
    },
    // 提交退货
    submit () {
      const arg = {
        store_id: this.Stores_ID,
        order_id: this.order_id,
        is_need_shipping: this.index == 1 ? 1 : 0
      }
      if (this.index == 1) {
        // 需要物流
        // if(this.current == 0) {
        // 	uni.showToast({
        // 		title: '请选择快递公司',
        // 		icon: 'none'
        // 	});
        // 	return;
        // }
        // if(!this.shipping_no) {
        // 	uni.showToast({
        // 		title: '请输入快递单号',
        // 		icon:  'none'
        // 	});
        // 	return;
        // }
        // arg.express = this.ship_name;
        arg.shipping_no = this.shipping_no
      }
      storeProdBackOrderSend(arg).then(res => {
        uni.showToast({
          title: res.msg
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1000)
      })
    },
    // 获取物流公司
    getShipping () {
      getShipping().then(res => {
        this.shipping = res.data
      })
    },
    // 获取退货单详情
    getStoreProdBackOrderDetail () {
      getStoreProdBackOrderDetail({
        order_id: this.order_id
      }).then(res => {
        this.backInfo = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .marginAuto {
    width: 710rpx;
    margin: 0 auto;
    margin-top: 26rpx;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0rpx 0rpx 18rpx 0rpx;
    border-radius: 10rpx;
  }

  .blockDiv {
    width: 664rpx;
    height: 220rpx;
    display: flex;
    padding-left: 14rpx;
    padding-top: 20rpx;
  }

  .imgDiv {
    width: 220rpx;
    height: 220rpx;
  }

  .textRight {
    padding-left: 20rpx;
    width: 440rpx;
  }

  .imgHund {
    width: 100%;
    height: 100%;
  }

  .productName {
    width: 100%;
    height: 60rpx;
    line-height: 30rpx;
    overflow: hidden;
    font-size: 13px;
    color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .skuMy {
    color: #666666;
    font-size: 12px;
    margin-top: 28rpx;
  }

  .bottomDiv {
    margin-top: 26rpx;
    height: 50rpx;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }

  .skuCount {
    // width: 150rpx;
    height: 50rpx;
    background-color: #FFF2F1;
    font-size: 13px;
    color: #666666;
    text-align: center;
    line-height: 50rpx;
  }

  .noattr {
    width: 150rpx;
    background: #fff;
  }

  .allPrice {
    font-size: 30rpx;
    color: #333333;
    height: 50rpx;
    line-height: 50rpx;
  }

  .span1 {
    color: #F43131;
  }

  .span2 {
    color: #F43131;
    font-size: 28rpx;
    margin-left: 4rpx;
  }

  .mbxa {
    display: flex;
    align-items: center;
    margin-right: 10rpx;

    .imgs {
      width: 34rpx;
      height: 34rpx;
    }
  }

  .buttonLast {
    margin-top: 24rpx;
    display: flex;
    justify-content: space-between;
    height: 45rpx;

    .viewFont {
      font-size: 24rpx;
      color: #F43131;
    }

    .spanFont {
      font-size: 30rpx;
      color: #F43131;
      margin-left: 3px;
    }

    .spanJu {
      width: 80rpx;
      height: 45rpx;
      background: #EEEEEE;
      border-radius: 5px;
      font-size: 24rpx;
      color: #666666;
      display: inline-block;
      line-height: 45rpx;
      text-align: center;
    }

    .spanFa {
      width: 95rpx;
      height: 45rpx;
      background: #F43131;
      border-radius: 5px;
      font-size: 24rpx;
      line-height: 45rpx;
      text-align: center;
      color: #FFFFFF;
      display: inline-block;
      margin-left: 24rpx;
    }
  }

  .orderDetail {
    width: 710rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    background-color: #FFFFFF;
    border-radius: 10rpx;

    .orderDetailTop {
      width: 100%;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 30rpx;
      color: #333333;
      display: flex;
      align-items: center;
      padding-left: 21rpx;
      border-bottom: 1px solid #E6E6E6;

    }

    .orderDetailBottom {
      padding: 26rpx 0rpx 40rpx 21rpx;
      font-size: 13px;
      color: #333333;

      .viewHeight {
        height: 48rpx;
        line-height: 48rpx;
      }

    }

    .orderDetailOther {
      padding-left: 20rpx;
      padding-right: 20rpx;
      width: 670rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      color: #333333;

      .inputView {
        height: 100rpx;
        width: 670rpx;
        border-bottom: 1px solid #EBEBEB;
        display: flex;
        align-items: center;
      }

    }

  }

  .leftDiv {
    background-color: #F43131;
    width: 3px;
    height: 15px;
    margin-right: 15rpx;
    border-radius: 15rpx;
  }

  .fontColor {
    color: #777777;
    margin-left: 2px;
  }

  .fontColorRed {
    color: #F43131 !important;
  }

  .submit {
    width: 750rpx;
    height: 85rpx;
    background-color: $wzw-primary-color;
    line-height: 85rpx;
    text-align: center;
    font-size: 32rpx;
    color: #FFFFFF;
    position: fixed;
    bottom: 0rpx;
    z-index: 999;
  }

  .selected {
    width: 40rpx;
    height: 40rpx;
  }

  .noselected {
    width: 40rpx;
    height: 40rpx;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
  }

  .right {
    width: 40rpx;
    height: 40rpx;
    transform: rotate(90deg);
    float: right;
  }

  .bMbx {
    padding: 0rpx 20rpx;

    .fMbx {
      font-size: 32rpx;
      height: 30rpx;
      line-height: 30rpx;
      text-align: center;
      padding: 36rpx 0rpx;
    }

    .iMbx {
      display: flex;
      justify-content: space-between;
      height: 104rpx;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      align-items: center;
      font-size: 28rpx;
    }
  }
</style>
