<template>
	<view>
		<div class="margin15">
			<button @click="logoutFunc" type="warn">退出登录</button>
		</div>

	</view>
</template>

<script>
	import {confirm} from "../../common";
	import {ls} from "../../common/tool";

	export default {
		data() {
			return {

			};
		},
		methods:{
			logoutFunc(){
				confirm({title:'操作提示',content:'是否退出登录'}).then(res=>{

					//只需要商户id

					let users_id = ls.get('users_id');
					ls.clear();
					ls.set('users_id',users_id);

					uni.switchTab({
						url:'/pages/index/index'
					})

				}).catch(()=>{

				})
			}
		}
	}
</script>

<style lang="less">

</style>
