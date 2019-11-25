<template>
	<view class="wrap" :style="{'overflow': isScroll}">
		<view class="search-wrap">
			<icon type="search" size="34rpx" class="search_icon"/>
			<input type="text" class="input" placeholder="请输入商品关键词" placeholder-style="color:#bebdbd;">
		</view>
		<view class="prolist">
			<view class="pro" v-for="item in 10">
				<view class="pro-img">
					<image :src="'/static/pro.png'" class="img"></image>
					<view class="add" @click="add">加入选品库</view>
				</view>
				<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙...</view>
				<view class="pro-price">
					<view class="now-price"><text class="money-icon">￥</text>169.00</view>
					<view class="old-price"><text class="money-icon">￥</text>199.00</view>
				</view>
				<view class="pro-count">月销1563</view>
			</view>
		</view>
		<view style="height:90rpx;">
			<view class="check" :style="{'z-index': zIndex}">
				<view class="check-msg" @click="showSelected">已选取<text class="num">3</text>/500个普通商品 <image class="img" :class="isClicked?'turn':''" src="/static/top.png"></image></view>
				<view class="submit">提交进货单</view>
			</view>
		</view>
		<!--  遮罩层	-->
		<view class="mask" :hidden="isHidden" @click="hiddenMask"></view>
		<!--  属性弹窗	-->
		<view class="sku-pop" v-if="showSku">
			<view class="sku-title">选择商品属性</view>
			<view class="sku-content">
				<view class="skulist">
					<view class="sku-name">颜色</view>
					<view class="sku-item">
						<view class="sku active">白色</view>
						<view class="sku">粉色</view>
						<view class="sku">红色</view>
					</view>
				</view>
				<view class="skulist">
					<view class="sku-name">数量</view>
					<view class="sku-item">
						<view class="handle" @click="minus">-</view>
						<view class="pro-num">{{number}}</view>
						<view class="handle" @click="increase">+</view>
					</view>
				</view>
				<view class="sku-btns">
					<view class="cancel btn" @click="cancel">取消</view>
					<view class="confirm btn" @click="confirm">确定</view>
				</view>
			</view>
		</view>
		<!--  门店信息	-->
		<view class="sku-pop mendian" v-if="isShowStoreMsg">
			<view class="sku-title">门店信息</view>
			<view class="sku-content">
				<view class="skulist">
					<view class="sku-name">门店名称：</view>
					<view class="sku-item">硅谷广场店</view>
				</view>
				<view class="skulist">
					<view class="sku-name">门店电话：</view>
					<view class="sku-item">0371-8888888</view>
				</view>
				<view class="skulist">
					<view class="sku-name">门店地址：</view>
					<view class="sku-item">郑州市金水区文化路东风路硅谷广场一楼<image class="img" src="/static/local.png"></image></view>
				</view>
				<view class="skulist">
					<view class="sku-name">门店距离：</view>
					<view class="sku-item">1.2KM</view>
				</view>
			</view>
		</view>
		<!--	明细	-->
		<popup-layer ref="detail"  @maskClicked="handClicked" :direction="'top'" :bottomHeight="45">
			<view class="mxdetail">
				<view class="product">
					<view class="proImg">
						<image src="/static/pro.png" class="img"></image>
					</view>
					<view class="proMsg">
						<view class="proName">
							<view class="name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙仙女裙时尚...</view>
							<image class="del" src="/static/del.png"></image>
						</view>
						<view class="attrInfo">
							<view>白色;S码</view>
						</view>
						<view class="proPrice">
							<view class="newPrice">￥<text class="number">169.00</text></view>
							<view class="oldPrice">￥199.00</view>
							<view class="amount">
								<view class="icon">-</view>
								<view class="num">12</view>
								<view class="icon">+</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
	import popupLayer from '../../components/popup-layer/popup-layer.vue'
	export default {
		data() {
			return {
				isHidden: true,
				showSku: false,
				number: 12,
				isShowStoreMsg: false,
				isClicked: false, // 是否县级了详情列表
				zIndex: 100
			}
		},
		components: {
			popupLayer
		},
		computed: {
			isScroll(){
				return this.isHidden ? 'auto' : 'hidden'
			},

		},
		methods: {
			handClicked(){
				this.isClicked = false;
				this.zIndex = 100;
			},
			showSelected(){
				if(!this.isClicked) {
					this.zIndex = 9999999;
					this.$refs.detail.show();
				}else {
					this.$refs.detail.close();
					setTimeout(()=>{
						this.zIndex = 100;
					},500)
				}
				this.isClicked = !this.isClicked;
			},
			//隐藏遮罩
			hiddenMask(){
				this.isHidden = true;
				this.showSku = false;
			},
			increase(){
				this.number += 1;
			},
			minus(){
				this.number -=1;
			},
			add(){
				this.isHidden = false;
				this.showSku = true;
			},
			cancel(){
				this.isHidden = true;
				this.showSku = false;
			},
			confirm(){

			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		height: 100vh;
		background-color: #F3F3F3;
		width: 100%;
	}
	.mask {
		background-color: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
	}
	.sku-pop {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 1000;
		width: 526rpx;
		transform: translate(-50%,-50%);
		border-radius: 10rpx;
		.sku-title {
			height: 60rpx;
			line-height: 60rpx;
			background-color: #f6f6f6;
			color: #333;
			font-size: 24rpx;
			text-align: center;
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
		}
		.sku-content {
			padding: 40rpx 0 34rpx 40rpx;
			background-color: #fff;
			border-bottom-left-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
			.skulist {
				margin-bottom: 34rpx;
				display: flex;
				align-items: center;
				.sku-name {
					color: #333;
					font-size: 24rpx;
					margin-right:26rpx;
				}
				.sku-item {
					display: flex;
					align-items: center;
					color: #666;
					flex: 1;
					.img {
						width: 27rpx;
						height: 32rpx;
					}
					.sku {
						width: 80rpx;
						height: 46rpx;
						line-height: 46rpx;
						text-align: center;
						background-color: #f6f6f6;
						color: #666;
						font-size: 24rpx;
						margin-right: 13rpx;
						border-radius: 5rpx;
					}
					.active {
						background-color: #f43131;
						color: #fff;
					}
					.handle {
						width: 50rpx;
						height: 45rpx;
						line-height: 45rpx;
						text-align: center;
						font-size: 32rpx;
						color: #777;
						background: #f6f6f6;
					}
					.pro-num {
						margin: 0 15rpx;
						font-size: 24rpx;
						color: #777;
					}
				}
			}
			.sku-btns {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 60rpx;
				.btn {
					width: 130rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 24rpx;
				}
				.cancel {
					background: #e9e9e9;
					color: #666;
					margin-right: 25rpx;
				}
				.confirm {
					background-color: #f43131;
					color: #fff;
				}
			}
		}
	}
	.mendian {
		.sku-content {
			.sku-name {
				marin-right: 10rpx!important;
			}
			.sku-item {
				display: block !important;
				font-size: 26rpx !important;
				.img {
					margin-left: 10rpx;
				}
			}
		}
	}
	.search-wrap {
		position: relative;
		width: 710rpx;
		margin:20rpx auto 30rpx;
		height: 65rpx;
		.search_icon {
			position: absolute;
			left: 41rpx;
			top: 16rpx;
		}
		.input {
			height: 100%;
			width: 100%;
			line-height: 25rpx;
			padding-left: 91rpx;
			box-sizing: border-box;
			background-color: #fff;
			font-size: 26rpx;
		}
	}
	.prolist {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 710rpx;
		margin: 0 auto;
		.pro {
			width: 345rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			.pro-img {
				position: relative;
				width: 100%;
				height: 345rpx;
				.img {
					width: 100%;
					height: 100%;
				}
				.add {
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background-color: #f43131;
					opacity: 0.75;
					color: #f3f3f3;
					font-size: 26rpx;
				}
			}
			.pro-name {
				font-size: 24rpx;
				color: #333;
				margin: 17rpx 14rpx 22rpx 12rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.pro-price {
				margin-bottom: 14rpx;
				margin-left: 12rpx;
				display: flex;
				align-items: center;
				.now-price {
					color: #f43131;
					margin-right:20rpx;
					font-size: 30rpx;
				}
				.old-price {
					color: #AFAFAF;
					font-size: 24rpx;
					text-decoration: line-through;
				}
				.money-icon {
					font-size: 24rpx;
				}
			}
			.pro-count {
				font-size: 24rpx;
				color: #777;
				margin: 0 0 30rpx 12rpx;
			}
		}
	}
	.check {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		line-height: 90rpx;
		font-size: 24rpx;
		color: #333;
		background-color: #fff;
		box-shadow: 0px 0px 22px 0px rgba(4,0,0,0.12);
		.check-msg {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color: #333;
			.num {
				color: #f43131;
				fong-size: 28rpx;
			}
			.img {
				width: 17rpx;
				height: 14rpx;
				margin-left: 12rpx;
			}
			.turn {
				transform: rotate(180deg);
			}
		}
		.submit {
			width: 210rpx;
			height: 100%;
			line-height: 90rpx;
			background: #f43131;
			font-size: 28rpx;
			color: #fff;
			text-align: center;
		}
	}
	.mxdetail {
		padding: 20rpx;
		.product {
			display: flex;
			margin-bottom: 40rpx;
			.proImg {
				width: 190rpx;
				height: 190rpx;
				.img {
					width: 100%;
					height: 100%;
				}
			}
			.proMsg {
				flex: 1;
				margin-left: 20rpx;
				.proName {
					overflow: hidden;
					margin-bottom: 20rpx;
					.name {
						width: 440rpx;
						word-wrap: break-word;
						font-size: 24rpx;
						float: left;
					}
					.del {
						float: right;
						width: 26rpx;
						height: 31rpx;
						margin-left: 34rpx;
					}
				}
				.attrInfo {
					display: inline-block;
					padding: 12rpx 16rpx;
					background-color: #FFF5F5;
					color: #666;
					font-size: 22rpx;
					border-radius: 5rpx;
					margin-bottom: 24rpx;
				}
				.proPrice {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.newPrice {
						font-size: 24rpx;
						color: #f43131;
						.number {
							font-size: 30rpx;
						}
					}
					.oldPrice {
						flex: 1;
						color: #afafaf;
						font-size: 24rpx;
						text-decoration: line-through;
						margin-left: 20rpx;
					}
					.amount {
						display: flex;
						height: 45rpx;
						line-height: 45rpx;
						width: 160rpx;
						border: 2rpx solid #D1D1D1;
						box-sizing: border-box;
	                    .icon {
                            font-size: 32rpx;
							color: #777;
							width: 43rpx;
							display: flex;
							justify-content: center;
							align-items: center;
                        }
						.num {
							flex: 1;
							color: #777;
							font-size: 24rpx;
							text-align: center;
							border-left: 2rpx solid #d1d1d1;
							border-right: 2rpx solid #d1d1d1;
						}
					}
				}
			}
		}
	}
</style>
