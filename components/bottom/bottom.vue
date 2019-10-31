<template>
	<div class="fixed">
		<div class="leftss">
			<div class="first">
				<navigator url="/pages/index/index" open-type="switchTab" >
					<div><image class='img' src="http://new401.bafangka.com/static/client/tabbar/home.png" ></image></div>
					<div class="txt">首页</div>
				</navigator>
			</div>

			<div class="first" @click="collect">
				<div>
					<image class='img'  v-if="collected"  src="http://new401.bafangka.com/static/client/tuan/xx.png" ></image>
					<image class='img'  v-else src="http://new401.bafangka.com/static/client/sc.png" ></image>

				</div>
				<div class="txt">收藏</div>
			</div>
			<div class="first">
				<div><image class='img'  src="http://new401.bafangka.com/static/client/kf.png" ></image></div>
				<div class="txt">客服</div>
			</div>
		</div>
		<div class="rightss">
			<block v-if="!recieve">
				<div class="dan bTitle" @click="addCart">
						{{first}}
				</div>
				<div class="tuan bTitle" @click="directBuy">
						{{second}}
				</div>
			</block>
			<div class="all" @click="lingqu" :class="canSubmit?'':'disable'" v-else>立即领取</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			first: {
				type: String,
				default: '加入购物车'
			},
			second: {
				type: String,
				default: '立即购买'
			},
			collected: {
				type: Boolean,
				default: false
			},
			// 详情页 没有购物车和立即购买按钮，只有 立即领取
			recieve: {
				type: Boolean,
				default: false
			},
			canSubmit: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			collect(){
				this.$emit('collect');
			},
			addCart(){
				if(!this.$fun.checkIsLogin(1,1)){
					return;
				}
				this.$emit('cartHandle');
			},
			directBuy(){

				if(!this.$fun.checkIsLogin(1,1)){
					return;
				}
				this.$emit('directHandle');
			},
			lingqu(){
				if(this.canSubmit) {
					this.$emit('goGet')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.fixed{
		height: 98rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #F8F8F8;
		z-index: 9999;
		.leftss,.rightss{
			width: 50%;
			height: 98rpx;
			display: flex;
		}
		.leftss{
			div.first{
				width: 33.3%;
				height: 98rpx;
				text-align: center;
				padding-top: 15rpx;
				.img{
					width: 38rpx;
					height: 38rpx;
					display: block;
					margin: 0 auto;
				}
				.txt{
					font-size: 22rpx;
					margin-top: 10rpx;
				}
			}
		}
		.rightss{
			.dan{
				width: 50%;
				background-color: #FA6B27;
			}
			.tuan{
				width: 50%;
				background-color: #F43131;
			}
			.bTitle{
				color: #fff;
				text-align: center;
				line-height: 98rpx;
				font-size: 30rpx;
				.bF{
					font-size: 24rpx;
				}
				.bS{
					font-size: 32rpx;
				}
				.danRight{
					font-size: 26rpx;
				}
			}
			.all {
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 98rpx;
				background: #F43131 ;
				color: #fff;
			}
			.disable {
				background: #efefef;
				color: #999;
			}
		}
	}
</style>
