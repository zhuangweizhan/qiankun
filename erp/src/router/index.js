import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/test1',
    name: 'test1',
    component:  resolve => require(["../views/test1.vue"], resolve)
  },
  {
    path: '/test2',
    name: 'test2',
    component:  resolve => require(["../views/test2.vue"], resolve)
  },
  {
    path: '/test3',
    name: 'test3',
    component:  resolve => require(["../views/test3.vue"], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// export default router
export default routes
