// 重写navigateTo
import { GetQueryByString, isIos, isWeiXin, ls } from './tool'

const navigateTOCopy = uni.navigateTo
const redirectToCopy = uni.redirectTo
const switchTabCopy = uni.switchTab

uni.navigateTo = (opt) => {
  let { url } = opt
  if (url.indexOf('users_id') === -1) {
    let users_id = null; let owner_id = null

    // #ifdef H5
    users_id = GetQueryByString(url, 'users_id')
    // #endif

    // 如果连接里面已经有了，就不需要搞事
    if (!users_id) {
      users_id = ls.get('users_id')

      if (users_id) {
        if (url.indexOf('?') === -1) {
          url += '?users_id=' + users_id
        } else {
          url = url.replace(/\?/, '?users_id=' + users_id + '&')
        }
      }
    }

    if (!owner_id) {
      owner_id = ls.get('owner_id')

      if (owner_id) {
        if (url.indexOf('?') === -1) {
          url += '?owner_id=' + owner_id
        } else {
          url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
        }
      }
    }
  }

  const endOpt = {
    ...opt,
    url
  }

  // 去订单详情页的，精准hack....
  // #ifdef H5
  if (isWeiXin() && isIos() && url.indexOf('/pages/order/check?') !== -1) {
    location.href = '/fre' + url// 这样很危险，因为需要约定其他地方跳转到check页面都只能写url，不能用query和parmas
    return
  }
  // #endif

  navigateTOCopy({
    ...endOpt,
    fail: function () {
      console.log('navigate错误，改用switchTab')
      switchTabCopy(endOpt)
    }
  })
}

uni.redirectTo = (opt) => {
  let { url } = opt
  if (url.indexOf('users_id') === -1) {
    let users_id = null; let owner_id = null

    // #ifdef H5
    users_id = GetQueryByString(url, 'users_id')
    // #endif

    // 如果连接里面已经有了，就不需要搞事
    if (!users_id) {
      users_id = ls.get('users_id')

      if (users_id) {
        if (url.indexOf('?') === -1) {
          url += '?users_id=' + users_id
        } else {
          url = url.replace(/\?/, '?users_id=' + users_id + '&')
        }
      }
    }

    if (!owner_id) {
      owner_id = ls.get('owner_id')

      if (owner_id) {
        if (url.indexOf('?') === -1) {
          url += '?owner_id=' + owner_id
        } else {
          url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
        }
      }
    }
  }

  const endOpt = {
    ...opt,
    url
  }
  redirectToCopy(endOpt)
}

uni.switchTab = (opt) => {
  let { url } = opt
  if (url.indexOf('users_id') === -1) {
    let users_id = null; let owner_id = null

    // #ifdef H5
    users_id = GetQueryByString(url, 'users_id')
    owner_id = GetQueryByString(url, 'owner_id')
    // #endif

    // 如果连接里面已经有了，就不需要搞事
    if (!users_id) {
      users_id = ls.get('users_id')

      if (users_id) {
        if (url.indexOf('?') === -1) {
          url += '?users_id=' + users_id
        } else {
          url = url.replace(/\?/, '?users_id=' + users_id + '&')
        }
      }
    }

    if (!owner_id) {
      owner_id = ls.get('owner_id')

      if (owner_id) {
        if (url.indexOf('?') === -1) {
          url += '?owner_id=' + owner_id
        } else {
          url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
        }
      }
    }
  }

  const endOpt = {
    ...opt,
    url
  }

  console.log(endOpt)
  switchTabCopy({
    ...endOpt,
    fail: function () {
      console.log('switchTab错误，改用navigate')
      navigateTOCopy(endOpt)
    }
  })
}
