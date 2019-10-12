<template>
	<view>
		<page-title title="财富排行榜" rightHidden="true" ></page-title>
		<view class="all">
			<view class="checked">
				总部分销商
			</view>
			<view>
				我的好友
			</view>
		</view>
		<view class="mains">
			<view class="paiming">
				<view class="pai1">
					排名
				</view>
				<view class="pai2">
					爵位
				</view>
				<view class="pai3">
					佣金
				</view>
			</view>
			<view class="content">
				<view class="contentLeft">
					<view class="ming">
						<image src="/static/fenxiao/first.png" ></image>
					</view>
					<view class="info">
						<image src="/static/fenxiao/person.png" ></image>
					</view>
					<view class="nickName">
						莫小贝
					</view>
				</view>
				<view class="contentCenter">
					无
				</view>
				<view class="contentRight">
					¥<text>1280.00</text>
				</view>
			</view>
			<view class="content">
				<view class="contentLeft">
					<view class="ming">
						<image src="/static/fenxiao/second.png" ></image>
					</view>
					<view class="info">
						<image src="/static/fenxiao/person.png" ></image>
					</view>
					<view class="nickName">
						莫小贝
					</view>
				</view>
				<view class="contentCenter">
					无
				</view>
				<view class="contentRight">
					¥<text>1280.00</text>
				</view>
			</view>
			<view class="content">
				<view class="contentLeft">
					<view class="ming">
						<image src="/static/fenxiao/three.png" ></image>
					</view>
					<view class="info">
						<image src="/static/fenxiao/person.png" ></image>
					</view>
					<view class="nickName">
						莫小贝
					</view>
				</view>
				<view class="contentCenter">
					无
				</view>
				<view class="contentRight">
					¥<text>1280.00</text>
				</view>
			</view>
			<view class="content">
				<view class="contentLeft">
					<view class="ming">
						4
					</view>
					<view class="info">
						<image src="/static/fenxiao/person.png" ></image>
					</view>
					<view class="nickName">
						莫小贝
					</view>
				</view>
				<view class="contentCenter">
					无
				</view>
				<view class="contentRight">
					¥<text>1280.00</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	view,div{
		box-sizing: border-box;
	}
.all{
	height: 95rpx;
	width: 750rpx;
	padding-left: 133rpx;
	padding-right: 133rpx;
	display: flex;
	justify-content: space-between;
	border-bottom: 1rpx solid #ECE8E8;
	view{
		width: 202rpx;
		height: 95rpx;
		line-height: 95rpx;
		position: relative;
		text-align: center;
		font-size: 30rpx;
		color: #333333;
	}
	.checked{
		color: #F43131 !important;	
	}
	.checked:after{
		content: '';
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 202rpx;
		height: 3rpx;
		background-color: #F43131;
	}
}
.mains{
	margin-top: 40rpx;
	width: 710rpx;
	margin: 0 auto;
	box-shadow:0px 0px 18rpx 0px rgba(0, 0, 0, 0.18);
	border-radius:10rpx;
	.paiming{
		padding-top: 38rpx;
		padding-bottom: 20rpx;
		padding-left: 33rpx;
		display: flex;
		view{
			font-size: 28rpx;
			height: 26rpx;
			line-height: 26rpx;
			color: #333333;
		}
		.pai1{
			width: 320rpx;
		}
		.pai2{
			width: 150rpx;
		}
		.pai3{
			width: 207rpx;
			text-align: center;
		}
	}
	.content{
		width: 690rpx;
		height: 103rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-bottom: 1rpx solid #ECE8E8;
		display: flex;
		align-items: center;
		.contentLeft{
			width: 326rpx;
			margin-left: 17rpx;
			display: flex;
			align-items: center;
			.ming{
				width: 41rpx;
				height: 56rpx;
				line-height: 56rpx;
				margin-right: 24rpx;
				text-align: center;
				color: #777777;
				font-size: 32rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.info{
				width: 53rpx;
				height: 53rpx;
				border-radius: 50%;
				margin-right: 14rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.nickName{
				height: 53rpx;
				line-height: 53rpx;
				font-size: 24rpx;
				color: #777777;
			}
		}
		.contentCenter{
			width: 150rpx;
			font-size:24rpx;
			color: #777777;
		}
		.contentRight{
			width: 207rpx;
			text-align: center;
			font-size: 22rpx;
			color: #F43131;
			text{
				font-size: 26rpx;
			}
		}
	}
}
</style>
