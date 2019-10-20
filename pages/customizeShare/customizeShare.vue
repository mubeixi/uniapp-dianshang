<template>
	<view>
		<page-title title="自定义分享" rightHidden="true"></page-title>
		<textarea class="edit"  contenteditable="true" placeholder="请输入分享语" placeholder-style="place" v-model="Shop_Announce">
			
		</textarea>
		<view class="submit" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getUserDisInfo,updateUserDisInfo} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				Shop_Announce:''
			};
		},
		onShow() {
			//获取自定义信息
			this.getUserDisInfo();
		},
		methods:{
			//修改自定义分享
			submit(){
				if(!this.Shop_Announce){
					uni.showToast({
						title:"还没有写分享语",
						icon:"none"
					})
					return;
				}
				let data={
					Shop_Announce:this.Shop_Announce
				}
				updateUserDisInfo(data).then(res=>{
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}).catch(e=>{
					console.log(e);
				})
			},
			//获取自定义信息
			getUserDisInfo(){
				getUserDisInfo().then(res=>{
					if(res.errorCode==0){
						this.Shop_Announce=res.data.Shop_Announce;
					}
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit{
		box-sizing: border-box;
		width: 710rpx;
		height: 338rpx;
		border:1px solid rgba(233,233,233,1);
		border-radius:10px;
		margin: 0 auto;
		margin-top: 42rpx;
		padding-top: 23rpx;
		padding-left: 27rpx;
		padding-right: 40rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.place{
		color: #B9B9B9;
		font-size: 28rpx !important;
	}
	.submit{
		width: 690rpx;
		height: 80rpx;
		margin: 0 auto;
		background-color: #F43131;
		line-height: 80rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		margin-top: 65rpx;
	}

</style>
