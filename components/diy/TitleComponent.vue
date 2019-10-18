<template>
  <view class="title" :style="{color:title.style.color,backgroundColor:title.style.bgColor,paddingLeft:title.style.padding+'px',paddingRight:title.style.padding+'px'}">
    <view class="text">{{title.value.title}}</view>
    <view class="small">{{title.value.small}}</view>
    <view class="more" @click="go(moreData)">{{moreData.title}}</view>
  </view>
</template>
<script>
  import {deepCopyStrict} from "../../common/tool";

  const styleDefault = {
    color: '#333',
    bgColor: '#fff',
  };

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
        title: {},
      };
    },
    computed: {
      moreData() {
        return this.title.value.more[0] || {};
        // if(!this.title || !this.title.value || !this.title.value.more)return {};
        // return this.title.value.more[0];//this.title.value?this.title.value.more[0]:{}
      },
      style() {
        return deepCopyStrict(styleDefault, this.title.style);
      },
    },
    watch: {

    },
    components: {},
    methods: {
      go(item){
        this.$fun.linkTo(item)
      },
    },
    created() {
      //用这个来搞事啊
      this.title = this.confData
    }
  }
</script>


<style scoped lang="stylus">

  .title
    position relative
    box-sizing border-box
    width 100%

    .text
      font-size 18px

    /*color #333*/

    .small
      font-size 14px

    /*color #666*/

    .more
      position absolute
      right 10px
      top 10px
      font-size 12px
      color #66b1ff

</style>
