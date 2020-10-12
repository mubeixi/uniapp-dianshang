<template>
  <web-view :src="url" @click="commonClick" v-if="url"></web-view>
</template>

<script>
import T from '@/common/langue/i18n'
export default {
  data () {
    return {
      url: ''
    }
  },
  onLoad (options) {
    if (options.hasOwnProperty('encode') && options.encode) {
      this.url = decodeURIComponent(options.url)
    } else {
      this.url = options.url
    }
  }
}
</script>

<style>
</style>
