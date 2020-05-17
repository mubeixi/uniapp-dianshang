<template>
  <view @click="commonClick" class="wrap">
    <view class="top"  :style="{height:storeDetail.lower_prod_num > 0?'850rpx':'780rpx'}">
      <view class="bgimg">
        <image class="image" :src="'/static/client/mendian/bg.jpg'|domain" mode=""></image>
      </view>
      <view class="user-info">
        <view class="user-avator">
          <image class="image" :src="storeDetail.Stores_ImgPath" mode=""></image>
        </view>
        <view class="store-name">{{storeDetail.Stores_Name}}(ID:{{storeDetail.Stores_ID}})</view>
        <view class="store-name-item" style="border-bottom: 1px solid  #EFEFEF">
              <view>
                级别 : {{storeDetail.type_name}}
              </view>
              <view class="store-fz-12"   @click="lookModelStore">
                查看权益
                <image :src="'/static/client/person/right.png'|domain" class="store-img-right"></image>
              </view>
        </view>
        <view class="store-name-item" >
          <view>
            我的上级
          </view>
          <view  class="store-fz-12" @click="lookModel"  v-if="storeDetail.parent_store">
            立即查看
            <image :src="'/static/client/person/right.png'|domain" class="store-img-right"></image>
          </view>
          <view  class="store-fz-12" @click="lookModel"  v-else>
            暂无上级
            <image :src="'/static/client/person/right.png'|domain" class="store-img-right"></image>
          </view>
        </view>
      </view>

      <view class="user-info-all">
        <view class="store-money">
          <view>
            可用余额:
            <text class="number">￥ <span style="font-size: 32rpx">{{storeDetail.User_Money}}</span></text>
          </view>
          <view class="charge" @click="goCharge">充值</view>
        </view>
        <view class="order-msg">
          <view class="order">
            <view class="order-num">{{storeDetail.today_order_num}}</view>
            <view class="order-title">今日订单数</view>

          </view>
          <view class="store-line"></view>
          <view class="order">
            <view class="order-num">
              <text class="icon">￥</text>
              {{storeDetail.today_order_sales}}
            </view>
            <view class="order-title">今日订单金额</view>

          </view>
          <view class="store-line"></view>
          <view class="order" @click="openShare">
            <view class="order-num"><i class="funicon  icon-share-t"></i></view>
            <view class="order-title">分享</view>
          </view>
        </view>
      </view>
      <view class="tips" v-if="storeDetail.lower_prod_num > 0">
        <image class="tip" :src="'/static/client/mendian/i.png'|domain" mode=""></image>
        <view>您有商品即将售罄，
          <text class="see" @click="goSolded">立即查看</text>
        </view>
      </view>
    </view>
    <view class="main">
      <view class="item" @click="openUrl('/pagesA/procurement/productMy')" v-if="storeDetail.stores_type==1">
        <image class="item-img" :src="'/static/client/mendian/1.png'|domain" mode=""></image>
        <view>我的商品</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/retailOrder')">
        <image class="item-img" :src="'/static/client/mendian/2.png'|domain" mode=""></image>
        <view class="num" v-if="storeDetail.shop_order_num">{{storeDetail.shop_order_num}}</view>
        <view>零售订单</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/storeWholesale')" v-if="storeDetail.stores_type==1">
        <image class="item-img" :src="'/static/client/mendian/3.png'|domain" mode=""></image>
        <view class="num" v-if="storeDetail.pifa_order_num">{{storeDetail.pifa_order_num}}</view>
        <view>批发订单</view>
      </view>
      <view class="item" @click="goStock" v-if="storeDetail.stores_type==1">
        <image class="item-img" :src="'/static/client/mendian/4.png'|domain" mode=""></image>
        <view>进货</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/order/checkChannel')">
        <image class="item-img" :src="'/static/client/mendian/5.png'|domain" mode=""></image>
        <view>核销</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/storePerson')">
        <image class="item-img" :src="'/static/client/mendian/6.png'|domain" mode=""></image>
        <view>修改资料</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/storeSettlement')">
        <image class="item-img" :src="'/static/client/mendian/7.png'|domain" mode=""></image>
        <view>结算</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/purchaseRecords')" v-if="storeDetail.stores_type==1">
        <image class="item-img" :src="'/static/client/mendian/8.png'|domain" mode=""></image>
        <view>进货记录</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/refundRecords')" v-if="storeDetail.stores_type==1">
        <image class="item-img" :src="'/static/client/mendian/9.png'|domain" mode=""></image>
        <view>我的退货单</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/refundList')">
        <image class="item-img" :src="'/static/client/mendian/10.png'|domain" mode=""></image>
        <view>零售订单退款</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/procurement/storeRefundList')" v-if="storeDetail.stores_type==1">
        <image class="item-img" :src="'/static/client/mendian/11.png'|domain" mode=""></image>
        <view>门店退货单</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/store/storeTeam')" v-if="storeDetail.stores_type==1">
        <image class="item-img" src="/static/store/myTeam.png" mode=""></image>
        <view>我的团队</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/store/storeApplyList')" v-if="storeDetail.stores_type==1">
        <image class="item-img" src="/static/store/teamAgree.png" mode=""></image>
        <view>团队入驻审核</view>
      </view>
      <view class="item" @click="openUrl('/pagesA/store/StoreExtension')" v-if="storeDetail.stores_type==1">
        <image class="item-img" src="/static/store/xiaji.png" mode=""></image>
        <view>推广下级</view>
      </view>
    </view>


    <popupLayer ref="popupLayer" :direction="'top'">
      <div class="shareinfo">
        <div class="s_top">
          <!-- #ifdef APP-PLUS -->
          <div class="flex1" @click="shareFunc('wx')">
            <image class='img' :src="'/static/client/detail/share1.png'|domain" alt=""></image>
            <div>发送好友</div>
          </div>
          <div class="flex1" @click="shareFunc('wxtimeline')">
            <image class='img' :src="'/static/client/detail/sahre3.png'|domain" alt=""></image>
            <div>朋友圈</div>
          </div>
          <!--只有配置了这个参数的app，才有分享到小程序选项-->
          <div class="flex1" @click="shareFunc('wxmini')" v-if="wxMiniOriginId">
            <img class='img' :src="'/static/client/detail/share4.png'|domain" alt="">
            <div>微信小程序</div>
          </div>
          <!-- #endif -->
          <!-- #ifndef MP-TOUTIAO -->
          <div class="flex1" @click="shareFunc('pic')">
            <image class='img' :src="'/static/client/detail/share2.png'|domain" alt=""></image>
            <div>分享海报</div>
          </div>
          <!-- #endif -->
        </div>
        <div class="s_bottom" @click="cancelShare">取消</div>
      </div>
    </popupLayer>


    <model ref="storeModel" >
      <div class="store-model">
          <div class="store-model-desc">
            <div> 1、你当前的进货折扣为{{storeDetail.retailer_fee}}%</div>
            <div> 2、当下级和你级别相同时，下级结算的金额会按照{{storeDetail.same_level_reward}}%的比例给你发放奖励</div>
            <div> 3、当下级升级到该级别时，将一次性给你{{storeDetail.upgrade_reward}}元</div>
          </div>
          <div class="store-model-title">
            级别升级
          </div>
          <div class="store-table">
            <tr class="flex store-tr">
              <td class="store-td"></td>
              <td class="store-td">一次性进货</td>
              <td class="store-td">累计进货</td>
            </tr>
            <tr class="flex store-tr store-tr-tr"  v-for="(item,index) of disList" :key="index">
              <td class="store-td">{{item.title}}</td>
              <td class="store-td"><block v-if="item.upgrade_type==1">{{item.upgrade_money}}元</block></td>
              <td class="store-td"><block v-if="item.upgrade_type==2">{{item.upgrade_money}}元</block></td>
            </tr>
          </div>
      </div>
    </model>

    <model ref="storeInfo">
      <div class="storeInfo" v-if="storeDetail.parent_store">
        <div class="storeInfo-title">
          名称：{{storeDetail.parent_store.Stores_Name}}
        </div>
        <div class="storeInfo-title" @click="cellPhone(storeDetail.parent_store.Stores_Telephone)">
          联系方式：{{storeDetail.parent_store.Stores_Telephone}}
        </div>
      </div>
    </model>
  </view>
</template>

<script>
import {storeInit,getStoreTypes} from '../../common/fetch.js';
import {mapGetters} from 'vuex'
import {pageMixin} from '../../common/mixin';
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {buildSharePath, getProductThumb, ls} from '../../common/tool.js'
import  Model from  '../../components/ModelComponents'
export default {
    mixins: [pageMixin],
    components: {popupLayer,Model},
    data: function () {
        return {
            storeDetail: {},
            disList:[],
        }
    },
    computed: {
        ...mapGetters(['Stores_ID', 'initData']),
    },
    onLoad() {
        this.getStoreDetail();
    },
    methods: {
        cellPhone(phone){
            uni.makePhoneCall({
                phoneNumber: phone
            });
        },
        lookModelStore(){
            this.$refs.storeModel.show()
        },
        lookModel(){
            this.$refs.storeInfo.show()
        },
        goStock() {
            let pid = ls.get('pid')
            if (pid == 0) {
                uni.navigateTo({
                    url: '/pagesA/procurement/stock',
                })
            } else {
                uni.navigateTo({
                    url: '/pagesA/procurement/stock?purchase_store_id=' + pid,
                })
            }

        },
        async shareFunc(channel) {
            if (!this.$fun.checkIsLogin(1, 1)) return;
            let _self = this
            let path = 'pages/index/index?store_id=' + this.storeID;
            let front_url = this.initData.front_url;
            let shareObj = {
                title: this.storeDetail.Stores_Name,
                desc: '万千好货疯抢中',
                imageUrl: getProductThumb(this.storeDetail.Stores_ImgPath),
                path: buildSharePath(path),
            };
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
                        },
                    });
                    break;
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
                        },
                    });
                    break;
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
                            webUrl: 'http://uniapp.dcloud.io',
                        },
                        success: ret => {
                        },
                    });
                    break;
                case 'pic':

                    uni.navigateTo({
                        url: '/pagesA/store/storeShare?type=3',
                    })

            }
        },
        openShare() {
            this.$refs.popupLayer.show()
        },
        cancelShare() {
            this.$refs.popupLayer.close()
        },
        // 跳转即将售罄的商品
        goSolded() {
            uni.navigateTo({
                url: '/pagesA/procurement/productMy?stock_low=1',
            })
        },
        // 跳转
        openUrl(url) {
            uni.navigateTo({
                url: url,
            })
        },
        // 门店信息初始化
        getStoreDetail() {
            storeInit({
                store_id: this.Stores_ID,
            }).then(res => {
                this.storeDetail = res.data;
                ls.set('pid', this.storeDetail.pid)
            })
            getStoreTypes().then(res=>{
                this.disList=res.data
            })
        },
        // 跳转充值页面
        goCharge() {
            uni.navigateTo({
                url: '/pagesA/person/vipRecharge',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
  .storeInfo{
    width:500rpx;
    .storeInfo-title{
      padding-left: 40rpx;
      height: 80rpx;
      line-height: 80rpx;
    }
  }


  .wrap {

    min-height: 100vh;
    background-color: #F8F8F8;

    .top {
      position: relative;
      margin-bottom: 20rpx;
      background-color: #F8F8F8;

      .bgimg {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
        height: 338rpx;

        .image {
          display: block;
          height: 100%;
          width: 100%;
        }
      }

      .user-info-all{
        width: 710rpx;
        height: 260rpx;
        border-radius: 16rpx;
        background-color: #FFFFFF;
        position: absolute;
        top: 510rpx;
        left: 20rpx;
      }
      .user-info {
        position: absolute;
        top: 145rpx;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        width: 710rpx;
        height: 330rpx;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 13rpx 21rpx 0rpx rgba(244, 49, 49, 0.14);
        border-radius: 15rpx;

        .user-avator {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180rpx;
          height: 180rpx;
          border-radius: 50%;
          background-color: #fff;
          z-index: 100;

          .image {
            position: absolute;
            left: 50%;
            top: 15rpx;
            transform: translate(-50%);
            z-index: 102;
            width: 150rpx;
            height: 150rpx;
            border-radius: 50%;
          }
        }

        .store-name {
          margin-top: 97rpx;
          margin-bottom: 10rpx;
          text-align: center;
          font-size: 30rpx;
          color: #333;
          font-weight: 700;
        }


      }

      .tips {
        position: absolute;
        bottom: 20rpx;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%);
        font-size: 20rpx;
        color: #999999;

        .tip {
          width: 20rpx;
          height: 20rpx;
          margin-right: 10rpx;
        }

        .see {
          color: $wzw-primary-color;
          text-decoration: underline;
        }
      }
    }
    .store-money {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      height: 110rpx;
      align-items: center;
      padding: 0rpx 48rpx;

      .number {
        color: $wzw-primary-color;
        margin-left: 4px;
      }

      .charge {
        width: 80rpx;
        height: 46rpx;
        line-height: 46rpx;
        background: $wzw-primary-color;
        border-radius: 5rpx;
        color: #fff;
        font-size: 24rpx;
        text-align: center;

      }
    }

    .order-msg {
      display: flex;
      //justify-content: center;
      //margin-top: 30rpx;
      align-items: center;
      color: #4A4A4A;

      .order {
        width: 240rpx;
        height: 140rpx;
        text-align: center;
        /*background-color: #FFF4F4;*/
        padding: 34rpx 0;
        box-sizing: border-box;
        font-size: 26rpx;

        .order-title {
          position: relative;

          .order-img {
            position: absolute;
            left: 14rpx;
            top: 50%;
            transform: translateY(-50%);
            width: 24rpx;
            height: 24rpx;
          }
        }

        .order-num {
          font-size: 34rpx;
          color: $wzw-primary-color;
          margin-bottom: 16rpx;

          .icon {
            font-size: 26rpx;
          }
        }
      }

    }

    .main {
      display: flex;
      flex-wrap: wrap;

      width: 100%;
      background-color: #fff;

      .item {
        position: relative;
        width: 33%;
        height: 186rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: 2rpx solid #F2F2F2;
        border-right: 2rpx solid #F2F2F2;
        font-size: 26rpx;

        .item-img {
          width: 40rpx;
          height: 40rpx;
          margin-bottom: 18rpx;
        }

        .num {
          position: absolute;
          top: 44rpx;
          left: 138rpx;
          transform: translate(-50%, -45%);
          background-color: $wzw-primary-color;
          width: 28rpx;
          height: 28rpx;
          font-size: 20rpx;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 28rpx;
          text-align: center;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 6rpx;
          box-sizing: border-box;
        }
      }

      .item:nth-child(3n) {
        border-right: 0;
      }
    }
  }
  .store-model{
    width: 650rpx;
    box-sizing: border-box;
  }
  .store-model-desc{
    font-size: 14px;
    line-height: 40rpx;
    margin-bottom: 20rpx;
    color: #999999;
  }
  .store-td{
    flex: 1;
    text-align: center;
    border-right: 1px solid #CCCCCC;
    &:last-child{
      border-right: 0px;
    }
  }
  .store-tr{
    border-bottom: 1px solid #CCCCCC;
    height: 70rpx;
    line-height: 70rpx;
    &:last-child{
      border-bottom: 0px;
    }
  }
  .store-tr-tr{
    color: #666666;
  }
  .store-table{
    border: 1px solid #CCCCCC;
  }


  .store-model-title{
    height: 60rpx;
    line-height: 60rpx;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-bottom: 20rpx;
  }

  .store-name-item{
    width: 670rpx;
    height: 90rpx;
    box-sizing: border-box;
    padding: 0rpx 10rpx;
    margin: 0 auto;
    font-size: 14px;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .store-img-right{
    width: 14rpx;
    height: 22rpx;
    margin-left: 14rpx;
  }
  .store-fz-12{
    font-size: 12px;
    color: #999999;
    display: flex;
    align-items: center;
  }

  .store-line {
    width: 1px;
    height: 60rpx;
    background-color: #FFCBCB;
  }

  .icon-share-t {
    color: #ff774d;
    font-size: 22px;
  }

  //分享
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

  //分享结束
</style>
