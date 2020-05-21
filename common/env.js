//是否为定制项目
export const isCustom = false;

export const isDev = process.env.NODE_ENV === 'production' ? false : true;

export const APP_USERS_ID = 'wkbq6nc2kc';//'	mrw5iqvhs2 xjgjd88jee  wkbq6nc2kc  05eiz8cqtw o1rcshfk39';


export const apiBaseUrl = 'https://new401t.bafangka.com';

let _staticUrl = ''
//app 和小程序还是需要手动设置staticUrl
// #ifndef H5
const appProdStatic = 'https://new401.bafangka.com'
_staticUrl = appProdStatic
// #endif

//h5就自动获取
// #ifdef H5
const { origin } = location
_staticUrl = origin
// #endif

export const staticUrl = _staticUrl


export default {
    apiBaseUrl
}
