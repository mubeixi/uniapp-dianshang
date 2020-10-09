<template>
  <view @click="commonClick" class="bgColor-white">

    <!-- <page-title title="个人信息" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->

    <view class="msg" v-if="storeData.Stores_ImgPath">
      <view class="item">
        <view class="item-name">{{$t('2031x0')}}</view>
        <view class="info">
          <image :src="User_HeadImg" @click="changeAvator" mode=""></image>
        </view>
        <view class="go">
          <image :src="'/static/client/right.png'|domain" mode=""></image>
        </view>
      </view>
      <view @click="updateMy(3)" class="item">
        <view class="item-name">{{$t('2031x1')}}</view>
        <view class="info">
          {{storeData.Stores_Telephone}}
        </view>
        <view class="go">
          <image :src="'/static/client/right.png'|domain" mode=""></image>
        </view>
      </view>
      <view @click="updateMy(2)" class="item">
        <view class="item-name">{{$t('2031x2')}}</view>
        <view class="info">
          {{storeData.mobile}}
        </view>
        <view class="go">
          <image :src="'/static/client/right.png'|domain" mode=""></image>
        </view>
      </view>
      <view @click="updateMy(10)" class="item">
        <view class="item-name">{{$t('2031x3')}}</view>
        <view class="info">
          {{storeData.Stores_Name}}
        </view>
        <view class="go">
          <image :src="'/static/client/right.png'|domain" mode=""></image>
        </view>
      </view>

      <view @click="updateMy(1)" class="item">
        <view class="item-name">{{$t('2031x4')}}</view>
        <view class="info">
          {{storeData.Stores_Province_name}}
          {{storeData.Stores_City_name}}
          {{storeData.Stores_Area_name}}
          {{storeData.Stores_Address}}
        </view>
        <view class="go">
          <image :src="'/static/client/right.png'|domain" mode=""></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  createToken,
  GET_ACCESS_TOKEN,
  GET_ENV,
  get_User_ID,
  get_Users_ID,
  getStoreDetail,
  updateStoreInfo,
  uploadImage
} from '../../common/fetch'
import { apiBaseUrl } from '../../common/env'
import { pageMixin } from '../../common/mixin'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      imgs: [],
      tem_Shop_Logo: '',
      User_HeadImg: '',
      storeData: []
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  onShow () {
    this.getStoreDetail()
  },
  methods: {
    updateMy (index) {
      uni.navigateTo({
        url: '/pagesA/procurement/storePersonEdit?type=' + index
      })
    },
    getStoreDetail () {
      getStoreDetail({ store_id: this.Stores_ID }).then(res => {
        this.storeData = res.data
        this.User_HeadImg = res.data.Stores_ImgPath
      }).catch(e => {

      })
    },
    // 更换头像
    changeAvator () {
      const _this = this
      const param = { act: 'upload_image' }
      param.User_ID = get_User_ID()
      param.Users_ID = get_Users_ID()
      // param.appid = get_Appid();
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
          for (const item of res.tempFiles) {
            that.User_head = item.path
            that.imgs.push(item.path)
          }
          // #ifdef MP-TOUTIAO
          const fileCTX = tt.getFileSystemManager()

          fileCTX.readFile({
            filePath: res.tempFilePaths[0],
            encoding: 'base64',
            success (ret) {
              const imgs = 'data:image/jpeg;base64,' + ret.data
              uploadImage({ image: imgs }).then(result => {
                updateStoreInfo({
                  store_img: result.data.path,
                  store_id: that.Stores_ID
                }).then(res => {
                  uni.showToast({
                    title: T._('2031d0'),
                    icon: 'success'
                  })
                  getStoreDetail({ store_id: _this.Stores_ID }).then(res => {
                    _this.User_HeadImg = res.data.Stores_ImgPath
                  }).catch(e => {

                  })
                })
              }, err => {

              }).catch(e => {

              })
            },
            fail (ret) {
            },
            complete (ret) {
            }
          })
          // #endif

          // #ifndef MP-TOUTIAO
          const filePath = res.tempFilePaths[0]

          var apiHost = apiBaseUrl
          // #ifdef H5
          apiHost = ''
          // #endif

          // 上传图片
          uni.uploadFile({
            url: apiHost + '/api/little_program/shopconfig.php',
            filePath: filePath,
            name: 'image',
            formData: data,
            success: (uploadFileRes) => {
              uploadFileRes = JSON.parse(uploadFileRes.data)
              that.tem_Shop_Logo = uploadFileRes.data.path
              updateStoreInfo({
                store_img: that.tem_Shop_Logo,
                store_id: that.Stores_ID
              }).then(res => {
                uni.showToast({
                  title: T._('2031d1'),
                  icon: 'success'
                })
                getStoreDetail({ store_id: _this.Stores_ID }).then(res => {
                  _this.User_HeadImg = res.data.Stores_ImgPath
                }).catch(e => {
                })
                // that.User_HeadImg = res.data.User_HeadImg;
                // that.userInfo.User_HeadImg = res.data.User_HeadImg;
              })
            }
          })
          // #endif
          // for(var i in that.imgs){

          // }
        },
        fail (e) {
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bgColor-white {
    height: 100vh;
  }

  .msg {
    padding: 0 22rpx;

    .item {
      display: flex;
      align-items: center;
      padding: 39rpx 0;
      border-bottom: 1px solid #E3E3E3;

      .item-name {
        font-size: 30rpx;
        color: #333;
      }

      .info {
        display: flex;
        align-items: center;
        flex: 1;
        text-align: right;
        margin-right: 20rpx;
        justify-content: flex-end;
        font-size: 26rpx;
        color: #999999;

        image {
          width: 88rpx;
          height: 88rpx;
          border-radius: 44rpx;
        }
      }

      .go {
        display: flex;
        align-items: center;
        width: 15rpx;
        height: 23rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
