<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<page-title title="个人信息" rightHidden="true" bgcolor="#F8F8F8"></page-title>
		<!-- #endif -->
		<view class="msg">
			<view class="item">
				<view class="item-name">头像</view>
				<view class="info">
					<image :src="User_HeadImg" mode="" @click="changeAvator"></image>
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(0)">
				<view class="item-name">用户名</view>
				<view class="info">
					{{userInfo.User_Name}}
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(1)">
				<view class="item-name">昵称</view>
				<view class="info">
					{{userInfo.User_NickName}}
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			
			<view class="item" @click="update(3)">
				<view class="item-name">邮箱</view>
				<view class="info">
					{{userInfo.User_Email}}
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="update(4)">
				<view class="item-name">详细地址</view>
				<view class="info">
					{{User_Province_name}}{{User_City_name}}{{User_Area_name}}{{User_Tow_name}}{{User_Address}}
				</view>
				<view class="go">
					<image src="../../static/right.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex';
	import {GET_ENV,get_Users_ID,upDateUserInfo,get_user_info} from '../../common/fetch.js';
	import { staticUrl } from '../../common/env.js';
	import { ls } from '../../common/tool.js';
	export default {
		data() {
			return {
				imgs: [],
				tem_Shop_Logo: '',
				User_HeadImg: '',
				userInfo:'',
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
			this.userInfo=ls.get('userInfo');
			this.User_HeadImg = this.userInfo.User_HeadImg;
			this.get_user_info();
		},
		methods: {
			...mapActions(['getUserInfo','setUserInfo']),
			update(num){
				uni.navigateTo({
					url: '../editPersonalMsg/editPersonalMsg?type=' + num
				})
			},
			get_user_info(){
				get_user_info().then(res=>{
					console.log(res)
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
					let data={
						'timestamp':'1502263578',
						'sign':'DA1525TR85D6S5A9E5236FDSWD52F147WA',
						'sortToken':1,
						'act':'upload_image',
						'env': GET_ENV(),
						'Users_ID': get_Users_ID()
					};
					let that=this;
					uni.chooseImage({
						count:1,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有  
						success(res) {
							for(let item of res.tempFiles){
								that.User_head = item.path;
								that.imgs.push(item.path);
								for(var i in that.imgs){
									//上传图片
									uni.uploadFile({
											url: staticUrl+'/api/little_program/shopconfig.php',
											filePath: that.imgs[i],
											name: 'image',
											formData: data,
											success: (uploadFileRes) => {
												console.log(uploadFileRes)
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
								}	
							}
							
						},
						fail(e) {
							console.log(e);
						}
					});
			},
		},
		computed: {
			// ...mapGetters(['userInfo'])
		}
	}
</script>

<style scoped lang="scss">
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
