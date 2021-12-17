// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Cookies from 'js-cookie'
import './assets/icons' // icon


import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'  
// import '../static/global/global.css'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import dataV from '@jiaminghi/data-view';
import './assets/font/font.css'

Vue.use(ElementUI) //使用elementUI
Vue.use(Vuex)
Vue.use(dataV);


Vue.prototype.$axios = axios
// Vue.prototype.$x2js = new x2js()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
