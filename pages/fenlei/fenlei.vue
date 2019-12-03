<template>
	 <view>
		<view class="list">
			<view class="imgViews">
				<image class="imgs" :src="'/uploadfiles/wkbq6nc2kc/image/20191031170410175.jpg'|domain"></image>
				<view class="times">
					<view class="countdown">
						距离开始还有 : {{countdown.d}}天<text class="time">{{countdown.h}}</text>时<text class="time">{{countdown.m}}</text>分<text class="time">{{countdown.s}}</text>秒
					</view>
					<view class="stock">
						秒杀库存120
					</view>
				</view>
			</view>
			<view class="title">
				卡通水晶绒四件套双面绒儿童被套床单法兰绒女床上用品冬季珊瑚绒刺绣工艺-优质水晶绒
			</view>
			<view class="prices">
				<view class="price">
					<text class="leftPrice">
						秒杀价<text class="rmb">¥<text class="priceX">89.90</text></text>
					</text>
					<text class="rightPrice">
						￥169.90
					</text>
				</view>
				<view class="btn">
					立即预约
				</view>
			</view>
		</view>
	 </view>
</template>

<script>
import {getGroupCountdown}  from '../../common/tool.js'
import {pageMixin} from "../../common/mixin";
export default {
	mixins:[pageMixin],
  name: 'App',
  components: {
  },
  data() {
    return {
		countdown:{d:0,h:0,m:0,s:0},
    }
  },
  onShow() {
  	this.getDetail();
  },
  methods: {
	    getDetail(){
		   window.groupStam = setInterval(this.stampCount,1000)
	    },
		stampCount(){
				let rt  = {};
				let computedStamp = getGroupCountdown()
				if(computedStamp){
					rt = computedStamp
				}else{
					//如果不对，就清空
					window.clearInterval(window.groupStam)
				}
				this.countdown = rt
		}
  }
}
</script>

<style scoped lang="scss">
.list{
	width: 750rpx;
	height: 462rpx;
	padding-bottom: 60rpx;
	.imgViews{
		width: 100%;
		height: 320rpx;
		position: relative;
		.imgs{
			width: 100%;
			height: 100%;
		}
		.times{
			position: absolute;
			bottom: 0rpx;
			left: 0rpx;
			width: 750rpx;
			height: 55rpx;
			background:rgba(0,0,0,1);
			opacity:0.6;
			padding-left: 19rpx;
			padding-right: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			.countdown{
				height: 37rpx;
				font-size: 22rpx;
				color: #FFFFFF;
				.time{
					display: inline-block;
					font-size: 24rpx;
					height: 37rpx;
					width: 37rpx;
					line-height: 37rpx;
					text-align: center;
					background-color: red;
					z-index: 999;
					margin-left: 7rpx;
					margin-right: 7rpx;
				}
			}
			.stock{
				font-size: 20rpx;
				height: 20rpx;
				line-height: 20rpx;
				color: #FFFFFF;
			}
		}
	}
	.title{
		width: 100%;
		height: 66rpx;
		line-height: 33rpx;
		padding-left: 20rpx;
		padding-right: 28rpx;
		margin-top: 25rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #333333;
	}
	.prices{
		width: 750rpx;
		box-sizing: border-box;
		height: 50rpx;
		padding-left: 20rpx;
		padding-right: 21rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 2rpx;
		.btn{
			width: 135rpx;
			height: 50rpx;
			background-color: #F43131;
			border-radius: 10rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 26rpx;
			color: #FFFFFF;
		}
		.price{
			height: 27rpx;
				.leftPrice{
					font-size: 22rpx;
					color: #777777;
					.rmb{
						color: #F43131;
						font-size: 24rpx;
						margin-left: 5rpx;
						margin-right: 5rpx;
					}
					.priceX{
						font-size: 30rpx;
						color: #F43131;
						font-weight: bold;
					}
				}
				.rightPrice{
					font-size: 24rpx;
					color: #B4B4B4;
					text-decoration:line-through;
					margin-left: 23rpx;
				}
		}
	}

}

</style>
