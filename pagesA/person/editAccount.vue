<template>
	<view @click="commonClick" class="myall">
		<!-- #ifdef APP-PLUS -->
		<!--		<view class="status_bar" style="background-color: rgb(248, 248, 248);"></view>-->
		<!-- #endif -->
		<!-- <page-title title="设置" rightHidden="true" bgcolor="#F8F8F8"></page-title> -->
		<view class="wrap">
			<view @click="update(3)" class="item">
				<view>{{$t('1414x0')}}</view>
				<image :src="'/static/client/right.png'|domain" mode=""></image>
			</view>
			<view @click="update(0)" class="item">
				<view>{{$t('1414x1')}}</view>
				<image :src="'/static/client/right.png'|domain" mode=""></image>
			</view>
			<view @click="update(1)" class="item">
				<view>{{$t('1414x2')}}</view>
				<image :src="'/static/client/right.png'|domain" mode=""></image>
			</view>
			<view class="item" v-if="lang_flag">
				<view>{{ $t('902x16') }}</view>
				<view style="display: flex;align-items: center;">
					<picker class="lang_choose_box" @change="chooseLang" :value="choose_lang_idx" :range="lang_code_list" range-key="choose_item">
						<view class="lang_choose_show">
							<view class="lang_code">{{lang_code_list[choose_lang_idx].lang_name}}</view>
						</view>
					</picker>
					<image style="margin-left: 20rpx;" :src="'/static/client/right.png'|domain" mode=""></image>
				</view>
				
			</view>
		</view>
		<view @click="logoutFunc" class="btn">{{$t('1414x3')}}</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import {
		confirm
	} from '../../common'
	import {
		ls
	} from '../../common/tool'
	import {
		pageMixin
	} from '../../common/mixin'

	import {
		bindUserClientId
	} from '../../common/fetch'

	import T from '@/common/langue/i18n'
	export default {
		mixins: [pageMixin],
		data() {
			return {
				// 多语言
				lang_flag: 0,
				lang_code_list: [],
				choose_lang_idx: 0,
				choose_lang: 'zh-cn'
			}
		},
		onShow() {
			this.initDataFn()
		},
		methods: {
			chooseLang(e) {
				const idx = e.detail.value
				this.choose_lang_idx = idx
				this.langSet(this.lang_code_list[idx].lang_code, 1)
			},
			langSet(lang_code, user_choose) {
				const choose_lang = ls.get('language') ? ls.get('language') : ''
				ls.set('language', lang_code)
				// 记录用户已选择，下次进来直接使用选择的语言，不需再变为默认语言
				ls.set('user_choose_lang', user_choose)
				// 重启项目
				lang_code != choose_lang && uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			async initDataFn() {
				const initData = await this.getInitData(1)
				// 多语言
				this.lang_flag = initData.lang_flag || 0
				// 判断是否开启多语言
				if (this.lang_flag == 0) {
					this.langSet('zh-cn', 0)
				} else {
					this.lang_code_list = initData.lang_code_list || []
					// 查询用户是否选择过语言
					const user_choose_lang = ls.get('user_choose_lang') ? ls.get('user_choose_lang') : 0
					const default_lang = initData.default_lang || 'zh-cn'
					this.choose_lang = ls.get('language') ? ls.get('language') : ''
					// 用户未选择语言，使用默认语言
					if (user_choose_lang != 1) {
						this.choose_lang = default_lang
						// 没有选择算不算已选择，这个得确认需求？？？？
						// this.langSet(default_lang, 1)
						this.langSet(default_lang, 0)
					}
					for (const idx in this.lang_code_list) {
						if (this.lang_code_list[idx].lang_code == this.choose_lang) {
							this.choose_lang_idx = idx
						}
					}
				}
			},
			goOrder() {
				uni.navigateTo({
					url: '/pagesA/procurement/purchaseRecords'
				})
			},
			goOrderCheck() {
				uni.navigateTo({
					url: '/pagesA/order/checkChannel'
				})
			},
			goRotate() {
				uni.navigateTo({
					url: '/pagesA/marketing/rotate?activity_id=19'
				})
			},

			// 修改信息
			update(type) {
				// type 0 表示修改登录，1，修改支付
				uni.navigateTo({
					url: '/pagesA/person/updateUserPsw?type=' + type + (type == 1 ? '&is_back=1' : '')
				})
			},
			logoutFunc() {
				confirm({
					title: T._('1414d0'),
					content: T._('1414d1')
				}).then(res => {
					bindUserClientId({
						action: 'clear'
					}, {
						errtip: false
					}).then(() => {}).catch(() => {})

					const users_id = ls.get('users_id')
					ls.clear()

					ls.set('users_id', users_id)

					// #ifdef H5
					sessionStorage.removeItem('is_send_usrlog')
					// #endif

					this.setUserInfo({})
					this.setStoresId(null)
					uni.switchTab({
						url: '/pages/index/index'
					})
				}).catch(() => {

				})
			},
			...mapActions(['setUserInfo', 'setStoresId'])
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		height: 90rpx;
		display: flex;
		align-items: center;
	
		.left {
			width: 36rpx;
			height: 36rpx;
			margin-left: 7rpx;
		}
	
		.right {
			width: 17rpx;
			height: 26rpx;
			margin-left: auto;
			margin-right: 4rpx;
		}
	
		.pintuan {
			margin-left: 13rpx;
			font-size: 28rpx;
			color: #333333;
		}
	}
	.myall {
		background-color: #FFFFFF !important;
		min-height: 100vh;
	}

	.wrap {
		padding: 25rpx 22rpx 0;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 35rpx 0;
		font-size: 30rpx;
		color: #333;
		border-bottom: 1px solid #E3E3E3;

		image {
			width: 15rpx;
			height: 23rpx;
		}
	}

	.btn {
		width: 100%;
		height: 86rpx;
		line-height: 86rpx;
		background: #F43131;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		position: fixed;
		bottom: 0;
	}
</style>
