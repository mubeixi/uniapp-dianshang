<template>
  <div style="position:relative;background-color:#f8f8f8">
    <div class="top">
        <img src="/static/detail/back.png" @click="goBack" >
        <img src="/static/detail/cart.png" class="cart" >
    </div>
	<!-- 轮播 -->
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" circular="true" indicator-dots="indicatorDots" autoplay="autoplay" interval="4000" duration="500" indicator-color="#fff" indicator-active-color="#ff5000">
					<swiper-item v-for="(item,i) of product.Products_JSON.ImgPath" :key="i">
						 <img :src="item" >
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
    <!-- 产品信息描述 -->
    <div class="section1">
        <div class="leftss">
            <span class="pricef">¥</span>
            <span class="prices">{{product.Products_PriceX}}</span>
            <span class="pricet">¥ {{product.Products_PriceY}}</span>
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
            {{product.Products_Name}}
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
        			<block v-for="(i,j) of item.ImgPath"> 
        				 <img :src="i" >
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
    	    <div class="t_content" v-for="(item,i) of couponList" :key="i">
    	        <div class="t_left">
    	            <div class="t_left_t"><span>￥</span><span class="money">{{item.Coupon_Cash}}</span><span>{{item.Coupon_Title}}</span></div>
    	            <div class="t_left_c">{{item.Coupon_Description}}</div>
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
						<input v-enter-number type="number" v-model="postData.qty"  disabled>
						<div class="clicks" @click="addNum">+</div>
				</div>
			</div>
		</div>
		<div class="cartSub" @click="skuSub" :class="submit_flag?'':'disabled'">
			确定
		</div>
	</popupLayer>
	<div class="fixed">
		<div class="leftss">
			<div class="first" @click="goHome">
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
			<div class="dan bTitle" @click="myPay">
				<div class="danLeft">
					<span class="bF">¥</span><span class="bS">{{product.flashsale_pricex}}</span>
				</div>
				<div class="danRight">
					单独购买
				</div>
			</div>
			<div class="tuan bTitle" @click="myPin">
				<div>
					<span class="bF">¥</span><span class="bS">{{product.pintuan_pricex}}</span>
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
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {getProductDetail,getCommit,updateCart,addCollection,getCoupon,getUserCoupon} from '../../common/fetch.js'
import {goBack,numberSort}  from '../../common/tool.js'
export default {
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
			submit_flag: true, //提交按钮
			page:1,//优惠券页
			pageSize:10,//优惠券页
			totalCount:0,//优惠券个数
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
        }
    },
    components: {
        popupLayer
    },
	onLoad: function (option) {
		  this.Products_ID = option.Products_ID;
	},
	onShow() {
		this.getDetail(this.Products_ID);
		this.getCommit(this.Products_ID);
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
		//拼团
		myPin(){
			this.$refs.cartPopu.show();
		},
		//单独购买
		myPay(){
			this.$refs.cartPopu.show();
		},
		//返回首页
		goHome(){
			uni.switchTab({
				url:'../index/index'
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
        	console.log(this.postData)
        	updateCart(this.postData).then(res=>{
        		//console.log(res)
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
        				title: res.msg
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
        	addCollection({
        		Users_ID:'wkbq6nc2kc',
        		prod_id: this.Products_ID,
        		User_ID: 3
        	}).then(res=>{
        		if(res.errorCode == 0) {
        			uni.showToast({
        				title: '收藏成功'
        			})
        		}
        	})
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
        getDetail(item){
        	let data={
        		prod_id:item,
        		Users_ID:'wkbq6nc2kc'
        	}
        	getProductDetail(data).then(res=>{
        		console.log(res)
        		this.product = res.data;
        		this.postData.count = res.data.Products_Count;
        		if(res.data.skujosn) {
        			this.product.skujosn = JSON.parse(res.data.skujosn);
        			this.product.skuvaljosn = JSON.parse(res.data.skuvaljosn);
        		}
        		console.log(this.product.skujosn)
        	}).catch(e=>{
        		console.log(e)
        	})
        },
        addCart(){
        	this.$refs.cartPopu.show();
        	console.log('cart')
        	this.postData.cart_key = 'CartList';
        },
        directBuy(){
        	this.$refs.cartPopu.show();
        	this.postData.cart_key = 'DirectBuy'
        	let arg = {
        		Users_ID: 'wkbq6nc2kc',
        		User_ID: 3,
        		cart_key: this.cart_key,
        		prod_id:  this.Products_ID,
        		qty: 1,
        		// atr_str: "颜色:黑色;尺寸:大号;",
        		// atrid_str: "1;3",	
        	}
        	updateCart(arg).then(res=>{
        		console.log(res)
        		if(res.errorCode == 0) {
        			uni.navigateTo({
        				url: '../check/check?cart_key=DirectBuy'
        			})
        		}
        	})
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
    // .pro_detail {
    //     padding: 26rpx 26rpx;
    //     background-color: #fff;
    // }
    // .p_detail_title {
    //     color: #333;
    //     font-size: 30rpx;
    // }
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
	//规格
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