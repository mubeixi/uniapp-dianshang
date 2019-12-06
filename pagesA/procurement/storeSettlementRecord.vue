
<template>
    <view class="wrap">
		<view class="list">
			<view class="listText">
				结算时间: <text class="msg">2019.12.01 — 2019.12.31</text>
			</view>
			<view class="listText">
				订单金额: <text class="msg">¥</text>
			</view>
			<view class="listText">
				结算比例: <text class="msg">2019.12.01 — 2019.12.31</text>
			</view>
			<view class="listText">
				运费: <text class="msg">¥</text>
			</view>
			<view class="listText">
				服务费: <text class="msg">¥</text>
			</view>
			<view class="listText">
				退款: <text class="msg">¥</text>
			</view>
			<view class="listText">
				实际结算: <text class="msg color">¥</text>
			</view>
			<view class="listText">
				状态: <text class="msg color">已驳回</text><img class="img" src="/static/procurement/i.png">
			</view>
		</view>
		
		
		<!-- <view class="tips" v-if="item.pro_tip_show">
			<view class="sanjiaoxing"></view>这是解释的内容这是解释的内容这是解释的内容这是解释的内容
		</view> -->
    </view>
</template>

<script>
 
    //import {userStoreApply} from '../../common/fetch.js'
    export default {
        data() {

            return {

            }
        },
        onLoad: function(){

        },
        methods: {
	
        }
    }
</script>

<style lang="scss" scoped>
	.wrap{
		background-color: #f6f6f6;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 30rpx 20rpx 0rpx 20rpx;
		.list{
			width: 710rpx;
			background:#FFFFFF;
			border-radius:10rpx;
			box-sizing: border-box;
			padding: 23rpx 0rpx 30rpx 25rpx;
			font-size: 26rpx;
			margin-bottom: 20rpx;
			color: #333333;
			.listText{
				height: 60rpx;
				line-height: 60rpx;
				.msg{
					color: #777777;
					margin-left: 10rpx;
				}
				.color{
					color: #F43131;
				}
				.img{
					width: 22rpx;
					height: 22rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	
	
	.tips {
		position: absolute;
		top:50rpx;
		right: -12rpx;
		width: 200rpx;
		padding: 20rpx;
		background: #fff;
		box-shadow: 0px 0px 16px 0px rgba(4,0,0,0.18);
		.sanjiaoxing {
			position: absolute;
			top: -14rpx;
			right: 30rpx;
			background-color: #fff;
			transform: rotate(70deg);
			width: 15rpx;
			height: 30rpx;
			border: 2rpx solid #fff;
			border-right:0;
			border-bottom: 0;
			box-shadow: 0px 0px 16px 0px rgba(4,0,0,0.18);
		}
	}
</style>
