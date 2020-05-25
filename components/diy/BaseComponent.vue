<template>
  <view class="base wrap">
    <view :style="{backgroundImage:'url('+domainFunc(base.config.cover)+')'}" class="cover style2"
          v-if="base.config.style==2">
      <div class="logotitle">
        <div class="flex">
          <img :src="info.ShopLogo|domain" class="logo" style="margin-top: 8px" />
          <div class="title">
            <div style="line-height: 32px">{{info.ShopName}}</div>
            <div class="flex" style="line-height: initial">
              <div class="total font12">全部商品{{info.prod_total}}</div>
              <div class="new font12" style="margin-left: 4px;"> 上新{{info.prod_isnew_total}}</div>
            </div>
          </div>
        </div>
      </div>
      <view class="round" v-if="base.config.style===2">
        <view :style="{height:3.5933*W+'px',width:3.5933*W+'px',backgroundSize:W+'px',backgroundImage:'url('+domainFunc(base.config.cover)+')'}"
              class="mask"></view>
      </view>
    </view>
    <view :style="{backgroundImage:'url('+domainFunc(base.config.cover)+')'}" class="cover style1" v-else>
      <div class="logotitle">
        <div class="flex">
          <img :src="info.ShopLogo|domain" class="logo" style="margin-top: 8px" />
          <div class="title">
            <div style="line-height: 32px">{{info.ShopName}}</div>
            <div class="flex" style="line-height: initial">
              <div class="total font12">全部商品{{info.prod_total}}</div>
              <div class="new font12" style="margin-left: 4px;"> 上新{{info.prod_isnew_total}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--      <view v-if="base.config.style===2" class="round">-->
      <!--        <view class="mask" :style="{height:3.5933*W+'px',width:3.5933*W+'px',backgroundSize:W+'px',backgroundImage:'url('+domainFunc(base.config.cover)+')'}"></view>-->
      <!--      </view>-->
    </view>

  </view>
</template>
<script>
import { domainFn } from '../../common/filter'
import { getProductCountInfo } from '../../common/fetch'

export default {
  name: 'BaseComponent',
  props: {
    index: {
      required: true
    },
    confData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      base: {},
      info: {}
    }
  },
  computed: {
    className () {
      return 'style' + this.base.config.style
    },
    W () {
      const res = uni.getSystemInfoSync()
      return res.screenWidth ? res.screenWidth : 375
    },
    style () {
      return ''
      // return deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
    }

  },
  filters: {
    str2num (val) {
      return parseInt(val)
    }
  },
  watch: {},

  methods: {
    domainFunc (url) {
      return domainFn(url)
    }

  },
  created () {
    this.base = this.confData

    getProductCountInfo().then(res => {
      this.info = res.data
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/app.less";

  .wrap {
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
      /*display: flex;*/
    }

    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .title {
      /*line-height: 40px;*/
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

    .round {
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      height: 40px;
      /*overflow: hidden;*/
      background: none;
      /*z-index: 0;*/

      .mask {
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
