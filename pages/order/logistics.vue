<template>
	<view @click="commonClick" class="all" :style="{'min-height':height+'px'}">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<!-- <page-title title="物流追踪" rightHidden="true" bgcolor="#ffffff" ></page-title> -->
		<view class="wuliu box-sizing" v-if="pro.list">
			<image class="image" :src="pro.imgpath"></image>
			<view>
				<view class="fonts">
					<view class="left">
						物流状态:
					</view>
					<view class="right">
						{{pro.shipping_status}}
					</view>
				</view>
				<view class="fonts">
					<view class="left">
						物流公司:
					</view>
					<view>
						{{pro.shipping_express}}
					</view>
				</view>
				<view class="fonts" v-if="pro.shipping_no">
					<view class="left">
						物流单号:
					</view>
					<view>
						{{pro.shipping_no}}
					</view>
				</view>
				<view class="fonts" v-if="pro.delivery_man_phone">
					<view class="left">
						派送员电话:
					</view>
					<view @click="call">
						{{pro.delivery_man_phone}}
					</view>
				</view>
			</view>
		</view>
		<view class="box-sizing xiangxi">
			<block v-for="(item,index) of pro.list" :key="index">
				<view class="center" v-if="index==0">
					<view class="lefts">
						<view class="tops">
							<view class="views"></view>
						</view>
						<view class="bottoms" v-if="(index+1)<pro.list.length">

						</view>
					</view>
					<view class="rights">
						<view class="tops">
							{{item.AcceptStation}}
						</view>
						<view class="bottoms">
							{{item.AcceptTime}}
						</view>
					</view>
				</view>
				<view class="center" v-else>
					<view class="lefts">
						<view class="tops unBgcolor">
							<view class="views"></view>
						</view>
						<view class="bottoms" v-if="(index+1)<pro.list.length">

						</view>
					</view>
					<view class="rights">
						<view class="tops unColor">
							{{item.AcceptStation}}
						</view>
						<view class="bottoms">
							{{item.AcceptTime}}
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getOrderExpress} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data(){
			return {
				height:1000,//获取手机屏幕高度
				pro:[],
				order_id:''
			};
		},
		onLoad(options) {
			let {
				express,
				prod_img,
				shipping_id,
				order_id
			} = options ;
			this.express = express;
			this.order_id = order_id;
			this.prod_img = prod_img;
			this.shipping_id = shipping_id;
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
		},
		onShow() {
			this.getOrderExpress();
		},
		methods:{
			call(){
				uni.makePhoneCall({
				    phoneNumber: this.pro.delivery_man_phone
				});
			},
			getOrderExpress(){
				let data={
					shipping_id: this.shipping_id,
					express: this.express,
					prod_img: this.prod_img,
					order_id:this.order_id
				}
				getOrderExpress(data).then(res=>{
					this.pro=res.data;
				}).catch(e=>{
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.all{
	background-color: #f8f8f8;
}
.wuliu{
	width:710rpx;
	height:200rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	margin: 0 auto;
	margin-top: 20rpx;
	padding-top: 27rpx;
	padding-left: 32rpx;
	display: flex;
	padding-bottom: 10rpx;
	.image{
		width: 72rpx;
		height: 72rpx;
		margin-right: 30rpx;
	}
	.fonts{
		font-size: 24rpx;
		color: #999999;
		display: flex;
		height: 40rpx;
		line-height: 30rpx;
		.left{
			margin-right: 10rpx;
		}
		.right{
			color: #F43131;
		}
	}
}
.xiangxi{
	margin-top: 25rpx;
	width:710rpx;
	background:#FFFFFF;
	border-radius:20rpx;
	padding: 45rpx 0rpx 0rpx 42rpx;
	margin: 0 auto;
	.center{
		padding: 10px 0px;
		width: 626rpx;
		display: flex;
		.lefts{
			width: 32rpx;
			position: relative;
			.tops{
				width: 32rpx;
				height: 32rpx;
				background-color: #FFE4E4;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				.views{
					width: 16rpx;
					height: 16rpx;
					background-color: #F43131;
					border-radius: 50%;
				}
			}
			.bottoms{
				width: 4rpx;
				height: 100%;
				background-color: #ECECEC;
				position: absolute;
				top: 32rpx;
				left: 14rpx;
			}
		}
		.rights{
			margin-left: 28rpx;
			.tops{
				font-size: 28rpx;
				color: #F43131;
				// height: 30rpx;
				line-height: 30rpx;
			}
			.bottoms{
				margin-top: 19rpx;
				font-size: 24rpx;
				color: #AAAAAA;
				height: 30rpx;
				line-height: 30rpx;
			}
		}
		.unColor{
			color: #777777 !important;
		}
		.unBgcolor{
			background-color: #ECECEC !important;
			.views{
				background-color: #AFAFAF !important;
			}
		}

	}
}


</style>
