import {login} from "./fetch";
import {ls,GetQueryByString,isWeiXin} from "./tool";
import {error} from "./index";

import { mapGetters, mapActions, Store } from "vuex";

/**
 * 很多接口都需要user_id,先全局mixin下
 */
export const defaultMixin = {
    created() {

    },

}

// #ifdef H5
import {getJsSign} from "./fetch";
import wx from 'weixin-js-sdk';

function setWxConfig(config) {
	// console.log('wx seting',config)
	wx.config(config);
}


/**
 * WX_JSSDK_INIT().then((wxEnvObj)=>{
 *     //do something
 *     //wxEnvObj 不用
 *     //this.$wx在微信环境下，会自动挂载.全局直接用
*     this.$wx.onMenuShareTimeline({
		title: _self.goods.goods_title, // 分享标题
		link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: _self.goods.goods_logo, // 分享图标
		success: function() {
		  // 用户点击了分享后执行的回调函数
		}
	  });

	  this.$wx.onMenuShareAppMessage({
		title: _self.goods.goods_title, // 分享标题
		desc: _self.goods.goods_desc || '更大牌美衣尽在',
		link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: _self.goods.goods_logo, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function() {
		  // 用户点击了分享后执行的回调函数
		}
	  });
 * })
 * @return {Promise<unknown>}
 * @constructor
 */
const WX_JSSDK_INIT = () => new Promise((resolve, reject) => {

	if(!isWeiXin())return;
	getJsSign({
		url:location.href.split('#')[0],
		//debug : process.env.NODE_ENV === 'production' ? false : true
	}).then((res) => {

		if(res.errorCode === 0){


			let config = res.data;

			//线上环境，听服务器的，本地的一律调试
			config.debug = process.env.NODE_ENV === 'production'?config.debug?true:false:true

			config.jsApiList = ['chooseImage', 'previewImage', 'uploadImage', 'openLocation',
				'getLocation', 'chooseWXPay', 'getSystemInfo', 'onMenuShareAppMessage','onMenuShareTimeline','scanQRCode'];

			delete config.jsapi_ticket;
			setWxConfig(config);

			wx.ready(function(){

				console.log('wx ready')
				//将微信这个变量传进去，所以在页面就不需要传了
				resolve(wx);
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			});


		}else{
			reject(false)
		}
	}).catch(res=>{
		reject(false)
	})


})
// #endif


// const muliteShareFunc = async(channel,type,title,summary,href,imageUrl,scall,ecall) => {
//
//
//
// }

/**
 *
 * @type {{methods, onLoad(*): (undefined), mounted(): void}}
 */
export const pageMixin = {
	data: function () {
		return {
			// #ifdef H5
			JSSDK_INIT:false,//是否需要微信签名
			// #endif

		}
	},
	//页面的初始化
    onLoad(option) {

		if(!ls.get('initData')){
		    this.getInitData()
		}


		let order_id = null

		// #ifdef H5

		//商户id机制
		let users_id = GetQueryByString(location.href, 'users_id')

		//如果连接里面已经有了，就不需要搞事
		if(users_id){
		    ls.set('users_id',users_id);
		    console.log('this page users_id is '+users_id)
		    return;
		}else{
		    users_id = ls.get('users_id');
		}


		if (users_id) {

		    let search = location.search;

		    if(search.indexOf('?')===-1){
		        search += '?users_id='+users_id
		    }else{
				search = search.replace(/\?/,'?users_id='+users_id+'&')
		    }

		    console.log(search)

		    location.search = search
			console.log(location.search)
			return;

		}else{
		    uni.showModal({
		        title: '提示',
		        content: '缺少商户id',
		        success: function (res) {
		        }
		    });
		}


		//order_id 机制
		order_id = GetQueryByString(location.href, 'order_id')

		//如果连接里面已经有了，就不需要搞事
		if(order_id){
		    ls.set('order_id',order_id);
		    console.log('this page order_id is '+order_id)
		    return;
		}
		// #endif


		// #ifndef H5

		//option为object类型，会序列化上个页面传递的参数
		//order_id 机制
		order_id = option.order_id
		//如果连接里面已经有了，就不需要搞事
		if(order_id){
		    ls.set('order_id',order_id);
		    console.log('this page order_id is '+order_id)
		    return;
		}
		// #endif

    },
	async created(){

		// #ifdef H5
		//需要签名的页面，第一时间就可以了。
		this.JSSDK_INIT && await WX_JSSDK_INIT()
		// #endif

	},
    mounted() {

		// #ifndef H5
		uni.getProvider({
		    service: 'share',
		    success: function (res) {
		        console.log(res.provider)
		        if (~res.provider.indexOf('qq')) {
		            uni.login({
		                provider: 'qq',
		                success: function (loginRes) {
		                    console.log(JSON.stringify(loginRes));
		                }
		            });
		        }
		    }
		});
		// #endif

    },
    methods:{
        ...mapActions(['getInitData'])
    }
}
