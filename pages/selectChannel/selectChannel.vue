<template>
	<view class="wrap">
		<!-- <view class="title">选择渠道</view> -->
		<view class="content">
			<view class="c-item">
				<view class="item-left">进货渠道</view>
				<view class="item-right" @click="changeChannel">
					<text>{{channelName}}</text>
					<image :src="'/static/client/person/right.png'|domain" class="right"></image>
				</view>
			</view>
			<view class="c-item" v-if="selectitem == 1">
				<view class="item-left">地址选择</view>
				<view class="item-area">
					<picker class="a-item" mode = "selector" :range="provinceList"  range-key="name" :value="p_index" @change="p_change_handle">
						<block v-if="p_clicked">{{provinceList[p_index].name}}</block> <block v-else>请选择省份 <image class="bot" :src="'/static/client/person/right.png'|domain" mode=""></block></image>
					</picker>
					<picker class="a-item" mode = "selector" :range="citylist"  range-key="name" :value="c_index" @change="c_change_handle">
						<block v-if="c_clicked">{{citylist[c_index].name}}</block> <block v-else>请选择市 <image class="bot" :src="'/static/client/person/right.png'|domain" mode=""></image></block> 
					</picker>
					<picker class="a-item" mode = "selector" :range="arealist" range-key="name" :value="a_index" @change="a_change_handle">
						<block v-if="a_clicked">{{arealist[a_index].name}}</block> <block v-else>请选择县区 <image class="bot" :src="'/static/client/person/right.png'|domain" mode=""></image></block>	
					</picker>
				</view>
			</view>
			<view class="c-item" v-if="selectitem == 1">
				<view class="item-left">门店编号</view>
				<view class="item-input"><input type="text" v-model="purchase_store_sn" placeholder="请输入门店编号" placeholder-style="color: #c9c9c9;font-size:24rpx;" /></view>
			</view>
		</view>
		<view class="search" @click="goPurchase">搜索</view>
		<div class="lists" v-if="selectitem == 1">
		   <scroll-view  scroll-y="true" class="scroll-Y" >
		       <block v-if="stores.length>0">
		           <view>
		               <label class="item padding10" v-for="(store,idx) in stores" :key="idx" @click="gostock(store.stores_sn)">
		                   <image class="logo" :src="store.Stores_ImgPath|domain" />
		                   <view class="info">
		                       <div class="flex flex-between">
		                           <div class="font14">{{store.Stores_Name}}</div>
		                           <div class="distance font12 graytext" v-if="store.distance">{{store.distance|distanceFn}}km</div>
		                       </div>
													 <div class="font12 graytext flex align-center"><image class="icon" src="/static/qudao_cell.png"></image>{{store.Stores_Telephone}}</div>
		                       <div class="font12 graytext flex align-center"><image class="icon" src="/static/qudao_local.png"></image>{{store.Stores_Province_name}}{{store.Stores_City_name}}{{store.Stores_Area_name}}{{store.Stores_Address}}</div>
		                   </view>
		               </label>
		           </view>
		       </block>
		       <div >
		
		       </div>
		   </scroll-view>
		</div>
		<popupLayer ref="searchLayer" :direction="'top'" @maskClicked="maskClicked">
			<view class="search-title">选择渠道</view>
			<view class="search-content">
				<view class="search-item" @click="changeItem(1)">
					<view>门店进货</view>
					<view class="box" v-if="selectitem == 2"></view>
					<view v-if="selectitem == 1">
						<image class="image" src="/static/procurement/selected.png" mode=""></image>
					</view>
				</view>
				<view class="search-item" @click="changeItem(2)">
					<view>平台进货</view>
					<view class="box" v-if="selectitem == 1"></view>
					<view v-if="selectitem == 2">
						<image class="image" src="/static/procurement/selected.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- <view class="search-bottom" @click="closePop">确定</view> -->
		</popupLayer>
	</view>
</template>

<script>
	import area from '../../common/area.js';
	import popupLayer from '../../components/popup-layer/popup-layer.vue'
	import util from '../../common/util.js'
	import {getStoreList} from '../../common/fetch.js';
	import {getLocation} from "../../common/tool/location";
	export default {
		components: {
			popupLayer
		},
		data() {
			return {
				selectitem: 1,
				purchase_store_sn: '',
				provinceList: [],
				p_index: 0,
				c_index: 0,
				a_index: 0,
				p_clicked: false,
				c_clicked: false,
				a_clicked: false,
				stores: []
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.load();
		},
		computed: {
			channelName(){
				return this.selectitem == 1 ? '门店进货' : '平台进货'
			},
			p_id(){
				return	this.provinceList[this.p_index].id
			},
			c_str(){
				return '0'+ ',' + this.p_id
			},
			citylist(){
				let citys = area.area[0][this.c_str];
				return this.objtoarr(citys)
			},
			c_id(){
				return this.citylist[this.c_index].id
			},
			a_str(){
				return this.c_str + ',' + this.c_id
			},
			arealist(){
				let areas = area.area[0][this.a_str]
				return this.objtoarr(areas)
			},
			a_id(){
				return this.arealist[this.a_index].id
			}
		},
		methods: {
			load(){
					console.log(area.area[0]['0'])
					console.log(this.objtoarr(area.area[0]['0']))
					this.provinceList = this.objtoarr(area.area[0]['0']);
					
			},
			// 省份变动
			p_change_handle(e){
				this.p_clicked = true;
				this.c_clicked = false;
				this.a_clicked = false;
				this.p_index = e.detail.value;
			},
			// 市变动
			c_change_handle(e) {
				this.c_clicked = true;
				this.a_clicked = false;
				this.c_index = e.detail.value;
			},
			a_change_handle(e) {
				this.a_clicked = true;
				this.a_index = e.detail.value;
			},
			objtoarr(obj){
				let arr = [];
				for(let i in obj){
					arr.push({id: i,name: obj[i]})
				}
				return arr
			},
			async get_user_location(){
			    let localInfo = null;
			    let rt =false
			    await getLocation(this.pageEl).then(res=>{
			        if(res.code===0){
			            localInfo = res.data
			            rt = true
			        }
			    }).catch(err=>{
			        console.log(err)
			        error('获取位置信息失败:'+err.msg)
			    })
			
			    console.log('获取到的位置信息',localInfo)
			
			    if(!rt)return;
			    this.lat = localInfo.latitude
			    this.lng = localInfo.longitude	
			},
			// 获取门店列表，
			getStoreList(){
				let postData = {
				    pageSize:10000,
				    page:1,
				    stores_sn: this.purchase_store_sn,
						// search_stores_sn: this.search_stores_sn,
				}
				if(this.p_clicked) {
					// 选择省了
					postData.province = this.p_id;
				}
				if(this.c_clicked) {
					postData.city = this.c_id;
				}
				if(this.a_clicked) {
					postData.area = this.a_id;
				}
				
				if(this.lat && this.lng){
				    postData.lat = this.lat
				    postData.lng = this.lng
				}
				getStoreList(postData,{tip:"加载中..."}).then(res => {
							
				    this.stores = res.data;
				})
			},
			goPurchase(){
				// if(this.selectitem == 1 && !this.purchase_store_sn) {
				// 	uni.showToast({
				// 		title: '门店编号必须填写',
				// 		icon: 'none'
				// 	});
				// 	return;
				// }
				if(this.selectitem == 1) {
					this.getStoreList();
					return;
				}
				if(this.selectitem == 1) {
					uni.navigateTo({
						url: '/pagesA/procurement/stock?purchase_store_sn=' + this.purchase_store_sn
					})
				}else {
					uni.navigateTo({
						url: '/pagesA/procurement/stock'
					})
				}
			},
			// 点击门店跳转去相应门店进货
			gostock(stores_sn) {
				uni.navigateTo({
					url: '/pagesA/procurement/stock?purchase_store_sn=' + this.stores_sn
				})
			},
			// 用户只是点击了遮罩
			maskClicked(){
				this.selectitem = this.selectitem;
			},
			changeChannel(){
				this.$refs.searchLayer.show();
			},
			changeItem(num){
				this.selectitem = num;
				this.$refs.searchLayer.close();
			},
			closePop(){
				
				// this.$refs.searchLayer.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		min-height: 100vh;
		background-color: #fff;
		.title {
			height: 90rpx;
			background-color: #f8f8f8;
			color: #333;
			font-size: 32rpx;
			text-align: center;
			line-height: 90rpx;
		}
		.content {
			padding: 27rpx 17rpx 0 23rpx;
			.c-item {
				display: flex;
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: 2rpx solid #ebebeb;
				justify-content: space-between;
				font-size: 30rpx;
				.item-left {
					width: 150rpx;
				}
				.item-area {
					display: flex;
					justify-content: space-between;
					margin-left: 40rpx;
					width: 600rpx;
					font-size: 22rpx;
					color: #999999;
					.a-item {
						width: 130rpx;
						white-space:nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						display: flex;
						justify-content: space-around;
						align-items: center;
						background-color: #F4F4F4;
						padding: 0 18rpx;
						.bot {
							height: 16rpx;
							width: 12rpx;
							transform: rotate(90deg);
							margin-left: 14rpx;
						}
					}
				}
				.item-right {
					font-size: 28rpx;
					color: #777;
					display: flex;
					align-items: center;
					.right {
						width: 18rpx;
						height: 27rpx;
						margin-left: 20rpx;
					}
				}
				.item-input {
					flex: 1;
					margin-left: 30rpx;
					font-size: 24rpx;
					height: 50rpx;
					line-height: 50rpx;
				}
			}
		}
		.lists{
		    .item{
		        display: flex;
		        align-items: center;
		        .logo{
		            height: 44px;
		            width:44px;
		            border-radius: 50%;
		            background-color: #f2f2f2;
		            background-repeat: no-repeat;
		            background-size: cover;
		            background-position: center;
		
		        }
		        .info{
		            flex:1;
								margin-left: 6px;
								.align-center {
									align-items: center;
									.icon {
										width: 20rpx;
										height: 24rpx;
										margin-right: 16rpx;
									}
								}
		        }
		    }
		}
		.search {
			margin: 88rpx auto;
			color: #FFF;
			background-color: #F43131;
			height: 75rpx;
			line-height: 75rpx;
			text-align: center;
			font-size: 30rpx;
			border-radius: 10rpx;
			width: 95%;
		}
		.search-title {
			line-height: 88rpx;
			color: #333;
			text-align: center;
			font-size: 32rpx;
		}
		.search-content {
			padding: 20rpx;
		}
		.search-item {
			display: flex;
			justify-content: space-between;
			height: 50rpx;
			line-height: 50rpx;
			align-items: center;
			padding: 25rpx 0;
			border-bottom: 1px solid #e6e6e6;
			padding: 25rpx 0;
			font-size: 28rpx;
			.image {
				display: block;
				width: 22px;
				height: 22px;
			}
			.box {
				width: 22px;
				height: 22px;
				border: 1px solid #e6e6e6;
				box-sizing: border-box;
			}
		}
		& .search-item:nth-last-child(1) {
			border-bottom: 0;
		}
		.search-bottom {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #F43131;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			margin-top: 80rpx;
		}
	}
</style>
