<template>
	<view @click="commonClick" class="all">

		<!-- <page-title  title="消息" bgcolor="#ffffff" class="titless"></page-title> -->
		<view style="height: 30rpx;"></view>
		<view class="centers" v-for="(item,index) of pro" :key="item" @click="readMsg(item,index)">
			<view class="tops">
				<view class="view">
					{{item.Message_Title}}
				</view>
				<view class="view">
					<block v-if="item.is_read==0">
						未读
					</block>
					<image v-else-if="item.isShow" class="image zhan" src="/static/person/msg-arrow-right.png"></image>
					<image v-else class="image shou" src="/static/person/msg-arrow-top.png" mode=""></image>
				</view>
			</view>
			<view class="times">
				{{item.Message_CreateTime}}
			</view>

			<view class="msg" :class="item.isShow?'':'trans'">
				{{item.Message_Description}}
			</view>
		</view>
		<div class="defaults" v-if="pro.length<=0">
			<image :src="'/static/client/defaultImg.png'|domain" ></image>
		</div>
	</view>
</template>

<script>
	import {getUserMessage,readUserMessage} from '../../common/fetch.js';
		import {mapGetters,mapActions} from 'vuex';
	import {pageMixin} from "../../common/mixin";
	export default {
		mixins:[pageMixin],
		data() {
			return {
				height:1000,//
				pro:[],
			};
		},
		onLoad() {
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
			        that.height=res.screenHeight-68;
			    }
			});
			this.getUserMessage();
		},
		computed:{
			...mapGetters(['userInfo']),
		},
		methods:{
			readMsg(item,index){
				if(item.is_read==0&&JSON.stringify(this.userInfo) != '{}'){
					let data={}
					data.msg_id=item.Message_ID;
					readUserMessage(data).then(res=>{
							this.pro[index].isShow=!this.pro[index].isShow;
							this.pro[index].is_read=1;
					}).catch(e=>{
					})
				}else{
					this.pro[index].isShow=!this.pro[index].isShow;
				}

			},
			getUserMessage(){
				getUserMessage().then(res=>{
						for(let item of res.data){
							item.isShow=true;
						}
						this.pro=res.data;
				}).catch(e=>{
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{
	background-color: #F8F8F8;
	box-sizing: border-box;
	min-height: 100vh;
	width: 750rpx;
	overflow-x: hidden;
}
.centers{
	margin: 0 auto;
	width:710rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	padding: 22rpx 28rpx 33rpx 25rpx;
	margin-bottom: 20rpx;
	.tops{
		height: 29rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		line-height: 29rpx;
		font-size: 30rpx;
		color: #222222;
		margin-bottom: 21rpx;
		position: relative;
		.view{
			&:last-child{
				color: #F43131;
				font-size: 24rpx;
				.image{
					position: absolute;
					top: 0rpx;
					right: 0rpx;
				}
				.shou{
					width: 25rpx;
					height: 15rpx;
				}
				.zhan{
					width: 15rpx;
					height: 25rpx;
				}
			}
		}
	}
	.times{
		height: 23rpx;
		font-size: 24rpx;
		color: #ADADAD;
		line-height: 23rpx;
		margin-bottom: 17rpx;
	}
	.msg{
		font-size: 24rpx;
		color: #777777;
		width: 652rpx;
		line-height: 35rpx;
		overflow: hidden;
		max-height: 70rpx;
		min-height: 35rpx;
		overflow: hidden;
		transition: max-height ease-out 0.2s;
	}
	.trans{
		max-height: 500rpx;
		transition: max-height ease-in 0.2s;
	}
}
.defaults{
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
</style>
