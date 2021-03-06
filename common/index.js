import Vue from 'vue';

import filter from './filter.js';
import {ajax, get, post} from './interceptors.js';
import store from '../store';
import {ls} from "./tool";
import {domainFn} from "./filter";

// #ifdef H5
import wx from 'weixin-js-sdk';
// #endif

// const i18n = require('i18n');

//重写uni部分
require('./uni');

export const toast = (title, icon, image, duration) => {
    uni.showToast({
        title,
        duration: duration || 2000,
        icon,
        image
    })
}

/**
 * 根据长度会自动切换模式，优先保障显示所有文字
 * @param title
 * @param icon
 * @param duration
 */
export const error = (title, icon, duration) => {
    if (!title) return;
    if (title.length > 6) {
        //显示所有的问题
        toast(title, 'none', '', duration)
    } else {
        toast(title, 'none', '/static/icon_http_error.png', duration)
    }

}

export const tip = (title, icon, duration) => toast(title, 'none', '/static/icon_http_error.png', duration)

export const confirm = (options) => {

    return new Promise(function (resolve, reject) {

        uni.showModal({
            ...options,
            success: function (res) {
                if (res.confirm) {

                    resolve(res)
                } else if (res.cancel) {

                    reject(res)
                }
            },
            fail: function (res) {
                reject(res)
            }
        });

    })
}

/**
 * 检测是否登录
 * @param redirect
 * @return {boolean}
 */
export const checkIsLogin = (redirect, tip) => {
    let userInfo = store.state.userInfo || ls.get('userInfo')

    if (!userInfo || JSON.stringify(userInfo) === '{}') {

        //重置用户信息
        let users_id = ls.get('users_id');
        let owner_id = ls.get('owner_id');
        ls.clear();
        ls.set('owner_id', owner_id);
        ls.set('users_id', users_id);

        if (redirect) {

            if (!tip) {

                // #ifdef H5
                ls.set('login_farward_url', location.href);
                // return;
                // #endif

                uni.navigateTo({
                    url: '/pages/login/login'
                })
                return;
            }
            confirm({title: '提示', content: '该操作需要登录,请问是否登录?', confirmText: '去登录', cancelText: '暂不登录'}).then(() => {
                // #ifdef H5
                ls.set('login_farward_url', location.href);
                // #endif

                uni.navigateTo({
                    url: '/pages/login/login'
                })

            }).catch(() => {

            })
        }
        return false;
    }

    return true;
}

/**
 * 检测是否是分销商
 * @param redirect
 * @return {boolean}
 */
export const checkIsDistribute = (redirect, tip) => {

    //需要先确认是否已经登录了。。。。。

    let userInfo = store.state.userInfo || ls.get('userInfo')

    if (userInfo.Is_Distribute != 1) {
        if (redirect) {
            if (!tip) {
                uni.navigateTo({
                    url: '/pages/fenxiao/distributorCenter'
                })
                return;
            }

            const commi_rename = store.getters.commi_rename
            const commi = commi_rename.commi
            confirm({title: '提示', content: `该操作需要是${commi},请问是否成为${commi}?`, confirmText: '确定', cancelText: '暂不成为'}).then(() => {
                uni.navigateTo({
                    url: '/pages/fenxiao/distributorCenter'
                })

            }).catch(() => {

            })
        }
        return false;
    }

    return true;
}

/**
 * 根据拼团跳转不同的页面
 * @param id
 * @param is_group
 */
export const goProductDetail = (id, is_group) => {
    if (!id) return;

    //let path = '/pages/detail/detail';
    let path = is_group ? '/pages/detail/groupDetail' : '/pages/detail/detail';//根据不同路径跳转
    uni.navigateTo({
        url: path + '?Products_ID=' + id
    })
}

const tabbarRouter = ['/pages/index/index', '/pages/classify/classify', '/pages/detail/groupSuccess', '/pages/order/cart', '/pages/person/person', '/pages/fenxiao/fenxiao'];
const isHasTabbarRouter = (link) => {
    for (var item of tabbarRouter) {

        //反的了。。
        if (item.indexOf(link) != -1 || link.indexOf(item) != -1) {

            return true;
        }
    }
    return false;
}

export const linkTo =  (linkObj) => {

    let {link, linkType, ext = {}} = linkObj;
    if (!link) {
        //error('跳转地址为空')
        return;
    }

    //跳转到小程序
    if (linkType === 'mini') {

        let {url, appid, origin_id} = ext

        // #ifdef APP-PLUS
        if (!origin_id) {
            error('origin_id_缺失')
            return;
        }
        plus.share.getServices(function (s) {
            var shares = null;
            var sweixin = null;

            shares = {};
            for (var i in s) {
                var t = s[i];
                shares[t.id] = t;
            }
            sweixin = shares['weixin'];

            sweixin ? sweixin.launchMiniProgram({
                id: origin_id,
                path: link,
                webUrl: ext.url
            }) : toast('跳转小程序参数错误');

        }, function (e) {

            if (ext.url) {

            }
        });
        return;
        // #endif


        // #ifdef MP
        if (appid && link) {
            uni.navigateToMiniProgram({
                appId: appid,
                path: link,
                success(res) {
                    console.log(res)
                    // 打开成功
                },
                fail(err) {
                    const {errMsg='请联系客服'} = err
                    uni.showModal({
                        title:'跳转小程序错误',
                        content:errMsg
                    })
                    console.log(err)
                }
            })
            return;
        } else {
            error('小程序跳转参数错误')
        }
        return;
        // #endif

        // #ifdef H5
        if (url) {
            location.href = ext.url
        } else {
            error('小程序备用地址为空')
        }
        return;

        // #endif

        return;
    }


    //第三方链接
    if (linkType === 'third' || link.indexOf('http') !== -1) {

        // #ifndef H5

        uni.navigateTo({
            url: '/pages/common/webview?encode=1&url=' + encodeURIComponent(link)
        })
        // #endif


        // #ifdef H5
        location.href = link
        // #endif

        return;
    }

    if (link[0] != '/') {
        link = '/' + link;
    }
    //除了这些页面之外，其他都走普通跳转
    if (isHasTabbarRouter(link)) {

        uni.switchTab({
            url: link
        });

    } else {

        uni.navigateTo({
            url: link
        });

    }
}

/**
 * 打开客服
 */

export const contact = ()=>{
	let initData = store.state.initData || ls.get('initData');
	if(initData.kf_url){
		linkTo({linkType:'third',link:initData.kf_url})
	}else{
		error('暂未设置客服功能')
	}
}

export const fun = {
    domainFn,
    confirm,
    checkIsLogin,
    goProductDetail,
    checkIsDistribute,
    linkTo,
	contact,
    back: () => {
        uni.navigateBack()
    }
};



export default {
    install() {

        Vue.prototype.$post = post;
        Vue.prototype.$get = get;
        Vue.prototype.$http = ajax;

        Vue.prototype.$toast = toast;
        Vue.prototype.$error = error;

        // #ifdef H5
        Vue.prototype.$wx = wx;
        // #endif
        Vue.prototype.$fun = fun;
        filter.map((value) => {
            Vue.filter(value.name, value.methods);
        });
    },
};




