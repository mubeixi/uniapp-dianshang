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
                <div class="name">收货人：张小凡 <span>136****1133</span></div>
                <div class="location">收货地址：郑州市金水区农业路与花园路国贸广场22楼2208室</div>
            </div>
            <img class="right" src="/static/right.png" alt="">
        </div>
        <div class="order_msg">
            <div class="biz_msg">
                <img src="/static/detail/user1.png" class="biz_logo" alt="">
                <span class="biz_name">张小凡时尚衣橱</span>
            </div>
            <div class="pro">
                <div class="pro-div">
					<img class="pro-img" src="/static/check/pro1.png" alt="">
				</div>
                <div class="pro-msg">
                    <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                    <div class="attr"><span>白色;S码</span></div>
                    <div class="pro-price"><span>￥</span>169.00 <span class="amount">x1</span></div>
                </div>
            </div>
            <div class="pro">
                <div class="pro-div">
                	<img class="pro-img" src="/static/check/pro1.png" alt="">
                </div>
                <div class="pro-msg">
                    <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                    <div class="attr"><span>白色;S码</span></div>
                    <div class="pro-price"><span>￥</span>169.00<span class="amount">x1</span></div>
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
                    <span class="c8">1.30元</span>
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
                <div class="o_desc c8">23.50元</div>
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
                <div class="o_desc c8">张小凡 5454545454745</div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title  words">
                    <span>买家留言</span>
                    <span class="msg c8" >白色和黑色各一个</span>
                </div>
            </div>
        </div>
        <div class="total">
            <span>共<span>2</span>件商品</span>
            <span class="mbx">小计：<span class="money moneys">￥</span><span class="money">388.00</span></span>
        </div>
        <div style="height:100px;background:#efefef;"></div>
        <div class="order_total">
            <div class="totalinfo">
                <div class="info">共3件商品 总计：<span class="mbxa">￥<span>507.00</span></span></div>
                <div class="tips">*本次购物一共可获得107积分</div>
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
        }
    },
    methods: {
        // 点击遮罩
        showOverlay(){
            this.show = false;
            this.wl_show = false;
        },
		submit(){
			this.$refs.popupLayer.show();
		}
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
        width: 100%;
        height: 100%;
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