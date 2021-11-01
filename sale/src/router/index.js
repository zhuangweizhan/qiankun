const routes = [
  {
    path: '/test1',
    name: 'test1',
    component:  resolve => import("../views/test1.vue")
  },
  {
    path: '/test2',
    name: 'test2',
    component:  resolve => import("../views/test2.vue")
  },
  {
    path: '/test3',
    name: 'test3',
    component:  resolve => import("../views/test3.vue")
  }
]


// export default router
export default routes
