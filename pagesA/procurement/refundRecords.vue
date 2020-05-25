<template>
  <view @click="commonClick" class="wrap">
    <view style="height: 90rpx;margin-bottom: 10px">
      <scroll-view class="order-status" scroll-x="true" style="width: 750rpx;white-space: nowrap;">
        <view :class="[status == 0 ? 'active' : '']" @click="changeStatus (0)" class="status">全部</view>
        <view :class="[status == 31 ? 'active' : '']" @click="changeStatus(31)" class="status">待处理</view>
        <view :class="[status == 32 ? 'active' : '']" @click="changeStatus(32)" class="status">待发货</view>
        <view :class="[status == 33 ? 'active' : '']" @click="changeStatus(33)" class="status">已驳回</view>
        <view :class="[status == 34 ? 'active' : '']" @click="changeStatus(34)" class="status">已发货</view>
        <view :class="[status == 35 ? 'active' : '']" @click="changeStatus(35)" class="status">已收货</view>
        <view :class="[status == 36 ? 'active' : '']" @click="changeStatus(36)" class="status">已收款</view>
        <view :class="[status == 37 ? 'active' : '']" @click="changeStatus(37)" class="status">已取消</view>
      </scroll-view>
    </view>
    <block v-if="back_list.length>0">
      <view :key="index" @click="hidden_tip" class="prolist" v-for="(item,index) of back_list">
        <view class="pro-title">
          <view>退货单号：{{item.id}}</view>
          <view class="status">{{item.status_desc}}
            <block v-if="item.status == 33">
              <image @click.stop="show_pro_tip(index)" class="qty-icon" mode="" src="/static/procurement/i.png"></image>
              <view class="tips" v-if="item.pro_tip_show && item.reason">
                <view class="sanjiaoxing"></view>
                {{item.reason}}
              </view>
            </block>
          </view>
        </view>
        <view class="biz-msg">
          <image :src="item.receive_img" class="avator" mode=""></image>
          <view class="biz-name">{{item.receive_name}}
            <view class="biz-links" v-if="item.receive_id > 0">(
              <text @click="showStore(item.receive_id)" class="text-d">查看门店信息</text>
              )
            </view>
          </view>
        </view>
        <view class="list-msg" v-for="pro of item.prod_list">
          <view class="pro-msg">
            <view class="pro-img">
              <image :src="pro.prod_img" class="img" mode=""></image>
            </view>
            <view class="pro-info">
              <view class="pro-name">{{pro.prod_name}}</view>
              <view class="pro-attr">
                <view class="attr-info">{{pro.attr_info.attr_name}}</view>
                <view class="pro-qty">x{{pro.prod_count}}
                </view>
              </view>
              <view class="pro-price">
                <text class="price-icon">￥</text>
                {{pro.prod_price}}
              </view>
            </view>
          </view>
        </view>
        <view class="totalinfo">总计：
          <text class="price-icon">￥</text>
          <text class="price-num">{{item.price}}</text>
        </view>
        <view class="btns">
          <view @click="cancelOrder(item.id)" class="btn" v-if="item.status == 31 || item.status == 32">取消</view>
          <view @click="send(item.id)" class="btn back" v-if="item.status == 32">发货</view>
          <view @click="reciveMoney(item.id)" class="btn back" v-if="item.status == 35">确认收款</view>
        </view>
      </view>
      <view class="list-bottom">我是有底线的</view>
    </block>
    <div class="defaults" v-else>
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
    <!--  门店信息	-->
    <view class="sku-pop mendian" v-if="isShowStoreMsg">
      <view class="sku-title">门店信息</view>
      <view class="sku-content">
        <view class="skulist">
          <view class="sku-name">门店名称：</view>
          <view class="sku-item">{{storeInfo.Stores_Name}}</view>
        </view>
        <view class="skulist">
          <view class="sku-name">门店电话：</view>
          <view class="sku-item">{{storeInfo.mobile}}</view>
        </view>
        <view @click="showAdress" class="skulist">
          <view class="sku-name">门店地址：</view>
          <view class="sku-item" style="flex:1;">
            {{storeInfo.Stores_Province_name}}{{storeInfo.Stores_City_name}}{{storeInfo.Stores_Area_name}}{{storeInfo.Stores_Address}}
            <image class="img" src="/static/local.png"></image>
          </view>
        </view>
        <view @click="showAdress" class="skulist" v-if="storeInfo.distance">
          <view class="sku-name">门店距离：</view>
          <view class="sku-item">{{storeInfo.distance}}KM</view>
        </view>
      </view>
    </view>
    <!-- 修改渠道 -->
    <view class="sku-pop" v-if="isChangeChannel">
      <view class="sku-title">修改渠道</view>
      <view class="sku-content" style="padding-left:53rpx;">
        <view class="skulist">
          <view class="nochecked"></view>
          <view>平台进货</view>
        </view>
        <view class="skulist">
          <image class="selected" mode="" src="/static/selected.png"></image>
          <view>门店进货</view>
        </view>
        <view class="skulist">
          <input class="input" placeholder="请输入门店编号" placeholder-style="color: #C9C9C9;font-size: 24rpx;" type="text"
                 value="" />
        </view>
        <view class="skulist change-btn">
          <view class="btn cancel">取消</view>
          <view class="btn confirm">确定</view>
        </view>
      </view>
    </view>
    <!--  遮罩层	-->
    <view :hidden="isHidden" @click="hiddenMask" class="mask"></view>
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import {
  getStoreDetail,
  getStoreProdBackOrder,
  storeProdBackOrderCancel,
  storeProdBackOrderConfirm
} from '../../common/fetch.js'
import { mapGetters } from 'vuex'
import { getLocation } from '../../common/tool/location'
import { error, modal } from '@/common'

export default {
  mixins: [pageMixin],
  data () {
    return {
      pro_tip_show: false,
      isHidden: true,
      isShowStoreMsg: false,
      isChangeChannel: false,
      change_type: 0, // 进货渠道， 0 是平台 1是门店,
      status: 0, // 31 待处理  32待发货 33已驳回 34已发货 35 已确认收货 36已确认收款 37已取消
      receive_id: 0,
      page: 1,
      pageSize: 10,
      back_list: [], // 退货单列表
      storeInfo: [] // 门店信息
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  onShow () {
    this.getStoreProdBackOrder()
  },
  methods: {
    // 确认收款
    reciveMoney (order_id) {
      storeProdBackOrderConfirm({
        store_id: this.Stores_ID,
        order_id: order_id
      }).then(res => {
        uni.showToast({
          title: res.msg
        })
        setTimeout(() => {
          this.load()
        }, 1000)
      }).catch(() => {
        modal('操作失败')
      })
    },
    // 发货
    send (order_id) {
      uni.navigateTo({
        url: '/pagesA/procurement/purchaseSend?order_id=' + order_id
      })
    },
    // 取消退货单
    cancelOrder (order_id) {
      uni.showModal({
        content: '确认退货？',
        cancelText: '我再想想',
        confirmText: '我意已决',
        success: (res) => {
          if (res.confirm) {
            storeProdBackOrderCancel({
              store_id: this.Stores_ID,
              order_id: order_id
            }).then((res) => {
              uni.showToast({
                title: res.msg
              })
              setTimeout(() => {
                this.load()
              }, 1000)
            }).catch(() => {
              modal('操作失败')
            })
          } else {

          }
        }
      })
    },
    changeStatus (status) {
      if (status == this.status) return
      this.status = status
      this.load()
    },
    // 重新获取一下
    load () {
      this.reset()
      this.getStoreProdBackOrder()
    },
    reset () {
      this.back_list = []
      this.page = 1
    },
    // 获取退款单
    getStoreProdBackOrder () {
      getStoreProdBackOrder({
        store_id: this.Stores_ID,
        status: this.status,
        page: this.page,
        pageSize: this.pageSize
      }, { tip: '加载中...' }).then(res => {
        res.data.forEach(item => {
          item.pro_tip_show = false
        })
        this.back_list = res.data
      }).catch(() => {
        modal('获取信息失败')
      })
    },
    show_pro_tip (index) {
      this.back_list[index].pro_tip_show = true
    },
    hidden_tip () {
      this.back_list.forEach(item => {
        item.pro_tip_show = false
      })
    },
    showAdress () {
      uni.openLocation({
        latitude: this.storeInfo.wx_lat,
        longitude: this.storeInfo.wx_lng,
        success: function () {
        }
      })
    },
    showStore (id) {
      this.storeInfo = {}
      this.isHidden = false
      this.isShowStoreMsg = true
      let lat = ''
      let lng = ''
      getLocation(this).then(res => {
        if (res.code === 0) {
          lng = res.data.longitude
          lat = res.data.latitude
          const data = {
            lat: lat,
            lng: lng,
            store_id: id
          }
          getStoreDetail(data).then(res => {
            this.storeInfo = res.data
            this.storeInfo.distance = (res.data.distance / 1000).toFixed(2)
          }).catch(() => {
            error('获取信息失败')
          })
        }
      }).catch(err => {
        const data = {
          store_id: id
        }
        getStoreDetail(data).then(res => {
          this.storeInfo = res.data
        }).catch(() => {
          error('获取信息失败')
        })
      })
    },
    hiddenMask () {
      this.isShowStoreMsg = false
      this.isHidden = true
      this.isChangeChannel = false
    },
    changeChannel () {
      this.isChangeChannel = true
      this.isHidden = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    .list-bottom,
    .nodata {
      text-align: center;
      color: #999;
      margin-bottom: 20rpx;
    }

    .nodata {
      margin-top: 20rpx;
    }

    font-size: 26rpx;
    padding: 0 20rpx;
    min-height: 100vh;
    background-color: #F6F6F6;

    .order-status {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      background-color: #F6F6F6;
      // height: 90rpx;
      display: flex;
      align-items: center;
      // justify-content: center;
      text-align: center;

      .status {
        display: inline-block;
        width: 138rpx;
        /*margin-right: 30rpx;*/
        line-height: 80rpx;

        &.active {
          color: $wzw-primary-color;
          border-bottom: 2px solid $wzw-primary-color;
        }
      }

      & .status:nth-last-child(1) {
        margin-right: 0;
      }
    }

    .prolist {
      width: 710rpx;
      margin-bottom: 10px;
      padding: 0 16rpx 42rpx 14rpx;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 10px;

      .pro-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 75rpx;
        line-height: 75rpx;
        color: #777777;
        // padding: 0 20rpx;
        border-bottom: 2rpx solid #E6E6E6;

        .status {
          position: relative;
          color: $wzw-primary-color;

          .tips {
            position: absolute;
            top: 50rpx;
            right: -12rpx;
            width: 200rpx;
            padding: 20rpx;
            background: #fff;
            box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);

            .sanjiaoxing {
              position: absolute;
              top: -14rpx;
              right: 30rpx;
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

          .qty-icon {
            width: 22rpx;
            height: 22rpx;
            margin-left: 10rpx;
          }
        }

        .img {
          width: 26rpx;
          height: 31rpx;
        }
      }

      .biz-msg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 107rpx;

        .avator {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }

        .biz-name {
          display: flex;
          align-items: center;
          flex: 1;
          font-size: 28rpx;
          color: #333;

          .biz-links {
            color: $wzw-primary-color;
            font-size: 24rpx;
            margin-left: 14rpx;

            .text-d {
              text-decoration: underline;
              padding: 0 10rpx;
            }
          }
        }
      }

      .list-msg {
        .pro-msg {
          display: flex;
          margin-top: 20rpx;
          padding-bottom: 30rpx;
          box-sizing: border-box;

          .pro-img {
            width: 200rpx;
            height: 200rpx;
            margin-right: 28rpx;

            .img {
              width: 200rpx;
              height: 200rpx;
            }
          }

          .pro-info {
            display: flex;
            width: 500rpx;
            flex-direction: column;
            justify-content: space-between;

            .pro-name {
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .pro-attr {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 25rpx;
              margin-bottom: 23rpx;

              .attr-info {
                line-height: 50rpx;
                padding: 0 20rpx;
                background-color: #FFF5F5;
                color: #666;
                font-size: 24rpx;
              }

              .pro-qty {
                position: relative;

                .tips {
                  position: absolute;
                  top: 80rpx;
                  right: -12rpx;
                  width: 200rpx;
                  padding: 20rpx;
                  background: #fff;
                  box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);

                  .sanjiaoxing {
                    position: absolute;
                    top: -14rpx;
                    right: 30rpx;
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

                .qty-icon {
                  width: 22rpx;
                  height: 22rpx;
                  margin-left: 10rpx;
                }
              }
            }

            .pro-price {
              font-size: 30rpx;
              color: $wzw-primary-color;

              .price-icon {
                font-size: 24rpx;
              }
            }
          }
        }
      }

      .btns {
        display: flex;
        justify-content: flex-end;

        .btn {
          width: 155rpx;
          height: 60rpx;
          line-height: 60rpx;
          color: #666;
          text-align: center;
          background-color: #EEEEEE;
          border-radius: 10rpx;
        }

        .back {
          color: #fff;
          background: rgba(244, 49, 49, 1);
          margin-left: 10rpx;
        }
      }
    }

    .totalinfo {
      line-height: 85rpx;
      text-align: right;
      border-top: 2rpx solid #E6E6E6;

      .price-icon {
        font-size: 24rpx;
        color: $wzw-primary-color;
      }

      .price-num {
        font-size: 30rpx;
        color: $wzw-primary-color;
      }
    }
  }

  .mask {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  .sku-pop {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10000;
    width: 526rpx;
    transform: translate(-50%, -50%);
    border-radius: 10rpx;

    .sku-title {
      height: 60rpx;
      line-height: 60rpx;
      background-color: #f6f6f6;
      color: #333;
      font-size: 24rpx;
      text-align: center;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
    }

    .sku-content {
      padding: 40rpx 46rpx 34rpx 40rpx;
      background-color: #fff;
      border-bottom-left-radius: 10rpx;
      border-bottom-right-radius: 10rpx;

      .skulist {
        margin-bottom: 30rpx;
        display: flex;
        align-items: center;

        &.change-btn {
          padding-top: 43rpx;
          justify-content: center;
        }

        .selected,
        .nochecked {
          display: block;
          width: 40rpx;
          height: 40rpx;
          margin-right: 23rpx;
        }

        .nochecked {
          box-sizing: border-box;
          border: 2rpx solid rgba(214, 214, 214, 1);
          border-radius: 3px;
        }

        .input {
          width: 420rpx;
          height: 60rpx;
          border: 1px solid rgba(214, 214, 214, 1);
          font-size: 24rpx;
          padding-left: 24rpx;
          box-sizing: border-box;
          line-height: 36rpx;
        }

        .btn {
          width: 130rpx;
          height: 50rpx;
          text-align: center;
          line-height: 50rpx;
          background-color: #E9E9E9;
          font-size: 24rpx;
        }

        .cancel {
          color: #666;
          margin-right: 25rpx;
        }

        .confirm {
          color: #fff;
          background-color: $wzw-primary-color;
        }

        .sku-name {
          color: #333;
          font-size: 24rpx;
          margin-right: 26rpx;
        }

        .sku-item {
          display: flex;
          align-items: center;
          color: #666;
          /*flex: 1;*/
          .img {
            width: 27rpx;
            height: 32rpx;
          }

          .sku {
            width: 80rpx;
            height: 46rpx;
            line-height: 46rpx;
            text-align: center;
            background-color: #f6f6f6;
            color: #666;
            font-size: 24rpx;
            margin-right: 13rpx;
            border-radius: 5rpx;
          }

          .active {
            background-color: $wzw-primary-color;
            color: #fff;
          }

          .handle {
            width: 50rpx;
            height: 45rpx;
            line-height: 45rpx;
            text-align: center;
            font-size: 32rpx;
            color: #777;
            background: #f6f6f6;
          }

          .pro-num {
            margin: 0 15rpx;
            font-size: 24rpx;
            color: #777;
          }
        }
      }

      .sku-btns {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60rpx;

        .btn {
          width: 130rpx;
          height: 50rpx;
          text-align: center;
          line-height: 50rpx;
          font-size: 24rpx;
        }

        .cancel {
          background: #e9e9e9;
          color: #666;
          margin-right: 25rpx;
        }

        .confirm {
          background-color: $wzw-primary-color;
          color: #fff;
        }
      }
    }
  }

  .mendian {
    .sku-content {
      .sku-name {
        margin-right: 10rpx !important;
      }

      .sku-item {
        display: block !important;
        font-size: 26rpx !important;

        .img {
          margin-left: 10rpx;
        }
      }
    }
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }

  /deep/ .uni-scroll-view::-webkit-scrollbar {
    /* 隐藏滚动条，但依旧具备可以滚动的功能 */
    display: none
  }
</style>
