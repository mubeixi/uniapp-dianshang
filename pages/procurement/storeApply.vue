<template>
    <div class="wrap">
        <div class="navs">
<!--            21：待处理	可操作：删除、撤回-->

<!--            22：已出库	可操作：确认收货-->

<!--            23：已驳回	可操作：删除、修改库存、更换渠道商、重新提交-->

<!--            24：已完成	可操作：无-->

<!--            25：已撤回	可操作：删除、修改库存、更换渠道商、重新提交-->
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
                    <div class="head flex">
                        <div class="info flex flex1">
                            <div class="store-pic" :style="{backgroundImage:'url('+apply.supplier_img+')'}"></div>
                            <div class="store-title">{{apply.supplier_name}}</div>
                            <div class="action">(<span @click="showStore(apply.store)"
                                                       class="action-item">查看信息</span><span
                                    class="padding4-c">/</span><span class="action-item" @click="changeChannel(apply)">修改渠道</span>)
                            </div>
                            <div class="order_no">进货单号: {{apply.Order_ID}}</div>
                        </div>
                        <div class="status">
                            <span class="status-text danger-color padding10-c font14">{{apply.Order_Status_desc}}</span>
                            <el-tooltip v-if="apply.reason" class="" effect="dark" :content="apply.reason"
                                        placement="top">
                                <i class="el-icon-warning-outline danger-color padding10-c"></i>
                            </el-tooltip>
                            <i @click="delApply(apply,idx1)" v-if="inArray(apply.Order_Status,[21,23,25])" title="删除订单"
                               class="el-icon-delete-solid"></i>
                        </div>
                    </div>
                    <div class="purchases"
                         v-loading="ajax_idx===idx1"
                         v-if="apply && apply.prod_list"
                         cellspacing="0">
                        <div class="goods-list" v-for="(item,idx2) in apply.prod_list">
                            <div class="goods">
                                <div class="l" :style="{backgroundImage:'url('+item.prod_img+')'}"></div>
                                <div class="c">
                                    <div class="title line10">{{item.prod_name}}</div>
                                    <div class="spec-key graytext font14">{{item.attr_info.attr_name}}</div>
                                    <div class="numbox graytext">
                                        <span class="handle" v-if="inArray(apply.Order_Status,[23,25])">
                                          <span class="minus" @click="minusFn(apply,item,idx1)">
                                            <i class="el-icon-minus icon"></i>
                                          </span>
                                          <input class="input" :value="item.prod_count" @blur="setValFn($event,apply,item,idx1)"/>
                                          <span class="plus" @click="plusFn(apply,item,idx1)">
                                            <i class="el-icon-plus icon"></i>
                                          </span>
                                        </span>
                                        <span v-else>数量：{{item.prod_count}}</span>
                                        <el-tooltip v-if="item.prod_count_change_desc" class="" effect="dark"
                                                    :content="item.prod_count_change_desc" placement="top">
                                            <i class="el-icon-warning-outline danger-color padding10-c font18"></i>
                                        </el-tooltip>

                                    </div>
                                </div>
                                <div class="r font14">金额:<span class="danger-color">￥<span
                                        class="price-num font16">2500</span></span></div>
                            </div>
                        </div>
                    </div>
                    <div class="price-box">
                        <div class="text-center">
                            <div class="total line6">总计:<span class="danger-color">￥<span class="total_num font18">5329.00</span></span>
                            </div>
                            <div class="postage font14 graytext">(含运费￥{{apply.Order_Shipping.Price}})</div>
                        </div>
                    </div>
                    <div class="actions text-center" >
                        <div v-if="inArray(apply.Order_Status,[21])">
                            <el-button @click="cancelApply(apply,idx1)" class="acion-btn" type="danger">撤回进货单
                            </el-button>
                        </div>
                        <div v-if="inArray(apply.Order_Status,[22])">
                            <el-button class="acion-btn line8" type="danger">确认收货</el-button>
                            <div @click="showLogistics(apply)" class="font12 graytext2 logistics">查看物流</div>
                        </div>
                        <div v-if="inArray(apply.Order_Status,[23,25])">
                            <el-button @click="submitAplly(apply,idx1)" class="acion-btn" type="danger">提交进货单
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {pageMixin} from "../../common/mixin";
    import {mapState} from "vuex";
    import {getStorePurchaseApply} from "../../common/fetch";
    import {error} from "../../common";

    export default {
        mixins: [pageMixin],
        name: "Apply",
        data() {
            return {
                applys: [],
                tabidx:0,
                order_status_arr:[null,21,22,23,24,25],
                order_status:null,
                paginate:{
                    page:1,
                    finish:false,
                    pageSize:20,
                    totalCount:0
                }
            }
        },
        computed:{
          ...mapState(['Stores_ID'])
        },
        methods:{
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
                await getStorePurchaseApply({...this.paginate,order_status:this.order_status}).then(res=>{

                    this.paginate.totalCount = res.totalCount

                    //长度为0停止了
                    if(res.data.length===0){
                        this.paginate.finish = true
                        return;
                    }


                    let rt = res.data.map(item=>{

                        for(var goods of item.prod_list){
                            if(goods.attr_info){
                                goods.attr_info = JSON.parse(goods.attr_info)
                            }
                        }
                        return {...item}
                    })

                    if(this.paginate.page===1){
                        this.applys = rt
                    }else{
                        this.applys = this.applys.concat(rt)
                    }
                    this.paginate.page ++
                },err=>{

                })

            }
        },
        onReachBottom(){
            this.loadInfo()
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
</style>
