<template>
    <view class="wrap" :style="{'overflow': isScroll}">
        <view class="search-wrap">
            <icon type="search" size="34rpx" class="search_icon" @click="search"/>
            <input type="text" class="input" placeholder="请输入商品关键词" @confirm="search" v-model="prod_name" placeholder-style="color:#bebdbd;">
        </view>

        <view class="storeAddress" v-if="is_pingtai==0&&(storeAdress.Stores_Name)" @click="openAddress">
            <view class="storeAddressImg">
                <image class="imgWidth" :src="storeAdress.Stores_ImgPath" ></image>
            </view>
            <view class="storeAddressRight">
                <view class="storeName">
                    <view>{{storeAdress.Stores_Name}}</view>
                    <view class="storeKm">
                        <text v-if="storeAdress.distance">{{storeAdress.distance}}km</text>
                        <image class="imgHeight" src="https://new401.bafangka.com/static/client/person/right.png"></image>
                    </view>
                </view>
                <view class="storeTell" style="margin-bottom: 15rpx;">
                    <image class="storeTellImg" src="/static/tellStore.png"></image>
                    {{storeAdress.Stores_Telephone}}
                </view>
                <view class="storeTell">
                    <image class="storeTellImg" src="/static/adressStore.png"></image>
                    {{storeAdress.Stores_Province_name}}{{storeAdress.Stores_City_name}}{{storeAdress.Stores_Area_name}}{{storeAdress.Stores_Address}}
                </view>
            </view>
        </view>

        <view class="storeCate">
            <view class="storeCateLine">
                <view class="storeCateLei">一级分类:</view>
                <scroll-view scroll-x="true" class="storeScroll">
                    <block v-for="(item,index) of cateList" :key="index">
                        <!-- skuSelect -->
                        <view class="skuClass " @click="selctFirst(index)"  :class="indexFirst==index?'skuSelect':''">
                            {{item.Category_Name}}
                        </view>
                    </block>
                </scroll-view>
            </view>
            <view class="storeCateLine">
                <view class="storeCateLei">二级分类:</view>
                <scroll-view scroll-x="true" class="storeScroll" v-if="indexFirst>-1">
                    <block v-for="(it,ind) of cateList[indexFirst].child" :key="ind">
                        <!-- skuSelect -->
                        <view class="skuClass " @click="selctSecond(ind)"  :class="indexSecond==ind?'skuSelect':''">
                            {{it.Category_Name}}
                        </view>
                    </block>
                </scroll-view>
            </view>
            <view class="storeCateLast">
                <view class="storeCateLei">当前选择:</view>
                <view v-if="indexFirst>=0" class="selectSku" style="margin-right: 30rpx;">{{cateList[indexFirst].Category_Name}}
                    <image class="delSku" src="/static/skuDel.png" @click="delFirst"></image>
                </view>
                <view v-if="indexSecond>=0&&indexFirst>=0" class="selectSku">{{cateList[indexFirst].child[indexSecond].Category_Name}}
                    <image class="delSku" src="/static/skuDel.png" @click="delSecond"></image>
                </view>
            </view>
        </view>

        <view class="prolist">
            <view class="pro" v-for="item in prolist">
                <view class="pro-img">
                    <image :src="item.ImgPath" class="img"></image>
                    <view class="add" @click="add(item)">加入选品库</view>
                </view>
                <view class="pro-name">{{item.Products_Name}}</view>
                <view class="pro-price">
                    <view class="now-price"><text class="money-icon">￥</text>{{item.Products_PriceX}}</view>
                    <view class="old-price"><text class="money-icon">￥</text>{{item.Products_PriceY}}</view>
                </view>
                <view class="pro-count">月销{{item.Products_Sales}}</view>
            </view>
        </view>
        <view style="height:90rpx;" v-if="total_cart_count > 0">
            <view class="check" :style="{'z-index': zIndex}">
                <view class="check-msg" @click="showSelected">已选取<text class="num">{{total_cart_count}}</text>个普通商品 <image class="img" :class="isClicked?'turn':''" src="/static/top.png"></image></view>
                <view class="submit" @click="submit">提交进货单</view>
            </view>
        </view>
        <!--  遮罩层	-->
        <view class="mask" :hidden="isHidden" @click="hiddenMask"></view>
        <!--  属性弹窗	-->
        <view class="sku-pop" v-if="showSku">
            <view class="sku-title">选择商品属性</view>
            <view class="sku-content">
                <view class="skulist" v-for="item in prosku.skujosn_new">
                    <view class="sku-name">{{item.sku}}</view>
                    <view class="sku-item">
                        <view :class="[check_attr[item.sku]==index?'active':'','sku']" @click="selectAttr(index,item.sku)"  v-for="(attr,index) of item.val">{{attr}}</view>
                    </view>
                </view>
                <view class="skulist">
                    <view class="sku-name">数量</view>
                    <view class="sku-item">
                        <view class="handle" @click="minus">-</view>
                        <view class="pro-num">{{postData.qty}}</view>
                        <view class="handle" @click="plus">+</view>
                    </view>
                </view>
                <view class="sku-btns">
                    <view class="cancel btn" @click="cancel">取消</view>
                    <view class="confirm btn" @click="confirm"  :class="submit_flag?'':'disabled'">确定</view>
                </view>
            </view>
        </view>
        <!--	明细	-->
        <popup-layer ref="detail"  @maskClicked="handClicked" :direction="'top'" :bottomHeight="45">
            <view class="mxdetail">
                <template v-for="(pro,pro_id) in cartList">
                    <template v-for="(attr,attr_id) in pro">
                        <view class="product">
                            <view class="proImg">
                                <image :src="attr.ImgPath" class="img"></image>
                            </view>
                            <view class="proMsg">
                                <view class="proName">
                                    <view class="name">{{attr.ProductsName}}</view>
                                    <image class="del"  @click="del(pro_id,attr_id)" src="/static/procurement/del.png"></image>
                                </view>
                                <view class="attrInfo">
                                    <view>{{attr.Productsattrstrval}}</view>
                                </view>
                                <view class="proPrice">
                                    <view class="newPrice">￥<text class="number">{{attr.ProductsPriceX}}</text></view>
                                    <view class="oldPrice">￥{{attr.ProductsPriceY}}</view>
                                    <view class="amount">
                                        <view class="icon" @click="reduce(pro_id,attr_id)">-</view>
                                        <view class="num">{{attr.Qty}}</view>
                                        <view class="icon" @click="increase(pro_id,attr_id)">+</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </template>
                </template>
            </view>
        </popup-layer>
    </view>
</template>
<script>
    import popupLayer from '../../components/popup-layer/popup-layer.vue'
    import {getPifaStoreProd, updateCart,getCart,delCart,getStoreList,createOrder,getProductList,getProductCategory,getStoreDetail} from '../../common/fetch'
    import {mapGetters} from 'vuex'
    import {numberSort} from '../../common/tool'
    import {getLocation} from "../../common/tool/location";
    import {pageMixin} from "../../common/mixin";
    export default {
        data() {
            return {
                isHidden: true,
                showSku: false,
                isShowStoreMsg: false,
                isClicked: false, // 是否县级了详情列表
                zIndex: 100,
                type: 1, // 1表示进货记录  2表示门店信息,
                purchase_store_sn: '', // 门店编码
                prolist: [], // 产品列表
                prosku: {}, // 属性弹窗的产品
                check_attr: {},
                check_attrid_arr: [],
                postData: {
                    prod_id: 0,    //产品ID  在 onLoad中赋值
                    attr_id: 0,    //选择属性id
                    count: 10,         //选择属性的库存
                    // showimg: '',      //选择属性的图片(用产品图片代替)
                    qty: 1,           //购买数量
                    productDetail_price: 0
                },
                prod_name: '', // 根据产品名称搜索
                cartList: '',
                total_pro_count: '', // 总共的产品数
                total_cart_count: '', // 购物车中的产品数
                storeInfo: '' , // 门店信息,
                active_id: '',
                is_pingtai: 0, // 是否是平台补货
                cateList:[],//分类数据
                indexFirst:-1,
                indexSecond:-1,
                storeAdress:[],
                canClicked: true, // 是否可以点明细  防止用户一直点出现bug
            }
        },
        components: {
            popupLayer
        },
        computed: {
            ...mapGetters(['Stores_ID']),
            isScroll(){
                return this.isHidden ? 'auto' : 'hidden'
            },
        },
        onShow(){
            this.get_cart();
        },
        onLoad(options){
            if(options.purchase_store_sn) {
                this.is_pingtai = 0;
                // 获取门店产品
                this.purchase_store_sn = options.purchase_store_sn;
                this.getStoreDetail();
                this.getProlist();
            }else {
                this.is_pingtai = 1;
                // 获取平台产品
                this.getProductList();
            }
            this.getProductCategory()
        },
        methods: {
            openAddress(){
                uni.openLocation({
                    latitude: this.storeAdress.wx_lat,
                    longitude: this.storeAdress.wx_lng,
                    name:this.storeAdress.Stores_Name,
                    success: function () {
                        console.log('success');
                    }
                });
            },
            getStoreDetail(){
                getLocation(this).then(res=>{
                    if(res.code===0){
                        let lng=0,lat=0;
                        lng=res.data.longitude
                        lat=res.data.latitude
                        let data={
                            lat:lat,
                            lng:lng,
                            store_sn:this.purchase_store_sn
                        }

                        getStoreDetail(data).then(res=>{
                            this.storeAdress=res.data
                            this.storeAdress.distance=(res.data.distance/1000).toFixed(2)
                        })
                    }
                }).catch(err=>{
                    let data={
                        store_sn:this.purchase_store_sn
                    }
                    getStoreDetail(data).then(res=>{
                        this.storeAdress=res.data
                    })
                })

            },
            delFirst(){
                this.indexFirst=-1
                this.indexSecond=-1
                if(this.is_pingtai ==0){
                    this.getProlist()
                }else if(this.is_pingtai ==1){
                    this.getProductList()
                }

            },
            delSecond(){
                this.indexSecond=-1
                if(this.is_pingtai ==0){
                    this.getProlist()
                }else if(this.is_pingtai ==1){
                    this.getProductList()
                }
            },
            selctSecond(index){
                this.indexSecond=index
                if(this.is_pingtai ==0){
                    this.getProlist()
                }else if(this.is_pingtai ==1){
                    this.getProductList()
                }
            },
            selctFirst(index){
                this.indexFirst=index
                this.indexSecond=-1
                if(this.is_pingtai ==0){
                    this.getProlist()
                }else if(this.is_pingtai ==1){
                    this.getProductList()
                }
            },
            getProductCategory(){
                getProductCategory().then(res=>{
                    this.cateList=res.data
                })
            },
            // 提交进货单
            submit(){
                console.log(this.cartList)
                let obj = {}
                for(let i in this.cartList){
                    for(let j in this.cartList[i]){
                        if(obj[i]) {
                            obj[i].push(j)
                        }else {
                            obj[i] = [j]
                        }
                    }
                }
                createOrder({
                    cart_key: 'CartList',
                    cart_buy: obj && JSON.stringify(obj)
                }).then(res=>{
                    uni.showToast({
                        title: res.msg
                    });
                    setTimeout(()=>{
                        uni.navigateTo({
                            url: '/pagesA/procurement/purchaseRecords'
                        })
                    },1500)
                })
            },
            // 更新购物车中产品的数量，数量-1
            reduce(pro_id,attr_id) {
                updateCart({
                    cart_key: 'CartList',
                    prod_id: pro_id,
                    qty: -1,
                    attr_id: attr_id,
                    active: 'store_pifa',
                    active_id:  this.active_id
                }).then(res=>{
                    this.isHidden = true;
                    this.showSku = false;
                    this.get_cart();
                    return;
                })
            },
            // 数量加1
            increase(pro_id,attr_id){
                updateCart({
                    cart_key: 'CartList',
                    prod_id: pro_id,
                    qty: 1,
                    attr_id: attr_id,
                    active: 'store_pifa',
                    active_id:  this.active_id
                }).then(res=>{
                    this.isHidden = true;
                    this.showSku = false;
                    this.get_cart();
                    return;
                })
            },
            //  删除购物车中的产品
            del(pro_id,attr_id){
                let obj = {}
                obj = {
                    [pro_id]: [attr_id]
                }
                console.log(obj)
                delCart({
                    cart_key: 'CartList',
                    prod_attr: JSON.stringify(obj)
                }).then(res=>{
                    uni.showToast({
                        title: res.msg
                    })
                    this.get_cart();
                })
            },
            // 商品添加到了购物车中，获取购物车产品
            get_cart(){
                getCart({
                    cart_key: 'CartList'
                }).then(res=>{
                    console.log(res)
                    this.cartList = res.data.CartList;
                    this.total_cart_count = res.data.total_count;
                    if(this.total_cart_count == 0) {
                        this.isClicked = false;
                        if(this.$refs.detail) {
                            this.$refs.detail.close();
                        }
                    }
                })
            },
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
                    check_attrnames.push(attr_name + ':' + this.prosku.skujosn[attr_name][attr_id]);
                }
                check_attrid = check_attrid.join(';');
                var attr_val = this.prosku.skuvaljosn[check_attrid];   //选择属性对应的属性值
                //数组转化为字符串
                check_attrnames = check_attrnames.join(';');
                //属性判断
                if (attr_val) {
                    this.postData.attr_id = attr_val.Product_Attr_ID;   //选择属性的id
                    this.postData.count = attr_val.Property_count;   //选择属性的库存
                    // this.postData.showimg = typeof attr_val.Attr_Image != 'undefined' && attr_val.Attr_Image != '' ? attr_val.Attr_Image : this.product.Products_JSON['ImgPath'][0];// 选择属性的图片
                    this.postData.productDetail_price = attr_val.Attr_Price?attr_val.Attr_Price:this.prosku.Products_PriceX; // 选择属性的价格
                    this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) ? false : true;
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
                this.check_attr = {};
                this.check_attr = check_attr;
                this.check_attrid_arr = check_attrid_arr;
                this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) ? false : true;
            },
            // 搜索
            search(){
                if(this.is_pingtai == 0) {
                    getPifaStoreProd({
                        purchase_store_sn: this.purchase_store_sn,
                        store_id: this.Stores_ID,
                        prod_name: this.prod_name,
                    }).then(res=>{
                        this.prolist = res.data;
                    })
                }else {
                    // 平台产品
                    getProductList({
                        Products_Name: this.prod_name
                    }).then(res=>{
                        this.prolist = res.data;
                    })
                }
            },
            // 门店产品
            getProlist(){
                let data={
                    purchase_store_sn: this.purchase_store_sn,
                    store_id: this.Stores_ID
                }
                if(this.indexSecond>=0){
                    data.cate_id=this.cateList[this.indexFirst].child[this.indexSecond].Category_ID
                }else{
                    if(this.indexFirst>=0){
                        data.cate_id=this.cateList[this.indexFirst].Category_ID
                    }
                }
                getPifaStoreProd(data).then(res=>{
                    this.prolist = res.data;
                    this.total_pro_count = res.totalCount;
                    this.active_id = this.Stores_ID + '_' + res.Stores_ID
                }).catch(e=>{
                    setTimeout(function () {
                        uni.navigateBack({delta:1})
                    },2000)
                })
            },
            // 普通产品
            getProductList(){
                let data={}
                if(this.indexSecond>=0){
                    data.Cate_ID=this.cateList[this.indexFirst].child[this.indexSecond].Category_ID
                }else{
                    if(this.indexFirst>=0){
                        data.Cate_ID=this.cateList[this.indexFirst].Category_ID
                    }
                }
                getProductList(data).then(res=>{
                    this.prolist = res.data;
                    this.total_pro_count = res.totalCount;
                    this.active_id = this.Stores_ID + '_' + 0
                })
            },
            methodHandle(type){
                this.type = type;
                if(this.type == 1) {
                    // 进货记录
                    uni.navigateTo({
                        url: '/pagesA/procurement/purchaseRecords'
                    })
                }else {
                    // 门店信息
                    getStoreList({
                        stores_id: this.Stores_ID
                    }).then(res=>{
                        this.storeInfo = res.data[0]
                    })
                    this.isHidden = false;
                    this.isShowStoreMsg = true;
                }
            },
            handClicked(){
                this.isClicked = false;
                this.zIndex = 100;
            },
            showSelected(){
                // 防止用户频繁点击
                if(!this.canClicked) return;
                this.canClicked = false;
                if(this.total_cart_count == 0) return;
                if(!this.isClicked) {
                    this.zIndex = 9999999;
                    this.canClicked = true;
                    this.$refs.detail.show();
                }else {
                    this.$refs.detail.close();
                    setTimeout(()=>{
                        this.zIndex = 100;
                        this.canClicked = true;
                    },500)
                }
                this.isClicked = !this.isClicked;
            },
            //隐藏遮罩
            hiddenMask(){
                this.isHidden = true;
                this.showSku = false;
                this.isShowStoreMsg = false;
            },
            plus(){
                if (this.postData.qty < this.postData.count) {
                    this.postData.qty = Number(this.postData.qty) + 1;
                }else {
                    uni.showToast({
                        title: '购买数量不能大于库存量',
                        icon: 'none',
                    });
                    this.postData.qty = this.postData.count;
                }
            },
            minus(){
                if (this.postData.qty > 1) {
                    this.postData.qty -= 1;
                } else {
                    uni.showToast({
                        title: '购买数量不能小于1',
                        icon: 'none',
                    });
                    this.postData.qty = 1;
                }
            },
            add(item){
                this.check_attr = {};
                this.check_attrid_arr = [];
                this.postData.qty = 1;
                this.submit_flag = true;
                this.postData.attr_id = 0;
                this.postData.prod_id = item.Products_ID;
                this.postData.count = item.Products_Count;
                if(item.skujosn) {
                    let skujosn = item.skujosn;
                    let skujosn_new = [];
                    for (let i in item.skujosn) {
                        skujosn_new.push({
                            sku: i,
                            val: skujosn[i]
                        });
                    }
                    item.skujosn_new = skujosn_new;
                    item.skuvaljosn = item.skuvaljosn;
                }
                this.prosku = item;
                this.isHidden = false;
                this.showSku = true;
            },
            cancel(){
                this.isHidden = true;
                this.showSku = false;
            },
            confirm(){
                console.log(this.postData)
                if(!this.submit_flag)return;
                if(this.prosku.skuvaljosn && !this.postData.attr_id) {
                    uni.showToast({
                        title: '请选择规格',
                        icon: 'none'
                    });
                    return;
                }
                updateCart({
                    cart_key: 'CartList',
                    prod_id: this.postData.prod_id,
                    qty: this.postData.qty,
                    attr_id: this.postData.attr_id,
                    active: 'store_pifa',
                    active_id:  this.active_id
                }).then(res=>{
                    uni.showToast({
                        title: res.msg
                    });
                    this.isHidden = true;
                    this.showSku = false;
                    this.get_cart();
                    return;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        height: 100vh;
        background-color: #F3F3F3;
        width: 100%;
    }
    .mask {
        background-color: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
    .sku-pop {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10000;
        width: 526rpx;
        transform: translate(-50%,-50%);
        border-radius: 10rpx;
        .sku-title {
            height: 60rpx;
            line-height: 60rpx;
            background-color: #f6f6f6;
            color: #333;
            font-size: 24rpx;
            text-align: center;
            border-top-left-radius: 10rpx;
            border-top-right-radius: 10rpx;
        }
        .sku-content {
            padding: 40rpx 46rpx 34rpx 40rpx;
            background-color: #fff;
            border-bottom-left-radius: 10rpx;
            border-bottom-right-radius: 10rpx;
            .skulist {
                margin-bottom: 30rpx;
                display: flex;
                align-items: center;
                .sku-name {
                    color: #333;
                    font-size: 24rpx;
                    margin-right:26rpx;
                }
                .sku-item {
                    display: flex;
                    align-items: center;
                    color: #666;
                    flex-wrap: wrap;
                    flex: 1;
                    .img {
                        width: 27rpx;
                        height: 32rpx;
                    }
                    .sku {
                        // width: 80rpx;
                        padding: 0 10rpx;
                        height: 46rpx;
                        line-height: 46rpx;
                        text-align: center;
                        background-color: #f6f6f6;
                        color: #666;
                        font-size: 24rpx;
                        margin-right: 13rpx;
                        margin-top: 10rpx;
                        border-radius: 5rpx;
                    }
                    .active {
                        background-color: $wzw-primary-color;
                        color: #fff;
                    }
                    .handle {
                        width: 50rpx;
                        height: 45rpx;
                        line-height: 45rpx;
                        text-align: center;
                        font-size: 32rpx;
                        color: #777;
                        background: #f6f6f6;
                    }
                    .pro-num {
                        margin: 0 15rpx;
                        font-size: 24rpx;
                        color: #777;
                    }
                }
            }
            .sku-btns {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 60rpx;
                .btn {
                    width: 130rpx;
                    height: 50rpx;
                    text-align: center;
                    line-height: 50rpx;
                    font-size: 24rpx;
                }
                .cancel {
                    background: #e9e9e9;
                    color: #666;
                    margin-right: 25rpx;
                }
                .confirm {
                    background-color: $wzw-primary-color;
                    color: #fff;
                }
            }
        }
    }
    .mendian {
        .sku-content {
            .sku-name {
                marin-right: 10rpx!important;
            }
            .sku-item {
                display: block !important;
                font-size: 26rpx !important;
                .img {
                    margin-left: 10rpx;
                }
            }
        }
    }
    .search-wrap {
        position: relative;
        width: 710rpx;
        margin:20rpx auto 30rpx;
        height: 65rpx;
        z-index: 10;
        .search_icon {
            position: absolute;
            left: 41rpx;
            top: 16rpx;
        }
        .input {
            height: 100%;
            width: 100%;
            line-height: 25rpx;
            padding-left: 91rpx;
            box-sizing: border-box;
            background-color: #fff;
            font-size: 26rpx;
        }
    }
    .prolist {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 710rpx;
        margin: 0 auto;
        .pro {
            width: 345rpx;
            background-color: #fff;
            margin-bottom: 20rpx;
            .pro-img {
                position: relative;
                width: 100%;
                height: 345rpx;
                .img {
                    width: 100%;
                    height: 100%;
                }
                .add {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 60rpx;
                    line-height: 60rpx;
                    text-align: center;
                    background-color: $wzw-primary-color;
                    opacity: 0.75;
                    color: #f3f3f3;
                    font-size: 26rpx;
                }
            }
            .pro-name {
                font-size: 24rpx;
                color: #333;
                margin: 17rpx 14rpx 22rpx 12rpx;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .pro-price {
                margin-bottom: 14rpx;
                margin-left: 12rpx;
                display: flex;
                align-items: center;
                .now-price {
                    color: $wzw-primary-color;
                    margin-right:20rpx;
                    font-size: 30rpx;
                }
                .old-price {
                    color: #AFAFAF;
                    font-size: 24rpx;
                    text-decoration: line-through;
                }
                .money-icon {
                    font-size: 24rpx;
                }
            }
            .pro-count {
                font-size: 24rpx;
                color: #777;
                margin: 0 0 30rpx 12rpx;
            }
        }
    }
    .check {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 90rpx;
        display: flex;
        line-height: 90rpx;
        font-size: 24rpx;
        color: #333;
        background-color: #fff;
        box-shadow: 0px 0px 22px 0px rgba(4,0,0,0.12);
        .check-msg {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
            color: #333;
            .num {
                color: $wzw-primary-color;
                fong-size: 28rpx;
            }
            .img {
                width: 17rpx;
                height: 14rpx;
                margin-left: 12rpx;
            }
            .turn {
                transform: rotate(180deg);
            }
        }
        .submit {
            width: 210rpx;
            height: 100%;
            line-height: 90rpx;
            background: $wzw-primary-color;
            font-size: 28rpx;
            color: #fff;
            text-align: center;
        }
    }
    .mxdetail {
        max-height: 70vh;
        overflow: scroll;
        padding: 20rpx;
        .product {
            display: flex;
            margin-bottom: 40rpx;
            .proImg {
                width: 190rpx;
                height: 190rpx;
                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .proMsg {
                flex: 1;
                margin-left: 20rpx;
                .proName {
                    overflow: hidden;
                    margin-bottom: 20rpx;
                    .name {
                        width: 440rpx;
                        word-wrap: break-word;
                        font-size: 24rpx;
                        float: left;
                    }
                    .del {
                        float: right;
                        width: 26rpx;
                        height: 31rpx;
                        margin-left: 34rpx;
                    }
                }
                .attrInfo {
                    display: inline-block;
                    padding: 12rpx 16rpx;
                    background-color: #FFF5F5;
                    color: #666;
                    font-size: 22rpx;
                    border-radius: 5rpx;
                    margin-bottom: 24rpx;
                }
                .proPrice {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .newPrice {
                        font-size: 24rpx;
                        color: $wzw-primary-color;
                        .number {
                            font-size: 30rpx;
                        }
                    }
                    .oldPrice {
                        flex: 1;
                        color: #afafaf;
                        font-size: 24rpx;
                        text-decoration: line-through;
                        margin-left: 20rpx;
                    }
                    .amount {
                        display: flex;
                        height: 45rpx;
                        line-height: 45rpx;
                        width: 160rpx;
                        border: 2rpx solid #D1D1D1;
                        box-sizing: border-box;
                        .icon {
                            font-size: 32rpx;
                            color: #777;
                            width: 43rpx;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .num {
                            flex: 1;
                            color: #777;
                            font-size: 24rpx;
                            text-align: center;
                            border-left: 2rpx solid #d1d1d1;
                            border-right: 2rpx solid #d1d1d1;
                        }
                    }
                }
            }
        }
    }
    .storeAddress{
        width: 710rpx;
        margin: 0 auto;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        box-sizing: border-box;
        border-radius:5px;
        padding: 20rpx 17rpx 22rpx 21rpx;
        background-color: #FFFFFF;
        display: flex;
        .storeAddressImg{
            width: 82rpx;
            height: 82rpx;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 22rpx;
            .imgWidth{
                width: 100%;
                height: 100%;
            }
        }
        .storeAddressRight{
            width: 580rpx;
            .storeName{
                display: flex;
                justify-content: space-between;
                font-size: 28rpx;
                color: #333333;
                width: 580rpx;
                height: 28rpx;
                align-items: center;
                margin-bottom: 17rpx;
                .storeKm{
                    display: flex;
                    align-items: center;
                    font-size: 24rpx;
                }
                .imgHeight{
                    margin-left: 12rpx;
                    width: 16rpx;
                    height: 24rpx;
                }
            }
            .storeTell{
                height: 24rpx;
                width: 580rpx;
                color: #888888;
                font-size: 22rpx;
                .storeTellImg{
                    width: 20rpx;
                    height: 24rpx;
                    margin-right: 16rpx;
                }
            }

        }


    }
    .storeCate{
        width: 750rpx;
        padding-left:20rpx ;
        margin-bottom: 30rpx;
        box-sizing: border-box;
        background-color: #FFFFFF;
        .storeCateLine{
            height: 80rpx;
            display: flex;
            align-items: center;
            border-bottom: 1px dotted #C5C5C5;
            .storeCateLei{
                width: 120rpx;
                font-size: 26rpx;
                color: #333333;
                margin-right: 10rpx;
            }
            .storeScroll{
                width: 600rpx;
                display: flex;
                align-items: center;
                height: 80rpx;
                white-space: nowrap;
                .skuClass{
                    display: inline-block;
                    height: 40rpx;
                    font-size: 24rpx;
                    color: #888888;
                    margin-right: 10rpx;
                    margin-left: 10rpx;
                    margin-top: 20rpx;
                    padding-left: 10rpx;
                    padding-right: 10rpx;
                    line-height: 40rpx;
                }
                .skuSelect{
                    background-color: #F43131 !important;
                    color: #fff !important;
                    padding-left: 10rpx !important;
                    padding-right: 10rpx !important;
                }
            }
        }
        .storeCateLast{
            height: 86rpx;
            display: flex;
            align-items: center;
            .storeCateLei{
                width: 120rpx;
                font-size: 26rpx;
                color: #333333;
                margin-right: 20rpx;
            }
            .selectSku{
                font-size: 24rpx;
                color: #333333;
                height: 40rpx;
                box-sizing: border-box;
                padding-left: 15rpx;
                padding-right: 15rpx;
                line-height: 40rpx;
                background-color: #FFECEC;
                position: relative;
                .delSku{
                    width: 25rpx;
                    height: 25rpx;
                    position: absolute;
                    top: -10rpx;
                    right: -10rpx;
                }
            }
        }

    }
</style>
