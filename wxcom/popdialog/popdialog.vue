<template>
	<view class = "coveBk" >
		<view class = "doalogBox">
			<view class = "doalog-title">
				<text class = "doalog-title-text">{{title}}</text>
			</view>
			<view class="dialog-content">
				<text class="dialog-content-text">{{content}}</text>
			</view>
			<view class = "dialog-botton">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				value:""
			},
			content:{
				type:String,
				value:""
			},
			show:{
				type:Boolean,
				value:false
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.coveBk{
	position: fixed;
	width:100%;
	height:100%;
	z-index: 100;
	background: rgba($color: #000000, $alpha: 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	.doalogBox{
		width:540rpx;
		height:312rpx;
		background:#fff;
		border-radius: 24rpx;
		position: relative;
		.doalog-title{
			text-align: center;
			font-size:32rpx;
			font-weight: bold;
			line-height:110rpx;
		}
		.dialog-content{
			padding-left:44rpx;
			padding-right:44rpx;
			font-size:32rpx;
			line-height:48rpx;
			height:96rpx;
			overflow: hidden;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical; 
			-webkit-line-clamp: 2;
			color:#999;
		}
		.dialog-botton{
			height:88rpx;
			width:100%;
			border-top:solid 2rpx #D8D8D8;
			position: absolute;
			bottom:0rpx;
			border-bottom-left-radius: 24rpx;
			border-bottom-right-radius: 24rpx;
			overflow: hidden;
		}
	}
}
</style>
