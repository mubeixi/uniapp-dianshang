import * as ENV from './env.js';

import {error} from "./index";
import {ls} from "./tool.js";
/**
 *
 * @param url
 * @param method
 * @param data
 * @param options
 * @return {Promise<unknown>}
 */
import store from '../store'

export const ajax = (url, method, data, options) => {

    if (!options) options = {}
    if (!data) data = {}


    let {tip = '', mask = false, timelen = 2000, timeout = 2000, errtip = false} = options;

    if (tip) {
        uni.showLoading({
            title: tip,
            mask: mask
        })
    }

    let token

    var header = {

        'Authorization': 'Bearer ' + token,
        "content-type": "application/x-www-form-urlencoded"
    };


    // #ifdef MP-TOUTIAO || APP-PLUS

    // #endif
    let URL = ''
    // #ifdef H5
    URL = url; //直接用绝对目录,这样就可以随便部署在任意域名下,会默认读取host/api/xxx接口
    // #endif

    // #ifndef H5
    URL = ENV.apiBaseUrl + url;
    // #endif


    const hookErrorCode = [0, 88001, 66001];

    return new Promise((resolve, reject) => {

        uni.request({
            header,
            url: URL,
            method,
            data,
            success: (ret) => {

                if (ret.statusCode !== 200 || typeof ret.data != 'object') {
                    error('服务器去旅行了')
                }
                let res = ret.data;

                // #ifdef MP-TOUTIAO || APP-PLUS
                // #endif


                if (res.hasOwnProperty('errorCode') && hookErrorCode.indexOf(res.errorCode) != -1) {
                    if (res.errorCode === 66001) {
                        console.log(JSON.stringify(store.state.lockToLogin))
                        //为了避免多个请求
                        if(!store.state.lockToLogin){
                            store.state.lockToLogin = true
                            error(res.msg)

                            //重置用户信息
                            store.commit('SET_USER_INFO',{})
                            // #ifdef H5
                            sessionStorage.removeItem('is_send_usrlog')
                            // #endif
                            store.commit('SET_USER_INFO', {})
                            store.commit('SET_STORES_ID', null)
                            console.log('66001跳转',url,data)
                            uni.navigateTo({
                                url: '/pages/login/login',
                                success:()=>{
                                    //ls.remove('lockToLogin')
                                }
                            })
                        }

                        return;
                    }
                    resolve(res)
                } else {
                    if (res.hasOwnProperty('errorCode') && res.msg) {
                        if (errtip) error(res.msg)
                    } else {
                        error('请求未成功')
                    }
                    console.log('ajax error',JSON.stringify(res))

                    reject(res)
                }


            },
            fail: (e) => {
                reject(e)
                console.log('http error',JSON.stringify(e))
            },
            complete: () => {
                if (tip) {
                    setTimeout(function () {
                        uni.hideLoading()
                    }, 500)

                }


            }
        })



    })

}

export const post = (url, data, options) => {
    return ajax(url, 'post', data, options)
}


export const get = (url, data, options) => {
    return ajax(url, 'get', data, options)
}


module.exports = {
    post, get, ajax
}
