<template>
  <div class="start">
       <!-- <pagetitle class="nav-title" :title="msg"  @handle="handle" rightHidden="true"></pagetitle> -->
        <!-- 商品详情部分 -->
        <div class="first">
            <div class="left">
                <img src="../assets/result/pro1.png">
            </div>
            <div class="right">
                   <div class="top">
                       小木人精装50卷高品质原生竹浆卫生纸卷纸/无芯/妇婴用纸
                   </div>
                   <div class="bottom">
                        <div class="price">
                            ¥<span class="prices">69.9</span><span>拼团省34.1</span>
                        </div>
                        <div class="tuan">
                                3人团 • 已团8345件
                        </div>
                   </div>
            </div>
        </div>
        <!-- 商品保证 -->
        <ul class="second">
            <li><img src="../assets/tuan/check.png">全场包邮</li>
            <li><img src="../assets/tuan/check.png">7天退换</li>
            <li><img src="../assets/tuan/check.png">48小时发货</li>
            <li><img src="../assets/tuan/check.png">假一赔十</li>
        </ul>
        <!-- 团长 -->
        <div class="three">
            <div class="paySuc"><img src="../assets/tuan/paySuc.png" >支付成功</div>
            <ul class="lyl">
                <li><img src="../assets/tuan/lyl.png"><img src="../assets/tuan/tuanzhang.png" class="tuanzhang"><span class="tuanzhang">团长</span></li>  
                <li><img src="../assets/tuan/lyl.png"></li>  
                <li><img src="../assets/tuan/lyl.png"></li>  
            </ul>
        </div>
        <!-- 倒计时 -->
        <div class="how">
            <img src="../assets/tuan/time.png" >
            <span class="my">拼团中，还差<span>1</span>人</span>
        </div>
        <div class="times">
            <div class="line"></div>
            <div class="text">
                剩余
                <div class="myTime">
                       <span class="num">23</span>
                       <span  class="lines">:</span>
                       <span class="num">23</span>
                       <span  class="lines">:</span>
                       <span class="num">23</span>
                </div>
                结束
            </div>
            <div class="line"></div>
        </div>
        <!--查看订单 -->
        <div class="dingdan">
             <span  class="vanButton">查看订单</span>
             <span  class="vanButton invi">邀请好友</span>
        </div>
        <div class="dingdan liji">
             <div class="vanButton">立即参团</div>
        </div>
         
        <!-- 间隙 -->
        <div class="mbxline"></div>
        <!-- 拼团规则 -->
        <div class="guize">
            <div class="top">拼团规则</div>
            <div class="xiang">
                <div class="hang">
                    <img src="../assets/tuan/ju.png"><span>开团或者参加别人的团</span>
                </div>
                <div class="hang">
                    <img src="../assets/tuan/ju.png"><span>在规定的时间内，邀请好友参团</span>
                </div>
                <div class="hang">
                    <img src="../assets/tuan/ju.png"><span>达到拼团人数，分别给团长和团员发货</span>
                </div>
                <div class="hang">
                    <img src="../assets/tuan/ju.png"><span>未达到拼团人数，货款将自动原路返还</span>
                </div>
            </div>
        </div>
        <!-- 更多 -->
        <div class="dianzhang">店长推荐</div>
        <div class="prolist">
            <div class="pro-item" v-for="i in 4" :key="i">
                <img src="/static/check/pro1.png" alt="">
                <div class="item-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                <div class="price">
                    <span class="n_price"><i>￥</i>169.00</span>
                    <span class="o_price">已团555件</span>
                </div>
             </div>  
        </div>
  </div>
</template>

<script>
// import pagetitle from "@/components/title";
export default {
  name: 'App',
  components: {
    pagetitle
  },
  data(){
      return{
          msg:'开团成功'//立即参团
      }
  }
}
</script>

<style scoped lang="scss">
.start{
    overflow-x: hidden;
    background-color: #fff !important;
    .nav-title {
        background: #fafafa !important;
    }
    .first{
        padding: 0.1rem 0rem;
        display: flex;
        .left{
            width: 44%;
            img{
                width: 100%;
            }
        }
        .right{
            width: 56%;
            margin-left: 0.2rem;
            padding-top: 0.1rem;
            padding-bottom: 0.1rem;
            padding-right: 0.12rem;
            position: relative;
            div.top{
                width: 100%;
                font-size:0.14rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:21px;
            }
            div.bottom{
                margin-top: 18%;
                @media screen and (max-width: 371px) {
                    margin-top: 0;
                }
                .price{
                    font-size: 0.13rem;
                    color: #F43131;
                    span{
                        margin-left: 0.14rem;
                        color: #999999;
                    }
                    .prices{
                        color: #F43131;
                        font-size: 0.23rem;
                        margin-left: 0.05rem;
                    }
                }
                .tuan{
                    margin-top: 0.03rem;
                    font-size:0.13rem;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(153,153,153,1);
                }
            }
        }
    }
    .second{
        display: flex;
        width: 100%;
        height: 0.4rem;
        padding:0.14rem 0rem;
        background-color: #FAFAFA;
        box-sizing: border-box;
        font-size: 0.12rem;
        color: #333;
        justify-content: space-around;
        padding-left: 0.16rem;
        padding-right: 0.16rem;
        @media screen and (max-width: 371px) {
            padding:0.14rem 0rem;
        }
        img{
            width: 0.16rem;
            height: 0.16rem;
            margin-right: 0.04rem;
        }
        li{
            display: flex;
            align-items: center;
        }
    }
    .three{
        .paySuc{
            padding: 0.44rem 25%;
            display: flex;
            align-items: center;
            font-size:0.25rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(244,49,49,1);
            line-height:38px;
            padding-left: 30%;
            img{
                width: 0.34rem;
                height: 0.31rem;
            }
        }
        .lyl{
            display: flex;
            margin: 0 auto;
            width: 189px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            li{
                margin-right: 11px;
                width: 0.52rem;
                height: 0.52rem;
                border-radius: 50%;
                position: relative;
                .tuanzhang{
                    width: 26px;
                    height: 19px;
                    border-radius: 0;
                    position: absolute;
                    left: -0.11rem;
                }
                span.tuanzhang{
                    width: 26px;
                    font-size: 10px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255,255,255,1);
                    left: -0.09rem;
                }
            }
        }
    }
    .how{
        margin: 0 auto;
        width: 167px;
        margin-top: 0.28rem;
        margin-bottom: 0.13rem;
        display: flex;
        align-items: center;
        img{
            width: 0.18rem;
            height: 0.18rem;
        }
        .my{
            font-size: 0.17rem;
            color: #333;
            margin-left: 8px;
            span{
                color: #F43131;
                margin: 0 0.05rem;
            }
        }
    }
    .times{
        display: flex;
        width: 344px;
        margin: 0 auto;
        align-items: center;
        .line{
            width: 0.68rem;
            height: 0.01rem;
            background-color: #DEDDDD;
        }
        .text{
            margin: 0 0.06rem;
            display: flex;
            align-items: center;
            .myTime{
                margin: 0 0.14rem;
            }
            span.num{
                background-color: #484848;
                border-radius: 2px;
                display: inline-block;
                width: 24px;
                height: 24px;
                font-size:17px;
                font-family:PingFang SC;
                font-weight:500;
                color: #fff;
                text-align: center;
            }
            span.lines{
                width: 6px;
                display: inline-block;
                height: 24px;
                text-align: center;
            }
        }
    }
    .dingdan{
        margin: 0 0.6rem;
        margin-top: 0.18rem;
        font-size: 0;
        margin-bottom: 0.15rem;
        @media screen and (max-width: 370px) {
            margin-left: 15px;
            margin-right: 0;
            margin-top: 0.18rem;
            font-size: 0;
            margin-bottom: 0.15rem;
        }
        @media screen and (min-width: 371px) and (max-width: 380px) {
            margin: 0 0.4rem;
            margin-top: 0.18rem;
            font-size: 0;
            margin-bottom: 0.15rem;
        }
        .vanButton{
            width: 1.38rem;
            height: 0.41rem;
            background:rgba(250,107,39,1);
            border-radius:6px;
            font-size: 0.18rem;
            color: #fff;
            display: inline-block;
            line-height: 0.41rem;
            text-align: center;
        }
        .invi{
            margin-left: 0.17rem;
            background-color: #F43131;
        }
    }
    .liji{
        margin: 0 auto;
        display: flex;
        margin-bottom: 0.15rem;
        .vanButton{
            width: 90%;
            margin: 0 auto;
            background-color: #F43131;
        }
    }
    .mbxline{
        width: 100%;
        height: 0.11rem;
        background-color: #f2f2f2;
    }
    .guize{
        .top{
            font-size: 0.17rem;
            color: #333333;
            margin-top: 0.17rem;
            margin-left: 0.18rem;
            margin-bottom: 0.17rem;
        }
        .xiang{
            margin-left: 30px;
            .hang{
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                img{
                    width: 6px;
                    height: 11px;
                }
                span{
                    margin-left: 8px;
                    font-size: 0.13rem;
                    color: #333333;
                }
            }
        }
    }
    .dianzhang{
        font-size: 0.17rem;
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
      width: 48%;
      margin-bottom: 15px;
      background: #fff;
    }
    .pro-item img {
      width: 100%;
      height: 172px;
    }
    .item-name {
      font-size: 12px;
      padding: 0 5px;
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
    .price i {
        font-size: 13px;
        font-style: normal;
    }
    .n_price {
        color: #ff0000;
        font-size: 19px;
    }
    .o_price {
        color: #afafaf;
        font-size: 12px;
        margin-left: 10px;
    } 
</style>