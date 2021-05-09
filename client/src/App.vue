<template>
  <div id="root">
    <TheNavbar />
    <!-- <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <router-view v-if="!isLoading"></router-view>
    <div v-if="isLoading">
      <img src="./assets/loading.gif" alt="Loading" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import TheNavbar from "./components/TheNavbar";
import { checkUser } from "./utilites/auth";

export default {
  components: {
    TheNavbar
  },
  setup() {
    checkUser();
    const store = useStore();
    return { isLoading: computed(() => store.state.isLoading) };
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 0.2s ease all;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: #42b983 !important;
}
</style>
