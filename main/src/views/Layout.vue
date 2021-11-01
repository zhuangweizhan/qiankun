<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo">掘金作者：逐步前行</div>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-sub-menu :key="index + ''" v-for="(item, index) in menu">
          <span slot="title"
            ><span>{{ item.name }}</span></span
          >
          <a-menu-item
            :key="index + '_' + cIndex"
            v-for="(cItem, cIndex) in item.children"
            @click="selecMenu(index, cIndex)"
          >
            {{ cItem.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; font-weight: bold">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
          "
        >
          <div>
            个人微前端实践，博客地址：<a
              href="https://juejin.cn/user/4195392104696519"
              >https://juejin.cn/user/4195392104696519</a
            >
          </div>
          <div>
            <span>
              当前全局主应用消息:<b style="color: red">{{ message }}</b>
            </span>
            <a-button type="primary" @click="login">去登陆</a-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 3px 0">
          <my-tabs></my-tabs>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <keep-alive :include="getCacheTabs">
            <router-view></router-view>
          </keep-alive>

          <div
            v-for="o in microApps"
            v-show="$route.path.startsWith(o.prefixPath)"
            :key="o.name"
          >
            <KeepAlive>
              <div :id="o.container.slice(1)"></div>
            </KeepAlive>
          </div>

          <!--
          <div v-for="o in microApps" v-show="$route.path.startsWith(o.prefixPath)" :key="o.name" :id="o.container.slice(1)">
          -->
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import qiankun from "./qiankun.js";
import globalStore from "../globalStore/index.js";
import { mapGetters } from "vuex";
import myTabs from "@/components/myTabs.vue";

export default {
  mixins: [qiankun],
  name: "layout",
  components: { myTabs },
  data() {
    return {
      collapsed: false,
      menu: [
        {
          name: "main项目",
          children: [
            {
              name: "首页",
              path: "/index",
            },
            {
              name: "列表",
              path: "/list",
            },
            {
              name: "详情",
              path: "/form",
            },
          ],
        },
        {
          name: "erp项目",
          children: [
            {
              name: "erp项目test1",
              path: "/erp/test1",
            },
            {
              name: "erp项目test2",
              path: "/erp/test2",
            },
            {
              name: "erp项目test3",
              path: "/erp/test3",
            },
          ],
        },
        {
          name: "sale项目",
              children: [
            {
              name: "sale项目test1",
              path: "/sale/test1",
            },
            {
              name: "sale项目test2",
              path: "/sale/test2",
            },
            {
              name: "sale项目test3",
              path: "/sale/test3",
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route() {
      this.resetRouter();
    },
  },
  computed: {
    ...mapGetters(["getCacheTabs", "getTabItems"]),
    message() {
      return globalStore.getGlobalState("message");
    },
  },
  created() {
    console.log(`created成功`);
    this.resetRouter();
  },
  methods: {
    selecMenu(index, cIndex) {
      if (this.isQianKun()) {
        // 走qiankun路由
        const path = this.menu[index].children[cIndex].path;
        const name = this.menu[index].children[cIndex].name;
        const type = path.split('/')[1];
        this.$store.dispatch("setTabs", {
          name,
          path,
          componentName: path,
          type,
        });
      } else {
        // 走项目路由
        const componentName =
          this.$route.matched[1]["components"]["default"]["name"];
        const path = this.$route.path; // 当前路由匹配到name
        const name = this.$route.meta.title;
        this.$store.dispatch("setTabs", {
          name,
          path,
          componentName,
          type: "main",
        });
      }
      this.$router.push({ path: this.menu[index].children[cIndex].path });
    },
    // 重新检查
    resetRouter() {
      const path = this.$route.path; // 当前路由匹配到name
      console.log(`path===`, path);
      this.menu.forEach((item, index) => {
        item.children.forEach((cItem, cIndex) => {
          if (cItem.path === path) {
            this.selecMenu(index, cIndex);
          }
        });
      });
      //重新设置一下tab
      this.isQianKun() && this.goQiankun(); // 走子项目路由
    },
    // 去登陆
    login() {
      this.$router.push("login");
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center;
  color: white;
  line-height: 32px;
}
.ant-tabs-bar {
  margin: 0 !important;
}
</style>
