<template>
	<view>
		<view class="titleImg">
			<image src="/static/distributor/bedistributor.jpg" mode=""></image>
		</view>
		<view class="center">
					<view class="mbx">
						姓名
					</view>
					<input type="text" placeholder="请输入您的姓名" placeholder-style="color: #CAC8C8;">
				</view>
				<view class="center">
					<view class="mbx">
						电话
					</view>
					<input type="text" placeholder="请输入您的电话" placeholder-style="color: #CAC8C8;">
				</view>
				<view class="center">
					<view class="mbx">
						身份证
					</view>
					<input type="text" placeholder="请输入您的身份证" placeholder-style="color: #CAC8C8;">
				</view>

				<view class="checks">
					<label class="radio" @click="changes">
						<radio :checked="isS" style="transform:scale(0.7)"/><text>同意<text class="checkq">{{str}}</text></text>
					</label>
				</view>

				<view class="submits">
					立即购买成为分销商
				</view>


				<view class="qwe">
					<view class="imgs">
						<image src="../../static/default.png"></image>
					</view>
					<view class="nickName">
						小兔子的店
					</view>
					<view class="liji">
						立即加入成为分销商
					</view>
					<view class="haha">
						立即加入
					</view>
				</view>
		</view>
</template>

<script>
	import {disApplyInit} from '../../common/fetch.js';
	export default {
		data() {
			return {
				str:'《购买须知》',
				isS:false
			};
		},
		onLoad() {
			this.disApplyInit();
		},
		methods:{
			disApplyInit(){
				disApplyInit().then(res=>{
					console.log(res)
				}).catch(e=>{
					console.log(e)
				})
			},
			changes(){
				this.isS=!this.isS;
			}
		},

	}
</script>

<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.titleImg{
	width: 750rpx;
	height: 330rpx;
	margin-bottom: 25rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.center{
	height: 98rpx;
	width: 710rpx;
	margin: 0 auto;
	border-bottom: 1rpx solid #E7E7E7;
	display: flex;
	align-items: center;
	.mbx{
		width:110rpx;
		font-size: 30rpx;
		color: #333333;
	}
	input{
		width: 600rpx;
		font-size: 28rpx;
	}
}
.checks{
	font-size: 20rpx;
	color: #333333;
	display: flex;
	align-items: center;
	margin-top: 33rpx;
	margin-left: 4rpx;
}
.checkq{
	color: #69A1FF;
	margin-left: 10rpx;
}

.submits{
	width:620rpx;
	height:80rpx;
	line-height: 80rpx;
	background:rgba(244,49,49,1);
	border-radius:20rpx;
	margin: 0 auto;
	font-size: 34rpx;
	color: #FFFFFF;
	text-align: center;
	margin-top: 130rpx;
}

.qwe{
	width:750rpx;
	height:100rpx;
	position: fixed;
	bottom: 0rpx;
	left: 0rpx;
	background:rgba(64,61,61,1);
	display: flex;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 24rpx;
	.imgs{
		width: 68rpx;
		height: 68rpx;
		border-radius: 50%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.nickName{
		font-size: 30rpx;
		color: #FFFFFF;
		margin-left: 16rpx;
	}
	.liji{
		margin-left: 113rpx;
		font-size: 22rpx;
		color: #FFFFFF;
	}
	.haha{
		width:140rpx;
		height:50rpx;
		background:rgba(244,49,49,1);
		border-radius:10rpx;
		position: absolute;
		top: 25rpx;
		right: 20rpx;
		font-size: 26rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 50rpx;
	}
}
</style>
