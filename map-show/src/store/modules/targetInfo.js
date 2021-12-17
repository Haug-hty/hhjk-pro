/** 编辑器状态管理 */
  
  const state = {
    targetInfo:{
      id:0,
    }
  }
  const mutations = {  
    targetInfo(state,id){  
      state.targetInfo.id = id
    }
  }
  
  
  const actions = {  
    changeTargetId(context,param){
      context.commit('targetInfo',param)
    }
  }  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  