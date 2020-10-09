<template>
  <div @click="commonClick" class="myall" v-show="orderInfo.Order_ID">

    <div class="container">
      <div class="lists">
        <div class="item">

          <div class="goods-list">
            <block v-if="orderInfo.prod_list">
              <div class="goods" v-for="(item,idx2) in orderInfo.prod_list">
                <div :style="{backgroundImage:'url('+item.prod_img+')'}" class="l"></div>
                <div class="c">
                  <div class="title line10">{{item.prod_name}}</div>
                  <div class="line10 flex flex-between graytext font14 flex-vertical-center">
                    <div class="spec-key">{{item.attr_info.attr_name||$t('1369x0')}}</div>
                    <div class="numbox font16">
                      x{{item.prod_count}}
                    </div>
                  </div>
                  <div class="font14"><span class="danger-color">￥<span
                  class="price-num font16">{{item.prod_price}}</span></span></div>

                </div>
              </div>
            </block>

          </div>

        </div>
      </div>

    </div>

    <!--        <div class="order_msg">-->
    <!--            <div class="pro" v-for="(pro,pro_id) in orderInfo.prod_list" :key="pro_id">-->
    <!--                <image class="pro-img" :src="pro.prod_img" alt="" />-->
    <!--                <div class="pro-msg">-->
    <!--                    <div class="pro-name">{{pro.prod_name}}</div>-->
    <!--                    <div class="attr" v-if="pro.attr_info"><span>{{pro.attr_info.attr_name}}</span></div>-->
    <!--                    <div class="pro-price"><span>￥</span>{{pro.prod_price}} <span class="amount">x<span class="num">{{pro.prod_count}}</span></span></div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->

    <div class="infobox">
      <div class="title"><span class="tip"></span><span class="text">{{$t('1369x1')}}</span></div>
      <div class="row">
        <div class="label">{{$t('1369x2')}}</div>
        <div class="form-item">{{orderInfo.Order_ID}}</div>
      </div>
      <div class="row">
        <div class="label">{{$t('1369x3')}}</div>
        <div :style="{color:orderInfo.Order_Status!=2?'red':''}" class="form-item">{{orderInfo.Order_Status_desc}}</div>
      </div>
      <div class="row">
        <div class="label">{{$t('1369x4')}}</div>
        <div class="form-item">￥{{orderInfo.Order_TotalAmount}}</div>
      </div>
      <div class="row" v-if="orderInfo.Coupon_Money > 0">
        <div class="label">{{$t('1369x5')}}</div>
        <div class="form-item">￥-{{orderInfo.Coupon_Money}}</div>
      </div>
      <div class="row" v-if="orderInfo.Integral_Money > 0">
        <div class="label">{{$t('1369x6')}}</div>
        <div class="form-item">￥-{{orderInfo.Integral_Money}}</div>
      </div>
      <div class="row" v-if="orderInfo.Manjian_Cash > 0">
        <div class="label">{{$t('1369x7')}}</div>
        <div class="form-item">￥-{{orderInfo.Manjian_Cash}}</div>
      </div>
      <div class="row" v-if="orderInfo.user_curagio_money > 0">
        <div class="label">{{$t('1369x8')}}</div>
        <div class="form-item">￥-{{orderInfo.user_curagio_money}}</div>
      </div>
      <div class="row">
        <div class="label">{{$t('1369x9')}}</div>
        <div class="form-item danger-color">￥{{orderInfo.Order_TotalPrice}}</div>
      </div>
      <div class="row">
        <div class="label">{{$t('1369x10')}}</div>
        <div class="form-item">{{orderInfo.Integral_Get}}</div>
      </div>
      <div class="row">
        <div class="label">{{$t('1369x11')}}</div>
        <div class="form-item">{{orderInfo.Order_CreateTime | formatTime}}</div>
      </div>
      <div class="row">
        <div class="label">{{$t('1369x12')}}</div>
        <div class="form-item">{{orderInfo.Pay_time | formatTime}}</div>
      </div>
    </div>

    <div class="subbox" v-if="orderInfo.Order_Status==2">
      <button @click="subFn" class="subbtn" type="warn">{{$t('1369x13')}}</button>
    </div>

  </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import { formatTime } from '../../common/filter.js'
import { checkOrderByCode, getOrderDetail } from '../../common/fetch.js'
import { pageMixin } from '../../common/mixin'
import { confirm, error } from '../../common'
import PayComponents from '../../components/PayComponents.vue'
import { mapGetters } from 'vuex'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  components: {
    popupLayer,
    PayComponents

  },
  data () {
    return {
      JSSDK_INIT: false,
      orderInfo: {},
      Order_ID: 0,
      Order_Code: ''
    }
  },
  onLoad (options) {
    // if (options.Order_ID) {
    //     this.Order_ID = options.Order_ID;
    // }
    if (options.Order_Code) {
      this.Order_Code = options.Order_Code
    }
    // if(options.pagefrom =='check'){
    //     this.showDirect = true;
    // }
    // if(options.pagefrom == 'order') {
    //     // 来自订单列表页
    //     this.pageFromOrder = true;
    // }
    // // 获取支付方式
    // this.pay_arr = ls.get('initData').pay_arr;
  },
  filters: {
    formatTime: formatTime
  },
  onShow () {
    this.getOrderDetail()
    // this.get_user_info();// 获取用于可用余额
  },
  computed: {
    ...mapGetters(['Stores_ID']),
    invoiceChecked () {
      return this.openInvoice
    },
    moneyChecked () {
      return this.openMoney
    }
  },
  created () {

  },
  methods: {
    async subFn () {
      const confirmConf = {
        title: T._('1369d0'),
        confirmText: T._('1369d1'),
        showCancel: true,
        cancelText: T._('1369d2'),
        content: ''
      }
      await checkOrderByCode({
        Order_Code: this.Order_Code,
        store_id: this.Stores_ID
      }).then(res => {
        confirmConf.content = T._('1369d3')
        // toast('核销成功')
      }).catch(err => {
        error(err.msg || T._('1369d4'))
      })

      if (!confirmConf.content) return

      confirm(confirmConf).then(res => {
        // 需要跳转到一个页面
        // setTimeout(()=>{
        //     uni.navigateTo({
        //         url:'/pagesA/order/checkChannel'
        //     })
        // },1000)
        uni.navigateBack()
      }).catch(err => {
        uni.switchTab({
          url: '/pagesA/person/storeCenter'
        })
      })
    },

    // 订单详情
    getOrderDetail () {
      const _self = this
      getOrderDetail({
        Order_Code: this.Order_Code
      }, {
        tip: T._('1369d5'),
        noUid: true
      }).then(res => {
        if (res.data.Order_Status != 2) {
          confirm({
            title: T._('1369d6'),
            content: T._('1369d7') + res.data.Order_Status_desc
          }).then(res => {

          }).catch(err => {
          })
        }
        for (var i in res.data) {
          if (i == 'Order_Shipping') {
            res.data[i] = JSON.parse(res.data[i])
          }
          if (i == 'prod_list') {
            for (var j in res.data[i]) {
              for (var k in res.data[i][j]) {
                if (k == 'attr_info') {
                  res.data[i][j][k] = res.data[i][j][k] && JSON.parse(res.data[i][j][k])
                }
              }
            }
          }
        }
        this.orderInfo = res.data
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .myall {
    /*background-color: #FFFFFF;*/
  }

  .wrap {
    background: #fff;
  }

  .lists {
    .item {
      margin: 15px;
      background: white;
      border-radius: 4px;
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
              color: #333333
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

  .infobox {
    font-size: 14px;
    margin: 10px;
    background: white;

    .title {
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      padding: 10px 0;

      .tip {
        display: inline-block;
        width: 4px;
        height: 16px;
        background: $wzw-primary-color;
        border-radius: 2px;
        margin: 0 10px;
      }

      .text {

      }
    }

    .row {
      margin: 0 6px;
      display: flex;
      align-items: center;
      height: 24px;
      line-height: 24px;
      padding: 4px 0;

      .label {
        width: 90px;
        color: #666;
      }

      .form-item {
        color: #444;
        flex: 1;
      }

    }
  }

  .subbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;

    .subbtn {
      border-radius: 0;
    }
  }
</style>
