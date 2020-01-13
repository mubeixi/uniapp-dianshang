<template>
	<view class="page-wrap" @click="commonClick">
		<swiper class="swiper" @change="handleChange">
			<swiper-item class="swiper-item" v-for="(poster,idx) in poster_list">
				<image class="swiper-itm-img" :src="poster.img"></image>
			</swiper-item>

		</swiper>
		<div class="share-btn" @click="shareFn">
			分享
		</div>

		<canvas style="width: 404px; height: 718px;" canvas-id="firstCanvas"></canvas>
	</view>
</template>
<script>
	import {goBack}  from '../../common/tool.js'
	import {pageMixin} from "../../common/mixin";
	import {mapGetters,mapActions} from 'vuex';
	import {
		getDisInit,
		getDistributeWxQrcode,
		getPosterDetail,
		getPosterList
	} from "../../common/fetch";
	import {error} from "../../common";

	export default {
		mixins:[pageMixin],
		data() {
			return {
				currentIdx:0,
				is_build:false,
				qrimg:'',
				poster_list:[],
				// userInfo:{},
				disInfo:{},
				info:{
					dis_config:{},
					total_sales:'',
					total_income:'',
					balance:''
				},//

			};
		},
		computed:{
			...mapGetters(['initData','userInfo'])
		},
		onReady(){
			var context = uni.createCanvasContext('firstCanvas')

			context.arc(120, 80, 5, 0, 2 * Math.PI, true)
			context.stroke()
			context.draw()
		},
		onShow(){
			getDisInit({},{errtip:false}).then(res=>{
				this.info= res.data;
				this.userInfo.Is_Distribute=1;
				this.disInfo = res.data.disInfo;
			},err=>{

			}).catch(err=>{
				console.log(err)
			})

			//this.userInfo = this.getUserInfo()
		},
		onLoad(options){
			let {type,again} = options
			this.initFunc(type,again)
		},
		methods:{
			async shareFn(){
				if(this.is_build)return;//防止太快点击
				this.is_build = true
				let getPosterDataResult = await getPosterDetail({id:this.poster_list[this.currentIdx].id})
				let posterConf = JSON.parse(getPosterDataResult.data.data)

				console.log(posterConf)

			},
			handleChange(e){
				this.currentIdx = e.detail.current
			},
			...mapActions(['getUserInfo']),
			async initFunc(type,again){

				try {
					//先获取二维码
					let qrRet = await getDistributeWxQrcode({type,again,owner_id:this.userInfo.User_ID},{tip:'生成中'})
					this.qrimg = qrRet.data.img_url;

					let getPosterListResult = await getPosterList({pageSize:999})
					this.poster_list = getPosterListResult.data
				}catch (e) {
					error(e.msg||'获取海报模板失败')
				}

			},
			goBack(){
				goBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-wrap{

	.swiper{
		width: 750rpx;
		height: auto;
		position: absolute;
		bottom: 50px;
		left: 0;
		top: 0;
		.swiper-item{
			width: 750rpx;
			height: 100%;
			position: relative;
			.swiper-itm-img{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				box-shadow: 1px 1px 10px 10px rgba(0, 0, 0, 0.1);
				width: 600rpx;
				height: 1066rpx;
			}
		}
	}

	.share-btn{
		position: absolute;
		bottom: 0;
		width: 750rpx;
		text-align: center;
		height: 50px;
		line-height: 50px;
		background: $wzw-primary-color;
		color: white;
	}
}
</style>
