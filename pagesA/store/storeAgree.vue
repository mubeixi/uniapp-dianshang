<template>
  <view style="background-color: #FFFFFF;height: 100vh;">
    <div class="store-line flex flex-vertical-center">
      <span class="store-info">{{$t(1712)}}</span>
      <image :src="storeData.store_image" class="store-img"></image>
      <span class="fz-14-c9">{{storeData.store_name}}</span>
    </div>
    <div class="store-line flex flex-vertical-center">
      <span class="store-info">{{$t(1713)}}</span>
      <span class="fz-14-c9">{{storeData.store_name}}</span>
    </div>
    <div @click="cellPhone(storeData.store_mobile)" class="store-line flex flex-vertical-center">
      <span class="store-info">{{$t(1714)}}</span>
      <span class="fz-14-c9">{{storeData.store_mobile}}</span>
      <image class="store-cell" src="/static/cellstore.png" v-if="storeData.store_mobile"></image>
    </div>

    <div @click="openLoca(storeData.store_lat,storeData.store_lng)" class="store-line flex flex-vertical-center">
      <span class="store-info">{{$t(1715)}}</span>
      <span class="fz-14-c9 fz-address">{{storeData.store_province_name}}{{storeData.store_city_name}}{{storeData.store_area_name}}{{storeData.store_address}}<image
      class="store-address" src="/static/addressStore.png" v-if="storeData.store_province_name"></image></span>

    </div>

    <div class="store-line-btm">
      {{$t(1716)}}
    </div>
    <div class="store-img-list">
      <image :src="storeData.store_image" @click="yulan(storeData.store_image)" class="store-img-list-img"></image>
    </div>
    <div class="store-line-btm">
      {{$t(1717)}}
    </div>
    <div class="store-img-list">
      <block :key="index" v-for="(item,index) of storeData.img_info">
        <image :src='item' @click="yulanArr(index)" class="store-img-list-img"></image>
      </block>

    </div>
    <div style="width:690rpx;height:1px;background:rgba(235,235,235,1);margin-top: 20rpx"></div>

    <div class="store-btn flex flex-between">
      <div @click="showReason=true" class="store-refund">{{$t(1718)}}</div>
      <div @click="showAgree" class="store-agree">{{$t(1719)}}</div>
    </div>

    <div class="zhezhao" v-if="showReason">
      <div class="input-wrap">
        <textarea class="input" :placeholder="$t(1720)" v-model="reason"></textarea>
        <div class="btns">
          <div @click="showReason=false" class="btn">{{$t(1721)}}</div>
          <div @click="confirmInput" class="btn btnLast">{{$t(1722)}}</div>
        </div>
      </div>
    </div>

    <popupLayer :direction="'top'" ref="store">
      <div class="popup-title">
        {{$t(1723)}}
      </div>
      <div class="store-picker flex flex-vertical-center">
        <div>
          {{$t(1724)}}
        </div>
        <picker :range="array" :value="index" @change="bindPickerChange" class="picker-first">
          {{array[index]}}
          <image :src="'/static/client/right.png'|domain" class="store-right"></image>
        </picker>
      </div>

      <div class="store-picker flex flex-vertical-center" v-if="index==0">
        <div>
          {{$t(1725)}}
        </div>
        <picker :range="typeList" :value="ind" @change="bindPickerChanges" class="picker-first" range-key="title">
          {{typeList[ind].title}}
          <image :src="'/static/client/right.png'|domain" class="store-right"></image>
        </picker>
      </div>
      <div class="store-picker flex flex-vertical-center">
        <div>
          {{$t(1726)}}
        </div>
        <div class="input-div">
          <input class="flex-input" type="text" v-model="retailer_fee" /> %
        </div>
      </div>
      <div @click="sureBtn" class="btn-sure">
        {{$t(1727)}}
      </div>

    </popupLayer>

  </view>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import { getStoreApplyList, getStoreTypes, storeApplyPass, storeApplyReject } from '../../common/fetch.js'
import { pageMixin } from '../../common/mixin'
import { mapGetters } from 'vuex'
import { error, toast } from '../../common'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  components: { popupLayer },
  data () {
    return {
      retailer_fee: '',
      id: '',
      reason: '',
      typeList: [{ titile: '' }],
      index: 0,
      ind: 0,
      array: [T._(1712), T._(1713)],
      showReason: false,
      storeData: {
        store_province_name: '',
        store_city_name: '',
        store_area_name: '',
        store_address: ''
      }
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  methods: {
    openLoca (lat, lnt) {
      uni.openLocation({
        latitude: Number(lat),
        longitude: Number(lnt),
        success: function () {

        }
      })
    },
    cellPhone (phone) {
      uni.makePhoneCall({
        phoneNumber: phone
      })
    },
    yulanArr (index) {
      uni.previewImage({
        urls: this.storeData.img_info,
        indicator: 'default',
        current: index
      })
    },
    yulan (item) {
      const arr = []
      arr.push(item)
      uni.previewImage({
        urls: arr,
        indicator: 'default'
      })
    },
    sureBtn () {
      if (!this.retailer_fee || this.retailer_fee < 0 || this.retailer_fee > 100) {
        error(T._(1714))
        return
      }
      const data = {
        apply_id: this.id,
        store_type: this.index == 0 ? 1 : 2,
        store_id: this.Stores_ID,
        retailer_fee: this.retailer_fee
      }
      if (this.index == 0) {
        data.type_id = this.typeList[this.ind].id
      }

      storeApplyPass(data).then(res => {
        toast(res.msg)
        this.$refs.store.close()
        setTimeout(function () {
          uni.navigateBack()
        }, 1000)
      }).catch(e => {
        error(e.msg || T._(1715))
      })
    },
    bindPickerChanges (e) {
      this.ind = e.target.value
      this.retailer_fee = this.typeList[this.ind].retailer_fee
    },
    bindPickerChange (e) {
      this.index = e.target.value
    },
    showAgree () {
      this.index = this.storeData.stores_type - 1
      this.$refs.store.show()
    },
    confirmInput () {
      if (!this.reason) {
        error(T._(1716))
        return
      }
      storeApplyReject({
        apply_id: this.id,
        reason: this.reason,
        store_id: this.Stores_ID
      }).then(res => {
        toast(res.msg)
        this.showReason = false
        setTimeout(function () {
          uni.navigateBack()
        }, 1000)
      }).catch(e => {
      })
    },
    init () {
      const data = {
        page: 1,
        pageSize: 999,
        apply_id: this.id
      }

      getStoreApplyList(data, { tip: T._(1717) }).then(res => {
        this.storeData = res.data[0]
      })

      getStoreTypes().then(res => {
        this.typeList = res.data
        this.retailer_fee = this.typeList[this.ind].retailer_fee
      }).catch(e => {
      })
    }
  },
  onLoad (options) {
    console.log('111')
    this.id = options.id
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .store-line {
    width: 700rpx;
    margin-left: 30rpx;
    height: 98rpx;
    line-height: 98rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #EBEBEB;
  }

  .store-line-btm {
    width: 700rpx;
    margin-left: 30rpx;
    height: 86rpx;
    line-height: 86rpx;
    color: #333333;
    font-size: 15px;

  }

  .store-info {
    display: inline-block;
    width: 120rpx;
    font-size: 15px;
    color: #333333;
  }

  .store-img {
    width: 54rpx;
    height: 54rpx;
    border-radius: 50%;
    margin-right: 14rpx;
  }

  .fz-14-c9 {
    font-size: 14px;
    color: #999999;
  }

  .store-cell {
    width: 40rpx;
    height: 42rpx;
    display: inline-block;
    margin-left: 20rpx;
  }

  .store-address {
    width: 42rpx;
    height: 42rpx;
    display: inline-block;
    margin-left: 20rpx;
  }

  .fz-address {
    line-height: 40rpx;
    flex: 1;
  }

  .store-img-list {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    &-img {
      width: 140rpx;
      height: 140rpx;
      margin-right: 10rpx;
      margin-bottom: 20rpx;
    }
  }

  .store-btn {
    width: 640rpx;
    margin: 70rpx auto 0rpx;
    height: 76rpx;
    font-size: 16px;
    color: #FFFFFF;
  }

  .store-refund {
    width: 300rpx;
    text-align: center;
    height: 76rpx;
    line-height: 76rpx;
    background: rgba(206, 206, 206, 1);
    border-radius: 10rpx;
  }

  .store-agree {
    width: 300rpx;
    text-align: center;
    height: 76rpx;
    line-height: 76rpx;
    background: #FF4E00;
    border-radius: 10rpx;
  }

  .zhezhao {
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 1000;

    .input-wrap {
      background: #fff;
      color: #000;
      text-align: center;
      width: 90%;
      margin: 400rpx auto;
      padding: 40rpx 50rpx 30rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      border-radius: 10rpx;

      .input {
        margin: 40rpx auto 0;
        width: 424rpx;
        height: 210rpx;
        border: 1px solid #efefef;
        min-height: 20px;
        line-height: 20px;
        padding: 10px 0px;
        text-align: left;
        padding-left: 10rpx;
      }

      .btns {
        display: flex;
        width: 330rpx;
        margin: 34rpx auto 0rpx;
        justify-content: space-around;
        height: 60rpx;
        line-height: 60rpx;

        .btn {
          width: 150rpx;
          text-align: center;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 14px;
          color: #FFFFFF;
          background-color: #D1D1D1;
        }

        .btnLast {
          background-color: #FF4E00;
        }
      }
    }
  }

  .popup-title {
    width: 750rpx;
    text-align: center;
    height: 120rpx;
    line-height: 120rpx;
    font-size: 16px;
    color: #333333;
  }

  .store-picker {
    width: 690rpx;
    height: 108rpx;
    border-bottom: 1px solid #E6E6E6;
    margin: 0 auto;
  }

  .picker-first {
    flex: 1;
    display: flex;
    height: 108rpx;
    line-height: 108rpx;
    text-align: right;
    justify-content: flex-end;
  }

  .store-right {
    width: 16rpx;
    height: 24rpx;
    margin-left: 10rpx;
  }

  .input-div {
    flex: 1;
    height: 108rpx;
    line-height: 108rpx;
    display: flex;
    font-size: 14px;

  }

  .flex-input {
    height: 108rpx;
    line-height: 108rpx;
    flex: 1;
    box-sizing: border-box;
    padding-left: 40rpx;
    text-align: right;
    padding-right: 10px;
  }

  .btn-sure {
    width: 750rpx;
    height: 88rpx;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 88rpx;
    background: rgba(255, 78, 0, 1);
    margin-top: 20rpx;
  }
</style>
