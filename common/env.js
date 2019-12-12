// export const apiBaseUrl = 'http://www.qiyeban.com';
export const isDev = process.env.NODE_ENV === 'production' ? false : true;

// #ifdef APP-PLUS || MP-TOUTIAO
export const APP_USERS_ID = 'mrw5iqvhs2';//'	mrw5iqvhs2  wkbq6nc2kc';
// #endif

// #ifdef H5
console.log('NODE_ENV is '+isDev);
export const apiBaseUrl = isDev?'':'https://new401.bafangka.com';//h5调试为了跨域https://new401.bafangka.com
// #endif

// #ifndef H5
export const apiBaseUrl = 'https://new401.bafangka.com';
// #endif

export const staticUrl = 'https://new401.bafangka.com';

export const apiKey = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';


export default {
	apiBaseUrl,apiKey
}
