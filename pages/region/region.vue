<template>
	<view class="all" v-if="pro.agent_rate">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<!-- <page-title title="区域代理" rightHidden="true"></page-title> -->
		<view class="top">
			<view class="person">
				<image :src="pro.disInfo.Shop_Logo"></image>
			</view>
			<view class="nickName">
				<view class="tops">
					{{pro.disInfo.Shop_Name}}
				</view>
				<view class="bottoms" v-if="pro.agent_identity">
					<image src="/static/fenxiao/vip.png"></image>
					{{pro.agent_identity}}
				</view>
			</view>
			<view class="juewei" @click="goAddInfo">
				{{pro.agent_identity ? '立即申请' : '暂不可申请'}}
			</view>
		</view>
		<view class="moneySum">
			<view class="money">
				<view>
					<view class="moneyTop">
						总佣金
					</view>
					<view class="moneyBottom">
						￥<text>{{pro.total_agent}}</text>
					</view>
				</view>
				<view>
					<view class="moneyTop">
						已发放佣金{{pro.total_agent}}
					</view>
					<view class="moneyBottom">
						￥<text>{{pro.total_agent}}</text>
					</view>
				</view>
			</view>
			<view class="chakan">
				查看明细
				<image src="/static/fenxiao/chakan.png" ></image>
			</view>
		</view>
		<circleTitle title="区域代理门槛说明"></circleTitle>
		<view class="xiang" v-for="(item,index) of pro.agent_rate" :key="index"  v-if="item.title">
			<view class="xiangTop">
				{{item.title}}
			</view>
			<view class="xiangCenter">
				<view class="xiangLeft">
					申请条件:
				</view>
				<view class="xiangRight">
					<view v-if="item.Level>0">
						分销商等级:{{item.Level_name}}
					</view>
					<view v-if="item.Protitle>0">
						爵位等级:{{item.Level_name}}
					</view>
					<view >
						个人消费额:{{item.Selfpro}}
					</view>
				</view>
			</view>
			<view class="xiangBottom">
				<view class="xiangBottomT">
					所需金额:
				</view>
				<view class="xiangBottomB">
					¥<text>{{item.Teampro}}</text>
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
					{{pro.agent_rate.pro.Province}}%
				</view>
				<view>
					{{pro.agent_rate.cit.Province}}%
				</view>
				<view>
					{{pro.agent_rate.cou.Province}}%
				</view>
				<view class="rightZ">
					{{pro.agent_rate.tow.Province}}%
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
	import {pageMixin} from "../../common/mixin";
	import {agentInfo} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				pro:[],
			};
		},
		components:{
			circleTitle
		},
		onShow(){
			this.agentInfo();
		},
		methods:{
			agentInfo(){
				agentInfo().then(res=>{
					if(res.errorCode==0){
						this.pro=res.data;
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			goAddInfo(){
				uni.navigateTo({
					url:'../addInformation/addInformation'
				})
			}
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
			display: flex;
			flex-direction: column;
			justify-content: center;
			// align-items: center;
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
		box-sizing: border-box;
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
