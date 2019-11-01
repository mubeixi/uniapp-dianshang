<template>
	<view>
		<!-- #ifdef APP-PLUS -->
<!--		<view class="status_bar" style="background-color: rgb(248, 248, 248);"></view>-->
		<!-- #endif -->
	<!-- 	<page-title title="爵位晋升" rightHidden="true"></page-title> -->
		<view class="top">
			<view class="person">
				<image :src="por.disInfo.Shop_Logo"></image>
			</view>
			<view class="nickName">
				{{pro.disInfo.Shop_Name}}
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
						￥<text>{{pro.total_sha}}</text>
					</view>
				</view>
				<view>
					<view class="moneyTop">
						已发放佣金
					</view>
					<view class="moneyBottom">
						￥<text>{{pro.total_sha}}</text>
					</view>
				</view>
			</view>
			<view class="chakan" @click="goFinance">
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
					¥<text>{{pro.sha_config.Sha_Rate.Selfpro}}</text>
				</view>
				<view class="shu"></view>
				<view class="td">
					¥<text>{{pro.self_sales}}</text>
				</view>
				<view class="shu"></view>
				<view class="td">
					¥<text>{{pro.sha_config.Sha_Rate.Teampro}}</text>
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
			<view class="t1 t2"  v-for="(item,index) of pro.Pro_Title_Level"  :key="item">
				<view class="names">
					{{item.Name}}
				</view>
				<view class="zishen">
					￥{{item.Consume}}
				</view>
				<view class="zishen">
					￥{{item.Sales_Self}}
				</view>
				<view class="zishen">
					￥{{item.Sales_Group}}
				</view>
				<view class="zishen rightZ">
					{{item.Bonus}}%
				</view>
			</view>
		</view>
		<circleTitle title="名词解释"></circleTitle>
		<view class="noun">
			<view class="viewq" v-for="(i,j) of pro.noun_desc" :key="j">
				{{j+1}}、{{i}}
			</view>
		</view>
	</view>
</template>

<script>
	import circleTitle from '../../components/circleTitle/circleTitle.vue'
	import {pageMixin} from "../../common/mixin";
	import {shaInit,getDisInit} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				pro:[]
			};
		},
		components:{
			circleTitle
		},
		onLoad() {
			
		},
		onShow() {
			this.shaInit();
		},
		methods:{
			goFinance(){
				uni.navigateTo({
					url:'../finance/finance?index=2'
				})
			},
			shaInit(){
				shaInit().then(res=>{
					if(res.errorCode==0){
						this.pro=res.data;
					}
				}).catch(e=>{
					console.log(e);
				})
			}
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
			.names{
				width: 98rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-right:1px solid #E7E7E7;
				border-bottom: 1px solid #E7E7E7;
			}
			.zishen{
				width: 153rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-right:1px solid #E7E7E7;
				border-bottom: 1px solid #E7E7E7;
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
		.viewq{
			font-size: 26rpx;
			color: #666666;
			line-height: 50rpx;
		}
	}
</style>
