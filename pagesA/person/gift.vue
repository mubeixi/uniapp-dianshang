<template>
    <view @click="commonClick" v-if="loading">
        <view class="address" v-if="orderInfo.is_virtual == 0 " @click="goAddressList">
            <image class="loc_icon" :src="'/static/client/location.png'|domain" alt="" ></image>
            <view class="add_msg" v-if="addressinfo.Address_Name">
                <view class="name">收货人：{{addressinfo.Address_Name}} <span>{{addressinfo.Address_Mobile | formatphone}}</span></view>
                <view class="location">收货地址：{{addressinfo.Address_Province_name}}{{addressinfo.Address_City_name}}{{addressinfo.Address_Area_name}}{{addressinfo.Address_Town_name}}</view>
            </view>
				<view class="add_msg" v-else>
					<view>暂无收货地址，去添加</view>
				</view>
            <image class="right" :src="'/static/client/right.png'|domain" alt="" ></image>
        </view>
		<view class="biz_msg">
			<image :src="orderInfo.ShopLogo|domain" class="biz_logo" alt="" />
			<span class="biz_name">{{orderInfo.ShopName}}</span>
		</view>
        <view class="order_msg">
			<block  v-for="(pro,pro_id) in orderInfo.CartList" :key="pro_id">
				<view class="pro" v-for="(attr,attr_id) in pro" :key="attr_id">
					<img class="pro-img" :src="attr.ImgPath" alt="">
					<view class="pro-msg">
						<view class="pro-name">{{attr.ProductsName}}</view>
						<view class="attr" v-if="attr.Productsattrstrval"><span>{{attr.Productsattrstrval}}</span></view>
						<view class="pro-price"><span>￥</span>{{attr.ProductsPriceX}} <span class="amount">x<span class="num">{{attr.Qty}}</span></span></view>
					</view>
				</view>
			</block>
        </view>
        <view class="other" v-if="orderInfo.is_virtual == 0">
            <view class="bd">
                <view class="o_title" @click="changeShip">
                    <span>运费选择</span>
                    <span style="text-align:right; color: #888;" >
						<span>{{shipping_name?(shipping_name + ' ' + (orderInfo.Order_Shipping.Price > 0 ? orderInfo.Order_Shipping.Price : '免运费')):'请选择物流'}}</span>
                        <image  class="right" :src="'/static/client/right.png'|domain" alt=""></image>
                    </span>
                </view>
            </view>
        </view>
		<view class="other" v-if="orderInfo.is_virtual == 1">
			<view class="bd">
                <view class="o_title  words">
                    <span>购买人姓名</span>
                    <input class="inputs" type="text" v-model="user_name"  placeholder="请填写姓名">
                </view>
            </view>
		</view>
		<view class="other" v-if="orderInfo.is_virtual == 1">
			<view class="bd">
                <view class="o_title  words">
                    <span>购买人手机号</span>
                    <input class="inputs" type="text" v-model="user_mobile"  placeholder="请填写手机号码">
                </view>
            </view>
		</view>
        <view class="other" v-if="orderInfo.is_use_money == 1">
            <view class="bd">
                <view class="o_title">
                    <span>是否使用余额</span>
                    <switch :checked="userMoneyChecked" color="#04B600" @change="userMoneyChange" />
                </view>
				<view class="o_de">您当前最多使用余额: <text>{{userInfo.User_Money < orderInfo.Order_TotalPrice ? userInfo.User_Money : orderInfo.Order_TotalPrice}}</text></view>
                <input v-if="userMoneyChecked" @focus="postData.use_money = 0" v-model.number="postData.use_money" class="o_desc" placeholder="请输入金额" type="number" @blur="confirm_user_money">
            </view>
        </view>
		<view class="other">
            <view class="bd">
                <view class="o_title  words">
                    <span>买家留言</span>
                    <input class="inputs" type="text"  @blur="remarkConfirm" placeholder="请填写留言内容">
                </view>
            </view>
        </view>
		<view style="height:100rpx;">
			<view class="order_total">
				<view class="totalinfo">
					<view class="info">共{{orderInfo.prod_count}}件商品 总计：<text class="money"><text class="m_icon">￥</text> {{orderInfo.Order_Fyepay}}</text></view>
					<view class="tips" v-if="orderInfo.obtain_desc">{{orderInfo.obtain_desc}}</view>
				</view>
				<form report-submit @submit="form_submit">
					<button formType="submit" class="submit">确定领取</button>
				</form>
			</view>
		</view>
        <popup-layer ref="popupRef" :direction="'top'">
        	<view class="bMbx" v-if="type=='shipping'">
        		<view class="fMbx">运费选择</view>
        		<view class="iMbx" v-for="(ship,shipid) in orderInfo.shipping_company" :key="shipid">
        			<view>
        				{{ship}}
        			</view>
					<radio-group @change="ShipRadioChange">
						<radio :value="shipid" :checked="shipid==ship_current" style="float:right;" color="#F43131"/>
					</radio-group>
        		</view>
        	</view>
        	<view class="sure" @click="closeMethod">
        		确定
        	</view>
        </popup-layer>
		<view class="remind-wrap" v-if="remindAddress">
			<view class="remind-add">
				<view class="text-align-center mb20">新建收货地址</view>
				<view class="remind_desc">
					您还没有收货地址，请先添加一个新的收货地址
				</view>
				<view class="remind_btns text-align-center">
					<view class="text-align-center fl1" @click="goback">返回</view>
					<view class="text-align-center fl1 confirm" @click="goEditAdd">
						新建
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue';
import {getAddress,getCart,createOrderCheck,createOrder,get_user_info} from '../../common/fetch.js';
import {goBack} from '../../common/tool.js'
import {pageMixin} from "../../common/mixin";
import {check_money_in} from "../../common/util.js";
import {mapGetters,mapActions} from 'vuex';
import {add_template_code} from "../../common/fetch";
export default {
	mixins:[pageMixin],
    components: {
        popupLayer
    },
    data(){
        return {
					show: false, // 遮罩层
					wl_show: false, // 物流选择
					checked: true,
					checked1: true,
					checked2: true,
					checked3: true,
					wl_list: [
							{name:'顺丰',price:'免邮',index:0},
							{name:'中通',price:'免邮',index:1},
							{name:'圆通',price:'￥20',index:2}
					],
					addressinfo: {}, // 收货地址信息
					orderInfo: {},
					type: 'shipping',
					cart_buy: '',
					current: '',
					couponlist: [], // 优惠券列表,
					coupon_id: '',  // 优惠券id
					coupon_desc: '', // 优惠券选择描述
					use_integral: 0, // 用于抵扣的积分数
					use_money: 0, // 余额支付金额
					intergralChecked: false,
					userMoneyChecked: false,
					faPiaoChecked: false,
					ship_current: 0,
					shipping_name: '', // 物流信息描述
					postData: {
						cart_key: '',
						cart_buy: '',
						shipping_id: 0,
						address_id: '',
						coupon_id: '',
						use_integral: 0, // 用于抵扣的积分数
						use_money: 0,  // 余额支付金额
						order_remark: '', // 买家留言
					},
					Order_ID: 0,
					addressLoading: false, // 收货地址信息是否加载完
					orderLoading: false, //订单信息是否加载完
					userLoading: false, //个人信息是否加载完
					// remindAddress: false, // 提醒添加收货地址
					submited: false,  // 是否已经提交过，防止重复提交
					back_address_id: 0,
					gift: '',//有可能是赠品
					user_name: '',
					user_mobile: ''
        }
    },
	filters: {
		formatphone: function(value) {
			if(value) {
				var len= value.length;
				var xx= value.substring(3,len-4);
				var values = value.replace(xx,"****");
				return values;
			}
		}
	},
	onShow() {
		if(JSON.stringify(this.userInfo) != "{}"){
			get_user_info().then(res=>{
				this.setUserInfo(res.data);
			}).catch(e=>{
			})
		}
		this.getAddress();
		// this.createOrderCheck();
	},
	async created(){
		let userInfo = this.getUserInfo(true);
	},
	onLoad(options) {
		this.postData.cart_key = options.cart_key;
		if(options.cart_buy){
			this.postData.cart_buy = options.cart_buy;
		}
		// 如果是赠品，
		if(options.gift) {
			this.gift = options.gift;
		}
	},
	computed: {
		loading: function(){
			return this.addressLoading && this.orderLoading
		},
		remindAddress: function(){
			return this.orderInfo.is_virtual == 0 && !this.addressinfo.Address_Name
		},
		...mapGetters(['userInfo'])
	},
  methods: {
		...mapActions(['getUserInfo','setUserInfo']),
		goback(){
			goBack();
		},
		// 跳转地址列表页
		goAddressList(){
			uni.navigateTo({
				url: '/pages/addressList/addressList?from=checkout&addressid='+this.postData.address_id
			})
		},
		// 跳转新增地址页面
		goEditAdd(){
			uni.navigateTo({
				url: '/pagesA/editAddress/editAddress?from=checkout'
			})
		},
		// 提交订单
		form_submit(e) {

			// add_template_code({
			// 	code: e.detail.formId,
			// 	times: 1
			// })
			if(!this.submited){
				this.submited = true;
				if(this.orderInfo.is_virtual == 0) {
					if(!this.postData.shipping_id) {
						uni.showToast({
							title: '请选择物流',
							icon: 'none'
						});
						this.submited = false;
						return;
					}
				}
				if(this.orderInfo.is_virtual == 1) {
					if(!this.user_name) {
						uni.showToast({
							title: '请填写购买人姓名',
							icon: 'none'
						});
						this.submited = false;
						return;
					};
					if(!this.user_mobile) {
						uni.showToast({
							title: '请填写购买人手机号',
							icon: 'none'
						});
						this.submited = false;
						return;
					};
					this.postData.user_name = this.user_name;
					this.postData.user_mobile = this.user_mobile;
				}
				if(this.orderInfo.Order_Fyepay == 0) {
					// 不需要运费，可以在本页面完成
					createOrder(this.postData).then(res=>{
						uni.navigateTo({
							url: '/pagesA/person/myGift?checked=1'
						})
					})
				}else if(this.orderInfo.Order_Fyepay > 0) {
					createOrder(this.postData).then(res=>{
						this.Order_ID = res.data.Order_ID;
						uni.redirectTo({
							url: '/pages/pay/pay?Order_ID='+ res.data.Order_ID+'&pagefrom=gift'
						})
					}).catch(e=>{
						uni.showToast({
								title: e.msg,
								icon: 'none'
						})
						this.submited = false;
					});
				}
			}
		},
		// 积分抵扣开关
		intergralSwitchChange(e){
			this.intergralChecked = e.detail.value;
			this.postData.use_integral = this.orderInfo.max_diyong_intergral;
			if(!this.intergralChecked) {
				this.postData.use_integral = 0;
			};
			this.createOrderCheck();
		},
		// 余额支付开关
		userMoneyChange(e){
			this.userMoneyChecked = e.detail.value;
			if(!this.userMoneyChecked) {
				this.postData.use_money = 0;
			}
			this.createOrderCheck();
		},
		// 发票开关
		faPiaoChange(e) {

			this.faPiaoChecked = e.detail.value;
			if(this.faPiaoChecked) {
				this.postData.need_invoice = 1;
			}else {
				this.postData.need_invoice = 0;
			}
		},
		// 发票抬头输入完成
		faPiaoConfirm(e) {
			//#ifdef H5
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 200
			});
			//#endif
			let invoice_info = e.detail.value;

			this.postData.invoice_info = invoice_info;
		},
		// 余额支付输入完成
		confirm_user_money(e){
			//#ifdef H5
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 200
			});
			//#endif
			let input_money = e.detail.value;
			// let user_money = this.userInfo.User_Money;
			// 用户的金额和订单金额比较，取较小的那个与用户输入金额比较
			let user_money = (this.userInfo.User_Money < this.orderInfo.Order_TotalPrice) ? this.userInfo.User_Money : this.orderInfo.Order_TotalPrice;
			if(input_money < 0 || isNaN(input_money)){
				uni.showToast({
					title: '输入金额有误',
					icon: 'none'
				});
				this.postData.use_money = 0;
				return;
			}
			if(input_money - user_money > 0) {
				uni.showModal({
					title: '提示',
					content: '金额大于最大使用余额',
					icon:  'none',
					showCancel: false
				});
				this.postData.use_money = user_money;
				this.createOrderCheck();
				return;
			}
			this.postData.use_money = Number(input_money).toFixed(2);
			this.createOrderCheck();
		},
		// 留言
		remarkConfirm(e) {
			//#ifdef H5
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 200
			});
			//#endif
			this.postData.order_remark = e.detail.value;
		},
		// 优惠券改变
		radioChange(e){
			var couponlist = this.orderInfo.coupon_list;
			for(var i=0;i<couponlist.length;i++){
				if(couponlist[i].Coupon_ID == e.target.value) {
					this.current = i;
					break;
				}
			};
			this.postData.coupon_id = e.target.value;
		},
		// 物流改变
		ShipRadioChange(e) {
			for(var i in this.orderInfo.shipping_company) {
				if(i == e.target.value) {
					this.ship_current = i;
					break;
				}
			};
			this.postData.shipping_id = e.target.value;
		},
		changeCoupon(){
			this.type = 'coupon';
			if(this.couponlist.length == 0) {return;}
			this.$refs.popupRef.show();
		},
        // 选择运费
        changeShip(){
					this.type = 'shipping';
					this.ship_current = this.postData.shipping_id;
          this.$refs.popupRef.show();
        },
		closeMethod(){
			if(this.type == 'coupon') {
				for(var i in this.couponlist) {
					if(this.couponlist[i].Coupon_ID == this.postData.coupon_id) {
						this.coupon_desc = `满${this.couponlist[i].Coupon_Condition} - ${this.couponlist[i].Coupon_Cash > 0 ? this.couponlist[i].Coupon_Cash : this.couponlist[i].Coupon_Discount}`
					}
				}
			}else {
				for(var i in this.orderInfo.shipping_company) {
					if(i == this.postData.shipping_id) {
						this.shipping_name = `${this.orderInfo.shipping_company[i]}`
					}
				}
			};
			this.createOrderCheck();
			this.$refs.popupRef.close();
		},
		async getAddress(){
			this.$vm.$on('fire', (data) =>{
				this.back_address_id = data;
			})
			var Address_ID;
			if (this.back_address_id) {  //添加、选择收获地址返回
			    Address_ID = this.back_address_id;
			} else if (this.addressinfo.Address_ID) { //有收获地址，则更新（防止收获地址编辑后返回）
			    Address_ID = this.addressinfo.Address_ID;
			}
			await getAddress({Address_ID: Address_ID?Address_ID:0}).then(res=>{
				for(let i in res.data){
					for(let j in res.data[i]){
						if(j=='Address_Is_Default'){
							res.data[i][j] == 1;
							this.addressinfo = res.data[i]
						}
					}
				}
				this.postData.address_id = this.addressinfo.Address_ID;
				// 获取用户收货地址，获取订单信息，后台判断运费信息
				this.createOrderCheck();
				this.back_address_id = 0;

			}).catch(() => {
				uni.showModal({
					title: '错误',
					content: '收货地址获取失败',
					showCancel: false
				});
				return false;
			})

			this.addressLoading = true;


		},
		createOrderCheck(){
			createOrderCheck(this.postData).then(res=>{
				this.orderInfo = res.data;
				this.couponlist = res.data.coupon_list;
				this.orderLoading = true;
				this.postData.shipping_id = res.data.Order_Shipping.shipping_id;
				for(var i in this.orderInfo.shipping_company) {
					if(i == this.postData.shipping_id) {
						this.shipping_name = `${this.orderInfo.shipping_company[i]}`
					}
				}
			}).catch(e=>{
				uni.showToast({
					title: e.data,
					icon: 'none'
				})
			})
		}
    }
}
</script>

<style scoped lang="scss">
    .wrap {
        background: #fff;
    }
    /* 收货地址 start */
    .address {
        /* margin: 15px 0 10px; */
        display: flex;
        align-items: center;
        padding: 44rpx 38rpx 45rpx;
        // border-top: 30rpx solid #F3F3F3;
        border-bottom: 20rpx solid #F3F3F3;
		.add_msg {
			flex: 1;
			font-size: 28rpx;
		}
		.right {
		    width: 18rpx;
		    height: 27rpx;
		    margin-left: 34rpx;
		}
    }
    .loc_icon {
        width: 41rpx;
        height: 51rpx;
        margin-right: 31rpx;
    }

    .name {
        margin-bottom: 30rpx;
        font-size: 28rpx;
		color: #333;
		line-height: 22rpx;
    }
    .name>span {
        margin-left: 10rpx;
    }
    .location {
        font-size: 24rpx;
        color: #333;
		line-height: 32rpx;
    }
    /* 收货地址 end */
    /* 订单信息 start */
    .order_msg {
        padding: 0 40rpx 0 30rpx;
    }
    .biz_msg {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
		padding: 20rpx 30rpx 0rpx;
    }
    .biz_logo {
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
		border-radius: 35rpx;
    }
    .biz_name {
        font-size: 28rpx;
		color: #333;
		line-height: 30rpx;
    }
    .pro {
        display: flex;
        margin-bottom: 50rpx;
    }
	.order_msg .pro:last-child {
		margin-bottom:17rpx
	}
    .pro-img {
        width: 200rpx;
        height: 200rpx;
        margin-right: 28rpx;
    }
    .pro-name {
        font-size: 26rpx;
		display: -webkit-box;
		-webkit-line-clamp:2;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		line-height: 30rpx;
		height: 61rpx
    }
	.pro-msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
    .attr {
			display: inline-block;
			height: 50rpx;
			line-height: 50rpx;

			color: #666;
			font-size: 24rpx;
			// padding: 0 20rpx;
			// margin: 25rpx 0 24rpx;
			span {
				padding: 14rpx 20rpx;
				margin: 25rpx 0 24rpx;
				background: #FFF5F5;
			}
    }
    .pro-price {
        color: #F43131;
        font-size: 36rpx;
		span {
			font-size: 24rpx;
			font-style: normal;
		}
		.amount {
		    float: right;
		    color: #333;
			font-size: 22rpx;
			.num {
				font-size: 30rpx;
			}
		}
    }

    /* 订单信息 end */
    /* 订单其他信息 start */
    .other {
        padding: 30rpx 40rpx 0 30rpx;
        font-size: 22rpx;
		.right {
			margin-left: 18rpx;
			width: 15rpx;
			height: 23rpx;
		}
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
		.inputs{
			font-size: 24rpx;
		}
    }
    .o_title .van-switch {
        float: right;
    }
    .o_desc,
	.o_de {
		font-size: 22rpx;
        margin-top: 10rpx;
		text {
			color: #F43131;
		}
    }
	.o_de {
		color: #999;
	}
    .words {
        justify-content: flex-start;
    }
    .words .inputs {
        border: 0;
        margin-left: 20rpx;
		flex: 1;
    }
    .total {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 40rpx 0;
        font-size: 24rpx;
        padding-right: 30rpx;
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
        width: 270rpx;
        background: #F43131;
        text-align: center;
        color: #fff;
        line-height: 100rpx;
		font-size: 34rpx;
		border-radius: 0;
		border:none;
    }
    .totalinfo {
        flex: 1;
        padding-left: 93rpx;
		line-height: 30rpx;
    }
    .info {
        font-size: 24rpx;
		.money {
			color: #F43131;
			font-size: 30rpx;
			.m_icon {
				font-size: 24rpx;
			}
		}
    }
    .tips {
        font-size: 20rpx;
        color: #979797;
    }
	.bMbx{
		padding: 0rpx 20rpx;
		.fMbx{
			font-size: 32rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			padding: 36rpx 0rpx;
		}
		.iMbx{
			display: flex;
			justify-content: space-between;
			height: 104rpx;
			border-bottom:1px solid rgba(230,230,230,1);
			align-items: center;
			font-size: 28rpx;
		}
	}

	.sure{
		height: 90rpx;
		width: 100%;
		background-color: #F43131;
		color: #fff;
		font-size: 32rpx;
		margin-top: 96rpx;
		line-height: 90rpx;
		text-align: center;
	}
	// 提醒用户添加收货地址信息
	.remind-wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		.remind-add {
			background: #fff;
			width: 90%;
			padding: 50rpx 0 0;
			border-radius: 20rpx;
			overflow: hidden;
			.text-align-center {
				text-align: center;
			}
			.mb20 {
				margin-bottom:20rpx;
			}
			.remind_desc {
				padding: 0 20rpx;
				font-size: 30rpx;
				margin: 40rpx 0;
				color: #666;
			}
			.remind_btns {
				display: flex;
				border-top: 1rpx solid #efefef;
				line-height: 90rpx;
				.fl1 {
					flex: 1;
				}
				.confirm {
					background: #F43131;
					color: #fff;
				}
			}
		}
	}
</style>
