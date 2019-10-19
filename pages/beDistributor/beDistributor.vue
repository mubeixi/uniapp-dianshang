<template>
	<view>
		<view class="titleImg">
				
		</view>
		<view class="center">
			<view class="mbx"> 
				姓名
			</view>
			<input type="text" placeholder="请输入您的姓名" placeholder-style="font-size: 28rpx;color: #CAC8C8;">
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
view{
	box-sizing: border-box;
}
.titleImg{
	width: 750rpx;
	height: 330rpx;
	margin-bottom: 25rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.center{
	height: 98rpx;
	width: 710rpx;
	margin: 0 auto;
	border-bottom: 1rpx solid #E7E7E7;
	display: flex;
	align-items: center;
	.mbx{
		width: 90rpx;
		font-size: 30rpx;
		color: #333333;
	}
	input{
		width: 600rpx;
	}
}
</style>
