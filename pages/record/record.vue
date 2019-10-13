<template>
	<view class="all" :style="{'min-height':height+'px'}">
		<page-title title="申请记录" rightHidden="true" bgcolor="#ffffff"></page-title>
		<view class="main">
			<view class="fir">
				<view class="left">
					申请区域：
				</view>
				<view class="right">
					河南省
				</view>
			</view>
			<view class="fir">
				<view class="left">
                    状态：
				</view>
				<view class="rights">
					已拒绝
				</view>
				<view class="rightt">
					信息填写不完整
				</view>
			</view>
			<view class="fir">
				<view class="left">
			        时间：
				</view>
				<view class="right">
                    2019-10-08  17:34:12 
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
	.all{
		background-color: #f8f8f8;
	}
	.main{
		width: 710rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 28rpx 0rpx 32rpx 27rpx;
		.fir{
			height: 48rpx;
			display: flex;
			font-size: 26rpx;
			align-items: center;
			.left{
				color: #333333;
				margin-right: 20rpx;
			}
			.right{
				color: #888888;
			}
			.rightt{
				color: #888888;
				margin-left: 20rpx;
			}
			.rights{
				color: #F43131;
			}
		}
	}
</style>
