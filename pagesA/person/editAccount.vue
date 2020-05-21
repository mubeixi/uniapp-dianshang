<template>
  <view @click="commonClick" class="myall">
    <!-- #ifdef APP-PLUS -->
    <!--		<view class="status_bar" style="background-color: rgb(248, 248, 248);"></view>-->
    <!-- #endif -->
    <!-- <page-title title="设置" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->
    <view class="wrap">
      <view @click="update(3)" class="item">
        <view>修改手机号码</view>
        <image :src="'/static/client/right.png'|domain" mode=""></image>
      </view>
      <view @click="update(0)" class="item">
        <view>修改登录密码</view>
        <image :src="'/static/client/right.png'|domain" mode=""></image>
      </view>
      <view @click="update(1)" class="item">
        <view>修改支付密码</view>
        <image :src="'/static/client/right.png'|domain" mode=""></image>
      </view>
    
    </view>
    <view @click="logoutFunc" class="btn">退出登录</view>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import { confirm } from '../../common'
import { ls } from '../../common/tool'
import { pageMixin } from '../../common/mixin'
import { isDev } from '../../common/env'
import { bindUserClientId } from '../../common/fetch'

export default {
  mixins: [pageMixin],
  data () {
    return {
      isDev,
    }
  },
  methods: {
    goOrder () {
      uni.navigateTo({
        url: '/pagesA/procurement/purchaseRecords',
      })
    },
    goOrderCheck () {
      uni.navigateTo({
        url: '/pagesA/order/checkChannel',
      })
    },
    goRotate () {
      uni.navigateTo({
        url: '/pagesA/marketing/rotate?activity_id=19',
      })
    },

    // 修改信息
    update (type) {
      // type 0 表示修改登录，1，修改支付
      uni.navigateTo({
        url: '/pagesA/person/updateUserPsw?type=' + type,
      })
    },
    logoutFunc () {
      confirm({
        title: '操作提示',
        content: '是否退出登录',
      }).then(res => {
        bindUserClientId({ action: 'clear' }, { errtip: false }).then(() => {
        }).catch(() => {
        })

        const users_id = ls.get('users_id')
        ls.clear()

        ls.set('users_id', users_id)

        // #ifdef H5
        sessionStorage.removeItem('is_send_usrlog')
        // #endif

        this.setUserInfo({})
        this.setStoresId(null)
        uni.switchTab({
          url: '/pages/index/index',
        })
      }).catch(() => {

      })
    },
    ...mapActions(['setUserInfo', 'setStoresId']),
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }
  
  .wrap {
    padding: 25rpx 22rpx 0;
  }
  
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35rpx 0;
    font-size: 30rpx;
    color: #333;
    border-bottom: 1px solid #E3E3E3;
    
    image {
      width: 15rpx;
      height: 23rpx;
    }
  }
  
  .btn {
    width: 100%;
    height: 86rpx;
    line-height: 86rpx;
    background: #F43131;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    position: fixed;
    bottom: 0;
  }
</style>
