// export const apiBaseUrl = 'http://www.qiyeban.com';
export const isDev = process.env.NODE_ENV === 'production' ? false : true;

// #ifdef APP-PLUS || MP-TOUTIAO
export const APP_USERS_ID = 'wkbq6nc2kc';//'	mrw5iqvhs2 xjgjd88jee  wkbq6nc2kc  05eiz8cqtw';
// #endif

// #ifdef H5
export const apiBaseUrl = isDev ? '' : '';//h5调试为了跨域https://new401.bafangka.com
// #endif

// #ifndef H5
export const apiBaseUrl = 'https://new401t.bafangka.com';
// #endif

//后面的正式环境地址,每次打包要从新切换.
//许总又要求,可以打包一套多个站点部署

const devStatic = 'https://new401t.bafangka.com'

// #ifndef H5
//app 和小程序还是需要手动设置staticUrl
const prodStatic = 'https://new401.bafangka.com'
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
