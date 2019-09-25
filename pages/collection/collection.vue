<template>
  <div>
   <!--   <tabtitle title="收藏列表" :right="handleShow ? '管理' : '取消'" @handle="handle"></tabtitle> -->
      <div class="pro-list">
          <van-checkbox v-if="handleShow" v-model="checked" checked-color="#F43131"></van-checkbox>
          <div class="pro" >
              <img class="pro-img" src="/static/check/pro1.png" alt="">
              <div class="pro-msg">
                  <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                  <div class="collection"><span>5124</span>人收藏</div>
                  <div class="btn">
                      <span>
                        <i>￥</i>169.00
                      </span>
                      <button @click="buy">立即购买</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="pro-list">
          <van-checkbox v-if="handleShow" v-model="checked" checked-color="#F43131"></van-checkbox>
          <div class="pro" >
              <img class="pro-img" src="/static/check/pro1.png" alt="">
              <div class="pro-msg">
                  <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                  <div class="collection"><span>5124</span>人收藏</div>
                  <div class="btn">
                      <span>
                        <i>￥</i>169.00
                      </span>
                      <button>立即购买</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="bottom" v-if="handleShow" >
            <div class="b_left">
                <van-checkbox v-model="checked" checked-color="#F43131">全选</van-checkbox>
            </div>
            <div class="b_right">删除(1)</div>
      </div>
  </div>
</template>

<script>
// import tabtitle from '@/components/title.vue'
export default {
    components: {
        // tabtitle
    },
    data(){
        return {
            checked: false,
            handleShow: false
        }
    },
    methods: {
        handle(){
            this.handleShow = !this.handleShow;            
        },
        buy(){
            this.$router.push({name:'check'})
        }
    }
}
</script>

<style scoped>
    .pro-list {
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;
    }
    .pro {
        flex: 1;
        margin-left: 10px;
        display: flex;
        margin-bottom: 10px;
    }
    .pro-img {
        width: 150px;
        height: 150px;
        margin-right: 10px;
    }
    .pro-name {
        font-size: 13px;
        color: #333;
        margin-bottom: 15px;
        margin-top: 10px;
    }
    .collection {
        font-size: 12px;
        color: #888;
    }
    .btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 35px;
        color: #F43131;
    }
    .btn i{
        font-style: normal;
        font-size: 10px;
    }
    .btn button {
        background: #F43131;
        color: #fff;
        padding: 5px 10px;
        border: none;
        font-size: 13px;
        border-radius: 20px;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 45px;
        line-height: 45px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        box-shadow: 0 0 9px rgba(0, 0, 0, .4);
    }
    .b_left {
        
    }
    .b_right {
        font-size: 13px;
        color: #F43131;
        height: 27px;
        line-height: 27px;
        padding: 0 10px;
        border-radius: 8px;
        border: 1px solid #F43131;
    }
</style>