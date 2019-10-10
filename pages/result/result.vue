<template>
  <div class="bd" @click="closeShow">
    <div class="top">
        <image src="../../static/left.png" class="back" @click="goBack"></image>
		<input type="text" v-model="inputValue" class="search" @confirm="success" />
		<div class="clear" v-if="inputValue">
			<icon type="clear" class="clears" size="37rpx" @click="close"></icon>
		</div>
    </div>
    <div class="tabs">
        <div :class="[active == 0 ? 'checked' : '','tab']" @click="getActive(0)" >默认<div class="line"></div></div>
        <div :class="[active == 1 ? 'checked' : '','tab']" @click="getActive(1)">销量<div class="line"></div></div>
        <div :class="[active == 2 ? 'checked' : '','tab']" @click="getActive(2)">价格<div class="line"></div></div>
        <div :class="[active == 3 ? 'checked' : '','tab']" @click.stop="change" style="width: 140rpx;">筛选<div class="line"></div></div>
		<div class="tab" v-if="showShai"   style="width: 40rpx;position: absolute;top: 0rpx;right: 0rpx;">
			
		</div>
		<div class="tab" style="width: 40rpx;position: absolute;top: 0rpx;right: 28rpx;" v-else>
			<image src="/static/result/jx1.png" @click="changeCate" v-if="cate==2" class="imgm"></image>
			<image src="/static/result/jx.png" @click="changeCate" v-else class="imgm"></image>
		</div>
		
		<div class="shaixuan" v-if="showShai" @click.stop   catchtouchmove="false">
			<view class="priceInterval">价格区间(元)</view>
			<view class="inputPrice">
				<input type="number" placeholder="最低价" placeholder-style="color:#999999;font-size:26rpx;" v-model="minPrice">
				<view>—</view>
				<input type="number" placeholder="最高价"  placeholder-style="color:#999999;font-size:26rpx;" v-model="maxPrice">
			</view>
			<view class="priceInterval">是否包邮</view>
			<view class="isShipping">
				<span :class="isShipping==1?'checked':''" @click="shipping(0)">是</span>
				<span :class="isShipping==2?'checked':''" @click="shipping(1)">否</span>
			</view>
			<view class="submit">
				<view class="reset" @click="reset">重置</view>
				<view class="sure" @click="sureSearch">确定</view>
			</view>
			<view class="zhao" @click="closeShow">
				
			</view>
		</div>
    </div>
	<div v-if="cate==1">
		<div class="cate1">
			<div class="pro" @click="gotoDetail(item)" v-for="(item,i) of pro" :key="i">
				<image :src="item.ImgPath"   class="pro-img"></image>
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
				<image :src="item.ImgPath" alt=""  class="pro-img"></image>
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
		orderby:'',
		searchAll:[],//搜索历史
		showShai:false,
		maxPrice:'',//筛选最高价
		minPrice:'',//筛选最低价
		isShipping:0,//是否包邮
		Cate_ID:0,//列表id
    }
  },
  onLoad: function (option) {
	  this.inputValue=option.inputValue;
	  this.Cate_ID=option.Cate_ID;
	  const than = this        // 注意this的指向
	  	uni.getStorage({
	  		key: 'searchAll',
	  		success(res) {
	  			than.searchAll = res.data
	  		}
	  	})
		this.getProd();
   },
  onPullDownRefresh(){
	   this.active=0;
	   this.cate=2;
	   this.pro=[];
	   this.page=1;
	   this.getProd(this.orderby);
   },
  onShow(){
   	  
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
	  shipping(i){
		  if(i){
			  this.isShipping=2;
		  }else{
			  this.isShipping=1;
		  }
	  },
	  reset(){
		  this.minPrice='';
		  this.maxPrice='';
		  this.isShipping=0;
	  },
	  sureSearch(){
		  if(isNaN(this.minPrice)||isNaN(this.maxPrice)){
			  uni.showToast({
			  	title: '价格为数字',
			  	icon:'none',
			  	duration: 2000
			  });
			  return;
		  }
		  if(this.minPrice&&this.maxPrice&&this.minPrice>this.maxPrice){
			  uni.showToast({
			  	title: '最低价不能大于最高价',
			  	icon:'none',
			  	duration: 2000
			  });
		  }
		  this.pro=[];
		  this.page=1;
		  this.orderby="search";
		  this.getProd(this.orderby);
		  this.showShai=false;
	  },
	  closeShow(){
		  this.showShai=false;
	  },
	  getActive(item){
		  this.pro=[];
		  this.page=1;
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
		  this.getProd(this.orderby);
		  if(this.inputValue != '') {    // 输入框的值不为空时
		            const than = this;
		  					for(var item of this.searchAll){
		  						if(item==this.inputValue)return;
		  					}
		  					this.searchAll.push(this.inputValue)    // 将输入框的值添加到搜索记录数组中存储
		  					uni.setStorage({
		  							key: 'searchAll',
		  							data: than.searchAll
		  				})
		  }
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
		  }else if(this.Cate_ID){
			data={
				Users_ID:'wkbq6nc2kc',
				Cate_ID:this.Cate_ID,
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
		  }else if(item=="search"){
				data.min_price=this.minPrice;
				data.max_price=this.maxPrice;
			  if(this.isShipping==1){
				  data.free_shipping=1;
			  }else if(this.isShipping==2){
				  data.free_shipping=0;
			  }
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
		  this.pro=[];
		  this.page=1;
		  this.active=0;
		  this.orderby='';
		  this.getProd();
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
		if(this.showShai){
			this.showShai=false;
			return;
		}
		this.showShai=true;
		
	  }
  }
}
</script>

<style scoped lang="scss">
	.bd{
		min-height: 1000rpx;
	}
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
        // justify-content: space-around;
        margin-top: 25px;
        padding:0 20rpx;
		color: #333;
		position: relative;
		height: 90rpx;
		align-content: center;
    }
    .tab.checked {
        color: #F43131;
    }
    .tab.checked .line{
        background: #F43131;
    }
    .tab {
        //flex: 1;
		//width: 180rpx;
		width: 180rpx;
		height: 60rpx;
        text-align: center;
		margin-bottom: 20rpx;
    }
    .tab image {
        height: 34rpx;
        width: 40rpx;
        //margin-left: 10rpx;
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
					margin-top: 21rpx;
				}
				.price text {
					font-size: 24rpx;
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
					font-size: 19rpx;
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
				padding: 17rpx 15rpx 34rpx 11rpx;
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
					font-size: 20rpx;
					margin-top: 40rpx;
				}
			}
		}
		
	}
	.imgm{
		width: 36rpx;
		height: 34rpx;
	}
	.shaixuan{
		position: absolute;
		top: 70rpx;
		width: 750rpx;
		background-color: #FFFFFF;
		z-index: 999;
		padding-top: 10rpx;
		view{
			padding-left: 20rpx;
			padding-right: 20rpx;
		}
		.priceInterval{
			font-size: 26rpx;
			color: #999999;
			margin-bottom: 24rpx;
			height:27rpx;
			line-height: 27rpx;
		}
		.inputPrice{
			display: flex;
			margin-bottom: 50rpx;
			view{
				width:29rpx;
				height:55rpx;
				line-height: 55rpx;
				font-weight: bold;
				font-size:26rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(153,153,153,1);
				margin: 0  20rpx;
			}
			input{
				width:192rpx;
				height:55rpx;
				background:rgba(245,245,245,1);
				border-radius:28rpx;
				text-align: center;
			}
		}
		.isShipping{
			display: flex;
			margin-bottom: 100rpx;
			span{
				width:110rpx;
				height:55rpx;
				background:#D6D6D6;
				border-radius:28rpx;
				display: block;
				line-height: 55rpx;
				text-align: center;
				font-size: 26rpx;
				color: #FFFFFF;
				margin-right: 27rpx;
			}
			.checked{
				background-color: #F43131 !important;
			}
		}
		.submit{
			display: flex;
			width: 100%;
			height: 80rpx;
			padding-left: 0rpx;
			padding-right: 0rpx;
			view{
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #FFFFFF;
				font-size: 30rpx;
			}
			.reset{
				background-color: #B9B9B9;
			}
			.sure{
				background-color: #F43131;
			}
		}
	}
	.zhao{
		height:625rpx;
		width: 100%;
		padding-left: 0rpx;
		padding-right: 0rpx;
		//background: rgba(0, 0, 0, .3);
		//position: fixed;
		z-index: 998;
		position: absolute;
		background-color:#000;
		opacity:0.6;
	}
</style>
