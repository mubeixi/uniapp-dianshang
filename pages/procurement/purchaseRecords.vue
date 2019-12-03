<template>
	<view class="wrap">
		
		<!-- <page-title :title="'进货记录'" :bgcolor="'#fff'"></page-title> -->
		<view class="prolist" @click="hidden_tip">
			<view class="pro-title">
				<view>进货单号：SN123456789</view>
				<image class="img" src="/static/procurement/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="/static/procurement/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d" @click="showStore">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">待处理</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" :src="'/static/procurement/client/pro.png'|domain" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="/static/procurement/i.png" mode="" @click.stop="show_pro_tip"></image>
								<view class="tips" v-if="pro_tip_show">
									<view class="sanjiaoxing"></view>这是解释的内容这是解释的内容这是解释的内容这是解释的内容
								</view>
							</view>
						</view>
						<view class="pro-price"><text class="price-icon">￥</text>550.00</view>
					</view>
				</view>
				<view class="totalinfo">总计：<text class="price-icon">￥</text><text class="price-num">1690.00</text> (含运费5元)</view>
				<view class="btns">
					<view class="btn back">撤回进货单</view>
				</view>
			</view>	
		</view>
		<view class="prolist" @click="hidden_tip">
			<view class="pro-title">
				<view>进货单号：SN123456789</view>
				<image class="img" src="/static/procurement/procurement/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="/static/procurement/procurement/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">已发货</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" :src="'/static/procurement/procurement/client/pro.png'|domain" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="/static/procurement/i.png" mode="" @click.stop="show_pro_tip"></image>
								<view class="tips" v-if="pro_tip_show">
									<view class="sanjiaoxing"></view>这是解释的内容这是解释的内容这是解释的内容这是解释的内容
								</view>
							</view>
						</view>
						<view class="pro-price"><text class="price-icon">￥</text>550.00</view>
					</view>
				</view>
				<view class="totalinfo">总计：<text class="price-icon">￥</text><text class="price-num">1690.00</text> (含运费5元)</view>
				<view class="btns">
					<view class="btn">查看物流</view>
					<view class="btn back">确认收货</view>
				</view>
			</view>
		</view>
		<view class="prolist" @click="hidden_tip">
			<view class="pro-title">
				<view>进货单号：SN123456789</view>
				<image class="img" src="/static/procurement/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="/static/procurement/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">已驳回</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" src="/static/procurement/pro.png" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="/static/procurement/i.png" mode="" @click.stop="show_pro_tip"></image>
								<view class="tips" v-if="pro_tip_show">
									<view class="sanjiaoxing"></view>这是解释的内容这是解释的内容这是解释的内容这是解释的内容
								</view>
							</view>
						</view>
						<view class="pro-price"><text class="price-icon">￥</text>550.00</view>
					</view>
				</view>
				<view class="totalinfo">总计：<text class="price-icon">￥</text><text class="price-num">1690.00</text> (含运费5元)</view>
				<view class="btns">
					<view class="btn back">提交进货单</view>
				</view>
			</view>
		</view>
		<view class="prolist" @click="hidden_tip">
			<view class="pro-title">
				<view>进货单号：SN123456789</view>
				<image class="img" src="/static/procurement/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="/static/procurement/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">已完成</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" src="/static/procurement/pro.png" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="/static/procurement/i.png" mode="" @click.stop="show_pro_tip"></image>
								<view class="tips" v-if="pro_tip_show">
									<view class="sanjiaoxing"></view>这是解释的内容这是解释的内容这是解释的内容这是解释的内容
								</view>
							</view>
						</view>
						<view class="pro-price"><text class="price-icon">￥</text>550.00</view>
					</view>
				</view>
				<view class="totalinfo">总计：<text class="price-icon">￥</text><text class="price-num">1690.00</text> (含运费5元)</view>
				<view class="btns">
					<!-- <view class="btn back">撤回进货单</view> -->
				</view>
			</view>
		</view>
		<!--  门店信息	-->
		<view class="sku-pop mendian" v-if="isShowStoreMsg">
		    <view class="sku-title">门店信息</view>
		    <view class="sku-content">
		        <view class="skulist">
		            <view class="sku-name">门店名称：</view>
		            <view class="sku-item">{{storeInfo.Stores_Name}}</view>
		        </view>
		        <view class="skulist">
		            <view class="sku-name">门店电话：</view>
		            <view class="sku-item">{{storeInfo.mobile}}</view>
		        </view>
		        <view class="skulist">
		            <view class="sku-name">门店地址：</view>
		            <view class="sku-item" style="flex:1;">{{storeInfo.Stores_Province_name}}{{storeInfo.Stores_City_name}}{{storeInfo.Stores_Area_name}}{{storeInfo.Stores_Address}}<image class="img" src="/static/local.png"></image></view>
		        </view>
		        <view class="skulist">
		            <view class="sku-name">门店距离：</view>
		            <view class="sku-item">1.2KM</view>
		        </view>
		    </view>
		</view>
		<!--  遮罩层	-->
		<view class="mask" :hidden="isHidden" @click="hiddenMask"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				pro_tip_show: false,
				isHidden: true,
				isShowStoreMsg: false
			}
		},
		methods: {
			show_pro_tip(){
				this.pro_tip_show = true;
			},
			hidden_tip(){
				this.pro_tip_show = false;
			},
			showStore(){
				console.log('lalal')
				this.isHidden = false;
				this.isShowStoreMsg = true;
			},	
			hiddenMask(){
				this.isShowStoreMsg = false;
				this.isHidden = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 26rpx;
		padding: 0 20rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		.prolist {
			width: 710rpx;
			margin: 30rpx 0;
			padding: 0 16rpx 42rpx 14rpx;
			background-color: #fff;
			box-sizing: border-box;
			.pro-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 75rpx;
				line-height: 75rpx;
				color: #777777;
				// padding: 0 20rpx;
				border-bottom: 2rpx solid #E6E6E6;
				.img {
					width: 26rpx;
					height: 31rpx;
				}
			}
			.list-msg {
				.biz-msg {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 107rpx;
					.avator {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					.biz-name {
						display: flex;
						align-items: center;
						flex: 1;
						font-size: 28rpx;
						color: #333;
						.biz-links {
							color: $wzw-primary-color;
							font-size: 24rpx;
							margin-left: 14rpx;
							.text-d {
								text-decoration: underline;
								padding: 0 10rpx;
							}
						}
					}
					.status {
						color: $wzw-primary-color;
					}
				}
				.pro-msg {
					display: flex;
					padding-bottom: 30rpx;
					box-sizing: border-box;
					border-bottom: 2rpx solid #E6E6E6;
					.pro-img {
						width: 200rpx;
						height: 200rpx;
						margin-right: 28rpx;
						.img {
							width: 200rpx;
							height: 200rpx;
						}
					}
					.pro-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.pro-name {
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.pro-attr {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 25rpx;
							margin-bottom: 23rpx;
							.attr-info {
								line-height: 50rpx;
								padding: 0 20rpx;
								background-color: #FFF5F5;
								color: #666;
								font-size: 24rpx;
							}
							.pro-qty {
								position: relative;
								.tips {
									position: absolute;
									top:50rpx;
									right: -12rpx;
									width: 200rpx;
									padding: 20rpx;
									background: #fff;
									box-shadow: 0px 0px 16px 0px rgba(4,0,0,0.18);
									.sanjiaoxing {
										position: absolute;
										top: -14rpx;
										right: 30rpx;
										background-color: #fff;
										transform: rotate(70deg);
										width: 15rpx;
										height: 30rpx;
										border: 2rpx solid #fff;
										border-right:0;
										border-bottom: 0;
										box-shadow: 0px 0px 16px 0px rgba(4,0,0,0.18);
									}
								}
								.qty-icon {
									width: 22rpx;
									height: 22rpx;
									margin-left: 10rpx;
								}
							}
						}
						.pro-price {
							font-size: 30rpx;
							color: $wzw-primary-color;
							.price-icon {
								font-size: 24rpx;
							}
						}
					}
				}
				.totalinfo {
					line-height: 85rpx;
					text-align: right;
					.price-icon {
						font-size: 24rpx;
						color: $wzw-primary-color;
					}
					.price-num {
						font-size: 30rpx;
						color: $wzw-primary-color;
					}
				}
				.btns {
					display: flex;
					justify-content: flex-end;
					.btn {
						width:155rpx;
						height:60rpx;
						line-height: 60rpx;
						color: #666;
						text-align: center;
						background-color: #EEEEEE;
						border-radius:10rpx;
					}
					.back {
						color: #fff;
						background:rgba(244,49,49,1);
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.mask {
	    background-color: rgba(0,0,0,.5);
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    z-index: 1000;
	}
	.sku-pop {
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    z-index: 10000;
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
	        padding: 40rpx 46rpx 34rpx 40rpx;
	        background-color: #fff;
	        border-bottom-left-radius: 10rpx;
	        border-bottom-right-radius: 10rpx;
	        .skulist {
	            margin-bottom: 30rpx;
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
	                /*flex: 1;*/
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
	                    background-color: $wzw-primary-color;
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
	                background-color: $wzw-primary-color;
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
</style>
