<template>
	<view class="profitSum">
		<view style="height: 90rpx;margin-bottom: 10px;font-size: 14px;">
			<view class="status fixed" :class="[status == 9 ? 'active' : '']" @click="changeStatus(9)">全部</view>
			<scroll-view class="order-status" scroll-x="true" style="width: 612rpx;white-space: nowrap;margin-left: 138rpx;" >
				
				<block v-if="Array.isArray(show_type)">
					<block v-for="(item,index) of show_type" :key="index">
						<view class="status" :class="[status == index ? 'active' : '']" @click="changeStatus(index)">{{item}}</view>
					</block>
				</block>
				<block v-else>
					<block v-for="(item,index) in show_type" :key="index">
						<view class="status" :class="[status == index ? 'active' : '']" @click="changeStatus(index)">{{item}}</view>
					</block>
				</block>
				<!-- <view class="status" :class="[status == 0 ? 'active' : '']" @click="changeStatus(0)">门店结算</view>
				<view class="status" :class="[status == 1 ? 'active' : '']" @click="changeStatus(1)">分销佣金</view>
				<view class="status" :class="[status == 2 ? 'active' : '']" @click="changeStatus(2)">股东佣金</view>
				<view class="status" :class="[status == 3 ? 'active' : '']" @click="changeStatus(3)">爵位佣金</view>
				<view class="status" style="width: 120px;" :class="[status == 4 ? 'active' : '']" @click="changeStatus(4)">区域代理佣金</view>
				<view class="status" :class="[status == 5 ? 'active' : '']" @click="changeStatus(5)">返本</view>
				<view class="status" :class="[status == 6 ? 'active' : '']" @click="changeStatus(6)">提现</view>
				<view class="status" :class="[status == 7 ? 'active' : '']" @click="changeStatus(7)">管理奖</view>
				<view class="status" :class="[status == 8 ? 'active' : '']" @click="changeStatus(8)">贡献奖</view> -->
			</scroll-view>
		</view>
		

		<view class="order" v-for="(item,i) of resData " :key="i">
			<view class="view"> 
				获取时间：<text>{{item.Record_CreateTime}}</text>
			</view>
			<view class="view">
				变更金额：<text>{{item.Record_Money}}元</text>
						
			</view >
			<view class="view">
				变更后剩余：<text >{{item.Record_Balance}}元</text>
			</view>
			<view class="view">
				变更来源：<text >{{item.Record_Type}}</text>
			</view>
			<view class="view">
				描述信息：<text >{{item.Record_Desc}}</text>
			</view>
		</view>
		<div class="defaults" v-if="resData.length<=0">
			<image :src="'/static/client/defaultImg.png'|domain" ></image>
		</div>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getBalanceDetail} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				status:9,
				totalCount:0,
				page:1,
				pageSize:10,
				resData:[],
				show_type:{}
			};
		},
		onShow() {
			
		},
		onLoad(options) {
			this.getDetail()
		},
		onReachBottom() {
			if(this.resData.length<this.totalCount){
				this.page++
				this.getDetail()
			}
		},
		methods:{
			getDetail(item){
				let data={
					page:this.page,
					pageSzie:this.pageSize
				}
				if(this.status!=9){
					data.record_type=this.status
				}
				getBalanceDetail(data).then(res=>{
					if(item=='change'){
						this.resData=res.data.list
					}else{
						this.resData=this.resData.concat(res.data.list)
					}
					this.show_type=res.data.show_type
					this.totalCount=res.totalCount
				})
			},
			changeStatus(index){
				this.status=index
				this.getDetail('change')
			}
		}
	}
</script>

<style lang="scss" scoped>
.profitSum{
	background-color: #F8F8F8;
	padding-bottom: 40rpx;
}	
	
.order-status {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color:#F6F6F6;
	 // height: 90rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	.status {
			display: inline-block;
			width: 150rpx;
			/*margin-right: 30rpx;*/
			line-height: 80rpx;
			&.active {
				color: $wzw-primary-color;
				border-bottom: 2px solid $wzw-primary-color;
			}
	}
	& .status:nth-last-child(1){
		margin-right:0;
	}
}

.status {
		display: inline-block;
		width: 138rpx;
		/*margin-right: 30rpx;*/
		line-height: 80rpx;
		text-align: center;
		&.active {
			color: $wzw-primary-color;
			border-bottom: 2px solid $wzw-primary-color;
		}
}
.fixed{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color:#F6F6F6;
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
		margin-bottom: 20rpx;
		.view{
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

.defaults{
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
/deep/ .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
}
</style>
