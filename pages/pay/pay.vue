<template>
    <div>
		<div class="zhezhao" v-if="password_input">
			<div class="input-wrap">
				<div>请输入余额支付密码</div>
				<input type="text" placeholder="请输入密码" @blur="user_password">
				<div class="btns">
					<div @click="cancelInput">取消</div>
					<div @click="confirmInput">确定</div>
				</div>
			</div>
		</div>
       <page-title title="付款" rightHidden="true" bgcolor="#ffffff"></page-title>
        <div class="state">
            <img src="/static/wait.png">
            <span class="state-desc">等待买家付款</span>
        </div>
        <div class="address">
            <img class="loc_icon" src="/static/location.png" alt="">
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
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否使用余额</span>
                    <switch
                        :checked="moneyChecked"
                        size='25px'
                        color="#04B600"
						@change="moneyChange"
                    />
                </div>
                <!-- <div class="o_desc c8">{{orderInfo.Order_Yebc}}</div> -->
				<input type="number" :disabled="!moneyChecked" :placeholder="orderInfo.Order_Yebc" @confirm="moneyInputHandle"/>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否开具发票</span>
                    <switch
                        :checked="invoiceChecked"
                        size='25px'
                        color="#04B600"
						@change="invoiceChange"
                    />
                </div>
                <!-- <div class="o_desc c8">{{orderInfo.Order_InvoiceInfo}}</div> -->
				<input type="text" :disabled="!openInvoice" :placeholder="orderInfo.Order_InvoiceInfo" @confirm="invoiceHandle"/>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title  words">
                    <span>买家留言</span>
                    <input class="msg c8" :placeholder="orderInfo.Order_Remark" @confirm="remarkHandle">
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
				<div class="c_method" @click="wechatPay">
					微信支付 <text>￥{{orderInfo.Order_Fyepay}}</text>
				</div>
				<div class="c_method" @click="aliPay">
					支付宝支付 <text>￥{{orderInfo.Order_Fyepay}}</text>
				</div>
			</div>
		</popup-layer>
		
    </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {getAddress,createOrderCheck,getOrderDetail,orderPay} from '../../common/fetch.js';
export default {
    components: {
       popupLayer
    },
	onLoad(options){
		if(options.Order_ID) {
			this.Order_ID = options.Order_ID;
		}
		// uni.getStorage({
		//     key: 'postData',
		//     success: res => {
		//         console.log(res.data);
		// 		this.postData = res.data;
		// 		this.getAddress();
		// 		this.createOrderCheck();
		//     }
		// });
	},
	onShow() {
		this.getOrderDetail();
	},
    data(){
        return {
            show: false, // 遮罩层
            wl_show: false, // 物流选择
			postData: {},
			orderInfo: '',
			addressInfo: '',
			Order_ID: 0,
			totalMoney: 0, // 应支付金额
			pay_money: 0, // 开启余额支付，表示余额支付的钱，pay_type 为 balance , 先提交一次order_pay,此时pay_money变成剩余应该支付的钱 .不开启余额支付，是应该支付的钱
			pay_type: 'balance', // balance余额支付，余额补差    wechat 微信支付  ali 支付宝支付
			user_pay_password: '',  //余额补差，支付密码
			cate: 'method',
			password_input: false,
			openMoney: true, //是否开启了余额功能
			openInvoice: true, // 是否开启了发票
			order_remark: '', // 留言
        }
    },
	computed:{
		invoiceChecked(){
			return this.orderInfo.Order_NeedInvoice > 0 && this.openInvoice;
		},
		moneyChecked(){
			return this.orderInfo.Order_Yebc > 0 && this.openMoney;
		}
	},
    methods: {
		getOrderDetail(){
			getOrderDetail({Order_ID: this.Order_ID,}).then(res=>{
				console.log(res)
				if(res.errorCode == 0) {
					for(var i in res.data) {
						if(i == 'Order_Shipping') {
							res.data[i] = JSON.parse(res.data[i])
						}
						if(i == 'prod_list') {
							for(var j in res.data[i]) {
								for( var k in res.data[i][j]) {
									if(k == 'attr_info') {
										res.data[i][j][k] = JSON.parse(res.data[i][j][k])
									}									
								}
							}
						}
					}
					this.orderInfo = res.data;
					this.pay_money = this.orderInfo.Order_Yebc
				}
			})
		},
		// 用户重新更改了余额
		moneyInputHandle(e){
			var money = e.detail.value;
			this.pay_money = parseFloat(money).toFixed(2);
			this.orderInfo.Order_Fyepay = parseFloat(this.orderInfo.Order_TotalPrice).toFixed(2) - parseFloat(money).toFixed(2); 
		},
		// 余额支付开关
		moneyChange(e) {
			var checked = e.detail.value;
			if(checked) {
				this.openMoney = true;
				this.pay_money = parseFloat(this.orderInfo.Order_Yebc).toFixed(2);
				this.orderInfo.Order_Fyepay = parseFloat(this.orderInfo.Order_TotalPrice - this.orderInfo.Order_Yebc).toFixed(2); 
			}else {
				this.openMoney = false;
				this.orderInfo.Order_Fyepay = parseFloat(this.orderInfo.Order_TotalPrice).toFixed(2);
				this.pay_money = 0;
			}
		},
		// 修改余额金额
		changeMoney(e) {
			let money = e.detail.value;
			if(this.money < 0) {
				uni.showToast({
					title: '您输入的金额有误'
				})
				return;
			}else {
				this.pay_money = money;
			}
		},
		// 留言
		remarkHandle(e){
			let remark = e.detail.value;
			this.order_remark = remark;
		},
		// 发票信息修改
		invoiceHandle(e) {
			let invoice = e.detail.value;
			if(invoice == '') {
				uni.showToast({
					title: '发票信息不能为空'
				});
				return;
			}else {
				this.invoice_info = invoice;
			}
		},
		// 发票开关
		invoiceChange(e) {
			var checked = e.detail.value;
			if(checked) {
				this.need_invoice = 1;
				this.openInvoice = true;
				this.invoice_info = this.orderInfo.Order_InvoiceInfo;
			}else {
				this.openInvoice = false;
				this.need_invoice = 0;
			}
		},
        // 点击遮罩
        showOverlay(){
            this.show = false;
            this.wl_show = false;
        },
		// 去支付
		submit(){
			// 使用余额支付了
			if(this.pay_money > 0) {
				if(this.orderInfo.Order_Fyepay > 0) {
					// 待支付金额
					this.$refs.popupLayer.show();
				}else {
					// 全部用余额支付了  直接请求
					this.password_input = true;
				}
			}else {
				// 不使用余额支付
				if(this.orderInfo.Order_Fyepay > 0) {
					// 待支付金额
					this.$refs.popupLayer.show();
				}else {
					// 直接请求
					orderPay({Order_ID: this.Order_ID, pay_type: 'balance' ,pay_money: 0, need_invoice: this.need_invoice ,invoice_info: this.invoice_info, order_remark: this.order_remark})
				}
			}
		},
		// 用户选择 微信支付
		wechatPay(){
			this.pay_type = 'wechat';
			this.$refs.popupLayer.close();
			if(this.orderInfo.Order_Fyepay > 0) {
				if(this.pay_money > 0) {
					this.password_input = true;
				}
			}
		},
		// 用户选择支付宝支付
		aliPay(){
			this.pay_type = 'ali';
			this.$refs.popupLayer.close();
			if(this.orderInfo.Order_Fyepay > 0) {
				this.password_input = true;
			}
		},
		// 取消输入支付密码
		cancelInput(){
			this.password_input = false;
		},
		// 用户输入密码完毕
		user_password(e) {
			this.user_pay_password = e.detail.value;
		},
		// 确定输入支付密码
		confirmInput(e){
			orderPay({Order_ID:this.Order_ID , pay_type: 'balance' ,pay_money: this.pay_money,user_pay_password: this.user_pay_password}).then(res=>{
				console.log(res)
				if(res.errorCode == 0) {
					orderPay({Order_ID: this.Order_ID, pay_type: this.pay_type ,pay_money: res.data.Order_Fyepay, need_invoice: this.need_invoice ,invoice_info: this.invoice_info, order_remark: this.order_remark})
				}
			}).catch(e=>{
				
			})
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
		img{
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
	.pro-msg{
		 margin-left: 27rpx;
		 width: 451rpx;
	}
	.pro-div{
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
    i{
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
			border:none;
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
				margin: 20rpx 0;
				border: 1px solid #efefef;
			}
			.btns {
				display: flex;
				justify-content: space-around;
			}
		}
	}
</style>