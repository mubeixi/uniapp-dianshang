import { ls } from '../tool.js'

const T = {}
T.locale = null
T.locales = {}

T.registerLocale = function (locales) {
  T.locales = locales
}
// 设置语言
T.setLocale = function (code) {
  const _code = "zh-cn";
  T.locale = _code
  ls.set('language', _code)
}

T._ = function (line, data) {
  const locale = T.locale
  const locales = T.locales
  if (locale && locales[locale] && locales[locale][line]) {
    if (data) {
      // 对应的值不存在则使用原值
      line = locales[locale][line][data] ? locales[locale][line][data] : data
    } else {
      line = locales[locale][line]
    }
    return line
  }
  return data
}

export default T
