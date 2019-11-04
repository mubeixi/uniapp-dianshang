<template>
  <view class="title" :style="{color:title.style.color,backgroundColor:title.style.bgColor,paddingLeft:title.style.padding+'px',paddingRight:title.style.padding+'px',paddingTop:title.style.paddingc+'px',paddingBottom:title.style.paddingc+'px'}">
    <!-- <view class="text">{{title.value.title}}</view>
    <view class="small">{{title.value.small}}</view>
    <view class="more" @click="go(moreData)">{{moreData.title}}</view> -->
    <div class="flex">
      <img v-if="title.config.icon" class="icon" :style="{marginRight:10+'px'}" :src="domainFunc(title.config.icon)" />
      <div class="flex1" :style="{textAlign:title.style.textAlign}">
        <div class="text" :style="{fontSize:title.style.fontSize+'px'}">{{title.value.title}}</div>
        <div class="small"  :style="{fontSize:title.style.fontSize-4+'px'}">{{title.value.small}}</div>
      </div>
      <view class="more" @click="go(moreData)">{{moreData.title}}</view>
    </div>
  </view>
</template>
<script>
  import {deepCopyStrict} from "../../common/tool";
    import {domain} from "../../common/filter";

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
        title: {

        },
      };
    },
    computed: {
      moreData() {

        if(!this.title || !this.title.value || !this.title.value.more || !this.title.value.more[0])return {};
        return this.title.value.more[0];

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
      domainFunc(url) {
        if(!url){
          return 'http://www.qiyeban.com/uploadfiles/wkbq6nc2kc/image/20190930095641111.png';//展位图替换掉吧。。
        }

        return domain(url)
      },
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
      //font-size 18px

    /*color #333*/

    .small
      //font-size 14px

    /*color #666*/

    .more
      position absolute
      right 10px
      top 10px
      font-size 12px
      color #66b1ff

</style>
