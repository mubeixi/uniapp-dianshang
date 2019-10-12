<template>
	<view class="all">
		<view class="top">
			<image src="/static/task/left.png" class="goBack" @click="goBack"></image>
			<view class="titles">会员等级</view>
			<scroll-view class="center"  scroll-x="true">
				<view class="vipFir ">
					<image src="/static/task/vip.png" class="allImg"></image>
					<image src="/static/task/vips.png" class="leftImg"></image>
					<view class="vipGrade">
						VIP4
					</view>
					<view class="dangqian">
						当前等级
					</view>
				</view>
				<view class="vipFir  ">
					<image src="/static/task/vip.png" class="allImg"></image>
					<image src="/static/task/vips.png" class="leftImg"></image>
					<view class="vipGrade">
						VIP4
					</view>
					<view class="dangqian">
						当前等级
					</view>
				</view>
			</scroll-view>
			
		</view>
		<view style="height: 220rpx;"></view>
		<circleTitle title="VIP4权益" ></circleTitle>
		<view class="mbxa">
			
		</view>
	</view>
</template>

<script>
	import {goBack}  from '../../common/tool.js'
	import circleTitle from '../../components/circleTitle/circleTitle.vue'
	export default {
		data() {
			return {
				
			};
		},
		components:{
			circleTitle
		},
		methods:{
			goBack(){
				goBack();
			},
			scroll: function(e) {
			            console.log(e)
			            this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{
	background-color: #F8F8F8;
}
.top{
	width:750rpx;
	height:300rpx;
	background:rgba(64,61,61,1);
	position: relative;
	.goBack{
		width: 20rpx;
		height: 30rpx;
		position: absolute;
		top: 29rpx;
		left: 20rpx;
	}
	.titles{
		color: #FFFFFF;
		font-size: 32rpx;
		position: absolute;
		top: 28rpx;
		left: 310rpx;
		height: 31rpx;
		line-height: 31rpx;
	}
	.center{
		position: absolute;
		top: 117rpx;
		left: 3rpx;
		width: 750rpx;
		height: 325rpx;
		white-space: nowrap;
		.vipFir{
			width: 665rpx;
			height: 325rpx;
			display: inline-block;
			// position: absolute;
			// top: 0rpx;
			// left: 0rpx;
			position: relative;
			image.allImg{
				width: 100%;
				height: 100%;
			}
			.leftImg{
				width: 31rpx;
				height: 29rpx;
				position: absolute;
				top:39rpx ;
				left: 47rpx;
			}
			.vipGrade{
				height:24rpx;
				font-size:30rpx;
				font-family:Adobe Heiti Std;
				font-weight:normal;
				color:rgba(77,77,88,1);
				line-height:24rpx;
				position: absolute;
				top: 42rpx;
				left: 91rpx;
			}
			.dangqian{
				height:23rpx;
				line-height: 23rpx;
				font-size:24rpx;
				font-weight:500;
				color:rgba(77,77,88,1);
				position: absolute;
				top: 42rpx;
				right: 48rpx;
			}
		}
	}
	
}
.mbxa{
	margin-top: 20rpx;
}

</style>
