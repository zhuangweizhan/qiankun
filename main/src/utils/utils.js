import vue from "../main";
// import routes from '../router/config';

// console.log(`routes===`, routes);
export default {
  /*
    url: 跳转的路由路径
    delTab: 是否删除当前标签
    name: 调整的tab名称，不传将会获取配置中的名称
    obj.isRouterName: 是否打开router的name模式, meta路由额外参数
  */
  redirectPage(url, delTab = false, name, obj = {}) {
    console.log(`name=======`, name);
    const mainRoutes = vue.$router.options.routes[1].children;
    console.log(`mainRoutes`, mainRoutes);
    const path = url.indexOf("?") ? url.split("?")[0] : url; 
    const nowIndex = mainRoutes.findIndex(item => {
      return item.path === path
    })
    const isExistMain = nowIndex !== -1
    if( isExistMain ){ //主应用跳转
      console.log(`主=============`, name);
      const meta = obj.meta ? obj.meta :  mainRoutes[nowIndex].meta;
      const routerName = name || meta.title;
      vue.$store.dispatch("setTabs", { path: url, name: routerName, delTab }).then(() => {
        console.log(`11.=============`, path);
      })
      vue.$router.push({ path: url });
    } else { //子应用跳转
      console.log(`子=============`, url);
      vue.$store.dispatch("setTabs", { path: url, name, delTab }).then(() => {
        console.log(`22.=============`, path);
      })
      vue.$router.push({ path: url });
    }

    // vue.$store.dispatch("setTabs", { url, name: routerName, delTab, isRouterName: obj.isRouterName }).then(() => {
    //   vue.$router.push({ path });
    // }); // 更新$store，主要是通知common/index更新标签
    // const childRouters = vue.$store.getters.childRouters; // 子应用路由
    //
    // let routerObj = routes.find(item => item.path === path) // 将要跳转的菜单名
    // const meta = obj.meta ? obj.meta :  { meta: "" };
    // routerObj = routerObj || meta;
    // const routerName = name || routerObj.meta.title;
    // Vue.$store.dispatch("setTabs", { url, name: routerName, delTab, isRouterName: obj.isRouterName }).then(() => {
    //   Vue.$router.push({ path });
    // }); // 更新$store，主要是通知common/index更新标签
  },
}