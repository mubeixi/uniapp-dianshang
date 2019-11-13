<template>
	<view>
		<view class="list">
			<view class="bargain group">
				<image :src="'/static/client/person/pin.png'|domain" class="left"></image>
				<view class="pintuan">
					关于我们
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<view class="bargain group">
				<image :src="'/static/client/person/pin.png'|domain" class="left"></image>
				<view class="pintuan">
					联系我们
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>

			<view class="bargain">
				<image :src="'/static/client/person/kan.png'|domain" class="left"></image>
				<view class="pintuan">
					版本更新
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<view class="bargain" @click="goGift">
				<image :src="'/static/client/person/zengpin.png'|domain" class="left"></image>
				<view class="pintuan">
					意见反馈
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>
			<view class="bargain"  @click="goRenwu">
				<image :src="'/static/client/person/renwu.png'|domain" class="left"></image>
				<view class="pintuan">
					清空缓存
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>

		</view>
		<view class="margin15">
			<button @click="logoutFunc" type="warn">退出登录</button>
		</view>

	</view>
</template>

<script>
	import {confirm} from "../../common";
	import {ls} from "../../common/tool";
	import {mapActions} from 'vuex';

	export default {
		data() {
			return {

			};
		},
		methods:{
			...mapActions(['setUserInfo']),
			logoutFunc(){
				confirm({title:'操作提示',content:'是否退出登录'}).then(res=>{


					// #ifdef APP-PLUS
					//取消设备绑定
					console.log("取消设备绑定")
					bindUserClientId({action:'clear'},{errtip:false}).then(res=>{console.log('注册取消绑定成功')},err=>{}).catch(error=>{})
					// #endif

					//只需要商户id

					let users_id = ls.get('users_id');

					ls.clear();

					// #ifdef MP-TOUTIAO || MP-WEIXIN
					//头条小程序，还没有ext.json机制，需要走这里。
					//微信小程序，因为重新启动会覆盖，所以这里也没有必要清除掉了。
					ls.set('users_id',users_id);
					// #endif


					this.setUserInfo({})

					uni.switchTab({
						url:'/pages/index/index'
					})

				}).catch(()=>{

				})
			}
		}
	}
</script>

<style lang="less">
	.list{
		width: 750rpx;
		//height: 533rpx;
		margin: 0  auto;
		background-color: #FFFFFF;
		border-radius:20rpx;

		box-sizing: border-box;
		.line{
			height:1px;
			background:rgba(236,232,232,1);
		}
		.bargain{
			border-bottom: 1px solid rgba(236,232,232,1) ;
		}
		.group{
			height: 94rpx;
			display: flex;
			align-items: center;
			.left{
				width: 33rpx;
				height: 31rpx;
				margin-left: 7rpx;
			}
			.right{
				width: 17rpx;
				height: 26rpx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.bargain{
			height: 86rpx;
			padding-left: 22rpx;
			padding-right: 18rpx;
			display: flex;
			align-items: center;
			.left{
				width: 32rpx;
				height: 34rpx;
				margin-left: 7rpx;
			}
			.right{
				width: 17rpx;
				height: 26rpx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.setting{
			height: 90rpx;
			display: flex;
			align-items: center;
			.left{
				width: 36rpx;
				height: 36rpx;
				margin-left: 7r4px;
			}
			.right{
				width: 17rpx;
				height: 26rpx;
				margin-left: auto;
				margin-right: 4rpx;
			}
			.pintuan{
				margin-left: 13rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}

	}
</style>
