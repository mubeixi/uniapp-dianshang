<template>
	  <div class="wrap" :style="{backgroundColor: bgcolor}">
		  <img src="/static/left.png"  @click="goBack" v-show="!hiddenBack">
		  {{title}}
		  <span class="right" @click="rightHandle" v-show="!rightHidden">{{right}}</span>
	  </div>
</template>

<script>
import {pageMixin} from "../../common/mixin";

export default {
	mixins:[pageMixin],
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
		},
		bgcolor:{
			default: '#f8f8f8'
		}
	},
    methods: {
        goBack(){
            uni.navigateBack(1);
        },
        rightHandle(){
            this.$emit('rightHandle')
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
        font-size: 32rpx;
        color: #333;
        text-align: center;
    }
    img {
        position: absolute;
        top: 9rpx;
        left: 13rpx;
        width: 23rpx;
        height: 37rpx;
        padding: 20rpx;
    }
    .right {
        position: absolute;
        top: 0;
        right: 20rpx;
        line-height: 86rpx;
    }
</style>
