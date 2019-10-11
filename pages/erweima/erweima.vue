<template>
	<view>
		<view class="top">
			<image class="back" src="/static/fenxiao/top.png" ></image>
			<image class="msg" src="/static/fenxiao/msg.png"></image>
			<image class="go" @click="goBack" src="/static/fenxiao/goBack.png" mode=""></image>
			<view class="person">
				<image src="/static/fenxiao/person.png" ></image>
			</view>
			<view class="nickName">
				张小凡
			</view>
			<view class="ziliao">
				编辑个人资料<image class="edit" src="/static/fenxiao/edit.png" ></image>
			</view>
			<view class="putong">
				普通分销商
			</view>
		</view>
	</view>
</template>
<script>
	import {goBack}  from '../../common/tool.js'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goBack(){
				goBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
.top{
	width: 750rpx;
	height: 233rpx;
	overflow: hidden;
	position: relative;
	image.back{
		width: 100%;
	}
	.msg{
		width: 45rpx;
		height: 45rpx;
		position: absolute;
		top: 25rpx;
		right: 21rpx;
	}
	.go{
		width: 20rpx;
		height: 30rpx;
		position: absolute;
		top: 33rpx;
		left: 19rpx;
	}
	.person{
		width: 92rpx;
		height: 92rpx;
		border-radius: 50%;
		position: absolute;
		top: 103rpx;
		left: 21rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.nickName{
		height:29rpx;
		line-height: 29rpx;
		font-size:30rpx;
		font-weight:bold;
		color: #FFFFFF;
		position: absolute;
		top:115rpx ;
		left: 138rpx;
	}
	.ziliao{
		height:30rpx;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color: #FFFFFF;
		position: absolute;
		top:159rpx;
		left: 136rpx;
		.edit{
			width: 19rpx;
			height: 19rpx;
			margin-left: 18rpx;
		}
	}
	.putong{
		width:152rpx;
		height:50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #FFFFFF;
		font-size: 24rpx;
		color: #333333;
		position: absolute;
		top: 124rpx;
		right: 0rpx;
	}
}
</style>
