<template>
    <view class="wrap" :style="{'overflow': isScroll}">
        <!-- #ifdef APP-PLUS -->
		<view class="status_bar"></view>
		<view class="space-div"></view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS -->
		<view class="spaceDiv"></view>
		<!-- #endif -->
		<page-title class="nav-title" title="进货"
		bgcolor="#ffffff"
		:rightHidden=true
        :dot=true
        @methodHandle="methodHandle"></page-title>

        <view class="search-wrap">
            <icon type="search" size="34rpx" class="search_icon" @click="search"/>
            <input type="text" class="input" placeholder="请输入商品关键词" @confirm="search" v-model="prod_name" placeholder-style="color:#bebdbd;">
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
                <view class="check-msg" @click="showSelected">已选取<text class="num">{{total_cart_count}}</text>/{{total_pro_count}}个普通商品 <image class="img" :class="isClicked?'turn':''" src="/static/top.png"></image></view>
                <view class="submit">提交进货单</view>
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
                        <view class="handle" @click="increase">+</view>
                    </view>
                </view>
                <view class="sku-btns">
                    <view class="cancel btn" @click="cancel">取消</view>
                    <view class="confirm btn" @click="confirm" >确定</view>
                </view>
            </view>
        </view>
        <!--  门店信息	-->
        <view class="sku-pop mendian" v-if="isShowStoreMsg">
            <view class="sku-title">门店信息</view>
            <view class="sku-content">
                <view class="skulist">
                    <view class="sku-name">门店名称：</view>
                    <view class="sku-item">{{storeInfo.Stores_Name}}</view>
                </view>
                <view class="skulist">
                    <view class="sku-name">门店电话：</view>
                    <view class="sku-item">{{storeInfo.mobile}}</view>
                </view>
                <view class="skulist">
                    <view class="sku-name">门店地址：</view>
                    <view class="sku-item" style="flex:1;">{{storeInfo.Stores_Province_name}}{{}}<image class="img" src="/static/local.png"></image></view>
                </view>
                <view class="skulist">
                    <view class="sku-name">门店距离：</view>
                    <view class="sku-item">1.2KM</view>
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
                                    <image class="del"  @click="del(pro_id,attr_id)" src="/static/del.png"></image>
                                </view>
                                <view class="attrInfo">
                                    <view>{{attr.Productsattrstrval}}</view>
                                </view>
                                <view class="proPrice">
                                    <view class="newPrice">￥<text class="number">{{attr.ProductsPriceX}}</text></view>
                                    <view class="oldPrice">￥{{attr.ProductsPriceY}}</view>
                                    <view class="amount">
                                        <view class="icon">-</view>
                                        <view class="num">{{attr.Qty}}</view>
                                        <view class="icon">+</view>
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
    import {getPifaStoreProd, updateCart,getCart,delCart,getStoreList} from '../../common/fetch'
    import {mapGetters} from 'vuex'
    import {numberSort} from '../../common/tool'
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
                    count: 0,         //选择属性的库存
                    // showimg: '',      //选择属性的图片(用产品图片代替)
                    qty: 1,           //购买数量
                    productDetail_price: 0
                },
                prod_name: '', // 根据产品名称搜索
                cartList: '',
                total_pro_count: '', // 总共的产品数
                total_cart_count: '', // 购物车中的产品数
								storeInfo: '' , // 门店信息
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
        onLoad(options){
            if(options.purchase_store_sn) {
                this.purchase_store_sn = options.purchase_store_sn;
                this.getProlist();
            }
            this.get_cart();
        },
        methods: {
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
											this.$refs.detail.close();
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
                this.check_attr = check_attr;
                this.check_attrid_arr = check_attrid_arr;
                this.submit_flag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length != Object.getOwnPropertyNames(this.prosku.skujosn).length) ? false : true;
            },
            // 搜索
            search(){
                getPifaStoreProd({
                    purchase_store_sn: this.purchase_store_sn,
                    store_id: this.Stores_ID,
                    prod_name: this.prod_name,
                }).then(res=>{
                    this.prolist = res.data;
                })
            },
            getProlist(){
                getPifaStoreProd({
                    purchase_store_sn: this.purchase_store_sn,
                    store_id: this.Stores_ID
                }).then(res=>{
                    this.prolist = res.data;
                    this.total_pro_count = res.totalCount;
                })
            },
            methodHandle(type){
              this.type = type;
							if(this.type == 1) {
								// 进货记录
							}else {
								// 门店信息
								getStoreList({
									stores_id: this.Stores_ID
								}).then(res=>{
									this.storeInfo = res.data[0]
								})
								this.methodHandle = true;
							}
            },
            handClicked(){
                this.isClicked = false;
                this.zIndex = 100;
            },
            showSelected(){
								if(this.total_cart_count == 0) return;
                if(!this.isClicked) {
                    this.zIndex = 9999999;
                    this.$refs.detail.show();
                }else {
                    this.$refs.detail.close();
                    setTimeout(()=>{
                        this.zIndex = 100;
                    },500)
                }
                this.isClicked = !this.isClicked;
            },
            //隐藏遮罩
            hiddenMask(){
                this.isHidden = true;
                this.showSku = false;
            },
            increase(){
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
                console.log(item)
                this.postData.prod_id = item.Products_ID;
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
                if(!this.postData.attr_id) {
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
                    active_id:  this.Stores_ID + '_' + this.prosku.Stores_ID
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
            padding: 40rpx 0 34rpx 40rpx;
            background-color: #fff;
            border-bottom-left-radius: 10rpx;
            border-bottom-right-radius: 10rpx;
            .skulist {
                margin-bottom: 34rpx;
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
                    /*flex: 1;*/
                    .img {
                        width: 27rpx;
                        height: 32rpx;
                    }
                    .sku {
                        width: 80rpx;
                        height: 46rpx;
                        line-height: 46rpx;
                        text-align: center;
                        background-color: #f6f6f6;
                        color: #666;
                        font-size: 24rpx;
                        margin-right: 13rpx;
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
</style>
