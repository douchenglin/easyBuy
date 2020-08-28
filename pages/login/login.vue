
<template>
	<!-- 小程序登录流程  
		1.判断用户本地是否有tooken是否过期
			2.1 tooken未过期直接跳转首页
			2.2 tooken过期 获取用户coode 进行用户授权 => 走登录接口
				3.2 成功 跳转首页 
				3.4 未认证 获取用户手机号 走接口relatePhoneNumber 进行登录
	-->
	<view style = "height:100%;">
		<!-- <view class = "coveflex"></view> -->
		<popDialog class = "pop" v-if = "isCanUse" title = "玖牛生活小程序" content = "为了更好的用户体验,需要您授权微信手机号">
			<view>
				<button class = "button" hover-class='none' open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">去授权</button>
			</view>
		</popDialog>
		<!-- #ifdef MP-WEIXIN -->
		<view class = "logoBox" v-show = "ifLofin" >
			<view class = "logoimgBox">
				<view class = "logoimg" :style = "{backgroundImage:'url('+backgroundImage+')'}"></view>
			</view>
			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
				<view class = "wxText">
					<view class = "iconfont icon-wechat wxIcon"></view><view class = "wx">微信登录</view>
				</view>
			</button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import popDialog from 'wxcom/popdialog/popdialog.vue'
    export default {
        data() {
            return {
                SessionKey: '',
                OpenId: '',
				iv:"",
				encryptedData:"",
				grantCode:"",
				customerThirdId:"",
				ifLofin:false,
                nickName: null,
                avatarUrl: null,
                isCanUse: false,//默认为true
				tirmTrue: true,
				backgroundImage:'https://qiniu.90shiguang.com/operation/2020-08-22/FplwGLxSOkQI3lchiNkczo-59ywE.png'
            };
        },
		components:{popDialog},
        methods: {
			//用户授权
            wxGetUserInfo() {
				let _this = this;
				if (!_this.tirmTrue){return false}
				_this.tirmTrue = false
                uni.getUserInfo({
                    provider: 'weixin',
                    success: function(infoRes) {
						_this.iv = infoRes.iv;
						_this.encryptedData = infoRes.encryptedData
                        _this.logoingOne()
						
                    },
                    fail(res) {
						uni.hideToast()
						uni.reLaunch({
							url: '/pages/home/home?scene='+uni.getStorageSync('merchantId')
						})
					}
                });
            },
　　　　　　//登录
            login() {
               // 1.wx获取登录用户code
                uni.login({
                    provider: 'weixin',
                    success: (loginRes=>{
						this.grantCode = loginRes.code;
					}),
					fail:(err =>{
						uni.showToast({
							icon:'none',
						    title: err.message,
						    duration: 2000
						});
					})
                });
            },
			// 走接口登录
			logoingOne(){	
				// appId:'wx857ea070cef213e7',
				this.$http.url_Request_post(this.$api.loginOne,{
					loginType:3,
					grantCode: this.grantCode,
					encryptedData:this.encryptedData,
					iv:this.iv,
					appId:'wx857ea070cef213e7',
				},(res=>{
					this.grantCode = ''
					if (res.code != 1){return false}
					if(res.data.isRelatedPhoneNumber == 0){
						// 授权失败 获取手机号
						this.isCanUse = true
						this.customerThirdIds = res.data.customerThirdId
						this.tirmTrue = true
					} else {
						uni.setStorage({
							key: 'token',
							data: res.data.token,
							success:(res=>{
								setTimeout(()=>{
									this.getUserInfo()
								},100)
							}),
							fail:(fail=>{
								console.log('失败')
							}),
							complete:(complete=>{
								console.log('执行')
							})
						})
					}
				}))
			},
			// 获取用户手机号 进行登录
			onGetPhoneNumber(e) { 
				let _this = this
				this.isCanUse = false
				// appId:'wx857ea070cef213e7',
				if (e.detail.errMsg == 'getPhoneNumber:ok'){
					this.$http.url_Request_post(this.$api.relatePhoneNumber,{
						type:2,
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv,
						customerThirdId:this.customerThirdIds,
						appId:'wx857ea070cef213e7',
						merchantId: uni.getStorageSync('merchantId'),
					},function(res){
						if (res.code != 1){return false}
						uni.setStorage({
							key: 'token',
							data: res.data.token,
							success: function () {
								setTimeout(()=>{
									_this.getUserInfo()
								},100)
							}
						})
					})
				} else {
					let pageList = getCurrentPages()
					if (pageList[0].route == 'pages/login/login'){
						uni.reLaunch({
							url: '/pages/home/home?scene='+uni.getStorageSync('merchantId')
						})
					} else {
						uni.navigateBack();
					}
				}
			},
			//判断token是否过期
			verifyToken(){
				let tooken = uni.getStorageSync('token');
				if (tooken == ''){
					this.ifLofin = true
					this.login()
				} else {
					let pageList = getCurrentPages()
					if (pageList[0].route == 'pages/login/login'){
						uni.reLaunch({
							url: '/pages/home/home?scene='+uni.getStorageSync('merchantId')
						})
					} else {
						uni.navigateBack();
					}
				}
				// this.dictCode()
			},
			dictCode(){
				this.$http.url_Request_get(this.$api.dictCode,null,(res=>{
					if (res.code != 1){return false}
					uni.setStorage({
						key: 'dictCode',
						data:res.data
					})
				}))
			},
			getUserInfo(){
				let _this = this
				this.$http.url_Request_get(this.$api.userInfo,null,function(res){
					if (res.code == 4){return false}
					if (res.code != 1){return false}
					_this.userInfo = res.data
					uni.setStorage({
						key: 'wxUserInfo',
						data: res.data,
						success: function () {
							_this.tirmTrue = true
							let pageList = getCurrentPages()
							if (pageList[0].route == 'pages/login/login'){
								uni.reLaunch({
									url: '/pages/home/home?scene='+uni.getStorageSync('merchantId')
								})
							} else {
								uni.navigateBack();
							}
						}
					})
				})
			},
        },
        onShow() {//默认加载
			this.verifyToken();
			console.log(uni.getStorageSync('merchantId'))
        }
    }
</script>
<style>
	/* button按钮样式重置 */
	.pop .button{
		background:#fff;
		color:#B7781B;
		border:none;
	}
	.pop uni-button:after{
		border:none;
	}
</style>
<style>
	page{
		height:100%;
	}
</style>
<style scoped lang="scss">
	@import "login.scss";
</style>
