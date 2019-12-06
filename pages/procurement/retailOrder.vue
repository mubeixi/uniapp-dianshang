<template>
	<view>


		<view class="navs">
		    <view class="nav-item" :class="index==0?'active':''" @click="changIndex(0)">全部</view>
		    <view class="nav-item" :class="index==1?'active':''" @click="changIndex(1)">
				待付款
				<view class="jiaobiao" v-if="orderNum.waitpay>0">{{orderNum.waitpay}}</view>
			</view>
		    <view class="nav-item" :class="index==2?'active':''" @click="changIndex(2)">
				待发货
				<view class="jiaobiao" v-if="orderNum.waitsend>0">{{orderNum.waitsend}}</view>
			</view>
		    <view class="nav-item" :class="index==3?'active':''" @click="changIndex(3)">
				待收货
				<view class="jiaobiao" v-if="orderNum.waitconfirm>0">{{orderNum.waitconfirm}}</view>
			</view>
		    <view class="nav-item" :class="index==4?'active':''" @click="changIndex(4)">
				待评价
				<view class="jiaobiao" v-if="orderNum.waitcomment>0">{{orderNum.waitcomment}}</view>
			</view>
		</view>
		<view class="space-box" style="height: 100rpx;width: 100%;background-color: #F8F8F8;">
		</view>
		
		<view class="marginAuto" v-for="(item,index) of pro" :key="index" >
			<view class="orderTop">
				<view style="color: #777777;">
					订单号：{{item.Order_ID}}
				</view>
				<view style="color: #F43131;">
					{{item.Order_Status_desc}}
				</view>
			</view>
			<block v-for="(i,k) of item.prod_list" :key="k">
				<view class="blockDiv">
					<view class="imgDiv">
						<image class="imgHund" :src="i.prod_img"></image>
					</view>
					<view class="textRight" >
						<view class="productName">
							{{i.prod_name}}
						</view>
						<view class="bottomDiv">
							<view class="skuCount" v-if="i.attr_info">
								{{i.attr_info.attr_name}}
							</view>
							<view  v-else>
								
							</view>
							<view class="allPrice">
								×{{i.prod_count}}
							</view>
						</view>
						<view class="buttonLast">
							<view class="viewFont">
								¥<span class="spanFont">{{i.prod_price}}</span>
							</view>
							<view>
								<span class="spanJu" @click="refund(item.Order_ID)">拒单</span>
								<span class="spanFa" @click="goFa(item.Order_ID)">去发货</span>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		
		


	</view>
</template>

<script>
	import {domainFn} from "../../common/filter";
	import {mapGetters} from 'vuex'
	import {getOrder,getOrderNum,systemRejectOrder} from '@/common/fetch.js'
	export default {
		data() {
			return {
				index:0,
				pro:[],
				page:1,
				pageSize:10,
				totalCount:0,
				orderNum:""
			};
		},
		computed: {
		    ...mapGetters(['Stores_ID']),		
		},
		onShow() {
			this.pro=[]
			this._getOrder();
			this.getOrderNum();
		},
		onLoad() {
	
		},
		onReachBottom(){
			if(this.pro.length<this.totalCount){
				this.page++;
				this._getOrder();
			}
		},
		methods:{
			refund(id){
				let that=this
				uni.showModal({
				    title: '拒单',
				    content: '是否要拒单',
				    success: function (res) {
				        if (res.confirm) {
				            systemRejectOrder({Order_ID:id}).then(res=>{
				            	uni.showToast({
				            		title:res.msg,
				            		icon:'none'
				            	})
				            	setTimeout(function(){
				            		that._getOrder();
				            		that.getOrderNum();
				            	},1000)
				            })
				        } else if (res.cancel) {
				           
				        }
				    }
				});
				
			},
			goFa(id){
				//发货 订单id
				uni.navigateTo({
					url:"../procurement/retailOrderShip?id="+id
				})
			},
			_getOrder(){
				let data={
					Order_Store:this.Stores_ID,
					page:this.page,
					pageSize:this.pageSize
				}
				if(this.index>0){
					data.Order_Status=this.index
				}
				getOrder(data,{noUid:true}).then(res=>{
					for(var i in res.data) {
						for(var m in res.data[i]){
							if(m == 'prod_list'){
								for(var j in res.data[i][m]) {
										for( var k in res.data[i][m][j]) {
											if(k == 'attr_info') {
												if(res.data[i][m][j][k]){
													res.data[i][m][j][k] = JSON.parse(res.data[i][m][j][k])
												}
											}
										}
									}
							}
						}
					}
					for(let item of res.data){
						this.pro.push(item)
					}
					this.totalCount=res.totalCount;
				}).catch(e=>{})
			},
			getOrderNum(){
				getOrderNum({Order_Store:this.Stores_ID},{noUid:true}).then(res=>{
					this.orderNum=res.data;
					console.log(res)
				}).catch(e=>{
					console.log(e)
				})
			},
			changIndex(i){
				this.pro=[];
				this.index=i;
				this.page=1;
				this._getOrder();
				this.getOrderNum();
			}
		}
	}
</script>

<style lang="scss" scoped>
.marginAuto{
	width: 710rpx;
	margin: 0 auto;
	margin-top: 26rpx;
	background-color: #FFFFFF;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 0rpx 0rpx 18rpx 0rpx;
}
.blockDiv{
	width: 664rpx;
	margin-bottom: 30rpx;
	height: 220rpx;
	display: flex;
	padding-left: 14rpx;
}
.imgDiv{
	width: 220rpx;
	height: 220rpx;
}
.textRight {
	padding-left: 28rpx;
	width: 440rpx;
}
.imgHund{
	width: 100%;
	height: 100%;
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
	margin-top: 26rpx;
	height: 50rpx;
	display: flex;
	align-content: center;
	justify-content: space-between;
}
.skuCount{
	height: 50rpx;
	background-color: #FFF2F1;
	font-size: 13px;
	color: #666666;
	text-align: center;
	line-height: 50rpx;
	padding-left: 5px;
	padding-right: 5px;
}
.allPrice{
	font-size: 30rpx;
	color: #333333;
	height: 50rpx;
	line-height: 50rpx;
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
	margin-top: 24rpx;
	display: flex;
	justify-content: space-between;
	height: 45rpx;
	.viewFont{
		font-size: 24rpx;
		color: #F43131;
	}
	.spanFont{
		font-size: 30rpx;
		color: #F43131;
		margin-left: 3px;
	}
	.spanJu{
		width:80rpx;
		height:45rpx;
		background:#EEEEEE;
		border-radius:5px;
		font-size: 24rpx;
		color: #666666;
		display: inline-block;
		line-height: 45rpx;
		text-align: center;
	}
	.spanFa{
		width:95rpx;
		height:45rpx;
		background:#F43131;
		border-radius:5px;
		font-size: 24rpx;
		line-height: 45rpx;
		text-align: center;
		color: #FFFFFF;
		display: inline-block;
		margin-left: 24rpx;
	}
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
		.navs {
			z-index: 999;
			position: fixed;
			top:0rpx;
			/* #ifdef APP-PLUS */
			// top: var(--status-bar-height);
			/* #endif */
			left: 0rpx;
			width: 750rpx;
			box-sizing: border-box;
		    display: flex;
		    align-items: center;
		    height: 100rpx;
		    line-height: 100rpx;
		    background: #F8F8F8;
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
		        color: red;
		        border-bottom: 2px solid red;
		    }
		}
		
.orderTop{
	height: 76rpx;
	width: 100%;
	margin-bottom: 20rpx;
	border-bottom: 1px solid #E6E6E6;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	align-items: center;
	padding-left: 20rpx;
	padding-right: 20rpx;
}
</style>
