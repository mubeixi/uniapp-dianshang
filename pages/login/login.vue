<template>
  <div class="loginSign font16">
    <ul>
      <li class="codeContent" v-if="status == 1">
        <h1 class="topTitle">
          <view class="funicon icon icon-fanhui inline-block"></view>
          登陆 / 注册</h1>
        <div class="codeLogin">
          <label class="inputLable flex line20">

            <span>+{{ telNum }}</span>
            <input type="number" placeholder="请输入手机号" v-model="mobile" />
          </label>
          <button type="primary" class="submitBtn sendCode" @click="codeSendVerification(4)"
                  :disabled="isCodeDisabled">发送验证码</button>
          <div class="passwordLogin" @click="(status = 2), (loginStatus = 2)">
            使用密码登陆
          </div>
        </div>
        <!-- <div class="protocol">
                    <p>点击按钮即表示您同意并愿遵守</p>
                    <p><span>《使用协议》</span>和<span>《隐私协议》</span></p>
                </div> -->
        <div class="otherLogin" v-show="isShowWeiXin==1">
          <p @click="weixinlogin"><i class="iconfont iconweixin"></i></p>
        </div>
      </li>
      <li class="phoneContent" v-else-if="status == 2">
        <div class="title">
          <i
            class="iconfont iconhook-left prebBtn"
            @click="(status = 1), (loginStatus = 1)"
          ></i
          >手机账号登陆
        </div>
        <div class="content">
          <form @submit.prevent="login">
            <label class="inputLable">
              <!-- <span @click="tel.show = true">+{{ telNum }}</span> -->
              <span>+{{ telNum }}</span>
              <input
                type="number"
                placeholder="请输入手机号"
                v-model="mobile"
                maxlength="11"
              />
            </label>
            <label class="inputLable">
              <span>密码</span>
              <input
                :type="phone.inputType ? 'text' : 'password'"
                placeholder="请输入密码"
                v-model="phone.password"
              />
              <i
                class="iconfont right"
                :class="hasVisibleIcon"
                @click="phone.inputType = !phone.inputType"
              ></i>
            </label>
            <div class="searchPass" @click="(status = 3), (loginStatus = 3)">
              找回密码？
            </div>
            <input
              type="submit"
              value="登录"
              class="submitBtn sendCode"
              :disabled="isPhoneDisabled"
            />
          </form>
        </div>
      </li>
      <li class="searchPassword" v-else-if="status == 3">
        <div class="title">
          <i
            class="iconfont iconhook-left prebBtn"
            @click="(status = 2), (loginStatus = 2)"
          ></i
          >找回密码
        </div>
        <div class="content">
          <label class="inputLable">
            <!-- <span @click="tel.show = true">+{{ telNum }}</span> -->
            <span >+{{ telNum }}</span>
            <input
              type="number"
              placeholder="请输入手机号"
              v-model="mobile"
              maxlength="11"
            />
          </label>
          <input
            type="button"
            value="发送验证码"
            class="submitBtn"
            :disabled="isCodeDisabled"
            @click="codeSendVerification(4)"
          />
        </div>
      </li>
      <li class="fillCode" v-else-if="status == 4">
        <div class="title">请输入验证码</div>
        <p class="description">
          验证码已发送至手机 {{ mobile }}
          <span :class="{ disabled: countdownStatus }" @click="againSendCode"
            >重新发送{{ countdownStr }}</span
          >
        </p>
        <input
          type="number"
          v-if="loginStatus !== 3 && loginStatus !== 4"
          class="code"
          v-model="verificationCode"
          @input="fillCode"
        />

        <div class="searchNewPass editSearchPassword" v-if="loginStatus === 3">
          <label class="inputLable">
            <span>验证码</span>
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="verificationCode"
              @input="substr"
            />
          </label>
          <label class="inputLable">
            <span>新密码</span>
            <input
              :type="phone.inputType ? 'text' : 'password'"
              placeholder="请输入新密码"
              v-model="newPassword"
            />
            <i
              class="iconfont right"
              :class="hasVisibleIcon"
              @click="phone.inputType = !phone.inputType"
            ></i>
          </label>
          <input
            type="button"
            value="完成"
            class="submitBtn sendCode"
            :disabled="isNewPassDisabled"
            @click="setNewPassOk"
          />
        </div>
      </li>
      <li class="setNewPass" v-else-if="status == 5">
        <div class="title">
          <i
            class="iconfont iconhook-left prebBtn"
            @click="(status = 3), (loginStatus = 3)"
          ></i
          >设置新密码
        </div>
        <div class="content">
          <label class="inputLable">
            <span>密码</span>
            <input
              :type="phone.inputType ? 'text' : 'password'"
              placeholder="请输入新密码"
              v-model="newPassword"
            />
            <i
              class="iconfont right"
              :class="hasVisibleIcon"
              @click="phone.inputType = !phone.inputType"
            ></i>
          </label>
          <input
            type="button"
            value="完成"
            class="submitBtn sendCode"
            :disabled="isNewPassDisabled"
            @click="setNewPassOk"
          />
        </div>
      </li>

    </ul>
<!--    <popup v-model="tel.show" class="telContent">-->
<!--      <popup-header title="选择国际电话区号"></popup-header>-->
<!--      <group gutter="0" class="content">-->
<!--        <radio-->
<!--          v-model="tel.model"-->
<!--          :options="telData"-->
<!--          @on-change="tel.show = false"-->
<!--        ></radio>-->
<!--      </group>-->
<!--    </popup>-->

    <!-- <pre><code>{{ editPass }}</code></pre> -->
    <!-- <div class="propmtText"></div> -->
    <!-- <pre><code>状态：{{ loginStatus }}</code></pre>
        <pre><code>手机号：{{ mobile }}</code></pre>
        <pre><code>验证码：{{ verificationCode }}</code></pre>
        <pre><code>密码：{{ phone.password }}</code></pre>
        <pre><code>新密码：{{ newPassword }}</code></pre> -->
  </div>
</template>

<script>
import telData from "../../common/tool/tel";

// #ifdef H5
import wx from "weixin-js-sdk";
// #endif


import {GetQueryByString} from "../../common/tool";



// import {
//   getSmsCode,
//   login,
//   resetPwd,
//   loginSign,
//   weixinlogin,
//   weixinAuthUrl,
//   editPassword,
//   logout
// } from "@/assets/js/fetch/index";
import {toast,confirm} from "../../common";

import { mapGetters, mapActions, Store } from "vuex";

import { isWeiXin } from "../../common/tool";
import {pageMixin} from "../../common/mixin";


export default {
	mixins:[pageMixin],
  data() {
    return {
      froms:'',//跳转过来的路由
      status: 1, // 页面状态 1: 登录注册； 2：密码登陆； 3： 找回密码； 4：输入验证码； 5：设置新密码； 6:修改密码
      loginStatus: 1, // 1: 短信登陆； 2: 手机号登陆； 3: 找回密码； 4：修改密码
      verificationCode: "", //用户填写的验证码都会在这里
      mobile: "", // 手机号，不管在哪个状态
      newPassword: "",
      fromId: 0, //推荐人的ID 没有推荐人为0，有推荐人传推荐人ID
      phone: {
        password: "",
        inputType: false
      },
      countdownNum: 60, //倒计时数字
      countdownStatus: false,
      tel: {
        show: false,
        data: telData,
        model: "中国 86"
      },
      editPass: {
        oldPassShow: false,
        newPassShow: false,
        okNewPassShow: false,

        oldPass: "",
        newPass: "",
        okNewPass: ""
      },
      isShowWeiXin:0
    };
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    hasVisibleIcon() {
      return this.phone.inputType ? "iconyanjing" : "iconyanjing1";
    },
    telNum() {
      return this.tel.model.split(" ")[1];
    },
    telData() {
      return this.tel.data.map(v => {
        return `${v.name} ${v.tel}`;
      });
    },
    countdownStr() {
      if (this.countdownStatus) {
        return `(${this.countdownNum})`;
      }
      return "";
    },
    isCodeDisabled() {
      return !/^1(3|5|6|7|8|9)[0-9]{9}$/.test(this.mobile);
    },
    isEditNewPassDisabled() {
      let old = /^.{6,30}$/.test(this.editPass.oldPass);
      let newPass = /^.{6,30}$/.test(this.editPass.newPass);
      let okNewPass = /^.{6,30}$/.test(this.editPass.okNewPass);
      return old && newPass && okNewPass;
    },
    isNewPassDisabled() {
      let verifi = this.verificationCode.length != 6;
      let password = !/^.{6,30}$/.test(this.newPassword);
      return verifi && password;
    },
    isPhoneDisabled() {
      let mobile = this.mobile;
      let password = this.phone.password;
      let isOkPhone = /^1(3|5|6|7|8|9)[0-9]{9}$/.test(mobile);

      return !(isOkPhone && password !== "");
    }
  },
  methods: {
    ...mapActions(["setInitData", "setUser"]),
    setData(from){
      this.froms=from;
      //console.log(this.froms);
    },
    setNewPasswordOk() {
      let old = this.editPass.oldPass;
      let newPass = this.editPass.newPass;
      let okNewPass = this.editPass.okNewPass;
      if (newPass !== okNewPass) return toast("新密码和确认密码不一致");
      editPassword(old, newPass, okNewPass).then(() => {});
    },

    sendCode() {
      let mobile = this.mobile;
      if (mobile == "" || !mobile)
        return toast("请先填入手机号");
      let event = undefined;
      return getSmsCode(mobile, event)
        .then(() => toast("发送短信成功"))
        .then(() => this.startCountdown());
    },
    async codeSendVerification(status) {
      // 发送验证码并设置 status（更新页面）
      if (!status) throw "请传入 status";
      await this.sendCode();
      this.status = status;
    },
    againSendCode() {
      if (!this.countdownStatus) this.sendCode();
    },
    substr() {
      this.verificationCode = this.verificationCode.toString().substr(0, 6);
    },
    fillCode() {
      //填写验证码
      this.substr();
      if (this.verificationCode.length == 6) this.login();
    },
    async login() {
      //登录 - 多个地方用了
      //console.log(this.fromId, "这是fromId");
      if (this.loginStatus === 1) {
        // 短信登录
        await loginSign(this.mobile,this.verificationCode,this.fromId).then(
          () => toast("登录成功！")
        );
      } else if (this.loginStatus === 2) {
        // 账号密码登录
        await login(this.mobile, this.fromId, this.phone.password).then(res =>
           {
             toast(res.msg);
            // this.store.commit("promotion/setFromId", "");
           }
        );
      } else if (this.loginStatus === 3) {
        // 找回密码
        await loginSign(this.mobile, this.verificationCode);
      }
      await this.setInitData();
      if (isWeiXin() === "111111xcx") {
        wx.miniProgram.navigateBack({
          delta: 1
        });
      } else {
          let querys={};
          let users_id=this.$route.query.users_id;
          //console.log(this.froms);
          querys=this.froms.query;
          querys.users_id=users_id;
          //delete querys.from_id;
          if(this.froms.path=="/member/personalInfo"){
            this.$router.push({ path:'/member',query:querys});
          }else{
            this.$router.push({ path:this.froms.fullPath});//,query:querys
          }

          // this.$router.go(-1);
      }

    },
    setNewPassOk() {
      let data = {
        mobile: this.mobile,
        code: this.verificationCode,
        newpwd: this.newPassword
      };
      resetPwd(data).then(res => {
        toast(res.msg);
        confirm({
          content:"密码设置成功，是否直接登录？",
          confirmText:"直接登录",
          cancelText:"暂不登录"
        }).then(() => this.login());
      });
    },
    startCountdown() {
      //倒计时
      this.countdownStatus = true;
      const countdownInterval = setInterval(() => {
        if (this.countdownNum > 0) this.countdownNum--;
        else {
          clearInterval(countdownInterval);
          this.countdownNum = 60;
          this.countdownStatus = false;
        }
      }, 1000);
    },
    weixinlogin() {
        const url=window.location.href;
        const users_id=GetQueryByString(url,'users_id');
        let my=new NATIVE_APP();
        if(my.isIos||my.isAndroid){
          my.wxLogin(1, ajaxUrl+`/index/user/appwxlogin?users_id=${users_id}`);
        }else{
          weixinAuthUrl().then(res => {
              if (res.link) window.location.href = res.link;
          });
        }
    },
    initDataFn() {
      // try {
      //   const url=window.location.href;
      //   let start=url.indexOf("code");
      //   const code=url.substr(start+5,32);
      //   //const users_id=this.$route.query.users_id;
      //   const users_id=GetQueryByString(url,'users_id');
      //   if (start>=0) {
      //     weixinlogin(code,this.fromId)
      //       .then(res => {
      //
      //         this.setInitData()
      //           .then(() => {
      //             window.location.replace(
      //               window.location.origin + window.location.pathname + "#/?users_id="+users_id
      //             );
      //           })
      //           .catch(err => {
      //           });
      //       })
      //       .catch(err => {
      //         window.location.replace(
      //          window.location.origin + window.location.pathname + "#/login?users_id="+users_id
      //         );
      //       });
      //   }
      // } catch (err) {
      //
      // }
    }

  },
  //  beforeRouteEnter(to, from, next) {
  //  next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
  //    // console.log(from)
  //     vm.setData(from);
  //   })
  // },
  created() {

    this.isShowWeiXin= isWeiXin();
    this.initDataFn();

    // if (this.$route.query.status) {
    //   this.status = parseInt(this.$route.query.status);
    //   this.mobile = this.user.mobile;
    // }
    // if (this.$route.query.loginStatus) {
    //   this.loginStatus = parseInt(this.$route.query.loginStatus);
    // }

  }
};
</script>

<style scoped lang="scss">
@import "../../static/css/scssConfig";

.icon-fanhui{
  padding-right: 10px;
  color: #999;
}
.telContent .content {
  height: 400px;
  overflow: auto;
}
.editSearchPassword {
  input[type="text"],
  input[type="password"] {
    padding-left: 30%;
    width: 70%;
  }
}
.loginSign {
  background: #fff;
  height: 100vh;
  overflow: hidden;
  width: 100vw;

  .topTitle {
    font-size: 27px;
    line-height: 1;
    font-weight: 400;
    margin: 36px 0 0 20px;
  }

  .title {
    position: relative;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    text-align: center;
  }

  .prebBtn {
    position: absolute;
    color: #999;
    font-size: 16px;
    left: 0;
    padding: 15px;
    top: 50%;
    transform: translate(-20px, -50%);
  }

  .fillCode {
    .title {
      margin-top: 34px;
    }

    .description {
      color: #999;
      font-size: 14px;
      margin-top: 12px;
      text-align: center;

      span {
        color: $mainColor;
      }
    }

    .code {
      border-bottom: 1px solid #e6e6e6;
      display: block;
      font-size: 30px;
      height: 60px;
      letter-spacing: 10px;
      margin: 0 auto;
      margin-top: 46px;
      padding: 10px 0;
      text-align: center;
      width: 50%;
    }

    .searchNewPass {
      margin: 20px 20px 0;
    }
  }

  .setNewPass {
    margin: 0 20px;

    .title {
      margin-top: 34px;
    }

    .content {
      margin-top: 50px;

      .sendCode {
        margin-top: 32px;
      }
    }
  }

  .searchPassword {
    margin: 0 20px;

    .title {
      margin-top: 34px;
    }

    .content {
      margin-top: 54px;
      overflow: hidden;

      .submitBtn {
        margin-top: 30px;
      }

      .inputLable {
        span {
          color: $mainColor;
          width: 50px;

          // &:after {
          //   @include triangle(3px, 5px, $mainColor, top);
          //   position: absolute;
          //   content: "";
          //   right: 0;
          //   top: 50%;
          //   transform: translateY(-25%);
          // }
        }

        input {
          padding-left: 22%;
        }
      }
    }
  }

  .phoneContent {
    margin: 0 20px;

    .title {
      margin-top: 34px;
    }

    .content {
      margin-top: 54px;
      overflow: hidden;

      .inputLable {
        span {
          padding:10px 0;
        }

        input {
          padding-left: 22%;
        }
      }

      .inputLable:first-child {
        span {
          color: $mainColor;
          width: 50px;

          // &:after {
          //   @include triangle(3px, 5px, $mainColor, top);
          //   position: absolute;
          //   content: "";
          //   right: 0;
          //   top: 50%;
          //   transform: translateY(-25%);
          // }
        }
      }

      .sendCode {
        margin-top: 66px;
      }

      .searchPass {
        color: $mainColor;
        float: right;
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }

  .codeLogin {
    margin: 55px 20px 0;
    overflow: hidden;

    .passwordLogin {
      color: $mainColor;
      float: right;
      font-size: 12px;
      line-height: 50px;
      padding-left: 10px;
    }

    .inputLable {
      span {
        color: $mainColor;
        width: 50px;

        // &:after {
        //   @include triangle(3px, 5px, $mainColor, top);
        //   position: absolute;
        //   content: "";
        //   right: 0;
        //   top: 50%;
        //   transform: translateY(-25%);
        // }
      }

      input {
        /*padding-left: 22%;*/
      }
    }
  }

  .protocol {
    color: #999;
    font-size: 12px;
    margin-top:20px;
    text-align: center;

    span {
      color: $mainColor;
    }

    p {
      margin-bottom: 0.05rem;
    }
  }

  .otherLogin {
    position: fixed;
    bottom: 0.6rem;
    left: 0;
    text-align: center;
    width: 100%;

    p {
      position: relative;
      display: inline-block;
      padding: 0 0.6rem;

      // &:after,
      &:before {
        position: absolute;
        content: "";
        display: block;
        height: 1px;
        left: 50%;
        top: 50%;
        transform: translateX(-50%);
        z-index: -1;
      }

      &:before {
        background-color: #e6e6e6;
        width: 100%;
      }

      &:after {
        background-color: white;
        width: 40%;
      }
    }

    i {
      background-color: white;
      color: $weixinColor;
      font-size: 0.45rem;
    }
  }
}
</style>
