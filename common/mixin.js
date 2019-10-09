import {login} from "./fetch";
import {ls} from "./tool";


/**
 * 很多接口都需要user_id,先全局mixin下
 */
export const defaultMixin = {
    async created() {

        console.log('default mixin ready')
        // if (ls.get('Users_ID') && ls.get('Users_Account')) return;
        // //先模拟登录一下
        // await login({Account: 'admin', Password: '123456'}).then(res => {
        //     ls.set('Users_ID', res.data.Users_ID);
        //     ls.set('Users_Account', res.data.Users_Account)
        //
        //     ls.set('Shop_Info', {
        //         ShopName: res.data.ShopName,
        //         ShopLogo: res.data.ShopLogo,
        //         description: res.data.description
        //     })
        // }).catch()
    }

}
