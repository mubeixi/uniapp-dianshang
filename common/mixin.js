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
    methods:{
        ...mapActions(['getInitData'])
    }

}

export const pageMixin = {
    created() {


        // #ifdef H5
        let aid = GetQueryByString(location.href, 'aid')

        //如果连接里面已经有了，就不需要搞事
        if(aid){
            ls.set('aid',aid);
            return;
        }else{
            aid = ls.get('aid');
        }

        if (aid) {

            let search = location.search;

            if(search.indexOf('?')===-1){
                search += '?aid='+aid
            }else{
                search.replace(/\?/,'?aid='+aid+'&')
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

    }
}
