<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<!-- <page-title title="会员充值"></page-title> -->
		<view class="yue">
			<image src="/static/blance/recharge.jpg" ></image>
			<view class="yueq">
				余额
			</view>
			<view class="pricsw">
				{{info.User_Money}}
			</view>
		</view>

		<input  class="inputs" @input="changeNun" type="number" step="2" placeholder="请输入充值金额">
		<view class="line"></view>
		<view class="payMethod">
			支付方式
		</view>

		<view class="selectq" v-for="(channel,idx) in payChannelList" @click="payChannel=idx">
			<view>
				{{channel}}
			</view>
			<view class="radio">
				<view class="el-radio" :class="{check:payChannel===idx}"></view>
			</view>
		</view>
		<view class="queren" @click="sub">
			确认
		</view>
	</view>
</template>

<script>
import {get_user_info} from "../../common/fetch";
import {mapGetters} from 'vuex';
import {error} from "../../common";
export default {
	data() {
		return {
			info:{},
			num:null,
			payChannel:null,
		};
	},
	onShow(){
		get_user_info().then(res=>{
			this.info = res.data
		},err=>{}).catch()
	},
	computed:{
		payChannelList(){
			let obj = {};

			if(!this.initData || !this.initData.pay_arr)return arr;
			for(var i in this.initData.pay_arr){
				if(i!='remainder_pay'){
					//默认第一个
					if(!this.payChannel)this.payChannel = i
					obj[i] = this.initData.pay_arr[i]
				}
			}
			console.log(obj)
			// arr = this.initData.pay_arr.map((item,idx)=>{
			// 	if(idx!='remainder_pay')return item
			// })
			return obj
		},
		...mapGetters(['initData'])
	},
	methods:{
		changeNun(e){

			this.num = e.detail.value
		},
		sub(){
			let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
			if (!reg.test(this.num)) {
				error('充值金额最多2位小数')
				this.num = null;
				return
			}

			if(!this.payChannel){
				error('支付渠道必选')
				return;
			}

			//create recharge order

			//redirect to pay page
		}

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
}
.line{
	width:650rpx;
	height:10rpx;
	margin: 0  auto;
	background:rgba(244,244,244,1);
}
.payMethod{
	margin:  58rpx 0rpx 24rpx 51rpx;
	height: 29rpx;
	line-height: 29rpx;
	font-size: 30rpx;
	color: #333333;
	font-weight:bold;
}
.selectq{
	margin: 0 auto;
	width: 650rpx;
	height: 91rpx;
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid  #F4F4F4;
	font-size: 28rpx;
	color: #666666;
	font-weight: 400;
	justify-content: space-between;
}
.radio{
	background-color: #EFEFEF;
	width: 28rpx;
	height: 28rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	.el-radio{
		width:12rpx;
		height:12rpx;
		background:linear-gradient(107deg,rgba(237, 236, 238, 1),rgba(228, 228, 228, 1));
		border-radius:50%;
		&.check{
			background:linear-gradient(107deg,rgba(255,187,170,1),rgba(254,80,37,1));
		}
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
</style>
