<template>
  <view @click="toSearch" v-if="search.style.position==='absolute'"  class="search wrap absolute" :style="[getWrapStyle]">
    <view class="box" :class="{'round':search.config.type==='round'}">
      <icon class="icon" type="search" size="16"/>
      <input :placeholder="placeholderText" class="input font14" disabled :style="{height:search.style.height+'px',lineHeight:search.style.height-8+'px',backgroundColor:search.style.inputBgColor,color:search.style.color}" />
    </view>
  </view>
  <view @click="toSearch" v-else class="search wrap" :style="[getWrapStyle]">
    <view class="box" :class="{'round':search.config.type==='round'}">
      <icon class="icon" type="search" size="16"/>

      <input :placeholder="placeholderText" class="input font14" disabled :style="{height:search.style.height+'px',lineHeight:search.style.height-8+'px',backgroundColor:search.style.inputBgColor,color:search.style.color}" />
    </view>
  </view>
</template>
<script>
  import {deepCopyStrict} from "../../common/tool";
  const styleDefault = {
    bgColor: '#fff',
    height: 30,
    color: '#444',
    inputBgColor: '#f2f2f2',
    position:'inherit',
    x:0,
    y:0
  }
  export default {
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
        search: {},
      };
    },
    computed: {
      placeholderText(){
        return this.search.value.hot.join(' ')
      },
      getWrapStyle(){
        if(this.search.style.position==='absolute'){
          return {
            backgroundColor:this.search.style.bgColor,
            // left:this.search.style.x+'px',
            top:this.search.style.y+'px',
            position:'absolute'
          }
        }

        return {
          backgroundColor:this.search.style.bgColor,
          position:'inherit'
        }

      },
      style() {
        return deepCopyStrict(styleDefault, this.search.style);
      },

    },
    filters: {
      placeholderStr(hot) {
        const str = hot.join(' ');
        if (str) return str;
        return '请输入内容';
      },
    },
    watch: {

    },
    components: {},
    methods: {
      toSearch(){
        this.$fun.linkTo({link:'/pages/search/search',linkType:'default'})
      }
    },
    mounted(){
    },
    created() {
      this.search = this.confData
    }

  }
</script>

<style scoped lang="less">

  .wrap {
    width: 100%;
    padding: 10px 0;
    &.absolute{
      &:hover{
        border: 1px dashed #298df8;
      }

      box-sizing: border-box;
      z-index: 999;
    }

    .box {
      margin: 0 15px;
      position: relative;

      .input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #DCDFE6;
        padding: 0 30px;

        &::placeholder {
          color: #999;
        }
      }

      .icon {
        position: absolute;
        top: 50%;
        width: 30px;
        transform: translateY(-50%);
        -webkit-transition: all .3s;
        text-align: center;
        color: #C0C4CC;
      }
    }

    .round {
      .input {
        border-radius: 4px;
      }
    }
  }


</style>
