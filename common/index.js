import Vue from 'vue';
// const i18n = require('i18n');

export const toast = (title,icon,image,duration)=>{

    uni.showToast({
        title,
        duration:duration||2000,
        icon,
        image
    })

}

export const error = (title,icon,duration)=>toast(title,null,'/static/icon_http_error.png',duration)




export const confirm = (options)=>{

	return new Promise(function(resolve,reject){

		uni.showModal({
		    ...options,
		    success: function (res) {
		        if (res.confirm) {
		            resolve(res)
		        } else if (res.cancel) {
		            //console.log('用户点击取消');
		        }
		    },
			fail:function(res){reject(res)}
		});

	})
}


import filter from './filter.js';

const tabbarRouter = ['/pages/index/index','/pages/classify/classify','/pages/groupSuccess/groupSuccess','/pages/cart/cart','/pages/person/person'];

export const fun = {

  //跳转方法
  linkTo:(linkObj) => {

    let {link,linkType} = linkObj;
    console.log('跳转link:'+link+'===type:'+linkType)
    //除了这些页面之外，其他都走普通跳转
    if(tabbarRouter.indexOf(link)!=-1){

      uni.switchTab({
        url: link
      });

    }else{

      uni.navigateTo({
        url: link
      });

    }
  },
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
  // info: ({ msg = ''}) => uni.showToast({
  //     title: msg,
  //     duration: 2000,
  //     icon:'none'
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
import {GetQueryByString, ls} from "./tool";



//重写navigateTo
let navigateTOCopy = uni.navigateTo;

uni.navigateTo = (opt)=>{


    let {url} = opt;
    if(url.indexOf('users_id')===-1){

        let users_id = null;

		// #ifdef H5
		users_id = GetQueryByString(location.href, 'users_id')
		// #endif
        

        //如果连接里面已经有了，就不需要搞事
        if(!users_id){

            users_id = ls.get('users_id');

            if (users_id) {

                if(url.indexOf('?')===-1){
                    url += '?users_id='+users_id
                }else{
                    url.replace(/\?/,'?users_id='+users_id+'&')
                }

            }
        }

        console.log('users_id is'+users_id)
    }

    let endOpt = {...opt,url}
    console.log('endOpt is ',endOpt)
    navigateTOCopy(endOpt)

}



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
