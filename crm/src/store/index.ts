import modules from "@/store/modules/index"
import { App, InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"
import { IStore } from "./types"

export const key: InjectionKey<Store<IStore>> = Symbol()

const store = createStore<IStore>({
  modules,
  plugins: [
    // createPersistedstate({
    //   // 缓存数据时的key
    //   key: "vuexxxxxxxx",
    //   // 哪些模块需要被缓存
    //   paths: ["qiankun"]
    // })
  ]
})

// 定义你自己的“useStore”组合函数
export function useStore() {
  return baseUseStore(key)
}

export function setupStore(app: App) {
  app.use(store, key)
}

export default store
