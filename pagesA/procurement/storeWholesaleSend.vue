<template>
    <div class="wrap" @click="commonClick">
        <div class="container">
            <div class="lists">
                <div class="item" >
                    <div class="head">
                        <div class="status flex flex-between ">
                            <div class="order-no">订单号: {{apply.Order_ID}}</div>
<!--                            <image class="icon-delete"  @click="delApply(apply,idx1)" v-if="inArray(apply.Order_Status,[21,23,25])" src="/static/store/icon-del.png"></image>-->
                        </div>
                        <div class="info flex flex-between">
                            <div class="flex1 flex store-info">
                                <div class="store-pic" :style="{backgroundImage:'url('+apply.Stores_ImgPath+')'}"></div>
                                <div class="store-title">{{apply.Stores_Name}}</div>
                                <div class="action">
                                    <span @click="showStore(apply.Order_Store)" class="action-item">查看信息</span>
                                </div>
                            </div>
<!--                            {{apply.Order_Status_desc}}-->
                            <span class="status-text"></span>
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
                                        <div class="numbox font16">


                                        </div>
                                    </div>
                                    <div class="flex flex-between">
                                        <div class="font14"><span class="danger-color">￥<span class="price-num font16">{{item.prod_price}}</span></span></div>
                                        <div class="inputNumber" @click="setCurrentGoods(item)">
                                            <div class="clicks" @click="minusFn(item)">-</div>
                                            <input class="inputq"  type="number" :value="item.prod_count" @blur="setValFn" >
                                            <div class="clicks" @click="plusFn" style="color: #999;background: #e7e7e7">+</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </block>
                    <div class="price-box">
                        总计:<span class="danger-color">￥<span class="total_num font16">{{apply.Order_TotalPrice}}</span></span>
                    </div>

                </div>
            </div>

        </div>
        <div class="sendbox">
            <div class="title"><span class="tip"></span><span class="text">发货信息</span></div>
            <div class="row">
                <div class="label">需要物流</div>
                <div class="form-item" style="text-align: right">
                    <switch checked @change="changeNeedShipping" color="#F43131" style="transform:scale(0.9)" />
                </div>
            </div>
            <div class="row" v-if="is_need_shipping">
                <div class="label">配送方式</div>
                <div class="form-item express">
                    <picker @change="bindPickerChange" :value="exprss_index" :range="exprss_list">
                        <view class="uni-input">{{exprss_list[exprss_index]}}</view> <view class="funicon icon-fanhui icon" ></view>
                    </picker>
                </div>
            </div>
            <div class="row" v-if="is_need_shipping">
                <div class="label">快递单号</div>
                <input v-model="ShippingID" class="form-item" placeholder="请输入快递单号" />
            </div>
            <div class="row" v-if="is_need_shipping">
                <div class="label">运费</div>
                <input type="number" step="0.01" v-model="Express_Price" class="form-item" placeholder="请输入运费" />
            </div>
        </div>
        <div class="subbox">
            <button @click="subFn" class="subbtn" type="warn">立即发货</button>
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
    import {getStorePurchaseSales,getStoreList,getShipping,sendStorePurchaseApply,subStorePurchaseApply} from "../../common/fetch";
    import {error, toast} from "../../common";
    import {emptyObject, findArrayIdx} from "../../common/tool";


    export default {
        mixins: [pageMixin],
        name: "storeWholesale",
        data() {
            return {
                apply: {},
                apply_id:'',
                currentGoods:null,
                is_need_shipping:1,
                exprss_index:0,
                exprss_id_list:[],
                exprss_list:[],
                storeInfo:{},
                ShippingID:'',
                Express_Price:'',
                stores:[],
                reason:'',
                paginate:{
                    page:1,
                    finish:false,
                    pageSize:20,
                    totalCount:0
                }
            }
        },
        onLoad(options){
            this.apply_id = options.apply_id
        },
        computed:{
          ...mapGetters(['Stores_ID'])
        },
        methods:{
            setCurrentGoods(obj){
              this.currentGoods = obj
            },
            setValFn(e){

                if(!this.currentGoods){
                    error('请选择需要修改的商品')
                    return;
                }
                //这种骚操作需要看是不是兼容
                let goods = this.currentGoods
                console.log(e,e.detail.value)


                let Attr_ID = null
                if(goods.attr_info && goods.attr_info.attr_val){
                    Attr_ID  = goods.attr_info.attr_val.Product_Attr_ID
                }
                let newVal = e.target.value,oldVal = goods.prod_count

                if(parseInt(newVal)>=parseInt(oldVal)){
                    //e.target.value = oldVal
                    error('只允许减少数量')
                    return;
                }

                //如果设置失败，数量要变回来
                this.updateGoodsStock(this.apply.Order_ID,goods.prod_id,Attr_ID,e.target.value,function(){
                    goods.prod_count = newVal
                },function(){
                    console.log('errorerror')
                    //e.target.value = oldVal
                })
            },
            plusFn(goods){

                error('不允许增加数量')
                return;
                let Attr_ID = null
                if(goods.attr_info && goods.attr_info.attr_val){
                    Attr_ID  = goods.attr_info.attr_val.Product_Attr_ID
                }
                goods.prod_count++
                //this.updateGoodsStock(this.apply.Order_ID,goods.prod_id,Attr_ID,goods.prod_count+1,function(){goods.prod_count++})
            },

            minusFn(goods){
                let Attr_ID = null
                if(goods.attr_info && goods.attr_info.attr_val){
                    Attr_ID  = goods.attr_info.attr_val.Product_Attr_ID
                }
                if(goods.prod_count<2){
                    error('数量最少为1')
                    return;
                }
                //goods.prod_count--
                this.updateGoodsStock(this.apply.Order_ID,goods.prod_id,Attr_ID,goods.prod_count-1,function(){goods.prod_count--})
            },

            async updateGoodsStock(order_id,prod_id,attr_id,modify_prod_count,call,errcall){

                let prod_info = {}
                if(!attr_id)attr_id=0
                prod_info[prod_id] = {[attr_id]:modify_prod_count}
                await subStorePurchaseApply({order_id,receive_id:this.Stores_ID,prod_json:JSON.stringify(prod_info)}).then(res=>{
                    console.log('success')
                    toast(res.msg)
                    call && call()
                },err=>{
                    toast(err.msg)
                    console.log('error')
                    errcall && errcall()
                })


            },
            subFn(){

                let postData = null
                if(this.is_need_shipping){
                    postData = {
                        is_need_shipping:this.is_need_shipping,
                        Express_Price:this.ShippingID,
                        ShippingID:this.ShippingID,
                        Express:this.exprss_list[this.exprss_index],
                        store_id:this.Stores_ID,
                        order_id:this.apply_id
                    }
                }else{
                    postData = {
                        is_need_shipping:this.is_need_shipping,
                        store_id:this.Stores_ID,
                        order_id:this.apply_id
                    }
                }

                if(!emptyObject(postData)){
                    return
                }

                sendStorePurchaseApply(postData).then(res=>{
                    toast('操作成功')
                    setTimeout(function(){
                        uni.navigateTo({
                            url:'/pagesA/procurement/storeWholesale'
                        })
                    },1000)
                },err=>{})

            },
            bindPickerChange(e){
              this.exprss_index = e.detail.value
            },
            changeNeedShipping(e){
							console.log(e.detail.value)
                this.is_need_shipping = e.detail.value?1:0
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
            cancelRefuseApply(){
                this.$refs.refuseApply.close()
            },
            openRefuseDialog(apply){
                this.activeApply = apply
                this.$refs.refuseApply.show()
            },
            inArray(val,arr){
                return arr.indexOf(val)!=-1
            },
            async loadInfo(){

                await getStorePurchaseSales({store_id:this.Stores_ID}).then(res=>{

                     for(var item of res.data){
                         if(this.apply_id == item.Order_ID){
                             for(var goods of item.prod_list){
                                 if(goods.attr_info){
                                     goods.attr_info = JSON.parse(goods.attr_info)
                                 }
                             }
                             this.apply = item
                             break;
                         }
                     }


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

            getShipping({pageSize:999}).then(res=>{
                this.exprss_list = Object.values(res.data)
                this.exprss_id_list = Object.keys(res.data)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .inputNumber{
        border: 1px solid #ccc;
        border-radius: 6rpx;
        height: 50rpx;
        display: flex;
        .inputq{
            color: black;
            margin: 0 auto;
            width: 80rpx;
            height: 50rpx;
            text-align: center;
            font-size: 24rpx;
            border-left: 2rpx solid #ccc;
            border-right: 2rpx solid #ccc;
        }
        .clicks{
            height: 50rpx;
            line-height: 50rpx;
            width: 60rpx;
            text-align: center;
        }
    }
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
.subbox{
    position: fixed;
    bottom: 0;
    width: 750rpx;
    .subbtn{
        border-radius: 0;
    }
}

.sendbox{
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
        font-size: 14px;
        margin: 0 10px;
        display: flex;
        align-items: center;
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        /*box-sizing: border-box;*/
        .label{
            width: 90px;
            color: #999;
        }
        .form-item{
            color: #444;
            flex: 1;
            .radio{
                margin-right: 8px;
                font-size: 14px;
            }
            &.express{
                text-align: right;
                color: #666;
                .uni-input{
                    display: inline-block;
                }
                .icon-fanhui{
                    margin-left: 10px;
                    display: inline-block;
                    transform: rotate(180deg);
                }
            }
        }
        &:last-child{
            border-bottom: none;
        }
    }
}
</style>
