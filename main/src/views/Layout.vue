<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo">掘金作者：逐步前行</div>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-sub-menu :key="index + ''" v-for="(item, index) in menu">
          <span slot="title">
            <span>{{ item.name }}</span>
          </span>
          <a-menu-item :key="index + '_' + cIndex" v-for="(cItem, cIndex) in item.children" @click="selecMenu(index, cIndex)">
            {{ cItem.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; font-weight: bold">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px">
          <div>
            个人微前端实践
            <a href="https://juejin.cn/user/4195392104696519">点击教程</a>
          </div>
          <div>
            <!--
            <span>
              当前全局主应用消息:<b style="color: red">{{ message }}</b>
            </span>
            -->
            <a-button v-if="!getToken" type="primary" @click="login">去登陆</a-button>
            <a-button v-if="getToken" type="primary" @click="out">退出</a-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 3px 0">
          <my-tabs></my-tabs>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <div v-show="$route.path.startsWith('/main')">
            <keep-alive :include="getCacheTabs" v-if="getToken">
              <router-view></router-view>
            </keep-alive>
            <div v-if="!getToken" style="text-align: center; margin-top: 200px">暂未登录，请登录</div>
          </div>

          <div v-for="o in microApps" v-show="$route.path.startsWith(o.activeRule)" :key="o.name">
            <KeepAlive>
              <div :id="o.container.slice(1)"></div>
            </KeepAlive>
          </div>

        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        掘金地址:
        <a href="https://juejin.cn/post/7025459298880733197">https://juejin.cn/post/7025459298880733197</a>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import qiankun from './qiankun.js';
import globalStore from '../globalStore/index.js';
import { mapGetters } from 'vuex';
import myTabs from '@/components/myTabs.vue';

export default {
  mixins: [qiankun],
  name: 'layout',
  components: { myTabs },
  data() {
    return {
      collapsed: false,
      menu: [
        {
          name: '主项目',
          children: [
            {
              name: '首页',
              path: '/main/index',
            },
            {
              name: '列表',
              path: '/main/list',
            },
          ],
        },
        {
          name: '客户项目',
          children: [
            {
              name: 'vite客户列表页',
              path: '/crm/list',
            },
            // {
            //   name: "vite客户详情页",
            //   path: "/crm/detail",
            // }
          ],
        },
        {
          name: '销售项目',
          children: [
            {
              name: 'sale项目test1',
              path: '/sale/test1',
            },
            {
              name: 'sale项目test2',
              path: '/sale/test2',
            },
            {
              name: 'sale项目test3',
              path: '/sale/test3',
            },
          ],
        },
      ],
    };
  },
  watch: {
    // $route() {
    //   this.resetRouter();
    // },
  },
  computed: {
    ...mapGetters(['getCacheTabs', 'getTabItems', 'getToken']),
    message() {
      return globalStore.getGlobalState('message');
    },
  },
  created() {
    console.log(`created成功`);
    this.resetRouter();
  },
  methods: {
    selecMenu(index, cIndex) {
      const path = this.menu[index].children[cIndex].path;
      const name = this.menu[index].children[cIndex].name;
      if (this.isQianKun()) {
        // 走qiankun路由
        const type = path.split('/')[1];
        this.$store.dispatch('setTabs', {
          name,
          path,
          componentName: path,
          type,
        });
      } else {
        // 走项目路由
        const componentName = this.$route.matched[1]['components']['default']['name'];
        // const path = this.$route.path; // 当前路由匹配到name
        // const name = this.$route.meta.title;
        this.$store.dispatch('setTabs', {
          name,
          path,
          componentName,
          type: 'main',
        });
      }
      this.$router.push({ path: this.menu[index].children[cIndex].path });
      this.isQianKun() && this.goQiankun(); // 走子项目路由
    },
    // 重新检查
    resetRouter() {
      // const path = this.$route.path; // 当前路由匹配到name
      // this.menu.forEach((item, index) => {
      //   item.children.forEach((cItem, cIndex) => {
      //     if (cItem.path === path) {
      //       this.selecMenu(index, cIndex);
      //     }
      //   });
      // });
      //重新设置一下tab
      this.isQianKun() && this.goQiankun(); // 走子项目路由
    },
    // 去登陆
    login() {
      this.$router.push('/main/login');
    },
    out() {
      this.$store.commit('setToken', '');
      this.$store.commit('clearTabs');
      window.location.reload();
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
