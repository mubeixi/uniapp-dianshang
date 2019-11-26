<template>
	  <div class="component-wrap" :style="{backgroundColor: bgcolor}">
		  <img class="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAlCAMAAACeRoI0AAAAvVBMVEVHcEwzMzMzMzM2NjY1NTUwMDAxMTEzMzMyMjIxMTEzMzMtLS0zMzMyMjIrKyszMzMzMzMzMzMyMjIzMzMuLi4zMzMxMTEyMjIzMzMyMjIyMjIxMTEsLCwzMzMyMjIyMjIyMjIzMzMzMzMvLy8yMjIyMjIyMjIzMzMzMzMyMjIzMzMzMzMxMTE1NTUuLi4zMzMzMzMyMjIzMzMyMjIyMjIzMzMxMTEyMjIuLi4xMTExMTEzMzM0NDQyMjIzMzPVDEorAAAAPnRSTlMAfM0TGCCB/v0VzhHPyxIUg37Q0xbSc3XUcdVtF9jWa99vGRtlZ9vcHtrZaRodHN3eenl2e3h3wSFjYmSeYZ0V3m0AAAC1SURBVCjPddPHEsIwEANQ0yH0Fjqh997r/v9noWTggrw5Pnky9lo25v9LZ0WkQJwLg+PEEQdcJM5nwCHiVAl8Yq6CD8SVMvhC3K6Da8TRJthl7ookGsSDDrhPvFqAW8TDOdgj3kzAS+L1VCQ5Jp5twSPi2A78ZO6BH8TmilO+mM3NX/+2BMH/75ZA2Y+6f/W86nzUearzV+9LvV+1D9/+HC1B0LezLfD7ubcESp/V/qvv5fe+PtJeIwkJchrWAAAAAElFTkSuQmCC"  @click="goBack" v-show="!hiddenBack">
		  {{title}}
          <view v-if="dot" class="dotted"></view>
		  <span v-else class="right" @click="rightHandle" v-show="!rightHidden">{{right}}</span>
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
        },
        // 右上角是三个点
        dot: {
            type: Boolean,
            default: false
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

<style scoped lang="scss">
    .component-wrap {
        height: 86rpx;
        line-height: 86rpx;
        width: 100%;
        position: relative;
        top: 0;
        font-size: 32rpx;
        color: #333;
        text-align: center;
        .img {
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
        .dotted {
            position: absolute;
            
        }
    }
</style>
