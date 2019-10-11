import {login} from "./fetch";
import {ls} from "./tool";


/**
 * 很多接口都需要user_id,先全局mixin下
 */
export const defaultMixin = {
    async created() {

        // console.log('default mixin ready')

    }

}
