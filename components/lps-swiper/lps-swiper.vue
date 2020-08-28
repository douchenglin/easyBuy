<template>
	<view class="my-plan-style">
		<!-- 3D轮播 -->
		<view class="">
			<!-- autoplay -->
			<swiper 
				class="imageContainer" 
				@change="handleChange" 
				@transition = "TouchSlide"
				previous-margin="0rpx" 
				next-margin="270rpx" 
				circular
				:easing-function = "easingType"
			>
				<block v-for="(item,index) in imgList" :key="index">
					<swiper-item class="swiperitem">
						<image :class="currentIndex == index ? 'swiperactive': 'itemImg'" :src="item.imgUrl" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
			<view class="pointbox">
				<block v-for="(item,index) in imgList" :key="index">
					<view class="point" :class="currentIndex == index ? 'pointactive': ''"></view>
				</block>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'swiper-bar',
		props: {
			/**
			 * 固定到页面顶部
			 */
			imgList: {
				type: Array,
				default: () => []

			},
			isPoint: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				easingType:'linear',
				currentIndex: 0
			};
		},
		computed: {

		},
		methods: {
			handleChange(e) {
				this.currentIndex = e.detail.current;
			},
			TouchSlide(env){
				console.log(env.detail.dx)
			}
		}
	}
</script>
<style lang="scss">
	.my-plan-style {
		height: 520rpx;
	}

	.pointbox {
		height: 40upx;
		line-height: 40upx;
		margin-top: 19upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.point {
		width: 8px;
		height: 8px;
		background: #E9E9E9;
		border-radius: 50%;
		margin-left: 20upx;
		align-self: center;
	}

	.pointactive {
		width: 8px;
		height: 8px;
		background: #B7781B;
		border-radius: 50%;
		margin-left: 20upx;
		align-self: center;
	}

	// 3D轮播样式
	.imageContainer {
		width: 100%;
		height: 450rpx;
		padding-top: 54rpx;
	}

	.swiperitem {
		width: 480rpx;
		height: 420rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 100;
		.swiperText {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 56upx;
			left: 51upx;
			z-index: 998;
			width: 162upx;
			height: 163upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 8upx;
			padding: 10upx;

			.name {
				font-size: 26upx;
				font-weight: 500;
				color: rgba(253, 57, 91, 1);
				line-height: 37upx;
				margin-bottom: 10upx;
			}

			.zq,
			.cz {
				font-size: 20upx;
				color: rgba(253, 57, 91, 1);
				line-height: 35upx;
			}

			.addNl {
				width: 120upx;
				height: 26upx;
				background: rgba(253, 57, 91, 1);
				border-radius: 13upx;
				font-size: 20upx;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				line-height: 26upx;
				margin-top: 10upx;
			}

		}
	}

	.itemImg {
		position: absolute;
		width: 342rpx;
		/* height: 380rpx; */
		height: 300rpx;
		border-radius: 15rpx;
		z-index: 5;
		opacity: 0.7;
		left:-15%;
		top: 8%;
		box-shadow: 0px 4upx 15upx 0px rgba(153, 153, 153, 0.24);
	}

	.swiperactive {
		opacity: 1;
		z-index: 10;
		width: 95%;
		width: 480rpx;
		/* height: 380rpx; */
		height: 420rpx;
		top: 0%;
		transition: all .4s ease-in 0s;
	}

	.zhankai {
		text-align: center;

		.iconfont {
			margin-left: 10upx;
		}
	}
</style>
