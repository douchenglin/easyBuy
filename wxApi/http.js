import {bastUrl} from './api.js'
 let token = '627817b2c36513117654653185d8c86d'
 let ifLogin = true
function preHandleResult(res) {
	if (res.code == 4){
		// 登录过期清除tooken 跳转登录
		uni.showToast({
			icon:'none',
		    title: "登录失效",
		    duration: 2000
		});
		uni.setStorageSync('token','')
		setTimeout(()=>{
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},400)
		return false
	} else if (res.code != 1){
		uni.showToast({
			icon:'none',
		    title: res.message,
		    duration: 2000
		});
	}
}
// 请求末尾加token
function appendToken(url) {
	if (url.indexOf("?") == -1) {
		url += "?"
	} else {
		url += "&"
	}
	url += "access_token=" + accesstoken;
	return url;
}

// appendToken(url) 
function request_get(url, param, successCallback, failCallback) {
	var _this = this;
	uni.request({
		url: bastUrl + url,
		data: param,
		dataType: 'json',
		method: 'GET',
		header: {
			'custom-header': 'get', //自定义请求头信息
			'clientType':'jsapi2',
			'content-type': 'application/json', // 默认返回json格式，可以不加（加上是为了后面方便维护）
			'token':token || uni.getStorageSync('token'),
		},
		success: (res) => {
			if (successCallback) {
				successCallback(res.data);
			}
			if (res.data.code == 4){
				if (ifLogin){
					preHandleResult(res.data);
				}
				ifLogin = false
			} else {
				ifLogin = true
				preHandleResult(res.data);
			}
		},
		fail: (res) => {
			preHandleResult(res.data);
			if (failCallback) {
				failCallback(res.data);
			}
		}
	});
}

function request_post(url, param, successCallback, failCallback) {
	var _this = this;
	uni.request({
		url: bastUrl+url,
		data: param,
		dataType: 'json',
		method: 'POST',
		header: {
			'custom-header': 'post',
			'clientType':'jsapi2',
			'content-type': 'application/json',
			'token':token|| uni.getStorageSync('token'),
		},
		success: (res) => {
			if (successCallback) {
				successCallback(res.data);
			}
			if (res.data.code == 4){
				if (ifLogin){
					preHandleResult(res.data);
				}
				ifLogin = false
			} else {
				ifLogin = true
				preHandleResult(res.data);
			}
		},
		fail: (res) => {
			preHandleResult(res.data);
			if (failCallback) {
				failCallback(res.data);
			}
		}
	});
}

function request_put(url, param, successCallback, failCallback,type) {
	let contentType = 'application/json'
	if(type=='form'){
		contentType = 'application/x-www-form-urlencoded;charset=utf-8'
	}
	var _this = this;
	uni.request({
		url: bastUrl+url,
		data: param,
		dataType: 'json',
		method: 'PUT',
		header: {
			'custom-header': 'put',
			'clientType':'jsapi2',
			'content-type': contentType,
			'token':token|| uni.getStorageSync('token'),
			
		},
		success: (res) => {
			if (successCallback) {
				successCallback(res.data);
			}
			if (res.data.code == 4){
				if (ifLogin){
					preHandleResult(res.data);
				}
				ifLogin = false
			} else {
				ifLogin = true
				preHandleResult(res.data);
			}
		},
		fail: (res) => {
			preHandleResult(res.data);
			if (failCallback) {
				failCallback(res.data);
			}
		}
	});
}

function request_delete(url, param, successCallback, failCallback) {
	var _this = this;
	uni.request({
		url: bastUrl+url,
		data: param,
		dataType: 'json',
		method: 'DELETE',
		header: {
			'custom-header': 'delete',
			'clientType':'jsapi2',
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
			'token':token|| uni.getStorageSync('token'),
		},
		success: (res) => {
			if (successCallback) {
				successCallback(res.data);
			}
			if (res.data.code == 4){
				if (ifLogin){
					preHandleResult(res.data);
				}
				ifLogin = false
			} else {
				ifLogin = true
				preHandleResult(res.data);
			}
		},
		fail: (res) => {
			preHandleResult(res.data);
			if (failCallback) {
				failCallback(res.data);
			}
		}
	});
}
function request_file(url, param, successCallback, failCallback) {
	var _this = this;
	uni.request({
		url: bastUrl+url,
		method: 'POST',
		formData: {
			file: param.flie,
			prefixUrl:param.prefixUrl
		},
		filePath: param.flie,
		name: 'file',
		header: {
			'clientType':'jsapi2',
			'content-type':'multipart/form-data',
			'token':token|| uni.getStorageSync('token')
		},
		success: (res) => {
			if (successCallback) {
				successCallback(res.data);
			}
			if (res.data.code == 4){
				if (ifLogin){
					preHandleResult(res.data);
				}
				ifLogin = false
			} else {
				ifLogin = true
				preHandleResult(res.data);
			}
		},
		fail: (res) => {
			preHandleResult(res.data);
			if (failCallback) {
				failCallback(res.data);
			}
		}
	});
}
// 上面就是异步请求get/post/put/delete的封装了，到时候你直接导入正确传入参数就可以用这里的异步请求方法了。
// 当然需要先导出去，你才能导入其他地方引用。下面这就是导出。
// 你调用的时候是调 url_Request_get(url,param,success,fail) 方法。而不是function request_get(url,param,success,fail);
// 既然都导出去了，那我们就去别的地方引用去。
export default {
	url_Request_get: function(url, param, success, fail) {
		return request_get(url, param, success, fail);
	},
	url_Request_post: function(url, param, success, fail) {
		return request_post(url, param, success, fail);
	},
	url_Request_put: function(url, param, success, fail,type) {
		return request_put(url, param, success, fail,type);
	},
	url_Request_delete: function(url, param, success, fail) {
		return request_delete(url, param, success, fail);
	},
	url_Request_file: function(url, param, success, fail) {
		return request_file(url, param, success, fail);
	}
}
