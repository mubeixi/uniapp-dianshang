<template>
  <view @click="commonClick" class="bgColor-white">
    <block v-if="type==1">
      <view class="area-item">
        <text class="area-label">请选择省市县</text>
        <picker :range="change_objectMultiArray" :value="change_multiIndex" @change="bindMultiPickerChange"
                @columnchange="bindMultiPickerColumnChange" mode="multiSelector" range-key="name"
                style="flex:1;">
          <view class="picker">
            <view class="p_item" v-if="!address_info.Stores_Province">选择省份</view>
            <view class="p_item" v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
            <view class="p_item" v-if="!address_info.Stores_City">选择城市</view>
            <view class="p_item" v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
            <view class="p_item" v-if="!address_info.Stores_Area">选择地区</view>
            <view class="p_item" v-else>{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
          </view>
        </picker>
      </view>
      <view class="area-item">
        <text class="area-label">详细地址</text>
        <input placeholder="请输入详细地址" type="text" v-model="User_Address" />
      </view>
      <view @click="save" class="save">确认修改</view>
    </block>
    <block v-if="type==2||type==3">
      <!-- 				<form report-submit @submit="confirm"> -->
      <view class="other">
        <!-- <view class="other-item">
          您现在的手机号是： {{userInfo.User_Mobile}}
        </view> -->
        <view class="other-item" v-if="type==3">
          手机号
          <input class="input phone" placeholder="请输入手机号,固话验证码为空" type="text" v-model="mobile" />
        </view>
        <view class="other-item" v-if="type==2">
          手机号
          <input class="input phone" placeholder="请输入手机号" type="text" v-model="mobile" />
        </view>
        <view class="other-item">
          验证码
          <input class="input code" placeholder="请输入验证码" type="text" v-model="code" />
          <view @click="getCode" class="get-msg">{{countdownStatus?(countdownNum + '秒'):'获取验证码'}}</view>
        </view>
        <view @click="confirm" class="save">确认修改</view>
      </view>
      </form>
    </block>
  </view>
</template>

<script>
import area from '../../common/area.js'
import utils from '../../common/util.js'
import { getStoreDetail, updateStoreInfo, updateStoreMobile, updateStoreMobileSms } from '../../common/fetch.js'
import { mapGetters } from 'vuex'
import { pageMixin } from '../../common/mixin'

export default {
  mixins: [pageMixin],
  data () {
    return {
      type: 0,
      objectMultiArray: [], // 展示数据
      multiIndex: [0, 0, 0], // 选择数据

      // 用于收货地址选择用
      change_objectMultiArray: [], // 选择数据
      change_multiIndex: [0, 0, 0], // 改变的收货地址对应列的下标
      t_arr: [],
      t_index: 0,
      mobile: '',
      code: '',
      address_info: {},
      countdownStatus: false, // 是否开启倒计时了
      countdownNum: 60,
      storeData: [],
      User_Address: ''
    }
  },
  computed: {
    ...mapGetters(['Stores_ID'])
  },
  methods: {
    getStoreDetail () {
      getStoreDetail({ store_id: this.Stores_ID }).then(res => {
        var addressInfo = res.data
        this.storeData = res.data
        this.User_Address = this.storeData.Stores_Address
        // 初始化地址选择数据
        const objectMultiArray = [
          utils.array_change(area.area[0]['0']),
          utils.array_change(area.area[0]['0,' + addressInfo.Stores_Province]),
          utils.array_change(area.area[0]['0,' + addressInfo.Stores_Province + ',' + addressInfo.Stores_City])
        ]
        // 设置初始显示列
        const multiIndex = [
          utils.get_arr_index(objectMultiArray[0], addressInfo.Stores_Province),
          utils.get_arr_index(objectMultiArray[1], addressInfo.Stores_City),
          utils.get_arr_index(objectMultiArray[2], addressInfo.Stores_Area)
        ]
        this.address_info = addressInfo
        this.objectMultiArray = objectMultiArray
        this.multiIndex = multiIndex
      }).catch(e => {
      })
    },
    // 发送验证码
    getCode () {
      if (this.countdownStatus) {
        return
      }
      const isMobileOK = /^1(3|5|6|7|8|9)[0-9]{9}$/.test(this.mobile)
      if (!isMobileOK) {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
        return
      }
      const data = {
        mobile: this.mobile,
        store_id: this.Stores_ID
      }
      if (this.type == 2) {
        data.type = 'sms_mobile'
      }
      if (this.type == 3) {
        data.type = 'store_mobile'
      }
      updateStoreMobileSms(data).then(res => {
        uni.showToast({
          title: '验证码已发送',
          icon: 'success'
        })
        this.startCountdown()
      })
    },
    confirm (e) {
      if (this.type == 2) {
        if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
          uni.showToast({
            title: '手机号输入错误，请重新输入',
            icon: 'none'
          })
          return
        }
        if (!this.code) {
          uni.showToast({
            title: '验证码不能为空',
            icon: 'none'
          })
          return
        }
      }

      const data = {
        store_id: this.Stores_ID,
        mobile: this.mobile,
        code: this.code
      }
      if (this.type == 2) {
        data.type = 'sms_mobile'
      }
      if (this.type == 3) {
        data.type = 'store_mobile'
      }

      updateStoreMobile(data).then(res => {
        uni.showToast({
          title: '修改成功'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1500)
      }).catch(() => {
      })
    },
    startCountdown () {
      // 倒计时
      this.countdownStatus = true
      const countdownInterval = setInterval(() => {
        if (this.countdownNum > 0) {
          this.countdownNum--
        } else {
          clearInterval(countdownInterval)
          this.countdownNum = 60
          this.countdownStatus = false
        }
      }, 1000)
    },
    getTitle () {
      switch (this.type) {
        case '1' :
          this.title = '修改门店地址'
          break
        case '2' :
          this.title = '修改订单短信通知号码'
          break
        case '3' :
          this.title = '修改联系电话'
          break
      }

      uni.setNavigationBarTitle({
        title: this.title
      })
    },
    save () {
      if (this.type == 1) {
        if (!this.address_info.Address_Province || !this.address_info.Address_City || !this.address_info.Address_Area) {
          uni.showToast({
            title: '请选择完整地址',
            icon: 'none'
          })
          return
        } else if (this.User_Address == '') {
          uni.showToast({
            title: '请填写详细信息',
            icon: 'none'
          })
          return
        }
      }
      updateStoreInfo({
        store_id: this.Stores_ID,
        store_province: this.address_info.Address_Province,
        store_city: this.address_info.Address_City,
        store_area: this.address_info.Address_Area,
        store_address: this.User_Address
      }).then(res => {
        uni.showToast({
          title: '修改成功'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1500)
      })
    },
    // 处理省市区联动信息
    addressChange: function (columnValue) {
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
    // 选择收获地址三级联动后确定按钮动作
    bindMultiPickerChange: function (e) {
      this.addressChange(e.detail.value)
      this.objectMultiArray = this.change_objectMultiArray
      this.multiIndex = e.detail.value
      this.address_info.Address_Province = this.objectMultiArray[0][this.multiIndex[0]].id
      this.address_info.Address_City = this.objectMultiArray[1][this.multiIndex[1]].id
      this.address_info.Address_Area = this.objectMultiArray[2][this.multiIndex[2]].id
      this.t_arr = []
      this.t_index = 0
    },

    // 选择收货地址
    bindMultiPickerColumnChange: function (e) {
      var column = e.detail.column // 修改的列
      var index = e.detail.value // 选择列的下标（从0开始）
      var change_multiIndex = 'change_multiIndex[' + column + ']'

      var columnValue = [
        column == 0 ? index : this.change_multiIndex[0],
        column == 0 ? 0 : (column == 1 ? index : this.change_multiIndex[1]),
        column == 0 || column == 1 ? 0 : index
      ]
      this.addressChange(columnValue)
    }
  },
  onShow () {
    this.objectMultiArray = [
      utils.array_change(area.area[0]['0']),
      utils.array_change(area.area[0]['0,1']),
      utils.array_change(area.area[0]['0,1,35'])
    ]
    this.change_objectMultiArray = [
      utils.array_change(area.area[0]['0']),
      utils.array_change(area.area[0]['0,1']),
      utils.array_change(area.area[0]['0,1,35'])
    ],
    this.t_arr = []
    this.c_t_arr = []
    this.getStoreDetail()
  },
  onLoad (option) {
    if (option.type) {
      this.type = option.type
      this.getTitle()
    } else {
      uni.navigateBack({
        delta: 1
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .bgColor-white {
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

  .other {
    padding: 14rpx 20rpx 0;

    .other-item {
      display: flex;
      align-items: center;
      line-height: 98rpx;
      font-size: 28rpx;
      border-bottom: 1px solid #E3E3E3;

      .input {
        flex: 1;
        font-size: 24rpx;
        margin-left: 42rpx;
      }

      .get-msg {
        height: 50rpx;
        line-height: 50rpx;
        width: 140rpx;
        border: 1px solid #F43131;
        color: #F43131;
        font-size: 24rpx;
        text-align: center;
        border-radius: 5rpx;
      }
    }

    .confirm {
      height: 76rpx;
      line-height: 76rpx;
      width: 580rpx;
      color: #fff;
      background: #F43131;
      text-align: center;
      margin: 157rpx auto 0;
    }
  }
</style>
