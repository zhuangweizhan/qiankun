import { IQianKunState } from "./state"

export const getters = {
  token: (state: IQianKunState) => state.token,
  cacheTabs: (state: IQianKunState) => state.cacheTabs,
  parentTabItem: (state: IQianKunState) => state.parentTabItem,
  permission: (state: IQianKunState) => state.permission
}
