
import store from "@/store"

/* 
    url:具体路径
    delTab: 是否删除当前tab
    name: 自定义tab的名称
*/

export const redirectMainRouter = (url: string, obj: { delTab?: boolean; name?: string } = { delTab: false, name: "新标签" }) => {
    store.dispatch("global/setGlobalState", {
      type: "redirectRoute",
      routerMessage: { url: `${url}`, delTab: obj.delTab, name: obj.name }
    })
  }
  