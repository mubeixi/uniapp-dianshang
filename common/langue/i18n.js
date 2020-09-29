import { ls } from '../tool.js'
import zh from './zh/resource.js'
import en from './en/resource.js'

const T = {}
T.locale = 'zh-cn'
T.locales = {
	'zh-cn':zh,
	'en-us':en
}
// 设置语言
T.setLocale = function (code) {
  const _code = code || ls.get('language') || 'zh-cn'
  T.locale = _code;
  ls.set('language', _code);
  const tabbarArr = [1794,1795,1796,1797];
  tabbarArr.forEach(function(item,index){
  	  uni.setTabBarItem({
  	  	  index:index,
  	  	  text:T._(item),
  		  fail:function(err){
  			  console.log(err)
  		  }
  	  })
  })
}
T.isPre = function(v){
	return T.locale === v
}  

T._ = function (index) {
    return T.locales[T.locale][index]
}

export default T
