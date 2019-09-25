<template>
  <div class="start">
       <!-- <pagetitle class="nav-title" :title="msg"  @handle="handle" rightHidden="true"></pagetitle> -->
        <!-- 商品详情部分 -->
        <div class="first">
            <div class="left">
                <img src="/static/result/pro1.png">
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
            <li><img src="/static/tuan/check.png">全场包邮</li>
            <li><img src="/static/tuan/check.png">7天退换</li>
            <li><img src="/static/tuan/check.png">48小时发货</li>
            <li><img src="/static/tuan/check.png">假一赔十</li>
        </ul>
        <!-- 团长 -->
        <div class="three">
            <div class="paySuc"><img src="/static/tuan/paySuc.png" >支付成功</div>
            <ul class="lyl">
                <li><img src="/static/tuan/lyl.png"><img src="/static/tuan/tuanzhang.png" class="tuanzhang"><span class="tuanzhang">团长</span></li>  
                <li><img src="/static/tuan/lyl.png"></li>  
                <li><img src="/static/tuan/lyl.png"></li>  
            </ul>
        </div>
        <!-- 倒计时 -->
        <div class="how">
            <img src="/static/tuan/time.png" >
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
                    <img src="/static/tuan/ju.png"><span>开团或者参加别人的团</span>
                </div>
                <div class="hang">
                    <img src="/static/tuan/ju.png"><span>在规定的时间内，邀请好友参团</span>
                </div>
                <div class="hang">
                    <img src="/static/tuan/ju.png"><span>达到拼团人数，分别给团长和团员发货</span>
                </div>
                <div class="hang">
                    <img src="/static/tuan/ju.png"><span>未达到拼团人数，货款将自动原路返还</span>
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
    // pagetitle
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
        padding:10px 0px;
        display: flex;
        .left{
            width: 44%;
            img{
                width: 100%;
            }
        }
        .right{
            width: 56%;
            margin-left: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 12px;
            position: relative;
            div.top{
                width: 100%;
                font-size:14px;
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
                    font-size: 13px;
                    color: #F43131;
                    span{
                        margin-left: 14px;
                        color: #999999;
                    }
                    .prices{
                        color: #F43131;
                        font-size: 23px;
                        margin-left: 5px;
                    }
                }
                .tuan{
                    margin-top: 3px;
                    font-size:13px;
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
        height: 40px;
        padding:14px 0px ;
        background-color: #FAFAFA;
        box-sizing: border-box;
        font-size: 12px;
        color: #333;
        justify-content: space-around;
        padding-left: 16px;
        padding-right: 16px;
        @media screen and (max-width: 371px) {
            padding:14px 0px;
        }
        img{
            width: 16px;
            height: 16px;
            margin-right: 4px;
        }
        li{
            display: flex;
            align-items: center;
        }
    }
    .three{
        .paySuc{
            padding: 44px 25%;
            display: flex;
            align-items: center;
            font-size:25px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(244,49,49,1);
            line-height:38px;
            padding-left: 30%;
            img{
                width: 34px;
                height: 31px;
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
                width: 52px;
                height: 52px;
                border-radius: 50%;
                position: relative;
                .tuanzhang{
                    width: 26px;
                    height: 19px;
                    border-radius: 0;
                    position: absolute;
                    left: -11px;
                }
                span.tuanzhang{
                    width: 26px;
                    font-size: 10px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255,255,255,1);
                    left: -9px;
                }
            }
        }
    }
    .how{
        margin: 0 auto;
        width: 167px;
        margin-top: 28px;
        margin-bottom: 13px;
        display: flex;
        align-items: center;
        img{
            width: 18px;
            height: 18px;
        }
        .my{
            font-size: 17px;
            color: #333;
            margin-left: 8px;
            span{
                color: #F43131;
                margin: 0 5px;
            }
        }
    }
    .times{
        display: flex;
        width: 344px;
        margin: 0 auto;
        align-items: center;
        .line{
            width: 68px;
            height: 1px;
            background-color: #DEDDDD;
        }
        .text{
            margin: 0 6px;
            display: flex;
            align-items: center;
            .myTime{
                margin: 0 14px;
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
        margin: 0 6px;
        margin-top: 18px;
        font-size: 0;
        margin-bottom: 15px;
        @media screen and (max-width: 370px) {
            margin-left: 15px;
            margin-right: 0;
            margin-top:18px;
            font-size: 0;
            margin-bottom: 15px;
        }
        @media screen and (min-width: 371px) and (max-width: 380px) {
            margin: 0 4px;
            margin-top: 18px;
            font-size: 0;
            margin-bottom: 15px;
        }
        .vanButton{
            width: 138px;
            height: 41px;
            background:rgba(250,107,39,1);
            border-radius:6px;
            font-size: 18px;
            color: #fff;
            display: inline-block;
            line-height: 41px;
            text-align: center;
        }
        .invi{
            margin-left: 17px;
            background-color: #F43131;
        }
    }
    .liji{
        margin: 0 auto;
        display: flex;
        margin-bottom: 15px;
        .vanButton{
            width: 90%;
            margin: 0 auto;
            background-color: #F43131;
        }
    }
    .mbxline{
        width: 100%;
        height: 11px;
        background-color: #f2f2f2;
    }
    .guize{
        .top{
            font-size: 17px;
            color: #333333;
            margin-top: 17px;
            margin-left: 18px;
            margin-bottom: 17px;
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
                    font-size: 13px;
                    color: #333333;
                }
            }
        }
    }
    .dianzhang{
        font-size: 17px;
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