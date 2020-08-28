//const bastUrl = "http://192.168.1.158:9900/"
//const bastUrl = "https://hg.90shiguang.com/api/"
const bastUrl = "https://jnsh.90shiguang.com/api/"
//const bastUrl = "http://192.168.1.187:9900/"


// const bastUrl = "https://jnsh.90shiguang.com/api/"
const apiUrl = {
	dictCode: 'main-service/dict-code',// 获取字典文件
	loginOne:'main-service/customer/login',//登录
	relatePhoneNumber:'main-service/customer/relatePhoneNumber',//关联手机号
	uploadForBytes:'main-service/uploadForBytes',// 图片上传
	userInfo:"main-service/customer/info", // 用户信息查询
	editUserInfo:"main-service/customer", //修改用户信息
	accountAmount:"main-service/customerAccountAmountFlow/page", //余额流水
	accountScore:"main-service/customerAccountScoreFlow/page", //积分流水
	orderList:"order-service/order/page", //订单列表
	orderCancel:'order-service/order-cancel',//取消订单
	editAddress: "order-service/order-address", //修改地址
	orderInfo:"order-service/order", //订单详情
	merchant:"main-service/merchant", //店铺详情
	collectionMerchant:'main-service/customer-merchant-collection',//收藏店铺
	collectionList: "main-service/customer-merchant-collection/page",// 店铺收藏列表
	deleteCollectionl:"main-service/customer-merchant-collection",// 取消收藏
	clearInvalid: "main-service/customer-merchant-collection/clear-invalid", // 清空收藏列表
	customerDeliveryAddress:"main-service/customerDeliveryAddress",//地址列表
	editAddress:'order-service/order-address',//修改订单收货地址
	areaTree:"main-service/area/tree", //区域信息
	area:'main-service/area',//区域信息
	itemGroup:'item-service/customer-merchant-item-group',//店铺分组商品信息
	shopCart: "item-service/merchant-shop-cart",//购物车
	shopCartList:'item-service/merchant-shop-cart/list',//购物车 列表
	shopCartEmpty:'item-service/merchant-shop-cart/empty',//清空购物车
	shopCartQuantity:'item-service/merchant-shop-cart/quantity',//修改购物车商品数量
	settlement:'item-service/merchant-shop-cart/settlement',//购物车结算
	orderCart:'order-service/merchant-order-cart',//购物车提交订单
	coinSms:'order-service/coin/sms',//N币支付发送验证吗
	coin:'order-service/coin',//N币支付
	wxpay:'order-service/wxpay/jsapi/unifiedOrder',//微信支付
	checkDistance:'main-service/merchant/check-distance',//校验商家与选择地址的信息是否在配送范围内
}
export {bastUrl,apiUrl}