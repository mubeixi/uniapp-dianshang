<template>
	<view @click="commonClick" class="bgColor-white">


		<!-- <page-title title="个人信息" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->

		<view class="msg">
			<view class="item" @click="changeAvator">
				<view class="item-name">头像</view>
				<view class="info">
					<image :src="User_HeadImg" ></image>
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
	export default {
		mixins:[pageMixin],
		data() {
			return {
				imgs: [],
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

		},
		onShow(){
			this.User_HeadImg = this.userInfo.User_HeadImg;
			this.get_user_info();
		},
		methods: {
			...mapActions(['getUserInfo','setUserInfo']),
			update(num){
				if(num==2){
					if(this.userInfo.User_Birthday!=0){
						uni.showToast({
							title:'生日不允许修改',
							icon:'none'
						})
						return
					}
				}
				uni.navigateTo({
					url: '../person/editPersonalMsg?type=' + num
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
				let _this = this;
					// let data={
					// 	'timestamp':'1502263578',
					// 	'sign':'DA1525TR85D6S5A9E5236FDSWD52F147WA',
					// 	'sortToken':1,
					// 	'act':'upload_image',
					// 	'env': GET_ENV(),
					// 	'Users_ID': get_Users_ID()
					// };

					let param = {act:'upload_image'};
					param.User_ID = get_User_ID();
					param.Users_ID = get_Users_ID();
					// param.appid = get_Appid();
					param.env = GET_ENV();

					if(!param.hasOwnProperty('access_token')){
						param.access_token = GET_ACCESS_TOKEN()
					}

					let data = createToken(param);

					let that=this;
					uni.chooseImage({
						count:1,
						// #ifndef MP-TOUTIAO
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						// #endif
						success(res) {
							for(let item of res.tempFiles){
								that.User_head = item.path;
								that.imgs.push(item.path);
							}
							// #ifdef MP-TOUTIAO
							let fileCTX = tt.getFileSystemManager()
							console.log(fileCTX);
							fileCTX.readFile({
								filePath:res.tempFilePaths[0],
								encoding:'base64',
								success(ret) {
									let imgs='data:image/jpeg;base64,'+ret.data;
								   uploadImage({'image':imgs}).then(result=>{

									   upDateUserInfo({
									   	User_HeadImg: result.data.path,
									   }).then(res=>{
									   	console.log(res)
									   	if(res.errorCode == 0){
									   		uni.showToast({
									   			title: '修改成功',
									   			icon: 'success'
									   		});
									   		that.User_HeadImg = res.data.User_HeadImg;
									   		that.userInfo.User_HeadImg = res.data.User_HeadImg;
									   		that.setUserInfo(that.userInfo);
									   	}else {
									   		uni.showToast({
									   			title: res.msg,
									   			icon: 'none'
									   		})
									   	}
									   })
								   },err=>{

								   }).catch(e=>{

								   })
								},
								fail(ret) {
								  console.log(ret,`run fail`);
								},
								complete(ret) {
								  console.log(`run done`);
								}
							})
							// #endif



							// #ifndef MP-TOUTIAO
								let filePath = res.tempFilePaths[0];
								console.log(filePath,JSON.stringify(data));
								//上传图片
								uni.uploadFile({
										url: apiBaseUrl+'/api/little_program/shopconfig.php',
										filePath: filePath,
										name: 'image',
										formData: data,
										success: (uploadFileRes) => {
											console.log(uploadFileRes,'ssssssssss')
											if(typeof uploadFileRes !='object' || !uploadFileRes.hasOwnProperty('data') || !uploadFileRes.data){
												error('上传文件失败')
												return;
											}
											uploadFileRes =	JSON.parse(uploadFileRes.data)
											that.tem_Shop_Logo = uploadFileRes.data.path;
											upDateUserInfo({
												User_HeadImg: that.tem_Shop_Logo,
											}).then(res=>{
												console.log(res)
												if(res.errorCode == 0){
													uni.showToast({
														title: '修改成功',
														icon: 'success'
													});
													that.User_HeadImg = res.data.User_HeadImg;
													that.userInfo.User_HeadImg = res.data.User_HeadImg;
													that.setUserInfo(that.userInfo);
												}else {
													uni.showToast({
														title: res.msg,
														icon: 'none'
													})
												}
											})
										}
								});
							// #endif
							// for(var i in that.imgs){

							// }

						},
						fail(e) {
							console.log(e);
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
				image {
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
