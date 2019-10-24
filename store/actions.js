import {getSystemConf} from "../common/fetch";
import {ls} from "../common/tool";
import {confirm} from "../common";

export const setUserInfo = ({commit}, data) => {
  commit('SET_USER_INFO', data);
};

export const getInitData = async ({commit, state}) => {

  // console.log('bbbbbbbbbbbbbb')
  let data = state.initData
  if (data) return data;

  if (!data) {
    let data2 = ls.get('initData')
    if (data2) {
      commit('SET_INIT_DATA', data2);
      return data2
    }

  }

  await getSystemConf().then(res => {
    // console.log(res.data)
    if(res.errorCode === 0){
      commit('SET_INIT_DATA', res.data);
      data = res.data
    }


  })


  return data;

};

/**
 *类似缓存的穿透机制，一层拿不到就继续往下取
 * async
 **/
export const getUserInfo = ({commit, state},through) => {

  //第一次是在内存里
  let data = state.userInfo
  console.log(data)
  if (data) return data;

  //从ls中获取
  if (!data) {
    let data2 = ls.get('userInfo')
    if (data2) {
      commit('SET_USER_INFO', data2);
      return data2
    }
  }

  if(through){
    uni.navigateTo({
      url: '/pages/login/login'
    })
  }

  //则本地没有用户信息，提示用户是否需要登录。

  // await confirm({title: '提示', content: '该操作需要登录,请问是否登录?', confirmText: '去登录', cancelText: '暂不登录'}).then(() => {
  //
  //   //要替换掉navigateTo，不然登录页面回退就尴尬了
  //
  // }).catch(() => {
  //
  // })

  return {}

};


