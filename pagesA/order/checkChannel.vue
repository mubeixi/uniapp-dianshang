<template>
    <div @click="commonClick" class="wrap">
		<!-- #ifndef H5 -->
		<image @click="scanFn" class="scan"  :src="'/static/client/check_by_scan.jpg'|domain" />
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<image @click="scanFn" v-if="iswx" class="scan" :src="'/static/client/check_by_scan.jpg'|domain" />
		<!-- #endif -->

        <image @click="toCode" class="code"  :src="'/static/client/check_by_code.jpg'|domain" />
    </div>
</template>

<script>
    import {isWeiXin} from "../../common/tool";
    import {
        scanMixin,
        pageMixin
    } from "../../common/mixin";
    import {error} from "../../common";

    export default {
        mixins:[pageMixin,scanMixin],
        name: "checkChannel",
        data(){
            return {
                iswx:isWeiXin()
            }
        },
        methods:{
            toCode(){
              uni.navigateTo({
                  url:'/pagesA/order/checkByCode'
              })
            },
            scanFn(){

				let _self = this
                this.openScanFn(1,true,1,1).then(origin=>{
					let rt = _self.translateQrData(origin)

                    //params默认空对象不报错
                    let {act='',params={}} = rt

					if(act ==='IsVirtualOrderCheck' && params.Order_Code){
						uni.navigateTo({
                            url:'/pagesA/order/checkOrderInfo?Order_Code='+params.Order_Code
                        })
					}else{
						error('参数有误')
					}
				})
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrap{
    height: 100vh;
    background: white;
    padding-top: 120rpx;
    .scan,.code{
        width: 750rpx;
        height: 350rpx;
    }
    .scan{
        /*margin-top: 120rpx;*/
        margin-bottom: 70rpx;
    }
    .code{

    }
}
</style>
