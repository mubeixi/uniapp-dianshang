import * as ENV from './env.js';
// console.log(ENV.apiBaseUrl)
import {error} from "./index";

export const ajax = (url,method,data,options)=>{

  if(!options)options={}
  if(!data)data={}
  let {tip='',mask=false,timelen=2000} = options;

  uni.showLoading({
    title: tip||'loading',
    mask:mask
  })

  //if(!data._ajax)data._ajax=2;
  //if (!data.owner_id && owner_id)data.owner_id=owner_id;

  let token

  var header = {

    'Authorization':'Bearer '+token,
    "content-type": "application/x-www-form-urlencoded"
  };
  // if (wx.getStorageSync('cookie')) {
  //   header.Cookie = wx.getStorageSync('cookie')
  // }


let URL = ENV.apiBaseUrl+url;

const hookErrorCode = [0,88001];

// console.log(URL)

  return new Promise(function(resolve, reject){
    uni.request({
      header,
      url: URL,
      method,
      data,
      success:(res)=>{

		if(res.statusCode!==200 || typeof res.data !='object'){
          error('服务器去旅行了')
		}

		if(hookErrorCode.indexOf(res.data.errorCode) != -1){
			resolve(res)
		}else{
		  //error(res.data.msg)
          reject(res)
		}

      },
      fail:(e)=>{

        reject(e)
      },
      complete:(res)=>{
        // console.log(res)
        setTimeout(function(){
          uni.hideLoading()
        },500)
      }
    })
  })

}

export const post = (url, data, options)=>{
  return ajax(url, 'post', data, options)
}


export const get = (url, data, options) => {
  return ajax(url, 'get', data, options)
}


module.exports = {
  post,get,ajax
}
