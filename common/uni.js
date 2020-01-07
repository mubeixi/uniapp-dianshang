//重写navigateTo
import {GetQueryByString, ls,isWeiXin,isIos} from "./tool";


let navigateTOCopy = uni.navigateTo;
let redirectToCopy = uni.redirectTo;
let switchTabCopy = uni.switchTab;

uni.navigateTo = (opt) => {

    let {url} = opt;
    if (url.indexOf('users_id') === -1) {

        console.log('链接中没有users_id，需要改造');
        let users_id = null, owner_id = null;

        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id');
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if (!users_id) {

            users_id = ls.get('users_id');

            if (users_id) {
                console.log(users_id)

                if (url.indexOf('?') === -1) {
                    url += '?users_id=' + users_id
                } else {
                    url = url.replace(/\?/, '?users_id=' + users_id + '&')
                }


            }
        }


        if (!owner_id) {

            owner_id = ls.get('owner_id');

            if (owner_id) {

                if (url.indexOf('?') === -1) {
                    url += '?owner_id=' + owner_id
                } else {
                    url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
                }


            }
        }

        console.log('owner_id is 2222222222222222222222222 ' + owner_id)


    }





    let endOpt = {...opt, url}

    //去订单详情页的，精准hack....
    // #ifdef H5
    if(isWeiXin() && isIos() && url.indexOf('/pages/order/check?')!==-1){

        console.log('ios下订单相关的用redirct')
        console.log('/fre'+url)
        location.href = '/fre'+url;//这样很危险，因为需要约定其他地方跳转到check页面都只能写url，不能用query和parmas
        return;
    }
    // #endif

    console.log('endOpt is ', endOpt)
    navigateTOCopy(endOpt)

}



uni.redirectTo = (opt) => {

    let {url} = opt;
    if (url.indexOf('users_id') === -1) {


        let users_id = null, owner_id = null;


        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id')
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if (!users_id) {

            users_id = ls.get('users_id');

            if (users_id) {

                if (url.indexOf('?') === -1) {
                    url += '?users_id=' + users_id
                } else {
                    url = url.replace(/\?/, '?users_id=' + users_id + '&')
                }

                console.log('users_id is ' + users_id)

            }
        }

        if (!owner_id) {

            owner_id = ls.get('owner_id');

            if (owner_id) {

                if (url.indexOf('?') === -1) {
                    url += '?owner_id=' + owner_id
                } else {
                    url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
                }


            }
        }

        console.log('owner_id is 2222222222222222222222222 ' + owner_id)

    }

    console.log('url is ' + url);
    let endOpt = {...opt, url}
    console.log('endOpt is ', endOpt)
    redirectToCopy(endOpt)

}


uni.switchTab = (opt) => {

    let {url} = opt;
    if (url.indexOf('users_id') === -1) {

        let users_id = null, owner_id = null;


        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id')
        owner_id = GetQueryByString(url, 'owner_id')
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if (!users_id) {

            users_id = ls.get('users_id');

            if (users_id) {

                if (url.indexOf('?') === -1) {
                    url += '?users_id=' + users_id
                } else {
                    url = url.replace(/\?/, '?users_id=' + users_id + '&')
                }

                console.log('users_id is ' + users_id)

            }
        }


        if (!owner_id) {

            owner_id = ls.get('owner_id');

            if (owner_id) {

                if (url.indexOf('?') === -1) {
                    url += '?owner_id=' + owner_id
                } else {
                    url = url.replace(/\?/, '?owner_id=' + owner_id + '&')
                }

            }
        }


    }

    console.log('url is ' + url);
    let endOpt = {...opt, url}
    console.log('endOpt is ', endOpt)
    switchTabCopy(endOpt)

}
