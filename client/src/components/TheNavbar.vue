<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" :to="{ name: 'Home' }"
            >Home</router-link
          >
          <router-link class="nav-link" :to="{ name: 'Dashboard' }"
            >Dashboard</router-link
          >
          <router-link class="nav-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
          <button class="nav-link" @click="logoutAccount">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    function logoutAccount() {
      console.log("test");
      axios
        .get("http://localhost:3000/auth/logout", {
          withCredentials: true
        })
        .then(res => {
          console.log(res); // the Message
          store.commit("setToken", null);
          router.push("/login");
        })
        .catch(err => console.log(err));
    }

    return { logoutAccount };
  }
};
</script>

<style></style>
