<template>
	<view class="wf-item-page">
		<image :src="item.imgUrl" @tap="touch_card" :data-id="item.id"  mode="widthFix" class="item-img" />
		<view class="item-info">
			<view class="zy_bottom_view">
				<text class="zy_title">{{item.name}}</text>
				<view class = "zy_priceBox">
					<view class = "zy_price">
						<text class="zy_money"> <text class = "small">¥</text> {{item.price.toFixed(2)}}<text class = "small">起</text></text>
						<text class="zy_old_money">最高赚¥{{item.maxEarnMission.toFixed(2)}}</text>
					</view>
					<text class = "iconfont icon-gouwuche icon"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				require:true
			}
		},
		methods:{
			touch_card(e){
				let data = {
					type:'4',
					value:e.currentTarget.dataset.id,
					laber:''
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wf-item-page{
		background: #fff;
		overflow: hidden;
		border-radius: 5px;
	}
	
	.item-img{
		width: 100%;
	}
	.item-info{
		display: flex;
		align-items: center;
		padding: 5px;
	}
	
	.info-avatar{
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin-right: 5px;
	}
	
	.zy_card image{
		width: 100%;
		margin-bottom:5rpx;
		vertical-align:bottom;
	}
	/* 底部卡片内容 */
	.zy_bottom_view{
		width: 100%;
		min-height: 100rpx;
		background-color: #fff;
		margin-bottom: 15rpx;
	}
	.zy_title{
		display: inline-block;
		width: 90%;
		max-height: 80rpx;
		margin-left: 5%;
		line-height:40rpx;
		margin-top: 15rpx;
		font-size: 26rpx;
		color: #333;
		word-break: break-all;
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.zy_priceBox{
		height:100rpx;
		margin-top:15rpx;
	}
	.zy_price{
		float:left;
		width:70%;
		height:100rpx;
		padding-left:8rpx;
		text-align: left;
	}
	.icon{
		font-size:32rpx;
		float:right;
		margin-top:35rpx;
		margin-right:20rpx;
	}
	.zy_money{
		display:block;
		width: 90%;
		margin-left: 5%;
		margin-top: 5rpx;
		color: #B7781B;
		font-size: 32rpx;
		margin-bottom: 15rpx;
		font-weight:bold;
	}
	.zy_money .small{
		font-size:22rpx;
		margin-right:4rpx;
		font-weight: normal;
	}
	.zy_old_money{
		width: 90%;
		margin-left: 5%;
		color: #B87901;
		font-size: 20rpx;
		padding:5rpx 15rpx;
		background:#F8F2ED;	
		border-radius: 15rpx;
	}
</style>
