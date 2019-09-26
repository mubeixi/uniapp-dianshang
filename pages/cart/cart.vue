<template>
  <div>
    <page-title class="nav-title" title="购物车" :right="handleShow ? '管理' : '取消'" @handle="handle" hiddenBack="true" :rightHidden="manage"></page-title>
    <div class="content">
      <div v-if="list.length>0">
        <div class="order_msg" v-for="i in list" :key="i">
          <div class="biz_msg">
           <div class="mbxa"  v-if="!handleShow" @click="checked=!checked">
				<img v-if="checked" src="/static/checked.png" >
				<img v-else src="/static/uncheck.png" >
           </div>
            <img src="/static/detail/user1.png" class="biz_logo" alt />
            <text class="biz_name">张小凡时尚衣橱</text>
          </div>
          <div class="pro">
          <div class="mbxa"  v-if="!handleShow" @click="checked=!checked">
          			  <img v-if="checked" src="/static/checked.png" >
          			  <img v-else src="/static/uncheck.png" >
          </div>
            <img class="pro-img" src="/static/check/pro1.png" alt />
            <div class="pro-msg">
              <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
              <div class="attr">
                <span>白色;S码</span>
              </div>
              <div class="pro-price">
                <span class="span">￥</span>169.00
                <span class="amount">
                  <span class="plus">-</span>
                  <input type="text" value="1">
                  <span class="plus">+</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="none">
        <img src="/static/box.png" alt="">
        <div><span>购物车空空如也</span><span class="tobuy">去逛逛</span></div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="fenge"><span class="red"></span><span class="caini">猜你喜欢</span><span class="red"></span></div>
      <div class="prolist">
        <div class="pro-item" v-for="i in 4" :key="i">
          <img src="/static/check/pro1.png" alt="">
          <div class="item-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
          <div class="price">
            <span class="n_price"><span>￥</span>169.00</span>
            <span class="o_price"><span>￥</span>189.00</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车结算 -->
    <div class="checkout">
      <div class="mbxa"  v-if="!handleShow" @click="checked=!checked">
      				<img v-if="checked" src="/static/checked.png"  style="margin-right: 17rpx;">
      				<img v-else src="/static/uncheck.png"  style="margin-right: 17rpx;">
					全选
      </div>
      <div class="total">合计：<span>￥<span>338.00</span></span></div>
      <div class="checkbtn">结算</div>
    </div>
   <!-- <tabs style="background:#F3F3F3;"></tabs> -->
  </div>
</template>

<script>
// import tabs from "@/components/tabs";
// import pagetitle from "@/components/title";
export default {
  name: "App",
  // components: {
  //   tabs,
  //   pagetitle
  // },
  data(){
    return {
      list:[2],
      handleShow: true,
      checked: false
    }
  },
  methods: {
    handle(){
      this.handleShow = !this.handleShow;            
    },
  },
  computed: {
    manage(){
      return this.list.length == 0
    }
  }
};
</script>

<style scoped lang="scss">

.nav-title {
  background: #fff !important;
}
.content {
  background: #f3f3f3;
  padding: 30rpx 20rpx 160rpx;
}
.van-checkbox {
  margin-right: 5px;
}
 /* 订单信息 start */
    .order_msg {
        padding: 10px 15px 0px;
        background: #fff;
        overflow: hidden;
        margin-bottom: 20px;
    }
    .biz_msg {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
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
        margin-bottom: 25px;
    }
    .pro-msg {
      flex: 1;
    }
    .pro-img {
        width: 200rpx;
        height: 200rpx;
        margin-right: 32rpx;
    }
    .pro-name {
        font-size: 26rpx;
        margin-bottom: 25rpx;
		width: 390rpx;
		display: -webkit-box;
		    -webkit-line-clamp:2;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    -webkit-box-orient: vertical;
    }
    .attr {
        display: inline-block;
        height: 50rpx;
		width: 150rpx;
        line-height: 50rpx;
        background: #FFF5F5;
        color: #666;
        font-size: 24rpx;
        margin-bottom: 12rpx;
		text-align: center;
    }
    .pro-price {
        color: #F43131;
		font-size: 36rpx;
    }
    .pro-price .span {
        font-size: 24rpx;
        font-style: normal;
    }
    .amount {
        float: right;
        display: flex;
        color: #666;
		height: 50rpx;
		width: 168rpx;
    }
    .amount input {
        width: 72rpx;
        height: 50rpx;
        line-height: 50rpx;
        font-size: 28rpx;
        text-align: center;
        border: 1px solid #D1D1D1;
		box-sizing: border-box;
    }
    .plus {
        width: 48rpx;
        height: 50rpx;
        border: 1px solid #D1D1D1;
        text-align: center;
        line-height: 50rpx;
		box-sizing: border-box;
    }
    /* 订单信息 end */
    /* 猜你喜欢 */
    .fenge {
      text-align: center;
      margin-bottom: 10px;
	  font-size: 0rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
    }
	.caini{
		font-size: 30rpx;
		margin-left: 13rpx;
		margin-right: 13rpx;
	}
    .prolist {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .pro-item {
      width: 48%;
      margin-bottom: 15px;
      background: #fff;
    }
    .pro-item img {
      width: 345rpx;
      height: 345rpx;
    }
    .item-name {
      font-size: 24rpx;
      padding: 0 10rpx;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .red {
      background-color: #F43131;
	  display: inline-block;
	  height: 3rpx;
	  width: 44rpx;
    }
    .price {
        margin-top: 20rpx;
        padding: 0 10rpx 20rpx;
    }
    .n_price {
        color: #ff0000;
        font-size: 34rpx;
		span{
			font-size: 24rpx;
		}
    }
    .o_price {
		margin-left: 15rpx;
        color: #afafaf;
        font-size: 24rpx;
        text-decoration: line-through;
    }
    /* 购物车为空 */
    .none {
      text-align: center;
      margin-bottom: 20px;
      color: #B0B0B0;
    }
    .none img {
      height: 110px;
      width: 100px;
    }
    .tobuy {
      color: #F43131;
      border: 1px solid #F43131;
      height: 25px;
      line-height: 25px;
      padding: 2px 10px;
      border-radius: 10px;
      margin-left: 10px;
    }
    /* 结算 */
    .checkout {
      position: fixed;
      bottom: 50px;
      width: 100%;
      height: 50px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      box-sizing: border-box;
    }
    .checkbtn {
      background: #F43131;
      color: #fff;
	  width: 126rpx;
	  text-align: center;
      height: 54rpx;
      line-height: 54rpx;
      font-size: 28rpx;
      border-radius: 8px;
    }
    .total {
      flex: 1;
      text-align: right;
      margin-right: 40rpx;
	  font-size: 26rpx;
    }
    .total>span {
      color: #F43131;
	  font-size: 26rpx;
    }
    .total>span>span {
      font-style: normal;
      font-size: 32rpx;
    }
	.mbxa{
		display: flex;
		align-items: center;
		margin-right: 17rpx;
		font-size: 28rpx;
		img{
			width: 34rpx;
			height: 34rpx;
		}
	}
</style>