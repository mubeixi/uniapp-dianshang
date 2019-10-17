<template>
    <div>
        <page-title title="我的订单" rightHidden="true" class="titless"></page-title>
        <div class="navs">
            <div class="nav-item" :class="index==0?'active':''" @click="changIndex(0)">全部</div>
            <div class="nav-item" :class="index==1?'active':''" @click="changIndex(1)">
				待付款
				<div class="jiaobiao" v-if="orderNum.shop.waitpay>0">{{orderNum.shop.waitpay}}</div>
			</div>
            <div class="nav-item" :class="index==2?'active':''" @click="changIndex(2)">
				待发货
				<div class="jiaobiao" v-if="orderNum.shop.waitsend>0">{{orderNum.shop.waitsend}}</div>
			</div>
            <div class="nav-item" :class="index==3?'active':''" @click="changIndex(3)">
				待收货
				<div class="jiaobiao" v-if="orderNum.shop.waitconfirm>0">{{orderNum.shop.waitconfirm}}</div>
			</div>
            <div class="nav-item" :class="index==4?'active':''" @click="changIndex(4)">
				待评价
				<div class="jiaobiao" v-if="orderNum.shop.waitcomment>0">{{orderNum.shop.waitcomment}}</div>
			</div>
        </div>
		<view style="height: 186rpx;width: 100%;">
			
		</view>
        <div class="order" v-for="(item,index) of data" :key="index" v-if="item.prod_list.length>0">
			<div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>
			<div style="height: 20rpx;"></div>
			<div class="bizinfo">
			    <img :src="item.ShopLogo" alt="">
			    <span class="bizname">{{item.ShopName}}</span>
			    <span class="status">{{item.Order_Status_desc}}</span>
			</div>
            <block v-for="(i,k) of item.prod_list" :key="k">
				<div class="pro" @click="goPay(item)">
				    <div class="pro-div">
						<img class="pro-img" :src="i.prod_img">
					</div>
				    <div class="pro-msg">
				        <div class="pro-name">{{i.prod_name}}</div>
				        <div class="attr" v-if="i.attr_info"><span>{{i.attr_info.attr_name}}</span></div>
						<div class="attr" v-else style="background-color: #FFFFFF;"><span></span></div>
				        <div class="pro-price"><span>￥</span>{{i.prod_price}} <span class="amount">x{{i.prod_count}}</span></div>
				    </div>
				</div>
			</block>
            <div class="text-right total">共{{item.prod_list.length}}件商品 合计：<span class="price"><span>￥</span> {{item.Order_Fyepay}}</span></div>
            <div class="btn-group" v-if="item.Order_Status==1">
                <span @click="cancelOrder(item.prod_list,index)">取消订单</span>
                <span class="active" @click="goPay(item)">立即付款</span>
            </div>
			<div class="btn-group" v-else-if="item.Order_Status==2">
				<span @click="cancelOrder(item.prod_list,index)">删除订单</span>
			    <span class="active" @click="goPay(item)">申请退款</span>
			</div>
			<div class="btn-group" v-else-if="item.Order_Status==3">
				<span>查看物流</span>
			    <span class="active" @click="confirmOrder(item)">确认收货</span>
				<!-- @click="goPay(item)"跳转退款 -->
			</div>
			<div class="btn-group" v-else-if="item.Order_Status==4">
				<span @click="cancelOrder(item.prod_list,index)">删除订单</span>
			    <span class="active" @click="goPay(item)">立即评价</span>
			</div>
        </div>
		<div class="defaults" v-if="data.length<=0">
			<image src="/static/defaultImg.png" ></image>
		</div>
	</div>

</template>

<script>
// import pagetitle from '@/components/title'
import {getOrder,cancelOrder,getOrderNum,confirmOrder} from '@/common/fetch.js'
import {pageMixin} from "../../common/mixin";

export default {
	mixins:[pageMixin],
    data(){
        return {
            index: 0,
			data:[],
			pageSize:5,
			page:1,
			totalCount:0,
			orderNum:'',//订单状态角标数
			isQing:false
        }
    },
	onShow(){
		this.getOrder();
		this.getOrderNum();
	},
	onLoad(option){
		this.index=option.index;
	},
	onReachBottom(){
		if(this.data.length<this.totalCount){
			this.page++;
			this.getOrder();
		}
	},
	methods:{
		//确认收货
		confirmOrder(item){
			let data={
				Order_ID:item.Order_ID
			}
			let that=this;
			confirmOrder(data).then(res=>{
				if(res.errorCode==0){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					that.getOrder();
				}
			}).catch(e=>{
				console.log(e);
			})
		},
		//获取订单角标数
		getOrderNum(){
			getOrderNum({}).then(res=>{
				this.orderNum=res.data;
				console.log(res)
			}).catch(e=>{
				console.log(e)
			})
		},
		//取消订单
		cancelOrder(item,index){
			let Order_ID;
			for(let i in item){
				console.log(i)
				if(item[i].Order_ID){
					Order_ID=item[i].Order_ID;
				}
			}
			if(Order_ID){
				cancelOrder({Order_ID}).then(res=>{
					if(res.errorCode==0){
						this.data.splice(index,1);
						this.getOrderNum();
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					
				}).catch(e=>{
					console.log(e)
				})
			}
		},
		//跳转订单详情
		goPay(item){
			if(item.Order_Status==1){
				uni.navigateTo({
					url:"../pay/pay?Order_ID="+item.Order_ID
				})
			}else if(item.Order_Status==2||item.Order_Status==3){
				uni.navigateTo({
					url:'../refund/refund?Order_ID='+item.Order_ID
				})
			}else if(item.Order_Status==4){
				uni.navigateTo({
					url:'../publishComment/publishComment?Order_ID='+item.Order_ID
				})
			}
			
		},
		changIndex(i){
			this.data=[];
			this.index=i;
			this.getOrder();
		},
		getOrder(){
			if(this.isQing) return;
			this.isQing=true;
			let data={
				page:this.page,
				pageSize:this.pageSize
			};
			if(this.index>0&&this.index<4){
				data={
					Order_Status:this.index
				}
			}else if(this.index==4){
				data={
					Is_Commit:0,
					Order_Status:this.index
				}
			}
			getOrder(data).then(res=>{
				if(res.errorCode==0){
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
						this.data.push(item)
					}
					this.totalCount=res.totalCount;
					this.isQing=false;
				}		
			}).catch(e=>{
				this.isQing=false;
			})
		}
	}
}
</script>

<style scoped lang="scss">
	.titless{
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		z-index: 999;
	}
    .navs {
		z-index: 999;
		position: fixed;
		top: 86rpx;
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
            color: red;
            border-bottom: 2px solid red;
        }
    }
    .order {
        padding: 0rpx 20rpx;
        background: #fff;
		position: relative;
        .bizinfo {
			margin-top: 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            img {
                width: 70rpx;
                height: 70rpx;
                border-radius: 50%;    
                margin-right: 21rpx;
            }
            .bizname {
                flex: 1;
				font-size: 28rpx;
            }
            .status {
                color: red;
				font-size: 26rpx;
            }
        }
       .pro {
           display: flex;
           margin-bottom: 50rpx;
		   margin-top: 30rpx;
       }
       .pro-msg{
       	 margin-left: 27rpx;
       	 width: 476rpx;
       }
       .pro-div{
       	width: 200rpx;
       	height: 200rpx;
       }
       .pro-img {
           width: 100%;
           height: 100%;
       }
       .pro-name {
           font-size: 26rpx;
           margin-bottom: 20rpx;
		   text-overflow: -o-ellipsis-lastline;
		   overflow: hidden;
		   text-overflow: ellipsis;
		   display: -webkit-box;
		   -webkit-line-clamp: 2;
		   -webkit-box-orient: vertical;
       }
       .attr {
           display: inline-block;
           height: 50rpx;
           line-height: 50rpx;
           background: #FFF5F5;
           color: #666;
           font-size: 24rpx;
           padding: 0 20rpx;
           margin-bottom: 20rpx;
       }
       .pro-price {
           color: #F43131;
       	font-size: 36rpx;
       }
       .pro-price span {
           font-size: 24rpx;
           font-style: normal;
       }
       .amount {
       	font-size: 30rpx;
           float: right;
           color: #333;
       }
        .total {
            font-size: 24rpx;
            margin: 40rpx 0rpx;
			margin-right: 15rpx;
            .price {
                color: red;
                font-size: 30rpx;
                span{
					font-size: 24rpx;
				}
            }
        }
        .btn-group {
            text-align: right;
			margin-bottom: 30rpx;
            span {
                display: inline-block;
                //width: 150rpx;
				padding: 0rpx 24rpx;
                height: 60rpx;
                line-height: 60rpx;
                text-align: center;
                border: 1px solid #999;
				border-radius:10rpx;
                color: #999;
				font-size: 26rpx;
				&:first-child{
					margin-right: 14rpx;
				}
                &.active {
                    color: #fff;
                    background: #F43131;
                    border: none;
                }
            }
        }
    }
    .text-right {
        text-align: right;
    }
	.defaults{
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
</style>