import {toast,} from "../common";
import {ls} from "../common/tool";

export const SET_PAY_TEMP_OBJ = function (state, value) {
  state.payTempObj = value;
};

export const SET_STORES_ID = function (state, value) {
  state.Stores_ID = value;
  ls.set('Stores_ID',value,1)
}


export const SET_USER_INFO = function (state, value) {

  state.userInfo = value

  if(value && value.bind_stores && value.bind_stores.Stores_ID){
    state.Stores_ID = value.bind_stores.Stores_ID
    ls.set('Stores_ID',state.Stores_ID)
  }else{
    ls.set('Stores_ID',null,1)
  }
  ls.set('userInfo',value);
  //要覆盖，不然有时候user_id删不掉
  ls.set("user_id",value.User_ID,1);
  //跟着清空access_token
  if(!value.hasOwnProperty('User_ID') || !value.User_ID){
    ls.remove('access_token')
  }
};

export const SET_INIT_DATA = function (state, value) {
  state.initData = value;
  ls.set('initData',value,1)

  //app分享小程序的时候有用到
  if(value && value.login_methods){
    let login_methods = value.login_methods
    for(var i in login_methods){
      if(i!='component_appid' && login_methods[i].type === 'wx_lp' && login_methods[i].authorizer_user_name){
        ls.set('WX_MINI_ORIGIN_ID',login_methods[i].authorizer_user_name)
      }
    }
  }
};


export const SET_TABBAR = function (state, value) {
  state.tabbar = value;
  ls.set('tabbar',value,1)
};

