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
    path: "/account",
    name: "Account",
    meta: { requiresLogin: true },
    // route level code-splitting
    // this generates a separate chunk (account.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresLogin: true, requiresAdmin: true },

    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { requiresLogin: true },

    component: () => import(/* webpackChunkName: "cart" */ "../views/Cart.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { noNeedIdentity: true },

    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    meta: { noNeedIdentity: true },
    component: () =>
      import(/* webpackChunkName: "signUp" */ "../views/Signup.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresLogin = to.matched.some(record => record.meta.requiresLogin);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const noNeedIdentity = to.matched.some(record => record.meta.noNeedIdentity);

  const initialLoading = computed(() => store.state.initialLoading);
  const isAdmin = computed(() => store.state.userData?.admin);
  // Check user every changing a route

  if (initialLoading.value) {
    await checkUser();
  } else {
    // Change route without waiting the auth status
    checkUser();
  }

  if (requiresLogin) {
    if (requiresAdmin) {
      if (!isLoggedIn.value) {
        return next("/login");
      }

      if (!isAdmin.value) {
        return next("/");
      }

      return next();
    } else {
      if (!isLoggedIn.value) {
        return next("/login");
      }

      return next();
    }

    // return next();
  } else {
    if (noNeedIdentity) {
      return next();
    }

    next();
  }
});

export default router;
