<template name="home">
	<view class="home">
		<view class="topheight">
			<view class="headBanner" :style="{paddingTop:headerBarHeight+'px',backgroundImage:merchant?'url(' + merchant.backgroundImgUrl + ')':''}">
				<view class = "userIconBox">
					<image class="user" @click="toUser" src="../../static/icon/user.png" mode=""></image>
				</view>
			</view>
			<view class="content " >
				<view class="shop">
					<view class="shopCon">
						<view class="tag" v-if="merchant&&!merchant.onBusiness"></view>
						<view class="item" style="padding-top:25rpx">
							<view class="shopLogo">
								<image v-if="merchant" :src="merchant.logoImgUrl"></image>
							</view>
							<view class="shopInfo">
								<view class="name" v-if="merchant">{{merchant.name||''}}</view>
								<view class="dflex" style="align-items: center;">
									<view class="starLevel"  v-if="merchant">
										<image src="../../static/icon/brightStar.png" mode="" v-for="i in merchant.creditLevel" :key="i"></image>
										<image src="../../static/icon/star.png"  v-for="index in 5-merchant.creditLevel" :key="index" mode=""></image>
									</view>
									<view class="time">营业时间 <text v-if="merchant" style="margin-left:6rpx;"  > {{merchant.startBusinessHours||''}}-{{merchant.endBusinessHours||''}}</text></view>
								</view>
							</view>
							<view class="attention" @click="attention" v-if="merchant">
								<image v-if="merchant.isCollected" src="../../static/icon/heart.png" mode=""></image>
								<image v-else src="../../static/icon/grayheart.png" mode=""></image>
							</view>
						</view>
						<view class="item notice">
							<view class="txtCon">
								<view class="label"  v-if="merchant">公告:</view>
								<view class="txt" v-if="merchant">
									<text-scroll :text="merchant.announcement"></text-scroll>
								</view>
							</view>
						</view>
						<view class="item addAddress">
							<view class="dflex"> 
								<image class="wx-icon" style="width:24rpx;height:27rpx;" src="../../static/icon/dingwei1.png" mode=""></image>
								<view class="address"  v-if="merchant">{{merchant.fullAddress}}</view>
							</view>
							<view class="phoneCon">
								<image  v-if="merchant" @click="call(merchant.contactsPhoneNumber)" class="wx-icon" src="../../static/icon/phone.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="tabCon">
					<view class="tab">
						<view class="option" @click="changeTab(1)">
							<text :class="{'active':tabCode==1}">进店消费</text>
							<text class="borbtn" v-show="tabCode==1"></text>
						</view>
						<view class="option" v-if="merchant&&merchant.deliveryStatus" @click="changeTab(2)">
							<text :class="{'active':tabCode==2}">商家配送</text>
							<text class="borbtn" v-show="tabCode==2"></text>
						</view>
						<view class="option" v-else>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content" >
			<view class="tabCon">
				<view class="menuCon">
					<view class="topTile"> {{menuName}}</view>
					<scroll-view  class="classify" :scroll-into-view="toView"  scroll-y="true" scroll-with-animation="true"   :style="{height:(windowHeight-topheight)+'px'}">
						<view class="classifyCon"  :id="item.view"  :class="{'active':toView==item.view}" v-for="(item,index) in menuData" :key="index" @click="changeMenu(item.view)">
							<view class="classify_text">
								{{item.name}}
							</view>
						</view>
					</scroll-view>
					<scroll-view  class="cookbook" :scroll-into-view="toList"  show-scrollbar="true" scroll-with-animation="true" :style="{height:windowHeight-topheight+'px'}"   @scroll="scrollTo"  scroll-y="true">
						<view class="commodityList" v-for="(item,i) in menuData"  :id="item.view" :key="item.id">					
							<view style="height:20rpx">
							</view>
							<view class="title">{{item.name}}</view>
							<view class="commodityCon"  v-for="(items,k) in item.itemList " :key="items.id">
								<image class="commodity_img" :src="items.imgUrl" mode=""></image>
								<view class="commodity_info">
									<view class="name">{{items.name}}</view>
									<view class="sales">销量 {{items.sales}}</view>
									<view class="dflex">
										<view class="priceCon">
											<text>￥</text>
											<text class="price">{{items.price}}</text>
										</view>
										<view class="numCon">
											<uni-number-box  v-if="items.status==5" :value="items.quantity"  :disabled="merchant&&!merchant.onBusiness" :min="0" :max="items.stock" @change="changNum($event,items,item.id)" ></uni-number-box>
											<text v-else>已售罄</text>
										</view>
									</view>
								</view>
							</view> 
							<view v-if="i==menuData.length-1" style="height:60rpx">
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="settlement"  :class = "isFullSucreen? 'paddingBottom' : ''" >
			<view class="totalPrice">
				<view class="imgCon" @click="showCar">
					<image class="shopCar" src="../../static/icon/shopCar.png" mode=""></image>
					<view class="note" v-if="noticeNum">{{noticeNum>99?99:noticeNum}}<text v-if="noticeNum>99">+</text></view>
				</view>
				<view class="priceCon" v-if="totalPrice!==0">
					<text>￥</text>
					<text class="price">{{totalPrice?totalPrice.toFixed(2):totalPrice}}</text>
				</view>
				<view  v-else class="priceCon">
					<text class="tips">未选购商品</text>
				</view>
			</view>
			<view class="set" v-if="merchant&&merchant.onBusiness" @click="settlement">去结算</view>
			<view class="time" v-if="merchant&&!merchant.onBusiness">{{merchant.startBusinessHours||''}} 开始营业</view>
		</view>
		<view class="shopCarCon" :style="{height:windowHeight+'px'}" v-if="show">
			<view class="pop" @click="closedCar"></view>
			<view class="content">
				<view class="shopCar">
					<view class="head">
						<text>已选商品</text>
						<view class="empty" @click="empty">
							<image class="wx-icon" src="../../static/icon/shanchu.png" mode=""></image>
							清空
						</view>
					</view>
					<scroll-view  class="shopCarList" style="max-height:640rpx" show-scrollbar="false" scroll-y="true">
						<view v-for="item in shopCartData " :key="item.cartId">
							<view class="commodityCon" v-if="item.quantity!==0">
								<image class="commodity_img" :src="item.imgUrl" mode=""></image>
								<view class="commodity_info">
									<view class="name">{{item.name}}</view>
									<view class="dflex">
										<view class="priceCon">
											<text>￥</text>
											<text class="price">{{item.price}}</text>
										</view>
										<view class="numCon">
											<uni-number-box :value="item.quantity" :min="0" :max="item.stock"  :disabled="merchant&&!merchant.onBusiness" @change="changCartNum($event,item)" ></uni-number-box>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	// 定义外部变量
	// data中数据变化导致页面重绘
	import "static/js/until.js";
	import numberBox from "../../components/uni-number-box/uni-number-box.vue";
	import textScroll from "../../wxcom/textScroll/index.vue";
	export default {
		name: "home",
		components: {numberBox,textScroll},
		data() {
			return {
				merchantId:'',
				headerBarHeight:0,
				isFullSucreen:false,
				tabCode:1,
				toView:'',
				toList:'',
				menuName:'',
				windowHeight:631,
				height:'',
				topheight:null,
				topH:null,
				merchant:null,
				noticeW:0,
				menuData:[],
				topList:[],
				shopCartData:[],
				noticeNum:0,
				totalPrice:0,
				show:false,
				disabled:false,
				timer:null,
			}
		},
		onPullDownRefresh(){
			this.getMerchant()
			this.getItemGroup()
			this.getShopCart()
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},100)
		},
		onShow(){
			if(this.merchantId){
				uni.setStorage({
					key: 'merchantId',
					data: this.merchantId,
					success: function () {
					}
				});
				this.disabled = false
				this.getMerchant()
				this.getItemGroup()
				this.getShopCart()
			}
		},
		onShareAppMessage(res) {
			let shareObj = {
		　　　　 title:this.merchant.name,
				path: 'pages/home/home?scene='+this.merchantId,
				imageUrl: this.merchant.logoImgUrl,
		　　}
			return shareObj;
		},
		onShareTimeline(res){
			return {
				title:this.merchant.name,
				query:'scene='+this.merchantId,
				imageUrl:this.merchant.logoImgUrl
			}
		},
		onLoad(option) { //默认加载
			let _this = this
			if(!this.merchantId){
				this.merchantId = option.scene
				this.tabCode = option.type?option.type:1
				if(typeof(this.merchantId) == 'undefined'){
					this.merchantId = 7
				}
				uni.setStorage({
					key: 'merchantId',
					data: this.merchantId,
					success: function () {
					}
				});
				this.getMerchant()
				this.getItemGroup()
				this.getShopCart()
			}
			//#ifdef MP-WEIXIN
				_this.getSize()
			//#endif
		},
		methods: {
			getSize(){
				let _this = this
                this.$nextTick(() => {
					uni.getSystemInfo({//获取手机的状态栏高度单位px
						success: (e=> {
							if (e.screenHeight - e.windowHeight - e.statusBarHeight - 32 > 72) {
								_this.isFullSucreen = true
							}
							if (e.model.search('iPhone X') != -1) {
								_this.isFullSucreen = true
							}
							_this.headerBarHeight  =  e.statusBarHeight
							let screenHeight = e.screenHeight
							// console.log(screenHeight)
							const query = uni.createSelectorQuery().in(this);
							query.select('.settlement').boundingClientRect(data => {
								let height = data.height
								_this.windowHeight = screenHeight - height
								if(_this.isFullSucreen){
									_this.windowHeight = _this.windowHeight -32
								}
								// console.log(height)
							}).exec();
							query.select('.topheight').boundingClientRect(res => {
								_this.topheight = res.height + _this.headerBarHeight
								_this.topH = res.height
								// console.log(res.height)
							}).exec();
						})
					})
                })
			},
			call(phone){ //拨打电话
				uni.makePhoneCall({
				    phoneNumber:phone //仅为示例
				});
			},
			attention(){ //收藏
				let _this = this
				if(!this.merchant.isCollected){
					this.$http.url_Request_post(this.$api.collectionMerchant,{merchantId:this.merchantId},function(res){
						if(res.code!==1){return false}
						uni.showToast({
							icon:'none',
							title: "已收藏",
							duration: 1000
						});
						_this.getMerchant()
					})
				}else{
					this.$http.url_Request_delete(this.$api.collectionMerchant+'/'+this.merchantId,null,function(res){
						if(res.code!==1){return false}
						uni.showToast({
							icon:'none',
							title: "已取消收藏",
							duration: 1000
						});
						_this.getMerchant()
					})
				}
			},
			showCar(){ //打开购物车
				if(this.show){
					this.show = this.show ?false:true
					if(this.show){
						this.getShopCart()
					}
				}else{
					if(this.noticeNum>0){
						this.show = this.show ?false:true
						if(this.show){
							this.getShopCart()
						}
					}else{
						uni.showToast({
							icon:'none',
							title: "购物车为空！",
							duration: 2000
						});
					}
					
				}
			},
			closedCar(){ //关闭购物车
				this.show = false
			},
			empty(){ //清空购物车
				let _this = this
				if(this.noticeNum<1){
					uni.showToast({
						icon:'none',
						title: "购物车已清空！",
						duration: 2000
					});
					return false
				}
				uni.showModal({
				    title: '确认清空购物车？',
				    success: res=>{
						if (res.confirm) {
							this.$http.url_Request_get(this.$api.shopCartEmpty,{
								merchantId:_this.merchantId,
								type:_this.tabCode,
							},function(res){
								if(res.code!==1){return false}
								uni.showToast({
									icon:'none',
									title: "操作成功",
									duration: 1000
								});
								_this.show = false
								_this.getItemGroup()
								_this.getShopCart()
							})
						}
				    }
				});
			},
			toUser(){ //跳转到我的页面
				uni.navigateTo({
				    url: '/pages/user/user'
				});
			},
			changeTab(code){ //切换tab
				this.tabCode = code
				this.menuName = ''
				this.topList = []
				this.getItemGroup()
				this.getShopCart()
			},
			changNum(el,obj,groupId){ //修改数量
				let _this = this
				let oldVal = parseInt(el.oldVal)
				let newVal = parseInt(el.newVal)
				let data = {
					merchantId: _this.merchantId, // 商家 id
					type: _this.tabCode, // 类型 1: 到店, 2: 配送
					groupId:groupId, // 分组 id
					merchantItemId: obj.id, // 商品 id
					quantity:  newVal// 数量
				}
				if(!this.disabled){
					this.disabled = true
					this.$http.url_Request_post(this.$api.shopCart,data,function(res){
						if(res.code!==1){
							_this.getItemGroup()
							return false
						}
						_this.statisticsGoodNum(data)
					})
				}else{
					_this.disabled = true
					data.quantity = oldVal
					_this.statisticsGoodNum(data)
				}
			}, 
			statisticsGoodNum(data){  //统计商品数据
				let _this = this
				let dataArry = this.menuData
				let noticeNum = 0
				let totalPrice = 0
				dataArry.forEach(res=>{
					let arr = res.itemList
					arr.forEach(el=>{
						let price = el.price
						if(res.id==data.groupId&&el.id==data.merchantItemId){
							el.quantity = data.quantity
						}
						noticeNum = noticeNum+el.quantity
						totalPrice = (totalPrice).add((price).mul(el.quantity))
					})
				})
				_this.noticeNum = noticeNum
				_this.totalPrice = totalPrice
				_this.disabled = false
			},
			changCartNum(el,obj){ //修改购物车商品数量
				let oldVal = parseInt(el.oldVal)
				let newVal = parseInt(el.newVal)
				let _this = this
				let data = {
					id: obj.id, 
					groupId: obj.groupId, 
					type:_this.tabCode,
					quantity: newVal
				}
				if(!this.disabled){
					this.disabled = true
					this.$http.url_Request_put(this.$api.shopCartQuantity,data,function(res){
						if(res.code!==1){
							_this.getShopCart()
							return false
						}
						_this.statisticsCartNum(data)
					})
				}else{
					_this.disabled = true
					data.quantity = oldVal
					_this.statisticsCartNum(data)
				}
			},
			statisticsCartNum(data){ //统计购物车数据
				let _this = this
				let dataArry = this.shopCartData
				let menuData = this.menuData
				menuData.forEach(res=>{
					let arr = res.itemList
					arr.forEach(el=>{
						let price = el.price
						if(res.id==data.groupId&&el.id==data.id){
							el.quantity = data.quantity
						}
					})
				})
				let noticeNum = 0
				let totalPrice = 0
				dataArry.forEach(el=>{
					let price = el.price
					if(el.groupId==data.groupId&&el.id==data.id){
						el.quantity = data.quantity
					}
					noticeNum = noticeNum+el.quantity
					totalPrice = (totalPrice).add((price).mul(el.quantity))
				})
				_this.noticeNum = noticeNum
				_this.totalPrice = totalPrice
				_this.disabled = false
			},
			getNodesInfo(){ //获取分类商品节点到顶部的高度
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.commodityList').boundingClientRect().exec((res)=>{
					let nodes = res[0]
					let rel =[];
					nodes.map((item,index)=>{
						let data = {
								view:item.id
							
						}
						if(index==0){
							data.top = 0
						}
						if(index>0){
							data.top = nodes[index-1].height
						}
						rel.push(data)
					})
					this.topList = rel
					console.log(this.topList)
				})
			},
			changeMenu(code){ //切换菜单
				let _this = this
				this.toView = code
				this.toList = code
				this.menuData.forEach((res,index)=>{
					if(res.view == code){
						_this.menuName = res.name
					}
				})
			},
			scrollTo(e){ //监听滚动
				let _this = this
				let scrollTop = e.target.scrollTop
				if(_this.topList.length==0){
					const query = uni.createSelectorQuery().in(this);
					query.selectAll('.commodityList').boundingClientRect().exec((res)=>{
						let nodes = res[0]
						let rel =[];
						nodes.map((item,index)=>{
							let data = {
								view:item.id,
								top:item.height
							}
							if(index==0){
								data.top = 0
							}
							if(index>0){
								data.top = nodes[index-1].height
							}
							rel.push(data)
						})
						_this.topList = rel
						_this.topList.forEach(function(res,i){
							if(i>0){
								if(i==1){
									res.top = res.top-20
								}
								res.top = res.top+ _this.topList[i-1].top
							}
						})
						_this.topList.forEach((res,i)=>{
							if(i<_this.topList.length-1){
								let h1 = res.top
								let h2 = _this.topList[i+1].top
								let num = h2-h1
								if(scrollTop>=h1&&scrollTop<h2){
									if(_this.toView!==res.view){
										_this.toView = res.view
									}
								}
							}
							if(i==_this.topList.length-1){
								let h1 = res.top
								if(scrollTop>=h1){
									if(_this.toView!==res.view){
										_this.toView = res.view
										this.menuData.forEach((el,index)=>{
											if(res.view == el.view){
												_this.menuName = el.name
											}
										})
									}
								}
								
							}
						})	
					})
				}else{
					_this.topList.forEach((res,i)=>{
						// console.log(i+'__'+_this.topList.length)
						if(i<_this.topList.length-1){
							let h1 = res.top
							let h2 = _this.topList[i+1].top
							let num = h2-h1
							if(scrollTop>=h1&&scrollTop<h2){
								if(_this.toView!==res.view){
									_this.toView = res.view
									this.menuData.forEach((el,index)=>{
										if(res.view == el.view){
											_this.menuName = el.name
										}
									})
								}
							}
						}
						if(i==_this.topList.length-1){
							let h1 = res.top
							if(scrollTop>=h1){
								if(_this.toView!==res.view){
									_this.toView = res.view
									this.menuData.forEach((el,index)=>{
										if(res.view == el.view){
											_this.menuName = el.name
										}
									})
								}
							}
							
						}
					})	
					
				}
			},
			settlement(){ //结算
				let _this = this
				if(this.noticeNum>0){
					let data = {
						merchantId:_this.merchantId,
						type:_this.tabCode,
					}
					this.$http.url_Request_get(this.$api.settlement,data,function(res){
						if(res.code!==1){return false}
						uni.setStorage({
							key: 'order_info',
							data: res.data,
							success: function () {
								uni.navigateTo({
									url: '/pages/order/placeOrder'
								});
							}
						});
					})
					
				}else{
					uni.showToast({
						icon:'none',
						title: "购物车不能为空！",
						duration: 2000
					});
				}
			},
			getShopCart(){ //获取购物车
				let _this = this
				this.$http.url_Request_get(this.$api.shopCartList,{
					merchantId:_this.merchantId,
					type:_this.tabCode,
				},function(res){
					if(res.code!==1){return false}
					_this.shopCartData = res.data
					let noticeNum = 0
					let totalPrice = 0
					res.data.forEach(res=>{
						let price = res.price
						noticeNum = noticeNum+res.quantity
						totalPrice = (totalPrice).add((price).mul(res.quantity))
					})
					_this.noticeNum = noticeNum
					_this.totalPrice = totalPrice
				})
				
			},
			getItemGroup(){ //获取店铺分组商品   zcz -- 确认是否过滤 分组信息
				let _this = this
				_this.menuData = []
				let res = {"code":1,"message":"操作成功","data":[{"id":18,"name":"经典美食","itemList":[{"id":114,"name":"鸡排锅盔（麻辣味）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":8.90,"sales":45,"stock":166,"status":5,"quantity":0},{"id":126,"name":"鸡排锅盔（孜然味）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":8.90,"sales":44,"stock":166,"status":5,"quantity":0},{"id":65,"name":"番茄鲜肉锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":5.50,"sales":42,"stock":166,"status":5,"quantity":0},{"id":137,"name":"麻辣鲜肉锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":5.44,"sales":41,"stock":166,"status":5,"quantity":0},{"id":82,"name":"怪味鸡排锅盔（重口味）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":9.90,"sales":37,"stock":166,"status":5,"quantity":0},{"id":96,"name":"红豆沙锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FtQ6Xf1Tbwigqr2wePakX4YA27K9.jpg","price":4.50,"sales":36,"stock":166,"status":5,"quantity":0},{"id":107,"name":"鸡蛋鲜肉锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FpbLvoPlt480VPqFxVhepjtiL48q.jpg","price":8.80,"sales":31,"stock":1646,"status":5,"quantity":0},{"id":75,"name":"怪味锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":6.50,"sales":30,"stock":199,"status":5,"quantity":0},{"id":99,"name":"鸡蛋牛肉锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FtnV0iBxmZw0B1uVKrqCm28bAABW.jpg","price":11.88,"sales":29,"stock":144,"status":5,"quantity":0},{"id":71,"name":"甘梅鲜肉锅盔（我酸甜）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":5.50,"sales":29,"stock":1,"status":5,"quantity":0},{"id":162,"name":"原味鲜肉","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":5.50,"sales":28,"stock":166,"status":5,"quantity":0},{"id":131,"name":"麻辣味牛肉","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":8.90,"sales":21,"stock":1464,"status":5,"quantity":0},{"id":166,"name":"孜然味牛肉","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":8.90,"sales":19,"stock":166,"status":5,"quantity":0},{"id":63,"name":"白糖锅盔（我超甜）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":4.80,"sales":18,"stock":166,"status":5,"quantity":0},{"id":85,"name":"怪味牛肉（重口味）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":9.90,"sales":18,"stock":166,"status":5,"quantity":0},{"id":123,"name":"鸡排锅盔（清淡味）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":8.80,"sales":15,"stock":133,"status":5,"quantity":0},{"id":157,"name":"鲜肉孜然锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":5.50,"sales":9,"stock":199,"status":5,"quantity":0},{"id":142,"name":"梅菜扣肉","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":6.50,"sales":8,"stock":166,"status":5,"quantity":0},{"id":91,"name":"怪味牛肉锅盔（清单味）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":8.80,"sales":8,"stock":166,"status":5,"quantity":0},{"id":147,"name":"牛肉锅盔（椒盐味）","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmcZBHlTL1nNt-8kJSztKWUWu1iV.jpg","price":8.90,"sales":6,"stock":99,"status":5,"quantity":0},{"id":152,"name":"鲜肉椒盐锅盔","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FmOWzLNlM5r92A1GCkkhCoE2RqZN.jpg","price":5.50,"sales":1,"stock":661,"status":5,"quantity":0}]},{"id":19,"name":"饮品","itemList":[{"id":172,"name":"绿豆沙","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FlWlEEIJvoiOxb54VLoCogoG8KPB.jpg","price":2.80,"sales":28,"stock":1,"status":5,"quantity":0},{"id":22,"name":"豆本豆豆奶","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FsVC4fr9CB5Vu8FfFo0zBm4st0uA.jpg","price":2.90,"sales":27,"stock":166,"status":5,"quantity":0},{"id":31,"name":"农夫山泉","imgUrl":"https://qiniu.90shiguang.com/customer/2020-08-24/FvaMnAEwzhV5VLsrndfy19vYZfmv.jpg","price":2.50,"sales":9,"stock":199,"status":5,"quantity":0}]}]}
				
				res.data.forEach(res=>{
					res.view = 'a'+res.id
				})
				let array = []
				res.data.forEach((res,i)=>{
					if(res.itemList.length>0){
						array.push(res)
					}
				})
				_this.menuData = array
				_this.toView = _this.menuData[0].view
				_this.menuName = _this.menuData[0].name
				// this.$http.url_Request_get(this.$api.itemGroup,{
				// 	merchantId:_this.merchantId,
				// 	type:_this.tabCode,
				// },function(res){
				// 	if(res.code!==1){return false}
				// 	res.data.forEach(res=>{
				// 		res.view = 'a'+res.id
				// 	})
				// 	let array = []
				// 	res.data.forEach((res,i)=>{
				// 		if(res.itemList.length>0){
				// 			array.push(res)
				// 		}
				// 	})
				// 	_this.menuData = array
				// 	_this.toView = _this.menuData[0].view
				// 	_this.menuName = _this.menuData[0].name
				// })
			},
			getNowDate(){
				let date = new Date()
				let Hour = date.getHours()
				let Minutes = date .getMinutes()
				let time = Hour+':'+Minutes
				return this.countDown(time)
			},
			getMerchant(){ //获取店铺信息
				let _this = this
				let r = {"code":1,"message":"操作成功","data":{"id":7,"accountStatus":1,"status":3,"name":"邱记锅盔","creditLevel":1,"logoImgUrl":"https://qiniu.90shiguang.com/customer/2020-08-25/FnrYS60fFD_lG3xRnAqFYicCkk0a.jpg","contactsPhoneNumber":"13971334325","startBusinessHours":"07:00","endBusinessHours":"20:00","announcement":"邱记锅盔现更名邓记锅盔一元路总店 老味道老地方老掌柜 老沔阳风味，厚实绵坨","autoBusinessStatus":1,"deliveryStatus":1,"deliveryType":2,"provinceCode":"420000","province":"湖北省","cityCode":"420100","city":"武汉市","districtCode":"420102","district":"江岸区","detail":"武汉市江岸区尚德里3栋2单元1层12室","fullAddress":"湖北省武汉市江岸区武汉市江岸区尚德里3栋2单元1层12室","newsNoticeEnable":1,"activityNoticeEnable":1,"accountNoticeEnable":1,"businessType":2,"businessTypeName":"餐饮服务","backgroundImgUrl":"https://qiniu.90shiguang.com/customer/2020-08-25/FnrYS60fFD_lG3xRnAqFYicCkk0a.jpg","isCollected":0,"onBusiness":1,"distance":null,"distanceDesc":"附近","shopTemplateList":null}}
				_this.merchant = r.data
				_this.merchant.announcement= _this.merchant.announcement.replace(/[\r\n]/g,'')　
				uni.setStorage({
					key: 'merchantInfo',
					data: r.data,
					success: function () {
					}
				});
				// this.$http.url_Request_get(this.$api.merchant+'/'+_this.merchantId,null,function(res){
				// 	if(res.code!==1){return false}
				// })
				
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "home.scss"
</style>
