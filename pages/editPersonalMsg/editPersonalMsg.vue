<template>
	<view>
		<page-title :title="title" rightHidden="true" bgcolor="#F8F8F8"></page-title>
		<input v-if="type == 0" type="text" v-model="User_Name" class="v_input" placeholder="在此修改" />
		<input v-if="type == 1" type="text" v-model="User_NickName" class="v_input" placeholder="在此修改" />
		<input v-if="type == 3" type="text" v-model="User_Email" class="v_input" placeholder="在此修改" />
		<input v-if="type == 4" type="text" value="" class="v_input" placeholder="在此修改" />
		<view class="save" @click="save">保存</view>
	</view>
</template>

<script>
	import {upDateUserInfo} from '../../common/fetch.js';
	import {ls} from "../../common/tool.js";
	export default {
		data() {
			return {
				type: 0,
				title: '',
				User_Name: '',
				User_NickName: '',
				User_QQ: '',
				User_Email: '',
				User_Province: '',
				User_City: '',
				User_Area: '',
				User_Tow: '',
				User_Address: ''
			}
		},
		methods: {
			getTitle(){
				switch (this.type) {
					case '0' : this.title = '修改姓名';break;
					case '1' : this.title = '修改昵称';break;
					case '3' : this.title = '修改邮箱';break;
					case '4' : this.title = '修改地址';break;
				}
			},
			save(){
				upDateUserInfo({
					User_Name: this.User_Name,
					User_NickName: this.User_NickName,
					User_Email: this.User_Email,
				}).then(res=>{
					console.log(res)
					if(res.errorCode == 0) {
						let userInfo = ls.get('userInfo');
						userInfo.User_Name = res.data.User_Name;
						userInfo.User_NickName = res.data.User_NickName;
						userInfo.User_Email = res.data.User_Email;
						ls.remove('userInfo');
						ls.set('userInfo',userInfo);
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			
		},
		onLoad(option) {
			if(option.type) {
				this.type = option.type;
				this.getTitle();
			}else {
				uni.navigateBack({
					delta: 1
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.v_input {
		border: 1px solid #efefef;
		width: 90%;
		margin: 40rpx auto;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}
	.save {
		height: 80rpx;
		width: 90%;
		line-height: 80rpx;
		color: #fff;
		background: #F43131;
		margin: 40rpx auto;
		text-align: center;
		border-radius: 10rpx;
	}
</style>
