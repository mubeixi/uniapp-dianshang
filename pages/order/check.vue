<template>
  <view :class="selectStore?'over':''" @click="commonClick" v-if="loading">
    <div class="top" v-if="orderInfo.all_has_stores==1&&orderInfo.is_virtual == 0">
      <div class="tabs">
        <div :class="{active:tabIdx==0}" @click="changgeTabIdx(0)" class="tabs-item">快递发货</div>
        <div :class="{active:tabIdx==1}" @click="changgeTabIdx(1)" class="tabs-item">到店自提</div>
      </div>
    </div>
    <block v-if="orderInfo.is_virtual == 0 && tabIdx==0 ">
      <view @click="goAddressList" class="address bgwhite">
        <image :src="'/static/client/location.png'|domain" alt="" class="loc_icon"></image>
        <view class="add_msg" v-if="addressinfo.Address_Name">
          <view class="name">收货人：{{addressinfo.Address_Name}} <span>{{addressinfo.Address_Mobile | formatphone}}</span>
          </view>
          <view class="location">
            收货地址：{{addressinfo.Address_Province_name}}{{addressinfo.Address_City_name}}{{addressinfo.Address_Area_name}}{{addressinfo.Address_Town_name?addressinfo.Address_Town_name:''}}{{addressinfo.Address_Detailed}}
          </view>
        </view>
        <view class="add_msg" v-else>
          <view>暂无收货地址，去添加</view>
        </view>
        <image :src="'/static/client/right.png'|domain" alt="" class="right"></image>
      </view>
    </block>

    <div class="container bgwhite">
      <view class="biz_msg">
        <div style="display: flex;align-items: center;">
          <image :src="orderInfo.ShopLogo|domain" alt="" class="biz_logo" />
          <span class="biz_name">{{orderInfo.ShopName}}</span>
        </div>
        <div @click="multipleSelectStore" class="graytext2 font14 disMbx"
             v-if="tabIdx==0 && orderInfo.shipping_has_stores == 1">
          {{orderInfo.Stores_Name?orderInfo.Stores_Name+' 修改门店':'选择门店'}}
          <div class="zhouri">
            <image :src="'/static/client/right.png'|domain" alt="" style="width: 100%;height: 100%;"></image>
          </div>
        </div>
        <div @click="multipleSelectStore" class="graytext2 font14" v-if="tabIdx==1">批量选择门店</div>
      </view>
      <view class="order_msg">
        <block :key="pro_id" v-for="(pro,pro_id) in orderInfo.CartList">
          <div :key="attr_id" v-for="(attr,attr_id) in pro">
            <view class="pro">
              <img :src="attr.ImgPath" alt="" class="pro-img">
              <view class="pro-msg">
                <view class="pro-name">{{attr.ProductsName}}</view>
                <view class="attr" v-if="attr.Productsattrstrval"><span>{{attr.Productsattrstrval}}</span></view>
                <view class="pro-price"><span>￥</span>{{attr.ProductsPriceX}} <span class="amount">x<span class="num">{{attr.Qty}}</span></span>
                </view>
              </view>
            </view>
            <div @click="openStores(pro_id,attr_id,attr.store)" class="store-box" v-if="tabIdx==1">
              <div class="store-name">{{attr.store.Stores_Name||'选择门店'}}</div>
              <div class="funicon icon-fanhui icon"></div>
            </div>
            <div class="goods-hr"></div>
          </div>

        </block>
      </view>
      <block v-if="tabIdx==0">
        <view class="other" v-if="orderInfo.is_virtual == 0">
          <view class="bd">
            <view @click="changeShip" class="o_title">
              <span>运费选择</span>
              <span style="text-align:right; color: #888;">
                <span>{{shipping_name?(shipping_name + ' ' + (orderInfo.Order_Shipping.Price > 0 ? orderInfo.Order_Shipping.Price : '免运费')):'请选择物流'}}</span>
                <image :src="'/static/client/right.png'|domain" alt="" class="right"></image>
              </span>
            </view>
          </view>
        </view>
      </block>
      <block v-if="tabIdx==1||orderInfo.is_virtual == 1">
        <view class="other">
          <view class="bd">
            <view class="o_title  words">
              <span>购买人姓名</span>
              <input class="inputs" placeholder="请填写姓名" type="text" v-model="user_name">
            </view>
          </view>
        </view>
        <view class="other">
          <view class="bd">
            <view class="o_title  words">
              <span>购买人手机号</span>
              <input class="inputs" placeholder="请填写手机号码" type="text" v-model="user_mobile">
            </view>
          </view>
        </view>
      </block>
      <!-- <view class="other" v-if="orderInfo.is_virtual == 1">
        <view class="bd">
          <view class="o_title  words">
            <span>购买人姓名</span>
            <input class="inputs" type="text" v-model="user_name"  placeholder="请填写姓名">
          </view>
        </view>
      </view>
      <view class="other" v-if="orderInfo.is_virtual == 1">
        <view class="bd">
          <view class="o_title  words">
            <span>购买人手机号</span>
            <input class="inputs" type="text" v-model="user_mobile"  placeholder="请填写手机号码">
          </view>
        </view>
      </view> -->
      <view class="other" v-if="couponlist.length > 0">
        <view class="bd">
          <view @click="changeCoupon" class="o_title">
            <span>优惠券选择</span>
            <span style="text-align: right; color: #888;display: flex;align-items: center;">
              <span>{{couponlist.length>0?(coupon_desc?coupon_desc:'您有优惠券使用'): '暂无可用优惠券'}}</span>
              <image :src="'/static/client/right.png'|domain" alt="" class="right"></image>
            </span>
          </view>
        </view>
      </view>
      <view class="other" v-if="orderInfo.max_diyong_intergral > 0">
        <view class="bd">
          <view class="o_title">
            <span>是否参与积分抵扣</span>
            <switch :checked="intergralChecked" @change="intergralSwitchChange" color="#04B600" />
          </view>
          <view class="o_de" v-if="intergralChecked">您当前共有
            <text>{{userInfo.User_Integral}}</text>
            积分，每
            <text>{{orderInfo.Integral_Buy}}</text>
            积分可以抵扣
            <text>1</text>
            元，本次可使用
            <text>{{orderInfo.max_diyong_intergral}}</text>
            积分,总共可抵
            <text>{{orderInfo.max_Integral_Money}}</text>
            元
          </view>
        </view>
      </view>
      <view class="other" v-if="orderInfo.is_use_money == 1">
        <view class="bd">
          <view class="o_title">
            <span>是否使用余额</span>
            <switch :checked="userMoneyChecked" @change="userMoneyChange" color="#04B600" />
          </view>
          <view class="o_de">您当前最多使用余额:{{ userInfo.User_Money<orderInfo.Order_TotalPrice ? userInfo.User_Money:orderInfo.Order_TotalPrice }}</view>
          <input @blur="confirm_user_money" @focus="postData.use_money = 0" class="o_desc" placeholder="请输入金额" type="number" v-if="userMoneyChecked" v-model.number="postData.use_money" />
        </view>
      </view>
      <view class="other" v-if="initData.invoice_switch == 1">
        <view class="bd">
          <view class="o_title">
            <span>是否开具发票</span>
            <switch :checked="faPiaoChecked" @change="faPiaoChange" color="#04B600" />
          </view>
          <input @blur="faPiaoConfirm" class="o_desc" placeholder="请输入发票抬头和纳税人识别号" type="text" v-if="faPiaoChecked" />
        </view>
      </view>
      <view class="other">
        <view class="bd">
          <view class="o_title  words">
            <span>买家留言</span>
            <input @blur="remarkConfirm" class="inputs" placeholder="请填写留言内容" type="text">
          </view>
        </view>
      </view>
      <!-- <view class="total">
                <span style="margin-right:20rpx;">共<span>{{orderInfo.total_count}}</span>件商品</span>
                <span>小计：<span>￥</span><span class="money">{{orderInfo.Order_TotalPrice}}</span></span>
            </view> -->

      <view class="remind-wrap" v-if="remindAddress">
        <view class="remind-add">
          <view class="text-align-center mb20">新建收货地址</view>
          <view class="remind_desc">
            您还没有收货地址，请先添加一个新的收货地址
          </view>
          <view class="remind_btns text-align-center">
            <view @click="backFn" class="text-align-center fl1">返回</view>
            <view @click="goEditAdd" class="text-align-center fl1 confirm">
              新建
            </view>
          </view>
        </view>
      </view>
    </div>
    <view style="height: 50px;">
      <view :style="{'z-index':zIndex}" class="order_total">
        <view class="totalinfo">
          <view class="info">共{{orderInfo.prod_count}}件商品 总计：
            <text class="money">
              <text class="m_icon">￥</text>
              {{orderInfo.Order_Fyepay}}
            </text>
          </view>
          <view class="tips" v-if="orderInfo.obtain_desc">{{orderInfo.obtain_desc}}</view>
        </view>
        <view @click="seeDetail" class="mx">明细
          <image :class="isSlide?'slidedown': ''" class="image" src="/static/top.png"></image>
        </view>
        <form @submit="form_submit" report-submit>
          <button class="submit" formType="submit">提交订单</button>
        </form>
      </view>
    </view>
    <div class="safearea-box"></div>
    <popup-layer :bottomHeight="bottomHeight" :direction="'top'" @maskClicked="handClicked" ref="popupMX">
      <view class="mxdetail">
        <view class="mxtitle">明细</view>
        <view class="mxitem">产品原价
          <text class="num">{{orderInfo.Order_TotalAmount-orderInfo.Order_Shipping.Price}}</text>
        </view>
        <view class="mxitem" v-if="checkfrom">{{active_name}}
          <text class="num">{{orderInfo.Order_Fyepay}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.user_curagio_money > 0">会员折扣
          <text class="num">-{{orderInfo.user_curagio_money}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Manjian_Cash > 0">满减
          <text class="num">-{{orderInfo.Manjian_Cash}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Coupon_Money > 0">优惠券
          <text class="num">-{{orderInfo.Coupon_Money}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Integral_Money > 0">积分抵用
          <text class="num">-{{orderInfo.Integral_Money}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Order_Yebc > 0">余额
          <text class="num">-{{orderInfo.Order_Yebc}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Order_Shipping.Price > 0">运费
          <text class="num">+{{orderInfo.Order_Shipping.Price}}</text>
        </view>
      </view>
    </popup-layer>
    <popup-layer :direction="'top'" @maskClicked="handClickeds" ref="popupRef">
      <view class="bMbx" v-if="type=='shipping'">
        <view class="fMbx">运费选择</view>
        <view :key="shipid" class="iMbx" v-for="(ship,shipid) in orderInfo.shipping_company">
          <view>
            {{ship}}
          </view>
          <radio-group @change="ShipRadioChange" class="mbx-mbx">
            <radio :checked="shipid==ship_current" :value="shipid" class="mbxs" color="#F43131" style="float:right;" />
          </radio-group>
        </view>
      </view>
      <scroll-view class="bMbx" scroll-y="true" style="height:430rpx;width:95%;" v-if="type=='coupon'">
        <view class="fMbx scroll-view-item">优惠券选择</view>
        <radio-group @change="radioChange">
          <label :key="i" class="iMbx scroll-view-item" v-for="(coupon,i) in orderInfo.coupon_list">
            <block v-if="coupon.Coupon_ID">
              满{{coupon.Coupon_Condition}} - {{coupon.Coupon_Cash > 0 ? coupon.Coupon_Cash : coupon.Coupon_Discount}}
            </block>
            <block v-else>
              不使用优惠
            </block>

            <radio :checked="i===current" :value="''+coupon.Coupon_ID" color="#F43131" style="float:right;" />

          </label>
        </radio-group>
        <!-- <label class="iMbx scroll-view-item" >
          不使用优惠
          <radio-group @change="notUseCoupon">
            <radio  :checked="''===current" style="float:right;" color="#F43131"/>
          </radio-group>
        </label> -->
      </scroll-view>
      <view @click="closeMethod" class="sure">
        确定
      </view>
    </popup-layer>
    <store-list-components :pageEl="selfObj" @callFn="bindStores" @change="selectStore=false" catchtouchmove
                           direction="top" ref="stroeComp" style="z-index: 10000;" />
  </view>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import { createOrder, createOrderCheck, get_user_info, getAddress } from '../../common/fetch.js'
import { backFunc } from '../../common/tool.js'
import { pageMixin } from '../../common/mixin'
import { mapActions, mapGetters } from 'vuex'
import StoreListComponents from '../../components/StoreListComponents'

export default {
  mixins: [pageMixin],
  components: {
    StoreListComponents,
    popupLayer
  },
  data () {
    return {
      selfObj: null,
      selectStore: false,
      tabIdx: 0,
      show: false, // 遮罩层
      wl_show: false, // 物流选择
      checked: true,
      checked1: true,
      checked2: true,
      checked3: true,
      wl_list: [
        {
          name: '顺丰',
          price: '免邮',
          index: 0
        },
        {
          name: '中通',
          price: '免邮',
          index: 1
        },
        {
          name: '圆通',
          price: '￥20',
          index: 2
        }
      ],
      addressinfo: {}, // 收货地址信息
      orderInfo: {},
      type: 'shipping',
      cart_buy: '',
      current: '',
      couponlist: [], // 优惠券列表,
      coupon_id: '', // 优惠券id
      coupon_desc: '', // 优惠券选择描述
      use_integral: 0, // 用于抵扣的积分数
      use_money: 0, // 余额支付金额
      intergralChecked: false,
      userMoneyChecked: false,
      faPiaoChecked: false,
      ship_current: 0,
      shipping_name: '', // 物流信息描述
      postData: {
        cart_key: '',
        cart_buy: '',
        shipping_id: 0,
        address_id: '',
        coupon_id: '',
        use_integral: 0, // 用于抵扣的积分数
        use_money: 0, // 余额支付金额
        invoice_info: '', // 发票抬头
        order_remark: '' // 买家留言
      },
      Order_ID: 0,
      addressLoading: false, // 收货地址信息是否加载完
      orderLoading: false, // 订单信息是否加载完
      userLoading: false, // 个人信息是否加载完
      // remindAddress: false, // 提醒添加收货地址
      submited: false, // 是否已经提交过，防止重复提交
      back_address_id: 0,
      user_name: '',
      user_mobile: '',
      isSlide: false, // 查看明细是否已经弹出
      bottomHeight: 0, // 弹出层从哪里开始弹出，默认是0，明细从提交按钮上部50px
      zIndex: 3,
      setStoreMode: '',
      idD: '',
      checkfrom: '', // 支付订单的来源页面，用于展示明细活动价，spike,秒杀，limit限时抢购，group 拼团，
      shipping_store_id: '' // 选择的门店id
    }
  },
  filters: {
    formatphone: function (value) {
      if (value) {
        var len = value.length
        var xx = value.substring(3, len - 4)
        var values = value.replace(xx, '****')
        return values
      }
    }
  },
  onShow () {
    if (JSON.stringify(this.userInfo) !== '{}') {
      get_user_info().then(res => {
        this.setUserInfo(res.data)
      }).catch(e => {
      })
    }
    this.getAddress()
    // this.createOrderCheck(2);
  },
  async created () {
    // #ifdef H5
    this.selfObj = this
    // #endif
    // if(this.orderInfo.all_has_stores==1)
    // this.tabIdx = this.initData.order_submit_first;
    // let userInfo = this.getUserInfo(true);
  },
  onLoad (options) {
    this.postData.cart_key = options.cart_key
    if (options.cart_buy) {
      this.postData.cart_buy = options.cart_buy
    }
    if (options.checkfrom) {
      this.checkfrom = options.checkfrom
    }
  },
  computed: {
    loading () {
      return this.addressLoading && this.orderLoading
    },
    remindAddress () {
      return this.orderInfo.is_virtual === 0 && !this.addressinfo.Address_Name
    },
    active_name () {
      var str = ''
      switch (this.checkfrom) {
        case 'spike' :
          str = '秒杀价'
          break
        case 'limit' :
          str = '限时抢购价'
          break
        case 'group' :
          str = '拼团价'
      }
      return str
    },
    ...mapGetters(['userInfo', 'initData'])
  },
  methods: {
    changgeTabIdx (index) {
      this.tabIdx = index
      if (index === 0) {
        this.postData.shipping_id = this.idD
      } else if (index === 1) {
        this.idD = this.postData.shipping_id
        this.postData.shipping_id = 'is_store'
      }
    },
    bindStores (storeInfo) {
      if (this.tabIdx === 1) {
        this.selectStore = false
        this.postData.shipping_id = 'is_store'
      } else if (this.orderInfo.is_virtual === 1) {
        this.postData.shipping_id = ''
      } else {
        // 为了选择门店的时候的用户体验
        this.postData.shipping_id = '1'
      }
      this.shipping_store_id = storeInfo.Stores_ID
      // 新增
      this.postData.shipping_store_id = this.shipping_store_id
      if (this.setStoreMode === 'all') {
        // 居然是对象醉了
        for (var i in this.orderInfo.CartList) {
          for (var j in this.orderInfo.CartList[i]) {
            this.orderInfo.CartList[i][j].store = storeInfo
          }
        }

        this.orderInfo.Stores_Name = storeInfo.Stores_Name
      } else {
        const tempArr = this.setStoreMode.split('::')
        const prod_id = tempArr[0]
        const attr_id = tempArr[1]
        this.orderInfo.CartList[prod_id][attr_id].store = storeInfo
        this.orderInfo.Stores_Name = storeInfo.Stores_Name
      }
      this.$refs.stroeComp.close()

      if (this.postData.shipping_id === 'is_store') {
        const obj = {}
        for (const it in this.orderInfo.CartList) {
          for (const iq in this.orderInfo.CartList[it]) {
            obj[it] = {
              [iq]: this.orderInfo.CartList[it][iq].store.Stores_ID
            }
          }
        }
        this.postData.self_pick_store_id = JSON.stringify(obj)
      }

      // 新增
      // if(this.tabIdx==0){
      this.createOrderCheck()
      // }

      this.zIndex = 9
    },
    multipleSelectStore () {
      this.zIndex = 9
      this.selectStore = true
      this.setStoreMode = 'all'
      // let ids = Object.keys(this.orderInfo.CartList)
      const ids = {}
      for (const iq in this.orderInfo.CartList) {
        const arr = []
        for (const iw in this.orderInfo.CartList[iq]) {
          arr.push(iw)
        }
        ids[iq] = arr
      }
      this.$refs.stroeComp.show(ids)
    },
    openStores (prod_id, attr_id, store) {
      this.zIndex = 9
      this.selectStore = true
      this.setStoreMode = prod_id + '::' + attr_id
      const ids = { [prod_id]: [attr_id] }
      if (store) {
        this.$refs.stroeComp.show(ids, store.Stores_ID)
      } else {
        this.$refs.stroeComp.show(ids)
      }
    },
    ...mapActions(['getUserInfo', 'setUserInfo']),
    backFn () {
      backFunc()
    },
    // 查看明细
    seeDetail () {
      if (!this.isSlide) {
        this.bottomHeight = 50
        this.zIndex = 9999999
        this.$refs.popupMX.show()
      } else {
        this.$refs.popupMX.close()
        setTimeout(() => {
          this.zIndex = 99999
          this.bottomHeight = 0
        }, 500)
      }
      this.isSlide = !this.isSlide
    },
    handClicked () {
      this.isSlide = false
      setTimeout(() => {
        this.zIndex = 99999
        this.bottomHeight = 0
      }, 500)
    },
    handClickeds () {
      this.$refs.popupRef.close()
      setTimeout(function () {
        this.zIndex = 99999
      }, 1000)
    },
    // 跳转地址列表页
    goAddressList () {
      uni.navigateTo({
        url: '/pages/addressList/addressList?from=checkout&addressid=' + this.postData.address_id
      })
    },
    // 跳转新增地址页面
    goEditAdd () {
      uni.navigateTo({
        url: '/pagesA/editAddress/editAddress?from=checkout'
      })
    },
    // 提交订单
    form_submit (e) {
      if (!this.submited) {
        this.submited = true
        if (this.postData.need_invoice === 1 && this.postData.invoice_info === '' && this.initData.invoice_switch === 1) {
          this.submited = false
          if (this.postData.invoice_info === '') {
            uni.showToast({
              title: '发票信息不能为空',
              icon: 'none'
            })
            return
          }
        }

        if (this.tabIdx === 1 && this.postData.shipping_id !== 'is_store') {
          this.submited = false
          uni.showToast({
            title: '请选择门店',
            icon: 'none'
          })
          return
        }
        if (this.orderInfo.is_virtual === 0) {
          if (!this.postData.shipping_id) {
            uni.showToast({
              title: '请选择物流',
              icon: 'none'
            })
            this.submited = false
            return
          }
        }

        if (this.orderInfo.is_virtual === 1 || this.postData.shipping_id === 'is_store') {
          this.postData.user_name = this.user_name
          this.postData.user_mobile = this.user_mobile
        }

        if (this.postData.shipping_id === 'is_store') {
          const obj = {}
          for (const it in this.orderInfo.CartList) {
            for (const iq in this.orderInfo.CartList[it]) {
              obj[it] = {
                [iq]: this.orderInfo.CartList[it][iq].store.Stores_ID
              }
            }
          }
          this.postData.self_pick_store_id = JSON.stringify(obj)
        }

        if (this.shipping_store_id && this.orderInfo.shipping_has_stores === 1) {
          this.postData.shipping_store_id = this.shipping_store_id
        }
        createOrder(this.postData).then(res => {
          // 如果order_totalPrice <= 0  直接跳转 订单列表页
          if (res.data.Order_Status !== 1) {
            // 直接跳转订单列表页
            uni.redirectTo({
              url: '/pages/order/order'
            })
            return
          }
          this.Order_ID = res.data.Order_ID
          uni.redirectTo({
            url: '/pages/pay/pay?Order_ID=' + res.data.Order_ID + '&pagefrom=check'
          })
        }).catch(e => {
          uni.showToast({
            title: e.msg,
            icon: 'none'
          })
          this.submited = false
        })
      }
    },
    // 积分抵扣开关
    intergralSwitchChange (e) {
      this.intergralChecked = e.detail.value
      this.postData.use_integral = this.orderInfo.max_diyong_intergral
      if (!this.intergralChecked) {
        this.postData.use_integral = 0
      }

      this.createOrderCheck()
    },
    // 余额支付开关
    userMoneyChange (e) {
      this.userMoneyChecked = e.detail.value
      if (!this.userMoneyChecked) {
        this.postData.use_money = 0
      }
      this.createOrderCheck()
    },
    // 发票开关
    faPiaoChange (e) {
      this.faPiaoChecked = e.detail.value
      if (this.faPiaoChecked) {
        this.postData.need_invoice = 1
      } else {
        this.postData.need_invoice = 0
      }
    },
    // 发票抬头输入完成
    faPiaoConfirm (e) {
      // #ifdef H5
      // #endif
      const invoice_info = e.detail.value

      this.postData.invoice_info = invoice_info
    },
    // 余额支付输入完成
    confirm_user_money (e) {
      // #ifdef H5
      // #endif
      const input_money = e.detail.value
      // let user_money = this.userInfo.User_Money;
      // 用户的金额和订单金额比较，取较小的那个与用户输入金额比较
      const user_money = (this.userInfo.User_Money < this.orderInfo.Order_TotalPrice) ? this.userInfo.User_Money : this.orderInfo.Order_TotalPrice
      if (input_money < 0 || isNaN(input_money)) {
        uni.showToast({
          title: '输入金额有误',
          icon: 'none'
        })
        this.postData.use_money = 0
        return
      }
      if (input_money - user_money > 0) {
        uni.showModal({
          title: '提示',
          content: '金额大于最大使用余额',
          icon: 'none',
          showCancel: false
        })
        this.postData.use_money = user_money
        this.createOrderCheck()
        return
      }
      this.postData.use_money = Number(input_money).toFixed(2)
      this.createOrderCheck()
    },
    // 留言
    remarkConfirm (e) {
      // #ifdef H5
      // #endif
      this.postData.order_remark = e.detail.value
    },

    // 优惠券改变
    radioChange (e) {
      var couponlist = this.orderInfo.coupon_list
      for (var i = 0; i < couponlist.length; i++) {
        if (couponlist[i].Coupon_ID === e.target.value) {
          this.current = i
          break
        }
      }

      this.postData.coupon_id = e.target.value
    },
    // 物流改变
    ShipRadioChange (e) {
      for (var i in this.orderInfo.shipping_company) {
        if (i === e.target.value) {
          this.ship_current = i
          break
        }
      }

      this.postData.shipping_id = e.target.value
    },
    changeCoupon () {
      this.type = 'coupon'
      if (this.couponlist.length === 0) {
        return
      }
      this.$refs.popupRef.show()

      this.zIndex = 99
    },
    // 选择运费
    changeShip () {
      this.type = 'shipping'
      this.ship_current = this.postData.shipping_id
      this.$refs.popupRef.show()

      this.zIndex = 99
    },
    closeMethod () {
      if (this.type === 'coupon') {
        // 不使用优惠
        if (!this.postData.coupon_id) {
          this.coupon_desc = '暂不使用优惠'
          this.createOrderCheck()
          this.$refs.popupRef.close()
          return
        }
        for (var i in this.couponlist) {
          if (this.couponlist[i].Coupon_ID === this.postData.coupon_id) {
            this.coupon_desc = `满${this.couponlist[i].Coupon_Condition} - ${this.couponlist[i].Coupon_Cash > 0 ? this.couponlist[i].Coupon_Cash : this.couponlist[i].Coupon_Discount}`
          }
        }
      } else {
        for (var j in this.orderInfo.shipping_company) {
          if (j === this.postData.shipping_id) {
            this.shipping_name = `${this.orderInfo.shipping_company[j]}`
          }
        }
      }

      this.createOrderCheck()
      this.$refs.popupRef.close()
    },
    async getAddress () {
      uni.$on('fire', (data) => {
        this.back_address_id = data
      })
      var Address_ID
      if (this.back_address_id) { // 添加、选择收获地址返回
        Address_ID = this.back_address_id
      } else if (this.addressinfo.Address_ID) { // 有收获地址，则更新（防止收获地址编辑后返回）
        Address_ID = this.addressinfo.Address_ID
      }
      await getAddress({ Address_ID: Address_ID || 0 }).then(res => {
        // if (this.back_address_id) {  //添加、选择收获地址返回

        if (this.back_address_id && res.errorCode !== 0) { // 添加、选择收获地址返回
          uni.showModal({
            title: '错误',
            content: '收货地址获取失败',
            showCancel: false
          })
          return false
        }
        if (!res.data[0]) return
        if (res.data.length > 0) {
          this.addressinfo = res.data[0]
        }

        this.postData.address_id = this.addressinfo.Address_ID
        this.back_address_id = 0

        // 获取用户收货地址，获取订单信息，后台判断运费信息
      }).catch(() => {
      })
      this.createOrderCheck(2)
      this.addressLoading = true
    },
    createOrderCheck (num) {
      const oldOrderInfo = { ...this.orderInfo }
      createOrderCheck(this.postData).then(res => {
        this.postData.shipping_id = res.data.Order_Shipping.shipping_id
        for (var i in res.data.CartList) {
          for (var j in res.data.CartList[i]) {
            res.data.CartList[i][j].store = {}

            // 新增
            if (res.data.CartList[i][j].store_name && num === 2 && res.data.shipping_has_stores === 1) {
              res.data.CartList[i][j].store.Stores_Name = res.data.CartList[i][j].store_name
              res.data.CartList[i][j].store.Stores_ID = res.data.CartList[i][j].store_id
              res.data.Stores_Name = res.data.CartList[i][j].store_name
              // this.postData.shipping_id='is_store'
              this.postData.shipping_store_id = res.data.CartList[i][j].store_id
            }
            if (res.data.CartList[i][j].choose_store_info) {
              res.data.CartList[i][j].store.Stores_Name = res.data.CartList[i][j].choose_store_info.Stores_Name
              res.data.CartList[i][j].store.Stores_ID = res.data.CartList[i][j].choose_store_info.Stores_ID
            }
          }
        }
        this.orderInfo = Object.assign(oldOrderInfo, res.data)
        if (this.orderInfo.coupon_list.length > 0) {
          this.orderInfo.coupon_list.push({ Coupon_ID: '' })
        }

        // 如果该规格有门店 就优先后台设置的
        if (this.orderInfo.all_has_stores === 1 && num === 2 && this.orderInfo.is_virtual !== 1) {
          this.tabIdx = this.initData.order_submit_first
        }
        this.idD = this.postData.shipping_id
        this.shipping_name = this.orderInfo.shipping_company[this.idD]
        if (this.tabIdx === 1) {
          this.postData.shipping_id = 'is_store'
        }

        this.couponlist = res.data.coupon_list

        this.orderLoading = true

        for (var k in this.orderInfo.shipping_company) {
          if (k === this.postData.shipping_id) {
            this.shipping_name = `${this.orderInfo.shipping_company[k]}`
          }
        }
      }).catch(e => {
        uni.showToast({
          title: e.msg,
          icon: 'none'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    padding: 10px 0;

    .tabs {
      display: flex;
      justify-content: center;
      font-size: 14px;

      .tabs-item {
        width: 170 rpx;
        padding: 6px 0;
        margin-right: 70 rpx;
        color: #333;
        text-align: center;

        &.active {
          color: $wzw-primary-color;
          border-bottom: 2px solid $wzw-primary-color;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .wrap {
    background: #fff;
    /* #ifdef MP */
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    /* #endif */
  }

  .mxdetail {
    font-size: 28 rpx;
    line-height: 80 rpx;
    padding: 20 rpx 30 rpx;
    /* #ifndef APP-PLUS */
    padding-bottom: 100 rpx;
    /* #endif */
    .mxtitle {
      font-size: 28 rpx;
      text-align: center;
    }

    .mxitem {
      border-bottom: 1px solid #eaeaea;

      .num {
        float: right;
      }
    }
  }

  /* 收货地址 start */
  .address {
    /* margin: 15px 0 10px; */
    display: flex;
    align-items: center;
    padding: 44 rpx 38 rpx 45 rpx;
    border-bottom: 20 rpx solid #f8f8f8;

    .add_msg {
      flex: 1;
      font-size: 28 rpx;
    }

    .right {
      width: 18 rpx;
      height: 27 rpx;
      margin-left: 34 rpx;
    }
  }

  .container {
    padding-bottom: 60px;
  }

  .loc_icon {
    width: 41 rpx;
    height: 51 rpx;
    margin-right: 31 rpx;
  }

  .name {
    margin-bottom: 30 rpx;
    font-size: 28 rpx;
    color: #333;
    line-height: 22 rpx;
  }

  .name > span {
    margin-left: 10 rpx;
  }

  .location {
    font-size: 24 rpx;
    color: #333;
    line-height: 32 rpx;
  }

  /* 收货地址 end */
  /* 订单信息 start */
  .order_msg {
    padding: 0 40 rpx 0 30 rpx;
  }

  .biz_msg {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30 rpx;
    padding: 20 rpx 30 rpx 0 rpx;
  }

  .biz_logo {
    width: 70 rpx;
    height: 70 rpx;
    margin-right: 20 rpx;
    border-radius: 35 rpx;
  }

  .biz_name {
    font-size: 28 rpx;
    color: #333;
    line-height: 30 rpx;
  }

  .pro {
    display: flex;

  }

  .order_msg .pro:last-child {
    margin-bottom: 17 rpx
  }

  .order_msg {
    .store-box {
      padding: 15px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #555;

      .store-name {

      }

      .icon-fanhui {
        font-size: 14px;
        transform: rotate(180deg);
      }

    }

    .goods-hr {
      margin: 15px 0;
      height: 1px;
      background: #eee;
    }
  }

  .pro-img {
    width: 200 rpx;
    height: 200 rpx;
    margin-right: 28 rpx;
  }

  .pro-name {
    font-size: 26 rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    line-height: 30 rpx;
    height: 61 rpx
  }

  .pro-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .attr {
    display: inline-block;
    height: 50 rpx;
    line-height: 50 rpx;

    color: #666;
    font-size: 24 rpx;
    // padding: 0 20rpx;
    // margin: 25rpx 0 24rpx;
    span {
      padding: 14 rpx 20 rpx;
      margin: 25 rpx 0 24 rpx;
      background: #FFF5F5;
    }
  }

  .pro-price {
    color: #F43131;
    font-size: 36 rpx;

    span {
      font-size: 24 rpx;
      font-style: normal;
    }

    .amount {
      float: right;
      color: #333;
      font-size: 22 rpx;

      .num {
        font-size: 30 rpx;
      }
    }
  }

  /* 订单信息 end */
  /* 订单其他信息 start */
  .other {
    padding: 30 rpx 40 rpx 0 30 rpx;
    font-size: 22 rpx;

    .right {
      margin-left: 18 rpx;
      width: 15 rpx;
      height: 23 rpx;
    }
  }

  .other .bd {
    padding-bottom: 30 rpx;
    border-bottom: 2 rpx solid #efefef;
  }

  .o_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28 rpx;

    .inputs {
      font-size: 24 rpx;
    }
  }

  .o_title .van-switch {
    float: right;
  }

  .o_desc,
  .o_de {
    font-size: 22 rpx;
    margin-top: 10 rpx;

    text {
      color: #F43131;
    }
  }

  .o_de {
    color: #999;
  }

  .words {
    justify-content: flex-start;
  }

  .words .inputs {
    border: 0;
    margin-left: 20 rpx;
    flex: 1;
  }

  .total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 40 rpx 0;
    font-size: 24 rpx;
    padding-right: 30 rpx;
  }

  .total .money {
    font-size: 30 rpx;
    color: #F43131;
  }

  /* 订单其他信息 end */
  /* 提交订单 */
  .order_total {
    position: fixed;
    bottom: 0;
    /* #ifdef MP */
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    /* #endif */
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;

    .mx {
      font-size: 22 rpx;
      margin-right: 10 rpx;

      .image {
        width: 20 rpx;
        height: 20 rpx;
        margin-left: 10 rpx;
      }

      .slidedown {
        transform: rotate(180deg);
      }
    }
  }

  .submit {
    width: 270 rpx;
    background: #F43131;
    text-align: center;
    color: #fff;
    line-height: 50px;
    font-size: 34 rpx;
    border-radius: 0;
    border: none;
  }

  .totalinfo {
    flex: 1;
    text-align: center;
    line-height: 30 rpx;
  }

  .info {
    font-size: 24 rpx;

    .money {
      color: #F43131;
      font-size: 30 rpx;

      .m_icon {
        font-size: 24 rpx;
      }
    }
  }

  .tips {
    font-size: 20 rpx;
    color: #979797;
  }

  .bMbx {
    padding: 0 rpx 20 rpx;

    .fMbx {
      font-size: 32 rpx;
      height: 30 rpx;
      line-height: 30 rpx;
      text-align: center;
      padding: 36 rpx 0 rpx;
    }

    .iMbx {
      display: flex;
      justify-content: space-between;
      height: 104 rpx;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      align-items: center;
      font-size: 28 rpx;
    }
  }

  .sure {
    height: 90 rpx;
    width: 100%;
    background-color: #F43131;
    color: #fff;
    font-size: 32 rpx;
    margin-top: 96 rpx;
    line-height: 90 rpx;
    text-align: center;
  }

  // 提醒用户添加收货地址信息
  .remind-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .remind-add {
      background: #fff;
      width: 90%;
      padding: 50 rpx 0 0;
      border-radius: 20 rpx;
      overflow: hidden;

      .text-align-center {
        text-align: center;
      }

      .mb20 {
        margin-bottom: 20 rpx;
      }

      .remind_desc {
        padding: 0 20 rpx;
        font-size: 30 rpx;
        margin: 40 rpx 0;
        color: #666;
      }

      .remind_btns {
        display: flex;
        border-top: 1 rpx solid #efefef;
        line-height: 90 rpx;

        .fl1 {
          flex: 1;
        }

        .confirm {
          background: #F43131;
          color: #fff;
        }
      }
    }
  }

  .over {
    position: fixed;
    width: 750 rpx;
    z-index: 90;
    height: 100%;
    overflow: hidden;
  }

  .disMbx {
    display: flex;
    align-items: center;
  }

  .zhouri {
    width: 9px;
    height: 14px;
    margin-left: 5px;
  }

  .mbx-mbx {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
  }

  .mbxs {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }
</style>
