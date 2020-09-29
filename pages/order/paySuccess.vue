<template>
  <view @click="commonClick" class="myall">
    <view class="img-div">
      <image :src="'/static/client/paySuccess.png'|domain" style="width: 100%;height: 100%;"></image>
    </view>
    <view class="pay-succ">
      {{$t(673)}}
    </view>
    <view class="pay-button">
      <view @click="goIndexs" class="button-all button-goon">{{$t(674)}}</view>
      <view @click="goOrder" class="button-all button-next">{{$t(675)}}</view>
    </view>
    <block v-if="showMain">
      <block v-if="pro.length>0">
        <view class="pay-succ-last">
          {{$t(676)}}
        </view>
        <view :key="index" class="youhuijuan" v-for="(item,index) of pro">
          <image class="allImg" src="/static/mbxcoupon.png"></image>
          <view class="infoImg">
            <image :src="item.Coupon_PhotoPath" class="image"></image>
          </view>
          <view class="storeTitle">
            {{item.Coupon_Subject}}
          </view>
          <view class="times">
            {{ $t(677) }}：{{item.Coupon_StartTime}}-{{item.Coupon_EndTime}}
          </view>
          <view class="limit">
            {{item.limit_txt}}
          </view>
          <view class="prices" v-if="item.Coupon_Discount<=0">
            ¥
            <text>{{item.Coupon_Cash}}</text>
          </view>
          <view class="prices" v-else>
			  <block v-if="$p('zh-cn')">
				   {{item.Coupon_Discount*10}}折优惠
			  </block>
			  <block v-if="$p('en-us')">
				  {{item.Coupon_Discount*10}}% discount
			  </block>
          </view>
          <view class="man" v-if="item.Coupon_Subject">
			  <block v-if="$p('zh-cn')">
				  满{{item.Coupon_Condition}}可用
			  </block>
			  <block v-if="$p('en-us')">
				  {{item.Coupon_Condition}} available
			  </block>
          </view>
          <view @click="goIndex(item.coupon_prod)" class="button">
            {{$t(678)}}
          </view>
        </view>
      </block>
      <block v-else>
        <!-- 猜你喜欢 -->
        <div class=" container">
          <div class="fenge"><span class="red"></span><span class="caini">{{$t(679)}}</span><span class="red"></span></div>
          <div class="prolist">
            <div :key="index" @click="gotoDetail(item.Products_ID)" class="pro-item" v-for="(item,index) in prodList">
              <img :src="item.ImgPath" alt="">
              <div class="item-name">{{item.Products_Name}}</div>
              <div class="price">
                <span class="n_price"><span>￥</span>{{item.Products_PriceX}}</span>
                <span class="o_price" v-if="item.Products_PriceY!=item.Products_PriceX"><span>￥</span>{{item.Products_PriceY}}</span>
              </div>
            </div>
          </div>
        </div>
      </block>
    </block>
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import { getPayCoupons, getProd } from '../../common/fetch.js'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      checked: 0, // 选中
      pro: [],
      Order_Type: '',
      OrderId: '',
      prodList: [],
      prod_arg: {
        page: 1,
        pageSize: 4
      },
      showMain: false
    }
  },
  onLoad (option) {
    this.pro = []
    this.Order_Type = option.Order_Type
    this.OrderId = option.OrderId
    this.getUserReceivedCoupon()
    this.getProd()
  },
  onShow () {

  },
  // 上拉触底
  onReachBottom () {
    if (this.hasMore) {
      this.getProd()
    }
  },
  methods: {
    gotoDetail (e) {
      uni.navigateTo({
        url: '/pages/detail/detail?Products_ID=' + e
      })
    },
    getProd () {
      this.prod_arg.Users_ID = this.Users_ID
      const oldlist = this.prodList
      getProd(this.prod_arg).then(res => {
        this.prodList = oldlist.concat(res.data)
        this.hasMore = (res.totalCount / this.prod_arg.pageSize) > this.prod_arg.page
        this.prod_arg.page += 1
      }).catch(e => {
      })
    },
    goOrder () {
      // 去订单列表
      if (this.Order_Type === 'pintuan') {
        uni.redirectTo({
          url: '/pages/order/pintuanOrderlist'
        })
      } else {
        uni.redirectTo({
          url: '/pages/order/order?index=2&Order_Type=' + this.Order_Type
        })
      }
    },
    // 获取用户已领取可使用的优惠券
    getUserReceivedCoupon () {
      const data = {
        order_id: this.OrderId
      }
      getPayCoupons(data).then(res => {
        for (const item of res.data) {
          this.pro.push(item)
        }
        this.showMain = true
      }).catch(e => {
      })
    },
    goIndexs () {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    goIndex (i) {
      if (i === '0') {
        uni.switchTab({
          url: '/pages/index/index'
        })
      } else {
        uni.redirectTo({
          url: '/pages/classify/result?pid=' + i
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .img-div {
    width: 132px;
    height: 132px;
    margin: 0 auto;
    margin-bottom: 12px;
    box-sizing: border-box;
  }

  .pay-succ {
    height: 36rpx;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    line-height: 36rpx;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
  }

  .pay-succ-last {
    height: 26rpx;
    font-size: 13px;
    color: #999999;
    line-height: 26rpx;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
  }

  .pay-button {
    display: flex;
    height: 35px;
    width: 100%;
    padding-left: 64rpx;
    padding-right: 64rpx;
    box-sizing: border-box;
    margin-bottom: 18px;
  }

  .button-all {
    width: 290rpx;
    height: 35px;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    border-radius: 35px;
  }

  .button-goon {
    background: linear-gradient(90deg, rgba(255, 150, 87, 1), rgba(253, 84, 90, 1));
    color: #FFFFFF;
    margin-right: 40rpx;
  }

  .button-next {
    border: 1px solid rgba(245, 54, 54, 1);
    color: #F53636;
  }

  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
    padding-top: 18px;
  }

  .titless {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    z-index: 999;
  }

  .nav {
    z-index: 999;
    position: fixed;
    top: 86rpx;
    left: 0rpx;
    width: 750rpx;
    margin: 0 auto;
    margin: 20rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333333;

    .views {
      width: 236rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      position: relative;

      &.checked {
        color: #F43131;

        &:after {
          content: '';
          display: flex;
          width: 135rpx;
          height: 3rpx;
          background-color: #F43131;
          position: absolute;
          bottom: 0rpx;
          left: 50rpx;
        }
      }
    }
  }

  .youhuijuan {
    width: 709rpx;
    height: 206rpx;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
    position: relative;

    .allImg {
      width: 100%;
      height: 100%;
    }

    .infoImg {
      width: 89rpx;
      height: 89rpx;
      border-radius: 50%;
      position: absolute;
      top: 56rpx;
      left: 44rpx;
      overflow: hidden;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .storeTitle {
      font-size: 28rpx;
      color: #333333;
      line-height: 28rpx;
      position: absolute;
      top: 62rpx;
      left: 150rpx;
    }

    .times {
      font-size: 20rpx;
      color: #666666;
      position: absolute;
      top: 105rpx;
      left: 148rpx;
    }

    .limit {
      font-size: 16rpx;
      color: #FF565F;
      position: absolute;
      left: 148rpx;
      top: 140rpx;
    }

    .all-coupon {
      font-size: 10px;
      color: #FF565F;
      position: absolute;
      top: 140rpx;
      left: 148rpx;
    }

    .prices {
      width: 110rpx;
      height: 40rpx;
      line-height: 40rpx;
      padding-left: 12rpx;
      padding-right: 13rpx;
      color: #333333;
      font-size: 30rpx;
      position: absolute;
      top: 41rpx;
      left: 534rpx;

      text {
        margin-left: 11rpx;
        font-size: 52rpx;
      }
    }

    .man {
      height: 19rpx;
      font-size: 20rpx;
      color: #666666;
      position: absolute;
      top: 95rpx;
      left: 534rpx;
    }

    .button {
      width: 125rpx;
      height: 44rpx;
      line-height: 44rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 44rpx;
      font-size: 22rpx;
      color: #F43131;
      text-align: center;
      position: absolute;
      top: 133rpx;
      left: 527rpx;
    }

    .yishiyong {
      position: absolute;
      width: 106rpx;
      height: 106rpx;
      top: 47rpx;
      left: 455rpx;
    }
  }

  .lasts {
    font-size: 14px;
    padding-top: 30rpx;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;

    .lefts {
      color: #666666;
    }

    .rights {
      margin-left: 10rpx;
      color: #F43131;
    }
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    padding-top: 100rpx;
  }

  /* 猜你喜欢 */
  .container {
    margin-top: 30rpx;
    padding: 0 20rpx;
  }

  .fenge {
    text-align: center;
    padding: 30rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .caini {
    font-size: 30rpx;
    margin-left: 13rpx;
    margin-right: 13rpx;
  }

  .prolist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .pro-item {
    width: 48%;
    margin-bottom: 15px;
    background: #fff;
  }

  .pro-item img {
    width: 345rpx;
    height: 345rpx;
  }

  .item-name {
    font-size: 24rpx;
    padding: 0 10rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .red {
    background-color: #F43131;
    display: inline-block;
    height: 3rpx;
    width: 44rpx;
  }

  .price {
    margin-top: 20rpx;
    padding: 0 10rpx 20rpx;
  }

  .n_price {
    color: #ff0000;
    font-size: 34rpx;

    span {
      font-size: 24rpx;
    }
  }

  .o_price {
    margin-left: 15rpx;
    color: #afafaf;
    font-size: 24rpx;
    text-decoration: line-through;
  }

</style>
