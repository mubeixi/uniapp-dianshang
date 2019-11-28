<template>
	<view>
		<view class="topImg">
			<view class="topAll" @click="changIndex(1)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					在售产品
				</view>
			</view>

			<view class="topAll" @click="changIndex(2)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					库存紧张
				</view>
			</view>

			<view class="topAll" @click="changIndex(3)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					统计价值
				</view>
			</view>

			<view class="topAll" @click="changIndex(4)">
				<view class="ulDiv">
					<image class="imgHund" src="/static/zai.png"></image>
				</view>
				<view class="font-13">
					退货/取消
				</view>
			</view>
			
		</view>
		
		<view class="marginAuto">
			<view class="blockDiv" v-for="(item,index) of productMy" :key="index">
				<view class="mbxa" v-if="isShow" @click="checkedSelect(index)">
					<img class="imgs" :src="checked[index].checked?checked_img_url:uncheck_img_url" >
				</view>
				<view style="width: 10rpx" v-if="!isShow">
				</view>
				<view class="imgDiv">
					<image class="imgHund" :src="item.ImgPath"></image>
				</view>
				<view class="textRight" :style="{width: isShow?'415':'425'+'rpx'}">
					<view class="productName">
						{{item.Products_Name}}
					</view>
					<view class="skuMy">
						<span>库存：{{item.prod_stock}}</span><span style="margin-left: 100rpx;">销量：{{item.Products_Sales}}</span>
					</view>
					<view class="bottomDiv">
						<view class="skuCount">
							规格库存
						</view>
						<view class="allPrice">
							总价值：<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="index==3" style="height: 86rpx;width: 750rpx;">
			
		</view>
		<view v-if="index==3" class="buttonLast" @click="allSum">
			统计价值
		</view>
		
		
		
		
		<!--  遮罩层	-->
		<view class="mask" :hidden="!showSum" @click="hiddenMask"></view>
		<!--  属性弹窗	-->
		<view class="sku-pop" v-if="showSum">
		    <view class="sku-title">您查看的商品总价值为</view>
			<view class="priceSum">
				¥<span class="span">{{prod_money}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	import {domainFn} from "../../common/filter";
	import {mapGetters} from 'vuex'
	import {getStoreProdMoney,getSelfStoreProd}  from '../../common/fetch'
	export default {
		data() {
			return {
				checked_img_url:'/static/client/checked.png',
				uncheck_img_url:'/static/client/uncheck.png',
				isShow:true,
				index:1,
				page:1,
				pageSize:10,
				totalCount:0,
				productMy:[],
				checked:[],
				checkedData:[],
				loading:false,
				showSum:false,//遮罩层
				prod_money:0
			};
		},
		computed: {
		    ...mapGetters(['Stores_ID']),		
		},
		onShow() {
			this.checked_img_url = domainFn(this.checked_img_url)
			this.uncheck_img_url = domainFn(this.uncheck_img_url)
		},
		onLoad() {
			this.getSelfStoreProd();
		},
		onReachBottom() {
			if(this.productMy.length<this.totalCount){
				this.page++;
				this.getSelfStoreProd();
			}
		},
		methods:{
			hiddenMask(){
				this.showSum=false
			},
			allSum(){
				let arr=[];
				for(let item of this.checked){
					if(item.checked){
						arr.push(this.productMy[item.index].Products_ID)
					}
				}
				if(arr.length<=0){
					uni.showToast({
						title:"还未选择商品",
						icon:"none"
					})
					return
				}
				let data={
					store_id:this.Stores_ID,
					prod_ids:JSON.stringify(arr)
				}
				getStoreProdMoney(data).then(res=>{
					this.prod_money=res.data.prod_money
				}).catch(e=>{
					console.log(e)
				})
				this.showSum=true
			},
			checkedSelect(index){
				this.checked[index].checked=!this.checked[index].checked;
			},
			getSelfStoreProd(){
				if(this.loading)return
				this.checkedData=this.checked
				this.loading=true
				let data={
					store_id:this.Stores_ID,
					page:this.page,
					pageSize:this.pageSize
				}
				if(this.index==3){
					this.isShow=true
				}else{
					this.isShow=false
				}
				
				if(this.index==2){
					data.stock_low=10
				}else{
					data.is_selling==1
				}
				getSelfStoreProd(data).then(res=>{
					this.productMy = this.productMy.concat(res.data)
					this.checked = [];
					for(let i in this.productMy) {
						this.checked.push({
							index: i,
							checked: false
						})
					}
					for(let i=0;i<this.checkedData.length;i++){
						this.checked[i].checked=this.checkedData[i].checked
					}
					this.totalCount=res.totalCount
					this.loading=false
				}).catch(e=>{
					this.loading=false
				})
				
			},
			changIndex(index){
				this.productMy=[]
				this.page=1
				this.index=index
				this.getSelfStoreProd();
			}
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
.buttonLast{
		width:750rpx;
		height:86rpx;
		background-color:$wzw-primary-color;
		font-size: 32rpx;
		line-height: 86rpx;
		text-align: center;
		color: #FFFFFF;
		position: fixed;
		bottom: 0px;
		left: 0px;
}

	.mask {
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
    .sku-pop {
        position: absolute;
        top: 40%;
        left: 50%;
        z-index: 10000;
        width: 420rpx;
		height: 260rpx;
        transform: translate(-50%,-50%);
		background-color: #FFFFFF;
		border-radius:10rpx;
		padding-top: 68rpx;
		padding-bottom: 104rpx;
		box-sizing: border-box;
		.sku-title{
			font-size: 28rpx;
			color: #333333;
			height: 26rpx;
			line-height: 26rpx;
			margin: 0 auto;
			width: 420rpx;
			text-align: center;
		}
		.priceSum{
			margin-top: 34rpx;
			width: 420rpx;
			text-align: center;
			height: 28rpx;
			line-height: 28rpx;
			font-size: 26rpx;
			color: #F43131;
			.span{
				font-size: 36rpx;
				margin-left: 4px;
			}
		}
		
    }
</style>
