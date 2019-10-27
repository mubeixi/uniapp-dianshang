<template>
	<view>

		<!-- <page-title title="添加提现方式" rightHidden="true" ></page-title> -->
		<view class="center">
			<view class="left">
				提现方式
			</view>
			<view class="right">
				<!-- 中国银行 <image src="/static/right.png"></image> -->
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="Method_Name" >
				    <view class="uni-input">{{array[index].Method_Name}}</view>
				</picker>
				<image src="/static/right.png"></image>
			</view>
		</view>

		<block v-if="data.Method_Type=='bank_card'">
			<view class="centers">
				<view class="left">
					户名
				</view>
				<input type="text" placeholder="请输入您的户名" placeholder-style="places" v-model="data.Account_Name">
			</view>
			<view class="centers">
				<view class="left">
					账号
				</view>
				<input type="text" placeholder="请输入您的银行卡卡号" placeholder-style="places" v-model="data.Account_Val">
			</view>
			<!-- <view class="centers">
				<view class="left">
					开户行
				</view>
				<input type="text" placeholder="请输入您的开户行" placeholder-style="places" v-model="data.Bank_Position">
			</view> -->
		</block>
		<block v-else-if="data.Method_Type=='alipay'">
			<view class="centers">
				<view class="left">
					昵称
				</view>
				<input type="text" placeholder="请输入您的昵称" placeholder-style="places" v-model="data.Account_Name">
			</view>
			<view class="centers">
				<view class="left">
					账号
				</view>
				<input type="text" placeholder="请输入您的支付宝账号" placeholder-style="places" v-model="data.Account_Val">
			</view>
		</block>
		<view class="addInfo" @click="addInfo">
			添加
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getUserWithdrawMethod,getShopWithdrawMethod,addUserWithdrawMethod} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				array:[],
				index:0,//选择提现方式下表
				data:{
					Method_ID:'',
					Method_Type:'',//提现方式类型
					Method_Name:'',//提现方式名称
					Account_Name:'',//户名
					Account_Val:'',//账号
					Bank_Position:'',//开户行
				},

			};
		},
		onLoad() {

		},
		onShow() {
			//获取商城提现方式
			this.getShopWithdrawMethod();
		},
		methods:{
			//新增提现方式
			addInfo(){
				let data={};
				if(this.data.Method_Type=="bank_card"){
					data={
						Method_ID:this.data.Method_ID,//提现方式类型
						//Method_Name:this.data.Method_Name,//提现方式名称
						Account_Name:this.data.Account_Name,//户名
						Account_Val:this.data.Account_Val,//账号
						Bank_Position:this.data.Bank_Position //开户行
					}
				}else if(this.data.Method_Type=="alipay"){
					data={
						Method_ID:this.data.Method_ID,//提现方式类型
						//Method_Name:this.data.Method_Name,//提现方式名称
						Account_Name:this.data.Account_Name,//户名
						Account_Val:this.data.Account_Val//账号
					}
				}else{
					data={
						Method_ID:this.data.Method_ID,//提现方式类型
						//Method_Name:this.data.Method_Name//提现方式名称
					}
				}
				let that=this;
				addUserWithdrawMethod(data).then(res=>{
						let User_Method_ID=res.data.User_Method_ID;
						uni.showModal({
						    title: res.msg,
							confirmText:'提现方式',
							cancelText:'立即提现',
							cancelColor:'#000000',
							confirmColor:"#000000",
						    content: '',
						    success: function (res) {
						        if (res.confirm) {
						           // uni.navigateTo({
						           // 	url:'../withdrawalMethod/withdrawalMethod?User_Method_ID='+User_Method_ID
						           // })
								   that.$vm.$emit('fir',User_Method_ID)
								   //返回上一页
								   uni.navigateBack({
								     delta: 1
								   });
						        } else if (res.cancel) {
						            uni.navigateTo({
						            	url:'../withdrawal/withdrawal?User_Method_ID='+User_Method_ID
						            })
						        }
						    }
						});
				},err=>{

				}).catch(e=>{
					console.log(e)
				})
			},
			//获取商城提现方式
			getShopWithdrawMethod(){
				getShopWithdrawMethod().then(res=>{
					if(res.errorCode==0){
						this.array=res.data;
						//初始化第一个提现类型默认选择的
						this.data.Method_Type=this.array[0].Method_Type;
						this.data.Method_Name=this.array[0].Method_Name;
						this.data.Method_ID=this.array[0].Method_ID;


					}
				}).catch(err=>{
					console.log(err);
				})
			},
			bindPickerChange(e){
				 this.index = e.target.value;
				 this.data.Method_Type=this.array[this.index].Method_Type;
				 this.data.Method_Name=this.array[this.index].Method_Name;
				this.data.Method_ID=this.array[0].Method_ID;
			}
		}
	}
</script>

<style lang="scss" scoped>
.center{
	margin-top: 19rpx;
	width: 710rpx;
	height: 88rpx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid #E3E3E3;
	justify-content: space-between;
	.left{
		font-size: 28rpx;
		color: #333333;
		width: 125rpx;
	}
	.right{
		font-size: 26rpx;
		color: #888888;
		display: flex;
		align-items: center;
		image{
			width: 15rpx;
			height: 23rpx;
			margin-left: 14rpx;
		}
	}
}
.centers{
	margin-top: 19rpx;
	width: 710rpx;
	height: 88rpx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid #E3E3E3;
	position:relative;
	.left{
		width: 125rpx;
		font-size: 28rpx;
		color: #333333;
	}
	input{
		width: 570rpx;
		color: #333333;
		font-size: 24rpx;
	}
}
.places{
	color: #B8B8B8;
	font-size: 24rpx;
}
.addInfo{
	width:580rpx;
	height:76rpx;
	line-height: 76rpx;
	margin: 0 auto;
	background:rgba(244,49,49,1);
	border-radius:10rpx;
	margin-top: 124rpx;
	font-size: 32rpx;
	color: #FFFFFF;
	text-align: center;
}
</style>
