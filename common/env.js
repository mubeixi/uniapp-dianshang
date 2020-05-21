// export const apiBaseUrl = 'http://www.qiyeban.com';
export const isDev = process.env.NODE_ENV === 'production' ? false : true;

// #ifdef APP-PLUS || MP-TOUTIAO
export const APP_USERS_ID = 'wkbq6nc2kc';//'	mrw5iqvhs2 xjgjd88jee  wkbq6nc2kc  05eiz8cqtw o1rcshfk39';
// #endif

let _apiBaseUrl =''
// #ifdef H5
_apiBaseUrl = isDev ? '' : '';//h5调试为了跨域https://new401.bafangka.com
// #endif

// #ifndef H5
_apiBaseUrl = 'https://new401t.bafangka.com';
// #endif

//app单独用测试地址吧
// #ifdef APP-PLUS
_apiBaseUrl = 'https://new401t.bafangka.com';
// #endif

export const apiBaseUrl = _apiBaseUrl;

//后面的正式环境地址,每次打包要从新切换.
//许总又要求,可以打包一套多个站点部署

const devStatic = 'https://new401t.bafangka.com'

// #ifndef H5
//app 和小程序还是需要手动设置staticUrl
const prodStatic = 'https://new401t.bafangka.com'
// #endif

// #ifdef H5
//h5就自动获取
const { origin } = location
export const prodStatic =  origin
// #endif


export const staticUrl = isDev ?devStatic:prodStatic;

export const apiKey = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';


export default {
    apiBaseUrl, apiKey
}
