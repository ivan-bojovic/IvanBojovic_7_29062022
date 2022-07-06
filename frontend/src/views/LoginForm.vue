<template>
<div class="container">
    <HeaderLogo />
<!-- Login et SignUp-->
<ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  <li class="nav-item" role="presentation">
    <a class="nav-link active" id="tab-login" role="tab"
      aria-controls="pills-login" aria-selected="true" @click="tabMode='Login'">Login</a>
  </li>
  <li class="nav-item" role="presentation">
    <a class="nav-link " id="tab-register"  role="tab"
      aria-controls="pills-register" aria-selected="false" @click="tabMode='Register'">Register</a>
  </li>
</ul>
<!-- Pills navs -->

<!-- Pills content -->
<div class="tab-content">
  <div class="tab-pane fade show active" v-if=" tabMode === 'Login'" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
    <form>
      

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input 
        v-model="dataLogin.email"
        type="email" 
        id="loginName" 
        class="form-control"
        aria-describedby="email"  />
        <label class="form-label" for="loginName">Email</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input 
         v-model="dataLogin.password"
         type="password" 
         id="loginPassword" 
         class="form-control"
         aria-describedby="password" />
        <label class="form-label" for="loginPassword">Mot de passe</label>
      </div>  

      <!-- Submit button -->

      <button @click="login()" 
      type="button" 
      class="btn btn-secondary btn-block mb-3" 
      :disable="checkDataLogin()">
      Connexion
      </button>

    </form>
  </div>
  
</div> 
</div>     
</template>

<script>
import HeaderLogo from "../components/HeaderLogo.vue";
import axios from "axios";

export default {
  name: "LoginForm",
  components: {
    HeaderLogo
  },
  data() {

    return {
      tabMode: "Login",
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
        
         this.$store.commit('setUserData', response)
  
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
.nav-link.active{
  background: none;
  color:black;
  border-bottom: 4px solid black;

}
</style>
