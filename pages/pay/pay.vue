<template>
	<div>
		<div class="zhezhao" v-if="password_input">
			<div class="input-wrap">
				<div>请输入余额支付密码</div>
				<input type="password" class="input" placeholder="请输入密码" @input="user_password">
				<div class="btns">
					<div @click="cancelInput" class="btn">取消</div>
					<div @click="confirmInput" class="btn">确定</div>
				</div>
			</div>
		</div>
		<!-- <page-title title="付款" :rightHidden="true" bgcolor="#ffffff"></page-title> -->
		<div class="state">
			<image class="img" src="https://new401.bafangka.com/static/client/wait.png" />
			<span class="state-desc">等待买家付款</span>
		</div>
		<div class="address">
			<image class="loc_icon" src="https://new401.bafangka.com/static/client/location.png" alt="" />
			<div class="add_msg">
				<div class="name">收货人：{{orderInfo.Address_Name}} <span>{{orderInfo.Address_Mobile}}</span></div>
				<div class="location">收货地址：{{orderInfo.Address_Province_name}}{{orderInfo.Address_City_name}}{{orderInfo.Address_Area_name}}{{orderInfo.Address_Town_name}}</div>
			</div>
		</div>
		<div class="order_msg">
			<div class="biz_msg">
				<image :src="orderInfo.ShopLogo" class="biz_logo" alt="" />
				<span class="biz_name">{{orderInfo.ShopName}}</span>
			</div>
			<div class="pro" v-for="(pro,pro_id) in orderInfo.prod_list" :key="pro_id">
				<image class="pro-img" :src="pro.prod_img" alt="" />
				<div class="pro-msg">
					<div class="pro-name">{{pro.prod_name}}</div>
					<div class="attr" v-if="pro.attr_info"><span>{{pro.attr_info.attr_name}}</span></div>
					<div class="pro-price"><span>￥</span>{{pro.prod_price}} <span class="amount">x<span class="num">{{pro.prod_count}}</span></span></div>
				</div>
			</div>
		</div>

		<div class="other">
			<div class="bd">
				<div class="o_title">
					<span>运费选择</span>
					<span style="text-align:right;" class="c8">
						<span>{{orderInfo.Order_Shipping.Express}}</span>
						<span> {{orderInfo.Order_Shipping.Price > 0 ? (' 运费：' + orderInfo.Order_Shipping.Price) : ' 免运费'}}</span>
					</span>
				</div>
			</div>
		</div>
		<div class="other">
			<div class="bd">
				<div class="o_title">
					<span>优惠券选择</span>
					<span class="c8">{{orderInfo.Coupon_Money}}元优惠券</span>
				</div>
			</div>
		</div>
		<div class="other">
			<div class="bd">
				<div class="o_title">
					<span>积分抵扣</span>
					<span class="c8">{{orderInfo.Integral_Money}}</span>
				</div>
			</div>
		</div>
		<div class="other" v-if="orderInfo.is_use_money && orderInfo.is_use_money == 1">
			<div class="bd">
				<div class="o_title">
					<span>是否使用余额</span>
					<switch :checked="moneyChecked" size='25px' color="#04B600" @change="moneyChange" />
				</div>
				<!-- <div class="o_desc c8">{{orderInfo.Order_Yebc}}</div> -->
				<input type="number" v-if="openMoney" :value="user_money" :disabled="!openMoney" :placeholder="orderInfo.Order_Yebc"
				 @blur="moneyInputHandle" />
			</div>
		</div>
		<div class="other">
			<div class="bd">
				<div class="o_title">
					<span>是否开具发票</span>
					<switch :checked="invoiceChecked" size='25px' color="#04B600" @change="invoiceChange" />
				</div>
				<!-- <div class="o_desc c8">{{orderInfo.Order_InvoiceInfo}}</div> -->
				<input type="text" v-if="openInvoice" :value="invoice_info" :disabled="!openInvoice" :placeholder="orderInfo.Order_InvoiceInfo"
				 @blur="invoiceHandle" />
			</div>
		</div>
		<div class="other">
			<div class="bd">
				<div class="o_title  words">
					<span>买家留言</span>
					<input class="msg c8" :placeholder="orderInfo.Order_Remark" @blur="remarkHandle">
				</div>
			</div>
		</div>
		<div class="total">
			<span>共<span>{{orderInfo.prod_list.length}}</span>件商品</span>
			<span class="mbx">小计：<span class="money moneys">￥</span><span class="money">{{orderInfo.Order_Fyepay}}</span></span>
		</div>
		<div style="height:100px;background:#efefef;"></div>
		<div class="order_total">
			<div class="totalinfo">
				<div class="info">共{{orderInfo.prod_list.length}}件商品 总计：<span class="mbxa">￥<span>{{orderInfo.Order_Fyepay}}</span></span></div>
				<div class="tips">*本次购物一共可获得{{orderInfo.Integral_Get}}积分</div>
			</div>
			<div class="submit" @click="submit">去支付</div>
		</div>
		<pay-components
				ref="payLayer"
				:Order_ID="Order_ID"
				:pay_money="pay_money"
				:use_money="user_money"
				:need_invoice="need_invoice"
				:invoice_info="invoice_info"
				:order_remark="order_remark"
				:paySuccessCall="paySuccessCall"
				:payFailCall = "payFailCall"
		/>

	</div>
</template>

<script>
	import popupLayer from '../../components/popup-layer/popup-layer.vue'
	import PayComponents from '../../components/PayComponents.vue';

	import {
		getAddress,
		createOrderCheck,
		getOrderDetail,
		orderPay,
		get_user_info,
		add_template_code
	} from '../../common/fetch.js';
	import {pageMixin} from "../../common/mixin";
	import {
		ls,
		GetQueryByString,
		isWeiXin,
		urlencode
	} from "../../common/tool";
	import {error, toast} from "../../common";

	export default {
		mixins: [pageMixin],
		components: {
			PayComponents
		},
		data() {
			return {
				code: '',
				JSSDK_INIT: false,
				show: false, // 遮罩层
				wl_show: false, // 物流选择
				postData: {},
				orderInfo: '',
				addressInfo: '',
				Order_ID: 0,
				totalMoney: 0, // 应支付金额
				pay_money: 0, // 开启余额支付，表示余额支付的钱，pay_type 为 remainder_pay ,
				pay_type: 'remainder_pay', // remainder_pay余额支付，余额补差    wechat 微信支付  ali 支付宝支付
				user_pay_password: '', //余额补差，支付密码
				cate: 'method',
				password_input: false,
				openMoney: true, //是否开启了余额功能
				openInvoice: true, // 是否开启了发票
				order_remark: '', // 留言
				need_invoice: 0, // 是否需要发票
				showDirect: false, // 是否直接显示付款方式
				pay_arr: [], // 支付方式
				Order_Type:'',
				user_money: 0,
			}
		},
		onLoad(options) {
			if (options.Order_ID) {
				this.Order_ID = options.Order_ID;
			}
			if(options.pagefrom =='check'){
				this.showDirect = true;
			}
			// 获取支付方式
			this.pay_arr = ls.get('initData').pay_arr;

		},
		filters: {

		},
		onShow() {
			this.getOrderDetail();
			// this.get_user_info();// 获取用于可用余额
		},
		computed: {
			invoiceChecked() {
				return this.openInvoice;
			},
			moneyChecked() {
				return this.openMoney;
			}
		},
		created() {

			// #ifdef H5
			// if (isWeiXin()) {
			// 	this.code = GetQueryByString(location.href, 'code');
			// 	console.log(this.code)
			// 	if (this.code) {
			//
			// 		this.pay_type = 'wx_mp';//需要手动设置一下
			// 		// console.log(this.pay_type)
			// 		// ls.set('code',this.code)
			// 		this.self_orderPay(1);
			// 	}
			// }
			// #endif
		},
		methods: {

			//获取用户支付方式
			chooseType(name) {
				console.log('支付方式',name)
				this.pay_type = name;
				this.$refs.popupLayer.close();
				// 判断是否使用了余额，
				if(this.user_money > 0 || name == 'remainder_pay'){
					// 使用了 余额支付
					this.password_input = true;
				}else {
					// 未使用余额支付, 直接调用
					this.self_orderPay();
				}
			},
			// 订单详情
			getOrderDetail() {

				let _self = this;
				getOrderDetail({
					Order_ID: this.Order_ID,
				}).then(res => {
					console.log(res)
					if (res.errorCode == 0) {
						for (var i in res.data) {
							if (i == 'Order_Shipping') {
								res.data[i] = JSON.parse(res.data[i])
							}
							if (i == 'prod_list') {
								for (var j in res.data[i]) {
									for (var k in res.data[i][j]) {
										if (k == 'attr_info') {
											res.data[i][j][k] = res.data[i][j][k] && JSON.parse(res.data[i][j][k])
										}
									}
								}
							}
						}
						this.Order_Type=res.data.Order_Type;
						this.orderInfo = res.data;
						this.Order_Type = res.data.Order_Type;
						ls.set('type',this.Order_Type);
						// pay_money 应该支付的钱
						// user_money 使用的余额
						this.pay_money = this.orderInfo.Order_Fyepay;
						this.user_money = this.orderInfo.Order_Yebc;
						this.openMoney = this.orderInfo.Order_Yebc > 0;
						this.need_invoice = this.orderInfo.Order_NeedInvoice;
						this.openInvoice = this.orderInfo.Order_NeedInvoice > 0;
						this.invoice_info = this.orderInfo.Order_InvoiceInfo;
						this.order_remark = this.orderInfo.Order_Remark;
						if(this.showDirect && this.orderInfo.Order_Fyepay > 0) {
							// 需要支付的金额大于0 ，直接弹出支付方式，简化支付流程
							_self.$nextTick().then(()=>{
								// _self.$refs.popupLayer.show();
							})

						}
					}
				})
			},
			// 用户重新更改了余额
			moneyInputHandle(e) {
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
				//#endif
				var money = e.detail.value;
				this.user_money = Number(money).toFixed(2);
				if (this.user_money < 0 || isNaN(this.user_money)) {
					uni.showToast({
						title: '您输入的金额有误',
						icon: 'none'
					});
					this.user_money = 0;
					this.submit_flag = false;
					return;
				}
				if (this.orderInfo.Order_TotalPrice - money < 0) {
					uni.showToast({
						title: '最大金额不能超过订单金额',
						icon: 'none'
					});
					this.user_money = this.orderInfo.Order_TotalPrice;
					// this.orderInfo.Order_TotalPrice = money;
					return;
				}
				this.pay_money = Number(this.orderInfo.Order_TotalPrice - money).toFixed(2);
				this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice - money).toFixed(2);
			},
			// 余额支付开关
			moneyChange(e) {
				var checked = e.detail.value;
				if (checked) {
					this.openMoney = true;
					this.user_money = Number(this.orderInfo.Order_Yebc).toFixed(2);
					this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice - this.user_money).toFixed(2);
					this.pay_money = Number(this.orderInfo.Order_TotalPrice - this.user_money).toFixed(2);
				} else {
					this.openMoney = false;
					this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice).toFixed(2);
					this.pay_money = Number(this.orderInfo.Order_TotalPrice).toFixed(2);
					this.user_money = 0;
				}
			},
			// 留言
			remarkHandle(e) {
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
				//#endif
				let remark = e.detail.value;
				this.order_remark = remark;
			},
			// 发票信息修改
			invoiceHandle(e) {
				//#ifdef H5
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
				//#endif
				let invoice = e.detail.value;
				this.invoice_info = invoice;
				if(this.openInvoice) {
					this.invoice_info = invoice;
				}
			},
			// 发票开关
			invoiceChange(e) {
				var checked = e.detail.value;
				if (checked) {
					this.need_invoice = 1;
					this.openInvoice = true;
					this.invoice_info = this.orderInfo.Order_InvoiceInfo;
				} else {
					this.openInvoice = false;
					this.need_invoice = 0;
				}
			},
			// 点击遮罩
			showOverlay() {
				this.show = false;
				this.wl_show = false;
			},
			// 去支付
			submit() {
				this.$refs.payLayer.show();
				return;
				// 发票信息
				if (this.need_invoice && this.invoice_info == '') {
					uni.showToast({
						title: '发票信息不能为空',
						icon: 'none'
					});
					return;
				}
				// 使用余额支付了
				if (this.user_money > 0) {
					// 待支付金额
					if (this.pay_money > 0) {
						this.$refs.popupLayer.show();
					} else {
						// 全部用余额支付了  直接请求
						this.password_input = true;
					}
				} else {
					// 不使用余额支付
					if (this.orderInfo.Order_Fyepay > 0) {
						// 待支付金额
						// console.log('去支付了',this.$refs)
						this.$refs.payLayer.show();
						//this.$refs.popupLayer.show();
					} else {
						// 不使用余额支付，pay_money为要提交的金额
						this.self_orderPay();
					}
				}
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
				console.log(wxAuthUrl)

				window.location.href = wxAuthUrl;


			},
			payFailCall(){
				uni.showToast({
					title: '支付失败',
					icon: 'none',
					duration: 2000
				});
				// setTimeout(function(){
				// 	uni.redirectTo({
				// 		url: '/pages/order/order?index=1'
				// 	})
				// },1000)
			},
			paySuccessCall(){
				let _that = this;
				toast('支付成功');
				setTimeout(function(){
					//拼团订单则跳转到开团成功
					let type = ls.get('type');
					ls.remove('type');
					if(type === 'pintuan'){
						uni.redirectTo({
							url:'/pages/groupSuccess/groupSuccess?order_id='+_that.Order_ID
						})
					}else{
						uni.redirectTo({
							url:'/pages/order/order?index=2'
						})
					}
				},50)
			},
			// 用户选择 微信支付
			async wechatPay() {

				let _self = this;

				this.pay_type = 'wechat';
				this.$refs.popupLayer.close();
				if (this.orderInfo.Order_Fyepay > 0) {
					if (this.pay_money > 0) {
						this.password_input = true;
					} else {
						// 用户选择微信，并且不用余额支付

						let payConf = {
							Order_ID: this.Order_ID,
							user_money: this.user_money,
							pay_money: this.orderInfo.Order_Fyepay,
							need_invoice: this.need_invoice,
							invoice_info: this.invoice_info,
							order_remark: this.order_remark
						};

						//需要格外有一个code
						// #ifdef H5
						if (!isWeiXin()) {
							this.$error('请在微信内打开')
							return;
						}
						let isHasCode = this.code || GetQueryByString('code');

						if (isHasCode) {

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

return;
						// #endif

						// #ifdef MP-WEIXIN
						payConf.pay_type = 'wx_lp'
						// #endif

						// #ifdef APP-PLUS
						payConf.pay_type = 'wx_app'
						// #endif


 						// #ifdef MP-WEIXIN
						payConf.pay_type = 'wx_lp'

						await new Promise((resolve => {
							uni.login({
								success: function (loginRes) {
									console.log(loginRes);
									payConf.code = loginRes.code
									resolve()
								}
							});
						}))

						// #endif



						console.log('payConf is', payConf)
						orderPay(payConf).then(res => {
							console.log(res);


							// #ifdef H5
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

							// #ifdef MP-WEIXIN

							provider = 'wxpay';
							orderInfo = res.data
							delete orderInfo.timestamp

							console.log(provider,orderInfo,'支付数据222222222222222222');
							uni.requestPayment({
							...orderInfo,
								provider,
								success: function (res) {
									console.log('success:' + JSON.stringify(res));
									_self.paySuccessCall(res)
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
									uni.showModal({
										title:'支付错误',
										content:JSON.stringify(err)
									})
								}
							});
							// #endif

						})

					}
				}
			},
			// 用户选择支付宝支付
			aliPay() {
				this.pay_type = 'ali';
				this.$refs.popupLayer.close();
				if (this.orderInfo.Order_Fyepay > 0) {
					if (this.pay_money > 0) {
						this.password_input = true;
					} else {
						// 选择支付宝，并且不用余额
						orderPay({
							Order_ID: this.Order_ID,
							pay_type: 'ali',
							pay_money: this.orderInfo.Order_Fyepay,
							need_invoice: this.need_invoice,
							invoice_info: this.invoice_info,
							order_remark: this.order_remark
						}).then(res => {
							console.log(res);

						})
					}
				}
			},

			// 取消输入支付密码
			cancelInput() {
				this.password_input = false;
			},
			// 用户输入密码完毕
			user_password(e) {
				console.log(e)
				this.user_pay_password = e.detail.value;
			},
			// 确定输入支付密码
			confirmInput(e) {
				this.self_orderPay();
				this.password_input = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		background: #fff;
	}

	.state {
		padding: 20rpx 28rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		border-top: 30rpx solid #F3F3F3;

		.img {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.state-desc {
		margin-left: 24rpx;
	}

	.c8 {
		color: #888;
		font-size: 26rpx;
	}

	/* 收货地址 start */
	.address {
		/* margin: 15px 0 10px; */
		display: flex;
		align-items: center;
		padding: 40rpx 38rpx 40rpx 28rpx;
		border-top: 30rpx solid #F3F3F3;
		border-bottom: 20rpx solid #F3F3F3;
	}


	.loc_icon {
		width: 41rpx;
		height: 51rpx;
		margin-right: 30rpx;
	}

	.right {
		width: 18rpx;
		height: 27rpx;
		margin-left: 28rpx;
	}

	.name {
		margin-bottom: 30rpx;
		font-size: 26rpx;
	}

	.name>span {
		margin-left: 10rpx;
	}


	.location {
		font-size: 24rpx;
		color: #444;
	}

	/* 收货地址 end */
	/* 订单信息 start */
	.order_msg {
		padding: 20rpx 30rpx 0px;
	}

	.biz_msg {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.biz_logo {
		width: 70rpx;
		height: 70rpx;
		border-radius: 35rpx;
		margin-right: 20rpx;
	}

	.biz_name {
		font-size: 28rpx;
	}

	.pro {
		display: flex;
		margin-bottom: 50rpx;
	}


	.pro-msg {
		margin-left: 27rpx;
		width: 451rpx;
	}

	.pro-div {
		width: 200rpx;
		height: 200rpx;
	}

	.pro-img {
		width: 200rpx;
		height: 200rpx;
		margin-right: 28rpx;
	}

	.pro-name {
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}



	.attr {
		display: inline-block;
		height: 50rpx;
		line-height: 50rpx;
		background: #FFF5F5;
		color: #666;
		font-size: 24rpx;
		padding: 0 20rpx;
		margin-bottom: 20rpx;
	}

	.pro-price {
		color: #F43131;
		font-size: 36rpx;
	}

	.pro-price span {
		font-size: 24rpx;
		font-style: normal;
	}

	.amount {
		font-size: 30rpx;
		float: right;
		color: #333;
	}

	/* 订单信息 end */
	/* 订单其他信息 start */
	.other {
		padding: 34rpx 45rpx 0rpx 31rpx;
		font-size: 28rpx;
	}

	.other .bd {
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #efefef;
	}

	.o_title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
	}

	.o_title .van-switch {
		float: right;
	}

	.o_desc {
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.msg {
		margin-left: 20rpx;
		font-size: 24rpx;
	}

	.words {
		justify-content: flex-start;
	}

	.words {
		input {
			border: 0;
			margin-left: 20rpx;
			flex: 1;
		}
	}

	.total {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 40rpx 0;
		font-size: 24rpx;
		padding-right: 44rpx;
	}

	i {
		font-style: normal;
	}

	.total .money {
		font-size: 30rpx;
		color: #F43131;
	}

	/* 订单其他信息 end */
	/* 提交订单 */
	.order_total {
		height: 100rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		background: #fff;
		z-index: 100;
	}

	.submit {
		width: 230rpx;
		background: #F43131;
		text-align: center;
		color: #fff;
		line-height: 100rpx;
	}

	.totalinfo {
		flex: 1;
		text-align: center;
	}

	.info {
		font-size: 24rpx;
	}

	.tips {
		font-size: 20rpx;
		color: #979797;
	}

	.iMbx {
		text-align: center;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #333;

		.c_method {
			padding: 37rpx 0;
			border-bottom: 2rpx solid #E6E6E6;
		}

		& .c_method:first-child {
			color: #F43131;
		}

		& .c_method:nth-last-child(1) {
			border: none;
		}
	}

	.zhezhao {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.3);
		z-index: 1000;

		.input-wrap {
			background: #fff;
			color: #000;
			text-align: center;
			width: 90%;
			margin: 400rpx auto;
			padding: 40rpx 50rpx 30rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			border-radius: 10rpx;
			.input {
				margin: 40rpx 0;
				border: 1px solid #efefef;
				height: 80rpx;
				line-height: 80rpx;
			}

			.btns {
				display: flex;
				justify-content: space-around;
				height: 60rpx;
				line-height: 60rpx;
				.btn {
					flex: 1;
				}
			}
		}
	}
</style>
