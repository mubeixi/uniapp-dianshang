<template>
  <view class="base wrap">
    <view v-if="base.config.style==2" class="cover style2" :style="{backgroundImage:'url('+domainFunc(base.config.cover)+')'}">
      <view class="logotitle">
        <image class="logo" :src="base.config.logo|domain"/>
        <view class="title font16">{{base.config.title}}</view>
      </view>
      <view v-if="base.config.style===2" class="round">
        <view class="mask" :style="{height:3.5933*W+'px',width:3.5933*W+'px',backgroundSize:W+'px',backgroundImage:'url('+domainFunc(base.config.cover)+')'}"></view>
      </view>
    </view>
    <view v-else class="cover style1" :style="{backgroundImage:'url('+domainFunc(base.config.cover)+')'}">
      <view class="logotitle">
        <image class="logo" :src="base.config.logo|domain"/>
        <view class="title font16">{{base.config.title}}</view>
      </view>
      <view v-if="base.config.style===2" class="round">
        <view class="mask" :style="{height:3.5933*W+'px',width:3.5933*W+'px',backgroundSize:W+'px',backgroundImage:'url('+domainFunc(base.config.cover)+')'}"></view>
      </view>
    </view>

  </view>
</template>
<script>
  import {domain} from "../../common/filter";

  export default {
    name:'BaseComponent',
    props: {
      index: {
        required: true,
      },
      confData: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        base: {},
      };
    },
    computed: {
      className() {
        return 'style' + this.base.config.style
      },
      W() {
        const res = uni.getSystemInfoSync();
        return res.screenWidth?res.screenWidth:375;
      },
      style() {
        // return deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
      },

    },
    filters: {
      str2num(val) {
        return parseInt(val)
      }
    },
    watch: {

    },

    methods: {
      domainFunc(url) {
        return domain(url)
      },

    },
    created() {

      this.base = this.confData;
    }
  }
</script>


<style scoped lang="less">
  @import "../../static/css/app.less";

  .wrap{
    overflow: hidden;
    position: relative;
  }

  .cover {
    .cover-full-bg(cover, 0);
    height: 100%;
  }

  .style1 {
    height: 160px;
    color: white;
    position: relative;
    background-color: #d2dee7;

    .logotitle {
      position: absolute;
      left: 30px;
      bottom: 20px;
      display: flex;
    }

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .title {
      line-height: 40px;
      margin-left: 10px;
    }

    .desc {
    }

    .total {
    }

    .new {
    }
  }

  .style2 {
    height: 185px;
    color: white;
    position: relative;
    background: none !important;
    /*border: 1px solid black;*/
    /*border-bottom-right-radius: 50% 15%;*/
    /*border-bottom-left-radius: 50% 15%;*/
    /*border-top: none;*/
    /*overflow: hidden;*/


    .round{
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      height: 40px;
      /*overflow: hidden;*/
      background: none;
      /*z-index: 0;*/
      .mask{
        position: absolute;
        background-position: bottom center;

        /*background-repeat: no-repeat;*/
        border-radius: 50%;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%)
      }
    }

    .logotitle {
      position: absolute;
      left: 30px;
      bottom: 50px;
      display: flex;
      z-index: 3;
    }

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .title {
      line-height: 40px;
      margin-left: 10px;
    }

    .desc {
    }

    .total {
    }

    .new {
    }
  }

</style>
