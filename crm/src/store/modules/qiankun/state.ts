export type IQianKunState = {
  token: string,
  parentTabItem: any[]
  cacheTabs: any[]
  permission: any[] // 用户的权限
}

export const state: IQianKunState = {
  token: '',
  parentTabItem: [],
  cacheTabs: [], // 用户的权限
  permission: [] // 菜单
}
