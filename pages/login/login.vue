<template>
	<div @click="commonClick" class="loginSign font16">
		<!-- #ifdef APP-PLUS-->
		<view class="status_bar" ></view>
		<!-- #endif -->
		<!-- #ifdef MP-->
		<view :style="{height:menuButtonInfo.top+'px'}" ></view>
		<!-- #endif -->
		<ul>
			<li class="codeContent" v-if="status == 1">
				<!-- #ifdef MP-WEIXIN -->
				<div  @click="goBack" class="topTitle" :style="{height:menuButtonInfo.height+'px'}">
					<view class="funicon icon icon-fanhui inline-block"></view>
					<div>登陆</div>
				</div>
				<!-- #endif -->

				<!-- #ifndef MP-WEIXIN -->
				<div  @click="goBack" class="topTitle">
					<view class="funicon icon icon-fanhui inline-block"></view>
					<div>登陆</div>
				</div>
				<!-- #endif -->

				<!-- #ifdef H5 -->
				<div class="otherLogin-top" v-if="isShowWeiXin==1 && !showCodeLogin">
					<div class="box">
						<block v-for="(channel,idx) in channels" :key="idx" >
							<div class="otherLogin-top-item" v-if="channel.type=='wx_mp'" @click="weixinlogin(channel)">
								微信登录
							</div>
						</block>
					</div>
				</div>
				<div class="otherLogin" v-show="!showCodeLogin">
					<div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
						<div class="inline-block flex1 text-center" >
							<i @click="showCodeLoginFn" v-if="!showCodeLogin" class="funicon icon-icon_mobilephonelanding"></i>
						</div>
					</div>
				</div>
				<div class="otherLogin" v-show="showCodeLogin">
					<div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
						<div class="inline-block flex1 text-center" v-for="(channel,idx) in channels" :key="idx">
							<i v-if="channel.type=='wx_mp'" @click="weixinlogin(channel)" class="funicon icon-weixin"></i>
							<i v-if="channel.type=='qq'" @click="qqlogin(channel)" style="color: #2eb1f1;font-size: 32px;margin-top: 2px" class="funicon icon-QQ1"></i>
						</div>
					</div>
				</div>
				<div class="codeLogin" v-if="!isShowWeiXin || showCodeLogin">
					<label class="inputLable flex line20">
						<span>+{{ telNum }}</span>
						<input type="number" placeholder="请输入手机号" v-model="mobile" />
					</label>
					<button type="primary" class="submitBtn sendCode" @click="codeSendVerification(4)" :disabled="isCodeDisabled">发送验证码</button>
					<div class="passwordLogin" @click="(status = 2), (loginStatus = 2)">
						使用密码登陆
					</div>
				</div>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<div class="otherLogin-top" v-if="!showCodeLogin">
					<div class="box">
						<block v-for="(channel,idx) in channels" :key="idx">
							<div class="otherLogin-top-item"  v-if="channel.type=='wx_lp'" @click="openLoginDialog">
								微信登录
							</div>
						</block>
					</div>
				</div>
				<div class="otherLogin mp-weixin" v-show="!showCodeLogin">
					<div class="box" style="margin: 0 30px;">
						<div class="inline-block flex1 text-center" >
							<i @click="showCodeLoginFn" v-if="!showCodeLogin" class="funicon icon-icon_mobilephonelanding"></i>
						</div>
					</div>
				</div>
				<div class="otherLogin mp-weixin"  v-show="showCodeLogin">
					<div class="box" style="margin: 0 30px;">
						<div class="inline-block flex1 text-center" v-for="(channel,idx) in channels" :key="idx">
							<i v-if="channel.type=='wx_lp'" @click="openLoginDialog" class="funicon icon-weixin font24" ></i>
						</div>
					</div>
				</div>
				<!-- #endif -->

				<!-- #ifdef APP-PLUS -->
				<div class="otherLogin-top" v-if="!showCodeLogin">
					<div class="box">
						<block  v-for="(channel,idx) in channels" :key="idx" >
							<div class="otherLogin-top-item" v-if="channel.type=='wx_app'" @click="weixinlogin">
								微信登录
							</div>
						</block>
					</div>
				</div>
				<div class="otherLogin" v-show="!showCodeLogin">
					<div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
						<div class="inline-block flex1 text-center">
							<i @click="showCodeLoginFn" v-if="!showCodeLogin" class="funicon icon-icon_mobilephonelanding"></i>
						</div>
					</div>
				</div>
				<div class="otherLogin" v-show="showCodeLogin">
					<div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
						<div class="inline-block flex1 text-center" v-for="(channel,idx) in channels" :key="idx">
							<div v-if="channel.type=='wx_app'" class="inline-block flex1 text-center" @click="weixinlogin"><i class="funicon icon-weixin"></i></div>
						</div>
					</div>
				</div>
				<!-- #endif -->

				<!-- #ifndef H5 -->
				<div class="codeLogin" v-if="showCodeLogin">
					<label class="inputLable flex line20">
						<span>+{{ telNum }}</span>
						<input type="number" placeholder="请输入手机号" v-model="mobile" />
					</label>
					<button type="primary" class="submitBtn sendCode" @click="codeSendVerification(4)" :disabled="isCodeDisabled">发送验证码</button>
					<div class="passwordLogin" @click="(status = 2), (loginStatus = 2)">
						使用密码登陆
					</div>
				</div>
				<!-- #endif -->
			</li>
			<li class="phoneContent" v-else-if="status == 2">
				<!-- #ifdef MP-WEIXIN -->
				<div @click="(status = 1), (loginStatus = 1)" class="topTitle"  :style="{height:menuButtonInfo.height+'px'}">
					<view  class="funicon icon icon-fanhui inline-block"></view>
					<div>手机账号登陆</div>
				</div>
				<!-- #endif -->

				<!-- #ifndef MP-WEIXIN -->
				<div @click="(status = 1), (loginStatus = 1)" class="topTitle">
					<view  class="funicon icon icon-fanhui inline-block"></view>
					<div>手机账号登陆</div>
				</div>
				<!-- #endif -->

				<div class="content">
					<label class="inputLable flex line20">
						<span>+{{ telNum }}</span>
						<input placeholder="请输入手机号" v-model="mobile" maxlength="11" />
					</label>
					<label class="inputLable  flex">
						<span style="width: 50px;">密码</span>
						<input type="password" placeholder="请输入密码" v-model="phone.password" />
					</label>
					<div class="searchPass" @click="(status = 3), (loginStatus = 3)">
						找回密码？
					</div>
					<button @click="login" type="primary" class="submitBtn sendCode" :disabled="isPhoneDisabled">登录</button>
				</div>
			</li>
			<li class="searchPassword" v-else-if="status == 3">
				<!-- #ifdef MP-WEIXIN -->
				<div @click="(status = 2), (loginStatus = 2)" class="topTitle"  :style="{height:menuButtonInfo.height+'px'}">
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
						<input type="number" placeholder="请输入手机号" v-model="mobile" maxlength="11" />
					</label>
					<button @click="codeSendVerification(4)" type="primary" class="submitBtn" :disabled="isCodeDisabled">发送验证码</button>
				</div>
			</li>
			<li class="fillCode" v-else-if="status == 4">
				<!-- #ifdef MP-WEIXIN -->
				<div class="topTitle"  :style="{height:menuButtonInfo.height+'px'}">
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
				<input type="number" v-if="loginStatus !== 3 && loginStatus !== 4" :value="verificationCode" class="code" @input="fillCode" />
				<div class="searchNewPass editSearchPassword" v-if="loginStatus === 3">
					<label class="inputLable flex line20">
						<span>验证码</span>
						<input class="ins" type="text" placeholder="请输入验证码" :value="verificationCode" @input="substr" />
					</label>
					<label class="inputLable flex">
						<span>新密码</span><input class="ins" type="password" placeholder="请输入新密码" v-model="newPassword" />
					</label>
					<button @click="setNewPassOk" type="primary" class="submitBtn" :disabled="isNewPassDisabled">完成</button>
				</div>
			</li>
			<li class="setNewPass" v-else-if="status == 5">
				<!-- #ifdef MP-WEIXIN -->
				<div class="topTitle"  :style="{height:menuButtonInfo.height+'px'}">
					<view @click="setStatusFunc" class="funicon icon icon-fanhui inline-block prebBtn"></view>设置新密码
				</div>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<div class="topTitle">
					<view @click="setStatusFunc" class="funicon icon icon-fanhui inline-block prebBtn"></view>设置新密码
				</div>
				<!-- #endif -->
				<div class="content">
					<label class="inputLable flex lin20">
						<span>密码</span>
						<input type="password" placeholder="请输入新密码" v-model="newPassword" />
					</label>
					<button @click="setNewPassOk" type="primary" class="submitBtn sendCode" :disabled="isNewPassDisabled">完成</button>
				</div>
			</li>
		</ul>
		<!-- #ifdef MP-WEIXIN -->
		<div :animation="animationData" id="joinForm"  class="joinForm text-center" >
			<view :style="{height:menuButtonInfo.top+'px'}" ></view>
			<div @click="cancelLoginDialog" class="topTitle" :style="{height:menuButtonInfo.height+'px'}">
				<view  class="funicon icon icon-fanhui inline-block"></view>
				<div>返回</div>
			</div>
			<image :style="{marginTop:85+'px'}" mode="widthFix" class="logo" :src="initData.ShopLogo"></image>
			<div class="large line15 font20">「{{initData.ShopName}}」申请获得以下权限</div>
			<div class="mini graytext2 font14">获得你的公开信息（昵称、头像、地区等）</div>
			<div class="control">
				<button @click="cancelLoginDialog" class="btn reject">拒绝</button>
				<button open-type="getUserInfo" @getuserinfo="weixinlogin" class="btn allow">允许</button>
			</div>
		</div>
		<!-- #endif -->
	</div>
</template>
<script>
	// import telData from "../../common/tool/tel";
	// #ifdef H5
	import wx from "weixin-js-sdk";
	// #endif
	import {
		GetQueryByString,ls,isWeiXin, urlencode
	} from "../../common/tool";
	// #ifdef APP-PLUS
	import {bindUserClientId} from "../../common/fetch";
	// #endif
	import {
		login,getSmsCode,upUserLog
	} from "../../common/fetch";
	import {
		toast,
		confirm,
		error
	} from "../../common";
	import {
		mapGetters,
		mapActions,
		Store
	} from "vuex";
	import {
		pageMixin
	} from "../../common/mixin";
	export default {
		mixins: [pageMixin],
		data() {
			return {
				animationData: {},
				menuButtonInfo: {height:0,top:0},
				systemInfo: {},
				showCodeLogin:false,
				h5_wx_login:false,
				refreshInit:false,
				channels:[],
				froms: '', //跳转过来的路由
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
					//data: telData,
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
				isShowWeiXin: 0
			};
		},
		computed: {
			...mapGetters([
				'userInfo','initData'
			]),
			hasVisibleIcon() {
				return this.phone.inputType ? "iconyanjing" : "iconyanjing1";
			},
			telNum() {
				return this.tel.model.split(" ")[1];
			},
			// telData() {
			// 	return this.tel.data.map(v => {
			// 		return `${v.name} ${v.tel}`;
			// 	});
			// },
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
			showCodeLoginFn(){
				this.showCodeLogin = !this.showCodeLogin
			},
			openLoginDialog(){
				//this.$refs.refLogin.show()
				var animation = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				animation.translateX(0).step()
				this.animationData = animation.export()
			},
			cancelLoginDialog(){
				//this.$refs.refLogin.close()
				var animation = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				animation.translateX(this.systemInfo.windowWidth).step()
				this.animationData = animation.export()
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			setStatusFunc(){
				this.status = 3
				this.loginStatus = 3
			},
			setData(from) {
				this.froms = from;
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
					return error("请先填入手机号");
				let event = undefined;
				if(this.countdownStatus)return;
				//this.countdownStatus=true;
				return getSmsCode({mobile})
						.then(() => toast("发送短信成功",'success'))
						.then(() => this.startCountdown());
			},
			async codeSendVerification(status) {
				// 发送验证码并设置 status（更新页面）
				if (!status) throw "请传入 status";
				await this.sendCode();
				//只有发送验证码成功了，才是
				if(this.countdownStatus)this.status = status;
			},
			againSendCode() {
				if (!this.countdownStatus) this.sendCode();
			},
			substr(event) {
				this.verificationCode = event.target.value;
			},
			fillCode(event) {
				let _self = this;
				//填写验证码
				//this.substr();
				this.verificationCode = event.target.value
				if (this.verificationCode.length == 4){
					this.login(null,function () {
						_self.verificationCode = ''
					});
				}
			},
			/**
			 * 可以加两个回调
			 * @param scall
			 * @param ecall
			 * @return {Promise<void>}
			 */
			async login(scall,ecall) {
				//登录 - 多个地方用了
				//console.log(this.fromId, "这是fromId");
				if (this.loginStatus === 1) {
					// 短信登录
					await login({mobile:this.mobile, captcha:this.verificationCode,login_method:'sms_login'}).then(res =>
					{
						if(res.errorCode === 0){
							//么有自定义回调，就默认的额
							!scall && this.loginCall(res.data)
							scall && scall()
						}else{
							ecall && ecall()
						}
					}).catch(e=>{ecall && ecall()})
				} else if (this.loginStatus === 2) {
					// 账号密码登录
					await login({mobile:this.mobile,passwd:this.phone.password,login_method:'mobile_login'}).then(res =>
							{
								if(res.errorCode === 0) {
									this.loginCall(res.data)
								}
							}
					);
				} else if (this.loginStatus === 3) {
					// 找回密码
					// await login({mobile:this.mobile, captcha:this.verificationCode,login_method:'sms_login'})
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
						content: "密码设置成功，是否直接登录？",
						confirmText: "直接登录",
						cancelText: "暂不登录"
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
			async weixinlogin(data) {
				let _self = this;
				// #ifdef H5
				let channel = data;
				let REDIRECT_URI = urlencode(location.href);
				let wxAuthUrl = null;
				let scope = 'snsapi_userinfo';//snsapi_userinfo //snsapi_base
				if(channel.type=='wx_mp' && channel.component_appid){
					//服务商模式登录
					wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&connect_redirect=1&state=STATE&component_appid=${channel.component_appid}#wechat_redirect`;
				}else{
					//公众号自己的appid用于登录
					wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&connect_redirect=1&state=STATE#wechat_redirect`
				}
				location.replace(wxAuthUrl)
				// #endif
				// #ifdef MP-WEIXIN
				uni.login({
					fail:(err)=>{
						uni.showModal({
							title:'登录失败',
							content:'获取code失败'+JSON.stringify(err)
						})
					},
					success: function (loginRes) {
						console.log(loginRes);
						let CODE = loginRes.code
						// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
						wx.getSetting({
							fail: (err) => {
								uni.showModal({
									title:'未获得获取用户信息权限',
									content:JSON.stringify(err)
								})
							},
							success:(res)=>{
								//未获得用户信息权限,需要让用户授权
								if (!res.authSetting['scope.userInfo']) {
									wx.authorize({
										scope: 'scope.userInfo',
										fail: (err) => {
											uni.showModal({
												title:'请点击授权登录',
												content:JSON.stringify(err)
											})
										},
										success (res) {
											console.log('权限校验成功',JSON.stringify(res))
											let userInfoData = null;
											wx.getUserInfo({
												lang:'zh_CN',
												success:function (val) {
													console.log('userInfoData data is ',userInfoData)
													userInfoData = val;
													userInfoData.rawData = JSON.parse(userInfoData.rawData)
													login({code:CODE,login_method:'wx_lp',lp_raw_data:JSON.stringify(userInfoData)},{tip:'登录中'}).then(ret=>{
														if(ret.errorCode === 0){
															_self.loginCall(ret.data)
														}
													}).catch(err=>{})
												}
											})
										}
									})
								}else{
									console.log('已经有授权，直接获取用户信息')
									let userInfoData = null;
									wx.getUserInfo({
										lang:'zh_CN',
										success:function (val) {
											console.log(val)
											userInfoData = {...val}
											console.log('userInfoData data is ',userInfoData)
											userInfoData.rawData = JSON.parse(userInfoData.rawData)
											login({code:CODE,login_method:'wx_lp',lp_raw_data:JSON.stringify(userInfoData)},{tip:'登录中'}).then(ret=>{
												if(ret.errorCode === 0){
													_self.loginCall(ret.data)
												}
											}).catch(err=>{})
										}
									})
									//console.log(res)
									//error('请点击授权登录2')
								}
							}
						})
					}
				});
				// #endif
				// #ifdef APP-PLUS
				uni.login({
					provider: 'weixin',
					success: function (loginRes) {
						login({login_method:'wx_app',...loginRes.authResult}).then(res=>{
							console.log('wx app login result is ',JSON.stringify(res))
							_self.loginCall(res.data)
						}).catch(e=>{
						})
						// uni.showModal({
						// 	titile:'微信登录信息',
						// content:JSON.stringify(loginRes.authResult)
						// })
						console.log(JSON.stringify(loginRes.authResult));
					}
				});
				// #endif
			},
			async initDataFn() {
				// #ifdef H5
				this.isShowWeiXin = isWeiXin()
				// #endif
				let initData = await this.getInitData(1)
				let login_methods = initData.login_methods;
				let component_appid = login_methods.component_appid
				this.channels = []
				//根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
				//而且状态可以灵活控制 state为1
				for(var i in login_methods){
					// && login_methods[i].state ??状态呢？
					if(i!='component_appid' && login_methods[i].state){
						this.channels.push(['wx_mp','wx_lp'].indexOf(login_methods[i].type)===-1?{...login_methods[i]}:{...login_methods[i],component_appid})
					}
				}
				console.log('login channels is',this.channels)
				
				//如果channels长度为0，则
				if(this.channels.length<1){
					this.showCodeLogin = true
					
					// #ifdef H5
					this.isShowWeiXin = false
					// #endif
					
				}
			},
			async loginCall(userData){
				console.log('userDatauserDatauserDatauserData',userData)
				this.setUserInfo(userData);
				ls.set("access_token",userData.access_token,1);
				// #ifdef APP-PLUS
				//注册设备
				let clientid = ls.get('user_client_id')
				if(clientid){
					console.log("注册设备",clientid,userData)
					await bindUserClientId({uuid:clientid,action:'save'},{errtip:false}).then(res=>{console.log('注册设备成功')},err=>{}).catch(error=>{})
				}
				// #endif
				//手动绑定一下
				await upUserLog({},{errtip:false}).then(res=>{
					// #ifdef H5
					sessionStorage.setItem('is_send_usrlog',1)
					// #endif
				},err=>{console.log('error',err)}).catch(e=>{console.log('catch',e)})
				// #ifdef H5
				//微信登录才这么走
				let login_farward_url = ls.get('login_farward_url');
				console.log('好好后退一下',this.h5_wx_login)
				if(this.h5_wx_login){
					history.go(-2);
					return;
				}
				if(login_farward_url){
					ls.remove('login_farward_url');
					ls.set('is_login_redirct',1)
					history.go(-1);
					return;
				}else{
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
				return;
				// #endif
				uni.navigateBack()
			},
			...mapActions(["getInitData", "setUserInfo"]),
		},
		onLoad(){
			// #ifdef MP
			this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.systemInfo = uni.getSystemInfoSync()
			// #endif

		},
		onShow(){
			//如果已经登录，就自动退回
			let uid = ls.get('user_id'),access_token = ls.get('access_token')
			if(uid && access_token){
				uni.navigateBack()
				return;
			}
			
			// #ifdef H5
			if (isWeiXin()) {
				let code = GetQueryByString(location.href, 'code');
				if (code && !access_token) {
					this.setUserInfo({});
					console.log('code is'+code)
					login({
						login_method: 'wx_mp',
						code: code
					}).then(res => {
						console.log(JSON.stringify(res))
						if(res.errorCode === 0){
							this.h5_wx_login = true;//标记是h5微信登录
							this.loginCall(res.data)
						}
					})
					return;
				}
			}
			// #endif
			// #ifndef H5
			this.setUserInfo({});
			// #endif
			this.initDataFn();
		},
		created() {}
	};
</script>
<style scoped lang="scss">
	.icon-icon_mobilephonelanding{
		color: #E6A23C !important;
		font-size: 80rpx !important;
	}
	.joinForm{
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
		.logo{
			width: 130rpx;
			margin-bottom: 90rpx;
			overflow: hidden;
		}
		/*.logo2{*/
		/*	width: 218rpx;*/
		/*	height: 58rpx;*/
		/*	margin-bottom: 90rpx;*/
		/*}*/
		.control{
			margin-top: 76rpx;
			display: flex;
			justify-content: center;
			.btn{
				width: 290rpx;
				height: 76rpx;
				padding: 0;
				line-height: 76rpx;
				border-radius: 6rpx;
				border: none;
				margin: 0;
			}
			.allow{
				background: #59a228;
				color: #fff;
				margin-left: 40rpx;
			}
			.reject{
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
				font-size: 72upx;
				vertical-align: top;
				display: inline-block;
			}
			/* #ifdef APP-PLUS */
			.icon-weixin{
				font-size: 88upx;
			}
			/* #endif */
		}
		.otherLogin-top {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			text-align: center;
			width: 100%;
			.otherLogin-top-item{
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
				font-size: 72upx;
				vertical-align: top;
				display: inline-block;
			}
			/* #ifdef APP-PLUS */
			.icon-weixin{
				font-size: 88upx;
			}
			/* #endif */
		}
	}
</style>
