<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <div class="navbar-brand"></div>
      <span v-if="userData"
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
      this.$store.commit("setUserData", undefined);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a {
  color: var(--color-tertiary);
}
.container-fluid {
  background-color: var(--color-secondary);
}
.navbar {
  display: flex;
  justify-content: center;
}
.nav {
  margin-bottom: 1rem;
}
</style>
