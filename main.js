import Vue from 'vue'
import App from './App'
import store from './store'
import './common'

// 全局组件
import pagetitle from '@/components/title'
import ModelComponents from '@/components/ModelComponents'
Vue.component('page-title', pagetitle)
Vue.component('wzw-dialog', ModelComponents)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
