<template>
	<view style = "padding-top:20rpx;background:#fff;">
		<view class="swiperPanel" @touchstart="startMove" @touchend="endMove">
			<view class="swiperItem" v-for="(item, index) in swiperList" :key="index" :style="{transform: itemStyle[index].transform, zIndex: itemStyle[index].zIndex, opacity: itemStyle[index].opacity}">
				<view class="children" @click = "navigator(item)">
					<image class="pic" :src="item.imgUrl"></image>
					<div class = "purchaseBox">
						<div class ="price">
							<span class = "price1">¥</span>
							<span class = "price2">{{item.itemPrice.toFixed(2)}}</span>
						</div>
						<div class = "purchase">
							<text class = "btnText">立即抢购</text>
							<text class = "iconfont icon-Video icon"></text>
						</div>
					</div>
				</view>
			</view>
			<p class = "slideItem">
				<span :class = "itemIndex == index ? 'active' : 'itemStyle'" v-for = "(item, index) in swiperList" :key = "index"></span>
			</p>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: {
				type: Array,
				value: []
			}
		},
		data() {
			return {
				slideNote: {
					x: 0,
					y: 0
				},
				itemIndex:0,
				screenWidth: 0,
				itemStyle: []
			};
		},
		created() {
			var macInfo = uni.getSystemInfoSync();
			this.screenWidth = macInfo.screenWidth;
			// 计算swiper样式
			this.swiperList.forEach((item, index) => {
				let arr = this.getStyle(index)
				arr.index = index
				this.itemStyle.push(arr)
			})
			let arrLength = this.swiperList.length
			this.itemStyle.forEach((it,ix)=>{
				it.index = arrLength-ix-1
			})
		},
		methods: {
			navigator(item){
				let data = {
					isEffect:item.isEffect,
					type:'4',
					value:item.value,
					activityValue:item.activityValue,
					laber:item.labelName
				}
				this.$emit('jumpData',data)
			},
			getStyle(e) {
				if (e > this.swiperList.length / 2) {
					var right = this.swiperList.length - e
					return {
						transform: 'scale(' + (1 - right / 7) + ') translate(-' + (right * 30) + '%,0px)',
						zIndex: 9999 - right,
						opacity: 0
					}
				} else {
					return {
						transform: 'scale(' + (1 - e / 6) + ') translate(' + (e * 80) + '%,0px)',
						zIndex: 9999 - e,
						opacity: 1
					}
				}
			},
			startMove(e) {
				console.log(e)
				this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			endMove(e) {
				var newList = JSON.parse(JSON.stringify(this.itemStyle))
				if (Math.abs(e.changedTouches[0].pageX - this.slideNote.x) < 50){
					return
				}
				if (Math.abs(e.changedTouches[0].pageY - this.slideNote.y) > 50){
					return
				}
				if ((e.changedTouches[0].pageX - this.slideNote.x) < 0) {
					// 向左滑动
					var last = [newList.pop()]
					newList = last.concat(newList)
					this.itemIndex = newList[0].index+1 == newList.length ? 0 : newList[0].index+1
					this.itemStyle = newList
				} else {
					// 向右滑动
					newList.push(newList[0])
					newList.splice(0, 1)
					this.itemIndex = newList[0].index+1 == newList.length ? 0 : newList[0].index+1
					this.itemStyle = newList
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiperPanel {
		height: 532rpx;
		width: 100%;
		overflow: hidden;
		position: relative;
		background:#fff;
		.swiperItem {
			margin-left:23rpx;
			height: 100%;
			width: 460rpx;
			position: absolute;
			top: 10rpx;
			left: 0;
			transition: all .5s;
			.children {
				height: 100%;
				width: 460rpx;
				height: 460rpx;
				position:relative;
				border-radius: 10rpx;
				box-shadow: 4rpx 5rpx 10rpx 2rpx rgba(75,75,75,0.3);
				overflow: hidden;
				.pic {
					height: 100%;
					width: 100%;
				}
				.purchaseBox{
					position:absolute;
					bottom:0rpx;
					left:0rpx;
					height:100rpx;
					width:460rpx;
					background-image:linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.2));
					display: flex;
					justify-content:space-between;
					align-items: center;
					padding-left:30rpx;
					padding-right:30rpx;
					.price{
						color:#fff;
						.price1{
							font-size:22rpx;
							margin-right:10rpxd;
						}
						.price2{
							font-size:32rpx;
						}
					}
					.purchase{
						color:#fff;
						.btnText{
							font-size:22rpx;
							margin-right:10rpx;
						}
						.icon{
							font-size:22rpx;
						}
					}
					
				}
			}
		}
		.slideItem{
			height:40rpx;
			width: 100%;
			text-align: center;
			position: absolute;
			bottom: 10rpx;
			right: 0rpx;
			line-height: 40rpx;
			.itemStyle{
				width:14rpx;
				height:14rpx;
				border-radius: 7rpx;
				background-color:#E9E9E9;
				display: inline-block;
				margin-left:10rpx;
			}
			.active{
				width:14rpx;
				height:14rpx;
				border-radius: 7rpx;
				background-color:#B7781B;
				display: inline-block;
				margin-left:10rpx;
			}
		}
	}
</style>
