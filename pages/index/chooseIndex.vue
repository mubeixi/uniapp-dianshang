<template>
  <view @click="commonClick" style="position: relative;">
    <!-- #ifdef APP-PLUS -->
    <!-- 这里是状态栏 -->
    <view class="status_bar" style="position: fixed;background-color: white;top:0;left:0;z-index: 99;"></view>
    <!-- #endif -->
    <view :style="{background:system.bgcolor}" class="home-wrap">
      <section
      :class="[item]"
      :data-name="item"
      :key="index"
      class="section"
      v-for="(item, index) in templateList[tagIndex]">
        <base-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('base') !== -1" />
        <swiper-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('swiper') !== -1" />
        <nav-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('nav') !== -1" />
        <video-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        ref="video"
        v-if="item.indexOf('video') !== -1" />
        <hr-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('hr') !== -1" />
        <space-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('space') !== -1" />
        <title-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('title') !== -1" />
        <text-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('text') !== -1" />
        <search-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('search') !== -1" />
        <notice-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        ref="notice"
        v-if="item.indexOf('notice') !== -1" />
        <coupon-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('coupon') !== -1" />
        <goods-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('goods') !== -1" />
        <cube-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('cube') !== -1" />
        <tab-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('tab') !== -1" />
        <group-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('group') !== -1" />
        <flash-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('flash') !== -1" />
        <kill-component
        :confData="templateData[tagIndex][index]"
        :index="index"
        v-if="item.indexOf('kill') !== -1" />
      </section>
    </view>
    <!-- #ifndef H5 -->
    <image @click="callFn" class="telphone"
           src="https://new401.bafangka.com/static/api/shop/skin/default/images/autotel.png"
           v-if="initData.CallEnable" />
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <a :href="'tel:'+initData.CallPhoneNumber" class="telphoneLink" v-if="initData.CallEnable">
      <image class="telphone" src="https://new401.bafangka.com/static/api/shop/skin/default/images/autotel.png" />
    </a>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <view class="liveBox" v-if="liveList.length===1">
      <navigator :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+liveList[0].roomid">
        <image class="icon-live" src="/static/live/logo.png"></image>
      </navigator>
    </view>
    <view class="liveBox" v-if="liveList.length>1">
      <image @click="toLive" class="icon-live" src="/static/live/logo.png"></image>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import BaseComponent from '../../components/diy/BaseComponent.vue'
import SwiperComponent from '../../components/diy/SwiperComponent.vue'
import NavComponent from '../../components/diy/NavComponent.vue'
import VideoComponent from '../../components/diy/VideoComponent.vue'
import HrComponent from '../../components/diy/HrComponent.vue'
import SpaceComponent from '../../components/diy/SpaceComponent.vue'
import TitleComponent from '../../components/diy/TitleComponent.vue'
import TextComponent from '../../components/diy/TextComponent.vue'
import SearchComponent from '../../components/diy/SearchComponent.vue'
import NoticeComponent from '../../components/diy/NoticeComponent.vue'
import CouponComponent from '../../components/diy/CouponComponent.vue'
import GoodsComponent from '../../components/diy/GoodsComponent.vue'
import CubeComponent from '../../components/diy/CubeComponent.vue'
import TabComponent from '../../components/diy/TabComponent.vue'
import GroupComponent from '../../components/diy/GroupComponent'
import FlashComponent from '../../components/diy/FlashComponent'
import KillComponent from '../../components/diy/KillComponent'

import { getSkinConfig, getSystemConf } from '../../common/fetch'
import { getLiveInfo } from '../../common/fetch'
import { pageMixin } from '../../common/mixin'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [pageMixin],
  data () {
    return {
      liveList: [],
      liveCount: 0,
      templateList: [],
      templateData: [],
      tagIndex: 0,
      system: {},
      tabbar: false
    }
  },
  components: {
    BaseComponent,
    SwiperComponent,
    NavComponent,
    VideoComponent,
    HrComponent,
    SpaceComponent,
    TitleComponent,
    TextComponent,
    SearchComponent,
    NoticeComponent,
    CouponComponent,
    GoodsComponent,
    CubeComponent,
    TabComponent,
    FlashComponent,
    GroupComponent,
    KillComponent
  },
  computed: {
    ...mapGetters(['initData'])
  },
  methods: {
    toLive () {
      uni.navigateTo({
        url: '/pagesA/live/live'
      })
    },
    callFn () {
      uni.makePhoneCall({
        phoneNumber: this.initData.CallPhoneNumber
      })
    },
    tabbarFn (idx) {
      const tabbarRouter = ['/pages/index/index', '/pages/classify/classify', '/pages/detail/groupSuccess', '/pages/order/cart', '/pages/person/person']

      uni.switchTab({
        url: tabbarRouter[idx]
      })
    },
    get_tmpl_data () {
      let rt = {}
      return new Promise((resolve, reject) => {
        getSkinConfig().then(res => {
          if (res.data.Home_Json) {
            rt = JSON.parse(res.data.Home_Json)
            resolve(rt)
          } else {
            reject(new Error(res.msg || '获取系统模板失败'))
          }
        }).catch(e => {
          reject(new Error(e.msg || '获取系统模板失败'))
        })
      })
    },
    async initFunc () {
      const mixinData = await this.get_tmpl_data()
      if (mixinData === false) return
      const templateData = mixinData.plugin
      this.system = mixinData.system

      // 存储页面数据
      this.templateData = [] // 页面数据的二维数组。
      this.templateList = [] // 页面组件的二维数组。
      if (templateData && Array.isArray(templateData[0])) {
        // 多个页面，每个页面是一个数组
        templateData.map(item => {
          this.templateData.push(item)
          this.templateList.push([])
        })
      } else if (
        templateData &&
        !Array.isArray(templateData[0]) &&
        templateData.length > 0
      ) {
        // 单纯是一个对象的时候？？
        this.templateData = [templateData]
        this.templateList = [[]]
      } else {
        this.templateData = [[]]
        this.templateList = [[]]
      }
      // this.templateData = templateData
      // 存储页面组件templateList
      for (let i = 0; i < this.templateData.length; i++) {
        if (
          this.templateData[i] &&
          this.templateData[i] !== []
        ) {
          this.templateData[i].map(m => {
            this.templateList[i].push(m.tag)
          })
        }
      }
    },
    ...mapActions(['getInitData'])
  },
  onLoad (opt) {
    // uni.hideTabBar()
  },
  async created () {
    this.initFunc()

    const systemConf = await getSystemConf()

    const initData = systemConf ? systemConf.data : null

    if (initData && initData.hasOwnProperty('ShopName') && initData.ShopName) {
      uni.setNavigationBarTitle({
        title: initData.ShopName
      })
    }

    // #ifdef MP-WEIXIN
    getLiveInfo().then(res => {
      this.liveList = res.data
      this.liveCount = res.data.totalCount
    }).catch((e) => {
      console.log(e)
    })
    // #endif
  },
  mounted () {

  },
  onShow () {
    if (this.$refs.notice) {
      this.$refs.notice.map(item => {
        item.restartAn()
      })
    }
  },
  async onPullDownRefresh () {
    uni.stopPullDownRefresh()
  },
  onHide () {
    // 暂停notice组件的定时器任务
    if (this.$refs.notice) {
      this.$refs.notice.map(item => {
        item.pauseAn()
      })
    }
    // 暂停播放
    if (this.$refs.video) {
      this.$refs.video.map(item => {
        item.pauseFn()
      })
    }
  }
}
</script>

<style lang="less" scope="scope">

  .telphone {
    width: 27px;
    height: 101px;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
  }

  /*.tabbar{*/
  /*	height: 60px;background: red;position: fixed;bottom: 0;width: 100%;*/
  /*	display: flex;*/
  /*	z-index: 999;*/
  /*	.item{*/
  /*		flex: 1;*/
  /*		text-align: center;*/
  /*		line-height: 60px;*/
  /*		font-size: 14px;*/
  /*		color: #fff;*/
  /*	}*/
  /*}*/
  .home-wrap {
    width: 750rpx;
    overflow-x: hidden;
    background: #f8f8f8;
    position: relative;
    //min-height: 100vh;
    /* #ifdef APP-PLUS */
    padding-top: var(--status-bar-height);
    /* #endif */

    .section {
      position: relative;
      //搜索框特殊
      &.search {
        position: static;
      }
    }
  }

  /*.content {*/
  /*	display: flex;*/
  /*	flex-direction: column;*/
  /*	align-items: center;*/
  /*	justify-content: center;*/
  /*}*/

  /*.logo {*/
  /*	height: 200rpx;*/
  /*	width: 200rpx;*/
  /*	margin-top: 200rpx;*/
  /*	margin-left: auto;*/
  /*	margin-right: auto;*/
  /*	margin-bottom: 50rpx;*/
  /*}*/

  /*.text-area {*/
  /*	display: flex;*/
  /*	justify-content: center;*/
  /*}*/

  /*.title {*/
  /*	font-size: 36rpx;*/
  /*	color: #8f8f94;*/
  /*}*/
</style>
