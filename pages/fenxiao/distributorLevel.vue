<template>
	<view class="all">
		<view class="top">
			<swiper class="center" :indicator-dots="false" :autoplay="false"  :duration="1000" :current="inds" @change="change">
				<swiper-item class="vipFir"  v-for="(item,index) of dis_level" :key="index"  :style="dis_level.length==1?'margin-left:43rpx;':''">
						<image src="https://new401.bafangka.com/static/client/task/vip.png" class="allImg"></image>
	
						<view class="vipGrade" v-if="item.Level_ID==pro.user_info.Level_ID">
							当前等级
						</view>
						<view class="mmp">
							{{item.Level_Name}}
						</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="height: 220rpx;"></view>
		<circleTitle title="级别简介" ></circleTitle>
		<view class="level-description">
			{{Level_Description}}
		</view>
		<view style="height: 20rpx;background-color: #F8F8F8;"></view>
		<circleTitle title="级别门槛"></circleTitle>
		
		<view class="ruhe">
			<block v-if="dis_level[inds].arrive_limit=='3'||dis_level[inds].arrive_limit=='4'">
				<view class="td" v-if="dis_level[inds].level_rules_edit.pay_money.checked=='1'">
					<image class="image" src="/static/fenxiao/storeSum.png"></image>
					<view class="mbx">
						<view class="tops">
							<block v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='1'">商城总消费{{dis_level[inds].level_rules_edit.pay_money.value.money}}元</block>
							<block v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='2'">一次性消费{{dis_level[inds].level_rules_edit.pay_money.value.money}}元</block>
						</view>
						<view class="bottoms">
							已消费{{dis_level[inds].level_rules_edit.pay_money.user_data}}元
						</view>
					</view>
					<view class="submit submitMbx" v-if="dis_level[inds].level_rules_edit.pay_money.user_data>=dis_level[inds].level_rules_edit.pay_money.value.money">
						已完成
					</view>
					<view class="submit"    v-else>
						去消费
					</view>
					
				</view>
				
				<view class="td" v-if="dis_level[inds].level_rules_edit.buy_prod.checked=='1'">
					<image class="image" src="/static/fenxiao/buyPro.png"></image>
					<view class="mbx">
						<view class="tops">
							<block v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='1'">购买任意商品</block>
							<block v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='2'">购买特定商品</block>
						</view>
						
						<view class="bottoms" v-if="dis_level[inds].level_rules_edit.buy_prod.user_data>0">
							已完成
						</view>
						<view v-else>
							去完成
						</view>
					</view>
					<view class="submit submitMbx">
						已完成
					</view>
					<!-- <view class="submit"    v-else>
						去购买
					</view> -->
					
				</view>
				<!-- 商品购买几次 -->
				<view class="td" v-if="dis_level[inds].level_rules_edit.buy_times.checked=='1'">
					<image class="image" src="/static/fenxiao/proCount.png"></image>
					<view class="mbx">
						<view class="tops">
							商品购买{{dis_level[inds].level_rules_edit.buy_times.value}}次
						</view>
						<view class="bottoms">
							已购买{{dis_level[inds].level_rules_edit.buy_times.user_data}}次
						</view>
					</view>
					<view class="submit submitMbx" v-if="dis_level[inds].level_rules_edit.buy_times.user_data>=dis_level[inds].level_rules_edit.buy_times.value">
						已完成
					</view>
					<view class="submit"    v-else>
						去购买
					</view>
					
				</view>
				<!-- 团队销售额 -->
				<view class="td" v-if="dis_level[inds].level_rules_edit.team_sales.checked=='1'">
					<image class="image" src="/static/fenxiao/teanSum.png"></image>
					<view class="mbx">
						<view class="tops">
							团队销售额达{{dis_level[inds].level_rules_edit.team_sales.value}}元
						</view>
						<view class="bottoms">
							已销售{{dis_level[inds].level_rules_edit.team_sales.user_data}}元
						</view>
					</view>
					<view class="submit submitMbx" v-if="dis_level[inds].level_rules_edit.team_sales.user_data>=dis_level[inds].level_rules_edit.team_sales.value">
						已完成
					</view>
					<view class="submit"    v-else>
						去完成
					</view>
					
				</view>
				<!-- 直接购买 -->
				<view class="td" v-if="dis_level[inds].level_rules_edit.direct_buy.checked=='1'">
					<image class="image" src="/static/fenxiao/disBuy.png"></image>
					<view class="mbx">
						<view class="tops">
							直接购买{{dis_level[inds].level_rules_edit.direct_buy.value.money}}元
						</view>
						<view class="bottoms">
							
						</view>
					</view>
					<view class="submit" >
						去完成
					</view>
					
				</view>
			</block>
			
		</view>
		
	</view>
</template>

<script>
	import circleTitle from '../../components/circleTitle/circleTitle.vue'
	import {pageMixin} from "../../common/mixin";
	import {disApplyInit} from '../../common/fetch.js';
	export default {
		mixins:[pageMixin],
		data() {
			return {
				index:0,//第几个会员等级
				pro:{},
				Level_Description:'',
				inds:0,
				dis_level:[]
			};
		},
		components:{
			circleTitle
		},
		onLoad() {
				
		},
		onShow() {
			this.disApplyInit();
		},
		methods:{
			change(e){
				this.inds=e.detail.current;
				this.Level_Description=this.dis_level[this.inds].Level_Description
			},
			disApplyInit(){
				disApplyInit().then(res=>{
					this.pro=res.data;
					this.dis_level=res.data.dis_level
					if(this.pro.user_info.Level_ID=='0'){
						this.Level_Description=this.pro.dis_level[0].Level_Description
					}else{
						for(let item of this.pro.dis_level){
							if(item.Level_ID==this.pro.user_info.Level_ID){
								this.Level_Description=item.Level_Description
							}
						}
					}
					
					
				},err=>{}).catch(e=>{
					console.log(e)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{
	background-color: #FFFFFF;
	overflow-x: hidden;
	box-sizing: border-box;
}
.top{
	width:750rpx;
	height:200rpx;
	background:rgba(64,61,61,1);
	position: relative;
	.goBack{
		width: 20rpx;
		height: 30rpx;
		position: absolute;
		top: 29rpx;
		left: 20rpx;
	}
	.titles{
		color: #FFFFFF;
		font-size: 32rpx;
		position: absolute;
		top: 28rpx;
		left: 310rpx;
		height: 31rpx;
		line-height: 31rpx;
	}
	.center{
		position: absolute;
		top: 60rpx;
		left: 3rpx;
		width: 750rpx;
		height: 325rpx;
		white-space: nowrap;
		.vipFir{
			width: 665rpx !important;
			height: 325rpx !important;
			display: inline-block;
			position: relative;
			.allImg{
				width: 100%;
				height: 100%;
			}	
			.vipGrade{
				height:24rpx;
				font-size:11px;
				color: #4D4D58;
				font-weight:normal;
				color:rgba(77,77,88,1);
				line-height:24rpx;
				position: absolute;
				top: 28rpx;
				left: 36rpx;
			}

		}
	}

}

.mmp{
	position: absolute;
	top: 128rpx;//84rpx;
	left: 205rpx;
	width: 230rpx;
	height: 36rpx;
	text-align: center;
}

.level-description{
	font-size: 24rpx;
	color: #666666;
	margin-top: 20rpx;
	width: 750rpx;
	box-sizing: border-box;
	padding: 0rpx   34rpx  36rpx 20rpx;
}

.ruhe{
	width:710rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 12rpx 0px rgba(0, 0, 0, 0.25);
	border-radius:10rpx;
	margin: 0 auto;
	margin-top: 10rpx;
	.td{
		width: 690rpx;
		margin: 0 auto;
		height: 124rpx;
		border-bottom: 1rpx solid #ECE8E8;
		display: flex;
		align-items: center;
		&:last-child{
			border-bottom: 0rpx;
		}
		.image{
			width: 65rpx;
			height: 65rpx;
			margin-left: 21rpx;
		}
		.mbx{
			height: 65rpx;
			margin-left: 24rpx;
			.tops{
				height:27rpx;
				line-height: 27rpx;
				color: #333333;
				font-weight: bold;
				font-size: 28rpx;
			}
			.bottoms{
				margin-top: 15rpx;
				height:23rpx;
				line-height: 23rpx;
				font-size:24rpx;
				color: #999999;
			}
		}
		.submit{
			width:110rpx;
			height:45rpx;
			line-height: 45rpx;
			background:rgba(244,49,49,1);
			border-radius:8rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			text-align: center;
			margin-left: auto;
			margin-right: 20rpx;
		}
		.submitMbx{
			background-color: #dedede !important;
		}
	}
}

</style>
