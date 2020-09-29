<template>
  <div @click="commonClick" class="wrap">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
    <!-- #endif -->

    <!-- <page-title title="申请退款" rightHidden="true"></page-title> -->

    <div :key="index" class="pro" v-for="(item,index) of refundInfo.refund_prod_list">
      <div class="pro-div">
        <image :src="item.prod_img" alt="" class="pro-img" />
      </div>
      <div class="pro-msg">
        <div class="pro-name">{{item.prod_name}}</div>
        <div class="attr" v-if="item.attr_info"><span>{{item.attr_info.attr_name}}</span></div>
        <div class="attr" style="background-color:#fff;" v-else><span></span></div>
        <div class=""><span class="span amount">x{{item.prod_count}}</span></div>
        <div class="font14 graytext2">
          <div>{{$t(1239)}}:<span class="font16 danger-color"><span
          class="span font12">￥</span>{{item.refund_money_fee}} </span></div>
          <div>{{$t(1240)}}:<span class="font16 danger-color"><span class="span font12">￥</span>{{item.refund_pay_fee}} </span>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20rpx;width: 100%;background-color: #F3F3F3;">

    </div>
    <!-- 退款方式暂且不要 -->
    <!-- <div class="item">
        <div class="item-left">退款方式</div>
        <div class="item-right" @click="showMethod">
            <span>{{$t(1241)}}</span>
            <image class="img" :src="'/static/client/right.png" alt="" />
        </div>
    </div> -->
    <div class="item">
      <div class="item-left">{{$t(1242)}}</div>
      <div @click="showReason" class="item-right">
        <span>{{reasonDes?reasonDes: $t(1243)}}</span>
        <image :src="'/static/client/right.png'|domain" alt="" class="img" />
      </div>
    </div>
    <!-- <div class="item spe">
        <div class="item-left">{{$t(1244)}}</div>
        <input type="text" :placeholder="$t(1245)" placeholder-style="font-size:24rpx;color:#B8B8B8">
    </div> -->
    <div class="item spe">
      <div class="item-left">{{$t(1246)}}</div>
      <input @blur="inputHandle" :placeholder="$t(1247)" placeholder-style="font-size:24rpx;color:#B8B8B8" type="text">
    </div>
    <div class="item noborder">{{$t(1248)}}</div>
    <div class="imgs">
      <view :key="index" class="shangchuans" v-for="(item,index) of imgs">
        <image :src="item" @click="yulan(index)" class="image"></image>
        <image :src="'/static/client/delimg.png'|domain" @click="delImg(index)" class="image del"></image>
      </view>
      <view @click="addImg" class="shangchuan" v-if="imgs.length<9">
        <view class="heng"></view>
        <view class="shu"></view>
      </view>
    </div>
    <div style="height: 50px;"></div>
    <div @click="submit" class="bottom">{{$t(1249)}}</div>
    <!-- 弹出层 -->
    <!-- 退款方式 暂且不要-->
    <!-- <popup-layer ref="popupRef" :direction="'top'">
      <div class="bMbx">
    <div class="fMbx">退款方式</div>
    <div class="iMbx">
      <div>
        {{$t(1250)}}
      </div>
      <div>
         <radio  :checked="onlyRefund"  color="#F43131"/>
      </div>
    </div>
    <div class="iMbx">
      <div>
        {{$t(1251)}}
      </div>
      <div>
         <radio  :checked="onlyRefund"  color="#F43131"/>
      </div>
    </div>
  </div>
  <div class="sure" @click="closeMethod">
      {{$t(1252)}}
  </div>
    </popup-layer> -->
    <!-- 退款原因 -->
    <popup-layer :direction="'top'" ref="popup" style="z-index: 999;">
      <div class="bMbx">
        <div class="fMbx">{{$t(1253)}}</div>
        <div :key="index" class="iMbx" v-for="(item,index) in refundInfo.shop_reason">
          <radio-group @change="ShipRadioChange" style="display: block;width: 100%;">
            <label class="flex flex-between flex-vertical-center" style="width: 100%">
              <div class="flex1">
                {{item.Reason_Name}}
              </div>
              <div>
                <radio :checked="index==current" :value="index+''" color="#F43131" style="float:right;" />
              </div>
            </label>
          </radio-group>
        </div>
        <!-- <div class="iMbx">
          <div>
            {{$t(1254)}}
          </div>
          <div>
             <radio  :checked="onlyRefund"  color="#F43131"/>
          </div>
        </div>
        <div class="iMbx">
          <div>
            {{$t(1255)}}
          </div>
          <div>
             <radio  :checked="onlyRefund"  color="#F43131"/>
          </div>
        </div> -->
      </div>
      <div @click="closeReason" class="sure">
        {{$t(1256)}}
      </div>
    </popup-layer>

  </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {
  createToken,
  GET_ACCESS_TOKEN,
  GET_ENV,
  get_User_ID,
  get_Users_ID,
  getRefund,
  orderRefund
} from '../../common/fetch.js'
import { pageMixin } from '../../common/mixin'
import { uploadImages } from '../../common/tool.js'
import { error, modal } from '../../common'
import { mapGetters } from 'vuex'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  components: {
    popupLayer
  },
  data () {
    return {
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        {
          url: 'https://cloud-image',
          isImage: true
        }
      ],
      onlyRefund: 0,
      imgs: [], // 上传图片预览
      Order_ID: 0, // 退款商品id
      refundInfo: {}, // 商品信息
      arr: [], // 上传成功的图片
      reasonDes: '', // 退款原因
      current: 0,
      reason_id: 0, // 退款原因id
      refund_desc: '' // 退款说明
    }
  },
  onLoad (option) {
    this.Order_ID = option.Order_ID
  },
  onShow () {
    this.getRefund()
  },
  created () {

  },
  computed: {
    ...mapGetters(['initData'])
  },
  methods: {
    // 退款说明
    inputHandle (e) {
      this.refund_desc = e.detail.value
    },
    // 退款原因选择
    ShipRadioChange (e) {
      this.current = e.detail.value
    },
    // 图片预览
    yulan (index) {
      uni.previewImage({
        urls: this.imgs,
        indicator: 'default',
        current: index
      })
    },
    // 获取申请退货退款页面
    getRefund () {
      getRefund({ Order_ID: this.Order_ID }).then(res => {
        for (var i in res.data) {
          if (i == 'refund_prod_list') {
            for (var j in res.data[i]) {
              for (var k in res.data[i][j]) {
                if (k == 'attr_info') {
                  if (res.data[i][j][k]) {
                    res.data[i][j][k] = JSON.parse(res.data[i][j][k] && res.data[i][j][k])
                  }
                }
              }
            }
          }
        }
        this.refundInfo = res.data
      }).catch(e => {

      })
    },
    // 提交
    submit () {
      // 按照订单退款
      if (!this.reason_id) {
        error(T._(1239))
        return
      }
      const arr = []
      for (const item of this.arr) {
        arr.push(item[0])
      }
      orderRefund({
        image_path: JSON.stringify(arr),
        reason_id: this.reason_id,
        refund_desc: this.refund_desc,
        Order_ID: this.Order_ID
      }).then(res => {
        // 微信小程序下需要模板消息
        // #ifdef MP-WEIXIN
        // const initData = this.initData
        // if(initData.hasOwnProperty('lp_template') && initData.lp_template){
        // 	let lp_template = initData.lp_template
        // 	let tmplIds = lp_template.back_commit
        // 	//调就是了，是否成功都可以
        // 	wx.requestSubscribeMessage({tmplIds})
        // }
        // #endif

        uni.showToast({
          title: T._(1240),
          duration: 1500,
          complete: function () {
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              })
            }, 1500)
          }
        })
      }).catch(() => {
      })
    },
    // 删除某张预览图片
    delImg (index) {
      this.imgs.splice(index, 1)
    },
    addImg () {
      // let data={
      // 	'Users_ID': ls.get('users_id'),
      // 	'timestamp':'1502263578',
      // 	'sign':'DA1525TR85D6S5A9E5236FDSWD52F147WA',
      // 	'sortToken':1,
      // 	'act':'upload_image'
      // };
      const param = { act: 'upload_image' }
      param.User_ID = get_User_ID()
      param.Users_ID = get_Users_ID()
      param.env = GET_ENV()

      if (!param.hasOwnProperty('access_token')) {
        param.access_token = GET_ACCESS_TOKEN()
      }

      const data = createToken(param)
      const that = this
      uni.chooseImage({
        count: 1,
        // #ifndef MP-TOUTIAO
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        // #endif
        success (res) {
          that.isSubmit = false
          for (const item of res.tempFiles) {
            that.imgs.push(item.path)
            // 上传图片
            const arrs = []
            arrs.push(item.path)
            uploadImages(data, arrs).then(urls => {
              that.arr.push(urls)
              // 是否可以提交
              that.isSubmit = true
            }).catch(err => {
              that.imgs = []
              modal(err.message)
              that.isSubmit = false
            })

            // that.arr.push(arr);
            // //是否可以提交
            // that.isSubmit=true;
          }
        },
        fail (e) {
        }
      })
    },
    showMethod () {
      this.$refs.popupRef.show()
    },
    showReason () {
      this.$refs.popup.show()
    },
    closeMethod () {
      this.$refs.popupRef.close()
    },
    closeReason () {
      this.reasonDes = this.refundInfo.shop_reason[this.current].Reason_Name
      this.reason_id = this.refundInfo.shop_reason[this.current].Reason_ID
      this.$refs.popup.close()
    }
  }
}
</script>

<style lang="scss" scoped>
  .shangchuans {
    width: 146rpx;
    height: 146rpx;
    border: 1px solid rgba(186, 186, 186, 1);
    position: relative;
    margin-right: 28rpx;
    margin-bottom: 28rpx;

    .image {
      width: 100%;
      height: 100%;
    }

    .del {
      width: 38rpx;
      height: 38rpx;
      position: absolute;
      top: -19rpx;
      right: -19rpx;
      z-index: 999;
    }
  }

  .shangchuan {
    width: 146rpx;
    height: 146rpx;
    border: 1px solid rgba(186, 186, 186, 1);
    position: relative;
    margin-bottom: 28rpx;

    .heng {
      width: 76rpx;
      height: 3rpx;
      background-color: #BABABA;
      position: absolute;
      top: 72rpx;
      left: 35rpx;
    }

    .shu {
      width: 3rpx;
      height: 76rpx;
      background-color: #BABABA;
      position: absolute;
      top: 35rpx;
      left: 72rpx;

    }
  }

  .wrap {
    /*   height: 100vh; */
    background: #fff;
  }

  .pro {
    display: flex;
    margin-bottom: 30rpx;
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

  .pro-price .span {
    font-size: 24rpx;
    font-style: normal;
  }

  .amount {
    font-size: 30rpx;
    float: right;
    color: #333;
  }

  .item {
    display: flex;
    height: 50px;
    padding: 0 10px;
    width: 95%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    border-bottom: 1px solid #E3E3E3;
  }

  .spe {
    justify-content: flex-start;
  }

  .item-left {
    margin-right: 10px;
    font-size: 28rpx;
  }

  .item-right {
    color: #888;
    font-size: 24rpx;
  }

  .noborder {
    border: none;
  }

  .item-right .img {
    width: 15rpx;
    height: 23rpx;
    margin-left: 25rpx;
  }

  /* 上传图像 */
  .imgs {
    display: flex;
    padding: 0 20rpx;
    padding-right: 0rpx;
    flex-wrap: wrap;
  }

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 86rpx;
    line-height: 86rpx;
    font-size: 32rpx;
    color: #fff;
    text-align: center;
    background: #F43131;
    z-index: 99;
  }

  /* 退款 */
  .methods,
  .reason {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    background: #fff;
    padding-top: 20px;
  }

  .m-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .confirm-method {
    background: #F43131;
    color: #fff;
    text-align: center;
    line-height: 50px;
    width: 100%;
    margin-top: 20px;
  }

  .bMbx {
    padding: 0rpx 20rpx;

    .fMbx {
      font-size: 32rpx;
      height: 30rpx;
      line-height: 30rpx;
      text-align: center;
      padding: 36rpx 0rpx;
    }

    .iMbx {
      display: flex;
      justify-content: space-between;
      height: 104rpx;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      align-items: center;
      font-size: 28rpx;
    }
  }

  .sure {
    height: 90rpx;
    width: 100%;
    background-color: #F43131;
    color: #fff;
    font-size: 32rpx;
    margin-top: 96rpx;
    line-height: 90rpx;
    text-align: center;
  }
</style>
