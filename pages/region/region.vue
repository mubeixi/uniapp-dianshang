<template>
	<view class="all">
		<page-title title="区域代理" rightHidden="true"></page-title>
		<view class="top">
			<view class="person">
				<image src="/static/fenxiao/person.png"></image>
			</view>
			<view class="nickName">
				<view class="tops">
					坚果姑娘
				</view>
				<view class="bottoms">
					<image src="/static/fenxiao/vip.png"></image>
					郑州市代
				</view>
			</view>
			<view class="juewei">
				立即申请
			</view>
		</view>
		<view class="moneySum">
			<view class="money">
				<view>
					<view class="moneyTop">
						总佣金
					</view>
					<view class="moneyBottom">
						￥<text>356.98</text>
					</view>
				</view>
				<view>
					<view class="moneyTop">
						已发放佣金
					</view>
					<view class="moneyBottom">
						￥<text>289.00</text>
					</view>
				</view>
			</view>
			<view class="chakan">
				查看明细
				<image src="/static/fenxiao/chakan.png" ></image>
			</view>
		</view>
		<circleTitle title="区域代理门槛说明"></circleTitle>
		<view class="xiang">
			<view class="xiangTop">
				乡(镇)级
			</view>
			<view class="xiangCenter">
				<view class="xiangLeft">
					申请条件:
				</view>
				<view class="xiangRight">
					<view>
						1、此处是申请条件内容第一条的申请说明文字
					</view>
					<view>
						2、此处是申请条件内容第二条的申请说明文字
					</view>
					<view>
						3、此处是申请条件内容第三条的申请说明文字
					</view>
					<view>
						4、此处是申请条件内容第四条的申请说明文字
					</view>
				</view>
			</view>
			<view class="xiangBottom">
				<view class="xiangBottomT">
					所需金额:
				</view>
				<view class="xiangBottomB">
					¥<text>200.00</text>
				</view>
			</view>
		</view>
		<view class="xiang">
			<view class="xiangTop">
				县/区级
			</view>
			<view class="xiangCenter">
				<view class="xiangLeft">
					申请条件:
				</view>
				<view class="xiangRight">
					<view>
						1、此处是申请条件内容第一条的申请说明文字
					</view>
					<view>
						2、此处是申请条件内容第二条的申请说明文字
					</view>
					<view>
						3、此处是申请条件内容第三条的申请说明文字
					</view>
					<view>
						4、此处是申请条件内容第四条的申请说明文字
					</view>
				</view>
			</view>
			<view class="xiangBottom">
				<view class="xiangBottomT">
					所需金额:
				</view>
				<view class="xiangBottomB">
					¥<text>200.00</text>
				</view>
			</view>
		</view>
		<view style="height: 20rpx;width: 100%;"></view>
		<circleTitle title="收益介绍"></circleTitle>
		<view class="shouyi">
			<view class="tt">
				<view>
					省
				</view>
				<view>
					市
				</view>
				<view>
					县/区
				</view>
				<view class="rightZ">
					乡/镇
				</view>
			</view>
			<view class="tt ts">
				<view>
					20%
				</view>
				<view>
					20%
				</view>
				<view>
					20%
				</view>
				<view class="rightZ">
					20%
				</view>
			</view>
		</view>
		<view class="guize">
			<text>*</text>当平台设置区域代理发放的总佣金为100元时，省、市、县/区、乡/镇分别获得20元、30元、40元、10元。
		</view>
	</view>
</template>

<script>
	import circleTitle from '../../components/circleTitle/circleTitle.vue' 
	export default {
		data() {
			return {
				
			};
		},
		components:{
			circleTitle
		}
	}
</script>

<style lang="scss" scoped>
	.all{
		background-color: #f8f8f8;
	}
	.top{
		margin: 30rpx 0rpx 30rpx 20rpx;
		height: 83rpx;
		display: flex;
		position: relative;
		.person{
			width: 83rpx;
			height: 83rpx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.nickName{
			margin-left: 15rpx;
			font-size: 30rpx;
			height: 83rpx;
			color: #333333;
			.tops{
				margin-top: 10rpx;
				margin-left: 1rpx;
				height: 28rpx;
				line-height: 28rpx;
			}
			.bottoms{
				margin-top: 14rpx;
				font-size: 22rpx;
				color: #666666;
				image{
					width: 25rpx;
					height: 23rpx;
					margin-right: 6rpx;
				}
			}
		}
		.juewei{
			width: 125rpx;
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			font-size: 24rpx;
			color: #FFFFFF;
			background-color: #F43131;
			border-top-left-radius: 125rpx;
			border-bottom-left-radius: 125rpx;
			position: absolute;
			bottom: 20rpx;
			right: 0rpx;
			font-weight: 500;
		}
	}
	.moneySum{
		width:710rpx;
		height:191rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 16rpx 0px rgba(244,49,49,0.32);
		border-radius:10rpx;
		margin: 0 auto;
		margin-bottom: 36rpx;
		.money{
			height: 104rpx;
			width: 710rpx;
			display: flex;
			padding-top: 30rpx;
			box-sizing: border-box;
			& view:first-child{
				border-right: 1rpx solid #E7E7E7;
			}
			view{
				height: 74rpx;
				width: 355rpx;
				text-align: center;
				color: #333333;
				.moneyTop{
					height:25rpx;
					line-height: 25rpx;
					font-size:26rpx;
					margin-bottom: 21rpx;
				}
				.moneyBottom{
					height:28rpx;
					line-height: 28rpx;
					font-size:24rpx;
					color: #F43131;
					text{
						font-size: 36rpx;
						font-weight: bold;
					}
				}
			}
		}
		.chakan{
			height: 87rpx;
			line-height: 87rpx;
			text-align: center;
			font-size: 24rpx;
			color: #999999;
			image{
				width: 12rpx;
				height: 20rpx;
				margin-left: 14rpx;
			}
		}
	}
	.xiang{
		width: 710rpx;
		margin: 0 auto; 
		margin-bottom: 25rpx;
		border-radius: 20rpx;
		padding: 25rpx 34rpx 33rpx 34rpx;
		background-color: #FFFFFF;
		.xiangTop{
			width:186rpx;
			height:56rpx;
			line-height: 56rpx;
			background:rgba(255,242,242,1);
			border-radius:28rpx;
			margin: 0 auto;
			font-size: 30rpx;
			color: #333333;
			text-align: center;
		}
		.xiangCenter{
			width: 642rpx;
			display: flex;
			margin-top: 24rpx;
			.xiangLeft{
				font-size: 28rpx;
				color: #333333;
				margin-right: 10rpx;
				height: 50rpx;
				line-height: 50rpx;
			}
			.xiangRight{
				view{
					font-size: 24rpx;
					color: #666666;
					height: 50rpx;
					line-height: 50rpx;
				}
			}
		}
		.xiangBottom{
			display: flex;
			margin-top: 34rpx;
			height: 27rpx;
			line-height: 27rpx;
			.xiangBottomT{
				font-size: 28rpx;
				color: #333333;
				margin-right: 10rpx;
			}
			.xiangBottomB{
				font-size: 24rpx;
				color: #F43131;
				text{
					font-size: 32rpx;
				}
			}
		}
	}
	.shouyi{
		width: 710rpx;
		margin: 0 auto;
		margin-bottom: 25rpx;
		border-top: 1rpx solid  #D4D4D4;
		border-left: 1rpx solid #D4D4D4;
		.tt{
			width: 710rpx;
			height: 95rpx;
			display: flex;
			background-color: #E3E2E2;
			view{
				width: 177rpx;
				height: 95rpx;
				line-height: 95rpx;
				text-align: center;
				font-size: 26rpx;
				color: #333333;
				border-right:1px solid #D4D4D4;
				border-bottom: 1px solid #D4D4D4;
			}
			.rightZ{
				border-right: 0rpx;
			}
		}
		.ts{
			background-color: #FFFFFF;
			view{
				font-size: 30rpx !important;
				color: #F43131 !important;
				font-weight: bold;
			}
		}
	}
	.guize{
		width: 677rpx;
		margin-left: 21rpx;
		margin-right: 52rpx;
		font-size: 24rpx;
		color: #666666;
		margin-bottom: 100rpx;
		text{
			color: #F43131;
		}
	}
</style>
