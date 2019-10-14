import {fun} from "./index";

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 *
 * @param {*} str
 * @param {*} name
 */
export const GetQueryByString = (str, name) => {

  //获取？号出现几次
  var tempArr = str.split('?');
  // console.log(tempArr)
  // //如果大于1
  if (tempArr.length - 1 > 1) {
    var rt = null;
    for (var i in tempArr) {
      var s = tempArr[i]
      var reg1 = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r1 = s.match(reg1); //匹配目标参数
      if (r1 != null) {
        rt = decodeURIComponent(r1[2]);//一直覆盖，要最后的就行了
      }
    }

    return rt
  }

  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  if (!str.split("?")[1]) return null;
  var r = str.split("?")[1].match(reg); //匹配目标参数
  // console.log(r)
  if (r != null) {
    return decodeURIComponent(r[2]);

  }
  return null; //返回参数值

}


export const ls = {
  set(key, val) {

    if(!val && (val!=0 || val!= false))return false;

    return  uni.setStorageSync(key, val)
  },

  get(key) {
    var val = uni.getStorageSync(key);
    return val;
    // if(!val) return '';
    // try{
    //   return JSON.parse(val)
    // }catch (e) {
    //   return '';
    // }

  },
  remove(key) {
    return uni.removeStorageSync(key)
  },
  clear() {
    return uni.clearStorageSync()
  }
};

export const goBack=function(){
	uni.navigateBack({
	    delta: 1
	});
}

/**
 * 数组排序（值为number型）
 * arr 需要排序的数组
 * order_by   desc: 降续排列  asc: 升续排列
 * 默认为asc
 */
export const numberSort = function(arr, order_by) {
  if (typeof order_by != 'undefined' && order_by == 'desc') { //desc
    return arr.sort(function (v1, v2) { return v2 - v1; });
  } else {  //asc
    return arr.sort(function (v1, v2) { return v1 - v2; });
  }
}



// 会修改模板对象，将他没有的属性加上
function addFun(object, newobj) {
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if (typeof object[key] === 'object') {
      if (!newobj) continue;
      addFun(object[key], newobj[key]);
    } else if (typeof object[key] === 'function') {
      continue;
    } else {

      if (!newobj || !newobj[key]) continue;
      object[key] = newobj[key]
    }
  }
}

// 会修改原数据
// 浅拷贝对象。。
function obj2obj(o){
  return o;//JSON.parse(JSON.stringify(o))
}

/**
 *
 * @param current
 * @param newObj
 * @param strict 开启严格模式，模板值为false不copy
 */
function mergeData(current, newObj, strict) {
  for (const key in newObj) {
    if (!newObj.hasOwnProperty(key)) continue;
    if (strict && !newObj[key]) continue;

    if (typeof newObj[key] === 'object' && newObj[key] !== null) {

      //current[key] 可能是null或者undefined
      if (!current[key]) {
        Vue.set(current, key, obj2obj(newObj[key]));
        continue;
      }
      // @ts-ignore
      mergeData(current[key], newObj[key]);
    } else {
      if (!current) {
        current = obj2obj(newObj);
        continue;
      }


      // if (!current[key]) {
      //   Vue.set(current, key, newObj[key]);
      //   continue;
      // }

      Vue.set(current, key, obj2obj(newObj[key]));
    }
  }
}

/**
 * 深拷贝，将tmplObj的属性和方法，都和targetObJ混合，如目标对象无属性/方法则创建，如有则根据参数cover决定是否强制覆盖。
 * @param targetObj
 * @param tmplOjb
 * @param cover
 *
 * 一般来说，无脑深拷贝就行了
 */
function mergeObject(targetObj,tmplOjb,cover) {
  let obj = null;


  return obj;
}

/**
 * 深拷贝，解决引用的问题。
 * @param currentObj
 * @param newObject
 *
 * 不过很奇怪之前的人为什么要复制两遍
 */
export function deepCopy(currentObj, newObject) {
  addFun(currentObj, newObject);//方法则是保留本地的新建实例  new Search()这样
  // @ts-ignore
  // mergeData(currentObj, newObject);
  return currentObj;
}

export function deepCopyStrict(currentObj, newObject) {
  addFun(currentObj, newObject);
  // mergeData(currentObj, newObject, 1);
  return currentObj;
}



export const arrayUnique = (arr)=>{
  var res=[];
  for(var i=0,len=arr.length;i<len;i++){
    var obj = arr[i];
    for(var j=0,jlen = res.length;j<jlen;j++){
      if(res[j]===obj) break;
    }
    if(jlen===j)res.push(obj);
  }
  return res;
}


export function mixinStyle(defaultStyle, style) {
  if(!defaultStyle)defaultStyle={};
  if(!style)style={};

  let rt = objTranslate(defaultStyle)
  for(var i in style){
    if(!style.hasOwnProperty(i))continue;
    rt[i] = style[i]

  }
  return rt;
}


export function isWeiXin() {
  // #ifdef H5
  var ua = window.navigator.userAgent.toLowerCase();
  if (
	  ua.match(/MicroMessenger/i) == 'micromessenger'
	  && ua.match(/miniProgram/i)
	  && ua.match(/miniProgram/i)[0] == 'miniprogram'
  ) {
	return 'xcx'
  }
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
	return true;
  } else {
	return false;
  }
  // #endif

  // #ifndef H5
  return false
  // #endif

}



export const urlencode = (str)=>{

  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');

}
// base64
export const urlTobase64=function(url){
    uni.request({
	url: url,
	method:'GET',
	responseType: 'arraybuffer',
	success: ress => {
		let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64
		//base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
		return base64;
	}
    })
}
