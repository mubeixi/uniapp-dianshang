<template>
    <div>
       <page-title title="付款" rightHidden="true"></page-title>
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
        <div class="order_msg" v-for="(pro,pro_id) in orderInfo.CartList" :key="pro_id">
            <div class="biz_msg">
                <img :src="orderInfo.ShopLogo" class="biz_logo" alt="">
                <span class="biz_name">{{orderInfo.ShopName}}</span>
            </div>
            <div class="pro" v-for="(attr,attr_id) in pro" :key="attr_id">
                <img class="pro-img" :src="attr.ImgPath" alt="">
                <div class="pro-msg">
                    <div class="pro-name">{{attr.ProductsName}}</div>
                    <div class="attr" v-if="attr.Productsattrstrval"><span>{{attr.Productsattrstrval}}</span></div>
                    <div class="pro-price"><span>￥</span>{{attr.ProductsPriceX}} <span class="amount">x<span class="num">{{attr.Qty}}</span></span></div>
                </div>
            </div>
        </div>
        
		<div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>运费选择</span>
                    <span style="text-align:right;" class="c8">
                        <span>顺丰</span>
                        <span>免邮费</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>优惠券选择</span>
                    <span class="c8">10元优惠券</span>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>积分抵扣</span>
                    <span class="c8">{{orderInfo.max_Integral_Money}}</span>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否使用余额</span>
                    <switch
                        checked="checked"
                        size='25px'
                        color="#04B600"
                    />
                </div>
                <div class="o_desc c8">{{postData.use_money}}</div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否开具发票</span>
                    <switch
                        checked="checked"
                        size='25px'
                        color="#04B600"
                    />
                </div>
                <div class="o_desc c8">{{postData.invoice_info}}</div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title  words">
                    <span>买家留言</span>
                    <span class="msg c8" >{{postData.order_remark}}</span>
                </div>
            </div>
        </div>
        <div class="total">
            <span>共<span>{{orderInfo.prod_count}}</span>件商品</span>
            <span class="mbx">小计：<span class="money moneys">￥</span><span class="money">{{orderInfo.Order_Fyepay}}</span></span>
        </div>
        <div style="height:100px;background:#efefef;"></div>
        <div class="order_total">
            <div class="totalinfo">
                <div class="info">共{{orderInfo.prod_count}}件商品 总计：<span class="mbxa">￥<span>{{orderInfo.Order_Fyepay}}</span></span></div>
                <div class="tips">*本次购物一共可获得{{orderInfo.Integral_Get}}积分</div>
            </div>
            <div class="submit" @click="submit">去支付</div>
        </div>
		<popup-layer ref="popupLayer" :direction="'top'">
			<div class="iMbx">
				<div class="c_method">
					微信支付 <text>￥577.00</text>
				</div>
				<div class="c_method">
					银联支付 <text>￥577.00</text>
				</div>
			</div>
		</popup-layer>
    </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {getAddress,createOrderCheck,getOrder} from '../../common/fetch.js';
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
		this.getOrder();
	},
    data(){
        return {
            show: false, // 遮罩层
            wl_show: false, // 物流选择
            checked: true,
            checked1: true,
            checked2: true,
            checked3: true,
			postData: {},
			orderInfo: '',
			addressInfo: '',
			Order_ID: 0,
        }
    },
    methods: {
		getOrder(){
			getOrder({Order_ID: this.Order_ID,}).then(res=>{
				console.log(res)
				if(res.errorCode == 0) {
					for(var i in res.data[0]) {
						if(i == 'Order_Shipping') {
							res.data[0][i] = JSON.parse(res.data[0][i])
						}
					}
					this.orderInfo = res.data[0];
				}
			})
		},
		getAddress(){
			getAddress({Address_ID: this.postData.address_id}).then(res=>{
				console.log(res)
				if(res.errorCode == 0 ){
					this.addressInfo = res.data[0];
				}
			}).catch(e=>{})
		},
		createOrderCheck(){
			createOrderCheck(this.postData).then(res=>{
				console.log(res)
				if(res.errorCode == 0) {
					this.orderInfo = res.data
				}
			}).catch(e=>{})
		},
        // 点击遮罩
        showOverlay(){
            this.show = false;
            this.wl_show = false;
        },
		submit(){
			this.$refs.popupLayer.show();
		},
		
    }
}
</script>

<style scoped lang="scss">
    .wrap {
        background: #fff;
    }
    .state {
        padding: 20rpx 60rpx;
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
</style>