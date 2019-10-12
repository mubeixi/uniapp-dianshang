<template>
	<view>
		<view class="banner">
			<image src="../../static/pop_default.jpg" ></image>
			<view class="content">
				<view class="title">推广小助手</view>
				<view class="item">
					<view class="sub-title">内容链接</view>	
					<input class="website" type="text" placeholder="请在这里粘贴网址">
				</view>
				<view class="item">
					<view class="sub-title">选择链接</view>
					<text>链接方式： </text>
					 <label class="radio"><radio value="r1" checked="true" />商城链接</label>
					 <label class="radio"><radio value="r2" />图文链接</label>
				</view>
				<view class="item">
					<view class="sub-title">联系方式</view>
					<form @submit="" >
						<input type="text" value="" placeholder="请在此输入你的姓名" />
						<input type="text" value="" placeholder="请在此输入你的电话" />
						<input type="text" value="" placeholder="请在此输入你的QQ" />
						<input type="text" value="" placeholder="请在此输入你的邮箱" />
						<button form-type="submit">提交</button>
						<button >转发详情</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.banner {
		width: 100%;
		height: 400rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.content {
		font-size: 28rpx;
		padding: 0 30rpx;
		.title {
			line-height: 100rpx;
			font-size: 32rpx;
			font-weight: 700;
		}
		.item {
			.sub-title {
				font-size: 30rpx;
				font-weight: 700;
				line-height: 80rpx;
			}
			.website {
				border: 1px solid #efefef;
				color: #efefef;
				height: 70rpx;
				line-height: 70rpx;
				padding-left: 20rpx;
			}
			form input[type='text']{
				border: 1px solid #efefef;
				margin: 20rpx 0;
			}
		}
	}
</style>
