import {login} from "./fetch";
import {ls,GetQueryByString} from "./tool";
import {error} from "./index";

import { mapGetters, mapActions, Store } from "vuex";

/**
 * 很多接口都需要user_id,先全局mixin下
 */
export const defaultMixin = {
    created() {

    },


}

export const pageMixin = {
    mounted() {

        if(!ls.get('initData')){
            //this.getInitData()
        }

        // #ifdef H5

        let users_id = GetQueryByString(location.href, 'users_id')
        console.log('users_id is'+users_id)
        //如果连接里面已经有了，就不需要搞事
        if(users_id){
            ls.set('users_id',users_id);
            return;
        }else{
            users_id = ls.get('users_id');
        }

        console.log('users_id is'+users_id)

        if (users_id) {

            let search = location.search;

            if(search.indexOf('?')===-1){
                search += '?users_id='+users_id
            }else{
                search.replace(/\?/,'?users_id='+users_id+'&')
            }

            location.search = search

        }else{
            uni.showModal({
                title: '提示',
                content: '缺少商户id',
                success: function (res) {
                }
            });
        }
        // #endif


    },
    methods:{
        ...mapActions(['getInitData'])
    }
}
