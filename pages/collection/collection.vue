<template>
  <div>
	  <!-- #ifdef APP-PLUS -->
	 <view class="status_bar" style="background-color: #F8F8F8; z-index: 999;position: fixed;top: 0rpx;left: 0rpx;"></view>
	  <!-- #endif -->
	  <page-title  class="titles" title="收藏列表"  :rightHidden="rightHidden" @rightHandle="rightHandle"  :right="rightText"></page-title>
	  <view style="height: 105rpx;"></view>
      <div class="pro-list" v-for="(item,index) in collect_list" :key="index">
		  <div class="mbxa"  v-if="rightClicked" @click="check(index)">
			  <img :src="checked[index].checked?'/static/checked.png':'/static/uncheck.png'" >
		  </div>
          <div class="pro" @click="goDetail(item)">
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
                      <form report-submit @submit="buy">
                          <button formType="submit" class="button" >立即购买</button>
                      </form>

                  </div>
           </div>
          </div>
      </div>
	  <div class="defaults" v-if="collect_list.length<=0">
	  	<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWIAAAERCAYAAABB6q0VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0Mjc1YTVmYy01ZTM5LTU1NGUtOTQwZi0zYWI5NGVjNjY3MWEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjA1QTlCNEVFQkQ0MTFFOUI3OTA5QjY0OUZGQkRFNEYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjA1QTlCNERFQkQ0MTFFOUI3OTA5QjY0OUZGQkRFNEYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzA4ODVhY2UtOWFiMS00MzQwLTgzNmMtMTE0NjliZWYxZDIyIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NmJkNzEyNjktOTQ5ZS1hNjQzLThiNjgt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" ></image>
	  </div>
      <div class="bottom" v-if="rightClicked" >
            <div class="b_left" @click="checkAll">
				 <img :src="allChecked ? '/static/checked.png' : '/static/uncheck.png'" >
				 全选
            </div>
            <div class="b_right" @click="cancelCollection">删除({{totalNum}})</div>
      </div>
  </div>
</template>

<script>
import {getFavouritePro,cancelCollection} from '../../common/fetch.js'
import {pageMixin} from "../../common/mixin";
import {add_template_code} from "../../common/fetch";

export default {
	mixins:[pageMixin],
    components: {

    },
	onLoad(){

	},
	onShow() {
		this.getFavouritePro();
	},

    data(){
        return {
            // checked: false,
			checked: [],
			Users_ID: 'wkbq6nc2kc',
			User_ID: 3,
			collect_list: [], // 收藏列表,
			page: 1,
			pageSize: 4,
			hasMore: true,
			rightHidden: false,
			rightText: '',
			rightClicked: false,
			prod_id: []
        }
    },
	watch: {
		prod_id(){

		}
	},
	computed: {
		totalNum(){
			return this.checked.filter(item=>item.checked).length;
		},
		allChecked(){
			return this.checked.filter(item=>item.checked).length == this.checked.length;
		},

	},
	onReachBottom() {
		if(this.hasMore) {
			this.getFavouritePro();
		}
	},
	mounted() {

	},
    methods: {
		//跳转详情
		goDetail(item){
			    uni.navigateTo({
			    			  url:'../detail/detail?Products_ID='+item.prod_id
			    })
		},
		// 取消收藏
		cancelCollection() {
			this.prod_id = [];
			this.checked.forEach((item,index)=>{
				if(item.checked) {
					this.prod_id.push(this.collect_list[index].prod_id);
				}
			});
				if(this.prod_id.length<=0){
					uni.showToast({
						title: '您还没有选择商品哦！',
						icon:'none',
						duration: 2000
					});
					return;
			}
			cancelCollection({
				Users_ID: this.Users_ID,
				User_ID: this.User_ID,
				prod_id: JSON.stringify(this.prod_id)
			}).then(res=>{
				uni.showToast({
					title: res.msg,
					icon:'none',
					duration: 2000
				});
				this.page=1;
				this.getFavouritePro();
				this.rightClicked=false;
				this.collect_list=[];
				this.rightText = this.rightClicked ? '取消' : '管理';
			}).catch(e=>{
				console.log(e)
			})
		},
		// 单选
		check(index) {
			this.checked[index].checked = !this.checked[index].checked;
		},
		// 全选
		checkAll(){
			let sum=0;
			this.checked.forEach(item=>{
				if(item.checked){
					sum++;
				}
			})
			if(sum==this.checked.length){
				this.checked.forEach(item=>{
					item.checked=false;
				})
			}else{
				this.checked.forEach(item=>{
					item.checked=true;
				})
			}
		},
		// 右侧管理按钮
		rightHandle(){
			this.rightClicked = !this.rightClicked;
			this.rightText = this.rightClicked ? '取消' : '管理';
		},
		// 获取收藏列表
		getFavouritePro(){
			getFavouritePro({Users_ID:this.Users_ID,User_ID: this.User_ID ,page: this.page,pageSize:this.pageSize}).then(res=>{
				console.log(res)
				let oldlist = this.collect_list;
				if(res.errorCode == 0) {
					this.collect_list = oldlist.concat(res.data);
					if(this.collect_list.length<=0){
						this.rightText='';
					}else{
						this.rightText='管理';
					}
					//this.collect_list = res.data;
					this.hasMore = (res.totalCount / this.pageSize) > this.page ? true : false ;
					this.page += 1;
				};
				this.checked = [];
				for(var i in this.collect_list) {
					this.checked.push({
						index: i,
						checked: false
					})
				}
			})
		},
        handle(){
            this.handleShow = !this.handleShow;
        },
        buy(e){
		    console.log(e);
            add_template_code({
                code: e.detail.formId,
                times: 3
            })

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
	.titles{
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		/* #ifdef APP-PLUS */
			padding-top: var(--status-bar-height);
		/* #endif */
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
		z-index: 999;
		background-color: #fff;
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
	.defaults{
		margin: 0 auto;
		width: 640rpx;
		height: 480rpx;
		margin-top: 100rpx;
	}
</style>
