<template>
  <!---- Creation of posts-->
  <div class="createPost jumbotron pb-0">
    <form>
      <div class="form-group">
        <label for="content" aria-label="Texte du post"></label>
        <textarea
          id="content"
          rows="5"
          v-model="post.content"
          class="form-control form-control-sm form-rounded border border-secondary"
          placeholder="Quoi de neuf ?"
        />
      </div>
      <div class="input-group mb-3">
        <label for="image" aria-label="Ajouter une image"></label>

        <input
          name="image"
          type="file"
          class="form-control"
          id="image"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          @change="onFileSelected"
        />
        <label
          class="input-group-text form-rounded"
          for="image"
          type="button"
          aria-label="Publier post"
          title="Publier post"
          @click.prevent="createPost"
          >Publier</label
        >
      </div>

      <span id="msgError" class="mx-3 text-danger">{{ msgError }}</span>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatePost",
  data() {
    return {
      userData: { data: {} },
      user: {
        lastName: "",
        firstName: "",
        avatar: "",
      },

      post: {
        content: "",
        image: "",
      },
      msgError: "",
      msgWelcome: "",
    };
  },

  mounted() {
    this.createUserData(), this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/posts/")
        .then((response) => {
          if (response.data.length > 0) {
            this.allPosts = response.data;
            console.log(this.allPosts);
          } else {
            console.log("Il n'y a pas encore de publication.");
          }
        })
        .catch((error) =>
          console.log(error + "Echec lors de la récupération des publications.")
        );
    },
    createUserData() {
      if (localStorage.getItem("user")) {
        try {
          this.userData = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          localStorage.removeItem("user");
          console.log("Données corrompues");
        }
      }
    },
    onFileSelected(event) {
      console.log(event);
      this.post.image = event.target.files[0] || event.dataTransfer.files;
      console.log(this.post.image);
    },
    createPost() {
      console.log(this.post);
      const fd = new FormData();
      fd.append("content", this.post.content);
      fd.append("image", this.post.image);
      console.log("test", fd.get("content"));
      console.log("test", fd.get("image"));
      if (
        (fd.get("content") == null && fd.get("image") == null) ||
        (fd.get("content") == "" && fd.get("image") == "")
      ) {
        let msgReturn = document.getElementById("msgError");
        msgReturn.classList.add("text-danger");
        this.msgError = "Rien à publier";
      } else {
        axios
          .post("http://localhost:3000/api/posts/", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.post.content = "";
            this.post.image = "";
            this.$emit("postCreated");
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .form-control {
    width: 100%;
    margin: auto;
  }
}
</style>
