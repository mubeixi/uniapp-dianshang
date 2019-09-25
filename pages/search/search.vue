<template>
  <div >
    <form action="/">
    <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
    />
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

<style scoped>
    .history {
        padding: 0 10px;
    }
    .title {
        font-size: 14px;
        color: #333;
        font-weight: 500;
        line-height: 26px;
        text-align: left;
    }
    .h_content span {
        float:left;
        margin: 5px;
        background: rgba(245, 245, 245, 1);
        border-radius: 10px;
        color: #777;
        font-size: 12px;
        text-align: center;
        padding: 5px 8px;
    }
</style>