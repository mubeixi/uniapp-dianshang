<template>
  <div>
    <!-- <pagetitle class="nav-title" title="购物车" right="管理" @handle="handle" hiddenBack="true" :rightHidden="manage"></pagetitle> -->
    <div class="content">
      <div v-if="list.length>0">
        <div class="order_msg" v-for="i in list" :key="i">
          <div class="biz_msg">
          <!--  <van-checkbox v-if="handleShow" v-model="checked" checked-color="#F43131"></van-checkbox> -->
            <img src="/static/detail/user1.png" class="biz_logo" alt />
            <text class="biz_name">张小凡时尚衣橱</text>
          </div>
          <div class="pro">
          <!--  <van-checkbox v-if="handleShow" v-model="checked" checked-color="#F43131"></van-checkbox> -->
            <img class="pro-img" src="/static/check/pro1.png" alt />
            <div class="pro-msg">
              <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
              <div class="attr">
                <span>白色;S码</span>
              </div>
              <div class="pro-price">
                <i>￥</i>169.00
                <span class="amount">
                  <span class="plus">-</span>
                  <input type="text" value="1">
                  <span class="plus">+</span>
                </span>
              </div>
            </div>
          </div>
          <div class="pro">
       <!--     <van-checkbox v-if="handleShow" v-model="checked" checked-color="#F43131"></van-checkbox> -->
            <img class="pro-img" src="/static/check/pro1.png" alt />
            <div class="pro-msg">
              <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
              <div class="attr">
                <span>白色;S码</span>
              </div>
              <div class="pro-price">
                <i>￥</i>169.00
                <span class="amount">
                  <span class="plus">-</span>
                  <input type="text" value="1">
                  <span class="plus">+</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="none">
        <img src="/static/box.png" alt="">
        <div><span>购物车空空如也</span><span class="tobuy">去逛逛</span></div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="fenge"><span class="red">——</span> 猜你喜欢 <span class="red">——</span></div>
      <div class="prolist">
        <div class="pro-item" v-for="i in 4" :key="i">
          <img src="/static/check/pro1.png" alt="">
          <div class="item-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
          <div class="price">
            <span class="n_price"><i>￥</i>169.00</span>
            <span class="o_price"><i>￥</i>189.00</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车结算 -->
    <div class="checkout">
      <van-checkbox v-if="handleShow" v-model="checked" checked-color="#F43131">全选</van-checkbox>
      <div class="total">合计：<span>￥<i>338.00</i></span></div>
      <div class="checkbtn">结算</div>
    </div>
   <!-- <tabs style="background:#F3F3F3;"></tabs> -->
  </div>
</template>

<script>
// import tabs from "@/components/tabs";
// import pagetitle from "@/components/title";
export default {
  name: "App",
  // components: {
  //   tabs,
  //   pagetitle
  // },
  data(){
    return {
      list:[2],
      handleShow: false,
      checked: false
    }
  },
  methods: {
    handle(){
      this.handleShow = !this.handleShow;            
    },
  },
  computed: {
    manage(){
      return this.list.length == 0
    }
  }
};
</script>

<style scoped>

.nav-title {
  background: #fff !important;
}
.content {
  background: #f3f3f3;
  padding: 15px 10px 50px;
}
.van-checkbox {
  margin-right: 5px;
}
 /* 订单信息 start */
    .order_msg {
        padding: 10px 15px 0px;
        background: #fff;
        overflow: hidden;
        margin-bottom: 20px;
    }
    .biz_msg {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    .biz_logo {
        width: 35px;
        height: 35px;
        margin-right: 10px;
    }
    .biz_name {
        font-size: 14px;
    }
    .pro {
        display: flex;
        margin-bottom: 25px;
    }
    .pro-msg {
      flex: 1;
    }
    .pro-img {
        width: 100px;
        height: 100px;
        margin-right: 14px;
    }
    .pro-name {
        font-size: 13px;
        margin-bottom: 10px;
    }
    .attr {
        display: inline-block;
        height: 25px;
        line-height: 25px;
        background: #FFF5F5;
        color: #666;
        font-size: 12px;
        padding: 0 10px;
        margin-bottom: 12px;
    }
    .pro-price {
        color: #F43131;
        font-size: 18px;
    }
    .pro-price i {
        font-size: 12px;
        font-style: normal;
    }
    .amount {
        float: right;
        display: flex;
        color: #666;
    }
    .amount input {
        width: 40px;
        height: 20px;
        line-height: 20px;
        padding: 0 2px;
        font-size: 14px;
        text-align: center;
        border: 1px solid #D1D1D1;
    }
    .plus {
        width: 22px;
        height: 20px;
        border: 1px solid #D1D1D1;
        text-align: center;
        line-height: 20px;
    }
    /* 订单信息 end */
    /* 猜你喜欢 */
    .fenge {
      text-align: center;
      margin-bottom: 10px;
    }
    .prolist {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
    /* 购物车为空 */
    .none {
      text-align: center;
      margin-bottom: 20px;
      color: #B0B0B0;
    }
    .none img {
      height: 110px;
      width: 100px;
    }
    .tobuy {
      color: #F43131;
      border: 1px solid #F43131;
      height: 25px;
      line-height: 25px;
      padding: 2px 10px;
      border-radius: 10px;
      margin-left: 10px;
    }
    /* 结算 */
    .checkout {
      position: fixed;
      bottom: 50px;
      width: 100%;
      height: 50px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      box-sizing: border-box;
    }
    .checkbtn {
      background: #F43131;
      color: #fff;
      height: 27px;
      line-height: 27px;
      padding: 2px 15px;
      font-size: 14px;
      border-radius: 8px;
    }
    .total {
      flex: 1;
      text-align: right;
      margin-right: 20px;
    }
    .total>span {
      color: #F43131;
    }
    .total>span>i {
      font-style: normal;
      font-size: 18px;
    }
</style>