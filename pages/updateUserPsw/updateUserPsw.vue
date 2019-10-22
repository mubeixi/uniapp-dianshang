<template>
	<view class="wrap" :style="{height: height + 'px'}">
		<!-- #ifdef APP-PLUS -->
		<page-title :title="title" rightHidden="true" bgcolor="#F8F8F8"></page-title>
		<!-- #endif -->
		<view v-if="type == 0" class="content">
			<input type="password" @blur="inputHandle" class="item" v-model="curr_psw" placeholder="请输入原始登录密码">
			<input type="password" @blur="inputHandle" class="item" v-model="new_psw" placeholder="请输入新的登录密码">
			<input type="password" @blur="inputHandle" class="item" v-model="check_psw" placeholder="请再次输入新密码">
		</view>
		<view v-if="type == 1" class="content">
			<input type="password" @blur="inputHandle" class="item" v-model="curr_psw" placeholder="请输入原始支付密码">
			<input type="password" @blur="inputHandle" class="item" v-model="new_psw" placeholder="请输入新的支付密码">
			<input type="password" @blur="inputHandle" class="item" v-model="check_psw" placeholder="请再次输入新密码">
		</view>
		<view class="save" @click="save">保存</view>
	</view>
</template>

<script>
	import {updateUserLoginPsw,updateUserPayPsw} from '../../common/fetch.js';
	export default {
		data() {
			return {
				type: 0,
				curr_psw: '',
				new_psw: '',
				check_psw: '',
				height: 0,
				canSubmit: true, // 用户是否可以提交
			}
		},
		methods: {
			toast(title , icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				})
			},
			inputHandle(e) {
				let value = e.detail.value;
				if(value.length<6) {
					this.toast('密码最少6位');
					this.canSubmit = false;
				}else {
					this.canSubmit = true;
				}
			},
			save(){
				if(!this.canSubmit) {return;}
				let arg = {
					curr_psw: this.curr_psw,
					new_psw: this.new_psw,
					check_psw: this.check_psw
				}
				if(arg.curr_psw == '') {
					this.toast('原始密码不能为空')
					return;
				}
				if(arg.new_psw == '') {
					this.toast('新密码不能为空');
					return;
				}
				if(arg.check_psw == '') {
					this.toast('确认密码不能为空');
					return;
				}
				if(arg.new_psw !==arg.check_psw){
					this.toast('两次密码不同');
					return;
				}
				if(this.type ==0) {
					updateUserLoginPsw(arg).then(res=>{
						if(res.errorCode == 0) {
							this.toast('修改成功','success')
						}else {
							this.toast(res.msg)
						}
					})
				}else if(this.type == 1) {
					updateUserPayPsw(arg).then(res=>{
						if(res.errorCode == 0) {
							this.toast('修改成功','success')
						}else {
							this.toast(res.msg)
						}
					})
				}
			}
		},
		onLoad(options) {
			if(options.type == 0) {
				this.title = '修改登录密码';
				this.type = 0;
			}else if(options.type == 1) {
				this.title = '修改支付密码';
				this.type = 0;
			};
			uni.setNavigationBarTitle({
				title: this.title
			});
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.height = res.screenHeight
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		width: 100%;
		background: #efefef;
	}
	.content {
		padding: 20rpx 0;
		.item {
			background: #fff;
			padding-left: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-bottom: 20rpx;
			font-size: 30rpx;
		}
	}
	.save {
		width: 90%;
		background: #F43131;
		margin: 0 auto;
		text-align: center;
		color: #fff;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
	}
</style>
