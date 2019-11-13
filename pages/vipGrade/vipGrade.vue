<template>
	<view class="all">
		<view class="top">
<!--			<image src="https://new401.bafangka.com/static/client/task/left.png" class="goBack" @click="goBack"></image>-->
<!--			<view class="titles">会员等级</view>-->
			<swiper class="center" :indicator-dots="false" :autoplay="false"  :duration="1000" :current="inds" @change="change">
				<swiper-item class="vipFir"  v-for="(item,index) of pro.levels" :key="index"  :style="pro.levels.length==1?'margin-left:43rpx;':''">
				<!-- 		<image src="https://new401.bafangka.com/static/client/task/vip.png" class="allImg"></image> -->
						<image :src="item.img_url" class="allImg"></image>
						<image src="https://new401.bafangka.com/static/client/task/vips.png" class="leftImg"></image>
						<view class="vipGrade">
							{{item.level_name}}
						</view>
						<view class="dangqian" v-if="index==0">
							当前等级
						</view>
						<view class="mmp">
							<view class="da">
					
							</view>
							<view v-if="item.curlevel.length<=0&&pro.levels.length<=0" class="tu" style="transform:rotate(180deg)">
							
							</view>
							<view v-else class="tu" :style="{transform: 'rotate('+item.growth_value/item.curlevel.upper_growth*180+'deg)'}">
							</view>

	
							<view class="xiao">
					
							</view>
							<view class="texts">
								<view class="posiQ">我的成长值</view>
								<view class="posiW">{{item.growth_value}}</view>
								<view class="posiE" v-if="item.curlevel.need_growth&&item.curlevel.need_growth>0">还差{{item.curlevel.need_growth}}升级为{{pro.levels[index+1].level_name}}</view>
							</view>
						</view>
				</swiper-item>
			</swiper>
		</view>
		<view style="height: 220rpx;"></view>
		<circleTitle :title="tequan.level_name" ></circleTitle>
		<scroll-view class="mbxa" scroll-x="true">
			<view class="floats" v-for="(mb,mx) of tequan.basic" :key="mx">
				<view class="floatm">
					<view class="imgs">
						<image class="image" :src="mb.img_url" ></image>
					</view>
						{{mb.name}}
				</view>
			</view>
		</scroll-view>
		<view style="height: 20rpx;background-color: #F8F8F8;width: 750rpx;"></view>
		<circleTitle title="会员成长说明" ></circleTitle>
		<view class="zhouri">
			<view class="titles">
				<view class="lefts">
					等级
				</view>
				<view class="rights">
					所需成长值
				</view>
			</view>
			<view class="td" v-for="(i,j) of pro.growths" :key="j">
				<view class="lefts">
					{{i.name}}
				</view>
				<view class="rights">
					{{i.value}}
				</view>
			</view>
		</view>
		<view style="height: 20rpx;background-color: #F8F8F8;width: 750rpx;"></view>
		<view class="lasts">
			<view class="titles">
				<image class="image" src="https://new401.bafangka.com/static/client/fenxiao/wen.png" ></image>
				<view>
					什么是成长值
				</view>
			</view>
			<view class="msg">
				成长值是消费者在当前店铺内根据消费类行为所计算出来的用户价值分。成长值决定会员等级，成长值越高等级越高，所享受的会员权益就越多。消费者在当前店铺内根据消费类。
			</view>
		</view>
		<view style="height: 20rpx;background-color: #F8F8F8;width: 750rpx;"></view>
		<view class="lasts">
			<view class="titles">
				<image class="image" src="https://new401.bafangka.com/static/client/fenxiao/wen.png" ></image>
				<view>
					如何获得成长值
				</view>
			</view>
			<view class="msg">
				成长值是消费者在当前店铺内根据消费类行为所计算出来的用户价值分。成长值决定会员等级，成长值越高等级越高，所享受的会员权益就越多。消费者在当前店铺内根据消费类。
			</view>
		</view>
	</view>
</template>

<script>
	import {goBack}  from '../../common/tool.js'
	import circleTitle from '../../components/circleTitle/circleTitle.vue'
	import {pageMixin} from "../../common/mixin";
	import {getLevelCenter} from '../../common/fetch.js';
	export default {
		mixins:[pageMixin],
		data() {
			return {
				widths:414,
				jiaodu:90,
				index:0,//第几个会员等级
				pro:[],
				tequan:[],
				inds:0
			};
		},
		components:{
			circleTitle
		},
		onLoad() {

		},
		onShow() {
			this.getLevelCenter();
		},
		methods:{
			change(e){
				this.inds=e.detail.current;
				this.tequan=this.pro.levels[this.inds];
			},
			getLevelCenter(){
				getLevelCenter().then(res=>{
					this.pro=res.data;
					this.tequan=res.data.levels[0];
				},err=>{}).catch(e=>{
					console.log(e)
				})
			},
			goRight(event){
				if(event.detail.scrollLeft<300){
					this.index=0;
				}else if(event.detail.scrollLeft>300&&event.detail.scrollLeft<600){
					this.index=1;
				}else if(event.detail.scrollLeft>600&&event.detail.scrollLeft<900){
					this.index=2;
				}else if(event.detail.scrollLeft>900&&event.detail.scrollLeft<1200){
					this.index=3;
				}else if(event.detail.scrollLeft>1200&&event.detail.scrollLeft<1500){
					this.index=4;
				}else if(event.detail.scrollLeft>1500&&event.detail.scrollLeft<1800){
					this.index=5;
				}else if(event.detail.scrollLeft>1800&&event.detail.scrollLeft<2100){
					this.index=6;
				}else if(event.detail.scrollLeft>2100&&event.detail.scrollLeft<2400){
					this.index=7;
				}
				this.tequan=this.pro.levels[this.index];
			},
			goBack(){
				goBack();
			},
			scroll(e) {
			      this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style lang="scss" scoped>
.all{
	background-color: #FFFFFF;
	overflow-x: hidden;
	box-sizing: border-box;
}
.top{
	width:750rpx;
	height:200rpx;
	background:rgba(64,61,61,1);
	position: relative;
	.goBack{
		width: 20rpx;
		height: 30rpx;
		position: absolute;
		top: 29rpx;
		left: 20rpx;
	}
	.titles{
		color: #FFFFFF;
		font-size: 32rpx;
		position: absolute;
		top: 28rpx;
		left: 310rpx;
		height: 31rpx;
		line-height: 31rpx;
	}
	.center{
		position: absolute;
		top: 60rpx;
		left: 3rpx;
		width: 750rpx;
		height: 325rpx;
		white-space: nowrap;
		.vipFir{
			width: 665rpx !important;
			height: 325rpx !important;
			display: inline-block;
			position: relative;
			.allImg{
				width: 100%;
				height: 100%;
			}
			.leftImg{
				width: 31rpx;
				height: 29rpx;
				position: absolute;
				top:39rpx ;
				left: 47rpx;
			}
			.vipGrade{
				height:24rpx;
				font-size:30rpx;
				font-family:Adobe Heiti Std;
				font-weight:normal;
				color:rgba(77,77,88,1);
				line-height:24rpx;
				position: absolute;
				top: 42rpx;
				left: 91rpx;
			}
			.dangqian{
				height:23rpx;
				line-height: 23rpx;
				font-size:24rpx;
				font-weight:500;
				color:rgba(77,77,88,1);
				position: absolute;
				top: 42rpx;
				right: 48rpx;
			}
		}
	}

}
.mbxa{
	margin-top: 20rpx;
	padding-left: 40rpx;
	padding-right: 40rpx;
	width: 750rpx;
	// height: 150rpx;
	display: flex;
	box-sizing: border-box;
	white-space: nowrap;
	.image{
		width: 100%;
		height: 100%;
	}
	.floats{
		width: 120rpx;
		// height: 120rpx;
		text-align: center;
		font-size: 26rpx;
		margin-right: 60rpx;
		margin-bottom: 40rpx;
		display: inline-block;
		&:last-child{
			margin-right: 0rpx;
		}
		.floatm{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
		.imgs{
			width: 78rpx;
			height: 78rpx;
			border-radius: 50%;
			margin-bottom: 16rpx;
		}

	}
}
.zhouri{
	margin: 0 auto;
	margin-top: 10rpx;
	margin-bottom: 35rpx;
	width: 708rpx;
	border: 1rpx solid #E7E7E7;
	font-size: 26rpx;
	color: #333333;
	.lefts{
		width: 219rpx;
		text-align: center;
		border-right: 1rpx solid #E7E7E7;
	}
	.rights{
		width: 489rpx;
		text-align: center;
	}
	.titles{
		width: 708rpx;
		height: 95rpx;
		background-color: #F4F4F4;
		display: flex;
		border-bottom: 1rpx solid  #E7E7E7;
		.lefts,.rights{
			line-height: 95rpx;
			height: 95rpx;
		}
	}
	.td{
		width: 708rpx;
		height: 69rpx;
		background-color: #FFFFFF;
		display: flex;
		border-bottom: 1rpx solid  #E7E7E7;
		&:last-child{
			border-bottom: 0rpx;
		}
		.lefts,.rights{
			line-height: 69rpx;
			height: 69rpx;
		}
	}



}
.lasts{
	padding: 35rpx 0rpx 35rpx 18rpx;
	.image{
		width: 34rpx;
		height: 34rpx;
		margin-right: 16rpx;
	}
	.titles{
		margin-left: 2rpx;
		height: 34rpx;
		line-height: 34rpx;
		font-size: 28rpx;
		color: #333333;
		display: flex;
		align-items: center;
	}
	.msg{
		margin-top: 23rpx;
		width:637rpx;
		font-size:22rpx;
		font-weight:400;
		color:rgba(136,136,136,1);
		line-height:36rpx;
	}
}

.canvass{
	position: absolute;
	top: 84rpx;
	left: 205rpx;
}
.mmp{
	position: absolute;
	top: 120rpx;//84rpx;
	left: 205rpx;
	width: 278rpx;
	height: 139rpx;
	overflow: hidden;
	.da{
		width: 278rpx;
		height: 278rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
	}
	.xiao{
		width: 262rpx;
		height: 262rpx;
		background-color: #d5d3e1;
		border-radius: 50%;
		position: absolute;
		top: 8rpx;
		left: 8rpx;
	}
	.tu{
		width: 278rpx;
		height: 278rpx;
		background-color: #DAB475;
		border-radius: 50%;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		clip: rect(139rpx, 278rpx, 278rpx, 0rpx);
	}
	.texts{
		width: 230rpx;
		height: 230rpx;
		border-radius: 50%;
		background-color: #DDCDB1;
		position: absolute;
		top: 24rpx;
		left: 24rpx;
		color: #A17000;
		.posiQ{
			font-size: 18rpx;
			text-align: center;
			margin-top: 15rpx;
		}
		.posiW{
			font-size:46rpx;
			font-weight:bold;
			text-align: center;
			height: 30rpx;
			line-height: 35rpx;
			margin: 12rpx 0rpx;
		}
		.posiE{
			font-size: 18rpx;
			text-align: center;
		}
	}
}

</style>
