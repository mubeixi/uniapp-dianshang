<template>
	<view class="myall" @click="commonClick">
		<view class="user-info">
			<view class="user-avator" @click="changeAvator">
				<image  class="imgs" :src="Shop_Logo" mode=""></image>
				<view class="xiangji" :style="{backgroundImage:'url('+$fun.domainFn('/static/client/fenxiao/xj.png')+')'}" ></view>
			</view>
			<view class="change" @click="changeAvator">更换头像</view>
		</view>
		<view class="content">
			<view class="c_1"><text>店名</text><input class="inputs" type="text" v-model="Shop_Name"  /></view>
			<view class="c_2"><text>公告</text><textarea v-model="Shop_Announce" class="text-content"></textarea></view>
		</view>
		<view class="submit" @click="save">保存</view>
	</view>
</template>

<script>
	import {getUserDisInfo,updateUserDisInfo,uploadImage,GET_ENV,get_Users_ID,get_User_ID,createToken,GET_ACCESS_TOKEN} from '../../common/fetch.js';

	import { staticUrl } from '../../common/env.js';
	import {pageMixin} from "../../common/mixin";
	import {error,toast} from "../../common";
	import {mapActions} from 'vuex';

	export default {
		mixins:[pageMixin],
		data() {
			return {
				userDisInfo: {},
				Shop_Name: '',  // 自定义店铺名称
				Shop_Logo: '',  // 自定义头像
				Shop_Announce: '' ,//自定义分享与
				imgs: [],
				arr: [],
				tem_Shop_Logo: '', //临时图片
			}
		},
		onLoad(){
			this.getUserDisInfo();
		},
		computed: {

		},
		methods: {
			getUserDisInfo() {
				getUserDisInfo({}).then(res=>{
					if(res.errorCode == 0) {
						this.userDisInfo = res.data;
						console.log(this.userDisInfo)
						this.Shop_Name = this.userDisInfo.Shop_Name;
						this.Shop_Logo = this.userDisInfo.Shop_Logo;
						this.Shop_Announce = this.userDisInfo.Shop_Announce;
					}else {

					}
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
					param.env = GET_ENV();

					if(!param.hasOwnProperty('access_token')){
						param.access_token = GET_ACCESS_TOKEN()
					}

					let data = createToken(param);

					let that=this;
					uni.chooseImage({
						count:1,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						success(res) {
							that.isSubmit=false;
							for(let item of res.tempFiles){
								that.Shop_Logo = item.path;
								that.imgs.push(item.path);

									// #ifdef MP-TOUTIAO
									let fileCTX = tt.getFileSystemManager()
									console.log(fileCTX);
									fileCTX.readFile({
										filePath:res.tempFilePaths[0],
										encoding:'base64',
										success(ret) {
											let imgs='data:image/jpeg;base64,'+ret.data;
										   uploadImage({'image':imgs}).then(result=>{
													that.tem_Shop_Logo=result.data.path;
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
										//上传图片
										uni.uploadFile({
												url: staticUrl+'/api/little_program/shopconfig.php',
												filePath: that.imgs[0],
												name: 'image',
												formData: data,
												success: (uploadFileRes) => {
													if(typeof uploadFileRes !='object' || !uploadFileRes.hasOwnProperty('data') || !uploadFileRes.data){
														error('上传文件失败')
														return;
													}
													console.log(uploadFileRes)
													uploadFileRes =	JSON.parse(uploadFileRes.data)
													that.tem_Shop_Logo = uploadFileRes.data.path;
													//是否可以提交
													that.isSubmit=true;
												}
										});
									// #endif

							}

						},
						fail(e) {
							console.log(e);
						}
					});

			},
			// 保存
			save(){
					updateUserDisInfo({
						Shop_Name: this.Shop_Name,
						Shop_Logo: this.tem_Shop_Logo,
						Shop_Announce: this.Shop_Announce
					}).then(res=>{
						console.log(res)
						if(res.errorCode == 0){
							uni.showToast({
								title: '修改成功',
								icon: 'success'
							})
							setTimeout(function(){
								uni.switchTab({
									url:"/pages/fenxiao/fenxiao"
								})
							},1000)
						}else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
			},
			...mapActions(['getInitData'])
		},
		onShow: function(){

		},
		async created(){
			let initData = await this.getInitData()
			uni.setNavigationBarTitle({
				title:initData.commi_rename.commi+'信息'
			})
		}
	}
</script>

<style scoped lang="scss">
	.myall{
		background-color: #FFFFFF !important;
		min-height: 100vh;
	}
	.user-info {
		padding-top: 47rpx;
		text-align: center;
		font-size: 26rpx;
		color: #777;
		.user-avator {
			position: relative;
			width: 120rpx;
			height: 120rpx;
			margin: 0 auto;
			.xiangji {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
				border-radius: 60rpx;
				background-color: rgba(0,0,0,.4);
				background-repeat: no-repeat;
				background-position: center center;
				background-size: 42rpx 34rpx;
			}
		}
		.imgs{
			width: 100%;
			height: 100%;
			border-radius: 60rpx;
			margin-bottom: 14rpx;
		}
		.change {
			margin-top: 14rpx;
		}
	}
	.content {
		font-size: 30rpx;
		margin-top: 57rpx;
		color: #333;
		padding-left: 19rpx;
		.c_1 {
			display: flex;
			align-items: center;
			margin-bottom: 39rpx;
			.inputs{
				width:600rpx;
				height:62rpx;
				border:1rpx solid rgba(231,231,231,1);
				margin-left: 23rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
			}
		}
		.c_2 {
			display: flex;
			align-items: center;
			.text-content {
				width:600rpx;
				height:170rpx;
				border:1rpx solid rgba(231,231,231,1);
				margin-left: 23rpx;
				padding-left: 20rpx;
				padding-top: 20rpx;
				box-sizing: border-box;
			}
		}
	}
	.submit {
		height: 80rpx;
		width: 640rpx;
		background: #F43131;
		color: #fff;
		font-size: 30rpx;
		margin: 179rpx auto 0 ;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
	}
	.cannot {
		background: #999;
	}
</style>
