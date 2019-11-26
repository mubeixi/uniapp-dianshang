<template>
    <div class="wrap">
        <div class="navs">
            <div class="nav-item" :class="index==0?'active':''" @click="changIndex(0)">全部</div>
            <div class="nav-item" :class="index==1?'active':''" @click="changIndex(1)">待处理</div>
            <div class="nav-item" :class="index==2?'active':''" @click="changIndex(2)">待确认</div>
            <div class="nav-item" :class="index==3?'active':''" @click="changIndex(3)">已驳回</div>
        </div>
        <view class="space-box">
        </view>
    </div>
</template>

<script>
    import {pageMixin} from "../../common/mixin";

    export default {
        mixins:[pageMixin],
        name: "Apply"
    }
</script>

<style lang="scss" scoped>
.navs {
    z-index: 2;
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;
    background: #fff;
    font-size: 14px;
    padding: 0 10px;
    .nav-item {
        flex: 1;
        /*box-sizing: border-box;*/
        text-align: center;
        /*position: relative;*/
        color: #333;
    }
    .nav-item.active {
        color: $wzw-primary-color;
        border-bottom: 2px solid $wzw-primary-color;
    }
}
.space-box{
    height: 50px;
    width: 100%;
    background: white;
}
</style>
