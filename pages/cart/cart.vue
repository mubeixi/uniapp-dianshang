<template>
	<div>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
		<!-- #endif -->

		<div v-if="loading">
			<page-title class="nav-title" title="购物车"
			:right="handleShow ? '管理' : '取消'"
			@rightHandle="handle"
			:hiddenBack="true"
			:rightHidden="manage" ></page-title>
			<div class="content">
			  <div v-if="total_count>0">
				<div class="order_msg" >
					<div class="biz_msg">
					   <div class="mbxa" @click="checkAll">
							<img :src="checkAllFlag ? '/static/checked.png' : '/static/uncheck.png'" >

					   </div>
						<img :src="shop_config.ShopLogo" class="biz_logo" alt />
						<text class="biz_name">{{shop_config.ShopName}}</text>
					</div>
					<block  v-for="(pro,pro_id) in CartList" :key="pro_id">
						<block v-for="(attr,attr_id) in pro" :key="attr_id">
							<div class="pro">
								<div class="mbxa" @click="change(pro_id,attr_id)">
									<img :src="attr.checked ? '/static/checked.png' : '/static/uncheck.png'" >
								</div>
								<img class="pro-img" :src="attr.ImgPath" @click="gotoDetail(pro_id)"/>
								<div class="pro-msg">
									<div class="pro-name" @click="gotoDetail(pro_id)">{{attr.ProductsName}}</div>
									<div class="attr" v-if="attr.Productsattrstrval">
										<span v-for="(item,index) in attr.Productsattrstrval" :key="index">{{item}}</span>
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
				<img src="data:image/png;base64,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" alt="">
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
				<img :src="checkAllFlag ? '/static/checked.png' : '/static/uncheck.png'"  style="margin-right: 17rpx;" alt="">
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
        padding: 20rpx 19rpx 0px;
        background: #fff;
        overflow: hidden;
        margin-bottom: 20px;
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
		border-radius: 35rpx;
    }
    .biz_name {
        font-size: 28rpx;
    }
    .pro {
        display: flex;
        margin-bottom: 50rpx;
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
        margin-bottom: 18rpx;
		width: 390rpx;
		line-height: 28rpx;
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
        margin-bottom: 18rpx;
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
		.num {
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
		&.disabled {
			background: #efefef;
		}
    }
    /* 订单信息 end */
    /* 猜你喜欢 */
    .fenge {
      text-align: center;
      margin: 60rpx 0 30rpx;
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
