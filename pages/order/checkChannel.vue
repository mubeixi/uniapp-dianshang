<template>
    <div class="wrap">
        <image @click="scanFn" v-if="iswx" class="scan" src="/static/check_by_scan.jpg" />
        <image @click="toCode" class="code" src="/static/check_by_code.jpg" />
    </div>
</template>

<script>
    import {isWeiXin} from "../../common/tool";
    import {scanMixin} from "../../common/mixin";

    export default {
        mixins:[scanMixin],
        name: "checkChannel",
        data(){
            return {
                iswx:isWeiXin()
            }
        },
        methods:{
            toCode(){
              uni.navigateTo({
                  url:'/pages/order/checkByCode'
              })
            },
            scanFn(){
                this.openScanFn()
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
