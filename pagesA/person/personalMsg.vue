<template>
	<view @click="commonClick" class="bgColor-white">


		<!-- <page-title title="个人信息" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->

		<view class="msg">
			<view class="item" @click="changeAvator">
				<view class="item-name">头像</view>
				<view class="info">
					<image class="image" :src="User_HeadImg" ></image>
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(0)">
				<view class="item-name">用户名</view>
				<view class="info">
					{{userInfo.User_Name}}
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(1)">
				<view class="item-name">昵称</view>
				<view class="info">
					{{userInfo.User_NickName}}
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(2)">
				<view class="item-name">生日</view>
				<view class="info">
					{{userInfo.User_Birthday==0?'':userInfo.User_Birthday}}
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(3)">
				<view class="item-name">邮箱</view>
				<view class="info">
					{{userInfo.User_Email}}
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(4)">
				<view class="item-name">详细地址</view>
				<view class="info">
					{{User_Province_name}}{{User_City_name}}{{User_Area_name}}{{User_Tow_name}}{{User_Address}}
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex';


	import {GET_ENV,get_User_ID,get_Users_ID,GET_ACCESS_TOKEN,upDateUserInfo,get_user_info,uploadImage,createToken} from '../../common/fetch';
	import { apiBaseUrl } from '../../common/env.js';
	import {pageMixin} from "../../common/mixin";
	import {toast,error} from "../../common";
	import {isWeiXin, ls} from "../../common/tool";

	export default {
		mixins:[pageMixin],
		data() {
			return {
				temppath:'',

				tem_Shop_Logo: '',
				User_HeadImg: '',
				User_Province_name: '',
				User_City_name: '',
				User_Area_name: '',
				User_Tow_name: '',
				User_Address: ''
			}
		},
		async created(){
			let userInfo = this.getUserInfo(true);

			this.User_HeadImg = this.userInfo.User_HeadImg;


		},
		onShow(){
			this.get_user_info();
		},
		methods: {
			...mapActions(['getUserInfo','setUserInfo']),
			update(num){
				if(num==2){
					if(this.userInfo.User_Birthday!=0){
						uni.showToast({
							title:'生日不允许再次修改',
							icon:'none'
						})
						return
					}
				}
				uni.navigateTo({
					url: '/pagesA/person/editPersonalMsg?type=' + num
				})
			},
			get_user_info(){
				get_user_info().then(res=>{
					this.User_Province_name = res.data.User_Province_name;
					this.User_City_name = res.data.User_City_name;
					this.User_Area_name = res.data.User_Area_name;
					this.User_Tow_name = res.data.User_Tow_name;
					this.User_Address = res.data.User_Address;
				})
			},
			// 更换头像
			changeAvator(){
				let _self = this;

				let param = {act:'upload_image'};
				param.User_ID = get_User_ID();
				param.Users_ID = get_Users_ID();
				// param.appid = get_Appid();
				param.env = GET_ENV();

				if(!param.hasOwnProperty('access_token')){
					param.access_token = GET_ACCESS_TOKEN()
				}

				let data = createToken(param);


				uni.chooseImage({
					count:1,
					// #ifndef MP-TOUTIAO
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// #endif
					success(res) {


						// #ifdef MP-TOUTIAO
						let fileCTX = tt.getFileSystemManager()
						fileCTX.readFile({
							filePath:res.tempFilePaths[0],
							encoding:'base64',
							success(ret) {
								let imgs='data:image/jpeg;base64,'+ret.data;
							   uploadImage({'image':imgs}).then(result=>{

								   upDateUserInfo({
									User_HeadImg: result.data.path,
								   }).then(res=>{
									   uni.showToast({
										   title: '修改成功',
										   icon: 'success'
									   });
									   _self.User_HeadImg = res.data.User_HeadImg;
									   _self.userInfo.User_HeadImg = res.data.User_HeadImg;
									   _self.setUserInfo(_self.userInfo);

								   })
							   }).catch(e=>{})
							},
							fail(ret) {
							},
							complete(ret) {
							}
						})
						// #endif


						// #ifndef MP-TOUTIAO

						let filePath = res.tempFilePaths[0];
						_self.User_HeadImg = filePath;
						_self.temppath = filePath

						uni.showLoading({
							title: '上传图片',
							mask: true
						})
						//上传图片
						uni.uploadFile({
							url: apiBaseUrl+'/api/little_program/shopconfig.php',
							filePath: filePath,
							name: 'image',
							formData: data,
							success: (uploadFileRes) => {


								if(typeof uploadFileRes !='object' || !uploadFileRes.hasOwnProperty('data') || !uploadFileRes.data){
									error('上传文件失败')
									return;
								}
								uploadFileRes =	JSON.parse(uploadFileRes.data)
								_self.tem_Shop_Logo = uploadFileRes.data.path;

								uni.showLoading({
									title: '更改图像',
									mask: true
								})
								upDateUserInfo({
									User_HeadImg: _self.tem_Shop_Logo,
								}).then(ret=>{

									uni.showToast({
										title: '修改成功',
										icon: 'success'
									});
									_self.User_HeadImg = res.data.User_HeadImg;
									_self.userInfo.User_HeadImg = res.data.User_HeadImg;
									_self.setUserInfo(_self.userInfo);

									uni.hideLoading()
								}).catch(e=>{
									uni.hideLoading()
									// uni.showModal({
									// 	title: '提示',
									// 	content: '设置图片为头像失败'
									// });
								})
							},
							fail:(err)=>{
								// uni.showModal({
								// 	title:'文件上传',
								// 	content:JSON.stringify(err)
								// })

								uni.showModal({
									title: '提示',
									content: '上传图片错误'+JSON.stringify(err)
								});
							},
							complete:()=>{

								uni.hideLoading()
								// uni.showModal({
								// 	title:'文件上传',
								// 	content:JSON.stringify(ret)
								// })

							}
						});

						// #endif


					},
					fail(e) {

						uni.showModal({
							title: '提示',
							content: '选择图片错误'+JSON.stringify(e),
							success: function (res) {

							}
						});
					}
				});
			},
		},
		computed: {
			...mapGetters(['userInfo'])
		}
	}
</script>

<style scoped lang="scss">
	.bgColor-white{
		height: 100vh;
	}
	.msg {
		padding: 0 22rpx;
		.item {
			display: flex;
			align-items: center;
			padding: 39rpx 0;
			border-bottom: 1px solid #E3E3E3;
			.item-name {
				font-size: 30rpx;
				color: #333;
			}
			.info {
				display: flex;
				align-items: center;
				flex: 1;
				text-align: right;
				margin-right: 20rpx;
				justify-content: flex-end;
				font-size: 26rpx;
				color: #999999;
				.image {
					width: 88rpx;
					height: 88rpx;
					border-radius: 44rpx;
				}
			}
			.go {
				display: flex;
				align-items: center;
				width: 15rpx;
				height: 23rpx;
				image {
					width: 100%;
					height:100%;
				}
			}
		}
	}
</style>
