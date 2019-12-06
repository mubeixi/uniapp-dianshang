<template>
	<view class="team" >
		<!-- #ifdef APP-PLUS -->
<!--		<view class="status_bar" style="background-color: rgb(248, 248, 248);"></view>-->
		<!-- #endif -->
		<!-- <page-title title="我的团队" rightHidden="true" bgcolor="#ffffff"></page-title> -->
		<view style="width: 100%;height: 20rpx;"></view>
		<view class="teamName" v-if="pro.disInfo">
			<view class="teamImg">
				<image :src="pro.disInfo.Shop_Logo"></image>
			</view>
			<view class="teamInfo">
				<view class="nickName">
					{{pro.disInfo.Shop_Name}}
				</view>
				<view class="tuijianren">
					推荐人：{{pro.disInfo.Parent_NickName}}
				</view>
			</view>
		</view>
		<view class="teamContent">
			<view class="teamNumber">
				<image class="image" src="data:image/png;base64,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" ></image>
				<view class="viewq">团队总人数</view>
			</view>
			<view class="teamGrade" v-for="(item,index) of pro.team_level_count" :key="index" @click="goMyNumber(index)">
				<view class="views">
					{{item.title}}
				</view>
				<view class="views">
					<text>{{item.count}}</text><image class="img" :src="'/static/client/fenxiao/right.png'|domain"></image>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getDisTeamCount} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				height:1000,//获取手机屏幕高度
				pro:[],
			};
		},
		onLoad() {
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
			this.getDisTeamCount();
		},
		onShow() {

		},
		methods:{
			goMyNumber(item){
				let items=item+1;
				uni.navigateTo({
					url:'/pagesA/fenxiao/myTeamNumber?index='+items
				})
			},
			getDisTeamCount(){
				getDisTeamCount().then(res=>{
					if(res.errorCode==0){
						this.pro=res.data;
					}
				}).catch(e=>{
					console.log(e)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.team{
	background-color: #F8F8F8;
	min-height: 100vh;
	box-sizing: border-box;
	.teamName{
		margin: 30rpx 0rpx 30rpx 20rpx;
		margin-top: 0rpx;
		display: flex;
		.teamImg{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			overflow: hidden;
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
			.image{
				width: 35rpx;
				height: 33rpx;
			}
			.viewq{
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
			.img{
				width: 15rpx;
				height: 23rpx;
				margin-right: 8rpx;
				margin-left: 16rpx;
			}
			.views{
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
