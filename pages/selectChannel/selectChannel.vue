<template>
	<view class="wrap">
		<!-- <view class="title">选择渠道</view> -->
		<view class="content">
			<view class="c-item">
				<view class="item-left">进货渠道</view>
				<view class="item-right" @click="changeChannel">
					<text>{{channelName}}</text>
					<image :src="'/static/client/person/right.png'|domain" class="right"></image>
				</view>
			</view>
			<view class="c-item">
				<view class="item-left">门店编号</view>
				<view class="item-input"><input type="text" v-model="purchase_store_sn" placeholder="请输入门店编号" placeholder-style="color: #c9c9c9;" /></view>
			</view>
		</view>
		<view class="search" @click="goPurchase">搜索</view>
		<popupLayer ref="searchLayer" :direction="'top'" @maskClicked="maskClicked">
			<view class="search-title">选择渠道</view>
			<view class="search-content">
				<view class="search-item" @click="changeItem(1)">
					<view>门店进货</view>
					<view class="box" v-if="selectitem == 2"></view>
					<view v-if="selectitem == 1">
						<image class="image" src="../../static/selected.png" mode=""></image>
					</view>
				</view>
				<view class="search-item" @click="changeItem(2)">
					<view>平台进货</view>
					<view class="box" v-if="selectitem == 1"></view>
					<view v-if="selectitem == 2">
						<image class="image" src="../../static/selected.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="search-bottom" @click="closePop">确定</view>
		</popupLayer>
	</view>
</template>

<script>
	import popupLayer from '../../components/popup-layer/popup-layer.vue'
	export default {
		components: {
			popupLayer
		},
		data() {
			return {
				selectitem: 1,
				purchase_store_sn: ''
			}
		},
		computed: {
			channelName(){
				return this.selectitem == 1 ? '门店进货' : '平台进货'
			}
		},
		methods: {
			goPurchase(){
				uni.navigateTo({
					url: '../procurement/stock?purchase_store_sn=' + this.purchase_store_sn
				})
			},
			// 用户只是点击了遮罩
			maskClicked(){
				this.selectitem = this.selectitem;
			},
			changeChannel(){
				this.$refs.searchLayer.show();
			},
			changeItem(num){
				this.selectitem = num;
			},
			closePop(){
				this.$refs.searchLayer.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		height: 100vh;
		background-color: #fff;
		.title {
			height: 90rpx;
			background-color: #f8f8f8;
			color: #333;
			font-size: 32rpx;
			text-align: center;
			line-height: 90rpx;
		}
		.content {
			padding: 27rpx 17rpx 0 23rpx;
			.c-item {
				display: flex;
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: 2rpx solid #ebebeb;
				justify-content: space-between;
				font-size: 30rpx;
				.item-right {
					font-size: 28rpx;
					color: #777;
					display: flex;
					align-items: center;
					.right {
						width: 18rpx;
						height: 27rpx;
						margin-left: 20rpx;
					}
				}
				.item-input {
					flex: 1;
					margin-left: 40rpx;
					font-size: 24rpx;
					height: 50rpx;
					line-height: 50rpx;
				}
			}
		}
		.search {
			margin: 212rpx 25rpx;
			color: #FFF;
			background-color: #F43131;
			height: 75rpx;
			line-height: 75rpx;
			text-align: center;
			font-size: 30rpx;
			border-radius: 10rpx;
		}
		.search-title {
			line-height: 88rpx;
			color: #333;
			text-align: center;
			font-size: 32rpx;
		}
		.search-content {
			padding: 20rpx;
		}
		.search-item {
			display: flex;
			justify-content: space-between;
			height: 50rpx;
			line-height: 50rpx;
			align-items: center;
			padding: 25rpx 0;
			border-bottom: 1px solid #e6e6e6;
			padding: 25rpx 0;
			font-size: 28rpx;
			.image {
				display: block;
				width: 22px;
				height: 22px;
			}
			.box {
				width: 22px;
				height: 22px;
				border: 1px solid #e6e6e6;
				box-sizing: border-box;
			}
		}
		.search-bottom {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #F43131;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			margin-top: 80rpx;
		}
	}
</style>
