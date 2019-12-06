<template>
    <view class="wrap">
		<view class="myTop">
			<view class="myView">
				开放时间: <text class="colorFont">2019-11-01</text>
			</view>
			<view class="myView">
				结算时间: <text class="colorFont">2019-11-01</text>
			</view>
			<view class="myView">
				订单总金额: <text class="colorRed">¥544.00</text>
			</view>
			<view class="myView">
				结算比例: <text class="colorFont">2:1</text>
			</view>
			<view class="myView">
				运费金额: <text class="colorFont">¥544.00</text>
			</view>
			<view class="myView">
				服务费: <text class="colorFont">¥544.00</text>
			</view>
			<view class="myView">
				退款金额: <text class="colorFont">¥544.00</text>
			</view>
			<view class="myView">
				实际结算: <text class="colorRed">¥544.00</text>
			</view>
		</view>
		
		<view style="background-color: #F8F8F8;height: 10px;width: 750rpx;"></view>
		
		<view class="tableTitle">
			订单数据
		</view>
		
    </view>
</template>

<script>
 
    //import {userStoreApply} from '../../common/fetch.js'
    export default {
        data() {

            return {

            }
        },
        onLoad: function(){

        },
        methods: {
	
        }
    }
</script>

<style lang="scss" scoped>
	.wrap{
		background-color: #FFFFFF;
		min-height: 100vh;
	}
	.myTop{
		padding: 30rpx 41rpx;
		font-size: 26rpx;
		color: #333333;
	}
	.myView{
		height: 60rpx;
		line-height: 60rpx;
	}
	.colorFont{
		color: #777777;
		margin-left: 16rpx;
	}
	.colorRed{
		color: #F43131;
		margin-left: 16rpx;
	}
	.tableTitle{
		width: 750rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		color: #333333;
	}
</style>
