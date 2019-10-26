<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<!-- <page-title title="会员充值"></page-title> -->
		<view class="yue">
			<image src="/static/blance/storePay.jpg" ></image>
			<view class="yueq">
				余额
			</view>
			<view class="pricsw">
				7000.00
			</view>
		</view>

		<view class="inputs">
			<image src="/static/check/money.png" ></image>
			<input  type="text" placeholder="请输入充值金额">
		</view>
		<view class="inputs">
			<image src="/static/check/password.png" ></image>
			<input  type="password" placeholder="请输入支付密码">
		</view>
		<view class="zhu">
			注：若通过注册页面成为会员的用户，原支付密码与登录密码一致；否则，支付密码为“123456”
		</view>
		<view class="queren">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.yue{
	width: 650rpx;
	height: 300rpx;
	margin: 0 auto;
	margin-top: 44rpx;
	position: relative;
	image{
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

	image{
		width: 34rpx;
		height: 40rpx;
	}
	input{
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
