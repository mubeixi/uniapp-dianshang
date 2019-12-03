<template>
  <view class="video">
    <!-- @error="videoErrorCallback" -->
    <video @error="videoErrorCallback" class="myVideo" id="myVideo" :src="video.config.src" :poster="video.config.cover|domain" controls></video>
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
		videoContext:null,
        video: {
		  config:{}
        },
      };
    },

	onHide(){

	},
    computed: {

    },
    watch: {

    },
    components: {},
    methods: {
      pauseFn(){
        console.log('暂停视频',this.videoContext)
                if(this.videoContext){
                  this.videoContext.pause()
                }

	  },
      videoErrorCallback(e) {

        let msg = '视频播放错误:'+JSON.stringify(e)
        uni.showModal({
          content: msg,
          showCancel: false
        })
      },
      // ...mapActions(),
    },
	mounted(){
		let _self = this
      _self.videoContext = uni.createVideoContext('myVideo')
      console.log(_self.videoContext)
	},
    created() {

      this.video = this.confData
      // console.log(this.video)
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
