<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    {{ token }}
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    axios
      .get("http://localhost:3000/auth", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res, "from dashboard");
        store.commit("setToken", res.data);
      });

    return {
      token: computed(() => store.state.userData),
    };
  },
};
</script>

<style></style>
