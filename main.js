import Vue from 'vue'
import App from './App'
import store from './store'
import './common'

import T from './common/langue/i18n'
import locales from './common/langue/locales'

// 设置语言
T.registerLocale(locales)
T.setLocale()

// 全局组件
import pagetitle from '@/components/title'
import LayoutModal from '@/components/layout-modal/layout-modal'
Vue.component('page-title', pagetitle)
Vue.component('wzw-dialog', LayoutModal)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
