<template>
	<view class="all">
		<!-- <page-title title="会员充值"></page-title> -->
		<view class="yue">
			<image class="image" src="https://new401.bafangka.com/static/client/blance/storePay.jpg" ></image>
			<view class="yueq">
				余额
			</view>
			<view class="pricsw">
				{{info.User_Money}}
			</view>
		</view>

		<view class="inputs">
			<image class="image" src="https://new401.bafangka.com/static/client/check/money.png" ></image>
			<input class="input"  type="text" placeholder="请输入消费金额" v-model="money">
		</view>
		<view class="inputs">
			<image class="image" src="https://new401.bafangka.com/static/client/check/password.png" ></image>
			<input class="input" type="password" placeholder="请输入支付密码" v-model="passwd">
		</view>
		<view class="zhu">
			注：若通过注册页面成为会员的用户，原支付密码与登录密码一致；否则，支付密码为“123456”
		</view>
		<view class="queren" @click="confirm">
			确认
		</view>
	</view>
</template>

<script>
	import {storeConsume,get_user_info} from '../../common/fetch.js';

	export default {
		data() {
			return {
				info: {},
				passwd: '',
				money: '',
				isClicked: false
			};
		},
		methods: {
			confirm(){
				if(this.isClicked) {return};
				this.isClicked = true;
				if(this.passwd == '') {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					});
					this.isClicked = false;
					return;
				}
				if(this.money == '' || isNaN(this.money) || this.money < 0) {
					uni.showToast({
						title: '输入金额有误',
						icon: 'none'
					});
					this.isClicked = false;
					return;
				}
				storeConsume({
					passwd: this.passwd,
					money: this.money
				}).then(res=>{
					uni.showToast({
						title: res.msg,
						duration: 1500
					});
					setTimeout(()=>{
						this.isClicked = false;
						uni.navigateBack({
							delta: 1
						})
					},1500)
				},err=>{
					this.isClicked = false;
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				})
			}
		},
		onShow(){
			get_user_info().then(res=>{
				this.info = res.data
			},err=>{}).catch()
		}
	}
</script>

<style lang="scss" scoped>
.all{
	box-sizing: border-box;
}
.yue{
	width: 650rpx;
	height: 300rpx;
	margin: 0 auto;
	margin-top: 44rpx;
	position: relative;
	.image{
		width: 100%;
		height: 100%;
	}
	.yueq{
		position: absolute;
		top: 83rpx;
		left: 49rpx;
		font-size: 28rpx;
		height: 27rpx;
		line-height: 27rpx;
		color: #FFFFFF;
	}
	.pricsw{
		position: absolute;
		top: 144rpx;
		left: 49rpx;
		font-size: 60rpx;
		height: 46rpx;
		line-height: 46rpx;
		font-weight:400;
		color: #FFFFFF;
	}
}
.inputs{
	margin-top: 40rpx;
	height: 101rpx;
	margin-left: 52rpx;
	margin-right: 52rpx;
	width: 646rpx;
	font-size: 28rpx;
	border-bottom: 2rpx solid #F4F4F4;
	display: flex;
	align-items: center;

	.image{
		width: 34rpx;
		height: 40rpx;
	}
	.input{
		margin-left: 19rpx;
		width: 100%;
		height: 101rpx;
		line-height: 101rpx;
	}
}


.queren{
	width:648rpx;
	height:84rpx;
	line-height: 84rpx;
	text-align: center;
	background:linear-gradient(107deg,rgba(255,92,51,1),rgba(255,182,81,1));
	box-shadow:0px 6rpx 14rpx 0px rgba(255, 51, 92, 0.35);
	border-radius:20rpx;
	margin: 0 auto;
	margin-top: 147rpx;
	font-size: 28rpx;
	color: #FFFFFF;
	font-weight:400;
}
.zhu{
	margin: 0  auto;
	margin-top: 28rpx;
	width:645rpx;
	font-size:22rpx;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:36rpx;
}
</style>
