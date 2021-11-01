import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: '/index',
        name: 'Index',
        meta:{
          title: '首页',
        },
        component:  resolve => require(["../views/pages/Index.vue"], resolve),
      },
      {
        path: '/form',
        name: 'Form',
        meta:{
          title: '表单',
        },
        component:  resolve => require(["../views/pages/Form.vue"], resolve),
      },
      {
        path: '/list',
        name: 'List',
        meta:{
          title: '列表',
        },
        component:  resolve => require(["../views/pages/List.vue"], resolve),
      },
    ],
  },
  {
    path: '*',
    name: 'Layout',
    component: Layout
  },
]

const authInterceptor = (to, from, next) => {
  console.log(`主应用router监听`);
  next();
};



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(authInterceptor);


export default router
