<template>
	<view class="all">
		<view class="top">
			<image src="/static/task/left.png" class="goBack" @click="goBack"></image>
			<view class="titles">每日签到</view>
			<view class="yuan">
				<image src="/static/task/yuan.png"></image>
				<image src="/static/task/qiandao.png" class="qiandao"></image>
				<view class="qiandaoliji">
					立即签到
				</view>
			</view>
			<view class="msg">
				坚持每天连续签到可以获多重奖励哦
			</view>
		</view>
		
		<view class="jilu">
			<view class="chang">
				<image src="/static/task/checked.png" ></image>
				<view>
					第1天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
			<view class="chang">
				<image src="/static/task/unchecked.png" ></image>
				<view>
					第2天
				</view>
			</view>
		</view>
		<view class="err">
			<image src="/static/task/err.png" mode=""></image>
			温馨提示
		</view>
		<view class="last">
			每日签到可获得10成长值和10优币的奖励，连续完成15天签到以上可额外获得奖励，连续签满15天后将会重置签到记录
		</view>
	</view>
</template>

<script>
	import {goBack}  from '../../common/tool.js'
	import {pageMixin} from "../../common/mixin";
	
	export default {
		mixins:[pageMixin],
		data() {
			return {
				
			};
		},
		methods:{
			goBack(){
				goBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{
	view{
		box-sizing: border-box;
	}
	.top{
		width:750rpx;
		height:447rpx;
		background:linear-gradient(#E74744,#FAB067);
		position: relative;
		.goBack{
			width: 20rpx;
			height: 30rpx;
			position: absolute;
			top: 35rpx;
			left: 20rpx;
		}
		.titles{
			color: #FFFFFF;
			font-size: 32rpx;
			position: absolute;
			top: 34rpx;
			left: 310rpx;
			height: 31rpx;
			line-height: 31rpx;
		}
		.yuan{
			width: 261rpx;
			height: 262rpx;
			position: absolute;
			top: 108rpx;
			left: 240rpx;
			.qiandaoliji{
				height:26rpx;
				line-height: 26rpx;
				font-size:28rpx;
				color: #F43131;
				position: absolute;
				top:157rpx ;
				left: 75rpx;
			}
			.qiandao{
				width: 46rpx;
				height: 46rpx;
				position: absolute;
				top:85rpx ;
				left: 107rpx;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
		.msg{
			width:750rpx;
			height:22rpx;
			line-height: 22rpx;
			font-size:22rpx;
			color: #FFFFFF;
			text-align: center;
			position: absolute;
			bottom: 29rpx;
			text-align: center;
		}
	}
	.jilu{
		margin: 0 auto;
		margin-top: 44rpx;
		width: 690rpx;
		padding: 44rpx 0rpx 10rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 16rpx 0px rgba(0, 0, 0, 0.25);
		border-radius:15rpx;
		.chang{
			width: 107rpx;
			height: 127rpx;
			margin-bottom: 53rpx;
			margin-right: 25rpx;
			position: relative;
			image{
				width: 100%;
				height: 100%;
			}
			view{
				width: 107rpx;
				height: 45rpx;
				line-height: 45rpx;
				font-size: 20rpx;
				color: #666666;
				text-align: center;
				position: absolute;
				bottom: 5rpx;
			}
		}
	}
	.err{
		margin-top: 47rpx;
		margin-left: 32rpx;
		height: 23rpx;
		font-size: 24rpx;
		color: #999999;
		display: flex;
		align-items: center;
		image{
			width: 22rpx;
			height: 23rpx;
			margin-right: 9rpx;
		}
	}
	.last{
		margin-top: 19rpx;
		margin-left: 32rpx;
		margin-right: 47rpx;
		font-size: 20rpx;
		color: #999999;
		height: 40rpx;
		line-height: 40rpx;
	}
	
}
</style>
