<template>
  <div >
    <form action="/">
		<div class="search-wrap">
			<icon type="search" size="34rpx" class="search_icon"/>
			<input type="text" class="search-input" name="search" v-model="inputValue" @confirm="success"> 
			<span @click="close">取消</span>
		</div>	
    </form>
    <div class="history" v-if="searchAll.length>0">
        <div class="title">
			<div>搜索历史</div>
			<div @click="clear"><img src="/static/del.png"></div>
		</div>
        <div class="h_content">
            <span v-for="(item,i) of searchAll" :key='i' @click="goSearch(item)">{{item}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import {goBack}  from '../../common/tool.js'
// import tabs from '@/components/tabs'
export default {
  name: 'App',
  data(){
      return {
		  inputValue:'',
		  searchAll:[]
      }
  },
  components: {
    
  },
  onShow(){
	const than = this        // 注意this的指向
		uni.getStorage({
			key: 'searchAll',
			success(res) {
				than.searchAll = res.data
			}
		})
  },
  methods: {
	  goSearch(item){
		  uni.navigateTo({
		  			  url:'../result/result?inputValue='+item
		  })
	  },
	  success(){
		  if(this.inputValue != '') {    // 输入框的值不为空时
		            const than = this;
					for(var item of this.searchAll){
						if(item==this.inputValue){
							uni.navigateTo({
								url:'../result/result?inputValue='+this.inputValue
							})
							return;
						}
					}
					this.searchAll.push(this.inputValue)    // 将输入框的值添加到搜索记录数组中存储
					uni.setStorage({
							key: 'searchAll',
							data: than.searchAll
				})
			}
		  uni.navigateTo({
			  url:'../result/result?inputValue='+this.inputValue
		  })
	  },
	  clear(){
		  this.searchAll=[];
		  uni.setStorage({
		  			key: 'searchAll',
		  			data: []
		  })
	  },
	  close(){
		  this.inputValue='';
		  goBack();
	  },
      onSearch: function(){
          console.log('1')
         
      },
      onCancel: function(){

      }
  }
}
</script>

<style scoped lang="scss">
	.search-wrap {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		padding: 30rpx 22rpx 46rpx 20rpx;
		box-sizing: border-box;
		.search-input {
			float: left;
			width: 600rpx;
			height: 65rpx;
			line-height: 65rpx;
			border-radius: 10rpx;
			background: #F4F4F4;
			font-size: 26rpx;
			color: #ADADAD;
			padding-left: 91rpx;
			box-sizing: border-box;
		}
		.search_icon {
			position: absolute;
			top: 46rpx;
			left: 61rpx;
		}
	}
    .history {
        padding: 0 20rpx;
    }
	.title{
		display: flex;
		justify-content: space-between;
		height: 26rpx;
	}
    .title div{
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
		height: 26rpx;
        line-height: 26rpx;
		img{
			width: 40rpx;
			height: 40rpx;
		}
    }
    .h_content span {
        float:left;
        background: rgba(245, 245, 245, 1);
        border-radius: 10px;
        color: #777;
        font-size: 12px;
        text-align: center;
		padding: 16rpx 24rpx;
		margin: 30rpx 20rpx 0 0;
    }
</style>