<template>
  <div style="position:relative;">
    <div class="top">
        <img src="/static/detail/back.png" @click="goBack" alt="">
        <img src="/static/detail/cart.png" class="cart" alt="">
    </div>
    <van-swipe :autoplay="3000">
        <van-swipe-item style="height: 375px;" vertical>
            <img src="/static/detail/banner3.png" alt="">
        </van-swipe-item>
        <van-swipe-item style="height: 375px;" vertical>
            <img src="/static/detail/banner3.png" alt="">
        </van-swipe-item>
    </van-swipe>
    <!-- 产品信息描述 -->
    <div class="section1">
        <div class="price">
            <span class="n_price"><i>￥</i>169.00</span>
            <span class="o_price"><i>￥</i>189.00</span>
            <span class="share" @click="share">分享此产品</span>
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
        <div class="right" @click="showTick">店铺优惠券 <img src="/static/detail/right.png" alt=""></div>
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

<style scoped>

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
        padding: 0 10px 10px;
        border-bottom: 10px solid #f8f8f8;
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
        padding: 15px 10px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 10px solid #f8f8f8;
    }
    .section2 .btn {
        padding: 0 5px;
        color: #f43131;
        border: 1px solid #f43131;
    }
    .right {
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .right img{
        width: 10px;
        height: 13px;
        margin-left: 10px;
    }
    /* 领券 end */
    /* 包邮信息等 start */
    .section3 {
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        padding: 15px 10px;
        border-bottom: 10px solid #f8f8f8;
    }
    .section3>span {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
    .section3 img {
        width: 14px;
        margin-right: 5px;
    }
    /* 包邮信息等 end */
    /* 评价 start */
    .comment {
        padding: 15px 10px;
        border-bottom: 10px solid #f8f8f8;
    }
    .c_title {
        display: flex;
        justify-content: space-between;
    }
    .c_title>span {
        font-size: 15px;
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
        width: 35px;
        height: 35px;
        margin-right: 10px;
    }
    .user_name {
        flex: 1;
    }
    .c_time {
        font-size: 13px;
        color: #777;
    }
    .c_content_msg {
        font-size: 12px;
        color: #333;
        line-height: 18px;
        padding: 9px 0;
        border-bottom: 1px solid #f8f8f8;
    }
    .c_content_img img {
        width: 70px;
        height: 70px;
        margin-right: 10px;
    }
    /* 评价 end */
    /* 商品详情 start */
    .pro_detail {
        padding: 15px 10px;
    }
    .p_detail_title {
        color: #333;
        font-size: 15px;
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