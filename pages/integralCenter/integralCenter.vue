<template>
	<view class="boxSizing">
		<view class="zhezhao" v-if="isShow">
			<view class="zhezhaoView">
				<view class="zhezhaoYue">
					余额互转
				</view>
				<view class="zhezhaoCenter">
					<view>
						<image src="/static/check/phone.png"></image>
						<input type="text" placeholder="请输入对方会员号">
					</view>
				</view>
				<view class="zhezhaoCenter">
					<view>
						<image src="/static/check/money.png"></image>
						<input type="text" placeholder="请输入转出金额">
					</view>
				</view>
				<view class="zheButton">
					确认转出
				</view>
			</view>
			<image src="/static/check/close.png" class="closeZ" @click="isShow=false"></image>
		</view>

		<view class="top">
			<image  class="bgImg" src="/static/blance/bg.png" ></image>
			<image class="back" @click="goBack" src="/static/check/left.png"></image>
			<view class="titleq">
				积分中心
			</view>
			<image class="momo" src="/static/check/momo.png"></image>
			<view class="prices">
				400.00
			</view>
			<view class="duihuan">
				积分可在积分商城里兑换产品
			</view>
			<view class="zhuanchu" @click="isShow=true">
				转出
			</view>
			<view class="bottoms">
				<view class="lefts qwe">
					<image src="/static/check/t3.png" ></image>
					<text>积分商城</text>
				</view>
				<view class="line">
				</view>
				<view class="rights qwe" style="padding-left: 66rpx;">
					<image src="/static/check/t4.png" ></image>
					<text>我的兑换</text>
				</view>
			</view>
		</view>

		<view class="selects">
			<image src="/static/check/qw.png"></image>
			<view>
				积分明细
			</view>
			<image src="/static/check/er.png"></image>
		</view>

		<view class="contents">
			<view class="mingxi">
				<view>
					<view>
						后台操作
					</view>
					<view class="times">
						2019-04-29  09:57:30
					</view>
				</view>
				<view>
					dsadas
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
			};
		},
		methods:{
			goBack(){
			    uni.navigateBack(1);
			}
		}
	}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.boxSizing{
	background-color: #FFFFFF;
}
	.top{
		width: 750rpx;
		height: 537rpx;
		position: relative;
		.bgImg{
			margin-top: -50rpx;
			width: 114%;
			height: 100%;
		}
		view.bottoms{
			width: 690rpx;
			height: 133rpx;
			background-color: #fff;
			position: absolute;
			box-shadow:0px 8px 64px 0px rgba(4,0,0,0.14);
			border-radius:132px;
			top: 390rpx;
			left: 30rpx;
			display: flex;
			align-items: center;
			padding: 38rpx 97rpx 37rpx 41rpx;
			image{
				width: 58rpx;
				height: 58rpx;
			}
			.line{
				width:2rpx;
				height:50rpx;
				background:rgba(240,239,240,1);
			}
			view.qwe{
				width: 278rpx;
				height: 58rpx;
				line-height: 58rpx;
				font-size: 34rpx;
				color: #4C4C4C;
				display: flex;
				align-items: center;
				text{
					margin-left: 21rpx;
				}
			}

		}

		.back{
			width: 21rpx;
			height: 38rpx;
			position: absolute;
			left: 24rpx;
			top: 25rpx;
		}
		.titleq{
			font-size: 36rpx;
			height: 34rpx;
			line-height: 34rpx;
			color: #FFFFFF;
			position: absolute;
			left: 70rpx;
			top: 25rpx;
		}
		.dangqian{
			font-size: 28rpx;
			color: #FFFFFF;
			height: 28rpx;
			line-height: 28rpx;
			position: absolute;
			left:39rpx ;
			top: 162rpx;
		}
		.momo{
			width: 27rpx;
			height: 28rpx;
			position: absolute;
			left: 53rpx;
			top: 220rpx;
		}
		.prices{
			font-size: 80rpx;
			font-weight: 400;
			height: 61rpx;
			line-height: 61rpx;
			position: absolute;
			left: 97rpx;
			top: 188rpx;
			color: #FFFFFF;
		}
		.duihuan{
			font-size: 24rpx;
			height: 24rpx;
			line-height: 24rpx;
			position: absolute;
			top: 289rpx;
			left: 53rpx;
			font-weight:300;
			color: #FFFFFF;
			opacity: 0.69;
		}
		.zhuanchu{
			width: 170rpx;
			height: 74rpx;
			line-height: 74rpx;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: bold;
			background-color: #ff9175;
			border-radius: 16rpx;
			position: absolute;
			top: 187rpx;
			right: 24rpx;
		}


	}

	.selects{
		height: 30rpx;
		width: 750rpx;
		display: flex;
		align-items: center;
		margin-top: 48rpx;
		margin-bottom: 40rpx;
		justify-content: center;
		image{
			width: 20rpx;
			height: 20rpx;
		}
		view{
			margin-left: 20rpx;
			margin-right: 20rpx;
			font-size: 32rpx;
			color: #FF5C33;
			font-weight:bold;
			line-height: 32rpx;
		}

	}

	.contents{
		width: 750rpx;
		padding:17rpx 26rpx 32rpx 24rpx ;
		.mingxi{
			height: 115rpx;
			width: 700rpx;
			border-bottom: 1rpx solid  #EAEAEA;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			color: #333333;
			.times{
				color: #999999;
				font-size: 20rpx;
				height: 15rpx;
				line-height: 15rpx;
				margin-top: 15rpx;
				margin-left: 3rpx;
			}
		}
	}



.zhezhao{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	z-index: 9999;
	background-color: rgba($color: #000000, $alpha: .3);
	.zhezhaoView{
		background:rgba(255,255,255,1);
		border-radius:20px;
		width: 503rpx;
		height: 564rpx;
		position: absolute;
		top: 250rpx;
		left: 123rpx;
	}
	.closeZ{
		width: 47rpx;
		height: 47rpx;
		position: absolute;
		top: 866rpx;
		left:351rpx ;
	}
	.zhezhaoYue{
		height: 157rpx;
		width: 503rpx;
		font-size: 32rpx;
		color: #333333;
		text-align: center;
		line-height: 157rpx;
	}
	.zhezhaoCenter{
		width: 100%;
		margin-top: 13rpx;
		padding: 0rpx 52rpx;
		view{
			height: 90rpx;
			display: flex;
			align-items: center;
			input{
				border-bottom: 1rpx solid #F4F4F4;
				font-size: 24rpx;
				margin-left: 16rpx;
			}
		}
		image{
			width: 25rpx;
			height: 37rpx;
		}
	}
	.zheButton{
		width:400rpx;
		height:76rpx;
		line-height: 76rpx;
		background:rgba(255,92,51,1);
		border-radius:60rpx;
		text-align: center;
		margin-top: 40rpx;
		margin-left: 52rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
}
</style>
