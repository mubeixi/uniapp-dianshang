import {toast,} from "../common";
import {ls} from "../common/tool";

export const SET_USER_INFO = function (state, value) {
  state.userInfo = value;
  ls.set('userInfo',value)
};

export const SET_INIT_DATA = function (state, value) {
  state.initData = value;
  ls.set('initData',value)
};

