<template>
  <view @click="commonClick">
    <view class="topImg">
      <view @click="changIndex(1)" class="topAll">
        <view class="ulDiv">
          <image class="imgHund" src="/static/procurement/zai.png"></image>
        </view>
        <view :class="index == 1? 'redColor':''" class="font-13">
          {{$t(1377)}}
        </view>
      </view>

      <view @click="changIndex(2)" class="topAll">
        <view class="ulDiv">
          <image class="imgHund" src="/static/procurement/zai.png"></image>
        </view>
        <view :class="index == 2? 'redColor':''" class="font-13">
          {{$t(1378)}}
        </view>
      </view>

      <view @click="changIndex(3)" class="topAll">
        <view class="ulDiv">
          <image class="imgHund" src="/static/procurement/zai.png"></image>
        </view>
        <view :class="index == 3? 'redColor':''" class="font-13">
          {{$t(1379)}}
        </view>
      </view>

      <view @click="changIndex(4)" class="topAll">
        <view class="ulDiv">
          <image class="imgHund" src="/static/procurement/zai.png"></image>
        </view>
        <view :class="index == 4? 'redColor':''" class="font-13">
          {{is_refund && is_fourth?$t(1380):$t(1381)}}
        </view>
      </view>

    </view>

    <view class="marginAuto">
      <template v-if="index == 4">
        <block v-if="productMy.length > 0">
          <view :key="index" class="blockDiv" v-for="(item,index) of productMy">
            <view class="imgDiv">
              <image :src="item.ImgPath" class="imgHund"></image>
            </view>
            <view :style="{width: isShow?'415':'425'+'rpx'}" class="textRight">
              <view class="productName">
                {{item.Products_Name}}
              </view>
              <view class="skuMy">
                <span>{{$t(1382)}}：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">{{$t(1383)}}：{{item.Products_Sales}}</span>
              </view>
              <view class="bottomDiv">
                <view @click="showSkuList(item.Products_ID)" class="skuCount" v-if="item.Products_Type">
                 T._(1377)
                </view>
                <view v-else>

                </view>
                <view class="allPrice">
                  <view v-if="!(is_refund&&is_fourth)">
                    {{$t(1384)}}<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
                  </view>
                  <view @click="apply_back(item,index)" class="back-btn" v-else>{{$t(1385)}}</view>
                </view>
              </view>
            </view>
          </view>
        </block>
        <div class="defaults" v-else>
          <image :src="'/static/client/defaultImg.png'|domain"></image>
        </div>
      </template>
      <template v-else-if="index == 2">
        <block v-if="productMy_soldout.length > 0">
          <view :key="index" class="blockDiv" v-for="(item,index) of productMy_soldout">
            <view class="imgDiv">
              <image :src="item.ImgPath" class="imgHund"></image>
            </view>
            <view :style="{width: isShow?'415':'425'+'rpx'}" class="textRight">
              <view class="productName">
                {{item.Products_Name}}
              </view>
              <view class="skuMy">
                <span>{{$t(1386)}}：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">{{$t(1387)}}：{{item.Products_Sales}}</span>
              </view>
              <view class="bottomDiv">
                <view @click="showSkuList(item.Products_ID)" class="skuCount" v-if="item.Products_Type">
                  {{$t(1388)}}
                </view>
                <view v-else>

                </view>
                <view class="allPrice">
                  <view v-if="!(is_refund&&is_fourth)">
                    {{$t(1389)}}<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
                  </view>
                  <view @click="apply_back(item,index)" class="back-btn" v-else>{{$t(1390)}}</view>
                </view>
              </view>
            </view>
          </view>
        </block>
        <div class="defaults" v-else>
          <image :src="'/static/client/defaultImg.png'|domain"></image>
        </div>
      </template>
      <template v-else-if="index==3">
        <block v-if="productlist.length>0">
          <view :key="index" @click="checkedSelect(index)" class="blockDiv" v-for="(item,index) of productlist">
            <view class="mbxa" v-if="isShow">
              <img :src="checked[index].checked?checked_img_url:uncheck_img_url" class="imgs">
            </view>
            <view style="width: 10rpx" v-if="!isShow">
            </view>
            <view class="imgDiv">
              <image :src="item.ImgPath" class="imgHund"></image>
            </view>
            <view :style="{width: isShow?'415':'425'+'rpx'}" class="textRight">
              <view class="productName">
                {{item.Products_Name}}
              </view>
              <view class="skuMy">
                <span>{{$t(1391)}}：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">{{$t(1392)}}：{{item.Products_Sales}}</span>
              </view>
              <view class="bottomDiv">
                <view @click="showSkuList(item.Products_ID)" class="skuCount" v-if="item.Products_Type">
                  {{$t(1393)}}
                </view>
                <view v-else>

                </view>
                <view class="allPrice">
                  <view v-if="!(is_refund&&is_fourth)">
                    {{$t(1394)}}<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
                  </view>
                  <view @click="apply_back(item,index)" class="back-btn" v-else>{{$t(1395)}}</view>
                </view>
              </view>
            </view>
          </view>
        </block>
        <div class="defaults" v-else>
          <image :src="'/static/client/defaultImg.png'|domain"></image>
        </div>
      </template>
      <template v-else>
        <block v-if="productlist.length>0">
          <view :key="index" @click="checkedSelect(index)" class="blockDiv" v-for="(item,index) of productlist">
            <view class="imgDiv">
              <image :src="item.ImgPath" class="imgHund"></image>
            </view>
            <view :style="{width: isShow?'415':'425'+'rpx'}" class="textRight">
              <view class="productName">
                {{item.Products_Name}}
              </view>
              <view class="skuMy">
                <span>{{$t(1396)}}：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">{{$t(1397)}}：{{item.Products_Sales}}</span>
              </view>
              <view class="bottomDiv">
                <view @click="showSkuList(item.Products_ID)" class="skuCount" v-if="item.Products_Type">
                  {{$t(1398)}}
                </view>
                <view v-else>

                </view>
                <view class="allPrice">
                  <view v-if="!(is_refund&&is_fourth)">
                    {{$t(1399)}}：<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
                  </view>
                  <view @click="apply_back(item,index)" class="back-btn" v-else>{{$t(1400)}}</view>
                </view>
              </view>
            </view>
          </view>
        </block>
        <div class="defaults" v-else>
          <image :src="'/static/client/defaultImg.png'|domain"></image>
        </div>
      </template>
    </view>

    <view style="height: 86rpx;width: 750rpx;" v-if="index==3">

    </view>
    <view @click="allSum" class="buttonLast" v-if="index==3">
      {{$t(1401)}}
    </view>

    <!--  遮罩层	-->
    <view :hidden="isHiddenMask" @click="hiddenMask" class="mask"></view>
    <!--  产品属性弹窗	-->
    <view class="sku-pop" v-if="showSku">
      <view class="sku-title">{{$t(1402)}}</view>
      <view class="sku-content">
        <view :key="" class="skulist" v-for="item in prosku.skujosn_new">
          <view class="sku-name">{{item.sku}}</view>
          <view class="sku-item">
            <view :class="[check_attr[item.sku]==index?'active':'','sku']" :key=""
                  @click="selectAttr(index,item.sku)" v-for="(attr,index) of item.val">{{attr}}
            </view>
          </view>
        </view>
        <view class="skulist">
          <view class="sku-name">{{$t(1403)}}</view>
          <view class="sku-item">
            <view @click="minus" class="handle">-</view>
            <view class="pro-num">{{postData.qty}}</view>
            <view @click="plus" class="handle">+</view>
          </view>
        </view>
        <view class="sku-btns">
          <view @click="cancel" class="cancel btn">{{$t(1404)}}</view>
          <view :class="submit_flag?'':'disabled'" @click="confirm(prosku)" class="confirm btn">{{$t(1405)}}</view>
        </view>
      </view>
    </view>
    <!--  价值弹窗	-->
    <view class="sku-pop" v-if="showSum">
      <!-- <view class="sku-title"></view> -->
      <view class="priceSum">
        <view class="title">{{$t(1406)}}</view>
        <text class="icon">¥</text>
        <span class="span">{{prod_money}}</span>
      </view>
    </view>
    <view style="height:90rpx;" v-if="index == 4 && amount > 0 ">
      <view :style="{'z-index': zIndex}" class="check">
        <view @click="showSelected" class="check-msg">{{$t(1407)}}
          <text class="num">{{amount}}</text>
          {{$t(1408)}}
          <image :class="isClicked?'turn':''" class="img" src="/static/top.png"></image>
        </view>
        <view @click="submit" class="submit">{{$t(1409)}}</view>
      </view>
    </view>
    <!-- 规格弹窗 -->
    <popup-layer :direction="'top'" @maskClicked="Clicked" ref="skuRef">
      <view class="mxdetail">
        <view class="mxtitle">{{$t(1410)}}</view>
        <view class="mxitem">规格
          <text class="num">{{$t(1411)}}</text>
        </view>
        <block :key="index" v-for="(item,index) of mySkuList">
          <view class="mxitem">{{item.attr_txt}}
            <text class="num">{{item.count}}</text>
          </view>
        </block>
      </view>
    </popup-layer>
    <!--	明细	-->
    <popup-layer :bottomHeight="45" :direction="'top'" @maskClicked="handClicked" ref="detail">
      <view class="mxdetail">
        <template v-for="(pro,index) of productMy">
          <block v-if="pro.skuvaljosn">
            <template v-for="(attr,attr_id) in pro.skuvaljosn">
              <view class="product" v-if="attr.myqty>0">
                <view class="proImg">
                  <image :src="pro.ImgPath" class="img"></image>
                </view>
                <view class="proMsg">
                  <view class="proName">
                    <view class="name">{{pro.Products_Name}}</view>
                    <image @click="delList(index,attr.myqty,attr_id)" class="del"
                           src="/static/procurement/del.png"></image>
                  </view>
                  <view class="attrInfo">
                    <view class="attrVal">{{attr.check_attrnames}}</view>
                  </view>
                  <view class="proPrice">
                    <view class="newPrice">￥
                      <text class="number">{{pro.Products_PriceX}}</text>
                    </view>
                    <view class="oldPrice" v-if="pro.Products_PriceY!=pro.Products_PriceX">￥{{pro.Products_PriceY}}
                    </view>
                    <view class="amount">
                      <view @click="delNumber(attr,pro)" class="icon">-</view>
                      <view class="num">{{attr.myqty}}</view>
                      <view @click="addNumber(attr,pro)" class="icon">+</view>
                    </view>
                  </view>
                </view>
              </view>
            </template>
          </block>
          <block v-else>
            <view class="product" v-if="pro.myqty>0">
              <view class="proImg">
                <image :src="pro.ImgPath" class="img"></image>
              </view>
              <view class="proMsg">
                <view class="proName">
                  <view class="name">{{pro.Products_Name}}</view>
                  <image @click="delListNoAttr(pro,index,pro.myqty)" class="del"
                         src="/static/procurement/del.png"></image>
                </view>
                <view class="proPrice">
                  <view class="newPrice">￥
                    <text class="number">{{pro.Products_PriceX}}</text>
                  </view>
                  <view class="oldPrice">￥{{pro.Products_PriceY}}</view>
                  <view class="amount">
                    <view @click="delNumberNoAttr(pro)" class="icon">-</view>
                    <view class="num">{{pro.myqty}}</view>
                    <view @click="addNumberNoAttr(pro)" class="icon">+</view>
                  </view>
                </view>
              </view>
            </view>
          </block>
        </template>
      </view>
    </popup-layer>
    <!-- 修改渠道 -->
    <view class="sku-pop" v-if="isChangeChannel">
      <view class="sku-title">{{$t(1412)}}</view>
      <view class="sku-content" style="padding-left:53rpx;">
        <view @click="active_id = 0" class="skulist">

          <image class="selected" mode="" src="/static/procurement/selected.png" v-if="active_id == 0"></image>
          <view class="nochecked" v-else></view>
          <view>{{$t(1413)}}</view>
        </view>
        <view @click="active_id = 1" class="skulist">
          <image class="selected" mode="" src="/static/procurement/selected.png" v-if="active_id == 1"></image>
          <view class="nochecked" v-else></view>
          <view>{{$t(1414)}}</view>
        </view>
        <view class="skulist" v-if="active_id == 1">
          <input class="input" placeholder="$t(1415)" placeholder-style="color: #C9C9C9;font-size: 24rpx;" type="text"
                 v-model="purchase_store_sn" />
        </view>
        <view class="skulist change-btn">
          <view @click="sub_cancel" class="btn cancel">{{$t(1416)}}</view>
          <view @click="sub_confirm" class="btn confirm">{{$t(1417)}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { pageMixin } from '../../common/mixin'
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import { domainFn } from '../../common/filter'
import { mapGetters } from 'vuex'
import { ls, numberSort } from '../../common/tool.js'
import { getProductAtts, getSelfStoreProd, getStoreProdMoney, storeInit, storeProdBackSubmit } from '../../common/fetch'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      storeDetail: {},
      checked_img_url: '/static/client/checked.png',
      uncheck_img_url: '/static/client/uncheck.png',
      isShow: true,
      index: 1,
      page: 1,
      pageSize: 10,
      totalCount: 0,
      productMy: [],
      checked: [],
      checkedData: [],
      loading: false,
      isHiddenMask: true, // 是否隐藏遮罩
      showSum: false, // 总价值弹窗
      prod_money: 0,
      showSku: false,
      is_refund: false, // 是否是退货状态
      is_fourth: false, // 是否是第四个状态
      prosku: {},
      check_attr: {},
      check_attrid_arr: [],
      postData: {
        prod_id: 0, // 产品ID  在 onLoad中赋值
        attr_id: 0, // 选择属性id
        count: 0, // 选择属性的库存
        // showimg: '',      //选择属性的图片(用产品图片代替)
        qty: 1, // 退货数量
        productDetail_price: 0
      },
      submit_flag: true, // 提交按钮是否可以用
      // amount: 0 , // 用户要退货的总数量
      prosku_index: 0, // 产品在数组中的索引，用于修改产品库存数量
      check_attrid: '', // 选中的商品规格1;2;3
      check_attrnames: '', // 选中的商品名称
      zIndex: 100,
      productMy_soldout: [], // 库存紧张
      productlist: [], // index为1，3的时候，产品列表
      isChangeChannel: false, // 修改渠道
      active_id: 0,
      purchase_store_sn: '', // 门店编号,
      isClicked: false,
      stock_low: 0, // 是否查询的是低库存产品
      mySkuList: []
    }
  },
  components: {
    popupLayer
  },
  computed: {
    ...mapGetters(['Stores_ID', 'initData']),
    amount: function () {
      let amount = 0
      if (this.productMy) {
        this.productMy.forEach(item => {
          if (item.skuvaljosn) {
            for (const attr_id in item.skuvaljosn) {
              if (item.skuvaljosn[attr_id].myqty) {
                amount += item.skuvaljosn[attr_id].myqty
              }
            }
          } else {
            amount += item.myqty
          }
        })
      }
      return amount
    }
  },
  watch: {
    amount: function (val) {
      if (val == 0) {
        this.$refs.detail.close()
      }
    }
  },
  onShow () {
    // ls.remove('productMy')
    this.checked_img_url = domainFn(this.checked_img_url)
    this.uncheck_img_url = domainFn(this.uncheck_img_url)
    this.load()
  },
  onLoad (options) {
    if (options.stock_low) {
      this.stock_low = 1
      this.index = 2
    }
  },
  onUnload () {
    ls.set('productMy', this.productMy)
  },
  onHide () {
  },
  onReachBottom () {
    if (this.productMy.length < this.totalCount) {
      this.page++
      this.getSelfStoreProd()
    }
  },
  methods: {
    Clicked () {
      this.$refs.skuRef.close()
    },
    showSkuList (id) {
      const data = {
        store_id: this.Stores_ID,
        product_id: id
      }
      getProductAtts(data, {
        tip: T._(1378),
        mask: true
      }).then(res => {
        this.$refs.skuRef.show()
        this.mySkuList = res.data
      })
    },
    load () {
      // this.productMy = [];
      this.productlist = []
      this.page = 1
      this.getSelfStoreProd()
      this.getStoreDetail()
    },
    getStoreDetail () {
      storeInit({
        store_id: this.Stores_ID
      }).then(res => {
        this.storeDetail = res.data
      })
    },
    // 提交退货
    submit () {
      ls.set('productMy', this.productMy)
      const pid = ls.get('pid')
      if (pid == 0) {
        uni.navigateTo({
          url: '/pagesA/selectChannel/selectChannel?page=productmy'
        })
      } else {
        if (this.initData.same_level_purchase == 0 && this.storeDetail.type_id <= this.storeDetail.parent_store.type_id) {
          uni.navigateTo({
            url: '/pagesA/selectChannel/selectChannel?page=productmy'
          })
        } else {
          uni.navigateTo({
            url: '/pagesA/selectChannel/selectChannel?page=productmy&pid=' + pid
          })
        }
      }
    },
    sub_cancel () {
      this.isChangeChannel = false
      this.isHiddenMask = true
    },
    sub_confirm () {
      const productMy = this.productMy
      const arr = [] // 选中的产品数组
      productMy.forEach(item => {
        if (item.skuvaljosn) {
          for (const attr_id in item.skuvaljosn) {
            if (item.skuvaljosn[attr_id].myqty > 0) {
              arr.push(item.skuvaljosn[attr_id])
            }
          }
        } else if (item.myqty > 0) {
          arr.push(item)
        }
      })
      const prod_json = {}
      for (const i in arr) {
        if (!arr[i].Products_ID) {
          arr[i].Products_ID = arr[i].prod_id
        }
        if (prod_json[arr[i].Products_ID]) {
          prod_json[arr[i].Products_ID].num = prod_json[arr[i].Products_ID].num + arr[i].myqty
          if (prod_json[arr[i].Products_ID].attr) {
            prod_json[arr[i].Products_ID].attr[arr[i].Product_Attr_ID] = arr[i].myqty
          } else {
            if (arr[i].Product_Attr_ID) {
              prod_json[arr[i].Products_ID].attr = {
                [arr[i].Product_Attr_ID]: arr[i].myqty
              }
            }
          }
        } else {
          prod_json[arr[i].Products_ID] = {
            num: arr[i].myqty
          }
          if (prod_json[arr[i].Products_ID].attr) {
            prod_json[arr[i].Products_ID].attr[arr[i].Product_Attr_ID] = arr[i].myqty
          } else {
            if (arr[i].Product_Attr_ID) {
              prod_json[arr[i].Products_ID].attr = {
                [arr[i].Product_Attr_ID]: arr[i].myqty
              }
            }
          }
        }
      }
      if (this.active_id == 1 && !this.purchase_store_sn) {
        uni.uni.showToast({
          title: T._(1379),
          icon: 'none'
        })
        return
      }
      storeProdBackSubmit({
        store_id: this.Stores_ID,
        prod_json: JSON.stringify(prod_json),
        purchase_type: this.active_id == 0 ? 'shop' : 'store',
        purchase_store_sn: this.purchase_store_sn
      }).then(res => {
        uni.showToast({
          title: res.msg
        })
        // 关闭遮罩
        this.isHiddenMask = true
        // 关闭选择渠道
        this.isChangeChannel = false
        setTimeout(() => {
          uni.navigateTo({
            url: '/pagesA/procurement/refundRecords'
          })
        }, 500)
      })
    },
    // 删除不含属性的
    delListNoAttr (pro, index, qty) {
      this.productMy[index].myqty = 0
      this.productMy[index].prod_stock += qty
    },
    // 减少数量
    delNumberNoAttr (pro) {
      if (pro.myqty == 1) {
        uni.showToast({
          title: T._(1380),
          icon: 'none'
        })
        return
      }
      pro.myqty--
      pro.prod_stock++
    },
    // 增加数量
    addNumberNoAttr (pro) {
      if (pro.prod_stock == 0) {
        uni.showToast({
          title: T._(1381),
          icon: 'none'
        })
        return
      }
      pro.myqty++
      pro.prod_stock--
    },
    // 删除有属性的
    delNumber (num, pro) {
      if (num.myqty == 1) {
        uni.showToast({
          title: T._(1382),
          icon: 'none'
        })
        return
      }
      num.myqty--
      pro.prod_stock++
      num.Property_count++
      num.attr_count--
      // ls.remove('productMy')
      // ls.set('productMy',this.productMy);
    },
    addNumber (num, pro) {
      const my = num.Product_Attr_ID
      const numbers = pro.sku_stock[my]
      if (num.myqty < numbers) {
        num.myqty++
        pro.prod_stock--
        num.Property_count--
        num.attr_count++
        // this.amount ++;
        return
      }
      uni.showToast({
        title: T._(1383),
        icon: 'none'
      })
    },
    handClicked () {
      this.zIndex = 100
      this.isClicked = false
      this.showSku = false
      this.showSum = false
      this.isHiddenMask = true
      this.$refs.detail.close()
    },
    delList (index, qty, attr_id) {
      this.productMy[index].skuvaljosn[attr_id].myqty = 0
      this.productMy[index].prod_stock += qty
      this.productMy[index].skuvaljosn[attr_id].Property_count += qty
      // this.amount-=qty
    },
    // 取消退货
    cancel () {
      this.isHiddenMask = true
      this.showSku = false
    },

    showSelected () {
      if (this.total_cart_count == 0) return
      if (!this.isClicked) {
        this.zIndex = 9999999
        this.$refs.detail.show()
      } else {
        this.$refs.detail.close()
        setTimeout(() => {
          this.zIndex = 100
        }, 500)
      }
      this.isClicked = !this.isClicked
    },
    // 确认退货
    confirm (prosku) {
      if (!this.submit_flag) {
        return
      }

      if (prosku.skuvaljosn && !this.postData.attr_id) {
        uni.showToast({
          title: T._(1384),
          icon: 'none'
        })
        return
      }
      if (prosku.skuvaljosn) {
        this.productMy[this.prosku_index].prod_stock -= this.postData.qty
        this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].attr_count = this.postData.qty
        this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].Property_count -= this.postData.qty
        this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].check_attrid_arr = this.check_attrid_arr
        // 存选中商品的属性名
        this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].check_attrnames = this.check_attrnames
        // 存选中商品的规格数量
        this.productMy[this.prosku_index].skuvaljosn[this.check_attrid].myqty += this.postData.qty
      } else {
        this.productMy[this.prosku_index].prod_stock -= this.postData.qty
        this.productMy[this.prosku_index].myqty += this.postData.qty
      }

      // 确认以后，该产品改属性的库存减少 qty个，
      // this.amount += this.postData.qty;
      this.isHiddenMask = true
      this.showSku = false
    },
    // 申请退货
    apply_back (item, index) {
      this.check_attr = {}
      this.check_attrid_arr = []
      this.postData.qty = 1
      this.submit_flag = true
      this.prosku_index = index // 产品在数组中的索引，用于修改产品库存数量
      this.postData.count = item.prod_stock
      if (item.prod_stock == 0) {
        this.postData.qty = 0
      }
      if (item.skujosn) {
        const skujosn = item.skujosn
        const skujosn_new = []
        for (const i in item.skujosn) {
          skujosn_new.push({
            sku: i,
            val: skujosn[i]
          })
        }
        item.skujosn_new = skujosn_new
        item.skuvaljosn = item.skuvaljosn
      }
      this.prosku = item
      this.isHiddenMask = false
      // 防止切换产品属性有时候出现 null
      setTimeout(() => {
        this.showSku = true
      }, 100)
    },
    // 选择属性
    selectAttr (index, i) {
      this.zIndex = 100
      var value_index = index // 选择的属性值索引
      var attr_index = i // 选择的属性索引
      // if (this.check_attrid_arr.indexOf(value_index) > -1) return false;
      // 记录选择的属性
      var check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }) // 记录选择的属性  attr_index外的[]必须
      // 属性处理
      var check_attrid = []
      var check_attrname = []
      var check_attrnames = []
      var check_name = []
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
        check_attrnames.push(attr_name + ':' + this.prosku.skujosn[attr_name][attr_id])
        check_name.push(this.prosku.skujosn[attr_name][attr_id])
      }
      let mySku = ''
      for (const item of check_name) {
        mySku += item + ';'
      }
      mySku = mySku.substring(0, mySku.length - 1)
      check_attrid = check_attrid.join(';')
      var attr_val = this.prosku.skuvaljosn[check_attrid] // 选择属性对应的属性值
      // 数组转化为字符串
      check_attrnames = check_attrnames.join(';')
      // 属性判断
      if (attr_val) {
        this.postData.attr_id = attr_val.Product_Attr_ID // 选择属性的id
        this.postData.count = attr_val.Property_count // 选择属性的库存
        // this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
        this.postData.productDetail_price = attr_val.Attr_Price ? attr_val.Attr_Price : this.prosku.Products_PriceX // 选择属性的价格
        this.submit_flag = !((!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length))
      }
      // 判断属性库存
      if (attr_val && attr_val.Property_count <= 0) {
        // uni.showToast({
        //     title: '您选择的 ' + check_attrnames + ' 库存不足，请选择其他属性',
        //     icon: 'none'
        // })
        this.submit_flag = false
        return false
      }
      this.check_attr = {}
      // 存取1；2；3
      this.check_attrid = check_attrid
      this.check_attrnames = mySku
      this.check_attr = check_attr
      this.check_attrid_arr = check_attrid_arr
      this.submit_flag = !((!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) || Object.getOwnPropertyNames(this.prosku.skuvaljosn).indexOf(check_attrid) == -1)
    },
    plus () {
      if (this.postData.qty < this.postData.count) {
        this.postData.qty = Number(this.postData.qty) + 1
      } else {
        uni.showToast({
          title: T._(1385),
          icon: 'none'
        })
        this.postData.qty = this.postData.count
      }
    },
    minus () {
      if (this.postData.qty == 0) return
      if (this.postData.qty > 1) {
        this.postData.qty -= 1
      } else {
        uni.showToast({
          title: T._(1386),
          icon: 'none'
        })
        this.postData.qty = 1
      }
    },
    // 点击遮罩
    hiddenMask () {
      this.zIndex = 100
      this.isClicked = false
      this.showSku = false
      this.showSum = false
      this.isHiddenMask = true
      this.isChangeChannel = false
    },
    allSum () {
      const arr = []
      for (const item of this.checked) {
        if (item.checked) {
          arr.push(this.productlist[item.index].Products_ID)
        }
      }
      if (arr.length <= 0) {
        uni.showToast({
          title: T._(1387),
          icon: 'none'
        })
        return
      }
      const data = {
        store_id: this.Stores_ID,
        prod_ids: JSON.stringify(arr)
      }
      getStoreProdMoney(data).then(res => {
        this.prod_money = res.data.prod_money
      }).catch(e => {
      })
      this.showSum = true
      this.isHiddenMask = false
    },
    checkedSelect (index) {
      this.checked[index].checked = !this.checked[index].checked
    },
    getSelfStoreProd () {
      if (this.loading) return
      this.checkedData = this.checked
      this.loading = true
      const data = {
        store_id: this.Stores_ID,
        page: this.page,
        pageSize: this.pageSize
      }
      if (this.stock_low != 0) {
        data.stock_low = 1
      }
      getSelfStoreProd(data).then(res => {
        const oldProductMy = ls.get('productMy') || []
        // this.productMy = this.productMy.concat(res.data);
        this.productlist = this.productlist.concat(res.data)
        this.checked = []
        for (const i in this.productlist) {
          this.checked.push({
            index: i,
            checked: false
          })
        }
        for (let i = 0; i < this.checkedData.length; i++) {
          this.checked[i].checked = this.checkedData[i].checked
        }
        this.totalCount = res.totalCount
        this.loading = false
        this.productMy = []
        this.productMy = this.productlist
        for (const item in this.productMy) {
          if (this.productMy[item].skuvaljosn) {
            for (const i in this.productMy[item].skuvaljosn) {
              this.$set(this.productMy[item].skuvaljosn[i], 'myqty', 0)
              // this.productMy[item].skuvaljosn[i].myqty=0
            }
          } else {
            this.$set(this.productMy[item], 'myqty', 0)
            // this.productMy[item].myqty = 0;
          }
        }
        oldProductMy.forEach(item => {
          const prod_id = item.prod_id
          this.productMy.forEach(pro => {
            const n_id = pro.prod_id
            // 是同一个产品
            if (prod_id == n_id) {
              if (pro.skuvaljosn) {
                for (const i in pro.skuvaljosn) {
                  pro.skuvaljosn[i].myqty = item.skuvaljosn[i].myqty
                  pro.skuvaljosn[i].check_attrnames = item.skuvaljosn[i].check_attrnames
                  pro.skuvaljosn[i].check_attrid_arr = item.skuvaljosn[i].check_attrid_arr
                  pro.skuvaljosn[i].Property_count -= item.skuvaljosn[i].myqty
                  pro.skuvaljosn[i].attr_count = item.skuvaljosn[i].myqty
                  pro.prod_stock -= item.skuvaljosn[i].myqty
                }
              } else {
                pro.myqty = item.myqty
                pro.prod_stock -= item.myqty
              }
            }
          })
        })
        // 库存紧张
        this.productMy_soldout = this.productlist.filter(item => {
          return item.prod_stock <= 10
        })
      }).catch(e => {
        this.loading = false
      })
    },
    changIndex (index) {
      // 切换存一下数组，否则之前处理的逻辑都没了
      if (index == this.index) return

      if (index != 4) {
        // ls.remove('productMy');
        // ls.set('productMy', this.productMy);
      }
      ls.set('productMy', this.productMy)
      this.index = index
      if (index != 4) {
        this.is_refund = false
      } else {
        this.is_fourth = true
        this.is_refund = !this.is_refund
      }
      if (this.index == 3) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      if (this.index == 2) {
        // 库存紧张
        this.productMy_soldout = this.productlist.filter(item => {
          return item.prod_stock <= 10
        })
      } else if (this.index == 4) {
        this.productMy = ls.get('productMy')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .topImg {
    box-sizing: border-box;
    width: 750rpx;
    height: 180rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .topAll {
    width: 120rpx;
    text-align: center;

    .redColor {
      color: $wzw-primary-color;
    }
  }

  .imgHund {
    width: 100%;
    height: 100%;
  }

  .ulDiv {
    width: 78rpx;
    height: 78rpx;
    margin: 0 auto;
  }

  .font-13 {
    font-size: 13px;
    color: #333333;
    margin-top: 14rpx;
  }

  .marginAuto {
    width: 710rpx;
    margin: 0 auto;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20rpx 26rpx 18rpx 10rpx;
  }

  .blockDiv {
    width: 664rpx;
    margin-bottom: 30rpx;
    height: 220rpx;
    display: flex;
  }

  .imgDiv {
    width: 220rpx;
    height: 220rpx;
  }

  .textRight {
    padding-top: 16rpx;
    padding-left: 19rpx;
    width: 425rpx;
  }

  .productName {
    width: 100%;
    height: 60rpx;
    line-height: 30rpx;
    overflow: hidden;
    font-size: 13px;
    color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .skuMy {
    color: #666666;
    font-size: 12px;
    margin-top: 28rpx;
  }

  .bottomDiv {
    margin-top: 20rpx;
    height: 46rpx;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }

  .skuCount {
    width: 120rpx;
    height: 46rpx;
    background-color: #FFF2F1;
    font-size: 11px;
    color: #666666;
    text-align: center;
    line-height: 46rpx;
  }

  .allPrice {
    font-size: 24rpx;
    color: #666666;
    height: 46rpx;
    line-height: 46rpx;
  }

  .span1 {
    color: #F43131;
  }

  .span2 {
    color: #F43131;
    font-size: 28rpx;
    margin-left: 4rpx;
  }

  .mbxa {
    display: flex;
    align-items: center;
    margin-right: 10rpx;

    .imgs {
      width: 34rpx;
      height: 34rpx;
    }
  }

  .buttonLast {
    width: 750rpx;
    height: 86rpx;
    background-color: $wzw-primary-color;
    font-size: 32rpx;
    line-height: 86rpx;
    text-align: center;
    color: #FFFFFF;
    position: fixed;
    bottom: 0px;
    left: 0px;
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
          flex: 1;
          flex-wrap: wrap;

          .img {
            width: 27rpx;
            height: 32rpx;
          }

          .sku {
            padding: 0 10rpx;
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

        .disabled {
          background: #999;
        }
      }
    }

    .priceSum {
      text-align: center;
      padding: 68rpx 0 104rpx;
      background-color: #fff;

      .title {
        font-size: 28rpx;
        margin-bottom: 28rpx;
      }

      .icon {
        color: $wzw-primary-color;
        font-size: 26rpx;
        margin-right: 10rpx;
      }

      .span {
        color: $wzw-primary-color;
        font-size: 36rpx;
      }
    }
  }

  .back-btn {
    height: 50rpx;
    width: 130rpx;
    text-align: center;
    background-color: $wzw-primary-color;
    color: #fff;
    border-radius: 25rpx;
    line-height: 50rpx;
  }

  .check {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 90rpx;
    display: flex;
    line-height: 90rpx;
    font-size: 24rpx;
    color: #333;
    background-color: #fff;
    box-shadow: 0px 0px 22px 0px rgba(4, 0, 0, 0.12);

    .check-msg {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #333;

      .num {
        color: $wzw-primary-color;
        fong-size: 28rpx;
      }

      .img {
        width: 17rpx;
        height: 14rpx;
        margin-left: 12rpx;
      }

      .turn {
        transform: rotate(180deg);
      }
    }

    .submit {
      width: 210rpx;
      height: 100%;
      line-height: 90rpx;
      background: $wzw-primary-color;
      font-size: 28rpx;
      color: #fff;
      text-align: center;
    }
  }

  .mxdetail {
    padding: 20rpx;
    max-height: 70vh;
    overflow-y: scroll;

    .product {
      display: flex;
      margin-bottom: 40rpx;

      .proImg {
        width: 190rpx;
        height: 190rpx;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      .proMsg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        margin-left: 20rpx;

        .proName {
          overflow: hidden;
          margin-bottom: 20rpx;

          .name {
            width: 440rpx;
            word-wrap: break-word;
            font-size: 24rpx;
            float: left;
          }

          .del {
            float: right;
            width: 26rpx;
            height: 31rpx;
            margin-left: 34rpx;
          }
        }

        .attrInfo {
          display: inline-block;
          color: #666;
          font-size: 22rpx;
          border-radius: 5rpx;
          margin-bottom: 24rpx;

          .attrVal {
            display: inline-block;
            padding: 12rpx 16rpx;
            background-color: #FFF5F5;
          }
        }

        .proPrice {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .newPrice {
            font-size: 24rpx;
            color: $wzw-primary-color;

            .number {
              font-size: 30rpx;
            }
          }

          .oldPrice {
            flex: 1;
            color: #afafaf;
            font-size: 24rpx;
            text-decoration: line-through;
            margin-left: 20rpx;
          }

          .amount {
            display: flex;
            height: 45rpx;
            line-height: 45rpx;
            width: 160rpx;
            border: 2rpx solid #D1D1D1;
            box-sizing: border-box;

            .icon {
              font-size: 32rpx;
              color: #777;
              width: 43rpx;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .num {
              flex: 1;
              color: #777;
              font-size: 24rpx;
              text-align: center;
              border-left: 2rpx solid #d1d1d1;
              border-right: 2rpx solid #d1d1d1;
            }
          }
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

  .mxdetail {
    font-size: 28rpx;
    line-height: 80rpx;
    padding: 20rpx 30rpx;
    padding-bottom: 90rpx;

    .mxtitle {
      font-size: 28rpx;
      text-align: center;
    }

    .mxitem {
      border-bottom: 1px solid #eaeaea;

      .num {
        float: right;
      }
    }
  }
</style>
