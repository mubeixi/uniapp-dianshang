<template>
  <div class="bd">
    <div class="top">
        <image src="../../static/left.png" class="back" @click="goBack"></image>
		<input type="text" v-model="inputValue" class="search" @confirm="success" />
		<div class="clear">
			<icon type="clear" class="clears" size="37rpx" @click="close"></icon>
		</div>
    </div>
    <div class="tabs">
        <div :class="[active == 0 ? 'checked' : '','tab']" @click="getActive(0)">默认<div class="line"></div></div>
        <div :class="[active == 1 ? 'checked' : '','tab']" @click="getActive(1)">销量<div class="line"></div></div>
        <div :class="[active == 2 ? 'checked' : '','tab']" @click="getActive(2)">价格<div class="line"></div></div>
        <div :class="[active == 3 ? 'checked' : '','tab']" @click="change">筛选<div class="line"></div></div>
		<div><image src="/static/result/jx.png" @click="changeCate" alt="" class="imgm"></image></div>
    </div>
	<div v-if="cate==1">
		<div class="cate1">
			<div class="pro" @click="gotoDetail(item)" v-for="(item,i) of pro" :key="i">
				<image :src="item.Products_JSON.ImgPath" alt=""  class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">{{item.Products_Name}}</div>
					<div class="price">
						<span class="n_price"><text>￥</text>{{item.Products_PriceX}}</span>
						<span class="o_price"><text>￥</text>{{item.Products_PriceY}}</span>
					</div>
					<div class="sold">已售{{item.Products_Sales}}件</div>
				</div>
			</div>
		</div>	
	</div>
    <div v-else>
		<div class="cate2" >
			<div class="pro" @click="gotoDetail(item)" v-for="(item,i) of pro" :key="i">
				<image :src="item.Products_JSON.ImgPath" alt=""  class="pro-img"></image>
				<div class="pro_desc">
					<div class="title">{{item.Products_Name}}</div>
					<div class="price">
						<span class="n_price"><text>￥</text>{{item.Products_PriceX}}</span>
						<span class="o_price"><text>￥</text>{{item.Products_PriceY}}</span>
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
import {getProd} from '../../common/fetch.js';
import {goBack}  from '../../common/tool.js'
export default {
  name: 'App',
  props: {value:'',},
  data() {
    return {
        active: 0,
		cate: 2,
		inputValue:'',
		pro:[],
		page:1,
		pageSize:8,
		orderby:''
    }
  },
  onLoad: function (option) {
	  this.inputValue=option.inputValue;
   },
  onPullDownRefresh(){
	   this.active=0;
	   this.cate=2;
	   this.pro=[];
	   this.page=1;
	   this.pageSize=4;
	   this.getProd(this.orderby);
   },
  onShow(){
   	  this.getProd();
  },
  onReachBottom(){
		if(this.pro.length<this.count){
			this.page++;
			this.getProd(this.orderby);
		}
   },
  components: {
    popupLayer
  },
  created(){
	 
  },
  methods:{
	  getActive(item){
		  this.pro=[];
		  this.page=1;
		  this.pageSize=4;
		  if(item==0){
			  this.active=0;
			  this.orderby='';
			  this.getProd();
		  }else if(item==1){
			  this.active=1;
			  this.orderby='sales';
			  this.getProd(this.orderby);
		  }else{
			  this.active=2;
			   this.orderby='price';
			  this.getProd(this.orderby);
		  }
	  },
	  goBack(){
		  goBack();
	  },
	  success(){
		  this.pro=[];
		  this.page=1;
		  this.pageSize=4;
		  this.getProd(this.orderby);
	  },
	  getProd(item){
		  let data;
		  if(this.inputValue){
			 data={
				 Users_ID:'wkbq6nc2kc',
				 Products_Name:this.inputValue,
				 page:this.page,
				 pageSize:this.pageSize
			 } 
		  }else{
			data={
				Users_ID:'wkbq6nc2kc',
				page:this.page,
				pageSize:this.pageSize
			} 
		  }	
		  if(item=="sales"){
			  data.order_by=item;
		  }else if(item=="price"){
			  data.order_by=item;
		  }
		  getProd(data).then(res=>{
			  for(var item of res.data){
				  this.pro.push(item);
			  }
			 //this.pro=res.data; 
			 this.count=res.totalCount;
		  }).catch(e=>{})
	  },
	  close(){
		  this.inputValue="";
	  },
      gotoDetail(item){
          uni.navigateTo({
          			  url:'../detail/detail?Products_ID='+item.Products_ID
          })
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
		position: relative;
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
			z-index: 9999;
		}
		.clears{
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
	.imgm{
		width: 36rpx;
		height: 34rpx;
	}
</style>
