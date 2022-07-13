<template>
  <div class="container">
    <form>
      <!-- Nom -->
      <div class="form-outline mb-4">
        <label class="form-label" for="registerLastName">Nom</label>
        <input
          v-model="dataSignup.lastName"
          type="text"
          id="lastName"
          class="form-control"
          aria-describedby="Nom"
          required
          minlength="2"
          @blur="checkLastName"
        />
        <span class="errorMsg" v-if="lastNameError">{{ lastNameError }}</span>
      </div>

      <!-- Prénom -->
      <div class="form-outline mb-4">
        <label class="form-label" for="registerFirstName">Prénom</label>
        <input
          v-model="dataSignup.firstName"
          type="text"
          id="firstName"
          class="form-control"
          required
          aria-describedby="Prénom"
          minlength="2"
          @blur="checkFirstName"
        />
        <span class="errorMsg" v-if="firstNameError">{{ firstNameError }}</span>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="registerEmail">Email</label>
        <input
          v-model="dataSignup.email"
          type="email"
          id="email"
          class="form-control"
          aria-describedby="email"
          required
          @blur="checkEmail"
        />
        <span class="errorMsg" v-if="emailError">{{ emailError }}</span>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="registerPassword">Mot de passe</label>
        <input
          v-model="dataSignup.password"
          type="password"
          id="password"
          class="form-control"
          required
          minlength="8"
          aria-describedby="mot de passe"
          @blur="checkPassword"
        />
        <p class="help">
          (entre 8 et 20 caractères, sans espace et au minimum 1 chiffre, 1
          minuscule et 1 majuscule)
        </p>
        <span class="errorMsg" v-if="passwordError">{{ passwordError }}</span>
      </div>

      <!-- Repeat Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="passwordConfirmation"
          >Confirmer votre mot de passe</label
        >
        <input
          v-model="dataSignup.passwordConfirmation"
          type="password"
          id="passwordConfirmation"
          class="form-control"
          required
          minlength="8"
          @blur="checkPasswordConfirmation"
        />
        <span class="errorMsg" v-if="passwordConfirmationError"
          >{{ passwordConfirmationError }}
        </span>
      </div>
      <p id="signupError"></p>

      <!-- Submit button -->
      <button
        :disabled="!formValid"
        @click="signup()"
        type="button"
        class="btn btn-secondary btn-block mb-3"
      >
        S'inscrire
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import checkField from "../checkField";

export default {
  name: "Signup",

  data() {
    return {
      dataSignup: {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
      },
      lastNameError: "",
      firstNameError: "",
      emailError: "",
      passwordError: "",
      passwordConfirmationError: "",
    };
  },
  computed: {
    formValid() {
      if (
        this.dataSignup.lastName == "" ||
        this.dataSignup.firstName == "" ||
        this.dataSignup.email == "" ||
        this.dataSignup.password == "" ||
        this.dataSignup.passwordConfirmation == ""
      )
        return false;
      if (
        this.lastNameError == "" &&
        this.firstNameError == "" &&
        this.emailError == "" &&
        this.passwordError == "" &&
        this.passwordConfirmationError == ""
      )
        return true;
      else return false;
    },
  },
  methods: {
    checkLastName() {
      console.log("check", this.dataSignup.lastName);
      if (checkField("Alpha", this.dataSignup.lastName) == false)
        this.lastNameError = "le nom ne pas bien écrit";
      else this.lastNameError = "";
    },
    checkFirstName() {
      console.log("check", this.dataSignup.firstName);
      if (checkField("Alpha", this.dataSignup.firstName) == false)
        this.firstNameError = "le prénom ne pas bien écrit";
      else this.firstNameError = "";
    },
    checkEmail() {
      console.log("check", this.dataSignup.email);
      if (checkField("Email", this.dataSignup.email) == false)
        this.emailError = "seulement email groupomania.fr accepté";
      else this.emailError = "";
    },
    checkPassword() {
      console.log("check", this.dataSignup.password);
      if (checkField("Password", this.dataSignup.password) == false)
        this.passwordError = "password invalid";
      else this.passwordError = "";
    },
    checkPasswordConfirmation() {
      console.log("check", this.dataSignup.passwordConfirmation);
      if (this.dataSignup.password !== this.dataSignup.passwordConfirmation)
        this.passwordConfirmationError =
          "Veuillez confirmer votre mot de passe";
      else this.passwordConfirmationError = "";
    },
    signup() {
      axios
        .post("http://localhost:3000/api/auth/signup", this.dataSignup)
        .then((response) => {
          console.log(response);
          alert("Inscription validée, connectez vous !");
          this.$emit("signUpDone");
        })
        .catch((error) => {
          console.log(error);
          const errorMsg = document.getElementById("signupError");
          errorMsg.textContent = "Champ(s) manquants ou erronés";
        });
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
#signupError {
  color: red;
  text-align: center;
}
.btn-secondary {
  background-color: var(--color-tertiary);
}
.help {
  font-size: 10px;
  margin: 0px;
}
.form-label {
  background-color: var(--color-secondary);
  color: var(--color-tertiary);
}
</style>
