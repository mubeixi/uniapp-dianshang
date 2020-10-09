import Vue from 'vue'
import App from './App'
import store from './store'
import './common'

import T from '@/common/langue/i18n'
T.setLocale()
Vue.prototype.$p = T.isPre;
Vue.prototype.$t = T._;
// 全局组件
import pagetitle from '@/components/title'
import LayoutModal from '@/components/layout-modal/layout-modal'
Vue.component('page-title', pagetitle)
Vue.component('wzw-dialog', LayoutModal)

Vue.config.productionTip = false

//重写uni.showModal适配国际化
Vue.showModal = uni.showModal;
uni.showModal = function(object) {
	Vue.showModal({
		'confirmText': T._('determine'),
		'cancelText': T._('cancel'),
		...object
	})
}

Vue.directive('enterNumber', {
	inserted: function(el) {
		el.addEventListener("keypress", function(e) {
			e = e || window.event;
			let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
			let re = /\d/;
			if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
			}
		});
	}
});


App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
