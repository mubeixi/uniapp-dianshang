<template>
    <div class="myall" v-show="orderInfo.Order_ID">

        <div class="container" >
            <div class="lists">
                <div class="item" >

                    <div class="goods-list" >
                        <block v-if="orderInfo.prod_list">
                            <div class="goods" v-for="(item,idx2) in orderInfo.prod_list">
                                <div class="l" :style="{backgroundImage:'url('+item.prod_img+')'}"></div>
                                <div class="c">
                                    <div class="title line10">{{item.prod_name}}</div>
                                    <div class="line10 flex flex-between graytext font14 flex-vertical-center">
                                        <div class="spec-key">{{item.attr_info.attr_name||'无规格'}}</div>
                                        <div class="numbox font16">
                                            x{{item.prod_count}}
                                        </div>
                                    </div>
                                    <div class="font14"><span class="danger-color">￥<span class="price-num font16">{{item.prod_price}}</span></span></div>

                                </div>
                            </div>
                        </block>

                    </div>

                </div>
            </div>

        </div>

<!--        <div class="order_msg">-->
<!--            <div class="pro" v-for="(pro,pro_id) in orderInfo.prod_list" :key="pro_id">-->
<!--                <image class="pro-img" :src="pro.prod_img" alt="" />-->
<!--                <div class="pro-msg">-->
<!--                    <div class="pro-name">{{pro.prod_name}}</div>-->
<!--                    <div class="attr" v-if="pro.attr_info"><span>{{pro.attr_info.attr_name}}</span></div>-->
<!--                    <div class="pro-price"><span>￥</span>{{pro.prod_price}} <span class="amount">x<span class="num">{{pro.prod_count}}</span></span></div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

        <div class="infobox">
            <div class="title"><span class="tip"></span><span class="text">订单信息</span></div>
            <div class="row"><div class="label">订单号</div><div class="form-item">{{orderInfo.Order_ID}}</div></div>
            <div class="row"><div class="label">订单状态</div><div class="form-item" :style="{color:orderInfo.Order_Status!=2?'red':''}">{{orderInfo.Order_Status_desc}}</div></div>
            <div class="row"><div class="label">总价</div><div class="form-item">￥{{orderInfo.Order_TotalAmount}}</div></div>
            <div class="row"><div class="label">优惠</div><div class="form-item">￥{{orderInfo.Coupon_Money}}</div></div>
            <div class="row"><div class="label">实付</div><div class="form-item danger-color">￥{{orderInfo.Order_Fyepay}}</div></div>
            <div class="row"><div class="label">获取积分</div><div class="form-item">{{orderInfo.Integral_Get}}</div></div>
            <div class="row"><div class="label">下单时间</div><div class="form-item">{{orderInfo.Order_CreateTime | formatTime}}</div></div>
            <div class="row"><div class="label">付款时间</div><div class="form-item">{{orderInfo.Pay_time | formatTime}}</div></div>
        </div>

        <div class="subbox">
            <button @click="subFn" class="subbtn" type="warn">立即核销</button>
        </div>

    </div>
</template>

<script>
    import popupLayer from '../../components/popup-layer/popup-layer.vue'
    import {formatTime} from '../../common/filter.js'
    import {
        getAddress,
        createOrderCheck,
        getOrderDetail,
        orderPay,
        get_user_info,
        cancelOrder,
        confirmOrder,
        checkOrderByCode
    } from '../../common/fetch.js';
    import {
        pageMixin
    } from "../../common/mixin";
    import {
        ls,
        GetQueryByString,
        isWeiXin,
        urlencode
    } from "../../common/tool";
    import {error, confirm, toast} from "../../common";
    import PayComponents from '../../components/PayComponents.vue';

    export default {
        mixins: [pageMixin],
        components: {
            popupLayer,PayComponents

        },
        data() {
            return {
                JSSDK_INIT: false,
                orderInfo: {},
                Order_ID: 0,
                Order_Code:'',
            }
        },
        onLoad(options) {
            // if (options.Order_ID) {
            //     this.Order_ID = options.Order_ID;
            // }
            if(options.Order_Code){
                this.Order_Code = options.Order_Code
            }
            // if(options.pagefrom =='check'){
            //     this.showDirect = true;
            // }
            // if(options.pagefrom == 'order') {
            //     // 来自订单列表页
            //     this.pageFromOrder = true;
            // }
            // // 获取支付方式
            // this.pay_arr = ls.get('initData').pay_arr;

        },
        filters: {
            formatTime: formatTime
        },
        onShow() {
            this.getOrderDetail();
            // this.get_user_info();// 获取用于可用余额
        },
        computed: {
            invoiceChecked() {
                return this.openInvoice;
            },
            moneyChecked() {
                return this.openMoney;
            }
        },
        created() {



        },
        methods: {
            async subFn(){

                let confirmConf = {title:'操作提示',confirmText:'继续核销',showCancel:true,cancelText:'回到首页',content:''}
                await checkOrderByCode({Order_Code:this.Order_Code}).then(res=>{
                    confirmConf.content = '核销成功'
                    //toast('核销成功')
                }).catch(err=>{

                })

                if(!confirmConf.content)return;


                confirm(confirmConf).then(res=>{

					//需要跳转到一个页面
                    setTimeout(()=>{
                        uni.navigateTo({
                            url:'/pages/order/checkChannel'
                        })
                    },1000)

                }).catch(err=>{
                    uni.switchTab({
                        url:'/pages/index/index'
                    })
                })
            },

            // 订单详情
            getOrderDetail() {

                let _self = this;
                getOrderDetail({
                    Order_Code: this.Order_Code,
                },{tip:'努力加载中'}).then(res => {
                    console.log(res)
                    if(res.data.Order_Status!=2){

                        confirm({title:'操作提示',content:'该订单状态不符:'+res.data.Order_Status_desc}).then(res=>{

                        }).catch(err=>{})
                    }
                    if (res.errorCode == 0) {
                        for (var i in res.data) {
                            if (i == 'Order_Shipping') {
                                res.data[i] = JSON.parse(res.data[i])
                            }
                            if (i == 'prod_list') {
                                for (var j in res.data[i]) {
                                    for (var k in res.data[i][j]) {
                                        if (k == 'attr_info') {
                                            res.data[i][j][k] = res.data[i][j][k] && JSON.parse(res.data[i][j][k])
                                        }
                                    }
                                }
                            }
                        }
                        this.orderInfo = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .myall{
        /*background-color: #FFFFFF;*/
    }
    .wrap {
        background: #fff;
    }

    .lists{
        .item{
            margin: 15px;
            background: white;
            border-radius: 4px;
            overflow: hidden;
            .head{

                .info{
                    padding: 10px;
                    align-items: center;
                    font-size: 14px;
                    .store-info{
                        align-items: center;
                    }
                    .store-pic{
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        margin-right: 10px;
                    }
                    .store-title{
                        margin-right: 10px;
                        color: #333;
                    }
                    .action{
                        color: $wzw-primary-color;
                        .action-item{
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                    .order_no{
                        margin-left: 30px;
                        color: #666;
                    }
                }
                .status{
                    font-size: 12px;
                    border-bottom: 1px solid #E6E6E6;
                    padding: 10px;
                    align-items: center;
                    .icon-delete{
                        width: 14px;
                        height: 14px;
                    }
                    .el-icon-delete-solid{
                        cursor: pointer;
                        color: #999;
                        &:hover{
                            color: #F43131;
                        }
                    }
                }
            }
            .goods-list{
                border-bottom: 1px solid #EDEDED;
                .goods{
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    .l{
                        width: 100px;
                        height: 100px;
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-color: #f2f2f2;
                        background-position: center;
                    }
                    .c{
                        flex:1;
                        padding: 0 0 0 10px;
                        .title{
                            font-size: 14px;
                            height: 40px;
                            line-height: 20px;
                            color: #333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .spec-key{
                            background: #FFF5F5;
                            font-size: 12px;
                            padding: 6px 10px;
                            color: #666666;
                        }
                        .numbox{
                            color: #333333
                        }
                    }

                }


            }
            .price-box{
                text-align: right;
                padding: 10px;
                font-size: 14px;
            }
            .actions{
                text-align: right;
                padding: 0 10px;
                .acion-btn{
                    margin-bottom: 10px;
                    margin-left: 10px;
                }


            }

        }
    }
    .infobox{
        font-size: 14px;
        margin: 10px;
        background: white;
        .title{
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            padding: 10px 0;
            .tip{
                display: inline-block;
                width: 4px;
                height: 16px;
                background: $wzw-primary-color;
                border-radius: 2px;
                margin: 0 10px;
            }
            .text{

            }
        }
        .row{
            margin: 0 6px;
            display: flex;
            align-items: center;
            height: 24px;
            line-height: 24px;
            padding: 4px 0;
            .label{
                width: 90px;
                color: #666;
            }
            .form-item{
                color: #444;
                flex: 1;
            }

        }
    }
    .subbox{
        position:fixed;
        bottom:0;
        left: 0;
        width: 750rpx;
        .subbtn{
            border-radius: 0;
        }
    }
</style>
