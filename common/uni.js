//重写navigateTo
import {GetQueryByString, ls} from "./tool";

let navigateTOCopy = uni.navigateTo;

uni.navigateTo = (opt)=>{

    let {url} = opt;
    if(url.indexOf('users_id')===-1){

        let users_id = null;

        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id')
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if(!users_id){

            users_id = ls.get('users_id');

            if (users_id) {
                console.log(url)

                if(url.indexOf('?')===-1){
                    url += '?users_id='+users_id
                }else{
                    url.replace(/\?/,'?users_id='+users_id+'&')
                }

                console.log('users_id is '+users_id)

            }
        }


    }


    let endOpt = {...opt,url}
    console.log('endOpt is ',endOpt)
    navigateTOCopy(endOpt)

}

let redirectToCopy = uni.redirectTo;

uni.redirectTo = (opt)=>{

    let {url} = opt;
    if(url.indexOf('users_id')===-1){

        let users_id = null;

        // #ifdef H5
        users_id = GetQueryByString(url, 'users_id')
        // #endif

        //如果连接里面已经有了，就不需要搞事
        if(!users_id){

            users_id = ls.get('users_id');

            if (users_id) {

                if(url.indexOf('?')===-1){
                    url += '?users_id='+users_id
                }else{
                    url.replace(/\?/,'?users_id='+users_id+'&')
                }

                console.log('users_id is '+users_id)

            }
        }


    }

    console.log('url is '+url);
    let endOpt = {...opt,url}
    console.log('endOpt is ',endOpt)
    redirectToCopy(endOpt)

}
