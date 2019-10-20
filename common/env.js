// export const apiBaseUrl = 'http://www.qiyeban.com';
export const isDev = process.env.NODE_ENV === 'production' ? false : true;

// #ifdef APP-PLUS
export const APP_USERS_ID = 'wkbq6nc2kc';
// #endif

// #ifdef H5
console.log('NODE_ENV is '+isDev);
export const apiBaseUrl = isDev?'':'http://www.qiyeban.com';//h5调试为了跨域 //http://new401.bafangka.com
// #endif

// #ifndef H5
export const apiBaseUrl = 'http://www.qiyeban.com';
// #endif

export const staticUrl = 'http://www.qiyeban.com';

export const apiKey = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';


export default {
	apiBaseUrl,apiKey
}
