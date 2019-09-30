<template>
    <div>
      <!--  <pagetitle title="提交订单"></pagetitle> -->
        <div class="address" v-if="orderInfo.is_virtual == 0 && orderInfo.NeedShipping == 1">
            <img class="loc_icon" src="/static/location.png" alt="">
            <div class="add_msg">
                <div class="name">收货人：{{addressinfo.Address_Name}} <span>{{addressinfo.Address_Mobile | formatphone}}</span></div>
                <div class="location">收货地址：{{addressinfo.Address_Province_name}}{{addressinfo.Address_City_name}}{{addressinfo.Address_Area_name}}{{addressinfo.Address_Town_name}}</div>
            </div>
            <img class="right" src="/static/right.png" alt="">
        </div>
        <div class="order_msg" v-for="(pro,pro_id) in orderInfo.CartList">
            <div class="biz_msg">
                <img :src="orderInfo.ShopLogo" class="biz_logo" alt="">
                <span class="biz_name">{{orderInfo.ShopName}}</span>
            </div>
            <div class="pro" v-for="(attr,attr_id) in pro">
                <img class="pro-img" :src="attr.ImgPath" alt="">
                <div class="pro-msg">
                    <div class="pro-name">{{attr.ProductsName}}</div>
                    <div class="attr" ><span>白色;S码</span></div>
                    <div class="pro-price"><span>￥</span>{{attr.ProductsPriceX}} <span class="amount">x<span class="num">{{attr.Qty}}</span></span></div>
                </div>
            </div>
        </div>
        <div class="other" v-if="orderInfo.is_virtual == 0 && orderInfo.NeedShipping == 1">
            <div class="bd">
                <div class="o_title">
                    <span>运费选择</span>
                    <span style="text-align:right; color: #888;" @click="changeShip">
						<span>请选择物流</span>
                        <image  class="right" src="/static/right.png" alt=""></image>
                    </span>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title" @click="changeCoupon">
                    <span>优惠券选择</span>
                    <span></span>
                    <image  src="/static/right.png" class="right" alt=""></image>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否参与积分抵扣</span>
                    <switch checked color="#04B600" @change="switchChange" />
                </div>
                <div class="o_de">您当前共有 <text>{{userInfo.User_Integral}}</text>积分，每<text>1000</text>积分可以抵扣<text>1</text>元，总共可抵<text>0.4</text>元</div>
            </div>
        </div>
        <div class="other" v-if="orderInfo.is_use_money == 1">
            <div class="bd">
                <div class="o_title">
                    <span>是否使用余额</span>
                    <switch checked color="#04B600" @change="switch1Change" />
                </div>
                <input class="o_desc" placeholder="请输入金额">
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否开具发票</span>
					<switch checked color="#04B600" @change="switch2Change" />
                </div>
				<input type="text" class="o_desc" placeholder="请输入发票抬头和纳税人识别号" />
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title  words">
                    <span>买家留言</span>
                    <input type="text" placeholder="请填写留言内容">
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
                <div class="info">共{{orderInfo.prod_count}}件商品 总计：￥{{orderInfo.Order_TotalPrice}}</div>
                <div class="tips">*本次购物一共可获得{{orderInfo.Integral_Get}}积分</div>
            </div>
            <div class="submit">提交订单</div>
        </div>
        <popup-layer ref="popupRef" :direction="'top'">
        	<div class="bMbx" v-if="type=='shipping'">
        		<div class="fMbx">运费选择</div>
        		<div class="iMbx">
        			<div>
        				顺丰 免邮
        			</div>
        			<div>
        				 <checkbox  checked=""  color="#F43131"/>
        			</div>
        		</div>
        		<div class="iMbx">
        			<div>
        				中通 免邮
        			</div>
        			<div>
        				 <checkbox  checked=""  color="#F43131"/>
        			</div>
        		</div>
				<div class="iMbx">
					<div>
						EMS ￥15.00
					</div>
					<div>
						 <checkbox  checked=""  color="#F43131"/>
					</div>
				</div>
        	</div>
			<div class="bMbx" v-if="type=='coupon'">
				<div class="fMbx">优惠券选择</div>
				<div class="iMbx">
					<div>
						满20 - 10
					</div>
					<div>
						 <checkbox  checked=""  color="#F43131"/>
					</div>
				</div>
				<div class="iMbx">
					<div>
						满10 - 5
					</div>
					<div>
						 <checkbox  checked=""  color="#F43131"/>
					</div>
				</div>
			</div>
        	<div class="sure" @click="closeMethod">
        			确定
        	</div>
        </popup-layer>
    </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue';
import {getAddress,getCart,createOrderCheck,getUserInfo} from '../../common/fetch.js';
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
			userInfo: {}
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
		this.getAddress();
		this.createOrderCheck();
		this.getUserInfo();
	},
	onLoad(options) {
		this.cart_key = options.cart_key;
	},
    methods: {
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
					console.log(this.addressinfo)
				}
			}).catch(e => console.log(e))
		},
		createOrderCheck(){
			createOrderCheck({User_ID: this.User_ID, Users_ID:this.Users_ID,cart_key:this.cart_key}).then(res=>{
				console.log(res)
				if(res.errorCode == 0){
					this.orderInfo = res.data;
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
        border-top: 30rpx solid #FFF3F3F3;
        border-bottom: 20rpx solid #FFF3F3F3;
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
    .pro-img {
        width: 200rpx;
        height: 200rpx;
        margin-right: 28rpx;
    }
    .pro-name {
        font-size: 26rpx;
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
</style>