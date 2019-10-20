<template>
	<view>
		<page-title title="分销商信息" rightHidden="true" bgcolor="#F8F8F8"></page-title>
		<view class="user-info">
			<view class="user-avator">
				<image :src="Shop_Logo" mode=""></image>
				<view class="xiangji" v-if="canEdit"></view>
			</view>
			<view class="change" @click="changeAvator">更换头像</view>
		</view>
		<view class="content">
			<view class="c_1"><text>店名</text><input type="text" v-model="Shop_Name" :disabled="!canEdit" /></view>
			<view class="c_2"><text>公告</text><input type="text" v-model="Shop_Announce" :disabled="!canEdit" /></view>
		</view>
		<view class="submit" :class=" canEdit?'' : 'cannot'" @click="save">保存</view>
	</view>
</template>

<script>
	import {getUserDisInfo,updateUserDisInfo,uploadImage} from '../../common/fetch.js';
	import {uploadImages} from '../../common/tool.js'
	export default {
		data() {
			return {
				userDisInfo: {},
				canEdit: false   ,//用户是否可以编辑
				Shop_Name: '',  // 自定义店铺名称
				Shop_Logo: '',  // 自定义头像
				Shop_Announce: '' ,//自定义分享与
				imgs: [],
				arr: []
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
						this.canEdit = this.userDisInfo.Distribute_Customize == 1
					}else {
						
					}
				})
			},
			// 更换头像
			changeAvator(){
				let _this = this;
				if(this.canEdit) {
					let data={
						'timestamp':'1502263578',
						'sign':'DA1525TR85D6S5A9E5236FDSWD52F147WA',
						'sortToken':1,
						'act':'upload_image'
					};
					let that=this;
					uni.chooseImage({
						count:3,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有  
						success(res) {
							that.isSubmit=false;
							for(let item of res.tempFiles){
								that.Shop_Logo = item.path;
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
							console.log(e);
						}
					});
				}
			},
			// 保存
			save(){
				if(this.canEdit){
					let data={
						'timestamp':'1502263578',
						'sign':'DA1525TR85D6S5A9E5236FDSWD52F147WA',
						'sortToken':1,
						'act':'upload_image'
					};
					uploadImage({image: this.Shop_Logo}).then(res=>{
						console.log(res)
					})
					
					return;
					let that=this;
					uni.chooseImage({
						count:1,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有  
						success(res) {
							uploadImage({image: res.tempFiles}).then(res=>{
								console.log(res)
								
								this.Shop_Logo = res.tempFilePaths[0]
							})
						},
						fail(e) {
							console.log(e);
						}
					});
					updateUserDisInfo({
						Shop_Name: this.Shop_Name,
						Shop_Logo: this.Shop_Logo,
						Shop_Announce: this.Shop_Announce
					}).then(res=>{
						console.log(res)
					})
				}
			}
		},
		onShow: function(){
			
		}
	}
</script>

<style scoped lang="scss">
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
				background: rgba(0,0,0,.4) url(../../static/fenxiao/xj.png) no-repeat center center;
				background-size: 42rpx 34rpx;
			}
		}
		image {
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
			input {
				width:520rpx;
				height:62rpx;
				border:1rpx solid rgba(231,231,231,1);
				margin-left: 23rpx;
				padding-left: 20rpx;
			}
		}
		.c_2 {
			display: flex;
			align-items: center;
			input {
				width:520rpx;
				height:170rpx;
				border:1rpx solid rgba(231,231,231,1);
				margin-left: 23rpx;
				padding-left: 20rpx;
			}
		}
	}
	.submit {
		height: 80rpx;
		width: 620rpx;
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
