<template>
  <div class="wrap">
        <page-title title="申请退款" rightHidden="true"></page-title>
        <div class="pro">
            <img class="pro-img" src="/static/check/pro1.png" alt="">
            <div class="pro-msg">
                <div class="pro-name">2018夏装新款短袖蕾丝拼接荷叶边波点雪纺连衣裙女时尚名媛...</div>
                <div class="attr"><span>白色;S码</span></div>
                <div class="pro-price"><i>￥</i>169.00 <span class="amount">x1</span></div>
            </div>
        </div>
        <div class="item">
            <div class="item-left">退款方式</div>
            <div class="item-right" @click="showMethod">
                <span>仅退款</span>
                <img src="/static/right.png" alt="">
            </div>
        </div>
        <div class="item">
            <div class="item-left">退款原因</div>
            <div class="item-right" @click="showReason">
                <img src="/static/right.png" alt="">
            </div>
        </div>
        <div class="item spe">
            <div class="item-left">退款金额</div>
            <input type="text" placeholder="请输入退款金额">
        </div>
        <div class="item spe">
            <div class="item-left">退款说明</div>
            <input type="text" placeholder="请输入退款说明">
        </div>
        <div class="item noborder">上传凭证</div>
        <div class="imgs">
            <van-uploader v-model="fileList" multiple />
        </div>
        <div style="height: 50px;"></div>
        <div class="bottom" @click="shows">提交</div>
        <!-- 弹出层 -->
      <!--  <van-overlay
            :show="show"
            @click="close"
            z-index="100"
        /> -->
        <!-- 退款方式 -->
        <div class="methods" v-if="ischangemethod">
            <div class="m-title tac">退款方式</div>
            <!-- <van-cell-group v-model="radio">
                <van-cell title="仅退货" clickable @click="radio = 1">
                <van-radio shape="square" slot="right-icon" name="1" />
                </van-cell>
                <van-cell title="退款退货" clickable @click="radio = 2">
                <van-radio shape="square" slot="right-icon" name="2" />
                </van-cell>
            </van-cell-group> -->
            <div class="confirm-method">确定</div>
        </div>
        <!-- 退款原因 -->
        <div class="methods" v-if="ischangereason">
            <div class="m-title tac">退款原因</div>
            <!-- <van-cell-group v-model="radio1">
                <van-cell title="不想要了" clickable @click="radio1 = 1">
                <van-radio shape="square" slot="right-icon" name="1" />
                </van-cell>
                <van-cell title="与实物不符" clickable @click="radio1 = 2">
                <van-radio shape="square" slot="right-icon" name="2" />
                </van-cell>
            </van-cell-group> -->
            <div class="confirm-method">确定</div>
        </div>
		<popup-layer ref="popupRef" :direction="'top'">
				
		</popup-layer>
  </div>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue';
export default {
    components: {
		popupLayer
    },
    data() {
        return {
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://cloud-image', isImage: true }
            ],
            show: false,
            radio: '1',
            radio1: '1',
            ischangemethod: false,
            ischangereason: false
        }
    },
	created() {
		
	},
    methods: {
		shows(){
			this.$refs.popupRef.show();
		},
        // 退款方式
        showMethod(){
            this.show = true;
            this.ischangemethod = true;
        },
        // 退款原因
        showReason(){
            this.show = true;
            this.ischangereason = true;
        },
        // 关闭遮罩
        close(){
            this.show = false;
            this.ischangemethod = false;
            this.ischangereason = false;
        }
    }
}
</script>

<style scoped>
    .wrap {
     /*   height: 100vh; */
        background: #fff;
    }
    .pro {
        display: flex;
        padding: 20px 10px 10px;
        background: #fff;
        border-bottom: 10px solid #F3F3F3;
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
        color: #333;
    }
    .item {
        display: flex;
        height: 50px;
        padding: 0 10px;
        width: 95%;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        border-bottom: 1px solid #E3E3E3;
    }
    .spe {
        justify-content: flex-start;
    }
    .item-left {
        margin-right: 10px;
    }
    .item-right {
        color: #888;
    }
    .noborder {
        border: none;
    }
    .item-right img {
        width: 8px;
        height: 13px;
        margin-left: 10px;
    }
    /* 上传图像 */
    .imgs {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
    }
    .bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        background: #F43131;
    }
    /* 退款 */
    .methods,
    .reason {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 101;
        background: #fff;
        padding-top: 20px;
    }
    .m-title {
        text-align: center;
        margin-bottom: 10px;
    }
    .confirm-method {
        background: #F43131;
        color: #fff;
        text-align: center;
        line-height: 50px;
        width: 100%;
        margin-top: 20px;
    }
</style>