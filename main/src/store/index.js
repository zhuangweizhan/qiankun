import Vue from 'vue';
import Vuex from 'vuex';
import globalStore from '../globalStore';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabItems: [], // 保存标签button的数组
    cacheTabs: [], // 保存需要缓存的数组
    activeTabs: -1,
  },
  getters: {
    getTabItems(state) {
      return state.tabItems;
    },
    getCacheTabs(state) {
      return state.cacheTabs;
    },
    getActiveTabs(state) {
      return state.activeTabs;
    },
  },
  mutations: {
    // 设置页面显示tabItem
    setTabItems(state, data) {
      // 添加标签按钮，如果当前路由已经打开，则不再重复添加
      const index = state.tabItems.findIndex(item => item.path === data.path);
      if (index >= 0) {
        state.activeTabs = index;
      } else {
        state.activeTabs++;
        state.tabItems.push({
          ...data,
        });
      }
      globalStore.setGlobalState({ tabs: state.tabItems }); //同步所有的子项目
    },
    // 设置当前页面keep-active缓存数据
    setCacheTabs(state, data) {
      if (state.cacheTabs.includes(data.componentName)) {
        return;
      } else {
        state.cacheTabs.push(data.componentName);
      }
    },
    // 设置当前生效的数据
    setActiveTabs(state, activeTabs) {
      state.activeTabs = activeTabs;
    },
    // 删除对应的tab
    clearTabs(state, index) {
      const isActive = router.app.$route.path == state.tabItems[index]['path'];
      const len = state.tabItems.length - 1;
      state.tabItems.splice(index, 1);
      (index == len || isActive) && router.push({ path: state.tabItems[state.tabItems.length - 1]['path'] });
      state.cacheTabs.splice(index, 1);
    },
  },
  actions: {
    setTabs({ commit }, data) {
      commit('setTabItems', data);
      commit('setCacheTabs', data);
    },
    clearTabs({ commit }, index) {
      commit('clearTabs', index);
      commit('setActiveTabs', 0);
    },
  },
});
