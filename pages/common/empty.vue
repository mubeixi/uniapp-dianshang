<template>
	<view class="wrap">
<!--		<div class="rotate-box">-->

<!--			<div class="item"  :style="getStyle(0)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[0].img||img_url)" />-->
<!--					<div class="name">{{itemList[0].name}}</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="item"  :style="getStyle(1)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[1].img||img_url)" />-->
<!--					<div class="name">{{itemList[1].name}}</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="item"  :style="getStyle(2)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[2].img||img_url)" />-->
<!--					<div class="name">{{itemList[2].name}}</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="item"  :style="getStyle(7)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[7].img||img_url)" />-->
<!--					<div class="name">{{itemList[7].name}}</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="item" @click="startFn">-->
<!--				<div class="goods start-btn">-->
<!--					<div class="name">立即抽奖</div>-->
<!--				</div>-->
<!--			</div>-->

<!--			<div class="item"  :style="getStyle(3)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[3].img||img_url)" />-->
<!--					<div class="name">{{itemList[3].name}}</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="item"  :style="getStyle(6)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[6].img||img_url)" />-->
<!--					<div class="name">{{itemList[6].name}}</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="item"  :style="getStyle(5)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[5].img||img_url)" />-->
<!--					<div class="name">{{itemList[5].name}}</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="item"  :style="getStyle(4)">-->
<!--				<div class="goods">-->
<!--					<image class="pic" :src="(itemList[4].img||img_url)" />-->
<!--					<div class="name">{{itemList[4].name}}</div>-->
<!--				</div>-->
<!--			</div>-->




<!--		</div>-->
	</view>
</template>

<script>
	import {Rotate} from "../../common/luck";
	const rotateInstance = new Rotate()
	const img_data = 'data:image/jpeg;base64,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';
	export default {
		name:'Empty',
		components:{},
		data() {
			return {
				rotateObj:null,
				itemList:[],
				img_url:img_data
			}
		},
		computed:{
			activeIdx(){
				return rotateInstance.getIdx()
			}
		},
		methods:{
			startFn(){
			rotateInstance.start(10,4)
			},
			getStyle(idx){
				if(idx!=this.activeIdx || !rotateInstance.isStart())return {}
				return {backgroundColor:rotateInstance.getBgColor(idx)}
			}
		},
		created(){
			this.rotateObj = rotateInstance
			this.itemList = rotateInstance.getItemList()
			//rotateInstance.start()
		}

	}
</script>

<style lang="scss" scoped>
.wrap{
	background: #f2f2f2;
	height: 100vh;
	padding: 10px;
}
.rotate-box{
	width: 660rpx;
	height: 660rpx;
	background: white;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	/*padding: 20rpx;*/
	z-index: 32;
	display: flex;
	flex-wrap: wrap;
	.item{
		width: 220rpx;
		height: 220rpx;
		text-align: center;
		box-sizing: border-box;
		padding: 30rpx;
		overflow: hidden;
		.start-btn{
			height: 160rpx;
			line-height: 160rpx;
			background: #F43131;
			color: white;
		}
		.pic{
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}
		.name{
			margin: 20rpx 0 0;
			height: 30rpx;
			font-size: 12px;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
</style>
