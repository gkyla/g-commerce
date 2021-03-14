<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-6">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              id="password"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
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
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const password = ref(null);
    const email = ref(null);

    // Todo handle proxy

    function login() {
      axios
        .post("auth/login", {
          password,
          email,
        })
        .then((response) => {
          console.log(response);
        });
    }

    return { password, email, login };
  },
};
</script>

<style>
</style>