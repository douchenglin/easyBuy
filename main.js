import Vue from 'vue'
import App from './App'
import { bastUrl, apiUrl} from './wxApi/api.js'
import http from './wxApi/http.js'

Vue.config.productionTip = false
Vue.prototype.$api = apiUrl
Vue.prototype.$bastUrl = bastUrl
Vue.prototype.$http = http

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
