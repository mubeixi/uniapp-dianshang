<style lang="scss" scoped>
.page-wrap{
  display: flex;
  flex-direction: column;
  .page-container{
    flex:1;
  }
  .page-foot{
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
<template>
<div class="page-wrap">
  <div class="page-container">

  </div>
  <div class="page-foot"></div>
</div>
</template>

<script>
import { pageMixin } from '@/common/mixin'

import T from '@/common/langue/i18n'
export default {
  name: 'play',
  mixins: [pageMixin],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
