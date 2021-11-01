import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cacheTabs:[], // 保存需要缓存的数组
    parentTabItem:[{}],// 父级tabs的同步数据
  },
  getters:{
    getCacheTabs(state){
      return state.cacheTabs;
    },
    getParentTabItem(state){
      return state.parentTabItem;
    },
  },
  mutations: {
    setCacheTabs(state, cacheTabs){
      state.cacheTabs = cacheTabs;
    },
    setParentTabItem(state, parentTabItem){
      state.parentTabItem = parentTabItem;
    },
  },
  actions: {
    reloadCashsTabs({commit}, data) {
      const cacheTabs = data.filter((item)=>{
        return item.type === 'erp'
      }).map( item =>{
        return item.path.replace('/erp/', '');
      })
      commit('setCacheTabs', cacheTabs);
      commit('setParentTabItem', data);
    },
  },
  modules: {
  }
})
