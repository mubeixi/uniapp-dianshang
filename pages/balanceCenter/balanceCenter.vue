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
			<image  class="bgImg" src="/static/blance/bg.jpg" ></image>
			<!-- #ifdef APP-PLUS -->
			<image class="back" @click="goBack" src="/static/check/left.png"></image>
			<view class="titleq">
				余额中心
			</view>
			<!-- #endif -->

			<view class="dangqian">
				当前余额（元）
			</view>
			<view class="prices">
				{{info.User_Money}}
			</view>
			<view class="zhuanchu" @click="isShow=true">
				转出
			</view>
			<view class="bottoms">
				<view class="lefts qwe" @click="goRecharge">
					<image src="/static/check/t1.png" ></image>
					<text>余额充值</text>
				</view>
				<view class="line">
				</view>
				<view class="rights qwe" @click="goFacePay">
					<image src="/static/check/t2.png" ></image>
					<text>实体消费</text>
				</view>
			</view>
		</view>

		<view class="selects">
			<view @click="current='charge'" :class="{checked:current=='charge'}">
				充值记录
			</view>
			<view @click="current='money'"  :class="{checked:current=='money'}">
				资金流水
			</view>
		</view>

		<view class="contents" v-show="current=='charge'">
			<view class="mingxi" v-for="(item,idx) in charge_records">
				<view>
					后台操作
				</view>
				<view class="times">
					2019-04-29  09:57:30
				</view>
			</view>
		</view>
		<view class="contents"  v-show="current=='money'">
			<view class="mingxi" v-for="(item,idx) in records">
				<view class="note">
					{{item.Note}}
					{{item.Note}}
					{{item.Note}}
					{{item.Note}}
					{{item.Note}}
				</view>
				<view class="times">
					{{item.CreateTime}}
				</view>
<!--				<view>-->
<!--					{{item.Note}}-->
<!--				</view>-->
			</view>
		</view>

	</view>
</template>

<script>
	import {get_user_info,getUserMoneyRecord,getUserChargeRecord} from "../../common/fetch";

	export default {
		data() {
			return {
				isShow:false,
				info:{},
				current:'charge',
				charge_records:[],
				records:[]
			};
		},
		methods:{
			goFacePay(){
				uni.navigateTo({
					url:'/pages/storePay/storePay'
				})
			},
			goBack(){
			    uni.navigateBack(1);
			},
			goRecharge(){
				uni.navigateTo({
					url:'/pages/vipRecharge/vipRecharge'
				})
			}
		},
		onShow(){
			get_user_info().then(res=>{
				this.info = res.data
			},err=>{}).catch()

			getUserMoneyRecord().then(res=>{
				this.records = res.data;
			}).catch()

			getUserChargeRecord().then(res=>{
				this.charge_records = res.data
			}).catch()

		}
	}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.boxSizing{
	/*background-color: #FFFFFF;*/
	background: #F8F8F8;
	height: 100vh;
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
			padding: 38rpx 40rpx 37rpx 40rpx;
			image{
				width: 58rpx;
				height: 58rpx;
			}
			.line{
				width:2rpx;
				height:50rpx;
				/*background: red;*/
				margin: 0 20rpx;
				/*flex: 1;*/
				background:rgba(240,239,240,1);
			}
			.qwe{

				flex:1;
				text-align: left;
				height: 58rpx;
				line-height: 58rpx;
				font-size: 34rpx;
				color: #4C4C4C;
				display: flex;
				align-items: center;
				&.lefts{

				}
				text{
					margin-left: 20rpx;
				}
			}

		}

		.back{
			width: 21rpx;
			height: 38rpx;
			position: absolute;
			left: 24rpx;
			top: 25rpx;
			/* #ifdef APP-PLUS */
			margin-top: var(--status-bar-height);
			/* #endif */
		}
		.titleq{
			font-size: 36rpx;
			height: 34rpx;
			line-height: 34rpx;
			color: #FFFFFF;
			position: absolute;
			left: 70rpx;
			top: 25rpx;
			/* #ifdef APP-PLUS */
			margin-top: var(--status-bar-height);
			/* #endif */
		}
		.dangqian{
			font-size: 28rpx;
			color: #FFFFFF;
			height: 28rpx;
			line-height: 28rpx;
			position: absolute;
			left:39rpx ;
			top: 162rpx;
			/* #ifdef APP-PLUS */
			margin-top: var(--status-bar-height);
			/* #endif */
		}
		.prices{
			font-family: Arial;
			font-size: 80rpx;
			height: 61rpx;
			line-height: 61rpx;
			position: absolute;
			left: 39rpx;
			top: 224rpx;
			color: #FFFFFF;
			font-weight: 200;
			/* #ifdef APP-PLUS */
			margin-top: var(--status-bar-height);
			/* #endif */
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
		height: 110rpx;
		width: 750rpx;
		background-color: #FFFFFF;
		display: flex;
		view{
			width: 375rpx;
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;
			font-size: 32rpx;
			color: #666666;
			position: relative;
		}
		.checked{
			color: #FF5C33;
			&:after{
				content: '';
				display: block;
				width: 145rpx;
				height: 4rpx;
				background-color: #FF5C33;
				position: absolute;
				bottom: 0rpx;
				left: 127rpx;
			}
		}
	}

	.contents{
		width: 750rpx;
		padding:17rpx 26rpx 32rpx 24rpx ;
		background-color: #F8F8F8;
		.mingxi{
			/*height: 115rpx;*/
			width: 700rpx;
			padding: 8rpx 0;
			border-bottom: 1rpx solid  #EAEAEA;
			/*display: flex;*/
			/*justify-content: space-between;*/
			align-items: center;
			font-size: 28rpx;
			color: #333333;
			&:first-child{
				padding-top: 0;
			}
			.note{
				color: #555;
			}
			.times{
				color: #999999;
				font-size: 20rpx;
				height: 20rpx;
				line-height: 24rpx;
				margin-top: 8rpx;
				margin-left: 4rpx;
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
