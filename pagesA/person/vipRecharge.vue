<template>
	<view @click="commonClick" class="all">
		<!-- <page-title title="会员充值"></page-title> -->
		<view class="yue">
			<image class="yue-image" :src="'/static/client/blance/recharge.jpg'|domain" ></image>
			<view class="yueq">
				余额
			</view>
			<view class="pricsw">
				{{info.User_Money}}
			</view>
		</view>

		<input  class="inputs" v-model="money" type="digit" placeholder="请输入充值金额">
		<view class="line"></view>
		<view class="payMethod">
			支付方式
		</view>

		<view class="selectq" v-for="(channel,idx) in payChannelList" @click="changeChannelIdx(idx)">
			<view>
				{{channel}}
			</view>
			<view class="radio">
				<view class="el-radio" :class="{check:payChannel==idx}"></view>
			</view>
		</view>
		<div style="height: 10px"></div>
		<view class="youhui" v-for="(item,index) of pro.gives " :key="index">
			{{index+1}}、充值满{{item.deposit_money}}赠送<text class="youhui-text">{{item.present_money}}</text>余额
		</view>
		<view class="queren" @click="confirm">
			确认
		</view>
	</view>
</template>

<script>
import {get_user_info ,depositBalance,add_template_code,getBalance,traslateShorten} from "../../common/fetch";
import {mapGetters,mapActions} from 'vuex';
import {error,toast} from "../../common";
import {unipayFunc} from '../../common/pay.js'
import {
		ls,
		GetQueryByString,
		isWeiXin,
		urlencode
	} from "../../common/tool";
import {pageMixin} from "../../common/mixin";

export default {
	mixins:[pageMixin],
	data() {
		return {
			info:{},
			payChannel:'',
			money: '',
			pro:[],
			pay_type: ''
		};
	},
	onShow(){
		if(!this.$fun.checkIsLogin(1))return;
		this.getBalance();
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
					// if(!this.payChannel)this.payChannel = i
					obj[i] = this.initData.pay_arr[i]
				}
			}
			return obj
		},
		...mapGetters(['initData'])
	},
	created(){

		//设置第一个为选中
		if(this.initData && this.initData.pay_arr){
			for(var i in this.initData.pay_arr){
				if(i!='remainder_pay'){
					//默认第一个
					if(!this.payChannel)this.payChannel = i
				}
			}
		}

        // #ifdef H5
        if (isWeiXin()) {
            this.code = GetQueryByString(location.href, 'code');

            if (this.code) {

            	if(ls.get('recharge_money')){
            		this.money = ls.get('recharge_money')
				}
            	this.payChannel = 'wx_mp';
                this.pay_type = 'wx_mp';//需要手动设置一下
                // ls.set('code',this.code)
                this.sub(1);
            }
        }
        // #endif
    },
	methods:{
		changeChannelIdx(idx){
			this.payChannel = idx
		},
		 ...mapActions(['getInitData']),
		getBalance(){
			getBalance().then(res=>{
				this.pro=res.data;
			}).catch(e=>{
			})
		},
		confirm(){
			this.sub();
		},
		async	sub(is_forword){
			let _self = this;
			let payConf = {};
			if(!is_forword) {
				if(!this.money) {
					error('充值金额不能为空');
					return;
				}
				let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
				if (!reg.test(this.money)) {
					error('充值金额最多2位小数')
					this.money = null;
					return
				}
				ls.set('recharge_money',this.money);
				if(!this.payChannel){
					error('支付渠道必选')
					return;
				}

				payConf = {
					pay_type: this.payChannel,
					money: this.money || ls.get('recharge_money')
				};
			}
			this.pay_type = this.payChannel;
			payConf = {
				pay_type: this.payChannel,
				money: this.money || ls.get('recharge_money')
			};
			if(this.pay_type === 'unionpay'){
				error('即将上线')
				return;
			}

			if(this.pay_type === 'ali_app'){



			}

			//下面都是微信

			//需要格外有一个code

			// #ifdef H5

			// 微信h5
			if(this.pay_type === 'wx_h5'){
				payConf.pay_type = 'wx_h5';
			}

			//阿里h5
			if(this.pay_type === 'alipay'){

				payConf.pay_type = 'alipay';
			}

			//公众号需要code
			if(this.pay_type === 'wx_mp'){

				if (!isWeiXin()) {
					this.$error('请在微信内打开')
					return;
				}
				let isHasCode = this.code || GetQueryByString('code');

				if (isHasCode) {
					// payConf.code = isHasCode;
					//拿到之前的配置
					payConf = { ...ls.get('temp_order_info'),
						code: isHasCode,
						pay_type: 'wx_mp'
					}

				} else {
					//存上临时的数据
					ls.set('temp_order_info', payConf);
					//去掉转吧
					this.$_init_wxpay_env();
					return;
				}
			}



			// #endif

			// #ifdef MP-TOUTIAO

			// #endif

			// #ifdef MP-WEIXIN

			payConf.pay_type = 'wx_lp';

			await new Promise((resolve) => {
				uni.login({
					success: function (loginRes) {
						payConf.code = loginRes.code
						resolve()
					}
				});
			})
			// #endif

			let that = this;
			depositBalance(payConf,{tip:'正在加载中',mask:true}).then(res => {

				unipayFunc(this,this.pay_type,res);
				return;

			},err=>{
				uni.showModal({
					title:'提示',
					content:'获取支付参数失败:'+err.msg
				})
			}).catch(e=>{

			})
			//create recharge order

			//redirect to pay page
		},
		async $_init_wxpay_env() {

			let initData = await this.getInitData()

			let login_methods = initData.login_methods;
			let component_appid = login_methods.component_appid

			let channel = null;

			//根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
			//而且状态可以灵活控制 state为1
			for (var i in login_methods) {
				// && login_methods[i].state ??状态呢？
				if (i != 'component_appid' && login_methods[i].state) {
					channel = ['wx_mp'].indexOf(login_methods[i].type) === -1 ? { ...login_methods[i]
					} : { ...login_methods[i],
						component_appid
					};
					break;
				}
			}

			if (!channel) {
				this.$error('未开通公众号支付');
				return false;
			}


			//如果url有code去掉
			let {
				origin,
				pathname,
				search,
				hash
			} = window.location;
			let strArr = []
			if (search.indexOf('code') != -1) {
				let tempArr = search.split('&');
				for (var i in tempArr) {

					if (i.indexOf('code') === -1) {
						strArr.push(tempArr[i])
					}
				}

				let newSearchStr = strArr.join('&');

				if (newSearchStr.indexOf('?') === -1) {
					newSearchStr = '?' + newSearchStr
				}

				search = newSearchStr;

			}


			let REDIRECT_URI = urlencode(origin + pathname + search + hash);

			let wxAuthUrl = null;

			if (channel.component_appid) {
				//服务商模式登录
				wxAuthUrl =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=${channel.component_appid}#wechat_redirect`;
			} else {
				//公众号自己的appid用于登录
				wxAuthUrl =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
			}

			window.location.href = wxAuthUrl;

		},
		payFailCall(){
		 	if(ls.get('money')) {
		 		this.money = ls.get('recharge_money')
			};
			uni.showToast({
				title: '支付失败',
				icon: 'none',
				duration: 2000
			});
		},
		paySuccessCall(){
			let _self = this;

			//微信小程序下需要模板消息
			// #ifdef MP-WEIXIN
			// const initData = this.initData
			// if(initData.hasOwnProperty('lp_template') && initData.lp_template){
			// 	let lp_template = initData.lp_template
			// 	let tmplIds = lp_template.charge_pay
			// 	//调就是了，是否成功都可以

			// 	wx.requestSubscribeMessage({tmplIds})
			// }
			// #endif

			uni.showToast({
				title: '支付成功'
			});
			uni.navigateTo({
				url:'/pagesA/person/balanceCenter'
			});
			return;
		},
	}
}
</script>

<style lang="scss" scoped>
.all{
	box-sizing: border-box;
	min-height: 100vh;
	background-color: #FFFFFF !important;
}
.yue{
	width: 650rpx;
	height: 300rpx;
	margin: 0 auto;
	padding-top: 44rpx;
	position: relative;
	.yue-image{
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
	padding-top: 20rpx;
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
.youhui{
	width: 650rpx;
	margin: 0 auto;
	font-size: 25rpx;
	line-height: 40rpx;
	color: #999999;
	.youhui-text{
		color: red;
	}
}
</style>
