<template>
  <view @click="commonClick" class="myall">
    <view class="img-div">
      <image :src="'/static/client/paySuccess.png'|domain" style="width: 100%;height: 100%;"></image>
    </view>
    <view class="pay-succ">
      支付成功
    </view>
    <view class="pay-button">
      <view @click="goIndexs" class="button-all button-goon">继续购买</view>
      <view @click="goOrder" class="button-all button-next">查看订单</view>
    </view>
    <block v-if="showMain">
      <block v-if="pro.length>0">
        <view class="pay-succ-last">
          本次购物可享权益
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
            有效期：{{item.Coupon_StartTime}}至{{item.Coupon_EndTime}}
          </view>
          <view class="limit">
            {{item.limit_txt}}
          </view>
          <view class="prices" v-if="item.Coupon_Discount<=0">
            ¥
            <text>{{item.Coupon_Cash}}</text>
          </view>
          <view class="prices" v-else>
            {{item.Coupon_Discount*10}}折优惠
          </view>
          <view class="man" v-if="item.Coupon_Subject">
            满{{item.Coupon_Condition}}可用
          </view>
          <view @click="goIndex(item.coupon_prod)" class="button">
            去使用
          </view>
        </view>
      </block>
      <block v-else>
        <!-- 猜你喜欢 -->
        <div class=" container">
          <div class="fenge"><span class="red"></span><span class="caini">猜你喜欢</span><span class="red"></span></div>
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
    height: 36 rpx;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    line-height: 36 rpx;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
  }

  .pay-succ-last {
    height: 26 rpx;
    font-size: 13px;
    color: #999999;
    line-height: 26 rpx;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
  }

  .pay-button {
    display: flex;
    height: 35px;
    width: 100%;
    padding-left: 64 rpx;
    padding-right: 64 rpx;
    box-sizing: border-box;
    margin-bottom: 18px;
  }

  .button-all {
    width: 290 rpx;
    height: 35px;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    border-radius: 35px;
  }

  .button-goon {
    background: linear-gradient(90deg, rgba(255, 150, 87, 1), rgba(253, 84, 90, 1));
    color: #FFFFFF;
    margin-right: 40 rpx;
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
    top: 0 rpx;
    left: 0 rpx;
    width: 100%;
    z-index: 999;
  }

  .nav {
    z-index: 999;
    position: fixed;
    top: 86 rpx;
    left: 0 rpx;
    width: 750 rpx;
    margin: 0 auto;
    margin: 20 rpx;
    height: 72 rpx;
    display: flex;
    align-items: center;
    font-size: 30 rpx;
    color: #333333;

    .views {
      width: 236 rpx;
      height: 72 rpx;
      line-height: 72 rpx;
      text-align: center;
      position: relative;

      &.checked {
        color: #F43131;

        &:after {
          content: '';
          display: flex;
          width: 135 rpx;
          height: 3 rpx;
          background-color: #F43131;
          position: absolute;
          bottom: 0 rpx;
          left: 50 rpx;
        }
      }
    }
  }

  .youhuijuan {
    width: 709 rpx;
    height: 206 rpx;
    margin-left: 20 rpx;
    margin-bottom: 30 rpx;
    position: relative;

    .allImg {
      width: 100%;
      height: 100%;
    }

    .infoImg {
      width: 89 rpx;
      height: 89 rpx;
      border-radius: 50%;
      position: absolute;
      top: 56 rpx;
      left: 44 rpx;
      overflow: hidden;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .storeTitle {
      font-size: 28 rpx;
      color: #333333;
      line-height: 28 rpx;
      position: absolute;
      top: 62 rpx;
      left: 150 rpx;
    }

    .times {
      font-size: 20 rpx;
      color: #666666;
      position: absolute;
      top: 105 rpx;
      left: 148 rpx;
    }

    .limit {
      font-size: 16 rpx;
      color: #FF565F;
      position: absolute;
      left: 148 rpx;
      top: 140 rpx;
    }

    .all-coupon {
      font-size: 10px;
      color: #FF565F;
      position: absolute;
      top: 140 rpx;
      left: 148 rpx;
    }

    .prices {
      width: 110 rpx;
      height: 40 rpx;
      line-height: 40 rpx;
      padding-left: 12 rpx;
      padding-right: 13 rpx;
      color: #333333;
      font-size: 30 rpx;
      position: absolute;
      top: 41 rpx;
      left: 534 rpx;

      text {
        margin-left: 11 rpx;
        font-size: 52 rpx;
      }
    }

    .man {
      height: 19 rpx;
      font-size: 20 rpx;
      color: #666666;
      position: absolute;
      top: 95 rpx;
      left: 534 rpx;
    }

    .button {
      width: 125 rpx;
      height: 44 rpx;
      line-height: 44 rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 44 rpx;
      font-size: 22 rpx;
      color: #F43131;
      text-align: center;
      position: absolute;
      top: 133 rpx;
      left: 527 rpx;
    }

    .yishiyong {
      position: absolute;
      width: 106 rpx;
      height: 106 rpx;
      top: 47 rpx;
      left: 455 rpx;
    }
  }

  .lasts {
    font-size: 14px;
    padding-top: 30 rpx;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;

    .lefts {
      color: #666666;
    }

    .rights {
      margin-left: 10 rpx;
      color: #F43131;
    }
  }

  .defaults {
    margin: 0 auto;
    width: 640 rpx;
    height: 480 rpx;
    padding-top: 100 rpx;
  }

  /* 猜你喜欢 */
  .container {
    margin-top: 30 rpx;
    padding: 0 20 rpx;
  }

  .fenge {
    text-align: center;
    padding: 30 rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .caini {
    font-size: 30 rpx;
    margin-left: 13 rpx;
    margin-right: 13 rpx;
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
    width: 345 rpx;
    height: 345 rpx;
  }

  .item-name {
    font-size: 24 rpx;
    padding: 0 10 rpx;
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
    height: 3 rpx;
    width: 44 rpx;
  }

  .price {
    margin-top: 20 rpx;
    padding: 0 10 rpx 20 rpx;
  }

  .n_price {
    color: #ff0000;
    font-size: 34 rpx;

    span {
      font-size: 24 rpx;
    }
  }

  .o_price {
    margin-left: 15 rpx;
    color: #afafaf;
    font-size: 24 rpx;
    text-decoration: line-through;
  }

</style>
