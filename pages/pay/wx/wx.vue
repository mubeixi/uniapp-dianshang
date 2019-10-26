<template>
	<view>
		请按提示完成支付宝支付
		<!--分享引导框开始-->
		<div class="hide guide_box" v-show="isShowGuide" @click="isShowGuide=false">
			<div class="mask"></div>
			<div><image src="/static/share/guide_point.png"  class="guide_point" /></div>
			<div><image  src="/static/share/guide_btn.png"  class="guide_btn"  /></div>
		</div>
		<!--分享引导框结束-->
	</view>
</template>

<script>
	import {isWeiXin,ls} from "../../../common/tool";

	export default {
		data() {
			return {
				isShowGuide:true,
			};
		},
		onLoad(options){

			//字符串进行解密
			if(!ls.get('is_reload_alipay')){
				ls.set('is_reload_alipay',1);
				location.reload()
				return;
			}

			if(!isWeiXin() && options.formurl){

				let redirect = options.formurl
				redirect = redirect.replace(/wangjing666/,'openapi.alipay.com')
				console.log(redirect)
				document.body.innerHTML = redirect;
				// document.write(redirect)
				document.getElementById('alipaysubmit').submit()
			}
		},
	}
</script>

<style lang="less">
.guide_box{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 9;
	text-align: right;
	.mask{
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.7);

	}
	.guide_point{
		width: 375rpx;
		height:475rpx;
		/*margin-right: 10px;*/
	}
	.guide_btn{
		width: 189rpx;
		height:63rpx;
		margin-right: 20px;
	}
}

</style>
