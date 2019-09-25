<template>
    <div>
        <page-title title="我的订单" rightHidden="true"></page-title>
        <div class="navs">
            <div class="nav-item" :class="index==0?'active':''" @click="index = 0">全部</div>
            <div class="nav-item" :class="index==1?'active':''" @click="index = 1">待付款</div>
            <div class="nav-item" :class="index==2?'active':''" @click="index = 2">待发货</div>
            <div class="nav-item" :class="index==3?'active':''" @click="index = 3">待收货</div>
            <div class="nav-item" :class="index==4?'active':''" @click="index = 4">待评价</div>
        </div>
        <div class="order">
            <div class="bizinfo">
                <img src="/static/detail/user1.png" alt="">
                <span class="bizname">张小凡时尚衣橱</span>
                <span class="status">待付款</span>
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
            <div class="text-right total">共2件商品 合计：<span class="price"><span>￥</span> 338.00</span></div>
            <div class="btn-group">
                <span>取消订单</span>
                <span class="active">立即付款</span>
            </div>
        </div>
    </div>

</template>

<script>
// import pagetitle from '@/components/title'

export default {
    data(){
        return {
            index: 0
        }
    }
}
</script>

<style scoped lang="scss">
    .navs {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        background: #fff;
        font-size: 28rpx;
        padding: 0 10px;
        margin-bottom: 20px;
        .nav-item {
            flex: 1;
            box-sizing: border-box;
            text-align: center;
        }
        .nav-item.active {
            color: red;
            border-bottom: 2px solid red;
        }
    }
    .order {
        padding: 30rpx 20rpx;
        background: #fff;
        .bizinfo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            img {
                width: 70rpx;
                height: 70rpx;
                border-radius: 50%;    
                margin-right: 21rpx;
            }
            .bizname {
                flex: 1;
				font-size: 28rpx;
            }
            .status {
                color: red;
				font-size: 26rpx;
            }
        }
       .pro {
           display: flex;
           margin-bottom: 50rpx;
		   margin-top: 30rpx;
       }
       .pro-msg{
       	 margin-left: 27rpx;
       	 width: 476rpx;
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
        .total {
            font-size: 24rpx;
            margin: 40rpx 0rpx;
			margin-right: 15rpx;
            .price {
                color: red;
                font-size: 30rpx;
                span{
					font-size: 24rpx;
				}
            }
        }
        .btn-group {
            text-align: right;
            span {
                display: inline-block;
                width: 150rpx;
                height: 60rpx;
                line-height: 60rpx;
                text-align: center;
                border: 1px solid #999;
				border-radius:10rpx;
                color: #999;
				font-size: 26rpx;
				&:first-child{
					margin-right: 14rpx;
				}
                &.active {
                    color: #fff;
                    background: #F43131;
                    border: none;
                }
            }
        }
    }
    .text-right {
        text-align: right;
    }
</style>