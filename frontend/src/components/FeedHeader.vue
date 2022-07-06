<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <router-link to ="/:id" aria-label="Mon profil">
          <img
            class="post-user-avatar rounded-circle mr-2"
            v-if="userData.data.avatar != null"
            alt="Photo de profil"
            :src="`http://localhost:3000/images/users/${userData.data.avatar}`"
          />
          <img
            class="post-user-avatar rounded-circle mr-2"
            alt="Photo de profil par défaut"
            v-else
            src="../assets/icon.png"
          />
        </router-link>
        <span><strong>Bonjour</strong> {{ userData.data.firstName}} </span>
        <ul class="nav">

          <li class="nav-item  mt-3 px-4">
          <router-link to ="/feed">
          <font-awesome-icon icon="house" aria-label="Fil d'actualité" title="Fil d'actualité"/>
          </router-link>
          </li>

         <li class="nav-item  mt-3 px-4">
         <router-link to ="/" @click="logout">
          <font-awesome-icon icon="right-from-bracket" aria-label="Me déconnecter" title="Me deconnecter"/>
         </router-link>
        </li>
        </ul>

    </div>
  </nav>

</template>

<script>
import { mapState } from 'vuex';

  export default {
    name: "FeedHeader",
      data() {
      return { 
      user: {
        lastName: "",
        firstName: "",
        avatar:"",
        }
    };
  },
computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
},
  
    
    methods: {
      logout() {
        localStorage.clear()
        this.$router.push("/");
      },

  }
  }
</script>

<style scoped>

a {
  color: black;
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
