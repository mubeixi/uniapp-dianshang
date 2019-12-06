<template>
    <view class="wrap">
		<view class="area-item" >
			<text class="area-label">开始时间</text>
			<picker class="pickerView" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangeStart">
				<view class="uni-inputs" v-if="dateValue">{{dateValue}}</view>
				<view class="uni-input" v-if="!dateValue">请选择开始时间</view>
				<image class="rightImg" src="https://new401.bafangka.com/static/client/right.png" ></image>
			</picker>
			
		</view>
		
		<view class="area-item"  >
			<text class="area-label">结束时间</text>
			<picker class="pickerView" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChangeEnd">
				<view class="uni-inputs" v-if="dateValues">{{dateValues}}</view>
				<view class="uni-input" v-if="!dateValues">请选择结束时间</view>
				<image class="rightImg" src="https://new401.bafangka.com/static/client/right.png" ></image>
			</picker>	
		</view>
		
		<view class="viewButoon">
			<view class="button">
				搜索
			</view>
			<view class="msg">
				历史结算
			</view>
		</view>
		
    </view>
</template>

<script>
 
    //import {userStoreApply} from '../../common/fetch.js'
    export default {
        data() {
			const currentDate = this.getDate({
			         format: true
			})
            return {
				dateValue:'',//开始时间
				dateValues:'',//结束时间
            }
        },
        onLoad: function(){

        },
        methods: {
			bindDateChangeEnd(e){
				this.dateValues=e.target.value
				let d=new Date(this.dateValues)
				let c=new Date(this.dateValue)
				console.log(d>c,"sss")
			},
			bindDateChangeStart(e){
				this.dateValue=e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
        }
    }
</script>

<style lang="scss" scoped>
	.wrap{
		background-color: #FFFFFF;
		min-height: 100vh;
	}
	.area-item {
		display: flex;
		align-items: center;
		height: 120rpx;
		border-bottom: 1px solid #EBEBEB;
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #333333;
		position: relative;
		width: 710rpx;
		box-sizing: border-box;
		.area-label {
			display: inline-block;
			width: 140rpx;
			margin-right: 10rpx;
		}
		.pickerView{
			width: 570rpx;
			height: 120rpx;
			line-height: 120rpx;
		}
		.uni-input{
			color: #CAC8C8;
		}
		.uni-inputs{
			color: #333333;
		}
		.rightImg{
			width: 18rpx;
			height: 28rpx;
			position: absolute;
			top: 48rpx;
			right: 10rpx;
		}
	}
	.viewButoon{
		margin: 0 auto;
		margin-top: 110rpx;
		width:660rpx;
	}
	.button{
		width:660rpx;
		height:76rpx;
		text-align: center;
		line-height: 76rpx;
		background-color:$wzw-primary-color;
		border-radius:10rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
	.msg{
		float: right;
		margin-top: 18rpx;
		font-size: 24rpx;
		color: #888888;
	}
</style>
