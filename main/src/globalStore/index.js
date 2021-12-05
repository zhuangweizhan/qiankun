import { initGlobalState } from 'qiankun';
import Vue from 'vue';
import utils from "../utils/utils";

// 父应用的初始state
// Vue.observable 让initialState变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
const initialState = Vue.observable({
  type: "",
  routerMessage: "",
  isLogin: false,
  token: "",
  tabList: []
});

const actions = initGlobalState(initialState);

actions.onGlobalStateChange((state, prev) => {
  // newState: 变更后的状态; prev 变更前的状态
  console.log('主应用监听变化', state, prev);
  //  console.log('主应用监听store变化', JSON.stringify(newState), JSON.stringify(prev))
  const newState = JSON.parse( JSON.stringify(state));
  console.log('newState', newState);
  for (const key in newState) {
    initialState[key] = newState[key]
  }
  if (newState.type === "redirectRoute") {
    newState.type = "";
    const { url, delTab, name } = newState.routerMessage;
    utils.redirectPage(url, delTab, name);
  }
});

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = key => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  console.log('主应用监听store获取', key);
  return key ? initialState[key] : initialState;
};

export default actions;
