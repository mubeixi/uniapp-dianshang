
import {ls} from "../common/tool";

export const Stores_ID = function (state, value) {
    if(!state.Stores_ID){
        if(ls.get('Stores_ID'))return ls.get('Stores_ID')
        //error('用户信息为空')
        return null;
    }
    return state.Stores_ID;
};


export const getCurrentStoreId = (state)=>{

    return function(){
        let data = state.current_store_id
        if(!data){
            // #ifndef H5
            data = ls.get('current_store_id');
            //#endif

            // #ifdef H5
            data = sessionStorage.getItem('current_store_id')
            // #endif

        }
        return data
    }


}

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

export const commi_rename = function (state, value) {

    let initData = state.initData || ls.get('initData')
    if(!initData || !initData.commi_rename){
        return {}
    }

    return initData.commi_rename

};
