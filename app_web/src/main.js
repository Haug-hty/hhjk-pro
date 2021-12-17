// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import '../static/js/flexible.js'
import Mint from 'mint-ui'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'  
import 'mint-ui/lib/style.css'
import Vant from 'vant'
import 'vant/lib/index.css'


Vue.use(Vuex)
Vue.use(Mint)
Vue.use(Vant)
Vue.use(ElementUI) //使用elementUI
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
