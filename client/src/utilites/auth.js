import store from "../store";
import { computed } from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;

/* Always use computed property on vuex store val in order to be reactive state */

const API_AUTH = "http://localhost:3000/auth";

export const isLoggedIn = computed(() => store.state.userData);

export const checkUser = async () => {
  // store.commit("setLoading", true);
  try {
    const res = await axios(API_AUTH, {
      withCredentials: true
    });
    console.log(res.data);
    store.commit("setToken", res.data);
  } catch (error) {
    console.log(error);
    store.commit("setToken", null);
  }
  // store.commit("setLoading", false);
};
