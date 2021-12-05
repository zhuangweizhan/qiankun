import Cookies from "js-cookie";
import globalStore from "../../globalStore/index.js";

const state = {
  token: '' 
};
const getters = {
  getToken(state) {
    globalStore.setGlobalState({ type: 'redirectToken', token: state.token ? state.token :  Cookies.get('token') });
    return state.token ? state.token :  Cookies.get('token');
  }
};

const mutations = {
  // 初始化tab
  setToken(state , token){
    state.token  = token;
    Cookies.set('token', token);
    setTimeout(() => {
      globalStore.setGlobalState({ type: 'redirectToken', token });
    }, 100);
  }
};

const actions = {

};

export default {
  state,
  getters,
  mutations,
  actions,
};
