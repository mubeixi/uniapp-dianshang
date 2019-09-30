<template>
  <div>
      <div class="pro-list" v-for="item in collect_list">
		  <div class="mbxa"  v-if="!handleShow" @click="checked=!checked">
			  <img v-if="checked" src="/static/checked.png" >
			  <img v-else src="/static/uncheck.png" >
		  </div>
          <div class="pro" >
            <div class="pros">
				  <img class="pro-img" :src="item.ImgPath">
			</div>
            <div class="pro-msg">
                  <div class="pro-name">{{item.Products_Name}}</div>
                  <div class="collection"><span>{{item.favourite_count}}</span>人收藏</div>
                  <div class="btn">
                      <span class="span">
                        <span>￥</span>{{item.Products_PriceX}}
                      </span>
                      <span class="button" @click="buy">立即购买</span>
                  </div>
           </div>
          </div>
      </div>
      <div class="bottom" v-if="!handleShow" >
            <div class="b_left" @click="checked=!checked">
				 <img v-if="checked" src="/static/checked.png" >
				 <img v-else src="/static/uncheck.png" >
				 全选
            </div>
            <div class="b_right">删除(1)</div>
      </div>
  </div>
</template>

<script>
import {getFavouritePro} from '../../common/fetch.js'
export default {
    components: {
    
    },
	onLoad(){
		this.getFavouritePro();
	},
	onShow() {
		
	},
	
    data(){
        return {
            checked: false,
            handleShow: false,
			Users_ID: 'wkbq6nc2kc',
			User_ID: 3,
			collect_list: [], // 收藏列表,
			page: 1,
			pageSize: 4,
			hasMore: true,
        }
    },
	onReachBottom() {
		if(this.hasMore) {
			this.getFavouritePro();
		}
	},
    methods: {
		// 获取收藏列表
		getFavouritePro(){
			getFavouritePro({Users_ID:this.Users_ID,User_ID: this.User_ID ,page: this.page,pageSize:this.pageSize}).then(res=>{
				console.log(res)
				let oldlist = this.collect_list;
				if(res.errorCode == 0) {
					this.collect_list = oldlist.concat(res.data);
					this.hasMore = (res.totalCount / this.pageSize) > this.page ? true : false ;
					this.page += 1;
				}
			})
		},
        handle(){
            this.handleShow = !this.handleShow;            
        },
        buy(){
            this.$router.push({name:'check'})
        }
    }
}
</script>

<style scoped lang="scss">
	.mbxa{ 
		display: flex;
		align-items: center;
		img{
			width: 34rpx;
			height: 34rpx;
		}
	}
    .pro-list {
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;
		
    }
    .pro {
        flex: 1;
        margin-left: 10px;
        display: flex;
        margin-bottom: 10px;
    }
	.pros{
		width: 300rpx;
		height: 300rpx;
		margin-right: 29rpx;
	}
    .pro-img {
        width: 100%;
		height: 100%;
    }
    .pro-name {
		width: 321rpx;
        font-size: 26rpx;
        color: #333;
        margin-bottom:29rpx;
        margin-top: 29rpx;
		display: -webkit-box;
		    -webkit-line-clamp:2;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    -webkit-box-orient: vertical;
    }
    .collection {
        font-size: 24rpx;
        color: #888;
    }
    .btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 35rpx;
        color: #F43131;
		font-size: 36rpx;
    }
    .btn span.span span{
        font-style: normal;
        font-size: 24rpx;
    }
    .btn .button {
        width:135rpx;
        height:55rpx;
        background:rgba(244,49,49,1);
        border-radius:28rpx;
		font-size:26rpx;
		color: #fff;
		padding: 0 0;
		line-height: 55rpx;
		text-align: center;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 90rpx;
        line-height: 90rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        box-shadow: 0 0 9px rgba(0, 0, 0, .4);
    }
    .b_left {
        font-size: 28rpx;
		color: #666666;
		display: flex;
		 align-items: center;
		img{
			width: 34rpx;
			height: 34rpx;
			margin-right: 20rpx;
		}
    }
    .b_right {
        font-size: 26rpx;
        color: #F43131;
        height: 54rpx;	
        line-height: 54rpx;
        padding: 0 22rpx;
        border-radius: 8px;
        border: 1px solid #F43131;
    }
</style>