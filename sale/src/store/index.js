import { createStore } from 'vuex';

export default createStore({
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
      console.log(`data===`, data);
      const cacheTabs = data.filter((item)=>{
        return item.type === 'sale'
      }).map( item =>{
        return item.path.replace('/sale/', '');
      })
      commit('setCacheTabs', cacheTabs);
      commit('setParentTabItem', data);

    },
  },
  modules: {
  }
})
