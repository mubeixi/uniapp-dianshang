<template>
	<view>
		<page-title title="自定义分享" rightHidden="true"></page-title>
		<textarea class="edit"  contenteditable="true" placeholder="请输入分享语" placeholder-style="place">
			
		</textarea>
		<view class="submit">
			提交
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	
	export default {
		mixins:[pageMixin],
		data() {
			return {
				
			};
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
