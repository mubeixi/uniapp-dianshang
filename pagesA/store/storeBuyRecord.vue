<template>
 <div style="background-color: #FFFFFF;height: 100vh;">
   <div class="store-buy">
     <span class="store-buy-title">520</span>人正在购买，总销量 <span class="store-buy-title">2628</span>
   </div>

   <div class="store-buy-item flex flex-vertical-center" v-for="(it,ind) of prodata" :key="ind">
     <image :src="it.User_HeadImg" class="store-buy-img"></image>
     <div>
        <div class="store-buy-item-title">
         {{it.User_NickName}}
        </div>
        <div class="store-buy-item-time">
          {{it.Order_CreateTime}}
        </div>
     </div>
     <div class="store-buy-item-count">
      <span class="color-red">{{it.prod_count}}</span>件
     </div>
   </div>

 </div>
</template>
<script>

import {pageMixin} from "../../common/mixin";
import {getBuyerByProd} from '../../common/fetch'
import {error, toast} from '../../common';

export default {
    mixins:[pageMixin],
    data() {
        return {
          pid:'643',
          page:1,
          pageSzie:10,
          totalCount:0,
          prodata:[]
        }
    },
    methods: {
     getBuyerByProd(){
      let data={
       prod_id:this.pid,
       page:this.page,
       pageSzie: this.pageSzie
      }
      getBuyerByProd(data).then(res=>{
           this.totalCount= res.totalCount
            let arr=[]
            for(let it in res.data.list){
                arr=res.data.list[it]
            }
            for(let item of arr){
                this.prodata.push(item)
            }
      })
     }
    },
    onReachBottom(){
      if(this.prodata.length<this.totalCount){
            this.page++
            this.getBuyerByProd()
      }
    },
    onLoad(options) {
      //this.pid=options.pid
      this.getBuyerByProd()
    }
}
</script>

<style lang="scss" scoped>
.store-buy{
 width:710rpx;
 height:70rpx;
 line-height: 70rpx;
 text-align: center;
 background:rgba(255,245,240,1);
 margin: 30rpx auto 30rpx;
 font-size: 13px;
 color: #666666;
}
 .store-buy-title{
  font-size: 14px;
  color: #FF4E00;
 }
 .store-buy-item{
  width:710rpx;
  height:120rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 6rpx 20rpx 0px rgba(212,212,212,0.3);
  margin: 0 auto 20rpx;
  padding: 20rpx;
  box-sizing: border-box;
 }
 .store-buy-img{
  width: 78rpx;
  height: 78rpx;
  margin-right: 22rpx;
 }
 .store-buy-item-title{
   height: 26rpx;
   line-height: 26rpx;
   font-size: 28rpx;
   color: #333333;
  margin-top: 8rpx;
  margin-bottom: 20rpx;
  width: 450rpx;
  overflow-x: hidden;
 }
 .store-buy-item-time{
  height: 18rpx;
  line-height: 18rpx;
  font-size: 24rpx;
  color: #888888;
 }
 .store-buy-item-count{
  margin-left: auto;
  font-size: 28rpx;
  color: #888888;
 }
 .color-red{
  color: #FF4E00;
 }


</style>
