<template>
    <div @click="commonClick" class="start">
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
                        ¥<span class="prices">{{product.pintuan_pricex}}</span><span>拼团省{{product.Products_PriceX.pintuan_pricex}}</span>
                    </div>
                    <div class="tuan">
                        {{product.pintuan_people}}人团 • 已团{{product.teamnum}}件
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品保证 -->
        <ul class="second">
            <li class="lis">
                <image class="img" :src="'/static/client/tuan/check.png'|domain"/>
                全场包邮
            </li>
            <li class="lis">
                <image class="img" :src="'/static/client/tuan/check.png'|domain"/>
                7天退换
            </li>
            <li class="lis">
                <image class="img" :src="'/static/client/tuan/check.png'|domain"/>
                48小时发货
            </li>
            <li class="lis">
                <image class="img" :src="'/static/client/tuan/check.png'|domain"/>
                假一赔十
            </li>
        </ul>
        <!-- 团长 -->
        <div class="three">
            <div class="paySuc">
                <image class="img" :src="'/static/client/tuan/paySuc.png'|domain"/>
                支付成功
            </div>
            <ul class="lyl">
                <li class="liq" v-for="(user,idx) in join_team_list">
                    <image class="img" :src="user.User_HeadImg" />
                    <image v-if="user.team_head" :src="'/static/client/tuan/tuanzhang.png'|domain" class=" img tuanzhang"/>
                    <span v-if="user.team_head" class="tuanzhang">团长</span>
                </li>

            </ul>
        </div>
        <!-- 倒计时 -->
        <div class="how" v-if="product.teamstatus!=1">
            <image class="img" :src="'/static/client/tuan/time.png'|domain"/>
            <span class="my">拼团中，还差<span class="spans">{{product.pintuan_people-product.teamnum}}</span>人</span>
        </div>
        <div class="times" v-if="product.teamstatus!=1">
            <div class="line"></div>
            <div class="text">
                剩余
                <div class="myTime">
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
        <div class="dingdan" v-if="product.teamstatus!=1">

            <!-- #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
            <button @click="goOrderDetail" class="vanButton">查看订单</button>
<!--            open-type="share"-->
            <button   open-type="share" class="vanButton invi" >邀请好友</button>
            <!-- #endif -->

            <!-- #ifdef H5 || APP-PLUS -->
            <span @click="goOrderDetail" class="vanButton">查看订单</span>
            <span class="vanButton invi" @click="inviteFunc">邀请好友</span>
            <!-- #endif -->
        </div>
		<div class="dingdan" v-if="product.teamstatus==1">

		            <!-- #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO -->
		            <button @click="goOrderDetail" class="vanButton" style="margin-left: 125rpx;">查看订单</button>
		            <!-- #endif -->

		            <!-- #ifdef H5 || APP-PLUS -->
		            <span @click="goOrderDetail" class="vanButton"  style="margin-left: 125rpx;">查看订单</span>
		            <!-- #endif -->
		 </div>
<!--        <div class="liji">-->
<!--            <div class="vanButton">立即参团</div>-->
<!--        </div>-->

        <!-- 间隙 -->
        <div class="mbxline"></div>
        <!-- 拼团规则 -->
        <div class="guize">
            <div class="top">拼团规则</div>
            <div class="xiang">
                <div class="hang">
                    <image class="img" :src="'/static/client/tuan/ju.png'|domain"/>
                    <span class="spana">开团或者参加别人的团</span>
                </div>
                <div class="hang">
                    <image class="img" :src="'/static/client/tuan/ju.png'|domain"/>
                    <span class="spana">在规定的时间内，邀请好友参团</span>
                </div>
                <div class="hang">
                    <image class="img" :src="'/static/client/tuan/ju.png'|domain"/>
                    <span class="spana">达到拼团人数，分别给团长和团员发货</span>
                </div>
                <div class="hang">
                    <image class="img" :src="'/static/client/tuan/ju.png'|domain"/>
                    <span class="spana">未达到拼团人数，货款将自动原路返还</span>
                </div>
            </div>
        </div>
        <!-- 更多 -->
        <div class="dianzhang">店长推荐</div>
        <div class="prolist">
            <div class="pro-item" v-for="(item,index) in prodList" :key="index" @click="goProductDetail(item.Products_ID,item.is_pintuan)">
<!--                <image :src="'/static/client/check/pro1.png" alt="" class="img"/>-->
                <img :src="item.ImgPath" alt="" class="img">
                <div class="item-name">{{item.Products_Name}}</div>
                <div class="price">
                    <span class="n_price"><span class="pricem">￥</span>{{item.Products_PriceX}}</span>
                    <span class="o_price">已团{{item.Products_Sales}}件</span>
                </div>
            </div>
        </div>


        <popupLayer ref="popupLayer" :direction="'top'" >
            <div class="shareinfo" v-if="type=='share'">
                <div class="s_top">
                    <!-- #ifdef APP-PLUS -->
                    <div class="flex1" @click="shareFunc('wx')">
                        <img :src="'/static/client/detail/share1.png'|domain" alt="">
                        <div>发送好友</div>
                    </div>
                    <div class="flex1" @click="shareFunc('wxtimeline')">
                        <img :src="'/static/client/detail/sahre3.png'|domain" alt="">
                        <div>朋友圈</div>
                    </div>
                    <!--只有配置了这个参数的app，才有分享到小程序选项-->
                    <div class="flex1" @click="shareFunc('wxmini')" v-if="wxMiniOriginId">
                        <img :src="'/static/client/detail/share4.png'|domain" alt="">
                        <div>微信小程序</div>
                    </div>
                    <!-- #endif -->

                </div>
                <div class="s_bottom" @click="cancel">取消</div>
            </div>
        </popupLayer>

        <!--分享引导框开始-->
        <div class="hide guide_box" v-show="isShowGuide" @click="isShowGuide=false">
            <div class="mask"></div>
            <div><image :src="'/static/client/share/guide_point.png'|domain"  class="guide_point" /></div>
            <div><image  :src="'/static/client/share/guide_btn.png'|domain"  class="guide_btn"  /></div>
        </div>
        <!--分享引导框结束-->

    </div>
</template>

<script>
    // import pagetitle from "@/components/title";
    import popupLayer from '../../components/popup-layer/popup-layer.vue'
    import {pageMixin} from "../../common/mixin";
    import {getOrderDetail,getProductDetail,getProd,getPintuanTeam,getProductSharePic} from "../../common/fetch";
    import {getGroupCountdown,buildSharePath,getProductThumb,ls} from "../../common/tool";
    import {goProductDetail} from "../../common";
    import {mapState} from 'vuex';

    export default {
        mixins: [pageMixin],
        name: 'App',
        data() {
            return {
                isShowGuide:false,
                // #ifdef APP-PLUS
                wxMiniOriginId:'',
                // #endif
                JSSDK_INIT:false,//自己有分享的业务
                type:'',
                join_team_list:[],
                Team_ID:null,
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
            popupLayer
            // pagetitle
        },
        computed:{
            ...mapState(['initData'])
        },
        onLoad(options) {

            if(!this.$fun.checkIsLogin(1))return;
            if (options.order_id) {
                this.Order_ID = options.order_id;
            }
        },
        onShow() {
            this.INIT()
            // this.get_user_info();// 获取用于可用余额
        },
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
        //自定义小程序分享
        onShareAppMessage(){

            //分享的是Team_ID
            let path = '/pages/detail/groupJoin?Team_ID='+this.Team_ID+'&Products_ID='+this.Prod_ID;
            console.log(path)
            let shareObj = {
                title: this.product.Products_Name,
                desc:this.product.Products_BriefDescription,
                imageUrl:this.product.ImgPath,
                path: buildSharePath(path)
            };
            console.log(shareObj)
            return shareObj

        },
        // #endif
        methods: {
            async shareFunc(channel) {

                let _self = this
                let path = 'pages/detail/groupJoin?Team_ID='+this.Team_ID+'&Products_ID='+this.Prod_ID;
                let front_url = this.initData.front_url;
                console.log('front_url is '+front_url)

                let shareObj = {
                    title: this.product.Products_Name,
                    desc: this.product.Products_BriefDescription,
                    imageUrl: getProductThumb(this.product.ImgPath),
                    path: buildSharePath(path)
                };

                console.log(shareObj)

                switch (channel) {
                    case 'wx':
                        uni.share({
                            provider: "weixin",
                            scene: "WXSceneSession",
                            type: 0,
                            href: front_url + shareObj.path,
                            title: shareObj.title,
                            summary: shareObj.desc,
                            imageUrl: shareObj.imageUrl,
                            success: function (res) {
                                console.log("success:" + JSON.stringify(res));
                            },
                            fail: function (err) {
                                console.log("fail:" + JSON.stringify(err));
                            }
                        });
                        break;
                    case 'wxtimeline':
                        uni.share({
                            provider: "weixin",
                            scene: "WXSenceTimeline",
                            type: 0,
                            href: front_url + shareObj.path,
                            title: shareObj.title,
                            summary: shareObj.desc,
                            imageUrl: shareObj.imageUrl,
                            success: function (res) {
                                console.log("success:" + JSON.stringify(res));
                            },
                            fail: function (err) {
                                console.log("fail:" + JSON.stringify(err));
                            }
                        });
                        break;
                    case 'wxmini':

                        uni.share({
                            provider: 'weixin',
                            scene: "WXSceneSession",
                            type: 5,
                            imageUrl: shareObj.imageUrl,
                            title: shareObj.title,
                            miniProgram: {
                                id: _self.wxMiniOriginId,
                                path: '/' + shareObj.path,
                                type: 0,
                                webUrl: 'http://uniapp.dcloud.io'
                            },
                            success: ret => {
                                console.log(JSON.stringify(ret));
                            }
                        });
                        break;
                    case 'pic':
                        //this.$toast('comming soon')

                        let sharePic = await getProductSharePic({'product_id': this.Prod_ID}).then(res => {
                            console.log(res)
                            ls.set('temp_sharepic_info', res.data)
                            return res.data.img_url
                        })

                        console.log('海报的地址是' + sharePic)

                        if (!sharePic) {
                            error('获取分享参数失败');
                            return;
                        }

                        setTimeout(function () {
                            uni.navigateTo({
                                url: '/pages/detail/sharepic/sharepic'
                            })
                        }, 200)
                        // uni.previewImage({
                        // 	urls: [sharePic],
                        // 	indicator:'default',
                        // 	current:0
                        // });
                        break;
                }

            },
            showTick(type,e){
                this.type = type;//e.currentTarget.dataset.type
                this.$refs.popupLayer.show();
            },
            close(){
                this.$refs.popupLayer.close();
            },
            cancel(){
                this.$refs.popupLayer.close();
            },
            inviteFunc(){

                // #ifdef H5
                this.isShowGuide = true
                // #endif

				// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO

				 // #endif


                // #ifdef APP-PLUS
                this.showTick('share')
                // #endif




            },
            goProductDetail,
            goOrderDetail(){
                //这里应该需要跳转到订单详情页
                uni.navigateTo({
                    url:'/pages/order/pintuanOrderlist?index='+2
                })
            },
            async INIT(){
                //这里要设置Prod_ID
                await this.getOrderDetail();
                await this.getProdDetail(this.Prod_ID);

                await this.getProdFunc()

                //获取正在拼团的团队
                //await this.getPintuanTeamList(this.Prod_ID)


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
                    teamid:this.Team_ID,
                    Users_ID:'wkbq6nc2kc'
                }
                let _self = this;

                getProductDetail(data).then(res=>{

                    this.product = res.data;

                    this.join_team_list = res.data.join_team_list

                    //获取开团的时间
                    for(var team of this.join_team_list){
                        if(team.team_head){
                            this.addtime = team.addtime
                            break;
                        }
                    }

                    if(res.data.skujosn) {
                        this.product.skujosn = typeof res.data.skujosn ==='string' ?JSON.parse(res.data.skujosn):res.data.skujosn;
                        this.product.skuvaljosn = typeof res.data.skuvaljosn === 'string' ?JSON.parse(res.data.skuvaljosn):res.data.skuvaljosn;
                    }

                    //this.stampCount()
                    //开发时候一直倒计时太乱了
                    window.groupStam = setInterval(this.stampCount,1000)


                    let product = this.product
                    // #ifdef H5

                    let path = 'pages/detail/groupJoin?Team_ID='+this.Team_ID+'&Products_ID='+this.Prod_ID;
                    let front_url = this.initData.front_url;


                    this.WX_JSSDK_INIT(this).then((wxEnv)=>{

                        this.$wx.onMenuShareTimeline({
                            title: product.Products_Name, // 分享标题
                            link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: product.ImgPath, // 分享图标
                            success: function() {
                                // 用户点击了分享后执行的回调函数
                            }
                        });

                        //两种方式都可以
                        wxEnv.onMenuShareAppMessage({
                            title: product.Products_Name, // 分享标题
                            link: front_url+buildSharePath(path), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: product.ImgPath, // 分享图标
                            desc: product.Products_BriefDescription||'好物推荐',
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function() {
                                // 用户点击了分享后执行的回调函数
                            }
                        });

                    }).catch(()=>{
                        console.log('不是微信环境')
                    })

                    // #endif

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

                        this.Team_ID = res.data.teamid;

                    }
                },err=>{
                    console.log(err)
                })
            },
            stampCount(){

                let rt  = {};
                if(this.product && this.product.pintuan_end_time){
                    //24小时内
                    //所以这个时候d一定是0
                    let computedStamp = getGroupCountdown({end_timeStamp:parseInt(this.addtime)+24*60*60})
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
        async created(){

            let initData = await this.getInitData();

            console.log('初始化信息',initData)
            let WX_MINI_ORIGIN_ID = ls.get('WX_MINI_ORIGIN_ID');
            if(!WX_MINI_ORIGIN_ID){

                let login_methods = initData.login_methods
                for(var i in login_methods){
                    if(i!='component_appid'  && login_methods[i].authorizer_user_name){
                        WX_MINI_ORIGIN_ID = login_methods[i].authorizer_user_name
                        break;
                    }
                }

            }

            this.wxMiniOriginId = WX_MINI_ORIGIN_ID;
            console.log('wxMiniOriginId is '+this.wxMiniOriginId)

        }


    }
</script>

<style scoped lang="scss">
    .guide_box{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9;
        text-align: right;
        .mask{
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.7);

        }
        .guide_point{
            width: 375rpx;
            height:475rpx;
            /*margin-right: 10px;*/
        }
        .guide_btn{
            width: 189rpx;
            height:63rpx;
            margin-right: 20px;
        }
    }

    .shareinfo{
        padding: 30rpx 0 0;
        color: #333;
        font-size: 12px;
    }
    .shareinfo>div {
        text-align: center;
    }
    .s_top {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .s_top img {
        width: 38px;
        height: 38px;
        display: block;
        margin: 0 auto 5px;
    }
    .s_top>div:nth-child(1) {
        /*margin-right: 60px;*/
    }
    .s_bottom {
        position: relative;
        bottom: 0;
        width: 100%;
        background: #e8e8e8;
        color: #666;
        font-size: 13px;
        text-align: center;
        line-height: 30px;
        margin-top: 25px;
    }

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

                .top {
                    width: 100%;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                    line-height: 21px;
                }

                .bottom {
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

            .lis {
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
                    width: 95rpx;
                    height: 95rpx;
                    border-radius: 50%;
                }

                .liq {
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

                    .tuanzhang {
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

                .spans {
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
                width: 123rpx;
                height: 1px;
                background-color: #DEDDDD;
            }

            .text {
                width: 350rpx;
                margin: 0 12rpx;
                display: flex;
                align-items: center;
                font-size: 24rpx;
                .myTime {
                    margin: 0 28rpx;
                    font-size: 30rpx;
                }

                .num {
                    background-color: #484848;
                    border-radius: 2px;
                    display: inline-block;
                    width: 48rpx;
                    height: 48rpx;
                    font-size: 32rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #fff;
                    text-align: center;
                }

                .lines {
                    //width: 6px;
                    padding: 0 4rpx;
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
            height: 74rpx;
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

                    .spana {
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
