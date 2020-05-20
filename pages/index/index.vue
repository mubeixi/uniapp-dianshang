<template>
	<view v-if="showIndex" class="index-all">
		<block v-if="storeID">
			<view class="store-all" :style="{backgroundImage:'url('+domainFn('/static/client/store/storeBg.png')+')'}">
				<div class='store-title' >
					{{storeInfo.Stores_Name?storeInfo.Stores_Name:''}}
				</div>
				<div class="store-info ">
					<div class="flex">
						<image :src="storeInfo.Stores_ImgPath"
						       class="store-img"></image>
						<div class="store-info-content">
							<div class="store-name" v-if="storeInfo.Stores_Name">
								{{storeInfo.Stores_Name}}
							</div>
							<div class="store-promise" v-if="storeInfo.city_express_config">
								<block v-if="storeInfo.city_express_config">
									{{storeInfo.city_express_config.limit_config.start_send_money}}元起送
								</block>
							</div>
						</div>
						<div class="store-list">
							<div class="store-list-name" @click="changeStore">
								切换门店<image class="store-list-image" :src="'/static/client/person/right.png'|domain" ></image>
							</div>
							<div class="store-list-distance" v-if="storeInfo.distance">
								<block v-if="storeInfo.distance>=1000">
									距你{{parseFloat(storeInfo.distance/1000).toFixed(2)}}km
								</block>
								<block v-else>
									距你{{parseInt(storeInfo.distance)}}m
								</block>

							</div>
						</div>
					</div>

					<div class="flex flex-vertical-center">
						<div class="store-icon" @click="openLocation">
							<i class="funicon  icon-address"></i>
							<div style="margin-top: 5px">定位</div>
						</div>
						<div class="store-line"></div>
						<div class="store-icon" @click="cellStore(storeInfo.Stores_Telephone)">
							<i class="funicon  icon-cell"></i>
							<div style="margin-top: 5px">拨号</div>
						</div>
						<div class="store-line"></div>
						<div class="store-icon" @click="openShare">
							<i class="funicon  icon-share-t"></i>
							<div style="margin-top: 5px">分享</div>
						</div>
					</div>
				</div>

				<div class="store-search-div" @click="goSearch">
					<input type="text" class="store-search" disabled=""/>
					<!--      <i class="funicon  icon-del1"></i>-->
					<i class="funicon  icon-search1"></i>
				</div>


				<ul class="store-ul flex"  :style="{marginLeft:-30*goodsNavIndex+'px'}">
					<li class="store-li" :class="goodsNavIndex==0?'active':''"  @click="changeTab(0)">全部</li>
					<block v-for="(cate,ind) of productCate" :key="ind">
						<li class="store-li" :class="goodsNavIndex==(ind+1)?'active':''" @click="changeTab(ind+1)">{{cate.Category_Name}}</li>
					</block>


				</ul>


				<swiper
				class="store-swiper"
				:style="{height:childSwiperHeight}"
				@change="prodIndexChangeEvent"
				:current="goodsNavIndex">
					<swiper-item >
						<div id="scrollView" class="store-item-swiper">
							<block v-for="(it,ind) of prodList[0]" :key="ind">
								<wzw-store  @updaCart="updaCart" @delQty="delQty" @addQty="addQty" :storeId="storeID" :myCart="myCart" :pro="it"></wzw-store>
							</block>
						</div>
					</swiper-item>

					<swiper-item   v-for="(cate,index) of productCate" :key="index">

						<div :id="'scrollView'+index" class="store-item-swiper">
							<block v-for="(it,ind) of prodList[index+1]" :key="ind">
								<wzw-store @updaCart="updaCart" @delQty="delQty" @addQty="addQty" :storeId="storeID" :myCart="myCart" :pro="it"></wzw-store>
							</block>

						</div>
					</swiper-item>

				</swiper>


				<!--  遮罩层	-->
				<view class="mask" v-if="showPro"  @click="showPro=false"></view>
				<!--  产品属性弹窗	-->
				<view class="sku-pop"  v-if="showPro">
					<view class="sku-title">选择商品属性</view>
					<view class="sku-content">
						<view class="skulist" v-for="item in prosku.skujosn_new" :key="">
							<view class="sku-name">{{item.sku}}</view>
							<view class="sku-item">
								<view :class="[check_attr[item.sku]==index?'active':'','sku']" @click="selectAttr(index,item.sku)"  v-for="(attr,index) of item.val" :key="">{{attr}}</view>
							</view>
						</view>
						<view class="skulist">
							<view class="sku-name">数量</view>
							<view class="sku-item">
								<view class="handle" @click="minus">-</view>
								<view class="pro-num">{{postData.qty}}</view>
								<view class="handle" @click="plus">+</view>
							</view>
						</view>
						<view class="sku-btns">
							<view class="cancel btn" @click="showPro=false">取消</view>
							<view class="confirm btn" @click="confirm()" >确定</view>
						</view>
					</view>
				</view>


			</view>
		</block>
		<block v-else>
			<no-store></no-store>
		</block>


		<popupLayer ref="popupLayer" :direction="'top'"  >
			<div class="shareinfo" >
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
				<div class="s_bottom" @click="cancelShare">取消</div>
			</div>
		</popupLayer>

		<store-list-components style="z-index: 10000;"  :pageEl="selfObj" :isDistance="true" :isProduct="false" direction="top" ref="stroeComp" @callFn="bindStores" catchtouchmove/>



	</view>
</template>

<script>
import {pageMixin} from "../../common/mixin";
import NoStore from "./chooseIndex";




import {getStoreDetail,getProductCategory,getSelfStoreProd,getCart,updateCart,getSystemConf,getStoreList} from '../../common/fetch'
import WzwStore from '../../components/wzw-store'
import {error, toast} from '../../common';
import {numberSort,getStoreID,emptyObject,ls,buildSharePath, isWeiXin,getProductThumb} from '../../common/tool.js'
import {domainFn} from '../../common/filter';
import StoreListComponents from "../../components/StoreListComponents";
import {mapGetters,mapActions, mapState} from 'vuex';
import popupLayer from '../../components/popup-layer/popup-layer.vue'
import {getLocation} from "../../common/tool/location";


export default {
	mixins:[pageMixin],
	components:{NoStore,WzwStore,StoreListComponents,popupLayer},
	data() {
		return {
			JSSDK_INIT:false,
			showIndex:false,
			initData:{},
			storeID:'',
			lat:'',
			lng:'',
			selfObj:null,
			childSwiperHeight:'auto',
			productCate:[],
			scrollHeightS:[0,0,0,0],
			store_id:'10',
			systemInfo: {city_express_config:{}},
			goodsNavIndex: 0,
			storeInfo:{},
			prodList:[],
			myCart:[],
			prosku:{},
			showPro:false,
			submit_flag:true,
			check_attr: {},
			check_attrid_arr: [],
			postData: {
				prod_id: 0,    //产品ID  在 onLoad中赋值
				attr_id: 0,    //选择属性id
				count: 0,         //选择属性的库存
				// showimg: '',      //选择属性的图片(用产品图片代替)
				qty: 1,           //退货数量
				productDetail_price: 0
			},
		};
	},
	onShareAppMessage() {
		let path = 'pages/index/index?store_id='+this.storeID;
		let shareObj = {
			title: this.storeInfo.Stores_Name,
			desc: '万千好货疯抢中',
			imageUrl: this.storeInfo.Stores_ImgPath,
			path: buildSharePath(path)
		};
		return shareObj
	},
	methods:{
		domainFn,
		async shareFunc(channel) {
			if(!this.$fun.checkIsLogin(1,1))return;
			let _self = this
			let path = 'pages/index/index?store_id='+this.storeID;
			let front_url = this.initData.front_url;
			let shareObj = {
				title: this.storeInfo.Stores_Name,
				desc: '万千好货疯抢中',
				imageUrl: this.storeInfo.Stores_ImgPath,
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

					uni.navigateTo({
						url:'/pagesA/store/storeShare?type=3'
					})

			}
		},
		openShare(){
			this.$refs.popupLayer.show()
		},
		cancelShare(){
			this.$refs.popupLayer.close()
		},
		bindStores(storeInfo){
			this.$refs.stroeComp.close()
			this.storeID=storeInfo.Stores_ID
			// #ifndef H5
			ls.set('store_id', this.storeID)
			//#endif
			// #ifdef H5
			sessionStorage.setItem('store_id', this.storeID)
			// #endif
			this.get_user_location_init()
		},
		changeStore(){
			this.$refs.stroeComp.show()
		},
		goSearch(){
			uni.navigateTo({
				url:'/pages/classify/search'
			})
		},
		delQty(item){
			let data={
				cart_key:'CartList',
				prod_id: item.prod_id,
				qty: -1,
				store_id:getStoreID()
			}
			if(item.Productsattrkeystrval){
				data.attr_id=item.Productsattrkeystrval.Product_Attr_ID
			}

			updateCart(data,{tip:'加载中'}).then(res=>{
				toast(res.msg)
				this.myCart=res.data.CartList
				this.showPro=false
			}).catch(e=>{
				error(e.msg)
				this.showPro=false
			})
		},
		addQty(item){

			let data={
				cart_key:'CartList',
				prod_id: item.prod_id,
				qty: 1,
				store_id:getStoreID()
			}
			if(item.Productsattrkeystrval){
				data.attr_id=item.Productsattrkeystrval.Product_Attr_ID
			}

			updateCart(data,{tip:'加载中'}).then(res=>{
				toast(res.msg)
				this.myCart=res.data.CartList
				this.showPro=false
			}).catch(e=>{
				error(e.msg)
				this.showPro=false
			})

		},
		plus(){
			if (this.postData.qty < this.postData.count) {
				this.postData.qty = Number(this.postData.qty) + 1;
			}else {
				uni.showToast({
					title: '数量不能大于库存量',
					icon: 'none',
				});
				this.postData.qty = this.postData.count;
			}
		},
		minus(){
			if(this.postData.qty == 0) return;
			if (this.postData.qty > 1) {
				this.postData.qty -= 1;
			} else {
				uni.showToast({
					title: '数量不能小于1',
					icon: 'none',
				});
				this.postData.qty = 1;
			}
		},
		// 选择属性
		selectAttr(index,i){
			this.zIndex = 100;
			var value_index = index; //选择的属性值索引
			var attr_index = i;   //选择的属性索引
			// if (this.check_attrid_arr.indexOf(value_index) > -1) return false;
			//记录选择的属性
			var check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }); //记录选择的属性  attr_index外的[]必须
			//属性处理
			var check_attrid = [];
			var check_attrname = [];
			var check_attrnames = [];
			var check_name=[]
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
				check_attrnames.push(attr_name + ':' + this.prosku.skujosn[attr_name][attr_id]);
				check_name.push(this.prosku.skujosn[attr_name][attr_id])
			}
			let mySku='';
			for(let item of check_name){
				mySku+=item+";"
			}
			mySku=mySku.substring(0,mySku.length-1)
			check_attrid = check_attrid.join(';');
			var attr_val = this.prosku.skuvaljosn[check_attrid];   //选择属性对应的属性值
			//数组转化为字符串
			check_attrnames = check_attrnames.join(';');
			//属性判断
			if (attr_val) {
				this.postData.attr_id = attr_val.Product_Attr_ID;   //选择属性的id
				this.postData.count = attr_val.Property_count;   //选择属性的库存
				// this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
				this.postData.productDetail_price = attr_val.Attr_Price?attr_val.Attr_Price:this.prosku.Products_PriceX; // 选择属性的价格
				this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) ? false : true;
			}
			//判断属性库存
			if (attr_val && attr_val.Property_count <= 0) {
				// uni.showToast({
				//     title: '您选择的 ' + check_attrnames + ' 库存不足，请选择其他属性',
				//     icon: 'none'
				// })
				this.submit_flag =  false;
				return false;
			}
			this.check_attr = {};
			//存取1；2；3
			this.check_attrid=check_attrid;
			this.check_attrnames=mySku;
			this.check_attr = check_attr;
			this.check_attrid_arr = check_attrid_arr;
			this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) || Object.getOwnPropertyNames(this.prosku.skuvaljosn).indexOf(check_attrid)==-1 ? false : true;
		},
		updaCart(data){



			if(data.skujosn) {
				let skujosn = data.skujosn;
				let skujosn_new = [];
				for (let i in data.skujosn) {
					skujosn_new.push({
						sku: i,
						val: skujosn[i]
					});
				}
				data.skujosn_new = skujosn_new;
				data.skuvaljosn = data.skuvaljosn;
			}
			this.prosku=data
			this.postData.count=data.Products_Count
			this.postData.qty=1
			this.postData.prod_id=data.Products_ID
			this.postData.attr_id=''

			this.showPro=true
		},
		confirm(){
			if(!this.submit_flag) {return;}

			if(this.prosku.skuvaljosn && !this.postData.attr_id) {
				uni.showToast({
					title: '请选择规格',
					icon: 'none'
				});
				return;
			}
			let data={
				cart_key:'CartList',
				prod_id: this.postData.prod_id,
				qty: this.postData.qty,
				store_id:getStoreID()
			}
			if(this.postData.attr_id){
				data.attr_id=this.postData.attr_id
			}

			updateCart(data,{tip:'加载中'}).then(res=>{
				toast(res.msg)
				this.myCart=res.data.CartList
				this.showPro=false
			}).catch(e=>{
				error(e.msg)
				this.showPro=false
			})



		},
		changeTab(item){
			this.goodsNavIndex=item
		},
		openLocation(){
			uni.openLocation({
				name:this.storeInfo.Stores_Address,
				latitude: Number(this.storeInfo.Stores_PrimaryLat),
				longitude: Number(this.storeInfo.Stores_PrimaryLng),
				success: function () {

				}
			});
		},
		cellStore(item){
			uni.makePhoneCall({
				phoneNumber: item
			});
		},
		async prodIndexChangeEvent(event) {
			const {current} = event.detail
			this.goodsNavIndex = current
			let that=this

			if(!this.prodList[this.goodsNavIndex]&&this.goodsNavIndex!=0){
				let data={
					page:1,
					pageSize:999,
					with_buyer:1,
					buyer_count:6,
					store_id:getStoreID()
					// store_id:sessionStorage.getItem('store_id')
				}
				data.cate_id=this.productCate[this.goodsNavIndex-1].Category_ID
				await getSelfStoreProd(data,{tip:'加载中'}).then(res=>{



					this.$set(that.prodList,this.goodsNavIndex,res.data)

				}).catch(e=>{error(e.msg||'获取产品列表失败')})
			}
			this.$nextTick().then(() => {
				if(this.goodsNavIndex===0){
					this.upSwiperHeight()
				}else{
					let str='#scrollView'+(this.goodsNavIndex-1)
					const query = uni.createSelectorQuery()
					console.log(str,"ss")
					query.select(str).boundingClientRect(data => {

						this.scrollHeightS[this.goodsNavIndex] = data.height
						this.upSwiperHeight()
					}).exec()
				}


			})


		},
		async init(){
			try {
				this.showIndex=true
				let storeData={
					store_id:this.storeID
				}
				if (this.lat && this.lng) {
					storeData.lat = this.lat
					storeData.lng = this.lng
				}
				let arr =await getStoreDetail(storeData,{tip:'智能定位中',noUid:1}).catch(e=>{

					this.storeID=''
					// #ifndef H5
					ls.set('store_id', '')
					//#endif
					// #ifdef H5
					sessionStorage.setItem('store_id', '')
					// #endif

					throw Error(e.msg||'获取门店错误')
				})
				this.storeInfo=arr.data





				let cate= await getProductCategory().catch(e=>{

				})

				uni.setNavigationBarTitle({
					title:this.storeInfo.Stores_Name
				})
				this.productCate=cate.data


				let data={
					page:1,
					pageSize:999,
					with_buyer:1,
					is_selling:1,
					buyer_count:6,
					store_id:getStoreID()
					//store_id:sessionStorage.getItem('store_id')
				}
				this.prodList=[]
				let pro=await getSelfStoreProd(data,{tip:'加载中'}).catch(e=>{error(e.msg||'获取产品列表失败')})
				this.prodList.push(pro.data)

				this.$nextTick().then(() => {

					const query = uni.createSelectorQuery()

					query.select('#scrollView').boundingClientRect(data => {

						this.scrollHeightS[0] = data.height
						this.goodsNavIndex === 0 && this.upSwiperHeight()
					}).exec()

				})

				getCart({cart_key: 'CartList'}).then(res=>{
					this.myCart=res.data.CartList
				})

				// #ifdef H5
				if(isWeiXin()){
					let path = 'pages/index/index?store_id='+this.storeID;
					let front_url = this.initData.front_url;
					this.WX_JSSDK_INIT(this).then((wxEnv)=>{
						wxEnv.onMenuShareTimeline({
							title:  this.storeInfo.Stores_Name, // 分享标题
							link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: this.storeInfo.Stores_ImgPath, // 分享图标
							desc: '万千好货疯抢中',
							success: function() {
								// 用户点击了分享后执行的回调函数
							}
						});
						//两种方式都可以
						wxEnv.onMenuShareAppMessage({
							title: this.storeInfo.Stores_Name, // 分享标题
							link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: this.storeInfo.Stores_ImgPath, // 分享图标
							desc: '万千好货疯抢中',
							type: 'link', // 分享类型,music、video或link，不填默认为link
							// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function() {
								// 用户点击了分享后执行的回调函数
							}
						});
					}).catch((e)=>{
						throw Error('初始化微信分享错误')
					})
				}

				// #endif

			}catch (e) {
				// console.log(e)
				error(e.message)
			}

		},
		upSwiperHeight(){
			try {
				const num = this.scrollHeightS[this.goodsNavIndex]
				if (num < 1 || num < this.systemInfo.windowHeight) throw Error('高度无效或者低于屏幕，直接设置为屏幕高度好了')
				this.childSwiperHeight = num + 'px'
			} catch (e) {
				if (this.systemInfo.windowHeight) this.childSwiperHeight = this.systemInfo.windowHeight + 'px'
			}
		},
		async get_user_location() {

			let localInfo = null;


			let rt = false
			let that=this
			//这里是返回了一个promise，而且不具备阻断后面的作用。不能用await promise.then()这样的古怪语法。要么就是await，要么就是promise.then()
			getLocation(that).then(res => {

				if (res.code === 0) {
					localInfo = res.data

					this.lat = localInfo.latitude
					this.lng = localInfo.longitude

					this.loadInfoStore()

				}
			}).catch(err => {

				this.storeID=''
				this.showIndex=true

			})




		},
		async get_user_location_init() {

			let localInfo = null;

			let that=this
			let rt = false
			//这里是返回了一个promise，而且不具备阻断后面的作用。不能用await promise.then()这样的古怪语法。要么就是await，要么就是promise.then()
			getLocation(that).then(res => {
				if (res.code === 0) {
					localInfo = res.data

					this.lat = localInfo.latitude
					this.lng = localInfo.longitude

					this.init()

				}
			}).catch(err => {
				this.init()
				//error('获取位置信息失败:' + err.msg)
			})



		},
		loadInfoStore() {

			let postData = {
				pageSize: 1,
				page: 1,
				stores_type:2
			}

			if (this.lat && this.lng) {
				postData.lat = this.lat
				postData.lng = this.lng
			}
			let that=this
			getStoreList(emptyObject(postData), {mask: true}).then(res => {
				if(res.data.length>0){
					this.storeID=res.data[0].Stores_ID

					that.init()
					// #ifndef H5
					ls.set('store_id', this.storeID)
					//#endif
					// #ifdef H5
					sessionStorage.setItem('store_id', this.storeID)
					// #endif
				}else{
					this.storeID=''
					// #ifndef H5
					ls.set('store_id', this.storeID)
					//#endif
					// #ifdef H5
					sessionStorage.setItem('store_id', this.storeID)
					// #endif
				}

			}).catch(e=>{error(e.msg||'获取门店错误')})
		},
		initStore(){
			this.storeID=getStoreID()
			this.showIndex=true
			if(this.storeID){
				this.systemInfo = uni.getSystemInfoSync()
				this.get_user_location_init()
			}else if(this.initData.store_positing==1){

				this.systemInfo = uni.getSystemInfoSync()
				this.get_user_location()
			}else{
				this.showIndex=true
			}


		}
	},
	async onLoad() {
		// #ifdef H5
		this.selfObj = this
		// #endif
		let systemConf = await getSystemConf()
		let initData = systemConf?systemConf.data:null
		this.initData=initData

		this.initStore()
	}
}
</script>

<style lang="scss" scoped>
	.index-all{
		width: 750rpx;
		overflow-x: hidden;
		box-sizing: border-box;
		background-color: #FFFFFF;
		height: 100vh;
		overflow-y: scroll;
		position: relative;
	}
	.store-all {
		width: 750rpx;
		//height: 100vh;
		//overflow-x: hidden;
		background-repeat: no-repeat;
		background-size: 100% auto;
	}

	.store-item-swiper{
		padding-bottom: 42px;
	}
	.store-title {
		font-size: 22px;
		height: 42rpx;
		line-height: 42rpx;
		width: 750rpx;
		text-align: center;
		font-weight: bold;
		padding-top: 70rpx;
		color: #FFFFFF;
	}

	.store-info {
		width: 710rpx;
		//height: 240rpx;
		margin: 40rpx auto 40rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 46rpx 0px rgba(198, 26, 19, 0.17);
		border-radius: 10rpx;
		padding: 24rpx;
		box-sizing: border-box;
	}

	.store-img {
		width: 92rpx;
		height: 92rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.store-info-content {
		width: 200rpx;
		margin-right: 50rpx;
	}

	.store-name {
		margin-top: 6px;
		height: 30rpx;
		font-size: 30rpx;
		line-height: 30rpx;
		width: 300rpx;
		overflow: hidden;
		white-space: nowrap;
	}
	.store-list{
		margin-left: auto;
		text-align: right;
		&-name{
			height: 40rpx;
			line-height: 30rpx;
			font-size: 30rpx;
			color: #777777;
			padding-top: 6px;
			margin-bottom: 16rpx;
		}
		&-image{
			width: 16rpx;
			height: 24rpx;
			margin-left: 14rpx;
		}
		&-distance{
			height: 24rpx;
			line-height: 24rpx;
			color: #FF4E00;
			font-size: 24rpx;
		}
	}

	.store-promise {
		padding: 0rpx 8rpx;
		border: 1px solid #FF4E00;
		font-size: 10px;
		color: #FF4E00;
		text-align: center;
		border-radius: 6rpx;
		height: 36rpx;
		line-height: 36rpx;
		box-sizing: border-box;
		display: inline-block;
		margin-top: 7px;
	}

	.store-icon {
		width: 234rpx;
		text-align: center;
		font-size: 12px;
		color: #666666;
		padding-top: 30rpx;
	}

	.icon-address, .icon-cell, .icon-share-t {
		color: #ff774d;
		font-size: 22px;
	}

	.store-search {
		width: 710rpx;
		height: 66rpx;
		line-height: 66rpx;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		padding-right: 200rpx;
		position: relative;
		font-size: 13px;
		color: #FFFFFF;
		border: 1px solid #FFFFFF;
	}

	.store-search-div {
		position: relative;
		width: 710rpx;
		margin: 0 auto;
		height: 66rpx;
	}

	.icon-del1 {
		font-size: 32rpx;
		color: #ffd2be;
		position: absolute;
		top: 16rpx;
		left: 590rpx;
	}

	.icon-search1 {
		font-size: 38rpx;
		color: #ffd2be;
		position: absolute;
		top: 10rpx;
		left: 644rpx;
	}

	.store-ul {
		width: 750rpx;
		height: 50rpx;
		padding-top: 20rpx;
		overflow-x: scroll;
		padding-left: 20rpx;
		padding-right: 20rpx;
		margin: 20rpx auto 30rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		line-height: 32rpx;
	}

	.store-li {
		height: 50rpx;
		padding-bottom: 16rpx;
		box-sizing: border-box;
		margin-right: 40rpx;
		white-space: nowrap;
		position: relative;
		text-align: center;
		display: inline-block;
		zoom: 1;
		font-size: 14px;
	}

	.active {
		font-size: 17px;
		font-weight: bold;

		&:after {
			content: "";
			display: block;
			width: 30rpx;
			height: 4rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 2rpx;
			position: absolute;
			bottom: 0px;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.store-swiper {
		padding: 0rpx 20rpx;
		box-sizing: border-box;
	}


	.mask {
		background-color: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
	.sku-pop {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 10000;
		width: 526rpx;
		transform: translate(-50%,-50%);
		border-radius: 10rpx;
		.sku-title {
			height: 60rpx;
			line-height: 60rpx;
			background-color: #f6f6f6;
			color: #333;
			font-size: 24rpx;
			text-align: center;
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
		}
		.sku-content {
			padding: 40rpx 46rpx 34rpx 40rpx;
			background-color: #fff;
			border-bottom-left-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
			.skulist {
				margin-bottom: 30rpx;
				display: flex;
				align-items: center;
				&.change-btn {
					padding-top: 43rpx;
					justify-content: center;
				}
				.selected,
				.nochecked {
					display: block;
					width: 40rpx;
					height: 40rpx;
					margin-right: 23rpx;
				}
				.nochecked {
					box-sizing: border-box;
					border:2rpx solid rgba(214,214,214,1);
					border-radius:3px;
				}
				.input {
					width:420rpx;
					height:60rpx;
					border:1px solid rgba(214,214,214,1);
					font-size: 24rpx;
					padding-left: 24rpx;
					box-sizing: border-box;
					line-height: 36rpx;
				}
				.btn {
					width: 130rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					background-color: #E9E9E9;
					font-size: 24rpx;
				}
				.cancel {
					color: #666;
					margin-right: 25rpx;
				}
				.confirm {
					color: #fff;
					background-color: $wzw-primary-color;
				}
				.sku-name {
					color: #333;
					font-size: 24rpx;
					margin-right:26rpx;
				}
				.sku-item {
					display: flex;
					align-items: center;
					color: #666;
					flex: 1;
					flex-wrap: wrap;
					.img {
						width: 27rpx;
						height: 32rpx;
					}
					.sku {
						padding: 0 10rpx;
						height: 46rpx;
						line-height: 46rpx;
						text-align: center;
						background-color: #f6f6f6;
						color: #666;
						font-size: 24rpx;
						margin-right: 13rpx;
						border-radius: 5rpx;
					}
					.active {
						background-color: #FF4E00;
						color: #fff;
					}
					.handle {
						width: 50rpx;
						height: 45rpx;
						line-height: 45rpx;
						text-align: center;
						font-size: 32rpx;
						color: #777;
						background: #f6f6f6;
					}
					.pro-num {
						margin: 0 15rpx;
						font-size: 24rpx;
						color: #777;
					}
				}
			}
			.sku-btns {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 60rpx;
				.btn {
					width: 130rpx;
					height: 50rpx;
					text-align: center;
					line-height: 50rpx;
					font-size: 24rpx;
				}
				.cancel {
					background: #e9e9e9;
					color: #666;
					margin-right: 25rpx;
				}
				.confirm {
					background-color: #FF4E00;
					color: #fff;
				}
				.disabled {
					background: #999;
				}
			}
		}
		.priceSum {
			text-align: center;
			padding: 68rpx 0 104rpx;
			background-color: #fff;
			.title {
				font-size: 28rpx;
				margin-bottom: 28rpx;
			}
			.icon {
				color: $wzw-primary-color;
				font-size: 26rpx;
				margin-right: 10rpx;
			}
			.span {
				color: $wzw-primary-color;
				font-size: 36rpx;
			}
		}
	}
	.back-btn {
		height: 50rpx;
		width: 130rpx;
		text-align: center;
		background-color: $wzw-primary-color;
		color: #fff;
		border-radius: 25rpx;
		line-height: 50rpx;
	}
	.check {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		line-height: 90rpx;
		font-size: 24rpx;
		color: #333;
		background-color: #fff;
		box-shadow: 0px 0px 22px 0px rgba(4,0,0,0.12);
		.check-msg {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color: #333;
			.num {
				color: $wzw-primary-color;
				fong-size: 28rpx;
			}
			.img {
				width: 17rpx;
				height: 14rpx;
				margin-left: 12rpx;
			}
			.turn {
				transform: rotate(180deg);
			}
		}
		.submit {
			width: 210rpx;
			height: 100%;
			line-height: 90rpx;
			background: $wzw-primary-color;
			font-size: 28rpx;
			color: #fff;
			text-align: center;
		}
	}


	//分享
	.ticks,.shareinfo {
		background: #fff;
		width: 100%;
		padding: 30rpx 0 60rpx;
		color: #333;
		z-index: 100;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		/* #ifdef H5 */
		margin-bottom: 50px;
		/* #endif */
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
		// position: fixed;
		width: 100%;
		z-index: 999;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #FFFFFF;
	}
	.t_title image {
		height: 24rpx;
		width: 24rpx;
		position: absolute;
		top: 33rpx;
		right: 20rpx;
	}
	.t_content {
		position: relative;
		width: 720rpx;
		height: 160rpx;
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
	.s_top .img {
		width: 76rpx;
		height: 76rpx;
		display: block;
		margin: 0 auto 10rpx;
	}
	.s_top>div:nth-child(1) {
		/*margin-right: 120rpx;*/
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
		margin-top: 16rpx;
	}
	//分享结束
	.store-line{
		width: 2px;
		height: 40rpx;
		background-color: #FFCBCB;
	}


</style>
