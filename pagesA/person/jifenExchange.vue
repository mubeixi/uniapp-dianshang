<template>
	<view @click="commonClick" class="all">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background-color: #FF5C33;"><!-- 这里是状态栏 --></view>
		<!-- #endif -->

		<!-- 	<page-title title="积分兑换" rightHidden="true" bgcolor="#FF5C33"></page-title> -->

		<view class="top">

			<view class="img-wrap" :style="{backgroundImage:'url('+$fun.domainFn('/static/client/jifenduihuan/star.png')+')'}">
				<view class="t-title">我的积分</view>
				<view class="t-amount">{{userInfo.User_Integral}}</view>
				<view class="my-change" @click="gotoMyExchange">我的兑换</view>
			</view>
		</view>
		<view class="content">
			<view class="product" v-for="(item,index) in prod_list" :key="index"  @click="exchange(item)">
				<image class="p-img" :src="item.Gift_ImgPath"></image>
				<view class="p-title">{{item.Gift_Name}}</view>
				<view class="p-count">库存 {{item.Gift_Qty}}</view>
				<view class="p-price">
					<text>{{item.Gift_Integral}}</text>
					<view class="p-buy" :class="item.Gift_Qty==0 || (item.Gift_Integral > userInfo.User_Integral) ? 'nobuy' : ''" @click="exchange(item)">
						{{item.Gift_Qty > 0 ? (item.Gift_Integral > userInfo.User_Integral ? '积分不足' : '立即兑换') : '已抢光'}}
					</view>
				</view>
			</view>
		</view>
		<view class="wrap" v-if="psdInput">
			<view class="input-box">
				<input type="text" class="input-psw" v-model="password" placeholder="请输入支付密码"/>
				<view class="btns">
					<view class="cancel" @click="cancelPsw">取消</view>
					<view class="confirm" @click="pswConfirm">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getJifenProd,jifenProdDuihuan,getShipping} from '../../common/fetch.js'
	import {mapGetters} from 'vuex'
	import {pageMixin} from "../../common/mixin";
	export default {
		mixins:[pageMixin],
		data() {
			return {
				prod_list: [],
				hasMore: false,
				psdInput: false,
				Gift_ID: 0,
				isClicked: false, // 防止重复点击
				isChanged: false, //防止兑换重复点击
			}
		},
		computed: {
			...mapGetters(['userInfo']),
		},
		onShow(){
			this.reset();
			this.get_jifen_prod();

		},
		onLoad(){

		},
		methods: {
			reset(){
				this.prod_list = [];
				this.page = 1;
				this.hasMore = false;
				this.isClicked = false;
				this.isChanged = false;
			},
			// getShipping(){
			// 	getShipping().then(res=>{
			// 		this.wl_list = res.data
			// 	})
			// },
			get_jifen_prod(){
				getJifenProd({errtip: false}).then(res=>{
					let old = this.prod_list;
					this.prod_list = old.concat(res.data);
					if(this.prod_list.length < res.totalCount) {
						this.hasMore = true;
					}
				},err=>{

				})
			},
			gotoMyExchange(){
				if(this.isClicked) {return;}
				this.isClicked = true;
				uni.navigateTo({
					url: '/pagesA/person/myRedemption'
				})
				return;
			},
			cancelPsw(){
				this.psdInput = false;
				this.password = '';
			},
			pswConfirm(){
				// 判断需不需要物流,不需要物流，可以直接在本页面完成支付,需要物流跳转积分支付页面
				if(this.password == '') {
					uni.showToast({
						title: "密码不能为空",
						icon: 'none'
					});
					return;
				}
				jifenProdDuihuan({
					Gift_ID: this.Gift_ID,
					password: this.password
				}).then(res=>{
					uni.showToast({
						title: '兑换成功'
					});
					setTimeout(()=>{
						uni.navigateTo({
							url: '/pagesA/person/myRedemption'
						})
					},1500)
				},err=>{
					uni.showToast({
						title: res.msg
					})
				})
			},
			// 积分兑换
			exchange(item){
				if(this.isChanged) {return;}
				this.isChanged = true;
				// 判断是否可以兑换
				if(item.Gift_Qty <=0) {
					uni.showToast({
						title:"当前暂无库存",
						icon:'none'
					})
					this.isChanged = false;
					return false;
				}
				if(this.userInfo.User_Integral < item.Gift_Integral){
					uni.showToast({
						title:"您的积分不足",
						icon:'none'
					})
					this.isChanged = false;
					return false;
				}
				// 弹出密码输入框
				// 如果不需要物流
				if(item.Gift_Shipping == 0) {
					this.psdInput = true;
					this.isChanged = false;
				}else {
					uni.navigateTo({
						url: '/pagesA/person/jifenCheck?gift_id=' + item.Gift_ID
					})
				}
				this.Gift_ID = item.Gift_ID;
			}
		}
	}
</script>

<style scoped lang="scss">
	.all{
		min-height: 100vh;
		background-color: #FFFFFF !important;

	}
	.top {
		position: relative;
		height: 210rpx;
		width: 100%;
		background: #FF5C33;
		.img-wrap {
			position: absolute;
			left: 50%;
			bottom: -67rpx;
			margin-left: -360rpx;
			width: 720rpx;
			height: 230rpx;
			background-repeat:  no-repeat;
			background-position: left top;
			background-size: cover;
			.t-title {
				position: absolute;
				top: 63rpx;
				left: 48rpx;
				color: #999;
				font-size: 24rpx;
			}
			.t-amount {
				position: absolute;
				left: 49rpx;
				top: 102rpx;
				color: #FF5C33;
				font-size: 60rpx;
			}
			.my-change {
				position: absolute;
				right: 47rpx;
				top: 69rpx;
				width:160rpx;
				height:72rpx;
				background:linear-gradient(90deg,rgba(255,203,45,1) 0%,rgba(255,92,51,1) 100%);
				box-shadow:0rpx 10rpx 20rpx 0rpx rgba(104,114,255,0.25);
				border-radius:36rpx;
				color: #fff;
				font-size: 28rpx;
				line-height: 72rpx;
				text-align: center;
			}
		}
	}
	.content {
		padding-top: 67rpx;
		overflow: hidden;
		.product {
			float: left;
			width: 330rpx;
			margin: 0 22rpx 34rpx;
			.p-img {
				width: 100%;
				height: 330rpx;
				vertical-align: top;
			}
			.p-title {
				font-size: 28rpx;
				color: #333;
				line-height: 60rpx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.p-count {
				font-size: 22rpx;
				color: #999;
			}
			.p-price {
				color: #FE6444;
				font-size: 32rpx;
				.p-buy {
					float: right;
					height: 42rpx;
					width: 130rpx;
					font-size: 22rpx;
					color: #fff;
					background: #FE6444;
					text-align: center;
					line-height: 42rpx;
					border-radius: 20rpx;
				}
				& .nobuy {
					background: #D0D0D0;
				}
			}
		}
	}
	.wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		.input-box {
			position: absolute;
			top: 40%;
			left: 50%;
			width: 90%;
			transform: translateX(-50%);
			text-align: center;
			padding: 50rpx 0 20rpx;
			font-size: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			.btns {
				display: flex;
				justify-content: space-around;
				line-height: 60rpx;
			}
			.input-psw {
				border: 1px solid #efefef;
				width: 80%;
				margin: 0 auto 40rpx;
				line-height: 80rpx;
				height: 80rpx;
			}
		}
	}
</style>
