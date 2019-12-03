<template>
    <view class="wrap">
        <image class="bgimg" :src="'/static/client/marketing/rotate-bg.jpg'|domain" />
        <div class="rotate-box">
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(0)}">
                    <image class="pic" :src="(itemList[0].img||img_url)" />
                    <div class="name">{{itemList[0].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(0,1)}"></div>
            </div>
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(1)}">
                    <image class="pic" :src="(itemList[1].img||img_url)" />
                    <div class="name">{{itemList[1].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(1,1)}"></div>
            </div>
            <div class="item"   style="margin-right: 0">
                <div class="goods" :style="{backgroundColor:getStyle(2)}">
                    <image class="pic" :src="(itemList[2].img||img_url)" />
                    <div class="name">{{itemList[2].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(2,1)}"></div>
            </div>
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(7)}">
                    <image class="pic" :src="(itemList[7].img||img_url)" />
                    <div class="name">{{itemList[7].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(7,1)}"></div>
            </div>
            <div class="item" @click="startFn">
                <div class="goods start-btn">
                    立即抽奖
                </div>
                <div class="mask start-btn-mask"></div>
            </div>

            <div class="item"   style="margin-right: 0">
                <div class="goods" :style="{backgroundColor:getStyle(3)}">
                    <image class="pic" :src="(itemList[3].img||img_url)" />
                    <div class="name">{{itemList[3].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(3,1)}"></div>
            </div>
            <div class="item" >
                <div class="goods" :style="{backgroundColor:getStyle(6)}">
                    <image class="pic" :src="(itemList[6].img||img_url)" />
                    <div class="name">{{itemList[6].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(6,1)}"></div>
            </div>
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(5)}">
                    <image class="pic" :src="(itemList[5].img||img_url)" />
                    <div class="name">{{itemList[5].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(5,1)}"></div>
            </div>
            <div class="item"   style="margin-right: 0">
                <div class="goods" :style="{backgroundColor:getStyle(4)}">
                    <image class="pic" :src="(itemList[4].img||img_url)" />
                    <div class="name">{{itemList[4].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(4,1)}"></div>
            </div>




        </div>

        <wzw-dialog ref="result" bgColor="rgba(0,0,0,.7)" mainBgColor="none">
            <div class="result-container">
                <div class="top">
                    <image class="result-bg" :src="'/static/client/marketing/result.png'|domain" />
                    <div class="text">
                        <div class="text-row line6">恭喜您抽中</div>
                        <div class="text-row">{{result_tip}}</div>
                    </div>
                </div>

                <div class="btn-box" @click="cancelDialog">
                    <image class="close" :src="'/static/client/marketing/close-btn.png'|domain" />
                </div>
            </div>
        </wzw-dialog>
    </view>
</template>

<script>
    import {Rotate} from "../../common/luck";
    const rotateInstance = new Rotate()
    const img_data = 'data:image/jpeg;base64,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';
    export default {
        name:'Rotate',
        components:{},
        data() {
            return {
                rotateObj:null,
                itemList:[],
                img_url:img_data,
                result_tip:''
            }
        },
        computed:{
            activeIdx(){
                return rotateInstance.getIdx()
            }
        },
        methods:{
            cancelDialog(){
                this.$refs.result.close()
            },
            startFn(){
				if(rotateInstance.is_start)return //已经启动过程中无法再触发
                rotateInstance.start(6,4)
            },
            showResult(idx,name){
                // uni.showModal({
                //     title:"中奖提示",
                //     content:'恭喜中奖，中奖id:'+idx+'中奖内容为'+name
                // })

                this.result_tip = `${name}`

                this.$refs.result.show()
            },
            getStyle(idx,is_mask){
                if((idx!=this.activeIdx || !rotateInstance.isStart()) && !is_mask)return '#FFEBEB'
                if((idx!=this.activeIdx || !rotateInstance.isStart()) && is_mask)return '#FFC2C8'
                let bgColor = rotateInstance.getBgColor(idx)
                return bgColor // `background-color:${bgColor}`
            }
        },
        mounted(){
            // this.result_tip = '抽中大疆无人机一个'
            //
            // let _self = this
            // this.$nextTick().then(()=>{
            //     _self.$refs.result.show()
            // })
        },
        created(){
            this.rotateObj = rotateInstance
            rotateInstance.setCallFn(this.showResult)
            this.itemList = rotateInstance.getItemList()
            //rotateInstance.start()


        }

    }
</script>

<style lang="scss" scoped>
.result-container{

    .top{
        position: relative;
        text-align: center;
        width: 750rpx;
        padding-top: 580rpx;
        .result-bg{
            position: absolute;
            width: 750rpx;
            height: 580rpx;
            left: 0;
            top: 0;
            z-index: 1;
        }
        .text{
            position: absolute;
            z-index: 3;
            width: 750rpx;
            text-align: center;
            top: 240rpx;
            left: 0;
            .text-row{
                color: #FF0000;
                /*width: 228rpx;*/
                /*margin: 0 auto;*/
                text-align: center;
                line-height: 1.4;

            }
        }

    }
    .btn-box{
        text-align: center;
        margin-top: 60rpx;
        .close{
            width: 70rpx;
            height: 70rpx;
            margin: 0 auto;
        }
    }

}
.wrap{
    background: #ef1828;
    min-height: 100vh;
    box-sizing: border-box;
}
.bgimg{
    width: 750rpx;
    height: 1434rpx;
}
.rotate-box{
    width: 460rpx;
    height: 460rpx;
    /*background: white;*/
    position: absolute;
    left: 50%;
    top: 565rpx;
    transform: translate(-50%);
    /*padding: 20rpx;*/
    z-index: 32;
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    overflow: hidden;
    padding: 10rpx;
    box-sizing: border-box;
    .item{
        width: 140rpx;
        height: 140rpx;
        text-align: center;
        box-sizing: border-box;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
        position: relative;

        .start-btn{
            height: 130rpx;
            line-height: 130rpx;
            padding: 0 !important;
            font-size: 14px;
            background: #FFD800 !important;
            color: white;
        }
        .start-btn-mask{
            background: #FFB001 !important;
        }
        .goods{
            z-index: 3;
            position: absolute;
            width: 140rpx;
            height: 130rpx;
            padding: 10rpx 0;
            box-sizing: border-box;
            background: #FFEBEB;
            border-radius: 10rpx;
        }
        .mask{
            z-index: 2;
            width: 140rpx;
            position: absolute;
            top: 10rpx;
            height: 130rpx;
            padding: 10rpx 0;
            box-sizing: border-box;
            background: #FFC2C8;
            border-radius: 10rpx;
        }
        .pic{
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
            vertical-align: top;
        }
        .name{
            margin: 10rpx auto 0;
            height: 40rpx;
            width: 140rpx;
            color: #2F2F2F;
            text-align: center;
            line-height: 40rpx;
            font-size: 20rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
