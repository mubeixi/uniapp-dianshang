import Vue from 'vue'
import App from './App'

import store from './store';

import pagetitle from './pages/title/title.vue'
Vue.config.productionTip = false

import Common from './common/index.js';
import {GetQueryByString, ls} from "./common/tool";
Vue.use(Common);


// #ifdef H5
// var fundebug = require("fundebug-javascript");
// fundebug.apikey = "d9ecce9bd55749ebd486148b15e172c36198bb3ce03d0946d5969557f58f2985";

import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.init({
    apikey: "d9ecce9bd55749ebd486148b15e172c36198bb3ce03d0946d5969557f58f2985"
})
fundebugVue(fundebug, Vue);
require('fundebug-revideo');
// #endif

//加入mixin
// import {defaultMixin,aidMixin} from "./common/mixin";
// Vue.mixin(defaultMixin)
// Vue.mixin(aidMixin)


App.mpType = 'app'
// 使用pagetitle
Vue.component('page-title',pagetitle)

import TabbarComponents from './components/TabbarComponents.vue'
Vue.component('tabbar-components', TabbarComponents)

Vue.prototype.$vm = new Vue();
const app = new Vue({
    ...App,
    store
})
app.$mount()
