// #ifdef APP-PLUS
import {toast} from "./index";

class Push {

    static pushListener = function () {
        var _this = this;
        plus.push.addEventListener("click", function (msg) {
            console.log('click event ',msg)
            // switch (msg.payload) {
            //     case "LocalMSG":
            //         toast('点击本地创建消息启动：')
            //         break;
            //     default:
            //         toast('点击离线推送消息启动：')
            //         break;
            // }
            // if (msg.payload) {
            //     _this.handle(msg);
            // }
        }, false);
        plus.push.addEventListener("receive", function (msg) {
            console.log('receive event ',msg)
            // if (msg.aps) {
            //     // Apple APNS message
            //     toast('接收到在线APNS消息')
            // } else {
            //    toast('接收到在线透传消息')
            // }
            if (plus.os.name == 'iOS') {
                if (msg.payload) {
                    _this.notificationMessage(msg);
                }
            } else {
                _this.notificationMessage(msg);
            }
        }, false);
    }


    static cancelPushClear = function () {
        plus.push.clear();
    }

    static handle = function(msg) {
        var _this = this;
        //清除ios推送小红点
        _this.cancelPushClear();
    }

    static notificationMessage = function(msg){
        var content = '您有订单需要处理';//你要展示的提示
        var _this = this;
        var jsonData = '';
        switch(plus.os.name) {
            case "Android":
                jsonData = eval("(" + msg.payload + ")");
                break;
            case "iOS":
                jsonData = msg.payload;
                break;
        }
        _this.createLocalPushMsg(content,jsonData);
    }

    /**
     *  处理透传消息
     * @param {Object} msg
     * @param {Object} content
     */
    static createLocalPushMsg = function(str, jsonData,content) {
        //创建一个符合你自己要显示推送通知
        this.createMessage(str, jsonData);
    }


    /**
     *  创建本地推送消息
     * @param {Object} str
     * @param {Object} jsonData
     * @param {Object} options
     */
    static createMessage = function(str, jsonData, options) {
        switch(plus.os.name) {
            case "Android":
                jsonData = jsonData;
                break;
            case "iOS":
                jsonData = jsonData.eid;
                break;
        }
        plus.push.createMessage(str, jsonData, options);
    }


}

export default Push;
/**
 * 透传消息handle
 * @param type
 * @param info
 */
export const pushHandle = ({type='receive',info = {__UUID__:'',title:'',content:'',payload:''}}) => {

    // "__UUID__": "androidPushMsg91141115",
    // "title": "网中网电商",
    // "content": "\n{\"channel\":\"fff\",\"fiel\":\"fdsafsa\",\"id\":\"343\"",
    // "payload": "\n{\"channel\":\"fff\",\"fiel\":\"fdsafsa\",\"id\":\"343\""

    let {title,content,payload} = info,data = null;

    console.log(info)
    if(!payload)return;
    //data = JSON.parse(payload);
    uni.showModal({
        title:title,
        content:JSON.stringify(payload)
    })

    //data = {action:"navigateTo",confirmText:"跳转到页面",data:"/pages/result/result"};

}
// #endif
