import Vue from 'vue'
import App from './App'
import pagetitle from './pages/title/title.vue'
Vue.config.productionTip = false




App.mpType = 'app'
// 使用pagetitle
Vue.component('page-title',pagetitle)
const app = new Vue({
    ...App
})
app.$mount()
