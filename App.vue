<script>
	export default {
		globalData: {
			topbarHeight: '0'
		},
		onLaunch: function() {
			// #ifdef  MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									if (res.confirm) {
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							wx.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							})
						})
					}
				})
			} else {
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
			//#endif
			console.log('App Launch');
		},
		onShow: function() {
			// wx.getSystemInfoSync()
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
	};
</script>

<style>
	@import "static/style/index.css";
	@import "static/style/iconfont.css";
	@import "static/style/uni.css";
	/* @import "common/style/iconfont.css";	 */
</style>