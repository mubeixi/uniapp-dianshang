<template>
	<div>
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar" style="background-color: rgb(248, 248, 248);"> --><!-- 这里是状态栏 --></view>
		<!-- #endif -->

		<div v-if="loading">
			<page-title class="nav-title" title="购物车"
			:right="handleShow ? '管理' : '取消'"
			@rightHandle="handle"
			:hiddenBack="true"
			:rightHidden="manage" ></page-title>
			<view style="height: 86rpx;">
				
			</view>
			<div class="content">
			  <div v-if="total_count>0">
				<div class="order_msg" >
					<div class="biz_msg">
					   <div class="mbxa" @click="checkAll">
							<image class="img" :src="checkAllFlag ? '/static/checked.png' : '/static/uncheck.png'" />

					   </div>
						<img :src="shop_config.ShopLogo" class="biz_logo" alt />
						<text class="biz_name">{{shop_config.ShopName}}</text>
					</div>
					<block  v-for="(pro,pro_id) in CartList" :key="pro_id">
						<block v-for="(attr,attr_id) in pro" :key="attr_id">
							<div class="pro">
								<div class="mbxa" @click="change(pro_id,attr_id)">
									<image class="img" :src="attr.checked ? '/static/checked.png' : '/static/uncheck.png'" />
								</div>
								<img class="pro-img" :src="attr.ImgPath" @click="gotoDetail(pro_id)"/>
								<div class="pro-msg">
									<div class="pro-name" @click="gotoDetail(pro_id)">{{attr.ProductsName}}</div>
									<div class="attr" v-if="attr.Productsattrstrval">
										<!-- <span v-for="(item,index) in attr.Productsattrstrval" :key="index">{{item}}</span> -->
										<span>{{attr.Productsattrstrval}}</span>
									</div>
									<div class="pro-price">
										<span class="span">￥</span>{{attr.ProductsPriceX}}
										<span class="amount">
										  <span class="plus" :class="attr.Qty == 1 ? 'disabled' : ''" @click="updateCart(pro_id,attr_id,-1)">-</span>
										  <span class="num">{{attr.Qty}}</span>
										  <span class="plus" @click="updateCart(pro_id,attr_id,1)">+</span>
										</span>
									</div>
								</div>
							</div>
						</block>
					</block>
				</div>
			  </div>
			  <div v-else class="none">
				<image class="img" src="/static/box.png" />
				<div><span>购物车空空如也</span><span class="tobuy" @click="gotoBuy">去逛逛</span></div>
			  </div>
			  <!-- 猜你喜欢 -->
			  <div class="fenge"><span class="red"></span><span class="caini">猜你喜欢</span><span class="red"></span></div>
			  <div class="prolist">
				<div class="pro-item" v-for="(item,index) in prodList" :key="index" @click="goProductDetail(item.Products_ID,item.is_pintuan)" >
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
			<div class="checkout" v-if="!manage">
			  <div class="mbxa"  @click="checkAll">
				<image class="img" :src="checkAllFlag ? '/static/checked.png' : '/static/uncheck.png'"  style="margin-right: 17upx;" alt="" />
					全选
			  </div>
			  <div class="total" v-if="handleShow">合计：<span>￥<span>{{totalPrice}}</span></span></div>
			  <div class="checkbtn" @click="submit">{{handleShow?'结算':'删除'}} </div>
			</div>
		   <!-- <tabs style="background:#F3F3F3;"></tabs> -->
		</div>
  </div>
</template>

<script>
// import tabs from "@/components/tabs";
// import pagetitle from "@/components/title";
import {getCart,getProd,updateCart,delCart} from '../../common/fetch.js';
import {pageMixin} from "../../common/mixin";
import {ls} from '../../common/tool.js';
import {mapActions} from 'vuex';
import {goProductDetail} from "../../common";

export default {
		mixins:[pageMixin],
		  name: "App",
		  // components: {
		  //   tabs,
		  //   pagetitle
		  // },

  data(){
    return {
		checked: [],
		CartList:[],
		prodList: [],
		shop_config: {},
		handleShow: true,
		total_count: 0,
		total_price: 0,
		prod_arg: {
			page: 1,
			pageSize: 4,
		},
		hasMore: true, // 是否还有产品
		postData: {
		  cart_key: 'CartList',
		  prod_id: '',
		  qty: 0,
		  atr_str: '',
		  atrid_str: ''
		},
		checkAllFlag: false,
		totalPrice: 0,
		cart_buy: '',
		loading: false,
		isfirst: true,
    }
  },
  computed: {

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
	this.loading = false;
  	this.getCart();
	this.getProd();
	this.reset();
  },
  onLoad(){

  },
	async created(){
		let UserInfo = this.getUserInfo();
	},
  methods: {
	  goProductDetail,
	...mapActions(['getUserInfo']),
	 // 去逛逛
	gotoBuy(){
		uni.switchTab({
			url: '../index/index'
		})
	},
	// 重置信息
	reset(){
		this.handleShow = true;
		this.checkAllFlag = false;
		this.totalPrice = 0;
	},
	// 删除或结算
	submit(){
		let obj = {};
		// 删除
		for(var i in this.CartList) {
			for(var j in this.CartList[i]) {
				if(this.CartList[i][j].checked) {
					if (obj[i]) {
						obj[i].push(j);
					} else {
						obj[i] = [j];
					}
					ls.remove(i + ';' + j);
				}
			}
		}
		this.cart_buy = JSON.stringify(obj);
		if(this.handleShow) {
			// 结算
			if(this.totalPrice <= 0) {
				uni.showToast({
					title: '您还未选择商品',
					icon: 'none'
				})
				return;
			}
			uni.navigateTo({
				url: `../check/check?cart_key=CartList&cart_buy=${this.cart_buy}`
			})
		}else {
			if(Object.getOwnPropertyNames(obj).length == 0) {
				uni.showToast({
					title: '您选择您要删除的产品',
					icon: 'none'
				});
				return;
			}
			delCart({ cart_key: 'CartList', prod_attr: JSON.stringify(obj)}).then(res=>{
				if(res.errorCode == 0) {
					uni.showLoading({
						icon: 'success',
						title: res.msg
					});
					this.getCart();
				}
			}).catch(e=>{})
		};
	},
	 // 修改的单个的状态
	change(prod_id,attr_id){
		// this.CartList[prod_id][attr_id].checked = !this.CartList[prod_id][attr_id].checked;
		ls.set((prod_id + ';' + attr_id), !ls.get((prod_id + ';' + attr_id)));
		let result = ls.get((prod_id+";"+attr_id));
		this.CartList[prod_id][attr_id].checked = result;
		this.checkAllFlag = true;
		for(var i in this.CartList) {
			for(var j in this.CartList[i]) {
				if(!this.CartList[i][j].checked) {
					this.checkAllFlag = false;
				}
			}
		}
		this.cal_total();
	},
	// 计算总价
	cal_total(){
		var total = 0;
		this.totalPrice = 0;

		for(var i in this.CartList) {
			for(var j in this.CartList[i]) {
				let result = ls.get((i+";"+j));
				this.CartList[i][j].checked = result;
				if(this.CartList[i][j].checked) {
					total += this.CartList[i][j].ProductsPriceX *  this.CartList[i][j].Qty;
				}
			}
		}
		this.totalPrice = Number(total).toFixed(2) ;
	},
	// 全选
	checkAll(){
		// let result = ls.get((prod_id+";"+attr_id));
		// this.CartList[prod_id][attr_id].checked = result;
		if(!this.checkAllFlag) {
			for(var i in this.CartList) {
				for(var j in this.CartList[i]) {
					ls.set((i + ';' + j), true);
					this.CartList[i][j].checked = true;
					this.checkAllFlag = true;
				}
			}
		}else {
			for(var i in this.CartList) {
				for(var j in this.CartList[i]) {
					ls.set((i + ';' + j), false);
					this.CartList[i][j].checked = false;
					this.checkAllFlag = false;
				}
			}
		}
		this.cal_total();
	},
	// 更新购物车
	updateCart(pro_id,attr_id,num){
		this.postData.prod_id = pro_id;
		this.postData.qty = num;
		this.postData.atrid_str = attr_id;
		this.postData.atr_str = this.CartList[pro_id][attr_id]['Productsattrstrval']?this.CartList[pro_id][attr_id]['Productsattrstrval']:'';
		if(this.CartList[pro_id][attr_id]['Qty'] == 1 && num == -1) {
			uni.showToast({
				title: '购买数量不能小于1',
				icon: 'none'
			});
			return;
		}
		updateCart(this.postData).then(res=>{
			if(res.errorCode == 0) {
				this.getCart();
				this.cal_total();
			}else {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		}).catch(e=>console.log(e));
	},
    handle(){
      this.handleShow = !this.handleShow;

    },
	// 初始化选中对象
	initCheck(){
		this.isfirst = false;
		if(this.loading) {
			for(var i in this.CartList) {
				for(var j in this.CartList[i]) {
					// this.CartList[i][j].checked = false;
					if(this.isfirst) {
						ls.set((i+';'+j) , false);
					}
					this.CartList[i][j].checked = ls.get((i+";"+j))
				}
			};
			this.cal_total();
		}
	},
	getCart() {
		getCart({cart_key:'CartList'}).then(res=>{
			if(res.errorCode == 0){
				this.total_count= res.data.total_count;
				this.total_price= res.data.total_price;
				this.shop_config = res.data.shop_config;
				this.CartList = res.data.CartList;
			}
			this.loading = true;
			// 把状态存起来
			this.initCheck();

		}).catch(e=>console.log(e))
	},
	getProd(){
		this.prod_arg.Users_ID = this.Users_ID;
		let oldlist = this.prodList;
		getProd(this.prod_arg).then(res=>{
			if(res.errorCode == 0){
				this.prodList = oldlist.concat(res.data);
				this.hasMore = (res.totalCount / this.prod_arg.pageSize) > this.prod_arg.page ? true : false ;
				this.prod_arg.page += 1;
			}
		}).catch(e=>console.log(e))
	},
	gotoDetail(e){
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
  background: #F8F8F8 !important;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  z-index: 999;
  width: 100%;
  /* #ifdef APP-PLUS */
	padding-top: var(--status-bar-height);
  /* #endif */
}
.content {
  background: #f3f3f3;
  padding: 30upx 20upx 160upx;
}
.van-checkbox {
  margin-right: 5px;
}
 /* 订单信息 start */
    .order_msg {
        padding: 20upx 19upx 0px;
        background: #fff;
        overflow: hidden;
        margin-bottom: 20px;
    }
    .biz_msg {
        display: flex;
        align-items: center;
        margin-bottom: 30upx;
    }
    .biz_logo {
        width: 70upx;
        height: 70upx;
        margin-right: 20upx;
		border-radius: 35upx;
    }
    .biz_name {
        font-size: 28upx;
    }
    .pro {
        display: flex;
        margin-bottom: 50upx;
    }
    .pro-msg {
      flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
    }
    .pro-img {
        width: 200upx;
        height: 200upx;
        margin-right: 32upx;
    }
    .pro-name {
        font-size: 26upx;
        margin-bottom: 18upx;
				width: 390upx;
				line-height: 28upx;
				display: -webkit-box;
		    -webkit-line-clamp:2;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    -webkit-box-orient: vertical;
    }
    .attr {
    	display: inline-block;
    	height: 50upx;
    	line-height: 50upx;

    	color: #666;
    	font-size: 24upx;
    	// padding: 0 20upx;
    	// margin: 25upx 0 24upx;
    	span {
    		padding: 14upx 20upx;
    		margin: 25upx 0 24upx;
    		background: #FFF5F5;
    	}
    }
    .pro-price {
        color: #F43131;
				font-size: 36upx;
    }
    .pro-price .span {
        font-size: 24upx;
        font-style: normal;
    }
    .amount {
        float: right;
        display: flex;
        color: #666;
		height: 50upx;
		width: 168upx;
    }
    .amount {
		.num {
			width: 72upx;
			height: 50upx;
			line-height: 50upx;
			font-size: 28upx;
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
        width: 48upx;
        height: 50upx;
        border: 1px solid #D1D1D1;
        text-align: center;
        line-height: 50upx;
		box-sizing: border-box;
		&.disabled {
			background: #efefef;
		}
    }
    /* 订单信息 end */
    /* 猜你喜欢 */
    .fenge {
      text-align: center;
      margin: 60upx 0 30upx;
	  font-size: 0upx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
    }
	.caini{
		font-size: 30upx;
		margin-left: 13upx;
		margin-right: 13upx;
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
      width: 345upx;
      height: 345upx;
    }
    .item-name {
      font-size: 24upx;
      padding: 0 10upx;
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
	  height: 3upx;
	  width: 44upx;
    }
    .price {
        margin-top: 20upx;
        padding: 0 10upx 20upx;
    }
    .n_price {
        color: #ff0000;
        font-size: 34upx;
		span{
			font-size: 24upx;
		}
    }
    .o_price {
		margin-left: 15upx;
        color: #afafaf;
        font-size: 24upx;
        text-decoration: line-through;
    }
    /* 购物车为空 */
    .none {
      text-align: center;
      margin-bottom: 40upx;
      color: #B0B0B0;
	  font-size: 26upx;
    }
    .none .img {
      height: 220upx;
      width: 200upx;
    }
    .tobuy {
      color: #F43131;
      border: 2upx solid #F43131;
      height: 50upx;
      line-height: 50upx;
      padding: 4upx 20upx;
      border-radius: 20upx;
      margin-left: 20upx;
    }
    /* 结算 */
    .checkout {
      position: fixed;
      bottom: 50px;
      width: 100%;
      height: 100upx;
      padding: 0 20upx;
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

	// #ifdef APP-PLUS
	.checkout {
		bottom: 0;
	}
	// #endif
    .checkbtn {
      background: #F43131;
      color: #fff;
	  width: 126upx;
	  text-align: center;
      height: 54upx;
      line-height: 54upx;
      font-size: 28upx;
      border-radius: 8px;
    }
    .total {
      flex: 1;
      text-align: right;
      margin-right: 40upx;
	  font-size: 26upx;
    }
    .total>span {
      color: #F43131;
	  font-size: 26upx;
    }
    .total>span>span {
      font-style: normal;
      font-size: 32upx;
    }
	.mbxa{
		display: flex;
		align-items: center;
		margin-right: 17upx;
		font-size: 28upx;
		.img{
			width: 34upx;
			height: 34upx;
		}
	}
</style>
