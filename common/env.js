// export const apiBaseUrl = 'http://www.qiyeban.com';
export const isDev = process.env.NODE_ENV === 'production' ? false : true;

// #ifdef APP-PLUS || MP-TOUTIAO
export const APP_USERS_ID = 'wkbq6nc2kc';//'	mrw5iqvhs2 xjgjd88jee  wkbq6nc2kc';
// #endif

// #ifdef H5
console.log('NODE_ENV is ' + isDev);
export const apiBaseUrl = isDev ? '' : 'https://new401t.bafangka.com';//h5调试为了跨域https://new401.bafangka.com
// #endif

// #ifndef H5
export const apiBaseUrl = 'https://new401t.bafangka.com';
// #endif

export const staticUrl = 'https://new401t.bafangka.com';

export const apiKey = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';


export default {
    apiBaseUrl, apiKey
}
