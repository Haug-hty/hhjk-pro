import Vue from 'vue'
import Vuex from 'vuex'
import targetInfo from './modules/targetInfo'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    targetInfo
  },
  getters
})

export default store
