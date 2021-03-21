<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    {{ token }}
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { checkUser } from "../utilites/auth";

export default {
  setup() {
    const store = useStore();
    // checkUser();

    return {
      token: computed(() => store.state.userData)
    };
  }
};
</script>

<style></style>
