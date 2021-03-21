import { createStore } from "vuex";

export default createStore({
  state: {
    userData: null,
    isLoading: true
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
