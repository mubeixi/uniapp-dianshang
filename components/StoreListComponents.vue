<template>
    <div class="bgwhite wrap">
        <view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer">

        </view>
        <view ref="popRef" v-show="ifshow" class="popup-content" @tap.stop="stopEvent" :style="_location">
            <div class="text-center component-title">
                选择门店
            </div>
            <div class="label-title">
                <div class="line"></div>
                筛选条件

            </div>
            <div class="row">
                <div class="row-label graytext">地区:</div>
                <div class="row-content">
                    <div class="filter">
                        <div class="filter-item">
                            <picker @change="bindProvinceChange" range-key="name"  :range="province_list">
                                <view class="uni-input">{{province.name||'选择省份'}}</view>
                            </picker>
                        </div>
                        <div class="filter-item">
                            <picker @change="bindCityChange" range-key="name"  :range="city_list">
                                <view class="uni-input">{{city.name||'选择城市'}}</view>
                            </picker>
                        </div>
                        <div class="filter-item">
                            <picker @change="bindAreaChange"  range-key="name" :range="area_list">
                                <view class="uni-input">{{area.name||'选择区/县'}}</view>
                            </picker>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="row-label graytext">门店:</div>
                <div class="row-content">
                    <div class="filter">
                        <div class="filter-item" style="border: 1px solid #D2D2D2">
                            <input placeholder="请输入门店名称" v-model="stores_name"  class="inputs"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search" @click="loadInfo">搜索</div>
            <div class="space-box"></div>
            <div class="label-title" style="justify-content: space-between;">
                <div class="line"></div>
                <div>门店列表</div>
                <div @click="get_user_location" class="graytext font14 flex1 text-right padding10-c"><span class="funicon icon-dingwei font14"></span>离我最近</div>
            </div>
            <div class="lists">
               <scroll-view  scroll-y="true" class="scroll-Y" >
                   <radio-group>
                       <label class="item padding10" v-for="(store,idx) in stores" :key="idx">
                           <view class="checkbox">
                               <radio :vlaue="store.Stores_ID"  />
                           </view>
                           <image class="logo" :src="store.Stores_ImgPath|domain" />
                           <view class="info">
                               <div class="line10 flex flex-between">
                                   <div class="font14">{{store.Stores_Name}} [{{store.Stores_ID}}]</div>
                                   <div class="distance" v-if="store.distance">{{store.distance}}m</div>
                               </div>
                               <div class="font12 graytext">{{store.Stores_Province_name}}{{store.Stores_City_name}}{{store.Stores_Area_name}}{{store.Stores_Address}}</div>
                           </view>
                       </label>
                   </radio-group>

                   <div >

                   </div>
               </scroll-view>
            </div>
            <button size="large" class="subbtn">确定</button>
            <div style="height: 46px;background: white;"></div>
            <div class="safearea-box2"></div>
        </view>
    </div>
</template>

<script>
    import {getStoreList} from "../common/fetch";
    import {City} from "../common/city";
    import {get_arr_index} from "../common/util";
    import {emptyObject} from "../common/tool";
    import {getLocation} from "../common/tool/location";

    export default {
        name: "StoreListComponents",
        data() {
            return {
                stores_name:'',
                province:{},
                province_idx:'',
                city:{},
                city_idx:'',
                area:{},
                area_idx:'',
                province_list:[],
                city_list:[],
                area_list:[],
                stores: [],
                ifshow: false, // 是否展示,
                translateValue: -100, // 位移距离
            }
        },
        props: {
            showPop: {
                type: Boolean,
                default: false,
            },
            direction: {
                type: String,
                default: 'bottom', // 方向  top，bottom，left，right
            },
            autoClose: {
                type: Boolean,
                default: true,
            }
        },
        computed: {
            _translate() {
                const transformObj = {
                    'top': `transform:translateY(${-this.translateValue}%)`,
                    'bottom': `transform:translateY(${this.translateValue}%)`,
                    'left': `transform:translateX(${-this.translateValue}%)`,
                    'right': `transform:translateX(${this.translateValue}%)`
                };
                return transformObj[this.direction]
            },
            _location() {
                const positionValue = {
                    'top': 'bottom:0px;width:100%;',
                    'bottom': 'top:0px;width:100%;',
                    'left': 'right:0px;height:100%;',
                    'right': 'left:0px;height:100%;',
                };
                return '';//positionValue[this.direction] + this._translate;
            }
        },
        methods: {
            async get_user_location(){
                // console.log('让你等就等')
                // await new Promise((resolve, reject) => {
                //     setTimeout(function () {
                //         console.log('等到了')
                //         resolve(false)
                //     },2000)
                // })
                //
                // console.log('没等到就跑了')
                //真实环境不跑下面逻辑，供参考
                //return;
                let localInfo = null;


                await getLocation().then(res=>{
                    if(res.code===0){
                        localInfo = res.data
                    }
                },err=>{
                    console.log(err)
                    error('获取位置信息失败:'+err.msg)
                })

                console.log('获取到的位置信息',localInfo)

            },
            loadInfo(){
                let postData = {
                    pageSize:10000,
                    size:1,
                    province:this.province.id,
                    city:this.city.id,
                    area:this.area.id,
                    stores_name:this.stores_name,
                }
                getStoreList(emptyObject(postData)).then(res => {

                    this.stores = res.data;
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                })
            },
            bindProvinceChange(e){
                this.province_idx = e.detail.value
                this.province = this.province_list[e.detail.value]

            },
            bindCityChange(e){
                console.log(e.detail.value)
                this.city_idx = e.detail.value
                this.city = this.city_list[e.detail.value]
            },
            bindAreaChange(e){
                this.area_idx = e.detail.value
                this.area = this.area_list[e.detail.value]
            },
            stopMove(event) {
                console.log(11);
                console.log(event);
                return;
            },
            show(events) {
                console.log('show popup')
                this.ifshow = true;

                let _open = setTimeout(() => {
                    this.translateValue = 0;
                    _open = null;
                }, 100)
                let _toggle = setTimeout(() => {
                    this.iftoggle = true;
                    _toggle = null;
                }, 300);
            },
            close() {
                console.log('close popup')
                if (this.timer !== null || !this.iftoggle) {
                    return;
                }
                this.translateValue = -100;
                this.timer = setTimeout(() => {
                    this.ifshow = false;
                    this.timer = null;
                    this.iftoggle = false;
                    this.$emit('closeCallBack', null);
                    this.$emit('change', false)
                }, 100);
            },
            ableClose() {
                if (this.autoClose) {
                    this.close();
                }
            },
            stopEvent(event) {
            },
            doSome() {
                console.log(111222111111111);
            }

        },
        watch:{
            getLocationFn(){

            },
            province:{
                handler(val){
                    this.city_list = City.getCityList(this.province.id)
                    this.city={};
                    // this.loadInfo()
                }
            },
            city:{
                handler(val){
                    this.area_list = City.getAreaList(this.province.id,this.city.id)
                    this.area={};
                    // this.loadInfo()
                }
            },
            area:{
                handler(val) {
                    // this.loadInfo()
                }
            }
        },
        created()
        {
            this.province_list = City.getProvinceList()
            this.loadInfo()
        }
    }
</script>

<style lang="scss" scoped>
.wrap{
    width: 750rpx;
    background: white;
    overflow-x: hidden;
}
.lists{
    .item{
        display: flex;
        align-items: center;
        .logo{
            height: 44px;
            width:44px;
            border-radius: 50%;
            background-color: #f2f2f2;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;

        }
        .info{
            flex:1;
        }
    }
}

.subbtn{
    border-radius: 0;
    height: 46px;
    position: fixed;
    z-index: 3;
    bottom: 0;
    background: #F43131;
    color: white;
    line-height: 46px;
    width: 100%;
}
.component-title{
    font-size: 16px;
    padding: 15px 0 5px;
}
.label-title{
    padding: 10px 0;
    font-size: 14px;
    line-height: 14px;
    display: flex;
    align-items: center;

    .line{
        margin: 0px 10px;
        width: 2px;
        height: 14px;
        background: #F43131;
    }
}

.row{
    display: flex;
    align-items: center;
    padding:0 10px ;
    height: 40px;
    .row-label{
        padding: 0 6px 0 10px;
    }
    .row-content{

        flex: 1;
    }
}
.filter{
    display: flex;
    .filter-item{
        flex:1;
        text-align: center;
    }
}
.space-box{
    height: 10px;
    background: #f8f8f8f8;
}


.popup-layer {
    position: fixed;
    z-index: 888;
    background: rgba(0, 0, 0, .5);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
}

.popup-content {
    position: fixed;
    z-index: 888;
    background: #FFFFFF;
    transition: all .3s ease;
    overflow: hidden;
    width: 750rpx;
    top: 15%;
    /*border-top-left-radius: 20rpx;*/
    /*border-top-right-radius: 20rpx;*/

}
.safearea-box2{
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    width: 100%;
    background: white;
}
    .scroll-Y{
        height: 322px;
        padding-bottom: 46px;
    }
    .search{
        width:170rpx;
        height:25px;
        line-height: 25px;
        text-align: center;
        background:rgba(244,49,49,1);
        color: #FFFFFF;
        font-size: 12px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 32rpx;
        margin-bottom: 30rpx;
    }
    .inputs{
        font-size: 10px;
        height: 25px;
        text-align: left;
        padding-left: 10px;
    }
</style>
