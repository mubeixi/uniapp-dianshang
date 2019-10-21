<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<page-title title="个人信息" rightHidden="true" bgcolor="#F8F8F8"></page-title>
		<!-- #endif -->
		<view class="msg">
			<view class="item">
				<view class="item-name">头像</view>
				<view class="info">
					<image src="../../static/default.png" mode=""></image>
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="item-name">用户名</view>
				<view class="info">
					18888888888
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="item-name">姓名</view>
				<view class="info">
					18888888888
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="item-name">昵称</view>
				<view class="info">
					18888888888
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="item-name">邮箱</view>
				<view class="info">
					18888888888
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item">
				<view class="item-name">详细地址</view>
				<view class="info">
					18888888888
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
		</view>
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
					height:100%;
				}
			}
		}
	}
</style>
