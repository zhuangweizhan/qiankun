import { createStore } from 'vuex'

// 获取modules文件夹下所有ts文件
const files: any = import.meta.globEager("./modules/*.ts")
let modules: any = {}
Object.keys(files).forEach((key) => {
  // 将获取到结果按照 key:value 的形式存放到modules对象中
  modules[key.replace(/(\.\/|\modules\/|\.ts)/g, '')] = files[key].default
})
console.log('模块',modules)
export default createStore({
  modules
})