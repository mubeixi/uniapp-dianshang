<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background: #f81111;"><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<view class="top">
			<image src="https://new401.bafangka.com/static/client/fenxiao/top.png"></image>
			<!-- #ifdef APP-PLUS -->
			<view class="title">分销中心</view>
			<!-- #endif -->
			<div v-if="userInfo.User_ID&&userInfo.Is_Distribute==1">
				<image v-if="userInfo.User_ID" class="msg" src="https://new401.bafangka.com/static/client/fenxiao/msg.png" @click="goMsg"></image>
				<view class="person" >
					<image style="border-radius: 50%;overflow: hidden" :src="data.disInfo.Shop_Logo||data.disInfo.User_HeadImg"  @click="tofenxiaoshang"></image>
				</view>
				<view class="nickName" v-if="userInfo.User_ID&&userInfo.Is_Distribute==1">
					{{data.disInfo.Shop_Name}}
				</view>
				<view class="putong" v-if="userInfo.User_ID&&userInfo.Is_Distribute==1">
					{{data.disInfo.Level_Name}}
				</view>
			</div>

			<view class="font14 loginBtn" v-if="!userInfo.User_ID" plain size="mini" @click="goLogin">登录/注册</view>
			<view class="font14 loginBtn" v-if="userInfo.User_ID && userInfo.Is_Distribute!=1" plain size="mini" @click="goDistributor">成为分销商</view>
			<view class="sales">
				<view class="left">
					<view class="salesSum">
						累计销售额（元）
					</view>
					<view class="salesSumPrice" v-if="userInfo.User_ID&&userInfo.Is_Distribute">
						{{data.total_sales}}
					</view>
					<view class="salesSumPrice" v-else>
						{{'—'}}
					</view>
				</view>
				<view class="right">
					<view class="salesSum">
						累计利润（元）
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
			<view>
				可提现金额
			</view>
			<view>
				{{data.balance}}
			</view>
			<view @click="tixian">
				提现
			</view>
		</view>
		<view v-else style="height: 25px;"></view>
		<view class="last">
			<image src="https://new401.bafangka.com/static/client/fenxiao/background.png" class="back"></image>
			<view class="zhezhao">
				<view class="td" @click="goErweima">
					<image class="imgs" src="https://new401.bafangka.com/static/client/fenxiao/erweima.png" ></image>
					<view class="views">
						二维码
					</view>
				</view>
				<view class="td"  @click="goMyTeam">
					<image  class="imgs" src="https://new401.bafangka.com/static/client/fenxiao/wode.png" ></image>
					<view class="views">
						我的团队
					</view>
				</view>
				<view class="td"  @click="goFinance" style="border-right: 0px;">
					<image  class="imgs" src="https://new401.bafangka.com/static/client/fenxiao/caiwu.png" ></image>
					<view class="views">
						财务明细
					</view>
				</view>
				<view class="td" @click="goPromotion">
					<image  class="imgs" src="https://new401.bafangka.com/static/client/fenxiao/juewei.png" ></image>
					<view class="views">
						爵位晋升
					</view>
				</view>
				<view class="td"  @click="goLeaderboard"  >
					<image  class="imgs" src="https://new401.bafangka.com/static/client/fenxiao/caifu.png" ></image>
					<view class="views">
						财富排行榜
					</view>
				</view>
				<view class="td" @click="goRegion"  v-if="data.dis_config.Dis_Agent_Type==1">
					<image  class="imgs" src="https://new401.bafangka.com/static/client/fenxiao/quyu.png" ></image>
					<view class="views">
						区域代理
					</view>
				</view>
				<view class="td" @click="goGudong"  style="border-bottom: 0px;"  v-if="data.dis_config.Sha_Agent_Type==1">
					<image  class="imgs" src="/static/gudong.jpg" ></image>
					<view class="views">
						股东
					</view>
				</view>
				<!-- #ifndef MP ||APP-PLUS -->
				<view class="td"  @click="goAssist" style="border-bottom: 0px;">
					<image  class="imgs" src="https://new401.bafangka.com/static/client/fenxiao/tuiguang.png" ></image>
					<view class="views">
						推广小助手
					</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getDisInit,get_user_info} from '../../common/fetch.js'
	import {mapActions,mapState,mapGetters} from 'vuex';

	export default {
		mixins:[pageMixin],
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
			};
		},
		computed:{
			...mapGetters(['userInfo'])
		},
		onLoad() {

		},
		async onShow() {
			if(JSON.stringify(this.userInfo) != "{}"){
				get_user_info().then(res=>{
					this.setUserInfo(res.data);
				},err=>{

				}).catch(e=>{
					console.log(e)
				})
			}
			//获取分销首页
			this.getDisInit();


			//this.userInfo = await this.getUserInfo();
		},
		created(){

		},
		methods:{
			...mapActions(['getUserInfo','setUserInfo']),
			goDistributor(){
				//跳转成为分销商
				uni.navigateTo({
					url:'../disAgreementBefore/disAgreementBefore'
				})
			},
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			goMsg(){
				uni.navigateTo({
					url:'../systemMsg/systemMsg'
				})
			},
			// 去分销商页面
			tofenxiaoshang(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url: '../fenxiaoshang/fenxiaoshang'
				})
			},
			//获取分销首页数据
			getDisInit(){
				let that=this;
				getDisInit({},{errtip:false}).then(res=>{
					this.data=res.data;
					this.userInfo.Is_Distribute=1;
				},err=>{

				}).catch(err=>{
					console.log(err)
				})
			},
			//去提现
			tixian(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../withdrawal/withdrawal'
				})
			},
			//推广小助手
			goAssist(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../promotionAssist/promotionAssist'
				})
			},
			//自定义分享
			goShare(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../customizeShare/customizeShare'
				})
			},
			//财富排行榜
			goLeaderboard(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../leaderboard/leaderboard'
				})
			},
			//爵位晋升
			goPromotion(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../promotion/promotion'
				})
			},
			//股东
			goGudong(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../gudong/gudong'
				})
			},
			//区域代理
			goFinance(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../finance/finance'
				})
			},
			//财务明细
			goRegion(){
				uni.navigateTo({
					url:'../region/region'
				})
			},
			//我的团队
			goMyTeam(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../myTeam/myTeam'
				})
			},
			//二维码
			goErweima(){
				if(!this.$fun.checkIsDistribute(1,1))return;
				uni.navigateTo({
					url:'../erweima/erweima'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{background-color: #F2F2F2;}
.top{
	width: 750rpx;
	height: 400rpx;
	position: relative;

	image{
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
		image{
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
		width:152rpx;
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
	}
</style>
