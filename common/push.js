import T from '@/common/langue/i18n' 
// #ifdef APP-PLUS
import { fun } from './index'
import { isDev } from './env'

class Push {
  static pushListener () {
    var _this = this
    plus.push.addEventListener('click', function (msg) {
      switch (msg.payload) {
        case 'LocalMSG':
          // toast('点击本地创建消息启动：')
          break
        default:
          // toast('点击离线推送消息启动：')
          break
      }
      if (msg.payload) {
        _this.handle(msg)
      }
    }, false)
    plus.push.addEventListener('receive', function (msg) {
      if (msg.aps) {
        // Apple APNS message

        return
      } else {

      }

      if (isDev) {
        uni.showModal({
          title: '收到推送',
          content: 'receive event ' + JSON.stringify(msg)
        })
      }

      if (plus.os.name === 'iOS') {
        // 如果是自己模拟的消息，没有这个,因为local是自己加的参数
        if (msg.payload && typeof msg.payload !== 'string') {
          _this.notificationMessage(msg)
        }
      } else {
        _this.notificationMessage(msg)
      }
    }, false)
  }

  static cancelPushClear () {
    plus.push.clear()
  }

  static handle (msg) {
    var _this = this

    // 清除ios推送小红点
    _this.cancelPushClear()

    const payloadStr = msg.payload; let payload = null
    if (!payloadStr) {
      return
    }
    payload = JSON.parse(payloadStr)

    // {
    //     "action": "redirect",
    //     "channel": "moneychange",
    //     "content": "转出余额1",
    //     "ext": {
    //     "path": "pages/person/balanceCenter?users_id=wkbq6nc2kc"
    // },
    //     "time": 1573111452,
    //     "title": "余额变动",
    //     "user_id": 48,
    //     "local": 1
    // }

    switch (payload.action) {
      case 'redirect':
        var path = payload.ext.path
        if (path[0] !== '/') {
          path = '/' + path
        }
        // 用这个就不怕是switchTab了
        fun.linkTo({
          link: path,
          linkType: 'pushAction'
        })
        break
    }
  }

  static notificationMessage (msg) {
    var content = msg.payload.content ? msg.payload.content : '收到消息'// 你要展示的提示

    var _this = this
    var jsonData = ''
    switch (plus.os.name) {
      case 'Android':
        // eslint-disable-next-line no-eval
        jsonData = eval('(' + msg.payload + ')')
        break
      case 'iOS':
        jsonData = msg.payload
        break
    }
    _this.createLocalPushMsg(content, jsonData)
  }

  /**
   *  处理透传消息
   * @param {Object} msg
   * @param {Object} content
   */
  static createLocalPushMsg (content, jsonData) {
    // 创建一个符合你自己要显示推送通知
    this.createMessage(content, jsonData)
  }

  /**
   *  创建本地推送消息
   * @param {Object} str
   * @param {Object} jsonData
   * @param {Object} options
   */
  static createMessage (str, jsonData) {
    var options = { cover: false }

    let _jsonData = null
    switch (plus.os.name) {
      case 'Android':
        _jsonData = jsonData
        break
      case 'iOS':
        // 、、.eid
        _jsonData = jsonData
        break
    }

    _jsonData.local = 1// 本地模拟的

    plus.push.createMessage(str, JSON.stringify(_jsonData), options)
  }
}

export default Push
/**
 * 透传消息handle
 * @param type
 * @param info
 */
export const pushHandle = ({
  type = 'receive', info = {
    __UUID__: '',
    title: '',
    content: '',
    payload: ''
  }
}) => {
  const { title, payload } = info

  if (!payload) return

  uni.showModal({
    title: title,
    content: JSON.stringify(payload)
  })
}
// #endif
