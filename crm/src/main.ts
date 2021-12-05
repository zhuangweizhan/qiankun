import { setupAntd } from "@/plugins/antd"
import { routes } from "@/router"
import { setupStore } from "@/store"
import { qiankunWindow, renderWithQiankun } from "vite-plugin-qiankun/dist/helper"
import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import registerMainStore from '../../main/src/globalStore/register'
import App from "./App.vue"
import store from "./store"



let instance: any = null
const history: any = null
function render(props: any = {}) {
  const { container } = props
  instance = createApp(App)
  setupAntd(instance) // 引入antd
  setupStore(instance) // 引入store
  const history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? "/crm" : "/")
  const router = createRouter({
    history,
    routes
  })

  instance.use(router)
  instance.mount(container ? container.querySelector("#app") : document.getElementById("app"))
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log("crm正在作为子应用运行")
  }
}

function storeMonitor(props: any) {
  if (props.onGlobalStateChange) {
    props.onGlobalStateChange((value: any, prev: any) => {
      console.log(`[子应用crm接受数据成功]:`, value)
      store.dispatch("syncMainProject", value)
    }, true)
  }
}

renderWithQiankun({
  bootstrap() {
    console.log("crm,vue3启动成功")
  },
  mount(props) {
    store.dispatch("initMainProject", props)
    storeMonitor(props)
    render(props)
    registerMainStore(store, props)
  },
  unmount(props) {
    console.log("crm已卸载")
    instance.unmount()
    instance._container.innerHTML = ""
    history.destroy() // 不卸载  router 会导致其他应用路由失败
    instance = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log(`主应用crm启动`)
  render()
}
