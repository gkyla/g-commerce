<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
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
          <router-link
            v-if="isLoggedIn && isAdmin"
            class="nav-link"
            :to="{ name: 'Dashboard' }"
            >Dashboard</router-link
          >
          <router-link
            v-if="isLoggedIn"
            class="nav-link"
            :to="{ name: 'Account' }"
            >Akun</router-link
          >
          <router-link v-if="isLoggedIn" class="nav-link" :to="{ name: 'Cart' }"
            >Cart</router-link
          >
          <div
            class="d-flex flex-sm-column flex-md-row justify-content-center ms-sm-0 ms-md-3"
          >
            <router-link
              v-if="!isLoggedIn"
              class="nav-link"
              :to="{ name: 'Login' }"
              >Login</router-link
            >
            <router-link
              v-if="!isLoggedIn"
              class="btn btn-outline-danger ms-sm-0 ms-md-1"
              :to="{ name: 'Signup' }"
              ><i class="far fa-user"></i> Signup</router-link
            >

            <button
              v-if="isLoggedIn"
              class="btn btn-outline-danger ms-sm-0 ms-md-1"
              @click="logoutAccount"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { isLoggedIn } from "../utilites/auth";
import { computed } from "vue";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    /* 
      always use optional chaining because the initial value of the 
      userData is null on the vuex store
    */
    const isAdmin = computed(() => store.state.userData?.admin);

    function logoutAccount() {
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

    return { logoutAccount, isLoggedIn, isAdmin };
  }
};
</script>

<style></style>
