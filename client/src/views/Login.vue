<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-6">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              id="exampleCheck1"
              type="checkbox"
              class="form-check-input"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const password = ref(null);
    const email = ref(null);
    const router = useRouter();
    const store = useStore();
    // Todo handle proxy

    function login() {
      console.log(password.value, email.value);
      axios
        .post(
          "http://localhost:3000/auth/login",
          {
            password: password.value,
            email: email.value
          },
          {
            withCredentials: true
          }
        )
        .then(response => {
          store.commit("setToken", response.data);
          router.push("/");
        })
        .catch(error => console.log(error));
    }

    return { password, email, login };
  }
};
</script>

<style></style>
