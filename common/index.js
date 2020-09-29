import T from '@/common/langue/i18n'
import Vue from 'vue'
import filter, {
	domainFn
} from './filter.js'
import store from '../store'
import {
	ls
} from './tool'
// #ifdef H5
import wx from 'weixin-js-sdk'
// #endif



// 重写uni部分
require('./uni')

export const toast = (title, icon, image, duration) => {
	uni.showToast({
		title,
		duration: duration || 2000,
		icon,
		image
	})
}

export const modal = function() {
	const opt = {
		title: T._(3),
		content: ''
	}
	if (typeof arguments[0] === 'string') {
		opt.content = arguments[0]
	} else if (typeof arguments[0] === 'object') {
		Object.assign(opt, arguments[0])
	}
	uni.showModal(opt)
}

export const showLoading = (title = 'loading', mask = true) => {
	uni.showLoading({
		title,
		mask
	})
}
export const hideLoading = () => {
	uni.hideLoading()
}

/**
 * 根据长度会自动切换模式，优先保障显示所有文字
 * @param title
 * @param icon
 * @param duration
 */
export const error = (title, icon, duration) => {
	if (!title) return
	if (title.length > 6) {
		// 显示所有的问题
		toast(title, 'none', '', duration)
	} else {
		toast(title, 'none', '/static/icon_http_error.png', duration)
	}
}

export const tip = (title, icon, duration) => toast(title, 'none', '/static/icon_http_error.png', duration)

export const confirm = (options) => {
	return new Promise(function(resolve, reject) {
		uni.showModal({
			...options,
			success: function(res) {
				if (res.confirm) {
					resolve(res)
				} else if (res.cancel) {
					reject(res)
				}
			},
			fail: function(res) {
				reject(res)
			}
		})
	})
}

/**
 * 检测是否登录
 * @param redirect
 * @return {boolean}
 */
export const checkIsLogin = (redirect, tip) => {
	const userInfo = store.state.userInfo || ls.get('userInfo')

	if (!userInfo || JSON.stringify(userInfo) === '{}') {
		// 重置用户信息
		store.commit('SET_USER_INFO', {})

		if (redirect) {
			if (!tip) {
				// #ifdef H5
				ls.set('login_farward_url', location.href)
				// return;
				// #endif

				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			confirm({
				title: T._(4),
				content: T._(5),
				confirmText: T._(6),
				cancelText: T._(7)
			}).then(() => {
				// #ifdef H5
				ls.set('login_farward_url', location.href)
				// #endif

				uni.navigateTo({
					url: '/pages/login/login'
				})
			}).catch(() => {

			})
		}
		return false
	}

	return true
}

/**
 * 检测是否是分销商
 * @param redirect
 * @return {boolean}
 */
export const checkIsDistribute = (redirect, tip) => {
	// 需要先确认是否已经登录了。。。。。

	const userInfo = store.state.userInfo || ls.get('userInfo')

	if (userInfo.Is_Distribute !== 1) {
		if (redirect) {
			if (!tip) {
				uni.navigateTo({
					url: '/pages/fenxiao/distributorLevel'
				})
				return
			}

			const commi_rename = store.getters.commi_rename
			const commi = commi_rename.commi
			let content = '';
			if (T.isPre('zh-cn')) {
				content = `该操作需要是${commi},请问是否成为${commi}?`
			}
			if (T.isPre('en-us')) {
				content = `This operation needs to be a ${commi}, does it become a ${commi}?`
			}

			confirm({
				title: T._(8),
				content: content,
				confirmText: T._(9),
				cancelText: T._(10)
			}).then(() => {
				uni.navigateTo({
					url: '/pages/fenxiao/distributorLevel'
				})
			}).catch(() => {

			})
		}
		return false
	}

	return true
}

/**
 * 根据拼团跳转不同的页面
 * @param id
 * @param is_group
 */
export const goProductDetail = (id, is_group) => {
	if (!id) return

	// let path = '/pages/detail/detail';
	const path = is_group ? '/pages/detail/groupDetail' : '/pages/detail/detail' // 根据不同路径跳转
	uni.navigateTo({
		url: path + '?Products_ID=' + id
	})
}

const tabbarRouter = ['/pages/index/index', '/pages/classify/classify', '/pages/detail/groupSuccess',
	'/pages/order/cart', '/pages/person/person', '/pages/fenxiao/fenxiao'
]
const isHasTabbarRouter = (link) => {
	for (var item of tabbarRouter) {
		// 反的了。。
		if (item.indexOf(link) !== -1 || link.indexOf(item) !== -1) {
			return true
		}
	}
	return false
}

export const linkTo = (linkObj) => {
	let {
		link,
		linkType,
		ext = {}
	} = linkObj
	if (!link) {
		// error('跳转地址为空')
		return
	}

	// 跳转到小程序
	if (linkType === 'mini') {
		const {
			url,
			appid,
			origin_id
		} = ext

		// #ifdef APP-PLUS
		if (!origin_id) {
			error('origin_id_缺失')
			return
		}
		plus.share.getServices(function(s) {
			var shares = null
			var sweixin = null

			shares = {}
			for (var i in s) {
				var t = s[i]
				shares[t.id] = t
			}
			sweixin = shares.weixin

			sweixin ? sweixin.launchMiniProgram({
				id: origin_id,
				path: link,
				webUrl: ext.url
			}) : toast(T._(11))
		}, function(e) {
			if (ext.url) {

			}
		})

		// #endif

		// #ifdef MP
		if (appid && link) {
			uni.navigateToMiniProgram({
				appId: appid,
				path: link,
				success(res) {
					console.log(res)
					// 打开成功
				},
				fail(err) {
					const {
						errMsg = T._(12)
					} = err
					uni.showModal({
						title: '跳转小程序错误',
						content: errMsg
					})
					console.log(err)
				}
			})
		} else {
			error('小程序跳转参数错误')
		}

		// #endif

		// #ifdef H5
		if (url) {
			location.href = ext.url
		} else {
			error('小程序备用地址为空')
		}
		// #endif

		return
	}

	// 第三方链接
	if (linkType === 'third' || link.indexOf('http') !== -1) {
		// #ifndef H5

		uni.navigateTo({
			url: '/pages/common/webview?encode=1&url=' + encodeURIComponent(link)
		})
		// #endif

		// #ifdef H5
		location.href = link
		// #endif

		return
	}

	// 系统内页面
	if (link[0] !== '/') {
		link = '/' + link
	}
	// 除了这些页面之外，其他都走普通跳转
	if (isHasTabbarRouter(link)) {
		uni.switchTab({
			url: link
		})
	} else {
		uni.navigateTo({
			url: link
		})
	}
}

/**
 * 打开客服
 */

export const contact = () => {
	const initData = store.state.initData || ls.get('initData')
	if (initData.kf_url) {
		linkTo({
			linkType: 'third',
			link: initData.kf_url
		})
	} else {
		error(T._(13))
	}
}

export const fun = {
	domainFn,
	confirm,
	checkIsLogin,
	goProductDetail,
	checkIsDistribute,
	linkTo,
	contact,
	back: () => {
		uni.navigateBack()
	}
}

// #ifdef H5
Vue.prototype.$wx = wx
// #endif
Vue.prototype.$toast = toast
Vue.prototype.$error = error

Vue.prototype.$fun = fun
filter.map((value) => {
	Vue.filter(value.name, value.methods)
})

// #ifdef H5
// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
//
// fundebug.init({
//     apikey: "61884c104ad275ca895d62af695b5f1aaef3f4f382fd392627e239b7e24a6583"
// })
// fundebugVue(fundebug, Vue);
// require('fundebug-revideo');
//
// window.FUNDEBUG = fundebug

// window.onerror = handleErr
//
// var txt = ''
//
// function handleErr (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
//   txt = 'There was an error on this page.\n\n'
//   txt += 'Error: ' + errorMessage + '\n'
//   txt += 'URL: ' + scriptURI + '\n'
//   txt += '行: ' + lineNumber + '\n\n'
//   txt += '列: ' + columnNumber + '\n\n'
//   txt += '错误详情: ' + JSON.stringify(errorObj) + '\n\n'
//   txt += 'Click OK to continue.\n\n'
//
//   if ('fundebug' in window) {
//     fundebug.notify('handleErr', txt)
//   }
//   alert(txt)
//   return true
// }

// #endif
