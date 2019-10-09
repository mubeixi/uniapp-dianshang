<template>
  <view class="notice wrap">
    <view class="flex content" :style="{background:notice.style.bgColor}">
      <view class="funicon icon-gonggao icon" :style="{color:notice.style.iconColor}"></view>
      <div class="flex1 title" :style="{color:notice.style.color}">{{notice.value.content}}</div>
    </view>
  </view>
</template>
<script>
  import {deepCopyStrict} from "../../common/tool";
  const styleDefault = {}
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
        number: 0,
        notice: {},
      };
    },
    computed: {
      style() {
        return deepCopyStrict(styleDefault, this.notice.style);
      },

      text() {
        return {
          id: this.number,
          val: this.notice.value.list[this.number]
        }
      },

    },
    watch: {

    },
    components: {},
    methods: {
      startMove() {
        let _self = this;
        setTimeout(function () {
          if (_self.number === _self.notice.value.list.length - 1) {
            _self.number = 0;
          } else {
            _self.number += 1;
          }
          _self.startMove();
        }, 2000)
      },

    },
    mounted() {
      // this.$nextTick().then(res => {
      //   this.startMove()
      // })
    },
    created() {

      this.notice = this.confData;
    }
  }
</script>


<style scoped lang="less">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }

  .slide-leave-to {
    opacity: 0.1;
    transform: translateY(-20px);
  }

  .slide-enter {

    transform: translateY(20px);
  }

  .inner-container {
    height: 36px
  }

  .text2 {
    display: flex;
    overflow: hidden;

    line-height: 36px;
    font-size: 14px;
  }

  .tip {
    padding: 0 10px;

  }

  .content {
    flex: 1;
    text-overflow: ellipsis;
  }

  .wrap {
    background: white;

  }

  .content{
    padding: 6px 10px;
    height: 16px;
  }


  .icon{
    font-size: 16px;
    margin-right: 10px;

    /*color: #ff732e;*/
  }

  .title{
    color: #666;
    font-size: 14px;
    line-height: 16px;
  }


</style>
