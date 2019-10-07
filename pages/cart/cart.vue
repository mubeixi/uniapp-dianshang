<template>
  <div>
    <page-title class="nav-title" title="购物车" :right="handleShow ? '管理' : '取消'" @rightHandle="handle" hiddenBack="true" :rightHidden="manage"></page-title>
    <div class="content">
      <div v-if="total_count>0">
        <div class="order_msg" >
			<div class="biz_msg">
			   <div class="mbxa"  v-if="!handleShow" @click="checked=!checked">
					<img v-if="checked" src="/static/checked.png" >
					<img v-else src="/static/uncheck.png" >
			   </div>
				<img :src="shop_config.ShopLogo" class="biz_logo" alt />
				<text class="biz_name">{{shop_config.ShopName}}</text>
			</div>
			<block  v-for="(pro,pro_id) in CartList" :key="pro_id">
				<block v-for="(attr,attr_id) in pro" :key="attr_id">
					<div class="pro">
						<div class="mbxa"  v-if="!handleShow" @click="checked=!checked">
							<img v-if="checked" src="/static/checked.png" >
							<img v-else src="/static/uncheck.png" >
						</div>
						<img class="pro-img" :src="attr.ImgPath" alt />
						<div class="pro-msg">
							<div class="pro-name">{{attr.ProductsName}}</div>
							<div class="attr">
								<span v-for="(item,index) in attr.Productsattrstrval" :key="index">{{item}}</span>
							</div>
							<div class="pro-price">
								<span class="span">￥</span>{{attr.ProductsPriceX}}
								<span class="amount">
								  <span class="plus">-</span>
								  <input type="text" :value="attr.Qty">
								  <span class="plus">+</span>
								</span>
							</div>
						</div>
					</div>
				</block>
			</block>
        </div>
      </div>
      <div v-else class="none">
        <img src="/static/box.png" alt="">
        <div><span>购物车空空如也</span><span class="tobuy">去逛逛</span></div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="fenge"><span class="red"></span><span class="caini">猜你喜欢</span><span class="red"></span></div>
      <div class="prolist">
        <div class="pro-item" v-for="(item,index) in prodList" :key="index" @click="gotoDetail(item.Products_ID)" >
          <img :src="item.ImgPath" alt="">
          <div class="item-name">{{item.Products_Name}}</div>
          <div class="price">
            <span class="n_price"><span>￥</span>{{item.Products_PriceX}}</span>
            <span class="o_price"><span>￥</span>{{item.Products_PriceY}}</span>
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
      <div class="total">合计：<span>￥<span>{{total_price}}</span></span></div>
      <div class="checkbtn">结算</div>
    </div>
   <!-- <tabs style="background:#F3F3F3;"></tabs> -->
  </div>
</template>

<script>
// import tabs from "@/components/tabs";
// import pagetitle from "@/components/title";
import {getCart,getProd} from '../../common/fetch.js'
export default {
  name: "App",
  // components: {
  //   tabs,
  //   pagetitle
  // },
  
  data(){
    return {
      CartList:[],
	  prodList: [],
	  shop_config: {},
      handleShow: true,
      checked: false,
	  total_count: 0,
	  total_price: 0,
	  Users_ID:'wkbq6nc2kc',
	  User_ID:3,
	  prod_arg: {
		page: 1,
		pageSize: 4,
	  },
	  hasMore: true, // 是否还有产品
    }
  },
  // 用户下拉
  onPullDownRefresh() {
  	
  },
  // 上拉触底
  onReachBottom() {
  	if(this.hasMore) {
		this.getProd();
	}
  },
  onShow() {
  	this.getCart();
	this.getProd();
  },
  methods: {
    handle(){
      this.handleShow = !this.handleShow;            
    },
	getCart() {
		getCart({Users_ID:this.Users_ID,User_ID: this.User_ID,cart_key:'CartList'}).then(res=>{
			console.log(res)
			if(res.errorCode == 0){
				this.CartList = res.data.CartList;
				this.total_count= res.data.total_count;
				this.total_price= res.data.total_price;			
				this.shop_config = res.data.shop_config;
			}
		}).catch(e=>console.log(e))
	},
	getProd(){
		this.prod_arg.Users_ID = this.Users_ID;
		let oldlist = this.prodList;
		getProd(this.prod_arg).then(res=>{
			console.log(res)
			if(res.errorCode == 0){
				this.prodList = oldlist.concat(res.data);
				this.hasMore = (res.totalCount / this.prod_arg.pageSize) > this.prod_arg.page ? true : false ;
				this.prod_arg.page += 1;				
			}
		}).catch(e=>console.log(e))		
	},
	gotoDetail(e){
		console.log(e)
		uni.navigateTo({
		    url: '../detail/detail?Products_ID=' + e
		});
	}
  },
  computed: {
    manage(){
      return this.CartList.length == 0
    },
	
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
		padding: 0 20rpx;
        line-height: 50rpx;
        background: #FFF5F5;
        color: #666;
        font-size: 24rpx;
        margin-bottom: 23rpx;
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
    .amount {
		input {
			width: 72rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 28rpx;
			text-align: center;
			border: 1px solid #D1D1D1 {
				left: 0;
				right: 0;
			};
			box-sizing: border-box;	
			min-height: 0;
		}
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
      margin-bottom: 40rpx;
      color: #B0B0B0;
	  font-size: 26rpx;
    }
    .none img {
      height: 220rpx;
      width: 200rpx;
    }
    .tobuy {
      color: #F43131;
      border: 2rpx solid #F43131;
      height: 50rpx;
      line-height: 50rpx;
      padding: 4rpx 20rpx;
      border-radius: 20rpx;
      margin-left: 20rpx;
    }
    /* 结算 */
    .checkout {
      position: fixed;
      bottom: 100rpx;
      width: 100%;
      height: 100rpx;
      padding: 0 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      box-sizing: border-box;
    }
	// #ifdef  MP 
	.checkout {
		bottom: 0;
	}
	// #endif
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