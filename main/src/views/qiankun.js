import { loadMicroApp, start } from 'qiankun';
import { mapGetters } from 'vuex';
import actions from '../globalStore';

export default {
  data() {
    return {
      crm: {},
      loadedApp: {},
      microApps: [
        {
          name: 'crm',
          entry: 'http://localhost:8081',
          container: '#crm_Container',
          activeRule: '/crm',
        },
        {
          name: 'sale',
          entry: 'http://localhost:8082',
          container: '#appChild2',
          activeRule: '/sale',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  methods: {
    isQianKun( routePath = this.$route.path ){
      const microApp = this.microApps.find(item => routePath.includes(item.activeRule));
      return microApp;
    },
    goQiankun( routePath = this.$route.path ) {
      const loadedApp = this.loadedApp;
      const microApp = this.microApps.find(item => routePath.includes(item.activeRule));
      // 如果是子应用
      if (microApp) {
        // 将主应用的路由转化为子路由URL
        const childRoutePath = routePath.replace(microApp.activeRule, '');
        // 如果没有加载当前子应用
        if (!loadedApp[microApp.name]) {
          // 开始加载
          const app = loadMicroApp({
            ...microApp,
            props: {
              token: this.getToken,
              getGlobalState: actions.getGlobalState // 下发getGlobalState方法
            }
          }); // 加载子应用
          // 开始完成
          app.loadPromise.then(() => {});
          loadedApp[microApp.name] = {
            // 将当前子应用存入loadedApp缓存
            app,
            subRoutes: [childRoutePath],
          };
        } else {
          // 如果已加载子应用,将子应用的路由记录到数组中
          const subRoutes = loadedApp[microApp.name].subRoutes;
          if (!subRoutes.includes(childRoutePath)) {
            subRoutes.push(childRoutePath);
          }
        }
        // 通知子应用增加 keep-alive 的 include
        actions.setGlobalState(loadedApp);
      }
      this.loadedApp = loadedApp;
      start();
    },
  },
};
