import { IQianKunState } from "./state"

export const mutations = {
  setToken(state: IQianKunState, token: string) {
    state.token = token
  },
  setParentTabItem(state: IQianKunState, parentTabItem: any[]) {
    state.parentTabItem = parentTabItem
  },
  setCacheTabs(state: IQianKunState, cacheTabs: any[]) {
    state.cacheTabs = cacheTabs
  },
  setPermission(state: IQianKunState, permission: any[]) {
    state.permission = permission
  }
}
