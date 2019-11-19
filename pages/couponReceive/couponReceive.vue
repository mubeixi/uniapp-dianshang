<template>
	<view class="myall">
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
		<block>
			<view class="youhuijuan" v-for="(item,index) of pro" :key="index">
				<image class="allImg" src="data:image/png;base64,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" ></image>
				<view class="infoImg">
					<image :src="item.Coupon_PhotoPath"></image>
				</view>
				<view class="storeTitle">
					店铺优惠券
				</view>
				<view class="times">
					有效期：{{item.Coupon_StartTime}}至{{item.Coupon_EndTime}}
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
				<view class="button" @click="goIndex(item.Coupon_ID,index)">
					领取
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getCoupon,getUserCoupon} from '../../common/fetch.js'
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
			//获取用户已领取可使用的优惠券
			getUserReceivedCoupon(){
				let data={
					page:this.page,
					pageSize:this.pageSize
				}
				getCoupon(data).then(res=>{
					this.totalCount=res.totalCount;
					for(let item of res.data){
						this.pro.push(item);
					}

				},err=>{

				}).catch(e=>{
					console.log(e)
				})

			},
			goIndex(id,index){
				getUserCoupon({coupon_id:id}).then(res=>{
					uni.showToast({
						title:res.msg
					})
					console.log(index,"ssss")
					this.pro.splice(index,1)
				})
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
		image{
			width: 100%;
			height: 100%;
		}
	}
	.storeTitle{
		font-size: 28rpx;
		color: #333333;
		line-height: 28rpx;
		position: absolute;
		top: 69rpx;
		left: 150rpx;
	}
	.times{
		font-size: 20rpx;
		color: #666666;
		position: absolute;
		top: 118rpx;
		left: 148rpx;
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
	font-size: 20rpx;
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

</style>
