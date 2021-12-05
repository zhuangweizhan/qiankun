/**
 * @param {vuex实例} store 
 * @param {qiankun下发的props} props 
 */
 function registerMainStore(store, props = {}) {
    if (!store || !store.hasModule) {
      return
    }
    // 获取初始化的state
    const initState = props.getGlobalState && props.getGlobalState() || {
      token: "",
      // messages: "子应用",
      // user: {}
    }
    console.log(`首次registerMainStore，props`, props, props.getGlobalState);
  
    // 将父应用的数据存储到子应用中，命名空间固定为global
    if (!store.hasModule('global')) {
      // 这里是全局的store
      const globalModule = {
        namespaced: true,
        state: initState,
        actions: {
          // 子应用改变state并通知父应用
          setGlobalState({ commit }, payload) {
            commit('setGlobalState', payload)
            commit('emitGlobalState', payload)
          },
          // 初始化，只用于mount时同步父应用的数据
          initGlobalState({ commit }, payload) {
            commit('setGlobalState', payload)
          },
        },
        mutations: {
          setGlobalState(state, payload) {
            // eslint-disable-next-line
            state = Object.assign(state, payload)
          },
          // 通知父应用
          emitGlobalState(state) {
            console.log(`通知父应用成功，参数为:`, state);
            if (props.setGlobalState) {
              props.setGlobalState(state)
            }
          },
        },
      }
      store.registerModule('global', globalModule)
    } else {
      // 每次mount时，都同步一次父应用数据
      store.dispatch('global/initGlobalState', initState)
    }
  }
  
  export default registerMainStore