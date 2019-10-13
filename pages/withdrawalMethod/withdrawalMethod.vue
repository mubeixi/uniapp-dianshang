<template>
	<view class="all" :style="{'min-height':height+'px'}">
		<page-title title="我的提现方式" rightHidden="true" bgcolor="#ffffff" ></page-title>
		<view class="content">
			<view class="cardInfo">
				中国银行 （尾号8888）
				<image src="/static/fenxiao/xuanzhong.png"></image>
			</view>
			<view class="cardInfo">
				中国工商银行（尾号1234）
			</view>
		</view>
		<view class="addMethod">
			+ 添加提现方式
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	
	export default {
		mixins:[pageMixin],
		data(){
			return {
				height:1000,//获取手机屏幕高度
			};
		},
		onLoad() {
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
		}
	}
</script>

<style scoped lang="scss">
.all{
	background-color: #f8f8f8;
}
.content{
	margin: 0 auto;
	margin-top: 40rpx;
	width: 710rpx;
	.cardInfo{
		width: 710rpx;
		height: 75rpx;
		line-height: 75rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius:5rpx;
		padding-left: 30rpx;
		position: relative;
		font-size: 28rpx;
		color: #333333;
		&:last-child{
			margin-bottom: 0rpx;
		}
		image{
			width: 32rpx;
			height: 23rpx;
			position: absolute;
			top: 26rpx;
			right: 35rpx;
		}
	}
	
}
.addMethod{
	width:460rpx;
	height:76rpx;
	line-height: 76rpx;
	background:#F43131;
	border-radius:10rpx;
	margin: 0 auto;
	text-align: center;
	font-size: 30rpx;
	color: #FFFFFF;
	margin-top: 128rpx;
}
</style>
