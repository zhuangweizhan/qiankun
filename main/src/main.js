import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Vue from 'vue';
import App from './App.vue';
import "./registerServiceWorker";
import router from './router';
import store from './store';

Vue.config.productionTip = false
Vue.use(Antd);

const vue =new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue;

// import Vue from 'vue';
// import Antd from 'ant-design-vue';
// import App from './App';
// import 'ant-design-vue/dist/antd.css';
// Vue.config.productionTip = false;

// Vue.use(Antd);

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>',
// });