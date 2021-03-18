import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {},
  modules: {},
});
