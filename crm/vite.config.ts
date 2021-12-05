import vue from '@vitejs/plugin-vue'
import path from "path"
import { defineConfig } from 'vite'
import qiankun from "vite-plugin-qiankun"
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    qiankun("crmMicro", { useDevMode: true }),
    styleImport({
      libs: [{
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/css`;
        },
      }]
    })
  ],
  server: {
    port: 8081,
  },
  base: `http://localhost:8080/`,
  publicDir: "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")  //  __dirname 和 path 显示红色的波浪线需要安装插件npm i @types/node -S 
    }
  }
})