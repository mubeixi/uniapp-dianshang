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
					{{is_refund && is_fourth?'取消':'退货'}}
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
							<view v-if="!(is_refund&&is_fourth)">
								总价值：<span class="span1">¥</span><span class="span2">{{item.prod_money}}</span>
							</view>
							<view v-else class="back-btn" @click="apply_back">申请退货</view>
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
		<view class="mask" :hidden="isHiddenMask" @click="hiddenMask"></view>
		<!--  产品属性弹窗	-->
		<view class="sku-pop" v-if="showSku">
		    <view class="sku-title">选择商品属性</view>
		    <view class="sku-content">
		        <view class="skulist" v-for="item in prosku.skujosn_new">
		            <view class="sku-name">{{item.sku}}</view>
		            <view class="sku-item">
		                <view :class="[check_attr[item.sku]==index?'active':'','sku']" @click="selectAttr(index,item.sku)"  v-for="(attr,index) of item.val">{{attr}}</view>
		            </view>
		        </view>
		        <view class="skulist">
		            <view class="sku-name">数量</view>
		            <view class="sku-item">
		                <view class="handle" @click="minus">-</view>
		                <view class="pro-num">{{postData.qty}}</view>
		                <view class="handle" @click="plus">+</view>
		            </view>
		        </view>
		        <view class="sku-btns">
		            <view class="cancel btn" @click="cancel">取消</view>
		            <view class="confirm btn" @click="confirm" >确定</view>
		        </view>
		    </view>
		</view>
		<!--  价值弹窗	-->
		<view class="sku-pop" v-if="showSum">
		    <view class="sku-title">您查看的商品总价值为</view>
			<view class="priceSum">
				¥<span class="span">{{prod_money}}</span>
			</view>
		</view>
		<view style="height:90rpx;" v-if="index == 4">
		    <view class="check" :style="{'z-index': zIndex}">
		        <view class="check-msg" @click="showSelected">已选取<text class="num">{{total_cart_count}}</text>个普通商品 <image class="img" :class="isClicked?'turn':''" src="/static/top.png"></image></view>
		        <view class="submit" @click="submit">发起退货</view>
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
				isHiddenMask: true, // 是否隐藏遮罩
				showSum:false,// 总价值弹窗
				prod_money:0,
				showSku: false,
				is_refund: false, // 是否是退货状态
				is_fourth: false, // 是否是第四个状态
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
			// 申请退货
			apply_back(){
				this.isHiddenMask = false;
				this.showSku = true;
			},
			// 点击遮罩
			hiddenMask(){
				this.isHiddenMask = true;
				this.showSku = false;
				this.showSum = false
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
				});
				this.showSum=true
				this.isHiddenMask = false;
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
				if(index != 4) {
					this.is_refund = false;
				}else {
					this.is_fourth = true;
					this.is_refund = !this.is_refund;
				}
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
			margin: 34rpx auto;
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
		.sku-pop {
		    position: absolute;
		    top: 50%;
		    left: 50%;
		    z-index: 10000;
		    width: 526rpx;
		    transform: translate(-50%,-50%);
		    border-radius: 10rpx;
		    .sku-title {
		        height: 60rpx;
		        line-height: 60rpx;
		        background-color: #f6f6f6;
		        color: #333;
		        font-size: 24rpx;
		        text-align: center;
		        border-top-left-radius: 10rpx;
		        border-top-right-radius: 10rpx;
		    }
		    .sku-content {
		        padding: 40rpx 46rpx 34rpx 40rpx;
		        background-color: #fff;
		        border-bottom-left-radius: 10rpx;
		        border-bottom-right-radius: 10rpx;
		        .skulist {
		            margin-bottom: 30rpx;
		            display: flex;
		            align-items: center;
		            .sku-name {
		                color: #333;
		                font-size: 24rpx;
		                margin-right:26rpx;
		            }
		            .sku-item {
		                display: flex;
		                align-items: center;
		                color: #666;
		                /*flex: 1;*/
		                .img {
		                    width: 27rpx;
		                    height: 32rpx;
		                }
		                .sku {
		                    width: 80rpx;
		                    height: 46rpx;
		                    line-height: 46rpx;
		                    text-align: center;
		                    background-color: #f6f6f6;
		                    color: #666;
		                    font-size: 24rpx;
		                    margin-right: 13rpx;
		                    border-radius: 5rpx;
		                }
		                .active {
		                    background-color: $wzw-primary-color;
		                    color: #fff;
		                }
		                .handle {
		                    width: 50rpx;
		                    height: 45rpx;
		                    line-height: 45rpx;
		                    text-align: center;
		                    font-size: 32rpx;
		                    color: #777;
		                    background: #f6f6f6;
		                }
		                .pro-num {
		                    margin: 0 15rpx;
		                    font-size: 24rpx;
		                    color: #777;
		                }
		            }
		        }
		        .sku-btns {
		            display: flex;
		            justify-content: center;
		            align-items: center;
		            margin-top: 60rpx;
		            .btn {
		                width: 130rpx;
		                height: 50rpx;
		                text-align: center;
		                line-height: 50rpx;
		                font-size: 24rpx;
		            }
		            .cancel {
		                background: #e9e9e9;
		                color: #666;
		                margin-right: 25rpx;
		            }
		            .confirm {
		                background-color: $wzw-primary-color;
		                color: #fff;
		            }
		        }
		    }
		}
		.back-btn {
			height: 50rpx;
			width: 130rpx;
			text-align: center;
			background-color: $wzw-primary-color;
			color: #fff;
			border-radius: 25rpx;
			line-height: 50rpx;
		}
		.check {
		    position: fixed;
		    bottom: 0;
		    width: 100%;
		    height: 90rpx;
		    display: flex;
		    line-height: 90rpx;
		    font-size: 24rpx;
		    color: #333;
		    background-color: #fff;
		    box-shadow: 0px 0px 22px 0px rgba(4,0,0,0.12);
		    .check-msg {
		        flex: 1;
		        display: flex;
		        align-items: center;
		        justify-content: center;
		        font-size: 24rpx;
		        color: #333;
		        .num {
		            color: $wzw-primary-color;
		            fong-size: 28rpx;
		        }
		        .img {
		            width: 17rpx;
		            height: 14rpx;
		            margin-left: 12rpx;
		        }
		        .turn {
		            transform: rotate(180deg);
		        }
		    }
		    .submit {
		        width: 210rpx;
		        height: 100%;
		        line-height: 90rpx;
		        background: $wzw-primary-color;
		        font-size: 28rpx;
		        color: #fff;
		        text-align: center;
		    }
		}
</style>
