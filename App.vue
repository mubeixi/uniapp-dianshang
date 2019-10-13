<script>
    import {ls,GetQueryByString} from "./common/tool";

    export default {
		onLaunch: function() {

            // #ifdef H5
            let aid = GetQueryByString(location.href, 'aid')

            //如果连接里面已经有了，就不需要搞事
            if(aid){
                ls.set('aid',aid);
                return;
            }
            // #endif

			console.log('App Launch')
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
@import "./static/css/icon.css";

ul,li{
    list-style:none
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
.font12{font-size:12px}
.font14{font-size : 14px}
.font16{font-size : 16px}
.font24{font-size : 24px}

.line6{margin-bottom : 6px !important}
.line4{margin-bottom : 4px !important}
.line8{margin-bottom : 8px !important}
.line10{margin-bottom : 10px !important}
.line15{margin-bottom : 15px !important}

.graytext{color : #666 !important}
.graytext2{color : #999 !important}

.text-center{text-align : center}

.flex{display : flex}
.flex1{flex : 1}

.padding10{padding : 10px}
.padding10-c{padding : 0 10px}
.padding10-r{padding : 10px 0}


/*每个页面公共css */
</style>
