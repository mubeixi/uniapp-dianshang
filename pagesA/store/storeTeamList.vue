<template>
  <view style="background-color: #F8F8F8;height: 100vh;">

    <div :key="index" class="store-apply" v-for="(item,index) of storeList">
      <div class="store-apply-title">
        <image :src="item.Stores_ImgPath" class="store-img"></image>
        <div class="store-name">{{item.Stores_Name}}</div>
        <div class='store-desc flex flex-vertical-center'>

          <!--					<span class='status-store' @click="goNext(item.Stores_ID)">查看</span>-->

        </div>
      </div>
      <div class="store-btm">
        <div>
          {{$t(1762)}}: {{item.Stores_Name}}
        </div>
        <div @click="cell(item.Stores_Telephone)">
          {{$t(1763)}}: {{item.Stores_Telephone}}
          <image class="iconCell" src="/static/cellstore.png"></image>
        </div>
        <div @click="openLocation(item)" class="store-add">
          {{$t(1764)}}: <span class="store-address">{{item.Stores_Province_name}} {{item.Stores_City_name}}{{item.Stores_Area_name}}{{item.Stores_Address}}</span><i
        class="funicon  icon-address"></i></image>
        </div>
      </div>
    </div>

    <div class="defaults" v-if="storeList.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>

  </view>
</template>

<script>
import { getStoreList } from '../../common/fetch.js'
import { pageMixin } from '../../common/mixin'
import { mapGetters } from 'vuex'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      page: 1,
      pageSize: 5,
      totalCount: 0,
      type: '',
      storeList: [],
      id: ''
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  methods: {
    goNext (item) {
      this.storeList = []
      this.page = 1
      this.id = item
      this.init('init')
    },
    openLocation (item) {
      uni.openLocation({
        name: item.Stores_Name,
        latitude: Number(item.Stores_PrimaryLat),
        longitude: Number(item.Stores_PrimaryLng),
        success: function () {

        }
      })
    },
    cell (item) {
      uni.makePhoneCall({
        phoneNumber: item
      })
    },
    init (item) {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
        get_under: '11',
        stores_type: this.type
      }
      if (item === 'init') {
        data.self_store_id = this.id
      } else {
        data.self_store_id = this.Stores_ID
      }

      getStoreList(data).then(res => {
        this.totalCount = res.totalCount
        for (const item of res.data) {
          this.storeList.push(item)
        }
      })
    }

  },
  onReachBottom () {
    if (this.storeList.length < this.totalCount) {
      this.page++
      this.init()
    }
  },
  onLoad (options) {
    this.type = options.type
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .navs {
    z-index: 999;
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100rpx;
    line-height: 100rpx;
    background: #fff;
    font-size: 28rpx;
    padding: 0 10px;

    .nav-item {
      flex: 1;
      box-sizing: border-box;
      text-align: center;
      position: relative;

      .jiaobiao {
        position: absolute;
        top: 24rpx;
        right: 20rpx;
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        background-color: #FFFFFF;
        border: 1px solid #F43131;
        font-size: 15rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #F43131;
      }
    }

    .nav-item.active {
      color: #FF4E00;
      border-bottom: 2px solid #FF4E00;
    }
  }

  .store-apply {
    width: 710rpx;
    margin: 0 auto 20rpx;
    height: 340rpx;
    box-sizing: border-box;
    padding: 20rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
  }

  .store-apply-title {
    height: 84rpx;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    position: relative;
  }

  .store-img {
    width: 84rpx;
    height: 84rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }

  .store-name {
    font-size: 15px;
    color: #333333;
  }

  .store-desc {
    font-size: 14px;
    color: #888888;
    margin-left: auto;
    position: relative;
  }

  .iconCell {
    width: 34rpx;
    height: 34rpx;
    display: inline-block;
    margin-left: 20rpx;
  }

  .store-btm {
    font-size: 14px;
    color: #888888;
    line-height: 48rpx;
  }

  .status-store {
    width: 124rpx;
    height: 56rpx;
    display: inline-block;
    line-height: 56rpx;
    text-align: center;
    background-color: #FF4E00;
    font-size: 14px;
    color: #FFFFFF;
  }

  .color-red {
    color: #FF4E00;
  }

  .store-wen {
    width: 28rpx;
    height: 28rpx;
    margin-left: 10rpx;
  }

  .tips {
    position: absolute;
    top: 50rpx;
    right: -12rpx;
    width: 200rpx;
    padding: 20rpx;
    background: #fff;
    box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);

    .sanjiaoxing {
      position: absolute;
      top: -14rpx;
      right: 30rpx;
      background-color: #fff;
      transform: rotate(70deg);
      width: 15rpx;
      height: 30rpx;
      border: 2rpx solid #fff;
      border-right: 0;
      border-bottom: 0;
      box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);
    }
  }

  .store-address {
    display: inline-block;
    max-width: 560rpx;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    line-height: 56rpx;
    height: 56rpx;
  }

  .icon-address {
    color: #ff774d;
    font-size: 22px;
    display: inline-block;
  }

  .store-add {
    display: flex;
    align-items: center;
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    padding-top: 100rpx;
  }
</style>
