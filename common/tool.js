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
  console.log(tempArr)
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
  console.log(r)
  if (r != null) {
    return decodeURIComponent(r[2]);

  }
  return null; //返回参数值

}


export const ls = {
  set(key, val) {
    //Null undefined '' 这些不让传进来了
    if(!val && (val!=0 || val!= false))return false;
    return  uni.setStorageSync(key, JSON.stringify(val))
  },

  get(key) {
    var val = uni.getStorageSync(key);
    if(!val) return false;
    try{
      return JSON.parse(val)
    }catch (e) {
      return false;
    }

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