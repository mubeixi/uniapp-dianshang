<template>
    <div>
       <page-title title="付款" rightHidden="true"></page-title>
        <div class="state">
            <img src="/static/wait.png" height="30" width="30" alt="">
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
                <img class="pro-img" src="/static/check/pro1.png" alt="">
                <div class="pro-msg">
                    <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                    <div class="attr"><span>白色;S码</span></div>
                    <div class="pro-price"><i>￥</i>169.00 <span class="amount">x1</span></div>
                </div>
            </div>
            <div class="pro">
                <img class="pro-img" src="/static/check/pro1.png" alt="">
                <div class="pro-msg">
                    <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                    <div class="attr"><span>白色;S码</span></div>
                    <div class="pro-price"><i>￥</i>169.00 <span class="amount">x1</span></div>
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
        <!-- <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否参与积分抵扣</span>
                    <van-switch
                        v-model="checked"
                        size='25px'
                        active-color="#04B600"
                    />
                </div>
                <div class="o_desc">您当前共有1000积分，每1000积分可以抵扣1元，总共可抵0.4元</div>
            </div>
        </div> -->
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否使用余额</span>
                    <van-switch
                        v-model="checked"
                        size='25px'
                        active-color="#04B600"
                    />
                </div>
                <div class="o_desc c8">23.50元</div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否开具发票</span>
                    <van-switch
                        v-model="checked"
                        size='25px'
                        active-color="#04B600"
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
            <span>小计：<i>￥</i><span class="money">388.00</span></span>
        </div>
        <div style="height:100px;background:#efefef;"></div>
        <div class="order_total">
            <div class="totalinfo">
                <div class="info">共3件商品 总计：￥507.00</div>
                <div class="tips">*本次购物一共可获得107积分</div>
            </div>
            <div class="submit">去支付</div>
        </div>
        <van-overlay
            :show="show"
            @click="showOverlay"
            z-index=1000
        />
        
    </div>
</template>

<script>
// import pagetitle from '@/components/title'
export default {
    components: {
        // pagetitle
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
    }
}
</script>

<style scoped>
    .wrap {
        background: #fff;
    }
    .state {
        padding: 10px 15px;
        font-size: 14px;
        display: flex;
        align-items: center;
        border-top: 15px solid #FFF3F3F3;
    }
    .state-desc {
        margin-left: 12px;
    }
    .c8 {
        color: #888;
        font-size: 13px;
    }
    /* 收货地址 start */
    .address {
        /* margin: 15px 0 10px; */
        display: flex;
        align-items: center;
        padding: 20px;
        border-top: 15px solid #FFF3F3F3;
        border-bottom: 10px solid #FFF3F3F3;
    }
    .loc_icon {
        width: 20px;
        height: 25px;
        margin-right: 15px;
    }
    .right {
        width: 10px;
        height: 15px;
        margin-left: 15px;
    }
    .name {
        margin-bottom: 15px;
        font-size: 13px;
    }
    .name>span {
        margin-left: 5px;
    }
    .location {
        font-size: 12px;
        color: #444;
    }
    /* 收货地址 end */
    /* 订单信息 start */
    .order_msg {
        padding: 10px 15px 0px;
    }
    .biz_msg {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .biz_logo {
        width: 35px;
        height: 35px;
        margin-right: 10px;
    }
    .biz_name {
        font-size: 14px;
    }
    .pro {
        display: flex;
        margin-bottom: 25px;
    }
    .pro-img {
        width: 100px;
        height: 100px;
        margin-right: 14px;
    }
    .pro-name {
        font-size: 13px;
        margin-bottom: 10px;
    }
    .attr {
        display: inline-block;
        height: 25px;
        line-height: 25px;
        background: #FFF5F5;
        color: #666;
        font-size: 12px;
        padding: 0 10px;
        margin-bottom: 12px;
    }
    .pro-price {
        color: #F43131;
        font-size: 18px;
    }
    .pro-price i {
        font-size: 12px;
        font-style: normal;
    }
    .amount {
        float: right;
        color: #333;
    }
    /* 订单信息 end */
    /* 订单其他信息 start */
    .other {
        padding: 15px 15px 0;
        font-size: 11px;
    }
    .other .bd {
        padding-bottom: 15px;
        border-bottom: 1px solid #efefef;
    }
    .o_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }
    .o_title .van-switch {
        float: right;
    }
    .o_desc {
        margin-top: 5px;
    }
    .msg {
        margin-left: 10px;
    }
    .words {
        justify-content: flex-start;
    }
    .words input {
        border: 0;
        margin-left: 10px;
    }
    .total {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 20px 0;
        font-size: 12px;
        padding-right: 15px;
    }
    i{
        font-style: normal;
    }
    .total .money {
        font-size: 15px;
        color: #F43131;
    }
    /* 订单其他信息 end */
    /* 提交订单 */
    .order_total {
        height: 50px;
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        background: #fff;
        z-index: 100;
    }
    .submit {
        width: 135px;
        background: #F43131;
        text-align: center;
        color: #fff;
        line-height: 50px;
    }
    .totalinfo {
        flex: 1;
        text-align: center;
    }
    .info {
        font-size: 12px;
    }
    .tips {
        font-size: 10px;
        color: #979797;
    }
    /* 物流选择 */
    .wl {
        position: fixed;
        bottom: 0;
        padding: 0 10px;
        z-index: 1001;
        width: 100%;
        background: #fff;
    }
    .wl_title {
        padding-top: 18px; 
        text-align: center;
        margin-bottom: 10px;
    }
    .wl .btn {
        height:45px;
        line-height: 45px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        background: #F43131;
        width: 100%;
        margin-left: -10px;
        margin-top: 30px;
    }
</style>