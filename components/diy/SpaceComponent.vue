<template>
  <view 
       :style="{height:style.height+'px',backgroundColor:style.bgColor}" class="space">

  </view>
</template>
<script>
  import {deepCopyStrict} from "../../common/tool";
  const styleDefault = {
    
  }
  export default {
    props: {
      index: {
        required: true,
      },
      confData: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        space: {},
      };
    },
    computed: {
      style() {
        return this.space.style;//deepCopyStrict(styleDefault, this.space.style);
      },
    },
    watch: {

    },
    components: {},
    methods: {

    },
    created() {
      //用这个来搞事啊
      this.space = this.confData;
    }
  }
</script>


<style scoped lang="stylus">
  .space
    height 0
    width 100%
</style>
