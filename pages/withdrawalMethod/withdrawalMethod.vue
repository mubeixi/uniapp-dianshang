<template>
	<view class="all" :style="{'min-height':height+'px'}">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" ><!-- 这里是状态栏 --></view>
		<!-- #endif -->
		<page-title title="我的提现方式" :rightHidden="false" bgcolor="#ffffff" :right="isShow ? '取消' : '管理'" @rightHandle="handle"></page-title>
		<view class="content">
			<block v-for="(item,index) of data " :key="index" >
				<view class="cardInfo" @click="change(item)" v-if="item.Method_Type=='bank_card'||item.Method_Type=='alipay'">
					{{item.Method_Name}} （{{item.Account_Val}}）
					<image src="/static/fenxiao/xuanzhong.png" v-if="User_Method_ID==item.User_Method_ID&&!isShow"></image>
					<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAeCAYAAADZ7LXbAAAEj0lEQVRIS+2WS2xUVRjH/985tzPTOw9aUohKk4Ip0DZ0ypSFC9EdMaIJEhBJfCzUEI3xRQhsTDRuxKWRRBcoLExEMakSfGx9LIyBTmcgJCqGkZQ2UjqlnWHuPO49f3PuTBWlTaDuDGd17/3O/X7f+Z/XX7BAI+BUMpktJPcS2CQikfluAvD6Xwj4AEYFeMdV6ms5fbrx75SyEKSUyawQ8hCAbRCZI1kUEQNAbAFCagsjIBBJAUgK8A0bjT2Js2f/uClIZWholVHqSwCrYMx+x5hvKUIhpa6UE3UcVavXYd+V42w2Im8JcEkFwUNuPj9+A2Rq/fpkVyKhbGAGQKfjsF6p3NXQ+ritUoJge7VSOS/LloWjtvH5JMXpacRct5dajwCYbfP9XRHXnZjxfelsdZryvECuZTJvAugItbB6k4GILCOwjWRUgC8AXIZSCmRTXrGqwQoWKHJlADwiIjXbl+QsRKyctpMd/WUpZzLjIFNoah6msMlExJYsAvgEmrF5yHUgAVQ4TzZK+q0C5ouwsUkLOShkiiJe+C8ZMyK26kA1K9b283wF1+sdatxcbYGxBYhoRRqKVFu5ogCuyHRvbyqSTEZF5E40GjS12mTSde2yXFqrVnU5Gr0jorWuk5PVSqUaalweHk6DfJdkQGOeT+XzPy+NAHj9/T1BLPY+gDiAFxPZbC6ElDKZ+wX4REhfyB1uLvfTUiG14eH+ujEnBYhrkV3t2ex3IWRuaGizUuqYnWQAO+PZ7KklQwYH+xqOc8KORBvzWHsu98M/IAB8aUE4MBApt7WtFa11vFj8BYVCvdTX1xlx3c6oXabZ7DRWr47Uli/vpjF+TOtL9kipDQ721R3nRDiSxSA+sLMjmz1VSae7jdYfCpDU5FNTV66Md3R1Pa2AJynyeaVWO+TGYncL+Z49dqrkc1253KW5wcE+uVmIl06vCbT+CmSS5AMJslDR+gDJV0TkaLVUes1x3QGt9QiBq04QbG3P5y/cGmTjxtWByEl7+NGYrdfIQlKpfQReBnA07nmve7FYv1FqBORMA3i4c2ys8J8hcaX2CfASRI7GK5U3bkP8+dXlLTAnt+W6Ycf/D+X6e8cnaMyD14ALSa0PgHwVIkduecd7Q0ObA6WOhQekyI746OjpmUymJwJ8TCDORmN3qVj8PbVy5QsU2QPy06rnHXSj0bXU+gjJOadef7z93LmLi+/4dPo+pbWF1Bvk9s6xsbGJTZvcVBDcK0CkWi5/v/z8+fJsOt0TVapHyIloLvdbsbc37iaTmQbZmL56dXRNoVCtDg/3+sactE6Hvr87eeZM8z6ZTafv0Up9Zk2ACoJdbj7/Y+vytnFrJha64he8ckobNvSrtrYTJNuVMTttrhDS2njHAQwAOExyJBApt7XS+MYo+2wNnr3VnKbhkNCPtuyRI8KAjAiwRUT2AvjVD4JHO/L5CyGE3d3t3ooVzxpyvwAdFClZtwKxg7jJRutaIRSxlrVE4O3E1NRhGR/3/koyt25dl4rHnwH5BIEetYgNWgxp7ZE1cwAuGpGPBPggmc1O2f5/AvPcqK1wakZUAAAAAElFTkSuQmCC" class="del" v-else-if="isShow" @click="del(item)"></image>
				</view>
				<view class="cardInfo" @click="change(item)" v-else>
					{{item.Method_Name}}
					<image src="/static/fenxiao/xuanzhong.png" v-if="User_Method_ID==item.User_Method_ID&&!isShow"></image>
					<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAeCAYAAADZ7LXbAAAEj0lEQVRIS+2WS2xUVRjH/985tzPTOw9aUohKk4Ip0DZ0ypSFC9EdMaIJEhBJfCzUEI3xRQhsTDRuxKWRRBcoLExEMakSfGx9LIyBTmcgJCqGkZQ2UjqlnWHuPO49f3PuTBWlTaDuDGd17/3O/X7f+Z/XX7BAI+BUMpktJPcS2CQikfluAvD6Xwj4AEYFeMdV6ms5fbrx75SyEKSUyawQ8hCAbRCZI1kUEQNAbAFCagsjIBBJAUgK8A0bjT2Js2f/uClIZWholVHqSwCrYMx+x5hvKUIhpa6UE3UcVavXYd+V42w2Im8JcEkFwUNuPj9+A2Rq/fpkVyKhbGAGQKfjsF6p3NXQ+ritUoJge7VSOS/LloWjtvH5JMXpacRct5dajwCYbfP9XRHXnZjxfelsdZryvECuZTJvAugItbB6k4GILCOwjWRUgC8AXIZSCmRTXrGqwQoWKHJlADwiIjXbl+QsRKyctpMd/WUpZzLjIFNoah6msMlExJYsAvgEmrF5yHUgAVQ4TzZK+q0C5ouwsUkLOShkiiJe+C8ZMyK26kA1K9b283wF1+sdatxcbYGxBYhoRRqKVFu5ogCuyHRvbyqSTEZF5E40GjS12mTSde2yXFqrVnU5Gr0jorWuk5PVSqUaalweHk6DfJdkQGOeT+XzPy+NAHj9/T1BLPY+gDiAFxPZbC6ElDKZ+wX4REhfyB1uLvfTUiG14eH+ujEnBYhrkV3t2ex3IWRuaGizUuqYnWQAO+PZ7KklQwYH+xqOc8KORBvzWHsu98M/IAB8aUE4MBApt7WtFa11vFj8BYVCvdTX1xlx3c6oXabZ7DRWr47Uli/vpjF+TOtL9kipDQ721R3nRDiSxSA+sLMjmz1VSae7jdYfCpDU5FNTV66Md3R1Pa2AJynyeaVWO+TGYncL+Z49dqrkc1253KW5wcE+uVmIl06vCbT+CmSS5AMJslDR+gDJV0TkaLVUes1x3QGt9QiBq04QbG3P5y/cGmTjxtWByEl7+NGYrdfIQlKpfQReBnA07nmve7FYv1FqBORMA3i4c2ys8J8hcaX2CfASRI7GK5U3bkP8+dXlLTAnt+W6Ycf/D+X6e8cnaMyD14ALSa0PgHwVIkduecd7Q0ObA6WOhQekyI746OjpmUymJwJ8TCDORmN3qVj8PbVy5QsU2QPy06rnHXSj0bXU+gjJOadef7z93LmLi+/4dPo+pbWF1Bvk9s6xsbGJTZvcVBDcK0CkWi5/v/z8+fJsOt0TVapHyIloLvdbsbc37iaTmQbZmL56dXRNoVCtDg/3+sactE6Hvr87eeZM8z6ZTafv0Up9Zk2ACoJdbj7/Y+vytnFrJha64he8ckobNvSrtrYTJNuVMTttrhDS2njHAQwAOExyJBApt7XS+MYo+2wNnr3VnKbhkNCPtuyRI8KAjAiwRUT2AvjVD4JHO/L5CyGE3d3t3ooVzxpyvwAdFClZtwKxg7jJRutaIRSxlrVE4O3E1NRhGR/3/koyt25dl4rHnwH5BIEetYgNWgxp7ZE1cwAuGpGPBPggmc1O2f5/AvPcqK1wakZUAAAAAElFTkSuQmCC" class="del" v-else-if="isShow" @click="del(item)"></image>
				</view>
			</block>
		</view>
		<view class="addMethod" @click="addMethod">
			+ 添加提现方式
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getUserWithdrawMethod,delUserWithdrawMethod} from '../../common/fetch.js'
	export default {
		mixins:[pageMixin],
		data(){
			return {
				height:1000,//获取手机屏幕高度
				data:[],//用户提现方式
				User_Method_ID:-1,//传过来选中的提现方式
				isShow:false,//是否显示删除
			};
		},
		onLoad(options) {
			let that=this;
			if(that.User_Method_ID){
				that.User_Method_ID=options.User_Method_ID;
			}
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
		},
		onShow() {
			this.$vm.$on('fir', (data) =>{
				this.User_Method_ID = data;
			})
			this.getUserWithdrawMethod();
		},
		methods:{
			//删除提现方式
			del(item){
				let that=this;
				let data={
					User_Method_ID:item.User_Method_ID
				}
				uni.showModal({
				    title: '确定要删除吗？',
					cancelColor:'#000000',
					confirmColor:"#000000",
				    content: '',
				    success: function (res) {
				        if (res.confirm) {
				           delUserWithdrawMethod(data).then(res=>{
								uni.showToast({
									title:res.msg
								})
								that.getUserWithdrawMethod();
				           }).catch(e=>{
				           	console.log(e)
				           })
				        } else if (res.cancel) {

				        }
				    }
				});

			},
			//管理切换选中 删除
			handle(){
				this.isShow=!this.isShow;
			},
			//选中提现方式
			change(item){
				if(this.isShow){
					return;
				}
				this.User_Method_ID=item.User_Method_ID;
				// uni.navigateTo({
				// 	url:'../withdrawal/withdrawal?User_Method_ID='+this.User_Method_ID
				// })
				this.$vm.$emit('fires',this.User_Method_ID)
				//返回上一页
				uni.navigateBack({
				  delta: 1
				});
			},
			//获取用户提现方式
			getUserWithdrawMethod(){
				getUserWithdrawMethod().then(res=>{
					if(res.errorCode==0){
						this.data=res.data.list;
					}
				})
			},
			//添加提现方式
			addMethod(){
				uni.navigateTo({
					url:'../addWithdrawal/addWithdrawal'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.all{
	background-color: #f8f8f8;
}
view,div{
	box-sizing: border-box;
}
.content{
	margin: 0 auto;
	margin-top: 40rpx;
	width: 710rpx;
	.cardInfo{
		width: 710rpx;
		height: 75rpx;
		line-height: 75rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius:5rpx;
		padding-left: 30rpx;
		position: relative;
		font-size: 28rpx;
		color: #333333;
		&:last-child{
			margin-bottom: 0rpx;
		}
		image{
			width: 32rpx;
			height: 23rpx;
			position: absolute;
			top: 26rpx;
			right: 35rpx;
		}
	}

}
.del{
	width: 25rpx !important;
	height: 30rpx !important;
}
.addMethod{
	width:460rpx;
	height:76rpx;
	line-height: 76rpx;
	background:#F43131;
	border-radius:10rpx;
	margin: 0 auto;
	text-align: center;
	font-size: 30rpx;
	color: #FFFFFF;
	margin-top: 128rpx;
	margin-bottom: 100rpx;
}
</style>
