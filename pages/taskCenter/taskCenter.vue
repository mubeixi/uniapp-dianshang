<template>
	<view>
		<view class="top">
			<image class="widthTen" src="/static/task/top.png" ></image>
			<image src="/static/task/left.png" class="goBack"></image>
			<view class="titles">任务中心</view>
			<view class="center">
				<image class="widthTen" src="/static/task/center.png" ></image>
				<view class="info">
					<image src="/static/default.png" class="widthTen" ></image>
				</view>
				<view class="nickName">
					坚果姑娘
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {goBack}  from '../../common/tool.js'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goBack(){
				goBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
.top{
	width: 750rpx;
	height: 404rpx;
	position: relative;
	image.widthTen{
		width: 100%;
		height: 100%;
	}
	.goBack{
		width: 20rpx;
		height: 30rpx;
		position: absolute;
		top: 30rpx;
		left: 20rpx;
	}
	.titles{
		color: #FFFFFF;
		font-size: 32rpx;
		position: absolute;
		top: 29rpx;
		left: 312rpx;
		height: 31rpx;
		line-height: 31rpx;
	}
	.center{
		width: 727rpx;
		height: 344rpx;
		position: absolute;
		left: 12rpx;
		top: 110rpx;
		.info{
			width: 93rpx;
			height: 92rpx;
			position: absolute;
			left: 57rpx;
			top: 64rpx;
			border-radius: 50%;
		}
		.nickName{
			height:29rpx;
			font-size:30rpx;
			font-weight:bold;
			color:#5B412D;
			position: absolute;
			top: 74rpx;
			left: 165rpx;
		}
		
	}
}

</style>
