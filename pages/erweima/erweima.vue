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
		<view class="tuiguang">
			<view class="title">
				复制推广链接分享给好友
			</view>
			<view class="inputSec">
				<input type="text" value="http://csqy.haofenxiao.net/apl/uv3dn85c00/" disabled>
				<text>复制</text>
			</view>
		</view>
		<view class="last">
			<view class="first">
				<view class="left">
					<image src="/static/fenxiao/weixin.png" ></image>
					<view>微信二维码</view>
				</view>
				<view class="right">
					<image src="/static/fenxiao/chongsheng.png" ></image>
					<view>重生微信二维码</view>
				</view>
			</view>
			<view style="width: 100%;height: 1rpx;background-color: #F3F3F3;"></view>
			<view class="second">
				<view class="left">
					<image src="/static/fenxiao/tuiguangerweima.png" ></image>
					<view>推广二维码</view>
				</view>
				<view class="right">
					<image src="/static/fenxiao/chongshengtuiguang.png" ></image>
					<view>重生推广二维码</view>
				</view>
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
		border-radius:152rpx 0px 0px 152rpx;
	}

}
.tuiguang{
	height: 182rpx;
	width: 750rpx;
	padding: 50rpx 21rpx 22rpx 20rpx;
	box-sizing: border-box;
	.title{
		height:27rpx;
		font-size:28rpx;
		color: #333333;
		font-weight:500;
	}
	.inputSec{
		margin-top: 28rpx;
		height: 55rpx;
		display: flex;
		input{
			width: 580rpx;
			height: 55rpx;
			border: 1px solid #B3B3B3;
			color: #999999;
			font-size: 26rpx;
			padding-left: 18rpx;
			box-sizing: border-box;
		}
		text{
			width: 100rpx;
			height: 55rpx;
			line-height: 55rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			background-color: #F43131;
			text-align: center;
			margin-left: 29rpx;
		}
	}
}
.last{
	width: 710rpx;
	height: 433rpx;
	margin: 0 auto;
	margin-top: 28rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0rpx 15rpx 0px rgba(0, 0, 0, 0.18);
	view.first,view.second{
		width: 710rpx;
		height: 216rpx;
		display: flex;
		position: relative;
		view.left,view.right{
			width: 50%;
			text-align: center;
			position: relative;
			image{
				width: 79rpx;
				height: 79rpx;
			}
			view{
				font-size: 28rpx;
				color: #333333;
			}
		}
		view.left:after{
			content: '';
			position: absolute;
			top: 68rpx;
			right: 0;
			height: 81rpx;
			width:1rpx;
			background-color: #E8E8E8;
		}
	}
	view.first image{
		margin-top: 46rpx;
	}
	view.second image{
		margin-top: 38rpx;
	}
}
</style>
