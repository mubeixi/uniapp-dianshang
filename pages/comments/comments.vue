<template>
  <div>
       <!-- <comments title="评论"></comments> -->
        <div class="navs">
            <div class="nav" :class="index == 0 ? 'active' : ''" @click="index=0">全部</div>
            <div class="nav" :class="index == 1 ? 'active' : ''" @click="index=1">有图</div>
        </div>
        <div class="c_content">
            <div class="c_content_title">
                <img src="/static/detail/user1.png" alt="">
                <span class="user_name">张小凡</span>
                <span class="c_time">2019-09-10</span>
            </div>
            <div class="c_content_msg">衣服好淑女，穿上一下子就变的很有名媛风，好喜欢啊，袖口的珍珠设计让整件衣服变得很高贵，秋天再搭配个外套也绝对好看</div>
            <div class="c_content_img"></div>
        </div>
        <div class="c_content">
            <div class="c_content_title">
                <img src="/static/detail/user2.png" alt="">
                <span class="user_name">张小凡</span>
                <span class="c_time">2019-09-10</span>
            </div>
            <div class="c_content_msg">衣服好淑女，穿上一下子就变的很有名媛风，好喜欢啊，袖口的珍珠设计让整件衣服变得很高贵，秋天再搭配个外套也绝对好看</div>
            <div class="c_content_img">
                <img src="/static/detail/coment1.png" alt="">
                <img src="/static/detail/coment2.png" alt="">
                <img src="/static/detail/coment3.png" alt="">
            </div>
        </div>
     <!-- <goodsaction></goodsaction> -->
  </div>
</template>

<script>
// import comments from '@/components/title'
// import goodsaction from '@/components/goodsaction'
export default {
    name: 'app',
    components: {
        // comments,
        // goodsaction
    },
    data(){
        return {
            index:  0
        }
    }
}
</script>

<style scoped>
    .navs {
        margin: 40rpx 0 36rpx;
        padding-left: 20rpx;
        display: flex;
    }
    .nav {
        width: 110rpx;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 28rpx;
        border: 2rpx solid #999;
        border-radius: 40rpx;
        color: #999;
    }
    .navs .nav:nth-child(1) {
        margin-right: 30rpx;
    }
    .nav.active {
        background: #F43131;
        color: #fff;
        border-color: #F43131;
    }
    /* 内容 */
    /* 评价 start */
    .c_content {
        margin-top: 30rpx;
        padding: 0 20rpx 0;
        border-bottom: 2rpx solid #FFECE8E8;
    }
    .c_content_title {
        display: flex;
        align-items: center;
        font-size: 30rpx;
        color: #333;
    }
    .c_content_title>img {
        width: 70rpx;
        height: 70rpx;
        margin-right: 20rpx;
    }
    .user_name {
        flex: 1;
    }
    .c_time {
        font-size: 26rpx;
        color: #777;
    }
    .c_content_msg {
        font-size: 24rpx;
        color: #333;
        line-height: 36rpx;
        padding: 18rpx 0;
    }
    .c_content_img img {
        width: 140rpx;
        height: 140rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
    }
    /* 内容 end */
</style>