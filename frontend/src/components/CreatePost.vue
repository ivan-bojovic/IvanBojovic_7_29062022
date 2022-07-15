<template>
  <!---- Creation of posts-->
  <div class="createPost jumbotron pb-0">
    <form>
      <div class="form-group">
        <label for="content" aria-label="Texte du post"></label>
        <textarea
          id="content"
          rows="5"
          v-model="post.text"
          class="form-control form-control-sm form-rounded border"
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
import { mapState } from "vuex";

export default {
  name: "CreatePost",
  data() {
    return {
      post: {
        text: "",
        image: "",
      },
      msgError: "",
      msgWelcome: "",
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
  },

  methods: {
    onFileSelected(event) {
      this.post.image = event.target.files[0] || event.dataTransfer.files;
    },
    createPost() {
      const fd = new FormData();
      fd.append("text", this.post.text);
      fd.append("image", this.post.image);
      console.log("test", fd.get("text"));
      console.log("test", fd.get("image"));
      if (
        (fd.get("text") == null && fd.get("image") == null) ||
        (fd.get("text") == "" && fd.get("image") == "")
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
            this.post.text = "";
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
.input-group > .form-control {
  background-color: var(--color-secondary);
}

@media screen and (max-width: 768px) {
  .form-control {
    margin: auto;
  }
  .input-group > .form-control {
    font-size: 0.8rem;
  }
  .input-group-text {
    font-size: 0.8rem;
  }
}
</style>
