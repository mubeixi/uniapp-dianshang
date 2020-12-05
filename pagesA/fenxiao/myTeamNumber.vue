<template>
  <view @click="commonClick" class="myall">
    <div class="defaults" v-if="pro.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
    <view :key="index" @click="goNext(item)" class="centers" v-for="(item,index) of pro ">
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
        <view class="bots">
          <view>{{$t('1165x0')}}{{item.User_No}}</view>
		  <view>{{$t('2361d4')}}:{{item.level_one}}人</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { pageMixin } from '../../common/mixin'
import { getDisTeamList } from '../../common/fetch.js'
import { toast } from '../../common'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
		where_level:1,
	 down_userid:'',	
      index: 0,
      page: 1,
      pageSize: 15,
      pro: [],
      totalCount: 0
    }
  },
  onLoad (options) {
    this.index = options.index
	this.down_userid=options.down_userid
  },
  onReachBottom () {
    if (this.totalCount > this.pro.length) {
      this.page++
      this.getDisTeamList()
    } else {
      toast(T._('1165d0'), 'none')
    }
  },
  onShow () {
    this.pro = []
    this.page = 1
    this.getDisTeamList()
  },
  methods: {
	 goNext(item){
		 if(this.where_level>=3||item.level_one<1)return
		 uni.navigateTo({
		 	url:'/pagesA/fenxiao/myTeamNumber?index='+this.index+'&down_userid='+item.User_ID
		 })
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
	  if(this.down_userid){
		  data.down_userid=this.down_userid
	  }
      getDisTeamList(data, {
        errtip: false,
        tip: T._('1165d1')
      }).then(res => {
		
        this.pro = this.pro.concat(res.data)
        this.totalCount = res.totalCount
		this.where_level=res.where_level  
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
