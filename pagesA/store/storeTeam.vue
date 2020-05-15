<template>
  <view class="msg">
		<div class="store-item" @click="goNext(1)">
			<image :src="'/static/client/store/dailishang.png'|domain" class="img-full"></image>
			<div class="store-title">代理商</div>
			<image src="/static/store/dailishanggo.png" class="store-img"></image>
		</div>

		<div class="store-item"  @click="goNext(2)">
			<image :src="'/static/client/store/shequ.png'|domain" class="img-full"></image>
			<div class="store-title">社区门店</div>
			<image src="/static/store/shequgo.png" class="store-img"></image>
		</div>
  </view>
</template>
<script>
// import {} from '../../common/fetch'
import {pageMixin} from "../../common/mixin";

import {error, toast} from '../../common';

export default {
    mixins:[pageMixin],

    data() {
        return {

        }
    },
    methods: {
		goNext(item){
			uni.navigateTo({
				url:'/pagesA/store/storeTeamList?type='+item
			})
		}
    }
}
</script>

<style lang="scss" scoped>
	.store-bg{
		background-color: #FFFFFF;
		height: 100vh;
		padding-top: 60rpx;
		box-sizing: border-box;
	}
	.store-item{
		width: 750rpx;
		height: 256rpx;
		margin-bottom: 46rpx;
		position: relative;
	}
	.store-title{
		font-size: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		font-weight:bold;
		position: absolute;
		top: 110rpx;
		left: 320rpx;
		color: #FFFFFF;
	}
	.img-full{
		width: 100%;
		height: 100%;
	}
	.store-img{
		width: 100rpx;
		height: 66rpx;
		position: absolute;
		top: 94rpx;
		right: 68rpx;
	}

</style>
