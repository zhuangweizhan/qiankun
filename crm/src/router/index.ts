import { qiankunWindow } from "vite-plugin-qiankun/dist/helper"
import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { routesConfig } from "./config"

const initRoutesName = (routes: any) => {
  const result = routes.map((item: any) => {
    const children = item.children && initRoutesName(item.children)
    return {
      ...item,
      children,
      name: item.path.slice(1, item.path.length).replace(/\//g, "-")
    }
  })
  return result
}

export const routes = [...routesConfig]

const history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? "/platform" : "/")
const router = createRouter({
  history,
  routes
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router
