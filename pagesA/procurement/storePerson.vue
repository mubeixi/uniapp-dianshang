<template>
	<view class="bgColor-white">


		<!-- <page-title title="个人信息" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->

		<view class="msg" v-if="storeData.Stores_ImgPath">
			<view class="item">
				<view class="item-name">门店图片</view>
				<view class="info">
					<image :src="User_HeadImg" mode="" @click="changeAvator"></image>
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
			<view class="item" @click="updateMy(3)">
				<view class="item-name">联系电话</view>
				<view class="info">
					{{storeData.Stores_Telephone}}
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>
			<view class="item" @click="updateMy(2)">
				<view class="item-name">订单短信通知号码</view>
				<view class="info">
					{{storeData.mobile}}
				</view>
				<view class="go">
					<image :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
			</view>

			<view class="item" @click="updateMy(1)">
				<view class="item-name">门店地址</view>
				<view class="info">
					{{storeData.Stores_Province_name}}
					{{storeData.Stores_City_name}}
					{{storeData.Stores_Area_name}}
					{{storeData.Stores_Address}}
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


	import {GET_ENV,getStoreDetail,get_User_ID,get_Users_ID,updateStoreInfo,uploadImage,createToken} from '../../common/fetch';
	import { staticUrl } from '../../common/env.js'
	import {pageMixin} from "../../common/mixin";
	export default {
		mixins:[pageMixin],
		data() {
			return {
				imgs: [],
				tem_Shop_Logo: '',
				User_HeadImg: '',
				storeData:[]
			}
		},
		computed: {
		    ...mapGetters(['Stores_ID'])
		},
		onShow(){
			this.getStoreDetail();
		},
		methods: {
			updateMy(index){
				uni.navigateTo({
					url: '/pagesA/procurement/storePersonEdit?type='+index
				})
			},
			getStoreDetail(){
				getStoreDetail({store_id:this.Stores_ID}).then(res=>{
					this.storeData=res.data
					this.User_HeadImg=res.data.Stores_ImgPath
				}).catch(e=>{
					console.log(e)
				})
			},
			// 更换头像
			changeAvator(){
					let _this = this;
					let param = {act:'upload_image'};
					param.User_ID = get_User_ID();
					param.Users_ID = get_Users_ID();
					// param.appid = get_Appid();
					param.env = GET_ENV();

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

									   updateStoreInfo({
									   	store_img: result.data.path,
										store_id:that.Stores_ID
									   }).then(res=>{
									   	console.log(res)
									   	if(res.errorCode == 0){
									   		uni.showToast({
									   			title: '修改成功',
									   			icon: 'success'
									   		});
									   		that.User_HeadImg = res.data.User_HeadImg;
									   		that.userInfo.User_HeadImg = res.data.User_HeadImg;
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
								console.log(filePath);
								//上传图片
								uni.uploadFile({
										url: staticUrl+'/api/little_program/shopconfig.php',
										filePath: filePath,
										name: 'image',
										formData: data,
										success: (uploadFileRes) => {
											console.log(uploadFileRes,'ssssssssss')
											uploadFileRes =	JSON.parse(uploadFileRes.data)
											that.tem_Shop_Logo = uploadFileRes.data.path;
											updateStoreInfo({
												store_img: that.tem_Shop_Logo,
												store_id:that.Stores_ID
											}).then(res=>{
												console.log(res)
												if(res.errorCode == 0){
													uni.showToast({
														title: '修改成功',
														icon: 'success'
													});
													that.User_HeadImg = res.data.User_HeadImg;
													that.userInfo.User_HeadImg = res.data.User_HeadImg;
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
