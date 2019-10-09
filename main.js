import Vue from 'vue'
import App from './App'
import pagetitle from './pages/title/title.vue'
Vue.config.productionTip = false

import Common from './common/index.js';
Vue.use(Common);

//加入mixin
import {defaultMixin} from "./common/mixin";
Vue.mixin(defaultMixin)


App.mpType = 'app'
// 使用pagetitle
Vue.component('page-title',pagetitle)

const app = new Vue({
    ...App
})
app.$mount()
