import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { state } from "./state";

export type { IQianKunState } from "./state";

export default {
  // namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
