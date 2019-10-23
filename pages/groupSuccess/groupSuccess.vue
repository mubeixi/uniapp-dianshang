<template>
    <div class="start">
        <!--       <page-title class="nav-title" :title="msg"  @handle="handle" rightHidden="true"></page-title>-->
        <!-- 商品详情部分 -->
        <div class="first">
            <div class="left">
                <img class="img" :src="product.ImgPath"/>
            </div>
            <div class="right">
                <div class="top">
                    {{product.Products_Name}}
                </div>
                <div class="bottom">
                    <div class="price">
                        ¥<span class="prices">69.9</span><span>拼团省34.1</span>
                    </div>
                    <div class="tuan">
                        {{product.pintuan_people}}人团 • 已团{{product.pintuan_flag}}件
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品保证 -->
        <ul class="second">
            <li>
                <image class="img" src="/static/tuan/check.png"/>
                全场包邮
            </li>
            <li>
                <image class="img" src="/static/tuan/check.png"/>
                7天退换
            </li>
            <li>
                <image class="img" src="/static/tuan/check.png"/>
                48小时发货
            </li>
            <li>
                <image class="img" src="/static/tuan/check.png"/>
                假一赔十
            </li>
        </ul>
        <!-- 团长 -->
        <div class="three">
            <div class="paySuc">
                <image class="img" src="/static/tuan/paySuc.png"/>
                支付成功
            </div>
            <ul class="lyl">
                <li>
                    <image class="img" src="/static/tuan/lyl.png"/>
                    <image src="/static/tuan/tuanzhang.png" class=" img tuanzhang"/>
                    <span class="tuanzhang">团长</span></li>
                <li>
                    <image class="img" src="/static/tuan/lyl.png"/>
                </li>
                <li>
                    <image class="img" src="/static/tuan/lyl.png"/>
                </li>
            </ul>
        </div>
        <!-- 倒计时 -->
        <div class="how">
            <image class="img" src="/static/tuan/time.png"/>
            <span class="my">拼团中，还差<span>{{product.pintuan_people-product.pintuan_flag}}</span>人</span>
        </div>
        <div class="times">
            <div class="line"></div>
            <div class="text">
                剩余
                <div class="myTime">
                    <span class="num">{{countdown.d}}</span>
                    <span class="lines">天</span>
                    <span class="num">{{countdown.h}}</span>
                    <span class="lines">:</span>
                    <span class="num">{{countdown.m}}</span>
                    <span class="lines">:</span>
                    <span class="num">{{countdown.s}}</span>
                </div>
                结束
            </div>
            <div class="line"></div>
        </div>
        <!--查看订单 -->
        <div class="dingdan">
            <span @click="goOrderDetail" class="vanButton">查看订单</span>
            <span class="vanButton invi">邀请好友</span>
        </div>
        <div class="liji">
            <div class="vanButton">立即参团</div>
        </div>

        <!-- 间隙 -->
        <div class="mbxline"></div>
        <!-- 拼团规则 -->
        <div class="guize">
            <div class="top">拼团规则</div>
            <div class="xiang">
                <div class="hang">
                    <image class="img" src="/static/tuan/ju.png"/>
                    <span>开团或者参加别人的团</span>
                </div>
                <div class="hang">
                    <image class="img" src="/static/tuan/ju.png"/>
                    <span>在规定的时间内，邀请好友参团</span>
                </div>
                <div class="hang">
                    <image class="img" src="/static/tuan/ju.png"/>
                    <span>达到拼团人数，分别给团长和团员发货</span>
                </div>
                <div class="hang">
                    <image class="img" src="/static/tuan/ju.png"/>
                    <span>未达到拼团人数，货款将自动原路返还</span>
                </div>
            </div>
        </div>
        <!-- 更多 -->
        <div class="dianzhang">店长推荐</div>
        <div class="prolist">
            <div class="pro-item" v-for="(item,index) in prodList" :key="index" @click="goProductDetail(item.Products_ID,item.is_pintuan)">
<!--                <image src="/static/check/pro1.png" alt="" class="img"/>-->
                <img :src="item.ImgPath" alt="" class="img">
                <div class="item-name">{{item.Products_Name}}</div>
                <div class="price">
                    <span class="n_price"><span class="pricem">￥</span>{{item.Products_PriceX}}</span>
                    <span class="o_price">已团{{item.Products_Sales}}件</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import pagetitle from "@/components/title";
    import {pageMixin} from "../../common/mixin";
    import {getOrderDetail,getProductDetail,getProd,getPintuanTeam} from "../../common/fetch";
    import {getGroupCountdown} from "../../common/tool";
    import {goProductDetail} from "../../common";

    export default {
        mixins: [pageMixin],
        name: 'App',
        data() {
            return {
                orderInfo: {},
                product:{},
                teamList:[],
                Prod_ID:null,
                prodList:[],
                Order_ID:null,
                countdown:{d:0,h:0,m:0,s:0},
                msg: '开团成功',//立即参团
                prod_arg: {
                    page: 1,
                    pageSize: 4,
                },
                hasMore: true, // 是否还有产品
            }
        },
        components: {
            // pagetitle
        },
        onLoad(options) {
            if (options.order_id) {
                this.Order_ID = options.order_id;
            }
        },
        onShow() {
            this.INIT()
            // this.get_user_info();// 获取用于可用余额
        },
        methods: {
            goProductDetail,
            goOrderDetail(){
                //这里应该需要跳转到订单详情页
                uni.navigateTo({
                    url:'/pages/order/order?index='+2
                })
            },
            async INIT(){
                //这里要设置Prod_ID
                await this.getOrderDetail();
                await this.getProdDetail(this.Prod_ID);

                await this.getProdFunc()

                //获取正在拼团的团队
                await this.getPintuanTeamList(this.Prod_ID)


            },
            async getPintuanTeamList(id){
                await getPintuanTeam({prod_id:id},{errtip:false}).then(res=>{
                    if(res.errorCode === 0){
                        this.teamList = res.data
                    }

                }).catch(e=>{

                })
            },
            getProdDetail(item){
                let data={
                    prod_id:item,
                    Users_ID:'wkbq6nc2kc'
                }
                let _self = this;

                getProductDetail(data).then(res=>{

                    this.product = res.data;
                    if(res.data.skujosn) {
                        this.product.skujosn = typeof res.data.skujosn ==='string' ?JSON.parse(res.data.skujosn):res.data.skujosn;
                        this.product.skuvaljosn = typeof res.data.skuvaljosn === 'string' ?JSON.parse(res.data.skuvaljosn):res.data.skuvaljosn;
                    }

                    //this.stampCount()
                    //开发时候一直倒计时太乱了
                    window.groupStam = setInterval(this.stampCount,1000)

                }).catch(e=>{
                    console.log(e)
                })

            },
            // 订单详情
            async getOrderDetail() {

                let _self = this;
                await getOrderDetail({
                    Order_ID: this.Order_ID,
                }).then(res => {
                    console.log(res)
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

                        this.Prod_ID = res.data.prod_list[0].prod_id

                    }
                })
            },
            stampCount(){

                let rt  = {};
                if(this.product && this.product.pintuan_end_time){
                    let computedStamp = getGroupCountdown({end_timeStamp:this.product.pintuan_end_time})
                    if(computedStamp){
                        rt = computedStamp
                    }else{
                        //如果不对，就清空
                        window.clearInterval(window.groupStam)
                    }
                }

                //console.log(rt)

                this.countdown = rt
            },
            async getProdFunc(){

                let oldlist = this.prodList;
                await getProd(this.prod_arg).then(res=>{
                    if(res.errorCode == 0){
                        this.prodList = oldlist.concat(res.data);
                        this.hasMore = (res.totalCount / this.prod_arg.pageSize) > this.prod_arg.page ? true : false ;
                        this.prod_arg.page += 1;
                    }
                }).catch(e=>console.log(e))
            },
        },

    }
</script>

<style scoped lang="scss">
    .start {
        overflow-x: hidden;
        background-color: #fff !important;

        .nav-title {
            background: #fafafa !important;
        }

        .first {
            padding: 10px 0px;
            display: flex;

            .left {
                width: 290rpx;
                height: 290rpx;
                margin-left: 10px;

                .img {
                    width: 290rpx;
                    height: 290rpx;
                }
            }

            .right {
                width: 460rpx;
                margin-left: 20px;
                padding-top: 10px;
                padding-bottom: 10px;
                padding-right: 12px;
                position: relative;

                div.top {
                    width: 100%;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                    line-height: 21px;
                }

                div.bottom {
                    margin-top: 40rpx;
                    @media screen and (max-width: 371px) {
                        margin-top: 0;
                    }

                    .price {
                        font-size: 24rpx;
                        color: #F43131;

                        span {
                            margin-left: 14px;
                            color: #999999;
                        }

                        .prices {
                            color: #F43131;
                            font-size: 40rpx;
                            margin-left: 5px;
                        }
                    }

                    .tuan {
                        margin-top: 3px;
                        font-size: 24rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(153, 153, 153, 1);
                    }
                }
            }
        }

        .second {
            display: flex;
            width: 100%;
            height: 40px;
            padding: 14px 0px;
            background-color: #FAFAFA;
            box-sizing: border-box;
            font-size: 22rpx;
            color: #333;
            justify-content: space-around;
            padding-left: 16px;
            padding-right: 16px;
            @media screen and (max-width: 371px) {
                padding: 14px 0px;
            }

            .img {
                width: 16px;
                height: 16px;
                margin-right: 4px;
            }

            li {
                display: flex;
                align-items: center;
            }
        }

        .three {
            .paySuc {
                padding: 82rpx 241rpx;
                padding-bottom: 75rpx;
                display: flex;
                align-items: center;
                font-size: 46rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(244, 49, 49, 1);
                line-height: 38px;

                .img {
                    width: 34px;
                    height: 31px;
                }
            }

            .lyl {
                display: flex;
                margin: 0 auto;
                padding-left: 220rpx;
                padding-right: 205rpx;
                list-style: none;

                .img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }

                li {
                    margin-right: 11px;
                    width: 95rpx;
                    height: 95rpx;
                    border-radius: 50%;
                    position: relative;

                    .tuanzhang {
                        width: 26px;
                        height: 19px;
                        border-radius: 0;
                        position: absolute;
                        left: -11px;
                    }

                    span.tuanzhang {
                        width: 26px;
                        font-size: 10px;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 1);
                        left: -9px;
                    }
                }
            }
        }

        .how {
            width: 167px;
            margin-top: 28px;
            margin-bottom: 13px;
            padding-left: 231rpx;
            display: flex;
            align-items: center;

            .img {
                width: 18px;
                height: 18px;
            }

            .my {
                font-size: 30rpx;
                color: #333;
                margin-left: 8px;

                span {
                    color: #F43131;
                    margin: 0 5px;
                }
            }
        }

        .times {
            display: flex;
            // width: 344px;
            padding-left: 77rpx;
            padding-right: 76rpx;
            margin: 0 auto;
            align-items: center;
            justify-content: center;

            .line {
                width: 103rpx;
                height: 1px;
                background-color: #DEDDDD;
            }

            .text {
                width: 420rpx;
                margin: 0 6px;
                display: flex;
                align-items: center;
                font-size: 24rpx;

                .myTime {
                    margin: 0 14px;
                    font-size: 30rpx;
                }

                span.num {
                    background-color: #484848;
                    border-radius: 2px;
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    font-size: 17px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #fff;
                    text-align: center;
                }

                span.lines {
                    //width: 6px;
                    padding: 0 2px;
                    display: inline-block;
                    height: 24px;
                    text-align: center;
                }
            }
        }

        .dingdan {
            margin-top: 18px;
            font-size: 0;
            margin-bottom: 15px;
            padding: 0rpx 110rpx;
            // @media screen and (max-width: 370px) {
            //     margin-left: 15px;
            //     margin-right: 0;
            //     margin-top:18px;
            //     font-size: 0;
            //     margin-bottom: 15px;
            // }
            // @media screen and (min-width: 371px) and (max-width: 380px) {
            //     margin: 0 4px;
            //     margin-top: 18px;
            //     font-size: 0;
            //     margin-bottom: 15px;
            // }
            .vanButton {
                width: 250rpx;
                height: 74rpx;
                background: rgba(250, 107, 39, 1);
                border-radius: 6px;
                font-size: 32rpx;
                color: #fff;
                display: inline-block;
                line-height: 74rpx;
                text-align: center;
            }

            .invi {
                margin-left: 30rpx;
                font-size: 34rpx;
                background-color: #F43131;
            }
        }

        .liji {
            margin-top: 18px;
            font-size: 0;
            margin: 0 auto;
            display: flex;
            margin-bottom: 15px;
            height: 74rpx;
            line-height: 74rpx;

            .vanButton {
                font-size: 34rpx;
                width: 690rpx;
                margin: 0 auto;
                border-radius: 10px;
                color: #fff;
                text-align: center;
                background-color: #F43131;
            }
        }

        .mbxline {
            width: 100%;
            height: 11px;
            background-color: #f2f2f2;
        }

        .guize {
            .top {
                font-size: 30rpx;
                color: #333333;
                margin-top: 17px;
                margin-left: 18px;
                margin-bottom: 17px;
            }

            .xiang {
                margin-left: 30px;

                .hang {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;

                    .img {
                        width: 6px;
                        height: 11px;
                    }

                    span {
                        margin-left: 8px;
                        font-size: 24rpx;
                        color: #333333;
                    }
                }
            }
        }

        .dianzhang {
            font-size: 30rpx;
            color: #333333;
            background-color: #f2f2f2;
            padding: 17px;
        }
    }

    // 查看更多
    .prolist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 11px;
        background-color: #f2f2f2;
    }

    .pro-item {
        width: 345rpx;
        margin-bottom: 15px;
        background: #fff;
    }

    .pro-item .img {
        width: 100%;
        height: 345rpx;
    }

    .item-name {
        font-size: 24rpx;
        line-height: 30rpx;
        height: 60rpx;

        padding-left: 11rpx;
        padding-right: 15rpx;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .red {
        color: #F43131;
        font-weight: 700;
    }

    .price {
        margin-top: 10px;
        padding: 0 5px 10px;
    }

    .pricem {
        font-size: 24rpx;
        font-style: normal;
    }

    .n_price {
        color: #ff0000;
        font-size: 34rpx;
    }

    .o_price {
        color: #afafaf;
        font-size: 12px;
        margin-left: 22rpx;
    }
</style>
