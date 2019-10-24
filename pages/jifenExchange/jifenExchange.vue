<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<page-title title="积分兑换" rightHidden="true" bgcolor="#FF5C33"></page-title>
		<!-- #endif -->
		<view class="top">
			<view class="img-wrap">
				<view class="t-title">我的积分</view>
				<view class="t-amount">2000</view>
				<view class="my-change">我的兑换</view>
			</view>
		</view>
		<view class="content">
			<view class="product">
				<image class="p-img" src="../../static/jifenduihuan/close.png" mode=""></image>
				<view class="p-title">男式鹅绒迷彩羽绒服</view>
				<view class="p-count">库存 3666</view>
				<view class="p-price">
					<text>888</text> 
					<view class="p-buy">
						立即兑换
					</view>
				</view>
			</view>
			<view class="product">
				<image class="p-img" src="../../static/jifenduihuan/phone.png" mode=""></image>
				<view class="p-title">Iphone11</view>
				<view class="p-count">库存 3666</view>
				<view class="p-price">
					<text>888</text> 
					<view class="p-buy nobuy">
						已抢光
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.top {
		position: relative;
		height: 210rpx;
		width: 100%;
		background: #FF5C33;
		.img-wrap {
			position: absolute;
			left: 50%;
			bottom: -67rpx;
			margin-left: -360rpx;
			width: 720rpx;
			height: 230rpx;
			background: url(../../static/jifenduihuan/star.png) no-repeat left top;
			background-size: cover;
			.t-title {
				position: absolute;
				top: 63rpx;
				left: 48rpx;
				color: #999;
				font-size: 24rpx;
			}
			.t-amount {
				position: absolute;
				left: 49rpx;
				top: 102rpx;
				color: #FF5C33;
				font-size: 60rpx;
			}
			.my-change {
				position: absolute;
				right: 47rpx;
				top: 69rpx;
				width:160rpx;
				height:72rpx;
				background:linear-gradient(90deg,rgba(255,203,45,1) 0%,rgba(255,92,51,1) 100%);
				box-shadow:0rpx 10rpx 20rpx 0rpx rgba(104,114,255,0.25);
				border-radius:36rpx;
				color: #fff;
				font-size: 28rpx;
				line-height: 72rpx;
				text-align: center;
			}
		}
	}
	.content {
		padding-top: 67rpx;
		overflow: hidden;
		.product {
			float: left;
			width: 330rpx;
			margin: 0 22rpx 34rpx;
			.p-img {
				width: 100%;
				height: 330rpx;
				vertical-align: top;
			}
			.p-title {
				font-size: 28rpx;
				color: #333;
				line-height: 60rpx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.p-count {
				font-size: 22rpx;
				color: #999;
			}
			.p-price {
				color: #FE6444;
				font-size: 32rpx;
				.p-buy {
					float: right;
					height: 42rpx;
					width: 130rpx;
					font-size: 22rpx;
					color: #fff;
					background: #FE6444;
					text-align: center;
					line-height: 42rpx;
					border-radius: 20rpx;
				}
				& .nobuy {
					background: #D0D0D0;
				}
			}
		}
	}
</style>
