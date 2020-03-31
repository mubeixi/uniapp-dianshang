<template>
  <div @click="commonClick" style="position:relative;background-color:#f8f8f8">
    <div class="top">
        <image class="imgm" src="/static/back.png" @click="goBack" ></image>
        <image class="imgm cart" src="/static/cart.png" @click="goCart" ></image>
    </div>

	<!-- 轮播 -->
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" circular="true" indicator-dots="indicatorDots" autoplay="autoplay" interval="4000" duration="500" indicator-color="#fff" indicator-active-color="#ff5000">
					<swiper-item v-for="(item,i) of product.Products_JSON.ImgPath" :key="i">
						 <img class="imgs" :src="item"  @click="yulan(i)">
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
    <!-- 产品信息描述 -->
    <div class="section1">
        <div class="leftss" style="display: flex;align-items: center;">
			<image class="limits" :src="'/static/client/limit.png'|domain"></image>
        </div>
<!--        <div class="rightss">-->
<!--            <div class="countdown">-->
<!--               距开始还有 : <span class="spanss">{{countdown.d}}</span>天<span class="spans">{{countdown.h}}</span>时<span class="spans">{{countdown.m}}</span>分<span class="spans">{{countdown.s}}</span>秒-->
<!--            </div>-->
<!--        </div>-->
		<div class="rightss" v-if="isKai">
			<div class="countdown">
				距结束还有 : <span class="spanss">{{countdown.d}}</span>天<span class="spans">{{countdown.h}}</span>时<span class="spans">{{countdown.m}}</span>分<span class="spans">{{countdown.s}}</span>秒
			</div>
		</div>
		<div class="rightss" v-if="!isKai">
			<div class="countdown">
				距开始还有 : <span class="spanss">{{countdown.d}}</span>天<span class="spans">{{countdown.h}}</span>时<span class="spans">{{countdown.m}}</span>分<span class="spans">{{countdown.s}}</span>秒
			</div>
		</div>
    </div>
	<view class="prices">
		<view class="price">
			<text class="leftPrice">
				<text class="rmb">¥<text class="priceX">{{product.price}}</text></text>
			</text>
			<text class="rightPrice">
				￥{{product.Products_PriceX}}
			</text>
		</view>
		<view class="btn">
			库存{{product.Products_Count}}
		</view>
	</view>
	<div class="section2" >
	    <div class="titles">
	        <div class="title">{{product.Products_Name}}</div>
	    </div>
	</div>
    <!-- 包邮等信息 -->
    <div class="section3" v-if="product.Products_Promise && product.Products_Promise.length > 0">
    		<span v-for="(item,index) in product.Products_Promise" v-if="item.name" :key="index">
    				<image class="img" :src="'/static/client/detail/dh.png'|domain" alt="" />
    				<span>{{item.name}}</span>
    		</span>
    </div>


    <!-- 评价 -->
    <div class="comment">
        <div class="c_title">
            <span>评价</span>
            <div class="right" @click="gotoComments">查看全部 <image class="img" :src="'/static/client/detail/right.png'|domain" alt="" /></div>
        </div>
        <block v-for="(item,index) of commit" :key="item">
        	<div class="c_content" v-if="!item.ImgPath">
        	    <div class="c_content_title">
        	        <img class="imggs" :src="item.User_HeadImg" alt="">
        	        <span class="user_name">{{item.User_NickName}}</span>
        	        <span class="c_time">{{item.CreateTime}}</span>
        	    </div>
        	    <div class="c_content_msg">{{item.Note}}</div>
        	    <div class="c_content_img"></div>
        	</div>
        	<div class="c_content" v-else>
        	    <div class="c_content_title">
        	        <img  class="imggs" :src="item.User_HeadImg" alt="">
        	        <span class="user_name">{{item.User_NickName}}</span>
        	        <span class="c_time">{{item.CreateTime}}</span>
        	    </div>
        	    <div class="c_content_msg">{{item.Note}}</div>
        	    <div class="c_content_img">
        			<block v-for="(i,j) of item.ImgPath">
        				 <img :src="i" @click="yulanImg(index,j)">
        			</block>
        	    </div>
        	</div>
        </block>
    </div>
    <!-- 商品详情 -->
    <div class="pro_detail" v-if="isLoad">
        <div class="p_detail_title">商品详情</div>
    	<!-- <div v-html="product.Products_Description" class="p_detail_des"></div> -->
<!--    	<rich-text :nodes="product.Products_Description|formatRichText" class="p_detail_des"></rich-text>-->
<!--    	 <u-parse :content="product.Products_Description"  />-->

		<u-parse :content.sync="Products_Description"  />
<!--		<block v-if="Products_Description">-->
<!--			<u-parse  :content.sync="Products_Description" ></u-parse>-->
<!--		</block>-->


		<!-- #ifdef H5||APP-PLUS -->
		<!-- <div v-html="formatRichTexts(product.Products_Description)" class="p_detail_des"></div> -->
		<!-- #endif -->

		<!-- #ifdef MP -->
		<!-- <rich-text :nodes="product.Products_Description|formatRichText" class="p_detail_des"></rich-text> -->
		<!-- #endif -->
    </div>
    <div style="clear: both;">

    </div>
    <div style="height:60px;background: white;"></div>
    <popupLayer ref="popupLayer" :direction="'top'" >
    	<div class="shareinfo" v-if="type=='share'">
    		<div class="s_top">
				<!-- #ifdef APP-PLUS -->
				<div class="flex1" @click="shareFunc('wx')">
					<image class='img' :src="'/static/client/detail/share1.png'|domain" alt=""></image>
					<div>发送好友</div>
				</div>
				<div class="flex1" @click="shareFunc('wxtimeline')">
					<image class='img' :src="'/static/client/detail/sahre3.png'|domain" alt=""></image>
					<div>朋友圈</div>
				</div>
				<!--只有配置了这个参数的app，才有分享到小程序选项-->
				<div class="flex1" @click="shareFunc('wxmini')" v-if="wxMiniOriginId">
					<img class='img' :src="'/static/client/detail/share4.png'|domain" alt="">
					<div>微信小程序</div>
				</div>
				<!-- #endif -->

				<!-- #ifndef MP-TOUTIAO -->
				<div class="flex1" @click="shareFunc('pic')">
					<image class='img' :src="'/static/client/detail/share2.png'|domain" alt=""></image>
					<div>分享海报</div>
				</div>
				<!-- #endif -->
    		</div>
    		<div class="s_bottom" @click="cancel">取消</div>
    	</div>
    	<scroll-view class="ticks" v-if="type=='ticks'" scroll-y=true  @scrolltolower="goNextPage">
    	    <div class="t_title">
    	        领券
    	        <image  class="imgg" :src="'/static/client/detail/x.png'|domain"  @click="close" ></image>
    	    </div>

			<div class="t_content" v-for="(item,i) of couponList" :key="i" :style="{backgroundImage:'url('+$fun.domainFn('/static/client/detail/yhq.png')+')'}">
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
				<image  class="image" @click="yulanDetail" :src="skuImg?skuImg+'-r200':product.Products_JSON.ImgPath[0]+'-r200'" ></image>
				<div class="cartTitle">
					<div class="cartTitles">{{product.Products_Name}}</div>
					<div class="addInfo">
						<div class="addPrice">{{postData.productDetail_price}}元</div>
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
						<div class="skuview" :class="check_attr[i]==index?'skuCheck':''" @click="selectAttr(index,i)"  v-for="(mbx,index) of item" :key="index">{{mbx}}</div>
					</div>
				</div>
			</div>
			<div class="numBer">
				<div class="numBers">
					数量
				</div>
				<div class="inputNumber">
						<div class="clicks" @click="delNum">-</div>
<!--					v-enter-number-->
						<input class="inputs"  type="number" v-model="postData.qty"  @blur="setCount">
						<div class="clicks" @click="addNum">+</div>
				</div>
			</div>
		</div>
		<form report-submit @submit="skuSub">
			<button  formType="submit" class="cartSub" :class="submit_flag?'':'disabled'">
				确定
			</button>
		</form>

	</popupLayer>

	<!-- #ifndef APP-PLUS -->
		<div class="safearea-box"></div>
		<div class="fixed">
			<div class="leftss">
				<div class="first" @click="goHome">
					<div><image class="img" src="/static/detail/home.png" ></image></div>
					<div class="txt">首页</div>
				</div>
				<div class="first" @click="collect">
					<div>
						<image class="img" v-if="isCollected"  src="/static/detail/favorite-a.png" ></image>
						<image class="img" v-else src="/static/detail/favorite.png" ></image>
					</div>
					<div class="txt">收藏</div>
				</div>
				<div class="first" @click="contact">
					<div><image class="img" src="/static/detail/kefu.png" ></image></div>
					<div class="txt">客服</div>
				</div>
			</div>
			<div class="rightss">
				<form  class="form" report-submit @submit="myPin">
				<div class="tuan bTitle">
					<button formType="submit" class="danRight">
						立即抢购
					</button>
				</div>
				</form>
			</div>
		</div>
	<!-- #endif -->
  </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {spikeProdDetail,getCommit,updateCart,addCollection,getCoupon,getUserCoupon,cancelCollection,checkProdCollected,getPintuanTeam,getProductSharePic} from '../../common/fetch.js'
import {goBack,numberSort,getGroupCountdown,buildSharePath,getProductThumb,ls}  from '../../common/tool.js'
import {pageMixin} from "../../common/mixin";
import {error} from "../../common";
import {mapState,mapGetters,mapActions} from 'vuex';
import {add_template_code} from "../../common/fetch";
import uParse from '../../components/gaoyia-parse/parse.vue'
import {formatRichTextByUparseFn} from "../../common/filter";

let groupStamInstance = null
export default {
	mixins:[pageMixin],
    data(){
        return {
			// #ifdef APP-PLUS
			wxMiniOriginId:'',
			// #endif
			Products_Description:'',
			isLoad:false,
			JSSDK_INIT:false,//自己有分享的业务
			type: '', // 优惠券内容， 分享内容
            shareShow: false,
			teamList:[],//正在开团的列表
            ticksShow: false,
			product:{Products_Description:''},//商品结果
			commit:[],//获取评论
			Products_ID: 0 ,
			count:1,//商品数量
			skuF:1,//规格详情
			checkAttr: {} , // 选择的属性
			check_attrid_arr: [],
			check_attr: {},
			couponList:[],//优惠券列表
			submit_flag: true, //提交按钮
			isKai:true,//是否开始
			page:1,//优惠券页
			pageSize:10,//优惠券页
			totalCount:0,//优惠券个数
			countdown:{d:0,h:0,m:0,s:0},
			spike_good_id:0,
			postData: {
			    prod_id: 0,    //产品ID  在 onLoad中赋值
			    attr_id: 0,    //选择属性id
			    count: 0,         //选择属性的库存
			    showimg: '',      //选择属性的图片(用产品图片代替)
			    qty: 1,           //购买数量
			    cart_key: 'DirectBuy',     //购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
					active: 'spike',   //拼团时候选，不是拼团不选
				productDetail_price:0
			},
			isCollected: false, // 该产品是否已收藏
			isSubmit: false,
			skuImg:''
        }
    },
	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	//自定义小程序分享
	onShareAppMessage(){

		let path = '/pages/detail/groupDetail?Products_ID='+this.Products_ID;

		let shareObj = {
			title: this.product.Products_Name,
			desc:this.product.Products_BriefDescription,
			imageUrl:this.product.ImgPath,
			path: buildSharePath(path)
		};
		return shareObj

	},
	// #endif
    components: {
        popupLayer,uParse
    },
	computed:{
		...mapGetters(['userInfo']),
		...mapState(['initData'])
		// countdown(){
		// 	if(this.product || !this.product.pintuan_end_time)return {};
		//
		// 	let computedStamp = getGroupCountdown({start_timeStamp:this.product.pintuan_end_time})
		// 	if(computedStamp){
		// 		return computedStamp
		// 	}
		//
		// 	return {}
		//
		// }
	},
	onLoad: function (option) {
		  this.spike_good_id=option.spikeGoodId;
		 this._init_func();


		// #ifdef APP-PLUS
			const vm =this
			uni.$on('collectSpike',(data)=>{
				//if(data.detail!='limit') return
				vm.collect()
			})

			uni.$on('kefu', (data) => {
				vm.contact()
			})

			uni.$on('spikeBuy',(data)=>{
				//if(data.detail!='limit') return
				vm.myPin()
			})

			uni.$on('goodsSkuSub',(data)=>{
				if(data.detail!='limit') return
				let {check_attr,check_attrid_arr,submit_flag,postData} = data
				this.check_attr = check_attr
				this.check_attrid_arr = check_attrid_arr
				this.submit_flag = submit_flag
				this.postData = postData
				vm.skuSub()
				//隐藏规格框
				const goodsSpecNvue = uni.getSubNVueById('goodsSpec')
				goodsSpecNvue.hide()
			})
		// #endif

	},
	onUnload() {
		// #ifdef APP-PLUS
			uni.$off('collectSpike')
			uni.$off('spikeBuy')
			uni.$off('goodsSkuSub')
		uni.$off('kefu')
		// #endif
	},
	onShow(){
		//this.getDetail(this.spike_good_id);
	},
	filters: {
		endtime(timeStamp){

			//一天过期
			let end_timeStamp = timeStamp+60*60*24
			let current = (new Date()).getTime()

			let {d=0,h=0,m=0,s=0} = {};
			//时间戳格式转换
			current = parseInt(current/1000)

			let countTime = end_timeStamp - current
			if(countTime<0){
				return false
			};

			h = parseInt(countTime/(60*60))
			m = parseInt((countTime-h*60*60)/60)
			s = countTime-h*60*60-m*60

			if(h<10)h='0'+h;
			if(m<10)m='0'+m;
			if(s<10)s='0'+s;

			return `${h}:${m}:${s}`
		},
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
		...mapActions(['getUserInfo']),
		/**
		 * 客服
		 */
		contact(){
			this.$fun.contact()
		},
		yulanDetail(){
			let arr=[]
			let str
			if(this.skuImg){
				str=this.skuImg+'-r420'
			}else{
				str=this.product.Products_JSON.ImgPath[0]+'-r420'
			}
			arr.push(str)
			uni.previewImage({
				urls: arr,
				indicator:'default',
				current:0
			});

		},
		async _init_func(){
			this.getDetail(this.spike_good_id)

			let id = this.spike_good_id
			this.getCommit(id);
			this.checkProdCollected(id);
					// await this.getCommit(this.Products_ID);
					//
					// await this.checkProdCollected();


			this.isLoad = true;

		},
		//轮播图图片预览
		yulan(index){
			uni.previewImage({
				urls: this.product.Products_JSON.ImgPath,
				indicator:'default',
				current:index
			});
		},
		toJoinGroup(tid,team){
			if(!this.$fun.checkIsLogin())return;

			for(var usr of team.join_user){
				if(this.userInfo.User_ID == usr){

					this.$fun.confirm({title:'操作提示',content:'您已经参加该团,是否继续查看?'}).then(res=>{
						uni.navigateTo({
							url:"/pages/detail/groupJoin?Team_ID="+tid+"&Products_ID="+this.Products_ID
						})
					},err=>{

					})
					return;
				}
			}


			uni.navigateTo({
				url:"/pages/detail/groupJoin?Team_ID="+tid+"&Products_ID="+this.Products_ID
			})
		},
		async shareFunc(channel) {

			let _self = this
			let path = 'pages/detail/groupDetail?Products_ID=' + this.Products_ID;
			let front_url = this.initData.front_url;

			let shareObj = {
				title: this.product.Products_Name,
				desc: this.product.Products_BriefDescription,
				imageUrl: getProductThumb(this.product.ImgPath),
				path: buildSharePath(path)
			};


			switch (channel) {
				case 'wx':
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						href: front_url + shareObj.path,
						title: shareObj.title,
						summary: shareObj.desc,
						imageUrl: shareObj.imageUrl,
						success: function (res) {
						},
						fail: function (err) {
						}
					});
					break;
				case 'wxtimeline':
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						type: 0,
						href: front_url + shareObj.path,
						title: shareObj.title,
						summary: shareObj.desc,
						imageUrl: shareObj.imageUrl,
						success: function (res) {
						},
						fail: function (err) {
						}
					});
					break;
				case 'wxmini':

					uni.share({
						provider: 'weixin',
						scene: "WXSceneSession",
						type: 5,
						imageUrl: shareObj.imageUrl,
						title: shareObj.title,
						miniProgram: {
							id: _self.wxMiniOriginId,
							path: '/' + shareObj.path,
							type: 0,
							webUrl: 'http://uniapp.dcloud.io'
						},
						success: ret => {
						}
					});
					break;
				case 'pic':
					//this.$toast('comming soon')

					let sharePic = await getProductSharePic({'product_id': this.Products_ID,'act_price':this.product.price}).then(res => {
						ls.set('temp_sharepic_info', res.data)
						return res.data.img_url
					})


					if (!sharePic) {
						error('获取分享参数失败');
						return;
					}

					setTimeout(function () {
						uni.navigateTo({
							url: '/pages/detail/sharepic/sharepic'
						})
					}, 200)
					// uni.previewImage({
					// 	urls: [sharePic],
					// 	indicator:'default',
					// 	current:0
					// });
					break;
			}

		},
		formatRichTexts(html){
			if(!html) return;
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '')//.replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '')//.replace(/height='[^']+'/gi, '');

				//图片app不支持
				// #ifdef APP-PLUS
				match = match.replace(/!*.webp/gi, '')
				// #endif

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
			newContent = newContent.replace(/src="\/\//gi, 'src="http://');
			//newContent = newContent.replace(/>[\s]*</gi, "><");
			return newContent;
		},
		//评价预览
		yulanImg(i,j){



			let tempArr = this.commit[i].ImgPath.map((img,idx)=>{
				return img.replace(/\/n3\//,'/');
			});

			uni.previewImage({
			            urls: tempArr,
						indicator:'number',
						current:j,
			            longPressActions: {
			                success: function(data) {

			                },
			                fail: function(err) {

			                }
			            }
			});
		},
		// 收藏
		collect(){
			if(!this.$fun.checkIsLogin(1,1)){
				return;
			}
			// 检查是否已收藏
			if(this.isCollected) {
				cancelCollection({prod_id: this.Products_ID}).then(res=>{
					uni.showToast({
						title: res.msg,
						icon:'none'
					});
					this.isCollected = false;
					// #ifdef APP-PLUS
					uni.$emit('spike_bottom_setval', {isCollected:this.isCollected,detail:'limit'});
					// #endif
				}).catch(()=>{})
			}else {
				addCollection({prod_id: this.Products_ID,}).then(res=>{
					uni.showToast({
						title: '收藏成功'
					});
					this.isCollected = true;
					// #ifdef APP-PLUS
					uni.$emit('spike_bottom_setval', {isCollected:this.isCollected,detail:'limit'});
					// #endif
				}).catch(()=>{})
			}
		},
		// 检查产品是否已收藏
		checkProdCollected(item) {
			if(!this.$fun.checkIsLogin()){
				return
			}
			checkProdCollected({prod_id: item}).then(res => {
				this.isCollected = res.data.is_favourite == 1
				// #ifdef APP-PLUS
				uni.$emit('spike_bottom_setval', {isCollected:this.isCollected,detail:'limit'});
				// #endif
			}).catch(e => {

			})
		},
		//拼团
		myPin(e){
			if (!this.$fun.checkIsLogin(1, 1)) {
				return;
			}
			// #ifdef APP-PLUS
				const goodsSpecNvue = uni.getSubNVueById('goodsSpec')
				goodsSpecNvue.show('slide-in-bottom',200)
				uni.$emit('goods_spec_setval',{product:this.product,detail:'limit'})
				uni.$emit('goods_spec_setval',{postData:this.postData,detail:'limit'})
			// #endif
			// #ifndef APP-PLUS
				this.$refs.cartPopu.show();
			// #endif
		},
		//单独购买
		myPay(e){
			if (!this.$fun.checkIsLogin(1, 1)) {
				return;
			}

			if(e){
				add_template_code({
					code: e.detail.formId,
					times: 1
				})
			}

			if(!this.$fun.checkIsLogin(1))return;
			delete this.postData.active ;
			this.$refs.cartPopu.show();
		},
		//返回首页
		goHome(){
			uni.switchTab({
				url:'/pages/index/index'
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

			//更改第一个规格显示图片
			for(let mbx in this.product.skuvaljosn){
				let arr=mbx.split(';')
				if(arr[0]==index){
					this.skuImg=this.product.skuvaljosn[mbx].Attr_Image
					break
				}
			}
        	//属性判断
        	if (attr_val) {
        		this.postData.attr_id = attr_val.Product_Attr_ID;   //选择属性的id
        		this.postData.count = attr_val.Property_count;   //选择属性的库存
				//this.skuImg=attr_val.Attr_Image//选择属性的图片
        		this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
				this.postData.productDetail_price = attr_val.xs_pricex; // 选择属性的价格
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
			this.check_attr = {};
        	this.check_attr = check_attr;
        	this.check_attrid_arr = check_attrid_arr;
        	this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length) ? false : true;
        	//购买数量处理  大于最高时赋值最高值
        	if (this.postData.qty > this.postData.count) {
        		this.postData.qty = this.postData.count;
        	}
        },
        skuSub(e){
				if(this.isSubmit) return;
			if(e){
				add_template_code({
					code: e.detail.formId,
					times: 1
				})
			}
        	if(!this.submit_flag) {
        		return ;
        	}
        	this.postData.prod_id = this.Products_ID;
			this.postData.active_id=this.product.spike_good_id;
        	if(this.postData.attr_id==0){
        		if(this.product.skujosn){
        			wx.showToast({
        			    title: '您还没有选择规格',
        			    icon: 'none'
        			})
        			return;
        		}
        	}
					this.isSubmit = true;
        	updateCart(this.postData).then(res=>{
						this.isSubmit = false;
				uni.navigateTo({
					url: '/pages/order/check?cart_key=DirectBuy'
				})

        	}).catch(e=>{
				this.isSubmit = false;
				uni.showToast({
					title: e.msg,
					icon:'none'
				})
			})
        	//确定加入购物车
        	this.$refs.cartPopu.close();
        },
				// 用户手动输入数量
				setCount(e){
						let amount = e.detail.value;
						if(amount <= 0) {
							this.postData.qty = 1;
							error('至少购买一件')
							return;
						}
						if(amount > this.postData.count) {
							this.postData.qty = this.postData.count;
							error('购买数量不能超过库存量')
							return;
						}
				},
        addNum(){
        	if (this.postData.qty < this.postData.count) {
				this.postData.qty = parseInt(this.postData.qty) + 1;
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
				this.postData.qty = parseInt(this.postData.qty) - 1;
        	} else {
        		uni.showToast({
        	        title: '购买数量不能小于1',
        	        icon: 'none',
        	    });
        		this.postData.qty = 1;
        	}
        },
        goCart(){
        	uni.switchTab({
        		url: '/pages/order/cart'
        	})
        },
        goBack(){
			// #ifdef H5
			history.go(-1);
			return;

			// #endif
			uni.navigateBack()
        	// goBack();
        },
        getCommit(item){
        	let data={
        		Products_ID:item,
        		page:1,
        		pageSize:2
        	}

        	getCommit(data,{errtip:false}).then(res=>{
				this.commit=res.data;
        	}).catch(e=>{})
        },
		stampCount(){
			let rt  = {};
			let times=new Date().getTime();
			if(times<this.product.start_time*1000){
				this.isKai=false;
				if(this.product && this.product.end_time){
					let computedStamp = getGroupCountdown({end_timeStamp:this.product.start_time})
					if(computedStamp){
						rt = computedStamp
					}else{
						//如果不对，就清空
						clearInterval(groupStamInstance)
					}
				}
			}else{
				this.isKai=true;
				if(this.product && this.product.end_time){
					let computedStamp = getGroupCountdown({end_timeStamp:this.product.end_time})
					if(computedStamp){
						rt = computedStamp
					}else{
						//如果不对，就清空
						clearInterval(groupStamInstance)
					}
				}
			}
			this.countdown = rt
		},
		getDetail(item){
			let data={
				spike_good_id:item
			}
			let _self = this;
			let product = null;

			spikeProdDetail(data).then(res=>{

				this.product = res.data;
				this.postData.productDetail_price=res.data.price;
				this.Products_ID=res.data.Products_ID;

				this.postData.count = res.data.Products_Count;
				if(res.data.skujosn) {
					this.product.skujosn = typeof res.data.skujosn ==='string' ?JSON.parse(res.data.skujosn):res.data.skujosn;
					this.product.skuvaljosn = typeof res.data.skuvaljosn === 'string' ?JSON.parse(res.data.skuvaljosn):res.data.skuvaljosn;
				}


				setTimeout(()=>{
					_self.Products_Description = formatRichTextByUparseFn(_self.product.Products_Description)
				},10)


				//this.stampCount()
				//开发时候一直倒计时太乱了
				groupStamInstance = setInterval(this.stampCount,1000)

				product = res.data

				if (res.data.skujosn) {
					let skujosn = res.data.skujosn;
					let skujosn_new = [];
					for (let i in res.data.skujosn) {
						skujosn_new.push({
							sku: i,
							val: skujosn[i]
						});
					}


					this.product.skujosn_new = skujosn_new;
					this.product.skuvaljosn = res.data.skuvaljosn;
				}
				// #ifdef APP-PLUS
				//规格选择
				uni.$emit('goods_spec_setval',{product:this.product,detail:'limit'})
				uni.$emit('goods_spec_setval',{postData:this.postData,detail:'limit'})
				// #endif

				// #ifdef H5

				let path = 'pages/detail/limitDetail?spikeGoodId='+this.spike_good_id;
				let front_url = this.initData.front_url;


				this.WX_JSSDK_INIT(this).then((wxEnv)=>{

					this.$wx.onMenuShareTimeline({
						title: product.Products_Name, // 分享标题
						link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: product.ImgPath, // 分享图标
						success: function() {
							// 用户点击了分享后执行的回调函数
						}
					});

					//两种方式都可以
					wxEnv.onMenuShareAppMessage({
						title: product.Products_Name, // 分享标题
						link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: product.ImgPath, // 分享图标
						desc: product.Products_BriefDescription||'好物推荐',
						type: 'link', // 分享类型,music、video或link，不填默认为link
						// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户点击了分享后执行的回调函数
						}
					});

				}).catch(()=>{
				})

				// #endif

				//resolve(res.data.Products_ID);

			}).catch(e=>{
			})
        },
        addCart(){
        	this.$refs.cartPopu.show();
        	this.postData.cart_key = 'CartList';
        },
        gotoComments(){
            uni.navigateTo({
            	url: '/pages/order/comments?pro_id='+this.Products_ID
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
	async created(){

		let initData = await this.getInitData();

		let WX_MINI_ORIGIN_ID = ls.get('WX_MINI_ORIGIN_ID');
		if(!WX_MINI_ORIGIN_ID){

			let login_methods = initData.login_methods
			for(var i in login_methods){
				if(i!='component_appid'  && login_methods[i].authorizer_user_name){
					WX_MINI_ORIGIN_ID = login_methods[i].authorizer_user_name
					break;
				}
			}

		}

		this.wxMiniOriginId = WX_MINI_ORIGIN_ID;

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
			.imgs{
				width: 100%;
				height: 100%;
			}
	}
}


    /* 返回按钮和购物车按钮 */
    .top {
        position: fixed;
        top: 10px;
        padding: 0 10px;
    	/* #ifdef APP-PLUS */
    	padding-top: var(--status-bar-height);
    	/* #endif */
        display: flex;
        justify-content: space-between;
        z-index: 10;
        width: 95%;
    }
    .top .myImg{
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
        background-repeat: no-repeat ;
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
    .s_top .img {
        width: 38px;
        height: 38px;
        display: block;
        margin: 0 auto 5px;
    }
    .s_top>div:nth-child(1) {
        /*margin-right: 60px;*/
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
       height: 83rpx;
       background-color: #fff;
    }
    .price {
        margin-top: 22px;
    }
    .price i {
        font-size: 10px;
        font-style: normal;
    }
    .price
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
		position: relative;
        padding-left: 26rpx;
		padding-top: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
        font-size: 22rpx;
        // display: flex;
        // align-items: center;
        // justify-content: space-between;
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
    .right .img{
        width: 19rpx;
        height: 30rpx;
        margin-left: 20rpx;
    }
    /* 领券 end */
    /* 包邮信息等 start */
  //   .section3 {
  //       display: flex;
  //       flex-wrap: wrap;
  //       font-size: 22rpx;
  //       padding: 15px 10px;
		// padding-top: 35rpx;
  //       border-bottom: 20rpx solid #f8f8f8;
  //       justify-content: space-around;
  //       background-color: #fff;
  //   }
  //   .section3>span {
  //       display: flex;
  //       align-items: center;
  //       margin-right: 10px;
  //   }
  //   .section3 img {
  //       width: 30rpx;
		// height: 30rpx;
  //       margin-right: 5px;
  //   }
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
    .c_content_title>.imggs {
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
		background: white;
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
            font-size: 36rpx;
			color: #FFFFFF;
            .pricef{
                font-size: 36rpx;
            }
            .prices{
                font-size: 50rpx;
                margin-left: 4px;
                font-weight: 500;
            }
            .pricet{
                font-size: 28rpx;
                margin-left: 6px;
                color: #ddd;
                text-decoration:line-through;
            }
        }
        .rightss{
			.countdown{
				color:#FFFFFF;
				font-size: 24rpx;
				line-height: 37rpx;
				overflow: hidden;
				height: 37rpx;
				display: flex;
				align-items: center;
				.spans{
					margin: 0 2px;
					padding: 0 2px;
					height:37rpx;
					width: 37rpx;
					line-height: 32rpx;
					text-align: center;
					background:#333333;
					color: #FFFFFF;
					font-size: 26rpx;
					box-shadow:0px 1px 1px 0px rgba(4,0,0,0.5), 0px 1px 1px 0px rgba(255,255,255,0.65);
					display: inline-block;

				}
				.spanss{
					margin: 0 2px;
					padding: 0 2px;
					height:37rpx;
					width: 37rpx;
					line-height: 32rpx;
					text-align: center;
					color: #FFFFFF;
					font-size: 26rpx;
					display: inline-block;
				}
            }
			.haha{
				font-size: 24rpx;
				line-height: 32rpx;
			}
        }
    }
    .titles{
		position: relative;
        .title{
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
			line-height:34rpx;
			max-height: 68rpx;
			overflow: hidden;
		}

		.share {
			position: absolute;
			right: 0;
			z-index: 999;
			top: 50%;
			background: red;
			color: #fff;
			text-align: center;
			margin-top: -10px;
			font-size: 13px;
			padding: 5px;
			border-top-left-radius: 20px;
			border-bottom-left-radius: 20px;
		}
    }
    .titlet{
        margin-top: 12px;
		padding-right: 36rpx;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(110,110,110,1);
        line-height:20px;
    }
    .pintuan{
        margin-bottom: 20rpx;
        background-color: #fff;
		padding:30rpx 27rpx  30rpx 19rpx;
        .pinTitle{
            font-size:28rpx;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:20px;
        }
        .mbxtext{
			margin-top: 21rpx;
			font-size: 22rpx;
			color: #888888;
			line-height: 36rpx;
		}

    }
	.fixed{
		height: 98rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		/* #ifdef MP */
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
		/* #endif */
		width: 100%;
		background-color: #F8F8F8;
		z-index: 9999;
		.leftss,.rightss{
			width: 50%;
			height: 98rpx;
			display: flex;
		}
		.leftss{
			.first{
				width: 33.3%;
				height: 98rpx;
				text-align: center;
				padding-top: 15rpx;
				.img{
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
			display:flex;
			.form{
				flex:1;
			}
			.dan{
				/*width: 50%;*/
				background-color: #FA6B27;
			}
			.tuan{
				/*width: 50%;*/
				background-color: #F43131;
			}
			.bTitle{
				height: 98rpx;
				overflow: hidden;
				color: #fff;
				text-align: center;
				padding: 10rpx 0;
				box-sizing: border-box;
				.danLeft{
					height: 32rpx;
					//overflow: hidden;
				}
				.bF{
					font-size: 24rpx;
					line-height: 32rpx;
				}
				.bS{
					font-size: 32rpx;
					line-height: 32rpx;

				}
				.danRight{
					font-size: 30rpx;
					border-radius: 0;
					border:none !important;
					color: white;
					background: none;
					display: block;
					&::after{
						display: none;
					}
				}
			}
		}
	}
	//规格
	.cartSku{
		padding: 0rpx 20rpx;
		.cartTop{
			position: relative;
			display: flex;
			padding-top: 20rpx;
			.image{
				width: 220rpx;
				height: 220rpx;
			}
			.cartTitle{
				margin-left: 20rpx;
				font-size: 32rpx;
				//width: 420rpx;
				flex: 1;
				.cartTitles{
					height: 80rpx;
					overflow: hidden;
					margin-top: 20rpx;
					line-height: 40rpx;
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
				//display: flex;
				padding: 15rpx 0rpx;
				.sku{
					font-size: 28rpx;
					height: 70rpx;
					line-height: 70rpx;
					width: 140rpx;
					padding-left: 10px;
					margin-bottom: 5px;
				}
				.skuValue{
					display: flex;
					//flex:1;
					flex-wrap: wrap;
					.skuview{
						margin-bottom: 10px;
						height: 70upx;
						line-height: 70upx;
						font-size: 14px;
						border-radius: 10upx;
						color: #000;
						background-color: #F2F2F2;
						padding-left: 20rpx;
						padding-right: 20rpx;
						margin-right: 20rpx;
						//border: 1px solid #ccc;
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
				//margin-right: 50rpx;
				display: flex;
				.inputs{
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
		border-radius: 0;
		border:none;
		&.disabled {
			background: #999;
		}
	}
	.skuCheck{
		color: #fff !important;
		background-color: #ff4200 !important;
	}
	.prices{
		width: 750rpx;
		box-sizing: border-box;
		height: 82rpx;
		padding-left: 20rpx;
		padding-right: 22rpx;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding-top: 32rpx;
		.btn{
			font-size: 22rpx;
			color: #666666;
			height: 50rpx;
			line-height: 50rpx;
		}
		.price{
			height: 27rpx;
			margin-top: 0rpx !important;
				.leftPrice{
					font-size: 22rpx;
					color: #777777;
					.rmb{
						color: #F43131;
						font-size: 24rpx;
						margin-left: 5rpx;
						margin-right: 5rpx;
					}
					.priceX{
						font-size: 30rpx;
						color: #F43131;
						font-weight: bold;
					}
				}
				.rightPrice{
					font-size: 24rpx;
					color: #B4B4B4;
					text-decoration:line-through;
					margin-left: 23rpx;
				}
		}
	}
	.errorMsg{
		width: 750rpx;
		height: 44rpx;
		background-color: #F7F6BD;
		display: flex;
		align-items: center;
		padding-left: 21rpx;
		position: fixed;
		bottom: 98rpx;
		color: #F43131;
		font-size: 20rpx;
		.errImg{
			width: 19rpx;
			height: 19rpx;
			margin-right: 12rpx;
		}
	}
	.top {
	    position: fixed;
	    top: 10px;
	    padding: 0 10px;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
	    display: flex;
	    justify-content: space-between;
	    z-index: 10;
	    width: 95%;
	}
	.imgm{
	    width: 30px;
	    height: 30px;
	}
	.imgms{
		width: 30px;
		height: 30px;
		position: absolute;
		top: 30px;
		left: 10px;
	}
	.carts{
		width: 30px;
		height: 30px;
		position: absolute;
		top: 30px;
		right: 10px !important;
	}
	.limits{
		width: 152rpx;
		height: 48rpx;
	}
	.section3 {
	    display: flex;
	    flex-wrap: wrap;
	    font-size: 0rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
				// padding: 30rpx 0;
	    // padding: 30rpx 20rpx;
	    // border-bottom: 20rpx solid #efefef;
	}
	.section3>span {
	    display: flex;
	    align-items: center;
	    // margin-right: 20rpx;
				margin: 20rpx 20rpx 20rpx 0;
				span{
					font-size: 24rpx;
					color: #333333;
				}
	}
	.section3 .img {
	    width: 28rpx;
		height: 28rpx;
	    margin-right: 10rpx;
	}
</style>
