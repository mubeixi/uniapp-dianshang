<template>
	<view>
		<block v-if="storeID">
			<view class="store-all">
				<div class='store-title'>
					{{storeInfo.Stores_Name}}
				</div>
				<div class="store-info flex">
					<image :src="storeInfo.Stores_ImgPath"
								 class="store-img"></image>
					<div class="store-info-content">
						<div class="store-name">
							{{storeInfo.Stores_Name}}
						</div>
						<div class="store-promise" >
							<block v-if="storeInfo.city_express_config">
								{{storeInfo.city_express_config.limit_config.start_send_money}}元起送
							</block>
						</div>
					</div>

					<div class="store-icon" @click="openLocation">
						<i class="funicon  icon-address"></i>
						<div style="margin-top: 5px">定位</div>
					</div>
					<div class="store-icon" @click="cellStore(storeInfo.Stores_Telephone)">
						<i class="funicon  icon-cell"></i>
						<div style="margin-top: 5px">拨号</div>
					</div>
					<div class="store-icon">
						<i class="funicon  icon-share-t"></i>
						<div style="margin-top: 5px">分享</div>
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
								<wzw-store  @updaCart="updaCart" @delQty="delQty" @addQty="addQty" :storeId="store_id" :myCart="myCart" :pro="it"></wzw-store>
							</block>
						</div>
					</swiper-item>

					<swiper-item   v-for="(cate,index) of productCate" :key="index">

						<div :id="'scrollView'+index" class="store-item-swiper">
							<block v-for="(it,ind) of prodList[index+1]" :key="ind">
								<wzw-store @updaCart="updaCart" @delQty="delQty" @addQty="addQty" :storeId="store_id" :myCart="myCart" :pro="it"></wzw-store>

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



	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import NoStore from "./chooseIndex";




	import {getStoreDetail,getProductCategory,getSelfStoreProd,getCart,updateCart,getSystemConf} from '../../common/fetch'
	import WzwStore from '../../components/wzw-store'
	import {error, toast} from '../../common';
	import {numberSort,getStoreID} from '../../common/tool.js'

	import {mapGetters,mapActions, mapState} from 'vuex';
	import {getLocation} from "../../common/tool/location";
	export default {
		mixins:[pageMixin],
		components:{NoStore,WzwStore},
		data() {
			return {
				initData:{},
				storeID:'',
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
		methods:{
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
				let arr =await getStoreDetail({store_id:this.store_id}).catch(e=>{

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
			    //这里是返回了一个promise，而且不具备阻断后面的作用。不能用await promise.then()这样的古怪语法。要么就是await，要么就是promise.then()
			    getLocation().then(res => {
			        if (res.code === 0) {
			            localInfo = res.data

			            this.lat = localInfo.latitude
			            this.lng = localInfo.longitude

			            this.loadInfo()

			        }
			    }).catch(err => {
			        error('获取位置信息失败:' + err.msg)
			    })



			},
			initStore(){
				this.storeID=getStoreID()
				if(this.storeID){
					this.systemInfo = uni.getSystemInfoSync()
					this.init()
				}else if(this.initData.store_positing==0){
					this.get_user_location()
				}


			}
		},
		async onLoad() {
			let systemConf = await getSystemConf()
			let initData = systemConf?systemConf.data:null
			this.initData=initData

			this.initStore()
		}
	}
</script>

<style lang="scss" scoped>
	.store-all {
		width: 750rpx;
		height: 100vh;
		//overflow-x: hidden;
		background-repeat: no-repeat;
		background-size: 100% 60%;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAOaCAYAAADH2depAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMmI0YjMwMS0zN2U1LWZjNDctOTY5Yi1mMGIzMGJhZDM2ODUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkIxREQ0RUE4RUFDMTFFQTg3MzJCQjcyMDU2OTgyOTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkIxREQ0RTk4RUFDMTFFQTg3MzJCQjcyMDU2OTgyOTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZDY1MzY2ZWEtNzA1NS1kNDQzLTkxN2YtNmRjODJhYmMyM2VkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIyYjRiMzAxLTM3ZTUtZmM0Ny05NjliLWYwYjMwYmFkMzY4NSIv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');
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
		height: 140rpx;
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
		font-size: 16px;
		line-height: 30rpx;
		width: 200rpx;
		overflow: hidden;
		white-space: nowrap;
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
		width: 48rpx;
		text-align: center;
		font-size: 12px;
		color: #666666;
		margin-top: 10rpx;
		margin-left: 50rpx;
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

	.store-swiper-item {
		width: 710rpx;
		height: 700rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		margin-bottom: 10px;
		box-sizing: border-box;
		padding: 20rpx;
	}
	.store-item-swiper{
		width: 710rpx;
		overflow-x: hidden;
	}

	.store-item-img {
		width: 670rpx;
		height: 400rpx;
		margin-bottom: 20rpx;
	}

	.store-item-title {
		width: 658rpx;
		height: 72rpx;
		font-size: 15px;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 32rpx;
	}

	.store-price {
		align-items: flex-end;
		margin-bottom: 38rpx;
	}

	.price-x {
		color: #FF3C00;
	}

	.price-y {
		color: #BFBFBF;
		margin-left: 20rpx;
	}

	.saley {
		color: #888888;
		font-size: 13px;
	}
	.info-img{
		width: 46rpx;
		height: 46rpx;
		border-radius: 50%;
		margin-right: -4px;
	}
	.store-cart{
		width:180rpx;
		height:60rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 60rpx;
		text-align: center;
		background:rgba(255,78,0,1);
		border-radius:30rpx;
	}
	.store-count{
		width: 58rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 13px;
		color: #333333;
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


</style>
