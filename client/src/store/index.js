import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {},
    isLoading: false
  },
  mutations: {
    setToken(state, payload) {
      state.userData = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {},
  modules: {}
});
