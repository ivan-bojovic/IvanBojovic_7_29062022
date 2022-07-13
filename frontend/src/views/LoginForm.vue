<template>
  <div class="container">
    <HeaderLogo />
    <!-- Login et SignUp-->
    <b-tabs v-model="activeTab" content-class="mt-3" justified>
      <b-tab title="Login" active>
        <Login />
      </b-tab>
      <b-tab title="Register">
        <Signup @signUpDone="openLoginTab" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import HeaderLogo from "@/components/HeaderLogo.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import { mapState } from "vuex";

export default {
  name: "LoginForm",
  components: {
    HeaderLogo,
    Login,
    Signup,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
  },
  mounted() {
    if (this.userData) this.$router.push("/Feed");
  },
  methods: {
    openLoginTab() {
      this.activeTab = 0;
    },
  },
};
</script>
<style>
.nav-link {
  color: var(--color-tertiary);
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-bottom: 3px solid var(--color-primary);
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: var(--color-secondary);
  color: var(--color-tertiary);
}
.tabs {
  margin-top: 80px;
}
</style>
