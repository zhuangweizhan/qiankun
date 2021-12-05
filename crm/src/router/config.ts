export const routesConfig = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'vite首页',
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      title: 'vite客户列表',
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/List.vue'),
  },
  {
    path: '/detail',
    meta: {
      title: 'vite客户详情',
    },
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Detail.vue'),
  },
];
