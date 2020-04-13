import {getSystemConf} from "../common/fetch";
import {ls} from "../common/tool";
import {confirm, fun} from "../common";

export const setUserInfo = ({commit}, data) => {
    commit('SET_USER_INFO', data);
};

export const setStoresId = ({commit}, data) => {
    commit('SET_STORES_ID', data);
};

export const setInitData = ({commit}, data) => {
    commit('SET_INIT_DATA', data);
};

function downImg() {

}

function getTabBarConf() {
    let url = '/node/tabbar'
    // #ifndef H5
    url = 'http://localhost:9100/tabbar'
    // #endif

    // #ifdef APP-PLUS ||MP
    var tabbar = [{
        "pagePath": "pages/index/index",
        "iconPath": "/static/tabbar/person.png",
        "selectedIconPath": "/static/tabbar/person.png",
        "text": "首页1"
    },
        {
            "pagePath": "pagesA/person/storeCenter",
            "iconPath": "http://dev.jingjin.site/static/tabbar.jpg",
            "selectedIconPath": "http://dev.jingjin.site/static/tabbar.jpg",
            "text": "门店"
        }
    ]

    return new Promise((resolve, reject) => {

        uni.downloadFile({
            url: 'http://dev.jingjin.site/static/tabbar.jpg', //仅为示例，并非真实的资源
            success: (res) => {
                if (res.statusCode === 200) {
                    tabbar[1].iconPath = res.tempFilePath
                    tabbar[1].selectedIconPath = res.tempFilePath
                    resolve({data: tabbar})
                }
            }
        });

    })


    // #endif

    // #ifndef APP-PLUS
    return new Promise((resolve, reject) => {
        uni.request({
            header: {"content-type": "application/x-www-form-urlencoded"},
            url,
            method: 'post',
            success: (res) => {
                resolve(res.data)
            }

        })
    })
    // #endif
}

/**
 * async相当于返回了一个promise，直接return rt就相当于promise.resolve(rt)
 */
export const getTabBar = async ({commit, state}, refresh) => {

    let data = null;
    if (!refresh) {
        data = state.tabbar
        if (data) return data;
        if (!data) {
            let data2 = ls.get('tabbar')
            if (data2) {
                commit('SET_TABBAR', data2);
                return data2
            }

        }
        return {}
    }

    let res = await getTabBarConf()

    commit('SET_TABBAR', res.data);
    data = res.data

    return data;

};


export const getInitData = async ({commit, state}, refresh) => {

    try {

        let data = null;
        if (!refresh) {
            data = state.initData
            if (data) return data;
            if (!data) {
                let data2 = ls.get('initData')
                if (data2) {
                    commit('SET_INIT_DATA', data2);
                    return data2
                }

            }
            return {}
        }


        let systemConf = await getSystemConf()
        commit('SET_INIT_DATA', systemConf.data);
        data = systemConf.data
        return data;



    } catch (err) {
        // uni.showModal({
        //     content: '获取initData失败'
        // })



        let systemConf = await getSystemConf()
        commit('SET_INIT_DATA', systemConf.data);
        return systemConf.data;

    }


};

/**
 *类似缓存的穿透机制，一层拿不到就继续往下取
 * async
 **/
export const getUserInfo = async ({commit, state}, through) => {

    //第一次是在内存里
    let data = state.userInfo
    if (data) return data;

    //从ls中获取
    if (!data) {
        let data2 = ls.get('userInfo')

        if (data2 && JSON.stringify(data2) != '{}') {
            commit('SET_USER_INFO', data2);
            return data2
        }
    }


    if (through) {
        //则本地没有用户信息，提示用户是否需要登录。

        await confirm({title: '提示', content: '需要登录,请问是否登录?', confirmText: '去登录', cancelText: '暂不登录'}).then(() => {

            //要替换掉navigateTo，不然登录页面回退就尴尬了
            //用这个可以记录登陆前页面
            fun.checkIsLogin(1)

        }).catch(() => {

        })
    }


    //return {}

};


