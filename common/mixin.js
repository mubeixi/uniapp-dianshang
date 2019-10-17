import {login} from "./fetch";
import {ls,GetQueryByString,isWeiXin} from "./tool";
import {domain} from "./filter";
import {error} from "./index";
import {get_Users_ID} from "./fetch";
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
	console.log('wx seting',config)
	wx.config(config);
}


const WX_JSSDK_INIT = (vm) => new Promise((resolve, reject) => {

	if(!isWeiXin())reject(false);

	if(vm.JSSDK_READY){
		console.log('wx env already ready')
		resolve(wx);
	}

	getJsSign({
		url:location.href.split('#')[0],
		//debug : process.env.NODE_ENV === 'production' ? false : true
	}).then((res) => {
		if(res.errorCode === 0){

			let config = res.data;
			//线上环境，听服务器的，本地的一律调试
			let debug = process.env.NODE_ENV === 'production'?config.debug?true:false:true
			let jsApiList = ['chooseImage', 'previewImage', 'uploadImage', 'openLocation',
				'getLocation', 'chooseWXPay', 'getSystemInfo', 'onMenuShareAppMessage','onMenuShareTimeline','scanQRCode'];
			let {noncestr,timestamp,appId,signature} = config;

			setWxConfig({debug,appId,timestamp,nonceStr:noncestr,signature,jsApiList});

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


// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
import {buildSharePath} from "./tool";
// #endif
/**
 *
 * @type {{methods, onLoad(*): (undefined), mounted(): void}}
 */
export const pageMixin = {
	data: function () {
		return {
			// #ifdef H5
			JSSDK_READY:false,
			JSSDK_INIT:true,//是否需要微信签名
			// #endif

		}
	},
	//option为object类型，会序列化上个页面传递的参数
	//页面的初始化
	async onLoad(option) {

		if(!ls.get('initData')){
		    this.getInitData()
		}


		let owner_id = null,users_id = null

		// #ifdef H5

		/*商户id机制*/
		users_id = GetQueryByString(location.href, 'users_id')

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

		/*owner_id 机制*/
		owner_id = GetQueryByString(location.href, 'owner_id')

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
		if(owner_id){
			ls.set('owner_id',owner_id);
			console.log('this page owner_id is '+owner_id)

		}



    },
	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	onShareAppMessage(){

		let initData = ls.get('initData')
		let path = '/pages/index/index';
		let shareObj = {
			title: initData.ShopName,
			desc:initData.ShareIntro,
			imageUrl:domain(initData.ShareLogo),
			path: buildSharePath(path)
		};
		return shareObj

	},
	// #endif
	async created(){

		// #ifdef H5
		let initData = await this.getInitData()
		//页面默认全都是分享出去是首页的
		if(isWeiXin() && this.JSSDK_INIT){
			this.WX_JSSDK_INIT(this).then((env)=>{

				this.$wx.onMenuShareTimeline({
					title: initData.ShopName, // 分享标题
					link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: domain(initData.ShareLogo), // 分享图标
					success: function() {
						// 用户点击了分享后执行的回调函数
					}
				});

				//两种方式都可以
				this.$wx.onMenuShareAppMessage({
					title: initData.ShopName, // 分享标题
					link: location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: domain(initData.ShareLogo), // 分享图标
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
        ...mapActions(['getInitData'])
    }
}
