<template>
	<view>
		<page-title title="填写信息" rightHidden="true" ></page-title>
		<view class="top">
			<view class="first">
				<view class="circleQ">
					<view></view>
				</view>
				<view class="lineQ">
					
				</view>
				<view class="circleQ circleW">
					<view></view>
				</view>
				<view class="lineQ">
					
				</view>
				<view class="circleQ circleW">
					<view></view>
				</view>
			</view>
			<view class="second">
				<view class="secondQ">
					填写信息
				</view>
				<view class="secondW">
					选择区域
				</view>
				<view class="secondE">
					提交审核
				</view>
			</view>
		</view>
		<view class="three">
			<view class="haha">
				姓名
			</view>
			<input type="text" placeholder="请输入您的姓名" placeholder-class="place">
		</view>
		<view class="three">
			<view class="haha">
				电话
			</view>
			<input type="text" placeholder="请输入您的电话" placeholder-class="place">
		</view>
		<view class="three">
			<view class="haha">
				级别
			</view>
			<radio-group @change="radioChange" class="myRadio">
					<view v-for="(item, index) in items" :key="item.value" class="myRadioQ">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view class="mbx">{{item.name}}</view>
					</view>
			</radio-group>

		</view>
		<view class="four">
			下一步
		</view>
		<view class="five">
			查看申请记录
			<image src="/static/fenxiao/chakan.png" ></image>
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	
	export default {
		mixins:[pageMixin],
		data() {
			return {
				items:[
					{
						name:'省级',
						value:'sheng'
					},{
						name:'市级',
						value:'shi'
					},
					{
						name:'县/区',
						value:'xian'
					}
				],
				current:0,
			};
		},
		methods:{
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.top{
	width: 750rpx;
	padding: 50rpx 83rpx;
	.first{
		padding-left: 33rpx;
		padding-right: 41rpxd;
		height: 30rpx;
		display: flex;
		align-items: center;
		.circleQ{
			width: 30rpx;
			height: 30rpx;
			border: 1px solid #F43131;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				width: 15rpx;
				height: 15rpx;
				background-color: #F43131;
				border-radius: 50%;
			}
		}
		.circleW{
			border: 1px solid #999999;
			view{
				background-color: #999999;
			}
		}
		.lineQ{
			width: 210rpx;
			height: 4rpx;
			background-color: #999999;
		}
	}
	.second{
		margin-top: 21rpx;
		height: 25rpx;
		line-height: 25rpx;
		font-size: 26rpx;
		color: #999999;
		display: flex;
		.secondQ{
			color: #F43131;
		}
		.secondW{
			margin-left: 137rpx;
		}
		.secondE{
			margin-left: 135rpx;
		}
	}
}
.three{
		height: 88rpx;
		line-height: 88rpx;
		width: 710rpx;
		margin: 0 auto;
		border-bottom: 1px solid #E7E7E7;
		display: flex;
		align-items: center;
		view.haha{
			font-size: 30rpx;
			color: #333333;
			margin-right: 42rpx;
		}
		input{
			height: 88rpx;
			line-height: 88rpx;
			font-size: 28rpx;
			color: #333333;
		}
		.place{
			font-size: 28rpx;
			color: #CAC8C8;
		}
		.myRadio{
			height: 88rpx;
			display: flex;
			.myRadioQ{
				height: 88rpx;
				display: flex;
				margin-right: 17rpx;
				radio{
					transform:scale(0.7);
				}
				.mbx{
					font-size: 28rpx;
					color: #777777;
					margin-left: 13rpx;
				}
			}
		}

	}
.four{
	width:490rpx;
	height:75rpx;
	line-height: 75rpx;
	text-align: center;
	background:rgba(244,49,49,1);
	border-radius:10rpx;
	margin: 0 auto;
	margin-top: 110rpx;
	font-size: 30rpx;
	color: #FFFFFF;
}
.five{
	height:23rpx;
	line-height: 23rpx;
	width: 174rpx;
	margin: 0 auto;
	margin-top: 21rpx;
	font-size:24rpx;
	font-weight:500;
	color:rgba(153,153,153,1);
	image{
		width: 12rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
}
</style>
