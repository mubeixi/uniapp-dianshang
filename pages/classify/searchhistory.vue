<template>
  <div @click="commonClick">
    <div class="history">
        <div class="title">搜索历史</div>
        <div class="h_content">
            <span class="span">连衣裙</span>
            <span class="span">中秋月饼</span>
            <span class="span">奶茶咖啡店</span>
            <span class="span">乐高积木</span>
            <span class="span">鲜花干湿分离</span>
            <span class="span">波力海苔</span>
            <span class="span">纯牛奶</span>
        </div>
    </div>
  </div>
</template>

<script>
import {pageMixin} from "../../common/mixin";

export default {
	mixins:[pageMixin],
  name: 'App',
  props: {value:'',},
  data() {
    return {

    }
  },
  components: {

  },
  methods: {

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
    .h_content .span {
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
