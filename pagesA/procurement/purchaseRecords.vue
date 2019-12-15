<template>
	<view class="wrap" >

		<!-- <page-title :title="'进货记录'" :bgcolor="'#fff'"></page-title> -->
		<block v-if="orderList.length>0">
			<block v-for="(item,index) of orderList" :key="index" >
				<view class="prolist" @click="hidden_tip(index)" >
					<view class="pro-title">
						<view>进货单号：{{item.Order_ID}}</view>
						<image  v-if="item.Order_Status==20||item.Order_Status==26" class="img" src="/static/procurement/del.png" @click="del(item.Order_ID)"></image>
					</view>
					<view class="list-msg">
						<view class="biz-msg">
							<image class="avator" :src="item.supplier_img" mode=""></image>
							<view class="biz-name">{{item.supplier_name}}<view class="biz-links" v-if="(item.Order_Status==20||item.Order_Status==22||item.Order_Status==25)||item.active_id>0">(<text v-if="item.active_id>0" class="text-d" @click="showStore(item)">查看信息</text><block v-if="(item.Order_Status==20||item.Order_Status==22||item.Order_Status==25)&&item.active_id>0">/</block><block v-if="item.Order_Status==20||item.Order_Status==22||item.Order_Status==25"><text class="text-d" @click="changeChannel(item)">修改渠道</text></block>)</view></view>
							<view class="status">{{item.Order_Status_desc}}
								<block v-if="item.Order_Status == 22 && item.reason">
									<image class="qty-icon" src="/static/procurement/i.png" mode="" @click.stop="show_order_tip(index)"></image>
									<view class="tips" v-if="item.show_order_tip">
										<view class="sanjiaoxing"></view>{{item.reason}}
									</view>
								</block>
							</view>
						</view>

						<view class="pro-msg" v-for="(it,ind) of item.prod_list" :key="ind">
							<view class="pro-img">
								<image class="img" :src="it.prod_img"></image>
							</view>
							<view class="pro-info">
								<view class="pro-name">{{it.prod_name}}</view>
								<view class="pro-attr" >
									<view class="attr-info" v-if="it.attr_info.attr_val">{{it.attr_info.attr_val.Attr_Value}}</view>
									<view class="attr-info" v-else></view>
									<view class="pro-qty">x{{it.prod_count}}
										<image class="qty-icon" v-if="it.prod_count_change_desc" src="/static/procurement/i.png" mode="" @click.stop="show_pro_tip(item)"></image>
										<view class="tips" v-if="item.pro_tip_show">
											<view class="sanjiaoxing"></view>{{it.prod_count_change_desc}}
										</view>
									</view>
								</view>
								<view class="pro-price">
									<view>
										<text class="price-icon">￥</text>{{it.prod_price}}
									</view>
									<view class="sku-item" v-if="item.Order_Status==20||item.Order_Status==22||item.Order_Status==25">
										<view class="handle" @click="minus(index,ind,it,item.Order_ID)">-</view>
										<view class="pro-num">{{it.prod_count}}</view>
										<view class="handle" @click="plus(index,ind,it,item.Order_ID)">+</view>
									</view>
								</view>
							</view>
						</view>

						<view class="totalinfo">总计：<text class="price-icon">￥</text><text class="price-num">{{item.Order_TotalPrice}}</text> <block v-if="item.Order_Shipping.price>0">(含运费{{item.Order_Shipping.price}}元)</block></view>
						<view class="btns">
							<view class="btn back" @click="cancelOrder(item.Order_ID)" v-if="item.Order_Status==20||item.Order_Status==21||item.Order_Status==25">取消进货单</view>
							<view class="btn back" @click="recallOrder(item.Order_ID)" v-if="item.Order_Status==21">撤回进货单</view>
							<view class="btn back" @click="wuliu(item)" v-if="item.Order_Status==23">查看物流</view>
							<view class="btn back" @click="completedOrder(item.Order_ID)" v-if="item.Order_Status==23">确认收货</view>
							<view class="btn back" @click="submitOrder(item.Order_ID,index)" v-if="item.Order_Status==20||item.Order_Status==22||item.Order_Status==25">提交进货单</view>
						</view>
					</view>
				</view>
			</block>
		</block>
		<div class="defaults" v-else>
				<image :src="'/static/client/defaultImg.png'|domain" ></image>
		</div>
		<!--  门店信息	-->
		<view class="sku-pop mendian" v-if="isShowStoreMsg">
		    <view class="sku-title">门店信息</view>
		    <view class="sku-content">
		        <view class="skulist">
		            <view class="sku-name">门店名称：</view>
		            <view class="sku-item" v-if="storeAdress.Stores_Name">{{storeAdress.Stores_Name}}</view>
		        </view>
		        <view class="skulist">
		            <view class="sku-name">门店电话：</view>
		            <view class="sku-item" v-if="storeAdress.Stores_Telephone">{{storeAdress.Stores_Telephone}}</view>
		        </view>
		        <view class="skulist" @click="showAdress">
		            <view class="sku-name">门店地址：</view>
		            <view class="sku-item" v-if="storeAdress.Stores_Province_name" style="flex:1;">{{storeAdress.Stores_Province_name}}{{storeAdress.Stores_City_name}}{{storeAdress.Stores_Area_name}}{{storeAdress.Stores_Address}}<image class="img" src="/static/local.png"></image></view>
		        </view>
		        <view class="skulist" v-if="storeAdress.distance">
		            <view class="sku-name">门店距离：</view>
		            <view class="sku-item" >{{storeAdress.distance}}KM</view>
		        </view>
		    </view>
		</view>
		<!-- 修改渠道 -->
		<view class="sku-pop" v-if="isChangeChannel">
		    <view class="sku-title">修改渠道</view>
		    <view class="sku-content" style="padding-left:53rpx;">
		        <view class="skulist" @click="changeOrderIndex(0)">
		            <view v-if="orderIndex==1" class="nochecked"></view>
					<image v-if="orderIndex==0" class="selected" src="/static/procurement/selected.png"></image>
					<view>平台进货</view>
				</view>
		        <view class="skulist" @click="changeOrderIndex(1)">
					<view  v-if="orderIndex==0" class="nochecked"></view>
					<image v-if="orderIndex==1" class="selected" src="/static/procurement/selected.png"></image>
					<view>门店进货</view>
		        </view>
		        <view class="skulist">
						<input class="input" type="text" v-model="inputValue" placeholder="请输入门店编号" placeholder-style="color: #C9C9C9;font-size: 24rpx;" />
		        </view>
				<view class="skulist change-btn">
					<view class="btn cancel" @click="cancelMy">取消</view>
					<view class="btn confirm" @click="sureMy">确定</view>
				</view>
		    </view>
		</view>
		<!--  遮罩层	-->
		<view class="mask" catchtouchmove="false" :hidden="isHidden" @click="hiddenMask"></view>

		<div class="input-wrap" v-if="password_input">
			<div>请输入余额支付密码</div>
			<input type="password" class="input" placeholder="请输入密码" v-model="user_pay_password" @blur="user_password">
			<div class="btns">
				<div @click="cancelInput" class="btn">取消</div>
				<div @click="confirmInput" class="btn">确定</div>
			</div>
		</div>

	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getStorePurchaseApply,storePifaOrderCancel,storePifaOrderRecall,storePifaOrderCompleted,changeStoreApplyChannel,getStoreDetail,subStorePurchaseApply,storePifaOrderDel,storePifaOrderCalc} from "../../common/fetch";
	import {mapGetters} from 'vuex'
	import {getLocation} from "../../common/tool/location";
	export default {
		mixins:[pageMixin],
		data(){
			return {
				isHidden: true,
				isShowStoreMsg: false,
				isChangeChannel: false,
				change_type: 0, // 进货渠道， 0 是平台 1是门店
				page:1,
				pageSize:10,
				totalCount:0,
				orderList:[],
				order_id:0,//订单id
				orderIndex:0,//选择渠道
				inputValue:'',//门店编号
				storeAdress:[],
				user_pay_password:'',
				password_input:false,
				index: 0, // 提交的是第几个订单
			}
		},
		onShow() {
			this.getStorePurchaseApply()
		},
		methods: {
			wuliu(item){
				let express = item.Order_Shipping.Express;
				//跳转物流追踪
				uni.navigateTo({
					url:'/pages/order/logistics?shipping_id='+item.Order_ShippingID + '&express=' + express + '&prod_img=' + item.prod_list[0].prod_img
				})
			},
			del(id){
				let that=this
				uni.showModal({
				    title: '订单',
				    content: '是否要删除订单',
				    success: function (res) {
				        if (res.confirm) {
							let data={
								store_id:that.Stores_ID,
								order_id:id
							}
				            storePifaOrderDel(data).then(res=>{
				            	uni.showToast({
				            		title:res.msg,
				            		icon:'none'
				            	})
				            	setTimeout(function(){
									that.getStorePurchaseApply()
				            	},1000)
				            })
				        } else if (res.cancel) {

				        }
				    }
				});
			},
			confirmInput(){
				let data={
					store_id:this.Stores_ID,
					order_id:this.order_id,
					password:this.user_pay_password
				}
				let prod_json = {};
				let prod_list = this.orderList[this.index].prod_list;
				prod_list.forEach(item=>{
					if(prod_json[item.prod_id]) {
						prod_json[item.prod_id][item.attr_id] = item.prod_count
					}else {
						prod_json[item.prod_id] = {
							[item.attr_id]: item.prod_count
						}
					}
				})
				data.prod_json = JSON.stringify(prod_json);
				let that=this
				this.password_input=false
				this.isHidden=true
				this.user_pay_password = '';
				subStorePurchaseApply(data).then(res=>{
					uni.showToast({
					    title: res.msg,
					    icon: 'none',
					});
					setTimeout(function(){
						that.getStorePurchaseApply();
					},1000)
				})
			},
			cancelInput(){
				this.password_input=false
				this.isHidden=true
				this.user_pay_password = ''
			},
			// 用户输入密码完毕
			user_password(e) {
				this.user_pay_password = e.detail.value;
			},
			// 点击查看订单驳回原因
			show_order_tip(index){
				console.log(index)
				this.orderList[index].show_order_tip = true;
				console.log(this.orderList[index])
			},
			//提交订单
			submitOrder(id,index){
				this.order_id=id
				this.isHidden=false
				this.password_input=true
				this.index = index;
			},
			plus(index,ind,it,id){

			    this.orderList[index].prod_list[ind].prod_count++;
				let data={
					[it.prod_id]:{
						[it.attr_id]:this.orderList[index].prod_list[ind].prod_count
					}
				}
				storePifaOrderCalc({store_id:this.Stores_ID,order_id:id,prod_json:JSON.stringify(data)}).then(res=>{
					this.orderList[index].Order_TotalPrice=res.data.Order_TotalPrice
				}).catch(e=>{console.log(e);this.orderList[index].prod_list[ind].prod_count--;})

			},
			minus(index,ind,it,id){
			    if (this.orderList[index].prod_list[ind].prod_count>0) {
			        this.orderList[index].prod_list[ind].prod_count--
					let data={
						[it.prod_id]:{
							[it.attr_id]:this.orderList[index].prod_list[ind].prod_count
						}
					}
					storePifaOrderCalc({store_id:this.Stores_ID,order_id:id,prod_json:JSON.stringify(data)}).then(res=>{
						this.orderList[index].Order_TotalPrice=res.data.Order_TotalPrice
					}).catch(e=>{console.log(e);this.orderList[index].prod_list[ind].prod_count++})
			    } else {
			        uni.showToast({
			            title: '购买数量不能小于0',
			            icon: 'none',
			        });
			    }
			},
			//确认收货采购单
			completedOrder(id){
				let data={
					store_id:this.Stores_ID,
					order_id:id
				}
				let that=this
				storePifaOrderCompleted(data).then(res=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					setTimeout(function(){
						that.getStorePurchaseApply()
					},1000)
				}).catch(e=>{console.log(e)})
			},
			//撤回采购单
			recallOrder(id){
				let data={
					store_id:this.Stores_ID,
					order_id:id
				}
				let that=this
				uni.showModal({
				    title: '订单',
				    content: '是否要撤回订单',
				    success: function (res) {
				        if (res.confirm) {
							storePifaOrderRecall(data).then(res=>{
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
								setTimeout(function(){
									that.getStorePurchaseApply()
								},1000)
							}).catch(e=>{console.log(e)})
				        } else if (res.cancel) {

				        }
				    }
				});

			},
			//取消采购单
			cancelOrder(id){
				let data={
					store_id:this.Stores_ID,
					order_id:id
				}
				let that=this
				uni.showModal({
				    title: '订单',
				    content: '是否要取消订单',
				    success: function (res) {
				        if (res.confirm) {
							storePifaOrderCancel(data).then(res=>{
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
								setTimeout(function(){
									that.getStorePurchaseApply()
								},1000)
							}).catch(e=>{console.log(e)})
				        } else if (res.cancel) {

				        }
				    }
				});

			},
			getStorePurchaseApply(){
				let data={
					page:this.page,
					pageSize:this.pageSize,
					store_id:this.Stores_ID
				}
				getStorePurchaseApply(data).then(res=>{
					this.totalCount=res.totalCount
					for(var item of res.data	) {
						item.pro_tip_show=false
					}
					res.data.forEach(item=>item.show_order_tip=false);
					this.orderList=res.data
					for(let item of this.orderList){
						for(let it of item.prod_list){
							if(it.attr_id>0){
								it.attr_info=JSON.parse(it.attr_info)
								let str=''
								for(let my in it.attr_info.attr_val.Attr_Value){
									str+=it.attr_info.attr_val.Attr_Value[my]+";"
								}
								str=str.slice(0,str.length-1)
								it.attr_info.attr_val.Attr_Value=str
							}
						}
					}

				}).catch(e=>{console.log(e)})
			},
			show_pro_tip(item){
				item.pro_tip_show = true;
			},
			hidden_tip(index){
				this.orderList = this.orderList;
				this.orderList[index].show_order_tip = false;
				this.orderList[index].prod_list.forEach(item=>{
					item.pro_tip_show = false;
				})
				// item.pro_tip_show = false;
			},
			showAdress(){
				uni.openLocation({
				            latitude: this.storeAdress.wx_lat,
				            longitude: this.storeAdress.wx_lng,
				            success: function () {
				                console.log('success');
				            }
				        });
			},
			showStore(){
				this.storeAdress=[];
				this.isHidden = false;
				this.isShowStoreMsg = true;
				let lat='';
				let lng='';
				getLocation(this).then(res=>{
					if(res.code===0){
						lng=res.data.longitude
						lat=res.data.latitude
						let data={
							lat:lat,
							lng:lng,
							store_id:this.Stores_ID
						}
						getStoreDetail(data).then(res=>{
							this.storeAdress=res.data
							this.storeAdress.distance=(res.data.distance/1000).toFixed(2)
						})
					}
				}).catch(err=>{
					let data={
						store_id:this.Stores_ID
					}
					getStoreDetail(data).then(res=>{
						this.storeAdress=res.data
					})
				})
			},
			hiddenMask(){
				this.isShowStoreMsg = false;
				this.isHidden = true;
				this.isChangeChannel = false;
				this.password_input=false
				this.user_pay_password = '';
			},
			//修改渠道
			changeOrderIndex(index){
				this.orderIndex=index
			},
			cancelMy(){
				this.isChangeChannel = false;
				this.isHidden = true;
			},
			//确定更改渠道
			sureMy(){
				let data={
					store_id:this.Stores_ID,
					order_id:this.order_id,
					purchase_type:this.orderIndex?'store':'shop'
				}
				if(this.orderIndex==1){
					data.purchase_store_sn=this.inputValue
				}
				changeStoreApplyChannel(data).then(res=>{

				})
			},
			//修改渠道
			changeChannel(item){
				this.order_id=item.Order_ID;
				//跳转到 渠道选择页面
				uni.navigateTo({
					url: '/pages/selectChannel/selectChannel?order_id=' + item.Order_ID
				});
				return;
			}
		},
		computed: {
		    ...mapGetters(['Stores_ID'])
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 26rpx;
		padding: 0 20rpx;
		min-height: 100vh;
		background-color: #F6F6F6;
		.prolist {
			width: 710rpx;
			margin: 30rpx 0;
			padding: 0 16rpx 42rpx 14rpx;
			background-color: #fff;
			box-sizing: border-box;
			.pro-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 75rpx;
				line-height: 75rpx;
				color: #777777;
				// padding: 0 20rpx;
				border-bottom: 2rpx solid #E6E6E6;
				.img {
					width: 26rpx;
					height: 31rpx;
				}
			}
			.list-msg {
				.biz-msg {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 107rpx;
					.avator {
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					.biz-name {
						display: flex;
						align-items: center;
						flex: 1;
						font-size: 28rpx;
						color: #333;
						.biz-links {
							color: $wzw-primary-color;
							font-size: 24rpx;
							margin-left: 14rpx;
							.text-d {
								text-decoration: underline;
								padding: 0 10rpx;
							}
						}
					}
					.status {
						position: relative;
						color: $wzw-primary-color;
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
						.qty-icon {
							width: 22rpx;
							height: 22rpx;
							margin-left: 10rpx;
						}
					}
				}
				.pro-msg {
					display: flex;
					padding-bottom: 30rpx;
					box-sizing: border-box;
					border-bottom: 2rpx solid #E6E6E6;
					.pro-img {
						width: 200rpx;
						height: 200rpx;
						margin-right: 28rpx;
						.img {
							width: 200rpx;
							height: 200rpx;
						}
					}
					.pro-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						width: 500rpx;
						.pro-name {
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.pro-attr {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 25rpx;
							margin-bottom: 23rpx;
							.attr-info {
								line-height: 50rpx;
								padding: 0 20rpx;
								background-color: #FFF5F5;
								color: #666;
								font-size: 24rpx;
							}
							.pro-qty {
								position: relative;
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
								.qty-icon {
									width: 22rpx;
									height: 22rpx;
									margin-left: 10rpx;
								}
							}
						}
						.pro-price {
							font-size: 30rpx;
							color: $wzw-primary-color;
							display: flex;
							justify-content: space-between;
							.price-icon {
								font-size: 24rpx;
							}
						}
					}
				}
				.totalinfo {
					line-height: 85rpx;
					text-align: right;
					.price-icon {
						font-size: 24rpx;
						color: $wzw-primary-color;
					}
					.price-num {
						font-size: 30rpx;
						color: $wzw-primary-color;
					}
				}
				.btns {
					display: flex;
					justify-content: flex-end;
					.btn {
						width:155rpx;
						height:60rpx;
						line-height: 60rpx;
						color: #666;
						text-align: center;
						background-color: #EEEEEE;
						border-radius:10rpx;
					}
					.back {
						color: #fff;
						background:rgba(244,49,49,1);
						margin-left: 10rpx;
					}
				}
			}
		}
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
	    position: fixed;
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
							&.change-btn {
								padding-top: 43rpx;
								justify-content: center;
							}
							.selected,
							.nochecked {
								display: block;
								width: 40rpx;
								height: 40rpx;
								margin-right: 23rpx;
							}
							.nochecked {
								box-sizing: border-box;
								border:2rpx solid rgba(214,214,214,1);
								border-radius:3px;
							}
							.input {
								width:420rpx;
								height:60rpx;
								border:1px solid rgba(214,214,214,1);
								font-size: 24rpx;
								padding-left: 24rpx;
								box-sizing: border-box;
								line-height: 36rpx;
							}
							.btn {
								width: 130rpx;
								height: 50rpx;
								text-align: center;
								line-height: 50rpx;
								background-color: #E9E9E9;
								font-size: 24rpx;
							}
							.cancel {
								color: #666;
								margin-right: 25rpx;
							}
							.confirm {
								color: #fff;
								background-color: $wzw-primary-color;
							}
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
	.mendian {
	    .sku-content {
	        .sku-name {
	            margin-right: 10rpx!important;
	        }
	        .sku-item {
	            display: block !important;
	            font-size: 26rpx !important;
	            .img {
	                margin-left: 10rpx;
	            }
	        }
	    }
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



		.input-wrap {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 10000;
			width: 526rpx;
			transform: translate(-50%,-50%);
			border-radius: 10rpx;
			background: #fff;
			color: #000;
			text-align: center;
			width: 90%;
			padding: 40rpx 50rpx 30rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			border-radius: 10rpx;
			.input {
				margin: 40rpx 0;
				border: 1px solid #efefef;
				height: 20px;
				line-height: 20px;
				padding: 10px 0px;
			}

			.btns {
				display: flex;
				justify-content: space-around;
				height: 60rpx;
				line-height: 60rpx;
				.btn {
					flex: 1;
				}
			}
		}
.defaults{
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
</style>
