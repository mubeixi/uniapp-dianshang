<template>
    <div>
        <view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer">

        </view>
        <view ref="popRef" v-show="ifshow" class="popup-content" @tap.stop="stopEvent" :style="_location">
            <div class="filter">
                <div class="filter-item">
                    <picker @change="bindPickerChange"  :range="province_list">
                        <view class="uni-input">{{province||'选择省份'}}</view>
                    </picker>
                </div>
            </div>
            <div class="safearea-box2"></div>
        </view>
    </div>
</template>

<script>
    import {getStoreList} from "../common/fetch";
    import {City} from "../common/city";

    export default {
        name: "StoreListComponents",
        data() {
            return {
                province:'',
                city:'',
                area:'',
                province_list:[],
                city_list:[],
                area_list:[],
                stores: [],
                ifshow: true, // 是否展示,
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
                return positionValue[this.direction] + this._translate;
            }
        },
        methods: {
            bindPickerChange(e){
                console.log(e.detail)
                this.province = e.detail
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
            province:{
                handler(val){
                    this.city_list = City.getCityList(val)
                }
            },
            city:{
                handler(val){
                    this.area_list = City.getAreaList(this.province,val)
                }
            },
        },
        created()
        {
            this.province_list = City.getProvinceList()

            getStoreList({size: 999}).then(res => {
                this.stores = res.data
            })
        }
    }
</script>

<style scoped>

</style>
