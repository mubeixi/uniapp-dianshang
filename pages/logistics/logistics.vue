<template>
	<view class="all" :style="{'min-height':height+'px'}">
		<page-title title="物流追踪" rightHidden="true" bgcolor="#ffffff" ></page-title>
		<view class="wuliu box-sizing">
			<image src="http://vod.q172.net/image/default/BC434C55F50940D2B4B09B7FECFD150E-6-2.png"></image>
			<view>
				<view class="fonts">
					<view class="left">
						物流状态: 
					</view>
					<view class="right">
						已签收
					</view>
				</view>
				<view class="fonts">
					<view class="left">
						物流公司: 
					</view>
					<view>
						顺丰快递
					</view>
				</view>
				<view class="fonts">
					<view class="left">
						物流单号: 
					</view>
					<view>
						4546448558888			                        
					</view>
				</view>
				<view class="fonts">
					<view class="left">
						派送员电话: 
					</view>
					<view>
						95500			                        
					</view>
				</view>
			</view>
		</view>
		<view class="box-sizing xiangxi">
			<view class="center">
				<view class="lefts">
					<view class="tops">
						<view></view>
					</view>
					<view class="bottoms">
						
					</view>
				</view>
				<view class="rights">
					<view class="tops">
						本人签收
					</view>
					<view class="bottoms">
						2019-01-20  12:20:30
					</view>
				</view>
			</view>
			<view class="center">
				<view class="lefts">
					<view class="tops unBgcolor">
						<view></view>
					</view>
					<view class="bottoms">
						
					</view>
				</view>
				<view class="rights">
					<view class="tops unColor">
						派送中，沈阳天河派件员，罗大汪正在派件
					</view>
					<view class="bottoms">
						2019-01-19  12:20:30
					</view>
				</view>
			</view>
			<view class="center">
				<view class="lefts">
					<view class="tops unBgcolor">
						<view></view>
					</view>
					<!-- <view class="bottoms" >
						
					</view> -->
				</view>
				<view class="rights">
					<view class="tops unColor">
						已发货
					</view>
					<view class="bottoms">
						2019-01-10  12:20:30
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
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

<style scoped lang="scss">
.all{
	background-color: #f8f8f8;
}
.wuliu{
	width:710rpx;
	height:200rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	margin: 0 auto;
	margin-top: 40rpx;
	padding-top: 27rpx;
	padding-left: 32rpx;
	display: flex;
	padding-bottom: 10rpx;
	image{
		width: 72rpx;
		height: 72rpx;
		margin-right: 30rpx;
	}
	.fonts{
		font-size: 24rpx;
		color: #999999;
		display: flex;
		height: 40rpx;
		line-height: 30rpx;
		.left{
			margin-right: 10rpx;
		}
		.right{
			color: #F43131;
		}
	}
}
.xiangxi{
	margin-top: 25rpx;
	width:710rpx;
	background:#FFFFFF;
	border-radius:20rpx;
	padding: 45rpx 0rpx 0rpx 42rpx;
	margin: 0 auto;
	.center{
		height: 136rpx;
		width: 626rpx;
		display: flex;
		.lefts{
			width: 32rpx;
			height: 136rpx;
			position: relative;
			.tops{
				width: 32rpx;
				height: 32rpx;
				background-color: #FFE4E4;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				view{
					width: 16rpx;
					height: 16rpx;
					background-color: #F43131;
					border-radius: 50%;
				}
			}
			.bottoms{
				width: 4rpx;
				height: 104rpx;
				background-color: #ECECEC;
				position: absolute;
				top: 32rpx;
				left: 14rpx;
			}
		}
		.rights{
			margin-left: 28rpx;
			.tops{
				font-size: 28rpx;
				color: #F43131;
				height: 30rpx;
				line-height: 30rpx;
			}
			.bottoms{
				margin-top: 19rpx;
				font-size: 24rpx;
				color: #AAAAAA;
				height: 30rpx;
				line-height: 30rpx;
			}
		}
		.unColor{
			color: #777777 !important;
		}
		.unBgcolor{
			background-color: #ECECEC !important;
			&>view{
				background-color: #AFAFAF !important;
			}	
		}

	}
}


</style>
