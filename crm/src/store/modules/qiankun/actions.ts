import { IStore } from "@/store/types"
import { ActionContext } from "vuex"
import { IQianKunState } from "./state"

const menusArray: any = []

export const actions = {
  // 初始化主应用
  async initMainProject({ commit, dispatch, getters }: ActionContext<IQianKunState, IStore>, obj: any) {
    console.log(`initMainProject.同步数据:`, obj)
    if (obj.token) {
      commit("setToken", obj?.token)
    }
    if (obj.permission) {
      commit("setPermission", obj?.permission)
    }
    if (obj.tabList) {
      const cacheTabs = obj.tabList
        .filter((item: any) => {
          return item.url.startsWith("/platform/")
        })
        .map((item: any) => {
          return (item.url.indexOf("?") ? item.url.split("?")[0] : item.url).replace("/platform/", "").replace(/\//gi, "-")
        })
      commit("setCacheTabs", cacheTabs)
      commit("setParentTabItem", obj.tabList)
    }
  },
  // 同步主应用
  async syncMainProject({ commit, dispatch, getters }: ActionContext<IQianKunState, IStore>, obj: any) {
    switch (obj.type) {
      case "redirectToken":
        commit("setToken", obj?.token)
        break
      case "resetPermission":
        commit("setPermission", obj?.permission)
        break
      case "redirectMainRoute":
        if (obj.tabList.length > 0) {
          const cacheTabs = obj.tabList
            .filter((item: any) => {
              return item.path.startsWith("/crm/")
            })
            .map((item: any) => {
              return (item.path.indexOf("?") ? item.path.split("?")[0] : item.path).replace("/crm/", "").replace(/\//gi, "-")
            })
          console.log(`cacheTabs========`,  cacheTabs);
          commit("setCacheTabs", cacheTabs)
          commit("setParentTabItem", obj.tabList)
          break
        }
    }
  }
}
