import * as ENV from './env.js';
// console.log(ENV.apiBaseUrl)
import {error} from "./index";

// #ifndef MP
//引入fly实例
var fly=require("flyio")
// #endif

// #ifdef MP
var Fly=require("../lib/wx") //wx.js为您下载的源码文件
var fly=new Fly; //创建fly实例
// #endif

//定义公共headers
fly.config.headers={xx:5,bb:6,dd:7}
//设置超时
fly.config.timeout=10000;
//设置请求基地址
fly.config.baseURL= ENV.apiBaseUrl

fly.config.parseJson = true

//添加请求拦截器
fly.interceptors.request.use((request)=>{
    //给所有请求添加自定义header
    //request.headers["X-Tag"]="flyio";
    request.headers = {
      "content-type": "application/x-www-form-urlencoded"
    }
	//打印出请求体
	//console.log(request.body)
	//终止请求
	//var err=new Error("xxx")
	//err.request=request
	//return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})

const hookErrorCode = [0,88001];

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
      uni.hideLoading()

      if(response.status !== 200){
        error('服务器去旅行了');
        return Promise.reject(false)
      }

      let ret = JSON.parse(response.data)


      //只将请求结果的data字段返回
      return ret
    },
    (err) => {
      uni.hideLoading()
      //发生网络错误后会走到这里
      return Promise.resolve(err)
    }

)


function UserException(tmpl) {
    return {...tmpl};
}


export const ajax = (url,method,data,options)=>{

  if(!options)options={}
  if(!data)data={}


  let {tip='',mask=false,timelen=2000,errtip = true} = options;

  uni.showLoading({
    title: tip||'loading',
    mask:mask
  })


  // if(!data._ajax)data._ajax=2;
  // if (!data.owner_id && owner_id)data.owner_id=owner_id;

  let token

  var header = {

    'Authorization':'Bearer '+token,
    "content-type": "application/x-www-form-urlencoded"
  };
  // if (wx.getStorageSync('cookie')) {
  //   header.Cookie = wx.getStorageSync('cookie')
  // }

  console.log('ajax url is '+data.act);

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
