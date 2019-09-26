<template>
  <div >
    <form action="/">
		<div class="search-wrap">
			<icon type="search" size="17" class="search_icon"/>
			<input type="text" class="search-input" name="search"> 
			<span>取消</span>
		</div>	
    </form>
    <div class="history">
        <div class="title">搜索历史</div>
        <div class="h_content">
            <span>连衣裙</span>
            <span>中秋月饼</span>
            <span>奶茶咖啡店</span>
            <span>乐高积木</span>
            <span>鲜花干湿分离</span>
            <span>波力海苔</span>
            <span>纯牛奶</span>
        </div>
    </div>
  </div>
</template>

<script>

// import tabs from '@/components/tabs'
export default {
  name: 'App',
  data(){
      return {
          value: ''
      }
  },
  components: {
    
  },
  methods: {
      onSearch: function(){
          console.log('1')
          this.$router.push({path:'/result'})
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
    .title {
        font-size: 28rpx;
        color: #333;
        font-weight: 500;
        line-height: 26rpx;
        text-align: left;
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