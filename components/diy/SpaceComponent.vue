<template>
  <view :style="{height:style.height+'px',background:space.style.bgColor}" class="space">

  </view>
</template>
<script>

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
      space: {
        style: {}
      }
    }
  },
  computed: {
    style () {
      return this.space.style// deepCopyStrict(styleDefault, this.space.style);
    }
  },
  watch: {},
  components: {},
  methods: {},
  created () {
    // 用这个来搞事啊
    this.space = this.confData
  }
}
</script>

<style lang="stylus" scoped>
  .space
    height 0
    width 100%

</style>
