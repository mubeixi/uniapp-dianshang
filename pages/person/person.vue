<template>
	<view class="person">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background: #f81111;"></view>
		<!-- #endif -->

		<view class="personTop">
			<image class="bg" src="/static/person/top.png"  ></image>
			<image :class="userInfo.User_ID&&show>=0?'':'onlyMsg'"  class="msg" src="/static/fenxiao/msg.png" @click="goMsg"></image>
			<view class="qiandao" v-if="userInfo.User_ID&&show>=0"  :class="signin?'isQian':''" @click="signinMethod">
				<image src="/static/person/qiandao.png"></image>
				<view>{{signin?'已签到':'签到'}}</view>
			</view>
			<view class="personInfo flex">
				<view class="left" @click="goPersonMsg">
					<image style="border-radius: 50%;"  :src="userInfo.User_HeadImg||'/static/default.png'" ></image>
				</view>
				<view class="right flex1" :style="{position:!userInfo.User_ID?'relative':'static'}">
					<view class="font14 loginBtn" v-if="!userInfo.User_ID" plain size="mini" @click="goLogin">登录/注册</view>
					<view v-if="userInfo.User_ID" @click="goPersonMsg" class="nickName">{{userInfo.User_NickName||(userInfo.User_No?('用户'+userInfo.User_No):'暂无昵称')}}</view>
					<view v-if="userInfo.User_ID" @click="goVip" class="cart">{{userLevelText}}<image src="/static/person/rightCart.png" ></image></view>
				</view>
			</view>
			<view class="nav">
				<view class="navList first" @click="goBalance">
					<image src="/static/person/yue.png" mode=""></image>
					<view>
						余额
					</view>
				</view>
				<view class="navList second" @click="goIntegral">
					<image src="/static/person/jifen.png" mode=""></image>
					<view>
						积分
					</view>
				</view>
				<view class="navList three" @click="goCollection">
					<image src="/static/person/shoucang.png" mode=""></image>
					<view>
						收藏
					</view>
				</view>
				<view class="navList four" @click="goCoupon">
					<image src="/static/person/youhuijuan.png" mode=""></image>
					<view style="left: 50upx;">
						优惠券
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="orderTop">
					<view class="orderLeft">商城订单</view>
					<view class="orderRight" @click="goOrder(0)">
						全部订单<image src="/static/person/right.png" ></image>
					</view>
			</view>
			<view class="orderCenter">
				<view class="orderLast" @click="goOrder(1)">
						<image src="/static/person/pay.png"></image>
						<view>
							待付款
						</view>
						<view class="jiaobiao" v-if="orderNum.waitpay>0">{{orderNum.waitpay}}</view>
				</view>
				<view class="orderLast" @click="goOrder(2)">
						<image src="/static/person/fa.png"></image>
						<view>
							待发货
						</view>
						<div class="jiaobiao" v-if="orderNum.waitsend>0">{{orderNum.waitsend}}</div>
				</view>
				<view class="orderLast" @click="goOrder(3)">
						<image src="/static/person/shou.png"></image>
						<view>
							待收货
						</view>
						<div class="jiaobiao" v-if="orderNum.waitconfirm>0">{{orderNum.waitconfirm}}</div>
				</view>
				<view class="orderLast" @click="goOrder(4)">
						<image src="/static/person/ping.png"></image>
						<view>
							待评价
						</view>
						<div class="jiaobiao" v-if="orderNum.waitcomment>0">{{orderNum.waitcomment}}</div>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="group cell" @click="goPintuanOrderlist">
				<image src="/static/person/pin.png" class="left"></image>
				<view class="pintuan">
					拼团订单
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			<!-- <view class="bargain">
				<image src="/static/person/kan.png" class="left"></image>
				<view class="pintuan">
					砍价订单
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view> -->
			<view class="bargain cell" @click="goGift">
				<image src="/static/person/zengpin.png" class="left"></image>
				<view class="pintuan">
					赠品中心
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			<view class="bargain cell"  @click="goRenwu">
				<image src="/static/person/renwu.png" class="left"></image>
				<view class="pintuan">
					任务中心
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			<view class="bargain cell"  @click="gotoAddresslist" >
				<image src="/static/person/di.png" class="left"></image>
				<view class="pintuan">
					地址管理
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
			<!-- <view class="bargain">
				<image src="/static/person/wo.png" class="left"></image>
				<view class="pintuan">
					我的预约
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view> -->

			<view class="bargain cell" @click="goRefundList()">
				<image src="/static/person/tui.png" class="left"></image>
				<view class="pintuan">
					退款/售后
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>

			<view class="setting cell" @click="goSetting">
				<image src="/static/person/she.png" class="left"></image>
				<view class="pintuan">
					设置
				</view>
				<image src="/static/person/right.png" class="right"></image>
			</view>
		</view>
		<view style="height: 118upx;"></view>

<!--		<div class="space" style="height:60px"></div>-->
<!--		<div class="safearea"></div>-->
<!--		<tabbar-components></tabbar-components>-->

	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {mapGetters,mapActions} from 'vuex';
	import { judgeSignin,signin,getOrderNum } from "../../common/fetch.js"
	export default {
		mixins:[pageMixin],
		data() {
			return {
				//userInfo:{}
				show:1,//是否能签到 0不显示签到 1 直接签到   2  跳转签到
				signin:0,//0未签到  1 已签到
				isLodnig:false,
				orderNum:'',//订单状态角标数
				Order_Type: 'shop,gift' , //请求的订单类型
			};
		},
		computed:{
			...mapGetters(['userInfo']),
			userLevelText(){
				if(this.userInfo.Users_Level && this.userInfo.User_Level && this.userInfo.Users_Level[this.userInfo.User_Level]){
					return this.userInfo.Users_Level[this.userInfo.User_Level].Name
				}
				return '普通用户';
			}

		},
		onLoad(){

		},
		onShow() {
			this.getOrderNum();
			this.judgeSignin();
		},
		methods:{
			goIntegral(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../integralCenter/integralCenter'
				})
			},
			goBalance(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../balanceCenter/balanceCenter'
				})
			},
			//获取角标
			getOrderNum(){
				getOrderNum({Order_Type:this.Order_Type}).then(res=>{
					this.orderNum=res.data;
					console.log(res)
				}).catch(e=>{
					console.log(e)
				})
			},
			goVip(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../vipGrade/vipGrade'
				})
			},
			goCoupon(){
				uni.navigateTo({
					url:'../coupon/coupon'
				})
			},
			goRefundList(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../refundList/refundList'
				})
			},
			goMsg(){
				uni.navigateTo({
					url:'../systemMsg/systemMsg'
				})
			},
			//签到
			signinMethod(){
				if(!this.$fun.checkIsLogin(1))return;
				if(this.isLodnig) return;
				this.isLodnig=true;
				if(this.signin==1&&this.show!=2){
					uni.showToast({
						title:'今日已签到',
						icon:"none"
					})
					this.isLodnig=false;
					return;
				}
				if(this.show==1){
					signin().then(res=>{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						this.signin=1;
						this.isLodnig=false;
					},err=>{

					}).catch(e=>{
						console.log(e);
					})
				}else if(this.show==2){
					this.isLodnig=false;
					uni.navigateTo({
						url:'../qiandao/qiandao'
					})

				}

			},
			//获取签到状态
			judgeSignin(){
				judgeSignin({},{errtip:false}).then(res=>{
					this.show=res.data.show;
					this.signin=res.data.signin;
				},err=>{

				}).catch(e=>{
					console.log(e)
				})
			},
			...mapActions(['getUserInfo']),
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			goPintuanOrderlist(){
				uni.navigateTo({
					url: '../pintuanOrderlist/pintuanOrderlist'
				})
			},
			//去赠品中心
			goGift(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../myGift/myGift'
				})
			},
			goSetting(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '../editAccount/editAccount'
				})
				// uni.navigateTo({
				// 	url:'../setting/setting'
				// })
			},
			//去任务中心
			goRenwu(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../taskCenter/taskCenter'
				})
			},
			//去收藏页
			goCollection(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../collection/collection'
				})
			},
			//去订单页
			goOrder(item){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'../order/order?index='+item
				})
			},
			// 去地址管理
			gotoAddresslist() {
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '../addressList/addressList'
				})
			},
			// 去个人信息页
			goPersonMsg(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '../personalMsg/personalMsg'
				})
			}
		},
		created(){

		}
	}
</script>

<style lang="scss" scoped>
.person{
	background-color: rgb(241, 241, 241);
	.personTop{
		width: 750upx;
		height: 373upx;
		position: relative;
		.bg{

		}
		image{
			width: 100%;
			height: 100%;

		}
		.qiandao{
			width:120upx;
			height:45upx;
			background:rgb(249, 142, 142);
			box-shadow:0px 1upx 6upx 0px rgba(167,53,50,1);
			//opacity:0.45;
			border-radius:20upx;
			position: absolute;

			top: 22upx;
			right: 20upx;
			display: flex;
			align-items: center;
			padding: 11upx 20upx;
			justify-content: space-between;
			box-sizing: border-box;
			image{
				width: 22upx;
				height: 22upx;
			}
			view{
				color: #FFFFFF;
				font-size: 24upx;
				font-weight:500;
			}
		}
		.personInfo{
			position: absolute;
			left: 57upx;
			right: 57upx;
			top: 80upx;
			height: 100upx;
			display: flex;
			.left{
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				margin-left: 19upx;
				padding-top: 10upx;
				.loginBtn{
					padding:4px 10px;
					color: white;
					border: 1px solid #e7e7e7;
					border-radius: 4px;
					position: absolute;
					left: 10px;
					top: 50%;
					transform: translateY(-50%);
				}
				.nickName{
					font-size:30upx;
					height: 29upx;
					line-height: 29upx;
					color: #FFFFFF;
					font-weight:bold;
				}
				.cart{
					margin-top: 19upx;
					font-size: 22upx;
					color: #FFFFFF;
					//width:136upx;
					height:42upx;
					line-height: 42upx;
					display: inline-block;//flex;
					align-items: center;
					padding-left: 16upx;
					padding-right: 12upx;
					background:rgb(249, 142, 142);
					border-radius:20upx;
					box-sizing: border-box;
					image{
						width: 13upx;
						height: 20upx;
						margin-left: 9upx;
					}
				}
			}
		}
		.nav{
			width: 711upx;
			height: 240upx;
			background-color: #FFFFFF;
			position: absolute;
			top: 233upx;
			left: 19upx;
			box-shadow:0px 5upx 12upx 1upx rgba(222,71,66,0.41);
			border-radius:20upx;
			padding-top: 67upx;
			padding-bottom: 57upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.navList{
				width: 177upx;
				height: 100%;
				text-align: center;
				position: relative;
				view{
					font-size: 28upx;
					color: #333333;
					font-weight:500;
					position: absolute;
					bottom: 10upx;
					left: 60upx;
				}
			}
			.first{
				image{
					width: 53upx;
					height: 60upx;
				}
			}
			.second{
				image{
					width: 58upx;
					height: 58upx;
				}
			}
			.three{
				image{
					width: 56upx;
					height: 54upx;
				}
			}
			.four{
				image{
					width: 65upx;
					height: 46upx;
				}
			}
		}
	}
	.order{
		margin: 140upx 20upx 25upx 20upx;
		width: 710upx;
		height: 268upx;
		background-color: #FFFFFF;
		border-radius:20upx;
		.orderTop{
			width: 710upx;
			box-sizing: border-box;
			height: 70upx;
			padding: 0 20upx;
			line-height: 70upx;
			border-bottom: 1px solid #ECE8E8;
			display: flex;
			justify-content: space-between;
			.orderLeft{
				font-size:28upx;
				font-weight:bold;
			}
			.orderRight{
				font-size: 26upx;
				color: #666666;
				display: flex;
				align-items: center;
				image{
					width: 17upx;
					height: 26upx;
					margin-left: 12upx;
				}
			}
		}
		.orderCenter{
			height: 198upx;
			padding-top: 42upx;
			padding-bottom: 49upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.orderLast{
				width: 177.5upx;
				height: 107upx;
				text-align: center;
				position: relative;
				image{
					width: 65upx;
					height: 65upx;
				}
				view{
					font-size: 26upx;
					color: #333333;
				}
			}
		}
	}
	.list{
		width: 710upx;
		//height: 533upx;
		margin: 0  auto;
		background-color: #FFFFFF;
		border-radius:20upx;
		padding-left: 22upx;
		padding-right: 18upx;
		box-sizing: border-box;
		.line{
			height:1px;
			background:rgba(236,232,232,1);
		}
		.cell{
			border-bottom: 1px solid $wzw-border-color ;
			&:last-child{
				border-bottom: none;
			}
		}
		.group{
			height: 94upx;
			display: flex;
			align-items: center;
			image.left{
				width: 33upx;
				height: 31upx;
				margin-left: 7upx;
			}
			image.right{
				width: 17upx;
				height: 26upx;
				margin-left: auto;
				margin-right: 4upx;
			}
			.pintuan{
				margin-left: 13upx;
				font-size: 28upx;
				color: #333333;
			}
		}
		.bargain{
			height: 86upx;
			display: flex;
			align-items: center;
			image.left{
				width: 32upx;
				height: 34upx;
				margin-left: 7upx;
			}
			image.right{
				width: 17upx;
				height: 26upx;
				margin-left: auto;
				margin-right: 4upx;
			}
			.pintuan{
				margin-left: 13upx;
				font-size: 28upx;
				color: #333333;
			}
		}
		.setting{
			height: 90upx;
			display: flex;
			align-items: center;
			image.left{
				width: 36upx;
				height: 36upx;
				margin-left: 7upx;
			}
			image.right{
				width: 17upx;
				height: 26upx;
				margin-left: auto;
				margin-right: 4upx;
			}
			.pintuan{
				margin-left: 13upx;
				font-size: 28upx;
				color: #333333;
			}
		}

	}
}

.msg{
	width: 45upx !important;
	height: 45upx !important;
	position: absolute;
	top: 22upx;
	right: 175upx;
}
.onlyMsg{
	right: 25upx;
}
.isQian{
	padding-left: 12upx !important;
	padding-right: 12upx !important;
}

.jiaobiao{
		position: absolute;
		top: -6upx;
		right: 42upx;
		width: 24upx;
		height: 24upx;
		padding: 4upx;
		border-radius: 50%;
		background-color: #f43131;
		border: 1px solid  #F43131;
		font-size: 24upx !important;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff !important;
	}
</style>
