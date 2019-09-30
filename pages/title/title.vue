<template>
  <div class="wrap">
      <img src="/static/left.png"  @click="goBack" v-show="!hiddenBack">
      {{title}}
      <span class="right" @click="handle" v-show="!rightHidden">{{right}}</span>
  </div>
</template>

<script>
export default {
    // props: ['title','right','hiddenBack','rightHidden'],
	props: {
		title: {
			type: String,
			default: '标题'
		},
		right: {
			type: String,
			default: '管理'
		},
		hiddenBack: {
			type: Boolean,
			default: false
		},
		rightHidden: {
			type: Boolean,
			default: true
		}
	},
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        handle(){
            this.$emit('handle')
        }
    },
    computed: {
        
    }
}
</script>

<style scoped>
    .wrap {
        height: 86rpx;
        line-height: 86rpx;
        width: 100%;
        position: relative;
        top: 0;
        background: #f8f8f8;
        font-size: 32rpx;
        color: #333;
        text-align: center;
    }
    img {
        position: absolute;
        top: 24rpx;
        left: 25rpx;
        width: 23rpx;
        height: 37rpx;
    }
    .right {
        position: absolute;
        top: 0;
        right: 20rpx;
        line-height: 86rpx;
    }
</style>