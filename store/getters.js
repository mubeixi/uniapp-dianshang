
import {ls} from "../common/tool";

export const userInfo = function (state, value) {
    if(!state.userInfo){
        if(ls.get('userInfo'))return ls.get('userInfo')
        //error('用户信息为空')
        return {};
    }
    return state.userInfo;
};

export const initData = function (state, value) {
    if(!state.initData){
        if(ls.get('initData'))return ls.get('initData')
        return {};
    }
    return state.initData;
};
