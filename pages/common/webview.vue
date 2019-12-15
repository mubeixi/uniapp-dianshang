<template>
	<web-view v-if="url" :src="url"></web-view>
</template>

<script>
	export default {
		data(){
			return {
				url:''
			}
		},
		onLoad(options){
			this.url = options.url
			console.log('url is',this.url)
		}
	}
</script>

<style>
</style>
