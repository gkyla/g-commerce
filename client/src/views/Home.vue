<template>
  <div class="home">
    <TheNavbar />
    <div v-if="user">Selamat Datang {{ user.email }}</div>
    <div v-if="user">Selamat Datang {{ user }}</div>
    <div v-if="user">Selamat Datang {{ user._id }}</div>
    <div v-if="user">Selamat Datang {{ user.token }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from "../components/TheNavbar";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    TheNavbar,
  },
  setup() {
    const user = ref(null);
    const store = useStore();

    onMounted(() => {
      axios.get("http://localhost:3000/auth/").then((res) => {
        user.value = res.data;
        store.commit("setToken", res.data);
      });
    });

    return { user };
  },
};
</script>
