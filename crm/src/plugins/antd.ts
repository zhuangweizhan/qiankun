import Antd from "ant-design-vue"
import type { App } from "vue"
import "./antd.css"

export function setupAntd(app: App<Element>) {
  app.use(Antd)
}
