	<template>
	<view @click="commonClick" class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background: #f81111;"><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<view class="top">
			<image class="image" :src="'/static/client/fenxiao/top.png'|domain"></image>
			<!-- #ifdef APP-PLUS -->
			<view class="title">分销中心</view>
			<!-- #endif -->
			<div v-if="userInfo.User_ID&&userInfo.Is_Distribute==1">
				<image v-if="userInfo.User_ID" class="msg" :src="'/static/client/fenxiao/msg.png'|domain" @click="goMsg"></image>
				<view class="person" >
					<image class="image" style="border-radius: 50%;overflow: hidden" :src="data.disInfo.Shop_Logo||data.disInfo.User_HeadImg"  @click="tofenxiaoshang"></image>
				</view>
				<view class="nickName" v-if="userInfo.User_ID&&userInfo.Is_Distribute==1" @click="tofenxiaoshang">
					{{data.disInfo.Shop_Name}}
				</view>
				<view class="putong" v-if="userInfo.User_ID&&userInfo.Is_Distribute==1"   @click="goDistributor">
					{{data.disInfo.Level_Name}}
					<image v-if="data.disInfo.Level_Name" class="rightMy" :src="'/static/client/person/right.png' | domain" ></image>
				</view>
			</div>

			<view class="font14 loginBtn" v-if="!userInfo.User_ID" plain size="mini" @click="goLogin">登录/注册</view>
			<view class="font14 loginBtn" v-if="userInfo.User_ID && userInfo.Is_Distribute!=1" plain size="mini" @click="goDistributor">成为{{commi_rename.commi}}</view>
			<view class="sales">
				<view class="left" @click="goSales">
					<view class="salesSum">
						累计业绩（元）
						<image class="rightMys" :src="'/static/client/person/right.png' | domain" ></image>
					</view>
					<view class="salesSumPrice" v-if="userInfo.User_ID&&userInfo.Is_Distribute">
						{{data.total_sales}}
					</view>
					<view class="salesSumPrice" v-else>
						{{'—'}}
					</view>
				</view>
				<view class="right" @click="goProfit">
					<view class="salesSum">
						累计利润（元）
						<image class="rightMys" :src="'/static/client/person/right.png' | domain" ></image>
					</view>
					<view class="salesSumPrice" v-if="userInfo.User_ID&&userInfo.Is_Distribute">
						{{data.total_income}}
					</view>
					<view class="salesSumPrice" v-else>
						{{'—'}}
					</view>
				</view>
			</view>

		</view>
		<view class="center" v-if="userInfo.User_ID&&userInfo.Is_Distribute">
			<view>可提现金额</view>
			<view>
				{{data.balance}}
			</view>
			<view @click="tixian">
				提现
			</view>
		</view>
		<view v-else style="height: 25px;"></view>
		<view class="last">
			<image :src="'/static/client/fenxiao/background.png'|domain" class="back"></image>
			<view class="zhezhao">
				<view class="td" v-for="(item,index) in funcModules" @click="goOther(item)" :key="index">
					<image class="imgs" :src="item.img" ></image>
					<view class="views">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
<!--		<tabbar-components />-->
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getDisInit,get_user_info,getFuncModule} from '../../common/fetch.js'
	import {mapActions,mapState,mapGetters} from 'vuex';
	// import TabbarComponents from "../../components/TabbarComponents";
	export default {
		mixins:[pageMixin],
		components:{
			// TabbarComponents
		},
		data() {
			return {
				data:{
					dis_config:{},
					disInfo:{},
					total_sales:'',
					total_income:'',
					balance:''
				},//
				pro:[],
				funcModules: [], // 功能模块
			};
		},
		computed:{
			...mapGetters(['userInfo','commi_rename'])
		},
		methods:{
			...mapActions(['getUserInfo','setUserInfo']),
			goSales(){
				if(!this.$fun.checkIsLogin(1,1))return;
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'/pagesA/fenxiao/salesSum'
				})
			},
			goProfit(){
				if(!this.$fun.checkIsLogin(1,1))return;
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'/pagesA/fenxiao/profitSum'
				})
			},
			goDistributor(){
				//跳转成为
				uni.navigateTo({
					url:'/pages/fenxiao/distributorLevel'
				})
			},
			goLogin(){
				//直接跳转取登录
				this.$fun.checkIsLogin(1)
			},
			goMsg(){
				uni.navigateTo({
					url:'/pagesA/systemMsg/systemMsg'
				})
			},
			// 去分销商页面
			tofenxiaoshang(){

				if(!this.$fun.checkIsLogin(1,1))return;
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url: '/pagesA/fenxiao/fenxiaoshang'
				})
			},
			//获取分销首页数据
			getDisInit(){
				let that=this;
				getDisInit({},{errtip:false}).then(res=>{
					this.data=res.data;
					this.userInfo.Is_Distribute=1;
					uni.setNavigationBarTitle({
						title:res.data.title
					})
				},err=>{
					// uni.showToast({
					// 	title: err.msg,
					// 	icon:  'none'
					// })
				}).catch(err=>{
				})
			},
			//去提现
			tixian(){
				if(!this.$fun.checkIsLogin(1,1))return;
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'/pagesA/fenxiao/withdrawal?form=1'
				})
			},
			// 跳转其他页面
			goOther(item){
				if(!this.$fun.checkIsLogin(1,1))return;
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:item.url
				})
			},
			// 获取功能模块
			getFuncModule(){
				getFuncModule({type:1}).then(res=>{
					this.funcModules = res.data;
				})
			}
		},
		onShow() {
			if(this.$fun.checkIsLogin()){
				get_user_info({},{errtip: false}).then(res=>{
					this.setUserInfo(res.data);
				}).catch(e=>{
				})
			}
			// 获取首页功能
			this.getFuncModule();
			//获取分销首页
			this.getDisInit();
			//this.userInfo = await this.getUserInfo();
		}
	}
</script>

<style lang="scss" scoped>
	.all{
		background-color: #f8f8f8;
	}
	.top{
		width: 750rpx;
		height: 400rpx;
		position: relative;
		.image{
			width: 100%;
			height: 100%;
		}
		.title{
			width:138rpx;
			font-size:34rpx;
			font-weight:bold;
			color:#FFFFFF;
			position: absolute;
			top: 27rpx;
			left: 306rpx;
		}
		.msg{
			width: 45rpx;
			height: 45rpx;
			position: absolute;
			top: 25rpx;
			right: 21rpx;
		}
		.person{
			width: 92rpx;
			height: 92rpx;
			position: absolute;
			top:109rpx ;
			left: 329rpx;
			border-radius: 50%;
			.image{
				width: 100%;
				height: 100%;
			}
		}
		.nickName{
			font-size: 28rpx;
			height: 27rpx;
			line-height: 27rpx;
			font-weight:bold;
			color:rgba(255,255,255,1);
			width: 400rpx;
			position: absolute;
			top: 215rpx;
			left: 175rpx;
			text-align: center;
		}
		.loginBtn{
			padding:4px 10px;
			color: white;
			border: 1px solid #e7e7e7;
			border-radius: 4px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
		.sales{
			width: 690rpx;
			height: 160rpx;
			position: absolute;
			left: 30rpx;
			top: 297rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 27rpx 0px rgba(244,49,49,0.46);
			border-radius:10rpx;
			display: flex;
			.left,view.right{
				width: 50%;
				margin-top: 42rpx;
				margin-bottom: 41rpx;
				text-align: center;
			}
			.left{
				border-right: 1px solid #E7E7E7;
			}
			.salesSum{
				height:25rpx;
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
			}
			.salesSumPrice{
				height:29rpx;
				font-size:38rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(244,49,49,1);
				margin-top: 23rpx;
			}
		}
	}
	.center{
		width:690rpx;
		height:90rpx;
		line-height: 90rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		margin: 0 auto;
		margin-top: 117rpx;
		display: flex;
		align-items: center;
		position: relative;
		& view:first-child{
			margin-left: 48rpx;
			color: #333333;
			font-weight: 500;
			font-size: 26rpx;
			margin-right: 16rpx;
		}
		& view:nth-child(2){
			font-size:34rpx;
			font-weight:bold;
			color:#F43131;
		}
		& view:nth-child(3){
			font-size:26rpx;
			font-weight:500;
			color:#FFFFFF;
			background-color: #F43131;
			width: 85rpx;
			height: 45rpx;
			line-height: 45rpx;
			border-radius: 10rpx;
			text-align: center;
			position: absolute;
			right: 49rpx;
			top: 23rpx;
		}
	}
	.last{
		width: 691rpx;
		height: 668rpx;
		margin: 0 auto;
		position: relative;
		margin-top: 30rpx;
		image.back{
			width: 100%;
			height: 100%;
		}
		.zhezhao{
			position: absolute;
			top: 0;
			left: 0;
			width: 691rpx;
			//height: 668rpx;
			padding-left: 34rpx;
			padding-right: 30rpx;
			padding-top: 1rpx;
			padding-bottom: 1rpx;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			.td{
				width: 209rpx;
				height: 222rpx;
				border-right: 1px dotted #D3D3D3;
				border-bottom: 1px dotted #D3D3D3;
				text-align: center;
				box-sizing: border-box;
				.imgs{
					width: 95rpx;
					height: 95rpx;
					margin-top: 44rpx;
				}
				.views{
					height:25rpx;
					line-height: 25rpx;
					font-size:26rpx;
					font-weight:500;
					color: #303030;
					margin-top: 12rpx;
				}
			}
		}
	}
	.putong{
		height:50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #FFFFFF;
		font-size: 24rpx;
		color: #333333;
		position: absolute;
		top: 124rpx;
		right: 0rpx;
		border-radius:152rpx 0px 0px 152rpx;
		display: flex;
		align-items: center;
		padding-left: 10px;
		.rightMy{
			width: 9px !important;
			height: 14px !important;
			margin-left: 2px;
		}
	}
	.rightMys{
		width: 9px !important;
		height: 14px !important;
		margin-left: 2px;
		margin-bottom: -2px;
	}
</style>
