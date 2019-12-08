<template>
    <div class="wrap">
        <div class="navs">
            <div class="nav-item" :class="tabidx===0?'active':''" @click="changIndex(0)">全部</div>
            <div class="nav-item" :class="tabidx===1?'active':''" @click="changIndex(1)">待处理</div>
            <div class="nav-item" :class="tabidx===2?'active':''" @click="changIndex(2)">已出库</div>
            <div class="nav-item" :class="tabidx===3?'active':''" @click="changIndex(3)">已驳回</div>
            <div class="nav-item" :class="tabidx===4?'active':''" @click="changIndex(4)">已完成</div>
            <div class="nav-item" :class="tabidx===5?'active':''" @click="changIndex(5)">已撤回</div>
        </div>
        <view class="space-box">
        </view>
        <div class="container">
            <div class="lists">
                <div class="item" v-for="(apply,idx1) in applys" :key="idx1">
                    <div class="head">
                        <div class="status flex flex-between ">
                            <div class="order-no">订单号: {{apply.Order_ID}}</div>
                            <image class="icon-delete"  @click="delApply(apply,idx1)" v-if="inArray(apply.Order_Status,[21,23,25])" src="/static/store/icon-del.png"></image>
                        </div>
                        <div class="info flex flex-between">
                            <div class="flex1 flex store-info">
                                <div class="store-pic" :style="{backgroundImage:'url('+apply.Stores_ImgPath+')'}"></div>
                                <div class="store-title">{{apply.Stores_Name}}</div>
                                <div class="action">
                                    <span @click="showStore(apply.Order_Store)" class="action-item">查看信息</span>
                                </div>
                            </div>
                            <span class="status-text">{{apply.Order_Status_desc}}</span>
                        </div>
                    </div>
                    <block v-if="apply && apply.prod_list">
                        <div class="goods-list" >
                            <div class="goods" v-for="(item,idx2) in apply.prod_list">
                                <div class="l" :style="{backgroundImage:'url('+item.prod_img+')'}"></div>
                                <div class="c">
                                    <div class="title line10">{{item.prod_name}}</div>
                                    <div class="line10 flex flex-between graytext font14 flex-vertical-center">
                                        <div class="spec-key">{{item.attr_info.attr_name||'无规格'}}</div>
                                        <div class="numbox font16"><span class="font14">x</span>{{item.prod_count}}</div>
                                    </div>
                                    <div class="font14"><span class="danger-color">￥<span class="price-num font16">{{item.prod_price}}</span></span></div>
                                </div>
                            </div>
                        </div>
                    </block>
                    <div class="price-box">
                        总计:<span class="danger-color">￥<span class="total_num font16">{{apply.Order_TotalPrice}}</span></span>
                    </div>
                    <div class="actions text-center" >
                        <block v-if="inArray(apply.Order_Status,[21])">
                            <button size="mini" @click="openRefuseDialog(apply,idx1)" class="acion-btn" type="warn">驳回</button>
                            <button size="mini" @click="handleApply(apply,idx1)" class="acion-btn">出库</button>
                        </block>
                    </div>
                </div>
            </div>

        </div>

        <wzw-dialog ref="storeInfo">
            <div class="storeInfoDialog">
                <div class="title text-center line15 font16">门店信息</div>
                <div class="row">
                    <div class="label">门店名称:</div>
                    <div class="text">{{storeInfo.Stores_Name}}</div>
                </div>
                <div class="row">
                    <div class="label">门店电话:</div>
                    <div class="text">{{storeInfo.Stores_Telephone}}</div>
                </div>
                <div class="row">
                    <div class="label">门店地址:</div>
                    <div class="text">{{storeInfo.Stores_Province_name}}{{storeInfo.Stores_City_name}}{{storeInfo.Stores_Area_name}}{{storeInfo.Stores_Address}}</div>
                </div>
            </div>
        </wzw-dialog>

        <wzw-dialog ref="refuseApply">
            <div class="refuseApplyDialog">
                <textarea class="reason" @input="bingReasonInput" placeholder-style="color:#999" placeholder="请输入驳回原因" auto-height />
                <div class="control">
                    <div @click="cancelRefuseApply" class="action-btn btn-cancel">取消</div>
                    <div @click="refuseApply" class="btn-sub action-btn">确定</div>
                </div>

            </div>
        </wzw-dialog>
    </div>
</template>

<script>
    import {pageMixin} from "../../common/mixin";
    import {mapGetters} from "vuex";
    import {getStorePurchaseSales,getStoreList,refuseStorePurchaseApply} from "../../common/fetch";
    import {error} from "../../common";
    import {findArrayIdx} from "../../common/tool";

    export default {
        mixins: [pageMixin],
        name: "storeApply",
        data() {
            return {
                applys: [],
                stores:[],
                storeInfo:{},
                tabidx:0,
                activeApply:null,
                order_status_arr:[null,21,22,23,24,25],
                order_status:null,
                reason:'',
                paginate:{
                    page:1,
                    finish:false,
                    pageSize:20,
                    totalCount:0
                }
            }
        },
        computed:{
            ...mapGetters(['Stores_ID'])
        },
        methods:{
            handleApply(apply,idx){
                uni.navigateTo({
                    url:`/pagesA/procurement/storeWholesaleSend?apply_id=${apply.Order_ID}`
                })
            },
            cancelRefuseApply(){
                this.$refs.refuseApply.close()
            },
            openRefuseDialog(apply){
                this.activeApply = apply
                this.$refs.refuseApply.show()
            },
            refuseApply(){

                console.log(this.reason)
                if(!this.reason){
                    error('请填写理由')
                    return;
                }
                refuseStorePurchaseApply({order_id:this.activeApply.Order_ID,reason:this.reason},{tip:'处理中'}).then(res=>{
                    this.$refs.refuseApply.close()
                    this.activeApply = null
                    this.reason = ''
                    apply.Order_Status = 23
                    apply.Order_Status_desc = '已驳回'

                },err=>{})
            },
            bingReasonInput(e){
                this.reason = e.detail.value
            },
            showStore(store_id){
                console.log(store_id)
                let idx = findArrayIdx(this.stores,{Stores_ID:store_id})
                console.log(idx)
                if(idx!==false){
                    this.storeInfo = this.stores[idx]
                    this.$refs.storeInfo.show()
                }else{
                    error('店铺信息错误')
                }
            },
            changIndex(idx){
                this.tabidx = idx
                this.paginate.page = 1
                this.paginate.finish = false

                this.order_status = this.order_status_arr[idx]
                this.loadInfo()
            },
            inArray(val,arr){
                return arr.indexOf(val)!=-1
            },
            async loadInfo(){

                if(this.paginate.finish)return;
                await getStorePurchaseSales({...this.paginate,order_status:this.order_status,store_id:this.Stores_ID},{tip:'加载中'}).then(res=>{

                    this.paginate.totalCount = res.totalCount




                    let rt = res.data.map(item=>{

                        for(var goods of item.prod_list){
                            if(goods.attr_info){
                                goods.attr_info = JSON.parse(goods.attr_info)
                            }
                        }
                        return {...item}
                    })

                    console.log(this.paginate.page)
                    if(this.paginate.page===1){
                        this.applys = rt
                    }else{
                        this.applys = this.applys.concat(rt)
                    }

                    //长度为0停止了
                    if(res.data.length===0){
                        this.paginate.finish = true
                        return;
                    }

                    this.paginate.page ++
                },err=>{

                })

            }
        },
        onReachBottom(){
            this.loadInfo()
        },
        created(){
            console.log(this.$store.state)
            this.loadInfo()

            getStoreList({pageSize:999}).then(res=>{
                this.stores = res.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    .navs {
        z-index: 2;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        background: #fff;
        font-size: 14px;
        padding: 0 10px;

        .nav-item {
            flex: 1;
            /*box-sizing: border-box;*/
            text-align: center;
            /*position: relative;*/
            color: #333;
        }

        .nav-item.active {
            color: $wzw-primary-color;
            border-bottom: 2px solid $wzw-primary-color;
        }
    }

    .space-box {
        height: 50px;
        width: 100%;
        background: white;
    }

    .lists{
        .item{
            margin: 10px 15px 10px;
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

    .storeInfoDialog{
        width: 560rpx;
        box-sizing: border-box;
        padding: 10px;
        font-size: 14px;
        .row{
            display: flex;
            margin-bottom: 8px;
            .label{
                color: #999;
                width: 70px;
            }
            .text{
                flex: 1;
                color: #444;
            }
        }
    }

    .refuseApplyDialog{
        width: 560rpx;
        box-sizing: border-box;
        padding: 15px;
        font-size: 14px;
        .reason{
            font-size: 14px;
            min-height: 200px;
            border: 1px solid #E3E3E3;
            line-height: 1.4;
            height: auto;
            width: auto;
            padding: 10px;
        }
        .control{
            margin-top: 15px;
            display: flex;
            justify-content: center;
            .action-btn{
                width: 70px;
                height: 36px;
                line-height: 36px;
                font-size: 14px;
                text-align: center;
                color: #666;
                background: #e9e9e9;
                &.btn-sub{
                    background: $wzw-primary-color;
                    color: white;
                    margin-left: 10px;
                }
            }
        }
    }
</style>
