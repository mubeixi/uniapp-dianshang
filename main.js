import Vue from 'vue'
import App from './App'
import store from './store';



// import {isDev} from "./common/env";

Vue.config.productionTip = false

// import {GetQueryByString, ls} from "./common/tool";
import Common from './common/index.js';
Vue.use(Common);

//引入组件
import ModelComponents from "./components/ModelComponents";
Vue.component('wzw-dialog',ModelComponents)



// #ifdef H5

// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
//
// fundebug.init({
//     apikey: "61884c104ad275ca895d62af695b5f1aaef3f4f382fd392627e239b7e24a6583"
// })
// fundebugVue(fundebug, Vue);
// require('fundebug-revideo');

// #endif

//加入mixin
// import {defaultMixin,aidMixin} from "./common/mixin";
// Vue.mixin(defaultMixin)
// Vue.mixin(aidMixin)


App.mpType = 'app'

// 使用pagetitle
import pagetitle from './pages/title/title.vue'
Vue.component('page-title',pagetitle)

// import TabbarComponents from './components/TabbarComponents.vue'
// Vue.component('tabbar-components', TabbarComponents)

Vue.prototype.$vm = new Vue();



const app = new Vue({
    ...App,
    store
})
app.$mount()
