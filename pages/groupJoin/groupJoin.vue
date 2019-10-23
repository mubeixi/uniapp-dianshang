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
                        ¥<span class="prices">{{product.Products_PriceX}}</span><span>拼团省{{product.Products_PriceY-product.Products_PriceX}}</span>
                    </div>
                    <div class="tuan">
                        {{product.pintuan_people}}人团 • 已团{{product.teamnum}}件
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
                <li v-for="(user,idx) in join_team_list">
                    <image class="img" :src="user.User_HeadImg" />
                    <image v-if="user.team_head" src="/static/tuan/tuanzhang.png" class=" img tuanzhang"/>
                    <span v-if="user.team_head" class="tuanzhang">团长</span>
                </li>

            </ul>
        </div>
        <!-- 倒计时 -->
        <div class="how">
            <image class="img" src="/static/tuan/time.png"/>
            <span class="my">拼团中，还差<span>{{product.pintuan_people-product.teamnum}}</span>人</span>
        </div>
        <div class="times">
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
<!--        <div class="dingdan">-->


<!--        </div>-->
            <div class="liji">
                <div @click="joinFunc" class="vanButton">立即参团</div>
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


        <popupLayer ref="popupLayer" :direction="'top'" >
            <div class="shareinfo" v-if="type=='share'">
                <div class="s_top">
                    <!-- #ifdef APP-PLUS -->
                    <div class="flex1" @click="shareFunc('wx')">
                        <img src="data:image/png;base64,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" alt="">
                        <div>发送好友</div>
                    </div>
                    <div class="flex1" @click="shareFunc('wxtimeline')">
                        <img src="data:image/png;base64,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" alt="">
                        <div>朋友圈</div>
                    </div>
                    <!--只有配置了这个参数的app，才有分享到小程序选项-->
                    <div class="flex1" @click="shareFunc('wxmini')" v-if="wxMiniOriginId">
                        <img src="data:image/png;base64,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" alt="">
                        <div>微信小程序</div>
                    </div>
                    <!-- #endif -->

                    <!--                    <div class="flex1" @click="shareFunc('pic')">-->
                    <!--                        <img src="data:image/png;base64,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" alt="">-->
                    <!--                        <div>分享海报</div>-->
                    <!--                    </div>-->
                </div>
                <div class="s_bottom" @click="cancel">取消</div>
            </div>
        </popupLayer>

        <!--分享引导框开始-->
        <div class="hide guide_box" v-show="isShowGuide" @click="isShowGuide=false">
            <div class="mask"></div>
            <div><image src="/static/share/guide_point.png"  class="guide_point" /></div>
            <div><image  src="/static/share/guide_btn.png"  class="guide_btn"  /></div>
        </div>
        <!--分享引导框结束-->

        <popupLayer ref="cartPopu" :direction="'top'">
            <div class="cartSku">
                <div class="cartTop">
                    <image :src="product.Products_JSON.ImgPath[0]" mode=""></image>
                    <div class="cartTitle">
                        <div class="cartTitles">{{product.Products_Name}}</div>
                        <div class="addInfo">
                            <div class="addPrice">{{product.Products_PriceX}}元</div>
                            <div class="proSale">库存{{postData.count}}</div>
                        </div>
                    </div>
                </div>
                <div class="cartCenter">
                    <div class="cartAttr" v-for="(item,i) of product.skujosn" :key="i">
                        <div class="sku">
                            {{i}}
                        </div>
                        <div class="skuValue">
                            <div :class="check_attr[i]==index?'skuCheck':''" @click="selectAttr(index,i)"  v-for="(mbx,index) of item" :key="index">{{mbx}}</div>
                        </div>
                    </div>
                </div>
                <div class="numBer">
                    <div class="numBers">
                        数量
                    </div>
                    <div class="inputNumber">
                        <div class="clicks" @click="delNum">-</div>
                        <!--					v-enter-number-->
                        <input  type="number" v-model="postData.qty"  disabled>
                        <div class="clicks" @click="addNum">+</div>
                    </div>
                </div>
            </div>
            <div class="cartSub" @click="skuSub" :class="submit_flag?'':'disabled'">
                确定
            </div>
        </popupLayer>

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
                addtime:0,//开始的时间
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


                count:1,//商品数量
                skuF:1,//规格详情
                checkAttr: {} , // 选择的属性
                check_attrid_arr: [],
                check_attr: {},
                couponList:[],//优惠券列表
                submit_flag: true, //提交按钮
                postData: {
                    prod_id: 0,    //产品ID  在 onLoad中赋值
                    atrid_str: '',    //选择属性  1；2   数字从小到大
                    atr_str: '',      //选择属性名称
                    count: 0,         //选择属性的库存
                    showimg: '',      //选择属性的图片(用产品图片代替)
                    qty: 1,           //购买数量
                    cart_key: 'DirectBuy',     //购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
                    active: 'pintuan',   //拼团时候选，不是拼团不选
                },
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
            this.Prod_ID = options.Products_ID;
            this.Team_ID = options.Team_ID;
        },
        onShow() {
            this.INIT()
            // this.get_user_info();// 获取用于可用余额
        },
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
        //自定义小程序分享
        onShareAppMessage(){

            //分享的是Team_ID
            let path = '/pages/groupJoin/groupJoin?Team_ID='+this.Team_ID+'&Products_ID='+this.Prod_ID;
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
            // 选择属性
            selectAttr(index,i){
                var value_index = index; //选择的属性值索引
                var attr_index = i;   //选择的属性索引
                // if (this.check_attrid_arr.indexOf(value_index) > -1) return false;
                //记录选择的属性
                var check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }); //记录选择的属性  attr_index外的[]必须
                //属性处理
                var check_attrid = [];
                var check_attrname = [];
                var check_attrnames = [];
                for (var i in check_attr) {
                    var attr_id = check_attr[i];
                    check_attrid.push(attr_id);
                    check_attrname[attr_id] = i;
                }
                //数组排序  按从小到大排
                var check_attrid_arr = check_attrid;
                check_attrid = numberSort(check_attrid);
                //获取对应的属性名称
                for (var i = 0; i < check_attrid.length; i++) {
                    var attr_id = check_attrid[i];
                    var attr_name = check_attrname[attr_id];
                    check_attrnames.push(attr_name + ':' + this.product.skujosn[attr_name][attr_id]);
                }
                check_attrid = check_attrid.join(';');
                var attr_val = this.product.skuvaljosn[check_attrid];   //选择属性对应的属性值
                //数组转化为字符串
                check_attrnames = check_attrnames.join(';');
                this.postData.atr_str = check_attrnames;
                this.postData.atrid_str = check_attrid;
                //属性判断
                if (attr_val) {
                    this.postData.count = attr_val.Property_count;   //选择属性的库存
                    this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
                    this.productDetail_price = attr_val.Txt_PriceSon; // 选择属性的价格
                    this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length) ? false : true;
                }
                //判断属性库存
                if (attr_val && attr_val.Property_count <= 0) {
                    // wx.showToast({
                    //     title: '您选择的 ' + check_attrnames + ' 库存不足，请选择其他属性',
                    //     icon: 'none'
                    // })
                    this.submit_flag =  false;
                    return false;
                }
                this.check_attr = check_attr;
                this.check_attrid_arr = check_attrid_arr;
                this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.product.skujosn).length) ? false : true;
                //购买数量处理  大于最高时赋值最高值
                if (this.postData.qty > this.postData.count) {
                    this.postData.qty = this.postData.count;
                }
            },
            skuSub(){
                if(!this.submit_flag) {
                    return ;
                }
                this.postData.prod_id = this.Products_ID;
                if(this.postData.atr_str==''||this.postData.atrid_str==''){
                    if(this.product.skujosn){
                        wx.showToast({
                            title: '您还没有选择规格',
                            icon: 'none'
                        })
                        return;
                    }
                }
                console.log(this.postData)
                updateCart(this.postData).then(res=>{
                    console.log(res)
                    if(res.errorCode == 0) {
                        uni.navigateTo({
                            url: '../check/check?cart_key=DirectBuy'
                        })
                    }else {

                    }

                }).catch(e=>{
                    console.log(e)
                    uni.showToast({
                        title: e.msg
                    })
                })
                //确定加入购物车
                this.$refs.cartPopu.close();
            },
            addNum(){
                if (this.postData.qty < this.postData.count) {
                    this.postData.qty = parseInt(this.postData.qty) + 1;
                }else {
                    uni.showToast({
                        title: '购买数量不能大于库存量',
                        icon: 'none',
                    });
                    this.postData.qty = this.postData.count;
                }
            },
            delNum(){
                if (this.postData.qty > 1) {
                    this.postData.qty = parseInt(this.postData.qty) - 1;
                } else {
                    uni.showToast({
                        title: '购买数量不能小于1',
                        icon: 'none',
                    });
                    this.postData.qty = 1;
                }
            },
            joinFunc(){
                if(!this.$fun.checkIsLogin(1))return;
                this.postData.active = 'pintuan';
                this.$refs.cartPopu.show();
            },
            async shareFunc(channel) {

                let _self = this
                let path = '/pages/groupJoin/groupJoin?Team_ID='+this.Team_ID+'&Products_ID='+this.Prod_ID;
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
                    url:'/pages/order/order?index='+2
                })
            },
            async INIT(){
                //这里要设置Prod_ID

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

                    this.postData.count = res.data.Products_Count;

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
                    if(i!='component_appid' && login_methods[i].type === 'wx_lp' && login_methods[i].authorizer_user_name){
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
                    width: 95rpx;
                    height: 95rpx;
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
                text-align: center;
                .myTime {
                    margin: 0 28rpx;
                    font-size: 30rpx;
                }

                span.num {
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

                span.lines {
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
            margin: 0 auto;
            margin-top: 18px;
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

    //规格
    .cartSku{
        padding: 0rpx 10rpx;
        .cartTop{
            position: relative;
            display: flex;
            padding-top: 20rpx;
            image{
                width: 220rpx;
                height: 220rpx;
            }
            .cartTitle{
                margin-left: 20rpx;
                font-size: 32rpx;
                width: 420rpx;
                .cartTitles{
                    height: 80rpx;
                    overflow: hidden;
                    margin-top: 20rpx;
                }
                .addInfo{
                    width: 450rpx;
                    margin-top: 70rpx;
                    display: flex;
                    flex-flow: row;
                    justify-content: space-between;
                    align-items: flex-end;
                    .addPrice{
                        font-size: 42rpx;
                        color: #ff4200;
                    }
                    .proSale{
                        font-size: 24rpx;
                        color: #999;
                        justify-content: flex-end;
                    }
                }
            }
        }
        .cartCenter{
            margin-top: 20rpx;
            .cartAttr{
                display: flex;
                padding: 15rpx 0rpx;
                .sku{
                    font-size: 28rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    width: 140rpx;
                }
                .skuValue{
                    display: flex;
                    div{
                        height: 70rpx;
                        line-height: 70rpx;
                        font-size: 28rpx;
                        border-radius: 10rpx;
                        color: #000;
                        background-color: #fff;
                        padding-left: 20rpx;
                        padding-right: 20rpx;
                        margin-right: 20rpx;
                        border: 1px solid #ccc;
                    }
                }
            }
        }
        .numBer{
            margin-top: 20rpx;
            display: flex;
            padding: 15rpx 0rpx;
            justify-content: space-between;
            .numBers{
                font-size: 28rpx;
                height: 70rpx;
                line-height: 70rpx;
                width: 140rpx;
            }
            .inputNumber{
                border: 1px solid #ccc;
                border-radius: 6rpx;
                height: 50rpx;
                margin-right: 50rpx;
                display: flex;
                input{
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
        }
    }
    .cartSub{
        width: 100%;
        height: 90rpx;
        background-color: #F43131;
        font-size:20px;
        line-height: 90rpx;
        text-align: center;
        color: #FFFFFF;
        margin-top: 30rpx;
        &.disabled {
            background: #999;
        }
    }
    .skuCheck{
        color: #fff !important;
        background-color: #ff4200 !important;
    }
</style>
