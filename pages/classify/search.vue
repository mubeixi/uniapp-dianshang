<template>
  <div @click="commonClick">
    <form action="/">
      <div class="search-wrap">
        <icon class="search_icon" size="34rpx" type="search" />
        <input @confirm="success" autofocus="autofocus" class="search-input" confirm-type='search' focus="focus"
               name="search" type="text" v-model="inputValue">
        <span @click="close" class="span">取消</span>
      </div>
    </form>
    <div class="history" v-if="searchAll.length>0">
      <div class="title">
        <div>搜索历史</div>
        <div @click="clear" class="dels">
          <image :src="'/static/client/del.png'|domain" class="img" />
        </div>
      </div>
      <div class="h_content">
        <span :key='i' @click="goSearch(item)" class="span" v-for="(item,i) of searchAll">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { goBack } from '../../common/tool.js'
// import tabs from '@/components/tabs'
import { pageMixin } from '../../common/mixin'

export default {
  mixins: [pageMixin],
  name: 'App',
  data () {
    return {
      inputValue: '',
      searchAll: [],
    }
  },
  components: {},
  onLoad (options) {
    if (options.keyword) {
      this.inputValue = options.keyword
    }
  },
  onShow () {
    const than = this // 注意this的指向
    uni.getStorage({
      key: 'searchAll',
      success (res) {
        than.searchAll = res.data
      },
    })
  },
  methods: {
    goSearch (item) {
      uni.navigateTo({
        url: '/pages/classify/result?inputValue=' + item,
      })
    },
    success () {
      const url = '/pages/classify/result?refer=searchPage&inputValue=' + this.inputValue
      this.inputValue = ''
      if (this.inputValue != '') { // 输入框的值不为空时
        const than = this
        for (var item of this.searchAll) {
          if (item == this.inputValue) {
            uni.navigateTo({
              url,
            })
            return
          }
        }
        this.searchAll.push(this.inputValue) // 将输入框的值添加到搜索记录数组中存储
        uni.setStorage({
          key: 'searchAll',
          data: than.searchAll,
        })
      }
      uni.navigateTo({
        url,
      })
    },
    clear () {
      this.searchAll = []
      uni.setStorage({
        key: 'searchAll',
        data: [],
      })
    },
    close () {
      this.inputValue = ''
      goBack()
    },
    onSearch: function () {

    },
    onCancel: function () {

    },
  },
}
</script>

<style lang="scss" scoped>
  .search-wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30 rpx;
    padding: 30 rpx 22 rpx 46 rpx 20 rpx;
    box-sizing: border-box;
    
    .search-input {
      float: left;
      width: 600 rpx;
      height: 65 rpx;
      line-height: 65 rpx;
      border-radius: 10 rpx;
      background: #F4F4F4;
      font-size: 26 rpx;
      color: #ADADAD;
      padding-left: 91 rpx;
      box-sizing: border-box;
    }
    
    .search_icon {
      position: absolute;
      top: 46 rpx;
      left: 61 rpx;
    }
    
    .span {
      font-size: 30 rpx;
      color: #333333;
    }
  }
  
  .history {
    padding: 0 20 rpx;
  }
  
  .title {
    display: flex;
    justify-content: space-between;
    height: 40 rpx;
    align-items: center;
  }
  
  .title {
    font-size: 28 rpx;
    color: #333;
    font-weight: 500;
    height: 40 rpx;
    
    line-height: 40 rpx;
    
    .img {
      width: 40 rpx;
      height: 40 rpx;
      /*width: 100%;*/
      /*height: 100%;*/
    }
  }
  
  .dels {
    width: 40 rpx;
  }
  
  .h_content .span {
    float: left;
    background: rgba(245, 245, 245, 1);
    border-radius: 10px;
    color: #777;
    font-size: 12px;
    text-align: center;
    padding: 16 rpx 24 rpx;
    margin: 30 rpx 20 rpx 0 0;
  }
</style>
