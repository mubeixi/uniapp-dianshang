import Vue from 'vue'
import App from './App'

import store from './store';

import pagetitle from './pages/title/title.vue'
Vue.config.productionTip = false

import Common from './common/index.js';
import {GetQueryByString, ls} from "./common/tool";
Vue.use(Common);



//加入mixin
// import {defaultMixin,aidMixin} from "./common/mixin";
// Vue.mixin(defaultMixin)
// Vue.mixin(aidMixin)


App.mpType = 'app'
// 使用pagetitle
Vue.component('page-title',pagetitle)
Vue.prototype.$vm = new Vue();
const app = new Vue({
    ...App,
    store
})
app.$mount()
