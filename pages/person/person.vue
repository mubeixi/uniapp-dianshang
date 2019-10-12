<template>
	<view class="person">
		<view class="personTop">
			<image src="/static/person/top.png" ></image>
			<view class="qiandao">
				<image src="/static/person/qiandao.png"></image>
				<view>签到</view>
			</view>
			<view class="personInfo">
				<view class="left">
					<image src="/static/person/tou.png" ></image>
				</view>
				<view class="right">
					<view class="nickName">坚果姑娘</view>
					<view class="cart">金卡会员<image src="/static/person/rightCart.png" ></image></view>
				</view>
			</view>
			<view class="nav">
				<view class="navList first">
					<image src="/static/person/yue.png" mode=""></image>
					<view>
						余额
					</view>
				</view>
				<view class="navList second">
					<image src="/static/person/jifen.png" mode=""></image>
					<view>
						积分
					</view>
				</view>
				<view class="navList three" @click="goCollection">
					<image src="/static/person/shoucang.png" mode=""></image>
					<view>
						收藏
					</view>
				</view>
				<view class="navList four">
					<image src="/static/person/youhuijuan.png" mode=""></image>
					<view style="left: 50rpx;">
						优惠券
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="orderTop">
					<view class="orderLeft">商城订单</view>
					<view class="orderRight" @click="goOrder(0)">
						全部订单<image src="/static/person/right.png" ></image>
					</view>
			</view>
			<view class="orderCenter">
				<view class="orderLast" @click="goOrder(1)">
					<image src="/static/person/pay.png"></image>
					<view>
						待付款
					</view>
				</view>
				<view class="orderLast" @click="goOrder(2)">
					<image src="/static/person/fa.png"></image>
					<view>
						待发货
					</view>
				</view>
				<view class="orderLast" @click="goOrder(3)">
					<image src="/static/person/shou.png"></image>
					<view>
						待收货
					</view>
				</view>
				<view class="orderLast" @click="goOrder(4)">
					<image src="/static/person/ping.png"></image>
					<view>
						待评价
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="group">
				<image src="/static/person/pin.png" class="left"></image>
				<view class="pintuan">
					拼团订单
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			
			<view class="bargain">
				<image src="/static/person/kan.png" class="left"></image>
				<view class="pintuan">
					砍价订单
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			<view class="bargain">
				<image src="/static/person/renwu.png" class="left"></image>
				<view class="pintuan">
					任务中心
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			<view class="bargain"  @click="gotoAddresslist" >
				<image src="/static/person/di.png" class="left"></image>
				<view class="pintuan">
					地址管理
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
	
			<view class="bargain">
				<image src="/static/person/wo.png" class="left"></image>
				<view class="pintuan">
					我的预约
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			
			<view class="bargain">
				<image src="/static/person/tui.png" class="left"></image>
				<view class="pintuan">
					退款/售后
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			
			<view class="setting">
				<image src="/static/person/she.png" class="left"></image>
				<view class="pintuan">
					设置
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
		</view>
		<view style="height: 118rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
			
		},
		methods:{
			//去收藏页
			goCollection(){
				uni.navigateTo({
					url:'../collection/collection'
				})
			},
			//去订单页
			goOrder(item){
					uni.navigateTo({
						url:'../order/order?index='+item
					})	
			},
			// 去地址管理
			gotoAddresslist() {
				uni.navigateTo({
					url: '../addressList/addressList'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.person{
	background-color: rgb(241, 241, 241);
	.personTop{
		width: 750rpx;
		height: 373rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.qiandao{
			width:120rpx;
			height:45rpx;
			background:rgb(249, 142, 142);
			box-shadow:0px 1rpx 6rpx 0px rgba(167,53,50,1);
			//opacity:0.45;
			border-radius:20rpx;
			position: absolute;
			top: 22rpx;
			right: 20rpx;
			display: flex;
			align-items: center;
			padding: 11rpx 20rpx;
			justify-content: space-between;
			box-sizing: border-box;
			image{
				width: 22rpx;
				height: 22rpx;
			}
			view{
				color: #FFFFFF;
				font-size: 24rpx;
				font-weight:500;
			}
		}
		.personInfo{
			position: absolute;
			left: 57rpx;
			top: 80rpx;
			height: 100rpx;
			display: flex;
			.left{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				margin-left: 19rpx;
				padding-top: 10rpx;
				.nickName{
					font-size:30rpx;
					height: 29rpx;
					line-height: 29rpx;
					color: #FFFFFF;
					font-weight:bold;
				}
				.cart{
					margin-top: 19rpx;
					font-size: 22rpx;
					color: #FFFFFF;
					//width:136rpx;
					height:42rpx;
					line-height: 42rpx;
					display: flex;
					align-items: center;
					padding-left: 16rpx;
					padding-right: 12rpx;
					background:rgb(249, 142, 142);
					border-radius:20rpx;
					box-sizing: border-box;
					image{
						width: 13rpx;
						height: 20rpx;
						margin-left: 9rpx;
					}
				}
			}
		}
		.nav{
			width: 711rpx;
			height: 240rpx;
			background-color: #FFFFFF;
			position: absolute;
			top: 233rpx;
			left: 19rpx;
			box-shadow:0px 5rpx 12rpx 1rpx rgba(222,71,66,0.41);
			border-radius:20rpx;
			padding-top: 67rpx;
			padding-bottom: 57rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.navList{
				width: 177rpx;
				height: 100%;
				text-align: center;
				position: relative;
				view{
					font-size: 28rpx;
					color: #333333;
					font-weight:500;
					position: absolute;
					bottom: 10rpx;
					left: 60rpx;
				}
			}
			.first{
				image{
					width: 53rpx;
					height: 60rpx;
				}
			}
			.second{
				image{
					width: 58rpx;
					height: 58rpx;
				}
			}
			.three{
				image{
					width: 56rpx;
					height: 54rpx;
				}
			}
			.four{
				image{
					width: 65rpx;
					height: 46rpx;
				}
			}
		}
	}
	.order{
		margin: 140rpx 20rpx 25rpx 20rpx;	
		width: 710rpx;
		height: 268rpx;
		background-color: #FFFFFF;
		border-radius:20rpx;
		.orderTop{
			width: 710rpx;
			box-sizing: border-box;
			height: 70rpx;
			padding: 0 20rpx;
			line-height: 70rpx;
			border-bottom: 1px solid #ECE8E8;
			display: flex;
			justify-content: space-between;
			.orderLeft{
				font-size:28rpx;
				font-weight:bold;
			}
			.orderRight{
				font-size: 26rpx;
				color: #666666;
				display: flex;
				align-items: center;
				image{
					width: 17rpx;
					height: 26rpx;
					margin-left: 12rpx;
				}
			}
		}
		.orderCenter{
			height: 198rpx;
			padding-top: 42rpx;
			padding-bottom: 49rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.orderLast{
				width: 177.5rpx;
				height: 107rpx;
				text-align: center;
				image{
					width: 65rpx;
					height: 65rpx;
				}
				view{
					font-size: 26rpx;
					color: #333333;
				}
			}
		}
	}
	.list{
		width: 710rpx;
		//height: 533rpx;
		margin: 0  auto;
		background-color: #FFFFFF;
		border-radius:20rpx;
		padding-left: 22rpx;
		padding-right: 18rpx;
		box-sizing: border-box;
		.line{
			height:1px;
			background:rgba(236,232,232,1);
		}
		&>view{
			border-bottom: 1px solid rgba(236,232,232,1) ;
		}
		.group{
			height: 94rpx;
			display: flex;
			align-items: center;
			image.left{
				width: 33rpx;
				height: 31rpx;
				margin-left: 7rpx;
			}
			image.right{
				width: 17rpx;
				height: 26rpx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.bargain{
			height: 86rpx;
			display: flex;
			align-items: center;
			image.left{
				width: 32rpx;
				height: 34rpx;
				margin-left: 7rpx;
			}
			image.right{
				width: 17rpx;
				height: 26rpx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.setting{
			height: 90rpx;
			display: flex;
			align-items: center;
			image.left{
				width: 36rpx;
				height: 36rpx;
				margin-left: 7rpx;
			}
			image.right{
				width: 17rpx;
				height: 26rpx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		
	}
}
</style>
