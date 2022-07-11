<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <div class="navbar-brand">
        <img
          src="../assets/icon-left-font.png"
          alt="logo"
          width="50"
          height="50"
          class="d-inline-block align-text-top"
        />
      </div>
      <span
        ><strong>Bonjour</strong> {{ userData.data.firstName }}
        {{ userData.data.lastName }}
      </span>
      <ul class="nav">
        <li class="nav-item mt-3 px-4">
          <router-link to="/" @click="logout">
            <font-awesome-icon
              icon="right-from-bracket"
              aria-label="Me déconnecter"
              title="Me deconnecter"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FeedHeader",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a {
  color: var(--color-tertiary);
}
.navbar {
  display: flex;
  justify-content: flex-end;
}
</style>
