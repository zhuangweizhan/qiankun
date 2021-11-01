// import Vue from 'vue'
// import Antd from 'ant-design-vue';
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import 'ant-design-vue/dist/antd.css';

// Vue.config.productionTip = false
// Vue.use(Antd);

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
import registerMainStore from '../../main/src/globalStore/register';

let router = null;
let instance = null;
let history = null;


function render(props = {}) {
  const { container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/sale' : '/');
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.use(store);
  instance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props) {
  if (props.onGlobalStateChange) {
    props.onGlobalStateChange((value, prev) => {
      store.dispatch('reloadCashsTabs', value.tabs);
      console.log(`[子应用sale接受数据成功 - ${props.name}]:`, value, prev);
    }, true);
  }
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
        messages: "llllll",
        developer: props.developer
      }
    });
}

export async function bootstrap(props) {
  console.log('sale子应用bootstrap启动成功');
  registerMainStore(store, props);
}
export async function mount(props) {
  console.log('sale子应用mount了一下');
  storeTest(props);
  render(props);
  registerMainStore(store, props);
}
export async function unmount() {
  console.log('sale子应用unmount了一下');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
