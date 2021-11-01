import { initGlobalState } from 'qiankun';
import Vue from 'vue';

// 父应用的初始state
// Vue.observable 让initialState变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
const initialState = Vue.observable({
  message: '未设置',
  tabs: [],
});

const actions = initGlobalState(initialState);

actions.onGlobalStateChange((newState, prev) => {
  // newState: 变更后的状态; prev 变更前的状态
  console.log('主应用监听变化', newState, prev);
  //  console.log('主应用监听store变化', JSON.stringify(newState), JSON.stringify(prev))
  for (const key in newState) {
    initialState[key] = newState[key]
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
