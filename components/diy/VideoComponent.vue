<template>
  <view class="video" v-if="video.config.src">
    <!-- @error="videoErrorCallback" -->
    <video class="myVideo" :src="video.config.src" :poster="video.config.cover|domain" controls></video>
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
      
      videoErrorCallback: function(e) {

        uni.showModal({
          content: e.target.errMsg||'视频播放失败,请检查视频地址',
          showCancel: false
        })
      },
      // ...mapActions(),
    },
    created() {

      this.video = this.confData
      console.log(this.video)
    }
  }
</script>


<style scoped lang="stylus">
  .video
    width 100%
    height 0
    padding-top 55.6%
    position relative

    // img
    //   position absolute
    //   width 100%
    //   height 100%
    //   top 0
    //   vertical-align top

    .myVideo
      position absolute
      width 100%
      top 0
      bottom 0
      height auto
      vertical-align: top

</style>
