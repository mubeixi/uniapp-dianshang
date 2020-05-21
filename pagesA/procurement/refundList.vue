<template>
  <div @click="commonClick" class="wrap">
    <div class="navs">
      <div :class="tabidx===5?'active':''" @click="changIndex(5)" class="nav-item">全部</div>
      <div :class="tabidx===0?'active':''" @click="changIndex(0)" class="nav-item">待确认</div>

      <div :class="tabidx===1?'active':''" @click="changIndex(1)" class="nav-item">待发货</div>
      <div :class="tabidx===2?'active':''" @click="changIndex(2)" class="nav-item">待收货</div>
      <div :class="tabidx===3?'active':''" @click="changIndex(3)" class="nav-item">待退款</div>
      <div :class="tabidx===4?'active':''" @click="changIndex(4)" class="nav-item">已完成</div>
    </div>
    <view class="space-box">
    </view>
    <div class="container">
      <div :key="index" class="order" v-for="(item,index) of applys">
        <template v-if="item.prod_list.length>0">
          <div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>
          <div style="height: 20rpx;"></div>
          <div class="bizinfo">
            <!-- <img :src="item.ShopLogo" alt="">
            <span class="bizname">{{item.ShopName}}</span>
            <span class="status">{{item.Order_Status_desc}}</span> -->
            <span class="bizname">订单编号:</span>
            <span class="status">{{item.Back_Sn}}</span>
          </div>
          <block :key="k" v-for="(i,k) of item.prod_list">
            <div @click="goDetail(item)" class="pro">
              <div class="pro-div">
                <img :src="i.prod_img" class="pro-img">
              </div>
              <div class="pro-msg">
                <div class="pro-name">{{i.prod_name}}</div>
                <div class="attr"><span>{{i.attr_name||'无规格'}}</span></div>
                <div class="pro-price"><span>￥</span>{{i.prod_price}} <span class="amount">x{{i.prod_count}}</span>
                </div>
              </div>
            </div>
          </block>
          <div class="text-right font14 line10 graytext2">
            共<span class="color555">{{item.prod_list.length}}</span>件商品,
            <span>退回余额:<span class="font16 danger-color"><span
            class="span font12">￥</span>{{item.refund_money_fee}} </span>,</span>
            <span>原路退回:<span class="font16 danger-color"><span
            class="span font12">￥</span>{{item.refund_pay_fee}} </span></span>
          </div>
          <div class="btn-group">
            <span class="span" style="border: 0rpx;color: red;">{{item.Back_Status_desc}}</span>
            <block v-if="item.Order_Store==Stores_ID">
              <span @click="openRefuseDialog(item.Back_ID)" class="span" v-if='item.Back_Status==0'>拒单</span>
              <span @click="sureOrder(item.Back_ID)" class="span"
                    v-if='item.Back_Status==0||item.Back_Status==1'>确认</span>
              <span @click="sureShou(item.Back_ID)" class="span" v-if='item.Back_Status==2'>收货</span>
            </block>

          </div>
        </template>
      </div>

    </div>

    <wzw-dialog ref="refuseApply">
      <div class="refuseApplyDialog">
				<textarea :value="reason" @input="bingReasonInput" auto-height class="reason"
                  placeholder="请输入驳回原因" placeholder-style="color:#999" />
        <div class="control">
          <div @click="cancelRefuseApply" class="action-btn btn-cancel">取消</div>
          <div @click="refuseApply" class="btn-sub action-btn">确定</div>
        </div>
      </div>
    </wzw-dialog>

    <wzw-dialog ref="sureReason">
      <div class="refuseApplyDialog">
        <input class="inputs" placeholder="请输入退款总金额" type="number" v-model="priceValue">
        <textarea :value="reasons" @input="bingReasonInputs" class="reason reasons" placeholder="请输入原因"
                  placeholder-style="color:#999" />
        <div class="control">
          <div @click="cancelRefuseApplys" class="action-btn btn-cancel">取消</div>
          <div @click="refuseApplys" class="btn-sub action-btn">确定</div>
        </div>
      </div>
    </wzw-dialog>

  </div>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import { mapGetters } from 'vuex'
import { getBackOrder, systemConfirmApply, systemReceiptRefundProd, systemRefuseApply } from '../../common/fetch'
import { error, toast } from '../../common'

export default {
  mixins: [pageMixin],
  name: 'refundList',
  data () {
    return {
      applys: [],
      activeApply: null,
      tabidx: -1,
      reason: '',
      totalCount: 0,
      reasons: '',
      priceValue: '',
      backItem: '',
      paginate: {
        page: 1,
        pageSize: 20
      }
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  onLoad () {
    this.tabidx = 5
  },
  onShow () {
    this.paginate.page = 1
    this.loadInfo()
  },
  methods: {
    refuseApplys () {
      if (!this.priceValue) {
        error('请输入退款总金额')
        return
      }
      const data = {
        Back_ID: this.backItem,
        Amount: this.priceValue,
        reason: this.reasons,
        store_id: this.Stores_ID
      }
      systemReceiptRefundProd(data).then(res => {
        toast(res.msg)
        this.loadInfo()
      })
    },
    cancelRefuseApplys () {
      this.reasons = ''
      this.priceValue = ''
      this.$refs.sureReason.close()
    },
    sureShou (item) {
      // systemReceiptRefundProd
      this.backItem = item
      this.$refs.sureReason.show()
    },
    sureOrder (item) {
      const data = {
        Back_ID: item,
        store_id: this.Stores_ID
      }
      systemConfirmApply(data).then(res => {
        uni.showToast({
          title: res.msg
        })
        this.loadInfo()
      })
    },
    goDetail (item) {
      uni.navigateTo({
        url: '/pagesA/person/refundDetail?Back_ID=' + item.Back_ID + '&store_id=' + this.Stores_ID
      })
    },
    cancelRefuseApply () {
      this.$refs.refuseApply.close()
    },
    openRefuseDialog (apply) {
      this.activeApply = apply
      this.$refs.refuseApply.show()
    },
    refuseApply () {
      if (!this.reason) {
        error('请填写理由')
        return
      }
      systemRefuseApply({
        Back_ID: this.activeApply,
        reason: this.reason,
        store_id: this.Stores_ID
      }, { tip: '处理中' }).then(res => {
        this.$refs.refuseApply.close()
        this.reason = ''
        uni.showToast({
          title: res.msg
        })
        this.loadInfo()
      }, err => {
      })
    },
    bingReasonInput (e) {
      this.reason = e.detail.value
    },
    bingReasonInputs (e) {
      this.reasons = e.detail.value
    },
    changIndex (idx) {
      if (idx == this.tabidx) return
      this.tabidx = idx
      this.paginate.page = 1

      this.loadInfo()
    },
    inArray (val, arr) {
      return arr.indexOf(val) != -1
    },
    async loadInfo () {
      const data = {
        ...this.paginate,
        store_id: this.Stores_ID
      }
      if (this.tabidx != 5) {
        data.Back_Status = this.tabidx
      }

      await getBackOrder(data, { tip: '加载中' }).then(res => {
        this.totalCount = res.totalCount
        this.applys = res.data

        for (const item of this.applys) {
          for (const it of item.prod_list) {
            if (it.attr_info) {
              it.attr_info = JSON.parse(it.attr_info)
              it.attr_name = it.attr_info.attr_name
            }
          }
        }
      }, err => {

      })
    }
  },
  onReachBottom () {
    if (this.applys.length >= this.totalCount) return
    this.loadInfo()
  }
}
</script>

<style lang="scss" scoped>
  .navs {
    z-index: 2;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 80rpx;
    line-height: 80rpx;
    //background: #fff;
    background-color: #F8F8F8;
    font-size: 14px;
    padding: 0 10px;

    .nav-item {
      flex: 1;
      /*box-sizing: border-box;*/
      text-align: center;
      /*position: relative;*/
      color: #333;
    }

    .nav-item.active {
      color: $wzw-primary-color;
      border-bottom: 2px solid $wzw-primary-color;
    }
  }

  .space-box {
    height: 50px;
    width: 100%;
    // background: white;
  }

  .lists {
    .item {
      margin: 10px 15px 10px;
      background: white;
      border-radius: 10px;
      overflow: hidden;

      .head {

        .info {
          padding: 10px;
          align-items: center;
          font-size: 14px;

          .store-info {
            align-items: center;
          }

          .store-pic {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            margin-right: 10px;
          }

          .store-title {
            margin-right: 10px;
            color: #333;
          }

          .action {
            color: $wzw-primary-color;

            .action-item {
              text-decoration: underline;
              cursor: pointer;
            }
          }

          .order_no {
            margin-left: 30px;
            color: #666;
          }
        }

        .status {
          font-size: 12px;
          border-bottom: 1px solid #E6E6E6;
          padding: 10px;
          align-items: center;

          .icon-delete {
            width: 14px;
            height: 14px;
          }

          .el-icon-delete-solid {
            cursor: pointer;
            color: #999;

            &:hover {
              color: #F43131;
            }
          }
        }
      }

      .goods-list {
        border-bottom: 1px solid #EDEDED;

        .goods {
          display: flex;
          align-items: center;
          padding: 10px;

          .l {
            width: 100px;
            height: 100px;
            background-size: cover;
            background-repeat: no-repeat;
            background-color: #f2f2f2;
            background-position: center;
          }

          .c {
            flex: 1;
            padding: 0 0 0 10px;

            .title {
              font-size: 14px;
              height: 40px;
              line-height: 20px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .spec-key {
              background: #FFF5F5;
              font-size: 12px;
              padding: 6px 10px;
              color: #666666;
            }

            .numbox {
              position: relative;
              color: #333333;

              .tips {
                position: absolute;
                top: 50rpx;
                right: -12rpx;
                width: 200rpx;
                padding: 20rpx;
                background: #fff;
                z-index: 1000;
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

        }

      }

      .price-box {
        text-align: right;
        padding: 10px;
        font-size: 14px;
      }

      .actions {
        text-align: right;
        padding: 0 10px;

        .acion-btn {
          margin-bottom: 10px;
          margin-left: 10px;
        }

      }

    }
  }

  .storeInfoDialog {
    width: 560rpx;
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;

    .row {
      display: flex;
      margin-bottom: 8px;

      .label {
        color: #999;
        width: 70px;
      }

      .text {
        flex: 1;
        color: #444;
      }
    }
  }

  .refuseApplyDialog {
    width: 560rpx;
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;

    .reason {
      font-size: 14px;
      min-height: 200px;
      border: 1px solid #E3E3E3;
      line-height: 1.4;
      height: auto;
      width: auto;
      padding: 10px;
    }

    .inputs {
      font-size: 14px;
      border: 1px solid #E3E3E3;
      line-height: 1.4;
      padding: 10px;
      height: auto;
      width: auto;
      margin-bottom: 10px;
    }

    .reasons {
      min-height: 20px;
    }

    .control {
      margin-top: 15px;
      display: flex;
      justify-content: center;

      .action-btn {
        width: 70px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        text-align: center;
        color: #666;
        background: #e9e9e9;

        &.btn-sub {
          background: $wzw-primary-color;
          color: white;
          margin-left: 10px;
        }
      }
    }
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
      position: relative;

    }
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }

  .order {
    padding: 0rpx 20rpx;
    background: #fff;
    position: relative;

    .bizinfo {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      width: 100%;
      // img {
      //     width: 70rpx;
      //     height: 70rpx;
      //     border-radius: 50%;
      //     margin-right: 21rpx;
      // }
      .bizname {
        // flex: 1;
        font-size: 28rpx;
      }

      .status {
        color: red;
        font-size: 26rpx;
      }
    }

    .pro {
      display: flex;
      margin-bottom: 50rpx;
      margin-top: 30rpx;
    }

    .pro-msg {
      margin-left: 27rpx;
      width: 476rpx;
    }

    .pro-div {
      width: 200rpx;
      height: 200rpx;
    }

    .pro-img {
      width: 100%;
      height: 100%;
    }

    .pro-name {
      font-size: 26rpx;
      margin-bottom: 20rpx;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .attr {
      display: inline-block;
      height: 50rpx;
      line-height: 50rpx;
      background: #FFF5F5;
      color: #666;
      font-size: 24rpx;
      padding: 0 20rpx;
      margin-bottom: 20rpx;
    }

    .pro-price {
      color: #F43131;
      font-size: 36rpx;
    }

    .pro-price span {
      font-size: 24rpx;
      font-style: normal;
    }

    .amount {
      font-size: 30rpx;
      float: right;
      color: #333;
    }

    .total {
      font-size: 24rpx;
      margin: 40rpx 0rpx;
      margin-right: 15rpx;

      .price {
        color: red;
        font-size: 30rpx;

        .p-span {
          font-size: 24rpx;
        }
      }
    }

    .btn-group {
      text-align: right;
      padding-bottom: 30rpx;

      .span {
        display: inline-block;
        //width: 150rpx;
        padding: 0rpx 24rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        border: 1px solid #999;
        border-radius: 10rpx;
        color: #999;
        font-size: 26rpx;

        &:last-child {
          margin-left: 14rpx;
        }

        &.active {
          color: #fff;
          background: #F43131;
          border: none;
        }
      }
    }
  }

  .text-right {
    text-align: right;
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    padding-top: 100rpx;
  }
</style>
