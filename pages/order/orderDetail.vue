<template>
	<div @click="commonClick" class="myall">
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar" style="background:white;position: fixed;top: 0;z-index: 22"></view> -->
		<!-- #endif -->
		<!-- ||orderInfo.Order_Status==4 -->
		<!-- orderInfo.Order_IsVirtual == 1 && (orderInfo.Order_Status==2) -->
		<block v-if="2">
			<div class="checkinfo-box line10 padding15" v-if="orderInfo.Order_IsVirtual == 1 && (orderInfo.Order_Status==2)">
				<div class="check-orderno ">
					<div class="font36" style="color: #555;font-weight: 300">{{orderInfo.Order_Code}}</div>
					<div class="graytext2 font12">兑换码</div>
				</div>
				<div class="check-qrcode text-right" @click="showQrImg" v-if="qrVal">

					<wzw-qrcode
							class="line6"
							cid="qrcode2"
							ref="qrcode2"
							:val="qrVal"
							:size="100"
							unit="px"
							:loadMake="loadMake"
							:usingComponents="true"
							@result="qrR"
					/>
<!--					<image class="icon-qroce" :src="'/static/client/fenxiao/chongshengtuiguang.png'|domain"/>-->
					<div class="graytext2 font12">请出示此二维码核销</div>
				</div>
			</div>
		</block>
		<div class="zhezhao" v-if="password_input">
			<div class="input-wrap">
				<div>请输入余额支付密码</div>
				<input type="password" class="input" placeholder="请输入密码" @blur="user_password">
				<div class="btns">
					<div @click="cancelInput" class="btn">取消</div>
					<div @click="confirmInput" class="btn">确定</div>
				</div>
			</div>
		</div>
		<div class="state bgwhite" v-if="orderInfo.Order_Status == 1">
			<image class="img" :src="'/static/client/wait.png'|domain" />
			<span class="state-desc">等待买家付款</span>
		</div>
		<view class="address bgwhite line10 order-id">
			<view>订单号：{{orderInfo.Order_ID}}</view>
			<view>下单时间: {{orderInfo.Order_CreateTime | formatTime}}</view>
		</view>
		<div class="address bgwhite line10" v-if="orderInfo.Order_IsVirtual == 0 ">
			<image class="loc_icon" :src="'/static/client/location.png'|domain" alt="" />
			<div class="add_msg">
				<div class="name">收货人：{{orderInfo.Address_Name}} <span>{{orderInfo.Address_Mobile}}</span></div>
				<div class="location">收货地址：{{orderInfo.Address_Province_name}}{{orderInfo.Address_City_name}}{{orderInfo.Address_Area_name}}<block v-if="orderInfo.Address_Town_name">{{orderInfo.Address_Town_name}}</block></div>
			</div>
		</div>
		<div class="order_msg bgwhite">
			<div class="biz_msg">
				<image :src="orderInfo.ShopLogo|domain" class="biz_logo" alt="" />
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
		<div class="other  bgwhite" v-if="orderInfo.Order_IsVirtual == 0">
			<div class="bd">
				<div class="o_title">
					<span>运费选择</span>
					<span style="text-align:right;" class="c8" v-if="orderInfo.Order_Shipping">
						<span>{{orderInfo.Order_Shipping.Express}}</span>
						<span> {{orderInfo.Order_Shipping.Price > 0 ? (' 运费：' + orderInfo.Order_Shipping.Price) : ' 免运费'}}</span>
					</span>
				</div>
			</div>
		</div>
		<view class="other bgwhite" v-if="orderInfo.Order_IsRecieve == 1">
			<view class="bd">
		        <view class="o_title">
		            <span>卡密</span>
		            <span class="c8">{{orderInfo.Order_Virtual_Cards}}</span>
		        </view>
		    </view>
		</view>
		<view class="other bgwhite" v-if="orderInfo.Order_IsVirtual == 1">
			<view class="bd">
                <view class="o_title">
                    <span>购买人姓名</span>
                    <span class="c8">{{user_name}}</span>
                </view>
            </view>
		</view>
		<view class="other bgwhite" v-if="orderInfo.Order_IsVirtual == 1">
			<view class="bd">
                <view class="o_title">
                    <span>购买人手机号</span>
                   <span class="c8">{{user_mobile}}</span>
                </view>
            </view>
		</view>
		<div class="other bgwhite" v-if="orderInfo.Order_Type=='pintuan'||orderInfo.Order_Type=='shop'">
			<div class="bd">
				<div class="o_title">
					<span>优惠券选择</span>
					<span class="c8">{{orderInfo.Coupon_Money}}元优惠券</span>
				</div>
			</div>
		</div>
		<div class="other bgwhite">
			<div class="bd">
				<div class="o_title">
					<span>积分抵扣</span>
					<span class="c8">{{orderInfo.Integral_Money}}</span>
				</div>
			</div>
		</div>
		<block  v-if="orderInfo.Order_Status == 1">
			<div class="other bgwhite" v-if="orderInfo.is_use_money && orderInfo.is_use_money == 1">
				<div class="bd">
					<div class="o_title">
						<span>是否使用余额</span>
						<switch :checked="moneyChecked" size='25px' color="#04B600" @change="moneyChange" />
					</div>
					<!-- <div class="o_desc c8">{{orderInfo.Order_Yebc}}</div> -->
					<input type="number" v-if="openMoney" v-model="user_money"  :disabled="!openMoney" :placeholder="orderInfo.Order_Yebc"
					@blur="moneyInputHandle" />
				</div>
			</div>
			<div class="other bgwhite" v-if="initData.invoice_switch == 1">
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
			<div class="other bgwhite">
				<div class="bd" style="border-bottom: none">
					<div class="o_title  words" >
						<span>买家留言</span>
						<input class="inpu msg c8" :placeholder="orderInfo.Order_Remark" @blur="remarkHandle">
					</div>
				</div>
			</div>
		</block>
		<block v-else>
			<div class="other bgwhite" v-if="orderInfo.Order_Yebc > 0">
				<div class="bd">
					<div class="o_title">
						<span>使用余额:</span>
						<span style="color: #888;">{{orderInfo.Order_Yebc}}元</span>
					</div>
				</div>
			</div>
			<div class="other bgwhite" v-if="orderInfo.Order_NeedInvoice == 1">
				<div class="bd">
					<div class="o_title">
						<span>发票信息</span>
						<span>{{orderInfo.Order_InvoiceInfo}}</span>
					</div>
				</div>
			</div>
			<div class="other bgwhite">
				<div class="bd" style="border-bottom: none">
					<div class="o_title  words" >
						<span>买家留言</span>
						<span>{{orderInfo.Order_Remark}}</span>
					</div>
				</div>
			</div>
		</block>
		<!-- <div class="total">
			<span>共<span>{{orderInfo.prod_list.length}}</span>件商品</span>
			<span class="mbx">小计：<span class="money moneys">￥</span><span class="money">{{orderInfo.Order_Fyepay}}</span></span>
		</div> -->
		<div style="height:50px;"></div>
		<popup-layer ref="popupMX" :direction="'top'" @maskClicked="handClicked" :bottomHeight="50">
			<view class="mxdetail">
				<view class="mxtitle">明细</view>
				<view class="mxitem">产品 <text class="num">+{{orderInfo.Order_TotalAmount}}</text></view>
				<view class="mxitem" v-if="orderInfo.user_curagio_money > 0">会员折扣 <text class="num">-{{orderInfo.user_curagio_money}}</text></view>
				<view class="mxitem" v-if="orderInfo.Manjian_Cash > 0">满减 <text class="num">-{{orderInfo.Manjian_Cash}}</text></view>
				<view class="mxitem" v-if="orderInfo.Coupon_Money > 0">优惠券 <text class="num">-{{orderInfo.Coupon_Money}}</text></view>
				<view class="mxitem" v-if="orderInfo.Integral_Money > 0">积分抵用 <text class="num">-{{orderInfo.Integral_Money}}</text></view>
				<view class="mxitem" v-if="user_money > 0">余额 <text class="num">-{{user_money}}</text></view>
				<block v-if="orderInfo.Order_Shipping">
					<view class="mxitem" v-if="orderInfo.Order_Shipping.Price > 0">运费 <text class="num">+{{orderInfo.Order_Shipping.Price}}</text></view>
				</block>

			</view>
		</popup-layer>
		<div class="order_total">
			<div class="totalinfo" v-if="orderInfo.prod_list">
				<div class="info">共{{orderInfo.prod_list.length}}件商品 总计：<span class="mbxa">￥<span>{{orderInfo.Order_TotalPrice}}</span></span></div>
				<view class="tips" v-if="orderInfo.obtain_desc">{{orderInfo.obtain_desc}}</view>
			</div>
			<view class="mx" @click="seeDetail">明细 <image class="image" :class="isSlide?'slidedown':''" src="/static/top.png"></image></view>
			<div class="btn-group" v-if="orderInfo.Order_Status==0">
				<span @click="cancelOrder(orderInfo.Order_ID)">取消订单</span>
			</div>
			<div class="btn-group" v-if="orderInfo.Order_Status==1">
					<span @click="cancelOrder(orderInfo.Order_ID)">取消订单</span>
					<span class="active" @click="submit">立即付款</span>
			</div>
			<div class="btn-group" v-else-if="orderInfo.Order_Status==2">
				<span class="active" v-if="orderInfo.teamstatus==0">拼团中</span>
				<block v-else>
			    	<span class="active" @click="goPay(orderInfo.Order_ID)" v-if="orderInfo.Order_Type != 'gift'">申请退款</span>
				</block>
			</div>
			<div class="btn-group" v-else-if="orderInfo.Order_Status==3">
				<span @click="goLogistics(orderInfo)"   v-if="orderInfo.Order_Shipping.shipping_id!=2">查看物流</span>
				<!-- <span @click="goPay(orderInfo.Order_ID)" style="margin-left: 14rpx;">申请退款退货</span> -->
			  <span class="active" @click="confirmOrder(orderInfo.Order_ID)">确认收货</span>
			</div>
			<div class="btn-group" v-else-if="orderInfo.Order_Status==4 && orderInfo.Is_Commit == 0">
			    <span class="active" @click="goPay(orderInfo.Order_ID)">立即评价</span>
			</div>
		</div>

		<popup-layer ref="popupLayer" :direction="'top'">
			<div class="iMbx">
				<div class="c_method" v-for="(item,index) in pay_arr" @click="chooseType(index)" :key="index">
					{{item}} <text>￥{{orderInfo.Order_Fyepay}}</text>
				</div>
			</div>
		</popup-layer>
		<payComponents
		ref="payLayer"
			:isOpen="isOpen"
			:Order_ID="Order_ID"
			:pay_money="pay_money"
			:use_money="user_money"
			:need_invoice="need_invoice"
			:invoice_info="invoice_info"
			:order_remark="order_remark"
			:paySuccessCall="paySuccessCall"
			:payErrorCall = "payFailCall"
		></payComponents>
	</div>
</template>

<script>
	import popupLayer from '../../components/popup-layer/popup-layer.vue'
	import wzwQrcode from '../../components/wzw-qrcode/wzw-qrcode'
	import {formatTime} from '../../common/filter.js'
	import {
		getAddress,
		createOrderCheck,
		getOrderDetail,
		orderPay,
		get_user_info,
		cancelOrder,
		confirmOrder,getOrderExpressCode
	} from '../../common/fetch.js';
	import {
		pageMixin
	} from "../../common/mixin";
	import {KDNWidget} from '../../common/kdj.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	import {
		ls,
		GetQueryByString,
		isWeiXin,
		urlencode
	} from "../../common/tool";
	import {error} from "../../common";
	import PayComponents from '../../components/PayComponents.vue';

	export default {
		mixins: [pageMixin],
		components: {
			popupLayer,PayComponents,wzwQrcode

		},
		data() {
			return {
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				loadMake: true, // 组件加载完成后自动生成二维码
				qrsrc:'',
				code: '',
				qrVal:'',
				JSSDK_INIT: false,
				show: false, // 遮罩层
				wl_show: false, // 物流选择
				postData: {},
				orderInfo: {},
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
				isOpen: false, //是否自动弹出
				user_money: 0,
				user_name: '',
				user_mobile: '',
				isSlide: false,
				invoice_info:''
			}
		},
		onLoad(options) {
			if (options.Order_ID) {
				this.Order_ID = options.Order_ID;
			}
			if(options.pagefrom =='check'){
				this.showDirect = true;
			}
			if(options.pagefrom == 'order') {
				// 来自订单列表页
				this.pageFromOrder = true;
			}
			// 获取支付方式
			this.pay_arr = ls.get('initData').pay_arr;

		},
		filters: {
			formatTime: formatTime
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
			},
			...mapGetters(['initData'])
		},
		created() {

			// #ifdef MP-TOUTIAO
			this.$store.commit('SET_PAY_TEMP_OBJ',this);
			// #endif

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
			showQrImg(){
				uni.previewImage({
					urls:[this.qrsrc]
				})
			},
			qrR(res) {
				this.qrsrc = res
			},
			//查看明细
			seeDetail(){
				if(!this.isSlide) {
					this.$refs.popupMX.show();
				}else {
					this.$refs.popupMX.close();
				}
				this.isSlide = !this.isSlide;
			},
			handClicked(){
				this.isSlide = false;
			},
			//物流追踪
			goLogistics(orderInfo){
				
				// #ifndef MP-WEIXIN
				// getOrderExpressCode({shipping_id:item.Order_ShippingID}).then(res=>{
					
				// 	  KDNWidget.run({
				// 		  serviceType: "A",
				// 		  expCode: res.data.ShipperCode,
				// 		  expNo: res.data.LogisticCode
				// 	  })
				
				// }).catch(e=>{})
				// #endif
			
					let {
						shipping_id,
						express,
						prod_img
					} = {
						shipping_id: orderInfo.Order_ShippingID,
						express: orderInfo.Order_Shipping.Express,
						prod_img: orderInfo.prod_list[0].prod_img
					}
					//跳转物流追踪
					uni.navigateTo({
						url:'/pages/order/logistics?shipping_id='+shipping_id + '&express=' + express + '&prod_img=' + prod_img+'&order_id='+orderInfo.Order_ID
					})
	
			},
			//取消订单
			cancelOrder(Order_ID){
				if(Order_ID){
					cancelOrder({Order_ID}).then(res=>{
						uni.showToast({
							title:res.msg,
							icon:"none"
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);

					}).catch(e=>{
						this.isLoading=false;
					})
				}
			},
			//确认收货
			confirmOrder(Order_ID){
				let that=this;
				confirmOrder({Order_ID: Order_ID}).then(res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000);
				}).catch(e=>{
				})
			},
			//跳转申请退款  发表评论
			goPay(Order_ID){
				if(this.orderInfo.Order_Status==2||this.orderInfo.Order_Status==3){
					uni.navigateTo({
						url:'/pagesA/person/refund?Order_ID='+Order_ID
					})
				}else if(this.orderInfo.Order_Status==4){
					uni.navigateTo({
						url:'/pages/order/publishComment?Order_ID='+Order_ID
					})
				}

			},
			//获取用户支付方式
			chooseType(name) {
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
			async getOrderDetail() {

				let _self = this;
				getOrderDetail({
					Order_ID: this.Order_ID,
				}).then(res => {
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
					let orderInfo = res.data

					// let aa = await new Promise(resolve=>{
					// 	setTimeout(()=>{
					// 		resolve(true)
					// 	},3000)
					// })

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
					this.user_name = this.orderInfo.Address_Name;
					this.user_mobile = this.orderInfo.Address_Mobile;


					if(orderInfo.Order_IsVirtual){
						this.qrVal = `IsVirtualOrderCheck##Order_Code::${orderInfo.Order_Code}`
					}

					if(this.showDirect && this.orderInfo.Order_Fyepay > 0) {
						// 需要支付的金额大于0 ，直接弹出支付方式，简化支付流程
						_self.$nextTick().then(()=>{
							//_self.$refs.popupLayer.show();
						})

					}
				})
			},
			// 用户重新更改了余额
			moneyInputHandle(e) {
				//#ifdef H5
				// uni.pageScrollTo({
				// 	scrollTop: 0,
				// 	duration: 200
				// });
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
					this.orderInfo.Order_Fyepay = 0.00;
					return;
				}
				this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice - money).toFixed(2);
				this.pay_money = Number(this.orderInfo.Order_TotalPrice - money).toFixed(2);
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
				// uni.pageScrollTo({
				// 	scrollTop: 0,
				// 	duration: 200
				// });
				//#endif
				let remark = e.detail.value;
				this.order_remark = remark;
			},
			// 发票信息修改
			invoiceHandle(e) {
				//#ifdef H5
				// uni.pageScrollTo({
				// 	scrollTop: 0,
				// 	duration: 200
				// });
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
				this.$refs.payLayer.show()
				return;
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
			paySuccessCall(res){

				var _that = this;
				if(res && res.code && res.code==2){
					_that.payFailCall()
					return;
				}

				if(res && res.code && res.code==1){
					toast('用户取消支付','none')
					return;
				}

				if(res && res.code && res.code==9){
					uni.showModal({
						title: '提示',
						content: '是否完成支付',
						cancelText:'未完成',
						confirmText:'已支付',
						success: function (res) {
							if (res.confirm) {

								uni.redirectTo({
									url:'/pages/order/order?index=2'
								})

							} else if (res.cancel) {



							}
						}
					});
					return;
				}

				//0：支付成功 1：支付超时 2：支付失败 3：支付关闭 4：支付取消 9：订单状态开发者自行获取

				if(res && res.code && res.code==4){
					toast('用户取消支付','none')
					return;
				}


				uni.redirectTo({
					url:'/pages/order/order?index=2'
				})



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
.checkinfo-box{
	display: flex;
	align-items: center;
	background: white;
	.check-orderno{
		flex: 1;
	}
	.icon-qroce{
		width: 40px;
		height: 40px;
	}
}
.myall{
	/*background-color: #f8f8f8;*/
}

.mxdetail {
	font-size: 28rpx;
	line-height: 80rpx;
	padding: 20rpx 30rpx;
	padding-bottom: 100rpx;
	.mxtitle {
		font-size: 28rpx;
		text-align: center;
	}
	.mxitem {
		border-bottom: 1px solid #eaeaea;
		.num {
			float: right;
		}
	}
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
	/*border-top: 30rpx solid #F3F3F3;*/
	font-size: 28rpx;
}
// 订单号
.order-id {
	border-bottom: none;
	justify-content: space-between;
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
	&:last-child{
		margin-bottom: 0;
	}
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
	border-bottom: 2rpx solid $wzw-border-color;
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
	.inpu {
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
	min-height: 50px;
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	align-items: center;
	background: #fff;
	z-index: 9999999;
	justify-content: space-around;
	.mx {
		font-size: 22rpx;
		margin-right: 10rpx;
		.image {
			width: 20rpx;
			height: 20rpx;
			margin-left: 10rpx;
		}
		.slidedown {
			transform: rotate(180deg);
		}
	}
}

.submit {
	width: 230rpx;
	background: #F43131;
	text-align: center;
	color: #fff;
	line-height: 50px;
}

.totalinfo {
	// flex: 1;
	text-align: center;
	width: 260rpx;
}
.btn-group {
	//flex: 1;
	span {
		display: inline-block;
		//width: 150rpx;
		padding: 0rpx 24rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border: 1px solid $wzw-border-color;
		border-radius:10rpx;
		color: #999;
		font-size: 26rpx;
		&:last-child{
			margin-left: 14rpx;
		}
		&.active {
			color: #fff;
			background: #F43131;
			border: none;
		}
	}
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
		border-bottom: 2rpx solid $wzw-border-color;
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
			border: 1px solid $wzw-border-color;
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
