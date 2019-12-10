<template>
    <view class="wrap">
        <view class="item">
            <view class="item-left">门店名称</view>
            <view class="item-input">
                <input type="text" v-model="store_name" disabled="!is_submitted" placeholder="将作为您的登录账号" placeholder-style="color:#CAC8C8"/>
            </view>
        </view>
        <view class="item">
            <view class="item-left">联系电话</view>
            <view class="item-input">
                <input type="text" v-model="store_mobile" disabled="!is_submitted" maxlength="11" placeholder="请输入联系电话" placeholder-style="color:#CAC8C8"/>
            </view>
        </view>
        <view class="item">
            <view class="item-left">门店地址</view>
            <picker class="pick" mode="multiSelector" disabled="!is_submitted"  @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="change_multiIndex" :range="change_objectMultiArray" range-key="name">
                <view class="picker">
                    <view class="view" v-if="!address_info.Address_Province">选择省份</view>
                    <view class="view choosed"  v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
                    <view class="view"  v-if="!address_info.Address_City">选择城市</view>
                    <view class="view choosed"  v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
                    <view class="view"  v-if="!address_info.Address_Area">选择地区</view>
                    <view class="view choosed"  v-else>{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
                    <image :src="'/static/client/person/right.png'|domain" class="right"></image>
                </view>
            </picker>
            <!-- <view class="item-input">
                <text class="placeholder">请选择地址</text>
            </view>
            <view>
                <image :src="'/static/client/person/right.png'|domain" class="right"></image>
            </view> -->
        </view>
        <view class="item">
            <view class="item-left">详细地址</view>
            <view class="item-input">
                <input type="text" v-model="store_address" disabled="!is_submitted" placeholder="请输入详细地址" placeholder-style="color:#CAC8C8"/>
            </view>
        </view>
        <view class="addImg">
            门店图片
            <view class="imgs">
                <view class="shangchuans" v-for="(item,index) of imgs" :key="index"  >
                    <image class="image" :src="item"  @click="yulan(index)"></image>
                    <image :src="'/static/client/delimg.png'|domain" class="del image" @click="delImg(index)"></image>
                </view>
                <view class="shangchuan" @click="addImg" v-if="arr.length == 0 && !is_submitted">
                    <view class="heng"></view>
                    <view class="shu"></view>
                </view>
            </view>
        </view>
        <view class="submit" @click="settled">{{is_submitted?userStoreMsg.status_desc:"立即入驻"}}</view>
    </view>
</template>

<script>
		import {pageMixin} from "../../common/mixin";
    import area from '../../common/area.js';
    import utils from '../../common/util.js';
    import {uploadImage,comment,GET_ENV,get_Users_ID,get_User_ID,createToken,getUserStoreApply} from '../../common/fetch.js'
    import {uploadImages,ls} from '../../common/tool.js'
    import {userStoreApply} from '../../common/fetch.js'
    import {toast,error} from '../../common/index.js'
    export default {
        mixins: [pageMixin],
        data() {
            return {
                arr: [],
                imgs: [],
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
                store_name: '',
                store_mobile: '',
                store_address: '',
                store_image: '',
                store_province: '',
                store_city: '',
                store_area: '',
                userStoreMsg: {}, // 用户申请信息
                is_submitted: false, // 用户是否提交过，提交过了不能修改
            }
        },
        onShow: function(){
          this.load();
        },
        onLoad: function(){
            this.objectMultiArray = [
                utils.array_change(area.area[0]['0']),
                utils.array_change(area.area[0]['0,1']),
                utils.array_change(area.area[0]['0,1,35'])
            ];
            this.change_objectMultiArray = [
                utils.array_change(area.area[0]['0']),
                utils.array_change(area.area[0]['0,1']),
                utils.array_change(area.area[0]['0,1,35'])
            ]
        },
        methods: {
            // 获取用户最后的申请信息
            load: function(){
                getUserStoreApply().then(res=>{
                    // 判断用户是否提交过，未提交data为空
                    if(!res.data) {
                        this.is_submitted = true;
                        return;
                    }
                    this.userStoreMsg = res.data
                    this.store_province = res.data.store_province_name
                    this.store_city = res.data.store_city_name
                    this.store_area = res.data.store_area_name

                })
            },
            // 入驻
            settled: function(){
                this.store_province = this.address_info.Address_Province;
                this.store_city = this.address_info.Address_City;
                this.store_area = this.address_info.Address_Area;
                if((this.store_name && this.store_mobile && this.store_address && this.store_province && this.store_city && this.store_area ) == '') {
                    error('请完善资料')
                    return;
                }
                if(this.arr.length == 0) {
                    error('请上传图片')
                    return;
                }
                this.store_image = this.arr[0][0];
                userStoreApply({
                    store_name: this.store_name,
                    store_mobile: this.store_mobile,
                    store_address: this.store_address,
                    store_image: this.store_image,
                    store_province: this.store_province,
                    store_city: this.store_city,
                    store_area: this.store_area
                }).then(res=>{
                    toast(res.msg);
                    uni.navigateBack({
                        delta: 1
                    })
                }).catch(err=>{
                    error(err.msg)
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
                // this.address_town();
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
            //图片预览
            yulan(index){
                uni.previewImage({
                    urls: this.imgs,
                    indicator:'default',
                    current:index
                });
            },
            //删除某张预览图片
            delImg(index){
                this.imgs.splice(index, 1);
                this.arr.splice(index, 1);
            },
            addImg(){
                let param = {act:'upload_image'};
                param.User_ID = get_User_ID();
                param.Users_ID = get_Users_ID();
                param.env = GET_ENV();

                let data = createToken(param);
                let that=this;
                uni.chooseImage({
                    count:1,
                    // #ifndef MP-TOUTIAO
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    // #endif
                    success(res) {
                        that.isSubmit=false;
                        for(let item of res.tempFiles){
                            that.imgs.push(item.path);
                            //上传图片
                            let arrs=[];
                            arrs.push(item.path);
                            let arr=uploadImages(data,arrs);
                            that.arr.push(arr);
                            //是否可以提交
                            that.isSubmit=true;
                        }

                    },
                    fail(e) {

                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .wrap {
        height: 100vh;
        background-color: #fff;
        padding: 0 20rpx;
    }
    .item {
        display: flex;
        align-items: center;
        height: 100rpx;
        border-bottom: 1px solid #EBEBEB;
        box-sizing: border-box;
        padding: 25rpx 0;
        .item-left {
            height: 50rpx;
            line-height: 50rpx;
            font-size: 30rpx;
            color: #333;
        }
        .item-input {
            color: #333;
            font-size: 28rpx;
            margin-left: 32rpx;
            flex: 1;
            .placeholder {
                color: #CAC8C8;
            }
        }
        .right {
            width: 18rpx;
            height: 27rpx;
        }
        .pick {
            flex: 1;
        }
        .picker {
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #CAC8C8;
            margin-left: 28rpx;
            justify-content: space-between;
						.choosed {
							color: #333;
						}
        }
    }
    .addImg {
        font-size: 30rpx;
        height: 100rpx;
        line-height: 100rpx;
        color: #333;
    }
    .imgs {
        display: flex;
        padding-right: 0rpx;
        flex-wrap: wrap;
    }
    .shangchuans{
        width:146rpx;
        height:146rpx;
        border:1px solid rgba(186,186,186,1);
        position: relative;
        margin-right: 28rpx;
        margin-bottom: 28rpx;
        .image{
            width: 100%;
            height: 100%;
        }
        .del{
            width: 38rpx;
            height: 38rpx;
            position: absolute;
            top: -19rpx;
            right: -19rpx;
            z-index: 9999;
        }
    }
    .shangchuan{
        width:146rpx;
        height:146rpx;
        border:1px dotted rgba(186,186,186,1);
        position: relative;
        margin-bottom: 28rpx;
        .heng{
            width: 76rpx;
            height: 3rpx;
            background-color: #BABABA;
            position: absolute;
            top: 72rpx;
            left: 35rpx;
        }
        .shu{
            width: 3rpx;
            height: 76rpx;
            background-color: #BABABA;
            position: absolute;
            top: 35rpx;
            left: 72rpx;

        }
    }
    .submit {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 750rpx;
        height: 85rpx;
        line-height: 85rpx;
        font-size: 32rpx;
        text-align: center;
        color: #fff;
        background-color: #f43131;
    }
</style>
