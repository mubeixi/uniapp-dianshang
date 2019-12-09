<template>
    <view class="wrap">
            <view class="myTop">
                <view class="myView">
                    开放时间: <text class="colorFont">{{list.start_time}}</text>
                </view>
                <view class="myView">
                    结算时间: <text class="colorFont">{{list.end_time}}</text>
                </view>
                <view class="myView">
                    订单总金额: <text class="colorRed">¥{{list.Order_TotalAmount||0}}</text>
                </view>
                <view class="myView">
                    结算比例: <text class="colorFont">{{list.Distribute_Balance||'0:0'}}</text>
                </view>
                <view class="myView">
                    运费金额: <text class="colorFont">¥{{list.Shipping_fee||0}}</text>
                </view>
                <view class="myView">
                    服务费: <text class="colorFont">¥{{list.service_fee||0}}</text>
                </view>
                <view class="myView">
                    退款金额: <text class="colorFont">¥{{list.back_amount||0}}</text>
                </view>
                <view class="myView">
                    实际结算: <text class="colorRed">¥{{list.Stores_Balance||0}}</text>
                </view>
            </view>

            <view style="background-color: #F8F8F8;height: 10px;width: 750rpx;"></view>

            <view class="tableTitle">
                订单数据
            </view>
            <view class="table">
                <view class="th">
                    <view class="td">订单号</view>
                    <view class="td">总价</view>
                    <view class="td">实付</view>
                    <view class="td">退款</view>
                    <view class="td">结算</view>
                </view>
                <view class="tr" v-for="(item,index) of list.orders" :key="index">
                    <view class="td">{{item.order_id}}</view>
                    <view class="td">¥{{item.order_totalamount}}</view>
                    <view class="td">¥{{item.order_totalprice}}</view>
                    <view class="td">¥{{item.back_amount}}</view>
                    <view class="td colorRed">¥{{item.settle_money}}</view>
                </view>
            </view>

            <view class="buttons" v-if="list.orders" @click="goStore">
                发起结算
            </view>
            <view class="buttons ccc" v-if="!list.orders">
                发起结算
            </view>
    </view>
</template>

<script>

    import {settlement} from '../../common/fetch.js'
    import {mapGetters} from 'vuex'
    import {pageMixin} from "../../common/mixin";
    export default {
        mixins:[pageMixin],
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                index:1,
                dateValue:'',//开始时间
                dateValues:'',//结束时间
                list:[],
            }
        },
        onLoad: function(options){
            this.dateValue=options.start_time
            this.dateValues=options.end_time
        },
        onShow(){
            this.search();
        },
        computed: {
            ...mapGetters(['Stores_ID'])
        },
        methods: {
            goStore(){
                let data={
                    store_id:this.Stores_ID,
                    start_time:this.list.start_time,
                    end_time:this.list.end_time,
                    type:1
                }
                settlement(data).then(res=>{
                    uni.showToast({
                        title:res.msg
                    })
                    setTimeout(function(){
                        uni.navigateTo({
                            url:'/pagesA/procurement/storeSettlementRecord'
                        })
                    },1000)
                })
            },
            search(){
                let data={
                    store_id:this.Stores_ID,
                    start_time:this.dateValue,
                    end_time:this.dateValues
                }
                settlement(data).then(res=>{
                    this.list=res.data
                    this.index=2
                })
            },
            bindDateChangeEnd(e){
                this.dateValues=e.target.value
            },
            bindDateChangeStart(e){
                this.dateValue=e.target.value
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        background-color: #FFFFFF;
        min-height: 100vh;
    }
    .area-item {
        display: flex;
        align-items: center;
        height: 120rpx;
        border-bottom: 1px solid #EBEBEB;
        margin-left: 20rpx;
        font-size: 30rpx;
        color: #333333;
        position: relative;
        width: 710rpx;
        box-sizing: border-box;
        .area-label {
            display: inline-block;
            width: 140rpx;
            margin-right: 10rpx;
        }
        .pickerView{
            width: 570rpx;
            height: 120rpx;
            line-height: 120rpx;
        }
        .uni-input{
            color: #CAC8C8;
        }
        .uni-inputs{
            color: #333333;
        }
        .rightImg{
            width: 18rpx;
            height: 28rpx;
            position: absolute;
            top: 48rpx;
            right: 10rpx;
        }
    }
    .viewButoon{
        margin: 0 auto;
        margin-top: 110rpx;
        width:660rpx;
    }
    .button{
        width:660rpx;
        height:76rpx;
        text-align: center;
        line-height: 76rpx;
        background-color:$wzw-primary-color;
        border-radius:10rpx;
        font-size: 30rpx;
        color: #FFFFFF;
    }
    .msg{
        float: right;
        margin-top: 18rpx;
        font-size: 24rpx;
        color: #888888;
    }


    .wrap{
        background-color: #FFFFFF;
        min-height: 100vh;
        padding-bottom: 85rpx;
        box-sizing: border-box;
    }
    .myTop{
        padding: 30rpx 41rpx;
        font-size: 26rpx;
        color: #333333;
    }
    .myView{
        height: 60rpx;
        line-height: 60rpx;
    }
    .colorFont{
        color: #777777;
        margin-left: 16rpx;
    }
    .colorRed{
        color: #F43131;
        margin-left: 16rpx;
    }
    .tableTitle{
        width: 750rpx;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 30rpx;
        color: #333333;
    }
    .table{
        width: 710rpx;
        margin: 0 auto;
        border: 1px solid #eee;
        .th{
            display: flex;
            height: 80rpx;
            line-height: 80rpx;
            background-color: #F4F4F4;
            border-bottom: 1px solid #eee;
            font-size: 26rpx;
            color: #333333;
            .td{
                width: 142rpx;
                text-align: center;
                border-right: 1px solid #eee;
                box-sizing: border-box;
                &:last-child{
                    border-right: 0px;
                }
            }
        }
        .tr{
            display: flex;
            height: 70rpx;
            line-height: 70rpx;
            font-size: 22rpx;
            color: #666666;
            border-bottom: 1px solid #E7E7E7;
            &:last-child{
                border-bottom: 0px;
            }
            .td{
                width: 142rpx;
                text-align: center;
                border-right: 1px solid #E7E7E7;
                box-sizing: border-box;
                &:last-child{
                    border-right: 0px;
                }
            }
        }
    }
    .buttons{
        width: 750rpx;
        height: 85rpx;
        line-height: 85rpx;
        background-color: $wzw-primary-color;
        font-size: 32rpx;
        color: #FFFFFF;
        position: fixed;
        bottom: 0rpx;
        left: 0rpx;
        text-align: center;
    }
    .ccc{
        background-color: #CCCCCC;
    }
    .colorRed{
        color: #F43131;
    }
</style>
