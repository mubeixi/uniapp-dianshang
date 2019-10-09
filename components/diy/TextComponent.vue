<template>
  <view class="text">
    <view :style="{fontSize:text.style.fontSize+'px',color:text.style.color,backgroundColor:text.style.bgColor,textAlign:text.style.textAlign}"
         class="text">{{text.value.content}}
    </view>
  </view>
</template>
<script>
  import {deepCopyStrict} from "../../common/tool";

  const styleDefault = {
    color: '#333',
    bgColor: '#e6e6e6',
    fontSize: '14',
    textAlign: 'left',
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
        text: {},
      };
    },
    computed: {
      style() {
        return deepCopyStrict(styleDefault, this.text.style);
      },

    },
    watch: {

    },
    components: {},
    methods: {

    },
    created() {
      //用这个来搞事啊
      this.text = this.confData
    }
  }
</script>


<style scoped lang="stylus">
  .text
    width 100%
</style>
