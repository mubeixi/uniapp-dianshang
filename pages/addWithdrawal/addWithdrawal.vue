<template>
	<view>
		<page-title title="添加提现方式" rightHidden="true" ></page-title>
		<view class="center">
			<view class="left">
				提现方式
			</view>
			<view class="right"> 
				中国银行 <image src="/static/right.png"></image>
			</view>
		</view>
		
		<view class="centers">
			<view class="left">
				户名
			</view>
			<input type="text" placeholder="请输入您的户名">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.center{
	margin-top: 19rpx;
	width: 710rpx;
	height: 88rpx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid #E3E3E3;
	justify-content: space-between;
	.left{
		font-size: 28rpx;
		color: #333333;
		width: 125rpx;
	}
	.right{
		font-size: 26rpx;
		color: #888888;
		image{
			width: 15rpx;
			height: 23rpx;
			margin-left: 14rpx;
		}
	}
}
.centers{
	margin-top: 19rpx;
	width: 710rpx;
	height: 88rpx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid #E3E3E3;
	position:relative;
	.left{
		width: 125rpx;
		font-size: 28rpx;
		color: #333333;
	}
	input{
		width: 660rpx;
	}
}
</style>
