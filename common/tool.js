import T from '@/common/langue/i18n' 
import { error, toast } from './index'
import { apiBaseUrl } from './env'
import store from '../store'
import _ from 'underscore'
import Promisify from './Promisify'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 从指定的字符串中获取需要的参数，适用于网络地址
 * @param {*} str
 * @param {*} name
 */
export const GetQueryByString = (str, name) => {
  // 获取？号出现几次
  var tempArr = str.split('?')

  // //如果大于1
  if (tempArr.length - 1 > 1) {
    var rt = null
    for (var i in tempArr) {
      var s = tempArr[i]
      var reg1 = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      var r1 = s.match(reg1) // 匹配目标参数
      if (r1 != null) {
        rt = decodeURIComponent(r1[2])// 一直覆盖，要最后的就行了
      }
    }

    return rt
  }

  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  if (!str.split('?')[1]) return null
  var r = str.split('?')[1].match(reg) // 匹配目标参数

  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null // 返回参数值
}

export const ls = {
  set (key, val, cover) {
    if (!cover && !val && (val !== 0 || val !== false)) return false

    return uni.setStorageSync(key, val)
  },

  get (key) {
    try {
      var val = uni.getStorageSync(key)
      return val
    } catch (e) {
      // error
      uni.showModal(`获取Storage失败，key：${key}`)
    }

    // if(!val) return '';
    // try{
    //   return JSON.parse(val)
    // }catch (e) {
    //   return '';
    // }
  },
  remove (key) {
    return uni.removeStorageSync(key)
  },
  clear () {
    return uni.clearStorageSync()
  }
}

export function toHome () {
  uni.switchTab({
    url: '/pages/index/index'
  })
}

export function backFunc () {
  const currentPages = getCurrentPages()
  if (currentPages.length < 2) {
    toHome()
  }
  uni.navigateBack({
    fail (err) {
      console.log(err.errMsg)
      // 退无可退就回首页
      toHome()
    }
  })
}

export const goBack = function () {
  uni.navigateBack({
    delta: 1
  })
}

/**
 * 数组排序（值为number型）
 * arr 需要排序的数组
 * order_by   desc: 降续排列  asc: 升续排列
 * 默认为asc
 */
export const numberSort = function (arr, order_by) {
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

// 会修改模板对象，将他没有的属性加上
function addFun (object, newobj) {
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue

    if (typeof object[key] === 'object') {
      if (!newobj) continue
      addFun(object[key], newobj[key])
    } else if (typeof object[key] === 'function') {
      continue
    } else {
      if (!newobj || !newobj[key]) continue
      object[key] = newobj[key]
    }
  }
}

export function deepCopyStrict (currentObj, newObject) {
  addFun(currentObj, newObject)
  return currentObj
}

/**
 * 数组去重
 * @param arr
 * @returns {[]}
 */
export const arrayUnique = (arr) => {
  var res = []
  for (var i = 0, len = arr.length; i < len; i++) {
    var obj = arr[i]
    for (var j = 0, jlen = res.length; j < jlen; j++) {
      if (res[j] === obj) break
    }
    if (jlen === j) res.push(obj)
  }
  return res
}

/**
 * 对象=>字符串=>对象
 * 一般用于og立即显示（有时候虽然在前面打印，但是会由于引用的问题，打印的不是即时结果)
 * 同时可以用于简单粗暴的避免引用传递的对象copy，但是注意这种写法只保留值，会丢失方法
 * @param obj
 */
export const objTranslate = obj => JSON.parse(JSON.stringify(obj))

export function mixinStyle (defaultStyle, style) {
  if (!defaultStyle) defaultStyle = {}
  if (!style) style = {}

  const rt = objTranslate(defaultStyle)

  for (var i in style) {
    if (!style.hasOwnProperty(i)) continue
    rt[i] = style[i]
  }

  return rt
}

// 全局判断是否IOS方法
export function isIos () {
  const u = navigator.userAgent
  return u.indexOf('iPhone') > -1 || u.indexOf('Mac OS') > -1
}

export function isWeiXin () {
  // #ifdef H5
  var ua = window.navigator.userAgent.toLowerCase()
  if (
    ua.match(/MicroMessenger/i) == 'micromessenger' &&
    ua.match(/miniProgram/i) &&
    ua.match(/miniProgram/i)[0] == 'miniprogram'
  ) {
    return 'xcx'
  }
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
  // #endif

  // #ifndef H5
  // eslint-disable-next-line no-unreachable
  return false
  // #endif
}

export const uploadByPromise = ({ url, filePath, name = 'image', formData }) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath,
      name,
      formData,
      success: (ret) => {
        if (ret.statusCode !== 200) {
          reject(Error(T._('21d0')))
        }

        let res = ret.data
        if (typeof res === 'string' && res)res = JSON.parse(res)
        if (res.errorCode !== 0) {
          reject(Error(res.msg || T._('21d1')))
        }
        const data = res.data
        // console.log(data)

        if (data.path) {
          resolve(data.path)
        } else {
          resolve(Error('文件上传路径获取失败'))
        }
      },
      fail: (err) => {
        reject(Error('上传请求报错:' + err.errMsg))
      },
      complete: () => {

      }
    })
  })
}

export const chooseImageByPromise = ({ count = 1, sizeType = ['original', 'compressed'] }) => {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count,
      // #ifndef MP-TOUTIAO
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      // #endif
      success (res) {
        resolve(res.tempFiles)
      },
      fail (e) {
        reject(Error(e.errMsg))
      },
      complete () {

      }
    })
  })
}
// 上传图片
export const uploadImages = (formData, imgs) => {
  const taskList = []
  for (let i = 0; i < imgs.length; i++) {
    // #ifdef MP-TOUTIAO
    // const fileCTX = tt.getFileSystemManager()
    // fileCTX.readFile({
    //   filePath: imgs[i],
    //   encoding: 'base64',
    //   success (ret) {
    //     const imgs = 'data:image/jpeg;base64,' + ret.data
    //     uploadImage({ image: imgs }).then(result => {
    //       arr.push(result.data.path)
    //     }, err => {
    //
    //     }).catch(e => {
    //
    //     })
    //   },
    //   fail (ret) {
    //
    //   },
    //   complete (ret) {
    //   }
    // })
    // #endif

    // #ifndef MP-TOUTIAO
    var apiHost = apiBaseUrl
    // #ifdef H5
    apiHost = ''
    // #endif
    const taskItem = uploadByPromise({
      url: apiHost + '/api/little_program/shopconfig.php',
      filePath: imgs[i],
      name: 'image',
      formData: formData
    })
    taskList.push(taskItem)

    // #endif
  }

  return new Promise((resolve, reject) => {
    Promise.all(taskList).then((urls) => {
      resolve(urls)
    }).catch((error) => {
      reject(Error(error.message || '文件上传失败'))
      // uni.showModal({
      //   title: '文件批量上传失败',
      //   content: JSON.stringify(error)
      // })
    })
  })
}

export const urlencode = (str) => {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
}

// 构造分享事件
/**
 *
 * @param path 这个里面无需传owenr_id和users_id
 * @return {string}
 */
export const buildSharePath = (path) => {
  const store_id = store.getters.getCurrentStoreId()

  const users_ID = ls.get('users_id')
  const userInfo = store.state.userInfo || ls.get('userInfo')

  let search = ''

  if (path.indexOf('users_id') === -1) {
    search += (users_ID ? ('users_id=' + users_ID) : '')
  }

  if (path.indexOf('owner_id') === -1) {
    let owner_id = 0
    if (userInfo.User_ID) {
      owner_id = userInfo.User_ID
    }
    search += ('&owner_id=' + owner_id)
  }

  if (store_id) {
    search += ('&store_id=' + store_id)
  }

  let ret = ''
  if (path.indexOf('?') !== -1) {
    ret = path + (search ? '&' : '') + search
  } else {
    ret = path + (search ? '?' : '') + search
  }

  if (ret.indexOf('users_id') === -1) {
    error('组建分享参数失败')
    throw '必须有users_id'
  }

  // console.log(`share path is ${ret}`)

  return ret
}

/**
 *获取商品缩略图
 * @param img
 * @param size n3最小
 */
export const getProductThumb = (img, size) => {
  if (!size) size = 'n3'

  const tempArr = img.split('/')
  let name = tempArr.pop()
  name = size + '/' + name

  return [...tempArr, name].join('/')
}

// const year = date.getFullYear()
// const month = date.getMonth() + 1
// const day = date.getDate()
// const hour = date.getHours()
// const minute = date.getMinutes()
// const second = date.getSeconds()
//
// return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

// function stampByPhp2js(s){
//     return s.toString().length === 10 ?s*1000:s
// }
/**
 *pintuan_start_time
 * @param current 开始的时间，如果不传入，则用现在的时间
 * @param end_timeStamp
 */
export const getGroupCountdown = ({ end_timeStamp = 1571221631, current = (new Date()).getTime() } = {}) => {
  let { d = 0, h = 0, m = 0, s = 0 } = {}
  // 时间戳格式转换
  current = parseInt(current / 1000)

  const countTime = end_timeStamp - current
  if (countTime < 0) {
    return false
  }

  d = parseInt(countTime / (60 * 60 * 24))
  h = parseInt((countTime - d * 60 * 60 * 24) / (60 * 60))
  m = parseInt((countTime - d * 60 * 60 * 24 - h * 60 * 60) / 60)
  s = countTime - d * 60 * 60 * 24 - h * 60 * 60 - m * 60

  return {
    d,
    h,
    m,
    s
  }
}

// export const getCountdownByJoin = ({end_timeStamp = 1571221631,current = (new Date()).getTime()} = {}) => {
//
//     let {d=0,h=0,m=0,s=0} = {};
//     //时间戳格式转换
//     current = parseInt(current/1000)
//

//     let countTime = end_timeStamp - current
//     if(countTime<0){

//         return false
//     };
//
//
//     h = parseInt((countTime)/(60*60))
//     m = parseInt((countTime-h*60*60)/60)
//     s = countTime-h*60*60-m*60
//
//     return {h,m,s}
//
// }

export const getCountdownFunc = ({ start_timeStamp, end_timeStamp, current = (new Date()).getTime() } = {}) => {
  let { d = 0, h = 0, m = 0, s = 0 } = {}

  // 时间戳格式转换
  current = parseInt(current / 1000)

  let countTime = 0; let is_start = false; let is_end = false

  // 还没开始
  if (start_timeStamp > current && end_timeStamp > current) {
    countTime = start_timeStamp - current
  } else if (end_timeStamp > current && start_timeStamp < current) {
    // 还在进行中

    is_start = true
    countTime = end_timeStamp - current
  } else {
    is_end = true

    // throw "活动信息无效";
  }

  d = parseInt(countTime / (60 * 60 * 24))
  h = parseInt((countTime - d * 60 * 60 * 24) / (60 * 60))
  m = parseInt((countTime - d * 60 * 60 * 24 - h * 60 * 60) / 60)
  s = countTime - d * 60 * 60 * 24 - h * 60 * 60 - m * 60

  return {
    d,
    h,
    m,
    s,
    is_start,
    is_end
  }
}

/**
 * 快速创建空数组
 * @param len
 * @param item
 * @return {[]}
 */
export const createEmptyArray = (len, item) => {
  if (item === undefined) {
    item = ''
  }

  const tempArr = []

  for (var i = 0; i < len; i++) {
    tempArr[i] = item
  }

  return tempArr
}

/**
 * 查看对象1中的所有属性在obj2中都有
 * @param obj1
 * @param obj2
 */
export const compare_obj = (obj1, obj2) => {
  for (var i in obj1) {
    if (!obj1.hasOwnProperty(i)) continue
    if (!obj2.hasOwnProperty(i) || obj1[i] !== obj2[i]) {
      return false
    }
  }
  return true
}

/**
 * 从指定的数组(对象组成的数组)，根据键值和值找到下标
 * @param arr
 * @param key
 * @param val
 * @param full 是否返回值和下标，默认只返回下标
 */
export const findArrayIdx = (arr, key_val_arr, full) => {
  for (var i in arr) {
    if (typeof arr[i] !== 'object') continue
    // 用来比较对象
    if (compare_obj(key_val_arr, arr[i])) {
      if (!full) return parseInt(i)
      return {
        val: arr[i],
        idx: parseInt(i)
      }
    }
  }
  return false
}

/**
 * 查看某个值是否在指定数组内
 * @param val
 * @param arr
 * @returns {boolean}
 */
export function checkValue (val, arr) {
  let _val = val
  if (Number.isNaN(val)) {
    _val = 'NaN'
  }
  return arr.indexOf(_val) !== -1
}

/**
 * 清理对象中多余的属性
 * @param obj
 * @param strice
 * @param tip
 * @param clearValues
 * @returns {*}
 */
export const emptyObject = (obj, strice, tip, clearValues = [null, undefined, '', 'null', 'undefined']) => {
  for (var prop in obj) {
    if (checkValue(obj[prop], clearValues)) {
      if (strice) {
        tip && error('参数' + prop + T._('21d2'))
        return false
      }
      delete obj[prop]
    }
  }
  return obj
}

/**
 * 批量创建数组
 */
export const createTmplArray = (item, len) => {
  const rt = []
  for (var i = 0; i < len; i++) {
    rt.push(objTranslate(item))
  }
  return rt
}

export const plainArray = (arr, key, newArr) => {
  if (!arr || !key) return false

  for (var item of arr) {
    const tempObj = objTranslate(item)
    if (tempObj.hasOwnProperty(key)) {
      tempObj[key] = null
    }
    newArr.push(tempObj)

    if (item && item[key] && _.isArray(item[key])) {
      plainArray(item[key], key, newArr)
    }
  }
}

/**
 * 保存图片到本地
 * @param fileUrl
 * @param type
 * @returns {Promise<boolean|*>}
 */
export const saveImageToDisk = async ({ fileUrl, type = 'local' }) => {
  try {
    const fileTempPath = type === 'local' ? fileUrl : await downLoadFile(fileUrl)

    // console.log(fileTempPath, 'sss')
    await Promisify('saveImageToPhotosAlbum', { filePath: fileTempPath }).catch(e => { throw Error(e.errMsg) })
    return fileTempPath
  } catch (e) {
	  console.log(e, 'error')
    return false
  }
}

/**
 * 下载文件
 * @param url
 * @returns {Promise<boolean>}
 */
const downLoadFile = async (url) => {
  try {
    const downRT = await Promisify('downloadFile', { url }).catch(e => { throw Error(e.errMsg) })
    const { tempFilePath } = downRT
    if (!tempFilePath) throw Error('图片下载失败')
    return tempFilePath
  } catch (e) {
    console.log(e, '图片下载失败')
    return false
  }
}

/**
 * 检查手机号
 * @param { String } mobile 手机号
 * @param { String } phone_code 国际区号
 * @returns { Boolean }
 */
export const checkMobile = (mobile, phone_code = '') => {
  let flag = true
  if (phone_code === '' || phone_code === '+86') {
    flag = /^1[3-9]\d{9}$/.test(mobile)
  } else {
    flag = /^\d{3,15}$/.test(mobile)
  }
  return flag
}
