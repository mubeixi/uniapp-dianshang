<template>
  <view class="msg">
		  <view class="item"  @click="goNext(1)">
			<view class="item-name">社区门店</view>
			<view class="info">
				
			</view>
			<view class="go">
				<image :src="'/static/client/right.png'|domain" mode=""></image>
			</view>
		  </view>
		  <view class="item" @click="goNext(2)">
		  			<view class="item-name">代理商</view>
		  			<view class="info">
		  				
		  			</view>
		  			<view class="go">
		  				<image :src="'/static/client/right.png'|domain" mode=""></image>
		  			</view>
		  </view>
  </view>
</template>
<script>
// import {} from '../../common/fetch'
import {pageMixin} from "../../common/mixin";

import {error, toast} from '../../common';

export default {
    mixins:[pageMixin],

    data() {
        return {
   
        }
    },
    methods: {
		goNext(item){
			uni.navigateTo({
				url:'/pagesA/store/storeTeamList?type='+item
			})
		}
    }
}
</script>

<style lang="scss" scoped>
.msg {
		width: 750rpx;
		height: 100vh;
		padding: 0 22rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
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
				.image {
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
					height:100%;
				}
			}
		}
	}
  

</style>
