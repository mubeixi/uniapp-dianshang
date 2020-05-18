<template>
	<view style="background-color: #F8F8F8;height: 100vh;">
		<div class="navs">
		    <div class="nav-item" :class="index==0?'active':''" @click="changIndex(0)">
				全部
			</div>
		    <div class="nav-item" :class="index==1?'active':''" @click="changIndex(1)">
				待审核
			</div>
		    <div class="nav-item" :class="index==2?'active':''" @click="changIndex(2)">
				已通过
			</div>
		    <div class="nav-item" :class="index==3?'active':''" @click="changIndex(3)">
				已驳回
			</div>

		</div>
		<view class="space-box" style="height: 100rpx;width: 100%;margin-bottom: 30rpx;">
		</view>

		<div class="store-apply" v-for="(item,index) of proList" :key="index">
				<div class="store-apply-title">
					<image :src="item.store_image" class="store-img"></image>
					<div class="store-name">{{item.store_name}}</div>
					<div class='store-desc flex flex-vertical-center' @click="changeShow(item)">
						<block v-if="item.status==1">
							<span class='status-store' @click="goNext(item.id)">去处理</span>
						</block>
						<block v-else-if="item.status==3">
							<span class='color-red'>{{item.status_desc}}</span>
							<image src="/static/wen.png" class="store-wen"></image>
						</block>
						<block v-else>
							{{item.status_desc}}
						</block>

						<view class="tips" v-if="item.show&&item.status==3">
							<view class="sanjiaoxing"></view>{{item.reason}}
						</view>
					</div>
				</div>
				<div class="store-btm">
					<div>
						名称: {{item.store_name}}
					</div>
					<div @click="cell(item.store_mobile)">
						联系电话: {{item.store_mobile}} <image src="/static/cellstore.png" class="iconCell"></image>
					</div>
				</div>
		</div>

	</view>
</template>

<script>
	import{getStoreApplyList} from'../../common/fetch.js'
	import {pageMixin} from "../../common/mixin";
	import {mapGetters} from 'vuex'
	export default {
		mixins:[pageMixin],
		data() {
			return {
				index:0,
				page:1,
				pageSize:8,
				totalCount:0,
				proList:[],
			};
		},
		computed: {
			...mapGetters(['Stores_ID']),
		},
		methods:{
			goNext(id){
				uni.navigateTo({
					url:'/pagesA/store/storeAgree?id='+id
				})
			},
			changeShow(item){
				if(item.status==3){
					item.show=!item.show
				}
			},
			cell(item){
				uni.makePhoneCall({
				    phoneNumber: item
				});
			},
			changIndex(index){
				this.index=index
				this.proList=[]
				this.page=1
				this.init()
			},
			init(item){
				let data={
					page:this.page,
					pageSize:this.pageSize,
					store_id:this.Stores_ID
				}
				if(this.index>0){
					data.status=this.index
				}
				getStoreApplyList(data).then(res=>{
					this.totalCount=res.totalCount
					for(let it of res.data){
						it.show=false
					}
					if(item=='init'){
						for(let it of res.data){
							this.proList.push(it)
						}
					}else{
						this.proList=res.data
					}


				})

			}
		},
		onReachBottom() {
			if(this.proList.length<this.totalCount){
				this.page++
				this.init('init')
			}
		},
		onShow() {
			this.page=1
			this.proList=[]
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
.navs {
		z-index: 999;
		position: fixed;
		top:0rpx;
		left: 0rpx;
		width: 750rpx;
		box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 100rpx;
        line-height: 100rpx;
        background: #fff;
        font-size: 28rpx;
        padding: 0 10px;

        .nav-item {
            flex: 1;
            box-sizing: border-box;
            text-align: center;
			position: relative;
			.jiaobiao{
				position: absolute;
				top: 24rpx;
				right: 20rpx;
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				background-color: #FFFFFF;
				border: 1px solid  #F43131;
				font-size: 15rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #F43131;
			}
        }
        .nav-item.active {
            color: #FF4E00;
            border-bottom: 2px solid #FF4E00;
        }
    }
	.store-apply{
		width: 710rpx;
		margin: 0 auto 20rpx ;
		height: 250rpx;
		box-sizing: border-box;
		padding: 20rpx;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
	}
	.store-apply-title{
		height: 84rpx;
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
		position: relative;
	}

.store-img{
	width: 84rpx;
	height: 84rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}
.store-name{
	font-size: 15px;
	color: #333333;
}
.store-desc{
	font-size: 14px;
	color: #888888;
	margin-left: auto;
	position: relative;
}
.iconCell{
	width: 34rpx;
	height: 34rpx;
	display: inline-block;
	margin-left: 20rpx;
}

	.store-btm{
		font-size: 14px;
		color: #888888;
		line-height: 48rpx;
	}
	.status-store{
		width: 124rpx;
		height: 56rpx;
		display: inline-block;
		line-height: 56rpx;
		text-align: center;
		background-color: #FF4E00;
		font-size: 14px;
		color: #FFFFFF;
	}
	.color-red{
		color: #FF4E00;
	}
	.store-wen{
		width: 28rpx;
		height: 28rpx;
		margin-left: 10rpx;
	}

	.tips {
		position: absolute;
		top:50rpx;
		right: -12rpx;
		width: 200rpx;
		padding: 20rpx;
		background: #fff;
		box-shadow: 0px 0px 16px 0px rgba(4,0,0,0.18);
		.sanjiaoxing {
			position: absolute;
			top: -14rpx;
			right: 30rpx;
			background-color: #fff;
			transform: rotate(70deg);
			width: 15rpx;
			height: 30rpx;
			border: 2rpx solid #fff;
			border-right:0;
			border-bottom: 0;
			box-shadow: 0px 0px 16px 0px rgba(4,0,0,0.18);
		}
	}
</style>
