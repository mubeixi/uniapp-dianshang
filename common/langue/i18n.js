import { ls } from '../tool.js'

const T = {}
T.locale = null
T.locales = {}

T.registerLocale = function (locales) {
  T.locales = locales
}
// 设置语言
T.setLocale = function (code) {
  const _code = code || ls.get('language') || 'zh-cn'
  T.locale = _code
  ls.set('language', _code)
}

T._ = function (line, data) {
  const locale = T.locale
  const locales = T.locales
  if (locale && locales[locale] && locales[locale][line]) {
    if (data) {
      line = locales[locale][line][data]
    } else {
      line = locales[locale][line]
    }
    return line
  }

  return data
}

export default T
