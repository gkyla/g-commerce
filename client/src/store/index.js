import { createStore } from "vuex";

export default createStore({
  state: {
    userData: null, // need to be optional chaining
    initialLoading: true,
    isLoading: false
  },
  mutations: {
    setToken(state, payload) {
      state.userData = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setInitialLoading(state, status) {
      state.initialLoading = status;
    }
  },
  actions: {},
  modules: {}
});
