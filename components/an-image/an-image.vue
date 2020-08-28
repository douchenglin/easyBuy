<template>
	<view>
		<image :src="src" :mode="mode" @error="imgError" 
			:style="'width:'+(parseInt(width)<1?parseInt(width)*100+'%':parseInt(width)+'rpx')+'; height: '+(parseInt(width)<1?parseInt(height)*100+'%':parseInt(height)+'rpx')+'; background-image: url('+alt+'); background-size:'+(parseInt(width)<1?parseInt(width)*100+'%':parseInt(width)+'rpx')+' '+(parseInt(height)<1?parseInt(height)*100+'%':parseInt(height)+'rpx')+';'">
		</image>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: '' 
			}, 
			alt: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'scaleToFill'
			},
			width: {
				type: String,
				default: '70'
			},
			height: {
				type: String,
				default: '90'
			}
		},
		data() {
			return {
				url: ''
			};
		},
		methods: {
			imgError(){
				this.url = this.alt;
			},
		}
	}
</script>

<style>

</style>
