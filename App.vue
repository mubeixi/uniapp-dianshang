<script>
import T from '@/common/langue/i18n'
import { getSystemConf } from './common/fetch'
import { ls } from './common/tool'
import { isDev, APP_USERS_ID, isCustom } from './common/env'
import { checkIsLogin, modal } from './common'
// #ifndef H5
import { upUserLog } from './common/fetch'
// #endif
import eventHub from '@/common/eventHub'
import IM from '@/common/Im/Im'
import store from '@/store'
// #ifdef APP-PLUS
import Push from './common/push'
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
    console.log('H5 onLaunch H5 onLaunch H5 onLaunch')
    if (ls.get('user_id')) {
      upUserLog({}, { errtip: false }).then(res => {
      }).catch(() => {
      })
    }
    // #endif
	
	ls.set('showWxChatSwitch','1')

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

    // #ifdef H5
    if (options.query && options.query.users_id) {
      ls.set('users_id', options.query.users_id)
    }
    // #endif

    getSystemConf().then(res => {
      ls.set('initData', res.data)
    }).catch(error => {
      modal(error.msg || '应用初始化失败')
    })
  },
  async onShow () {
    // 初始化信息
    const userInfo = store.getters.userInfo

    // IM
    if (userInfo && userInfo.User_ID && !eventHub.imInstance) {
      // IM全局
      const imInstance = new IM()
      // 设置本地用户信息
      imInstance.setSendInfo({ type: 'user', id: userInfo.User_ID, name: userInfo.User_NickName, avatar: userInfo.User_HeadImg })
      imInstance.start().then(() => {
        imInstance.openListen()
        eventHub.imInstance = imInstance // 全局用一个句柄
      }).catch((e) => { console.log(e) })
    }

	  const tabbarArr = ['home', 'class', 'shopping', 'mine']
	  tabbarArr.forEach(function (item, index) {
	  	  uni.setTabBarItem({
	  	  	  index: index,
	  	  	  text: T._(item),
	  		  fail: function (err) {
	  			  console.log(err)
	  		  }
	  	  })
	  })
  },
  onHide: function () {
    if (eventHub.imInstance) {
      // IM全局
      eventHub.imInstance.close()
    }
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
