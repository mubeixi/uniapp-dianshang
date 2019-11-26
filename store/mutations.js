import {toast,} from "../common";
import {ls} from "../common/tool";

export const SET_PAY_TEMP_OBJ = function (state, value) {
  state.payTempObj = value;
};

// export const SET_STORES_ID = function (state, value) {
//   state.Stores_ID = value;
// };


export const SET_USER_INFO = function (state, value) {
  state.userInfo = value
  if(value.bind_stores){
    state.Stores_ID = value.bind_stores.Stores_ID
  }
  ls.set('userInfo',value);
  //要覆盖，不然有时候user_id删不掉
  ls.set("user_id",value.User_ID,1);
};

export const SET_INIT_DATA = function (state, value) {
  state.initData = value;
  ls.set('initData',value)

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

