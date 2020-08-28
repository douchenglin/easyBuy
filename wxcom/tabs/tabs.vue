<template name="tabs">
	<view class="tabs">
		<text :class="{'tab':true,'active':code==item.code}" v-for="item in list" :key="item.name"  @click="changeTab(item.code)">{{item.name}}</text>
	</view>
</template>

<script>
	export default {
		name: "tabs",
		data() {
			return {
				code:this.tabCode
			}
		},
		props: {
			//tab数据
			list: {
				type: Array,
				value: []
			},
			//tab默认中项
			tabCode: {
				type: Number,
				value: null
			},
		},
		mounted(){
			// console.log(this.code)
		},
		methods: {
			changeTab(code){
				this.code = code
				this.$emit('change', {code: code,})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tabs {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.tab{
			padding:20rpx 0;
			border-bottom:2px solid #fff;
		}
		.active{
			color:#B7781B;
			border-bottom:2px solid #B7781B;
		}
	}
</style>
