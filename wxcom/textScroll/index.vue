<template>
    <div class="tip">
        <div class="inner" :class="{'move': scroll}" :style="styleName">
            <text class="tip-inder">{{text}} {{scroll ? text : '' }}</text>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                defualt: ''
            },
        },
        data() {
            return {
                styleName: "animation-duration: 6s",
                scroll: false,
                tipWidth: 0
            };
        },
        watch: {
            text: {
                handler(val) {
					console.log(val)
                    this.textScroll()
                },
                immediate: false
            }
        },
		mounted() {
            this.textScroll()
		},
        methods: {
            textScroll() {
                // 等待节点挂载后再执行,热门线路tip滚动实现
                this.$nextTick(() => {
                    let query = wx.createSelectorQuery().in(this)
                    query.select('.tip').boundingClientRect(data => {
                        this.tipWidth = data.width
                    }).exec();
                    query.select('.tip-inder').boundingClientRect(data => {
                        if(data.width > this.tipWidth) {
                            let w = Number(data.width)
                            let time = Math.round(w / 40)
                            this.styleName = `animation-duration: ${time}s`
                            this.scroll = true
                        }
                    }).exec();
                })
            }
        }
    };
</script>

<style lang="less">
    .tip {
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        white-space: nowrap;
    }
    
    .tip .inner {
        overflow: hidden;
        display: inline-block;
    }

    .tip .inner .tip-inder {
        white-space: nowrap;
        padding-left: 30rpx;
    }

    .tip .inner.move {
        // animation: move 6s infinite linear;
        animation-name: scroll;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-50%);
        }
    }
</style>

