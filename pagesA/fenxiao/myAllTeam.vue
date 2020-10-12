<template>
  <view @click="commonClick" class="myall">
    <div class="defaults" v-if="pro.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
    <view :key="index" class="centers" v-for="(item,index) of pro ">
      <view class="imgs">
        <image :src="item.User_HeadImg" class="image"></image>
      </view>
      <view class="titles">
        <view class="msg">
          <view class="tops">
            {{item.Shop_Name}}
            <text>{{item.User_Mobile}}</text>
          </view>
          <view class="rights">
            {{item.Account_CreateTime}}
          </view>
        </view>
        <view @click="getNewTeam(item.User_ID)" class="bots">
          <view>{{$t('1136x0')}}{{item.User_No}}</view>
          <view @click.stop="seeQrcode(item)" class="">{{$t('1136x1')}}</view>
          <view>{{$t('1136x2')}}({{item.usercount}})</view>
        </view>
      </view>
    </view>
    <view @click="closeQrcode" class="qrcode-wrap" v-show="isShowQrcode">
      <image :src="qrcodePath" class="qrcode"></image>
    </view>
  </view>
</template>
<script>
// const qrcodePath = '/data/poster/wabkok4fpr212_1.png?t=20181101'
// const qrcodePathDefault = '/data/poster/default1tem-none.png?t=20181101'
import { pageMixin } from '../../common/mixin'
import { getDisTeamList } from '../../common/fetch.js'
import { toast } from '../../common'
import { domainFn } from '../../common/filter'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      index: 0,
      page: 1,
      pageSize: 15,
      pro: [],
      totalCount: 0,
      isShowQrcode: false, // 是否显示二维码
      qrcodePath: ''
    }
  },
  onLoad (options) {
    this.index = options.index
  },
  onReachBottom () {
    if (this.totalCount > this.pro.length) {
      this.page++
      this.getDisTeamList()
    } else {
      toast(T._('1136d0'), 'none')
    }
  },
  onShow () {
    this.pro = []
    this.page = 1
    this.getDisTeamList()
  },
  methods: {
    closeQrcode () {
      this.isShowQrcode = false
    },
    // 显示二维码
    seeQrcode (item) {
      this.isShowQrcode = true
      // this.qrcodePath = staticUrl + '/data/poster/' + ls.get('users_id') + user_id + '_1.png?t=20181101'
      this.qrcodePath = domainFn(item.qrcodeimg)
    },
    getNewTeam (userid) {
      this.getDisTeamList(userid)
    },
    getDisTeamList (userid) {
      const data = {
        level: this.index,
        page: this.page,
        pageSize: this.pageSize
      }
      if (userid) {
        this.pro = []
        data.userid = userid
      }
      getDisTeamList(data, {
        errtip: false,
        tip: T._('1136d1')
      }).then(res => {
        this.pro = this.pro.concat(res.data)
        this.totalCount = res.totalCount
      })
        .catch(e => {

        })
    }
  }

}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .qrcode-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: .5);
  }

  .qrcode {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 60%;
  }

  .centers {
    width: 710rpx;
    margin: 0 auto;
    box-sizing: border-box;
    height: 138rpx;
    border-bottom: 1px solid #ECE8E8;
    display: flex;
    align-items: center;
    padding: 20rpx 0rpx;

    .imgs {
      width: 98rpx;
      height: 98rpx;
      border-radius: 50%;
      overflow: hidden;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .titles {
      margin-left: 19rpx;
      width: 100%;
      height: 98rpx;

      .bots {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15rpx;
        height: 23rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: rgba(136, 136, 136, 1);
      }

      .msg {
        margin-top: 12rpx;
        font-size: 30rpx;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 29rpx;

        .tops {
          height: 29rpx;
          line-height: 29rpx;
          width: 360rpx;
          overflow: hidden;

          text {
            font-size: 28rpx;
            margin-left: 10rpx;
          }
        }

        .rights {
          font-size: 24rpx;
          color: #888888;
        }
      }
    }
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    padding-top: 100rpx;
  }
</style>
