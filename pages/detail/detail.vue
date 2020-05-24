<template>
  <div @click="commonClick" class="wrap" style="position:relative;">
    <!-- #ifndef APP-PLUS -->
    <view class="top">
      <image @click="goBack" class="imgm" src="/static/back.png"></image>
      <image @click="goCart" class="imgm cart" src="/static/cart.png"></image>
    </view>
    <!-- #endif -->
    <!-- 轮播 -->
    <view class="uni-padding-wrap" style="background: #f2f2f2;">
      <view class="page-section swiper">
        <view class="page-section-spacing" v-if="(product.video_url && showVideo)">
          <video :poster="product.cover_url?product.cover_url:''" :src="product.video_url|domain" @pause="pause"
                 @play="play"
                 bindfullscreenchange="changeHiddenBtns"
                 class="video"
                 controls id="myVideo1"
                 ref="video1"
                 show-center-play-btn>
          </video>
          <view class="change-btn" v-if="!hideNativeEleShow">
            <cover-view :class="[showVideo?'active':'','shipin']" @click="change_view(1)" v-if="showVideo&&showCorver">
              视频
            </cover-view>
            <cover-view :class="[showVideo?'':'active','tupian']" @click="change_view(2)" v-if="showVideo&&showCorver">
              图片
            </cover-view>
          </view>
        </view>
        <view class="page-section-spacing" v-else>
          <swiper autoplay="autoplay" circular="true" class="swiper" duration="500" indicator-active-color="#ff5000"
                  indicator-color="#fff" indicator-dots="indicatorDots" interval="4000">
            <swiper-item :key="i" v-for="(item,i) of product.Products_JSON.ImgPath">
              <img :src="item|lazyimg" @click="yulan(i)">
            </swiper-item>
          </swiper>
          <view class="change-btn" v-if="product.video_url">
            <view :class="[showVideo?'active':'','shipin']" @click="change_view(1)">视频</view>
            <view :class="[showVideo?'':'active','tupian']" @click="change_view(2)">图片</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 产品信息描述 -->
    <div class="section1">
      <div class="price">
        <span class="n_price"><span class="mm">￥</span>{{product.Products_PriceX}}</span>
        <span class="o_price" v-if="product.Products_PriceY!=product.Products_PriceX"><span class="mm">￥</span>{{product.Products_PriceY}}</span>
        <span @click="showTick" class="share" data-type="share">分享此产品</span>
      </div>
      <div class="name">{{product.Products_Name}}</div>
      <div class="sold">
        <span v-if="product.Products_Count">库存{{product.Products_Count}}</span>
        <span v-if="product.Products_Sales">月销{{product.Products_Sales}}</span>
      </div>
      <!-- 包邮等信息 -->
      <div class="section3" v-if="product.Products_Promise && product.Products_Promise.length > 0">
					<span :key="index" v-for="(item,index) in product.Products_Promise" v-if="item.name">
							<image :src="'/static/client/detail/dh.png'|domain" alt="" class="img" />
							<span>{{item.name}}</span>
					</span>
      </div>
    </div>
    <!-- 领券 -->
    <div @click="showTick" class="section2" data-type="ticks" v-if="couponList.length>0">
      <div class="btn">领券</div>
      <div class="right">店铺优惠券
        <image :src="'/static/client/detail/right.png'|domain" alt="" class="img" />
      </div>
    </div>
    <!-- 评价 -->
    <div class="comment bgwhite">
      <div class="c_title">
        <span>评价</span>
        <div @click="gotoComments" class="right">查看全部
          <image :src="'/static/client/detail/right.png'|domain" alt=""
                 style="width: 19rpx;height: 30rpx;margin-left: 20rpx;" />
        </div>
      </div>
      <block :key="item" v-for="(item,index) of commit">
        <div class="c_content" v-if="!item.ImgPath">
          <div class="c_content_title">
            <img :src="item.User_HeadImg" alt="">
            <span class="user_name">{{item.User_NickName}}</span>
            <span class="c_time">{{item.CreateTime}}</span>
          </div>
          <div class="c_content_msg">{{item.Note}}</div>
          <div class="c_content_img"></div>
        </div>
        <div class="c_content" v-else>
          <div class="c_content_title">
            <img :src="item.User_HeadImg" alt="">
            <span class="user_name">{{item.User_NickName}}</span>
            <span class="c_time">{{item.CreateTime}}</span>
          </div>
          <div class="c_content_msg">{{item.Note}}</div>
          <div class="c_content_img">
            <image :key="j" :src="i" @click="yulanImg(index,j)" class="img" v-for="(i,j) in item.ImgPath"></image>
          </div>
        </div>
      </block>
    </div>
    <!-- 商品详情 -->
    <div class="pro_detail">
      <div class="p_detail_title bgwhite">商品详情</div>
      <!--			<div style="height: 500px;"></div>-->
      <u-parse :content="product.Products_Description|formatRichTextByUparse"></u-parse>
      <!-- #ifdef H5||APP-PLUS -->
      <!-- <div v-html="formatRichTexts(product.Products_Description)" class="p_detail_des"></div> -->
      <!-- #endif -->
      <!-- #ifdef MP -->
      <!-- <rich-text :nodes="product.Products_Description|formatRichText" class="p_detail_des"></rich-text> -->
      <!-- #endif -->
    </div>
    <div style="clear: both;"></div>
    <!-- #ifndef APP-PLUS -->
    <bottom :canSubmit="canSubmit" :collected="isCollected" :isGiftPackage="is_gift_package_pro" :isVirtual="isVirtual"
            :recieve="recieve"
            @cartHandle="addCart" @collect="collect" @directHandle="directBuy" @goGet="lingqu"
            @kefu="contact"></bottom>
    <!-- #endif -->
    <div style="height:60px;background: white;"></div>
    <div class="safearea-box"></div>
    <popupLayer :direction="'top'" @maskClicked="handClicked2" ref="popupLayer">
      <div class="shareinfo" v-if="type=='share'">
        <div class="s_top">
          <!-- #ifdef APP-PLUS -->
          <div @click="shareFunc('wx')" class="flex1">
            <image :src="'/static/client/detail/share1.png'|domain" alt="" class='img'></image>
            <div>发送好友</div>
          </div>
          <div @click="shareFunc('wxtimeline')" class="flex1">
            <image :src="'/static/client/detail/sahre3.png'|domain" alt="" class='img'></image>
            <div>朋友圈</div>
          </div>
          <!--只有配置了这个参数的app，才有分享到小程序选项-->
          <div @click="shareFunc('wxmini')" class="flex1" v-if="wxMiniOriginId">
            <img :src="'/static/client/detail/share4.png'|domain" alt="" class='img'>
            <div>微信小程序</div>
          </div>
          <!-- #endif -->
          <!-- #ifndef MP-TOUTIAO -->
          <div @click="shareFunc('pic')" class="flex1">
            <image :src="'/static/client/detail/share2.png'|domain" alt="" class='img'></image>
            <div>分享海报</div>
          </div>
          <!-- #endif -->
        </div>
        <div @click="cancel" class="s_bottom">取消</div>
      </div>
      <view style="max-height: 1050rpx;" v-else>
        <div class="t_title">
          领券
          <image :src="'/static/client/detail/x.png'|domain" @click="close"></image>
        </div>
        <scroll-view @scrolltolower="goNextPage" class="ticks" scroll-y=true v-if="type=='ticks'">
          <div :key="i" class="t_content" v-for="(item,i) of couponList">
            <div class="t_left">
              <div class="t_left_t"><span>￥</span><span class="money">{{item.Coupon_Cash}}</span><span>店铺优惠券<text
              v-if="item.Coupon_UseArea==0">(实体店)</text></span></div>
              <div class="t_left_c">{{item.Coupon_Subject}}</div>
              <div class="t_left_b">有效期{{item.Coupon_StartTime}}-{{item.Coupon_EndTime}}</div>
            </div>
            <div @click="getMyCoupon(item.Coupon_ID,i)" class="t_right">立即领取</div>
          </div>
        </scroll-view>
      </view>
    </popupLayer>
    <popupLayer :direction="'top'" @maskClicked="handClicked" ref="cartPopu">
      <div class="cartSku">
        <div class="cartTop">
          <image
          :src="skuImg?skuImg+'-r200':(product.Products_JSON.ImgPath[0]?product.Products_JSON.ImgPath[0]+'-r200':'')"
          @click="yulanDetail"
          class="image"></image>
          <div class="cartTitle">
            <div class="cartTitles">{{product.Products_Name}}</div>
            <div class="addInfo">
              <div class="addPrice">{{postData.productDetail_price}}元</div>
              <div class="proSale">库存{{postData.count}}</div>
            </div>
          </div>
        </div>
        <div class="cartCenter">
          <div :key="i" class="cartAttr" v-for="(item,i) of product.skujosn_new">
            <div class="sku">
              {{item.sku}}
            </div>
            <div class="skuValue" v-if="gift == 0">
              <div :class="check_attr[item.sku]==index?'skuCheck':''" :key="index"
                   @click="selectAttr(index,item.sku)" class="skuview" v-for="(mbx,index) of item.val">{{mbx}}
              </div>
            </div>
            <div class="skuValue" v-else>
              <div :class="skuval[i]==index?'skuCheck':'unablechoose'" :key="index" class="skuview"
                   v-for="(mbx,index) of item.val">{{mbx}}
              </div>
            </div>
            <!-- <div class="skuValue" v-else>
              <div :class="skuval[0]==index?'skuCheck':''"  v-for="(mbx,index) of item" :key="index">{{mbx}}</div>
            </div> -->
          </div>
        </div>
        <div class="numBer" v-if="gift == 0">
          <div class="numBers">
            数量
          </div>
          <div class="inputNumber">
            <div @click="delNum" class="clicks">-</div>
            <!--v-enter-number-->
            <input @blur="setCount" class="inputq" type="number" v-model="postData.qty">
            <div @click="addNum" class="clicks">+</div>
          </div>
        </div>
        <div class="numBer" v-else>
          <div class="numBers">
            数量
          </div>
          <div class="inputNumber">
            <div class="clicks">-</div>
            <input class="inputq" disabled type="number" value="1">
            <div class="clicks">+</div>
          </div>
        </div>
      </div>
      <form @submit="skuSub" report-submit>
        <button :class="submit_flag?'':'disabled'" class="cartSub" formType="submit">
          确定
        </button>
      </form>
    </popupLayer>
    <!-- #ifdef MP-WEIXIN -->
    <!--	 <view class="liveBox" :style="{bottom: '70px'}" v-if="liveList.length===1">-->
    <!--	  		  <navigator  :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+liveList[0].roomid">-->
    <!--	  			  <image class="icon-live" src="/static/live/logo.png"></image>-->
    <!--	  		  </navigator>-->
    <!--	  </view>-->
    <!--	  <view class="liveBox" :style="{bottom: '70px'}" v-if="liveList.length>1">-->
    <!--	  		  <image @click="toLive" class="icon-live" src="/static/live/logo.png"></image>-->
    <!--	  </view>-->
    <!-- #endif -->
  </div>
</template>
<script>
import bottom from '../../components/bottom/bottom'
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {
  addCollection,
  cancelCollection,
  checkProdCollected,
  getCommit,
  getCoupon,
  getProductDetail,
  getProductSharePic,
  getUserCoupon,
  judgeReceiveGift,
  updateCart
} from '../../common/fetch.js'
import { buildSharePath, getProductThumb, isWeiXin, ls, numberSort } from '../../common/tool.js'

import { mapActions, mapState } from 'vuex'
import uParse from '../../components/gaoyia-parse/parse.vue'
import { pageMixin, safeAreaMixin } from '../../common/mixin'
import { error, modal } from '../../common'

export default {
  mixins: [pageMixin, safeAreaMixin],
  data () {
    return {
      store_id: '',
      hideNativeEleShow: false,
      isLoad: false,
      // #ifdef APP-PLUS
      wxMiniOriginId: '',
      // #endif
      JSSDK_INIT: false, // 自己有分享的业务
      type: '', // 优惠券内容， 分享内容
      shareShow: false,
      ticksShow: false,
      product: { Products_JSON: { ImgPath: [] } }, // 商品结果
      commit: '', // 获取评论
      Products_ID: 0,
      count: 1, // 商品数量
      skuF: 1, // 规格详情
      checkAttr: {}, // 选择的属性
      check_attrid_arr: [],
      check_attr: {},
      couponList: [], // 优惠券列表
      // 购买需要传输的信息
      postData: {
        act: 'add_cart',
        prod_id: 0, // 产品ID  在 onLoad中赋值
        attr_id: 0, // 选择属性id
        count: 0, // 选择属性的库存
        // showimg: '',      //选择属性的图片(用产品图片代替)
        qty: 1, // 购买数量
        cart_key: '', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
        productDetail_price: 0
      },
      submit_flag: true, // 提交按钮
      page: 1, // 优惠券页
      pageSize: 4, // 优惠券页
      totalCount: 0, // 优惠券个数
      isCollected: false, // 该产品是否已收藏
      gift: 0, // 赠品id
      skuval: [], // 赠品带过来的产品属性
      recieve: false, // 是否是赠品，赠品按钮显示 立即领取
      gift_attr_id: '', // 赠品属性id,
      canSubmit: true,
      isLoading: false,
      showVideo: true, // 是否展示视频
      isShowBtn: true, // 是否显示视频图片切换按钮
      isVirtual: false, // 是否虚拟产品
      videoContext: null,
      isSubmit: false, // 是否提交过了
      skuImg: '',
      showCorver: true,
      liveList: [],
      liveCount: 0,
      // imgIndex:-1
      is_gift_package_pro: false // 是否是礼包产品，礼包产品不能加入购物车
    }
  },
  components: {
    bottom,
    popupLayer,
    uParse
  },
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
  // 自定义小程序分享
  onShareAppMessage () {
    const path = '/pages/detail/detail?Products_ID=' + this.Products_ID
    const shareObj = {
      title: this.product.Products_Name,
      desc: this.product.Products_BriefDescription,
      imageUrl: this.product.ImgPath,
      path: buildSharePath(path)
    }
    return shareObj
  },
  // #endif
  onLoad: function (option) {
    this.Products_ID = option.Products_ID
    this.store_id = this.$store.getters.getCurrentStoreId()
    this.postData.prod_id = option.Products_ID
    // 参与统计的
    this.analysisExt.prod_id = option.Products_ID
    this._init_func(option)
    // #ifdef APP-PLUS
    const vm = this
    // 隐藏规格框
    // const goodsSpecNvue = uni.getSubNVueById('goodsSpec')
    // goodsSpecNvue.hide()
    // //隐藏优惠券
    // const coupon = uni.getSubNVueById('coupon')
    // coupon.hide()
    // //隐藏优惠券
    // const share = uni.getSubNVueById('share')
    // share.hide()
    const subNVue2 = uni.getSubNVueById('goodsBottom')
    subNVue2.show()
    // hack app的商品详情页购买
    // const vm = this;
    uni.$on('cartHandle', (data) => {
      vm.addCart()
    })
    uni.$on('directHandle', (data) => {
      vm.directBuy()
    })
    uni.$on('kefu', (data) => {
      vm.contact()
    })
    uni.$on('collectHandle', (data) => {
      vm.collect()
    })
    uni.$on('getMyCoupon', (data) => {
      vm.getMyCoupon(data.item, data.i)
    })
    uni.$on('goNextPage', (data) => {
      vm.goNextPage()
    })
    uni.$on('shareDetail', (data) => {
      if (data.detail != 'detail') return
      vm.shareFunc(data.item)
    })
    uni.$on('goodsSkuSub', (data) => {
      if (data.detail != 'detail') return
      const { check_attr, check_attrid_arr, submit_flag, postData } = data
      this.check_attr = check_attr
      this.check_attrid_arr = check_attrid_arr
      this.submit_flag = submit_flag
      this.postData = postData
      vm.skuSub()
      // 隐藏规格框
      const goodsSpecNvue = uni.getSubNVueById('goodsSpec')
      goodsSpecNvue.hide()
    })
    uni.$on('goGet', (data) => {
      vm.lingqu()
    })
    // #endif
  },
  mounted () {
    const _self = this
    this.$nextTick().then(res => {
      if (_self.$refs.cartPopu) {
        this.postData.qty = 1
      }
    }).catch(() => {})
    this.$nextTick().then(() => {
      const videoContext = uni.createVideoContext('myVideo1')
      _self.videoContext = videoContext
      // 添加到这里
      // getApp().globalData.videoInstance.push(videoContext)
    }).catch(() => {})
  },
  onShow () {
    const _self = this
    const USERINFO = ls.get('userInfo')
    // #ifdef APP-PLUS
    var icon = plus.nativeObj.View.getViewById('icon')
    var icons = plus.nativeObj.View.getViewById('icons')
    if (icon && icons) {
      icon.show()
      icons.show()
    } else {
      _self.createtab()
      _self.createtabs()
    }
    // #endif
    // #ifdef MP-WEIXIN
    // getLiveInfo().then(res=>{
    // 	this.liveList = res.data
    // 	this.liveCount = res.data.totalCount
    // }).catch((e)=>{
    // 		console.log(e)
    // 	})
    // #endif
  },
  onUnload () {
    // #ifdef APP-PLUS
    var icon = plus.nativeObj.View.getViewById('icon')
    var icons = plus.nativeObj.View.getViewById('icons')
    icon.hide()
    icons.hide()
    uni.$off('cartHandle')
    uni.$off('directHandle')
    uni.$off('collectHandle')
    uni.$off('getMyCoupon')
    uni.$off('goNextPage')
    uni.$off('shareDetail')
    uni.$off('kefu')
    uni.$off('goodsSkuSub')
    uni.$off('goGet')
    // #endif
  },
  onHide () {
    // 停止播放
    // #ifdef APP-PLUS
    var icon = plus.nativeObj.View.getViewById('icon')
    var icons = plus.nativeObj.View.getViewById('icons')
    icon.hide()
    icons.hide()
    // #endif
    if (this.videoContext) {
      this.videoContext.pause()
    }
  },
  computed: {
    ...mapState(['initData'])
  },
  methods: {
    toLive () {
      uni.navigateTo({
        url: '/pagesA/live/live'
      })
    },
    yulanDetail () {
      const arr = []
      let str
      if (this.skuImg) {
        str = this.skuImg + '-r420'
      } else {
        str = this.product.Products_JSON.ImgPath[0] + '-r420'
      }
      arr.push(str)
      uni.previewImage({
        urls: arr,
        indicator: 'default',
        current: 0
      })
    },
    handClicked2 () {
      this.hideNativeEleShow = false
    },
    handClicked () {
      this.postData.qty = 1
      this.hideNativeEleShow = false
      this.showCorver = true
    },
    async _init_func (option) {
      await this.getDetail(this.Products_ID)
      // 是否是赠品，赠品不能选择属性
      if (option.gift) {
        this.gift = option.gift
        this.postData.active_id = option.gift
        this.postData.active = 'gift'
        await this.judgeReceiveGift()
        this.recieve = true
      }
      await this.getCommit(this.Products_ID)
      await this.checkProdCollected()
      await this.getCoupon()// 获取可领取的优惠券
      this.isLoad = true
    },
    createtab: function () {
      // 设置水平居中位置
      // var bitmap = new plus.nativeObj.Bitmap('bmp1');
      var view = new plus.nativeObj.View('icon', {
        top: '30px',
        left: '10px',
        width: '30px',
        height: '30px'
      })
      view.drawBitmap('/static/back.png', {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%'
      })
      view.addEventListener('click', function (e) {
        uni.navigateBack({
          delta: 1
        })
      }, false)
      view.show()
    },
    createtabs: function () {
      const res = uni.getSystemInfoSync()
      const fullWidth = res.screenWidth
      const leftOffset = fullWidth - 40
      // 设置水平居中位置
      // var bitmap = new plus.nativeObj.Bitmap('bmp2');
      var view = new plus.nativeObj.View('icons', {
        top: '30px',
        // left: 'auto',
        left: leftOffset + 'px',
        width: '30px',
        height: '30px'
      })
      view.drawBitmap('/static/cart.png', {
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%'
      })
      view.addEventListener('click', function (e) {
        uni.switchTab({
          url: '/pages/order/cart'
        })
      }, false)
      view.show()
    },
    // 开始播放事件
    play () {
      this.isShowBtn = false
    },
    // 暂停播放事件
    pause () {
      this.isShowBtn = true
    },
    // type 1为视频，2为图片
    change_view (type) {
      if (type == 1) {
        this.showVideo = true
      } else {
        this.showVideo = false
      }
    },
    formatRichTexts (html) {
      if (!html) return
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '')// .replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '')// .replace(/height='[^']+'/gi, '');
        // 图片app不支持
        // #ifdef APP-PLUS
        match = match.replace(/!*.webp/gi, '')
        // #endif
        return match
      })
      newContent = newContent.replace(/<div[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '')// .replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '')// .replace(/height='[^']+'/gi, '');
        return match
      })
      newContent = newContent.replace(/<p[^>]*>/gi, '')
      newContent = newContent.replace(/<[/]p[^>]*>/gi, '')
      newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;')
        return match
      })
      newContent = newContent.replace(/<br[^>]*\/>/gi, '')
      newContent = newContent.replace(/\<img/gi, '<img style="width:100%;float:left;"')
      newContent = newContent.replace(/src="\/\//gi, 'src="http://')
      // newContent = newContent.replace(/>[\s]*</gi, "><");
      return newContent
    },
    async shareFunc (channel) {
      // #ifdef APP-PLUS
      const share = uni.getSubNVueById('share')
      share.hide()
      // #endif
      const _self = this
      const path = 'pages/detail/detail?Products_ID=' + this.Products_ID
      const front_url = this.initData.front_url
      const shareObj = {
        title: this.product.Products_Name,
        desc: this.product.Products_BriefDescription,
        imageUrl: getProductThumb(this.product.ImgPath),
        path: buildSharePath(path)
      }
      switch (channel) {
        case 'wx':
          uni.share({
            provider: 'weixin',
            scene: 'WXSceneSession',
            type: 0,
            href: front_url + shareObj.path,
            title: shareObj.title,
            summary: shareObj.desc,
            imageUrl: shareObj.imageUrl,
            success: function (res) {
            },
            fail: function (err) {
            }
          })
          break
        case 'wxtimeline':
          uni.share({
            provider: 'weixin',
            scene: 'WXSenceTimeline',
            type: 0,
            href: front_url + shareObj.path,
            title: shareObj.title,
            summary: shareObj.desc,
            imageUrl: shareObj.imageUrl,
            success: function (res) {
            },
            fail: function (err) {
            }
          })
          break
        case 'wxmini':
          uni.share({
            provider: 'weixin',
            scene: 'WXSceneSession',
            type: 5,
            imageUrl: shareObj.imageUrl,
            title: shareObj.title,
            miniProgram: {
              id: _self.wxMiniOriginId,
              path: '/' + shareObj.path,
              type: 0,
              webUrl: 'http://uniapp.dcloud.io'
            },
            success: ret => {
            }
          })
          break
        case 'pic':

          const res = await getProductSharePic({ product_id: this.Products_ID }, {
            tip: '努力加载中',
            mask: true
          })
          ls.set('temp_sharepic_info', res.data)
          const sharePic = res.data.img_url
          if (!sharePic) {
            error('获取分享参数失败')
            return
          }
          setTimeout(function () {
            uni.navigateTo({
              url: '/pages/detail/sharepic/sharepic'
            })
          }, 200)
          // uni.previewImage({
          // 	urls: [sharePic],
          // 	indicator:'default',
          // 	current:0
          // });
          break
      }
    },
    // 立即领取
    lingqu () {
      if (this.isVirtual) {
        this.directBuy()
        return
      }
      this.postData.cart_key = 'DirectBuy'
      // 领取礼物
      this.postData.attr_id = this.gift_attr_id
      updateCart(this.postData).then(res => {
        uni.navigateTo({
          url: '/pagesA/person/gift?cart_key=DirectBuy&gift=gift'
        })
      }).catch(() => {
      })
    },
    // 赠品
    judgeReceiveGift () {
      if (!this.$fun.checkIsLogin()) {
        return
      }
      judgeReceiveGift({ gift: this.gift }).then(res => {
        this.gift_attr_id = res.data.attr_id
        this.skuval = res.data.skuval// .split(';');
        // #ifdef APP-PLUS
        uni.$emit('goods_bottom_setval', {
          isCollected: this.isCollected,
          canSubmit: this.canSubmit
        })
        // #endif
      }).catch(res => {
        console.log(res, 'sss')
        setTimeout(function () {
          uni.navigateBack({
            delta: 1
          })
        }, 1000)
        this.canSubmit = false
      })
    },
    // 评价预览
    yulanImg (i, j) {
      // 换大图。。。
      const tempArr = this.commit[i].ImgPath.map((img, idx) => {
        return img.replace(/\/n3\//, '/')
      })
      uni.previewImage({
        urls: tempArr,
        indicator: 'number',
        current: j
      })
    },
    // 轮播图图片预览
    yulan (index) {
      uni.previewImage({
        urls: this.product.Products_JSON.ImgPath,
        indicator: 'default',
        current: index
      })
    },
    // 检查产品是否已收藏
    checkProdCollected () {
      if (!this.$fun.checkIsLogin()) {
        return
      }
      checkProdCollected({ prod_id: this.Products_ID }).then(res => {
        this.isCollected = res.data.is_favourite == 1
        // #ifdef APP-PLUS
        uni.$emit('goods_bottom_setval', { isCollected: this.isCollected })
        // #endif
      }).catch(e => {
      })
    },
    // 下一页优惠券
    goNextPage () {
      if (this.totalCount > this.couponList.length) {
        this.page++
        this.getCoupon()
      }
    },
    // 领取优惠券
    getMyCoupon (item, i) {
      // #ifdef APP-PLUS
      if (!this.$fun.checkIsLogin()) {
        const coupon = uni.getSubNVueById('coupon')
        coupon.hide()
      }
      // #endif
      if (!this.$fun.checkIsLogin(1, 1)) return
      if (this.isLoading == true) return
      this.isLoading = true
      const data = {
        coupon_id: item
      }
      if (this.couponList.length <= 1) {
        this.goNextPage()
      }
      getUserCoupon(data, { errtip: false }).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        })
        this.isLoading = false
        this.page = 1
        this.couponList.splice(i, 1)
        // #ifdef APP-PLUS
        uni.$emit('couponList', { couponList: this.couponList })
        // #endif
        if (this.couponList.length <= 0) {
          // #ifndef APP-PLUS
          this.hideNativeEleShow = false
          this.$refs.popupLayer.close()
          // #endif
          // #ifdef APP-PLUS
          const coupon = uni.getSubNVueById('coupon')
          coupon.hide()
          // #endif
        }
      }).catch(e => {
        this.isLoading = false
      })
      // this.getCoupon();
    },
    // 获取可领取的优惠券
    getCoupon () {
      const data = {
        pageSize: this.pageSize,
        page: this.page,
        prod_id: this.Products_ID
      }
      getCoupon(data).then(res => {
        for (const i of res.data) {
          this.couponList.push(i)
        }
        this.totalCount = res.totalCount
      }).catch(e => {
      })
    },
    // 选择属性
    selectAttr (index, i) {
      var value_index = index // 选择的属性值索引
      var attr_index = i // 选择的属性索引
      // if (this.check_attrid_arr.indexOf(value_index) > -1) return false;
      // 记录选择的属性
      var check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }) // 记录选择的属性  attr_index外的[]必须
      // 属性处理
      var check_attrid = []
      var check_attrname = []
      var check_attrnames = []
      for (var i in check_attr) {
        var attr_id = check_attr[i]
        check_attrid.push(attr_id)
        check_attrname[attr_id] = i
      }
      // 数组排序  按从小到大排
      var check_attrid_arr = check_attrid
      check_attrid = numberSort(check_attrid)
      // 获取对应的属性名称
      for (var i = 0; i < check_attrid.length; i++) {
        var attr_id = check_attrid[i]
        var attr_name = check_attrname[attr_id]
        check_attrnames.push(attr_name + ':' + this.product.skujosn[attr_name][attr_id])
      }
      check_attrid = check_attrid.join(';')
      var attr_val = this.product.skuvaljosn[check_attrid] // 选择属性对应的属性值
      // 数组转化为字符串
      check_attrnames = check_attrnames.join(';')
      // 更改第一个规格显示图片
      for (const mbx in this.product.skuvaljosn) {
        const arr = mbx.split(';')
        if (arr[0] == index) {
          // this.imgIndex=index
          this.skuImg = this.product.skuvaljosn[mbx].Attr_Image
          break
        }
      }
      // 属性判断
      if (attr_val) {
        this.postData.attr_id = attr_val.Product_Attr_ID // 选择属性的id
        this.postData.count = attr_val.Property_count // 选择属性的库存
        // this.skuImg=attr_val.Attr_Image
        // this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
        this.postData.productDetail_price = attr_val.Attr_Price ? attr_val.Attr_Price : this.product.Products_PriceX // 选择属性的价格
        this.submit_flag = !((!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length))
      }
      // 判断属性库存
      if (attr_val && attr_val.Property_count <= 0) {
        // wx.showToast({
        //     title: '您选择的 ' + check_attrnames + ' 库存不足，请选择其他属性',
        //     icon: 'none'
        // })
        this.submit_flag = false
        return false
      }
      this.check_attr = {}
      this.check_attr = check_attr
      this.check_attrid_arr = check_attrid_arr
      this.submit_flag = !((!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length))
      // 购买数量处理  大于最高时赋值最高值
      if (this.postData.qty > this.postData.count) {
        this.postData.qty = this.postData.count
      }
    },
    skuSub (e) {
      if (!this.$fun.checkIsLogin(1, 1)) {
        return
      }
      if (this.isSubmit) {
        return
      }
      if (!this.submit_flag) {
        return
      }
      this.postData.prod_id = this.Products_ID
      if (this.postData.attr_id == 0) {
        if (this.product.skujosn) {
          wx.showToast({
            title: '您还没有选择规格',
            icon: 'none'
          })
          return
        }
      }
      // add_template_code({
      // 	code: e.detail.formId,
      // 	times: 1
      // })

      if (this.store_id) {
        this.postData.store_id = this.store_id
      }
      this.isSubmit = true
      updateCart(this.postData).then(res => {
        this.isSubmit = false
        if (this.postData.cart_key == 'CartList') {
          uni.showToast({
            title: '加入购物车成功',
            icon: 'success'
          })
        } else {
          uni.navigateTo({
            url: '/pages/order/check?cart_key=DirectBuy'
          })
        }
      }).catch((e) => {
		error(e.msg)
        this.isSubmit = false
      })
      this.isSubmit = false
      // 确定加入购物车
      this.hideNativeEleShow = false
      this.$refs.cartPopu.close()
      this.postData.qty = 1
    },
    // 用户手动输入数量
    setCount (e) {
      const amount = e.detail.value
      if (amount <= 0) {
        this.postData.qty = 1
        error('至少购买一件')
        return
      }
      if (amount > this.postData.count) {
        this.postData.qty = this.postData.count
        error('购买数量不能超过库存量')
      }
    },
    addNum () {
      if (this.postData.qty < this.postData.count) {
        this.postData.qty = Number(this.postData.qty) + 1
      } else {
        uni.showToast({
          title: '购买数量不能大于库存量',
          icon: 'none'
        })
        this.postData.qty = this.postData.count
      }
      if (this.is_gift_package_pro) {
        // 限购1件
        this.postData.qty = 1
      }
    },
    delNum () {
      if (this.postData.qty > 1) {
        this.postData.qty -= 1
      } else {
        uni.showToast({
          title: '购买数量不能小于1',
          icon: 'none'
        })
        this.postData.qty = 1
      }
    },
    // 收藏
    collect () {
      if (!this.$fun.checkIsLogin(1, 1)) {
        return
      }
      // 检查是否已收藏
      if (this.isCollected) {
        cancelCollection({ prod_id: this.Products_ID }).then(res => {
          uni.showToast({
            title: res.msg
          })
          this.isCollected = false
          // #ifdef APP-PLUS
          uni.$emit('goods_bottom_setval', { isCollected: this.isCollected })
          // #endif
        }).catch(() => {
          console.log('获取收藏转状态失败')
        })
      } else {
        addCollection({ prod_id: this.Products_ID }).then(res => {
          uni.showToast({
            title: '收藏成功'
          })
          this.isCollected = true
          // #ifdef APP-PLUS
          uni.$emit('goods_bottom_setval', { isCollected: this.isCollected })
          // #endif
        }).catch((e) => {
          modal(e.msg || '收藏失败')
        })
      }
    },
    goCart () {
      uni.switchTab({
        url: '/pages/order/cart'
      })
    },
    goBack () {
      // #ifdef H5
      history.go(-1)
      return
      // #endif
      // 肯定h5
      uni.navigateBack()
    },
    getCommit (item) {
      const data = {
        Products_ID: item,
        page: 1,
        pageSize: 2
      }
      getCommit(data, { errtip: false }).then(res => {
        this.commit = res.data
      }).catch(e => {
      })
    },
    async getDetail (item) {
      const data = {
        prod_id: item
      }
      if (this.store_id) {
        data.store_id = this.store_id
      }
      let product = null
      // 返回的就是一个pormise了
      await getProductDetail(data).then(res => {
        product = res.data
        this.product = res.data
        this.postData.productDetail_price = this.product.Products_PriceX
        this.isVirtual = res.data.Products_IsVirtual == 1
        this.postData.count = res.data.Products_Count
        this.is_gift_package_pro = res.data.Gift_Packtype > 0
        if (res.data.skujosn) {
          const skujosn = res.data.skujosn
          const skujosn_new = []
          for (const i in res.data.skujosn) {
            skujosn_new.push({
              sku: i,
              val: skujosn[i]
            })
          }
          this.product.skujosn_new = skujosn_new
          this.product.skuvaljosn = res.data.skuvaljosn
        }
        // #ifdef APP-PLUS
        // 规格选择
        uni.$emit('goods_spec_setval', {
          product: this.product,
          detail: 'detail'
        })
        uni.$emit('goods_spec_setval', {
          postData: this.postData,
          detail: 'detail'
        })
        uni.$emit('goods_bottom_setval', { isVirtual: this.isVirtual })
        // #endif
      }).catch(e => {
      })
      // let _self = this;
      // #ifdef H5
      if (!isWeiXin()) return

      const path = 'pages/detail/detail?Products_ID=' + this.Products_ID
      const front_url = this.initData.front_url
      this.WX_JSSDK_INIT(this).then((wxEnv) => {
        this.$wx.onMenuShareTimeline({
          title: product.Products_Name, // 分享标题
          link: front_url + buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: product.ImgPath, // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })
        // 两种方式都可以
        wxEnv.onMenuShareAppMessage({
          title: product.Products_Name, // 分享标题
          link: front_url + buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: product.ImgPath, // 分享图标
          desc: product.Products_BriefDescription || '好物推荐',
          type: 'link', // 分享类型,music、video或link，不填默认为link
          // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })
      }).catch(() => {
      })
      // #endif
    },
    addCart () {
      if (!this.$fun.checkIsLogin(1, 1)) {
        return
      }
      this.showCorver = true
      this.postData.cart_key = 'CartList'
      // #ifdef APP-PLUS
      const goodsSpecNvue = uni.getSubNVueById('goodsSpec')
      goodsSpecNvue.show('slide-in-bottom', 200)
      uni.$emit('goods_spec_setval', {
        postData: this.postData,
        detail: 'detail'
      })
      // #endif
      // #ifndef APP-PLUS
      this.hideNativeEleShow = true
      this.$refs.cartPopu.show()
      // #endif
    },
    /**
     * 客服
     */
    contact () {
      this.$fun.contact()
    },
    directBuy () {
      if (!this.$fun.checkIsLogin(1, 1)) {
        return
      }
      this.showCorver = true
      this.postData.cart_key = 'DirectBuy'
      // #ifdef APP-PLUS
      const goodsSpecNvue = uni.getSubNVueById('goodsSpec')
      goodsSpecNvue.show('slide-in-bottom', 200)
      uni.$emit('goods_spec_setval', {
        postData: this.postData,
        detail: 'detail'
      })
      // #endif
      // #ifndef APP-PLUS
      this.hideNativeEleShow = true
      this.$refs.cartPopu.show()
      // #endif
    },
    gotoComments () {
      uni.navigateTo({
        url: '/pages/order/comments?pro_id=' + this.Products_ID
      })
    },
    showTick (e) {
      this.type = e.currentTarget.dataset.type
      // #ifndef APP-PLUS
      this.hideNativeEleShow = true
      this.$refs.popupLayer.show()
      // #endif
      // #ifdef APP-PLUS
      if (this.type == 'ticks') {
        const coupon = uni.getSubNVueById('coupon')
        coupon.show('slide-in-bottom', 200)
        uni.$emit('couponList', { couponList: this.couponList })
      } else if (this.type == 'share') {
        const share = uni.getSubNVueById('share')
        share.show('slide-in-bottom', 200)
        uni.$emit('share', {
          wxMiniOriginId: this.wxMiniOriginId,
          detail: 'detail'
        })
      }
      // #endif
    },
    close () {
      this.hideNativeEleShow = false
      this.$refs.popupLayer.close()
    },
    cancel () {
      this.hideNativeEleShow = false
      this.$refs.popupLayer.close()
    },
    ...mapActions(['getUserInfo'])
  },
  async created () {
    const initData = await this.getInitData()
    let WX_MINI_ORIGIN_ID = ls.get('WX_MINI_ORIGIN_ID')
    if (!WX_MINI_ORIGIN_ID) {
      const login_methods = initData.login_methods
      for (var i in login_methods) {
        if (i != 'component_appid' && login_methods[i].authorizer_user_name) {
          WX_MINI_ORIGIN_ID = login_methods[i].authorizer_user_name
          break
        }
      }
    }
    this.wxMiniOriginId = WX_MINI_ORIGIN_ID
  }
}
</script>
<style lang="scss" scoped>
  .info-wrap {
    /*height: 100vh;*/
    /*padding-bottom: 60px;*/
    /*width: 750rpx;*/
    /*overflow-y: scroll;*/
    /*overflow-x: hidden;*/
  }

  /* 轮播图样式 */
  .uni-padding-wrap {
    width: 750rpx;
    height: 750rpx;

    .page-section, .page-section-spacing, .swiper, .uni-swiper-wrapper, .uni-swiper-slides {
      position: relative;
      width: 750rpx;
      height: 750rpx;

      img {
        width: 100%;
        height: 100%;
      }

      .video {
        width: 100%;
        height: 100%;
      }

      .change-btn {
        position: absolute;
        bottom: 50rpx;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        width: 240rpx;
        justify-content: space-between;
        z-index: 10;

        .shipin,
        .tupian {
          text-align: center;
          border-radius: 10px;
          color: #fff;
          box-sizing: border-box;
          font-size: 28rpx;
          padding: 5px 10px;
          background: rgba(255, 0, 0, .5);
        }

        .active {
          background: rgb(255, 102, 0);
        }
      }
    }
  }

  /* 返回按钮和购物车按钮 */
  .top {
    position: fixed;
    top: 10px;
    padding: 0 10px;
    /* #ifdef APP-PLUS */
    padding-top: var(--status-bar-height);
    /* #endif */
    display: flex;
    justify-content: space-between;
    z-index: 10;
    width: 95%;
  }

  .imgm {
    width: 30px;
    height: 30px;
  }

  .imgms {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 30px;
    left: 10px;
  }

  .carts {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 30px;
    right: 10px !important;
  }

  .ticks, .shareinfo {
    background: #fff;
    width: 100%;
    padding: 30rpx 0 60rpx;
    color: #333;
    z-index: 100;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
  }

  .ticks {
    max-height: 1050rpx;
    position: relative;
    padding-top: 0rpx !important;
    // overflow: scroll;
  }

  .t_title {
    font-size: 30rpx;
    color: #333;
    text-align: center;
    //margin-bottom: 40rpx;
    // position: fixed;
    width: 100%;
    z-index: 999;
    height: 90rpx;
    line-height: 90rpx;
    background-color: #FFFFFF;
  }

  .t_title image {
    height: 24rpx;
    width: 24rpx;
    position: absolute;
    top: 33rpx;
    right: 20rpx;
  }

  .t_content {
    position: relative;
    width: 720rpx;
    height: 160rpx;
    background-color: #FDF1E5;
    background-size: cover;
    margin: 0 auto 30rpx;
    padding: 20rpx 0 28rpx 40rpx;
    box-sizing: border-box;
    font-size: 22rpx;
    color: #F43131;
  }

  .t_left {
    float: left;
  }

  .t_left .t_left_t .money {
    font-size: 42rpx;
    margin-right: 10rpx;
  }

  .t_left .t_left_t {
    font-size: 24rpx;
    margin-bottom: 10rpx;
  }

  .t_left .t_left_b {
    margin-top: 6rpx;
  }

  .t_left .t_left_t i {
    font-size: 22rpx;
    font-style: normal;
  }

  .t_left .t_left_c, .t_left .t_left_b {
    font-size: 22rpx;
  }

  .t_right {
    float: right;
    height: 116rpx;
    line-height: 116rpx;
    padding: 0 36rpx;
    font-size: 30rpx;
    border-left: 2rpx dotted #999;
    //width: 124rpx;
    text-align: center;
  }

  .aleady {
    color: #999;
  }

  .shareinfo {
    padding-bottom: 0;
    color: #333;
    font-size: 24rpx;
  }

  .shareinfo > div {
    text-align: center;
  }

  .s_top {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .s_top .img {
    width: 76rpx;
    height: 76rpx;
    display: block;
    margin: 0 auto 10rpx;
  }

  .s_top > div:nth-child(1) {
    /*margin-right: 120rpx;*/
  }

  .s_bottom {
    position: relative;
    bottom: 0;
    width: 100%;
    background: #e8e8e8;
    color: #666;
    font-size: 26rpx;
    text-align: center;
    line-height: 60rpx;
    margin-top: 16rpx;
  }

  /* 产品描述部分 start */
  .section1 {
    background: white;
    padding: 0 20rpx 20rpx;
    border-bottom: 20rpx solid #f8f8f8;
    padding-bottom: 0rpx;
  }

  .price {
    padding-top: 38rpx;
    padding-bottom: 29rpx;
  }

  .price .mm {
    font-size: 20rpx;
    font-style: normal;
  }

  .price .share {
    float: right;
    background: red;
    color: #fff;
    text-align: center;
    margin-right: -20rpx;
    margin-top: -2rpx;
    font-size: 26rpx;
    padding: 10rpx;
    border-top-left-radius: 40rpx;
    border-bottom-left-radius: 40rpx;
    height: 56rpx;
    width: 157rpx;
    box-sizing: border-box;
  }

  .n_price {
    color: #ff0000;
    font-size: 36rpx;
  }

  .o_price {
    margin-left: 10rpx;
    color: #ababab;
    font-size: 28rpx;
    text-decoration: line-through;
  }

  .name {
    color: #333;
    font-size: 28rpx;
    font-weight: 700;
    margin: 10rpx 0;
  }

  .sold {
    height: 50rpx;
    line-height: 50rpx;
    padding-bottom: 10px;
  }

  .sold span {
    color: #999;
    font-size: 26rpx;
  }

  .sold span:nth-child(2) {
    float: right;
  }

  /* 产品描述部分 end */
  /* 领券start */
  .section2 {
    padding: 30rpx 20rpx;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-bottom: 20rpx solid #f8f8f8;
  }

  .section2 .btn {
    padding: 0 10rpx;
    color: #f43131;
    border: 2rpx solid #f43131;
  }

  .right {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #666666;
    font-weight: 500;
  }

  .right .img {
    width: 20rpx;
    height: 26rpx;
    margin-left: 20rpx;
  }

  /* 领券 end */
  /* 包邮信息等 start */
  .section3 {
    display: flex;
    flex-wrap: wrap;
    font-size: 0rpx;
  }

  .section3 > span {
    display: flex;
    align-items: center;
    // margin-right: 20rpx;
    margin: 20rpx 20rpx 20rpx 0;

    span {
      font-size: 24rpx;
      color: #333333;
    }
  }

  .section3 .img {
    width: 28rpx;
    height: 28rpx;
    margin-right: 10rpx;
  }

  /* 包邮信息等 end */
  /* 评价 start */
  .comment {
    padding: 30rpx 20rpx;
    border-bottom: 20rpx solid #f8f8f8;
  }

  .c_title {
    display: flex;
    justify-content: space-between;
  }

  .c_title {
    .right {
      color: #666666;
      font-size: 26rpx;
      font-weight: 500;
    }
  }

  .c_title > span {
    font-size: 30rpx;
    color: #333;
  }

  .c_content {
    margin-top: 30rpx;
  }

  .c_content_title {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333;
  }

  .c_content_title > img {
    width: 70rpx;
    height: 70rpx;
    margin-right: 20rpx;
  }

  .user_name {
    flex: 1;
  }

  .c_time {
    font-size: 26rpx;
    color: #777;
  }

  .c_content_msg {
    font-size: 24rpx;
    color: #333;
    line-height: 36rpx;
    padding: 18rpx 0;
    border-bottom: 2rpx solid #f8f8f8;
  }

  .c_content_img .img {
    width: 140rpx;
    height: 140rpx;
    margin-right: 20rpx;
  }

  /* 评价 end */
  /* 商品详情 start */
  .pro_detail {
    .p_detail_des {
      width: 100%;
      font-size: 28rpx;
      color: #999;

      img {
        width: 100% !important;
      }
    }
  }

  .p_detail_title {
    padding: 30rpx 20rpx;
    color: #333;
    font-size: 30rpx;
  }

  /* 商品详情 end */
  /* 遮罩层 */
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 1000;
  }

  .cartSku {
    padding: 0rpx 20rpx;

    .cartTop {
      position: relative;
      display: flex;
      padding-top: 20rpx;

      .image {
        width: 220rpx;
        height: 220rpx;
      }

      .cartTitle {
        margin-left: 20rpx;
        font-size: 32rpx;
        //width: 420rpx;
        flex: 1;

        .cartTitles {
          height: 80rpx;
          overflow: hidden;
          margin-top: 20rpx;
          line-height: 40rpx;
        }

        .addInfo {
          width: 450rpx;
          margin-top: 70rpx;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: flex-end;

          .addPrice {
            font-size: 42rpx;
            color: #ff4200;
          }

          .proSale {
            font-size: 24rpx;
            color: #999;
            justify-content: flex-end;
          }
        }
      }
    }

    .cartCenter {
      margin-top: 20rpx;

      .cartAttr {
        //display: flex;
        padding: 15rpx 0rpx;

        .sku {
          font-size: 28rpx;
          height: 70rpx;
          line-height: 70rpx;
          width: 140rpx;
          padding-left: 10px;
          margin-bottom: 5px;
        }

        .skuValue {
          display: flex;
          //flex:1;
          flex-wrap: wrap;

          .skuview {
            margin-bottom: 10px;
            height: 70rpx;
            line-height: 70rpx;
            font-size: 14px;
            border-radius: 10rpx;
            color: #000;
            background-color: #F2F2F2;
            padding-left: 20rpx;
            padding-right: 20rpx;
            margin-right: 20rpx;
            //border: 1px solid #ccc;
          }

          .unablechoose {
            background: #ddd;
          }
        }
      }
    }

    .numBer {
      margin-top: 20rpx;
      display: flex;
      padding: 15rpx 0rpx;
      justify-content: space-between;

      .numBers {
        font-size: 28rpx;
        height: 70rpx;
        line-height: 70rpx;
        width: 140rpx;
      }

      .inputNumber {
        border: 1px solid #ccc;
        border-radius: 6rpx;
        height: 50rpx;
        //margin-right: 50rpx;
        display: flex;

        .inputq {
          color: black;
          margin: 0 auto;
          width: 80rpx;
          height: 50rpx;
          text-align: center;
          font-size: 24rpx;
          border-left: 2rpx solid #ccc;
          border-right: 2rpx solid #ccc;
        }

        .clicks {
          height: 50rpx;
          line-height: 50rpx;
          width: 60rpx;
          text-align: center;
        }
      }
    }
  }

  .cartSub {
    width: 100%;
    height: 90rpx;
    background-color: #F43131;
    font-size: 20px;
    line-height: 90rpx;
    text-align: center;
    color: #FFFFFF;
    margin-top: 30rpx;
    border-radius: 0;
    border: none;

    &.disabled {
      background: #999;
    }
  }

  .skuCheck {
    color: #fff !important;
    background-color: #ff4200 !important;
  }
</style>
