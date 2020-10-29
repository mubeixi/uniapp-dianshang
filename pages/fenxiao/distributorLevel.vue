<template>
  <view @click="commonClick" class="all">
    <view class="top">
      <swiper :autoplay="false" :current="inds" :duration="1000" :indicator-dots="false" @change="change"
              class="center">
        <swiper-item :key="index" :style="dis_level.length==1?'margin-left:43rpx;':''" class="vipFir"
                     v-for="(item,index) of dis_level">
          <block v-if="item.Level_BackImg">
            <image :src='item.Level_BackImg' class="allImg"></image>
          </block>
          <block v-else>
            <image class="allImg" src='/static/vipBgColor.png'></image>
          </block>

          <view class="vipGrade" v-if="item.Level_ID==pro.user_info.Level_ID&&userInfo.Is_Distribute==1">
            {{$t('480x0')}}
          </view>
          <view class="mmp" v-if="dis_level.length>0">
            <image :src="item.Level_Icon" class="myImgs"></image>
            {{item.Level_Name}}
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view style="height: 220rpx;"></view>
    <circleTitle :title="$t('480x1')"></circleTitle>
    <view class="level-description">
      {{Level_Description}}
    </view>
    <view style="height: 20rpx;background-color: #F8F8F8;"></view>
    <circleTitle :title="$t('480x2')"></circleTitle>
    <view class="titleMy" v-if="dis_level.length>0">
      <image src="/static/procurement/error.png" style="height: 25rpx;width: 25rpx;margin-right: 12rpx;"></image>
	  <block v-if="$p('zh-cn')"> 注意：以下条件需{{dis_level[inds].arrive_limit_desc}}才能达到条件</block>
	  <block v-if="$p('en-us')"> Note: The following conditions require {{dis_level[inds].arrive_limit_desc}} to meet the conditions</block>
    </view>
    <view class="ruhe">
      <block v-if="dis_level[inds].level_rules_edit.pay_money">
        <view class="td" v-if="dis_level[inds].level_rules_edit.pay_money.checked=='1'">
          <image class="image" src="/static/fenxiao/storeSum.png"></image>
          <view class="mbx">
            <view class="tops">
              <block v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='1'">
                {{$t('480x3')}}
				<block v-if="$p('zh-cn')">{{dis_level[inds].level_rules_edit.pay_money.value.money}}{{$t('480x4')}}</block>
				<block v-if="$p('en-us')">{{$t('480x4')}}{{dis_level[inds].level_rules_edit.pay_money.value.money}}</block>
				
              </block>
              <block v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='2'">
                 {{$t('480x5')}}
				 <block v-if="$p('zh-cn')">{{dis_level[inds].level_rules_edit.pay_money.value.money}}{{$t('480x6')}}</block>
				 <block v-if="$p('en-us')">{{$t('480x6')}}{{dis_level[inds].level_rules_edit.pay_money.value.money}}</block>
				 
              </block>
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='1'">
               {{$t('480x7')}}
			   <block v-if="$p('zh-cn')">{{dis_level[inds].level_rules_edit.pay_money.user_data}}{{$t('480x8')}}</block>
			   <block v-if="$p('en-us')">{{$t('480x8')}}{{dis_level[inds].level_rules_edit.pay_money.user_data}}</block>
			   
            </view>
          </view>
          <view class="submit submitMbx"
                v-if="dis_level[inds].level_rules_edit.pay_money.user_data>=dis_level[inds].level_rules_edit.pay_money.value.money">
            {{$t('480x9')}}
          </view>
          <view @click="goIndex" class="submit" v-else>
            {{$t('480x10')}}
          </view>

        </view>
      </block>
      <block v-if="dis_level[inds].level_rules_edit.buy_prod">
        <view class="td" style="display: block;height: auto;"
              v-if="dis_level[inds].level_rules_edit.buy_prod.checked=='1'">
          <view class="td" style="border-bottom: 0px;">
            <image class="image" src="/static/fenxiao/buyPro.png"></image>
            <view class="mbx">
              <view class="tops">
                <block v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='1'">{{$t('480x11')}}</block>
                <block v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='2'">{{$t('480x12')}}</block>
              </view>
              <view class="bottoms" v-if="dis_level[inds].level_rules_edit.buy_prod.user_data>0">
                {{$t('480x13')}}
              </view>
              <view class="bottoms" v-else-if="dis_level[inds].level_rules_edit.buy_prod.value.arrive_status=='2'">
                {{$t('480x14')}}
              </view>
              <view class="bottoms" v-else>
                {{$t('480x15')}}
              </view>

            </view>
            <view class="submit submitMbx" v-if="dis_level[inds].level_rules_edit.buy_prod.user_data>0">
              {{$t('480x16')}}
            </view>
            <view @click="goIndex" class="submit"
                  v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='1'&&dis_level[inds].level_rules_edit.buy_prod.user_data<=0">
              {{$t('480x17')}}
            </view>
          </view>

          <view class="productList" v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='2'">
            <block :key="index" v-for="(item,index) in dis_level[inds].level_rules_edit.buy_prod.data">
              <view @click="goDetail(item.Products_ID)" class="myProduct">
                <image :src="item.ImgPath" class="imgPro"></image>
                <view class="proText">
                  {{item.Products_Name}}
                </view>
                <view class="buttonLast">
                  <view class="priceAll">
                    <text class="priceText">¥</text>
                    {{item.Products_PriceX}}
                  </view>
                  <view class="proDetail">
                    {{$t('480x18')}}
                  </view>
                </view>
              </view>
            </block>
          </view>
        </view>
      </block>

      <block v-if="dis_level[inds].level_rules_edit.buy_times">
        <!-- 商品购买几次 -->
        <view class="td" v-if="dis_level[inds].level_rules_edit.buy_times.checked=='1'">
          <image class="image" src="/static/fenxiao/proCount.png"></image>
          <view class="mbx">
            <view class="tops">
              {{$t('480x19')}}{{dis_level[inds].level_rules_edit.buy_times.value}}次
            </view>
            <view class="bottoms">
              {{$t('480x20')}}{{dis_level[inds].level_rules_edit.buy_times.user_data}}次
            </view>
          </view>
          <view class="submit submitMbx"
                v-if="dis_level[inds].level_rules_edit.buy_times.user_data>=dis_level[inds].level_rules_edit.buy_times.value">
            {{$t('480x21')}}
          </view>
          <view @click="goIndex" class="submit" v-else>
            {{$t('480x22')}}
          </view>

        </view>
      </block>

      <block v-if="dis_level[inds].level_rules_edit.team_sales">
        <!-- 团队业绩 -->
        <view class="td" v-if="dis_level[inds].level_rules_edit.team_sales.checked=='1'">
          <image class="image" src="/static/fenxiao/teanSum.png"></image>
          <view class="mbx">
            <view class="tops">
              {{$t('480x23')}}
			  <block v-if="$p('zh-cn')">{{dis_level[inds].level_rules_edit.team_sales.value}}{{$t('480x24')}}</block>
			  <block v-if="$p('en-us')">{{$t('480x24')}}{{dis_level[inds].level_rules_edit.team_sales.value}}</block>
			  
            </view>
            <view class="bottoms">
              {{$t('480x25')}}
			  <block v-if="$p('zh-cn')">{{dis_level[inds].level_rules_edit.team_sales.user_data}}{{$t('480x26')}}</block>
			  <block v-if="$p('en-us')">{{$t('480x26')}}{{dis_level[inds].level_rules_edit.team_sales.user_data}}</block>
			  
            </view>
          </view>
          <view class="submit submitMbx"
                v-if="dis_level[inds].level_rules_edit.team_sales.user_data>=dis_level[inds].level_rules_edit.team_sales.value">
            {{$t('480x27')}}
          </view>
          <view @click="goFenxiao()" class="submit" v-else>
            {{$t('480x28')}}
          </view>

        </view>
      </block>

      <block v-if="dis_level[inds].level_rules_edit.direct_buy">
        <!-- 直接购买 -->
        <view class="td" v-if="dis_level[inds].level_rules_edit.direct_buy.checked=='1'">
          <image class="image" src="/static/fenxiao/disBuy.png"></image>
          <view class="mbx">
            <view class="tops">
              {{$t('480x29')}}
			  <block v-if="$p('zh-cn')">{{dis_level[inds].level_rules_edit.direct_buy.value.money}}{{$t('480x30')}}</block>
			  <block v-if="$p('en-us')">{{$t('480x30')}}{{dis_level[inds].level_rules_edit.direct_buy.value.money}}</block>
			  
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.direct_buy.value.type=='1'">
				{{$t('480x31')}}
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.direct_buy.value.type=='2'">
              {{$t('480x32')}}({{dis_level[inds].level_rules_edit.direct_buy.data.gift_name}})
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.direct_buy.value.type=='3'">
              {{$t('480x33')}}
			  <block v-if="$p('zh-cn')">({{dis_level[inds].level_rules_edit.direct_buy.value.present}}{{$t('480x34')}})</block>
			  <block v-if="$p('en-us')">({{$t('480x34')}}{{dis_level[inds].level_rules_edit.direct_buy.value.present}})</block>
			  
            </view>
          </view>
          <view class="submit submitMbx" v-if="dis_level[inds].buy_order.Order_Status==4">
            {{$t('480x35')}}
          </view>
          <view @click="buyDis(dis_level[inds].Level_ID)" class="submit" v-else>
            {{$t('480x36')}}
          </view>
        </view>
      </block>
      <block v-if="dis_level[inds]">
        <!-- 去申请 -->
        <view class="td" v-if="dis_level[inds].arrive_limit=='2'">
          <image class="image" src="/static/fenxiao/editS.png"></image>
          <view class="mbx">
            <view class="tops">
              {{$t('480x37')}}
            </view>
            <view class="bottoms">
              {{$t('480x38')}}
            </view>
          </view>
          <block v-if="dis_level[inds].apply_order">
            <block v-if="dis_level[inds].apply_order.status">
              <view class="submit submitMbx" v-if="dis_level[inds].apply_order.status==2">
                {{$t('480x39')}}
              </view>
              <view class="submit submitMbx" v-else-if="dis_level[inds].apply_order.status==1">
                {{$t('480x40')}}
              </view>
              <view @click="edit(dis_level[inds].Level_ID)" class="submit" v-else>
                {{$t('480x41')}}({{dis_level[inds].apply_order.reason}})
              </view>
            </block>
          </block>
          <block v-else>
            <view @click="edit(dis_level[inds].Level_ID)" class="submit">
              {{$t('480x42')}}
            </view>
          </block>
        </view>
      </block>

      <block v-if="dis_level[inds].level_rules_edit.direct_sons">
        <!-- 直邀请 -->
        <view class="td" style="display: block;height: auto;"
              v-if="dis_level[inds].level_rules_edit.direct_sons.checked=='1'">
          <view :key="ind" class="td"
                style="border-bottom: 0px;" v-for="(it,ind) of dis_level[inds].level_rules_edit.direct_sons.value">
            <image class="image" src="/static/fenxiao/zhiyao.png"></image>
            <view class="mbx">
				
              <view class="tops">
				  <block v-if="$p('zh-cn')">
					   直邀{{it.count}}人{{it.level_name}}
				  </block>
				  <block v-if="$p('en-us')">
					  Directly invite {{it.count}} people {{it.level_name}}
				  </block>
               
              </view>
              <view class="bottoms">
				  <block v-if="$p('zh-cn')">
					  已邀{{dis_level[inds].level_rules_edit.direct_sons.user_data[it.level_id]||0}}人
				  </block>
				  <block v-if="$p('zh-cn')">
					  {{dis_level[inds].level_rules_edit.direct_sons.user_data[it.level_id]||0}} people invited
				  </block>
              </view>
            </view>
            <block v-if="ind==0">
              <view class="submit submitMbx"
                    v-if="dis_level[inds].level_rules_edit.direct_sons.user_data.is_completed==1">
                {{$t('480x43')}}
              </view>
              <view @click="goFenxiao" class="submit">
                {{$t('480x44')}}
              </view>
            </block>
          </view>
        </view>

      </block>

      <block v-if="dis_level[inds].level_rules_edit.team_sons">
        <!-- 团队 -->
        <view class="td" style="display: block;height: auto;"
              v-if="dis_level[inds].level_rules_edit.team_sons.checked=='1'">
          <view :key="ind" class="td"
                style="border-bottom: 0px;" v-for="(it,ind) of dis_level[inds].level_rules_edit.team_sons.value">
            <image class="image" src="/static/fenxiao/teamLast.png"></image>
            <view class="mbx">
              <view class="tops">
				<block v-if="$p('zh-cn')">
					团队{{it.level_name}}达{{it.count}}人
				</block>
				<block v-if="$p('en-us')">
					Team {{it.level_name}} up to {{it.count}} people
				</block>
              </view>
              <view class="bottoms">
				  <block v-if="$p('zh-cn')">
				  	已邀{{dis_level[inds].level_rules_edit.team_sons.user_data[it.level_id]||0}}人
				  </block>
				  <block v-if="$p('en-us')">
				  	{{dis_level[inds].level_rules_edit.team_sons.user_data[it.level_id]||0}} people invited
				  </block>
              </view>
            </view>
            <block v-if="ind==0">
              <view class="submit submitMbx"
                    v-if="dis_level[inds].level_rules_edit.team_sons.user_data.is_completed==1">
                {{$t('480x45')}}
              </view>
              <view @click="goFenxiao" class="submit">
                {{$t('480x46')}}
              </view>
            </block>
          </view>
        </view>
      </block>

    </view>

  </view>
</template>

<script>
import circleTitle from '../../components/circleTitle/circleTitle.vue'
import { pageMixin } from '../../common/mixin'
import { disApplyInit } from '../../common/fetch.js'
import { mapActions, mapGetters } from 'vuex'

import T from '@/common/langue/i18n'
export default {
  mixins: [pageMixin],
  data () {
    return {
      index: 0, // 第几个会员等级
      pro: {},
      Level_Description: '',
      inds: 0,
      dis_level: []
    }
  },
  components: {
    circleTitle
  },
  onLoad () {

  },
  onShow () {
    this.disApplyInit()
  },
  computed: {
    ...mapGetters(['userInfo', 'commi_rename'])
  },
  methods: {
    goFenxiao () {
      uni.switchTab({
        url: '/pages/fenxiao/fenxiao'
      })
    },
    // 申请成为分销商
    edit (id) {
      uni.navigateTo({
        url: '/pagesA/fenxiao/distributorCenter?id=' + id + '&&type=edit'
      })
    },
    // 去购买分销商
    buyDis (id) {
      uni.navigateTo({
        url: '/pagesA/fenxiao/distributorCenter?id=' + id
      })
    },
    goIndex () {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    goDetail (id) {
      uni.navigateTo({
        url: '/pages/detail/detail?Products_ID=' + id
      })
    },
    change (e) {
      this.inds = e.detail.current
      this.Level_Description = this.dis_level[this.inds].Level_Description
    },
    disApplyInit () {
      disApplyInit({}, {
        tip: T._('480d0'),
        mask: true
      }).then(res => {
        this.pro = res.data
        this.dis_level = res.data.dis_level
        if (this.pro.user_info.Level_ID == '0') {
          this.Level_Description = this.pro.dis_level[0].Level_Description
        } else {
          for (const item of this.pro.dis_level) {
            if (item.Level_ID == this.pro.user_info.Level_ID) {
              this.Level_Description = item.Level_Description
            }
          }
        }
      }).catch(e => {
      })
    },
    ...mapActions(['getInitData'])
  },
  async created () {
    const initData = await this.getInitData()
    uni.setNavigationBarTitle({
      title: initData.commi_rename.commi + T._('480d1')
    })
  }
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #FFFFFF;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .top {
    width: 750rpx;
    height: 200rpx;
    background: rgba(64, 61, 61, 1);
    position: relative;

    .goBack {
      width: 20rpx;
      height: 30rpx;
      position: absolute;
      top: 29rpx;
      left: 20rpx;
    }

    .titles {
      color: #FFFFFF;
      font-size: 32rpx;
      position: absolute;
      top: 28rpx;
      left: 310rpx;
      height: 31rpx;
      line-height: 31rpx;
    }

    .center {
      position: absolute;
      top: 60rpx;
      left: 3rpx;
      width: 750rpx;
      height: 325rpx;
      white-space: nowrap;

      .vipFir {
        width: 665rpx !important;
        height: 325rpx !important;
        display: inline-block;
        position: relative;

        .allImg {
          width: 100%;
          height: 100%;
        }

        .vipGrade {
          height: 24rpx;
          font-size: 11px;
          color: #4D4D58;
          font-weight: normal;
          color: rgba(77, 77, 88, 1);
          line-height: 24rpx;
          position: absolute;
          top: 28rpx;
          left: 36rpx;
        }

      }
    }

  }

  .mmp {
    position: absolute;
    top: 128rpx; //84rpx;
    left: 205rpx;
    width: 230rpx;
    height: 36rpx;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .level-description {
    font-size: 24rpx;
    color: #666666;
    margin-top: 20rpx;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0rpx 34rpx 36rpx 20rpx;
  }

  .ruhe {
    width: 710rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.25);
    border-radius: 10rpx;
    margin: 0 auto;
    margin-top: 10rpx;
    margin-bottom: 60rpx;

    .td {
      width: 690rpx;
      margin: 0 auto;
      height: 124rpx;
      border-bottom: 1rpx solid #ECE8E8;
      display: flex;
      align-items: center;

      &:last-child {
        border-bottom: 0rpx;
      }

      .image {
        width: 65rpx;
        height: 65rpx;
        margin-left: 21rpx;
      }

      .mbx {
        height: 65rpx;
        margin-left: 24rpx;

        .tops {
          height: 27rpx;
          line-height: 27rpx;
          color: #333333;
          font-weight: bold;
          font-size: 28rpx;
        }

        .bottoms {
          margin-top: 15rpx;
          height: 23rpx;
          line-height: 23rpx;
          font-size: 24rpx;
          color: #999999;
        }
      }

      .submit {
        // width: 110rpx;
        height: 45rpx;
        line-height: 45rpx;
        background: rgba(244, 49, 49, 1);
        border-radius: 8rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        text-align: center;
        margin-left: auto;
        margin-right: 20rpx;
      }

      .submitMbx {
        background-color: #dedede !important;
      }
    }
  }

  .productList {
    width: 710rpx;
    box-sizing: border-box;
    padding-left: 25rpx;
    padding-right: 25rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .myProduct {
      width: 310rpx;

      .imgPro {
        width: 310rpx;
        height: 310rpx;
        margin-bottom: 16rpx;
      }

      .proText {
        width: 300rpx;
        height: 52rpx;
        line-height: 26rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 12px;
        color: #333333;
        margin-bottom: 12rpx;
      }

      .buttonLast {
        width: 310rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45rpx;
        margin-bottom: 22rpx;

        .priceAll {
          color: #F43131;
          font-size: 30rpx;

          .priceText {
            font-size: 24rpx;
            margin-right: 8rpx;
          }
        }

        .proDetail {
          width: 105rpx;
          height: 45rpx;
          line-height: 45rpx;
          text-align: center;
          background: rgba(244, 49, 49, 1);
          border-radius: 8rpx;
          font-size: 24rpx;
          color: #FFFFFF;
        }
      }
    }
  }

  .myImgs {
    width: 36rpx;
    height: 36rpx;
    margin-right: 12rpx;
  }

  .titleMy {
    padding-left: 20rpx;
    padding-right: 35rpx;
    margin-bottom: 30rpx;
    font-size: 11px;
    color: #999999;
    height: 30rpx;
    display: flex;
    align-items: center;
  }
</style>
