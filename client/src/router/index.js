import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
import { checkUser, isLoggedIn } from "../utilites/auth";
import { computed } from "@vue/runtime-core";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    meta: { requiresLogin: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresLogin: true },

    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signUp" */ "../views/Signup.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "signUp" */ "../views/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresLogin = to.matched.some(record => record.meta.requiresLogin);
  const initialLoading = computed(() => store.state.initialLoading);
  // Check user every changing a route

  if (initialLoading.value) {
    await checkUser();
  }

  if (requiresLogin) {
    if (!isLoggedIn.value) {
      return next("/login");
    }
    return next();
  } else {
    if (to.path === "/login") {
      console.log("wow");
      return next();
    }
    if (to.path === "/signup") {
      return next();
    }

    checkUser();
  }
  next();
});

export default router;
