
import {ls} from "../common/tool";

export const userInfo = function (state, value) {
    if(!state.userInfo){
        if(ls.get('userInfo'))return ls.get('userInfo')
        //error('用户信息为空')
        return {};
    }
    return state.userInfo;
};

// export const initData = function (state, value) {
//     if(!state.initData){
//         error('全局配置为空')
//         return {};
//     }
//     return state.initData;
// };
