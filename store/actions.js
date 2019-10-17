import {getSystemConf} from "../common/fetch";
import {GetQueryByString, ls} from "../common/tool";
import {confirm} from "../common";

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
    console.log(res.data)
    commit('SET_INIT_DATA', res.data);
    data = res.data

  })



  return data;

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



  await confirm({title:'提示',content:'该操作需要登录,请问是否登录?',confirmText:'去登录',cancelText:'暂不登录'}).then(()=>{
    uni.navigateTo({
      url:'/pages/login/login'
    })
  }).catch(()=>{

  })

  return {}
  //要替换掉navigateTo，不然登录页面回退就尴尬了


};


