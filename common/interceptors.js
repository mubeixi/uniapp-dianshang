import * as ENV from './env.js';
// console.log(ENV.apiBaseUrl)

export const ajax = (url,method,data,options)=>{
	
  if(!options)options={}
  if(!data)data={}
  let {tip='',mask=false,timelen=2000} = options;

  uni.showLoading({
    title: tip||'loading',
    mask:mask
  })

  //if(!data._ajax)data._ajax=2;
  //if (!data.aid && aid)data.aid=aid;
  
  let token

  var header = {
    // 'Cookie': '',
    'Authorization':'Bearer '+token,
    "content-type": "application/x-www-form-urlencoded"
  };
  // if (wx.getStorageSync('cookie')) {
  //   header.Cookie = wx.getStorageSync('cookie')
  // }

let URL = ENV.apiBaseUrl+url;
// console.log(URL)
	
  return new Promise(function(resolve, reject){
    uni.request({
      header,
      url: URL,
      method,
      data,
      success:(res)=>{
        resolve(res)
      },
      fail:(e)=>{
        reject(e)
      },
      complete:(rt)=>{
        console.log(rt)
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
