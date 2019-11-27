<template>
	<view>
		<view class="topImg">
			<view class="topAll">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					在售产品
				</view>
			</view>

			<view class="topAll">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					库存紧张
				</view>
			</view>

			<view class="topAll">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					统计价值
				</view>
			</view>

			<view class="topAll">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					退货/取消
				</view>
			</view>
			
		</view>
		
		<view class="marginAuto">
			<view class="blockDiv">
				<view class="mbxa" v-if="isShow">
					<image class="imgs" :src="uncheck_img_url" ></image>
				</view>
				<view style="width: 10rpx" v-if="!isShow">
				</view>
				<view class="imgDiv">
					<image class="imgHund" src="/static/pro.png"></image>
				</view>
				<view class="textRight" :style="{width: isShow?'415':'425'+'rpx'}">
					<view class="productName">
						2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙仙女裙时尚新款短袖蕾丝拼接荷叶边波点雪纺连衣裙仙女裙时尚
					</view>
					<view class="skuMy">
						库存：1586       销量：863
					</view>
					<view class="bottomDiv">
						<view class="skuCount">
							规格库存
						</view>
						<view class="allPrice">
							总价值：<span class="span1">¥</span><span class="span2">153135</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {domainFn} from "../../common/filter";
	export default {
		data() {
			return {
				checked_img_url:'/static/client/checked.png',
				uncheck_img_url:'/static/client/uncheck.png',
				isShow:true
			};
		},
		onShow() {
			this.checked_img_url = domainFn(this.checked_img_url)
			this.uncheck_img_url = domainFn(this.uncheck_img_url)
		}
	}
</script>

<style lang="scss" scoped>
.topImg{
	box-sizing: border-box;
	width: 750rpx;
	height: 180rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.topAll{
	width: 120rpx;
	text-align: center;
}
.imgHund{
	width: 100%;
	height: 100%;
}
.ulDiv{
	width: 78rpx;
	height: 78rpx;
	margin: 0 auto;
}
.font-13{
	font-size: 13px;
	color: #333333;
	margin-top: 14rpx;
}
.marginAuto{
	width: 710rpx;
	margin: 0 auto;
	background-color: #FFFFFF;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 20rpx 26rpx 18rpx 10rpx;
}
.blockDiv{
	width: 664rpx;
	margin-bottom: 30rpx;
	height: 220rpx;
	display: flex;
}
.imgDiv{
	width: 220rpx;
	height: 220rpx;
}
.textRight {
	padding-top: 16rpx;
	padding-left: 19rpx;
	width: 425rpx;
}
.productName{
	width:100%;
	height: 60rpx;
	line-height: 30rpx;
	overflow: hidden;
	font-size: 13px;
	color: #333333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.skuMy{
	color: #666666;
	font-size: 12px;
	margin-top: 28rpx;
}
.bottomDiv{
	margin-top: 20rpx;
	height: 46rpx;
	display: flex;
	align-content: center;
	justify-content: space-between;
}
.skuCount{
	width: 120rpx;
	height: 46rpx;
	background-color: #FFF2F1;
	font-size: 11px;
	color: #666666;
	text-align: center;
	line-height: 46rpx;
}
.allPrice{
	font-size: 24rpx;
	color: #666666;
	height: 46rpx;
	line-height: 46rpx;
}
.span1{
	color: #F43131;
}
.span2{
	color: #F43131;
	font-size: 28rpx;
	margin-left: 4rpx;
}
.mbxa{
		display: flex;
		align-items: center;
		margin-right: 10rpx;
		.imgs{
			width: 34rpx;
			height: 34rpx;
		}
	}
</style>
