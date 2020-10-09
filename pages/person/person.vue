<template>
	<view @click="commonClick" class="person">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" style="background: #f81111;"></view>
		<!-- #endif -->
		<view class="personTop">
			<image :src="'/static/client/person/top.png'|domain" class="bg"></image>
			<view class="left-but-box">
				<image :class="userInfo.User_ID&&show>0?'':'onlyMsg'" :src="'/static/client/fenxiao/msg.png'|domain" @click="goMsg"
				 class="msg"></image>
				<view :class="signin?'isQian':''" @click="signinMethod" class="qiandao" v-if="userInfo.User_ID&&show>0">
					<image :src="'/static/client/person/qiandao.png'|domain" class="imgg"></image>
					<view class="viewl">{{signin?$t('902x0'):$t('902x1')}}</view>
				</view>
			</view>

			<view class="personInfo flex">
				<view @click="goPersonMsg" class="left">
					<image :src="(userInfo.User_HeadImg||'/static/client/default.png')|domain" class="image" style="border-radius: 50%;"></image>
				</view>
				<view :style="{position:!userInfo.User_ID?'relative':'static'}" class="right flex1">
					<view @click="goLogin" class="font14 loginBtn" plain size="mini" v-if="!userInfo.User_ID">{{$t('902x2')}}</view>
					<view @click="goPersonMsg" class="nickName" v-if="userInfo.User_ID">
						{{userInfo.User_NickName||(userInfo.User_No?($t('902x3')+userInfo.User_No):$t('902x4'))}}
						<block v-if="userInfo.User_NickName">({{userInfo.User_No}})</block>
					</view>
					<view @click="goVip" class="cart" v-if="userInfo.User_ID && initData.user_switch">{{userLevelText()}}
						<image :src="'/static/client/person/rightCart.png'|domain" class="image"></image>
					</view>
				</view>
			</view>
			<view class="nav">
				<view @click="goBalance" class="navList first" v-if="initData.charge_switch==1">
					<image :src="'/static/client/person/yue.png'|domain" class="imgr" mode=""></image>
					<view class="viewr">
						{{ $t('902x5') }}
					</view>
				</view>
				<view @click="goIntegral" class="navList second">
					<image :src="'/static/client/person/jifen.png'|domain" class="imgr" mode=""></image>
					<view class="viewr">
						{{ $t('902x6') }}
					</view>
				</view>
				<view @click="goCollection" class="navList three">
					<image :src="'/static/client/person/shoucang.png'|domain" class="imgr" mode=""></image>
					<view class="viewr">
						{{ $t('902x7') }}
					</view>
				</view>
				<view @click="goCoupon" class="navList four">
					<image :src="'/static/client/person/youhuijuan.png'|domain" class="imgr" mode=""></image>
					<view class="viewr">
						{{ $t('902x8') }}
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="orderTop">
				<view class="orderLeft">{{ $t('902x9') }}</view>
				<view @click="goOrder(0)" class="orderRight">
					{{ $t('902x10') }}
					<image :src="'/static/client/person/right.png'|domain" class="image"></image>
				</view>
			</view>
			<view class="orderCenter">
				<view @click="goOrder(1)" class="orderLast">
					<image :src="'/static/client/person/pay.png'|domain" class="zxc"></image>
					<view class="views">
						{{ $t('902x11') }}
					</view>
					<view class="jiaobiao" v-if="orderNum.waitpay>0">{{orderNum.waitpay}}</view>
				</view>
				<view @click="goOrder(2)" class="orderLast">
					<image :src="'/static/client/person/fa.png'|domain" class="zxc"></image>
					<view class="views">
						{{ $t('902x12') }}
					</view>
					<div class="jiaobiao" v-if="orderNum.waitsend>0">{{orderNum.waitsend}}</div>
				</view>
				<view @click="goOrder(3)" class="orderLast">
					<image :src="'/static/client/person/shou.png'|domain" class="zxc"></image>
					<view class="views">
						{{ $t('902x13') }}
					</view>
					<div class="jiaobiao" v-if="orderNum.waitconfirm>0">{{orderNum.waitconfirm}}</div>
				</view>
				<view @click="goOrder(4)" class="orderLast">
					<image :src="'/static/client/person/ping.png'|domain" class="zxc"></image>
					<view class="views">
						{{ $t('902x14') }}
					</view>
					<div class="jiaobiao" v-if="orderNum.waitcomment>0">{{orderNum.waitcomment}}</div>
				</view>
			</view>
		</view>
		<view class="list">

			<div v-for="(item,index) of personInit" :key="index">

				<block v-if="(item&&item.field&&item.field=='store_apply')||(item&&item.field&&item.field=='store')">
					<view @click="goUrl(item.url)" class="setting cell" v-if="!Stores_ID&&item.field=='store_apply'&&!!initData.is_store_apply">
						<image :src="item.img" class="left"></image>
						<view class="pintuan">{{item.name}}</view>
						<image src="/static/right.png" class="right"></image>
					</view>
					<view @click="goUrl(item.url)" class="setting cell" v-else-if="item.field=='store'&&Stores_ID&&!!initData.is_store_apply">
						<image :src="item.img" class="left"></image>
						<view class="pintuan">{{item.name}}</view>
						<image src="/static/right.png" class="right"></image>
					</view>
				</block>
				<block v-else>
					<view @click="goUrl(item.url)" class="group cell">
						<image :src="item.img" class="left"></image>
						<view class="pintuan">
							{{item.name}}
						</view>
						<image :src="'/static/client/person/right.png'|domain" class="right"></image>
					</view>
				</block>

			</div>

			<view @click="goSetting" class="setting cell">
				<image :src="'/static/client/person/she.png'|domain" class="left"></image>
				<view class="pintuan">
					{{ $t('902x15') }}
				</view>
				<image :src="'/static/client/person/right.png'|domain" class="right"></image>
			</view>

			<view class="setting cell" v-if="lang_flag">
				<image :src="'/static/client/person/she.png'|domain" class="left"></image>
				<view class="pintuan">
					{{ $t('902x16') }}
				</view>
				<picker class="lang_choose_box" @change="chooseLang" :value="choose_lang_idx" :range="lang_code_list" range-key="choose_item">
					<view class="lang_choose_show">
						<view class="lang_code">{{lang_code_list[choose_lang_idx].lang_name}}</view>
						<i class="funicon icon-xia"></i>
					</view>
				</picker>
			</view>

		</view>
		<view style="height: 118rpx;"></view>
	</view>
</template>

<script>
	import {
		pageMixin
	} from '../../common/mixin'
	import {
		mapActions,
		mapGetters,
		mapState
	} from 'vuex'
	import {
		get_user_info,
		getFuncModule,
		getOrderNum,
		judgeSignin,
		signin
	} from '../../common/fetch.js'
	// import TabbarComponents from "../../components/TabbarComponents";
	import {
		error
	} from '@/common'
	import {
		ls
	} from '../../common/tool'

	import T from '@/common/langue/i18n'
	export default {
		mixins: [pageMixin],
		components: {},
		data() {
			return {
				// userInfo:{}
				show: 1, // 是否能签到 0不显示签到 1 直接签到   2  跳转签到
				signin: 0, // 0未签到  1 已签到
				isLodnig: false,
				orderNum: '', // 订单状态角标数
				Order_Type: 'shop', // 请求的订单类型
				personInit: [],

				// 多语言
				lang_flag: 0,
				lang_code_list: [],
				choose_lang_idx: 0,
				choose_lang: 'zh-cn'
			}
		},
		computed: {
			...mapGetters(['userInfo', 'initData']),
			...mapState(['Stores_ID'])
		},
		onLoad() {
			this.initPerson()
		},
		methods: {
			...mapActions(['setUserInfo', 'getUserInfo']),
			goUrl(item) {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: item
				})
			},
			initPerson() {
				getFuncModule({
					type: '2'
				}).then(res => {
					this.personInit = res.data
				}).catch(e => {
					error(e.msg || T._('902d0'))
				})
			},
			goDistributor() {
				uni.navigateTo({
					url: '/pages/fenxiao/fenxiao'
				})
			},
			goStore() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/storeCenter'
				})
			},
			goNew() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/procurement/storeSettled'
				})
			},
			userLevelText() {
				if (this.userInfo && this.userInfo.User_Level) {
					return this.userInfo.User_Level.level_name
				}
				return T._('902d1')
			},
			goIntegral() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/integralCenter'
				})
			},
			goBalance() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/balanceCenter'
				})
			},
			// 获取角标
			getOrderNum() {
				if (!this.$fun.checkIsLogin()) {
					this.orderNum = []
					return
				}
				getOrderNum({
					Order_Type: this.Order_Type
				}).then(res => {
					this.orderNum = res.data
				}).catch(e => {})
			},
			goVip() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/vipGrade'
				})
			},
			goCoupon() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/coupon'
				})
			},
			goRefundList() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/refundList'
				})
			},
			goMsg() {
				uni.navigateTo({
					url: '/pagesA/systemMsg/systemMsg'
				})
			},
			// 签到
			signinMethod() {
				if (!this.$fun.checkIsLogin(1)) return
				if (this.isLodnig) return
				this.isLodnig = true
				if (this.signin === 1 && this.show !== 2) {
					uni.showToast({
						title: '今日已签到',
						icon: 'none'
					})
					this.isLodnig = false
					return
				}
				if (this.show === 1) {
					signin().then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						this.signin = 1
						this.isLodnig = false
					}).catch(e => {})
				} else if (this.show === 2) {
					this.isLodnig = false
					uni.navigateTo({
						url: '/pagesA/person/qiandao'
					})
				}
			},
			// 获取签到状态
			judgeSignin() {
				judgeSignin({}, {
					errtip: false
				}).then(res => {
					this.show = res.data.show
					this.signin = res.data.signin
				}).catch(e => {})
			},

			goLogin() {
				this.$fun.checkIsLogin(1)
			},
			goPintuanOrderlist() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pages/order/pintuanOrderlist'
				})
			},
			// 去赠品中心
			goGift() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/myGift'
				})
			},
			goSetting() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/editAccount'
				})
			},
			// 去任务中心
			goRenwu() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/taskCenter'
				})
			},
			// 去收藏页
			goCollection() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/collection'
				})
			},
			goToOrder(item) {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pages/order/order?Order_Type=' + item
				})
			},
			// 去订单页
			goOrder(item) {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pages/order/order?index=' + item
				})
			},
			// 去地址管理
			gotoAddresslist() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pages/addressList/addressList'
				})
			},
			// 去个人信息页
			goPersonMsg() {
				if (!this.$fun.checkIsLogin(1)) return
				uni.navigateTo({
					url: '/pagesA/person/personalMsg'
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
			}
		},
		onShow() {
			if (JSON.stringify(this.userInfo) !== '{}') {
				get_user_info({}, {
					tip: '',
					errtip: false
				}).then(res => {
					this.setUserInfo(res.data)
				}).catch(e => {})
			}
			this.getOrderNum()
			if (this.$fun.checkIsLogin()) {
				this.judgeSignin()
			}
			this.initDataFn()
		},
		async onPullDownRefresh() {
			if (JSON.stringify(this.userInfo) !== '{}') {
				await get_user_info({}, {
					tip: '',
					errtip: false
				}).then(res => {
					this.setUserInfo(res.data)
				}).catch(e => {})

				await getOrderNum({
					Order_Type: this.Order_Type
				}).then(res => {
					this.orderNum = res.data
				}).catch(e => {})

				await judgeSignin({}, {
					errtip: false
				}).then(res => {
					this.show = res.data.show
					this.signin = res.data.signin
				}).catch(e => {})
			}
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="scss" scoped>
	.person {
		background-color: rgb(241, 241, 241);

		.personTop {
			width: 750rpx;
			height: 373rpx;
			position: relative;

			.bg {
				width: 100%;
				height: 100%;
			}
			.left-but-box{
				position: absolute;
				top: 22rpx;
				right: 20rpx;
				display: flex;
				align-items: center;
			}
			.qiandao {
				height: 45rpx;
				background: rgb(249, 142, 142);
				box-shadow: 0px 1rpx 6rpx 0px rgba(167, 53, 50, 1);
				//opacity:0.45;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				padding: 11rpx 20rpx;
				justify-content: space-between;
				box-sizing: border-box;
				margin-left: 20rpx;
				.imgg {
					width: 22rpx;
					height: 22rpx;
				}

				.viewl {
					color: #FFFFFF;
					font-size: 24rpx;
					font-weight: 500;
					white-space: nowrap;
					margin-left: 10rpx;
				}
			}

			.personInfo {
				position: absolute;
				left: 57rpx;
				right: 57rpx;
				top: 80rpx;
				height: 100rpx;
				display: flex;

				.left {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;

					.image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					margin-left: 19rpx;
					padding-top: 10rpx;

					.loginBtn {
						padding: 4px 10px;
						color: white;
						border: 1px solid #e7e7e7;
						border-radius: 4px;
						position: absolute;
						left: 10px;
						top: 50%;
						transform: translateY(-50%);
					}

					.nickName {
						font-size: 30rpx;
						height: 30rpx;
						line-height: 30rpx;
						//overflow: hidden;
						color: #FFFFFF;
						font-weight: bold;
						width: 500rpx;
						white-space: nowrap;
						overflow-x: scroll;
						visibility: middle;
						overflow-y: hidden;
					}

					.nickName::-webkit-scrollbar {
						display: none;
					}

					.cart {
						margin-top: 19rpx;
						font-size: 22rpx;
						color: #FFFFFF;
						//width:136rpx;
						height: 42rpx;
						line-height: 42rpx;
						display: inline-block; //flex;
						align-items: center;
						padding-left: 16rpx;
						padding-right: 12rpx;
						background: rgb(249, 142, 142);
						border-radius: 20rpx;
						box-sizing: border-box;

						.image {
							width: 13rpx;
							height: 20rpx;
							margin-left: 9rpx;
						}
					}
				}
			}

			.nav {
				width: 711rpx;
				height: 240rpx;
				background-color: #FFFFFF;
				position: absolute;
				top: 233rpx;
				left: 19rpx;
				box-shadow: 0px 5rpx 12rpx 1rpx rgba(222, 71, 66, 0.41);
				border-radius: 20rpx;
				padding-top: 67rpx;
				padding-bottom: 57rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.navList {
					width: 176rpx;
					height: 100%;
					text-align: center;
					position: relative;

					.viewr {
						font-size: 28rpx;
						color: #333333;
						font-weight: 500;
						position: absolute;
						bottom: 10rpx;
						left: 0rpx;
						width: 176rpx;
					}
				}

				.first {
					.imgr {
						width: 53rpx;
						height: 60rpx;
					}
				}

				.second {
					.imgr {
						width: 58rpx;
						height: 58rpx;
					}
				}

				.three {
					.imgr {
						width: 56rpx;
						height: 54rpx;
					}
				}

				.four {
					.imgr {
						width: 65rpx;
						height: 46rpx;
					}
				}
			}
		}

		.order {
			margin: 140rpx 20rpx 25rpx 20rpx;
			width: 710rpx;
			height: 268rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;

			.orderTop {
				width: 710rpx;
				box-sizing: border-box;
				height: 70rpx;
				padding: 0 20rpx;
				line-height: 70rpx;
				border-bottom: 1px solid #ECE8E8;
				display: flex;
				justify-content: space-between;

				.orderLeft {
					font-size: 28rpx;
					font-weight: bold;
				}

				.orderRight {
					font-size: 26rpx;
					color: #666666;
					display: flex;
					align-items: center;

					.image {
						width: 17rpx;
						height: 26rpx;
						margin-left: 12rpx;
					}
				}
			}

			.orderCenter {
				height: 198rpx;
				padding-top: 42rpx;
				padding-bottom: 49rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.orderLast {
					width: 177.5rpx;
					height: 107rpx;
					text-align: center;
					position: relative;

					.zxc {
						width: 65rpx;
						height: 65rpx;
					}

					.views {
						font-size: 26rpx;
						color: #333333;
					}
				}
			}
		}

		.list {
			width: 710rpx;
			//height: 533rpx;
			margin: 0 auto;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding-left: 22rpx;
			padding-right: 18rpx;
			box-sizing: border-box;

			.line {
				height: 1px;
				background: rgba(236, 232, 232, 1);
			}

			.cell {
				border-bottom: 1px solid $wzw-border-color;

				&:last-child {
					border-bottom: none;
				}
			}

			.group {
				height: 94rpx;
				display: flex;
				align-items: center;

				.left {
					width: 33rpx;
					height: 31rpx;
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

			.bargain {
				height: 86rpx;
				display: flex;
				align-items: center;

				.left {
					width: 32rpx;
					height: 34rpx;
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

		}
	}

	.msg {
		width: 45rpx;
		height: 45rpx;
	}

	.onlyMsg {
		right: 25rpx;
	}

	.isQian {
		padding-left: 12rpx !important;
		padding-right: 12rpx !important;
	}

	.jiaobiao {
		position: absolute;
		top: -6rpx;
		right: 40rpx;
		width: 24rpx;
		height: 24rpx;
		padding: 4rpx;
		border-radius: 50%;
		background-color: #f43131;
		border: 1px solid #F43131;
		font-size: 24rpx !important;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff !important;
	}

	.lang_choose_box {
		flex: 1;

		.lang_choose_show {
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.lang_code {
				margin-right: 10rpx;
			}
		}
	}
</style>
