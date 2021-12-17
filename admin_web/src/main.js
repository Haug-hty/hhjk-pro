// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import * as echarts from 'echarts'
import axios from 'axios'
import Vuex from 'vuex'
import VDistpicker from 'v-distpicker'
Vue.use(ElementUI) //使用elementUI
Vue.prototype.$echarts = echarts; //使用echarts

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Vuex)
Vue.component('v-distpicker', VDistpicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
