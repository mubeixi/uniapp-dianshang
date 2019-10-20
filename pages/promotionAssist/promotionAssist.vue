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
					<radio-group @change="radioChange">
						 <label class="radio" v-for="item in radioArr"><radio color="#F43131" style="transform:scale(0.7)" :value="item.value"  />{{item.name}}</label>
					 </radio-group>
				</view>
				<view class="item">
					<view class="sub-title">联系方式</view>
					<form @submit="" >
						<input type="text" value="" placeholder="请在此输入你的姓名" />
						<input type="text" value="" placeholder="请在此输入你的电话" />
						<input type="text" value="" placeholder="请在此输入你的QQ" />
						<input type="text" value="" placeholder="请在此输入你的邮箱" />
						<view class="btns">
							<button class="submit" form-type="submit">提交</button>
							<button class="share">转发详情</button>
						</view>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	
	export default {
		mixins:[pageMixin],
		data() {
			return {
				val: 'r1',
				radioArr: [
					{value: 'sc', name: '商城链接'},
					{value: 'tw', name: '图文展示'}
				],
				postData: {
					
				}
			}
		},
		methods: {
			radioChange(e) {
				console.log(e)
				let val = e.detail.value;
				console.log(val)
			}
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
				height: 70rpx;
				line-height: 70rpx;
				padding-left: 20rpx;
			}
			form input[type='text']{
				border: 1px solid #efefef;
				margin: 20rpx 0;
				height: 70rpx;
				line-height: 70rpx;
				padding-left: 60rpx;
			}
			form input[type='text']:nth-child(1) {
				background: url(../../static/tuiguang/center.png) no-repeat 10rpx center ;
				background-size: 40rpx 40rpx;
			}
			form input[type='text']:nth-child(2) {
				background: url(../../static/tuiguang/dianhua.png) no-repeat 10rpx center ;
				background-size: 40rpx 40rpx;
			}
			form input[type='text']:nth-child(3) {
				background: url(../../static/tuiguang/qq.png) no-repeat 10rpx center ;
				background-size: 40rpx 40rpx;
			}
			form input[type='text']:nth-child(4) {
				background: url(../../static/tuiguang/youxiang.png) no-repeat 10rpx center ;
				background-size: 40rpx 40rpx;
			}
			.btns {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-top: 40rpx;
				color: #fff;
				button {
					background: #F43131;
					color: #fff;
					width: 200rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
