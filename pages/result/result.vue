<template>
  <div class="bd">
    <div class="wrap">
        <van-icon name="arrow-left" size="20" />
        <van-search placeholder="请输入商品关键词" v-model="value" class="input" right-icon="cross"/>
    </div>
    <div class="tabs">
        <div :class="[active == 0 ? 'checked' : '','tab']" @click="active=0">默认<div class="line"></div></div>
        <div :class="[active == 1 ? 'checked' : '','tab']" @click="active=1">销量<div class="line"></div></div>
        <div :class="[active == 2 ? 'checked' : '','tab']" @click="active=2">价格<div class="line"></div></div>
        <div :class="[active == 3 ? 'checked' : '','tab']" @click="active=3">筛选<img src="/static/result/jx.png" alt=""> <div class="line"></div></div>
    </div>
    <div class="pro" @click="gotoDetail">
        <img src="/static/result/pro1.png" alt="" height="135" width="135" class="pro-img">
        <div class="pro_desc">
            <div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
            <div class="price">
                <span class="n_price"><i>￥</i>169.00</span>
                <span class="o_price"><i>￥</i>189.00</span>
            </div>
            <div class="sold">已售22件</div>
        </div>
    </div>
    <div class="pro">
        <img src="/static/result/pro2.png" alt="" height="135" width="135" class="pro-img">
        <div class="pro_desc">
            <div class="title">2018夏装新款短袖蕾丝拼接荷叶边波点雪白连衣裙女时尚热卖</div>
            <div class="price">
                <span class="n_price"><i>￥</i>169.00</span>
                <span class="o_price"><i>￥</i>189.00</span>
            </div>
            <div class="sold">已售22件</div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  props: {value:'',},
  data() {
    return {
        active: 0
    }
  },
  components: {
    
  },
  methods: {
      gotoDetail(){
          this.$router.push({name: 'detail'})
      }
  }
}
</script>

<style scoped>
    .wrap {
        display: flex;
        align-items: center;
        padding: 15px 10px 0;
    }
    .van-search {
        padding:0;
    }
    .arrow-left {
        width: 12px;
        height: 20px;
    }
    .van-search .van-cell {
        width: 323px;
    }
    .input {
        flex: 1;
        height: 33px;
    }
    .tabs {
        display: flex;
        justify-content: space-around;
        margin-top: 25px;
        padding:0 10px;
    }
    .tab.checked {
        color: red;
    }
    .tab.checked .line{
        background: red;
    }
    .tab {
        flex: 1;
        text-align: center;
    }
    .tab img {
        height: 17px;
        width: 20px;
        margin-left: 5px;
        vertical-align: middle;
    }
    .tab .line {
        width: 50px;
        height: 2px;
        margin: 10px auto 0 ;
        background: #fff;
    }
    .van-icon-cross {
        width: 18px;
        height: 18px;
        color: #fff;
        border-radius: 18px;
        font-size: 12px;
        background: #ccc;
    }
    .pro{
        display: flex;
        padding: 0 10px;
        margin-top: 10px;
    }
    .pro-img {
        margin-right: 10px;
    }
    .pro_desc {
        padding-top: 15px;
        text-align: left;
    }
    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        font-size: 12px;
    }
    .price {
        margin-top: 22px;
    }
    .price i {
        font-size: 10px;
        font-style: normal;
    }
    .n_price {
        color: #ff0000;
        font-size: 18px;
    }
    .o_price {
        color: #afafaf;
        font-size: 14px;
        text-decoration: line-through;
    }
    .sold {
        color: #999;
        font-size: 10px;
        margin-top: 20px;
    }
</style>
