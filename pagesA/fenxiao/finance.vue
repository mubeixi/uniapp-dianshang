<template>
	<view @click="commonClick" class="team">
		<!-- #ifdef APP-PLUS -->
		<!--		<view class="status_bar" style="background-color: rgb(248, 248, 248);"></view>-->
		<!-- #endif -->
		<!-- <page-title title="财务明细" rightHidden="true" bgcolor="#ffffff"></page-title> -->
		<scroll-view scroll-x="true" class="scroll-nav-box">
			<view class="nav">
				<view :class="index==0?'checked':''" @click="change(0)" class="views">
					{{$t('1065x0')}}
				</view>
				<view :class="index==1?'checked':''" @click="change(1)" class="views">
					{{$t('1065x1')}}
				</view>
				<view :class="index==4?'checked':''" @click="change(4)" class="views">
					{{$t('1065x2')}}
				</view>
				<view :class="index==2?'checked':''" @click="change(2)" class="views">
					{{$t('1065x3')}}
				</view>
				<view :class="index==3?'checked':''" @click="change(3)" class="views">
					{{$t('1065x4')}}
				</view>
			</view>
		</scroll-view>
		<view style="width: 100%;height: 105rpx;background-color: #FFFFFF;"></view>
		<block v-if="pro.length > 0">
			<view :key="i" class="order" v-for="(item,i) of pro ">
				<view>
					{{$t('1065x5')}}
					<text>{{index == 4 ? item.order_id : item.Order_ID}}</text>
				</view>
				<view>
					{{$t('1065x6')}}
					<text class="price" v-if="index==2 || index == 4||index==3">￥{{(index == 2||index==3) ?item.Record_Money :
            item.record_money}}
					</text>
					<text class="price" v-else>￥{{item.money}}</text>
				</view>
				<view>
					{{$t('1065x7')}}
					<text v-if="index==2||index==3">{{item.Record_Type_desc}}</text>
					<text v-else>{{index == 4 ? item.descr :item.desc}}</text>
				</view>
				<view>
					{{$t('1065x8')}}
					<text>{{item.Record_CreateTime}}</text>
				</view>
			</view>
		</block>
		<div class="defaults" v-else>
			<image :src="'/static/client/defaultImg.png'|domain"></image>
		</div>
	</view>
</template>

<script>
	import {
		pageMixin
	} from '../../common/mixin'
	import {
		getAgentRecordList,
		getDisRecordList,
		getManageRecordList,
		getNobiRecordList,
		getShaRecordList
	} from '../../common/fetch.js'
	import {
		error
	} from '@/common'

	import T from '@/common/langue/i18n'
	export default {
		mixins: [pageMixin],
		data() {
			return {
				height: 1000, // 获取手机屏幕高度
				page: 1,
				pageSize: 5,
				pro: [],
				index: -1,
				totalCount: 0
			}
		},
		onShow() {
			this.change(this.index)
		},
		onLoad(options) {
			const that = this
			if (options.index) {
				this.index = options.index
			} else {
				this.index = 0
			}
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.screenHeight - 68
				}
			})
		},
		onReachBottom() {
			if (this.totalCount > this.pro.length) {
				this.page++
				this.geDetail()
			}
		},
		methods: {
			change(item) {
				// if(item==this.index) return
				this.pro = []
				this.page = 1
				this.index = item
				this.geDetail()
			},
			geDetail() {
				const data = {
					page: this.page,
					pageSize: this.pageSize
				}
				if (this.index == 0) {
					getDisRecordList(data).then(res => {
						for (const item of res.data) {
							this.pro.push(item)
						}
						this.totalCount = res.totalCount
					}).catch(e => {

					})
				} else if (this.index == 1) {
					getNobiRecordList(data).then(res => {
						for (const item of res.data) {
							this.pro.push(item)
						}
						this.totalCount = res.totalCount
					}).catch(e => {

					})
				} else if (this.index == 2) {
					getShaRecordList(data).then(res => {
						for (const item of res.data) {
							this.pro.push(item)
						}
						this.totalCount = res.totalCount
					}).catch(e => {

					})
				} else if (this.index == 4) {
					getManageRecordList(data).then(res => {
						for (const item of res.data) {
							this.pro.push(item)
						}
						this.totalCount = res.totalCount
					}).catch(() => {
						error(T._('1065d0'))
					})
				} else {
					getAgentRecordList(data).then(res => {
						for (const item of res.data) {
							this.pro.push(item)
						}
						this.totalCount = res.totalCount
					}).catch(e => {

					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.team {
		background-color: #F8F8F8 !important;
		min-height: 100vh;
		box-sizing: border-box;
		.scroll-nav-box{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			padding-top: 14rpx;
		}
		.nav {
			display: flex;
			.views {
				padding: 0 10rpx;
				height: 65rpx;
				line-height: 65rpx;
				font-size: 30rpx;
				color: #333333;
				text-align: center;
				position: relative;
			}

			.checked {
				&:after {
					content: '';
					position: absolute;
					bottom: 0rpx;
					height: 4rpx;
					width: 132rpx;
					background-color: #F43131;
					left: 50%;
					transform: translateX(-50%);
				}
			}

			.marginLeft {
				margin-left: 107rpx;
				margin-right: 107rpx;
			}
		}

		.order {
			width: 710rpx;
			margin: 0 auto;
			padding: 35rpx 0rpx 40rpx 34rpx;
			background-color: #FFFFFF;
			font-size: 26rpx;
			color: #333333;
			box-sizing: border-box;
			border-radius: 20rpx;
			padding-bottom: 30rpx;
			margin-bottom: 10px;

			&>view {
				//height: 50rpx;
				line-height: 50rpx;

				text {
					color: #666666;
				}

				.price {
					color: #F43131;
				}
			}
		}
	}

	.defaults {
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
</style>
