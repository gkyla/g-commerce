import { createStore } from "vuex";

export default createStore({
  state: {
    userData: null
  },
  mutations: {
    setToken(state, payload) {
      state.userData = payload;
    }
  },
  actions: {},
  modules: {}
});
