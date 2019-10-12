<template>
	<view>
		<page-title title="添加提现方式" rightHidden="true" ></page-title>
		<view class="center">
			<view class="left">
				提现方式
			</view>
			<view class="right"> 
				<!-- 中国银行 <image src="/static/right.png"></image> -->
				<picker @change="bindPickerChange" :value="index" :range="array">
				    <view class="uni-input">{{array[index]}}</view>
				</picker>
				<image src="/static/right.png"></image>
			</view>
		</view>
		
		<view class="centers">
			<view class="left">
				户名
			</view>
			<input type="text" placeholder="请输入您的户名" placeholder-style="places">
		</view>
		<view class="centers">
			<view class="left">
				账号
			</view>
			<input type="text" placeholder="请输入您的账号" placeholder-style="places">
		</view>
		<view class="centers">
			<view class="left">
				开户行
			</view>
			<input type="text" placeholder="请输入您的开户行" placeholder-style="places">
		</view>
		<view class="addInfo">
			添加
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array:['请选择银行','中国银行','中国工商银行'],
				index:0,
			};
		},
		methods:{
			bindPickerChange(e){
				 this.index = e.target.value
			}
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
		display: flex;
		align-items: center;
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
		width: 570rpx;
		color: #333333;
		font-size: 24rpx;
	}
}
.places{
	color: #B8B8B8;
	font-size: 24rpx;
}
.addInfo{
	width:580rpx;
	height:76rpx;
	line-height: 76rpx;
	margin: 0 auto;
	background:rgba(244,49,49,1);
	border-radius:10rpx;
	margin-top: 124rpx;
	font-size: 32rpx;
	color: #FFFFFF;
	text-align: center;
}
</style>
