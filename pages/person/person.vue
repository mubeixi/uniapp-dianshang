<template>
  <view @click="commonClick" class="person">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background: #f81111;"></view>
    <!-- #endif -->
    <view class="personTop">
      <image :src="'/static/client/person/top.png'|domain" class="bg"></image>
      <image :class="userInfo.User_ID&&show>0?'':'onlyMsg'" :src="'/static/client/fenxiao/msg.png'|domain"
             @click="goMsg"
             class="msg"></image>
      <view :class="signin?'isQian':''" @click="signinMethod" class="qiandao" v-if="userInfo.User_ID&&show>0">
        <image :src="'/static/client/person/qiandao.png'|domain" class="imgg"></image>
        <view class="viewl">{{signin?'已签到':'签到'}}</view>
      </view>
      <view class="personInfo flex">
        <view @click="goPersonMsg" class="left">
          <image :src="(userInfo.User_HeadImg||'/static/client/default.png')|domain" class="image"
                 style="border-radius: 50%;"></image>
        </view>
        <view :style="{position:!userInfo.User_ID?'relative':'static'}" class="right flex1">
          <view @click="goLogin" class="font14 loginBtn" plain size="mini" v-if="!userInfo.User_ID">登录/注册</view>
          <view @click="goPersonMsg" class="nickName" v-if="userInfo.User_ID">
            {{userInfo.User_NickName||(userInfo.User_No?('用户'+userInfo.User_No):'暂无昵称')}}
            <block v-if="userInfo.User_NickName">({{userInfo.User_No}})</block>
          </view>
          <view @click="goVip" class="cart" v-if="userInfo.User_ID && initData.user_switch">{{userLevelText()}}
            <image :src="'/static/client/person/rightCart.png'|domain" class="image"></image>
          </view>
        </view>
      </view>
      <view class="nav">
        <view @click="goBalance" class="navList first" v-if="initData.charge_switch==1">
          <image :src="'/static/client/person/yue.png'|domain" class="imgr" mode=""></image>
          <view class="viewr">
            余额
          </view>
        </view>
        <view @click="goIntegral" class="navList second">
          <image :src="'/static/client/person/jifen.png'|domain" class="imgr" mode=""></image>
          <view class="viewr">
            积分
          </view>
        </view>
        <view @click="goCollection" class="navList three">
          <image :src="'/static/client/person/shoucang.png'|domain" class="imgr" mode=""></image>
          <view class="viewr">
            收藏
          </view>
        </view>
        <view @click="goCoupon" class="navList four">
          <image :src="'/static/client/person/youhuijuan.png'|domain" class="imgr" mode=""></image>
          <view class="viewr" style="left: 50upx;">
            优惠券
          </view>
        </view>
      </view>
    </view>
    <view class="order">
      <view class="orderTop">
        <view class="orderLeft">商城订单</view>
        <view @click="goOrder(0)" class="orderRight">
          全部订单
          <image :src="'/static/client/person/right.png'|domain" class="image"></image>
        </view>
      </view>
      <view class="orderCenter">
        <view @click="goOrder(1)" class="orderLast">
          <image :src="'/static/client/person/pay.png'|domain" class="zxc"></image>
          <view class="views">
            待付款
          </view>
          <view class="jiaobiao" v-if="orderNum.waitpay>0">{{orderNum.waitpay}}</view>
        </view>
        <view @click="goOrder(2)" class="orderLast">
          <image :src="'/static/client/person/fa.png'|domain" class="zxc"></image>
          <view class="views">
            待发货
          </view>
          <div class="jiaobiao" v-if="orderNum.waitsend>0">{{orderNum.waitsend}}</div>
        </view>
        <view @click="goOrder(3)" class="orderLast">
          <image :src="'/static/client/person/shou.png'|domain" class="zxc"></image>
          <view class="views">
            待收货
          </view>
          <div class="jiaobiao" v-if="orderNum.waitconfirm>0">{{orderNum.waitconfirm}}</div>
        </view>
        <view @click="goOrder(4)" class="orderLast">
          <image :src="'/static/client/person/ping.png'|domain" class="zxc"></image>
          <view class="views">
            待评价
          </view>
          <div class="jiaobiao" v-if="orderNum.waitcomment>0">{{orderNum.waitcomment}}</div>
        </view>
      </view>
    </view>
    <view class="list">
      
      <block :key="index" v-for="(item,index) of personInit">
        
        <block v-if="item.field=='store_apply'||item.field=='store'">
          <block v-if="!!initData.is_store_apply">
            <view @click="goUrl(item.url)" class="setting cell" v-if="!Stores_ID&&item.field=='store_apply'">
              <image :src="item.img" class="left"></image>
              <view class="pintuan">{{item.name}}</view>
              <image :src="'/static/client/person/right.png'|domain" class="right"></image>
            </view>
            <view @click="goUrl(item.url)" class="setting cell" v-else-if="item.field=='store'&&Stores_ID">
              <image :src="item.img" class="left"></image>
              <view class="pintuan">{{item.name}}</view>
              <image :src="'/static/client/person/right.png'|domain" class="right"></image>
            </view>
          </block>
        </block>
        <view @click="goUrl(item.url)" class="group cell" v-else>
          <image :src="item.img" class="left"></image>
          <view class="pintuan">
            {{item.name}}
          </view>
          <image :src="'/static/client/person/right.png'|domain" class="right"></image>
        </view>
      </block>
      
      <!--			<view class="group cell" @click="goPintuanOrderlist">-->
      <!--				<image :src="'/static/client/person/pin.png'|domain" class="left"></image>-->
      <!--				<view class="pintuan">-->
      <!--					拼团订单-->
      <!--				</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      <!--			<view class="group cell" @click="goToOrder('spike')">-->
      <!--				<image src="/static/limitOrder.png" class="left"></image>-->
      <!--				<view class="pintuan">-->
      <!--					限时抢购订单-->
      <!--				</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      <!--			<view class="group cell" @click="goToOrder('flashsale')">-->
      <!--				<image src="/static/spikeOrder.png" class="left"></image>-->
      <!--				<view class="pintuan">-->
      <!--					秒杀订单-->
      <!--				</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      <!--			<view class="bargain cell" @click="goGift">-->
      <!--				<image :src="'/static/client/person/zengpin.png'|domain" class="left"></image>-->
      <!--				<view class="pintuan">-->
      <!--					赠品中心-->
      <!--				</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      <!--			<view class="bargain cell"  @click="goRenwu">-->
      <!--				<image :src="'/static/client/person/renwu.png'|domain" class="left"></image>-->
      <!--				<view class="pintuan">-->
      <!--					任务中心-->
      <!--				</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      <!--			<view class="bargain cell"  @click="gotoAddresslist" >-->
      <!--				<image :src="'/static/client/person/di.png'|domain" class="left"></image>-->
      <!--				<view class="pintuan">-->
      <!--					地址管理-->
      <!--				</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      <!--			<view class="bargain cell" @click="goRefundList()">-->
      <!--				<image :src="'/static/client/person/tui.png'|domain" class="left"></image>-->
      <!--				<view class="pintuan">-->
      <!--					退款/售后-->
      <!--				</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      <!--			<block v-if="!!initData.is_store_apply">-->
      <!--				<view class="setting cell" @click="goNew" v-if="!Stores_ID">-->
      <!--					<image :src="'/static/client/mendian/mendian.png'|domain" class="left"></image>-->
      <!--					<view class="pintuan">门店入驻</view>-->
      <!--					<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--				</view>-->
      <!--				<view class="setting cell" @click="goStore" v-else>-->
      <!--					<image :src="'/static/client/mendian/mendian.png'|domain" class="left"></image>-->
      <!--					<view class="pintuan">门店</view>-->
      <!--					<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--				</view>-->
      <!--			</block>-->
      <!--			<view class="setting cell" @click="goDistributor" v-if="initData.DisSwitch">-->
      <!--				<image src="/static/tabbar/fenxiao.png" class="left"></image>-->
      <!--				<view class="pintuan">管理中心</view>-->
      <!--				<image :src="'/static/client/person/right.png'|domain" class="right"></image>-->
      <!--			</view>-->
      
      <view @click="goSetting" class="setting cell">
        <image :src="'/static/client/person/she.png'|domain" class="left"></image>
        <view class="pintuan">
          设置
        </view>
        <image :src="'/static/client/person/right.png'|domain" class="right"></image>
      </view>
    
    </view>
    <view style="height: 118rpx;"></view>
    
    <!--		<tabbar-components/>-->
    
    <!--		<div class="space" style="height:60px"></div>-->
    <!--		<div class="safearea"></div>-->
    <!--		<tabbar-components></tabbar-components>-->
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import { mapActions, mapGetters, mapState } from 'vuex'
import { get_user_info, getFuncModule, getOrderNum, judgeSignin, signin } from '../../common/fetch.js'
// import TabbarComponents from "../../components/TabbarComponents";

export default {
  mixins: [pageMixin],
  components: {},
  data () {
    return {
      // userInfo:{}
      show: 1, // 是否能签到 0不显示签到 1 直接签到   2  跳转签到
      signin: 0, // 0未签到  1 已签到
      isLodnig: false,
      orderNum: '', // 订单状态角标数
      Order_Type: 'shop', // 请求的订单类型
      personInit: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'initData']),
    ...mapState(['Stores_ID']),
  },
  onLoad () {
    this.initPerson()
  },
  methods: {
    ...mapActions(['setUserInfo', 'getUserInfo']),
    goUrl (item) {
      uni.navigateTo({
        url: item,
      })
    },
    initPerson () {
      getFuncModule({ type: '2' }).then(res => {
        this.personInit = res.data
      }).catch(e => {
        error(e.msg || '初始化个人中心失败')
      })
    },
    goDistributor () {
      uni.navigateTo({
        url: '/pages/fenxiao/fenxiao',
      })
    },
    goStore () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/storeCenter',
      })
    },
    goNew () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/procurement/storeSettled',
      })
    },
    userLevelText () {
      if (this.userInfo && this.userInfo.User_Level) {
        return this.userInfo.User_Level.level_name
      }
      return '普通用户'
    },
    goIntegral () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/integralCenter',
      })
    },
    goBalance () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/balanceCenter',
      })
    },
    // 获取角标
    getOrderNum () {
      if (!this.$fun.checkIsLogin()) {
        this.orderNum = []
        return
      }
      getOrderNum({ Order_Type: this.Order_Type }).then(res => {
        this.orderNum = res.data
      }).catch(e => {
      })
    },
    goVip () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/vipGrade',
      })
    },
    goCoupon () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/coupon',
      })
    },
    goRefundList () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/refundList',
      })
    },
    goMsg () {
      uni.navigateTo({
        url: '/pagesA/systemMsg/systemMsg',
      })
    },
    // 签到
    signinMethod () {
      if (!this.$fun.checkIsLogin(1)) return
      if (this.isLodnig) return
      this.isLodnig = true
      if (this.signin == 1 && this.show != 2) {
        uni.showToast({
          title: '今日已签到',
          icon: 'none',
        })
        this.isLodnig = false
        return
      }
      if (this.show == 1) {
        signin().then(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
          })
          this.signin = 1
          this.isLodnig = false
        }).catch(e => {
        })
      } else if (this.show == 2) {
        this.isLodnig = false
        uni.navigateTo({
          url: '/pagesA/person/qiandao',
        })
      }
    },
    // 获取签到状态
    judgeSignin () {
      judgeSignin({}, { errtip: false }).then(res => {
        this.show = res.data.show
        this.signin = res.data.signin
      }).catch(e => {
      })
    },

    goLogin () {
      this.$fun.checkIsLogin(1)
    },
    goPintuanOrderlist () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pages/order/pintuanOrderlist',
      })
    },
    // 去赠品中心
    goGift () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/myGift',
      })
    },
    goSetting () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/editAccount',
      })
    },
    // 去任务中心
    goRenwu () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/taskCenter',
      })
    },
    // 去收藏页
    goCollection () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/collection',
      })
    },
    goToOrder (item) {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pages/order/order?Order_Type=' + item,
      })
    },
    // 去订单页
    goOrder (item) {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pages/order/order?index=' + item,
      })
    },
    // 去地址管理
    gotoAddresslist () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pages/addressList/addressList',
      })
    },
    // 去个人信息页
    goPersonMsg () {
      if (!this.$fun.checkIsLogin(1)) return
      uni.navigateTo({
        url: '/pagesA/person/personalMsg',
      })
    },
  },
  onShow () {
    if (JSON.stringify(this.userInfo) != '{}') {
      get_user_info({}, {
        tip: '',
        errtip: false,
      }).then(res => {
        this.setUserInfo(res.data)
      }).catch(e => {
      })
    }
    this.getOrderNum()
    if (this.$fun.checkIsLogin()) {
      this.judgeSignin()
    }
  },
  async onPullDownRefresh () {
    if (JSON.stringify(this.userInfo) != '{}') {
      await get_user_info({}, {
        tip: '',
        errtip: false,
      }).then(res => {
        this.setUserInfo(res.data)
      }).catch(e => {
      })

      await getOrderNum({ Order_Type: this.Order_Type }).then(res => {
        this.orderNum = res.data
      }).catch(e => {
      })

      await judgeSignin({}, { errtip: false }).then(res => {
        this.show = res.data.show
        this.signin = res.data.signin
      }).catch(e => {
      })
    }
    uni.stopPullDownRefresh()
  },
}
</script>

<style lang="scss" scoped>
  .person {
    background-color: rgb(241, 241, 241);
    
    .personTop {
      width: 750 rpx;
      height: 373 rpx;
      position: relative;
      
      .bg {
        width: 100%;
        height: 100%;
      }
      
      .qiandao {
        width: 120 rpx;
        height: 45 rpx;
        background: rgb(249, 142, 142);
        box-shadow: 0px 1 rpx 6 rpx 0px rgba(167, 53, 50, 1);
        //opacity:0.45;
        border-radius: 20 rpx;
        position: absolute;
        top: 22 rpx;
        right: 20 rpx;
        display: flex;
        align-items: center;
        padding: 11 rpx 20 rpx;
        justify-content: space-between;
        box-sizing: border-box;
        
        .imgg {
          width: 22 rpx;
          height: 22 rpx;
        }
        
        .viewl {
          color: #FFFFFF;
          font-size: 24 rpx;
          font-weight: 500;
        }
      }
      
      .personInfo {
        position: absolute;
        left: 57 rpx;
        right: 57 rpx;
        top: 80 rpx;
        height: 100 rpx;
        display: flex;
        
        .left {
          width: 100 rpx;
          height: 100 rpx;
          border-radius: 50%;
          
          .image {
            width: 100%;
            height: 100%;
          }
        }
        
        .right {
          margin-left: 19 rpx;
          padding-top: 10 rpx;
          
          .loginBtn {
            padding: 4px 10px;
            color: white;
            border: 1px solid #e7e7e7;
            border-radius: 4px;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
          
          .nickName {
            font-size: 30 rpx;
            height: 30 rpx;
            line-height: 30 rpx;
            //overflow: hidden;
            color: #FFFFFF;
            font-weight: bold;
            width: 500 rpx;
            white-space: nowrap;
            overflow-x: scroll;
            visibility: middle;
            overflow-y: hidden;
          }
          
          .nickName::-webkit-scrollbar {
            display: none;
          }
          
          .cart {
            margin-top: 19 rpx;
            font-size: 22 rpx;
            color: #FFFFFF;
            //width:136rpx;
            height: 42 rpx;
            line-height: 42 rpx;
            display: inline-block; //flex;
            align-items: center;
            padding-left: 16 rpx;
            padding-right: 12 rpx;
            background: rgb(249, 142, 142);
            border-radius: 20 rpx;
            box-sizing: border-box;
            
            .image {
              width: 13 rpx;
              height: 20 rpx;
              margin-left: 9 rpx;
            }
          }
        }
      }
      
      .nav {
        width: 711 rpx;
        height: 240 rpx;
        background-color: #FFFFFF;
        position: absolute;
        top: 233 rpx;
        left: 19 rpx;
        box-shadow: 0px 5 rpx 12 rpx 1 rpx rgba(222, 71, 66, 0.41);
        border-radius: 20 rpx;
        padding-top: 67 rpx;
        padding-bottom: 57 rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        
        .navList {
          width: 177 rpx;
          height: 100%;
          text-align: center;
          position: relative;
          
          .viewr {
            font-size: 28 rpx;
            color: #333333;
            font-weight: 500;
            position: absolute;
            bottom: 10 rpx;
            left: 60 rpx;
          }
        }
        
        .first {
          .imgr {
            width: 53 rpx;
            height: 60 rpx;
          }
        }
        
        .second {
          .imgr {
            width: 58 rpx;
            height: 58 rpx;
          }
        }
        
        .three {
          .imgr {
            width: 56 rpx;
            height: 54 rpx;
          }
        }
        
        .four {
          .imgr {
            width: 65 rpx;
            height: 46 rpx;
          }
        }
      }
    }
    
    .order {
      margin: 140 rpx 20 rpx 25 rpx 20 rpx;
      width: 710 rpx;
      height: 268 rpx;
      background-color: #FFFFFF;
      border-radius: 20 rpx;
      
      .orderTop {
        width: 710 rpx;
        box-sizing: border-box;
        height: 70 rpx;
        padding: 0 20 rpx;
        line-height: 70 rpx;
        border-bottom: 1px solid #ECE8E8;
        display: flex;
        justify-content: space-between;
        
        .orderLeft {
          font-size: 28 rpx;
          font-weight: bold;
        }
        
        .orderRight {
          font-size: 26 rpx;
          color: #666666;
          display: flex;
          align-items: center;
          
          .image {
            width: 17 rpx;
            height: 26 rpx;
            margin-left: 12 rpx;
          }
        }
      }
      
      .orderCenter {
        height: 198 rpx;
        padding-top: 42 rpx;
        padding-bottom: 49 rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        
        .orderLast {
          width: 177.5 rpx;
          height: 107 rpx;
          text-align: center;
          position: relative;
          
          .zxc {
            width: 65 rpx;
            height: 65 rpx;
          }
          
          .views {
            font-size: 26 rpx;
            color: #333333;
          }
        }
      }
    }
    
    .list {
      width: 710 rpx;
      //height: 533rpx;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 20 rpx;
      padding-left: 22 rpx;
      padding-right: 18 rpx;
      box-sizing: border-box;
      
      .line {
        height: 1px;
        background: rgba(236, 232, 232, 1);
      }
      
      .cell {
        border-bottom: 1px solid $wzw-border-color;
        
        &:last-child {
          border-bottom: none;
        }
      }
      
      .group {
        height: 94 rpx;
        display: flex;
        align-items: center;
        
        .left {
          width: 33 rpx;
          height: 31 rpx;
          margin-left: 7 rpx;
        }
        
        .right {
          width: 17 rpx;
          height: 26 rpx;
          margin-left: auto;
          margin-right: 4 rpx;
        }
        
        .pintuan {
          margin-left: 13 rpx;
          font-size: 28 rpx;
          color: #333333;
        }
      }
      
      .bargain {
        height: 86 rpx;
        display: flex;
        align-items: center;
        
        .left {
          width: 32 rpx;
          height: 34 rpx;
          margin-left: 7 rpx;
        }
        
        .right {
          width: 17 rpx;
          height: 26 rpx;
          margin-left: auto;
          margin-right: 4 rpx;
        }
        
        .pintuan {
          margin-left: 13 rpx;
          font-size: 28 rpx;
          color: #333333;
        }
      }
      
      .setting {
        height: 90 rpx;
        display: flex;
        align-items: center;
        
        .left {
          width: 36 rpx;
          height: 36 rpx;
          margin-left: 7 rpx;
        }
        
        .right {
          width: 17 rpx;
          height: 26 rpx;
          margin-left: auto;
          margin-right: 4 rpx;
        }
        
        .pintuan {
          margin-left: 13 rpx;
          font-size: 28 rpx;
          color: #333333;
        }
      }
      
    }
  }
  
  .msg {
    width: 45 rpx;
    height: 45 rpx;
    position: absolute;
    top: 22 rpx;
    right: 175 rpx;
  }
  
  .onlyMsg {
    right: 25 rpx;
  }
  
  .isQian {
    padding-left: 12 rpx !important;
    padding-right: 12 rpx !important;
  }
  
  .jiaobiao {
    position: absolute;
    top: -6rpx;
    right: 42 rpx;
    width: 24 rpx;
    height: 24 rpx;
    padding: 4 rpx;
    border-radius: 50%;
    background-color: #f43131;
    border: 1px solid #F43131;
    font-size: 24 rpx !important;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff !important;
  }
</style>
