<template>
  <div @click="commonClick" class="all">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar"
          style="background-color: #F8F8F8; z-index: 999;position: fixed;top: 0rpx;left: 0rpx;"></view>
    <!-- #endif -->
    <page-title :right="rightText" :rightHidden="rightHidden" @rightHandle="rightHandle" class="titles"
                title="收藏列表"></page-title>
    <!-- #ifdef APP-PLUS -->
    <view class="space-div" style=""></view>
    <!-- #endif -->
    <!-- #ifndef APP-PLUS -->
    <view class="spaceDiv" style=""></view>
    <!-- #endif -->

    <div :key="index" class="pro-list" v-for="(item,index) in collect_list">
      <div @click="check(index)" class="mbxa" v-if="rightClicked">
        <img :src="checked[index].checked?checked_img_url:uncheck_img_url" class="imgs">
      </div>
      <div @click="goDetail(item)" class="pro">
        <div class="pros">
          <img :src="item.ImgPath" class="pro-img">
        </div>
        <div class="pro-msg">
          <div class="pro-name">{{item.Products_Name}}</div>
          <div class="collection"><span>{{item.favourite_count}}</span>人收藏</div>
          <div class="btn">
                      <span class="span">
                        <span class="spans">￥</span>{{item.Products_PriceX}}
                      </span>

            <form @submit="buy" report-submit>
              <button class="button" formType="submit">立即购买</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="defaults" v-if="collect_list.length<=0">
      <image :src="'/static/client/empty.png'|domain"></image>
    </div>
    <div class="bottom" v-if="rightClicked">
      <div @click="checkAll" class="b_left">
        <img :src="allChecked ? checked_img_url : uncheck_img_url">
        全选
      </div>
      <div @click="cancelCollection" class="b_right">删除({{totalNum}})</div>
    </div>
  </div>
</template>

<script>
import { cancelCollection, getFavouritePro } from '../../common/fetch.js'
import { pageMixin } from '../../common/mixin'
import { domainFn } from '../../common/filter'

export default {
  mixins: [pageMixin],
  components: {},
  onLoad () {

  },
  onShow () {
    this.checked_img_url = domainFn(this.checked_img_url)
    this.uncheck_img_url = domainFn(this.uncheck_img_url)
    this.getFavouritePro()
  },

  data () {
    return {
      checked_img_url: '/static/client/checked.png',
      uncheck_img_url: '/static/client/uncheck.png',
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
    prod_id () {

    }
  },
  computed: {
    totalNum () {
      return this.checked.filter(item => item.checked).length
    },
    allChecked () {
      return this.checked.filter(item => item.checked).length == this.checked.length
    }

  },
  onReachBottom () {
    if (this.hasMore) {
      this.getFavouritePro()
    }
  },
  mounted () {

  },
  methods: {

    // 跳转详情
    goDetail (item) {
      uni.navigateTo({
        url: '/pages/detail/detail?Products_ID=' + item.prod_id
      })
    },
    // 取消收藏
    cancelCollection () {
      this.prod_id = []
      this.checked.forEach((item, index) => {
        if (item.checked) {
          this.prod_id.push(this.collect_list[index].prod_id)
        }
      })
      if (this.prod_id.length <= 0) {
        uni.showToast({
          title: '您还没有选择商品哦！',
          icon: 'none',
          duration: 2000
        })
        return
      }
      cancelCollection({
        Users_ID: this.Users_ID,
        User_ID: this.User_ID,
        prod_id: JSON.stringify(this.prod_id)
      }).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        this.page = 1
        this.getFavouritePro()
        this.rightClicked = false
        this.collect_list = []
        this.rightText = this.rightClicked ? '取消' : '管理'
      }).catch(e => {
      })
    },
    // 单选
    check (index) {
      this.checked[index].checked = !this.checked[index].checked
    },
    // 全选
    checkAll () {
      let sum = 0
      this.checked.forEach(item => {
        if (item.checked) {
          sum++
        }
      })
      if (sum == this.checked.length) {
        this.checked.forEach(item => {
          item.checked = false
        })
      } else {
        this.checked.forEach(item => {
          item.checked = true
        })
      }
    },
    // 右侧管理按钮
    rightHandle () {
      this.rightClicked = !this.rightClicked
      this.rightText = this.rightClicked ? '取消' : '管理'
    },
    // 获取收藏列表
    getFavouritePro () {
      getFavouritePro({
        Users_ID: this.Users_ID,
        User_ID: this.User_ID,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        const oldlist = this.collect_list
        this.collect_list = oldlist.concat(res.data)
        if (this.collect_list.length <= 0) {
          this.rightText = ''
        } else {
          this.rightText = '管理'
        }
        // this.collect_list = res.data;
        this.hasMore = (res.totalCount / this.pageSize) > this.page
        this.page += 1
        this.checked = []
        for (var i in this.collect_list) {
          this.checked.push({
            index: i,
            checked: false
          })
        }
      })
    },
    handle () {
      this.handleShow = !this.handleShow
    },
    buy (e) {
      // add_template_code({
      //     code: e.detail.formId,
      //     times: 1
      // })
      this.$router.push({ name: 'check' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #FFFFFF;
    min-height: 100vh;
  }

  .spaces {
    margin-top: var(--status-bar-height);
  }

  .mbxa {
    display: flex;
    align-items: center;

    .imgs {
      width: 34rpx;
      height: 34rpx;
    }
  }

  .titles {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    z-index: 999;
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

  .pros {
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
    margin-bottom: 29rpx;
    margin-top: 29rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
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

  .btn .span .spans {
    font-style: normal;
    font-size: 24rpx;
  }

  .btn .button {
    width: 135rpx;
    height: 55rpx;
    background: rgba(244, 49, 49, 1);
    border-radius: 28rpx;
    font-size: 26rpx;
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

    img {
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

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }

  .space-div {
    padding-top: var(--status-bar-height);
    height: 86rpx;
    background: white;
  }

  .spaceDiv {
    height: 86rpx;
    background: white;
  }
</style>
