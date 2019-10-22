<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<page-title title="账号设置" rightHidden="true" bgcolor="#F8F8F8"></page-title>
		<!-- #endif -->
		<view class="wrap">
			<view class="item">
				<view>修改手机号码</view>
				<image src="../../static/right.png" mode=""></image>
			</view>
			<view class="item">
				<view>登录密码</view>
				<image src="../../static/right.png" mode=""></image>
			</view>		
			<view class="item">
				<view>支付密码</view>
				<image src="../../static/right.png" mode=""></image>
			</view>		
		</view>
		<view class="btn">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
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
