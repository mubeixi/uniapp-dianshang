<template>
  <view :style="{'min-height':height+'px'}" @click="commonClick" class="all">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
    <!-- #endif -->
    <!-- <page-title title="物流追踪" rightHidden="true" bgcolor="#ffffff" ></page-title> -->
    <view class="wuliu box-sizing" v-if="pro.list">
      <image :src="pro.imgpath" class="image"></image>
      <view>
        <view class="fonts">
          <view class="left">
            物流状态:
          </view>
          <view class="right">
            {{pro.shipping_status}}
          </view>
        </view>
        <view class="fonts">
          <view class="left">
            物流公司:
          </view>
          <view>
            {{pro.shipping_express}}
          </view>
        </view>
        <view class="fonts" v-if="pro.shipping_no">
          <view class="left">
            物流单号:
          </view>
          <view>
            {{pro.shipping_no}}
          </view>
        </view>
        <view class="fonts" v-if="pro.delivery_man_phone">
          <view class="left">
            派送员电话:
          </view>
          <view @click="call">
            {{pro.delivery_man_phone}}
          </view>
        </view>
      </view>
    </view>
    <view class="box-sizing xiangxi">
      <block :key="index" v-for="(item,index) of pro.list">
        <view class="center" v-if="index==0">
          <view class="lefts">
            <view class="tops">
              <view class="views"></view>
            </view>
            <view class="bottoms" v-if="(index+1)<pro.list.length">

            </view>
          </view>
          <view class="rights">
            <view class="tops">
              {{item.AcceptStation}}
            </view>
            <view class="bottoms">
              {{item.AcceptTime}}
            </view>
          </view>
        </view>
        <view class="center" v-else>
          <view class="lefts">
            <view class="tops unBgcolor">
              <view class="views"></view>
            </view>
            <view class="bottoms" v-if="(index+1)<pro.list.length">

            </view>
          </view>
          <view class="rights">
            <view class="tops unColor">
              {{item.AcceptStation}}
            </view>
            <view class="bottoms">
              {{item.AcceptTime}}
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import { getOrderExpress } from '../../common/fetch.js'
import { error } from '../../common'

export default {
  mixins: [pageMixin],
  data () {
    return {
      height: 1000, // 获取手机屏幕高度
      pro: [],
      order_id: ''
    }
  },
  onLoad (options) {
    const {
      express,
      prod_img,
      shipping_id,
      order_id
    } = options
    this.express = express
    this.order_id = order_id
    this.prod_img = prod_img
    this.shipping_id = shipping_id
    const that = this
    uni.getSystemInfo({
      success: function (res) {
        that.height = res.screenHeight - 68
      }
    })
  },
  onShow () {
    this.getOrderExpress()
  },
  methods: {
    call () {
      uni.makePhoneCall({
        phoneNumber: this.pro.delivery_man_phone
      })
    },
    getOrderExpress () {
      const data = {
        shipping_id: this.shipping_id,
        express: this.express,
        prod_img: this.prod_img,
        order_id: this.order_id
      }
      getOrderExpress(data).then(res => {
        this.pro = res.data
      }).catch(e => {
        error(e.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #f8f8f8;
  }

  .wuliu {
    width: 710 rpx;
    height: 200 rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 20 rpx;
    margin: 0 auto;
    margin-top: 20 rpx;
    padding-top: 27 rpx;
    padding-left: 32 rpx;
    display: flex;
    padding-bottom: 10 rpx;

    .image {
      width: 72 rpx;
      height: 72 rpx;
      margin-right: 30 rpx;
    }

    .fonts {
      font-size: 24 rpx;
      color: #999999;
      display: flex;
      height: 40 rpx;
      line-height: 30 rpx;

      .left {
        margin-right: 10 rpx;
      }

      .right {
        color: #F43131;
      }
    }
  }

  .xiangxi {
    margin-top: 25 rpx;
    width: 710 rpx;
    background: #FFFFFF;
    border-radius: 20 rpx;
    padding: 45 rpx 0 rpx 0 rpx 42 rpx;
    margin: 0 auto;

    .center {
      padding: 10px 0px;
      width: 626 rpx;
      display: flex;

      .lefts {
        width: 32 rpx;
        position: relative;

        .tops {
          width: 32 rpx;
          height: 32 rpx;
          background-color: #FFE4E4;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .views {
            width: 16 rpx;
            height: 16 rpx;
            background-color: #F43131;
            border-radius: 50%;
          }
        }

        .bottoms {
          width: 4 rpx;
          height: 100%;
          background-color: #ECECEC;
          position: absolute;
          top: 32 rpx;
          left: 14 rpx;
        }
      }

      .rights {
        margin-left: 28 rpx;

        .tops {
          font-size: 28 rpx;
          color: #F43131;
          // height: 30rpx;
          line-height: 30 rpx;
        }

        .bottoms {
          margin-top: 19 rpx;
          font-size: 24 rpx;
          color: #AAAAAA;
          height: 30 rpx;
          line-height: 30 rpx;
        }
      }

      .unColor {
        color: #777777 !important;
      }

      .unBgcolor {
        background-color: #ECECEC !important;

        .views {
          background-color: #AFAFAF !important;
        }
      }

    }
  }

</style>
