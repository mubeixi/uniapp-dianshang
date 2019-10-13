import {getSystemConf} from "../common/fetch";
import {ls} from "../common/tool";

export const setUserInfo = ({commit}, data) => {
  commit('SET_USER_INFO', data);
};

export const getInitData = async ({commit,state}) => {

  let data = state.initData
  if(data)return data;

  if(!data){
    let data2 = ls.get('initData')
    if(data2){
      commit('SET_INIT_DATA',data2);
      return data2
    }

  }

  await getSystemConf().then(res=>{
    commit('SET_INIT_DATA', res.data);
    return res.data
  })

};

export const getUserInfo = async ({commit,state}) => {

  let data = state.userInfo
  if(data)return data;

  if(!data){
    let data2 = ls.get('userInfo')
    if(data2){
      commit('SET_USER_INFO',data2);
      return data2
    }

  }

  uni.navigateTo({
    url:'/pages/login/login'
  })

};


