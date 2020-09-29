import T from '@/common/langue/i18n' 
import { getSystemConf } from '../common/fetch'
import { ls } from '../common/tool'
import { confirm, fun } from '../common'

export const setUserInfo = ({ commit }, data) => {
  commit('SET_USER_INFO', data)
}

export const setStoresId = ({ commit }, data) => {
  commit('SET_STORES_ID', data)
}

export const setFreStoreId = ({ commit }, data) => {
  commit('SET_FRE_STORE_ID', data)
}

export const setInitData = ({ commit }, data) => {
  commit('SET_INIT_DATA', data)
}

function getTabBarConf () {
  let url = '/node/tabbar'
  // #ifndef H5
  url = 'http://localhost:9100/tabbar'
  // #endif

  // #ifdef APP-PLUS ||MP
  var tabbar = [{
    pagePath: 'pages/index/index',
    iconPath: '/static/tabbar/person.png',
    selectedIconPath: '/static/tabbar/person.png',
    text: '首页1'
  },
  {
    pagePath: 'pagesA/person/storeCenter',
    iconPath: 'http://dev.jingjin.site/static/tabbar.jpg',
    selectedIconPath: 'http://dev.jingjin.site/static/tabbar.jpg',
    text: '门店'
  }
  ]

  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: 'http://dev.jingjin.site/static/tabbar.jpg', // 仅为示例，并非真实的资源
      success: (res) => {
        if (res.statusCode === 200) {
          tabbar[1].iconPath = res.tempFilePath
          tabbar[1].selectedIconPath = res.tempFilePath
          resolve({ data: tabbar })
        }
      }
    })
  })

  // #endif

  // #ifndef APP-PLUS
  // eslint-disable-next-line no-unreachable
  return new Promise((resolve, reject) => {
    uni.request({
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      url,
      method: 'post',
      success: (res) => {
        resolve(res.data)
      }

    })
  })
  // #endif
}

/**
 * async相当于返回了一个promise，直接return rt就相当于promise.resolve(rt)
 */
export const getTabBar = async ({ commit, state }, refresh) => {
  let data = null
  if (!refresh) {
    data = state.tabbar
    if (data) return data
    if (!data) {
      const data2 = ls.get('tabbar')
      if (data2) {
        commit('SET_TABBAR', data2)
        return data2
      }
    }
    return {}
  }

  const res = await getTabBarConf()

  commit('SET_TABBAR', res.data)
  data = res.data

  return data
}

export const getInitData = async ({ commit, state }, refresh) => {
  try {
    let data = null
    if (!refresh) {
      data = state.initData
      if (data) return data
      if (!data) {
        const data2 = ls.get('initData')
        if (data2) {
          commit('SET_INIT_DATA', data2)
          return data2
        }
      }
      return {}
    }

    const systemConf = await getSystemConf()
    commit('SET_INIT_DATA', systemConf.data)
    data = systemConf.data
    return data
  } catch (err) {
    const systemConf = await getSystemConf()
    commit('SET_INIT_DATA', systemConf.data)
    return systemConf.data
  }
}

/**
 *类似缓存的穿透机制，一层拿不到就继续往下取
 * async
 **/
export const getUserInfo = async ({ commit, state }, through) => {
  // 第一次是在内存里
  const data = state.userInfo
  if (data) return data

  // 从ls中获取
  if (!data) {
    const data2 = ls.get('userInfo')

    if (data2 && JSON.stringify(data2) !== '{}') {
      commit('SET_USER_INFO', data2)
      return data2
    }
  }

  if (through) {
    // 则本地没有用户信息，提示用户是否需要登录。
    await confirm({ title: T._(1790), content: T._(1791), confirmText: T._(1792), cancelText: T._(1793) }).then(() => {
      // 要替换掉navigateTo，不然登录页面回退就尴尬了
      // 用这个可以记录登陆前页面
      fun.checkIsLogin(1)
    }).catch(() => {

    })
  }

  // return {}
}
