<template>
  <view @click="commonClick" style="position: relative;" v-show="system.title">
    <view :style="{background:system.bgcolor}" class="home-wrap">

      <section :class="[item]" :data-name="item" :key="index" :ref="item" class="section"
               v-for="(item, index) in templateList[tagIndex]">
        <base-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('base') !== -1" />
        <swiper-component :confData="templateData[tagIndex][index]" :index="index"
                          v-if="item.indexOf('swiper') !== -1" />
        <nav-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('nav') !== -1" />
        <video-component :confData="templateData[tagIndex][index]" :index="index" ref="video"
                         v-if="item.indexOf('video') !== -1" />
        <hr-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('hr') !== -1" />
        <space-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('space') !== -1" />
        <title-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('title') !== -1" />
        <text-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('text') !== -1" />
        <search-component :confData="templateData[tagIndex][index]" :index="index"
                          v-if="item.indexOf('search') !== -1" />
        <notice-component :confData="templateData[tagIndex][index]" :index="index" ref="notice"
                          v-if="item.indexOf('notice') !== -1" />
        <coupon-component :confData="templateData[tagIndex][index]" :index="index"
                          v-if="item.indexOf('coupon') !== -1" />
        <goods-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('goods') !== -1" />
        <cube-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('cube') !== -1" />
        <tab-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('tab') !== -1" />
        <group-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('group') !== -1" />
        <flash-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('flash') !== -1" />
        <kill-component :confData="templateData[tagIndex][index]" :index="index" v-if="item.indexOf('kill') !== -1" />
      </section>
    </view>
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

import { getDiySkinConfig } from '../../common/fetch'

import { GetQueryByString } from '../../common/tool'

import { pageMixin } from '../../common/mixin'
import { modal } from '@/common'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      selfObj: null,
      templateList: [],
      templateData: [],
      tagIndex: 0,
      system: {}
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
  },
  created () {

  },
  methods: {},
  onShow () {
    if (this.$refs.notice) {
      this.$refs.notice.map(item => {
        item.restartAn()
      })
    }
  },
  onLoad (options) {
    let Home_ID = options.Home_ID

    // #ifdef H5
    if (!Home_ID && GetQueryByString(location.href, 'Home_ID')) {
      Home_ID = GetQueryByString(location.href, 'Home_ID')
    }
    // #endif

    if (!Home_ID) {
      this.$error(T._(680))
    }

    new Promise((resolve, reject) => {
      // Skin_ID,
      getDiySkinConfig({ Home_ID }, {
        tip: 'loading',
        mask: true
      }).then(res => {
        if (res.data.Home_Json) {
          resolve(JSON.parse(res.data.Home_Json))
        } else {
          reject(Error(T._(681)))
        }
      }).catch(e => {

      })
    })
      .then(mixinData => {
        const templateData = mixinData.plugin
        this.system = mixinData.system

        uni.setNavigationBarTitle({
          title: mixinData.system.title
        })

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
      })
      .catch(err => {
        modal(err.msg || T._(682))
      })
  }
}
</script>

<style lang="less" scope="scope">
  .home-wrap {
    width: 750rpx;
    overflow-x: hidden;
    background: #f2f2f2;
    position: relative;
    min-height: 100vh;
    /* #ifdef APP-PLUS */
    /*padding-top: var(--status-bar-height);*/
    /* #endif */

    .section {
      position: relative;
      //搜索框特殊
      &.search {
        position: static;
      }
    }
  }
</style>
