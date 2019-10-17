// export const apiBaseUrl = 'http://www.qiyeban.com';
export const isDev = process.env.NODE_ENV === 'production' ? false : true;

// #ifdef APP-PLUS
export const APP_USERS_ID = 89757;
export const WX_MINI_ORIGIN_ID = '232323';
// #endif


// #ifdef H5
console.log('NODE_ENV is '+isDev);
export const apiBaseUrl = isDev?'':'http://new401.bafangka.com';//h5调试为了跨域
// #endif

// #ifndef H5
export const apiBaseUrl = 'http://new401.bafangka.com';
// #endif

export const staticUrl = 'http://new401.bafangka.com';

export const apiKey = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';


export default {
	apiBaseUrl,apiKey
}
