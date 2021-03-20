<template>
  <div class="home">
    <div v-if="user">Selamat Datang {{ user.email }}</div>
    <div v-if="user">Selamat Datang {{ user }}</div>
    <div v-if="user">Selamat Datang {{ user._id }}</div>
    <div v-if="user">Selamat Datang {{ user.token }}</div>
    <div>userData {{ userData }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { computed, nextTick, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",

  setup() {
    const user = ref(null);
    const store = useStore();
    const userData = computed(() => store.state.userData);

    axios
      .get("http://localhost:3000/auth/", {
        withCredentials: true
      })
      .then(res => {
        user.value = res.data;
        store.commit("setToken", res.data);
      });

    return { user, userData };
  }
};
</script>
