import * as ENV from './env.js';
// console.log(ENV.apiBaseUrl)
import {error} from "./index";

export const ajax = (url,method,data,options)=>{

  if(!options)options={}
  if(!data)data={}


  let {tip='',mask=false,timelen=2000,errtip = true} = options;

  uni.showLoading({
    title: tip||'loading',
    mask:mask
  })


  let token

  var header = {

    'Authorization':'Bearer '+token,
    "content-type": "application/x-www-form-urlencoded"
  };
  // if (wx.getStorageSync('cookie')) {
  //   header.Cookie = wx.getStorageSync('cookie')
  // }

  console.log('ajax action is '+data.act);



  let URL = ENV.apiBaseUrl+url;

  const hookErrorCode = [0,88001];


  return new Promise((resolve, reject) =>{


    uni.request({
      header,
      url: URL,
      method,
      data,
      success:(ret)=>{

          if(ret.statusCode!==200 || typeof ret.data !='object'){
              error('服务器去旅行了')
          }
          let res = ret.data;

		 

          if(hookErrorCode.indexOf(res.errorCode) != -1){
              resolve(res)
          }else{
              if(errtip)error(res.msg)
              reject(res)
          }



      },
      fail:(e)=>{
          reject(e)
      },
      complete:()=>{
        // console.log(res)
        uni.hideLoading()
        // setTimeout(function(){
        //   uni.hideLoading()
        // },500)
      }
    })

    //     .then(data=>{
    //     var [error, res]  = data;
    //     console.log(res.data);
    //     if(hookErrorCode.indexOf(res.errorCode) != -1){
    //     	resolve(res)
    //     }else{
    //         // throw new Error(res)
    //       //error(res.data.msg)
    //         reject(res);
    //     }
    // },e=>{
    //     reject(e);
    // })

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
