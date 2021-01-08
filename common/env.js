import T from '@/common/langue/i18n'
// 是否为定制项目
export const isCustom = false

export const isDev = process.env.NODE_ENV !== 'production'

export const APP_USERS_ID = 'wkbq6nc2kc' // mrw5iqvhs2 xjgjd88jee  wkbq6nc2kc  05eiz8cqtw o1rcshfk39';

export const apiBaseUrl = 'http://www.new401src.com'
// Im相关配置
export const IM_WSS_URL = 'wss://newjdtravel.bafangka.com/cus/'
export const IM_API_URL = 'https://chat.bafangka.com'


let _staticUrl = ''
// app 和小程序还是需要手动设置staticUrl
// #ifndef H5
const appProdStatic = 'http://www.new401src.com'
_staticUrl = appProdStatic
// #endif

// h5就自动获取
// #ifdef H5
const { origin } = location
_staticUrl = isDev ? 'http://www.new401src.com' : origin
// #endif

export const staticUrl = _staticUrl

export default {
  apiBaseUrl,
  IM_WSS_URL,
  IM_API_URL
}
