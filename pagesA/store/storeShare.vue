<template>
	<view class="store-share" >
		<image id="scream" :src="'/static/client/store/shareStore.png'|domain" class="store-img"></image>
		<image :src="storeDetail.Stores_ImgPath" class="user-img"></image>
		<div class="store-type">
			<image src="/static/store/storeType.png" class="store-img"></image>
			<div class='store-type-title' v-if="type!=3">
				邀请你开通 <span class="store-color">{{type==1?'代理商':'社区门店'}}</span>
			</div>
			<div class='store-type-title' v-else-if="type==3">
				邀请你进入我的店铺
			</div>
		</div>
		<div class="user-name">{{storeDetail.Stores_Name}}</div>
		<image :src="qrcode" class="store-qrcode"></image>
		<div class="store-qc-text">长按识别图中二维码</div>

		<canvas class="myCanvas" id="myCanvas" canvas-id="myCanvas"/>

		<div class="button-store" @click="saveAll" >

			<image src="/static/store/saveHai.png"  style="width: 100%;height: 100%"></image>
			<div class="button-text">保存海报</div>
		</div>
	</view>
</template>

<script>
	import {domainFn} from '../../common/filter';

	let canvasInstance = null
	const cutstrFun = (str, len, tip = '..') => {
	  if (!str) return ''
	  if (str.length < len) return str
	  return str.substring(0, len) + tip
	}
	const Promisify = (functionName, params) => {
	  return new Promise((resolve, reject) => {
	    uni[functionName]({
	      ...params,
	      success: res => resolve(res),
	      fail: res => reject(res)
	    })
	  })
	}

	const getImg = (params) => {
		console.log(params)
	  return new Promise((resolve, reject) => {
	    uni.getImageInfo({
	    	src: params,
	    	success: res => resolve(res),
	    	fail: res => reject(res)
	    })
	  })
	}
	import {showLoading,hideLoading} from '../../common/index.js'

	import {mapGetters,mapActions, mapState} from 'vuex';
	import {pageMixin} from "../../common/mixin";
	import {getStoreShare,storeInit} from '../../common/fetch.js'
	import {error} from '../../common/index.js'
	import {toast} from '../../common/index';
	export default {
		mixins:[pageMixin],
		data() {
			return {
				type:1,
				qrcode:'',
				imgSave:'',
				storeDetail:{},
				storeid:''
			};
		},

		computed:{
			...mapGetters(['userInfo','Stores_ID'])
		},
		methods:{
			saveAll(){
				// #ifdef H5
					toast('长按保存分享海报')
					uni.previewImage({
					  urls: [this.imgSave] // 需要预览的图片http链接列表
					})
				// #endif
				// #ifndef H5
					uni.saveImageToPhotosAlbum({
						filePath: this.imgSave,
						success: function () {
							toast('保存成功')
						},
						fail(){
							error('保存失败')
						}
					});
				// #endif


			},
			async init(){
				let data={
					stores_type:this.type,
					// #ifdef MP-WEIXIN
					qrcode_type:'wx_lp'
					// #endif
					// #ifndef MP-WEIXIN
					qrcode_type:'wx_mp'
					// #endif
				}
				if(this.type==3){
					data.act_type=2
					data.store_id=this.storeid
				}else{
					data.store_id=this.Stores_ID
				}
				await getStoreShare(data).then(res=>{
					this.qrcode=res.data.qrcode
				}).catch(e=>{error(e.msg||'获取二维码失败')})



					await storeInit({
						store_id: this.Stores_ID
					}).then(res=>{
						this.storeDetail = res.data;
					}).catch(err=>{
						console.log(err.msg||'初始化门店失败')
					})


				this.initAll()


			},
			async initAll(){
				try {

					showLoading('加载中')

					const thumbTempFile = await getImg(this.storeDetail.Stores_ImgPath ).catch(e => { throw Error(e.errMsg || '缓存商品缩略图失败') })

					const wrapHeight=718
					 const ctx = canvasInstance
					 ctx.fillRect(0, 0, 414, wrapHeight)

					const bgTempFile = await getImg( domainFn('/static/client/store/shareStore.png') ).catch(e => { throw Error(e.errMsg || '缓存背景图失败') })
					 ctx.drawImage(bgTempFile.path, 0, 0, 414, wrapHeight)


					 ctx.drawImage('/static/store/storeType.png', 90, 140,214, 35)


					if(this.type==3){
						ctx.setFillStyle('#FEFEFE')
						ctx.setFontSize(16)
						ctx.textAlign = 'center'
						const showProductNameAgree = cutstrFun('邀请你进入我的店铺', parseInt(640 / 24)) // 只显示一行
						ctx.fillText(showProductNameAgree, 198, 162)
					}else{
						ctx.setFillStyle('#FEFEFE')
						ctx.setFontSize(16)
						ctx.textAlign = 'center'
						const showProductNameAgree = cutstrFun('邀请你开通', parseInt(640 / 24)) // 只显示一行
						ctx.fillText(showProductNameAgree, 170, 162)

						let str=this.type==1?'代理商':'社区门店'
						ctx.setFillStyle('#EBED24')
						ctx.setFontSize(16)
						ctx.textAlign = 'center'
						const typeName = cutstrFun(str, parseInt(640 / 24)) // 只显示一行
						ctx.fillText(typeName, 244, 162)
					}




					 // 商品名称
					 ctx.setFillStyle('#F64E25')
					 ctx.setFontSize(11)
					 ctx.textAlign = 'center'
					 const showProductNames = cutstrFun('长按识别图中二维码', parseInt(640 / 24)) // 只显示一行
					 ctx.fillText(showProductNames, 196, 594)

					// 商品名称
					ctx.setFillStyle('#FFFFFF')
					ctx.setFontSize(17)
					ctx.textAlign = 'center'
					const showProductName = cutstrFun(this.storeDetail.Stores_Name, parseInt(640 / 24)) // 只显示一行
					ctx.fillText(showProductName, 260, 100)




					// 头像(需要画个圆角)
					ctx.save()
					ctx.beginPath()
					ctx.arc(160, 90 , 25, 0,  2 * Math.PI)
					ctx.clip()
					ctx.drawImage(thumbTempFile.path,134,66,50,50)
					ctx.restore()


					const qrcode = await getImg(this.qrcode).catch(e => { throw Error(e.errMsg || '二维码失败') })
					ctx.fillRect(120, 410, 312/2, 312/2)
					ctx.drawImage(qrcode.path, 120, 410,312/2, 312/2)




					await new Promise(resolve => {
					  ctx.draw(false, function () {
					    resolve()
					  })
					})

					const { tempFilePath } = await Promisify('canvasToTempFilePath', { canvasId: 'myCanvas' })
					console.log(tempFilePath)
					this.imgSave=tempFilePath
					// uni.previewImage({
					//   urls: [tempFilePath] // 需要预览的图片http链接列表
					// })

				} catch(e){
					console.log(e)
				} finally {
						hideLoading()
			   }
			}
		},
		created(){
			// uni.getImageInfo({
			// 	src: 'https://new401t.bafangka.com/static/client/store/shareStore.png',
			// 	success: res => {
			// 		console.log(res)
			// 	},
			// 	fail: err=>{
			// 		console.log(err)
			// 	}
			// })
		},
		mounted() {
				canvasInstance = uni.createCanvasContext('myCanvas')
				this.init()
		},
		onLoad(options) {
			this.type=options.type
			if(options.store){
				this.storeid=store
			}

		}
	}
</script>

<style lang="scss" scoped>
	.myCanvas {
	  position: fixed;
	  left: 100%;
	  top: 0;
	  background: white;
	  width: 414px;
	  height: 718px;
	}
.store-share{
	width: 750rpx;
	height: 100vh;
	position: relative;
	overflow: hidden;
}
.store-img{
	width: 100%;
	height: 100%;
}
.user-img{
	width: 98rpx;
	height: 98rpx;
	border-radius: 50%;
	position: absolute;
	top: 88rpx;
	left: 230rpx;
}
.user-name{
	height: 34rpx;
	line-height: 34rpx;
	font-weight:bold;
	font-size: 34rpx;
	color: #FFFFFF;
	position: absolute;
	top: 120rpx;
	left: 352rpx;
	width: 350rpx;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.store-type{
	width: 428rpx;
	height: 70rpx;
	position: absolute;
	top: 226rpx;
	left: 160rpx;
}
.store-type-title{
	width: 298rpx;
	height: 32rpx;
	font-size: 32rpx;
	line-height: 32rpx;
	color: #EFEFEF;
	position: absolute;
	top: 16rpx;
	left: 68rpx;
}
.store-color{
	color: #EBED24;
}
.store-qrcode{
	width: 312rpx;
	height: 312rpx;
	position: absolute;
	top: 55.8%;
	left: 218rpx;
}
.store-qc-text{
	height: 22rpx;
	line-height: 22rpx;
	font-size: 22rpx;
	color: #F64E25;
	width: 750rpx;
	text-align: center;
	position: absolute;
	left: 0;
	top: 82.5%;
}
	.button-store{
		width: 680rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 32rpx;
		color: #FFFFFF;
		background-color: #ff542b;
		border-radius: 90rpx;
		position: fixed;
		left: 34rpx;
		bottom: 30rpx;
		.button-text{
			width: 680rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 32rpx;
			color: #FFFFFF;
			position: absolute;
			left: 0;
			top: 0;
		}
	}
</style>
