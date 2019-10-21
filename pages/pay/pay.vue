<template>
	<div>
		<div class="zhezhao" v-if="password_input">
			<div class="input-wrap">
				<div>请输入余额支付密码</div>
				<input type="password" placeholder="请输入密码" @blur="user_password">
				<div class="btns">
					<div @click="cancelInput" class="btn">取消</div>
					<div @click="confirmInput" class="btn">确定</div>
				</div>
			</div>
		</div>
		<page-title title="付款" rightHidden="true" bgcolor="#ffffff"></page-title>
		<div class="state">
			<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAADAFBMVEVHcEyAgIAAAACZmZmZmZmUlJSZmZmZmZmXl5eYmJiZmZmZmZmZmZmKior///+YmJiZmZmZmZmPj4+ZmZmZmZmZmZmAgICZmZmXl5eZmZmZmZmampqYmJiZmZmOjo6ZmZmWlpaZmZmYmJiZmZmWlpaXl5eZmZmZmZmZmZmYmJiSkpKSkpKZmZmYmJidnZ1VVVWZmZmYmJibm5uXl5eVlZWZmZmYmJiYmJiYmJiYmJiYmJiZmZmZmZmAgICZmZmZmZmYmJiYmJiYmJiZmZmWlpaZmZmYmJiZmZmYmJiYmJiYmJiVlZWYmJiZmZmZmZmYmJiZmZmXl5eSkpKVlZWZmZmZmZmYmJiYmJiXl5eZmZmYmJiZmZmXl5eZmZmYmJiZmZmXl5eZmZmYmJiZmZmYmJiYmJiZmZmVlZWVlZWVlZWYmJiWlpaSkpKZmZmZmZmZmZmZmZmYmJiYmJiRkZGYmJiZmZmZmZmYmJiZmZmSkpKZmZmAgICZmZmfn5+ZmZmZmZmYmJiOjo6YmJiYmJiYmJiYmJiYmJiYmJiYmJiXl5eZmZmXl5eJiYmZmZmZmZmQkJCYmJhmZmaampqWlpaZmZmYmJiYmJiZmZmZmZmqqqqVlZWZmZmYmJiYmJiampqZmZmZmZmZmZmZmZmYmJiYmJiZmZmYmJiWlpaZmZmXl5eVlZWZmZmZmZmZmZmZmZmYmJiYmJiYmJiZmZmMjIyYmJiZmZmYmJiYmJiYmJiIiIiYmJiZmZmXl5eYmJiXl5eXl5eXl5eYmJiYmJiZmZmZmZmYmJiYmJiYmJiZmZmWlpaXl5eZmZmYmJiXl5eYmJiZmZmbm5udnZ2Xl5eWlpaZmZmWlpaYmJiXl5eZmZmUlJSTk5OYmJiZmZmZmZmVlZWZmZmZmZmZmZmXl5eWlpaXl5eZmZmYmJiampqZmZmTk5OYmJiWlpaTk5OioqKXl5eVlZWampqZmZmZmZmTk5OampqVlZWXl5eYmJiYmJiWlpacnJyYmJiZmZmampqampqZmZmNxJo6AAAA/3RSTlMAAgH6+ROg/iy/9/3vCgH29fwQk/vyBOggBfAP8goJ+BH0+xQiFu3ryvMHDuWXDQPzdxwbKaXsrrU5pqIpCI7xpPihZkTa2ObKmro6cuDW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">
			<span class="state-desc">等待买家付款</span>
		</div>
		<div class="address">
			<img class="loc_icon" src="data:image/png;base64,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" alt="">
			<div class="add_msg">
				<div class="name">收货人：{{orderInfo.Address_Name}} <span>{{orderInfo.Address_Mobile}}</span></div>
				<div class="location">收货地址：{{orderInfo.Address_Province_name}}{{orderInfo.Address_City_name}}{{orderInfo.Address_Area_name}}{{orderInfo.Address_Town_name}}</div>
			</div>
		</div>
		<div class="order_msg">
			<div class="biz_msg">
				<img :src="orderInfo.ShopLogo" class="biz_logo" alt="">
				<span class="biz_name">{{orderInfo.ShopName}}</span>
			</div>
			<div class="pro" v-for="(pro,pro_id) in orderInfo.prod_list" :key="pro_id">
				<img class="pro-img" :src="pro.prod_img" alt="">
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
		<popup-layer ref="popupLayer" :direction="'top'">
			<div class="iMbx">
				<div class="c_method" v-for="(item,index) in pay_arr" @click="chooseType(index)" :key="index">
					{{item}} <text>￥{{orderInfo.Order_Fyepay}}</text>
				</div>
				<!-- <div class="c_method" @click="wechatPay" >
					微信支付 <text>￥{{orderInfo.Order_Fyepay}}</text>
				</div>
				<div class="c_method" @click="aliPay">
					支付宝支付 <text>￥{{orderInfo.Order_Fyepay}}</text>
				</div> -->
			</div>
		</popup-layer>

	</div>
</template>

<script>
	import popupLayer from '../../components/popup-layer/popup-layer.vue'
	import {
		getAddress,
		createOrderCheck,
		getOrderDetail,
		orderPay,
		get_user_info
	} from '../../common/fetch.js';
	import {
		pageMixin
	} from "../../common/mixin";
	import {
		ls,
		GetQueryByString,
		isWeiXin,
		urlencode
	} from "../../common/tool";

	export default {
		mixins: [pageMixin],
		components: {
			popupLayer
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
				pay_money: 0, // 开启余额支付，表示余额支付的钱，pay_type 为 balance , 先提交一次order_pay,此时pay_money变成剩余应该支付的钱 .不开启余额支付，是应该支付的钱
				pay_type: 'balance', // balance余额支付，余额补差    wechat 微信支付  ali 支付宝支付
				user_pay_password: '', //余额补差，支付密码
				cate: 'method',
				password_input: false,
				openMoney: true, //是否开启了余额功能
				openInvoice: true, // 是否开启了发票
				order_remark: '', // 留言
				need_invoice: 0, // 是否需要发票
				showDirect: false, // 是否直接显示付款方式
				pay_arr: [], // 支付方式
			}
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

			if (isWeiXin()) {
				this.code = GetQueryByString(location.href, 'code');
				if (this.code) {
					// ls.set('code',this.code)
					this.wechatPay();
				}
			}
			// #endif

		},
		methods: {
			// 统一方法
			async self_orderPay(){
				let _self = this;
				if(this.need_invoice == 1 && this.invoice_info == '') {
					uni.showToast({
						title: '发票信息不能为空',
						icon: 'none'
					});
					return;
				};
				let payConf = {
					Order_ID: this.Order_ID,
					pay_type: this.pay_type,
					pay_money: this.orderInfo.Order_Fyepay, // 剩余支付的钱
					use_money: this.user_money , // 使用的余额
					user_pay_password: this.user_pay_password, //余额支付密码
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
				}


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
			},
			//获取用户支付方式
			chooseType(name) {
				this.pay_type = name;
				this.$refs.popupLayer.close();
				// 判断是否使用了余额，
				if(this.user_money > 0){
					// 使用了 余额支付
					this.password_input = true;
				}else {
					// 未使用余额支付, 直接调用
					this.self_orderPay();
				}
			},
			// 订单详情
			getOrderDetail() {
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
						this.orderInfo = res.data;
						// pay_money 应该支付的钱
						// user_money 使用的余额
						this.pay_money = this.orderInfo.Order_Fyepay;
						this.user_money = this.orderInfo.Order_Yebc;
						this.openMoney = this.orderInfo.Order_Yebc > 0;
						this.need_invoice = this.orderInfo.Order_NeedInvoice;
						this.openInvoice = this.orderInfo.Order_NeedInvoice > 0;
						this.invoice_info = this.orderInfo.Order_InvoiceInfo;
						this.order_remark = this.orderInfo.Order_Remark;
						if(this.showDirect) {
							this.$refs.popupLayer.show();
						}
					}
				})
			},
			// 用户重新更改了余额
			moneyInputHandle(e) {
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
				this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice - money).toFixed(2);
			},
			// 余额支付开关
			moneyChange(e) {
				var checked = e.detail.value;
				if (checked) {
					this.openMoney = true;
					this.user_money = Number(this.orderInfo.Order_Yebc).toFixed(2);
					this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice - this.user_money).toFixed(2);
				} else {
					this.openMoney = false;
					this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice).toFixed(2);
					this.user_money = 0;
				}
			},
			// 留言
			remarkHandle(e) {
				let remark = e.detail.value;
				this.order_remark = remark;
			},
			// 发票信息修改
			invoiceHandle(e) {
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
						this.$refs.popupLayer.show();
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
			paySuccessCall(){
				uni.redirectTo({
					url:'/pages/order/order?index=2'
				})
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
						}


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
		border-top: 30rpx solid #FFF3F3F3;

		img {
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
		border-top: 30rpx solid #FFF3F3F3;
		border-bottom: 20rpx solid #FFF3F3F3;
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
			padding: 20rpx 50rpx;
			box-sizing: border-box;
			font-size: 28rpx;

			input {
				margin: 40rpx 0;
				border: 1px solid #efefef;
			}

			.btns {
				display: flex;
				justify-content: space-around;

				.btn {
					flex: 1;
				}
			}
		}
	}
</style>
