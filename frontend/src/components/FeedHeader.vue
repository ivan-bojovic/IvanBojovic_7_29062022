<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <div class="col">
        <!-- Logo Groupomania -->
        <img src="../assets/icon-left-font-monochrome-black.png" alt="logo" />
      </div>
      <span><strong>Bonjour</strong> {{ userData.data.firstName }} </span>
      <ul class="nav">
        <li class="nav-item mt-3 px-4">
          <router-link to="/feed">
            <font-awesome-icon
              icon="house"
              aria-label="Fil d'actualité"
              title="Fil d'actualité"
            />
          </router-link>
        </li>

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
    return {
      user: {
        lastName: "",
        firstName: "",
        avatar: "",
      },
    };
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
  color: black;
}

.col img {
  width: 30px;
  height: 30px;
}

.navbar {
  display: flex;
  justify-content: flex-end;
}

.post-user-avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .post-user-avatar {
    margin-left: 5px;
  }
}
</style>
