<template>
	<div @click="commonClick" class="wrap">
		<div class="navs">
			<div :class="tabidx===0?'active':''" @click="changIndex(0)" class="nav-item">全部</div>
			<div :class="tabidx===1?'active':''" @click="changIndex(1)" class="nav-item">待处理</div>

			<div :class="tabidx===2?'active':''" @click="changIndex(2)" class="nav-item">已驳回</div>
			<div :class="tabidx===3?'active':''" @click="changIndex(3)" class="nav-item">已出库</div>
			<div :class="tabidx===4?'active':''" @click="changIndex(4)" class="nav-item">已完成</div>
			<div :class="tabidx===5?'active':''" @click="changIndex(5)" class="nav-item">已撤回</div>
		</div>
		<view class="space-box">
		</view>
		<div class="container">
			<div class="lists">
				<block v-if="applys.length>0">
					<div :key="idx1" @click="hidden_tip(idx1)" class="item" v-for="(apply,idx1) in applys">
						<div class="head">
							<div class="status flex flex-between ">
								<div class="order-no">订单号: {{apply.Order_ID}}</div>
								<!--                            <image class="icon-delete"  @click="delApply(apply,idx1)" v-if="inArray(apply.Order_Status,[21,23,25])" src="/static/store/icon-del.png"></image>-->
							</div>
							<div class="info flex flex-between">
								<div class="flex1 flex store-info">
									<div :style="{backgroundImage:'url('+apply.Stores_ImgPath+')'}" class="store-pic"></div>
									<div class="store-title">{{apply.Stores_Name}}</div>
									<div class="action">
										<span @click="showStore(apply.Order_Store)" class="action-item">查看信息</span>
									</div>
								</div>
								<span class="status-text">{{apply.Order_Status_desc}}</span>
							</div>
						</div>
						<block v-if="apply && apply.prod_list">
							<div class="goods-list">
								<div class="goods" v-for="(item,idx2) in apply.prod_list">
									<div :style="{backgroundImage:'url('+item.prod_img+')'}" class="l"></div>
									<div class="c">
										<div class="title line10">{{item.prod_name}}</div>
										<div class="line10 flex flex-between graytext font14 flex-vertical-center">
											<div class="spec-key">{{item.attr_info.attr_name||'无规格'}}</div>
											<div class="numbox font16"><span class="font14">x</span>{{item.prod_count}}
												<image @click.stop="show_pro_tip(apply,idx2)" class="qty-icon" mode=""
												       src="/static/procurement/i.png" v-if="item.prod_count_change_desc"></image>
												<view class="tips" v-if="item.pro_tip_show">
													<view class="sanjiaoxing"></view>
													{{item.prod_count_change_desc}}
												</view>
											</div>
										</div>
										<div class="font14 flex flex-between flex-vertical-center">
											<span class="danger-color">￥<span class="price-num font16">{{item.prod_price}}</span></span>
											<view class="sku-item" v-if="apply.Order_Status == 21">
												<view @click="minus(idx1,idx2,item,apply.Order_ID)" class="handle">-</view>
												<view class="pro-num">{{item.prod_count}}
												</view>
												<view @click="plus(idx2,apply.Order_ID)" class="handle graytext">+</view>
											</view>
										</div>
									</div>
								</div>
							</div>
						</block>
						<div class="price-box">
							总计:<span class="danger-color">￥<span class="total_num font16">{{apply.Order_TotalPrice}}</span></span>
						</div>
						<div class="actions text-center">
							<block v-if="inArray(apply.Order_Status,[21])">
								<button @click="openRefuseDialog(apply,idx1)" class="acion-btn" size="mini" type="warn">驳回</button>
								<button @click="handleApply(apply,idx1)" class="acion-btn" size="mini">出库</button>
							</block>
						</div>
					</div>
				</block>
				<div class="defaults" v-else>
					<image :src="'/static/client/defaultImg.png'|domain"></image>
				</div>
			</div>

		</div>

		<wzw-dialog ref="storeInfo">
			<div class="storeInfoDialog">
				<div class="title text-center line15 font16">门店信息</div>
				<div class="row">
					<div class="label">门店名称:</div>
					<div class="text">{{storeInfo.Stores_Name}}</div>
				</div>
				<div class="row">
					<div class="label">门店电话:</div>
					<div class="text">{{storeInfo.Stores_Telephone}}</div>
				</div>
				<div class="row">
					<div class="label">门店地址:</div>
					<div @click="showAdress" class="text">
						{{storeInfo.Stores_Province_name}}{{storeInfo.Stores_City_name}}{{storeInfo.Stores_Area_name}}{{storeInfo.Stores_Address}}
						<image class="img" src="/static/local.png"
						       style="width: 26rpx;height: 31rpx;margin-left: 5px;vertical-align: top;"></image>
					</div>
				</div>
				<view @click="showAdress" class="row" v-if="storeInfo.distance">
					<view class="label">门店距离：</view>
					<view class="text">{{storeInfo.distance}}KM</view>
				</view>
			</div>
		</wzw-dialog>

		<wzw-dialog ref="refuseApply">
			<div class="refuseApplyDialog">
				<textarea :value="reason" @input="bingReasonInput" auto-height class="reason"
				          placeholder="请输入驳回原因" placeholder-style="color:#999" />
				<div class="control">
					<div @click="cancelRefuseApply" class="action-btn btn-cancel">取消</div>
					<div @click="refuseApply" class="btn-sub action-btn">确定</div>
				</div>

			</div>
		</wzw-dialog>

	</div>
</template>

<script>
import {pageMixin} from '../../common/mixin';
import {mapGetters} from 'vuex';
import {
	getStoreDetail,
	getStorePurchaseSales,
	refuseStorePurchaseApply,
	subStorePurchaseApply,
} from '../../common/fetch';
import {error} from '../../common';
import {findArrayIdx} from '../../common/tool';
import {getLocation} from '../../common/tool/location';

export default {
	mixins: [pageMixin],
	name: 'storeWholesale',
	data() {
		return {
			applys: [],
			stores: [],
			storeInfo: {},
			tabidx: 0,
			activeApply: null,
			order_status_arr: [null, 21, 22, 23, 24, 25],
			order_status: null,
			reason: '',
			paginate: {
				page: 1,
				finish: false,
				pageSize: 20,
				totalCount: 0,
			},
		}
	},
	computed: {
		...mapGetters(['Stores_ID']),
	},
	onShow() {
		this.paginate.finish = false
		this.paginate.page = 1
		this.loadInfo()
	},
	methods: {
		show_pro_tip(apply, index) {
			// apply.order_tip_show = true;
			apply.prod_list[index].pro_tip_show = true;
		},
		hidden_tip() {
			this.applys = this.applys;
			this.applys.map(item => {
				item.prod_list.forEach(goods => {
					goods.pro_tip_show = false;
				})
			})
		},
		// 减少数量
		minus(idx1, idx2, it, order_id) {
			uni.showModal({
				content: '修改后差价将直接返还给门店，不能再增加数量，确定修改吗？',
				success: (res) => {
					if (res.confirm) {
						it.prod_count--;
						let that = this
						let data = {
							receive_id: that.Stores_ID,
							order_id: order_id,
						}
						let prod_json = {};
						let prod_list = that.applys[idx1].prod_list;
						prod_list.forEach(item => {
							if (prod_json[item.prod_id]) {
								prod_json[item.prod_id][item.attr_id] = item.prod_count
							} else {
								prod_json[item.prod_id] = {
									[item.attr_id]: item.prod_count,
								}
							}
						})
						data.prod_json = JSON.stringify(prod_json);

						subStorePurchaseApply(data).then(res => {
							uni.showToast({
								title: res.msg,
								icon: 'none',
							})
							setTimeout(function () {
								that.loadInfo();
							}, 1000)
						}, err => {
							uni.showToast({
								title: err.msg,
								icon: 'none',
							})
							it.prod_count++;
						})
					} else {
						return;
					}
				},
			})
		},
		// 只能减少不能增加
		plus() {
			return;
		},
		showAdress() {
			uni.openLocation({
				latitude: this.storeInfo.wx_lat,
				longitude: this.storeInfo.wx_lng,
				success: function () {
				},
			});
		},
		showAdress() {
			uni.openLocation({
				latitude: this.storeInfo.wx_lat,
				longitude: this.storeInfo.wx_lng,
				success: function (res) {
				},
				fail: function (err) {
				},
			});
		},
		handleApply(apply, idx) {
			uni.navigateTo({
				url: `/pagesA/procurement/storeWholesaleSend?apply_id=${apply.Order_ID}`,
			})
		},
		cancelRefuseApply() {
			this.$refs.refuseApply.close()
		},
		openRefuseDialog(apply) {
			this.activeApply = apply
			this.$refs.refuseApply.show()
		},
		refuseApply() {

			if (!this.reason) {
				error('请填写理由')
				return;
			}
			refuseStorePurchaseApply({
				order_id: this.activeApply.Order_ID,
				reason: this.reason,
				store_id: this.Stores_ID,
			}, {tip: '处理中'}).then(res => {
				this.$refs.refuseApply.close()

				this.reason = ''
				this.activeApply.Order_Status = 23
				this.activeApply.Order_Status_desc = '已驳回'
				this.activeApply = null
				uni.showToast({
					title: res.msg,
				})
			}, err => {
			})
		},
		bingReasonInput(e) {
			this.reason = e.detail.value
		},
		showStore(store_id) {
			let idx = findArrayIdx(this.stores, {Stores_ID: store_id})

			let lat = '';
			let lng = '';
			getLocation(this).then(res => {
				if (res.code === 0) {
					lng = res.data.longitude
					lat = res.data.latitude
					let data = {
						lat: lat,
						lng: lng,
						store_id: store_id,
					}
					getStoreDetail(data, {tip: '加载中'}).then(res => {
						this.storeInfo = res.data
						this.storeInfo.distance = (res.data.distance / 1000).toFixed(2)
					})
					this.$refs.storeInfo.show()
				}
			}).catch(err => {
				let data = {
					store_id: store_id,
				}
				getStoreDetail(data).then(res => {
					this.storeInfo = res.data
				})
				this.$refs.storeInfo.show()
			})

			// if(idx!==false){
			//     this.storeInfo = this.stores[idx]
			//     this.$refs.storeInfo.show()
			// }else{
			//     error('店铺信息错误')
			// }
		},
		changIndex(idx) {
			if (idx == this.tabidx) return
			this.tabidx = idx
			this.paginate.page = 1
			this.paginate.finish = false

			this.order_status = this.order_status_arr[idx]
			this.loadInfo()
		},
		inArray(val, arr) {
			return arr.indexOf(val) != -1
		},
		async loadInfo() {

			if (this.paginate.finish) return;
			let data = {
				...this.paginate,
				store_id: this.Stores_ID,
			}
			if (this.order_status) {
				data.order_status = this.order_status
			}

			await getStorePurchaseSales(data, {tip: '加载中'}).then(res => {

				this.paginate.totalCount = res.totalCount
				let rt = res.data.map(item => {

					for (var goods of item.prod_list) {
						if (goods.attr_info) {
							goods.attr_info = JSON.parse(goods.attr_info)
						}
						goods.pro_tip_show = false;
					}
					return {...item}
				})

				if (this.paginate.page === 1) {
					this.applys = rt
				} else {
					this.applys = this.applys.concat(rt)
				}

				//长度为0停止了
				if (res.data.length === 0) {
					this.paginate.finish = true
					return;
				}
				this.applys = this.applys;
				this.paginate.page++
			}, err => {

			})

		},
	},
	onReachBottom() {
		this.loadInfo()
	},
	created() {


		// getStoreList({pageSize:999}).then(res=>{
		//     this.stores = res.data
		// })
	},
}
</script>

<style lang="scss" scoped>
	.navs {
		z-index: 2;
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 80rpx;
		line-height: 80rpx;
		//background: #fff;
		background-color: #F8F8F8;
		font-size: 14px;
		padding: 0 10px;

		.nav-item {
			flex: 1;
			/*box-sizing: border-box;*/
			text-align: center;
			/*position: relative;*/
			color: #333;
		}

		.nav-item.active {
			color: $wzw-primary-color;
			border-bottom: 2px solid $wzw-primary-color;
		}
	}

	.space-box {
		height: 50px;
		width: 100%;
		// background: white;
	}

	.lists {
		.item {
			margin: 10px 15px 10px;
			background: white;
			border-radius: 10px;
			overflow: hidden;

			.head {

				.info {
					padding: 10px;
					align-items: center;
					font-size: 14px;

					.store-info {
						align-items: center;
					}

					.store-pic {
						width: 25px;
						height: 25px;
						border-radius: 50%;
						background-size: cover;
						background-repeat: no-repeat;
						background-position: center;
						margin-right: 10px;
					}

					.store-title {
						margin-right: 10px;
						color: #333;
					}

					.action {
						color: $wzw-primary-color;

						.action-item {
							text-decoration: underline;
							cursor: pointer;
						}
					}

					.order_no {
						margin-left: 30px;
						color: #666;
					}
				}

				.status {
					font-size: 12px;
					border-bottom: 1px solid #E6E6E6;
					padding: 10px;
					align-items: center;

					.icon-delete {
						width: 14px;
						height: 14px;
					}

					.el-icon-delete-solid {
						cursor: pointer;
						color: #999;

						&:hover {
							color: #F43131;
						}
					}
				}
			}

			.goods-list {
				border-bottom: 1px solid #EDEDED;

				.goods {
					display: flex;
					align-items: center;
					padding: 10px;

					.l {
						width: 100px;
						height: 100px;
						background-size: cover;
						background-repeat: no-repeat;
						background-color: #f2f2f2;
						background-position: center;
					}

					.c {
						flex: 1;
						padding: 0 0 0 10px;

						.title {
							font-size: 14px;
							height: 40px;
							line-height: 20px;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						.spec-key {
							background: #FFF5F5;
							font-size: 12px;
							padding: 6px 10px;
							color: #666666;
						}

						.numbox {
							position: relative;
							color: #333333;

							.tips {
								position: absolute;
								top: 50rpx;
								right: -12rpx;
								width: 200rpx;
								padding: 20rpx;
								background: #fff;
								z-index: 1000;
								box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);

								.sanjiaoxing {
									position: absolute;
									top: -14rpx;
									right: 30rpx;
									background-color: #fff;
									transform: rotate(70deg);
									width: 15rpx;
									height: 30rpx;
									border: 2rpx solid #fff;
									border-right: 0;
									border-bottom: 0;
									box-shadow: 0px 0px 16px 0px rgba(4, 0, 0, 0.18);
								}
							}

							.qty-icon {
								width: 22rpx;
								height: 22rpx;
								margin-left: 10rpx;
							}
						}
					}

				}


			}

			.price-box {
				text-align: right;
				padding: 10px;
				font-size: 14px;
			}

			.actions {
				text-align: right;
				padding: 0 10px;

				.acion-btn {
					margin-bottom: 10px;
					margin-left: 10px;
					width: 156rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
				}


			}

		}
	}

	.storeInfoDialog {
		width: 560rpx;
		box-sizing: border-box;
		padding: 10px;
		font-size: 14px;

		.row {
			display: flex;
			margin-bottom: 8px;

			.label {
				color: #999;
				width: 70px;
			}

			.text {
				flex: 1;
				color: #444;
			}
		}
	}

	.refuseApplyDialog {
		width: 560rpx;
		box-sizing: border-box;
		padding: 15px;
		font-size: 14px;

		.reason {
			font-size: 14px;
			min-height: 200px;
			border: 1px solid #E3E3E3;
			line-height: 1.4;
			height: auto;
			width: auto;
			padding: 10px;
		}

		.control {
			margin-top: 15px;
			display: flex;
			justify-content: center;

			.action-btn {
				width: 70px;
				height: 36px;
				line-height: 36px;
				font-size: 14px;
				text-align: center;
				color: #666;
				background: #e9e9e9;

				&.btn-sub {
					background: $wzw-primary-color;
					color: white;
					margin-left: 10px;
				}
			}
		}
	}

	.sku-item {
		display: flex;
		align-items: center;
		color: #666;
		/*flex: 1;*/
		.img {
			width: 27rpx;
			height: 32rpx;
		}

		.sku {
			width: 80rpx;
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
			background-color: $wzw-primary-color;
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
			position: relative;

		}
	}

	.defaults {
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
</style>
