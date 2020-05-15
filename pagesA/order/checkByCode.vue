<template>
    <div @click="commonClick" class="wrap">
        <div class="input-box">
            <input confirm-type="done" v-model="Order_Code" class="input" type="digit" placeholder="请输入消费券码" />
        </div>
        <button type="warn" class="sub" @click="subFn">核销</button>
    </div>
</template>

<script>
    import {isWeiXin} from "../../common/tool";
    import {checkOrderByCode,getOrderDetail} from "../../common/fetch";
    import {confirm, error} from "../../common";
    import {pageMixin} from '../../common/mixin';

    export default {
        name: "checkByCode",
        mixins:[pageMixin],
        data(){
            return {
                Order_Code:''
            }
        },
        methods:{
            subFn(){
                let Order_Code = this.Order_Code
                if(!Order_Code){
                    error('核销码必填')
                    return;
                }

                //不要穿User_ID
                getOrderDetail({Order_Code},{noUid:true}).then(res => {

                    if(res.data.Order_Status==2){
                        this.Order_Code = ''
                        uni.navigateTo({
                            url:'/pagesA/order/checkOrderInfo?Order_Code='+Order_Code
                        })

                    }else{
                        error('订单状态不符')
                    }
                }).catch(e=>{

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

        box-sizing: border-box;
        border: 1px solid $wzw-primary-color;
        border-radius: 10rpx;
        .input{
            margin: 39rpx 0;
            padding: 20rpx;
            font-size: 50rpx;
            line-height: 60rpx;
            height: 60rpx;
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
