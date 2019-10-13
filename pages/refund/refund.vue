<template>
  <div class="wrap">
        <page-title title="申请退款" rightHidden="true"></page-title>
        <div class="pro" v-for="(item,index) of data.refund_prod_list" :key="item">
            <div class="pro-div">
        		<img class="pro-img" :src="item.prod_img" alt="">
        	</div>
            <div class="pro-msg">
                <div class="pro-name">{{item.prod_name}}</div>
                <div class="attr"><span>{{item.attr_info.attr_name}}</span></div>
                <div class="pro-price"><span>￥</span>{{item.refund_money_fee}} <span class="amount">x{{item.prod_count}}</span></div>
            </div>
        </div>
		<div style="height: 20rpx;width: 100%;background-color: #F3F3F3;">
			
		</div>
        <div class="item">
            <div class="item-left">退款方式</div>
            <div class="item-right" @click="showMethod">
                <span>仅退款</span>
                <img src="/static/right.png" alt="">
            </div>
        </div>
        <div class="item">
            <div class="item-left">退款原因</div>
            <div class="item-right" @click="showReason">
				<span>质量问题</span>
                <img src="/static/right.png" alt="">
            </div>
        </div>
        <div class="item spe">
            <div class="item-left">退款金额</div>
            <input type="text" placeholder="请输入退款金额" placeholder-style="font-size:24rpx;color:#B8B8B8">
        </div>
        <div class="item spe">
            <div class="item-left">退款说明</div>
            <input type="text" placeholder="请输入退款说明" placeholder-style="font-size:24rpx;color:#B8B8B8">
        </div>
        <div class="item noborder">上传凭证</div>
        <div class="imgs">
			<view class="shangchuans" v-for="(item,index) of imgs" :key="index"   @click="yulan(index)">
				<image :src="item.path" ></image>
				<image src="/static/delimg.png" class="del" @click="delImg(index)"></image>
			</view>
            <view class="shangchuan" @click="addImg">
				<view class="heng"></view>
				<view class="shu"></view>
			</view>
        </div>
        <div style="height: 50px;"></div>
        <div class="bottom" @click="submit">提交</div>
        <!-- 弹出层 -->
        <!-- 退款方式 -->
        <popup-layer ref="popupRef" :direction="'top'">
        	<div class="bMbx">
				<div class="fMbx">退款方式</div>
				<div class="iMbx">
					<div>
						仅退货
					</div>
					<div>
						 <radio  :checked="onlyRefund"  color="#F43131"/>
					</div>
				</div>
				<div class="iMbx">
					<div>
						退款退货
					</div>
					<div>
						 <radio  :checked="onlyRefund"  color="#F43131"/>
					</div>
				</div>
			</div>
			<div class="sure" @click="closeMethod">
					确定
			</div>
        </popup-layer>
        <!-- 退款原因 -->
		<popup-layer ref="popup" :direction="'top'">
			<div class="bMbx">
				<div class="fMbx">退款原因</div>
				<div class="iMbx">
					<div>
						颜色/尺寸/参数不符
					</div>
					<div>
						 <radio-group @change="ShipRadioChange">
						 	<radio :value="shipid" :checked="shipid===ship_current" style="float:right;" color="#F43131"/>
						 </radio-group>
					</div>
				</div>
				<div class="iMbx">
					<div>
						质量问题
					</div>
					<div>
						 <radio  :checked="onlyRefund"  color="#F43131"/>
					</div>
				</div>
				<div class="iMbx">
					<div>
						少件/漏发
					</div>
					<div>
						 <radio  :checked="onlyRefund"  color="#F43131"/>
					</div>
				</div>
			</div>
			<div class="sure" @click="closeReason">
					确定
			</div>
		</popup-layer>
		
  </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue';
import {uploadImage,getRefund} from '../../common/fetch.js'
import {pageMixin} from "../../common/mixin";

export default {
	mixins:[pageMixin],
    components: {
		popupLayer
    },
    data() {
        return {
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://cloud-image', isImage: true }
            ],
			onlyRefund:0,
			imgs:[],//上传图片预览
			Order_ID:0,//退款商品id
			data:'',//商品信息
			
        }
    },
	onLoad(option) {
		this.Order_ID=option.Order_ID;
	},
	onShow() {
		this.getRefund();
	},
	created() {
		
	},
    methods: {
		//图片预览
		yulan(index){
			// uni.previewImage({
			//             urls: this.imgs,
			// 			indicator:'default',
			// 			current:index, 
			//             longPressActions: {
			//                 success: function(data) {
								
			//                 },
			//                 fail: function(err) {
									
			//                 }
			//             }
			// });
		},
		//获取申请退货退款页面
		getRefund(){
			getRefund({Order_ID:this.Order_ID,User_ID:3}).then(res=>{
					for(var i in res.data) {
						if(i=='refund_prod_list'){
							for(var j in res.data[i]) {
								for(var k in res.data[i][j]) {
									if(k=='attr_info'){
										res.data[i][j][k]=JSON.parse(res.data[i][j][k])
									}
								}
							}
						}
					}
					this.data=res.data;
			}).catch(e=>{
				console.log(e)
			})
		},
		//提交
		submit(){
			uploadImage({'image':this.imgs[0]}).then(res=>{
				console.log(res)
			}).catch(e=>{
				console.log(e)
			})
		},
		//删除某张预览图片
		delImg(index){
			this.imgs.splice(index, 1);
		},
		addImg(){
			let that=this;
			uni.chooseImage({
				count:3,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有  
				success(res) {
					for(let item of res.tempFiles){
						that.imgs.push(item);
					}
					
					console.log(res.tempFiles);
				},
				fail(e) {
					console.log(e);
				}
			})
		},
		showMethod(){
			this.$refs.popupRef.show();
		},
		showReason(){
			this.$refs.popup.show();
		},
		closeMethod(){
			this.$refs.popupRef.close();
		},
		closeReason(){
			this.$refs.popup.close();
		}
    }
}
</script>

<style scoped lang="scss">
	.shangchuans{
		width:146rpx;
		height:146rpx;
		border:1px solid rgba(186,186,186,1);
		position: relative;
		margin-right: 28rpx;
		margin-bottom: 28rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.del{
			width: 38rpx;
			height: 38rpx;
			position: absolute;
			top: -19rpx;
			right: -19rpx;
		}
	}
	.shangchuan{
		width:146rpx;
		height:146rpx;
		border:1px solid rgba(186,186,186,1);
		position: relative;
		margin-bottom: 28rpx;
		.heng{
			width: 76rpx;
			height: 3rpx;
			background-color: #BABABA;
			position: absolute;
			top: 72rpx;
			left: 35rpx;
		}
		.shu{
			width: 3rpx;
			height: 76rpx;
			background-color: #BABABA;
			position: absolute;
			top: 35rpx;
			left: 72rpx;
			
		}
	}
    .wrap {
     /*   height: 100vh; */
        background: #fff;
    }
    .pro {
        display: flex;
        margin-bottom: 30rpx;
        margin-top: 30rpx;
    }
    .pro-msg{
    	 margin-left: 27rpx;
    	 width: 476rpx;
    }
    .pro-div{
    	width: 200rpx;
    	height: 200rpx;
		margin-left: 20rpx;
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
    .item {
        display: flex;
        height: 50px;
        padding: 0 10px;
        width: 95%;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        border-bottom: 1px solid #E3E3E3;
    }
    .spe {
        justify-content: flex-start;
    }
    .item-left {
        margin-right: 10px;
		font-size: 28rpx;
    }
    .item-right {
        color: #888;
		font-size: 24rpx;
    }
    .noborder {
        border: none;
    }
    .item-right img {
        width: 15rpx;
        height: 23rpx;
        margin-left: 25rpx;
    }
    /* 上传图像 */
    .imgs {
        display: flex;
        padding: 0 20rpx;
		padding-right: 0rpx;
		flex-wrap: wrap;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 86rpx;
        line-height: 86rpx;
		font-size: 32rpx;
        color: #fff;
        text-align: center;
        background: #F43131;
		z-index: 9999;
    }
    /* 退款 */
    .methods,
    .reason {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 101;
        background: #fff;
        padding-top: 20px;
    }
    .m-title {
        text-align: center;
        margin-bottom: 10px;
    }
    .confirm-method {
        background: #F43131;
        color: #fff;
        text-align: center;
        line-height: 50px;
        width: 100%;
        margin-top: 20px;
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
</style>