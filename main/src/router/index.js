import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './config'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const authInterceptor = (to, from, next) => {
  console.log(`主应用router监听,to`, to);
  next();
};



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(authInterceptor);


export default router
