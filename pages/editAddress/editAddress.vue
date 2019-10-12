<template>
	<view>
		<form @submit="formSubmit">
		  <view class='xinxi'>
			<text>收货人</text>
			<input type="text" name="Address_Name" v-model="address_info.Address_Name" maxlength='20' placeholder="请输入收货人姓名" />
		  </view>
		  <view class='xinxi'>
			<text>联系电话</text>
			<input type="number" name="Address_Mobile" v-model="address_info.Address_Mobile" maxlength="11" placeholder="请输入联系电话" />
		  </view>
		  <view class='dizhi'>
			<view class="section">
			  <picker mode="multiSelector"  @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="change_multiIndex" :range="change_objectMultiArray" range-key="name">
				<view class="picker">
				  <text>收货地址</text>
				  <view v-if="!address_info.Address_Province">选择省份</view>
				  <view v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
				  <view v-if="!address_info.Address_City">选择城市</view>
				  <view v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
				  <view v-if="!address_info.Address_Area">选择地区</view>
				  <view v-else>{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
				</view>
			  </picker>
			</view>
		  </view>
		<view class="xiangzhen">
			<view class="section">
			  <picker mode="selector" @change="t_pickerChange" :range="t_arr" range-key="name" :value="t_index">
				<view class="picker">
				  <text style="">街道地址</text>
				  <view v-if="!address_info.Address_Town">选择街道</view>
				  <view v-else>{{t_arr[t_index]['name']}}</view>
				</view>
			  </picker>
			</view>
		 </view>
		  <view class='xinxi'>
			<text>详细地址</text>
			<input type="text" name="Address_Detailed" :value="address_info.Address_Detailed" maxlength='30' placeholder="请输入详细地址" />
		  </view>
		
		  <view class='xinxi set_default'>
			<checkbox-group name="Address_Is_Default">
			  <label class="checkbox">
				<checkbox value="1" :checked="address_info.Address_Is_Default == 1 || is_first_add" :disabled="is_first_add" />设置默认地址
			  </label>
			</checkbox-group>
		  </view>
		
		  <button class="tianjia-btn" formType="submit">确定</button>
		</form>
	</view>
</template>

<script>
	import area from '../../common/area.js';
	import utils from '../../common/util.js';
	import {getAddress,getTown,editAddress,addAddress} from '../../common/fetch.js';
	export default {
		data() {
			return {
				//用于收货地址展示用
				    objectMultiArray: [],   //展示数据
				    multiIndex: [0, 0, 0],  //选择数据
				
				    //用于收货地址选择用
				    change_objectMultiArray: [],  //选择数据
				    change_multiIndex: [0, 0, 0], //改变的收货地址对应列的下标
				
				    //地址数据
				    address_info: {
				      User_ID: 0,
				      Address_ID: 0,  //地址id  编辑时有用
				      Address_Name: '',
				      Address_Mobile: '',
				      Address_Province: 0,  //为id
				      Address_City: 0,      //为id
				      Address_Area: 0,      //为id
					  Address_Town: 0,
				      Address_Detailed: '',
				      Address_Is_Default: 0  //是否为默认地址
				    },
					// 街道信息
					t_arr: [],
					t_index: 0,
				    is_first_add: false,   //是否为该用户要添加的第一条收货地址
				
				    from_page: '' //来源页面  checkout(需设置checkout页面的back_address_id)、addresslist(不需操作)
			}
		},
		methods: {
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
			
			  //提交地址
			  formSubmit: function (e) {
				  console.log(e)
				var address_info = e.detail.value;
				if (!address_info.Address_Name) {
				  uni.showToast({
					title: '请输入收货人名称',
					icon: 'loading'
				  });
				  return false;
				} else {
					this.address_info.Address_Name = address_info.Address_Name
				}
				if (!address_info.Address_Mobile) {
				  uni.showToast({
					title: '请输入收货人电话',
					icon: 'loading'
				  });
				  return false;
				} else if (!utils.check_mobile(address_info.Address_Mobile)) {
				  uni.showModal({
					title: '提示',
					content: '请输入正确的电话号码',
					showCancel: false
				  });
				  return false;
				} else {
					this.address_info.Address_Mobile = address_info.Address_Mobile;
				}
				if (!this.address_info.Address_Province || !this.address_info.Address_City || !this.address_info.Address_Area) {
				  uni.showToast({
					title: '请选择收货地址',
					icon: 'loading'
				  });
				  return false;
				}
				if (!this.address_info.Address_Town) {
				      uni.showToast({
				        title: '请选择街道',
				        icon: 'loading'
				      });
				      return false;
				}
				if (!address_info.Address_Detailed) {
				  uni.showToast({
					title: '请填写详细的地址',
					icon: 'loading'
				  });
				  return false;
				} else {
					this.address_info.Address_Detailed = address_info.Address_Detailed;
				}
				//是否设置为默认地址
				this.address_info.Address_Is_Default = address_info.Address_Is_Default[0] ? 1 : 0;
			
				//提交
				if (this.address_info.Address_ID) {
				  // 编辑
				  var data = this.address_info;
				  editAddress(data).then(res=>{
					  // console.log('bianji')
					  console.log(res)
				  })
				} else {
				  // 添加
				  var data = this.address_info;
				  data.act = 'add_address';
				  delete data.Address_ID;
				  addAddress(data).then(res=>{
					  console.log('zengjia')
					  console.log(res)
				  })
				  // app.http_req(data, app.globalData.init.api_url, 'POST', this.addeditAddress);
				}
			  },
			
			  //添加、编辑收货地址回调
			  addeditAddress: function (res) {
				var that = this;
				if (res.errorCode == 0) {
				  //返回来时页面
				  wx.showToast({
					title: (that.address_info.Address_ID ? '编辑成功' : '添加成功'),
					icon: 'success',
					duration: 2000,
					success: function () {
					  if (that.address_info.Address_ID) {  //编辑
						//跳回收货地址列表页面  不需操作
					  } else {  //添加
						//从提交订单页来的，跳回提交订单页
						if (that.from_page == 'checkout') {
						  if (typeof res.data.send_flag != 'undefined' && res.data.Address_ID) {
							// 判断添加的收货地址是否是在配送范围内
							if (res.data.send_flag == 1) {
							  var pages = getCurrentPages();          //获取页面堆栈
							  var prevPage = pages[pages.length - 2]; //上一页
							  prevPage.back_address_id = res.data.Address_ID;
							} else {
							  wx.showModal({
								title: '提示',
								content: '添加的收货地址不在配送范围内',
								confirmText: '重新添加',
								success: function (res) {
								  if(res.confirm) {
									that.is_first_add = false;
								  } else if(res.cancel) {
									uni.redirectTo({
									  url: '../addresslist/addresslist?from=' + that.from_page
									})
								  }
								}
							  })
							  return;
							}
						  }
						  //由于有配送范围的考虑，从提交订单跳转过来的页跳回收货地址列表页
						  // wx.navigateTo({
						  //   url: '../addresslist/addresslist?from=' + that.data.from_page
						  // });
						  // return;
						}
						//从地址列表跳转来的，跳回列表页面  不需操作
					  }
					  //返回上一页
					  uni.navigateBack({
						delta: 1
					  });
					} 
				  });
				} else {
				  uni.showModal({
					title: '错误',
					content: res.msg,
					showCancel: false
				  })
				}
			  },
			
			  //编辑地址时，获取地址信息的回调，初始化地址信息
			  setAddressInfo: function (res) {
				if (res.errorCode == 0) {
					var addressInfo = res.data[0];
					this.address_info.Address_ID = addressInfo['Address_ID'],
					this.address_info.Address_Name = addressInfo['Address_Name'],
					this.address_info.Address_Mobile = addressInfo['Address_Mobile'],
					this.address_info.Address_Province = addressInfo['Address_Province'],
					this.address_info.Address_City = addressInfo['Address_City'],
					this.address_info.address_info.Address_Area = addressInfo['Address_Area'],
					this.address_info.Address_Detailed = addressInfo['Address_Detailed'],
					this.address_info.Address_Is_Default = addressInfo['Address_Is_Default'],  //是否为默认地址
					//初始化地址选择数据
					this.objectMultiArray = [
					  utils.array_change(area.area[0]['0']),
					  utils.array_change(area.area[0]['0,' + addressInfo['Address_Province']]),
					  utils.array_change(area.area[0]['0,' + addressInfo['Address_Province'] + ',' + addressInfo['Address_City']])
					];
					this.change_objectMultiArray = [
					  utils.array_change(area.area[0]['0']),
					  utils.array_change(area.area[0]['0,' + addressInfo['Address_Province']]),
					  utils.array_change(area.area[0]['0,' + addressInfo['Address_Province'] + ',' + addressInfo['Address_City']])
					];
			
				  //设置初始显示列
					this.multiIndex = [
					  utils.get_arr_index(this.data.objectMultiArray[0], addressInfo['Address_Province']),
					  utils.get_arr_index(this.data.objectMultiArray[1], addressInfo['Address_City']),
					  utils.get_arr_index(this.data.objectMultiArray[2], addressInfo['Address_Area'])
					];
					this.change_multiIndex = [
					  utils.get_arr_index(this.data.objectMultiArray[0], addressInfo['Address_Province']),
					  utils.get_arr_index(this.data.objectMultiArray[1], addressInfo['Address_City']),
					  utils.get_arr_index(this.data.objectMultiArray[2], addressInfo['Address_Area'])
					];
				} else {
				  uni.showModal({
					title: '错误',
					content: res.msg,
					showCancel: false
				  })
				}
			  },
			
			  
			
			  //页面加载
			  load: function () {
				//如果有Address_ID， 则为编辑
				if (this.address_info.Address_ID) {
				  getAddress({Address_ID: this.address_info.Address_ID}).then(
				  	res => {
				  		this.setAddressInfo();
				  	}
				  )
				} else {  //添加收货地址  初始化地址选择数据
				  //地区数据处理
					this.objectMultiArray = [
					  utils.array_change(area.area[0]['0']),
					  utils.array_change(area.area[0]['0,1']),
					  utils.array_change(area.area[0]['0,1,36'])
					];
					this.change_objectMultiArray = [
					  utils.array_change(area.area[0]['0']),
					  utils.array_change(area.area[0]['0,1']),
					  utils.array_change(area.area[0]['0,1,36'])
					],
					this.t_arr = [];
					this.c_t_arr = [];
				  //查询是否是该用户要添加的第一条收货地址
				  var addressArgs = {
					act: 'get_address',
				  };
					getAddress({}).then(
						res =>{
							if(res.errorCode == 0){
								//设是否为第一条收获地址状态
								if ((res.errorCode == 0 && res.data.length <= 0) || res.errorCode == 2) {
								  this.is_first_add = true;
								}															
							}
						}
					)
				}
			  },
		  },
		
		  /**
		   * 生命周期函数--监听页面加载
		   */
		  onLoad: function (options) {
		    //设置标题
		    uni.setNavigationBarTitle({
				title: options.addressid ? '编辑收货地址' : '新增收货地址'
			});
		
		    //有addressid 地址编辑
		    if (options.addressid) {
				this.address_info.Address_ID = options.addressid
		    }
		    //页面来源
		    if (options.from) {
				this.from_page = options.from;
		    }
		
		    this.load();
		  },
		
		  /**
		   * 生命周期函数--监听页面初次渲染完成
		   */
		  onReady: function () {
		  
		  },
		
		  /**
		   * 生命周期函数--监听页面显示
		   */
		  onShow: function () {
		  
		  },
		
		  /**
		   * 生命周期函数--监听页面隐藏
		   */
		  onHide: function () {
		  
		  },
		
		  /**
		   * 生命周期函数--监听页面卸载
		   */
		  onUnload: function () {
		  
		  },
		
		  /**
		   * 页面相关事件处理函数--监听用户下拉动作
		   */
		  onPullDownRefresh: function () {
		  
		  },
		
		  /**
		   * 页面上拉触底事件的处理函数
		   */
		  onReachBottom: function () {
		  
		  }
	}
</script>

<style scoped lang="scss">
	div,view{
		box-sizing: content-box;
	}
.xinxi{width: 710rpx; padding:0  20rpx; border-bottom:1px #f4f4f4 solid; overflow: hidden; margin-bottom: 20rpx;}
.xinxi text{float: left;width: 140rpx; font-size: 28rpx; line-height:90rpx;}
.xinxi input{width: 570rpx; float: left;font-size: 28rpx; line-height:90rpx;height:90rpx;}
.tianjia-btn{width: 710rpx; margin: 50rpx 20rpx 20rpx; color:#fff;background:#F43131;border-radius: 8rpx;}
.dizhi{width: 710rpx; padding:0  20rpx; border-bottom:1px #f4f4f4 solid; overflow: hidden; margin-bottom: 20rpx;}
.dizhi , .xiangzhen {width: 710rpx; padding:0 20rpx; border-bottom:1px #f4f4f4 solid; overflow: hidden; margin-bottom: 20rpx;}
.xiangzhen text{float: left;width: 140rpx; font-size: 28rpx; line-height:90rpx;}
.dizhi text{float: left;width: 140rpx; font-size: 28rpx; line-height:90rpx;}
.dizhi input{width: 180rpx; float: left;font-size: 28rpx; line-height:90rpx;height:90rpx; margin-right: 10rpx;}
.picker view{width: 180rpx; float: left;font-size: 28rpx; line-height:90rpx;height:90rpx; margin-right: 10rpx;}


.set_default {border-bottom: none;}
.set_default label{font-size:28rpx;}
.set_default label checkbox{transform:scale(.7);position: relative;top:-2px;}
</style>
