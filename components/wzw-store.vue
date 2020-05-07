<template>
  <div class="store-swiper-item"   >
    <image :src="pro.ImgPath+'-r420'"
           class="store-item-img"></image>
    <div class="store-item-title">
      {{pro.Products_Name}}
    </div>
    <div class="flex flex-between store-price">
      <div class="font10">
        <span class="price-x">¥<span class="font16">{{pro.Products_PriceX}}</span></span>
        <span class="price-y">¥<span class="font14">{{pro.Products_PriceY}}</span></span>
      </div>
      <div class="saley">
        已售{{pro.Products_Sales}}
      </div>
    </div>
    <div class="flex flex-between">
      <div class="flex flex-vertical-center"  @click="goStoreBuy">
        <block v-for="(it,ind) of userPay" :key="ind">
          <image :src="it.User_HeadImg"
                 class="info-img"></image>
        </block>


        <image  v-if="userPay"  :src="'/static/client/right.png'|domain" style="width: 16rpx;height: 26rpx;margin-left: 18px"></image>
      </div>

      <div class="flex flex-vertical-center" v-if="cartData.Qty">
        <image src="/static/dee.png" style="width: 40rpx;height: 40rpx" @click.stop="delQty"> </image>
        <div class="store-count">
          {{cartData.Qty}}
        </div>
        <image src="/static/add.png" style="width: 40rpx;height: 40rpx" @click.stop="addQty"> </image>
      </div>
      <div class="store-cart" v-else  @click.stop="updaCart">
        加入购物车
      </div>
    </div>





  </div>
</template>

<script>
import  {getSelfStoreProd} from '../common/fetch'
import {error} from '../common';
export default {

    props: {
        myCart:{

        },
        pro:{
            type:Object,
            default:{}
        },
        storeId:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
          userPay:[],
          cartData:{}
        }
    },
    watch:{
        myCart: {
            handler (newVal, oldVal) {
                this.myCart=newVal
                this.initCart()
            },
        },
    },
    methods: {
        goStoreBuy(){
            uni.navigateTo({
                url:'/pagesA/store/storeBuyRecord?pid='+this.pro.Products_ID
            })
        },
        addQty(){

            this.$emit('addQty',this.cartData)
        },
        delQty(){
            if(this.cartData.Qty<=1){
                error('数量最少为1')
                return
            }
            this.$emit('delQty',this.cartData)
        },
        updaCart(){
            this.$emit('updaCart',this.pro)
        },
        initCart(){

            for(let item in this.myCart){
                if(item==this.pro.Products_ID){
                    for(let it in this.myCart[item]){
                        this.cartData=this.myCart[item][it]
                        this.cartData.prod_id=item
                    }
                }
            }
        },
        init(){
            let data={
                store_id:this.storeId,
                prod_id:this.pro.Products_ID
            }
            getSelfStoreProd(data).then(res=>{
              this.userPay=res.data?res.data.buyer:[]
            })
        }
    },
    created(){
        this.init()
    }

}
</script>

<style scoped lang="scss">
  .store-swiper-item {
    width: 710rpx;
    height: 700rpx;
    border-radius: 10rpx;
    background-color: #FFFFFF;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 20rpx;
  }
  .store-item-swiper{
    width: 710rpx;
    overflow-x: hidden;
  }

  .store-item-img {
    width: 420rpx;
    height: 420rpx;
    margin: 0 auto 20rpx;
    display: block;
  }

  .store-item-title {
    width: 658rpx;
    height: 72rpx;
    font-size: 15px;
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 32rpx;
  }

  .store-price {
    align-items: flex-end;
    margin-bottom: 38rpx;
  }

  .price-x {
    color: #FF3C00;
  }

  .price-y {
    color: #BFBFBF;
    margin-left: 20rpx;
  }

  .saley {
    color: #888888;
    font-size: 13px;
  }
  .info-img{
    width: 46rpx;
    height: 46rpx;
    border-radius: 50%;
    margin-right: -4px;
  }
  .store-cart{
    width:180rpx;
    height:60rpx;
    font-size: 28rpx;
    color: #FFFFFF;
    line-height: 60rpx;
    text-align: center;
    background:rgba(255,78,0,1);
    border-radius:30rpx;
  }
  .store-count{
    width: 58rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    font-size: 13px;
    color: #333333;
  }

</style>
