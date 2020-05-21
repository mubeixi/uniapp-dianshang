<template>
  <div @click="commonClick" style='padding-bottom: 60px;'>
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
    <!-- #endif -->

    <!-- <page-title title="评论" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->

    <div class="navs">
      <div :class="index == 0 ? 'active' : ''" @click="getComment(0,1)" class="nav">全部</div>
      <div :class="index == 1 ? 'active' : ''" @click="getComment(1,1)" class="nav">有图</div>
    </div>
    <block :key="item" v-for="(item,index) of comment_list">
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
          <block :key="i" v-for="(i,j) of item.ImgPath">
            <img :src="i" @click="yulan(index,j)">
          </block>
        </div>
      </div>
    </block>
    <popupLayer :direction="'top'" ref="cartPopu">
      <div class="cartSku">
        <div class="cartTop">
          <image :src="product.Products_JSON.ImgPath[0]" class="image" mode=""></image>
          <div class="cartTitle">
            <div class="cartTitles">{{product.Products_Name}}</div>
            <div class="addInfo">
              <div class="addPrice">{{postData.productDetail_price}}元</div>
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
                   class="skuview" v-for="(mbx,index) of item">{{mbx}}
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
            <input class="inputq" disabled type="number" v-enter-number v-model="postData.qty">
            <div @click="addNum" class="clicks">+</div>
          </div>
        </div>
      </div>
      <div :class="submit_flag?'':'disabled'" @click="skuSub" class="cartSub">
        确定
      </div>
    </popupLayer>
    <bottom :collected="isCollected" @cartHandle="addCart" @collect="collect" @directHandle="directBuy"></bottom>
  </div>
</template>

<script>
import bottom from '../../components/bottom/bottom'
import {
  addCollection,
  cancelCollection,
  checkProdCollected,
  getComments,
  getProductDetail,
  updateCart
} from '../../common/fetch.js'
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import { numberSort } from '../../common/tool.js'
import { pageMixin } from '../../common/mixin'

export default {
  mixins: [pageMixin],
  name: 'app',
  components: {
    bottom,
    popupLayer
  },
  data () {
    return {
      index: 0,
      commentArgs: {
        Products_ID: 242, // 查询指定产品的评论
        page: 1,
        pageSize: 4
      },
      totalCount: 0, // 评论个数
      comment_list: [], // 评论列表
      product: '', // 商品结果
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
        showimg: '', // 选择属性的图片(用产品图片代替)
        qty: 1, // 购买数量
        cart_key: '', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
        productDetail_price: 0
      },
      submit_flag: true, // 提交按钮
      isCollected: false // 该产品是否已收藏
    }
  },
  onLoad (options) {
    this.commentArgs.Products_ID = options.pro_id
    this.Products_ID = options.pro_id
    this.getComment(this.index)
    this.checkProdCollected()
    this.getDetail(this.Products_ID)
  },
  onShow () {

  },
  onReachBottom () {
    if (this.comment_list.length < this.totalCount) {
      this.commentArgs.page++
      this.getComment(this.index)
    }
  },
  methods: {
    // 检查产品是否已收藏
    checkProdCollected () {
      if (!this.$fun.checkIsLogin()) return
      checkProdCollected({ prod_id: this.Products_ID }).then(res => {
        this.isCollected = res.data.is_favourite == 1
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
      // 属性判断
      if (attr_val) {
        this.postData.attr_id = attr_val.Product_Attr_ID // 选择属性的id
        this.postData.count = attr_val.Property_count // 选择属性的库存
        this.postData.showimg = typeof attr_val.Attr_Image !== 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON.ImgPath[0]// 选择属性的图片
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
      if (this.postData.attr_id == 0) {
        if (this.product.skujosn) {
          wx.showToast({
            title: '您还没有选择规格',
            icon: 'none'
          })
          return
        }
      }

      updateCart(this.postData).then(res => {
        if (this.postData.cart_key == 'CartList') {
          uni.showLoading({
            title: '加入购物车成功',
            icon: 'success'
          })
        } else {
          uni.navigateTo({
            url: '/pages/order/check?cart_key=DirectBuy'
          })
        }
      })
      // 确定加入购物车
      this.$refs.cartPopu.close()
    },
    addNum () {
      if (this.postData.qty < this.postData.count) {
        this.postData.qty += 1
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
      // 检查是否已收藏
      if (this.isCollected) {
        cancelCollection({ prod_id: this.Products_ID }).then(res => {
          uni.showToast({
            title: res.msg
          })
          this.isCollected = false
        })
      } else {
        addCollection({ prod_id: this.Products_ID }).then(res => {
          uni.showToast({
            title: '收藏成功'
          })
          this.isCollected = true
        })
      }
    },
    goCart () {
      uni.switchTab({
        url: '/pages/order/cart'
      })
    },
    getDetail (item) {
      const data = {
        prod_id: item,
        Users_ID: 'wkbq6nc2kc'
      }
      getProductDetail(data).then(res => {
        this.product = res.data
        this.postData.count = res.data.Products_Count
        this.postData.productDetail_price = this.product.Products_PriceX
        if (res.data.skujosn) {
          this.product.skujosn = JSON.parse(res.data.skujosn)
          this.product.skuvaljosn = JSON.parse(res.data.skuvaljosn)
        }
      }).catch(e => {
      })
    },
    addCart () {
      this.$refs.cartPopu.show()
      this.postData.cart_key = 'CartList'
    },
    directBuy () {
      this.$refs.cartPopu.show()
      this.postData.cart_key = 'DirectBuy'
    },
    yulan (index, i) {
      const imgPath = this.comment_list[index].ImgPath
      for (var k in imgPath) {
        imgPath[k] = imgPath[k].replace(/n\d\//, '')
      }
      uni.previewImage({
        urls: imgPath,
        indicator: 'default',
        current: i,
        longPressActions: {
          success: function (data) {

          },
          fail: function (err) {

          }
        }
      })
    },
    getComment (i, j) {
      if (j === 1) {
        this.commentArgs.page = 1
        this.comment_list = []
      }
      this.index = i
      this.commentArgs.has_img = i

      this.getComments()
    },
    getComments () {
      getComments(this.commentArgs, { errtip: false }).then(res => {
        for (const i of res.data) {
          this.comment_list.push(i)
        }
        this.totalCount = res.totalCount
      }).catch(err => {
        uni.showToast({
          title: err.msg,
          icon: 'none'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .navs {
    margin: 40rpx 0 36rpx;
    padding-left: 20rpx;
    display: flex;
  }

  .nav {
    width: 110rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 28rpx;
    border: 2rpx solid #999;
    border-radius: 40rpx;
    color: #999;
  }

  .navs .nav:nth-child(1) {
    margin-right: 30rpx;
  }

  .nav.active {
    background: #F43131;
    color: #fff;
    border-color: #F43131;
  }

  /* 内容 */
  /* 评价 start */
  .c_content {
    margin-top: 30rpx;
    padding: 0 20rpx 0;
    border-bottom: 2rpx solid #FFECE8E8;
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
    padding-top: 18rpx;
    padding-bottom: 29rpx;
  }

  .c_content_img img {
    width: 142rpx;
    height: 142rpx;
    margin-right: 20rpx;
    margin-bottom: 30rpx;
  }

  /* 内容 end */
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
          flex: 1;
          flex-wrap: wrap;

          .skuview {
            margin-bottom: 10px;
            height: 70rpx;
            line-height: 70rpx;
            font-size: 14px;
            border-radius: 10rpx;
            color: #000;
            background-color: #fff;
            padding-left: 20rpx;
            padding-right: 20rpx;
            margin-right: 20rpx;
            border: 1px solid #ccc;
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
        margin-right: 50rpx;
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

    &.disabled {
      background: #999;
    }
  }

  .skuCheck {
    color: #fff !important;
    background-color: #ff4200 !important;
  }
</style>
