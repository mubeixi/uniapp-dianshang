<template>
	<view class="wrap">
		<!-- <view class="title">选择渠道</view> -->
		<view class="content">
			<view class="c-item">
				<view class="item-left">{{is_purchase?'退':'进'}}货渠道</view>
				<view @click="changeChannel" class="item-right">
					<text v-if="is_purchase">
						{{pid?'门店退货':'平台退货'}}
					</text>
					<text v-else>{{channelName}}</text>
					<image :src="'/static/client/person/right.png'|domain" class="right" v-if="allow_from_plat == 1 "></image>
				</view>
			</view>
			<view class="c-item" v-if="selectitem == 1&&!is_purchase">
				<view class="item-left">地址选择</view>
				<view class="item-area">
					<picker :range="provinceList" :value="p_index" @change="p_change_handle" class="a-item" mode="selector"
					        range-key="name">
						<block v-if="p_clicked">{{provinceList[p_index].name}}</block>
						<block v-else>请选择省份
							<image :src="'/static/client/person/right.png'|domain" class="bot" mode="">
						</block>
						</image>
					</picker>
					<picker :disabled="!openCity" :range="citylist" :value="c_index" @change="c_change_handle" class="a-item"
					        mode="selector" range-key="name">
						<block v-if="c_clicked">{{citylist[c_index].name}}</block>
						<block v-else>请选择市
							<image :src="'/static/client/person/right.png'|domain" class="bot" mode=""></image>
						</block>
					</picker>
					<picker :disabled="!openArea" :range="arealist" :value="a_index" @change="a_change_handle" class="a-item"
					        mode="selector" range-key="name">
						<block v-if="a_clicked">{{arealist[a_index].name}}</block>
						<block v-else>请选择县区
							<image :src="'/static/client/person/right.png'|domain" class="bot" mode=""></image>
						</block>
					</picker>
				</view>
			</view>
			<view class="c-item" v-if="selectitem == 1&&!is_purchase">
				<view class="item-left">门店编号</view>
				<view class="item-input"><input placeholder="请输入门店编号" placeholder-style="color: #c9c9c9;font-size:24rpx;" type="text"
				                                v-model="purchase_store_sn" /></view>
			</view>
		</view>
		<view @click="goPurchase" class="search" v-if="is_purchase">确定</view>
		<!-- <view class="search" @click="goPurchase">{{is_purchase && selectitem == 2 ? '确定' : '搜索'}}</view> -->
		<div class="label-title" style="justify-content: space-between;" v-if="selectitem == 1 && stores.length > 0">
			<div class="line"></div>
			<div>门店列表</div>
			<div @click="get_user_location" class="graytext font14 flex1 text-right padding10-c"><span
			class="funicon icon-dingwei font14"></span>离我最近
			</div>
		</div>
		<div class="lists" v-if="selectitem == 1">
			<scroll-view class="scroll-Y" scroll-y="true">
				<block v-if="stores.length>0">
					<view>
						<label :key="idx" @click="gostock(store.stores_sn, store.Stores_ID)" class="item padding10"
						       v-for="(store,idx) in stores">
							<image :src="store.Stores_ImgPath|domain" class="logo" />
							<view class="info">
								<div class="flex flex-between">
									<div class="font14">{{store.Stores_Name}}</div>
									<div @click.stop="openAddress(store)" class="distance font12 graytext" v-if="store.distance">
										{{store.distance|distanceFn}}km
									</div>
								</div>
								<div class="font12 graytext flex align-center">
									<image class="icon" src="/static/qudao_cell.png"></image>
									{{store.Stores_Telephone}}
								</div>
								<div class="font12 graytext flex align-center">
									<image class="icon" src="/static/qudao_local.png"></image>
									{{store.Stores_Province_name}}{{store.Stores_City_name}}{{store.Stores_Area_name}}{{store.Stores_Address}}
								</div>
							</view>
						</label>
					</view>
				</block>
				<block v-if="stores.length==0 && is_getted">
					<div class="graytext padding15 text-center font14">
						暂时没有合适的店铺
					</div>
				</block>
			</scroll-view>
		</div>
		<popupLayer :direction="'top'" @maskClicked="maskClicked" ref="searchLayer">
			<view class="search-title">选择渠道</view>
			<view class="search-content">
				<view @click="changeItem(1)" class="search-item">
					<view>门店{{is_purchase?'退':'进'}}货</view>
					<view class="box" v-if="selectitem == 2"></view>
					<view v-if="selectitem == 1">
						<image class="image" mode="" src="/static/procurement/selected.png"></image>
					</view>
				</view>
				<view @click="changeItem(2)" class="search-item">
					<view>平台{{is_purchase?'退':'进'}}货</view>
					<view class="box" v-if="selectitem == 1"></view>
					<view v-if="selectitem == 2">
						<image class="image" mode="" src="/static/procurement/selected.png"></image>
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
import {changeStoreApplyChannel, getStoreDetail, getStoreList, storeProdBackSubmit} from '../../common/fetch.js';
import {getLocation} from '../../common/tool/location';
import {ls} from '../../common/tool.js'
import {mapGetters} from 'vuex'
import {error, toast} from '../../common';

export default {
	components: {
		popupLayer,
	},
	filters: {
		distanceFn: function (val) {
			if (val) {
				return parseInt(val * 100 / 1000) / 100
			}

			return val
		},
	},
	data() {
		return {
			pid: '',
			selectitem: 1,
			purchase_store_sn: '',
			provinceList: [],
			p_index: 0,
			c_index: 0,
			a_index: 0,
			p_clicked: false,
			c_clicked: false,
			a_clicked: false,
			stores: [],
			is_purchase: false, // 是否是退货页面过来的
			productMy: [], // 退货的产品列表,
			prod_json: {},
			is_stock_records: false, // 是否是进货记录过来的
			order_id: '', // 进货记录需要修改订单id
			is_getted: false, // 是否已经请求过店铺，
			allow_from_plat: 0, // 是否允许向平台进货、退货
			openCity: false,
			openArea: false,
		}
	},
	onLoad(options) {
		this.provinceList = this.objtoarr(area.area[0]['0']);
		if (options.page) {
			if (options.page == 'productmy') {
				this.is_purchase = true;
				this.productMy = ls.get('productMy');
				this.load();
				if (options.pid) {
					this.pid = options.pid
				}
			}
		}
		if (options.order_id) {
			// 进货记录过来
			this.is_stock_records = true;
			this.order_id = options.order_id;
		}
	},
	onShow() {
		this.get_store_detail();
	},
	computed: {
		...mapGetters(['Stores_ID']),
		channelName() {
			if (!this.is_purchase) {
				return this.selectitem == 1 ? '门店进货' : '平台进货'
			} else {
				return this.selectitem == 1 ? '门店退货' : '平台退货'
			}
		},
		p_id() {
			return this.provinceList[this.p_index] && this.provinceList[this.p_index].id
		},
		c_str() {
			return '0' + ',' + this.p_id
		},
		citylist() {
			let citys = area.area[0][this.c_str];
			return this.objtoarr(citys)
		},
		c_id() {
			return this.citylist[this.c_index] && this.citylist[this.c_index].id
		},
		a_str() {
			return this.c_str + ',' + this.c_id
		},
		arealist() {
			let areas = area.area[0][this.a_str]
			return this.objtoarr(areas)
		},
		a_id() {
			return this.arealist[this.a_index] && this.arealist[this.a_index].id
		},
	},
	methods: {
		load() {
			if (!this.is_purchase) return;
			let productMy = this.productMy;
			let arr = []; // 选中的产品数组
			let prod_json = {};
			productMy.forEach(item => {
				if (item.skuvaljosn) {
					for (let attr_id in item.skuvaljosn) {
						if (item.skuvaljosn[attr_id].myqty > 0) {
							arr.push(item.skuvaljosn[attr_id])
						}
					}
				} else if (item.myqty > 0) {
					arr.push(item)
				}
			})


			for (let i in arr) {
				if (!arr[i].Products_ID) {
					arr[i].Products_ID = arr[i].prod_id
				}
				if (prod_json[arr[i].Products_ID]) {
					prod_json[arr[i].Products_ID]['num'] = prod_json[arr[i].Products_ID]['num'] + arr[i].myqty
					if (prod_json[arr[i].Products_ID]['attr']) {
						prod_json[arr[i].Products_ID]['attr'][arr[i].Product_Attr_ID] = arr[i].myqty
					} else {
						if (arr[i].Product_Attr_ID) {
							prod_json[arr[i].Products_ID]['attr'] = {
								[arr[i].Product_Attr_ID]: arr[i].myqty,
							}
						}

					}
				} else {
					prod_json[arr[i].Products_ID] = {
						'num': arr[i].myqty,
					}
					if (prod_json[arr[i].Products_ID]['attr']) {
						prod_json[arr[i].Products_ID]['attr'][arr[i].Product_Attr_ID] = arr[i].myqty
					} else {
						if (arr[i].Product_Attr_ID) {
							prod_json[arr[i].Products_ID]['attr'] = {
								[arr[i].Product_Attr_ID]: arr[i].myqty,
							}
						}
					}
				}
			}
			this.prod_json = prod_json;


		},
		openAddress(store) {
			uni.openLocation({
				latitude: store.wx_lat,
				longitude: store.wx_lng,
				name: store.Stores_Name,
				success: function () {
				},
			});
		},
		get_store_detail() {
			getStoreDetail({store_id: this.Stores_ID}).then(res => {
				this.allow_from_plat = res.data.allow_from_plat;
			})
		},
		// 省份变动
		p_change_handle(e) {
			this.p_clicked = true;
			this.c_clicked = false;
			this.a_clicked = false;
			this.p_index = e.detail.value;
			this.openCity = true;
		},
		// 市变动
		c_change_handle(e) {
			this.c_clicked = true;
			this.a_clicked = false;
			this.c_index = e.detail.value;
			this.openArea = true;
		},
		a_change_handle(e) {
			this.a_clicked = true;
			this.a_index = e.detail.value;
		},
		objtoarr(obj) {
			let arr = [];
			for (let i in obj) {
				arr.push({id: i, name: obj[i]})
			}
			return arr
		},
		get_user_location() {
			let localInfo = null;
			let rt = false
			getLocation(this.pageEl).then(res => {
				if (res.code === 0) {
					localInfo = res.data
					// rt = true

					// if(!rt)return;
					this.lat = localInfo.latitude
					this.lng = localInfo.longitude
					this.getStoreList()

				}
			}).catch(err => {
				error('获取位置信息失败:' + err.msg)
			})


		},
		// 获取门店列表，
		getStoreList() {
			let postData = {
				pageSize: 10000,
				page: 1,
				stores_sn: this.purchase_store_sn,
				get_top: 1, // 只查询上级门店列表
				self_store_id: this.Stores_ID, // 只查询上级门店列表必传
				// search_stores_sn: this.search_stores_sn,
			}
			if (this.p_clicked) {
				// 选择省了
				postData.province = this.p_id;
			}
			if (this.c_clicked) {
				postData.city = this.c_id;
			}
			if (this.a_clicked) {
				postData.area = this.a_id;
			}

			if (this.lat && this.lng) {
				postData.lat = this.lat
				postData.lng = this.lng
			}
			getStoreList(postData, {tip: '搜索中', mask: true}).then(res => {
				this.is_getted = true;
				this.stores = res.data;
			})
		},
		goPurchase() {
			if (this.pid != 0) {
				//this.getStoreList();
				uni.showModal({
					content: '确定退货？',
					cancelText: '我再想想',
					confirmText: '我意已决',
					success: (res) => {
						if (res.confirm) {
							// 退货，并且是门店退货
							storeProdBackSubmit({
								store_id: this.Stores_ID,
								prod_json: JSON.stringify(this.prod_json),
								purchase_type: 'store',
								purchase_store_id: this.pid,
							}).then(res => {
								ls.remove('productMy');
								uni.showToast({
									title: res.msg,
								});
								setTimeout(() => {
									// 跳转选择渠道页面
									uni.redirectTo({
										url: '/pagesA/procurement/refundRecords',
									})
								}, 1000)
							})
						} else {
							return;
						}
					},
				})
				return;
			} else {
				if (this.is_purchase) {
					// 选择向平台退货
					uni.showModal({
						content: '确定退货？',
						cancelText: '我再想想',
						confirmText: '我意已决',
						success: (res) => {
							if (res.confirm) {
								// 退货，并且是门店退货
								storeProdBackSubmit({
									store_id: this.Stores_ID,
									prod_json: JSON.stringify(this.prod_json),
									purchase_type: 'shop',
								}).then(res => {
									ls.remove('productMy');
									uni.showToast({
										title: res.msg,
									});
									setTimeout(() => {
										// 跳转选择渠道页面
										uni.redirectTo({
											url: '/pagesA/procurement/refundRecords',
										})
									}, 1000)
								})
							} else {
								return;
							}
						},
					})
				} else if (this.is_stock_records) {
					let data = {
						store_id: this.Stores_ID,
						order_id: this.order_id,
						purchase_type: 'shop',
					}
					changeStoreApplyChannel(data).then(res => {
						uni.navigateBack({
							delta: 1,
						});
					}).catch(err => {
						toast(err.msg);
						return;
					})
				} else {
					uni.navigateTo({
						url: '/pagesA/procurement/stock',
					})
				}
			}

		},
		// 点击门店跳转去相应门店退货
		gostock(stores_sn, stores_id) {
			if (!this.is_purchase) {
				if (this.is_stock_records) {
					//	进货记录过来的，直接修改进货记录的渠道，完成了跳转回去
					let data = {
						store_id: this.Stores_ID,
						order_id: this.order_id,
						purchase_type: 'store',
						purchase_store_sn: stores_sn,
					}
					changeStoreApplyChannel(data).then(res => {
						uni.navigateBack({
							delta: 1,
						})
					}).catch(err => {
						toast(err.msg)
					})
				} else {
					//普通进货页面跳转过来的
					uni.navigateTo({
						url: '/pagesA/procurement/stock?purchase_store_sn=' + stores_sn + '&purchase_store_id=' + stores_id,
					})
				}
			} else {
				uni.showModal({
					content: '确定退货？',
					cancelText: '我再想想',
					confirmText: '我意已决',
					success: (res) => {
						if (res.confirm) {
							// 退货，并且是门店退货
							storeProdBackSubmit({
								store_id: this.Stores_ID,
								prod_json: JSON.stringify(this.prod_json),
								purchase_type: 'store',
								purchase_store_sn: stores_sn,
							}).then(res => {
								ls.remove('productMy');
								uni.showToast({
									title: res.msg,
								});
								setTimeout(() => {
									// 跳转选择渠道页面
									uni.redirectTo({
										url: '/pagesA/procurement/refundRecords',
									})
								}, 1000)
							})
						} else {
							return;
						}
					},
				})

			}
		},
		// 用户只是点击了遮罩
		maskClicked() {
			this.selectitem = this.selectitem;
		},
		changeChannel() {
			if (this.is_purchase) {
				return
			}
			if (!this.allow_from_plat) {
				return
			}
			this.$refs.searchLayer.show();
		},
		changeItem(num) {
			this.selectitem = num;
			this.$refs.searchLayer.close();
		},
		closePop() {

			// this.$refs.searchLayer.close();
		},
	},
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
						white-space: nowrap;
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

		.lists {
			.item {
				display: flex;
				align-items: center;

				.logo {
					height: 44px;
					width: 44px;
					border-radius: 50%;
					background-color: #f2f2f2;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;

				}

				.info {
					flex: 1;
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

		.label-title {
			padding: 34rpx 0;
			font-size: 14px;
			line-height: 14px;
			display: flex;
			align-items: center;

			.line {
				margin: 0px 10px;
				width: 2px;
				height: 14px;
				background: #F43131;
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
