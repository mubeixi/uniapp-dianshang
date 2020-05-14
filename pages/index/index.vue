<template>
	<view>
		<block v-if="storeID">
			<view class="store-all" :style="{backgroundImage:'url('+domainFn('/static/client/storeBg.png')+')'}">
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
	import {domainFn} from '../../common/filter';

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
			domainFn,
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
