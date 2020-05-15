<template>
    <view class="wrap" @click="commonClick">
		<view class="item">
		    <view class="item-left">上级代理商ID</view>
		    <view class="item-input">
		        <input type="text" v-model="pid" :disabled="pidDisable" placeholder="请输入邀请码" placeholder-style="color:#CAC8C8"/>
		    </view>
		</view>
		<view class="item flex-vertical-center">
		    <view class="item-left">入驻门店类型</view>

			<picker @change="bindPickerChange" :value="type" :range="array" :disabled="typeDisable"  class="item-right flex justify-end flex-vertical-center">
					{{array[type]}}
				 <image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</picker>

		</view>
        <!-- <view class="item flex-vertical-center">
            <view class="item-left">入驻类目</view>
            <view class="item-right flex justify-end flex-vertical-center" @click="getType">
                <view style="margin-right: 20rpx;">{{store_title_name}}</view>
                <image :src="'/static/client/person/right.png'|domain" class="right"></image>
            </view>
        </view> -->
        <view class="item">
            <view class="item-left">门店名称</view>
            <view class="item-input">
                <input type="text" v-model="store_name" :disabled="is_submitted" placeholder="将作为您的登录账号" placeholder-style="color:#CAC8C8"/>
            </view>
        </view>
        <view class="item">
            <view class="item-left">联系电话</view>
            <view class="item-input">
                <input type="text" v-model="store_mobile" :disabled="is_submitted" maxlength="11" placeholder="请输入联系电话" placeholder-style="color:#CAC8C8"/>
            </view>
        </view>
        <view class="item">
            <view class="item-left">门店地址</view>
            <picker class="pick" mode="multiSelector" :disabled="is_submitted"  @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="change_multiIndex" :range="change_objectMultiArray" range-key="name">
                <view class="picker">
                    <view class="view" v-if="!userStoreMsg.store_province">选择省份</view>
                    <view class="view choosed"  v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
                    <view class="view"  v-if="!userStoreMsg.store_city">选择城市</view>
                    <view class="view choosed"  v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
                    <view class="view"  v-if="!userStoreMsg.store_area">选择地区</view>
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
                <input type="text" v-model="store_address" :disabled="is_submitted" placeholder="请输入详细地址" placeholder-style="color:#CAC8C8"/>
            </view>
        </view>

        <view class="addImg">
            门店图片
            <view class="imgs">
                <view class="shangchuans" v-for="(item,index) in imgs" :key="index"  >
                    <image class="image" :src="item.path || item"  @click="yulan(index,0)"></image>
                    <image :src="'/static/client/delimg.png'|domain" class="del image" @click="delImg(index)"></image>
                </view>
                <view class="shangchuan" @click="addImg(0)" v-if="arr.length == 0 && !is_submitted">
                    <view class="heng"></view>
                    <view class="shu"></view>
                </view>
            </view>
        </view>
        <view class="addImg">
            营业执照等相关资质
            <view class="imgs">
                <view class="shangchuans" v-for="(item,index) in imglist" :key="index"  >
                    <image class="image" :src="item.path || item"  @click="yulan(index,1)"></image>
                    <image :src="'/static/client/delimg.png'|domain" class="del image" @click="delImg(index,1)"></image>
                </view>
                <view class="shangchuan" @click="addImg(1)" v-if="!is_submitted">
                    <view class="heng"></view>
                    <view class="shu"></view>
                </view>
            </view>
        </view>

        <view class="submit" @click="settled">{{is_submitted?userStoreMsg.status_desc:(status == 3 ? '被驳回，重新申请' : "立即入驻")}}</view>
        <view class="item noborder" v-if="status == 3">
            <view class="item-left">驳回原因</view>
            <view class="item-input">{{userStoreMsg.reason}}</view>
        </view>
       <!-- <popup-layer ref="storetypes"  :direction="'top'" >
            <view class="search-title">请选择入驻类目</view>
            <view class="search-content">
                <view class="search-item" v-for="(store,index) of storeTypes" @click="changeType(index)" :key="index">
                    <view>{{store.title}}</view>
                    <view v-if="store.id == current">
                        <image class="image" src="/static/procurement/selected.png" ></image>
                    </view>
                    <view class="box" v-else></view>
                </view>
            </view>
        </popup-layer> -->
    </view>
</template>

<script>
    import popupLayer from '../../components/popup-layer/popup-layer.vue'
    import {pageMixin} from "../../common/mixin";
    import area from '../../common/area.js';
    import utils from '../../common/util.js';
    import {uploadImage,comment,GET_ENV,get_Users_ID,get_User_ID,createToken,getUserStoreApply,getStoreTypes,GET_ACCESS_TOKEN} from '../../common/fetch.js'
    import {uploadImages,ls,chooseImageByPromise} from '../../common/tool.js'
    import {userStoreApply} from '../../common/fetch.js'
    import {toast,error} from '../../common/index.js'
	import {mapGetters,mapActions, mapState} from 'vuex';
    export default {
        mixins: [pageMixin],
        data() {
            return {
				pid:'',
				type:0,
				pidDisable:false,
				typeDisable:false,
				array:['代理商','社区门店'],
                arr: [],
                imgs: [],
                //用于收货地址展示用
                objectMultiArray: [],   //展示数据
                multiIndex: [0, 0, 0],  //选择数据
                //用于收货地址选择用
                change_objectMultiArray: [],  //选择数据
                change_multiIndex: [0, 0, 0], //改变的收货地址对应列的下标
                store_name: '',
                store_mobile: '',
                store_address: '',
                store_image: '',
                store_province: '',
                store_city: '',
                store_area: '',
                userStoreMsg: {}, // 用户申请信息
                is_submitted: false, // 用户是否提交过，提交过了不能修改
                status: 1, // 申请状态，1 待审核，2，已通过 3，已驳回
                storeTypes: [], // 门店类型
                current: 0,
                store_type: 0, // 门店类型
                index:  0,
                arrlist: [],
                imglist: [],

            }
        },
        computed: {
			...mapGetters(['userInfo']),
          store_title_name: function(){
              return this.storeTypes[this.index] && this.storeTypes[this.index].title || '请选择类型'
          }
        },
        components: {
            popupLayer
        },
        onShow: function(){
			if(!this.$fun.checkIsLogin(1))return;
          // this.load();
		  if(!this.userInfo.User_Mobile){
			  uni.showModal({
				  confirmText:'去绑定',
			      title: '提示',
			      content: '你还未绑定手机号，请先去绑定手机号再来申请。',
			      success: function (res) {
			          if (res.confirm) {
			              uni.navigateTo({
							  url:"/pagesA/person/updateUserPsw?type=3"
						  })
			          } else if (res.cancel) {
			             uni.navigateBack({
			                 delta: 1
			             });
			          }
			      }
			  });
		  }

        },
        onLoad(options){
			this.pid=options.pid
			if(this.pid){
				this.pidDisable=true
			}
			if(options.type){
				this.typeDisable=true
				this.type=options.type-1
			}



			this.load();
            this.objectMultiArray = [
                utils.array_change(area.area[0]['0']),
                utils.array_change(area.area[0]['0,1']),
                utils.array_change(area.area[0]['0,1,35'])
            ];
            this.change_objectMultiArray = [
                utils.array_change(area.area[0]['0']),
                utils.array_change(area.area[0]['0,1']),
                utils.array_change(area.area[0]['0,1,35'])
            ];
            this.get_store_types();
        },
        methods: {
			bindPickerChange(e){

				this.type = e.target.value
			},
            // 用户选择类型
            changeType(index){
                this.index = index;
                this.current = this.storeTypes[index].id
                this.$refs.storetypes.close();
            },
            getType(){
				if(this.is_submitted)return;
                this.$refs.storetypes.show();
            },
            // 获取用户最后的申请信息
            load: function(){
                getUserStoreApply({},{errtip: false}).then(res=>{
                    // 判断用户是否提交过，未提交data为空
                    if(!res.data) {
                        this.is_submitted = false;
                        return;
                    }
                    this.is_submitted = true;
					this.pidDisable=true
					this.pid=res.data.pid
					this.type=parseInt(res.data.stores_type-1)
					this.typeDisable=true
                    this.userStoreMsg = res.data
                    this.store_province = res.data.store_province_name
                    this.store_city = res.data.store_city_name
                    this.store_area = res.data.store_area_name
                    this.store_name = this.userStoreMsg.store_name
                    this.store_mobile = this.userStoreMsg.store_mobile
                    this.store_address = this.userStoreMsg.store_address;
                    this.imgs[0] = this.userStoreMsg.store_image;
                    this.arr[0] = this.userStoreMsg.store_image;
                    this.current = this.userStoreMsg.type_id;
                    this.arrlist =this.userStoreMsg.img_info?this.userStoreMsg.img_info:[];
                    this.imglist =this.userStoreMsg.img_info?this.userStoreMsg.img_info:[];
                    if(res.data.status == 3) {
                        //    被驳回了
                        this.is_submitted = false;
						this.pidDisable=false
						this.typeDisable=false
                        this.status = 3;
                    }
                    // getStoreTypes().then(res=>{
                    //     let storeTypes = res.data;
                    //     for(let i = 0 ; i<storeTypes.length - 1; i++) {
                    //         if(storeTypes[i].id) {
                    //             if(storeTypes[i].id == this.userStoreMsg.type_id) {
                    //                 this.index = i;
                    //             }
                    //         }
                    //     }
                    // })
                    //初始化地址选择数据
                    let objectMultiArray = [
                        utils.array_change(area.area[0]['0']),
                        utils.array_change(area.area[0]['0,' + this.userStoreMsg['store_province']]),
                        utils.array_change(area.area[0]['0,' + this.userStoreMsg['store_province'] + ',' + this.userStoreMsg['store_city']])
                    ];
                    //设置初始显示列
                    let multiIndex = [
                        utils.get_arr_index(objectMultiArray[0], this.userStoreMsg['store_province']),
                        utils.get_arr_index(objectMultiArray[1], this.userStoreMsg['store_city']),
                        utils.get_arr_index(objectMultiArray[2], this.userStoreMsg['store_area'])
                    ];
                    this.objectMultiArray = objectMultiArray;
                    this.multiIndex = multiIndex;
                    if(res.data.status == 2) {
                        // 已通过了
                        uni.showModal({
                            content: '门店申请已经通过',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    uni.navigateTo({
                                        url:'/pages/index/index'
                                    })
                                }
                            }
                        })
                    }
                })
            },
            // 获取门店类型
            get_store_types(){
                // getStoreTypes().then(res=>{
                //     this.storeTypes = res.data;
                //     this.current = res.data && res.data[0].id;
                // })
            },
            // 入驻
            settled: function(){
                if(this.is_submitted) return;
                this.store_province = this.userStoreMsg.store_province;
                this.store_city = this.userStoreMsg.store_city;
                this.store_area = this.userStoreMsg.store_area;
                 //this.store_type = this.current;
                if((this.store_name && this.store_mobile && this.store_address && this.store_province && this.store_city && this.store_area ) == '') {
                    error('请完善资料')
                    return;
                }
                if(this.arr.length == 0) {
                    error('请上传图片')
                    return;
                }
                // if(!this.store_type) {
                //     error('请选择门店类型')
                //     return;
                // }
                this.store_image = this.arr[0];
                let img_info = this.arrlist.length>0?JSON.stringify(this.arrlist):'';
                userStoreApply({
                    store_name: this.store_name,
                    store_mobile: this.store_mobile,
                    store_address: this.store_address,
                    store_image: this.store_image,
                    store_province: this.store_province,
                    store_city: this.store_city,
                    store_area: this.store_area,
					store_type:this.type==0?1:2,
                    img_info: img_info,
					pid:this.pid?this.pid:0
                },{mask:true}).then(res=>{
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
                    setTimeout(()=>{
                        uni.navigateBack({
                            delta: 1
                        })
                    },1500)
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
            //选择收获地址三级联动后确定按钮动作
            bindMultiPickerChange: function (e) {
                this.addressChange(e.detail.value);
                this.objectMultiArray = this.change_objectMultiArray;
                this.multiIndex = e.detail.value;
                this.userStoreMsg.store_province = this.objectMultiArray[0][this.multiIndex[0]]['id'];
                this.userStoreMsg.store_city = this.objectMultiArray[1][this.multiIndex[1]]['id'];
                this.userStoreMsg.store_area = this.objectMultiArray[2][this.multiIndex[2]]['id'];
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
            yulan(index,arg){
                let imgs = [];
                if(arg == 0) {
                    imgs = this.imgs;
                }else if(arg == 1) {
                    imgs = this.imglist;
                }
                imgs = imgs.map(item=>item=item.path?item.path:item)
                uni.previewImage({
                    urls: imgs,
                    indicator:'default',
                    current:index
                });
            },
            //删除某张预览图片
            delImg(index,arg=0){
                if(this.is_submitted) return;
                if(arg == 0) {
                    this.imgs.splice(index, 1);
                    this.arr.splice(index, 1);
                }else if(arg == 1) {
                    this.imglist.splice(index,1);
                    this.arrlist.splice(index,1);
                }
            },
			async addImg(arg=0){
                let param = {act:'upload_image'};
                param.User_ID = get_User_ID();
                param.Users_ID = get_Users_ID();
                param.env = GET_ENV();

                if(!param.hasOwnProperty('access_token')){
                    param.access_token = GET_ACCESS_TOKEN()
                }

                let data = createToken(param);
                    let sizeType = null
                    // #ifndef MP-TOUTIAO
                    sizeType =  ['original', 'compressed'] //可以指定是原图还是压缩图，默认二者都有
                    // #endif
                    let that = this;
                    let temp_file_list = []
                    if(arg == 0) {
						await chooseImageByPromise({count:1,sizeType}).then(tempFiles=>{
						    temp_file_list = tempFiles
						})
                        that.imgs = [...temp_file_list]

                        let arrs = temp_file_list.map(item=>item.path)
                        uploadImages(data,arrs).then(urls=>{
							for(let item of urls){
								that.arr.push(item)
							}
                            //that.arr = that.arr.concat(urls);
                            //是否可以提交
                            that.isSubmit = true;
                        });
                    }else if(arg == 1){
						await chooseImageByPromise({count:(9-that.imgs.length),sizeType}).then(tempFiles=>{
						    temp_file_list = tempFiles
						})
                        // that.imglist = [...temp_file_list]
							that.imglist = that.imglist.concat(temp_file_list);
                        let arrs = temp_file_list.map(item=>item.path)
                        uploadImages(data,arrs).then(urls=>{
							for(let item of urls){
								that.arrlist.push(item)
							}
                            //that.arrlist = that.arrlist.concat(urls);
                            //是否可以提交
                            that.isSubmit = true;
                        });
                    }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .justify-end {
        justify-content: flex-end;
        flex: 1;
    }
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
    .item.noborder {
        border-bottom: none;
    }
    .addImg {
        font-size: 30rpx;
        //height: 100rpx;
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
            z-index: 999;
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
        /*position: fixed;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*width: 750rpx;*/
        height: 85rpx;
        line-height: 85rpx;
        font-size: 32rpx;
        text-align: center;
        color: #fff;
        background-color: #f43131;
    }
    .search-title {
        line-height: 88rpx;
        color: #333;
        text-align: center;
        font-size: 32rpx;
    }
    .search-content {
        padding: 20rpx;
				max-height: 600rpx;
				overflow: auto;
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
    .search-item:nth-last-child(1) {
        border-bottom: 0;
    }
</style>
