import {toast,} from "../common";
import {ls} from "../common/tool";

export const SET_USER_INFO = function (state, value) {
  state.userInfo = value;
  ls.set('userInfo',value);
  ls.set("user_id",value.User_ID);
};

export const SET_INIT_DATA = function (state, value) {
  state.initData = value;
  ls.set('initData',value)

  let login_methods = value.login_methods
  for(var i in login_methods){
    if(i!='component_appid' && login_methods[i].type === 'wx_lp' && login_methods[i].authorizer_user_name){
      ls.set('WX_MINI_ORIGIN_ID',login_methods[i].authorizer_user_name)
    }
  }

};

