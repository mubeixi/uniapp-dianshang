<template>
  <div @click="commonClick" class="loginSign font16">
    <!-- #ifdef APP-PLUS-->
    <view class="status_bar"></view>
    <!-- #endif -->
    <!-- #ifdef MP-->
    <view :style="{height:menuButtonInfo.top+'px'}"></view>
    <!-- #endif -->
    <ul>
      <li class="codeContent" v-if="status == 1">
        <!-- #ifdef MP-WEIXIN -->
        <div :style="{height:menuButtonInfo.height+'px'}" @click="goBack" class="topTitle">
          <view class="funicon icon icon-fanhui inline-block"></view>
          <div>登录</div>
        </div>
        <!-- #endif -->

        <!-- #ifndef MP-WEIXIN -->
        <div @click="goBack" class="topTitle">
          <view class="funicon icon icon-fanhui inline-block"></view>
          <div>登录</div>
        </div>
        <!-- #endif -->

        <!-- #ifdef H5 -->
        <div class="otherLogin-top" v-if="isShowWeiXin==1 && !showCodeLogin">
          <div class="box">
            <block :key="idx" v-for="(channel,idx) in channels">
              <div @click="weixinlogin(channel)" class="otherLogin-top-item" v-if="channel.type=='wx_mp'">
                微信登录
              </div>
            </block>
          </div>
        </div>
        <div class="otherLogin" v-show="!showCodeLogin">
          <div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
            <div class="inline-block flex1 text-center">
              <i @click="showCodeLoginFn" class="funicon icon-icon_mobilephonelanding" v-if="!showCodeLogin"></i>
            </div>
          </div>
        </div>
        <div class="otherLogin" v-show="showCodeLogin">
          <div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
            <div :key="idx" class="inline-block flex1 text-center" v-for="(channel,idx) in channels">
              <i @click="weixinlogin(channel)" class="funicon icon-weixin" v-if="channel.type=='wx_mp'"></i>
              <i @click="qqlogin(channel)" class="funicon icon-QQ1"
                 style="color: #2eb1f1;font-size: 32px;margin-top: 2px" v-if="channel.type=='qq'"></i>
            </div>
          </div>
        </div>
        <div class="codeLogin" v-if="!isShowWeiXin || showCodeLogin">
          <label class="inputLable flex line20">
            <span>+{{ telNum }}</span>
            <input placeholder="请输入手机号" type="number" v-model="mobile" />
          </label>
          <button :disabled="isCodeDisabled" @click="codeSendVerification(4)" class="submitBtn sendCode" type="primary">
            发送验证码
          </button>
          <div @click="(status = 2), (loginStatus = 2)" class="passwordLogin">
            使用密码登录
          </div>
        </div>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN -->
        <div class="otherLogin-top" v-if="!showCodeLogin">
          <div class="box">
            <block :key="idx" v-for="(channel,idx) in channels">
              <div @click="openLoginDialog" class="otherLogin-top-item" v-if="channel.type=='wx_lp'">
                微信登录
              </div>
            </block>
          </div>
        </div>
        <div class="otherLogin mp-weixin" v-show="!showCodeLogin">
          <div class="box" style="margin: 0 30px;">
            <div class="inline-block flex1 text-center">
              <i @click="showCodeLoginFn" class="funicon icon-icon_mobilephonelanding" v-if="!showCodeLogin"></i>
            </div>
          </div>
        </div>
        <div class="otherLogin mp-weixin" v-show="showCodeLogin">
          <div class="box" style="margin: 0 30px;">
            <div :key="idx" class="inline-block flex1 text-center" v-for="(channel,idx) in channels">
              <i @click="openLoginDialog" class="funicon icon-weixin font24" v-if="channel.type=='wx_lp'"></i>
            </div>
          </div>
        </div>
        <!-- #endif -->

        <!-- #ifdef APP-PLUS -->
        <div class="otherLogin-top" v-if="!showCodeLogin">
          <div class="box">
            <block :key="idx" v-for="(channel,idx) in channels">
              <div @click="weixinlogin" class="otherLogin-top-item" v-if="channel.type=='wx_app'">
                微信登录
              </div>
            </block>
          </div>
        </div>
        <div class="otherLogin" v-show="!showCodeLogin">
          <div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
            <div class="inline-block flex1 text-center">
              <i @click="showCodeLoginFn" class="funicon icon-icon_mobilephonelanding" v-if="!showCodeLogin"></i>
            </div>
          </div>
        </div>
        <div class="otherLogin" v-show="showCodeLogin">
          <div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
            <div :key="idx" class="inline-block flex1 text-center" v-for="(channel,idx) in channels">
              <div @click="weixinlogin" class="inline-block flex1 text-center" v-if="channel.type=='wx_app'"><i
              class="funicon icon-weixin"></i></div>
            </div>
          </div>
        </div>
        <!-- #endif -->

        <!-- #ifndef H5 -->
        <div class="codeLogin" v-if="showCodeLogin">
          <label class="inputLable flex line20">
            <span>+{{ telNum }}</span>
            <input placeholder="请输入手机号" type="number" v-model="mobile" />
          </label>
          <button :disabled="isCodeDisabled" @click="codeSendVerification(4)" class="submitBtn sendCode" type="primary">
            发送验证码
          </button>
          <div @click="(status = 2), (loginStatus = 2)" class="passwordLogin">
            使用密码登录
          </div>
        </div>
        <!-- #endif -->
      </li>
      <li class="phoneContent" v-else-if="status == 2">
        <!-- #ifdef MP-WEIXIN -->
        <div :style="{height:menuButtonInfo.height+'px'}" @click="(status = 1), (loginStatus = 1)" class="topTitle">
          <view class="funicon icon icon-fanhui inline-block"></view>
          <div>手机账号登录</div>
        </div>
        <!-- #endif -->

        <!-- #ifndef MP-WEIXIN -->
        <div @click="(status = 1), (loginStatus = 1)" class="topTitle">
          <view class="funicon icon icon-fanhui inline-block"></view>
          <div>手机账号登录</div>
        </div>
        <!-- #endif -->

        <div class="content">
          <label class="inputLable flex line20">
            <span>+{{ telNum }}</span>
            <input maxlength="11" placeholder="请输入手机号" v-model="mobile" />
          </label>
          <label class="inputLable  flex">
            <span style="width: 50px;">密码</span>
            <input placeholder="请输入密码" type="password" v-model="phone.password" />
          </label>
          <div @click="(status = 3), (loginStatus = 3)" class="searchPass">
            找回密码？
          </div>
          <button :disabled="isPhoneDisabled" @click="login" class="submitBtn sendCode" type="primary">登录</button>
        </div>
      </li>
      <li class="searchPassword" v-else-if="status == 3">
        <!-- #ifdef MP-WEIXIN -->
        <div :style="{height:menuButtonInfo.height+'px'}" @click="(status = 2), (loginStatus = 2)" class="topTitle">
          <view class="funicon icon icon-fanhui inline-block"></view>
          <div>找回密码</div>
        </div>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <div @click="(status = 2), (loginStatus = 2)" class="topTitle">
          <view class="funicon icon icon-fanhui inline-block"></view>
          <div>找回密码</div>
        </div>
        <!-- #endif -->
        <div class="content">
          <label class="inputLable flex ">
            <!-- <span @click="tel.show = true">+{{ telNum }}</span> -->
            <span>+{{ telNum }}</span>
            <input maxlength="11" placeholder="请输入手机号" type="number" v-model="mobile" />
          </label>
          <button :disabled="isCodeDisabled" @click="codeSendVerification(4)" class="submitBtn" type="primary">发送验证码
          </button>
        </div>
      </li>
      <li class="fillCode" v-else-if="status == 4">
        <!-- #ifdef MP-WEIXIN -->
        <div :style="{height:menuButtonInfo.height+'px'}" class="topTitle">
          <div>请输入验证码</div>
        </div>
        <!-- #endif -->

        <!-- #ifndef MP-WEIXIN -->
        <div class="topTitle">
          <div>请输入验证码</div>
        </div>
        <!-- #endif -->

        <p class="description">
          验证码已发送至手机 {{ mobile }}
          <span :class="{ disabled: countdownStatus }" @click="againSendCode">重新发送{{ countdownStr }}</span>
        </p>
        <input :value="verificationCode" @input="fillCode" class="code" type="number"
               v-if="loginStatus !== 3 && loginStatus !== 4" />
        <div class="searchNewPass editSearchPassword" v-if="loginStatus === 3">
          <label class="inputLable flex line20">
            <span>验证码</span>
            <input :value="verificationCode" @input="substr" class="ins" placeholder="请输入验证码" type="text" />
          </label>
          <label class="inputLable flex">
            <span>新密码</span><input class="ins" placeholder="请输入新密码" type="password" v-model="newPassword" />
          </label>
          <button :disabled="isNewPassDisabled" @click="setNewPassOk" class="submitBtn" type="primary">完成</button>
        </div>
      </li>
      <li class="setNewPass" v-else-if="status == 5">
        <!-- #ifdef MP-WEIXIN -->
        <div :style="{height:menuButtonInfo.height+'px'}" class="topTitle">
          <view @click="setStatusFunc" class="funicon icon icon-fanhui inline-block prebBtn"></view>
          设置新密码
        </div>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <div class="topTitle">
          <view @click="setStatusFunc" class="funicon icon icon-fanhui inline-block prebBtn"></view>
          设置新密码
        </div>
        <!-- #endif -->
        <div class="content">
          <label class="inputLable flex lin20">
            <span>密码</span>
            <input placeholder="请输入新密码" type="password" v-model="newPassword" />
          </label>
          <button :disabled="isNewPassDisabled" @click="setNewPassOk" class="submitBtn sendCode" type="primary">完成
          </button>
        </div>
      </li>
    </ul>
    <!-- #ifdef MP-WEIXIN -->
    <div :animation="animationData" class="joinForm text-center" id="joinForm">
      <view :style="{height:menuButtonInfo.top+'px'}"></view>
      <div :style="{height:menuButtonInfo.height+'px'}" @click="cancelLoginDialog" class="topTitle">
        <view class="funicon icon icon-fanhui inline-block"></view>
        <div>返回</div>
      </div>
      <image :src="initData.ShopLogo" :style="{marginTop:85+'px'}" class="logo" mode="widthFix"></image>
      <div class="large line15 font20">「{{initData.ShopName}}」申请获得以下权限</div>
      <div class="mini graytext2 font14">获得你的公开信息（昵称、头像、地区等）</div>
      <div class="control">
        <button @click="cancelLoginDialog" class="btn reject">拒绝</button>
        <button @getuserinfo="weixinlogin" class="btn allow" open-type="getUserInfo">允许</button>
      </div>
    </div>
    <!-- #endif -->
  </div>
</template>
<script>

import { GetQueryByString, isWeiXin, ls, urlencode, objTranslate } from '../../common/tool'
import { bindUserClientId, getSmsCode, login, upUserLog } from '@/common/fetch'
import { error, modal, toast } from '../../common'
import { mapActions, mapGetters } from 'vuex'
import { pageMixin } from '../../common/mixin'

export default {
  mixins: [pageMixin],
  data () {
    return {
      animationData: {},
      menuButtonInfo: {
        height: 0,
        top: 0
      },
      systemInfo: {},
      showCodeLogin: false,
      h5_wx_login: false,
      refreshInit: false,
      channels: [],
      froms: '', // 跳转过来的路由
      status: 1, // 页面状态 1: 登录注册； 2：密码登录； 3： 找回密码； 4：输入验证码； 5：设置新密码； 6:修改密码
      loginStatus: 1, // 1: 短信登录； 2: 手机号登录； 3: 找回密码； 4：修改密码
      verificationCode: '', // 用户填写的验证码都会在这里
      mobile: '', // 手机号，不管在哪个状态
      newPassword: '',
      fromId: 0, // 推荐人的ID 没有推荐人为0，有推荐人传推荐人ID
      phone: {
        password: '',
        inputType: false
      },
      countdownNum: 60, // 倒计时数字
      countdownStatus: false,
      tel: {
        show: false,
        // data: telData,
        model: '中国 86'
      },
      editPass: {
        oldPassShow: false,
        newPassShow: false,
        okNewPassShow: false,
        oldPass: '',
        newPass: '',
        okNewPass: ''
      },
      isShowWeiXin: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', 'initData'
    ]),
    hasVisibleIcon () {
      return this.phone.inputType ? 'iconyanjing' : 'iconyanjing1'
    },
    telNum () {
      return this.tel.model.split(' ')[1]
    },
    countdownStr () {
      if (this.countdownStatus) {
        return `(${this.countdownNum})`
      }
      return ''
    },
    isCodeDisabled () {
      return !/^1(3|5|6|7|8|9)[0-9]{9}$/.test(this.mobile)
    },
    isEditNewPassDisabled () {
      const old = /^.{6,30}$/.test(this.editPass.oldPass)
      const newPass = /^.{6,30}$/.test(this.editPass.newPass)
      const okNewPass = /^.{6,30}$/.test(this.editPass.okNewPass)
      return old && newPass && okNewPass
    },
    isNewPassDisabled () {
      const verifi = this.verificationCode.length !== 6
      const password = !/^.{6,30}$/.test(this.newPassword)
      return verifi && password
    },
    isPhoneDisabled () {
      const mobile = this.mobile
      const password = this.phone.password
      const isOkPhone = /^1(3|5|6|7|8|9)[0-9]{9}$/.test(mobile)
      return !(isOkPhone && password !== '')
    }
  },
  methods: {
    showCodeLoginFn () {
      this.showCodeLogin = !this.showCodeLogin
    },
    openLoginDialog () {
      // this.$refs.refLogin.show()
      var animation = uni.createAnimation({
        duration: 400,
        timingFunction: 'ease'
      })
      animation.translateX(0).step()
      this.animationData = animation.export()
    },
    cancelLoginDialog () {
      // this.$refs.refLogin.close()
      var animation = uni.createAnimation({
        duration: 400,
        timingFunction: 'ease'
      })
      animation.translateX(this.systemInfo.windowWidth).step()
      this.animationData = animation.export()
    },
    goBack () {
      uni.navigateBack({
        delta: 1
      })
    },
    setStatusFunc () {
      this.status = 3
      this.loginStatus = 3
    },
    setData (from) {
      this.froms = from
    },
    sendCode () {
      const mobile = this.mobile
      if (mobile === '' || !mobile) {
        return error('请先填入手机号')
      }
      if (this.countdownStatus) return
      // this.countdownStatus=true;
      return getSmsCode({ mobile })
        .then(() => toast('发送短信成功', 'success'))
        .then(() => this.startCountdown()).catch(() => {
          modal('发送短信失败')
        })
    },
    async codeSendVerification (status) {
      // 发送验证码并设置 status（更新页面）
      if (!status) throw '请传入 status'
      await this.sendCode()
      // 只有发送验证码成功了，才是
      if (this.countdownStatus) this.status = status
    },
    againSendCode () {
      if (!this.countdownStatus) this.sendCode()
    },
    substr (event) {
      this.verificationCode = event.target.value
    },
    fillCode (event) {
      const _self = this
      // 填写验证码
      // this.substr();
      this.verificationCode = event.target.value
      if (this.verificationCode.length === 4) {
        this.login(null, function () {
          _self.verificationCode = ''
        })
      }
    },
    /**
     * 可以加两个回调
     * @param scall
     * @param ecall
     * @return {Promise<void>}
     */
    async login (scall, ecall) {
      // 登录 - 多个地方用了

      if (this.loginStatus === 1) {
        // 短信登录
        await login({
          mobile: this.mobile,
          captcha: this.verificationCode,
          login_method: 'sms_login'
        }).then(res => {
          // 么有自定义回调，就默认的额
          !scall && this.loginCall(res.data)
          scall && scall()
        }).catch((e) => {
          error(e.msg)
          ecall && ecall()
        })
      } else if (this.loginStatus === 2) {
        // 账号密码登录
        await login({
          mobile: this.mobile,
          passwd: this.phone.password,
          login_method: 'mobile_login'
        }).then(res => {
          this.loginCall(res.data)
        }
        ).catch((e) => {
          error(e.msg)
        })
      } else if (this.loginStatus === 3) {
        // 找回密码
        // await login({mobile:this.mobile, captcha:this.verificationCode,login_method:'sms_login'})
      }
    },
    setNewPassOk () {
      // const data = {
      //   mobile: this.mobile,
      //   code: this.verificationCode,
      //   newpwd: this.newPassword
      // }
      // resetPwd(data).then(res => {
      //   toast(res.msg)
      //   confirm({
      //     content: '密码设置成功，是否直接登录？',
      //     confirmText: '直接登录',
      //     cancelText: '暂不登录'
      //   }).then(() => this.login())
      // })
    },
    startCountdown () {
      // 倒计时
      this.countdownStatus = true
      const countdownInterval = setInterval(() => {
        if (this.countdownNum > 0) {
          this.countdownNum--
        } else {
          clearInterval(countdownInterval)
          this.countdownNum = 60
          this.countdownStatus = false
        }
      }, 1000)
    },
    async weixinlogin (data) {
      const _self = this

      // #ifdef H5
      const channel = data
      const REDIRECT_URI = urlencode(location.href)
      let wxAuthUrl = null
      const scope = 'snsapi_userinfo'// snsapi_userinfo //snsapi_base
      if (channel.type === 'wx_mp' && channel.component_appid) {
        // 服务商模式登录
        wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&connect_redirect=1&state=STATE&component_appid=${channel.component_appid}#wechat_redirect`
      } else {
        // 公众号自己的appid用于登录
        wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&connect_redirect=1&state=STATE#wechat_redirect`
      }
      location.replace(wxAuthUrl)
      // #endif

      // #ifdef MP-WEIXIN
      uni.login({
        fail: (err) => {
          uni.showModal({
            title: '登录失败',
            content: '获取code失败' + JSON.stringify(err)
          })
        },
        success: function (loginRes) {
          const CODE = loginRes.code
          // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
          wx.getSetting({
            fail: (err) => {
              uni.showModal({
                title: '未获得获取用户信息权限',
                content: JSON.stringify(err)
              })
            },
            success: (res) => {
              // 未获得用户信息权限,需要让用户授权
              if (!res.authSetting['scope.userInfo']) {
                wx.authorize({
                  scope: 'scope.userInfo',
                  fail: (err) => {
                    uni.showModal({
                      title: '请点击授权登录',
                      content: JSON.stringify(err)
                    })
                  },
                  success (res) {
                    let userInfoData = null
                    wx.getUserInfo({
                      lang: 'zh_CN',
                      success: function (val) {
                        userInfoData = val
                        userInfoData.rawData = JSON.parse(userInfoData.rawData)
                        login({
                          code: CODE,
                          login_method: 'wx_lp',
                          lp_raw_data: JSON.stringify(userInfoData)
                        }, { tip: '登录中' }).then(ret => {
                          if (ret.errorCode === 0) {
                            _self.loginCall(ret.data)
                          }
                        }).catch(err => {
                          modal(err.msg)
                        })
                      }
                    })
                  }
                })
              } else {
                let userInfoData = null
                wx.getUserInfo({
                  lang: 'zh_CN',
                  success: function (val) {
                    userInfoData = { ...val }

                    userInfoData.rawData = JSON.parse(userInfoData.rawData)
                    login({
                      code: CODE,
                      login_method: 'wx_lp',
                      lp_raw_data: JSON.stringify(userInfoData)
                    }, { tip: '登录中' }).then(ret => {
                      if (ret.errorCode === 0) {
                        _self.loginCall(ret.data)
                      }
                    }).catch(err => {
                      modal(err.msg)
                    })
                  }
                })

                // error('请点击授权登录2')
              }
            }
          })
        }
      })
      // #endif
      // #ifdef APP-PLUS
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          login({ login_method: 'wx_app', ...loginRes.authResult }).then(res => {
            _self.loginCall(res.data)
          }).catch(e => {
          })
        }
      })
      // #endif
    },
    async initDataFn () {
      // #ifdef H5
      this.isShowWeiXin = isWeiXin()
      // #endif
      const initData = await this.getInitData(1)
      const login_methods = initData.login_methods
      const component_appid = login_methods.component_appid
      this.channels = []
      // 根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
      // 而且状态可以灵活控制 state为1
      for (var i in login_methods) {
        // && login_methods[i].state ??状态呢？
        if (i !== 'component_appid' && login_methods[i].state) {
          this.channels.push(['wx_mp', 'wx_lp'].indexOf(login_methods[i].type) === -1 ? { ...login_methods[i] } : { ...login_methods[i], component_appid })
        }
      }

      // 如果channels长度为0，则
      if (this.channels.length < 1) {
        this.showCodeLogin = true

        // #ifdef H5
        this.isShowWeiXin = false
        // #endif
      }
    },
    async loginCall (userData) {
      // 根据后台配置来判断是否无手机号跳去绑定手机号
      const isBindPhone = Number(this.initData.bind_mobile_switch) === 1

      console.log(isBindPhone, userData)
      if (isBindPhone && userData && !userData.User_Mobile) {
        console.log(objTranslate(userData))
        // ls.set('accessToken', userData.access_token, 1)
        // ls.set('user_id', userData.User_ID, 1)
        uni.redirectTo({
          url: '/pagesA/person/updateUserPsw?type=3&user_id=' + userData.User_ID+'&accessToken='+userData.access_token
        })
      } else {
        this.setUserInfo(userData)
        ls.set('access_token', userData.access_token, 1)
        // #ifdef APP-PLUS
        // 注册设备
        const clientid = ls.get('user_client_id')
        if (clientid) {
          await bindUserClientId({
            uuid: clientid,
            action: 'save'
          }, { errtip: false }).then(res => {
          }).catch(() => {})
        }
        // #endif
        // 手动绑定一下
        await upUserLog({}, { errtip: false }).then(res => {
          // #ifdef H5
          sessionStorage.setItem('is_send_usrlog', 1)
          // #endif
        }).catch(e => {
        })
        // #ifdef H5
        // 微信登录才这么走
        const login_farward_url = ls.get('login_farward_url')
        if (this.h5_wx_login) {
          history.go(-2)
          return
        }
        if (login_farward_url) {
          ls.remove('login_farward_url')
          ls.set('is_login_redirct', 1)
          history.go(-1)
          return
        } else {
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }
        return
        // #endif
        // eslint-disable-next-line no-unreachable
        uni.navigateBack()
      }
    },
    ...mapActions(['getInitData', 'setUserInfo'])
  },
  onLoad () {
    // #ifdef MP
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    this.systemInfo = uni.getSystemInfoSync()
    // #endif
  },
  onShow () {

  },
  created () {
    console.log('created created created')
    /** 登录也不管了 **/
    // 如果已经登录，就自动退回
    const uid = ls.get('user_id')
    const access_token = ls.get('access_token')
    if (uid && access_token) {
      console.log('已经登录过')
      // uni.navigateBack()
      return
    }

    // #ifdef H5
    if (isWeiXin()) {
      const code = GetQueryByString(location.href, 'code')
      if (code && !access_token) {
        // this.setUserInfo({})
        login({
          login_method: 'wx_mp',
          code: code
        }).then(res => {
          this.h5_wx_login = true// 标记是h5微信登录
          this.loginCall(res.data)
        }).catch(() => {
        })
        return
      }
    }
    // #endif

    // #ifndef H5
    // this.setUserInfo({})
    // #endif

    this.initDataFn()
  }
}
</script>
<style lang="scss" scoped>
  .icon-icon_mobilephonelanding {
    color: #E6A23C !important;
    font-size: 80rpx !important;
  }

  .joinForm {
    transform: translateX(100%);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    background: white;
    z-index: 3;

    .logo {
      width: 130rpx;
      margin-bottom: 90rpx;
      overflow: hidden;
    }
    .control {
      margin-top: 76rpx;
      display: flex;
      justify-content: center;

      .btn {
        width: 290rpx;
        height: 76rpx;
        padding: 0;
        line-height: 76rpx;
        border-radius: 6rpx;
        border: none;
        margin: 0;
      }

      .allow {
        background: #59a228;
        color: #fff;
        margin-left: 40rpx;
      }

      .reject {
        background: #f2f2f2;
        color: #555;
      }
    }
  }

  .icon-fanhui {
    padding-right: 4px;
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
      padding-top: 10px;
      font-size: 16px;
      font-weight: 400;
      display: flex;
      align-items: center;
      padding-left: 10px;
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
      padding: 0 15px;

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
        margin: 20px 0px 0;
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
      .title {
        margin-top: 34px;
      }

      .content {
        margin: 0 20px;
        margin-top: 54px;
        overflow: hidden;

        .submitBtn {
          margin-top: 30px;
        }

        .inputLable {
          span {
            color: $mainColor;
            width: 50px;
          }
        }
      }
    }

    .phoneContent {
      margin: 0;

      .title {
        margin-top: 34px;
      }

      .content {
        margin: 54px 20px 0;
        overflow: hidden;

        .inputLable:first-child {
          span {
            color: $mainColor;
            width: 50px;
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
        }
      }
    }

    .protocol {
      color: #999;
      font-size: 12px;
      margin-top: 20px;
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
      bottom: 60px;
      left: 0;
      /*margin: 55px 0 0;*/
      text-align: center;
      width: 100%;

      &.mp-weixin {
        .box {
          &:after,
          &:before {
            display: none;
          }
        }
      }

      .box {
        position: relative;

        &:after,
        &:before {
          position: absolute;
          content: "";
          display: block;
          height: 1px;
          top: 50%;
        }

        &:before {
          background-color: #e6e6e6;
          width: 20%;
          left: -20%;
        }

        &:after {
          background-color: #e6e6e6;
          width: 20%;
          left: 100%;
        }
      }

      .funicon {
        background-color: white;
        color: $weixinColor;
        font-size: 72rpx;
        vertical-align: top;
        display: inline-block;
      }

      /* #ifdef APP-PLUS */
      .icon-weixin {
        font-size: 88rpx;
      }

      /* #endif */
    }

    .otherLogin-top {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      width: 100%;

      .otherLogin-top-item {
        width: 630rpx;
        height: 88rpx;
        background: #59a228;
        border-radius: 4px;
        margin: 0 auto;
        text-align: center;
        line-height: 88rpx;
        color: white;
      }

      &.mp-weixin {
        .box {
          &:after,
          &:before {
            display: none;
          }
        }
      }

      .funicon {
        color: $weixinColor;
        font-size: 72rpx;
        vertical-align: top;
        display: inline-block;
      }

      /* #ifdef APP-PLUS */
      .icon-weixin {
        font-size: 88rpx;
      }

      /* #endif */
    }
  }
</style>
