<template>
	<view class="all">
		<page-title title="发表评论" rightHidden="true" bgcolor="#ffffff"></page-title>
		<textarea class="edit"  contenteditable="true" placeholder="宝贝是否满足了你的期待？说说你的使用心得，分享给其他想购买的朋友吧。" placeholder-style="place">
			
		</textarea>
		
		<view class="niming">
			<view>
				匿名评价
			</view>
			<view>
				<switch checked="true"  />
			</view>
		</view>
		<view class="shangH">
			<div class="item noborder">上传照片(最多9张)</div>
			<div class="imgs">
				<view class="shangchuans" v-for="(item,index) of imgs" :key="index"   @click="yulan(index)">
					<image :src="'data:image/jpeg;base64,'+item" ></image>
					<image src="/static/delimg.png" class="del" @click="delImg(index)"></image>
				</view>
			    <view class="shangchuan" @click="addImg">
					<view class="heng"></view>
					<view class="shu"></view>
				</view>
			</div>
		</view>
		<view class="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {urlTobase64} from '../../common/tool.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				imgs:[],//上传图片预览
			};
		},
		methods:{
			//图片预览
			yulan(index){
				uni.previewImage({
				            urls: this.imgs,
							indicator:'default',
							current:index
				});
			},
			//提交
			submit(){
				uploadImage({'image':this.imgs[0]}).then(res=>{
					console.log(res)
				}).catch(e=>{
					console.log(e)
				})
			},
			//删除某张预览图片
			delImg(index){
				this.imgs.splice(index, 1);
			},
			addImg(){
				let that=this;
				uni.chooseImage({
					count:3,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有  
					success(res) {
						for(let item of res.tempFiles){
							that.imgs.push(item.path);
						}
						for(let i=0;i<that.imgs.length;i++){
							that.imgs[i]=urlTobase64(that.imgs[i]);
						}
					},
					fail(e) {
						console.log(e);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	view{
		box-sizing: border-box;
	}
	.all{
		background-color: #F8F8F8;
	}
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
		background-color: #FFFFFF;
	}
	.place{
		color: #CBCBCB !important;
		font-size: 24rpx !important;
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
	
	.niming{
		width: 710rpx;
		height: 75rpx;
		margin: 0 auto;
		padding-left: 26rpx;
		padding-right: 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.item {
	    display: flex;
	    height: 50px;
		margin-left: 23rpx;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    border-bottom: 1px solid #E3E3E3;
	}
	.spe {
	    justify-content: flex-start;
	}
	.item-left {
	    margin-right: 10px;
		font-size: 28rpx;
	}
	.item-right {
	    color: #888;
		font-size: 24rpx;
	}
	.noborder {
	    border: none;
	}
	.item-right img {
	    width: 15rpx;
	    height: 23rpx;
	    margin-left: 25rpx;
	}
	/* 上传图像 */
	.imgs {
	    display: flex;
		padding-right: 0rpx;
		flex-wrap: wrap;
		padding-left: 20rpx;
	}
	.bottom {
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 86rpx;
	    line-height: 86rpx;
		font-size: 32rpx;
	    color: #fff;
	    text-align: center;
	    background: #F43131;
		z-index: 9999;
	}
	/* 退款 */
	.methods,
	.reason {
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    z-index: 101;
	    background: #fff;
	    padding-top: 20px;
	}
	.m-title {
	    text-align: center;
	    margin-bottom: 10px;
	}
	.confirm-method {
	    background: #F43131;
	    color: #fff;
	    text-align: center;
	    line-height: 50px;
	    width: 100%;
	    margin-top: 20px;
	}
	.bMbx{
		padding: 0rpx 20rpx;
		.fMbx{
			font-size: 32rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			padding: 36rpx 0rpx;
		}
		.iMbx{
			display: flex;
			justify-content: space-between;
			height: 104rpx;
			border-bottom:1px solid rgba(230,230,230,1); 
			align-items: center;
			font-size: 28rpx;
		}
	}
	.sure{
		height: 90rpx;
		width: 100%;
		background-color: #F43131;
		color: #fff;
		font-size: 32rpx;
		margin-top: 96rpx;
		line-height: 90rpx;
		text-align: center;
	}
	.shangchuans{
		width:146rpx;
		height:146rpx;
		border:1px solid rgba(186,186,186,1);
		position: relative;
		margin-right: 28rpx;
		margin-bottom: 28rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.del{
			width: 38rpx;
			height: 38rpx;
			position: absolute;
			top: -19rpx;
			right: -19rpx;
		}
	}
	.shangchuan{
		width:146rpx;
		height:146rpx;
		border:1px solid rgba(186,186,186,1);
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
	.shangH{
		background-color: #FFFFFF;
		width: 710rpx;
		margin: 0 auto;
	}
</style>
