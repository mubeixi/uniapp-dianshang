<script>

import { ls } from './common/tool'
// #ifndef H5
import { getSystemConf, upUserLog } from './common/fetch'
import { APP_USERS_ID, isCustom, isDev } from './common/env'
// #ifdef APP-PLUS
import Push from './common/push'
import { checkIsLogin, modal } from './common'
// #endif
// #endif

export default {
  globalData: {
    videoInstance: []
  },
  // 目前只有app和小程序用到了应用的全局onLaunch，h5环境下这里不执行的
  onLaunch: function (options) {
    // #ifdef MP
    let owner_id = null
    owner_id = options.owner_id
    if (owner_id >= 0) {
      ls.set('owner_id', owner_id)
    }
    // #endif

    // #ifndef H5
    if (checkIsLogin()) {
      upUserLog({}, { errtip: false }).then(res => {
      }).catch(() => {
      })
    }
    // #endif

    // 小程序需要拿这个，都拿一下覆盖吧
    // #ifdef MP-WEIXIN
    let users_id = ''
    if (isCustom) {
      users_id = APP_USERS_ID
    } else {
      const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
      users_id = extConfig.users_id
    }
    if (!users_id) modal('初始化应用失败:users_id')
    // 切换的时候清空资料
    if (ls.get('users_id') && users_id !== ls.get('users_id')) {
      ls.set('userInfo', {}, 1)
    }
    ls.set('users_id', users_id)
    // #endif

    // 头条的需要写入一下
    // #ifdef MP-TOUTIAO || APP-PLUS
    ls.set('users_id', APP_USERS_ID)
    // #endif

    // #ifdef APP-PLUS
    // 获取客户端标识信息绑定设备
    var info = plus.push.getClientInfo()
    let interval = null
    if (info) {
      if (info.clientid) {
        ls.set('user_client_id', info.clientid)
      } else {
        interval = setInterval(function () {
          info = plus.push.getClientInfo()
          if (info.clientid) {
            ls.set('user_client_id', info.clientid)
            clearInterval(interval)
          }
        }, 50)
      }
      // 监听
      Push.pushListener()
    }
    Push.cancelPushClear()
    // #endif

    // 每次加载都清空全站配置
    ls.remove('initData')
    getSystemConf().then(res => {
      ls.set('initData', res.data)
    }).catch(error => {
      modal(error.msg || '应用初始化失败')
    })
  },
  onShow: function () {
  },
  onHide: function () {
  },
  // 后期可以接自定义的错误上报
  onError: function (err) {
    const msg = err ? JSON.stringify(err) : '程序错误'
    // 检查完了再放出来
    if (isDev && msg && msg !== '{}') {
      uni.showModal({
        title: '错误',
        content: msg
      })
    }
  }
}
</script>

<style lang="less">
  /* #ifndef APP-NVUE */
  @import "assets/css/app.less";
  @import "assets/css/icon.less";
  @import "./components/gaoyia-parse/parse.css";
  /* #endif */
</style>
<style lang="scss">
  /* #ifndef APP-NVUE */
 @import "assets/css/base.scss";
  /* #endif */
</style>
