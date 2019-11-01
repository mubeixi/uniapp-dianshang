<template>
	<view class="all">
		<!-- <page-title title="会员充值"></page-title> -->
		<view class="yue">
			<image class="yue-image" src="https://new401.bafangka.com/static/client/blance/recharge.jpg" ></image>
			<view class="yueq">
				余额
			</view>
			<view class="pricsw">
				{{info.User_Money}}
			</view>
		</view>

		<input  class="inputs" @input="changeNun" v-model="money" type="number" step="2" placeholder="请输入充值金额">
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
		<view class="youhui" v-for="(item,index) of pro.gives " :key="index">
			{{index+1}}、充值满{{item.deposit_money}}赠送<text class="youhui-text">{{item.present_money}}</text>余额
		</view>
		<view class="queren" @click="sub">
			确认
		</view>
	</view>
</template>

<script>
import {get_user_info ,depositBalance,add_template_code,getBalance,traslateShorten} from "../../common/fetch";
import {mapGetters} from 'vuex';
import {error,toast} from "../../common";
import {
		ls,
		GetQueryByString,
		isWeiXin,
		urlencode
	} from "../../common/tool";

export default {
	data() {
		return {
			info:{},
			num:null,
			payChannel:null,
			money: '',
			pro:[],
			pay_type: ''
		};
	},
	onShow(){
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
		getBalance(){
			getBalance().then(res=>{
				this.pro=res.data;
			},err=>{}).catch(e=>{
				console.log(e)
			})
		},
		changeNun(e){

			this.num = e.detail.value
		},
		async	sub(){
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
			console.log(this.payChannel)

			let _self = this;
			let payConf = {};
			payConf = {
				pay_type: this.payChannel,
				money: this.money
			};
			this.pay_type = this.payChannel;
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

				console.log('选择了微信支付的')

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
			console.log(payConf)
			await new Promise((resolve) => {
				uni.login({
					success: function (loginRes) {
						console.log(loginRes);
						payConf.code = loginRes.code
						resolve()
					}
				});
			})
			// #endif


			console.log('payConf',payConf)
			let that = this;
			depositBalance(payConf).then(res => {

				console.log(this);
				// #ifdef APP-PLUS


				if(this.pay_type === 'ali_app'){

					let provider = 'alipay';
					let orderInfo = res.data.arg;
					console.log('支付宝参数',orderInfo)

					uni.requestPayment({
						provider,
						orderInfo, //微信、支付宝订单数据
						success: function (res) {
							_self.paySuccessCall(res)
							console.log('success:' + JSON.stringify(res));
						},
						fail: function (err) {
							console.log('fail:' + JSON.stringify(err));
							uni.showModal({
								title:'支付错误',
								content:JSON.stringify(err)
							})
						}
					});

					return;

				}
				// #endif


				// #ifdef H5

				// 微信h5
				if(this.pay_type === 'wx_h5'){

					let redirect_url = res.data.mweb_url+'&redirect_url='+urlencode(location.origin+'/fre/pages/order/order?index=2');
					location.href = redirect_url;
					return;
				}
				console.log(this.pay_type);
				//阿里h5
				if(this.pay_type === 'alipay'){
					console.log('result')
					//公众号麻烦一点
                    if(isWeiXin()){

                        let users_id = ls.get('users_id');

                        let fromurl = res.data.arg;//encodeURIComponent(res.data.arg);

                        //字符串
                        let nocestr = ''
                        traslateShorten({data:fromurl}).then(res=>{

                            nocestr = res.data.key;
                            // uni.navigateTo({
                            //     url:`/pages/pay/wx/wx?users_id=${users_id}&nocestr=`+nocestr
                            // })

                            let str = `/fre/pages/pay/wx/wx?users_id=${users_id}&nocestr=`+nocestr

                            let url = location.origin + str;

                            //强制页面刷新
                            location.href = url;

                        },err=>{
                            error('获取支付宝支付参数失败');

                        })
                        //let origin = location.origin;

                        // fromurl = fromurl.replace(/openapi.alipay.com/,'wangjing666')
                        //
                        //
                        // let str = `/fre/pages/pay/wx/wx?users_id=${users_id}&formurl=`+encodeURIComponent(fromurl);
                        // let url = location.origin + str;
                        // console.log(url)
                        //
                        // this.aliPayUrl = url;
                        //location.href = url;

                        // uni.navigateTo({
                        //     url:`/pages/pay/wx/wx?users_id=${users_id}&formurl=`+encodeURIComponent(fromurl)
                        // })

                    }else{
                        document.write(res.data.arg)
                        document.getElementById('alipaysubmit').submit()
                    }

                    return;

				}


				let {
					timestamp,
					nonceStr,
					signType,
					paySign
				} = res.data;

				//直接支付
				_self.WX_JSSDK_INIT(_self).then((wxEnv) => {

					//关键字？？package
					wxEnv.chooseWXPay({
						timestamp,
						nonceStr,
						package: res.data.package,
						signType,
						paySign,
						success: function(res) {
							// 支付成功后的回调函数
							_self.paySuccessCall(res)
						}
					});

				}).catch((e) => {
					console.log('支付失败')
				})

				return;

				// #endif


				let provider = 'wxpay';
				let orderInfo = {}

				// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-ALIPAY


				// #endif

				// #ifdef MP-TOUTIAO

				provider = 'wxpay';
				orderInfo = res.data
				orderInfo.out_order_no = (orderInfo.Order_ID+'')
				orderInfo.timestamp +='';//string
				orderInfo.uid += '';
				orderInfo.trade_time +='';
				orderInfo.valid_time +='';

				//
				//orderInfo.risk_info = JSON.stringify({ip: '127.0.0.1', device_id: '485737374363263'});
				//
				//
				// orderInfo.params = ''
				// orderInfo.pay_type = ''
				// orderInfo.pay_channel = ''
				// orderInfo.method = ''
				// orderInfo.trade_no = ''


				delete orderInfo.Order_ID

				//固定值：1（拉起小程序收银台）开发者如果不希望使用头条小程序收银台，service设置为3/4时，可以直接拉起微信/支付宝进行支付：service=3： 微信API支付，不拉起小程序收银台；service=4： 支付宝API支付，不拉起小程序收银台。其中service=3、4，仅在1.35.0.1+基础库(头条743+)支持
				//console.log(orderInfo)



				uni.requestPayment({
					provider,

					service:1,//
					orderInfo, //微信、支付宝订单数据
					success: function (res) {
						_self.paySuccessCall(res)
						console.log('success:' + JSON.stringify(res));
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						uni.showModal({
							title:'支付错误',
							content:JSON.stringify(err)
						})
					}
				});
				// #endif

				// #ifdef MP-WEIXIN

				provider = 'wxpay';
				orderInfo = res.data
				delete orderInfo.timestamp

				console.log(provider,orderInfo,'支付数据222222222222222222');
				let prepay_id = orderInfo.package.split('=')[1];
				uni.requestPayment({
				...orderInfo,
					provider,
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
						add_template_code({
							code: prepay_id,
							times: 3
						})
						_self.paySuccessCall(res)
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						_self.payFailCall(err);
					}
				});
				// #endif

				// #ifdef APP-PLUS
				provider = 'wxpay';
				orderInfo = res.data
				console.log(provider,orderInfo,'支付数据222222222222222222');

				uni.requestPayment({
					provider,
					orderInfo, //微信、支付宝订单数据
					success: function (res) {
						_self.paySuccessCall(res)
						console.log('success:' + JSON.stringify(res));
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						_self.payFailCall(err);
					}
				});
				// #endif

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
				if (newSearchStr.idnexOf('?') === -1) {
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
			uni.showToast({
				title: '支付失败',
				icon: 'none',
				duration: 2000
			});
		},
		paySuccessCall(){

			let _self = this;
			uni.showToast({
				title: '支付成功'
			})
		},

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
	margin-bottom: 20rpx;
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
