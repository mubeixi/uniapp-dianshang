<template>
	<view class="team" :style="{'min-height':height+'px'}">
		<page-title title="我的团队" rightHidden="true" bgcolor="#ffffff"></page-title>
		<view class="teamName">
			<view class="teamImg">
				<image src="/static/fenxiao/person.png"></image>
			</view>
			<view class="teamInfo">
				<view class="nickName">
					坚果是个姑娘
				</view>
				<view class="tuijianren">
					推荐人：张小凡
				</view>
			</view>
		</view>
		<view class="teamContent">
			<view class="teamNumber">
				<image src="/static/fenxiao/teamNumber.png" ></image>
				<view>团队总人数</view>
			</view>
			<view class="teamGrade">
				<view>
					一级分销商
				</view>
				<view>
					<text>20</text><image src="/static/fenxiao/right.png"></image>
				</view>
			</view>
			<view class="teamGrade">
				<view>
					二级分销商
				</view>
				<view>
					<text>20</text><image src="/static/fenxiao/right.png"></image>
				</view>
			</view>
			<view class="teamGrade">
				<view>
					三级分销商
				</view>
				<view>
					<text>20</text><image src="/static/fenxiao/right.png"></image>
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
.team{
	background-color: #F8F8F8;
	box-sizing: border-box;
	.teamName{
		margin: 30rpx 0rpx 30rpx 20rpx;
		display: flex;
		.teamImg{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.teamInfo{
			margin-left: 18rpx;
			padding-top: 11rpx;
			padding-bottom: 18rpx;
			.nickName{
				height:28rpx;
				font-size:30rpx;
				line-height: 28rpx;
				color: #333333;
			}
			.tuijianren{
				height:23rpx;
				line-height: 23rpx;
				color: #777777;
				font-size:24rpx;
				margin-top: 15rpx;
			}
		}
	}
	.teamContent{
		width: 710rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		.teamNumber{
			height: 93rpx;
			padding-left: 23rpx;
			display: flex;
			align-items: center;
			image{
				width: 35rpx;
				height: 33rpx;
			}
			view{
				margin-left:16rpx;
				font-size:28rpx;
				color: #333333;
				font-weight:bold;
			}
		}
		.teamGrade{
			width: 690rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
			height: 87rpx;
			border-bottom: 1rpx solid #ECE8E8;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				width: 15rpx;
				height: 23rpx;
				margin-right: 8rpx;
				margin-left: 16rpx;
			}
			view{
				font-size: 26rpx;
				color: #666666;
				margin-left: 19rpx;
			}
			
		}
		& view.teamGrade:last-child{
			border-bottom: 0rpx;
		}
	}
}

</style>
