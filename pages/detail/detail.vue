<template>
  <div style="position:relative;">
	  <!-- #ifdef APP-PLUS -->
	  <view class="status_bar"><!-- 这里是状态栏 --></view>
	  <!-- #endif -->
    <div class="top">
        <img src="/static/detail/back.png" @click="goBack" alt="">
        <img src="/static/detail/cart.png" @click="goCart" class="cart" alt="">
    </div>
	<!-- 轮播 -->
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" circular="true" indicator-dots="indicatorDots" autoplay="autoplay" interval="4000" duration="500" indicator-color="#fff" indicator-active-color="#ff5000">
					<swiper-item v-for="(item,i) of product.Products_JSON.ImgPath" :key="i">
						 <img :src="item"  @click="yulan(i)">
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
    <!-- 产品信息描述 -->
    <div class="section1">
        <div class="price">
            <span class="n_price"><span class="mm">￥</span>{{product.Products_PriceX}}</span>
            <span class="o_price"><span class="mm">￥</span>{{product.Products_PriceY}}</span>
            <span class="share" @click="showTick" data-type="share">分享此产品</span>
        </div>
        <div class="name">{{product.Products_Name}}</div>
        <div class="sold">
            <span v-if="product.Products_Count">库存{{product.Products_Count}}</span>
            <span v-if="product.Products_Sales">月销{{product.Products_Sales}}</span>
        </div>
    </div>
    <!-- 领券 -->
    <div class="section2" @click="showTick" data-type="ticks"  v-if="couponList.length>0">
        <div class="btn">领券</div>
        <div class="right" >店铺优惠券 <img src="/static/detail/right.png" alt=""></div>
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
        <block v-for="(item,index) of commit" :key="item">
        	<div class="c_content" v-if="!item.ImgPath">
        	    <div class="c_content_title">
        	        <img :src="item.User_HeadImg" alt="">
        	        <span class="user_name">{{item.User_NickName}}</span>
        	        <span class="c_time">{{item.CreateTime}}</span>
        	    </div>
        	    <div class="c_content_msg">{{item.Note}}</div>
        	    <div class="c_content_img"></div>
        	</div>
        	<div class="c_content" v-else>
        	    <div class="c_content_title">
        	        <img :src="item.User_HeadImg" alt="">
        	        <span class="user_name">{{item.User_NickName}}</span>
        	        <span class="c_time">{{item.CreateTime}}</span>
        	    </div>
        	    <div class="c_content_msg">{{item.Note}}</div>
        	    <div class="c_content_img">
        			<block v-for="(i,j) of item.ImgPath" :key="j">
        				 <img :src="i"  @click="yulanImg(index,j)">
        			</block>
        	    </div>
        	</div>
        </block>
    </div>
    <!-- 商品详情 -->
    <div class="pro_detail">
        <div class="p_detail_title">商品详情</div>
		<!-- <div v-html="product.Products_Description" class="p_detail_des"></div> -->
		<rich-text :nodes="product.Products_Description|formatRichText" class="p_detail_des"></rich-text>
		<!-- <u-parse :content="product.Products_Description"  /> -->
    </div>
	<div style="clear: both;">

	</div>
    <div style="height:50px;"></div>
	<bottom @cartHandle="addCart" @directHandle="directBuy" @collect="collect" :collected="isCollected"></bottom>
	<popupLayer ref="popupLayer" :direction="'top'" >
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
		<scroll-view class="ticks" v-if="type=='ticks'" scroll-y=true  @scrolltolower="goNextPage">
		    <div class="t_title">
		        领券
		        <image src="/static/detail/x.png"  @click="close" ></image>
		    </div>
			<div style="height: 90rpx;">

			</div>
		    <div class="t_content" v-for="(item,i) of couponList" :key="i">
		        <div class="t_left">
		            <div class="t_left_t"><span>￥</span><span class="money">{{item.Coupon_Cash}}</span><span>店铺优惠券</span></div>
		            <div class="t_left_c">{{item.Coupon_Title}}</div>
		            <div class="t_left_b">有效期{{item.Coupon_StartTime}}-{{item.Coupon_EndTime}}</div>
		        </div>
		        <div class="t_right" @click="getMyCoupon(item.Coupon_ID,i)">立即领取</div>
		    </div>
		</scroll-view>
	</popupLayer>
	<popupLayer ref="cartPopu" :direction="'top'">
		<div class="cartSku">
			<div class="cartTop">
				<image :src="product.Products_JSON.ImgPath[0]" mode=""></image>
				<div class="cartTitle">
					<div class="cartTitles">{{product.Products_Name}}</div>
					<div class="addInfo">
						<div class="addPrice">{{product.Products_PriceX}}元</div>
						<div class="proSale">库存{{postData.count}}</div>
					</div>
				</div>
			</div>
			<div class="cartCenter">
				<div class="cartAttr" v-for="(item,i) of product.skujosn" :key="i">
					<div class="sku">
						{{i}}
					</div>
					<div class="skuValue">
						<div :class="check_attr[i]==index?'skuCheck':''" @click="selectAttr(index,i)"  v-for="(mbx,index) of item" :key="index">{{mbx}}</div>
					</div>
				</div>
			</div>
			<div class="numBer">
				<div class="numBers">
					数量
				</div>
				<div class="inputNumber">
						<div class="clicks" @click="delNum">-</div>
						<!--v-enter-number-->
						<input  type="number" v-model="postData.qty"  disabled>
						<div class="clicks" @click="addNum">+</div>
				</div>
			</div>
		</div>
		<div class="cartSub" @click="skuSub" :class="submit_flag?'':'disabled'">
			确定
		</div>
	</popupLayer>
  </div>
</template>
<script>
import bottom from '../bottom/bottom'
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {getProductDetail,getCommit,updateCart,addCollection,getCoupon,getUserCoupon,checkProdCollected,cancelCollection,judgeReceiveGift} from '../../common/fetch.js';
import {goBack,numberSort}  from '../../common/tool.js'

import uParse from '@/components/gaoyia-parse/parse.vue'
import {pageMixin} from "../../common/mixin";

export default {
	mixins:[pageMixin],
    data(){
        return {
            type: '', // 优惠券内容， 分享内容
            shareShow: false,
            ticksShow: false,
			product:'',//商品结果
			commit:'',//获取评论
			Products_ID: 0 ,
			count:1,//商品数量
			skuF:1,//规格详情
			checkAttr: {} , // 选择的属性
			check_attrid_arr: [],
			check_attr: {},
			couponList:[],//优惠券列表
			//购买需要传输的信息
			postData: {
			    act: 'add_cart',
			    Users_ID: 'wkbq6nc2kc',      //商家ID
			    User_ID: 3,       //会员ID
			    prod_id: 0,    //产品ID  在 onLoad中赋值
			    atrid_str: '',    //选择属性  1；2   数字从小到大
			    atr_str: '',      //选择属性名称
			    count: 0,         //选择属性的库存
			    showimg: '',      //选择属性的图片(用产品图片代替)
			    qty: 1,           //购买数量
			    cart_key: '',     //购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
			},
			submit_flag: true, //提交按钮
			page:1,//优惠券页
			pageSize:10,//优惠券页
			totalCount:0,//优惠券个数
			isCollected: false, // 该产品是否已收藏
			gift: 0, //赠品id
        }
    },
    components: {
        bottom,
		popupLayer,
		uParse
    },
	onLoad: function (option) {
		  
		  // 赠品
		  if(option.gift) {
			  this.gift = option.gift;
			  this.judgeReceiveGift();
		  }else {
			  this.Products_ID = option.Products_ID;
			  this.checkProdCollected();
			  this.getDetail(this.Products_ID);
			  this.getCommit(this.Products_ID);
			  this.getCoupon();//获取可领取的优惠券
			  
		  }
	 },
	onShow(){

	},
	filters: {
				/**
				 * 处理富文本里的图片宽度自适应
				 * 1.去掉img标签里的style、width、height属性
				 * 2.img标签添加style属性：max-width:100%;height:auto
				 * 3.修改所有style里的width属性为max-width:100%
				 * 4.去掉<br/>标签
				 * @param html
				 * @returns {void|string|*}
				 */
				formatRichText (html) { //控制小程序中图片大小
					if(!html) return;
				    let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				        match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
				        match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
				        match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');
				        return match;
				    });
					newContent= newContent.replace(/<div[^>]*>/gi,function(match,capture){
					    match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
					    match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
					    match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');
					    return match;
					});
					newContent= newContent.replace(/<p[^>]*>/gi,'');
					newContent= newContent.replace(/<[/]p[^>]*>/gi,'');
				    newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				        match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
				        return match;
				    });

				    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				    newContent = newContent.replace(/\<img/gi, '<img style="width:100%;float:left;"');
					//newContent = newContent.replace(/>[\s]*</gi, "><");
				    return newContent;
				}
			},
    methods: {
		// 赠品
		judgeReceiveGift(){
			judgeReceiveGift({gift: this.gift}).then(res=>{
				console.log(res)
				if(res.errorCode ==0){
					
				}
			})
		},
		//评价预览
		yulanImg(i,j){
			uni.previewImage({
			            urls: this.commit[i].ImgPath,
						indicator:'number',
						current:j
			});
		},
		//轮播图图片预览
		yulan(index){
			uni.previewImage({
			            urls: this.product.Products_JSON.ImgPath,
						indicator:'default',
						current:index
			});
		},
		// 检查产品是否已收藏
		checkProdCollected() {
			checkProdCollected({prod_id: this.Products_ID}).then(res => {
				if(res.errorCode == 0) {
					this.isCollected = res.data.is_favourite == 1
				}
			}).catch(e => {

			})
		},
		//下一页优惠券
		goNextPage(){
			if(this.totalCount>this.couponList.length){
				this.page++;
				this.getCoupon();
			}
		},
		//领取优惠券
		getMyCoupon(item,i){
			let data={
				Users_ID: 'wkbq6nc2kc',
				coupon_id:item,
				User_ID:1
			}
			if(this.couponList.length<=1){
				this.goNextPage();
			}
			getUserCoupon(data).then(res=>{
					wx.showToast({
					    title: res.msg,
					    icon: 'none'
					})
					this.page=1;
					this.couponList.splice(i, 1);
			}).catch(e=>{
				console.log(e)
			})
			//this.getCoupon();
		},
		//获取可领取的优惠券
		getCoupon(){
			let data={
				Users_ID: 'wkbq6nc2kc',
				pageSize:this.pageSize,
				page:this.page,
				User_ID:1
			}
			getCoupon(data).then(res=>{
				if(res.errorCode==0){
					for(let i of res.data){
						this.couponList.push(i);
					}
					this.totalCount=res.totalCount;
				}
			}).catch(e=>{
				console.log(e);
			})
		},
		// 选择属性
		selectAttr(index,i){
			var value_index = index; //选择的属性值索引
			var attr_index = i;   //选择的属性索引
			// if (this.check_attrid_arr.indexOf(value_index) > -1) return false;
			//记录选择的属性
			var check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }); //记录选择的属性  attr_index外的[]必须
			//属性处理
			var check_attrid = [];
			var check_attrname = [];
			var check_attrnames = [];
			for (var i in check_attr) {
			    var attr_id = check_attr[i];
			    check_attrid.push(attr_id);
			    check_attrname[attr_id] = i;
			}
			//数组排序  按从小到大排
			var check_attrid_arr = check_attrid;
			check_attrid = numberSort(check_attrid);
			//获取对应的属性名称
			for (var i = 0; i < check_attrid.length; i++) {
			    var attr_id = check_attrid[i];
			    var attr_name = check_attrname[attr_id];
			    check_attrnames.push(attr_name + ':' + this.product.skujosn[attr_name][attr_id]);
			}
			check_attrid = check_attrid.join(';');
			var attr_val = this.product.skuvaljosn[check_attrid];   //选择属性对应的属性值
			//数组转化为字符串
			check_attrnames = check_attrnames.join(';');
			this.postData.atr_str = check_attrnames;
			this.postData.atrid_str = check_attrid;
			//属性判断
			if (attr_val) {
				this.postData.count = attr_val.Property_count;   //选择属性的库存
				this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
				this.productDetail_price = attr_val.Txt_PriceSon; // 选择属性的价格
				this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length) ? false : true;
			}
			//判断属性库存
			if (attr_val && attr_val.Property_count <= 0) {
			    // wx.showToast({
			    //     title: '您选择的 ' + check_attrnames + ' 库存不足，请选择其他属性',
			    //     icon: 'none'
			    // })
				this.submit_flag =  false;
			    return false;
			}
			this.check_attr = check_attr;
			this.check_attrid_arr = check_attrid_arr;
			this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length) ? false : true;
			//购买数量处理  大于最高时赋值最高值
			if (this.postData.qty > this.postData.count) {
				this.postData.qty = this.postData.count;
			}
		},
		skuSub(){
			if(!this.submit_flag) {
				return ;
			}
			this.postData.prod_id = this.Products_ID;
			if(this.postData.atr_str==''||this.postData.atrid_str==''){
				if(this.product.skujosn){
					wx.showToast({
					    title: '您还没有选择规格',
					    icon: 'none'
					})
					return;
				}
			}
			updateCart(this.postData).then(res=>{
				if(res.errorCode == 0) {
					if(this.postData.cart_key == 'CartList') {
						uni.showLoading({
							title: '加入购物车成功',
							icon: 'success'
						})
					}else {
						uni.navigateTo({
							url: '../check/check?cart_key=DirectBuy'
						})
					}
				}else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			})
			//确定加入购物车
			this.$refs.cartPopu.close();
		},
		addNum(){
			if (this.postData.qty < this.postData.count) {
				this.postData.qty += 1;
			}else {
			    uni.showToast({
					title: '购买数量不能大于库存量',
			        icon: 'none',
			    });
				this.postData.qty = this.postData.count;
			}
		},
		delNum(){
			if (this.postData.qty > 1) {
				this.postData.qty -= 1;
			} else {
				uni.showToast({
			        title: '购买数量不能小于1',
			        icon: 'none',
			    });
				this.postData.qty = 1;
			}
		},
		// 收藏
		collect(){
			// 检查是否已收藏
			if(this.isCollected) {
				cancelCollection({prod_id: this.Products_ID}).then(res=>{
					if(res.errorCode == 0) {
						uni.showToast({
							title: res.msg
						});
						this.isCollected = false;
					}

				})
			}else {
				addCollection({prod_id: this.Products_ID,}).then(res=>{
					if(res.errorCode == 0) {
						uni.showToast({
							title: '收藏成功'
						});
						this.isCollected = true;
					}else {
						uni.showToast({
							title: res.msg,
							icon: 'fail'
						})
					};
				})
			}
		},
		goCart(){
			uni.switchTab({
				url: '../cart/cart'
			})
		},
		goBack(){
			goBack();
		},
		getCommit(item){
			let data={
				Users_ID:'wkbq6nc2kc',
				Products_ID:item,
				page:1,
				pageSize:2
			}
			getCommit(data).then(res=>{
				this.commit=res.data;
			}).catch(e=>{
				console.log(e)
			})
		},
		async getDetail(item){
			let data={
				prod_id:item,
				Users_ID:'wkbq6nc2kc'
			}

			let product = null;

			await getProductDetail(data).then(res=>{
				product = res.data
				this.product = res.data;
				this.postData.count = res.data.Products_Count;
				if(res.data.skujosn) {
					this.product.skujosn = JSON.parse(res.data.skujosn);
					this.product.skuvaljosn = JSON.parse(res.data.skuvaljosn);
				}
			}).catch(e=>{
				console.log(e)
			})


            //let _self = this;
			// #ifdef H5
            this.WX_JSSDK_INIT().then((wxEnv)=>{

                this.$wx.onMenuShareTimeline({
                    title: '#网中网#'+product.Products_Name, // 分享标题
                    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: product.ImgPath, // 分享图标
                    success: function() {
                        // 用户点击了分享后执行的回调函数
                    }
                });

                //两种方式都可以
                wxEnv.onMenuShareAppMessage({
                    title: '#网中网#'+product.Products_Name, // 分享标题
                    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: product.ImgPath, // 分享图标
                    desc: product.goods_desc||'好物推荐',
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function() {
                        // 用户点击了分享后执行的回调函数
                    }
                });

            }).catch(()=>{})

			// #endif




		},
		addCart(){
			this.$refs.cartPopu.show();
			this.postData.cart_key = 'CartList';
		},
		directBuy(){
			this.$refs.cartPopu.show();
			this.postData.cart_key = 'DirectBuy'
			// let arg = {
			// 	Users_ID: 'wkbq6nc2kc',
			// 	User_ID: 3,
			// 	cart_key: this.cart_key,
			// 	prod_id:  this.Products_ID,
			// 	qty: 1,
			// 	// atr_str: "颜色:黑色;尺寸:大号;",
			// 	// atrid_str: "1;3",
			// }
			// updateCart(arg).then(res=>{
			// 	console.log(res)
			// 	if(res.errorCode == 0) {
			// 		uni.navigateTo({
			// 			url: '../check/check?cart_key=DirectBuy'
			// 		})
			// 	}
			// })
		},
        gotoComments(){
            uni.navigateTo({
            	url: '../comments/comments?pro_id='+this.Products_ID
            });
        },
        showTick(e){
			this.type = e.currentTarget.dataset.type
            this.$refs.popupLayer.show();
        },
        close(){
			this.$refs.popupLayer.close();
        },
        cancel(){
            this.$refs.popupLayer.close();
        }
    },
	created(){



		this.checkProdCollected();
		this.getCommit(this.Products_ID);
		this.getCoupon();//获取可领取的优惠券

		//商品信息
		this.getDetail(this.Products_ID);

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
	.ticks{
		max-height: 1050rpx;
		position: relative;
		padding-top: 0rpx !important;
		// overflow: scroll;
	}
    .t_title {
		font-size: 30rpx;
		color: #333;
        text-align:center;
        //margin-bottom: 40rpx;
		position: fixed;
		width: 100%;
		z-index: 999;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
    }
    .t_title image {
		height: 24rpx;
		width: 24rpx;
        float: right;
        margin-right: 20rpx;
		margin-top: 33rpx;
    }
    .t_content {
        position: relative;
        width: 720rpx;
        height: 160rpx;
        // background: url('/static/detail/yhq.png') no-repeat ;
		background-color: #FDF1E5;
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
        font-size: 42rpx;
        margin-right: 10rpx;
    }
    .t_left .t_left_t {
        font-size: 24rpx;
        margin-bottom: 10rpx;
    }
	.t_left .t_left_b{
		margin-top: 6rpx;
	}
    .t_left .t_left_t i {
        font-size: 22rpx;
        font-style: normal;
    }
	.t_left .t_left_c,.t_left .t_left_b{
		font-size: 22rpx;
	}
    .t_right {
        float: right;
        height: 116rpx;
        line-height: 116rpx;
        padding: 0 36rpx;
        font-size: 30rpx;
        border-left: 2rpx dotted #999;
        //width: 124rpx;
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
        border-bottom: 20rpx solid #efefef;
    }
    .price {
        margin-top: 38rpx;
		margin-bottom: 29rpx;
    }
    .price .mm {
        font-size: 20rpx;
        font-style: normal;
    }
    .price .share {
        float: right;
        background: red;
        color: #fff;
        text-align: center;
        margin-right: -20rpx;
        margin-top: -2rpx;
        font-size: 26rpx;
        padding: 10rpx;
        border-top-left-radius: 40rpx;
        border-bottom-left-radius: 40rpx;
		height: 56rpx;
		width: 157rpx;
		box-sizing: border-box;
    }
    .n_price {
        color: #ff0000;
        font-size: 36rpx;
    }
    .o_price {
		margin-left: 10rpx;
        color: #ababab;
        font-size: 28rpx;
        text-decoration: line-through;
    }
    .name {
        color: #333;
        font-size: 28rpx;
        font-weight: 700;
        margin: 10rpx 0;
    }
	.sold{
		height: 50rpx;
		line-height: 50rpx;
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
        border-bottom: 20rpx solid #efefef;
    }
    .section2 .btn {
        padding: 0 10rpx;
        color: #f43131;
        border: 2rpx solid #f43131;
    }
    .right {
        display: flex;
        align-items: center;
        font-size: 26rpx;
		color: #666666;
		font-weight: 500;
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
        font-size: 0rpx;
        padding: 30rpx 20rpx;
        border-bottom: 20rpx solid #efefef;
    }
    .section3>span {
        display: flex;
        align-items: center;
        margin-right: 20rpx;
		span{
			font-size: 24rpx;
			color: #333333;
		}
    }
    .section3 img {
        width: 28rpx;
		height: 28rpx;
        margin-right: 10rpx;
    }
    /* 包邮信息等 end */
    /* 评价 start */
    .comment {
        padding: 30rpx 20rpx;
        border-bottom: 20rpx solid #efefef;
    }
    .c_title {
        display: flex;
        justify-content: space-between;
    }
	.c_title{
		.right{
			color: #666666;
			font-size: 26rpx;
			font-weight:500;
		}
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
        border-bottom: 2rpx solid #efefef;
    }
    .c_content_img img {
        width: 140rpx;
        height: 140rpx;
        margin-right: 20rpx;
    }
    /* 评价 end */
    /* 商品详情 start */
    .pro_detail {
		.p_detail_des {
			width:100%;
			img {
				width:100% !important;
			}
		}
    }
    .p_detail_title {
		padding: 30rpx 20rpx;
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
	.cartSku{
		padding: 0rpx 10rpx;
		.cartTop{
			position: relative;
			display: flex;
			padding-top: 20rpx;
			image{
				width: 220rpx;
				height: 220rpx;
			}
			.cartTitle{
				margin-left: 20rpx;
				font-size: 32rpx;
				width: 420rpx;
				.cartTitles{
					height: 80rpx;
					overflow: hidden;
					margin-top: 20rpx;
				}
				.addInfo{
					width: 450rpx;
					margin-top: 70rpx;
					display: flex;
					flex-flow: row;
					justify-content: space-between;
					align-items: flex-end;
					.addPrice{
						font-size: 42rpx;
						color: #ff4200;
					}
					.proSale{
						font-size: 24rpx;
						color: #999;
						justify-content: flex-end;
					}
				}
			}
		}
		.cartCenter{
			margin-top: 20rpx;
			.cartAttr{
				display: flex;
				padding: 15rpx 0rpx;
				.sku{
					font-size: 28rpx;
					height: 70rpx;
					line-height: 70rpx;
					width: 140rpx;
				}
				.skuValue{
					display: flex;
					div{
						height: 70rpx;
						line-height: 70rpx;
						font-size: 28rpx;
						border-radius: 10rpx;
						color: #000;
						background-color: #fff;
						padding-left: 20rpx;
						padding-right: 20rpx;
						margin-right: 20rpx;
						border: 1px solid #ccc;
					}
				}
			}
		}
		.numBer{
			margin-top: 20rpx;
			display: flex;
			padding: 15rpx 0rpx;
			justify-content: space-between;
			.numBers{
				font-size: 28rpx;
				height: 70rpx;
				line-height: 70rpx;
				width: 140rpx;
			}
			.inputNumber{
				border: 1px solid #ccc;
				border-radius: 6rpx;
				height: 50rpx;
				margin-right: 50rpx;
				display: flex;
				input{
					color: black;
					margin: 0 auto;
					width: 80rpx;
					height: 50rpx;
					text-align: center;
					font-size: 24rpx;
					border-left: 2rpx solid #ccc;
					border-right: 2rpx solid #ccc;
				}
				.clicks{
					height: 50rpx;
					line-height: 50rpx;
					width: 60rpx;
					text-align: center;
				}
			}
		}
	}
	.cartSub{
		width: 100%;
		height: 90rpx;
		background-color: #F43131;
		font-size:20px;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		margin-top: 30rpx;
		&.disabled {
			background: #999;
		}
	}
	.skuCheck{
		color: #fff !important;
		background-color: #ff4200 !important;
	}

</style>
