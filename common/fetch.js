import Vue from 'vue';
import { baseApiUrl,apiKey } from './env.js';
import {hexMD5} from "./tool/md5";
// require('./tool/base64');
import Base64 from './tool/base64.js'

import {ls} from "./tool.js";
import {post,get,ajax} from './interceptors.js';



const fetch = function (act, param,options = false,url='/api/little_program/shopconfig.php',  method = 'post') {
  if(!act){
	  uni.showToast({
	      title: 'act参数必传',
		  mask:true,
	      duration: 2000
	  });
	  return;
  };

  param.act = act;
  // param.Users_Account = get_Users_Account();
  // param.Users_ID = get_Users_ID();  Users_ID  写死
  // param.appid = get_Appid();

  // 数据加密
  let data = createToken(param);

  
  // console.log(url,param);

  
  return ajax(url,method,data, options).then(res => res.data, e => e);

};


export const login = (data,options) => fetch('users_login', data,options)

export const getCouponList = (data,options) => fetch('get_unaccalimed_coupon',data,options)

export const getProductList = (data,options) => fetch('get_prod',data,options)

export const getShopSkinList = (data,options) => fetch('get_shopskin',data,options)

export const chooseShopSkin = (data,options) => fetch('choose_shopskin',data,options)

//获取商城的配置
export const getSkinConfig = (data,options) => fetch('get_shophome',data,options)

//更新商城的配置
export const setSkinConfig = (data,options) => fetch('update_shophome',data,options)
//获取商品列表
export const getProductCategory = (data,options) => fetch('pro_cate',data,options)
// 获取购物车信息
export const getCart = (data,options) => fetch('get_cart',data,options)
// 获取普通产品
export const getProd = (data,options) => fetch('get_prod',data,options)














function get_Appid() {
  return 'xhh';
}

export const get_Users_ID = ()=>ls.get('Users_ID')

export const get_Users_Account= ()=>ls.get('Users_Account')

export const createToken = function(object) {
  object = ObjectToArr(object);
  var signString = ObjectToString(object);
  signString = signString.slice(0, -1);
  var timestamp = parseInt(new Date().getTime() / 1000).toString();
  var key = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';
  var dataStr = signString + key + timestamp;
  // console.log(Base64)
  var sign = hexMD5(Base64.toBase64(dataStr)).toUpperCase();
  object['timestamp'] = timestamp;
  object['sign'] = sign;
  object['sortToken'] = 1;
  return object;
}

//对象转数组，并排序
function ObjectToArr(object, addkey) {
  addkey = addkey || '';
  var arrs = {};
  for (var i in object) {
    var newkey = addkey + (addkey === '' ? i : '[' + i + ']');
    if (typeof object[i] !== 'object') {
      if (object[i] !== '') {
        if (i !== 'timestamp' && i !== 'sign' && i !== 'sortToken') {
          arrs[newkey] = object[i];
        }
      }
    } else {
      this.ObjectToArr(object[i], newkey);
    }
  }
  var newkey_1 = Object.keys(arrs).sort();
  var newObj = {};//创建一个新的对象，用于存放排好序的键值对

  // 此处不能使用for..in
  newkey_1.forEach(function (val) {
    newObj[val] = arrs[val];//向新创建的对象中按照排好的顺序依次增加键值对
  });
  return newObj;
}

//对象转字符串
function ObjectToString(object, arrs) {
  arrs = arrs || '';
  for (var i in object) {
    if (typeof object[i] !== 'object') {
      if (object[i] !== '') {
        if (i !== 'timestamp' && i !== 'sign') {
          arrs += object[i] + ',';
        }
      }
    } else {
      arrs += this.ObjectToString(object[i], arrs);
    }
  }
  return arrs;
}
