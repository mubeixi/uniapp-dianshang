<template>
    <div v-if="loading">
      <!--  <pagetitle title="提交订单"></pagetitle> -->
        <div class="address" v-if="orderInfo.is_virtual == 0 && orderInfo.NeedShipping == 1">
            <img class="loc_icon" src="/static/location.png" alt="">
            <div class="add_msg" v-if="!remindAddress">
                <div class="name">收货人：{{addressinfo.Address_Name}} <span>{{addressinfo.Address_Mobile | formatphone}}</span></div>
                <div class="location">收货地址：{{addressinfo.Address_Province_name}}{{addressinfo.Address_City_name}}{{addressinfo.Address_Area_name}}{{addressinfo.Address_Town_name}}</div>
            </div>
			<div class="add_msg" v-else>
				<div style="font-size:28rpx;">暂无收货地址，去添加</div>
			</div>
            <img class="right" src="/static/right.png" @click="gotoAddressList" alt="">
        </div>
		<div class="biz_msg">
			<img :src="orderInfo.ShopLogo" class="biz_logo" alt="">
			<span class="biz_name">{{orderInfo.ShopName}}</span>
		</div>
        <div class="order_msg">
			<block  v-for="(pro,pro_id) in orderInfo.CartList" :key="pro_id">
				<div class="pro" v-for="(attr,attr_id) in pro" :key="attr_id">
					<img class="pro-img" :src="attr.ImgPath" alt="">
					<div class="pro-msg">
						<div class="pro-name">{{attr.ProductsName}}</div>
						<div class="attr" v-if="attr.Productsattrstrval"><span>{{attr.Productsattrstrval}}</span></div>
						<div class="pro-price"><span>￥</span>{{attr.ProductsPriceX}} <span class="amount">x<span class="num">{{attr.Qty}}</span></span></div>
					</div>
				</div>
			</block>
        </div>
        <div class="other" v-if="orderInfo.is_virtual == 0 && orderInfo.NeedShipping == 1">
            <div class="bd">
                <div class="o_title">
                    <span>运费选择</span>
                    <span style="text-align:right; color: #888;" @click="changeShip">
						<span>{{shipping_name?(shipping_name):'请选择物流'}}</span>
                        <image  class="right" src="/static/right.png" alt=""></image>
                    </span>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title" @click="changeCoupon">
                    <span>优惠券选择</span>
                    <span style="text-align: right; color: #888;">
						<span >{{coupon_desc?coupon_desc:'您有优惠券可用'}}</span>
						<image  src="/static/right.png" class="right" alt=""></image>
					</span>
                </div>
            </div>
        </div>
        <div class="other" v-if="orderInfo.max_diyong_intergral > 0">
            <div class="bd">
                <div class="o_title">
                    <span>是否参与积分抵扣</span>
                    <switch :checked="intergralChecked" color="#04B600" @change="intergralSwitchChange" />
                </div>
                <div class="o_de" v-if="intergralChecked">您当前共有 <text>{{userInfo.User_Integral}}</text>积分，每<text>{{orderInfo.Integral_Buy}}</text>积分可以抵扣<text>1</text>元，本次可使用<text>{{orderInfo.max_diyong_intergral}}</text>积分,总共可抵<text>{{orderInfo.max_Integral_Money}}</text>元</div>
            </div>
        </div>
        <div class="other" v-if="orderInfo.is_use_money == 1">
            <div class="bd">
                <div class="o_title">
                    <span>是否使用余额</span>
                    <switch :checked="userMoneyChecked" color="#04B600" @change="userMoneyChange" />
                </div>
				<div class="o_de">您当前共有余额: <text>{{userInfo.User_Money}}</text></div>
                <input v-if="userMoneyChecked" class="o_desc" placeholder="请输入金额" type="number" @confirm="confirm_user_money">
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否开具发票</span>
					<switch :checked="faPiaoChecked" color="#04B600" @change="faPiaoChange" />
                </div>
				<input v-if="faPiaoChecked" @confirm="faPiaoConfirm" type="text" class="o_desc" placeholder="请输入发票抬头和纳税人识别号" />
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title  words">
                    <span>买家留言</span>
                    <input type="text" @confirm="remarkConfirm" placeholder="请填写留言内容">
                </div>
            </div>
        </div>
        <!-- <div class="total">
            <span style="margin-right:20rpx;">共<span>{{orderInfo.total_count}}</span>件商品</span>
            <span>小计：<span>￥</span><span class="money">{{orderInfo.Order_TotalPrice}}</span></span>
        </div> -->
        <div style="height:100px;background:#efefef;"></div>
        <div class="order_total">
            <div class="totalinfo">
                <div class="info">共{{orderInfo.prod_count}}件商品 总计：￥{{orderInfo.Order_Fyepay}}</div>
                <div class="tips">*本次购物一共可获得{{orderInfo.Integral_Get}}积分</div>
            </div>
            <div class="submit" @click="form_submit">提交订单</div>
        </div>
        <popup-layer ref="popupRef" :direction="'top'">
        	<div class="bMbx" v-if="type=='shipping'">
        		<div class="fMbx">运费选择</div>
        		<div class="iMbx" v-for="(ship,shipid) in orderInfo.shipping_company" :key="shipid">
        			<div>
        				{{ship}}
        			</div>
					<radio-group @change="ShipRadioChange">
						<radio :value="shipid" :checked="shipid===ship_current" style="float:right;" color="#F43131"/>
					</radio-group>
        		</div>
        	</div>
			<div class="bMbx" v-if="type=='coupon'">
				<div class="fMbx">优惠券选择</div>
				<div class="iMbx" v-for="(coupon,i) in orderInfo.coupon_list" :key="i">
					满{{coupon.Coupon_Condition}} - {{coupon.Coupon_Cash > 0 ? coupon.Coupon_Cash : coupon.Coupon_Discount}}
					<radio-group @change="radioChange">
						<radio :value="coupon.Coupon_ID" :checked="i===current" style="float:right;" color="#F43131"/>
					</radio-group>
				</div>
			</div>
        	<div class="sure" @click="closeMethod">
        		确定
        	</div>
        </popup-layer>
		<view class="remind-wrap" v-if=" remindAddress">
			<div class="remind-add">
				<div class="text-align-center mb20">新建收货地址</div>
				<view class="remind_desc">
					您还没有收货地址，请先添加一个新的收货地址
				</view>
				<view class="remind_btns text-align-center">
					<view class="text-align-center fl1" @click="goback">返回</view>
					<view class="text-align-center fl1 confirm" @click="goEditAdd">
						新建
					</view>
				</view>
			</div>			
		</view>
    </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue';
import {getAddress,getCart,createOrderCheck,getUserInfo,createOrder} from '../../common/fetch.js';
import {goBack} from '../../common/tool.js'
export default {
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
			Users_ID:'wkbq6nc2kc',
			User_ID:3,
			addressinfo: {}, // 收货地址信息
			orderInfo: {},
			type: 'shipping',
			userInfo: {},
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
				shipping_id: '',
				address_id: '',
				is_full_reduction: '',// 是否使用满减功能
				coupon_id: '', 
				use_integral: 0, // 用于抵扣的积分数
				use_money: 0,  // 余额支付金额
				invoice_info: '',  // 发票抬头
				order_remark: '', // 买家留言
			},
			Order_ID: 0,
			loading: false, //数据是否加载完成
			remindAddress: false, // 提醒添加收货地址
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
		this.createOrderCheck();
		this.getUserInfo();
		this.getAddress();
	},
	onLoad(options) {
		this.postData.cart_key = options.cart_key;
		this.postData.cart_buy = options.cart_buy;
	},
	computed: {
		
	},
    methods: {
		// 地址列表页
		gotoAddressList(){
			uni.navigateTo({
				url: '../addressList/addressList?from_page=checkout'
			});
		},
		goback(){
			goBack();
		},
		// 跳转新增地址页面
		goEditAdd(){
			uni.navigateTo({
				url: '../editAddress/editAddress'
			})
		},
		// 提交订单
		form_submit() {
			if(!this.postData.shipping_id) {
				uni.showToast({
					title: '请选择物流'	
				})
				return;
			}
			createOrder(this.postData).then(res=>{
				console.log(res)
				if(res.errorCode == 0) {
					// 如果order_totalPrice <= 0  直接跳转 订单列表页
					this.Order_ID = res.data.Order_ID;
					uni.navigateTo({
						url: '../pay/pay?Order_ID='+ res.data.Order_ID
					})
				}
			}).catch(e=>{
				
			});
			// uni.setStorage({
			//     key: 'postData',
			//     data: this.postData,
			//     success: function () {
			//         console.log('success');
			//     }
			// });
			
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
			this.postData.use_money = 0;
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
			let invoice_info = e.detail.value;
			if(this.postData.need_invoice == 1) {
				if(invoice_info == '') {
					uni.showModal({
						title: '发票抬头不能为空'
					})
					return;
				}				
			}
			this.postData.invoice_info = invoice_info;
		},
		// 余额支付输入完成
		confirm_user_money(e){
			// 用户可用余额
			let user_money = parseInt(this.userInfo.User_Money);
			// 用户输入的金额
			let input_money = parseInt(e.detail.value);
			if(input_money > user_money) {
				uni.showModal({
					title: '金额大于您的可用余额',
					icon:  'none'
				});
				return;
			}
			this.postData.use_money = input_money;
			this.createOrderCheck();
		},
		// 留言
		remarkConfirm(e) {
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
		getUserInfo(){
			getUserInfo({User_ID:this.User_ID,Users_ID:this.Users_ID}).then(res => {
				console.log(res)
				if(res.errorCode == 0) {
					this.userInfo = res.data;
				}
			})
		},
		changeCoupon(){
			this.type = 'coupon';
			this.$refs.popupRef.show();
		},
        // 选择运费
        changeShip(){
			this.type = 'shipping';
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
		getAddress(){
			getAddress({Users_ID: this.Users_ID,User_ID: this.User_ID,}).then(res=>{
				console.log(res)
				if(res.errorCode == 0) {
					for(let i in res.data){
						for(let j in res.data[i]){
							if(j=='Address_Is_Default'){
								res.data[i][j] == 1;
								this.addressinfo = res.data[i]
							}
						}
					}
					this.postData.address_id = this.addressinfo.Address_ID;
				}else if(res.errorCode == 2) {
					this.addressinfo = '';
				}
			}).catch(e => console.log(e))
		},
		createOrderCheck(){
			createOrderCheck(this.postData).then(res=>{
				if(res.errorCode == 0){
					this.orderInfo = res.data;
					this.couponlist = res.data.coupon_list;
					this.loading = true;
					if(this.orderInfo.is_virtual == 0 && this.orderInfo.NeedShipping == 1 && !this.addressinfo) {
						// 需要收货地址
						this.remindAddress = true;
					}
				}else {
					// 获取失败
				}
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
        padding: 44rpx;
        border-top: 30rpx solid #F3F3F3;
        border-bottom: 20rpx solid #F3F3F3;
		.add_msg {
			flex: 1;
		}
    }
    .loc_icon {
        width: 41rpx;
        height: 51rpx;
        margin-right: 31rpx;
    }
    .right {
        width: 18rpx;
        height: 27rpx;
        margin-left: 34rpx;
    }
    .name {
        margin-bottom: 30rpx;
        font-size: 28rpx;
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
        padding: 0 30rpx;
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
    }
    .pro {
        display: flex;
        margin-bottom: 50rpx;
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
		line-height: 28rpx;
    }
	.pro-msg {
		flex: 1;
	}
    .attr {
        display: inline-block;
        height: 50rpx;
        line-height: 50rpx;
        background: #FFF5F5;
        color: #666;
        font-size: 24rpx;
        padding: 0 20rpx;
        margin: 25rpx 0 24rpx;
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
			.num {
				font-size: 30rpx;
			}
		}
    }
    
    /* 订单信息 end */
    /* 订单其他信息 start */
    .other {
        padding: 30rpx 30rpx 0;
        font-size: 22rpx;
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
		input {
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
    .words input {
        border: 0;
        margin-left: 20rpx;
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
		background: rgba(0,0,0,.2);
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
				margin: 40rpx 0 60rpx;
			}
			.remind_btns {
				display: flex;
				border-top: 1rpx solid #efefef;
				line-height: 80rpx;
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