<template>
	<view @click="commonClick" class="myall">
<!-- 		<view class="nav">
			<view class="views" :class="checked==0?'checked':''" @click="change(0)">
				全部
			</view>
			<view class="views" :class="checked==1?'checked':''" @click="change(1)">
				已领取
			</view>
			<view class="views" :class="checked==2?'checked':''" @click="change(2)">
				已过期
			</view>
		</view>
		<view style="height: 198rpx;width: 100%;">

		</view> -->
<!-- 		<view style="height: 120rpx;width: 100%;">

		</view> -->
		<view class="defaults" v-if="pro.length<=0">
			<image :src="'/static/client/defaultImg.png'|domain" ></image>
		</view>
		<block>
			<view class="youhuijuan" v-for="(item,index) of pro" :key="index">
				<image class="allImg" src="/static/mbxcoupon.png"></image>
				<view class="infoImg">
					<image class="image" :src="item.Coupon_PhotoPath"></image>
				</view>
				<view class="storeTitle">
					店铺优惠券
				</view>
				<view class="times">
					有效期：{{item.Coupon_StartTime}}至{{item.Coupon_EndTime}}
				</view>
				<view class="subject">
					{{item.limit_txt}}
				</view>
				<view class="prices" v-if="item.Coupon_Discount<=0">
					¥<text>{{item.Coupon_Cash}}</text>
				</view>
				<view class="prices" v-else>
					{{item.Coupon_Discount*10}}折优惠
				</view>
				<view class="man">
					[{{item.Coupon_Subject}}]
				</view>
				<view class="button" @click="goIndex(item.coupon_prod)">
					去使用
				</view>
			</view>
			<!-- <view class="youhuijuan">
				<image  class="allImg" src="data:image/png;base64,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" ></image>
				<view class="infoImg">
					<image :src="'/static/clientpop_default.jpg'|domain"></image>
				</view>
				<view class="storeTitle">
					电话号大法师
				</view>
				<view class="times">
					有效期：2019-6-1至2019-6-31
				</view>
				<view class="prices">
					¥<text>50</text>
				</view>
				<view class="man">
					[满100可用]
				</view>
				<view class="button" style="color: #666666;">
					查看
				</view>
				<image class="yishiyong" src="data:image/png;base64,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"></image>
			</view> -->
		</block>
		<view class="lasts">
			<view class="lefts">
				没有更多可用券 |
			</view>
			<view class="rights" @click="goExpired">
				查看已失效的券 >
			</view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getUserReceivedCoupon,getExpiredCoupon} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				checked:0,//选中
				page:1,
				pageSize:6,
				pro:[],
				totalCount:0
			};
		},
		onShow() {
			this.pro=[];
			this.page=1;
			this.getUserReceivedCoupon();
		},
		onReachBottom() {
			if(this.totalCount>this.pro.length){
				this.page++;
				this.getUserReceivedCoupon();
			}
		},
		onPullDownRefresh() {
			this.page=1;
			this.pro=[];
		},
		methods:{
			goExpired(){
				uni.navigateTo({
					url:"/pagesA/person/expiredCoupon"
				})
			},
			//获取用户已领取可使用的优惠券
			getUserReceivedCoupon(){
				let data={
					page:this.page,
					pageSize:this.pageSize
				}
				getUserReceivedCoupon(data).then(res=>{
					this.totalCount=res.totalCount;
					for(let item of res.data){
						this.pro.push(item);
					}

				},err=>{

				}).catch(e=>{
					console.log(e)
				})

			},
			goIndex(i){
				if(i=='0'){
					uni.switchTab({
						url:'/pages/index/index'
					})
				}else{
					uni.redirectTo({
					    url: '/pages/classify/result?pid='+i
					});
				}
			}
		// 	change(item){
		// 		this.checked=item;

		// 	}
		}
	}
</script>

<style lang="scss" scoped>
	.myall{
		background-color: #FFFFFF !important;
		min-height: 100vh;
	}
.titless{
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		z-index: 999;
}
.nav{
	z-index: 999;
	position: fixed;
	top: 86rpx;
	left: 0rpx;
	width: 750rpx;
	margin: 0 auto;
	margin: 20rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #333333;
	.views{
		width: 236rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		position: relative;
		&.checked{
			color: #F43131;
			&:after{
				content: '';
				display: flex;
				width: 135rpx;
				height: 3rpx;
				background-color: #F43131;
				position: absolute;
				bottom: 0rpx;
				left: 50rpx;
			}
		}
	}
}
.youhuijuan{
	width: 709rpx;
	height: 206rpx;
	margin-left: 20rpx;
	margin-bottom: 30rpx;
	position: relative;
	.allImg{
		width: 100%;
		height: 100%;
	}
	.infoImg{
		width: 89rpx;
		height: 89rpx;
		border-radius: 50%;
		position: absolute;
		top: 56rpx;
		left: 44rpx;
		overflow: hidden;
		.image{
			width: 100%;
			height: 100%;
		}
	}
	.storeTitle{
		font-size: 28rpx;
		color: #333333;
		line-height: 28rpx;
		position: absolute;
		top: 48rpx;
		left: 150rpx;
	}
	.times{
		font-size: 20rpx;
		color: #666666;
		position: absolute;
		top: 92rpx;
		left: 148rpx;
	}
	.subject {
		font-size: 16rpx;
		color: #FF565F;
		position: absolute;
		left: 148rpx;
		top: 130rpx;
	}
	.prices{
		width: 110rpx;
		height: 40rpx;
		line-height: 40rpx;
		padding-left: 12rpx;
		padding-right: 13rpx;
		color: #333333;
		font-size: 30rpx;
		position: absolute;
		top: 41rpx;
		left: 534rpx;
		text{
			margin-left: 11rpx;
			font-size: 52rpx;
		}
	}
	.man{
		height: 19rpx;
		font-size: 20rpx;
		color: #666666;
		position: absolute;
		top: 95rpx;
		left: 534rpx;
	}
	.button{
		width:125rpx;
		height:44rpx;
		line-height: 44rpx;
		background:rgba(255,255,255,1);
		border-radius:44rpx;
		font-size: 22rpx;
		color: #F43131;
		text-align: center;
		position: absolute;
		top:133rpx ;
		left: 527rpx;
	}
	.yishiyong{
		position: absolute;
		width: 106rpx;
		height: 106rpx;
		top: 47rpx;
		left: 455rpx;
	}
}

.lasts{
	font-size: 14px;
	padding-top: 30rpx;
	width: 100%;
	text-align: center;
	display: flex;
	justify-content: center;
	.lefts{
		color: #666666;
	}
	.rights{
		margin-left: 10rpx;
		color: #F43131;
	}
}

.defaults{
			margin: 0 auto;
			width: 640rpx;
			height: 480rpx;
			padding-top: 100rpx;
		}

</style>
