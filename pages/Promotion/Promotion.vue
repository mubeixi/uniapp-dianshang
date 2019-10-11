<template>
	<view>
		<page-title title="爵位晋升" rightHidden="true"></page-title>
		<view class="top">
			<view class="person">
				<image src="/static/fenxiao/person.png"></image>
			</view>
			<view class="nickName">
				坚果姑娘
			</view>
			<view class="juewei">
				一星爵位
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
		<circleTitle title="我的数据"></circleTitle>
		<view class="myData">
			<view class="myDataTop">
				<view class="td">
					自身消费额
				</view>
				<view class="shu"></view>
				<view class="td">
					自身销售额
				</view>
				<view class="shu"></view>
				<view class="td">
					团队销售额
				</view>
			</view>
			<view class="myDataTop myDataBottom">
				<view class="td">
					¥<text>785.25</text>
				</view>
				<view class="shu"></view>
				<view class="td">
					¥<text>785.25</text>
				</view>
				<view class="shu"></view>
				<view class="td">
					¥<text>785.25</text>
				</view>
			</view>
		</view>
		<circleTitle title="爵位晋升说明"></circleTitle>
		<view class="description">
			<view class="t1">
				<view class="names">
					名称
				</view>
				<view class="zishen">
					自身消费额
				</view>
				<view class="zishen">
					自身销售额
				</view>
				<view class="zishen">
					团队销售额
				</view>
				<view class="zishen rightZ">
					奖励百分比
				</view>
			</view>
			<view class="t1 t2">
				<view class="names">
					一星
				</view>
				<view class="zishen">
					￥856.31
				</view>
				<view class="zishen">
					￥856.31
				</view>
				<view class="zishen">
					￥856.31
				</view>
				<view class="zishen rightZ">
					10%
				</view>
			</view>
		</view>
		<circleTitle title="名词解释"></circleTitle>
		<view class="noun">
			<view >
				1、自身消费额是指此处是自身销售额的解释说明文字
			</view>	 
			<view >
				 2、自身销售额是指此处是自身销售额的解释说明
			</view>
			<view >
				3、团队销售额是指此处是自身销售额的解释说明文字说明
			</view>		
			<view>
				4、奖励百分比是指此处是自身销售额
			</view>			   			                           
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
	.top{
		margin: 30rpx 0rpx 30rpx 20rpx;
		height: 75rpx;
		display: flex;
		position: relative;
		.person{
			width: 75rpx;
			height: 75rpx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.nickName{
			margin-left: 19rpx;
			font-size: 30rpx;
			height: 75rpx;
			line-height: 75rpx;
			color: #333333;
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
			bottom: 12rpx;
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
		margin-bottom: 34rpx;
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
	.myData{
		border: 1rpx solid #E7E7E7;
		width: 710rpx;
		margin-left: 21rpx;
		margin-right: 19rpx;
		margin-bottom: 20rpx;
		.myDataTop{
			width: 710rpx;
			height: 95rpx;
			background-color: #F4F4F4;
			display: flex;
			.td{
				width: 236rpx;
				height: 95rpx;
				line-height: 95rpx;
				text-align: center;
				font-size: 26rpx;
				color: #333333;
			}
			.shu{
				width: 1rpx;
				height: 95rpx;
				background-color: #E7E7E7;
			}
		}
		.myDataBottom{
			background-color: #FFFFFF;
			.td{
				font-size: 24rpx !important;
				color: #F43131 !important;
				text{
					font-size: 30rpx !important;
				}
			}
		}
	}
	.description{
		border: 1rpx solid #E7E7E7;
		border-bottom: 0rpx;
		width: 710rpx;
		margin-left: 21rpx;
		margin-right: 19rpx;
		margin-bottom: 29rpx;
		font-size: 24rpx;
		color: #333333;
		.t1{
			height: 80rpx;
			width: 710rpx;
			background-color: #F4F4F4;
			display: flex;
			view{
				//border: 1px solid #E7E7E7;
				border-right:1px solid #E7E7E7;
				border-bottom: 1px solid #E7E7E7;
			}
			.names{
				width: 98rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
			}
			.zishen{
				width: 153rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
			}
			.rightZ{
				border-right: 0rpx;
			}
		}
		.t2{
			background-color: #FFFFFF;
			.zishen{
				color: #F43131 !important;
			}
		}
	}
	.noun{
		width:710rpx ;
		margin-left: 21rpx;
		margin-right: 19rpx;
		margin-bottom: 50rpx;
		view{
			font-size: 26rpx;
			color: #666666;
			line-height: 50rpx;
		}
	}
</style>
