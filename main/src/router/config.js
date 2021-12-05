import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
export const routes = [
  {
    path: '/main/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/main/index",
    children: [
      {
        path: '/main/index',
        name: 'Index',
        meta:{
          title: '首页',
        },
        component:  resolve => require(["../views/pages/Index.vue"], resolve),
      },
      {
        path: '/main/form',
        name: 'Form',
        meta:{
          title: '表单',
        },
        component:  resolve => require(["../views/pages/Form.vue"], resolve),
      },
      {
        path: '/main/list',
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