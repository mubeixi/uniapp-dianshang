<template>
	<view class="myall" @click="commonClick">
		<view class="top">

			<image class="back" :src="'/static/client/fenxiao/top.png'|domain" ></image>
			<!-- #ifdef H5 -->
			<image class="go" @click="goBack" src="/static/white-arrow-left.png" mode=""></image>
			<!-- #endif -->

			<view class="person">
				<image class="headimg"  :src="disInfo.Shop_Logo||disInfo.User_HeadImg" ></image>
				<view class="nickName">
					{{disInfo.Shop_Name}}
				</view>
			</view>


			<view class="putong">
				{{disInfo.Level_Name}}
			</view>
		</view>
		<div class="line15"></div>
<!--		<view class="tuiguang">-->
<!--			<view class="title">-->
<!--				复制推广链接分享给好友-->
<!--			</view>-->
<!--			<view class="inputSec">-->
<!--				<input class="inputw" type="text" value="http://csqy.haofenxiao.net/apl/uv3dn85c00/" disabled>-->
<!--				<text class="textw">复制</text>-->
<!--			</view>-->
<!--		</view>-->
		<view class="last">
			<view class="first" >
				<block v-for="(item,index) of funcModules.child" :key="index"> 
					<view class="left" @click="spreadQr(0,0)"  v-if="item.field=='erweima_weixin'">
						<image class="image" :src="'/static/client/fenxiao/weixin.png'|domain" ></image>
						<view class="haha">微信二维码</view>
					</view>
					<view class="right" @click="spreadQr(1,0)"  v-if="item.field=='erweima_tuiguang'">
						<image class="image" :src="'/static/client/fenxiao/tuiguang.png'|domain" ></image>
						<view class="haha">推广二维码</view>
					</view>
				</block>
				<!-- <view class="left" @click="spreadQr(0,0)" v-show="initData.login_methods.mp_flag==1">
					<image class="image" :src="'/static/client/fenxiao/weixin.png'|domain" ></image>
					<view class="haha">微信二维码</view>
				</view>
				<view class="right" @click="spreadQr(1,0)">
					<image class="image" :src="'/static/client/fenxiao/tuiguang.png'|domain" ></image>
					<view class="haha">推广二维码</view>
				</view> -->
<!--				<view class="right" @click="spreadQr(0,1)">-->
<!--					<image class="image" :src="'/static/client/fenxiao/chongsheng.png'|domain" ></image>-->
<!--					<view class="haha">重生微信二维码</view>-->
<!--				</view>-->
			</view>
			<view style="width: 100%;height: 1rpx;background-color: #F3F3F3;"></view>
<!--			<view class="second">-->
<!--&lt;!&ndash;				@click="showQr(1,0)"&ndash;&gt;-->
<!--				<view class="left"  @click="spreadQr(1,0)">-->
<!--					<image class="image" :src="'/static/client/fenxiao/tuiguang.png'|domain" ></image>-->
<!--					<view class="haha">推广二维码</view>-->
<!--				</view>-->
<!--				<view class="right" @click="spreadQr(1,1)">-->
<!--					<image class="image"  :src="'/static/client/fenxiao/chongshengtuiguang.png'|domain" ></image>-->
<!--					<view class="haha">重生推广二维码</view>-->
<!--				</view>-->
<!--			</view>-->
		</view>
	</view>
</template>
<script>
	import {goBack}  from '../../common/tool.js'
	import {pageMixin} from "../../common/mixin";
	import {mapGetters,mapActions} from 'vuex';
	import {getDisInit,getDistributeWxQrcode,getFuncModule} from "../../common/fetch";

	export default {
		mixins:[pageMixin],
		data() {
			return {
				// userInfo:{},
				disInfo:{},
				info:{
					dis_config:{},
					total_sales:'',
					total_income:'',
					balance:''
				},//
				funcModules: {}
			};
		},
		computed:{
			...mapGetters(['initData','userInfo'])
		},
		onShow(){
			getDisInit({},{errtip:false}).then(res=>{
				this.info= res.data;
				this.userInfo.Is_Distribute=1;
				this.disInfo = res.data.disInfo;
			}).catch(err=>{
			})
			this.getFuncModule();
			//this.userInfo = this.getUserInfo()
		},
		methods:{
			...mapActions(['getUserInfo']),
			spreadQr(type,again){
				// this.showQr(type,again)
				// return;
				uni.navigateTo({
					url:`/pagesA/fenxiao/shareQrcode?type=${type}&again=${again}`
				})
			},
			showQr(type,again){
				getDistributeWxQrcode({type,again,owner_id:this.userInfo.User_ID},{tip:'生成中'}).then(res=>{
					uni.previewImage({
						urls: [res.data.img_url]
					});
				})

			},
			goBack(){
				goBack();
			},
			// 获取功能模块
			getFuncModule(){
				getFuncModule({type:1,field:'erweima'}).then(res=>{
					this.funcModules = res.data[0];
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myall{
		background-color: #FFFFFF !important;
		min-height: 100vh;
	}
.top{
	width: 750rpx;
	height: 233rpx;
	overflow: hidden;
	position: relative;
	image.back{
		width: 100%;
	}
	.msg{
		width: 45rpx;
		height: 45rpx;
		position: absolute;
		top: 25rpx;
		right: 21rpx;
	}
	.go{
		width: 20rpx;
		height: 30rpx;
		position: absolute;
		top: 33rpx;
		left: 19rpx;
	}
	.person{
		width: 550rpx;
		height: 92rpx;
		overflow: hidden;
		position: absolute;
		top: 103rpx;
		left: 21rpx;
		display: flex;
		.headimg{
			height: 92rpx;
			width: 92rpx;
			border-radius: 50%;
		}
		.nickName{

			line-height: 92rpx;
			font-size:30rpx;
			font-weight:bold;
			color: #FFFFFF;
			margin-left: 10px;

		}
	}

	.ziliao{
		height:30rpx;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color: #FFFFFF;
		position: absolute;
		top:159rpx;
		left: 136rpx;
		.edit{
			width: 19rpx;
			height: 19rpx;
			margin-left: 18rpx;
		}
	}
	.putong{
		width:152rpx;
		height:50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #FFFFFF;
		font-size: 24rpx;
		color: #333333;
		position: absolute;
		top: 124rpx;
		right: 0rpx;
		border-radius:152rpx 0px 0px 152rpx;
	}

}
.tuiguang{
	height: 182rpx;
	width: 750rpx;
	padding: 50rpx 21rpx 22rpx 20rpx;
	box-sizing: border-box;
	.title{
		height:27rpx;
		font-size:28rpx;
		color: #333333;
		font-weight:500;
	}
	.inputSec{
		margin-top: 28rpx;
		height: 55rpx;
		display: flex;
		.inputw{
			width: 580rpx;
			height: 55rpx;
			border: 1px solid #B3B3B3;
			color: #999999;
			font-size: 26rpx;
			padding-left: 18rpx;
			box-sizing: border-box;
		}
		.textw{
			width: 100rpx;
			height: 55rpx;
			line-height: 55rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			background-color: #F43131;
			text-align: center;
			margin-left: 29rpx;
		}
	}
}
.last{
	width: 710rpx;
	/*height: 433rpx;*/
	margin: 0 auto;
	margin-top: 28rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0rpx 15rpx 0px rgba(0, 0, 0, 0.18);
	.first,.second{
		width: 710rpx;
		height: 216rpx;
		display: flex;
		position: relative;
		.left,.right{
			width: 50%;
			text-align: center;
			position: relative;
			.image{
				width: 79rpx;
				height: 79rpx;
			}
			.haha{
				font-size: 28rpx;
				color: #333333;
			}
		}
		.left:after{
			content: '';
			position: absolute;
			top: 68rpx;
			right: 0;
			height: 81rpx;
			width:1rpx;
			background-color: #E8E8E8;
		}
	}
	view.first .image{
		margin-top: 46rpx;
	}
	view.second .image{
		margin-top: 38rpx;
	}
}
</style>
