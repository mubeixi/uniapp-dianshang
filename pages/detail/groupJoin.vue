<template>
  <div @click="commonClick" class="start">
    <!--       <page-title class="nav-title" :title="msg"  @handle="handle" rightHidden="true"></page-title>-->
    <!-- 商品详情部分 -->
    <div class="first">
      <div class="left">
        <img :src="product.ImgPath" class="img" />
      </div>
      <div class="right">
        <div class="top">
          {{product.Products_Name}}
        </div>
        <div class="bottom">
          <div class="price">
            ¥<span class="prices">{{product.pintuan_pricex}}</span><span>拼团省{{product.Products_PriceY-product.Products_PriceX|toFix2}}</span>
          </div>
          <div class="tuan">
            {{product.pintuan_people}}人团 • 已团{{product.teamnum}}件
          </div>
        </div>
      </div>
    </div>
    <!-- 商品保证 -->
    <ul class="second">
      <li class="lis">
        <image :src="'/static/client/tuan/check.png'|domain" class="img" />
        全场包邮
      </li>
      <li class="lis">
        <image :src="'/static/client/tuan/check.png'|domain" class="img" />
        7天退换
      </li>
      <li class="lis">
        <image :src="'/static/client/tuan/check.png'|domain" class="img" />
        48小时发货
      </li>
      <li class="lis">
        <image :src="'/static/client/tuan/check.png'|domain" class="img" />
        假一赔十
      </li>
    </ul>
    <!-- 团长 -->
    <div class="three">
      <!--            <div class="paySuc">-->
      <!--                <image class="img" :src="'/static/client/tuan/paySuc.png'|domain"/>-->
      <!--                支付成功-->
      <!--            </div>-->
      <div class="padding10-r"></div>
      <ul class="lyl">
        <li class="liq" v-for="(user,idx) in join_team_list">
          <image :src="user.User_HeadImg" class="img" />
          <image :src="'/static/client/tuan/tuanzhang.png'|domain" class=" img tuanzhang" v-if="user.team_head" />
          <span class="tuanzhang" v-if="user.team_head">团长</span>
        </li>

      </ul>
    </div>
    <!-- 倒计时 -->
    <div class="how" v-if="product.teamstatus!=1">
      <image :src="'/static/client/tuan/time.png'|domain" class="img" />
      <span class="my">拼团中，还差<span class="spans">{{product.pintuan_people-product.teamnum}}</span>人</span>
    </div>
    <div class="times"   v-if="product.teamstatus!=1">
      <div class="line"></div>
      <div class="text">
        剩余
        <div class="myTime">
          <span class="num">{{countdown.h}}</span>
          <span class="lines">:</span>
          <span class="num">{{countdown.m}}</span>
          <span class="lines">:</span>
          <span class="num">{{countdown.s}}</span>
        </div>
        结束
      </div>
      <div class="line"></div>
    </div>
    <!--查看订单 -->
    <!--        <div class="dingdan">-->

    <!--        </div>-->

    <!-- #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
    <div class="liji"   v-if="product.teamstatus!=1">
      <button class="vanButton invi" open-type="share" v-if="joined">邀请好友</button>
      <div @click="joinFunc" class="vanButton" v-else>立即参团</div>
    </div>
    <!-- #endif -->

    <!-- #ifdef H5 || APP-PLUS -->
    <div class="liji"  v-if="product.teamstatus!=1">
      <view @click="inviteFunc" class="vanButton" v-if="joined">去分享</view>
      <div @click="joinFunc" class="vanButton" v-else>立即参团</div>
    </div>
    <!-- #endif -->

    <div class="liji"  v-if="product.teamstatus==1">
      <div class="vanButton" >拼团成功</div>
    </div>

    <!--            <div class="liji">-->
    <!--                <view v-if="joined" @click="shareFunc" class="vanButton">去分享</view>-->
    <!--                <div v-else @click="joinFunc" class="vanButton">立即参团</div>-->
    <!--            </div>-->

    <!-- 间隙 -->
    <div class="mbxline"></div>
    <!-- 拼团规则 -->
    <div class="guize">
      <div class="top">拼团规则</div>
      <div class="xiang">
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span>开团或者参加别人的团</span>
        </div>
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span>在规定的时间内，邀请好友参团</span>
        </div>
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span>达到拼团人数，分别给团长和团员发货</span>
        </div>
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span>未达到拼团人数，货款将自动原路返还</span>
        </div>
      </div>
    </div>
    <!-- 更多 -->
    <div class="dianzhang">店长推荐</div>
    <div class="prolist">
      <div :key="index" @click="goProductDetail(item.Products_ID,item.is_pintuan)" class="pro-item"
           v-for="(item,index) in prodList">
        <!--                <image :src="'/static/client/check/pro1.png" alt="" class="img"/>-->
        <img :src="item.ImgPath" alt="" class="img">
        <div class="item-name">{{item.Products_Name}}</div>
        <div class="price">
          <span class="n_price"><span class="pricem">￥</span>{{item.Products_PriceX}}</span>
          <span class="o_price">已团{{item.Products_Sales}}件</span>
        </div>
      </div>
    </div>

    <popupLayer :direction="'top'" ref="popupLayer">
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

        </div>
        <div @click="cancel" class="s_bottom">取消</div>
      </div>
    </popupLayer>

    <!--分享引导框开始-->
    <div @click="isShowGuide=false" class="hide guide_box" v-show="isShowGuide">
      <div class="mask"></div>
      <div>
        <image :src="'/static/client/share/guide_point.png'|domain" class="guide_point" />
      </div>
      <div>
        <image :src="'/static/client/share/guide_btn.png'|domain" class="guide_btn" />
      </div>
    </div>
    <!--分享引导框结束-->

    <popupLayer :direction="'top'" ref="cartPopu">
      <div class="cartSku">
        <div class="cartTop">
          <image :src="product.Products_JSON.ImgPath[0]" class="image" mode=""></image>
          <div class="cartTitle">
            <div class="cartTitles">{{product.Products_Name}}</div>
            <div class="addInfo">
              <div class="addPrice">{{pt_pricex}}元</div>
              <div class="proSale">库存{{postData.count}}</div>
            </div>
          </div>
        </div>
        <div class="cartCenter">
          <div :key="i" class="cartAttr" v-for="(item,i) of product.skujosn">
            <div class="sku">
              {{i}}
            </div>
            <div class="skuValue">
              <div :class="check_attr[i]==index?'skuCheck':''" :key="index" @click="selectAttr(index,i)"
                   class="divs" v-for="(mbx,index) of item">{{mbx}}
              </div>
            </div>
          </div>
        </div>
        <div class="numBer">
          <div class="numBers">
            数量
          </div>
          <div class="inputNumber">
            <div @click="delNum" class="clicks">-</div>
            <!--					v-enter-number-->
            <input @blur="setCount" class="inputs" type="number" v-model="postData.qty">
            <div @click="addNum" class="clicks">+</div>
          </div>
        </div>
      </div>
      <div :class="submit_flag?'':'disabled'" @click="skuSub" class="cartSub">
        确定
      </div>
    </popupLayer>

  </div>
</template>

<script>
// import pagetitle from "@/components/title";
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import { pageMixin } from '../../common/mixin'
import {
  getOrderDetail,
  getPintuanTeam,
  getProd,
  getProductDetail,
  getProductSharePic,
  updateCart
} from '../../common/fetch'
import { buildSharePath, getGroupCountdown, getProductThumb, ls, numberSort } from '../../common/tool'
import { error, goProductDetail } from '../../common'
import { mapGetters, mapState } from 'vuex'

export default {
  mixins: [pageMixin],
  name: 'App',
  data () {
    return {
      pt_pricex:'',
      isShowGuide: false,
      // #ifdef APP-PLUS
      wxMiniOriginId: '',
      // #endif
      JSSDK_INIT: false, // 自己有分享的业务
      type: '',
      addtime: 0, // 开始的时间
      join_team_list: [],
      Team_ID: null,
      orderInfo: {},
      product: {},
      teamList: [],
      Prod_ID: null,
      prodList: [],
      Order_ID: null,
      countdown: {
        d: 0,
        h: 0,
        m: 0,
        s: 0
      },
      msg: '开团成功', // 立即参团
      prod_arg: {
        page: 1,
        pageSize: 4
      },
      hasMore: true, // 是否还有产品

      count: 1, // 商品数量
      skuF: 1, // 规格详情
      checkAttr: {}, // 选择的属性
      check_attrid_arr: [],
      check_attr: {},
      couponList: [], // 优惠券列表
      submit_flag: true, // 提交按钮
      postData: {
        prod_id: 0, // 产品ID  在 onLoad中赋值
        atrid_str: '', // 选择属性  1；2   数字从小到大
        atr_str: '', // 选择属性名称
        count: 0, // 选择属性的库存
        showimg: '', // 选择属性的图片(用产品图片代替)
        qty: 1, // 购买数量
        cart_key: 'DirectBuy', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
        active: 'pintuan' // 拼团时候选，不是拼团不选
      },
      joined: false // 是否已经参加过团
    }
  },
  components: {
    popupLayer
    // pagetitle
  },
  computed: {
    ...mapState(['initData']),
    ...mapGetters(['userInfo'])
  },
  filters: {
    toFix2: function (val) {
      if (val) {
        return val.toFixed(2)
      }

      return val
    }
  },
  onLoad (options) {
    this.Prod_ID = options.Products_ID
    this.Team_ID = options.Team_ID
  },
  onShow () {
    this.INIT()
    // this.get_user_info();// 获取用于可用余额
  },
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
  // 自定义小程序分享
  onShareAppMessage () {
    // 分享的是Team_ID
    const path = '/pages/detail/groupJoin?Team_ID=' + this.Team_ID + '&Products_ID=' + this.Prod_ID
    const shareObj = {
      title: this.product.Products_Name,
      desc: this.product.Products_BriefDescription,
      imageUrl: this.product.ImgPath,
      path: buildSharePath(path)
    }
    return shareObj
  },
  // #endif
  methods: {
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
      this.postData.atr_str = check_attrnames
      this.postData.atrid_str = check_attrid
      console.log(attr_val,"sss")
      if (attr_val&&attr_val.Product_Attr_ID) {
        this.postData.attr_id = attr_val.Product_Attr_ID
      }
      // 属性判断
      if (attr_val) {
        this.postData.count = attr_val.Property_count // 选择属性的库存
        this.postData.showimg = typeof attr_val.Attr_Image !== 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON.ImgPath[0]// 选择属性的图片
        this.productDetail_price = attr_val.Txt_PriceSon // 选择属性的价格
        this.pt_pricex=attr_val.pt_pricex
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
      this.check_attr = check_attr
      this.check_attrid_arr = check_attrid_arr
      this.submit_flag = !((!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length))
      // 购买数量处理  大于最高时赋值最高值
      if (this.postData.qty > this.postData.count) {
        this.postData.qty = this.postData.count
      }
    },
    skuSub () {
      if (!this.submit_flag) {
        return
      }
      this.postData.prod_id = this.Products_ID
      if (this.postData.atr_str == '' || this.postData.atrid_str == '') {
        if (this.product.skujosn) {
          wx.showToast({
            title: '您还没有选择规格',
            icon: 'none'
          })
          return
        }
      }
      this.postData.active_id = this.Team_ID
      this.postData.prod_id = this.Prod_ID
      updateCart(this.postData).then(res => {
        uni.navigateTo({
          url: '/pages/order/check?cart_key=DirectBuy&checkfrom=group'
        })
      }).catch(e => {
        uni.showToast({
          title: e.msg
        })
      })
      // 确定加入购物车
      this.$refs.cartPopu.close()
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
        this.postData.qty = parseInt(this.postData.qty) + 1
      } else {
        uni.showToast({
          title: '购买数量不能大于库存量',
          icon: 'none'
        })
        this.postData.qty = this.postData.count
      }
    },
    delNum () {
      if (this.postData.qty > 1) {
        this.postData.qty = parseInt(this.postData.qty) - 1
      } else {
        uni.showToast({
          title: '购买数量不能小于1',
          icon: 'none'
        })
        this.postData.qty = 1
      }
    },
    joinFunc () {
      if (!this.$fun.checkIsLogin(1)) return
      this.postData.active = 'pintuan'
      this.$refs.cartPopu.show()
    },
    async shareFunc (channel) {
      const _self = this
      const path = 'pages/detail/groupJoin?Team_ID=' + this.Team_ID + '&Products_ID=' + this.Prod_ID
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

          const sharePic = await getProductSharePic({
            product_id: this.Prod_ID,
            act_price: this.product.Products_PriceX
          }).then(res => {
            ls.set('temp_sharepic_info', res.data)
            return res.data.img_url
          })

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
    showTick (type, e) {
      this.type = type// e.currentTarget.dataset.type
      this.$refs.popupLayer.show()
    },
    close () {
      this.$refs.popupLayer.close()
    },
    cancel () {
      this.$refs.popupLayer.close()
    },
    inviteFunc () {
      // #ifdef H5
      this.isShowGuide = true
      // #endif

      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO

      // #endif

      // #ifdef APP-PLUS
      this.showTick('share')
      // #endif
    },
    goProductDetail,
    goOrderDetail () {
      // 这里应该需要跳转到订单详情页
      uni.navigateTo({
        url: '/pages/order/order?index=' + 2
      })
    },
    async INIT () {
      // 这里要设置Prod_ID

      await this.getProdDetail(this.Prod_ID)

      await this.getProdFunc()

      // 获取正在拼团的团队
      // await this.getPintuanTeamList(this.Prod_ID)
    },
    async getPintuanTeamList (id) {
      await getPintuanTeam({ prod_id: id }, { errtip: false }).then(res => {
        this.teamList = res.data
      }).catch(e => {

      })
    },
    getProdDetail (item) {
      const data = {
        prod_id: item,
        teamid: this.Team_ID,
        Users_ID: 'wkbq6nc2kc'
      }
      const _self = this

      getProductDetail(data).then(res => {
        this.product = res.data
        this.pt_pricex=this.product.pintuan_pricex

        this.postData.count = res.data.Products_Count

        this.join_team_list = res.data.join_team_list

        // 查看用户是否已经参加过团
        for (var team of this.join_team_list) {
          if (team.userid == this.userInfo.User_ID) {
            this.joined = true
          }
        }

        // 获取开团的时间
        for (var team of this.join_team_list) {
          if (team.team_head) {
            this.addtime = team.addtime
            break
          }
        }

        if (res.data.skujosn) {
          this.product.skujosn = typeof res.data.skujosn === 'string' ? JSON.parse(res.data.skujosn) : res.data.skujosn
          this.product.skuvaljosn = typeof res.data.skuvaljosn === 'string' ? JSON.parse(res.data.skuvaljosn) : res.data.skuvaljosn
        }

        // this.stampCount()
        // 开发时候一直倒计时太乱了
        window.groupStam = setInterval(this.stampCount, 1000)

        const product = this.product
        // #ifdef H5

        const path = 'pages/detail/groupJoin?Team_ID=' + this.Team_ID + '&Products_ID=' + this.Prod_ID
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
      }).catch(e => {
      })
    },
    // 订单详情
    async getOrderDetail () {
      const _self = this
      await getOrderDetail({
        Order_ID: this.Order_ID
      }).then(res => {
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

        this.Prod_ID = res.data.prod_list[0].prod_id

        this.Team_ID = res.data.teamid
      }).catch(() => {
      })
    },
    stampCount () {
      let rt = {}
      if (this.product && this.product.pintuan_end_time) {
        // 24小时内
        // 所以这个时候d一定是0
        const computedStamp = getGroupCountdown({ end_timeStamp: parseInt(this.addtime) + 24 * 60 * 60 })
        if (computedStamp) {
          rt = computedStamp
        } else {
          // 如果不对，就清空
          window.clearInterval(window.groupStam)
        }
      }

      this.countdown = rt
    },
    async getProdFunc () {
      const oldlist = this.prodList
      await getProd(this.prod_arg).then(res => {
        this.prodList = oldlist.concat(res.data)
        this.hasMore = (res.totalCount / this.prod_arg.pageSize) > this.prod_arg.page
        this.prod_arg.page += 1
      }).catch(e => {
      })
    }
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
  .guide_box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    text-align: right;

    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .7);

    }

    .guide_point {
      width: 375rpx;
      height: 475rpx;
      /*margin-right: 10px;*/
    }

    .guide_btn {
      width: 189rpx;
      height: 63rpx;
      margin-right: 20px;
    }
  }

  .shareinfo {
    padding: 30rpx 0 0;
    color: #333;
    font-size: 12px;
    text-align: center;
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
    width: 38px;
    height: 38px;
    display: block;
    margin: 0 auto 5px;
  }

  .s_bottom {
    position: relative;
    bottom: 0;
    width: 100%;
    background: #e8e8e8;
    color: #666;
    font-size: 13px;
    text-align: center;
    line-height: 30px;
    margin-top: 25px;
  }

  .start {
    overflow-x: hidden;
    background-color: #fff !important;

    .nav-title {
      background: #fafafa !important;
    }

    .first {
      padding: 10px 0px;
      display: flex;

      .left {
        width: 290rpx;
        height: 290rpx;
        margin-left: 10px;

        .img {
          width: 290rpx;
          height: 290rpx;
        }
      }

      .right {
        width: 460rpx;
        margin-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 12px;
        position: relative;

        .top {
          width: 100%;
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }

        .bottom {
          margin-top: 40rpx;
          @media screen and (max-width: 371px) {
            margin-top: 0;
          }

          .price {
            font-size: 24rpx;
            color: #F43131;

            span {
              margin-left: 14px;
              color: #999999;
            }

            .prices {
              color: #F43131;
              font-size: 40rpx;
              margin-left: 5px;
            }
          }

          .tuan {
            margin-top: 3px;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }

    .second {
      display: flex;
      width: 100%;
      height: 40px;
      padding: 14px 0px;
      background-color: #FAFAFA;
      box-sizing: border-box;
      font-size: 22rpx;
      color: #333;
      justify-content: space-around;
      padding-left: 16px;
      padding-right: 16px;
      @media screen and (max-width: 371px) {
        padding: 14px 0px;
      }

      .img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }

      .lis {
        display: flex;
        align-items: center;
      }
    }

    .three {
      .paySuc {
        padding: 82rpx 241rpx;
        padding-bottom: 75rpx;
        display: flex;
        align-items: center;
        font-size: 46rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(244, 49, 49, 1);
        line-height: 38px;

        .img {
          width: 34px;
          height: 31px;
        }
      }

      .lyl {
        display: flex;
        margin: 0 auto;
        padding-left: 220rpx;
        padding-right: 205rpx;
        list-style: none;

        .img {
          width: 95rpx;
          height: 95rpx;
          border-radius: 50%;
        }

        .liq {
          margin-right: 11px;
          width: 95rpx;
          height: 95rpx;
          border-radius: 50%;
          position: relative;

          .tuanzhang {
            width: 26px;
            height: 19px;
            border-radius: 0;
            position: absolute;
            left: -11px;
          }

          .tuanzhang {
            width: 26px;
            font-size: 10px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            left: -9px;
          }
        }
      }
    }

    .how {
      width: 167px;
      margin-top: 28px;
      margin-bottom: 13px;
      padding-left: 231rpx;
      display: flex;
      align-items: center;

      .img {
        width: 18px;
        height: 18px;
      }

      .my {
        font-size: 30rpx;
        color: #333;
        margin-left: 8px;

        .spans {
          color: #F43131;
          margin: 0 5px;
        }
      }
    }

    .times {
      display: flex;
      // width: 344px;
      padding-left: 77rpx;
      padding-right: 76rpx;
      margin: 0 auto;
      align-items: center;
      justify-content: center;

      .line {
        width: 123rpx;
        height: 1px;
        background-color: #DEDDDD;
      }

      .text {
        width: 350rpx;
        margin: 0 12rpx;
        display: flex;
        align-items: center;
        font-size: 24rpx;
        text-align: center;

        .myTime {
          margin: 0 28rpx;
          font-size: 30rpx;
        }

        .num {
          background-color: #484848;
          border-radius: 2px;
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;
          text-align: center;
        }

        .lines {
          //width: 6px;
          padding: 0 4rpx;
          display: inline-block;
          height: 24px;
          text-align: center;
        }
      }
    }

    .dingdan {
      margin-top: 18px;
      font-size: 0;
      margin-bottom: 15px;
      padding: 0rpx 110rpx;
      height: 74rpx;
      // @media screen and (max-width: 370px) {
      //     margin-left: 15px;
      //     margin-right: 0;
      //     margin-top:18px;
      //     font-size: 0;
      //     margin-bottom: 15px;
      // }
      // @media screen and (min-width: 371px) and (max-width: 380px) {
      //     margin: 0 4px;
      //     margin-top: 18px;
      //     font-size: 0;
      //     margin-bottom: 15px;
      // }
      .vanButton {
        width: 250rpx;
        height: 74rpx;
        background: rgba(250, 107, 39, 1);
        border-radius: 6px;
        font-size: 32rpx;
        color: #fff;
        display: inline-block;
        line-height: 74rpx;
        text-align: center;
      }

      .invi {
        margin-left: 30rpx;
        font-size: 34rpx;
        background-color: #F43131;
      }
    }

    .liji {
      margin: 0 auto;
      margin-top: 18px;
      display: flex;
      margin-bottom: 15px;
      height: 74rpx;
      line-height: 74rpx;

      .vanButton {
        font-size: 34rpx;
        width: 690rpx;
        margin: 0 auto;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        background-color: #F43131;
      }
    }

    .mbxline {
      width: 100%;
      height: 11px;
      background-color: #f2f2f2;
    }

    .guize {
      .top {
        font-size: 30rpx;
        color: #333333;
        margin-top: 17px;
        margin-left: 18px;
        margin-bottom: 17px;
      }

      .xiang {
        margin-left: 30px;

        .hang {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .img {
            width: 6px;
            height: 11px;
          }

          span {
            margin-left: 8px;
            font-size: 24rpx;
            color: #333333;
          }
        }
      }
    }

    .dianzhang {
      font-size: 30rpx;
      color: #333333;
      background-color: #f2f2f2;
      padding: 17px;
    }
  }

  // 查看更多
  .prolist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 11px;
    background-color: #f2f2f2;
  }

  .pro-item {
    width: 345rpx;
    margin-bottom: 15px;
    background: #fff;
  }

  .pro-item .img {
    width: 100%;
    height: 345rpx;
  }

  .item-name {
    font-size: 24rpx;
    line-height: 30rpx;
    height: 60rpx;

    padding-left: 11rpx;
    padding-right: 15rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .red {
    color: #F43131;
    font-weight: 700;
  }

  .price {
    margin-top: 10px;
    padding: 0 5px 10px;
  }

  .pricem {
    font-size: 24rpx;
    font-style: normal;
  }

  .n_price {
    color: #ff0000;
    font-size: 34rpx;
  }

  .o_price {
    color: #afafaf;
    font-size: 12px;
    margin-left: 22rpx;
  }

  //规格
  .cartSku {
    padding: 0rpx 10rpx;

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
        width: 420rpx;

        .cartTitles {
          height: 80rpx;
          line-height: 40rpx;
          overflow: hidden;
          margin-top: 20rpx;
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
        display: flex;
        padding: 15rpx 0rpx;

        .sku {
          font-size: 28rpx;
          height: 70rpx;
          line-height: 70rpx;
          width: 140rpx;
        }

        .skuValue {
          display: flex;

          .divs {
            height: 70rpx;
            line-height: 70rpx;
            font-size: 28rpx;
            border-radius: 10rpx;
            color: #000;
            background-color: #fff;
            padding-left: 20rpx;
            padding-right: 20rpx;
            margin-right: 20rpx;
            border: 1px solid #ccc;
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
        margin-right: 50rpx;
        display: flex;

        .inputs {
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

    &.disabled {
      background: #999;
    }
  }

  .skuCheck {
    color: #fff !important;
    background-color: #ff4200 !important;
  }
</style>
