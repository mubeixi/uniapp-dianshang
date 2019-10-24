<template>
	<view class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<page-title title="我的兑换" bgcolor="#ffffff"></page-title>
		
		<view class="myHa">
			<view class="tops">
				<view>
					订单编号：12345679875
				</view>
				<view class="times">
					<image src="/static/check/time.png"></image>
					2019-04-26
				</view>
			</view>
			<view class="last">
				<image src="/static/detail/sahre3.png" ></image>
				<view class="myRight">
					<view class="titles">
						<view class="leftM">
							市领导哈里斯大家啊胜利大街爱上了多久了
						</view>
						<view class="rightM">
							未发货
						</view>
					</view>
					<view class="rty">
						<image src="/static/check/ji.png" mode=""></image>
						<text>888</text>
					</view>
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
view{
	box-sizing: border-box;
}
.all{
	background-color: #F8F8F8;
}
.myHa{
	width:700rpx;
	height:320rpx;
	background:rgba(255,255,255,1);
	border-radius:40rpx;
	margin: 0  auto;
	margin-top:25rpx;
	.tops{
		padding: 34rpx 22rpx 0rpx 21rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #888888;
		view{
			height: 25rpx;
			line-height: 25rpx;
		}
		.times{
			height: 19rpx;
			line-height: 19rpx;
			margin-top: 6rpx;
		}
		image{
			width: 17rpx;
			height: 17rpx;
			margin-right: 10rpx;
		}
	}
	.last{
		margin-top: 59rpx;
		margin-left: 20rpx;
		width: 680rpx;
		height: 176rpx;
		display: flex;
		image{
			width: 176rpx;
			height: 176rpx;
		}
		.myRight{
			width: 504rpx;
			padding-left: 15rpx;
			padding-top: 16rpx;
			.rty{
				margin-top: 30rpx;
				image{
					width: 16rpx;
					height: 17rpx;
				}
				text{
					margin-left: 6rpx;
					color: #FE6444;
					font-size: 32rpx;
				}
			}
			.titles{
				height: 42rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.leftM{
					height: 27rpx;
					width: 300rpx;
					overflow: hidden;
					font-size: 28rpx;
					line-height: 27rpx;
					color: #333333;
					font-weight: 300;
				}
				.rightM {
					width: 114rpx;
					height: 42rpx;
					line-height: 42rpx;
					text-align: center;
					font-size: 24rpx;
					color: #FFFFFF;
					background-color: #cdcdcd;//#FF5C33已发货颜色  #f8e9e8已完成颜色
					border-top-left-radius: 114rpx;
					border-bottom-left-radius: 114rpx;
				}
			}
		}
	}
	
}
</style>
