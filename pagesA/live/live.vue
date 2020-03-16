<template>
	<view class="page-wrap">
		<view class="live-list font12" v-if="liveList.length>0">
			<view class="live-item" v-for="(live,idx) in liveList" :key="idx">
				<image mode="aspectFill" class="cover" :src="live.cover_img" ></image>
				<view class="info">
					<view class="row">
						<view class="label">预计时间：</view>
						<view class="content font12">{{live.start_time}} 至<br/>{{live.end_time}}</view>
					</view>
					<view class="row">
						<view class="label">主播名：</view>
						<view class="content">{{live.anchor_name}}</view>
					</view>
					<view class="row">
						<view class="label">直播状态：</view>
						<view class="content flex status">
							<view class="status-text" :class="[getLiveStatusStyle(live.live_status)]">{{live.room_status_txt}}</view>
							<image mode="widthFix" class="status-icon padding10-c" :src="getLiveIconUrl(live.live_status)"></image>
						</view>
					</view>
					<view class="row fun-live">
						<navigator :class="{active:live.live_status===101}" class="btn"  :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+live.roomid">观看直播</navigator>
						<!-- <subscribe :class="{active:live.live_status===101}" class="btn"  :room-id="'['+live.roomid+']'">开播提醒</subscribe> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {pageMixin} from "../../common/mixin";
	import {getLiveInfo} from "../../common/fetch";

	export default {
		mixins:[pageMixin],
		data() {
			return {

				liveList:[],
				liveCount:0,
			}
		},
		onShow(){
			getLiveInfo().then(res=>{

				this.liveList = res.data.room_info
				this.liveCount = res.data.count
			})
		},
		methods: {
			getLiveStatusStyle(status_code){
				// 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常, 107：已过期
				let rt = 'blue'
				switch (status_code) {
					case 101:
						rt = 'red';
						break;
					case 102:
						rt = 'green';
						break;
					default:
						break;
				}
				console.log(rt,status_code)
				return rt;

			},
			/**
			 *
			 * @param status_code
			 * @param type
			 * @returns {string}
			 */
			getLiveIconUrl(status_code){

				// 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常, 107：已过期
				let rt = '/static/live/live-blue.png';
				switch (status_code) {
					case 101:
						rt = '/static/live/live-blue.png';
						break;
					case 102:
						rt = '/static/live/live-green.png';
						break;
					default:
						break;
				}

				return rt;

			}
		}
	}
</script>

<style scoped lang="scss">
page{
	/*background: #f2f2f2;*/
	/*min-height: 100vh;*/
}
.page-wrap{

}
.live-list{
	.live-item{
		width: 700rpx;
		box-sizing: border-box;
		margin: 20rpx 25rpx 0rpx;
		padding: 20rpx;
		background: white;
		display: flex;
		align-items: center;
		.cover{
			width: 260rpx;
			height: 180rpx;
		}
		.info{
			flex: 1;
			padding-left: 20rpx;

		}
	}
}
.info{
	.row{
		display: flex;
		margin-bottom: 16rpx;
		.label{
			color: #999;

		}
		.content{
			color: #444;
			&.status{
				align-items: center;
				.status-icon{
					width: 28rpx;
					height: 24rpx;
				}
				.status-text{
					&.red{
						color: #F5192E;
					}
					&.green{
						color: #1AAD21;
					}
					&.blue{
						color: #2B4AE7;
					}
				}
			}

		}
		.btn{
			width: 256rpx;
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			background: #B7B7B7;
			border-radius: 2rpx;
			color: white;
			&.active{
				background: #F5192E;
			}
		}
	}
}
</style>
