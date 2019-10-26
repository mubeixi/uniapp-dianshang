<template>
    <view v-if="loading">
      <!--  <pagetitle title="提交订单"></pagetitle> -->
        <view class="address" v-if="giftInfo.Gift_Shipping== 1" @click="goAddressList">
            <image class="loc_icon" src="/static/location.png" alt="" ></image>
            <view class="add_msg" v-if="addressinfo.Address_Name">
                <view class="name">收货人：{{addressinfo.Address_Name}} <span>{{addressinfo.Address_Mobile | formatphone}}</span></view>
                <view class="location">收货地址：{{addressinfo.Address_Province_name}}{{addressinfo.Address_City_name}}{{addressinfo.Address_Area_name}}{{addressinfo.Address_Town_name}}</view>
            </view>
						<view class="add_msg" v-else>
							<view>暂无收货地址，去添加</view>
						</view>
            <image class="right" src="/static/right.png" alt="" ></image>
        </view>
        <view class="order_msg">
						<img class="pro-img" :src="giftInfo.Gift_ImgPath" alt="">
						<view class="pro-msg">
							<view class="pro-name">{{giftInfo.Gift_Name}}</view>
							<view class="pro-price">{{giftInfo.Gift_Integral}} 积分</view>
						</view>
        </view>
        <view class="other" v-if="giftInfo.Gift_Shipping == 1">
            <view class="bd">
                <view class="o_title" @click="changeShip">
                    <span>运费选择</span>
                    <span style="text-align:right; color: #888;" >
						<span>{{shipping_name?(shipping_name + ' ' + (giftInfo.shipping_price > 0 ? giftInfo.shipping_price : '免运费')):'请选择物流'}}</span>
                        <image  class="right" src="/static/right.png" alt=""></image>
                    </span>
                </view>
            </view>
        </view>
        
		<view style="height: 100rpx;">
			<view class="order_total">
				
				<view class="submit" @click="form_submit">立即兑换</view>
			</view>
		</view>
        <popup-layer ref="popupRef" :direction="'top'">
        	<view class="bMbx" v-if="type=='shipping'">
        		<view class="fMbx">运费选择</view>
        		<view class="iMbx" v-for="(ship,shipid) in shipping_company" :key="shipid">
        			<view>
        				{{ship}}
        			</view>
					<radio-group @change="ShipRadioChange">
						<radio :value="shipid" :checked="shipid==ship_current" style="float:right;" color="#F43131"/>
					</radio-group>
        		</view>
        	</view>
        	<view class="sure" @click="closeMethod">
        		确定
        	</view>
        </popup-layer>
		<view class="remind-wrap" v-if="remindAddress">
			<view class="remind-add">
				<view class="text-align-center mb20">新建收货地址</view>
				<view class="remind_desc">
					您还没有收货地址，请先添加一个新的收货地址
				</view>
				<view class="remind_btns text-align-center">
					<view class="text-align-center fl1" @click="goback">返回</view>
					<view class="text-align-center fl1 confirm" @click="goEditAdd">
						新建
					</view>
				</view>
			</view>
		</view>
		<view class="pwd-wrap" v-if="psdInput">
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
import popupLayer from '../../components/popup-layer/popup-layer.vue';
import {getAddress,jifenProdDetail,getShipping,jifenProdDuihuan} from '../../common/fetch.js';
import {goBack} from '../../common/tool.js'
import {pageMixin} from "../../common/mixin";
import {check_money_in} from "../../common/util.js";
import {mapGetters,mapActions} from 'vuex';
export default {
	mixins:[pageMixin],
    components: {
        popupLayer
    },
    data(){
        return {
					show: false, // 遮罩层
					addressinfo: {}, // 收货地址信息
					orderInfo: {},
					type: 'shipping',
					current: '',	
					ship_current: 0,
					shipping_name: '', // 物流信息描述
					addressLoading: false, // 收货地址信息是否加载完
					giftLoading: false,
					submited: false,  // 是否已经提交过，防止重复提交
					back_address_id: 0,
					giftInfo: {}, //积分兑换产品，产品信息
					shipping_company: [], 
					psdInput: false,
					password: ''
        }
    },
	filters: {
		formatphone: function(value) {
			if(value) {
				var len= value.length;
				var xx= value.substring(3,len-4);
				var values = value.replace(xx,"****");
				return values;
			}
		}
	},
	onShow() {
		this.getAddress();
		this.getShipping();
	},
	async created(){
		let userInfo = this.getUserInfo(true);
	},
	onLoad(options) {
		
		this.gift_id = options.gift_id;
		
		this.jifenProdDetail();
	},
	computed: {
		loading: function(){
			return this.addressLoading && this.giftLoading
		},
		remindAddress: function(){
			return this.giftInfo.Gift_Shipping == 1 && !this.addressinfo.Address_Name
		},
		...mapGetters(['userInfo'])
	},
  methods: {
		...mapActions(['getUserInfo']),
		// 物流信息列表
		getShipping(){
			getShipping().then(res=>{
				this.shipping_company = res.data;
			})
		},
		// 积分兑换商品详情
		jifenProdDetail(){
			jifenProdDetail({
				Gift_ID: this.gift_id
			}).then(res=>{
				console.log(res)
				this.giftLoading = true;
				this.giftInfo = res.data;
			})
		},
		goback(){
			goBack();
		},
		// 跳转地址列表页
		goAddressList(){
			uni.navigateTo({
				url: '../addressList/addressList?from=checkout&addressid='+this.postData.address_id
			})
		},
		// 跳转新增地址页面
		goEditAdd(){
			uni.navigateTo({
				url: '../editAddress/editAddress?from=checkout'
			})
		},
		cancelPsw(){
			this.password = '';
			this.psdInput = false;
		},
		pswConfirm(){
			jifenProdDuihuan({
				Gift_ID: this.gift_id,
				password: this.password,
				Address_ID: this.address_id,
				Shipping_ID: this.shipping_id
			}).then(res=>{
				console.log(res)
			},err=>{
				uni.showToast({
					title: err.msg
				})
			})
		},
		// 提交订单
		form_submit() {
				if(this.giftInfo.Gift_Shipping == 1) {
					if(!this.shipping_id) {
						uni.showToast({
							title: '请选择物流',
							icon: 'none'
						});
						
						return;
					}					
				}
				if(!this.address_id) {
					uni.showToast({
						title: '收货地址错误',
						icon: 'none'
					});
					return;
				}
				this.psdInput = true;
				
				
			
		},
		

		// 物流改变
		ShipRadioChange(e) {
			for(var i in this.shipping_company) {
				if(i == e.target.value) {
					this.ship_current = i;
					break;
				}
			};
			this.shipping_id = e.target.value;
		},
		// 选择运费
		changeShip(){
			this.type = 'shipping';
			this.ship_current = this.shipping_id;
			console.log(this.ship_current);
			this.$refs.popupRef.show();
		},
		closeMethod(){
			
			for(var i in this.shipping_company) {
				if(i == this.shipping_id) {
					this.shipping_name = `${this.shipping_company[i]}`
				}
			}
			
			this.$refs.popupRef.close();
		},
		async getAddress(){
			this.$vm.$on('fire', (data) =>{
				this.back_address_id = data;
			})
			console.log(this.back_address_id)
			var Address_ID;
			if (this.back_address_id) {  //添加、选择收获地址返回
			    Address_ID = this.back_address_id;
			} else if (this.addressinfo.Address_ID) { //有收获地址，则更新（防止收获地址编辑后返回）
			    Address_ID = this.addressinfo.Address_ID;
			}
			console.log(Address_ID)
			await getAddress({Address_ID: Address_ID?Address_ID:0}).then(res=>{
				if (this.back_address_id && res.errorCode != 0) {  //添加、选择收获地址返回
					uni.showModal({
					  title: '错误',
					  content: '收货地址获取失败',
					  showCancel: false
					});
					return false;
				}
				if(res.errorCode == 0) {
					for(let i in res.data){
						for(let j in res.data[i]){
							if(j=='Address_Is_Default'){
								res.data[i][j] == 1;
								this.addressinfo = res.data[i]
							}
						}
					}
					this.address_id = this.addressinfo.Address_ID;
				}
				this.back_address_id = 0;

				// 获取用户收货地址，获取订单信息，后台判断运费信息
				
			},err=>{

			})

			this.addressLoading = true;

			},
		
    }
}
</script>

<style scoped lang="scss">
    .wrap {
        background: #fff;
    }
    /* 收货地址 start */
    .address {
        /* margin: 15px 0 10px; */
        display: flex;
        align-items: center;
        padding: 44rpx 38rpx 45rpx;
        // border-top: 30rpx solid #F3F3F3;
        border-bottom: 20rpx solid #F3F3F3;
		.add_msg {
			flex: 1;
			font-size: 28rpx;
		}
		.right {
		    width: 18rpx;
		    height: 27rpx;
		    margin-left: 34rpx;
		}
    }
    .loc_icon {
        width: 41rpx;
        height: 51rpx;
        margin-right: 31rpx;
    }

    .name {
        margin-bottom: 30rpx;
        font-size: 28rpx;
		color: #333;
		line-height: 22rpx;
    }
    .name>span {
        margin-left: 10rpx;
    }
    .location {
        font-size: 24rpx;
        color: #333;
		line-height: 32rpx;
    }
    /* 收货地址 end */
    /* 订单信息 start */
    .order_msg {
			display: flex;
      padding: 0 40rpx 0 30rpx;
    }
    
    .pro {
        display: flex;
        margin-bottom: 50rpx;
    }
	.order_msg .pro:last-child {
		margin-bottom:17rpx
	}
    .pro-img {
        width: 200rpx;
        height: 200rpx;
        margin-right: 28rpx;
    }
    .pro-name {
        font-size: 30rpx;
			display: -webkit-box;
			-webkit-line-clamp:2;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			line-height: 60rpx;
    }
	.pro-msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
    
    .pro-price {
        color: #F43131;
        font-size: 36rpx;
			span {
				font-size: 24rpx;
				font-style: normal;
			}
    }

    /* 订单信息 end */
    /* 订单其他信息 start */
    .other {
        padding: 30rpx 40rpx 0 30rpx;
        font-size: 22rpx;
		.right {
			margin-left: 18rpx;
			width: 15rpx;
			height: 23rpx;
		}
    }
    .other .bd {
        padding-bottom: 30rpx;
        border-bottom: 2rpx solid #efefef;
    }
    .o_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
		input {
			font-size: 24rpx;
		}
    }
    .o_title .van-switch {
        float: right;
    }
    .o_desc,
	.o_de {
		font-size: 22rpx;
        margin-top: 10rpx;
		text {
			color: #F43131;
		}
    }
	.o_de {
		color: #999;
	}
    .words {
        justify-content: flex-start;
    }
    .words input {
        border: 0;
        margin-left: 20rpx;
		flex: 1;
    }
    .total {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 40rpx 0;
        font-size: 24rpx;
        padding-right: 30rpx;
    }
    .total .money {
        font-size: 30rpx;
        color: #F43131;
    }
    /* 订单其他信息 end */
    /* 提交订单 */
    .order_total {
        height: 100rpx;
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        background: #fff;
        z-index: 100;
    }
    .submit {
        width: 100%;
        background: #F43131;
        text-align: center;
        color: #fff;
        line-height: 100rpx;
		font-size: 34rpx;
    }
    .totalinfo {
        flex: 1;
        padding-left: 93rpx;
		line-height: 30rpx;
    }
    .info {
        font-size: 24rpx;
		.money {
			color: #F43131;
			font-size: 30rpx;
			.m_icon {
				font-size: 24rpx;
			}
		}
    }
    .tips {
        font-size: 20rpx;
        color: #979797;
    }
	.bMbx{
		padding: 0rpx 20rpx;
		.fMbx{
			font-size: 32rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			padding: 36rpx 0rpx;
		}
		.iMbx{
			display: flex;
			justify-content: space-between;
			height: 104rpx;
			border-bottom:1px solid rgba(230,230,230,1);
			align-items: center;
			font-size: 28rpx;
		}
	}

	.sure{
		height: 90rpx;
		width: 100%;
		background-color: #F43131;
		color: #fff;
		font-size: 32rpx;
		margin-top: 96rpx;
		line-height: 90rpx;
		text-align: center;
	}
	// 提醒用户添加收货地址信息
	.remind-wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		.remind-add {
			background: #fff;
			width: 90%;
			padding: 50rpx 0 0;
			border-radius: 20rpx;
			overflow: hidden;
			.text-align-center {
				text-align: center;
			}
			.mb20 {
				margin-bottom:20rpx;
			}
			.remind_desc {
				padding: 0 20rpx;
				font-size: 30rpx;
				margin: 40rpx 0;
				color: #666;
			}
			.remind_btns {
				display: flex;
				border-top: 1rpx solid #efefef;
				line-height: 90rpx;
				.fl1 {
					flex: 1;
				}
				.confirm {
					background: #F43131;
					color: #fff;
				}
			}
		}
	}
	.pwd-wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		z-index: 9999;
		.input-box {
			position: absolute;
			top: 35%;
			left: 50%;
			width: 90%;
			transform: translateX(-50%);
			text-align: center;
			padding: 70rpx 0 20rpx;
			font-size: 30rpx;
			background: #fff;
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
