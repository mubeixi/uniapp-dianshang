import { ls } from '../common/tool'

export const SET_PAY_TEMP_OBJ = function (state, value) {
  state.payTempObj = value
}

export const SET_STORES_ID = function (state, value) {
  state.Stores_ID = value
  ls.set('Stores_ID', value, 1)
}

export const SET_FRE_STORE_ID = function (state, value) {
  state.current_store_id = value
  // #ifndef H5
  ls.set('current_store_id', value, 1)
  // #endif

  // #ifdef H5
  sessionStorage.setItem('current_store_id', value)
  // #endif
}

export const SET_USER_INFO = function (state, value) {
  state.userInfo = value

  if (value && value.bind_stores && value.bind_stores.Stores_ID) {
    state.Stores_ID = value.bind_stores.Stores_ID
    ls.set('Stores_ID', state.Stores_ID)
  } else {
    ls.remove('Stores_ID')
  }

  // 跟着清空access_token
  if (!value.hasOwnProperty('User_ID') || !value.User_ID) {
    ls.remove('user_id')
    ls.remove('access_token')
  } else {
    ls.set('user_id', value.User_ID)
  }

  if (!value || JSON.stringify(value) === '{}') {
    ls.remove('userInfo')
  } else {
    ls.set('userInfo', value)
  }
}

export const SET_INIT_DATA = function (state, value) {
  state.initData = value
  ls.set('initData', value, 1)

  // app分享小程序的时候有用到
  if (value && value.login_methods) {
    const login_methods = value.login_methods
    for (var i in login_methods) {
      if (i !== 'component_appid' && login_methods[i].type === 'wx_lp' && login_methods[i].authorizer_user_name) {
        ls.set('WX_MINI_ORIGIN_ID', login_methods[i].authorizer_user_name)
      }
    }
  }
}

export const SET_TABBAR = function (state, value) {
  state.tabbar = value
  ls.set('tabbar', value, 1)
}
