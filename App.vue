<script>
    import {ls} from "./common/tool";
    import {getSystemConf} from "./common/fetch";

	// #ifdef APP-PLUS || MP-TOUTIAO
	import {APP_USERS_ID,isDev} from "./common/env";
	// #endif

    // #ifdef APP-PLUS
    import Push from './common/push';
    // #endif

	// #ifndef H5
	import {upUserLog} from "./common/fetch";
    import {checkIsLogin} from "./common";
    // #endif


    export default {
        //目前只有app和小程序用到了应用的全局onLaunch，h5环境下这里不执行的
		onLaunch: function(option) {

            console.log('App Launch')

			// #ifndef H5
			if(checkIsLogin()){
				upUserLog({},{errtip:false}).then(res=>{
				    console.log('success',res)
				},err=>{console.log('error',err)}).catch(e=>{console.log('catch',e)})
			}
			// #endif

            // #ifdef MP-WEIXIN
            //小程序需要拿这个，都拿一下覆盖吧
            let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
            console.log('extConfig info is',extConfig);
            let users_id = extConfig.users_id;
            //切换的时候清空资料
            if(ls.get('users_id') && users_id != ls.get('users_id')){
                ls.set('userInfo',{})
                ls.set('user_id','',1)
            }

            ls.set('users_id',users_id);
            // #endif


            //头条的需要写入一下
            // #ifdef MP-TOUTIAO || APP-PLUS

            //清空一下
            if(ls.get('users_id') && APP_USERS_ID != ls.get('users_id')){
                ls.set('userInfo',{})
                ls.set('user_id','',1)
            }
            ls.set('users_id',APP_USERS_ID);
            // #endif

			// #ifdef APP-PLUS


            // 获取客户端标识信息绑定设备
            var info = plus.push.getClientInfo();
            let interval = null;
            if(info){
                if(info.clientid){
                    console.log('device plus info ',info);
                    ls.set('user_client_id',info.clientid)
                }else{
                    interval = setInterval(function(){
                        console.log('获取cid ing')
                        info = plus.push.getClientInfo();
                        if(info.clientid){
                            console.log('获取cid success',info)
                            ls.set('user_client_id',info.clientid)
                            clearInterval(interval);
                        }
                    },50)
                }
                //监听
                Push.pushListener();
            }

			// #endif


            //每次加载都清空全站配置
            ls.remove('initData');
            getSystemConf().then(res => {
                ls.set('initData',res.data)
            },err=>{}).catch(error=>{})

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
@import "./static/css/app.less";
@import "./static/css/icon.css";

/* #ifdef APP-PLUS */
page{
	background: #f8f8f8;
}
/* #endif */

/* #ifdef MP */
page{
    background: #f8f8f8;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    font-size: 16px;
    font-family:-apple-system,'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}
.safearea-box{
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    background: white;
}
/* #endif */
.bgColor-white{
    background-color: #FFFFFF !important;
}
/* #ifdef H5 */
/*'Hiragino Sans GB',*/
html,body{
    background: #f8f8f8;
    font-size: 16px;
    font-family:-apple-system,'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}
/* #endif */

.bgwhite{
    background: white;
}
.space-box{
    background-color: none;
}

.safearea{
    position: fixed;
    width: 750rpx;
    bottom: 0;
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    background: white;
}

ul,li{
    list-style:none;
    .reset
}

.inline{
    display: inline;
}
.inline-block{
    display: inline-block;
}
.box-sizing{
	box-sizing: border-box;
}
.overflow{
	overflow-x: hidden;
}
.font12{font-size:12px}
.font14{font-size : 14px}
.font16{font-size : 16px}
.font24{font-size : 24px}
.font36{font-size : 24px}

.line6{margin-bottom : 6px !important}
.line4{margin-bottom : 4px !important}
.line8{margin-bottom : 8px !important}
.line10{margin-bottom : 10px !important}
.line15{margin-bottom : 15px !important}
.line20{margin-bottom : 20px !important}

.graytext{color : #666 !important}
.graytext2{color : #999 !important}

.text-center{text-align : center}

.flex{display : flex}
.flex1{flex : 1}

.padding4-c{padding :0  4px}


.padding10{padding : 10px}
.padding10-c{padding : 0 10px}
.padding10-r{padding : 10px 0}


.margin15{
    margin: 15px;

}

//titleView为custom或者false时专用，让状态栏显示出来（对于商品详情页等需要显示的则不需要)
.status_bar {
      height: var(--status-bar-height);
      width: 100%;
	  background: none;
}


/*每个页面公共css */
</style>
