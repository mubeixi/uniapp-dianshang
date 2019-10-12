<template>
	<view class="team" :style="{'min-height':height+'px'}">
		<page-title title="财务明细" rightHidden="true" bgcolor="#ffffff"></page-title>
		<view class="nav">
			<view class="checked">
				分销
			</view>
			<view class="marginLeft">
				爵位
			</view>
			<view>
				股东
			</view>
		</view>
		<view class="order">
			<view>
				订单号：<text>456218637820235521278</text>    
			</view>
			<view>
				佣金金额：<text class="price">￥28.90</text>    
			</view>
			<view>
				描述：<text>自己销售秋季风衣￥899.00成功，获取佣金</text>    
			</view>
			<view>
				时间：<text>2019-10-08  11:35:42</text>    
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:1000,//获取手机屏幕高度
			};
		},
		onLoad() {
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
		}
	}
</script>

<style lang="scss" scoped>
.team{
	background-color: #F8F8F8;
	box-sizing: border-box;
	.nav{
		margin: 20rpx 70rpx;
		height: 65rpx;
		display: flex;
		view{
			width: 132rpx;
			height: 65rpx;
			line-height: 65rpx;
			font-size: 30rpx;
			color: #333333;
			text-align: center;
			position: relative;
		}
		view.checked{
			&:after{
				content: '';
				position: absolute;
				bottom: 0rpx;
				right: 0rpx;
				height: 3rpx;
				width:132rpx;
				background-color: #F43131;
			}
		}
		.marginLeft{
			margin-left: 107rpx;
			margin-right: 107rpx;
		}
	}
	.order{
		width: 710rpx;
		margin: 0 auto;
		padding: 35rpx 0rpx 40rpx 34rpx;
		background-color: #FFFFFF;
		font-size: 26rpx;
		color: #333333;
		box-sizing: border-box;
		border-radius:20rpx;
		padding-bottom: 30rpx;
		&>view{
			height: 50rpx;
			line-height: 50rpx;
			text{
				color: #666666;
			}
			.price{
				color: #F43131;
			}
		}
	}
}
</style>
