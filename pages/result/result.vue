<template>
  <div class="bd">
    <div class="top">
        <image src="../../static/left.png" class="back"></image>
		<input type="text" value="女装裙子 夏季" class="search" />
		<icon type="clear" class="clear"></icon>
    </div>
    <div class="tabs">
        <div :class="[active == 0 ? 'checked' : '','tab']" @click="active=0">默认<div class="line"></div></div>
        <div :class="[active == 1 ? 'checked' : '','tab']" @click="active=1">销量<div class="line"></div></div>
        <div :class="[active == 2 ? 'checked' : '','tab']" @click="active=2">价格<div class="line"></div></div>
        <div :class="[active == 3 ? 'checked' : '','tab']" @click="change">筛选<image src="/static/result/jx.png" @click="changeCate" alt=""></image> <div class="line"></div></div>
    </div>
	<div v-if="cate==1">
		<div class="cate1">
			<div class="pro" @click="gotoDetail">
				<image src="../../static/result/pro1.png" alt=""  class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
					<div class="price">
						<span class="n_price"><text>￥</text>169.00</span>
						<span class="o_price"><text>￥</text>189.00</span>
					</div>
					<div class="sold">已售22件</div>
				</div>
			</div>
			<div class="pro">
				<image src="../../static/result/pro2.png" alt="" class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
					<div class="price">
						<span class="n_price"><text>￥</text>169.00</span>
						<span class="o_price"><text>￥</text>189.00</span>
					</div>
					<div class="sold">已售22件</div>
				</div>
			</div>
		</div>	
	</div>
    <div v-else>
		<div class="cate2">
			<div class="pro" @click="gotoDetail">
				<image src="../../static/result/pro1.png" alt=""  class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
					<div class="price">
						<span class="n_price"><text>￥</text>169.00</span>
						<span class="o_price"><text>￥</text>189.00</span>
					</div>
				</div>
			</div>
			<div class="pro" @click="gotoDetail">
				<image src="../../static/result/pro1.png" alt=""  class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
					<div class="price">
						<span class="n_price"><text>￥</text>169.00</span>
						<span class="o_price"><text>￥</text>189.00</span>
					</div>
				</div>
			</div>
			<div class="pro" @click="gotoDetail">
				<image src="../../static/result/pro1.png" alt=""  class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
					<div class="price">
						<span class="n_price"><text>￥</text>169.00</span>
						<span class="o_price"><text>￥</text>189.00</span>
					</div>
				</div>
			</div>
			<div class="pro" @click="gotoDetail">
				<image src="../../static/result/pro1.png" alt=""  class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
					<div class="price">
						<span class="n_price"><text>￥</text>169.00</span>
						<span class="o_price"><text>￥</text>189.00</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<popup-layer ref="popupLayer"  :direction="'bottom'">
		
	</popup-layer>
  </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'
export default {
  name: 'App',
  props: {value:'',},
  data() {
    return {
        active: 0,
		cate: 2
    }
  },
  components: {
    popupLayer
  },
  methods: {
      gotoDetail(){
          this.$router.push({name: 'detail'})
      },
	  changeCate(){
		  this.cate = this.cate == 1 ? 2 : 1
	  },
	  change(){
		  this.active = 3;
		  this.$refs.popupLayer.show();
	  }
  }
}
</script>

<style scoped lang="scss">
    .top {
		position: relative;
        display: flex;
        align-items: center;
        padding: 30rpx 20rpx 0;
		box-sizing: border-box;
		.back {
			width: 23rpx;
			height: 37rpx;
		}
		.search {
			width: 645rpx;
			height: 65rpx;
			line-height: 65rpx;
			background: #F4F4F4;
			padding-left: 39rpx;
			font-size: 26rpx;
			color: #333;
			margin-left: 41rpx;
			box-sizing: border-box;
		}
		.clear {
			position: absolute;
			top: 43rpx;
			right: 48rpx;
			width: 37rpx;
			height: 37rpx;
		}
    }
    .tabs {
        display: flex;
		font-size: 30rpx;
        justify-content: space-around;
        margin-top: 25px;
        padding:0 10px;
		color: #333;
    }
    .tab.checked {
        color: #F43131;
    }
    .tab.checked .line{
        background: #F43131;
    }
    .tab {
        flex: 1;
        text-align: center;
		margin-bottom: 20rpx;
    }
    .tab image {
        height: 34rpx;
        width: 40rpx;
        margin-left: 10rpx;
        vertical-align: middle;
    }
    .tab .line {
        width: 100rpx;
        height: 4rpx;
        margin: 20rpx auto 0 ;
        background: #fff;
    }
	.cate1 {
		.pro{
			display: flex;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			.pro-img {
				margin-right: 20rpx;
				width: 270rpx;
				height: 270rpx;
			}
			.pro_desc {
				flex: 1;
				padding-top: 29rpx;
				text-align: left;
				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient: vertical;
					font-size: 24rpx;
				}
				.price {
					margin-top: 45rpx;
				}
				.price text {
					font-size: 20rpx;
					font-style: normal;
				}
				.n_price {
					color: #F43131;
					font-size: 36rpx;
					margin-right: 10rpx;
				}
				.o_price {
					color: #afafaf;
					font-size: 28rpx;
					text-decoration: line-through;
				}
				.sold {
					color: #666;
					font-size: 18rpx;
					margin-top: 40rpx;
				}
			}
		}
	}
	.cate2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		flex-wrap: wrap;
		.pro {
			width: 345rpx;
			.pro-img {
				width: 100%;
				height: 345rpx;
			}
			.pro_desc {
				padding: 17rpx 15rpx 21rpx 11rpx;
				color: #333;
				font-size: 24rpx;
				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp:2;
					-webkit-box-orient: vertical;
					font-size: 24rpx;
				}
				.price {
					margin-top: 21rpx;
				}
				.price text {
					font-size: 20rpx;
					font-style: normal;
				}
				.n_price {
					color: #F43131;
					font-size: 36rpx;
					margin-right: 10rpx;
				}
				.o_price {
					color: #afafaf;
					font-size: 28rpx;
					text-decoration: line-through;
				}
				.sold {
					color: #666;
					font-size: 18rpx;
					margin-top: 40rpx;
				}
			}
		}
		
	}
</style>
