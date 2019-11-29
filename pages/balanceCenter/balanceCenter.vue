<template>
	<view class="boxSizing">
		<view class="zhezhao" v-if="isShow">
			<view class="zhezhaoView">
				<image :src="'/static/client/check/close.png'|domain" class="closeZ" @click="isShow=false"></image>
				<view class="zhezhaoYue">
					余额互转
				</view>
				<form  report-submit @submit="confirm">
					<view class="zhezhaoCenter">
						<view class="views">
							<image class="imgs" :src="'/static/client/check/phone.png'|domain"></image>
							<input class="inputs" type="text" placeholder="请输入对方会员号" v-model="user_no">
						</view>
					</view>
					<view class="zhezhaoCenter">
						<view class="views">
							<image class="imgs" :src="'/static/client/check/money.png'|domain"></image>
							<input class="inputs" type="text" placeholder="请输入转出金额" v-model="money">
						</view>
					</view>
					<button formType="submit" class="zheButton">
						确认转出
					</button>
				</form>

			</view>

		</view>


		<view class="top">

			<image  class="bgImg" :src="'/static/client/blance/bg.jpg'|domain" ></image>
			<!-- <image class="back" @click="goBack" :src="'/static/client/check/left.png'|domain"></image>
			<view class="titleq">
				余额中心
			</view> -->

			<view class="dangqian">
				当前余额（元）
			</view>
			<view class="prices">
				{{Money}}
			</view>
			<view class="zhuanchu" @click="isShow=true">
				转出
			</view>
			<view class="bottoms">
				<view class="lefts qwe" @click="goRecharge">
					<image :src="'/static/client/check/t1.png'|domain" ></image>
					<text>余额充值</text>
				</view>
				<view class="line">
				</view>
				<view class="rights qwe" @click="goFacePay">
					<image :src="'/static/client/check/t2.png'|domain" ></image>
					<text>实体消费</text>
				</view>
			</view>
		</view>

		<view class="selects">
			<view class="qwes" @click="current='charge'" :class="{checked:current=='charge'}">
				充值记录
			</view>
			<view class="qwes" @click="current='money'"  :class="{checked:current=='money'}">
				资金流水
			</view>
		</view>

		<view class="contents" v-show="current=='charge'">
			<view class="mingxi" v-for="(item,idx) in charge_records">
				<view>
					充值{{item.Amount}} <text v-if="item.present > 0">,系统赠送您{{item.present}}</text>
					<text style="float: right;margin-top: 15rpx;">{{item.Status_desc}}</text>
				</view>
				<view class="times">
					{{item.CreateTime}}
				</view>
			</view>
		</view>
		<view class="contents"  v-show="current=='money'">
			<view class="mingxi" v-for="(item,idx) in records">
				<view class="note">
					{{item.Note}}
				</view>
				<view class="times">
					{{item.CreateTime}}
				</view>
<!--				<view>-->
<!--					{{item.Note}}-->
<!--				</view>-->
			</view>
		</view>
	</view>
</template>

<script>
	// import TweenLite from 'gsap'
	import "../../common/tool/TweenMax.min.js"
	import {pageMixin} from "../../common/mixin";
	import {
		get_user_info,
		getUserMoneyRecord,
		getUserChargeRecord,
		transferBalance,
		add_template_code
	} from "../../common/fetch";
	import {mapActions} from 'vuex';
	export default {
		mixins:[pageMixin],
		data() {
			return {
				isShow:false,
				info:{},
				current:'charge',
				charge_records:[],
				records:[],
				user_no: '', //会员号
				money: '', // 转出金额
				chargePage: 1, // 充值记录分页
				moneyPage: 1,  // 资金流水分页
				pageSize: 10,
				moneyMore: false,  //资金流水是否还有更多
				chargeMore: false  ,// 充值记录是否还有更多
				Umoney: 0,
				s_money: 0
			};
		},
		computed: {
			Money: function(){
				return Number(this.Umoney).toFixed(2)
			}
		},
		watch: {
			s_money: function(newVal, oldVal){
					var newValue = parseInt(newVal)
				console.log(newValue)
					TweenLite.to(this.$data, 0.5, {Umoney: newValue})
			}
		},
		methods:{
			...mapActions(['setUserInfo']),
			goFacePay(){
				uni.navigateTo({
					url:'/pages/storePay/storePay'
				})
			},
			goBack(){
			    uni.navigateBack(1);
			},
			goRecharge(){
				uni.navigateTo({
					url:'/pages/vipRecharge/vipRecharge'
				})
			},
			confirm(e){


				console.log(e)
				add_template_code({
					code: e.detail.formId,
					times: 1
				})

				if(this.money == '' || isNaN(this.money) || (this.money<0)) {
					uni.showToast({
						title: '输入金额有误',
						icon: 'none'
					});
					return;
				}
				if(this.user_no == '') {
					uni.showToast({
						title: '转出会员号不能为空',
						icon: 'none'
					});
					return;
				}
				transferBalance({
					money: this.money,
					user_no: this.user_no
				}).then(res=>{
					uni.showToast({
						title: res.msg,
						duration:1500
					});
					this.setUserInfo({});
					setTimeout(()=>{
						// 重新获取积分信息
						get_user_info().then(res=>{
							this.info=res.data;
							this.s_money = res.data.User_Money;
							// 更新用户信息
							this.setUserInfo(res.data);
						});
					},1500)
				},err=>{
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				});
				this.isShow = false;
			},
			get_user_money_record(){
				getUserMoneyRecord({
					page: this.moneyPage,
					pageSize: this.pageSize
				}).then(res=>{
					if(this.moneyPage != 1) {
						let old = this.records;
						this.records = old.concat(res.data);
					}else {
						this.records = res.data;
					}
					if(this.records.length < res.totalCount) {
						this.moneyMore = true;
					}
				}).catch()
			},
			get_user_charge_record(){
				getUserChargeRecord({
					page: this.chargePage,
					pageSize: this.pageSize
				}).then(res=>{
					if(this.chargePage != 1) {
						let old = this.charge_records;
						this.charge_records = old.concat(res.data);
					}else {
						this.charge_records = res.data;
					}
					if(this.charge_records.length > res.totalCount) {
						this.chargeMore = true;
					}
				}).catch()
			},
			// 重置
			reset(){
				this.chargePage = 1;
				this.moneyPage = 1;
				// this.charge_records = [];
				// this.records = [];
				this.moneyMore = false;
				this.chargeMore = false;
			}
		},
		onReachBottom() {
			if(this.current=='charge') {
				// 充值记录
				if(this.chargeMore) {
					this.chargePage += 1;
					this.get_user_charge_record();
				}
			}else if(this.current = 'money') {
				// 资金流水
				if(this.moneyMore) {
					this.moneyPage += 1;
					this.get_user_money_record();
				}
			}
		},
		onLoad(){

			this.$fun.checkIsLogin(1);

		},
		onShow(){


			this.reset();
			get_user_info().then(res=>{
				this.info = res.data
				this.s_money = res.data.User_Money;
			},err=>{}).catch()
			this.get_user_money_record();
			this.get_user_charge_record();

		}
	}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.boxSizing{
	/*background-color: #FFFFFF;*/
	background: #F8F8F8;
	height: 100vh;
	width: 750rpx;
	overflow-x: hidden;
}
	.top{
		width: 750rpx;
		height: 537rpx;
		position: relative;
		background-color: #FFFFFF;
		.bgImg{
			margin-top: -50rpx;
			width: 114%;
			height: 100%;
		}
		.bottoms{
			width: 690rpx;
			height: 133rpx;
			background-color: #fff;
			position: absolute;
			box-shadow:0px 8px 64px 0px rgba(4,0,0,0.14);
			border-radius:132px;
			bottom: 68rpx;
			left: 30rpx;
			display: flex;
			align-items: center;
			padding: 38rpx 40rpx 37rpx 40rpx;
			image{
				width: 58rpx;
				height: 58rpx;
			}
			.line{
				width:2rpx;
				height:50rpx;
				/*background: red;*/
				margin: 0 20rpx;
				/*flex: 1;*/
				background:rgba(240,239,240,1);
			}
			.qwe{

				flex:1;
				text-align: left;
				height: 58rpx;
				line-height: 58rpx;
				font-size: 34rpx;
				color: #4C4C4C;
				display: flex;
				align-items: center;
				&.lefts{

				}
				text{
					margin-left: 20rpx;
				}
			}

		}

		.back{
			width: 21rpx;
			height: 38rpx;
			position: absolute;
			left: 24rpx;
			top: 25rpx;
			/* #ifdef APP-PLUS */
			margin-top: var(--status-bar-height);
			/* #endif */
		}
		.titleq{
			font-size: 36rpx;
			height: 34rpx;
			line-height: 34rpx;
			color: #FFFFFF;
			position: absolute;
			left: 70rpx;
			top: 25rpx;
			/* #ifdef APP-PLUS */
			margin-top: var(--status-bar-height);
			/* #endif */
		}
		.dangqian{
			font-size: 28rpx;
			color: #FFFFFF;
			height: 28rpx;
			line-height: 28rpx;
			position: absolute;
			left:39rpx ;
			top: 110rpx;
			/* #ifdef APP-PLUS */
			// margin-top: var(--status-bar-height);
			/* #endif */
		}
		.prices{
			font-family: Arial;
			font-size: 80rpx;
			height: 61rpx;
			line-height: 61rpx;
			position: absolute;
			left: 39rpx;
			top: 175rpx;
			color: #FFFFFF;
			font-weight: 200;
			/* #ifdef APP-PLUS */
			// margin-top: var(--status-bar-height);
			/* #endif */
		}
		.zhuanchu{
			width: 170rpx;
			height: 74rpx;
			line-height: 74rpx;
			text-align: center;
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: bold;
			background-color: #ff9175;
			border-radius: 16rpx;
			position: absolute;
			top: 130rpx;
			right: 24rpx;
		}


	}

	.selects{
		height: 110rpx;
		width: 750rpx;
		background-color: #FFFFFF;
		display: flex;
		.qwes{
			width: 375rpx;
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;
			font-size: 32rpx;
			color: #666666;
			position: relative;
		}
		.checked{
			color: #FF5C33;
			&:after{
				content: '';
				display: block;
				width: 145rpx;
				height: 4rpx;
				background-color: #FF5C33;
				position: absolute;
				bottom: 0rpx;
				left: 50%;
				margin-left: -73rpx;
			}
		}
	}

	.contents{
		width: 750rpx;
		padding:17rpx 26rpx 32rpx 24rpx ;
		background-color: #F8F8F8;
		.mingxi{
			/*height: 115rpx;*/
			width: 700rpx;
			padding: 20rpx 0;
			border-bottom: 1rpx solid  #EAEAEA;
			/*display: flex;*/
			/*justify-content: space-between;*/
			align-items: center;
			font-size: 28rpx;
			color: #333333;
			&:first-child{
				padding-top: 0;
			}
			.note{
				color: #555;
			}
			.times{
				color: #999999;
				font-size: 20rpx;
				height: 20rpx;
				line-height: 24rpx;
				margin-top: 8rpx;
				margin-left: 4rpx;
			}
		}
	}



.zhezhao{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	z-index: 9999;
	background-color: rgba($color: #000000, $alpha: .3);
	.zhezhaoView{
		background:rgba(255,255,255,1);
		border-radius:20px;
		width: 503rpx;
		height: 564rpx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 123rpx;
	}
	.closeZ{
		width: 47rpx;
		height: 47rpx;
		position: absolute;
		bottom: -100rpx;
		transform: translateX(-50%);
		left: 50%;
	}
	.zhezhaoYue{
		height: 157rpx;
		width: 503rpx;
		font-size: 32rpx;
		color: #333333;
		text-align: center;
		line-height: 157rpx;
	}
	.zhezhaoCenter{
		width: 100%;
		margin-top: 13rpx;
		padding: 0rpx 52rpx;
		.views{
			height: 90rpx;
			display: flex;
			align-items: center;
			.inputs{
				border-bottom: 1rpx solid #F4F4F4;
				font-size: 24rpx;
				margin-left: 16rpx;
			}
		}
		.imgs{
			width: 25rpx;
			height: 37rpx;
		}
	}
	.zheButton{
		width:400rpx;
		height:76rpx;
		line-height: 76rpx;
		background:rgba(255,92,51,1);
		border-radius:60rpx;
		text-align: center;
		margin-top: 40rpx;
		margin-left: 52rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
}
</style>
