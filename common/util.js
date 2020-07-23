// var md5 = require('tool/md5.js');
// import md5 from './tool/md5.js'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 格式化时间
 */
function format_time (format_str, _mtime) {
  const mtime = _mtime ? new Date(parseInt(_mtime) * 1000) : new Date()

  var timeObject = {
    'M+': mtime.getMonth() + 1, // 月份
    'd+': mtime.getDate(), // 日
    'h+': mtime.getHours(), // 小时
    'm+': mtime.getMinutes() < 10 ? '0' + mtime.getMinutes() : mtime.getMinutes(), // 分
    's+': mtime.getSeconds() < 10 ? '0' + mtime.getSeconds() : mtime.getSeconds(), // 秒
    'q+': Math.floor((mtime.getMonth() + 3) / 3), // 季度
    S: mtime.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format_str)) {
    format_str = format_str.replace(RegExp.$1, (mtime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in timeObject) {
    if (new RegExp('(' + k + ')').test(format_str)) {
      format_str = format_str.replace(RegExp.$1, (RegExp.$1.length === 1) ? (timeObject[k]) : (('00' + timeObject[k]).substr(('' + timeObject[k]).length)))
    }
  }
  return format_str
}

// 产品信息处理
function formatShop (products, front_url = '') {
  for (var i in products) {
    products[i].prodimg = products[i].prodimg.indexOf('http') > -1 ? products[i].prodimg : front_url + products[i].prodimg
    products[i].prodname = products[i].prodname.substring(0, 13)
  }
  return products
}

// 分类回调
function formatCate (lists, front_url) {
  for (var i in lists) {
    lists[i].img = this.format_imgs(lists[i].img, front_url)
  }
  return lists
}

// 帖子列表处理
function formatNote (lists, front_url) {
  for (var i in lists) {
    lists[i].imgcount = lists[i].images ? parseInt(lists[i].images.length) : 0
    lists[i].imgnum = parseInt(lists[i].imgcount - 3)
    // 初始化第三张图片为空
    lists[i].third = {}
    /**
     * 根据图片数量来判断第三张显示样式
     * 大于3张时，第三张特别显示，此时正常显示图片数量为2，
     */
    lists[i].show_count = lists[i].imgcount > 3 ? 2 : lists[i].imgcount
    // 格式化地址，为了防止
    lists[i].address = lists[i].noteaddress.length > 23 ? lists[i].noteaddress.substr(0, 22) + '...' : lists[i].noteaddress

    for (var j in lists[i].images) {
      lists[i].images[j] = this.format_imgs(lists[i].images[j], front_url)
      if (j === 2) {
        lists[i].third = lists[i].images[j]
      }
    }
  }
  return lists
}

// 砍价列表处理
function formatProd (lists, front_url) {
  for (var i in lists) {
    lists[i].prodimg = this.format_imgs(lists[i].prodimg, front_url)
  }
  return lists
}

// 订单列表订单信息处理
function formatComment (lists, front_url) {
  for (var i in lists) {
    // 时间处理
    lists[i].created_at = format_time('M-d h:m', lists[i].created_at)
  }
  return lists
}

// 创建随即字符串
function makeid () {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 30; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

// 生成统一下单签名
// function paysignjsapi(appid, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee, key) {
//   var ret = {
//     appid: appid,
//     body: body,
//     mch_id: mch_id,
//     nonce_str: nonce_str,
//     notify_url: notify_url,
//     openid: openid,
//     out_trade_no: out_trade_no,
//     spbill_create_ip: spbill_create_ip,
//     total_fee: total_fee,
//     trade_type: 'JSAPI'
//   };
//   var str = raw(ret);
//   str = str + '&key=' + key;
//   var md5Str = md5.hexMD5(str).toUpperCase();
//   return md5Str;
// }
//
// function raw (args) {
//   var keys = Object.keys(args)
//   keys = keys.sort()
//   var newArgs = {}
//   keys.forEach(function (key) {
//     newArgs[key.toLowerCase()] = args[key]
//   })
//
//   var str = ''
//   for (var k in newArgs) {
//     str += '&' + k + '=' + newArgs[k]
//   }
//   str = str.substr(1)
//   return str
// }

// 生成微信支付签名
// function paysignjs(appid, nonceStr, wxpayPackage, signType, timeStamp, key) {
//   var ret = {
//     appId: appid,
//     nonceStr: nonceStr,
//     package: wxpayPackage,
//     signType: signType,
//     timeStamp: timeStamp
//   };
//   var str = raw1(ret);
//   str = str + '&key=' + key;
//   return md5.hexMD5(str);
// }

// function raw1 (args) {
//   var keys = Object.keys(args)
//   keys = keys.sort()
//   var newArgs = {}
//   keys.forEach(function (key) {
//     newArgs[key] = args[key]
//   })
//
//   var str = ''
//   for (var k in newArgs) {
//     str += '&' + k + '=' + newArgs[k]
//   }
//   str = str.substr(1)
//   return str
// }

// 验证手机号码
function check_mobile (mobile) {
  if (!(/^1[3-9]\d{9}$/.test(mobile))) {
    return false
  } else {
    return true
  }
}

// 验证金额格式
function check_money (money) {
  if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(String(money)))) {
    return false
  } else {
    return true
  }
}

// 验证人名
function check_name (name) {
  /**
   *  可验证少数民族 /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
   */
  if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,10}$/.test(name))) {
    return false
  } else {
    return true
  }
}

/**
 * 格式化金额
 */
function format_money (money, len = 2) {
  money = parseFloat(money)
  if (!money) {
    return false
  }
  var len_str = '1'
  for (var i = 0; i < len; i++) {
    len_str = len_str + '0'
  }
  var len_num = parseInt(len_str)
  return parseInt(money * len_num) / len_num
}

/**
 * 格式化金额 小数部分补足2位
 * mtype = 0 整体返回，保留两位小数
 * mtype = 1 只返回整数部分
 * mtype = 2 只返回小数部分，保留两位小数
 * 注意小数部分最多两位
 */
function format_money_string (money, mtype = 0) {
  money = Math.round(money * 100) / 100
  var strs = []
  strs = String(money).split('.')
  var length = strs.length
  var str = ''
  if (mtype === 1) {
    str = strs[0]
  } else if (mtype === 2) {
    if (length > 1) {
      switch (strs[1].length) {
        case 1:
          str = strs[1] + '0'
          break
        case 2:
          str = strs[1]
          break
        default:
          str = String(Math.round(strs[1] / 100)).substring(0, 2)
      }
    } else {
      str = '00'
    }
  } else {
    str = strs[0] + '.' + format_money_string(money, 2)
  }
  return str
}

// 输入金额时时验证
function check_money_in (money) {
  if (!(/(^[1-9]([0-9]+)?(\.[0-9]{0,2})?$)|(^(0){1}$)|(^[0-9]\.([0-9]){0,2}?$)/.test(money))) {
    return false
  } else {
    return true
  }
}

// ------------ 收货地址函数 -------------
// 数组转化
export const array_change = function (arr) {
  var array = []
  for (var i in arr) {
    array.push({
      id: i,
      name: arr[i]
    })
  }
  return array
}

// 获取数组下标  用于收货地址选择的显示
export const get_arr_index = function (arr, id) {
	
  for (var i in arr) {
    if (Number(arr[i].id) ===Number(id)) {
      return parseInt(i)
    }
  }
}
// --------------

// 首页图片路径处理
function img_path (front_url, ImgPath) {
  if (ImgPath && ImgPath !== '' && ImgPath.indexOf('http') === -1) { // 判断不为空且不为网络图片
    if (ImgPath.indexOf('/api/') > -1) { // 轮播图为原始数据
      ImgPath = front_url + '/static' + ImgPath
    } else {
      ImgPath = front_url + ImgPath
    }
  }
  return ImgPath
}

// 时间戳转换为日期
function date_format (Timestamp, Spacer, time) {
  const date = new Date(Timestamp)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  Spacer = Spacer || '-'

  if (time && time === 1) {
    const h = date.getHours()
    const min = date.getMinutes()
    const s = date.getSeconds()
    return y + Spacer + m + Spacer + d + ' ' + h + ':' + min + ':' + s
  } else {
    return y + Spacer + m + Spacer + d
  }
}

/**
 * 重新组装图片数组
 */
function format_imgs (img, front_url) {
  if (!img) {
    return ''
  }
  // 判断第一个字符是否.
  var length = img.length
  if (length > 1 && img.substr(0, 1) === '.') {
    img = img.substr(1, length)
  }
  var reg_url = /^((http|https) ?:\/\/)[^\s]+$/
  img = reg_url.test(img) ? img : front_url + img
  return img
}

/**
 * 打开新页面
 */
function openUrl (url, open_type = 'navigate') {
  if (url.length < 1) {
    return false
  }
  switch (open_type) {
    case 'switchTab':
      wx.switchTab({
        url: url
      })
      break
    case 'redirect':
      wx.redirect({
        url: url
      })
      break
    case 'reLaunch':
      wx.redirect({
        url: url
      })
      break
    default:
      wx.navigateTo({
        url: url
      })
      break
  }
}

// 提示框
function alert (content, callback) {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false,
    success: callback
  })
}

/***
 * 获取地址
 */
function get_cache (cachename) {
  return wx.getStorageSync(cachename) ? wx.getStorageSync(cachename) : {}
}

// 写入缓存
function set_cache (cachename, cache) {
  return wx.setStorageSync(cachename, cache)
}

/**
 * 获取距离
 */
function get_distance (_distance) {
  var distance = (parseInt(_distance) / 1000).toFixed(2)
  if (distance < 0.5) {
    distance = '<500m'
  } else if (distance < 1 && distance > 0.5) {
    distance = '<1km'
  } else {
    distance = distance + 'km'
  }
  return distance
}

// 时间格式化输出，如1天天23时时12分分12秒秒12 。每10ms都会调用一次
function dateformat (micro_second) {
  // 总秒数
  var second = parseInt(micro_second)
  // 天数
  var day = Math.floor(second / 3600 / 24)
  // 总小时
  var hr = Math.floor(second / 3600)
  // 小时位
  var hr2 = hr % 24
  // 分钟位
  var min = Math.floor((second - hr * 3600) / 60)
  // 秒位
  var sec = (second - hr * 3600 - min * 60)// equal to => var sec = second % 60;
  return day + '天' + hr2 + ':' + min + ':' + sec
}

// 房间列表处理
function roomListFormat (front_url, roomList) {
  for (var i in roomList) {
    roomList[i].img_path = roomList[i].img_path ? JSON.parse(roomList[i].img_path) : ''
    roomList[i].bed_intro = roomList[i].bed_intro ? JSON.parse(roomList[i].bed_intro) : ''
    roomList[i].bed_json = roomList[i].bed_json ? JSON.parse(roomList[i].bed_json) : ''
    // 图片处理
    for (var j in roomList[i].img_path) {
      roomList[i].img_path[j] = roomList[i].img_path[j].indexOf() > -1 ? roomList[i].img_path[j] : front_url + roomList[i].img_path[j]
    }
  }
  return roomList
}

// 房间图片获取失败处理
function roomListImgError (roomList, room_id) {
  for (var i in roomList) {
    if (roomList[i].id === room_id) {
      roomList[i].img_path[0] = '/images/no_pic.png'
    }
  }
  return roomList
}

/**
 * 发送推送码
 */
function addMessageCode (info) {
  // 获取推送码
  if (!info.code) {
    return false
  }
  info.act = 'template_message'

  var app = getApp()
  app.http_req(info, app.globalData.init.api_url, 'POST')
}

/**
 * 数组排序（值为number型）
 * arr 需要排序的数组
 * order_by   desc: 降续排列  asc: 升续排列
 * 默认为asc
 */
function number_sort (arr, order_by) {
  if (typeof order_by !== 'undefined' && order_by === 'desc') { // desc
    return arr.sort(function (v1, v2) {
      return v2 - v1
    })
  } else { // asc
    return arr.sort(function (v1, v2) {
      return v1 - v2
    })
  }
}

// 商家图片加载错误使用默认图片(二维产品列表处理（不含属性）)  index、search页面
function show_default_BizImg (bizlist, bizid) {
  for (var i in bizlist) {
    if (bizlist[i].Biz_ID === bizid) {
      bizlist[i].Biz_Logo = '/images/moren.png'
    }
  }
  return bizlist
}

// 订单产品图片获取失败处理
function orderListImgError (orderlist, order_id, pro_id, attr_id) {
  for (var i in orderlist) {
    if (orderlist[i].Order_ID === order_id) {
      for (var j in orderlist[i].Order_CartList) {
        if (j === pro_id) {
          for (var k in orderlist[i].Order_CartList[j]) {
            if (k === attr_id) {
              orderlist[i].Order_CartList[j][k].pro_img = '../../images/no_pic.png'
            }
          }
        }
      }
    }
  }
  return orderlist
}

// 订单列表订单信息处理
function formatOrder (front_url, orderlist) {
  for (var i in orderlist) {
    var CartList = orderlist[i].Order_CartList = orderlist[i].Order_CartList !== '' && typeof orderlist[i].Order_CartList !== 'object' ? JSON.parse(orderlist[i].Order_CartList) : orderlist[i].Order_CartList
    if (CartList !== '') {
      for (var pro_id in CartList) {
        for (var attr_id in CartList[pro_id]) {
          var ImgPath = CartList[pro_id][attr_id].pro_img
          CartList[pro_id][attr_id].pro_img = ImgPath && ImgPath.indexOf('http') > -1 ? ImgPath : front_url + ImgPath
          const start = CartList[pro_id][attr_id].start
          CartList[pro_id][attr_id].start = format_time('yyyy年M月d日', start)

          if (typeof CartList[pro_id][attr_id].end !== 'undefined') {
            const end = CartList[pro_id][attr_id].end
            CartList[pro_id][attr_id].end = format_time('yyyy年M月d日', end)
          }
        }
      }
    }
    // 配送费
    orderlist[i].Order_Shipping = orderlist[i].Order_Shipping && orderlist[i].Order_Shipping !== '' && typeof orderlist[i].Order_Shipping !== 'object' ? JSON.parse(orderlist[i].Order_Shipping) : orderlist[i].Order_Shipping
    // 订单时间
    orderlist[i].Order_CreateTime = date_format(orderlist[i].Order_CreateTime * 1000, '-', 1)
    // 优惠
    orderlist[i].free_price = Math.round((orderlist[i].Order_TotalAmount - orderlist[i].Order_TotalPrice) * 100) / 100
    // 状态颜色
    orderlist[i].status_color = '1,2,3,4'.indexOf(orderlist[i].Order_Status) > -1 || (orderlist[i].Order_Status === 5 && orderlist[i].Is_Backup === 1) ? '#0ca400' : ('0,6'.indexOf(orderlist[i].Order_Status) > -1 ? '#ff4901' : '#333')

    // 商家头像处理
    orderlist[i].Biz_Logo = !orderlist[i].Biz_Logo ? '/images/moren.png' : (orderlist[i].Biz_Logo.indexOf('http') > -1 || orderlist[i].Biz_Logo.indexOf('/uploadfiles/') === -1 ? orderlist[i].Biz_Logo : front_url + orderlist[i].Biz_Logo)

    // 核销码
    orderlist[i].consumption_qrcode = !orderlist[i].consumption_qrcode ? '' : (orderlist[i].consumption_qrcode.indexOf('http') > -1 ? orderlist[i].consumption_qrcode : front_url + orderlist[i].consumption_qrcode)
  }
  return orderlist
}

// 产品处理
function pro_format (pro_list, front_url) {
  var list = [] // 因需要上拉加载更多，所以转为无下标的数组
  for (var i in pro_list) {
    // 产品图片处理
    var ImgPath = JSON.parse(pro_list[i].pro_img).ImgPath
    for (var j in ImgPath) {
      ImgPath[j] = ImgPath[j].indexOf('http') > -1 ? ImgPath[j] : front_url + ImgPath[j]
    }
    pro_list[i].pro_img = { ImgPath: ImgPath }
    // 规格
    pro_list[i].skujosn = pro_list[i].skujosn ? JSON.parse(pro_list[i].skujosn) : ''
    // 规格价格
    pro_list[i].skuvaljosn = pro_list[i].skuvaljosn ? JSON.parse(pro_list[i].skuvaljosn) : ''
    pro_list[i].is_attr = !!(pro_list[i].skujosn !== '' && pro_list[i].skuvaljosn !== '')
    // 攻略处理
    if (typeof pro_list[i].gonglue !== 'undefined') {
      pro_list[i].gonglue = gonglue_format(pro_list[i].gonglue, front_url)
    }
    delete pro_list[i].tableval
    delete pro_list[i].tablevals
    list.push(pro_list[i])
  }
  return list
}

// 攻略处理
function gonglue_format (list, front_url) {
  for (var i in list) {
    list[i].gonglue_img = list[i].gonglue_img.indexOf('http') > -1 ? list[i].gonglue_img : front_url + list[i].gonglue_img
    if (list[i].created_at) {
      list[i].created_at = date_format(list[i].created_at * 1000, '-')
    }
  }
  return list
}

// 分类处理
function cate_format (cate_list, front_url) {
  for (var i in cate_list) {
    cate_list[i].cate_img = cate_list[i].cate_img === '' ? '/images/none.png' : (cate_list[i].cate_img.indexOf('http') > -1 ? cate_list[i].cate_img : front_url + cate_list[i].cate_img)
  }
  return cate_list
}

// 活动处理
function activity_format (activity_list) {
  var list = []
  for (var i in activity_list) {
    const tag = activity_list[i].activity_tag
    if (tag === 'newuser') { // 新用户
      activity_list[i].desc = '新用户优惠' + activity_list[i].activity_intro + '元'
      list.push(activity_list[i])
    }
    if (tag === 'sendfree') { // 免费赠送
      activity_list[i].desc = '达到' + activity_list[i].activity_intro + '元免配送费'
      list.push(activity_list[i])
    }
    if (tag === 'manjian') { // 满减
      const intro = activity_list[i].activity_intro = typeof activity_list[i].activity_intro !== 'object' ? JSON.parse(activity_list[i].activity_intro) : activity_list[i].activity_intro
      let desc = ''
      for (var j in intro) {
        desc += '满' + intro[j].full + '元减' + intro[j].cut + '元' + (j % 2 === 1 ? '\n' : '　')
      }
      activity_list[i].desc = desc
      list.push(activity_list[i])
    }
  }
  return list
}

//  结束下拉刷新
function overPullDownRefresh () {
  wx.hideLoading()
  wx.hideNavigationBarLoading()
  wx.stopPullDownRefresh()
}

module.exports = {
  formatTime: formatTime,
  format_time: format_time,
  format_money: format_money,
  format_money_string: format_money_string,
  makeid: makeid,
  // paysignjsapi: paysignjsapi,
  // paysignjs: paysignjs,
  check_mobile: check_mobile,
  check_money: check_money,
  array_change: array_change,
  get_arr_index: get_arr_index,
  img_path: img_path,
  format_imgs: format_imgs,
  openUrl: openUrl,
  alert: alert,
  formatShop: formatShop,
  formatCate: formatCate,
  formatNote: formatNote,
  formatComment: formatComment,
  formatProd: formatProd,
  get_cache: get_cache,
  set_cache: set_cache,
  check_name: check_name,
  get_distance: get_distance,
  dateformat: dateformat,
  addMessageCode: addMessageCode,
  roomListFormat: roomListFormat,
  roomListImgError: roomListImgError,
  number_sort: number_sort,
  show_default_BizImg: show_default_BizImg,
  orderListImgError: orderListImgError,
  formatOrder: formatOrder,
  pro_format: pro_format,
  activity_format: activity_format,
  cate_format: cate_format,
  gonglue_format: gonglue_format,
  date_format: date_format,
  overPullDownRefresh: overPullDownRefresh,
  check_money_in: check_money_in
}
