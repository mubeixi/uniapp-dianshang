<script>
    import {ls} from "./common/tool";

	// #ifdef APP-PLUS || MP-TOUTIAO
	import {APP_USERS_ID,isDev} from "./common/env";
	// #endif


    // #ifdef APP-PLUS

    // 获取客户端标识信息
    var info = plus.push.getClientInfo();
    console.log('device plus info ',info);


    import {pushHandle} from "./common/push";

    const  clickFn = (notify)=>{
        console.log('click',notify)

        pushHandle({type:'click',info:notify})

    }

    const  receiveFn = (notify)=>{

        pushHandle({type:'receive',info:notify})
    }
    // #endif


    import {getSystemConf} from "./common/fetch";


    export default {
        //目前只有app端用到了应用的全局onLaunch
		onLaunch: function(option) {

		    //每次加载都清空全站配置
            ls.remove('initData');

			// #ifdef APP-PLUS

            //isDev && ls.clear()
			ls.set('users_id',APP_USERS_ID);//app里面需要写死打包，不然办法
            // if(isDev){

            // }


            //点击通知
            plus.push.addEventListener( 'click', clickFn);

            //收到通知
            plus.push.addEventListener( 'receive', receiveFn);

			// #endif

            //头条的需要写入一下
            // #ifdef MP-TOUTIAO
            if(isDev){
                tt.setStorageSync('users_id', 'wkbq6nc2kc');
            }
            // #endif

			// #ifdef H5
			//ls.set('openid','')
			// #endif

			console.log('App Launch')


            getSystemConf().then(res => {
                ls.set('initData',res.data)
            },err=>{}).catch(error=>{})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="less">
@import "./static/css/app.less";
@import "./static/css/icon.css";

/* #ifdef MP */
page{
    /*background: #f8f8f8;*/
    /*padding-bottom: constant(safe-area-inset-bottom);*/
    /*padding-bottom: env(safe-area-inset-bottom);*/
    font-size: 16px;
    font-family:-apple-system,'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}
/* #endif */

/* #ifdef H5 */
/*'Hiragino Sans GB',*/
html,body{
    font-size: 16px;
    font-family:-apple-system,'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
}
/* #endif */

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
