<template>
	<view class="person">
		<view class="personTop">
			<image src="/static/person/top.png" mode=""></image>
			<view class="qiandao">
				<image src="/static/person/qiandao.png" mode=""></image>
			</view>
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

<style lang="scss">
.person{
	.personTop{
		width: 750rpx;
		height: 373rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.qiandao{
			width:120rpx;
			height:45rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 1rpx 6rpx 0px rgba(167,53,50,1);
			opacity:0.45;
			border-radius:20rpx;
			position: absolute;
			top: 22rpx;
			right: 20rpx;
			display: flex;
			align-items: center;
			image{
				width: 22rpx;
				height: 22rpx;
			}
		}
	}
}
</style>
