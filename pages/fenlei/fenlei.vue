<template>
  <div >
   <!-- <search></search>
    <van-tree-select  
        :items="items"
        :main-active-index.sync="activeIndex"
        >
        <template slot="content">
            <div v-if="activeIndex === 0" class="s_title">
                <span class="name">日用百货</span>
                <div class="fr">
                    <span class="all">查看全部</span>
                    <img class="right" src="/static/fenlei/right.png" alt="">
                </div>
            </div>
            <van-image v-if="activeIndex === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            <van-image v-if="activeIndex === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
        </template>
    </van-tree-select> -->
    <div>
        <div class="title"></div>
    </div>
    <!-- <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item,index) in items" :key="index" :title="item.text" />
    </van-sidebar> -->
   <!-- <tabs></tabs> -->
  </div>
</template>

<script>

// import tabs from '@/components/tabs'
// import search from '@/components/search'
import {pageMixin} from "../../common/mixin";

export default {
	mixins:[pageMixin],
  name: 'App',
  components: {
    // tabs,
    // search
  },
  data() {
    return {
        show: false,
        activeKey: 0,
        activeIndex: 0,
        items: [
            { text: '日用百货' },
            { text: '服装鞋帽' },
            { text: '食品美食' },
            { text: '母婴用品' },
            { text: '美妆日化' },
            { text: '数码家电' },
            { text: '家居家纺' },
        ]
    }
  },
  methods: {
      
  }
}
</script>

<style scoped>
    .van-sidebar {
        width: 100px;
        flex-shrink: 0;
        box-sizing: border-box;
    }
    .van-tree-select__nav {
        flex: none;
    }
    .van-sidebar-item {
        background: #f6f6f6;
    }
    .van-sidebar-item--select {
        background: #fff;
        color: #ff0000;
    }
    .van-sidebar {
        float: left;
    }
    .s_title {
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        padding: 12px 8px 12px 12px;
    }
    .fr {
        float: right;
    }
    .name {
        font-size: 13px;
        color: #333;
        float: left;
    }
    .all {
        font-size: 11px;
        height: 20px;
        width: 40px;
        color: #888;
    }
    .right {
        width: 6px;
        height: 10px;
        margin-left: 7px;
    }
</style>
