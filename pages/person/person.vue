<template>
	<view @click="commonClick" class="person">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background: #f81111;"></view>
		<!-- #endif -->
		<view class="personTop">
			<image class="bg" :src="'/static/client/person/top.png'|domain"  ></image>
			<image :class="userInfo.User_ID&&show>0?'':'onlyMsg'"  class="msg" :src="'/static/client/fenxiao/msg.png'|domain" @click="goMsg"></image>
			<view class="qiandao" v-if="userInfo.User_ID&&show>0"  :class="signin?'isQian':''" @click="signinMethod">
				<image class="imgg" :src="'/static/client/person/qiandao.png'|domain"></image>
				<view class="viewl">{{signin?'已签到':'签到'}}</view>
			</view>
			<view class="personInfo flex">
				<view class="left" @click="goPersonMsg">
					<image class="image" style="border-radius: 50%;"  :src="(userInfo.User_HeadImg||'/static/client/default.png')|domain" ></image>
				</view>
				<view class="right flex1" :style="{position:!userInfo.User_ID?'relative':'static'}">
					<view class="font14 loginBtn" v-if="!userInfo.User_ID" plain size="mini" @click="goLogin">登录/注册</view>
					<view v-if="userInfo.User_ID" @click="goPersonMsg" class="nickName">{{userInfo.User_NickName||(userInfo.User_No?('用户'+userInfo.User_No):'暂无昵称')}}<block v-if="userInfo.User_NickName">({{userInfo.User_No}})</block></view>
					<view v-if="userInfo.User_ID && initData.user_switch" @click="goVip" class="cart">{{userLevelText()}}<image class="image" :src="'/static/client/person/rightCart.png'|domain" ></image></view>
				</view>
			</view>
			<view class="nav">
				<view class="navList first" @click="goBalance"  v-if="initData.charge_switch==1">
					<image class="imgr" :src="'/static/client/person/yue.png'|domain" mode=""></image>
					<view class="viewr">
						余额
					</view>
				</view>
				<view class="navList second" @click="goIntegral">
					<image class="imgr" :src="'/static/client/person/jifen.png'|domain" mode=""></image>
					<view  class="viewr">
						积分
					</view>
				</view>
				<view class="navList three" @click="goCollection">
					<image class="imgr" :src="'/static/client/person/shoucang.png'|domain" mode=""></image>
					<view  class="viewr">
						收藏
					</view>
				</view>
				<view class="navList four" @click="goCoupon">
					<image class="imgr" :src="'/static/client/person/youhuijuan.png'|domain" mode=""></image>
					<view  class="viewr" style="left: 50upx;">
						优惠券
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="orderTop">
				<view class="orderLeft">商城订单</view>
				<view class="orderRight" @click="goOrder(0)">
					全部订单<image class="image" :src="'/static/client/person/right.png'|domain" ></image>
				</view>
			</view>
			<view class="orderCenter">
				<view class="orderLast" @click="goOrder(1)">
					<image class="zxc" :src="'/static/client/person/pay.png'|domain"></image>
					<view class="views">
						待付款
					</view>
					<view class="jiaobiao" v-if="orderNum.waitpay>0">{{orderNum.waitpay}}</view>
				</view>
				<view class="orderLast" @click="goOrder(2)">
					<image class="zxc" :src="'/static/client/person/fa.png'|domain"></image>
					<view class="views">
						待发货
					</view>
					<div class="jiaobiao" v-if="orderNum.waitsend>0">{{orderNum.waitsend}}</div>
				</view>
				<view class="orderLast" @click="goOrder(3)">
					<image class="zxc" :src="'/static/client/person/shou.png'|domain"></image>
					<view class="views">
						待收货
					</view>
					<div class="jiaobiao" v-if="orderNum.waitconfirm>0">{{orderNum.waitconfirm}}</div>
				</view>
				<view class="orderLast" @click="goOrder(4)">
					<image class="zxc" :src="'/static/client/person/ping.png'|domain"></image>
					<view class="views">
						待评价
					</view>
					<div class="jiaobiao" v-if="orderNum.waitcomment>0">{{orderNum.waitcomment}}</div>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="group cell" @click="goPintuanOrderlist">
				<image :src="'/static/client/person/pin.png'|domain" class="left"></image>
				<view class="pintuan">
					拼团订单
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<view class="group cell" @click="goToOrder('spike')">
				<image src="/static/limitOrder.png" class="left"></image>
				<view class="pintuan">
					限时抢购订单
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<view class="group cell" @click="goToOrder('flashsale')">
				<image src="/static/spikeOrder.png" class="left"></image>
				<view class="pintuan">
					秒杀订单
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<!-- <view class="bargain">
				<image :src="'/client/person/kan.png'|domain" class="left"></image>
				<view class="pintuan">
					砍价订单
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view> -->
			<view class="bargain cell" @click="goGift">
				<image :src="'/static/client/person/zengpin.png'|domain" class="left"></image>
				<view class="pintuan">
					赠品中心
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<view class="bargain cell"  @click="goRenwu">
				<image :src="'/static/client/person/renwu.png'|domain" class="left"></image>
				<view class="pintuan">
					任务中心
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<view class="bargain cell"  @click="gotoAddresslist" >
				<image :src="'/static/client/person/di.png'|domain" class="left"></image>
				<view class="pintuan">
					地址管理
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<!-- <view class="bargain">
				<image :src="'/static/client/person/wo.png'|domain" class="left"></image>
				<view class="pintuan">
					我的预约
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view> -->

			<view class="bargain cell" @click="goRefundList()">
				<image :src="'/static/client/person/tui.png'|domain" class="left"></image>
				<view class="pintuan">
					退款/售后
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<block v-if="!!initData.is_store_apply">
				<view class="setting cell" @click="goNew" v-if="!Stores_ID">
					<image :src="'/static/client/mendian/mendian.png'|domain" class="left"></image>
					<view class="pintuan">门店入驻</view>
					<image :src="'/static/client/person/right.png'|domain" class="right"></image>
				</view>
				<view class="setting cell" @click="goStore" v-else>
					<image :src="'/static/client/mendian/mendian.png'|domain" class="left"></image>
					<view class="pintuan">门店</view>
					<image :src="'/static/client/person/right.png'|domain" class="right"></image>
				</view>
			</block>

			<view class="setting cell" @click="goSetting">
				<image :src="'/static/client/person/she.png'|domain" class="left"></image>
				<view class="pintuan">
					设置
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>

		</view>
		<view style="height: 118rpx;"></view>
<!--		<tabbar-components/>-->

<!--		<div class="space" style="height:60px"></div>-->
<!--		<div class="safearea"></div>-->
<!--		<tabbar-components></tabbar-components>-->
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {mapGetters,mapActions, mapState} from 'vuex';
	import { judgeSignin,signin,getOrderNum,get_user_info} from "../../common/fetch.js"
	// import TabbarComponents from "../../components/TabbarComponents";
	export default {
		mixins:[pageMixin],
		components:{

		},
		data() {
			return {
				//userInfo:{}
				show:1,//是否能签到 0不显示签到 1 直接签到   2  跳转签到
				signin:0,//0未签到  1 已签到
				isLodnig:false,
				orderNum:'',//订单状态角标数
				Order_Type: 'shop' , //请求的订单类型
			};
		},
		computed:{
			...mapGetters(['userInfo','initData']),
			...mapState(['Stores_ID'])
		},
		methods:{
			...mapActions(['setUserInfo','getUserInfo']),
			goStore(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '/pagesA/person/storeCenter'
				})
			},
			goNew(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '/pagesA/procurement/storeSettled'
				})
			},
			userLevelText(){
				if(this.userInfo&&this.userInfo.User_Level){
					return this.userInfo.User_Level.level_name
				}
				return '普通用户';
			},
			goIntegral(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/integralCenter'
				})
			},
			goBalance(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/balanceCenter'
				})
			},
			//获取角标
			getOrderNum(){
				if(!this.$fun.checkIsLogin()){
					this.orderNum=[]
					return;
				}
				getOrderNum({Order_Type:this.Order_Type}).then(res=>{
					this.orderNum=res.data;
				}).catch(e=>{
				})
			},
			goVip(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/vipGrade'
				})
			},
			goCoupon(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/coupon'
				})
			},
			goRefundList(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/refundList'
				})
			},
			goMsg(){
				uni.navigateTo({
					url:'/pagesA/systemMsg/systemMsg'
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
					}).catch(e=>{
					})
				}else if(this.show==2){
					this.isLodnig=false;
					uni.navigateTo({
						url:'/pagesA/person/qiandao'
					})
				}
			},
			//获取签到状态
			judgeSignin(){
				judgeSignin({},{errtip:false}).then(res=>{
					this.show=res.data.show;
					this.signin=res.data.signin;
				}).catch(e=>{
				})
			},

			goLogin(){
				this.$fun.checkIsLogin(1)
			},
			goPintuanOrderlist(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '/pages/order/pintuanOrderlist'
				})
			},
			//去赠品中心
			goGift(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/myGift'
				})
			},
			goSetting(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '/pagesA/person/editAccount'
				})
			},
			//去任务中心
			goRenwu(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/taskCenter'
				})
			},
			//去收藏页
			goCollection(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pagesA/person/collection'
				})
			},
			goToOrder(item){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pages/order/order?Order_Type='+item
				})
			},
			//去订单页
			goOrder(item){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url:'/pages/order/order?index='+item
				})
			},
			// 去地址管理
			gotoAddresslist() {
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '/pages/addressList/addressList'
				})
			},
			// 去个人信息页
			goPersonMsg(){
				if(!this.$fun.checkIsLogin(1))return;
				uni.navigateTo({
					url: '/pagesA/person/personalMsg'
				})
			}
		},
		onShow() {
			if(JSON.stringify(this.userInfo) != "{}"){
				get_user_info({},{tip:'',errtip:false}).then(res=>{
					this.setUserInfo(res.data);
				}).catch(e=>{
				})
			}
			this.getOrderNum();
			if(this.$fun.checkIsLogin()){
				this.judgeSignin();
			}
		},
		async onPullDownRefresh(){
			if(JSON.stringify(this.userInfo) != "{}"){
				await get_user_info({},{tip:'',errtip:false}).then(res=>{
					this.setUserInfo(res.data);
				}).catch(e=>{
				})

				await getOrderNum({Order_Type:this.Order_Type}).then(res=>{
					this.orderNum=res.data;
				}).catch(e=>{
				});

				await judgeSignin({},{errtip:false}).then(res=>{
					this.show=res.data.show;
					this.signin=res.data.signin;
				}).catch(e=>{
				});

			}
			uni.stopPullDownRefresh()
		},
	}
</script>

<style lang="scss" scoped>
	.person{
	background-color: rgb(241, 241, 241);
	.personTop{
		width: 750rpx;
		height: 373rpx;
		position: relative;
		.bg{
			width: 100%;
			height: 100%;
		}
		.qiandao{
			width:120rpx;
			height:45rpx;
			background:rgb(249, 142, 142);
			box-shadow:0px 1rpx 6rpx 0px rgba(167,53,50,1);
			//opacity:0.45;
			border-radius:20rpx;
			position: absolute;
			top: 22rpx;
			right: 20rpx;
			display: flex;
			align-items: center;
			padding: 11rpx 20rpx;
			justify-content: space-between;
			box-sizing: border-box;
			.imgg{
				width: 22upx;
				height: 22upx;
			}
			.viewl{
				color: #FFFFFF;
				font-size: 24rpx;
				font-weight:500;
			}
		}
		.personInfo{
			position: absolute;
			left: 57rpx;
			right: 57rpx;
			top: 80rpx;
			height: 100rpx;
			display: flex;
			.left{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				.image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				margin-left: 19rpx;
				padding-top: 10rpx;
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
					font-size:30rpx;
					height: 30rpx;
					line-height: 30rpx;
					//overflow: hidden;
					color: #FFFFFF;
					font-weight:bold;
					width: 500rpx;
					white-space: nowrap;
					overflow-x: scroll;
					visibility:middle;
					overflow-y: hidden;
				}
				.nickName::-webkit-scrollbar {
				 display: none;
				}
				.cart{
					margin-top: 19rpx;
					font-size: 22rpx;
					color: #FFFFFF;
					//width:136rpx;
					height:42rpx;
					line-height: 42rpx;
					display: inline-block;//flex;
					align-items: center;
					padding-left: 16rpx;
					padding-right: 12rpx;
					background:rgb(249, 142, 142);
					border-radius:20rpx;
					box-sizing: border-box;
					.image{
						width: 13rpx;
						height: 20rpx;
						margin-left: 9rpx;
					}
				}
			}
		}
		.nav{
			width: 711rpx;
			height: 240rpx;
			background-color: #FFFFFF;
			position: absolute;
			top: 233rpx;
			left: 19rpx;
			box-shadow:0px 5rpx 12rpx 1rpx rgba(222,71,66,0.41);
			border-radius:20rpx;
			padding-top: 67rpx;
			padding-bottom: 57rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.navList{
				width: 177rpx;
				height: 100%;
				text-align: center;
				position: relative;
				.viewr{
					font-size: 28upx;
					color: #333333;
					font-weight:500;
					position: absolute;
					bottom: 10rpx;
					left: 60rpx;
				}
			}
			.first{
				.imgr{
					width: 53upx;
					height: 60upx;
				}
			}
			.second{
				.imgr{
					width: 58upx;
					height: 58upx;
				}
			}
			.three{
				.imgr{
					width: 56upx;
					height: 54upx;
				}
			}
			.four{
				.imgr{
					width: 65upx;
					height: 46upx;
				}
			}
		}
	}
	.order{
		margin: 140rpx 20rpx 25rpx 20rpx;
		width: 710rpx;
		height: 268rpx;
		background-color: #FFFFFF;
		border-radius:20rpx;
		.orderTop{
			width: 710rpx;
			box-sizing: border-box;
			height: 70rpx;
			padding: 0 20rpx;
			line-height: 70rpx;
			border-bottom: 1px solid #ECE8E8;
			display: flex;
			justify-content: space-between;
			.orderLeft{
				font-size:28rpx;
				font-weight:bold;
			}
			.orderRight{
				font-size: 26rpx;
				color: #666666;
				display: flex;
				align-items: center;
				.image{
					width: 17rpx;
					height: 26rpx;
					margin-left: 12rpx;
				}
			}
		}
		.orderCenter{
			height: 198rpx;
			padding-top: 42rpx;
			padding-bottom: 49rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.orderLast{
				width: 177.5rpx;
				height: 107rpx;
				text-align: center;
				position: relative;
				.zxc{
					width: 65upx;
					height: 65upx;
				}
				.views{
					font-size: 26upx;
					color: #333333;
				}
			}
		}
	}
	.list{
		width: 710rpx;
		//height: 533rpx;
		margin: 0  auto;
		background-color: #FFFFFF;
		border-radius:20rpx;
		padding-left: 22rpx;
		padding-right: 18rpx;
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
			height: 94rpx;
			display: flex;
			align-items: center;
			.left{
				width: 33upx;
				height: 31upx;
				margin-left: 7upx;
			}
			.right{
				width: 17upx;
				height: 26upx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.bargain{
			height: 86rpx;
			display: flex;
			align-items: center;
			.left{
				width: 32upx;
				height: 34upx;
				margin-left: 7upx;
			}
			.right{
				width: 17upx;
				height: 26upx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.setting{
			height: 90rpx;
			display: flex;
			align-items: center;
			.left{
				width: 36upx;
				height: 36upx;
				margin-left: 7upx;
			}
			.right{
				width: 17upx;
				height: 26upx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}

	}
}

	.msg{
		width: 45rpx;
		height: 45rpx;
		position: absolute;
		top: 22rpx;
		right: 175rpx;
	}
	.onlyMsg{
		right: 25rpx;
	}
	.isQian{
		padding-left: 12rpx !important;
		padding-right: 12rpx !important;
	}

	.jiaobiao{
		position: absolute;
		top: -6rpx;
		right: 42rpx;
		width: 24rpx;
		height: 24rpx;
		padding: 4rpx;
		border-radius: 50%;
		background-color: #f43131;
		border: 1px solid  #F43131;
		font-size: 24rpx !important;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff !important;
	}
</style>
