import {getSystemConf} from "../common/fetch";
import {ls} from "../common/tool";

export const setUserInfo = ({commit}, data) => {
  commit('SET_USER_INFO', data);
};

export const getInitData = async ({commit,state}) => {

  let data = state.initData
  if(data)return data;

  if(!data)data = ls.get('initData')

  if(data)return data;

  await getSystemConf().then(res=>{
    commit('SET_INIT_DATA', res.data);
    return res.data
  })

};


