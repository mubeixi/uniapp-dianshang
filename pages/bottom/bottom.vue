<template>
	<div class="fixed">
		<div class="leftss">	
			<div class="first">
				<navigator url="/pages/index/index" open-type="switchTab" >
					<div><img src="/static/tuan/home.png" ></div>
					<div class="txt">首页</div>
				</navigator>
			</div>
			
			<div class="first" @click="collect">
				<div><img  src="/static/tuan/shou.png" ></div>
				<div class="txt">收藏</div>
			</div>
			<div class="first">
				<div><img src="/static/tuan/ke.png" ></div>
				<div class="txt">客服</div>
			</div>
		</div>
		<div class="rightss">
			<div class="dan bTitle" @click="addCart">
					{{first}}
			</div>
			<div class="tuan bTitle" @click="directBuy">
					{{second}}
			</div>
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
				default: '购买'
			}
		},
		methods: {
			collect(){
				this.$emit('collect');
			},
			addCart(){
				this.$emit('cartHandle');
			},
			directBuy(){
				this.$emit('directHandle');
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
				img{
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
		}
	}
</style>
