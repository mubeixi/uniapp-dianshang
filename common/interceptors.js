import * as ENV from './env.js';
// console.log(ENV.apiBaseUrl)
import {error, toast} from "./index";

/**
 *
 * @param url
 * @param method
 * @param data
 * @param options
 * @return {Promise<unknown>}
 */
import store from '../store'
export const ajax = (url,method,data,options)=>{

  if(!options)options={}
  if(!data)data={}


  let {tip='',mask=false,timelen=2000,timeout=2000,errtip = true} = options;

  if(tip){
    uni.showLoading({
      title: tip,
      mask:mask
    })
  }

  let token

  var header = {

    'Authorization':'Bearer '+token,
    "content-type": "application/x-www-form-urlencoded"
  };
  // if (wx.getStorageSync('cookie')) {
  //   header.Cookie = wx.getStorageSync('cookie')
  // }

  // console.log('ajax action is '+data.act);

	// #ifdef MP-TOUTIAO || APP-PLUS
  // console.log(data)
	// #endif
  let URL = ENV.apiBaseUrl+url;
  const hookErrorCode = [0,88001,66001];

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

		  // #ifdef MP-TOUTIAO || APP-PLUS
		  // console.log(res)
		  // #endif



          if(res.hasOwnProperty('errorCode') && hookErrorCode.indexOf(res.errorCode) != -1){
              if(res.errorCode === 66001){
                  error(res.msg)

                  //重置用户信息

                  let users_id = ls.get('users_id');
                  ls.clear();
                  ls.set('users_id',users_id);
                  // #ifdef H5
                  sessionStorage.removeItem('is_send_usrlog')
                  // #endif
                  store.commit('SET_USER_INFO',{})
                  store.commit('SET_STORES_ID',null)

                  setTimeout(()=>{
                      uni.navigateTo({
                          url:'/pages/login/login'
                      })
                  },1000)
                  return;
              }
              resolve(res)
          }else{
              if(res.hasOwnProperty('errorCode') && res.msg){
                  if(errtip)error(res.msg)
              }else{
                  error('请求未成功')
              }

              reject(res)
          }



      },
      fail:(e)=>{
          reject(e)
      },
      complete:()=>{
        // console.log(res)
        if(tip){
        setTimeout(function(){
            uni.hideLoading()
        },500)

        }


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
