<template>
	<view class="all" :style="{'min-height':height+'px'}">
		<page-title title="我的提现方式" rightHidden="true" bgcolor="#ffffff" ></page-title>
		<view class="content">
			<block v-for="(item,index) of data " :key="index" >
				<view class="cardInfo" @click="change(item)" v-if="item.Method_Type=='bank_card'||item.Method_Type=='alipay'">
					{{item.Method_Name}} （{{item.Account_Val}}）
					<image src="/static/fenxiao/xuanzhong.png" v-if="User_Method_ID==item.User_Method_ID"></image>
				</view>
				<view class="cardInfo" @click="change(item)" v-else>
					{{item.Method_Name}}
					<image src="/static/fenxiao/xuanzhong.png" v-if="User_Method_ID==item.User_Method_ID"></image>
				</view>
			</block>
		</view>
		<view class="addMethod" @click="addMethod">
			+ 添加提现方式
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getUserWithdrawMethod} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data(){
			return {
				height:1000,//获取手机屏幕高度
				data:[],//用户提现方式
				User_Method_ID:-1,//传过来选中的提现方式
			};
		},
		onLoad(options) {
			let that=this;
			that.User_Method_ID=options.User_Method_ID;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
		},
		onShow() {
			this.getUserWithdrawMethod();
		},
		methods:{
			//选中提现方式
			change(item){
				this.User_Method_ID=item.User_Method_ID;
				uni.navigateTo({
					url:'../withdrawal/withdrawal?User_Method_ID='+this.User_Method_ID
				})
			},
			//获取用户提现方式
			getUserWithdrawMethod(){
				getUserWithdrawMethod().then(res=>{
					if(res.errorCode==0){
						this.data=res.data.list;
					}
				})
			},
			//添加提现方式
			addMethod(){
				uni.navigateTo({
					url:'../addWithdrawal/addWithdrawal'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.all{
	background-color: #f8f8f8;
}
view,div{
	box-sizing: border-box;
}
.content{
	margin: 0 auto;
	margin-top: 40rpx;
	width: 710rpx;
	.cardInfo{
		width: 710rpx;
		height: 75rpx;
		line-height: 75rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius:5rpx;
		padding-left: 30rpx;
		position: relative;
		font-size: 28rpx;
		color: #333333;
		&:last-child{
			margin-bottom: 0rpx;
		}
		image{
			width: 32rpx;
			height: 23rpx;
			position: absolute;
			top: 26rpx;
			right: 35rpx;
		}
	}
	
}
.addMethod{
	width:460rpx;
	height:76rpx;
	line-height: 76rpx;
	background:#F43131;
	border-radius:10rpx;
	margin: 0 auto;
	text-align: center;
	font-size: 30rpx;
	color: #FFFFFF;
	margin-top: 128rpx;
}
</style>
