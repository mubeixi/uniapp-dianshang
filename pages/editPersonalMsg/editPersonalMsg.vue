<template>
	<view class="bgColor-white">
		
		<!-- 	<page-title :title="title" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->

		<input v-if="type == 0" type="text" v-model="User_Name" class="v_input" placeholder="修改用户名" />
		<input v-if="type == 1" type="text" v-model="User_NickName" class="v_input" placeholder="修改昵称" />
		<input v-if="type == 3" type="text" v-model="User_Email" class="v_input" placeholder="修改邮箱" />
		<block v-if="type == 4">
			<view class="area-item">
				<text class="area-label">请选择省市县</text>
				<picker mode="multiSelector" style="flex:1;" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="change_multiIndex" :range="change_objectMultiArray" range-key="name">
					<view class="picker">
						<view class="p_item" v-if="!address_info.Address_Province">选择省份</view>
						<view class="p_item" v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
						<view class="p_item" v-if="!address_info.Address_City">选择城市</view>
						<view class="p_item" v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
						<view class="p_item" v-if="!address_info.Address_Area">选择地区</view>
						<view class="p_item" v-else>{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
					</view>
				</picker>
			</view>
			<view class="area-item">
				<text  class="area-label">请选择街道</text>
				<picker mode="selector" @change="t_pickerChange" :range="t_arr" range-key="name" :value="t_index">
				<view class="picker">
					<view class="p_item" v-if="!address_info.Address_Town">选择街道</view>
					<view class="p_item" v-else>{{t_arr[t_index]['name']}}</view>
				</view>
				</picker>
			</view>
			<view class="area-item">
				<text class="area-label">详细地址</text>
				<input type="text" v-model="User_Address" placeholder="请输入详细地址" />
			</view>
		</block>
		<view class="save" @click="save">保存</view>
	</view>
</template>

<script>
	import area from '../../common/area.js';
	import utils from '../../common/util.js';
	import {upDateUserInfo,getTown} from '../../common/fetch.js';
	import {ls} from "../../common/tool.js";
	import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
				type: 0,
				title: '',
				User_Name: '',
				User_NickName: '',
				User_QQ: '',
				User_Email: '',
				User_Province: '',
				User_City: '',
				User_Area: '',
				User_Tow: '',
				User_Address: '',
				
				objectMultiArray: [],   //展示数据
				multiIndex: [0, 0, 0],  //选择数据
								
				//用于收货地址选择用
				change_objectMultiArray: [],  //选择数据
				change_multiIndex: [0, 0, 0], //改变的收货地址对应列的下标
				t_arr: [],
				t_index: 0,
				address_info: {}
			}
		},
		computed: {
			...mapGetters(['userInfo']),
		},
		methods: {
			...mapActions(['setUserInfo']),
			getTitle(){
				switch (this.type) {
					case '0' : this.title = '修改姓名';break;
					case '1' : this.title = '修改昵称';break;
					case '3' : this.title = '修改邮箱';break;
					case '4' : this.title = '修改地址';break;
				};
				uni.setNavigationBarTitle({
					title: this.title
				})
			},
			save(){
				if(this.type == 4){
					if(!this.address_info.Address_Province || !this.address_info.Address_City || !this.address_info.Address_Area|| !this.address_info.Address_Town) {
						uni.showToast({
							title: '请选择完整地址',
							icon: 'none'
						});
						return ;
					}else if(this.User_Address == '') {
						uni.showToast({
							title: '请填写详细信息',
							icon: 'none'
						});
						return;
					}					
				}
				upDateUserInfo({
					User_Name: this.User_Name,
					User_NickName: this.User_NickName,
					User_Email: this.User_Email,
					User_Province: this.address_info.Address_Province,
					User_City: this.address_info.Address_City,
					User_Area: this.address_info.Address_Area,
					User_Tow: this.address_info.Address_Town,
					User_Address: this.User_Address
				}).then(res=>{
					console.log(res)
					if(res.errorCode == 0) {
						let userInfo = this.userInfo;
						userInfo.User_Name = res.data.User_Name;
						userInfo.User_NickName = res.data.User_NickName;
						userInfo.User_Email = res.data.User_Email;
						this.setUserInfo(userInfo);
						uni.showToast({
							title: '修改成功'
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})							
						}, 1500);
					}
				})
			},
			//处理省市区联动信息
			  addressChange: function (columnValue) {
					var p_arr = this.change_objectMultiArray[0];
					var p_id = p_arr[columnValue[0]]['id'];
					var c_arr = utils.array_change(area.area[0][0 + ',' + p_id]);
					var c_id = c_arr[columnValue[1]]['id'];
					var a_arr = utils.array_change(area.area[0][0 + ',' + p_id + ',' + c_id]);
					this.change_objectMultiArray = [
						p_arr,
						c_arr,
						a_arr
						];
					this.change_multiIndex = columnValue;
			  },
			  // 获取乡镇
			address_town: function () {
			    getTown({'a_id': this.address_info.Address_Area }).then(res => {
			      if (res.errorCode == 0) {
			            var t_arr = [];
			            var t_index = 0;
			            var idx = 0;
			            for (var i in res.data) {
			               for (var j in res.data[i]) {
			                t_arr.push({ 'id': j, 'name': res.data[i][j] });
			                if (j == this.address_info.Address_Town) {
			                    t_index = idx;
			                }
			                  idx++;
			                }
			              }
			            this.t_arr = t_arr;
			            this.t_index = t_index;
			        }
				})
			},
			  // 乡镇地址 点击确定
			  t_pickerChange: function (e) {
			    this.t_index = e.detail.value;
			    this.address_info.Address_Town = this.t_arr[e.detail.value]['id'];
			  },
			  //选择收获地址三级联动后确定按钮动作
			  bindMultiPickerChange: function (e) {
					this.addressChange(e.detail.value);
					this.objectMultiArray = this.change_objectMultiArray;
					this.multiIndex = e.detail.value;
					this.address_info.Address_Province = this.objectMultiArray[0][this.multiIndex[0]]['id'];
					this.address_info.Address_City = this.objectMultiArray[1][this.multiIndex[1]]['id'];
					this.address_info.Address_Area = this.objectMultiArray[2][this.multiIndex[2]]['id'];
					this.address_info.Address_Town = 0;
					this.t_arr = [];
					this.t_index = 0;
					// 处理街道信息
					this.address_town();
			  },
			
			  //选择收货地址
			  bindMultiPickerColumnChange: function (e) {
					var column = e.detail.column;  //修改的列
					var index = e.detail.value;    //选择列的下标（从0开始）
					var change_multiIndex = 'change_multiIndex[' + column + ']';
			
					var columnValue = [
						column == 0 ? index : this.change_multiIndex[0],
						column == 0 ? 0 : (column == 1 ? index : this.change_multiIndex[1]),
						column == 0 || column == 1 ? 0 : index
					];
					this.addressChange(columnValue);
			  },
		},
		onShow(){
			this.objectMultiArray = [
			  utils.array_change(area.area[0]['0']),
			  utils.array_change(area.area[0]['0,1']),
			  utils.array_change(area.area[0]['0,1,35'])
			];
			this.change_objectMultiArray = [
			  utils.array_change(area.area[0]['0']),
			  utils.array_change(area.area[0]['0,1']),
			  utils.array_change(area.area[0]['0,1,35'])
			],
			this.t_arr = [];
			this.c_t_arr = [];
		},
		onLoad(option) {
			if(option.type) {
				this.type = option.type;
				this.getTitle();
			}else {
				uni.navigateBack({
					delta: 1
				})
			}		
		},
		
		
	}
</script>

<style scoped lang="scss">
	.bgColor-white{
		height: 100vh;
		padding-top: 20px;
	}
	.v_input {
		border: 1px solid #efefef;
		width: 90%;
		margin: 0 auto;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
	.save {
		height: 80rpx;
		width: 90%;
		line-height: 80rpx;
		color: #fff;
		background: #F43131;
		margin: 40rpx auto;
		text-align: center;
		border-radius: 10rpx;
	}
	.area-item {
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		border-bottom: 1px solid #e3e3e3;
		font-size: 28rpx;
		.area-label {
			display: inline-block;
			width: 180rpx;
			margin-right: 10rpx;
		}
	}
	.picker {
		display: flex;
		.p_item {
			flex: 1;
			text-align: center;
		}
	}
</style>
