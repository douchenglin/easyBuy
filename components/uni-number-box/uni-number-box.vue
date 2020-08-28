<template>
	<view class="uni-numbox" :class="{ 'uni-disabled': inputValue >= max}">
		<view @click="_calcValue('minus')" class="uni-numbox__minus" v-if="inputValue>0">
				<image class="wx-icon" src="../../static/icon/minus.png" mode=""></image>
		</view>
		<text v-if="inputValue>0"  class="uni-numbox__value">{{inputValue}}</text>
		<!-- <input  v-if="inputValue>0" :disabled="true" @blur="_onBlur" class="uni-numbox__value" type="number" v-model="inputValue" /> -->
		<view @click="_calcValue('plus')" class="uni-numbox__plus" >
			<image v-if="inputValue >= max||disabled" class="wx-icon" src="../../static/icon/displus.png" mode=""></image>
			<image v-else class="wx-icon" src="../../static/icon/plus.png" mode=""></image>
			<!-- <text class="uni-numbox--text" :class="{ 'uni-numbox--disabled': inputValue >= max || disabled }">+</text> -->
		</view>
	</view>
</template>
<script>

	/**
	 * NumberBox 数字输入框
	 * @description 带加减按钮的数字输入框
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=31
	 * @property {Number} value 输入框当前值
	 * @property {Number} min 最小值
	 * @property {Number} max 最大值
	 * @property {Number} step 每次点击改变的间隔大小
	 * @property {Boolean} disabled = [true|false] 是否为禁用状态
	 * @event {Function} change 输入框值改变时触发的事件，参数为输入框当前的 value
	 */

	export default {
		name: "UniNumberBox",
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: 0,
				isClick:false,
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					// this.$emit("change", newVal);
					//修改为  旧值也会返回
					let data = {
						newVal:newVal,
						oldVal:oldVal
					}
					if(this.isClick){
						this.$emit("change", data);
					}
				}
			}
		},
		created() {
			this.inputValue = +this.value;
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < (this.min * scale)) {
						return;
					}
					if (value > (this.max * scale)) {
						value = this.max * scale
					}
				} else if (type === "plus") {
					value += step;
					if (value > (this.max * scale)) {
						return;
					}
					if (value < (this.min * scale)) {
						value = this.min * scale
					}
				}
				this.isClick = true
				this.inputValue = String(value / scale);
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + "").split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					// this.inputValue = 0;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				this.inputValue = value;
			}
		}
	};
</script>
<style lang="scss" scoped>
	$box-height: 24px;
	/* #ifdef APP-NVUE */
	$box-line-height: 24px;
	/* #endif */
	$box-line-height: 24px;
	$box-width: 24px;

	.uni-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		// height: $box-height;
		// line-height: $box-height;
		// height:32px;
		// line-height: 32px;
		//width: 120px;
	}

	.uni-numbox__value {
		display: inline-block;
		background-color: $uni-bg-color;
		width: 30px;
		// height: $box-height;
		height:29px;
		text-align: center;
		font-size: $uni-font-size-lg;
		border-width: 1rpx;
		border-style: solid;
		// border-color: $uni-border-color;
		border-color:#C7C7C7;
		border-left-width: 0;
		border-right-width: 0;
	}

	.uni-numbox__minus {
		/* #ifndef APP-NVUE */
		// display: flex;
		// /* #endif */
		// flex-direction: row;
		// align-items: center;
		// justify-content: center;
		// width: 29px;
		// height:29px;
		// // line-height: $box-line-height;
		// // text-align: center;
		// font-size: 20px;
		// color: $uni-text-color;
		// background-color: $uni-bg-color-grey;
		// border-width: 1rpx;
		// border-style: solid;
		// //border-color: $uni-border-color;
		// border-color:#C7C7C7;
		// border-top-left-radius: $uni-border-radius-base;
		// border-bottom-left-radius: $uni-border-radius-base;
		// border-right-width: 0;
	}

	.uni-numbox__plus {
		// /* #ifndef APP-NVUE */
		// display: flex;
		// /* #endif */
		// flex-direction: row;
		// align-items: center;
		// justify-content: center;
		// width: 29px;
		// // height: $box-height;
		// height:29px;
		// border-width: 1rpx;
		// border-style: solid;
		// //border-color: $uni-border-color;
		// border-color:#C7C7C7;
		// border-top-right-radius: $uni-border-radius-base;
		// border-bottom-right-radius: $uni-border-radius-base;
		// background-color: $uni-bg-color-grey;
		// border-left-width: 0;
	}

	.uni-numbox--text {
		font-size: 44rpx;
		color: $uni-text-color;
		margin-top: -2px;
	}
	.uni-disabled .uni-numbox__plus{
		
	}
	.uni-numbox--disabled {
		color:#ffffff;
	}
</style>
