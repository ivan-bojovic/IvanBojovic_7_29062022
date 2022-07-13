<template>
  <form>
    <!-- Email input -->
    <div class="form-outline mb-4">
      <input
        v-model="dataLogin.email"
        type="email"
        id="loginName"
        class="form-control"
        aria-describedby="email"
      />
      <label class="form-label" for="loginName">Email</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input
        v-model="dataLogin.password"
        type="password"
        id="loginPassword"
        class="form-control"
        aria-describedby="password"
      />
      <label class="form-label" for="loginPassword">Mot de passe</label>
    </div>

    <!-- Submit button -->
    <button
      @click="login()"
      type="button"
      class="btn btn-secondary btn-block mb-3"
      :disabled="checkDataLogin()"
    >
      Connexion
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    checkDataLogin: function () {
      if (!this.dataLogin.email || !this.dataLogin.password) {
        return true;
      } else if (this.dataLogin.email && this.dataLogin.password) {
        return false;
      }
    },

    login: function () {
      axios
        .post("http://localhost:3000/api/auth/login", this.dataLogin)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$store.commit("setUserData", response);
          console.log(response);
          this.$router.push("/Feed");
        })
        .catch((error) => {
          console.log(error);
          const errorMsg = document.getElementById("loginError");
          errorMsg.textContent =
            "Votre email ou votre mot de passe est incorrect";
        });
    },
  },
};
</script>

<style scoped>
.btn-secondary {
  background-color: var(--color-tertiary);
}
.form-label {
  background-color: var(--color-secondary);
  color: var(--color-tertiary);
}
</style>
