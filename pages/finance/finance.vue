<template>
	<view class="team" :style="{'min-height':height+'px'}">
		<!-- #ifdef APP-PLUS -->
<!--		<view class="status_bar" style="background-color: rgb(248, 248, 248);"></view>-->
		<!-- #endif -->
		<!-- <page-title title="财务明细" rightHidden="true" bgcolor="#ffffff"></page-title> -->
		<view class="nav">
			<view :class="index==0?'checked':''" @click="change(0)">
				分销
			</view>
			<view :class="index==1?'checked':''" @click="change(1)">
				爵位
			</view>
			<view :class="index==2?'checked':''"  @click="change(2)">
				股东
			</view>
			<view :class="index==3?'checked':''"  @click="change(3)">
				区域代理
			</view>
		</view>
		<view style="width: 100%;height: 105rpx;" ></view>
		<view class="order" v-for="(item,i) of pro " :key="i">
			<view>
				订单号：<text>{{item.Order_ID}}</text>
			</view>
			<view>
				佣金金额：<text class="price" v-if="index==2">￥{{item.Record_Money}}</text>
						<text class="price" v-else>￥{{item.money}}</text>
			</view>
			<view>
				描述：<text v-if="index==2">{{item.Record_Type_desc}}</text>
					 <text v-else>{{item.desc}}</text>
			</view>
			<view>
				时间：<text v-if="index==2">{{item.Order_CreateTime}}</text>
					 <text v-else>{{item.Record_CreateTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getNobiRecordList,getDisRecordList,getShaRecordList,getAgentRecordList} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				height:1000,//获取手机屏幕高度
				page:1,
				pageSize:5,
				pro:[],
				index:0,
				totalCount:0,
			};
		},
		onShow() {
			this.change(this.index);
		},
		onLoad(options) {
			let that=this;
			this.index=options.index;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
		},
		onReachBottom() {
			if(this.totalCount>this.pro.length){
				this.page++;
				this.geDetail();
			}
		},
		methods:{
			change(item){
				this.pro=[];
				this.page=1;
				this.index=item;
				this.geDetail();
			},
			geDetail(){
				let data={
					page:this.page,
					pageSize:this.pageSize
				}
				if(this.index==0){
					getDisRecordList(data).then(res=>{
						if(res.errorCode==0){
							for(let item of res.data){
								this.pro.push(item)
							}
							this.totalCount=res.totalCount;
						}
				
					}).catch(e=>{
						console.log(e);
					})
				}else if(this.index==1){
					getNobiRecordList(data).then(res=>{
						if(res.errorCode==0){
							for(let item of res.data){
								this.pro.push(item)
							}
							this.totalCount=res.totalCount;
						}
					}).catch(e=>{
						console.log(e);
					})
				}else if(this.index==2){
					getShaRecordList(data).then(res=>{
						if(res.errorCode==0){
							for(let item of res.data){
								this.pro.push(item)
							}
							this.totalCount=res.totalCount;
						}
					}).catch(e=>{
						console.log(e);
					})
				}else{
					getAgentRecordList(data).then(res=>{
						if(res.errorCode==0){
							for(let item of res.data){
								this.pro.push(item)
							}
							this.totalCount=res.totalCount;
						}
					}).catch(e=>{
						console.log(e);
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.team{
	// background-color: #F8F8F8;
	box-sizing: border-box;
	.nav{
		padding: 20rpx 70rpx;
		padding-left: 0rpx;
		padding-right: 0rpx;
		height: 105rpx;
		box-sizing: border-box;
		width: 750rpx;
		display: flex;
		position: fixed;
		background-color: #F8F8F8;
		justify-content: space-around;
		z-index: 999;
		top: 0rpx;
		left: 0rpx;
		view{
			width: 150rpx;
			height: 65rpx;
			line-height: 65rpx;
			font-size: 30rpx;
			color: #333333;
			text-align: center;
			position: relative;
		}
		view.checked{
			&:after{
				content: '';
				position: absolute;
				bottom: 0rpx;
				right: 0rpx;
				height: 4rpx;
				width:132rpx;
				background-color: #F43131;
			}
		}
		.marginLeft{
			margin-left: 107rpx;
			margin-right: 107rpx;
		}
	}
	.order{
		width: 710rpx;
		margin: 0 auto;
		padding: 35rpx 0rpx 40rpx 34rpx;
		background-color: #FFFFFF;
		font-size: 26rpx;
		color: #333333;
		box-sizing: border-box;
		border-radius:20rpx;
		padding-bottom: 30rpx;
		&>view{
			//height: 50rpx;
			line-height: 50rpx;
			text{
				color: #666666;
			}
			.price{
				color: #F43131;
			}
		}
	}
}
</style>
