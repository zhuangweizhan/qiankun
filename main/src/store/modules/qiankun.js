import Cookies from "js-cookie";
import globalStore from "../../globalStore/index.js";
import router from '../../router';

const state = {
  tabItems: [], // 保存标签button的数组
  cacheTabs: [], // 保存需要缓存的数组
  activeTabs: 0,
};
const getters = {
  getTabItems(state) {
    return state.tabItems;
  },
  getCacheTabs(state) {
    return state.cacheTabs;
  },
  getActiveTabs(state) {
    return state.activeTabs;
  },
};

const mutations = {
  // 初始化tab
  initTabItem(){
    const tabItems = Cookies.get('tabItems');
    const activeTabs = Cookies.get('activeTabs');
    state.tabItems = tabItems ? JSON.parse(tabItems) : [];
    state.activeTabs = activeTabs ? activeTabs : 0;
  },
  // 设置页面显示tabItem
  setTabItems(state, data) {
    // 添加标签按钮，如果当前路由已经打开，则不再重复添加
    const index = state.tabItems.findIndex(item => item.path === data.path);
    if (index > -1) {
      state.activeTabs = index;
    } else {
      state.activeTabs++;
      state.tabItems.push({
        ...data,
      });
    }
    Cookies.set('tabItems',  state.tabItems);
    Cookies.set('activeTabs', state.activeTabs);
    setTimeout(() => {
      globalStore.setGlobalState({ type: 'redirectMainRoute', tabList: JSON.parse(JSON.stringify(state.tabItems)) });
    }, 100);
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
    Cookies.set('activeTabs', state.activeTabs);
  },
  // 删除对应的tab
  delTabs(state, index) {
    const isActive = router.app.$route.path == state.tabItems[index]['path'];
    const len = state.tabItems.length - 1;
    state.tabItems.splice(index, 1);
    (index == len || isActive) && router.push({ path: state.tabItems[state.tabItems.length - 1]['path'] });
    state.cacheTabs.splice(index, 1);
    Cookies.set('tabItems',  state.tabItems);
    Cookies.set('activeTabs', state.activeTabs);
  },
  clearTabs(state){
    state.tabItems = [];
    state.cacheTabs = [];
    state.activeTabs = 0;
    Cookies.set('tabItems',  []);
    Cookies.set('activeTabs', 0);
  }
};

const actions = {
  setTabs({ commit }, data) {
    commit('setTabItems', data);
    commit('setCacheTabs', data);
  },
  delTabs({ commit }, index) {
    commit('delTabs', index);
    commit('setActiveTabs', 0);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
