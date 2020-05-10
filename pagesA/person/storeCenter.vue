<template>
	<view @click="commonClick" class="wrap">
		<view class="top">
			<view class="bgimg">
				<image class="image" :src="'/static/client/mendian/bg.jpg'|domain" mode=""></image>
			</view>
			<view class="user-info">
				<view class="user-avator">
					<image class="image" :src="storeDetail.Stores_ImgPath" mode=""></image>
				</view>
				<view class="store-name">{{storeDetail.Stores_Name}}({{storeDetail.stores_sn}})</view>
				<view class="store-money">可用余额: <text class="number">￥ {{storeDetail.User_Money}}</text> <view class="charge" @click="goCharge">充值</view> </view>
				<view class="order-msg">
					<view class="order">
						<view class="order-title"><image class="order-img" :src="'/static/client/mendian/pic.png'|domain" mode=""></image> 今日订单数</view>
						<view class="order-num">{{storeDetail.today_order_num}}</view>
					</view>
					<view class="order">
						<view class="order-title"><image class="order-img" :src="'/static/client/mendian/pic.png'|domain" mode=""></image> 今日订单金额</view>
						<view class="order-num"> <text class="icon">￥</text> {{storeDetail.today_order_sales}}</view>
					</view>
				</view>
			</view>
			<view class="tips" v-if="storeDetail.lower_prod_num > 0">
				<image class="tip" :src="'/static/client/mendian/i.png'|domain" mode=""></image>
				<view>您有商品即将售罄，<text class="see" @click="goSolded">立即查看</text></view>
			</view>
		</view>
		<view class="main">
			<view class="item" @click="openUrl('/pagesA/procurement/productMy')" v-if="storeDetail.stores_type!=2">
				<image class="item-img" :src="'/static/client/mendian/1.png'|domain" mode=""></image>
				<view>我的商品</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/retailOrder')">
				<image class="item-img" :src="'/static/client/mendian/2.png'|domain" mode=""></image>
				<view class="num" v-if="storeDetail.shop_order_num">{{storeDetail.shop_order_num}}</view>
				<view>零售订单</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/storeWholesale')" v-if="storeDetail.stores_type!=2">
				<image class="item-img" :src="'/static/client/mendian/3.png'|domain" mode=""></image>
				<view class="num" v-if="storeDetail.pifa_order_num">{{storeDetail.pifa_order_num}}</view>
				<view>批发订单</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/selectChannel/selectChannel')" v-if="storeDetail.stores_type!=2">
				<image class="item-img" :src="'/static/client/mendian/4.png'|domain" mode=""></image>
				<view>进货</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/order/checkChannel')">
				<image class="item-img" :src="'/static/client/mendian/5.png'|domain" mode=""></image>
				<view>核销</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/storePerson')">
				<image class="item-img" :src="'/static/client/mendian/6.png'|domain" mode=""></image>
				<view>修改资料</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/storeSettlement')">
				<image class="item-img" :src="'/static/client/mendian/7.png'|domain" mode=""></image>
				<view>结算</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/purchaseRecords')"  v-if="storeDetail.stores_type!=2">
				<image class="item-img" :src="'/static/client/mendian/8.png'|domain" mode=""></image>
				<view>进货记录</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/refundRecords')" v-if="storeDetail.stores_type!=2">
				<image class="item-img" :src="'/static/client/mendian/9.png'|domain" mode=""></image>
				<view>我的退货单</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/refundList')">
				<image class="item-img" :src="'/static/client/mendian/10.png'|domain" mode=""></image>
				<view>零售订单退款</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/procurement/storeRefundList')"  v-if="storeDetail.stores_type!=2">
				<image class="item-img" :src="'/static/client/mendian/11.png'|domain" mode=""></image>
				<view>门店退货单</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/store/storeTeam')"  v-if="storeDetail.stores_type!=2">
				<image class="item-img" src="/static/store/myTeam.png" mode=""></image>
				<view>我的团队</view>
			</view>
			<view class="item" @click="openUrl('/pagesA/store/storeApplyList')"  v-if="storeDetail.stores_type!=2">
				<image class="item-img" src="/static/store/teamAgree.png" mode=""></image>
				<view>团队入驻审核</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {storeInit} from '../../common/fetch.js';
	import {mapGetters} from 'vuex'
	import {pageMixin} from "../../common/mixin";

	export default {
		mixins:[pageMixin],
		data: function(){
			return {
				storeDetail: {}
			}
		},
		computed: {
			...mapGetters(['Stores_ID']),
		},
		onLoad() {
			this.getStoreDetail();
		},
		methods: {
			// 跳转即将售罄的商品
			goSolded(){
				uni.navigateTo({
					url: '/pagesA/procurement/productMy?stock_low=1'
				})
			},
			// 跳转
			openUrl(url){
				uni.navigateTo({
					url: url
				})
			},
			// 门店信息初始化
			getStoreDetail(){
				storeInit({
					store_id: this.Stores_ID
				}).then(res=>{
					this.storeDetail = res.data;
				})
			},
			// 跳转充值页面
			goCharge(){
				uni.navigateTo({
					url: '/pagesA/person/vipRecharge'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {

		min-height: 100vh;
		background-color: #F8F8F8;
		.top {
			position: relative;
			height: 636rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			.bgimg {
				position: relative;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 1;
				height: 338rpx;
				.image {
					display: block;
					height: 100%;
					width: 100%;
				}
			}
			.user-info {
				position: absolute;
				top: 145rpx;
				left: 50%;
				transform: translateX(-50%);
				z-index: 10;
				width:656rpx;
				height:395rpx;
				background:rgba(255,255,255,1);
				box-shadow:0px 13rpx 21rpx 0rpx rgba(244,49,49,0.14);
				border-radius:15rpx;
				.user-avator {
					position: absolute;
					left: 50%;
					transform: translate(-50%,-50%);
					width: 180rpx;
					height: 180rpx;
					border-radius: 50%;
					background-color: #fff;
					z-index: 100;
					.image {
						position: absolute;
						left: 50%;
						top: 15rpx;
						transform: translate(-50%);
						z-index: 102;
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
					}
				}
				.store-name {
					margin-top: 97rpx;
					margin-bottom: 37rpx;
					text-align: center;
					font-size: 30rpx;
					color: #333;
					font-weight: 700;
				}
				.store-money {
					display: flex;
					justify-content: center;
					font-size: 24rpx;
					.number {
						color: $wzw-primary-color;
					}
					.charge {
						width:75rpx;
						height:38rpx;
						background: $wzw-primary-color;
						border-radius:5rpx;
						color: #fff;
						font-size: 24rpx;
						text-align: center;
						margin-left: 33rpx;
					}
				}
				.order-msg {
					display: flex;
					justify-content: center;
					margin-top: 30rpx;
					.order {
						width: 260rpx;
						height: 140rpx;
						text-align: center;
						background-color: #FFF4F4;
						padding: 34rpx 0;
						box-sizing: border-box;
						font-size: 26rpx;
						.order-title {
							position: relative;
							.order-img {
								position: absolute;
								left: 14rpx;
								top: 50%;
								transform: translateY(-50%);
								width: 24rpx;
								height: 24rpx;
							}
						}
						.order-num {
							font-size: 34rpx;
							color: $wzw-primary-color;
							margin-top: 16rpx;
							.icon {
								font-size: 26rpx;
							}
						}
					}
					.order:nth-child(1) {
						margin-right: 50rpx;
					}
				}
			}
			.tips {
				position: absolute;
				bottom: 30rpx;
				left: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				transform: translateX(-50%);
				font-size: 20rpx;
				color: #999999;
				.tip {
					width: 20rpx;
					height: 20rpx;
					margin-right: 10rpx;
				}
				.see {
					color: $wzw-primary-color;
					text-decoration: underline;
				}
			}
		}
		.main {
			display: flex;
			flex-wrap: wrap;

			width: 100%;
			background-color: #fff;

			.item {
				position: relative;
				width: 33%;
				height: 186rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-bottom: 2rpx solid #F2F2F2;
				border-right: 2rpx solid #F2F2F2;
				font-size: 26rpx;
				.item-img {
					width: 40rpx;
					height: 40rpx;
					margin-bottom: 18rpx;
				}
				.num {
					position: absolute;
					top: 44rpx;
					left: 138rpx;
					transform: translate(-50%,-45%);
					background-color: $wzw-primary-color;
					width:28rpx;
					height: 28rpx;
					font-size:20rpx;
					font-weight:500;
					color: rgba(255,255,255,1);
					line-height:28rpx;
					text-align: center;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 6rpx;
					box-sizing: border-box;
				}
			}
			.item:nth-child(3n) {
				border-right: 0;
			}
		}
	}
</style>
