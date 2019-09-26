<template>
    <div>
      <!--  <pagetitle title="提交订单"></pagetitle> -->
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
                    <div class="pro-price"><text>￥</text>169.00 <span class="amount">x1</span></div>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>运费选择</span>
                    <span style="text-align:right;" @click="changeShip">
                        <span>顺丰</span>
                        <span>免邮费</span>
                        <img height="10" width="8" style="margin-left:10px;" src="/static/right.png" alt="">
                    </span>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>优惠券选择</span>
                    <span></span>
                    <img height="10" width="8" src="/static/right.png" alt="">
                </div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否参与积分抵扣</span>
                    <switch checked color="#04B600" @change="switchChange" />
                </div>
                <div class="o_desc">您当前共有1000积分，每1000积分可以抵扣1元，总共可抵0.4元</div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否使用余额</span>
                    <switch checked color="#04B600" @change="switch1Change" />
                </div>
                <div class="o_desc">请输入金额</div>
            </div>
        </div>
        <div class="other">
            <div class="bd">
                <div class="o_title">
                    <span>是否开具发票</span>
					<switch checked color="#04B600" @change="switch2Change" />
                </div>
                <div class="o_desc">请输入发票抬头和纳税人识别号</div>
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
            <div class="submit">提交订单</div>
        </div>
        <!-- <van-overlay
            :show="show"
            @click="showOverlay"
            z-index=1000
        /> -->
        <!-- 运费选择 -->
        <div class="wl" v-if="wl_show">
            <div class="wl_title">运费选择</div>
           <!-- <van-checkbox-group v-model="result" style="width:95%;">
                <van-cell-group max=1>
                    <van-cell
                    v-for="(item, index) in wl_list"
                    clickable
                    :key="item"
                    :title="`${item.name} ${item.price}`"
                    @click="toggle(index)"
                    >
                    <van-checkbox
                        :name="item"
                        ref="checkboxes"
                        slot="right-icon"
                        shape="square"
                    />
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group> -->
            <div class="btn">确定</div>
        </div>
    </div>
</template>

<script>
// import pagetitle from '@/components/title'
export default {
    // components: {
    //     pagetitle
    // },
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
        }
    },
    methods: {
        // 选择运费
        changeShip(){
            this.show = true;
            this.wl_show = true;
        },
        // 点击遮罩
        showOverlay(){
            this.show = false;
            this.wl_show = false;
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        },
		switch2Change(){
			
		},
		switch1Change(){
			
		},
		switchChange(){
			
		}
    }
}
</script>

<style scoped>
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
    }
    .pro-price text {
        font-size: 24rpx;
        font-style: normal;
    }
    .amount {
        float: right;
        color: #333;
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
    }
    .o_title .van-switch {
        float: right;
    }
    .o_desc {
        margin-top: 10rpx;
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
        width: 270rpx;
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
    /* 物流选择 */
    .wl {
        position: fixed;
        bottom: 0;
        padding: 0 20rpx;
        z-index: 1001;
        width: 100%;
        background: #fff;
    }
    .wl_title {
        padding-top: 36rpx; 
        text-align: center;
        margin-bottom: 20rpx;
    }
    .wl .btn {
        height:90rpx;
        line-height: 90rpx;
        color: #fff;
        font-size: 32rpx;
        text-align: center;
        background: #F43131;
        width: 100%;
        margin-left: -20rpx;
        margin-top: 60rpx;
    }
</style>