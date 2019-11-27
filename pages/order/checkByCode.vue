<template>
    <div class="wrap">
        <div class="input-box">
            <input confirm-type="done" class="input" type="digit" placeholder="请输入消费券码" />
        </div>
        <button type="warn" class="sub" @click="subFn">核销</button>
    </div>
</template>

<script>
    import {isWeiXin} from "../../common/tool";
    import {checkOrderByCode} from "../../common/fetch";
    import {confirm} from "../../common";

    export default {
        name: "checkByCode",
        data(){
            return {
                Order_Code:''
            }
        },
        methods:{
            subFn(){
                let Order_Code = this.Order_Code
               
                uni.navigateTo({
                    url:'/pages/order/checkOrderInfo?Order_Code='+Order_Code
                })
            },
            
        }
    }
</script>

<style lang="scss" scoped>
.wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    padding: 40rpx 20rpx;
    .input-box{
        height: 180rpx;
        line-height: 180rpx;
        border: 1px solid $wzw-primary-color;
        border-radius: 10rpx;
        .input{
            height: 180rpx;
            padding: 0 20rpx;
            font-size: 30px;
            font-weight: 300;
            color: #555;
            &::placeholder{
                color: #CAC8C8;
            }
        }

    }
    .sub{
        border-radius: 0;
        position: fixed;
        bottom:0;
        left: 0;
        width: 750rpx;
        z-index: 3;
    }
}
</style>
