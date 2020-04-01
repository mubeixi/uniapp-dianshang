<template>
	<view >
		<!--:animation="animationStr"-->
		<view @tap="ableClose" @touchmove.stop.prevent class="popup-layer"  :style="_mask" ></view>
		<view ref="popRef" class="popup-content"   @tap.stop="stopEvent" :style="_location">
			<slot></slot>
			<div class="safearea-box2"></div>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'popup-layer',
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			showPop:{
				type:Boolean,
				default:false,
			},
			direction: {
				type: String,
				default: 'bottom', // 方向  top，bottom，left，right
			},
			autoClose: {
				type: Boolean,
				default: true,
			},
			bottomHeight: {
				type: Number || string,
				default: 0
			}
		},
		data() {
			return {
				animationStr:'',
				ifshow: false, // 是否展示,
				translateValue: -100, // 位移距离
				timer: null,
				iftoggle: false,

			};
		},
		computed: {
			_mask(){


				const obj = {
					show: 'top:0;opacity:0.7',
					hide: 'top:100%;opacity:0',//opacity:0;top:100%
				};
				return this.ifshow?obj.show:obj.hide
			},
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
				if(this.ifshow){
					return 'transform:translateY(0%);';//'transform:translateY(100%);';
				}else{
					return 'transform: translateY(100%);'
				}
				// const positionValue = {
				// 	'top': `bottom:${this.bottomHeight}px;width:100%;`,
				// 	'bottom': 'top:0px;width:100%;',
				// 	'left': 'right:0px;height:100%;',
				// 	'right': 'left:0px;height:100%;',
				// };
				// return positionValue[this.direction] + this._translate;
			}
		},
		mounted(){
			if(this.showPop){

				this.show();
			}
		},
		watch:{
			showPop(value){

				if(value){
					this.show();
				}else{
					this.close();
				}
			}
		},
		methods: {
			//渐入，渐出实现
			show : function(opacity){
				var animation = wx.createAnimation({
					//持续时间800ms
					duration:600,
					timingFunction: 'ease',
				});
				//var animation = this.animation
				animation.opacity(opacity).step()
				return animation.export()
				//将param转换为key
				// var json = '{"' + param + '":""}'
				// json = JSON.parse(json);
				// json[param] = animation.export()
				// //设置动画
				// that.setData(json)
			},

			//滑动渐入渐出
			slideupshow:function(px,opacity){


				var animation = wx.createAnimation({
					duration: 800,
					timingFunction: 'linear',
				});
				animation.translateY(px).opacity(opacity).step();
				return animation.export();
				//将param转换为key
				// var json = '{"' + param + '":""}'
				// json = JSON.parse(json);
				// json[param] = animation.export()
				// //设置动画
				// that.setData(json)
			},

			//向右滑动渐入渐出
			// sliderightshow: function (that,px, opacity) {
			// 	var animation = wx.createAnimation({
			// 		duration: 400,
			// 		timingFunction: 'ease',
			// 	});
			// 	animation.translateX(px).opacity(opacity).step();
			// 	return animation.export();
			// 	// //将param转换为key
			// 	// var json = '{"' + param + '":""}'
			// 	// json = JSON.parse(json);
			// 	// json[param] = animation.export()
			// 	// //设置动画
			// 	// that.setData(json)
			// },
			stopMove(event){

				return;
			},
			show(events) {

				const { windowHeight } = uni.getSystemInfoSync();

				this.animationStr = this.slideupshow(`-${windowHeight}px`,0.6)

				let _open = setTimeout(() => {
					this.ifshow = true;
					this.translateValue = 0;

					_open = null;
				}, 100)
				let _toggle = setTimeout(() => {
					this.iftoggle = true;
					_toggle = null;
				}, 300);
			},
			close() {

				if (this.timer !== null || !this.iftoggle) {
					return;
				}

				//const { windowHeight } = uni.getSystemInfoSync();
				this.animationStr = this.slideupshow('0px',0)
				this.timer = setTimeout(() => {
					this.translateValue = -100;
					this.ifshow = false;
					this.timer = null;
					this.iftoggle = false;
					this.$emit('closeCallBack', null);
					this.$emit('change',false)
				}, 100);
			},
			ableClose() {
				if (this.autoClose) {
					this.close();
				}
				this.$emit('maskClicked',true);
			},
			stopEvent(event) {},
			doSome(){

			}

		}
	}
</script>

<style scoped lang="scss">
	.popup-layer {
		position: fixed;
		z-index: 999999;
		background: rgba(0, 0, 0,1);
		width: 100%;
		height:100%;
		left: 0px;
		top:100%;
		opacity: 0;
		transition: all .2s linear;
	}

	.popup-content {
		position: fixed;
		left: 0;
		bottom:0;
		width: 100%;
		transform:translateY(100%);

		z-index: 1000000;
		background: #FFFFFF;
		transition: all .2s linear;
		overflow: hidden;
		// border:1px solid red;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

	}
	.safearea-box2{
		height: constant(safe-area-inset-bottom);
		height: env(safe-area-inset-bottom);
		width: 100%;
		background: white;
	}
</style>
