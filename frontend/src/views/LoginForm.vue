<template>
  <div class="container">
    <HeaderLogo />
    <!-- Login et SignUp-->
    <b-tabs content-class="mt-3" justified>
      <b-tab title="Login" active>
        <Login />
      </b-tab>
      <b-tab title="Register">
        <Signup />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import HeaderLogo from "@/components/HeaderLogo.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";

export default {
  name: "LoginForm",
  components: {
    HeaderLogo,
    Login,
    Signup,
  },
};
</script>
<style>
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-bottom: 3px solid var(--color-tertiary);
  border-top: none;
  border-right: none;
  border-left: none;
}
</style>
