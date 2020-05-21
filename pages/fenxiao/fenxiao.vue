<template>
  <view @click="commonClick" class="all">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background: #f81111;"><!-- 这里是状态栏 --></view>
    <!-- #endif -->
    <view class="top">
      <image :src="'/static/client/fenxiao/top.png'|domain" class="image"></image>
      <!-- #ifdef APP-PLUS -->
      <view class="title">分销中心</view>
      <!-- #endif -->
      <div v-if="userInfo.User_ID&&userInfo.Is_Distribute==1">
        <image :src="'/static/client/fenxiao/msg.png'|domain" @click="goMsg" class="msg"
               v-if="userInfo.User_ID"></image>
        <view class="person">
          <image :src="data.disInfo.Shop_Logo||data.disInfo.User_HeadImg" @click="tofenxiaoshang"
                 class="image" style="border-radius: 50%;overflow: hidden"></image>
        </view>
        <view @click="tofenxiaoshang" class="nickName" v-if="userInfo.User_ID&&userInfo.Is_Distribute==1">
          {{data.disInfo.Shop_Name}}
        </view>
        <view @click="goDistributor" class="putong" v-if="userInfo.User_ID&&userInfo.Is_Distribute==1">
          {{data.disInfo.Level_Name}}
          <image :src="'/static/client/person/right.png' | domain" class="rightMy"
                 v-if="data.disInfo.Level_Name"></image>
        </view>
      </div>
      
      <view @click="goLogin" class="font14 loginBtn" plain size="mini" v-if="!userInfo.User_ID">登录/注册</view>
      <view @click="goDistributor" class="font14 loginBtn" plain size="mini"
            v-if="userInfo.User_ID && userInfo.Is_Distribute!=1">成为{{commi_rename.commi}}
      </view>
      <view class="sales">
        <view @click="goSales" class="left">
          <view class="salesSum">
            累计业绩（元）
            <image :src="'/static/client/person/right.png' | domain" class="rightMys"></image>
          </view>
          <view class="salesSumPrice" v-if="userInfo.User_ID&&userInfo.Is_Distribute">
            {{data.total_sales}}
          </view>
          <view class="salesSumPrice" v-else>
            {{'—'}}
          </view>
        </view>
        <view @click="goProfit" class="right">
          <view class="salesSum">
            累计利润（元）
            <image :src="'/static/client/person/right.png' | domain" class="rightMys"></image>
          </view>
          <view class="salesSumPrice" v-if="userInfo.User_ID&&userInfo.Is_Distribute">
            {{data.total_income}}
          </view>
          <view class="salesSumPrice" v-else>
            {{'—'}}
          </view>
        </view>
      </view>
    
    </view>
    <view class="center" v-if="userInfo.User_ID&&userInfo.Is_Distribute">
      <view>可提现金额</view>
      <view>
        {{data.balance}}
      </view>
      <view @click="tixian">
        提现
      </view>
    </view>
    <view style="height: 25px;" v-else></view>
    <view class="last">
      <image :src="'/static/client/fenxiao/background.png'|domain" class="back"></image>
      <view class="zhezhao">
        <view :key="index" @click="goOther(item)" class="td" v-for="(item,index) in funcModules">
          <image :src="item.img" class="imgs"></image>
          <view class="views">
            {{item.name}}
          </view>
        </view>
      </view>
    </view>
    <view style="height: 50rpx;"></view>
    <!--		<tabbar-components />-->
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import { get_user_info, getDisInit, getFuncModule } from '../../common/fetch.js'
import { mapActions, mapGetters } from 'vuex'
// import TabbarComponents from "../../components/TabbarComponents";
export default {
  mixins: [pageMixin],
  components: {
    // TabbarComponents
  },
  data () {
    return {
      data: {
        dis_config: {},
        disInfo: {},
        total_sales: '',
        total_income: '',
        balance: '',
      }, //
      pro: [],
      funcModules: [], // 功能模块
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'commi_rename']),
  },
  methods: {
    ...mapActions(['getUserInfo', 'setUserInfo']),
    goSales () {
      if (!this.$fun.checkIsLogin(1, 1)) return
      if (!this.$fun.checkIsDistribute(1, 1)) return
      uni.navigateTo({
        url: '/pagesA/fenxiao/salesSum',
      })
    },
    goProfit () {
      if (!this.$fun.checkIsLogin(1, 1)) return
      if (!this.$fun.checkIsDistribute(1, 1)) return
      uni.navigateTo({
        url: '/pagesA/fenxiao/profitSum',
      })
    },
    goDistributor () {
      // 跳转成为
      uni.navigateTo({
        url: '/pages/fenxiao/distributorLevel',
      })
    },
    goLogin () {
      // 直接跳转取登录
      this.$fun.checkIsLogin(1)
    },
    goMsg () {
      uni.navigateTo({
        url: '/pagesA/systemMsg/systemMsg',
      })
    },
    // 去分销商页面
    tofenxiaoshang () {
      if (!this.$fun.checkIsLogin(1, 1)) return
      if (!this.$fun.checkIsDistribute(1, 1)) return
      uni.navigateTo({
        url: '/pagesA/fenxiao/fenxiaoshang',
      })
    },
    // 获取分销首页数据
    getDisInit () {
      const that = this
      getDisInit({}, { errtip: false }).then(res => {
        this.data = res.data
        this.userInfo.Is_Distribute = 1
        uni.setNavigationBarTitle({
          title: res.data.title,
        })
      }, err => {
        // uni.showToast({
        // 	title: err.msg,
        // 	icon:  'none'
        // })
      }).catch(err => {
      })
    },
    // 去提现
    tixian () {
      if (!this.$fun.checkIsLogin(1, 1)) return
      if (!this.$fun.checkIsDistribute(1, 1)) return
      uni.navigateTo({
        url: '/pagesA/fenxiao/withdrawal?form=1',
      })
    },
    // 跳转其他页面
    goOther (item) {
      if (!this.$fun.checkIsLogin(1, 1)) return
      if (!this.$fun.checkIsDistribute(1, 1)) return
      uni.navigateTo({
        url: item.url,
      })
    },
    // 获取功能模块
    getFuncModule () {
      getFuncModule({ type: 1 }).then(res => {
        this.funcModules = res.data
      })
    },
  },
  onShow () {
    if (this.$fun.checkIsLogin()) {
      get_user_info({}, { errtip: false }).then(res => {
        this.setUserInfo(res.data)
      }).catch(e => {
      })
    }
    // 获取首页功能
    this.getFuncModule()
    // 获取分销首页
    this.getDisInit()
    // this.userInfo = await this.getUserInfo();
  },
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #f8f8f8;
  }
  
  .top {
    width: 750 rpx;
    height: 400 rpx;
    position: relative;
    
    .image {
      width: 100%;
      height: 100%;
    }
    
    .title {
      width: 138 rpx;
      font-size: 34 rpx;
      font-weight: bold;
      color: #FFFFFF;
      position: absolute;
      top: 27 rpx;
      left: 306 rpx;
    }
    
    .msg {
      width: 45 rpx;
      height: 45 rpx;
      position: absolute;
      top: 25 rpx;
      right: 21 rpx;
    }
    
    .person {
      width: 92 rpx;
      height: 92 rpx;
      position: absolute;
      top: 109 rpx;
      left: 329 rpx;
      border-radius: 50%;
      
      .image {
        width: 100%;
        height: 100%;
      }
    }
    
    .nickName {
      font-size: 28 rpx;
      height: 27 rpx;
      line-height: 27 rpx;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      width: 400 rpx;
      position: absolute;
      top: 215 rpx;
      left: 175 rpx;
      text-align: center;
    }
    
    .loginBtn {
      padding: 4px 10px;
      color: white;
      border: 1px solid #e7e7e7;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    
    .sales {
      width: 690 rpx;
      height: 160 rpx;
      position: absolute;
      left: 30 rpx;
      top: 297 rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 27 rpx 0px rgba(244, 49, 49, 0.46);
      border-radius: 10 rpx;
      display: flex;
      
      .left, view.right {
        width: 50%;
        margin-top: 42 rpx;
        margin-bottom: 41 rpx;
        text-align: center;
      }
      
      .left {
        border-right: 1px solid #E7E7E7;
      }
      
      .salesSum {
        height: 25 rpx;
        font-size: 26 rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      
      .salesSumPrice {
        height: 29 rpx;
        font-size: 38 rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(244, 49, 49, 1);
        margin-top: 23 rpx;
      }
    }
  }
  
  .center {
    width: 690 rpx;
    height: 90 rpx;
    line-height: 90 rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10 rpx;
    margin: 0 auto;
    margin-top: 117 rpx;
    display: flex;
    align-items: center;
    position: relative;
    
    & view:first-child {
      margin-left: 48 rpx;
      color: #333333;
      font-weight: 500;
      font-size: 26 rpx;
      margin-right: 16 rpx;
    }
    
    & view:nth-child(2) {
      font-size: 34 rpx;
      font-weight: bold;
      color: #F43131;
    }
    
    & view:nth-child(3) {
      font-size: 26 rpx;
      font-weight: 500;
      color: #FFFFFF;
      background-color: #F43131;
      width: 85 rpx;
      height: 45 rpx;
      line-height: 45 rpx;
      border-radius: 10 rpx;
      text-align: center;
      position: absolute;
      right: 49 rpx;
      top: 23 rpx;
    }
  }
  
  .last {
    width: 691 rpx;
    height: 668 rpx;
    margin: 0 auto;
    position: relative;
    margin-top: 30 rpx;
    
    image.back {
      width: 100%;
      height: 100%;
    }
    
    .zhezhao {
      position: absolute;
      top: 0;
      left: 0;
      width: 691 rpx;
      //height: 668rpx;
      padding-left: 34 rpx;
      padding-right: 30 rpx;
      padding-top: 1 rpx;
      padding-bottom: 1 rpx;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      
      .td {
        width: 209 rpx;
        height: 222 rpx;
        border-right: 1px dotted #D3D3D3;
        border-bottom: 1px dotted #D3D3D3;
        text-align: center;
        box-sizing: border-box;
        
        .imgs {
          width: 95 rpx;
          height: 95 rpx;
          margin-top: 44 rpx;
        }
        
        .views {
          height: 25 rpx;
          line-height: 25 rpx;
          font-size: 26 rpx;
          font-weight: 500;
          color: #303030;
          margin-top: 12 rpx;
        }
      }
    }
  }
  
  .putong {
    height: 50 rpx;
    line-height: 50 rpx;
    text-align: center;
    background-color: #FFFFFF;
    font-size: 24 rpx;
    color: #333333;
    position: absolute;
    top: 124 rpx;
    right: 0 rpx;
    border-radius: 152 rpx 0px 0px 152 rpx;
    display: flex;
    align-items: center;
    padding-left: 10px;
    
    .rightMy {
      width: 9px !important;
      height: 14px !important;
      margin-left: 2px;
    }
  }
  
  .rightMys {
    width: 9px !important;
    height: 14px !important;
    margin-left: 2px;
    margin-bottom: -2px;
  }
</style>
