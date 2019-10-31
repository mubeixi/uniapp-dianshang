<template>
	<view class="all">
		<!-- <page-title title="我的兑换" bgcolor="#ffffff"></page-title> -->
		<view style="height: 10rpx;width: 100%;"></view>
		<template v-if="prod_list.length > 0">
			<view class="myHa" v-for="(item,index) in prod_list">
				<view class="tops">
					<view>
						订单编号：{{item.Gift_ID}}
					</view>
					<view class="times">
						<image src="/static/check/time.png"></image>
						{{item.Orders_CreateTime | formatTime}}
					</view>
				</view>
				<view class="last">
					<image :src="item.Gift_Info.Gift_ImgPath" ></image>
					<view class="myRight">
						<view class="titles">
							<view class="leftM">
								{{item.Gift_Info.Gift_Name}}
							</view>
							<view class="rightM" :class="[(item.Orders_Status == 2 || item.Orders_Status == 3)? 'payed': '',item.Orders_Status == 4 ? 'complated': '','rightM']">
								{{item.Orders_Status|status_desc}}
							</view>
						</view>
						<view class="rty">
							<image src="/static/check/ji.png" mode=""></image>
							<text>{{item.Gift_Info.Gift_Integral}}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<div class="defaults">
				<image src="/static/defaultImg.png" ></image>
			</div>
		</template>
	</view>
</template>

<script>
	import {jifenProdOrder} from '../../common/fetch.js'
	import {formatNumber} from '../../common/tool.js'
	export default {
		data() {
			return {
				prod_list: [],
				hasMore: false
			};
		},
		onShow(){
			this.get_jifen_order();
		},
		filters: {
			status_desc(status){
				switch (status) {
					case 1 : return '待支付' ;break;
					case 2 : return '已付款' ;break;
					case 3 : return '已发货' ; break;
					case 4 : return '已完成' ;break;
				}
			},
			formatTime(date) {
				const year = new Date(date*1000).getFullYear()
				const month = new Date(date*1000).getMonth() + 1
				const day = new Date(date*1000).getDate()
				const hour = new Date(date*1000).getHours()
				const minute = new Date(date*1000).getMinutes()
				const second = new Date(date*1000).getSeconds()
				return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
			}
		},
		methods: {
			get_jifen_order(){
				jifenProdOrder({errtip: false}).then(res=>{
					console.log(res)
					let old = this.prod_list;
					this.prod_list = old.concat(res.data);
					if(this.prod_list.length < res.totalCount) {
						this.hasMore = true;
					}
				},err=>{
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.all{
	background-color: #F8F8F8;
	text-align: center;
}
.myHa{
	width:700rpx;
	height:320rpx;
	background:rgba(255,255,255,1);
	border-radius:40rpx;
	margin: 0  auto;
	margin-top:25rpx;
	.tops{
		padding: 34rpx 22rpx 0rpx 21rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #888888;
		view{
			height: 25rpx;
			line-height: 25rpx;
		}
		.times{
			height: 19rpx;
			line-height: 19rpx;
			margin-top: 6rpx;
		}
		image{
			width: 17rpx;
			height: 17rpx;
			margin-right: 10rpx;
		}
	}
	.last{
		margin-top: 59rpx;
		margin-left: 20rpx;
		width: 680rpx;
		height: 176rpx;
		display: flex;
		image{
			width: 176rpx;
			height: 176rpx;
		}
		.myRight{
			width: 504rpx;
			padding-left: 15rpx;
			padding-top: 16rpx;
			.rty{
				margin-top: 30rpx;
				text-align: left;
				image{
					width: 16rpx;
					height: 17rpx;
				}
				text{
					margin-left: 6rpx;
					color: #FE6444;
					font-size: 32rpx;
				}
			}
			.titles{
				height: 42rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.leftM{
					height: 27rpx;
					overflow: hidden;
					font-size: 28rpx;
					line-height: 27rpx;
					color: #333333;
					font-weight: 300;
				}
				.rightM {
					width: 114rpx;
					height: 42rpx;
					line-height: 42rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
					background-color: #cdcdcd;//#FF5C33已发货颜色  #f8e9e8已完成颜色
					border-top-left-radius: 114rpx;
					border-bottom-left-radius: 114rpx;
				}
				.payed {
					background-color: #FF5C33
				}
				.complated {
					background-color: #f8e9e8;
				}
			}
		}
	}
}
.nodata {
	text-align: center;
	color: #666;
	font-size: 28rpx;
}
.defaults{
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
</style>
