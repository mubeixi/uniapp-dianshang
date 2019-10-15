<template>
	<view class="all" :style="{'min-height':height+'px'}">
		<page-title  title="我的赠品" bgcolor="#ffffff"></page-title>
		<view class="nav">
			<view :class="checked==0?'checked':''" @click="change(0)">
				未领取
			</view>
			<view :class="checked==1?'checked':''" @click="change(1)">
				已领取
			</view>
			<view :class="checked==2?'checked':''" @click="change(2)">
				已过期
			</view>
		</view>
		
		<view class="center">
			<view class="tops">
				八月十五中秋之礼
			</view>
			<view class="bottoms">
				<view class="tupian">
					<image src="/static/fenxiao/top.png" ></image>
				</view>
				<view class="neirong">
					<view class="titles">
						2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛
					</view>
					<view class="button">
						<view class="sku">颜色：白色</view>
						<view class="chakan">查看订单</view>
					</view>
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
				checked:0,//选中
			};
		},
		onLoad() {
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
		},
		methods:{
			change(item){
				this.checked=item;
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{
	background-color: #F8F8F8;
}
view{
	box-sizing: border-box;
}
.nav{
	margin: 0 auto;
	margin: 20rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #333333;
	view{
		width: 236rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		position: relative;
		&.checked{
			color: #F43131;
			&:after{
				content: '';
				display: flex;
				width: 135rpx;
				height: 3rpx;
				background-color: #F43131;
				position: absolute;
				bottom: 0rpx;
				left: 50rpx;
			}
		}
	}
}

.center{
	margin: 0 auto;
	margin-bottom: 25rpx;
	width: 710rpx;
	height: 288rpx;
	background-color: #FFFFFF;
	.tops{
		width: 710rpx;
		height: 64rpx;
		line-height: 64rpx;
		padding-left: 20rpx;
		font-size: 26rpx;
		color: #333333;
		border-bottom: 1rpx solid #ECE8E8;
	}
	.bottoms{
		height: 224rpx;
		width: 710rpx;
		padding: 20rpx;
		display: flex;
		view.tupian{
			width: 184rpx;
			height: 184rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.neirong{
			margin-left: 23rpx;
			height: 184rpx;
			width: 463rpx;
			.titles{
				font-size: 26rpx;
				color: #333333;
				width: 451rpx;
				height: 71rpx;
				line-height: 36rpx;
				margin-top: 18rpx;
				margin-left: 2rpx;
				display: -webkit-box;
				-webkit-line-clamp:2;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
			}
			.button{
				width: 463rpx;
				margin-top: 22rpx;
				height: 55rpx;
				display: flex;
				.sku{
					font-size: 24rpx;
					color: #888888;
					height: 23rpx;
					line-height: 23rpx;
				}
				.chakan{
					width:155rpx;
					height:55rpx;
					line-height: 55rpx;
					text-align: center;
					background:rgba(244,49,49,1);
					border-radius:28rpx;
					margin-left: auto;
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}
		}
	}
}
</style>
