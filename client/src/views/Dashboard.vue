<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    {{ token }}
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    axios.get("/auth").then((res) => {
      console.log(res, "from dashboard");
    });

    return {
      token: store.state.token,
    };
  },
};
</script>

<style>
</style>