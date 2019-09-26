<template>
  <div style="position:relative;background-color:#f8f8f8">
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
        <div class="leftss">
            <span class="pricef">¥</span>
            <span class="prices">13.9</span>
            <span class="pricet">¥ 15.5</span>
        </div>
        <div class="rightss">
            <div>
               还有<span>5</span>天<span>522</span>小时<span>25</span>分5秒结束
            </div>
            <div class="haha">
                已团19833件   2人团
            </div>
        </div>
    </div>
    <!-- 领券 -->
    <div class="section2" >
        <div class="titles">
            开迪新款全景鞋柜 多层简易鞋架 防尘带布罩收纳鞋柜 5层/6层8层/10层  DIY可自由拆装鞋柜
        </div>
        <div class="titlet">
            加厚5层4格尺寸：长60CM宽30CM高75CM 可放12双鞋子；加厚5层4格尺寸：长60CM宽30CM高75CM 可放12双鞋子；加厚5层4格尺寸：长60CM宽30CM高75CM 可放12双鞋子
        </div>
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
    <!-- 小伙伴在拼团 -->
    <div class="pintuan">
        <div class="pinTitle">
            小伙伴在开团
        </div>
        <div class="pinCenter">
            <div class="image">
                <img src="/static/tuan/info.png">
            </div>
            <div class="info">
                <div class="nick">
                    你+我=幸福
                </div>
                <div class="message">
                    还差1人，剩余23 : 32 : 06
                </div>
            </div>
            <div class="cantuan">
                去参团
            </div>
        </div>
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
    <!-- goodsaction -->
    <!-- <goodsaction></goodsaction> -->
    <!-- 优惠券活分享弹出层 -->
  <!--  <van-overlay
        :show="show"
        @click="close"
        z-index="100"
    /> -->
    <div class="ticks" v-if="ticksShow">
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
    <div class="shareinfo" v-if="shareShow">
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
	<div class="fixed">
		<div class="leftss">
			<div class="first">
				<div><img src="/static/tuan/home.png" ></div>
				<div class="txt">首页</div>
			</div>
			<div class="first">
				<div><img  src="/static/tuan/shou.png" ></div>
				<div class="txt">收藏</div>
			</div>
			<div class="first">
				<div><img src="/static/tuan/ke.png" ></div>
				<div class="txt">客服</div>
			</div>
		</div>
		<div class="rightss">
			<div class="dan bTitle">
				<div class="danLeft">
					<span class="bF">¥</span><span class="bS">15.1</span>
				</div>
				<div class="danRight">
					单独购买
				</div>
			</div>
			<div class="tuan bTitle">
				<div>
					<span class="bF">¥</span><span class="bS">15.1</span>
				</div>
				<div class="danRight">
					一键开团
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
// import goodsaction from '@/components/goodsaction'
export default {
    data(){
        return {
            show: false,
            shareShow: false,
            ticksShow: false
        }
    },
    components: {
        // goodsaction,
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        gotoComments(){
            this.$router.push({name:'comments'})
        },
        showTick(){
            this.show = true;
            this.ticksShow = true;
        },
        close(){
            this.show = false;
            this.ticksShow = false;
            this.shareShow = false;
        },
        share(){
            this.show = true;
            this.shareShow = true;
        },
        cancel(){
            this.show = false;
            this.shareShow = false;
        }
    }
}
</script>

<style scoped lang="scss">
// 轮播样式
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
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        width: 100%;
        padding: 15px 0 45px;
        color: #333;
        z-index: 100;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .t_title {
        text-align:center;
        margin-bottom: 20px;
    }
    .t_title img {
        float: right;
        margin-right: 10px;
    }
    .t_content {
        position: relative;
        width: 355px;
        height: 80px;
        background: url('/static/detail/yhq.png') no-repeat ;
        background-size: cover;
        margin: 0 auto 15px;
        padding: 10px 0 14px 20px;
        box-sizing: border-box;
        font-size: 11px;
        color:  #F43131 ;
    }
    .t_left {
        float: left;
    }
    .t_left .t_left_t .money {
        font-size: 18px;
        margin-right: 5px;
    }
    .t_left .t_left_t {
        font-size: 13px;
        margin-bottom: 5px;
    }
    .t_left .t_left_t i {
        font-size: 11px;
        font-style: normal;
    }
    .t_right {
        float: right;
        height: 58px;
        line-height: 58px;
        padding: 0 18px;
        font-size: 15px;
        border-left: 1px dotted #999;
        width: 62px;
        text-align: center; 
    }
    .aleady {
        color: #999;
    }
    .shareinfo{
        padding-bottom: 0;
        color: #333;
        font-size: 12px;
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
        width: 38px;
        height: 38px;
        display: block;
        margin: 0 auto 5px;
    }
    .s_top>div:nth-child(1) {
        margin-right: 60px;
    }
    .s_bottom {
        position: relative;
        bottom: 0;
        width: 100%;
        background: #e8e8e8;
        color: #666;
        font-size: 13px;
        text-align: center;
        line-height: 30px;
        margin-top: 25px;
    }
    /* 轮播图 */
    .van-swipe-item img {
        width: 100%;
        height: 100%;
    }
    /* 产品描述部分 start */
    .section1 {
       height: 100rpx;
       background-color: #fff;
    }
    .price {
        margin-top: 22px;
    }
    .price i {
        font-size: 10px;
        font-style: normal;
    }
    .price .share {
        float: right;
        background: red;
        color: #fff;
        text-align: center;
        margin-right: -10px;
        margin-top: -10px;
        font-size: 13px;
        padding: 5px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    .n_price {
        color: #ff0000;
        font-size: 18px;
    }
    .o_price {
        color: #afafaf;
        font-size: 14px;
        text-decoration: line-through;
    }
    .name {
        color: #333;
        font-size: 14px;
        font-weight: 700;
        margin: 5px 0;
    }
    .sold span {
        color: #999;
        font-size: 13px;
    }
    .sold span:nth-child(2) {
        float: right;
    }
    /* 产品描述部分 end */
    /* 领券start */
    .section2 {
        padding-left: 26rpx;
		padding-top: 20rpx;
		padding-right: 37rpx;
		padding-bottom: 20rpx;
        font-size: 22rpx;
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
        border-bottom: 1px solid #ece8e8;
        background-color: #fff;
    }
    .section2 .btn {
        padding: 0 5px;
        color: #f43131;
        border: 1px solid #f43131;
    }
    .right {
        display: flex;
        align-items: center;
        font-size: 24rpx;
		color: #666666;
    }
    .right img{
        width: 19rpx;
        height: 30rpx;
        margin-left: 20rpx;
    }
    /* 领券 end */
    /* 包邮信息等 start */
    .section3 {
        display: flex;
        flex-wrap: wrap;
        font-size: 22rpx;
        padding: 15px 10px;
        border-bottom: 17px solid #f8f8f8;
        justify-content: space-around;
        background-color: #fff;
    }
    .section3>span {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
    .section3 img {
        width: 30rpx;
		height: 30rpx;
        margin-right: 5px;
    }
    /* 包邮信息等 end */
    /* 评价 start */
    .comment {
        padding: 30rpx 26rpx;
        border-bottom: 10px solid #f8f8f8;
        background-color: #fff;
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
        margin-top: 15px;
    }
    .c_content_title {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #333;
    }
    .c_content_title>img {
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
    }
    .user_name {
        flex: 1;
		font-size: 30rpx;
    }
    .c_time {
        font-size: 26rpx;
        color: #777;
    }
    .c_content_msg {
        font-size: 24rpx;
        color: #333;
        line-height: 18px;
        padding: 9px 0;
        border-bottom: 1px solid #f8f8f8;
    }
    .c_content_img img {
        width: 142rpx;
        height: 142rpx;
        margin-right: 20rpx;
    }
    /* 评价 end */
    /* 商品详情 start */
    .pro_detail {
        padding: 26rpx 26rpx;
        background-color: #fff;
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
    .section1{
        display: flex;
        padding-left: 15rpx;
		padding-right: 15rpx;
        align-items: center;
        justify-content: space-between;
        background-color: #F43131;
        color: #fff;
        .leftss{
            font-size: 0;
            span.pricef{
                font-size: 36rpx;
            }
            span.prices{
                font-size: 50rpx;
                margin-left: 4px;
                font-weight: 500;
            }
            span.pricet{
                font-size: 28rpx;
                margin-left: 6px;
                color: #ddd;
                text-decoration:line-through;
            }
        }
        .rightss{
            div{
                    color:#ddd;
                    font-size: 22rpx;
                    .haha{

                    }
                    span{
                        margin: 0 4px;
                        padding: 0 5px;
                        //width:23px;
                        height:37rpx;
                        text-align: center;
                        background:linear-gradient(0deg,rgba(12,12,12,1) 0%,rgba(197,195,195,1) 100%);
                        box-shadow:0px 1px 1px 0px rgba(4,0,0,0.5), 0px 1px 1px 0px rgba(255,255,255,0.65);
                        display: inline-block;

                    }
            }
        }
    }
    .titles{
        font-size:28rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:22px;
    }
    .titlet{
        margin-top: 12px;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(110,110,110,1);
        line-height:20px;
    }
    .pintuan{
        margin-bottom: 17px;
        background-color: #fff;
        .pinTitle{
            font-size:30rpx;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:20px;
            padding:26rpx;
        }
        .pinCenter{
                padding: 15rpx 25rpx;
                display: flex;
                align-items: center;
                .image{
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .info{
					margin-left: 21rpx;
                    .nick{
                        font-size:26rpx;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:20px;
                    }
                    .message{
                        font-size:24rpx;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(110,110,110,1);
                        line-height:20px;
                    }
                }
                .cantuan{
                    width:119rpx;
                    height:48rpx;
                    border:1px solid rgba(244,49,49,1);
                    border-radius:3px;
                    color:  rgba(244,49,49,1);
                    text-align: center;
                    line-height: 48rpx;
                    font-size: 26rpx;
                    margin-left: auto;
                }
        }
    }
	.fixed{
		height: 98rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #F8F8F8;
		z-index: 9999;
		.leftss,.rightss{
			width: 50%;
			height: 98rpx;
			display: flex;
		}
		.leftss{
			div.first{
				width: 33.3%;
				height: 98rpx;
				text-align: center;
				padding-top: 15rpx;
				img{
					width: 38rpx;
					height: 38rpx;
					display: block;
					margin: 0 auto;
				}
				.txt{
					font-size: 22rpx;
					margin-top: 10rpx;
				}
			}
		}
		.rightss{
			.dan{
				width: 50%;
				background-color: #FA6B27;
			}
			.tuan{
				width: 50%;
				background-color: #F43131;
			}
			.bTitle{
				color: #fff;
				text-align: center;
				.bF{
					font-size: 24rpx;
				}
				.bS{
					font-size: 32rpx;
				}
				.danRight{
					font-size: 26rpx;
				}
			}
		}
	}
</style>