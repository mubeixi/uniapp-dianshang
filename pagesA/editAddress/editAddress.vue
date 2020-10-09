<template>
	<view @click="commonClick" class="myall">
		<form @submit="formSubmit" report-submit="true">
			<view class='xinxi'>
				<text class="text">{{$t('942x0')}}</text>
				<input class="input" maxlength='50' name="Address_Name" :placeholder="$t('942x1')" type="text" v-model="address_info.Address_Name" />
			</view>
			<view class='xinxi'>
				<text class="text">{{$t('942x2')}}</text>
				<view class="input world_sms_choose">
					<picker v-if="world_sms_flag" @change="worldSmsChoose" :value="world_sms_code_idx" :range="world_sms_code_list"
					 range-key="choose_item">
						<view class="world_sms_choose_show">
							<view class="phone_code">{{world_sms_code_list[world_sms_code_idx].phone_code}}</view>
							<i class="funicon icon-xia world_sms_choose_icon"></i>
						</view>
					</picker>
					<text class="show_phone_code" v-else>{{address_info.phone_code?address_info.phone_code:'+86'}}</text>
					<input class="input_phone" maxlength="15" name="Address_Mobile" :placeholder="$t('942x3')" type="number" v-model="address_info.Address_Mobile"
					 :disabled="(!world_sms_flag && address_info.Address_ID > 0 && address_info.phone_code && address_info.phone_code !== '' && address_info.phone_code !== '+86') ? true : false" />
				</view>
			</view>
			<view class="xinxi country_address_switch" v-if="world_address_flag || address_info.country_status">
				<text class="text">{{$t('942x4')}}</text>
				<switch class="country_switch" :checked="!!address_info.country_status" :disabled="(!world_address_flag && address_info.Address_ID > 0) ? true : false"
				 @change="countryAddressSwitch" color="#04B600" />
			</view>
			<block v-if="address_info.country_status">
				<view class='xinxi'>
					<text class="text">{{$t('942x5')}}</text>
					<input :value="address_info.Address_Detailed" class="input" maxlength='250' name="Address_Detailed" :placeholder="$t('942x6')"
					 type="text" />
				</view>
			</block>
			<block v-else>
				<view class='dizhi'>
					<view class="section">
						<picker :range="change_objectMultiArray" :value="change_multiIndex" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange"
						 mode="multiSelector" range-key="name">
							<view class="picker">
								<view class="text">{{$t('942x7')}}</view>
								<view class="view" v-if="address_info.Address_Province <= 0">{{$t('942x8')}}</view>
								<view class="view" v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
								<view class="view" v-if="address_info.Address_City <= 0">{{$t('942x9')}}</view>
								<view class="view" v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
								<view class="view" v-if="address_info.Address_Area <= 0">{{$t('942x10')}}</view>
								<view class="view" v-else>{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
							</view>
						</picker>
					</view>
				</view>
				<view class="xiangzhen">
					<view class="section">
						<picker :range="t_arr" :value="t_index" @change="t_pickerChange" mode="selector" range-key="name">
							<view class="picker">
								<view class="text">{{$t('942x11')}}</view>
								<view class="view" v-if="address_info.Address_Town <= 0">{{$t('942x12')}}</view>
								<view class="view" v-else>{{t_arr[t_index]['name']}}</view>
							</view>
						</picker>
					</view>
				</view>
				<view class='xinxi'>
					<text class="text">{{$t('942x13')}}</text>
					<input :value="address_info.Address_Detailed" class="input" maxlength='30' name="Address_Detailed" :placeholder="$t('942x14')"
					 type="text" />
				</view>
			</block>

			<view class='xinxi set_default'>
				<checkbox-group name="Address_Is_Default">
					<label class="checkbox label">
						<checkbox :checked="address_info.Address_Is_Default == 1 || is_first_add" :disabled="is_first_add" class="checkbox"
						 value="1" />
						{{$t('942x15')}}
					</label>
				</checkbox-group>
			</view>

			<view class="xinxi err" v-if="!world_sms_flag && address_info.Address_ID > 0 && address_info.phone_code && address_info.phone_code !== '' && address_info.phone_code !== '+86'">
				{{$t('942d0')}}
			</view>
			<view class="xinxi err" v-if="!world_address_flag && address_info.Address_ID > 0 && address_info.country_status">
				{{$t('942x16')}}
			</view>

			<button class="tianjia-btn" formType="submit">{{$t('942x17')}}</button>
		</form>
	</view>
</template>

<script>
	import area from '../../common/area.js'
	import utils from '../../common/util.js'
	import {
		addAddress,
		editAddress,
		getAddress,
		getTown
	} from '../../common/fetch.js'
	import {
		pageMixin
	} from '../../common/mixin'
	import {
		checkMobile
	} from '../../common/tool'

	import T from '@/common/langue/i18n'
	export default {
		mixins: [pageMixin],
		data() {
			return {
				// 用于收货地址展示用
				objectMultiArray: [], // 展示数据
				multiIndex: [0, 0, 0], // 选择数据

				// 用于收货地址选择用
				change_objectMultiArray: [], // 选择数据
				change_multiIndex: [0, 0, 0], // 改变的收货地址对应列的下标

				// 地址数据
				address_info: {
					User_ID: 0,
					Address_ID: 0, // 地址id  编辑时有用
					Address_Name: '',
					phone_code: '',
					Address_Mobile: '',
					Address_Province: 0, // 为id
					Address_City: 0, // 为id
					Address_Area: 0, // 为id
					Address_Town: 0,
					Address_Detailed: '',
					Address_Is_Default: 0, // 是否为默认地址
					country_status: 0 // 是否是国际地址
				},
				// 街道信息
				t_arr: [],
				t_index: 0,
				is_first_add: false, // 是否为该用户要添加的第一条收货地址

				from_page: '', // 来源页面  checkout(需设置checkout页面的back_address_id)、addresslist(不需操作)

				// 国际短信
				world_sms_flag: 0,
				world_sms_code_list: [],
				world_sms_code_idx: 0,
				// 国际收货地址
				world_address_flag: 0
			}
		},
		methods: {
			// 处理省市区联动信息
			addressChange: function(columnValue) {
				var p_arr = this.change_objectMultiArray[0]
				var p_id = p_arr[columnValue[0]].id
				var c_arr = utils.array_change(area.area[0][0 + ',' + p_id])
				var c_id = c_arr[columnValue[1]].id
				var a_arr = utils.array_change(area.area[0][0 + ',' + p_id + ',' + c_id])
				this.change_objectMultiArray = [
					p_arr,
					c_arr,
					a_arr
				]
				this.change_multiIndex = columnValue
			},
			// 获取乡镇
			address_town: function() {
				if (this.address_info.Address_Area <= 0) {
					this.t_arr = []
					this.t_index = 0
					return
				}
				getTown({
					a_id: this.address_info.Address_Area
				}).then(res => {
					var t_arr = []
					var t_index = 0
					var idx = 0
					for (var i in res.data) {
						for (var j in res.data[i]) {
							t_arr.push({
								id: j,
								name: res.data[i][j]
							})
							if (j == this.address_info.Address_Town) {
								t_index = idx
							}
							idx++
						}
					}
					this.t_arr = t_arr
					this.t_index = t_index
				}).catch(() => {})
			},
			// 乡镇地址 点击确定
			t_pickerChange: function(e) {
				if (this.t_arr.length <= 0) return
				this.t_index = e.detail.value
				this.address_info.Address_Town = this.t_arr[e.detail.value].id
			},
			// 选择收获地址三级联动后确定按钮动作
			bindMultiPickerChange: function(e) {
				this.addressChange(e.detail.value)
				this.objectMultiArray = this.change_objectMultiArray
				this.multiIndex = e.detail.value
				this.address_info.Address_Province = this.objectMultiArray[0][this.multiIndex[0]].id
				this.address_info.Address_City = this.objectMultiArray[1][this.multiIndex[1]].id
				this.address_info.Address_Area = this.objectMultiArray[2][this.multiIndex[2]].id
				this.address_info.Address_Town = 0
				this.t_arr = []
				this.t_index = 0
				// 处理街道信息
				this.address_town()
			},

			// 选择收货地址
			bindMultiPickerColumnChange: function(e) {
				var column = e.detail.column // 修改的列
				var index = e.detail.value // 选择列的下标（从0开始）
				var change_multiIndex = 'change_multiIndex[' + column + ']'

				var columnValue = [
					column == 0 ? index : this.change_multiIndex[0],
					column == 0 ? 0 : (column == 1 ? index : this.change_multiIndex[1]),
					column == 0 || column == 1 ? 0 : index
				]
				this.addressChange(columnValue)
			},

			// 提交地址
			formSubmit: function(e) {
				var address_info = e.detail.value
				if (!address_info.Address_Name) {
					uni.showToast({
						title: T._('942d1'),
						icon: 'none'
					})
					return false
				} else {
					this.address_info.Address_Name = address_info.Address_Name
				}
				if (!address_info.Address_Mobile) {
					uni.showToast({
						title: T._('942d2'),
						icon: 'none'
					})
					return false
				} else if (!checkMobile(address_info.Address_Mobile, this.address_info.phone_code)) {
					uni.showModal({
						title: T._('942d3'),
						content: T._('942d4'),
						showCancel: false
					})
					return false
				} else {
					this.address_info.Address_Mobile = address_info.Address_Mobile
				}
				// 判断是否使用国际地址
				if (this.address_info.country_status == 0) {
					if (this.address_info.Address_Province <= 0 || this.address_info.Address_City <= 0 || this.address_info.Address_Area <=
						0) {
						uni.showToast({
							title: T._('942d5'),
							icon: 'none'
						})
						return false
					}
					// if (!this.address_info.Address_Town) {
					//       uni.showToast({
					//         title: '请选择街道',
					//         icon: 'none'
					//       });
					//       return false;
					// }
				}
				if (!address_info.Address_Detailed) {
					uni.showToast({
						title: T._('942d6'),
						icon: 'none'
					})
					return false
				} else {
					this.address_info.Address_Detailed = address_info.Address_Detailed
				}
				// 是否设置为默认地址
				this.address_info.Address_Is_Default = address_info.Address_Is_Default[0] ? 1 : 0

				// 提交
				if (this.address_info.Address_ID) {
					// 编辑
					var data = this.address_info
					editAddress(data, {
						is_tap: true
					}).then(res => {
						uni.showToast({
							title: res.msg
						})
						this.addeditAddress(res)
					}).catch(() => {})
				} else {
					// 添加
					var data = this.address_info
					data.act = 'add_address'
					delete data.Address_ID
					addAddress(data, {
						is_tap: true
					}).then(res => {
						uni.showToast({
							title: res.msg
						})
						this.addeditAddress(res)
					}).catch(() => {})
				}
			},

			// 添加、编辑收货地址回调
			addeditAddress: function(res) {
				var that = this
				// 返回来时页面
				uni.showToast({
					title: (that.address_info.Address_ID ? T._('942d7') : T._('942d8')),
					icon: 'success',
					duration: 2000,
					success: function() {
						if (that.address_info.Address_ID) { // 编辑
							// 跳回收货地址列表页面  不需操
						} else { // 添加
							// 从提交订单页来的，跳回提交订单页
							if (that.from_page == 'checkout') {
								if (typeof res.data.send_flag !== 'undefined' && res.data.Address_ID) {
									// 判断添加的收货地址是否是在配送范围内
									if (res.data.send_flag == 1) {
										var pages = getCurrentPages() // 获取页面堆栈
										var prevPage = pages[pages.length - 2] // 上一页
										prevPage.back_address_id = res.data.Address_ID
									} else {
										uni.showModal({
											title: T._('942d9'),
											content: T._('942d10'),
											confirmText: T._('942d11'),
											success: function(res) {
												if (res.confirm) {
													that.is_first_add = false
												} else if (res.cancel) {
													uni.redirectTo({
														url: '/pages/addresslist/addresslist?from=' + that.from_page
													})
												}
											}
										})
										return
									}
								}
							}
						}
						// 返回上一页
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					}
				})
			},

			// 编辑地址时，获取地址信息的回调，初始化地址信息
			setAddressInfo: function(res) {
				var addressInfo = res.data[0]
				delete addressInfo.Address_Province_name
				delete addressInfo.Address_Province_code
				delete addressInfo.Address_City_name
				delete addressInfo.Address_City_code
				delete addressInfo.Address_Area_name
				delete addressInfo.Address_Area_code
				delete addressInfo.Address_Town_name
				delete addressInfo.Address_Town_code

				// 初始化地址选择数据
				const objectMultiArray = [
					utils.array_change(area.area[0]['0']),
					utils.array_change(area.area[0]['0,' + addressInfo.Address_Province]),
					utils.array_change(area.area[0]['0,' + addressInfo.Address_Province + ',' + addressInfo.Address_City])
				]
				// 设置初始显示列
				const multiIndex = addressInfo.country_status == 1 ? [0, 0, 0] : [
					utils.get_arr_index(objectMultiArray[0], addressInfo.Address_Province),
					utils.get_arr_index(objectMultiArray[1], addressInfo.Address_City),
					utils.get_arr_index(objectMultiArray[2], addressInfo.Address_Area)
				]
				this.address_info = addressInfo
				this.objectMultiArray = objectMultiArray
				this.change_objectMultiArray = objectMultiArray
				this.multiIndex = multiIndex
				this.change_multiIndex = multiIndex
				// 判断国际区号选择的下标
				for (const idx in this.world_sms_code_list) {
					const code_info = this.world_sms_code_list[idx]
					if (code_info.phone_code == addressInfo.phone_code) {
						this.world_sms_code_idx = idx
					}
				}
				// 处理街道信息
				this.address_town()
			},

			// 页面加载
			async load() {
				const initData = await this.getInitData(1)
				// 国际短信
				this.world_sms_flag = initData.world_sms_flag || 0
				this.world_sms_code_list = initData.world_sms_code_list || []
				// 国际收货地址
				this.world_address_flag = initData.world_address_flag || 0

				// 如果有Address_ID， 则为编辑
				if (this.address_info.Address_ID) {
					await getAddress({
						Address_ID: this.address_info.Address_ID,
						operate: 1
					}).then(res => {
						this.setAddressInfo(res)
					}).catch(() => {})
				} else { // 添加收货地址  初始化地址选择数据
					// 地区数据处理
					this.objectMultiArray = [
						utils.array_change(area.area[0]['0']),
						utils.array_change(area.area[0]['0,1']),
						utils.array_change(area.area[0]['0,1,35'])
					]
					this.change_objectMultiArray = [
						utils.array_change(area.area[0]['0']),
						utils.array_change(area.area[0]['0,1']),
						utils.array_change(area.area[0]['0,1,35'])
					]
					this.t_arr = []
					this.c_t_arr = []
					// 查询是否是该用户要添加的第一条收货地址
					await getAddress({}).then(res => {
						// 设是否为第一条收获地址状态
						if ((res.data.length <= 0)) {
							this.is_first_add = true
						}
					}).catch((e) => {
						if (e.errMsg === 2) {
							this.is_first_add = true
						}
					})
				}
			},
			worldSmsChoose(e) {
				this.world_sms_code_idx = e.detail.value
				this.address_info.phone_code = this.world_sms_code_list[this.world_sms_code_idx].phone_code
			},
			countryAddressSwitch(e) {
				const val = e.detail.value
				this.address_info.country_status = val ? 1 : 0
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// 设置标题
			uni.setNavigationBarTitle({
				title: options.addressid ? '编辑收货地址' : '新增收货地址'
			})

			// 有addressid 地址编辑
			if (options.addressid) {
				this.address_info.Address_ID = options.addressid
			}
			// 页面来源
			if (options.from) {
				this.from_page = options.from
			}

			this.load()
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {

		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {

		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {

		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {

		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {

		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {

		}
	}
</script>

<style lang="scss" scoped>
	.myall {
		background-color: #FFFFFF !important;
		min-height: 100vh;
	}

	div,
	view {
		box-sizing: content-box;
	}

	.xinxi {
		width: 710rpx;
		padding: 0 20rpx;
		border-bottom: 1px #f4f4f4 solid;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.xinxi .text {
		float: left;
		min-width: 140rpx;
		font-size: 28rpx;
		line-height: 90rpx;
	}

	.xinxi .input {
		width: 570rpx;
		float: left;
		font-size: 28rpx;
		line-height: 90rpx;
		height: 90rpx;
	}

	.tianjia-btn {
		width: 710rpx;
		margin: 50rpx 20rpx 20rpx;
		color: #fff;
		background: #F43131;
		border-radius: 8rpx;
	}

	.dizhi {
		width: 710rpx;
		padding: 0 20rpx;
		border-bottom: 1px #f4f4f4 solid;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.dizhi,
	.xiangzhen {
		width: 710rpx;
		padding: 0 20rpx;
		border-bottom: 1px #f4f4f4 solid;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.xiangzhen .text {
		min-width: 140rpx;
		font-size: 28rpx;
		line-height: 90rpx;
	}

	.dizhi .text {
		min-width: 140rpx;
		font-size: 28rpx;
		line-height: 90rpx;
	}

	.dizhi .input {
		width: 180rpx;
		font-size: 28rpx;
		line-height: 90rpx;
		height: 90rpx;
		margin-right: 10rpx;
	}

	.picker .view {
		width: 180rpx;
		float: left;
		font-size: 28rpx;
		line-height: 90rpx;
		height: 90rpx;
		margin-right: 10rpx;
	}

	.set_default {
		border-bottom: none;
	}

	.set_default .label {
		font-size: 28rpx;
	}

	.set_default .label .checkbox {
		transform: scale(.7);
		position: relative;
		top: -2px;
	}

	.country_address_switch {
		.text {
			width: auto !important;
		}

		.country_switch {
			transform: scale(0.7);
			margin-top: 10rpx;
			float: right;
		}
	}

	.world_sms_choose {
		display: flex;
		align-items: center;

		.world_sms_choose_show {
			color: $mainColor;
			display: flex;
			align-items: center;

			.world_sms_choose_icon {
				margin-left: 10rpx;
				margin-right: 10rpx;
			}
		}

		.show_phone_code {
			color: $mainColor;
			margin-right: 10rpx;
			margin-top: 2rpx;
		}

		.input_phone {
			width: 100%;
			font-size: 28rpx;
		}
	}

	.err {
		color: #FA6B27;
		font-size: 24rpx;
		border-bottom: 0;
	}
</style>
