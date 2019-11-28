import {getSystemConf, login} from "./fetch";
import {ls,GetQueryByString,isWeiXin} from "./tool";
import {domainFn} from "./filter";
import {checkIsLogin, error, fun} from "./index";
import {get_Users_ID} from "./fetch";
import { mapGetters, mapActions, Store } from "vuex";

import {isDev} from "./env";


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

//上报用户信息
import {upUserLog} from "./fetch";

function setWxConfig(config) {
	console.log('wx seting',config)
	wx.config(config);
}

export const WX_JSSDK_INIT = (vm,jsApiListList) => new Promise((resolve, reject) => {

	if(!isWeiXin())reject(false);

	if(vm.JSSDK_READY){
		console.log('wx env already ready')
		resolve(wx);
	}

	getJsSign({
		url:location.href.split('#')[0],
		//debug : process.env.NODE_ENV === 'production' ? false : true
	},{errtip:false}).then((res) => {
		if(res.errorCode === 0){

			let config = res.data;
			//线上环境，听服务器的，本地的一律调试
			let debug = false;//process.env.NODE_ENV === 'production'?config.debug?true:false:true
			let jsApiList = jsApiListList?jsApiListList:['onMenuShareAppMessage','onMenuShareTimeline','openLocation','getLocation'];
			// ['chooseImage', 'previewImage', 'uploadImage', 'openLocation','getLocation', 'chooseWXPay', 'getSystemInfo', 'onMenuShareAppMessage','onMenuShareTimeline','scanQRCode'];
			let {noncestr,timestamp,appId,signature} = config;

			setWxConfig({debug,appId,timestamp,nonceStr:noncestr,signature,jsApiList});

			wx.ready(function(){

				vm.JSSDK_READY = true;
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

import {buildSharePath} from "./tool";

/**
 *
 * @type {{methods, onLoad(*): (undefined), mounted(): void}}
 */
export const pageMixin = {
	data: function () {
		return {
			//是否需要刷新配置，可以实现页面级配置
			refreshInit:false,
			// #ifdef H5
			JSSDK_READY:false,
			JSSDK_INIT:true,//是否需要微信签名
			// #endif

		}
	},
	//option为object类型，会序列化上个页面传递的参数
	//页面的初始化
	onLoad(option) {

		let owner_id = null,users_id = null
		// #ifdef H5

		/*商户id机制*/
		users_id = GetQueryByString(location.href, 'users_id')
		//如果连接里面已经有了，就不需要搞事
		if(users_id){

			//比较新旧users_id
			//只有h5有这个问题，app和小程序都是有单独分配的
			let old_users_id = ls.get('users_id')

			ls.set('users_id',users_id);

			console.log(1111111111111)

			if(old_users_id && old_users_id!=users_id){
				console.log('清空本地配置和登录信息')
				this.setUserInfo({})
				this.setInitData(null)
				getSystemConf({}).then(res=>{
					this.setInitData(res.data)
				})

			}

		}else{
		    users_id = ls.get('users_id');
		}

		if (users_id) {

			if(!GetQueryByString(location.href, 'users_id')){
				let search = location.search;

				if(search.indexOf('?')===-1){
					search += '?users_id='+users_id
				}else{
					search = search.replace(/\?/,'?users_id='+users_id+'&')
				}
				location.search = search
			}

		}else{
		    uni.showModal({
		        title: '提示',
		        content: '缺少商户id',
		        success: function (res) {
		        }
		    });
		}

		/*owner_id 机制*/
		owner_id = GetQueryByString(location.href, 'owner_id')
		//console.log(owner_id)
		// #endif

		// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO

		/*users_id*/
		users_id = option.users_id
		//如果连接里面已经有了，就不需要搞事
		if(users_id){
			ls.set('users_id',users_id);
		}else{
			users_id = ls.get('users_id');
		}

		if (!users_id){
			uni.showModal({
				title: '提示',
				content: '缺少商户id',
				success: function (res) {
				}
			});
		}

		/*owner_id 机制*/
		owner_id = option.owner_id
		// #endif

		//如果连接里面已经有了，就不需要搞事
		if(owner_id || owner_id==0){
			ls.set('owner_id',owner_id);
			console.log('this page owner_id is '+owner_id)
		}


    },

	async created(){
		// console.log('让你等')
		//
		// await new Promise(resolve => {
		// 	setTimeout(function () {
		// 		console.log('等到了')
		// 		resolve(false)
		// 	},5000)
		// })


		// #ifdef H5
		//微信里面强制刷新
		if(isWeiXin()){
			this.refreshInit = true
		}
		// #endif


		//根据配置决定是否刷新配置
		let initData = await this.getInitData(this.refreshInit)
		// console.log('get initdata',initData)
		// this.initData = initData;

		// #ifdef H5
		console.log(2222222222222)
		// let users_id = GetQueryByString(location.href, 'users_id')
		// //如果连接里面已经有了，就不需要搞事
		// if(users_id){
		//
		// 	//比较新旧users_id
		// 	//只有h5有这个问题，app和小程序都是有单独分配的
		// 	let old_users_id = ls.get('users_id')
		//
		// 	ls.set('users_id',users_id);
		//
		// 	if(old_users_id && old_users_id!=users_id){
		// 		console.log('清空本地配置和登录信息')
		// 		this.setUserInfo({})
		// 		getSystemConf({}).then(res=>{
		// 			this.setInitData(res.data)
		// 		})
		//
		// 	}
		//
		// }


		if(checkIsLogin() && !sessionStorage.getItem('is_send_usrlog')){
			upUserLog({},{errtip:false}).then(res=>{
				sessionStorage.setItem('is_send_usrlog',1)
			},err=>{console.log('error',err)}).catch(e=>{console.log('catch',e)})
		}

		//页面默认全都是分享出去是首页的
		if(isWeiXin() && this.JSSDK_INIT){

			await this.WX_JSSDK_INIT(this).then((env)=>{

				this.$wx.onMenuShareTimeline({
					title: initData.ShopName, // 分享标题
					link: buildSharePath(initData.front_url), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: domainFn(initData.ShareLogo), // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
					}
				});

				//两种方式都可以
				this.$wx.onMenuShareAppMessage({
					title: initData.ShopName, // 分享标题
					link: buildSharePath(initData.front_url), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: domainFn(initData.ShareLogo), // 分享图标
					desc: initData.ShareIntro,
					type: 'link', // 分享类型,music、video或link，不填默认为link
					// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
					}
				});

			})
		}
		// #endif

	},
    mounted() {
    },
    methods:{
		// #ifdef H5
		WX_JSSDK_INIT,
		// #endif
        ...mapActions(['getInitData','setUserInfo','getUserInfo','setInitData'])
    },
	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	onShareAppMessage(){

		let initData = this.getInitData()
		let path = '/pages/index/index';
		let shareObj = {
			title: initData.ShopName,
			desc:initData.ShareIntro,
			imageUrl:domainFn(initData.ShareLogo),
			path: buildSharePath(path)
		};
		return shareObj
	},
	// #endif
}


/**
 * 支付的混合类
 * @type {{}}
 */
export const payMixin = {
	methods:{

	},
	created() {

		// #ifdef H5

		if (isWeiXin()) {
			this.code = GetQueryByString(location.href, 'code');
			console.log(this.code)
			if (this.code) {

				this.pay_type = 'wx_mp';//需要手动设置一下
				// console.log(this.pay_type)
				// ls.set('code',this.code)
				this.self_orderPay(1);
			}
		}
		// #endif

	},
}



/**
 * 扫描二维码
 */

export const scanMixin = {
	data(){
		return {
			originData:''//扫码得到的原始数据，格式  act##dataString 其中dataString可能是单独的值或者 name::val;;name::val;;name::val;;name::val这样的键值对
		}
	},
	methods:{
		/**
		 *唤起不同终端的二维码，并且返回返回内容
		 * @param needResult 是由微信处理还是自定义业务 微信wap专用
		 * @param onlyFromCamera 是否只允许摄像头扫描 微信wap之外可以用
		 * @param barCode  支持条码扫描 微信wap专用
		 * @param qrCode 支持二维码 微信wap专用
		 * @return {Promise<unknown>}
		 */
		openScanFn(needResult,onlyFromCamera,barCode,qrCode){

			console.log(arguments)
			return new Promise((resolve, reject) => {

				// #ifdef H5
				if(!isWeiXin()){
					reject('请在微信中打开此页面')
				}

				let scanType = []
				if(barCode)scanType.push('barCode')
				if(qrCode)scanType.push('qrCode')

				WX_JSSDK_INIT(this).then(wxEnv=>{
					wxEnv.scanQRCode({
						needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType, // 可以指定扫二维码还是一维码，默认二者都有
						success: function (res) {
							var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
							resolve(result)
						},
						fail:function(err){
							reject(err)
						}
					});
				})
				// #endif

				// #ifndef H5
				console.log('手机扫码')
				// 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera,
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);

						resolve(res.result)
					},
					fail:function(err){
						reject(err)
					}
				});
				// #endif



			})
		},
		translateQrData(origin){
			if(!origin){
				error('信息为空');
				return;
			}

			const dataArr = origin.split('##')
			if(dataArr.length<2){
				error('信息有误');
				return;
			}
			let act = dataArr[0];
			const valArr = dataArr[1].split(';;')

			let valObj = {}
			for(var valStr of valArr){
				let tempArr = valStr.split('::')
				valObj[tempArr[0]] = tempArr[1]
			}
			return {act,params:valObj}
		}
	}
}
