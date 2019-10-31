// #ifdef APP-PLUS
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

    // if(!content)return;
    // data = JSON.parse(content);

    data = {action:"navigateTo",confirmText:"跳转到页面",data:"/pages/result/result"};


}
// #endif
