<template>
  <view @click="commonClick" class="bgColor-white">

    <!-- 	<page-title :title="title" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->

    <input class="v_input" placeholder="修改用户名" type="text" v-if="type == 0" v-model="User_Name" />
    <input class="v_input" placeholder="修改昵称" type="text" v-if="type == 1" v-model="User_NickName" />
    <input class="v_input" placeholder="修改QQ" type="number" v-if="type == 9" v-model="User_QQ" />
    <input class="v_input" placeholder="修改身份证号" type="text" v-if="type == 10" v-model="User_IDNum" />
    <input class="v_input" placeholder="修改传真" type="text" v-if="type == 12" v-model="User_Fax" />

    <block v-if="type == 11">
      <view class="area-item">
        <text class="area-label">请选择性别</text>
        <picker @change="bindDateChanges"  :value="indexMy" :range="array">
          <view class="uni-input" >{{array[indexMy]}}</view>
        </picker>
      </view>
    </block>

    <block v-if="type == 2">
      <view class="area-item">
        <text class="area-label">请选择生日</text>
        <picker @change="bindDateChange" mode="date">
          <view class="uni-input" v-if="dateValue">{{dateValue}}</view>
          <view class="uni-input" v-if="!dateValue">请选择出生时间</view>
        </picker>
      </view>
    </block>
    <input class="v_input" placeholder="修改邮箱" type="text" v-if="type == 3" v-model="User_Email" />
    <block v-if="type == 4">
      <view class="area-item">
        <text class="area-label">请选择省市县</text>
        <picker :range="change_objectMultiArray" :value="change_multiIndex" @change="bindMultiPickerChange"
                @columnchange="bindMultiPickerColumnChange" mode="multiSelector" range-key="name"
                style="flex:1;">
          <view class="picker">
            <view class="p_item" v-if="address_info.User_Province <= 0">选择省份</view>
            <view class="p_item" v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
            <view class="p_item" v-if="address_info.User_City <= 0">选择城市</view>
            <view class="p_item" v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
            <view class="p_item" v-if="address_info.User_Area <= 0">选择地区</view>
            <view class="p_item" v-else>{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
          </view>
        </picker>
      </view>
      <view class="area-item">
        <text class="area-label">请选择街道</text>
        <picker :range="t_arr" :value="t_index" @change="t_pickerChange" mode="selector" range-key="name">
          <view class="picker">
            <view class="p_item" v-if="address_info.User_Tow <= 0 || !t_arr[t_index]">选择街道</view>
            <view class="p_item" v-else>{{t_arr[t_index]['name']}}</view>
          </view>
        </picker>
      </view>
      <view class="area-item">
        <text class="area-label">详细地址</text>
        <input placeholder="请输入详细地址" type="text" v-model="User_Address" />
      </view>
    </block>
    <view @click="save" class="save">保存</view>
  </view>
</template>

<script>
import area from '../../common/area.js'
import utils from '../../common/util.js'
import { get_user_info, getTown, upDateUserInfo } from '../../common/fetch.js'
import { pageMixin } from '../../common/mixin'
import { mapActions, mapGetters } from 'vuex'
import {error} from '../../common/index.js'
export default {
  mixins: [pageMixin],
  data () {
    const currentDate = this.getDate({
      format: true
    })
    return {
      array: ['男', '女'],
      indexMy: 0,
      date: currentDate,
      dateValue: '',
      type: 0,
      title: '',
      User_Name: '',
      User_NickName: '',
      User_QQ: '',
      User_IDNum: '',
      User_Fax: '',
      User_Email: '',
      User_Province: '',
      User_City: '',
      User_Area: '',
      User_Tow: '',
      User_Address: '',

      objectMultiArray: [], // 展示数据
      multiIndex: [0, 0, 0], // 选择数据

      // 用于收货地址选择用
      change_objectMultiArray: [], // 选择数据
      change_multiIndex: [0, 0, 0], // 改变的收货地址对应列的下标
      t_arr: [],
      t_index: 0,
      address_info: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapActions(['setUserInfo']),
    get_user_info () {
      get_user_info().then(res => {
        const addressInfo = res.data
        this.address_info.User_Province = addressInfo.User_Province
        this.address_info.User_City = addressInfo.User_City
        this.address_info.User_Area = addressInfo.User_Area
        this.address_info.User_Tow = addressInfo.User_Tow
        if (this.address_info.User_Area) {
          // 初始化地址选择数据
          this.address_town()
          const objectMultiArray = [
            utils.array_change(area.area[0]['0']),
            utils.array_change(area.area[0]['0,' + addressInfo.User_Province]),
            utils.array_change(area.area[0]['0,' + addressInfo.User_Province + ',' + addressInfo.User_City]),
            utils.array_change(area.area[0]['0,' + addressInfo.User_Province + ',' + addressInfo.User_City + ',' + addressInfo.User_Area])
          ]
          // 设置初始显示列
          const multiIndex = [
            utils.get_arr_index(objectMultiArray[0], addressInfo.User_Province),
            utils.get_arr_index(objectMultiArray[1], addressInfo.User_City),
            utils.get_arr_index(objectMultiArray[2], addressInfo.User_Area),
            utils.get_arr_index(objectMultiArray[3], addressInfo.User_Tow)
          ]
          this.objectMultiArray = objectMultiArray
          // this.change_objectMultiArray = objectMultiArray;
          this.multiIndex = multiIndex
          // this.change_multiIndex = multiIndex;
          this.User_Address = addressInfo.User_Address
        } else {
          // 初始化地址选择数据

          const objectMultiArray = [
            utils.array_change(area.area[0]['0']),
            utils.array_change(area.area[0]['0,' + addressInfo.User_Province]),
            utils.array_change(area.area[0]['0,' + addressInfo.User_Province + ',' + addressInfo.User_City])
          ]
          // 设置初始显示列
          const multiIndex = [
            utils.get_arr_index(objectMultiArray[0], addressInfo.User_Province),
            utils.get_arr_index(objectMultiArray[1], addressInfo.User_City),
            utils.get_arr_index(objectMultiArray[2], addressInfo.User_Area)
          ]
          this.objectMultiArray = objectMultiArray
          // this.change_objectMultiArray = objectMultiArray;
          this.multiIndex = multiIndex
          // this.change_multiIndex = multiIndex;
          this.User_Address = addressInfo.User_Address
        }
      })
    },
    bindDateChange (e) {
      this.dateValue = e.target.value
    },
    bindDateChanges (e) {
      this.indexMy = e.target.value
    },
    getDate (type) {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()

      if (type === 'start') {
        year = year - 60
      } else if (type === 'end') {
        year = year + 2
      }
      month = month > 9 ? month : '0' + month

      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    },
    getTitle () {
      switch (this.type) {
        case '0' :
          this.title = '修改用户名'
          break
        case '1' :
          this.title = '修改昵称'
          break
        case '3' :
          this.title = '修改邮箱'
          break
        case '4' :
          this.title = '修改地址'
          break
        case '9' :
          this.title = 'QQ'
          break
        case '10' :
          this.title = '身份证号'
          break
        case '11' :
          this.title = '性别'
          break
        case '12' :
          this.title = '传真'
          break
      }

      uni.setNavigationBarTitle({
        title: this.title
      })
    },
    save () {
      if (this.loading) return
      if (this.type == 0) {
        if (!this.User_Name) {
          uni.showToast({
            title: '请输入用户名',
            icon: 'none'
          })
          return
        }
      }
      if (this.type == 1) {
        if (!this.User_NickName) {
          uni.showToast({
            title: '请输入昵称',
            icon: 'none'
          })
          return
        }
      }
      if (this.type == 3) {
        if (!this.User_Email) {
          uni.showToast({
            title: '请输入邮箱',
            icon: 'none'
          })
          return
        }
      }
      if (this.type == 4) {
        if (!this.address_info.User_Province || !this.address_info.User_City || !this.address_info.User_Area || !this.address_info.User_Tow) {
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
      if (this.type == 2) {
        if (!this.dateValue) {
          uni.showToast({
            title: '请填写生日',
            icon: 'none'
          })
          return
        }

        const that = this
        uni.showModal({
          title: '提示',
          content: '生日信息一旦修改，不可再次更改',
          success: function (res) {
            if (res.confirm) {
              that.loading = true
              upDateUserInfo({
                User_Gender: that.array[that.indexMy],
                User_QQ: that.User_QQ,
                User_IDNum: that.User_IDNum,
                User_Fax: that.User_Fax,
                User_Name: that.User_Name,
                User_NickName: that.User_NickName,
                User_Email: that.User_Email,
                User_Province: that.address_info.User_Province,
                User_City: that.address_info.User_City,
                User_Area: that.address_info.User_Area,
                User_Tow: that.address_info.User_Tow,
                User_Address: that.User_Address,
                User_Birthday: that.dateValue
              }).then(res => {
                const userInfo = res.data
                userInfo.User_Name = res.data.User_Name
                userInfo.User_NickName = res.data.User_NickName
                userInfo.User_Email = res.data.User_Email
                userInfo.User_Birthday = res.data.User_Birthday
                that.setUserInfo(userInfo)
                uni.showToast({
                  title: '修改成功'
                })
                setTimeout(() => {
                  uni.navigateBack({
                    delta: 1
                  })
                }, 1500)
              }).catch(e => {
				   error(e.msg)
                that.loading = false
              })
            } else if (res.cancel) {

            }
          }
        })
        return
      }
      this.loading = true
      upDateUserInfo({
        User_Gender: this.array[this.indexMy],
        User_QQ: this.User_QQ,
        User_IDNum: this.User_IDNum,
        User_Fax: this.User_Fax,
        User_Name: this.User_Name,
        User_NickName: this.User_NickName,
        User_Email: this.User_Email,
        User_Province: this.address_info.User_Province,
        User_City: this.address_info.User_City,
        User_Area: this.address_info.User_Area,
        User_Tow: this.address_info.User_Tow,
        User_Address: this.User_Address
      }).then(res => {
        const userInfo = res.data
        userInfo.User_Name = res.data.User_Name
        userInfo.User_NickName = res.data.User_NickName
        userInfo.User_Email = res.data.User_Email
        userInfo.User_Birthday = res.data.User_Birthday
        this.setUserInfo(userInfo)
        uni.showToast({
          title: '修改成功'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1500)
      }).catch(e => {
		  error(e.msg)
        this.loading = false
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
    // 获取乡镇
    address_town: function () {
      getTown({ a_id: this.address_info.User_Area }).then(res => {
        var t_arr = []
        var t_index = 0
        var idx = 0
        for (var i in res.data) {
          for (var j in res.data[i]) {
            t_arr.push({
              id: j,
              name: res.data[i][j]
            })
            if (j == this.address_info.User_Tow) {
              t_index = idx
            }
            idx++
          }
        }
        this.t_arr = t_arr
        this.t_index = t_index
      }).catch(() => {
      })
    },
    // 乡镇地址 点击确定
    t_pickerChange: function (e) {
      this.t_index = e.detail.value
      this.address_info.User_Tow = this.t_arr[e.detail.value].id
    },
    // 选择收获地址三级联动后确定按钮动作
    bindMultiPickerChange: function (e) {
      this.addressChange(e.detail.value)
      this.objectMultiArray = this.change_objectMultiArray
      this.multiIndex = e.detail.value
      this.address_info.User_Province = this.objectMultiArray[0][this.multiIndex[0]].id
      this.address_info.User_City = this.objectMultiArray[1][this.multiIndex[1]].id
      this.address_info.User_Area = this.objectMultiArray[2][this.multiIndex[2]].id
      this.address_info.User_Tow = 0
      this.t_arr = []
      this.t_index = 0
      // 处理街道信息
      this.address_town()
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
    this.User_Name = this.userInfo.User_Name
    this.User_NickName = this.userInfo.User_NickName
    this.User_Email = this.userInfo.User_Email
    this.dateValue = this.userInfo.User_Birthday
    this.indexMy = this.userInfo.User_Gender == '男' ? 0 : 1

    this.User_QQ = this.userInfo.User_QQ
    this.User_IDNum = this.userInfo.User_IDNum
    this.User_Fax = this.userInfo.User_Fax
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
    this.get_user_info()
    this.t_arr = []
    this.c_t_arr = []
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
    box-sizing: border-box;
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
      // text-align: center;
    }
  }
</style>
