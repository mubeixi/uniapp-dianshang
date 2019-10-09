<template>
  <view class="video">
    <video id="myVideo" :src="video.config.src"
           @error="videoErrorCallback" controls></video>
<!--    <img v-if="video.config.cover" :src="video.config.cover|domain"/>-->
<!--    <div v-else>-->
<!--      <video width="100%" height="100%" controls="controls">-->
<!--        您的浏览器不支持 video 标签。-->
<!--      </video>-->
<!--    </div>-->
  </view>
</template>
<script>
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
        video: {},
      };
    },
    computed: {

    },
    watch: {

    },
    components: {},
    methods: {
      setData(item, index) {
        // console.log('hehe',this.video)
        // @ts-ignore
        this.$store.commit('activeAttr', this.video);// 这里点击之后，setAttr马上就有响应。

        // @ts-ignore
        this.$store.commit('tabIndex', this.index);

        // 用vuex就不要一层层传递了，头都晕了
        // this.$emit('setData', this.img.attrData)
      },
      videoErrorCallback: function(e) {
        uni.showModal({
          content: e.target.errMsg,
          showCancel: false
        })
      },
      // ...mapActions(),
    },
    created() {

      this.video = this.confData
    }
  }
</script>


<style scoped lang="stylus">
  .video
    width 100%
    height 0
    padding-top 55.6%
    position relative

    img
      position absolute
      width 100%
      height 100%
      top 0
      vertical-align top

    video
      position absolute
      width 100%
      top 0
      bottom 0
      height auto
      vertical-align: top

</style>
