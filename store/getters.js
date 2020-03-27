
import {ls} from "../common/tool";

export const Stores_ID = function (state, value) {
    if(!state.Stores_ID){
        if(ls.get('Stores_ID'))return ls.get('Stores_ID')
        //error('用户信息为空')
        return null;
    }
    return state.Stores_ID;
};

export const userInfo = function (state, value) {
    if(!state.userInfo){
        if(ls.get('userInfo'))return ls.get('userInfo')
        //error('用户信息为空')
        return {};
    }
    return state.userInfo;
};

export const initData = function (state, value) {
    let rt = state.initData
    if(!rt){
        rt = ls.get('initData') || {}
    }
    return rt;
};

export const commi_rename = function (state, value) {

    let initData = state.initData || ls.get('initData')
    if(!initData || !initData.commi_rename){
        return {}
    }

    return initData.commi_rename

};
