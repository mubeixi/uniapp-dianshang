<template>
  <div style="position:relative;">
    <div class="top">
        <img src="/static/detail/back.png" @click="goBack" alt="">
        <img src="/static/detail/cart.png" class="cart" alt="">
    </div>
	<!-- 轮播 -->
	<view class="uni-padding-wrap">
	            <view class="page-section swiper">
	                <view class="page-section-spacing">
	                    <swiper class="swiper" circular="true" indicator-dots="indicatorDots" autoplay="autoplay" interval="4000" duration="500" indicator-color="#fff" indicator-active-color="#ff5000">
	                        <swiper-item>
	                             <img src="/static/detail/banner3.png" alt="">
	                        </swiper-item>
	                        <swiper-item>
	                             <img src="/static/detail/banner3.png" alt="">
	                        </swiper-item>
	                        <swiper-item>
	                             <img src="/static/detail/banner3.png" alt="">
	                        </swiper-item>
	                    </swiper>
	                </view>
	            </view>
	</view>
    <!-- 产品信息描述 -->
    <div class="section1">
        <div class="price">
            <span class="n_price"><i>￥</i>169.00</span>
            <span class="o_price"><i>￥</i>189.00</span>
            <span class="share" @click="showTick" data-type="share">分享此产品</span>
        </div>
        <div class="name">女装2019秋季新款撞色丝绒织带钉珠蕾丝网纱连衣裙丝绒织带钉珠蕾丝网纱</div>
        <div class="sold">
            <span>库存2461</span>
            <span>月销368</span>
        </div>
    </div>
    <!-- 领券 -->
    <div class="section2" >
        <div class="btn">领券</div>
        <div class="right" @click="showTick" data-type="ticks">店铺优惠券 <img src="/static/detail/right.png" alt=""></div>
    </div>
    <!-- 包邮等信息 -->
    <div class="section3">
        <span>
            <img src="/static/detail/dh.png" alt="">
            <span>假一赔十</span>
        </span>
        <span>
            <img src="/static/detail/dh.png" alt="">
            <span>包邮</span>
        </span>
        <span>
            <img src="/static/detail/dh.png" alt="">
            <span>7天包退</span>
        </span>
        <span>
            <img src="/static/detail/dh.png" alt="">
            <span>正品保证</span>
        </span>
    </div>
    <!-- 评价 -->
    <div class="comment">
        <div class="c_title">
            <span>评价</span>
            <div class="right" @click="gotoComments">查看全部 <img src="/static/detail/right.png" alt=""></div>
        </div>
        <div class="c_content">
            <div class="c_content_title">
                <img src="/static/detail/user1.png" alt="">
                <span class="user_name">张小凡</span>
                <span class="c_time">2019-09-10</span>
            </div>
            <div class="c_content_msg">衣服好淑女，穿上一下子就变的很有名媛风，好喜欢啊，袖口的珍珠设计让整件衣服变得很高贵，秋天再搭配个外套也绝对好看</div>
            <div class="c_content_img"></div>
        </div>
        <div class="c_content">
            <div class="c_content_title">
                <img src="/static/detail/user2.png" alt="">
                <span class="user_name">张小凡</span>
                <span class="c_time">2019-09-10</span>
            </div>
            <div class="c_content_msg">衣服好淑女，穿上一下子就变的很有名媛风，好喜欢啊，袖口的珍珠设计让整件衣服变得很高贵，秋天再搭配个外套也绝对好看</div>
            <div class="c_content_img">
                <img src="/static/detail/coment1.png" alt="">
                <img src="/static/detail/coment2.png" alt="">
                <img src="/static/detail/coment3.png" alt="">
            </div>
        </div>
    </div>
    <!-- 商品详情 -->
    <div class="pro_detail">
        <div class="p_detail_title">商品详情</div>
    </div>
    <div style="height:50px;"></div>
	<bottom></bottom>
	<popupLayer ref="popupLayer" :direction="'top'">
		<div class="shareinfo" v-if="type=='share'">
			<div class="s_top">
				<div>
					<img src="/static/detail/share1.png" alt="">
					<div>发送好友</div>
				</div>
				<div>
					<img src="/static/detail/share2.png" alt="">
					<div>分享海报</div>
				</div>
			</div>
			<div class="s_bottom" @click="cancel">取消</div>
		</div>		
		<div class="ticks" v-if="type=='ticks'">
		    <div class="t_title">
		        领券
		        <img src="/static/detail/x.png" height="12" width="12" @click="close" alt="">
		    </div>
		    <div class="t_content">
		        <div class="t_left">
		            <div class="t_left_t"><i>￥</i><span class="money">10</span><span>店铺优惠券</span></div>
		            <div class="t_left_c">满199使用</div>
		            <div class="t_left_b">有效期2019.09.10-2019.09.30</div>
		        </div>
		        <div class="t_right">立即领取</div>
		    </div>
		    <div class="t_content">
		        <div class="t_left">
		            <div class="t_left_t"><i>￥</i><span class="money">10</span><span>店铺优惠券</span></div>
		            <div class="t_left_c">满199使用</div>
		            <div class="t_left_b">有效期2019.09.10-2019.09.30</div>
		        </div>
		        <div class="t_right aleady">已领取</div>
		    </div>
		</div>
	</popupLayer>
  </div>
</template>

<script>
import bottom from '../bottom/bottom'
import popupLayer from '../../components/popup-layer/popup-layer.vue'
export default {
    data(){
        return {
            type: '', // 优惠券内容， 分享内容
            shareShow: false,
            ticksShow: false
        }
    },
    components: {
        bottom,
		popupLayer
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        gotoComments(){
            
        },
        showTick(e){
			console.log(e)
			this.type = e.currentTarget.dataset.type
            this.$refs.popupLayer.show();
        },
        close(){
			this.$refs.popupLayer.close();
        },
        cancel(){
            this.$refs.popupLayer.close();
        }
    }
}
</script>

<style scoped lang="scss" >
	/* 轮播图样式 */
	.uni-padding-wrap{
		width: 750rpx;
		height: 750rpx;
		.page-section,.page-section-spacing,.swiper,.uni-swiper-wrapper,.uni-swiper-slides{
				width: 750rpx;
				height: 750rpx;
				img{
					width: 100%;
					height: 100%;
				}
		}
	}
    /* 返回按钮和购物车按钮 */
    .top {
        position: absolute;
        top: 10px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        z-index: 10;
        width: 95%;
    }
    .top img{
        width: 30px;
        height: 30px;
    }
    .ticks,.shareinfo {
        background: #fff;
        width: 100%;
        padding: 30rpx 0 60rpx;
        color: #333;
        z-index: 100;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
    }
    .t_title {
		font-size: 30rpx;
		color: #333;
        text-align:center;
        margin-bottom: 40rpx;
    }
    .t_title img {
        float: right;
        margin-right: 20rpx;
    }
    .t_content {
        position: relative;
        width: 720rpx;
        height: 160rpx;
        background: url('/static/detail/yhq.png') no-repeat ;
        background-size: cover;
        margin: 0 auto 30rpx;
        padding: 20rpx 0 28rpx 40rpx;
        box-sizing: border-box;
        font-size: 22rpx;
        color:  #F43131 ;
    }
    .t_left {
        float: left;
    }
    .t_left .t_left_t .money {
        font-size: 36rpx;
        margin-right: 10rpx;
    }
    .t_left .t_left_t {
        font-size: 26rpx;
        margin-bottom: 10rpx;
    }
    .t_left .t_left_t i {
        font-size: 22rpx;
        font-style: normal;
    }
    .t_right {
        float: right;
        height: 116rpx;
        line-height: 116rpx;
        padding: 0 36rpx;
        font-size: 30rpx;
        border-left: 2rpx dotted #999;
        width: 124rpx;
        text-align: center; 
    }
    .aleady {
        color: #999;
    }
    .shareinfo{
        padding-bottom: 0;
        color: #333;
        font-size: 24rpx;
    }
    .shareinfo>div {
        text-align: center;
    }
    .s_top {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .s_top img {
        width: 76rpx;
        height: 76rpx;
        display: block;
        margin: 0 auto 10rpx;
    }
    .s_top>div:nth-child(1) {
        margin-right: 120rpx;
    }
    .s_bottom {
        position: relative;
        bottom: 0;
        width: 100%;
        background: #e8e8e8;
        color: #666;
        font-size: 26rpx;
        text-align: center;
        line-height: 60rpx;
        margin-top: 50rpx;
    }
    /* 产品描述部分 start */
    .section1 {
        padding: 0 20rpx 20rpx;
        border-bottom: 20rpx solid #f8f8f8;
    }
    .price {
        margin-top: 44rpx;
    }
    .price i {
        font-size: 20rpx;
        font-style: normal;
    }
    .price .share {
        float: right;
        background: red;
        color: #fff;
        text-align: center;
        margin-right: -20rpx;
        margin-top: -20rpx;
        font-size: 26rpx;
        padding: 10rpx;
        border-top-left-radius: 40rpx;
        border-bottom-left-radius: 40rpx;
    }
    .n_price {
        color: #ff0000;
        font-size: 36rpx;
    }
    .o_price {
        color: #afafaf;
        font-size: 28rpx;
        text-decoration: line-through;
    }
    .name {
        color: #333;
        font-size: 28rpx;
        font-weight: 700;
        margin: 10rpx 0;
    }
    .sold span {
        color: #999;
        font-size: 26rpx;
    }
    .sold span:nth-child(2) {
        float: right;
    }
    /* 产品描述部分 end */
    /* 领券start */
    .section2 {
        padding: 30rpx 20rpx;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 20rpx solid #f8f8f8;
    }
    .section2 .btn {
        padding: 0 10rpx;
        color: #f43131;
        border: 2rpx solid #f43131;
    }
    .right {
        display: flex;
        align-items: center;
        font-size: 24rpx;
    }
    .right img{
        width: 20rpx;
        height: 26rpx;
        margin-left: 20rpx;
    }
    /* 领券 end */
    /* 包邮信息等 start */
    .section3 {
        display: flex;
        flex-wrap: wrap;
        font-size: 24rpx;
        padding: 30rpx 20rpx;
        border-bottom: 20rpx solid #f8f8f8;
    }
    .section3>span {
        display: flex;
        align-items: center;
        margin-right: 20rpx;
    }
    .section3 img {
        width: 28rpx;
        margin-right: 10rpx;
    }
    /* 包邮信息等 end */
    /* 评价 start */
    .comment {
        padding: 30rpx 20rpx;
        border-bottom: 20rpx solid #f8f8f8;
    }
    .c_title {
        display: flex;
        justify-content: space-between;
    }
    .c_title>span {
        font-size: 30rpx;
        color: #333;
    }
    .c_content {
        margin-top: 30rpx;
    }
    .c_content_title {
        display: flex;
        align-items: center;
        font-size: 30rpx;
        color: #333;
    }
    .c_content_title>img {
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
    }
    .user_name {
        flex: 1;
    }
    .c_time {
        font-size: 26rpx;
        color: #777;
    }
    .c_content_msg {
        font-size: 24rpx;
        color: #333;
        line-height: 36rpx;
        padding: 18rpx 0;
        border-bottom: 2rpx solid #f8f8f8;
    }
    .c_content_img img {
        width: 140rpx;
        height: 140rpx;
        margin-right: 20rpx;
    }
    /* 评价 end */
    /* 商品详情 start */
    .pro_detail {
        padding: 30rpx 20rpx;
    }
    .p_detail_title {
        color: #333;
        font-size: 30rpx;
    }
    /* 商品详情 end */
    /* 遮罩层 */
    .modal {
        position: fixed;
        width:100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        z-index: 1000;
    }
</style>