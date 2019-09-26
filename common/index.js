import Vue from 'vue';
// const i18n = require('i18n');



import filter from './filter.js';


export const fun = {
  // success: ({ msg = '操作成功', title = '成功' }) => Notification({
  //   title,
  //   message: msg,
  //   type: 'success',
  // }),
  // warning: ({ msg = '', title = '警告' }) => Notification({
  //   title,
  //   message: msg,
  //   type: 'warning',
  // }),
  // info: ({ msg = '', title = '消息' }) => Notification({
  //   title,
  //   message: msg,
  //   type: 'info',
  // }),
  // error: ({ msg = '错误', title = '错误' }) => Notification({
  //   title,
  //   message: msg,
  //   type: 'error',
  // }),
  // Loading:({text = 'loading',fullscreen = false,lock = true,spinner = 'el-icon-loading',mask = false}) =>{
  //   window.funLoading = Loading.service({text,fullscreen,lock,spinner,background:mask?'rgba(0, 0, 0, 0.1)':null})
  //
  // },
  // close:()=>{window.funLoading.close()}

};
// console.log(filter)

import {post,get,ajax} from './interceptors.js';



export default {
  install() {
	  
    Vue.prototype.$post = post;
    Vue.prototype.$get = get;
    Vue.prototype.$http = ajax;
	
    // Vue.prototype.$loading = Loading.service;
    // Vue.prototype.$notify = Notification;
    // Vue.prototype.$message = Message;
    // Vue.prototype.$alert = MessageBox.alert;
    // Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$fun = fun;
    
    filter.map((value) => {
      Vue.filter(value.name, value.methods);
    });
  },
};
