<template>
  <div>
       <!-- <comments title="评论"></comments> -->
	   <page-title title="评论" right=""></page-title>
        <div class="navs">
            <div class="nav" :class="index == 0 ? 'active' : ''" @click="getComment(0)">全部</div>
            <div class="nav" :class="index == 1 ? 'active' : ''" @click="getComment(1)">有图</div>
        </div>
        <block v-for="(item,index) of comment_list" :key="item">
			<div class="c_content" v-if="!item.ImgPath">
			    <div class="c_content_title">
			        <img :src="item.User_HeadImg" alt="">
			        <span class="user_name">{{item.User_NickName}}</span>
			        <span class="c_time">{{item.CreateTime}}</span>
			    </div>
			    <div class="c_content_msg">{{item.Note}}</div>
			    <div class="c_content_img"></div>
			</div>
			<div class="c_content" v-else>
			    <div class="c_content_title">
			        <img :src="item.User_HeadImg" alt="">
			        <span class="user_name">{{item.User_NickName}}</span>
			        <span class="c_time">{{item.CreateTime}}</span>
			    </div>
			    <div class="c_content_msg">{{item.Note}}</div>
			    <div class="c_content_img">
					<block v-for="(i,j) of item.ImgPath"> 
						 <img :src="i"  @click="yulan(index,j)">
					</block>   
			    </div>
			</div>
		</block>
		<bottom></bottom>
  </div>
</template>

<script>
import bottom from '../bottom/bottom'
import {getComments} from '../../common/fetch.js'
export default {
    name: 'app',
    components: {
        bottom
    },
    data(){
        return {
            index:  0,
			commentArgs: {
				Users_ID: 'wkbq6nc2kc',
				Products_ID: 242, // 查询指定产品的评论
				page: 1,
				pageSize: 4,				
			},
			totalCount:0,//评论个数
			comment_list: [], // 评论列表
        }
    },
	onLoad(options){
		this.commentArgs.Products_ID = options.pro_id;
		this.getComment(this.index);
	},
	onShow() {
		
	},
	onReachBottom() {
		if(this.comment_list.length<this.totalCount){
			this.commentArgs.page++;
			this.getComment(this.index);
		}
	},
	methods: {
		yulan(index,i){
			uni.previewImage({
			            urls: this.comment_list[index].ImgPath,
						indicator:'default',
						current:i, 
			            longPressActions: {
			                success: function(data) {
								
			                },
			                fail: function(err) {
									
			                }
			            }
			});
		},
		getComment(i){
			this.commentArgs.page=1;
			this.index = i;
			this.commentArgs.has_img = i;
			this.comment_list=[];
			this.getComments();
		},
		getComments(){
			getComments(this.commentArgs).then(res=>{
				if(res.errorCode==0){
					for(let i of res.data){
						this.comment_list.push(i);
					}
					this.totalCount=res.totalCount;
				}
			})
		}
	}
}
</script>

<style scoped>
    .navs {
        margin: 40rpx 0 36rpx;
        padding-left: 20rpx;
        display: flex;
    }
    .nav {
        width: 110rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 28rpx;
        border: 2rpx solid #999;
        border-radius: 40rpx;
        color: #999;
    }
    .navs .nav:nth-child(1) {
        margin-right: 30rpx;
    }
    .nav.active {
        background: #F43131;
        color: #fff;
        border-color: #F43131;
    }
    /* 内容 */
    /* 评价 start */
    .c_content {
        margin-top: 30rpx;
        padding: 0 20rpx 0;
        border-bottom: 2rpx solid #FFECE8E8;
    }
    .c_content_title {
        display: flex;
        align-items: center;
        font-size: 30rpx;
        color: #333;
    }
    .c_content_title>img {
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
    }
    .user_name {
        flex: 1;
    }
    .c_time {
        font-size: 26rpx;
        color: #777;
    }
    .c_content_msg {
        font-size: 24rpx;
        color: #333;
        line-height: 36rpx;
		padding-top: 18rpx;
		padding-bottom: 29rpx;
    }
    .c_content_img img {
        width: 142rpx;
        height: 142rpx;
        margin-right: 20rpx;
        margin-bottom: 30rpx;
    }
    /* 内容 end */
</style>