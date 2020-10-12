<template>
  <view style="padding-bottom: 100rpx;">

    <view class="marginAuto">
      <view :key="index" class="blockDiv" v-for="(item,index) in orderInfo.prod_list">
        <view class="imgDiv">
          <image :src="item.prod_img" class="imgHund"></image>
        </view>
        <view class="textRight">
          <view class="productName">
            {{item.prod_name}}
          </view>
          <view class="bottomDiv">
            <view class="skuCount" v-if="item.attr_name">
              {{item.attr_name}}
            </view>
            <view class="skuCount" v-else>
              {{$t('1936x0')}}
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
        <view>{{$t('1936x1')}}</view>
      </view>

      <view class="orderDetailBottom">
        <view class="viewHeight">
          {{$t('1936x2')}}<span class="fontColor">{{orderInfo.Order_ID}}</span>
        </view>
        <view class="viewHeight">
          {{$t('1936x3')}} ¥<span class="fontColor">{{orderInfo.Order_TotalAmount}}</span>
        </view>
        <!-- <view class="viewHeight">
          {{$t('1936x4')}} ¥<span class="fontColor"></span>
        </view> -->
        <view class="viewHeight">
          {{$t('1936x5')}}： ¥<span class="fontColor">{{orderInfo.Order_Shipping && orderInfo.Order_Shipping.price || 0}}</span>
        </view>
        <view class="viewHeight">
          {{$t('1936x6')}}： <span class="fontColorRed">¥</span><span
        class=" fontColor fontColorRed">{{orderInfo.Order_TotalPrice}}</span>
        </view>
        <view class="viewHeight">
          {{$t('1936x7')}}：{{orderInfo.Order_CreateTime | timeFormat}}
        </view>
        <view class="viewHeight">
          {{$t('1936x8')}}$t('1936x9') {{orderInfo.Address_Name}} {{orderInfo.Address_Province_name}} {{orderInfo.Address_City_name}}
          {{orderInfo.Address_Area_name}} {{orderInfo.Address_Town_name}} {{orderInfo.Address_Detailed}}
        </view>
      </view>
    </view>

    <view class="orderDetail">
      <view class="orderDetailTop">
        <view class="leftDiv"></view>
        <view>{{$t('1936x10')}}</view>
      </view>

      <view class="orderDetailOther">
        <view class="inputView">
          <view style="width: 160rpx;">
            {{$t('1936x11')}}
          </view>
          <view style="width: 100%;">
            <input :placeholder="$t('1936x12')" style="width: 100%;" type="text" v-model="name">
          </view>
        </view>

        <view class="inputView">
          <view style="width: 160rpx;">
            {{$t('1936x13')}}
          </view>
          <view style="width: 100%;">
            <input :placeholder="$t('1936x14')" style="width: 100%;" type="text" v-model="mobile">
          </view>
        </view>

        <view class="inputView">
          {{$t('1936x15')}}： {{orderInfo.Order_Shipping.Express}}
          <!-- <view style="width: 160rpx;">
            {{$t('1936x16')}}
          </view>
          <view style="width: 100%;">
            <input type="text" v-model="ship_method" :placeholder="$t('1936x17')" style="width: 100%;">
          </view> -->
        </view>
        <view class="inputView" v-if="orderInfo.Order_Shipping.Express!=$t('1936x18')">
          <view style="width: 160rpx;">
            {{$t('1936x19')}}:
          </view>
          <view style="width: 100%;">
            <input :placeholder="$t('1936x20')" style="width: 100%;" type="text" v-model="ship_num">
          </view>
        </view>
        <view class="inputView" v-else>
          <view style="width: 140rpx;">
            {{$t('1936x21')}}
          </view>
          <picker :range="arr" :value="index" @change="bindPickerChange" class="picker">
            <view class="uni-input">{{arr[index]}}</view>
            <view class="funicon icon-fanhui icon"></view>
          </picker>

        </view>

        <view class="inputView">
          <view style="width: 160rpx;">
            {{$t('1936x22')}}
          </view>
          <view style="width: 100%;">
            <input :placeholder="$t('1936x23')" style="width: 100%;" type="text" v-model="remark">
          </view>
        </view>
      </view>
    </view>

    <view @click="send" class="submit">
      {{$t('1936x24')}}
    </view>

  </view>
</template>

<script>
import { formatTime } from '../../common/filter'
import { mapGetters } from 'vuex'
import { getAvailableCityExpress, getOrderDetail, systemSendOrder } from '../../common/fetch'
import { error } from '../../common'

import T from '@/common/langue/i18n'
export default {
  data () {
    return {
      index: 0,
      Order_ID: 0,
      orderInfo: { Order_Shipping: {} },
      name: '',
      mobile: '',
      ship_method: '',
      ship_num: '',
      remark: '',
      tong: [],
      arr: [],
      index: 0
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  filters: {
    timeFormat: formatTime
  },
  methods: {
    bindPickerChange (e) {
      this.index = e.detail.value
    },
    getOrderDetail: function () {
      getOrderDetail({
        Order_ID: this.Order_ID,
        store_id: this.Stores_ID
      }).then(res => {
        // res.data.Order_Shipping = res.data.Order_Shipping && JSON.stringify(res.data.Order_Shipping) ||''
        this.orderInfo = res.data
        this.orderInfo.Order_Shipping = JSON.parse(res.data.Order_Shipping)
        for (const it of this.orderInfo.prod_list) {
          if (it.attr_info) {
            it.attr_info = JSON.parse(it.attr_info)
            it.attr_name = it.attr_info.attr_name
          }
        }
      })

      getAvailableCityExpress().then(res => {
        for (const item in res.data) {
          const it = {}
          it[item] = res.data[item]
          this.tong.push(it)
          this.arr.push(res.data[item])
        }
      })
    },
    send: function () {
      const data = {
        Order_ID: this.orderInfo.Order_ID,
        Express: this.ship_method,
        Address_Name: this.name,
        Address_Mobile: this.mobile,
        Order_Remark: this.remark,
        store_id: this.Stores_ID
      }
      if (this.orderInfo.Order_Shipping.Express == T._('1936d0')) {
        for (const item in this.tong[this.index]) {
          data.city_express = item
        }
      } else {
        if (!this.ship_num) {
          error(T._('1936d1'))
          return
        }
        data.ShippingID = this.ship_num
      }
      systemSendOrder(data).then(res => {
        uni.showToast({
          title: res.msg
        })
        setTimeout(function () {
          uni.navigateBack({
            delta: 1
          })
        }, 1000)
      }).catch(err => {
        error(err.msg)
      })
    }
  },
  onLoad (options) {
    if (options.id) {
      this.Order_ID = options.id
      this.getOrderDetail()
    } else {
      error(T._('1936d2'))
      uni.navigateBack({
        delta: 1
      })
    }
  },
  onReachBottom () {

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
    padding-left: 4px;
    padding-right: 4px;
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

      .picker {
        flex: 1;
        height: 100rpx;
        line-height: 100rpx;
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

</style>
