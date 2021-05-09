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
    store.commit("setInitialLoading", false);
  } catch (error) {
    console.log(error);
    /* 
      set setToken value to null instead of "{}" because Object is an truthy value,
      we need falsy value error 
      because isLoggedIn checking by the type data not by the value inside it
      null = falsy
      {} = truthy
    */
    store.commit("setToken", null);
    store.commit("setInitialLoading", false);
  }
  // store.commit("setLoading", false);
};
