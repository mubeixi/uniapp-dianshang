//是否为定制项目
export const isCustom = false;

export const isDev = process.env.NODE_ENV === 'production' ? false : true;

// #ifdef APP-PLUS || MP-TOUTIAO
export const APP_USERS_ID = 'wkbq6nc2kc';//'	mrw5iqvhs2 xjgjd88jee  wkbq6nc2kc  05eiz8cqtw o1rcshfk39';
// #endif

let _apiBaseUrl =''

// #ifndef H5
_apiBaseUrl = 'https://new401t.bafangka.com';
// #endif

export const apiBaseUrl = _apiBaseUrl;

//后面的正式环境地址,每次打包要从新切换.
//许总又要求,可以打包一套多个站点部署

const devStatic = 'https://new401t.bafangka.com'

let prodStatic = ''

//app 和小程序还是需要手动设置staticUrl
// #ifndef H5
prodStatic = 'https://new401.bafangka.com'
// #endif

//h5就自动获取
// #ifdef H5
const { origin } = location
prodStatic =  origin
// #endif

export const staticUrl = prodStatic;

export default {
    apiBaseUrl
}
