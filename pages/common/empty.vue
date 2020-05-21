<template>
  <view @click="commonClick" class="wrap">
  
  </view>
</template>

<script>

export default {
  name: 'Empty',
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {

  },

}
</script>

<style lang="scss" scoped>
  .wrap {
    background: #f2f2f2;
    height: 100vh;
    padding: 10px;
  }
  
  .rotate-box {
    width: 660 rpx;
    height: 660 rpx;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*padding: 20rpx;*/
    z-index: 32;
    display: flex;
    flex-wrap: wrap;
    
    .item {
      width: 220 rpx;
      height: 220 rpx;
      text-align: center;
      box-sizing: border-box;
      padding: 30 rpx;
      overflow: hidden;
      
      .start-btn {
        height: 160 rpx;
        line-height: 160 rpx;
        background: #F43131;
        color: white;
      }
      
      .pic {
        width: 70 rpx;
        height: 70 rpx;
        border-radius: 50%;
      }
      
      .name {
        margin: 20 rpx 0 0;
        height: 30 rpx;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
