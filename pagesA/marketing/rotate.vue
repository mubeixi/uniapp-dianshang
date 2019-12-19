<template>
    <view class="wrap">
        <image class="bgimg" :src="'/static/client/marketing/rotate-bg.jpg'|domain" />
        <div class="rotate-box">
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(0)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[0].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==0}">{{itemList[0].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(0,1)}"></div>
            </div>
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(1)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[1].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==1}">{{itemList[1].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(1,1)}"></div>
            </div>
            <div class="item"   style="margin-right: 0">
                <div class="goods" :style="{backgroundColor:getStyle(2)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[2].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==2}">{{itemList[2].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(2,1)}"></div>
            </div>
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(7)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[7].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==7}">{{itemList[7].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(7,1)}"></div>
            </div>
            <div class="item" @click="startFn">
                <div class="goods start-btn">
                    {{getStartTip}}

                </div>
                <div class="mask start-btn-mask"></div>
            </div>

            <div class="item"   style="margin-right: 0">
                <div class="goods" :style="{backgroundColor:getStyle(3)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[3].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==3}">{{itemList[3].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(3,1)}"></div>
            </div>
            <div class="item" >
                <div class="goods" :style="{backgroundColor:getStyle(6)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[6].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==6}">{{itemList[6].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(6,1)}"></div>
            </div>
            <div class="item"  >
                <div class="goods" :style="{backgroundColor:getStyle(5)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[5].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==5}">{{itemList[5].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(5,1)}"></div>
            </div>
            <div class="item"   style="margin-right: 0">
                <div class="goods" :style="{backgroundColor:getStyle(4)}">
                    <div class="picbox">
                        <image mode="widthFix" class="pic" :src="itemList[4].img|domain" />
                    </div>
                    <div class="name" :class="{active:activeIdx==4}">{{itemList[4].name}}</div>
                </div>
                <div class="mask" :style="{backgroundColor:getStyle(4,1)}"></div>
            </div>


        </div>

        <div class="num-count">
            <image class="num-count-img" src="/static/marketing/num_count.png" />
            <div class=" text font14">今日剩余抽奖次数<span class="font16 danger-color" style="">{{day_count}}</span>次,总剩余抽奖次数<span class="font16 danger-color" style="">{{total_count}}</span>次</div>
        </div>

        <div class="reward-list" @click="showRewardList">
            我的中奖记录
        </div>

        <div class="tip-box">
            <div class="title">抽奖规则</div>
            <div style="color: white">
                <text style="font-size: 14px;line-height: 1.6;">
                    {{tipText}}
                </text>
<!--                <u-parse :content="tipText|formatRichTextByUparse" ></u-parse>-->
            </div>
        </div>

        <wzw-dialog positions="top" ref="record" bgColor="rgba(0,0,0,.7)" mainBgColor="none">
            <div class="record-container" >
                <div class="top">
                    <image class="record-bg" :src="'/static/marketing/records_bg.png'" />
                    <div class="record-box">
                        <div class="title">我的中奖记录</div>
                        <div class="table">
                            <div class="tr">
                                <div class="th time">时间</div>
                                <div class="th prize">奖品</div>
                            </div>
                            <div class="tr" v-for="(item,idx) in record_list">
                                <div class="td time">{{item.time}}</div>
                                <div class="td prize">{{item.prize}}</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="btn-box" @click="cancelRecordDialog">
                    <image class="close" :src="'/static/client/marketing/close-btn.png'|domain" />
                </div>
            </div>
        </wzw-dialog>

        <wzw-dialog ref="result" bgColor="rgba(0,0,0,.7)" mainBgColor="none">
            <div class="result-container" @click="cancelDialog">
                <div class="top">
                    <image class="result-bg" :src="'/static/client/marketing/result.png'|domain" />
                    <div class="text">
                        <div class="text-row line6">恭喜您</div>
                        <div class="text-row reward">{{result_tip}}</div>
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
    import {rotateBegin,rotateInit,getRotateRecord} from "../../common/fetch";
    import {Rotate} from "../../common/luck";
    const rotateInstance = new Rotate()
    import {pageMixin} from "../../common/mixin";
    import _ from 'underscore';

    import {findArrayIdx} from "../../common/tool";
    import uParse from '../../components/gaoyia-parse/parse.vue'
    import {staticUrl} from "../../common/env";
    import {error,toast} from "../../common";

    export default {
        name:'Rotate',
        mixins:[pageMixin],
        components: {
            uParse
        },
        data() {
            return {
                start_num:0,
                total_count:0,
                day_count:0,
                activity_id:null,
                rotateObj:null,
                itemList:[],
                tipText:'<img src="https://img30.360buyimg.com/sku/jfs/t1/52867/24/15366/254665/5dc22d25E95f8d33b/965dcdf6430cd8c1.jpg" />',
                img_url:'',
                result_tip:'',
                record_list:[]
            }
        },

        methods:{

            async showRewardList(){
                this.$refs.record.show()
                getRotateRecord({id:this.activity_id,pageSize:999},{tip:'获取中'}).then(res=>{
                    this.record_list = res.data
                })
            },
            init_func(){
                rotateInit({id:this.activity_id},{tip:'加载配置'}).then(res=>{
                    if(res.data.prizes && _.isArray(res.data.prizes)){
                        this.total_count = res.data.total_count
                        this.day_count = res.data.day_count
                        this.tipText = res.data.describe
                        rotateInstance.setList(res.data.prizes)
                        this.itemList = rotateInstance.getItemList()
                    }else{
                        error('初始化失败')
                    }

                })
            },
            cancelRecordDialog(){
              this.$refs.record.close()
            },
            cancelDialog(){
                this.$refs.result.close()
            },
            async startFn(){



				if(rotateInstance.is_start)return //已经启动过程中无法再触发

                if(this.day_count<1){
                    toast('今日次数已用完，明天再来吧')
                    return;
                }

                if(this.total_count<1){
                    toast('您的抽奖总次数用完啦')
                    return;
                }
                this.total_count--
                this.day_count--

                //记录点了几次开奖，这个暂时用不到
                this.start_num++;

                rotateInstance.start(999,10)
                await rotateBegin({id:this.activit_id}).then(res=>{



                    // desc: "很遗憾，未中奖"
                    // id: 2
                    // prize: 0
                    let {desc,id,prize} = res.data
                    //获取中奖的下标
                    let idx = findArrayIdx(this.itemList,{id:id})
                    console.log(`中奖下标${idx}`)
                    // //修改限制圈数
                    // console.log(rotateInstance.rotate_count,rotateInstance.rotate_count+2)
                    rotateInstance.setRotateNum(rotateInstance.rotate_count+5)
                    //设置跳转的方块
                    rotateInstance.setLuckNum(idx+1)
                    //这是提示
                    rotateInstance.setReward(res.data)

                    rotateInstance.setCallFn(this.showResult)




                }).catch(e=>{

                })



            },
            showResult(idx,name){
                // uni.showModal({
                //     title:"中奖提示",
                //     content:'恭喜中奖，中奖id:'+idx+'中奖内容为'+name
                // })

                if(rotateInstance.reward.prize){
                    this.result_tip = rotateInstance.reward.desc;//`${name}`
                    this.$refs.result.show()
                }else{

                    error(rotateInstance.reward.desc||'没有中奖哦，再试一次吧')
                }

            },
            getStyle(idx,is_mask){
                if((idx!=this.activeIdx) && !is_mask)return '#FFEBEB'
                if((idx!=this.activeIdx) && is_mask)return '#FFC2C8'
                // if((idx!=this.activeIdx || !rotateInstance.isStart()) && !is_mask)return '#FFEBEB'
                // if((idx!=this.activeIdx || !rotateInstance.isStart()) && is_mask)return '#FFC2C8'
                let bgColor = '#FFD800';//rotateInstance.getBgColor(idx)
                return bgColor // `background-color:${bgColor}`
            },

            getTextStyle(idx){
                if(idx==this.activeIdx)return '#fff'
            }
        },
        computed:{
            getStartTip(){

                // if(this.start_num>0 && this.total_count>0){
                //     return '再来一次'
                // }
                return '立即抽奖'
            },
            activeIdx(){
                return rotateInstance.getIdx()
            }
        },
        filters: {
            formatRichTextByUparse(html) {
                console.log(html)
                if (!html) return;
                let newContent = html.replace(/<embed[^>]*>/gi, function (match, capture) {
                    match = match.replace(/embed/gi, 'video')
                    match = match.replace(/width="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
                    match = match.replace(/height="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
                    match = match.replace(/type="[^"]+"/gi, '')//.replace(/width='[^']+'/gi, '');
                    //相对地址
                    match = match.replace(/src="\/uploadfiles/gi, `src="${staticUrl}/uploadfiles`)

                    return match;
                });
                return newContent
            },
        },
        onLoad(options){
            let {activity_id=0} = options
            this.activity_id = activity_id
        },
        mounted(){
            // this.$nextTick().then(res=>{
            //     this.showRewardList()
            // })
        },

        onShow(){

            this.init_func()
        },
        created(){

            this.$fun.checkIsLogin(1)
            this.rotateObj = rotateInstance
            //rotateInstance.setCallFn(this.showResult)
            //this.itemList = rotateInstance.getItemList()
            //rotateInstance.start()
        }

    }
</script>

<style lang="scss" scoped>
.record-container{

    .top{
        position: relative;
        text-align: center;
        width: 656rpx;
        height: 902rpx;
        margin: 0 auto;
        .record-bg{
            position: absolute;
            width: 656rpx;
            height: 902rpx;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .record-box{
            position: relative;
            z-index: 4;
            padding: 130rpx 30rpx;
        }
        .title{
            margin: 30rpx 0;
            color: #e84428;
            position: relative;
            z-index: 4;
        }
        .table{
            font-size: 14px;
            height: 540rpx;
            overflow-y: scroll;
            overflow-x: hidden;

            .tr{
                height: 60rpx;
                line-height: 60rpx;
                display: flex;
                .td{
                    text-align: center;
                }
                .th{
                    text-align: center;
                    background: #fff1ee;
                    color: #333333;
                }
                .time{
                    width: 200rpx;
                    color: #666;
                }
                .prize{
                    color: #666;
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

    }
    .btn-box{
        text-align: center;
        margin-top: 30rpx;
        .close{
            width: 70rpx;
            height: 70rpx;
            margin: 0 auto;
        }
    }

}


.reward-list{
    right: 70rpx;
    text-align: right;
    position: absolute;
    top: 1273rpx;
    width: 750rpx;
    font-size: 14px;
    text-decoration: underline;
    color: white;
}
.tip-box{
    width: 650rpx;
    position: absolute;
    top: 1330rpx;
    left: 50rpx;
    overflow: hidden;
    padding-bottom: 30px;
    .title{
        color: #FFD800;
        margin-bottom: 10px;
    }
}
.num-count{
    width: 660rpx;
    height: 90rpx;
    position: absolute;
    top: 1163rpx;
    left: 45rpx;
    .text{
        position: absolute;
        width: 660rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        z-index: 3;
        color: #925507;
    }
    .num-count-img{
        position: absolute;
        left: 0;
        top: 0;
        width: 660rpx;
        height: 90rpx;

    }
}
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

                &.reward{
                    width: 260rpx;
                    margin: 0 auto;
                    height: 80rpx;
                    overflow: hidden;
                    word-wrap: break-word;
                }


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
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    width: 750rpx;
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
            color: #AB6102;
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
        .picbox{
            width: 70rpx;
            height: 70rpx;
            margin: 0 auto;
            overflow: hidden;
            position: relative;
        }
        .pic{
            position: absolute;
            width: 70rpx;
            max-height: 70rpx;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        .name{
            margin: 10rpx auto 0;
            height: 40rpx;
            width: 140rpx;
            color: #2f2f2f;
            text-align: center;
            line-height: 40rpx;
            font-size: 20rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.active{
                color: #AB6102;
            }
        }
    }
}
</style>
