<template>
	<view class="wrap">
		
		<!-- <page-title :title="'进货记录'" :bgcolor="'#fff'"></page-title> -->
		<view class="prolist" @click="hidden_tip">
			<view class="pro-title">
				<view>进货单号：SN123456789</view>
				<image class="img" src="../../static/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="../../static/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">待处理</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" src="../../static/pro.png" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="../../static/i.png" mode="" @click.stop="show_pro_tip"></image>
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
				<image class="img" src="../../static/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="../../static/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">已发货</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" src="../../static/pro.png" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="../../static/i.png" mode="" @click.stop="show_pro_tip"></image>
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
				<image class="img" src="../../static/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="../../static/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">已驳回</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" src="../../static/pro.png" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="../../static/i.png" mode="" @click.stop="show_pro_tip"></image>
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
				<image class="img" src="../../static/del.png" mode=""></image>
			</view>
			<view class="list-msg">
				<view class="biz-msg">
					<image class="avator" src="../../static/tou.png" mode=""></image>
					<view class="biz-name">肖战穿搭衣橱<view class="biz-links">(<text class="text-d">查看信息</text>/<text class="text-d">修改渠道</text>)</view></view>
					<view class="status">已完成</view>
				</view>
				<view class="pro-msg">
					<view class="pro-img">
						<image class="img" src="../../static/pro.png" mode=""></image>
					</view>
					<view class="pro-info">
						<view class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</view>
						<view class="pro-attr">
							<view class="attr-info">白色；S码</view>
							<view class="pro-qty">x5
								<image class="qty-icon" src="../../static/i.png" mode="" @click.stop="show_pro_tip"></image>
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
	</view>
</template>

<script>
	export default {
		data(){
			return {
				pro_tip_show: false
			}
		},
		methods: {
			show_pro_tip(){
				this.pro_tip_show = true;
			},
			hidden_tip(){
				this.pro_tip_show = false;
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
</style>
