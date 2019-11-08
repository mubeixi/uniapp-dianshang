import {error, fun} from "./index";
import { staticUrl } from './env.js';
import {get_Users_ID,GET_ENV,uploadImage} from "./fetch";


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

//上传图片
export const uploadImages=(formData,imgs)=>{
	let sum=0;
	let arr=[];
	let that=this;
	formData.env=GET_ENV();
	for(let i=0;i<imgs.length;i++){
		// #ifdef MP-TOUTIAO
			let fileCTX = tt.getFileSystemManager()
			console.log(fileCTX);
			fileCTX.readFile({
				filePath:imgs[i],
				encoding:'base64',
				success(ret) {
					console.log("222222222222222222")
					let imgs='data:image/jpeg;base64,'+ret.data;
					uploadImage({'image':imgs}).then(result=>{	 
						console.log("33333333333333333333333333333333333333")
						 arr.push(result.data.path);
					   },err=>{
						   
					   }).catch(e=>{
						   
					   })
				},
				fail(ret) {
				  console.log(ret,`run fail`);
				},
				complete(ret) {
				  console.log(`run done`);
				}
			})
		// #endif
		// #ifndef MP-TOUTIAO
			uni.uploadFile({
					url: staticUrl+'/api/little_program/shopconfig.php',
					filePath: imgs[i],
					name: 'image',
					formData: formData,
					success: (uploadFileRes) => {
						sum++;
						let msg=JSON.parse(uploadFileRes.data);
						console.log(msg)
						arr.push(msg.data.path);
						if(sum==imgs.length){
							uni.showToast({
								title:msg.msg
							})
							if(msg.errorCode==0){
			
							}else{
			
							}
			
						}
					}
			})
		// #endif
	}
	console.log(arr)
	return arr;
}



export const urlencode = (str)=>{

  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');

}



//构造分享事件
/**
 *
 * @param path 这个里面无需传owenr_id和users_id
 * @return {string}
 */
export const buildSharePath = (path)=>{

    let users_ID = ls.get('users_id');
    let userInfo = ls.get('userInfo');

    console.log(userInfo,users_ID)
    let search = '';

    if(path.indexOf('users_id')===-1){
        search += (users_ID?('users_id='+users_ID):'')
    }



    if(path.indexOf('owner_id')===-1){

        let owner_id = 0;
        if(userInfo.User_ID && userInfo.Is_Distribute===1){
            owner_id = userInfo.User_ID
        }
        search += ('&owner_id='+owner_id)
    }


    let ret = ''
    if(path.indexOf('?')!=-1){
        ret = path + (search?'&':'')+search
    }else{
        ret = path + (search?'?':'')+search
    }


    console.log(ret)
    if(ret.indexOf('users_id')===-1){
        error('组建分享参数失败');
        throw "必须有users_id"
    }

    return ret
}




/**
 *获取商品缩略图
 * @param img
 * @param size n3最小
 */
export const getProductThumb = (img,size) => {
    if(!size)size ='n3';

    let tempArr = img.split('/');
    let name = tempArr.pop();
    name = size+'/'+name;

    return [...tempArr,name].join('/')

}

// const year = date.getFullYear()
// const month = date.getMonth() + 1
// const day = date.getDate()
// const hour = date.getHours()
// const minute = date.getMinutes()
// const second = date.getSeconds()
//
// return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

// function stampByPhp2js(s){
//     return s.toString().length === 10 ?s*1000:s
// }
/**
 *pintuan_start_time
 * @param current 开始的时间，如果不传入，则用现在的时间
 * @param end_timeStamp
 */
export const getGroupCountdown = ({end_timeStamp = 1571221631,current = (new Date()).getTime()} = {}) => {

    let {d=0,h=0,m=0,s=0} = {};
    //时间戳格式转换
    current = parseInt(current/1000)

    // console.log(end_timeStamp,current)
    let countTime = end_timeStamp - current
    if(countTime<0){
        console.log('已经结束')
        return false
    };

    d = parseInt(countTime/(60*60*24))
    h = parseInt((countTime-d*60*60*24)/(60*60))
    m = parseInt((countTime-d*60*60*24-h*60*60)/60)
    s = countTime-d*60*60*24-h*60*60-m*60

    return {d,h,m,s}

}

// export const getCountdownByJoin = ({end_timeStamp = 1571221631,current = (new Date()).getTime()} = {}) => {
//
//     let {d=0,h=0,m=0,s=0} = {};
//     //时间戳格式转换
//     current = parseInt(current/1000)
//
//     // console.log(end_timeStamp,current)
//     let countTime = end_timeStamp - current
//     if(countTime<0){
//         console.log('已经结束')
//         return false
//     };
//
//
//     h = parseInt((countTime)/(60*60))
//     m = parseInt((countTime-h*60*60)/60)
//     s = countTime-h*60*60-m*60
//
//     return {h,m,s}
//
// }



export const getCountdownFunc = ({start_timeStamp,end_timeStamp,current = (new Date()).getTime()} = {}) => {

    let {d=0,h=0,m=0,s=0} = {};


    //时间戳格式转换
    current = parseInt(current/1000)

    // console.log(end_timeStamp,current)
    let countTime = 0,is_start = false;


    //还没开始
    if(start_timeStamp>current && end_timeStamp>current){
        console.log('还没开始')
        countTime = start_timeStamp-current;

    }else if(end_timeStamp>current && start_timeStamp<current){
        //还在进行中
        //console.log('还在进行中')
        is_start = true;
        countTime = end_timeStamp-current;
    }else{
        console.warn('活动信息无效');
        // throw "活动信息无效";
    }

    d = parseInt(countTime/(60*60*24))
    h = parseInt((countTime-d*60*60*24)/(60*60))
    m = parseInt((countTime-d*60*60*24-h*60*60)/60)
    s = countTime-d*60*60*24-h*60*60-m*60

    return {d,h,m,s,is_start}
}
