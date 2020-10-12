<template>
  <view @click="commonClick" class="myall" v-show="isLoad">
    <!-- #ifdef APP-PLUS -->
    <!--		<view class="status_bar" style="background-color: rgb(248, 248, 248);"></view>-->
    <!-- #endif -->
    <!-- 	<page-title title="爵位晋升" rightHidden="true"></page-title> -->
    <view class="top">
      <view class="person">
        <image :src="pro.disInfo.Shop_Logo" class="headimg"></image>
      </view>
      <view class="nickName">
        <view class="tops" v-if="pro.disInfo">
          {{pro.disInfo.Shop_Name}}
        </view>
        <view class="bottoms">
          {{pro.disInfo.sha_level_name}}
        </view>
      </view>

      <view @click="goGudongPay(pro.waiting_pay_apply.Order_ID)" class="juewei" v-if="pro.waiting_pay_apply">
        {{$t('1075x0')}}
      </view>
      <view @click="goGudong" class="juewei" v-else-if="pro.sha_config.Sha_Agent_Type==1&&pro.is_apply">
        {{$t('1075x1')}}
      </view>
      <view class="juewei" v-else>
        {{$t('1075x2')}}
      </view>
      <!-- <view  v-else-if="pro.disInfo.sha_level_id>0" class="juewei">
        {{pro.disInfo.sha_level_name}}
      </view> -->

      <!-- <view  v-else-if="" class="juewei" >
        {{$t('1075x3')}}
      </view> -->

    </view>
    <view class="moneySum">
      <view class="money">
        <view>
          <view class="moneyTop">
            {{(pro.total_sales || pro.total_sales==0)?$t('1075x4'):$t('1075x5')}}
          </view>
          <view class="moneyBottom">
            ￥
            <text>{{pro.total_sales||pro.total_sha}}</text>
          </view>
        </view>
        <view>
          <view class="moneyTop">
            {{(pro.month_sales || pro.month_sales==0)?$t('1075x6'):$t('1075x7')}}
          </view>
          <view class="moneyBottom">
            ￥
            <text>{{pro.month_sales||pro.sha_send_money}}</text>
          </view>
        </view>
      </view>
      <view @click="goFinance" class="chakan" v-if="!pro.total_sales && pro.total_sales!=0">
        {{$t('1075x8')}}
        <image :src="'/static/client/fenxiao/chakan.png'|domain" class="image"></image>
      </view>
    </view>
     <!-- <circleTitle title="股东条件说明"></circleTitle> -->
    	<div>
    		<view class="fengTitle">
    		  <view class="fengTitleLeft">
    		    <view class="xiao"></view>
    		    <view class="da"></view>
    		  </view>
    		  <view class="fengTitleCenter">
    		   {{$t('1075x9')}}
    		  </view>
    		  <view class="fengTitleRight">
    		    <view class="da"></view>
    		    <view class="xiao"></view>
    		  </view>
    		</view>
    	</div>
    <view :key="index" class="xiang" v-for="(item,index) of pro.sha_config.Sha_Rate" v-if="item.sha_name">
      <view class="xiangTop">
        {{item.sha_name}}
      </view>
      <view class="xiangCenter">
        <view class="xiangLeft">
          {{$t('1075x10')}}
        </view>
        <view class="xiangRight">
          <view class="view" v-if="item.Level_name">
            {{commi_rename.commi}}{{$t('1075x11')}}:{{item.Level_name}}
          </view>
          <view class="view" v-if="item.nobi_level">
            {{$t('1075x12')}}:{{item.nobi_level}}
          </view>
          <view class="view">
            {{$t('1075x13')}}:{{item.self_pay}}
          </view>
          <view class="view">
            {{$t('1075x14')}}:{{item.team_sales}}
          </view>
        </view>
      </view>
      <view class="xiangBottom">
        <view class="xiangBottomT">
          {{$t('1075x15')}}
        </view>
        <view class="xiangBottomB">
          ¥
          <text class="text">{{item.price}}</text>
          <block v-if="item.is_apply">{{$t('1075x16')}}</block>
        </view>
      </view>
    </view>

    <view style="height: 20rpx;width: 100%;"></view>
    <!-- <circleTitle title="收益介绍"></circleTitle> -->
    	<div>
    		<view class="fengTitle">
    		  <view class="fengTitleLeft">
    		    <view class="xiao"></view>
    		    <view class="da"></view>
    		  </view>
    		  <view class="fengTitleCenter">
    		   {{$t('1075x17')}}
    		  </view>
    		  <view class="fengTitleRight">
    		    <view class="da"></view>
    		    <view class="xiao"></view>
    		  </view>
    		</view>
    	</div>
    <view class="shouyi">
      <view class="tt">
        <view :class="{rightZ:index==pro.sha_config.Sha_Rate.length-1}" :key="index"
              class="view" v-for="(item,index) of pro.sha_config.Sha_Rate">
          {{item.sha_name}}
        </view>
      </view>
      <view class="tt ts">
        <view :class="{rightZ:index==pro.sha_config.Sha_Rate.length-1}" :key="index"
              class="view" v-for="(item,index) of pro.sha_config.Sha_Rate">
          {{item.sha_commi_scale}}%
        </view>
      </view>
    </view>
    <view class="guize">
      <text class="text">*</text>
      {{$t('1075x18')}}
      <block :key="index" v-for="(item,index) of pro.sha_config.Sha_Rate">{{item.sha_name}}
        <block v-if="index!=pro.sha_config.Sha_Rate.length-1">、</block>
      </block>
      {{$t('1075x19')}}
      <block :key="index" v-for="(item,index) of pro.sha_config.Sha_Rate">
	  <block v-if="$p('zh-cn')">{{item.sha_commi_scale}}{{$t('1075x20')}}</block>
	  <block v-if="$p('en-us')">{{$t('1075x20')}}{{item.sha_commi_scale}}</block>
	  
        <block v-if="index!=pro.sha_config.Sha_Rate.length-1">、</block>
      </block>
      {{$t('1075x21')}}
    </view>

  </view>
</template>

<script>
import circleTitle from '../../components/circleTitle/circleTitle.vue'
import { pageMixin } from '../../common/mixin'
import { shaInit } from '../../common/fetch.js'
import { mapGetters } from 'vuex'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      isLoad: false,
      pro: {
        sha_config: { sha: {} },
        disInfo: {}
      }
    }
  },
  computed: {
    ...mapGetters(['commi_rename'])
  },
  components: {
    circleTitle
  },
  onLoad () {

  },
  onShow () {
    this.shaInit()
  },
  methods: {
    goGudongPay (index) {
      uni.navigateTo({
        url: '/pagesA/fenxiao/gudongPay?id=' + index
      })
    },
    goGudong () {
      uni.navigateTo({
        url: '/pagesA/fenxiao/addGudong'
      })
    },
    goFinance () {
      uni.navigateTo({
        url: '/pagesA/fenxiao/finance?index=2'
      })
    },
    shaInit () {
      shaInit().then(res => {
        this.pro = res.data
        this.isLoad = true
      }).catch(e => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #F8F8F8 !important;
    min-height: 100vh;
  }

  .top {
    margin: 30rpx 0rpx 30rpx 20rpx;
    margin-top: 0rpx;
    padding-top: 30rpx;
    height: 75rpx;
    display: flex;
    position: relative;

    .person {
      width: 75rpx;
      height: 75rpx;
      border-radius: 50%;

      .headimg {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }

    .nickName {
      margin-left: 19rpx;
      font-size: 30rpx;
      height: 75rpx;
      line-height: 75rpx;
      color: #333333;

      .tops {
        margin-top: 10rpx;
        margin-left: 1rpx;
        height: 28rpx;
        font-size: 30rpx;
        line-height: 28rpx;
      }

      .bottoms {
        font-size: 22rpx;
        color: #666666;
        height: 21rpx;
        line-height: 21rpx;
        margin-top: 20rpx;
      }
    }

    .juewei {
      width: 125rpx;
      height: 46rpx;
      line-height: 46rpx;
      text-align: center;
      font-size: 24rpx;
      color: #FFFFFF;
      background-color: #F43131;
      border-top-left-radius: 125rpx;
      border-bottom-left-radius: 125rpx;
      position: absolute;
      bottom: 12rpx;
      right: 0rpx;
      font-weight: 500;
    }
  }

  .moneySum {
    width: 710rpx;
    height: 191rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16rpx 0px rgba(244, 49, 49, 0.32);
    border-radius: 10rpx;
    margin: 0 auto;
    margin-bottom: 34rpx;

    .money {
      height: 104rpx;
      width: 710rpx;
      display: flex;
      padding-top: 30rpx;
      box-sizing: border-box;

      & view:first-child {
        border-right: 1rpx solid #E7E7E7;
      }

      view {
        height: 74rpx;
        width: 355rpx;
        text-align: center;
        color: #333333;

        .moneyTop {
          height: 25rpx;
          line-height: 25rpx;
          font-size: 26rpx;
          margin-bottom: 21rpx;
        }

        .moneyBottom {
          height: 28rpx;
          line-height: 28rpx;
          font-size: 24rpx;
          color: #F43131;

          text {
            font-size: 36rpx;
            font-weight: bold;
          }
        }
      }
    }

    .chakan {
      height: 87rpx;
      line-height: 87rpx;
      text-align: center;
      font-size: 24rpx;
      color: #999999;

      .image {
        width: 12rpx;
        height: 20rpx;
        margin-left: 14rpx;
      }
    }
  }

  .myData {
    border: 1rpx solid #E7E7E7;
    width: 710rpx;
    margin-left: 21rpx;
    margin-right: 19rpx;
    margin-bottom: 20rpx;

    .myDataTop {
      width: 710rpx;
      height: 95rpx;
      background-color: #F4F4F4;
      display: flex;

      .td {
        width: 236rpx;
        height: 95rpx;
        line-height: 95rpx;
        text-align: center;
        font-size: 26rpx;
        color: #333333;
      }

      .shu {
        width: 1rpx;
        height: 95rpx;
        background-color: #E7E7E7;
      }
    }

    .myDataBottom {
      background-color: #FFFFFF;

      .td {
        font-size: 24rpx !important;
        color: #F43131 !important;

        text {
          font-size: 30rpx !important;
        }
      }
    }
  }

  .description {
    border: 1rpx solid #E7E7E7;
    border-bottom: 0rpx;
    width: 710rpx;
    margin-left: 21rpx;
    margin-right: 19rpx;
    margin-bottom: 29rpx;
    font-size: 24rpx;
    color: #333333;

    .t1 {
      height: 80rpx;
      width: 710rpx;
      background-color: #F4F4F4;
      display: flex;

      .names {
        width: 98rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-right: 1px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
      }

      .zishen {
        width: 153rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-right: 1px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
      }

      .rightZ {
        border-right: 0rpx;
      }
    }

    .t2 {
      background-color: #FFFFFF;

      .zishen {
        color: #F43131 !important;
      }
    }
  }

  .noun {
    width: 710rpx;
    margin-left: 21rpx;
    margin-right: 19rpx;
    margin-bottom: 50rpx;

    .viewq {
      font-size: 26rpx;
      color: #666666;
      line-height: 50rpx;
    }
  }

  .xiang {
    width: 710rpx;
    margin: 0 auto;
    margin-bottom: 25rpx;
    border-radius: 20rpx;
    padding: 25rpx 34rpx 33rpx 34rpx;
    background-color: #FFFFFF;
    box-sizing: border-box;

    .xiangTop {
      width: 186rpx;
      height: 56rpx;
      line-height: 56rpx;
      background: rgba(255, 242, 242, 1);
      border-radius: 28rpx;
      margin: 0 auto;
      font-size: 30rpx;
      color: #333333;
      text-align: center;
    }

    .xiangCenter {
      width: 642rpx;
      display: flex;
      margin-top: 24rpx;

      .xiangLeft {
        font-size: 28rpx;
        color: #333333;
        margin-right: 10rpx;
        height: 50rpx;
        line-height: 50rpx;
      }

      .xiangRight {
        .view {
          font-size: 24rpx;
          color: #666666;
          height: 50rpx;
          line-height: 50rpx;
        }
      }
    }

    .xiangBottom {
      display: flex;
      margin-top: 34rpx;
      height: 27rpx;
      line-height: 27rpx;

      .xiangBottomT {
        font-size: 28rpx;
        color: #333333;
        margin-right: 10rpx;
      }

      .xiangBottomB {
        font-size: 24rpx;
        color: #F43131;

        .text {
          font-size: 32rpx;
        }
      }
    }
  }

  .shouyi {
    width: 710rpx;
    margin: 0 auto;
    margin-bottom: 25rpx;
    border-top: 2rpx solid #eee;
    border-left: 2rpx solid #eee;

    .tt {
      width: 710rpx;
      /*height: 95rpx;*/
      display: flex;
      background-color: #E3E2E2;

      .view {
        flex: 1;
        /*width: 177rpx;*/
        /*height: 95rpx;*/
        padding: 10rpx 0;
        line-height: 40rpx;
        word-wrap: break-word;
        text-align: center;
        font-size: 26rpx;
        color: #333333;
        border-right: 2rpx solid #eee;
        border-bottom: 2rpx solid #eee;
      }

      .rightZ {
        /*border-right: 0rpx;*/
      }
    }

    .ts {
      background-color: #FFFFFF;

      .view {
        font-size: 30rpx !important;
        color: #F43131 !important;
        font-weight: bold;
      }
    }
  }

  .guize {
    width: 677rpx;
    margin-left: 21rpx;
    margin-right: 52rpx;
    font-size: 24rpx;
    color: #666666;
    padding-bottom: 100rpx;

    .text {
      color: #F43131;
    }
  }
  
  .fengTitle {
      height: 80rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    
      .fengTitleLeft, .fengTitleRight {
        display: flex;
        height: 80rpx;
        align-items: center;
    
        .da {
          width: 16rpx;
          height: 16rpx;
          border-radius: 50%;
          background-color: #F43131;
        }
    
        .xiao {
          width: 9rpx;
          height: 9rpx;
          border-radius: 50%;
          background-color: #F43131;
        }
      }
    
      .fengTitleLeft {
        .da {
          margin-left: 10rpx;
        }
      }
    
      .fengTitleRight {
        .da {
          margin-right: 10rpx;
        }
      }
    
      .fengTitleCenter {
        height: 80rpx;
        line-height: 80rpx;
        font-size: 30rpx;
        color: #333333;
        font-weight: 500;
        margin-left: 20rpx;
        margin-right: 20rpx;
      }
    
    }
</style>
