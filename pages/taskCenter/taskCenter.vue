<template>
	<view>
		<view class="top">
			<image class="widthTen" src="/static/task/top.png" ></image>
			<image src="/static/task/left.png" class="goBack" @click="goBack"></image>
			<view class="titles">任务中心</view>
			<view class="center">
				<image class="widthTen" src="/static/task/center.png" ></image>
				<view class="info">
					<image src="/static/default.png" class="widthTen" ></image>
				</view>
				<view class="nickName">
					坚果姑娘
				</view>
				<view class="vip">
					金卡会员
					<image src="/static/task/right.png"></image>
				</view>
				<view class="zhangValue">
					<view :style="{width:(50/100)*100+'%'}">

					</view>
				</view>
				<view class="myValue">
					480/1000
				</view>
				<view class="shengji">
					升级
				</view>
				<view class="numberValue">
					520
				</view>
				<view class="valueM">
					成长值
					<image src="/static/task/sanjiao.png"></image>
				</view>
			</view>
		</view>
		<view style="height: 20rpx;"></view>
		<circleTitle title="我的特权"></circleTitle>
		<view class="myPrivilege">
			<view>
				1、八折优惠，显示会员价的所有商品均可享受八折优惠
			</view>
			<view>
				2、八折优惠，显示会员价的所有商品均可享受八折优惠
			</view>
		</view>
		<view style="height: 20rpx;width: 100%;background-color: #F8F8F8;">

		</view>
		<circleTitle title="如何升级"></circleTitle>

		<view class="ruhe">
			<view class="td">
				<image src="/static/task/edit.png"></image>
				<view class="mbx">
					<view class="tops">
						完善资料
					</view>
					<view class="bottoms">
						成长值+5
					</view>
				</view>
				<view class="submit">
					去完成
				</view>
			</view>
			<view class="td">
				<image src="/static/task/bangding.png"></image>
				<view class="mbx">
					<view class="tops">
						绑定手机号
					</view>
					<view class="bottoms">
						成长值+15
					</view>
				</view>
				<view class="submit">
					去完成
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {goBack}  from '../../common/tool.js'
	import circleTitle from '../../components/circleTitle/circleTitle.vue'
	import {pageMixin} from "../../common/mixin";

	export default {
		mixins:[pageMixin],
		data() {
			return {

			};
		},
		components:{
			circleTitle
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
			line-height: 29rpx;
			font-size:30rpx;
			font-weight:bold;
			color:#5B412D;
			position: absolute;
			top: 74rpx;
			left: 165rpx;
		}
		.vip{
			width:121rpx;
			height:35rpx;
			line-height: 35rpx;
			background:rgba(226,188,146,1);
			border-radius:18rpx;
			position: absolute;
			top: 116rpx;
			left: 164rpx;
			font-size: 20rpx;
			color: #FFFFFF;
			text-align: center;
			image{
				width: 10rpx;
				height: 17rpx;
				margin-left: 6rpx;
			}
		}
		.zhangValue{
			width:138rpx;
			height:10rpx;
			background:rgba(133,99,72,1);
			border-radius:5rpx;
			position: absolute;
			top: 115rpx;
			left: 302rpx;
			view{
				background-color: #FFFFFF;
				height: 10rpx;
			}
		}
		.myValue{
			height:17rpx;
			line-height: 17rpx;
			font-size:18rpx;
			font-weight:500;
			color:rgba(102,70,48,1);
			position: absolute;
			top: 134rpx;
			left: 304rpx;
		}
		.shengji{
			width:38rpx;
			height:22rpx;
			font-size: 16rpx;
			color: #FFFFFF;
			line-height: 22rpx;
			background:rgba(133,99,72,1);
			border-radius:3rpx;
			position: absolute;
			top: 132rpx;
			left: 399rpx;
			text-align: center;
		}
		.numberValue{
			height:32rpx;
			font-size:42rpx;
			font-weight:bold;
			color:rgba(91,65,45,1);
			line-height:32rpx;
			position: absolute;
			top: 196rpx;
			left: 63rpx;
		}
		.valueM{
			height:20rpx;
			font-size:20rpx;
			font-weight:500;
			color:rgba(91,65,45,1);
			line-height:20rpx;
			position: absolute;
			top: 240rpx;
			left: 61rpx;
			image{
				width: 8rpx;
				height: 12rpx;
				margin-left: 8rpx;
			}
		}
	}
}
.myPrivilege{
	margin: 0 auto;
	width: 710rpx;
	margin-bottom: 30rpx;
	view{
		font-size: 24rpx;
		color: #666666;
		height: 50rpx;
		line-height: 50rpx;
	}
}
.ruhe{
	width:710rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 12rpx 0px rgba(0, 0, 0, 0.25);
	border-radius:10rpx;
	margin: 0 auto;
	margin-top: 10rpx;
	.td{
		width: 690rpx;
		margin: 0 auto;
		height: 124rpx;
		border-bottom: 1rpx solid #ECE8E8;
		display: flex;
		align-items: center;
		&:last-child{
			border-bottom: 0rpx;
		}
		image{
			width: 65rpx;
			height: 65rpx;
			margin-left: 21rpx;
		}
		.mbx{
			height: 65rpx;
			margin-left: 24rpx;
			.tops{
				height:27rpx;
				line-height: 27rpx;
				color: #333333;
				font-weight: bold;
				font-size: 28rpx;
			}
			.bottoms{
				margin-top: 13rpx;
				height:23rpx;
				line-height: 23rpx;
				font-size:24rpx;
				color: #999999;
			}
		}
		.submit{
			width:110rpx;
			height:45rpx;
			line-height: 45rpx;
			background:rgba(244,49,49,1);
			border-radius:8rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			text-align: center;
			margin-left: auto;
			margin-right: 20rpx;
		}
	}
}

</style>
