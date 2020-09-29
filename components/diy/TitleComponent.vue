<template>
  <view :style="{color:style.color,background:style.bgColor,paddingLeft:style.padding+'px',paddingRight:style.padding+'px',paddingTop:style.paddingc+'px',paddingBottom:style.paddingc+'px'}"
        class="title">
    <!-- <view class="text">{{title.value.title}}</view>
    <view class="small">{{title.value.small}}</view>
    <view class="more" @click="go(moreData)">{{moreData.title}}</view> -->
    <div class="flex">
      <img :src="domainFunc(title.config.icon)" :style="{marginRight:10+'px'}" class="icon"
           v-if="title.config.icon" />
      <div :style="{textAlign:title.style.textAlign}" class="flex1">
        <div :style="{fontSize:title.style.fontSize+'px'}" class="text">{{title.value.title}}</div>
        <div :style="{fontSize:title.style.fontSize-4+'px'}" class="small">{{title.value.small}}</div>
      </div>
      <view @click="go(moreData)" class="more">{{moreData.title}}</view>
    </div>
  </view>
</template>
<script>
import { mixinStyle } from '../../common/tool'
import { domainFn } from '../../common/filter'

const styleDefault = {
  color: '#333',
  bgColor: '',
  paddingc: 10,
  padding: 10,
  fontSize: 16,
  textAlign: 'left'
}

import T from '@/common/langue/i18n'
export default {
  props: {
    index: {
      required: true
    },
    confData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      title: {}
    }
  },
  computed: {
    moreData () {
      if (!this.title || !this.title.value || !this.title.value.more || !this.title.value.more[0]) return {}
      return this.title.value.more[0]

      // return this.title.value.more[0];//this.title.value?this.title.value.more[0]:{}
    },
    style () {
      if (!this.title.style) return styleDefault
      return mixinStyle(styleDefault, this.title.style)
    }
  },
  watch: {},
  components: {},
  methods: {
    domainFunc (url) {
      if (!url) {
        return 'http://www.qiyeban.com/uploadfiles/wkbq6nc2kc/image/20190930095641111.png'// 展位图替换掉吧。。
      }

      return domainFn(url)
    },
    go (item) {
      this.$fun.linkTo(item)
    }
  },
  created () {
    // 用这个来搞事啊
    this.title = this.confData
  }
}
</script>

<style lang="stylus" scoped>

  .title
    position relative
    box-sizing border-box
    width 100%

    .text
      //font-size 18px
      /*color #333*/
    .small
      //font-size 14px
      /*color #666*/
    .more
      position absolute
      right 10px
      top 50%
      transform translateY(-50%)
      font-size 12px
      color #66b1ff

  .flex
    align-items center

  .icon
    max-width 40px

</style>
