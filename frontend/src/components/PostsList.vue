<template>
  <div class="container mt-5 mb-5">
    {{ userData }}
    <div class="row d-flex align-items-center justify-content-center">
      <!-- LE FIL D'ACTUALITÉS DES POSTS -->
      <div class="col-md-6">
        <div
          v-for="(post, index) in allPosts"
          v-bind:key="post.id"
          class="card"
        >
          <div class="d-flex justify-content-between p-2 px-3">
            <div class="d-flex flex-row align-items-center">
              <div class="d-flex flex-column ml-2">
                <span
                  class="font-weight-bold"
                  aria-label="nom prénom de l'utilisateur"
                  >{{ post.User.lastName }} {{ post.User.firstName }}</span
                >
                <small class="text-primary">{{
                  post.createdAt.split("T")[0].split("-").reverse().join("/") +
                  " à " +
                  post.createdAt.split("T")[1].split(":").slice(0, -1).join(":")
                }}</small>
              </div>
            </div>
            <div class="d-flex flex-row mt-1 ellipsis">
              <small class="mr-2">
                <div>
                  <button
                    type="submit"
                    role="button"
                    aria-label="Supprimer post"
                    class="btn"
                    @click="deletePost(post.id)"
                  >
                    <font-awesome-icon
                      class="fa"
                      icon="trash-alt"
                      alt="Supprimer post"
                    />
                  </button>

                  <!-- Bouton éditer posts -->
                  <button
                    type="submit"
                    role="button"
                    class="btn"
                    aria-label="Modifier post"
                    data-bs-toggle="modal"
                    :data-bs-target="`#exampleModal${index}`"
                  >
                    <font-awesome-icon class="fa" icon="edit" alt="Édit post" />
                  </button>
                </div>
              </small>
            </div>
          </div>
          <img
            v-if="post.image != null"
            :src="`http://localhost:3000/images/posts/${post.image}`"
            alt=""
            class="img-fluid"
          />
          <div class="p-2">
            <p class="text-justify" v-if="post.content">{{ post.content }}</p>
            <div class="heartLike">
              <ToggleFavorite />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- FENÊTRE MODIFICATION POSTS -->
  <div
    class="modal fade"
    :id="'exampleModal' + index"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title h4">Modifiez votre post</h4>

          <button
            type="button"
            role="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form
            enctype="multipart/form-data"
            aria-label="Formulaire envoi nouveau post"
          >
            <div class="mb-3">
              <!-- Champs modification post -->
              <textarea
                class="form-control"
                v-model="postModified.content"
                placeholder="Modifier mon post…"
                aria-label="Champs modifier le post"
              >
              </textarea>
            </div>

            <!-- et/ou champs choisir image -->
            <div class="mb-3">
              <label
                class="input-group-text my-3 btn-outline-dark labelimagepost--custom"
              >
                Choisir image
                <input
                  aria-label="Choisir image post"
                  class="form-control form-control-sm ms-3"
                  type="file"
                  name="image"
                  accept=".jpg, .jpeg, .gif, .png"
                  @change="onFileSelected"
                />
              </label>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary rounded-pill"
            data-bs-dismiss="modal"
            aria-label="Annuler changement"
          >
            Annuler
          </button>

          <!-- Boutons envoi post -->
          <button
            v-if="postModified.content !== '' || postModified.image !== ''"
            @click.prevent="editPost(post.id), reload()"
            type="button"
            role="button"
            class="btn btn-dark align-items-center rounded-pill"
            aria-label="Enregister modification du post"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import ToggleFavorite from "../components/ToggleFavorite.vue";

export default {
  name: "PostsList",
  components: {
    ToggleFavorite,
  },
  data() {
    return {
      user: {
        lastName: "",
        firstName: "",
        avatar: "",
        userId: "",
      },
      allPosts: [],
      postModified: {},
      msgError: "",
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
  },
  mounted() {
    this.getAllPosts();
  },

  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/posts/")
        .then((response) => {
          if (response.data.length > 0) {
            this.allPosts = response.data;
            console.log(response);
          } else {
            console.log("Il n'y a pas encore de publication.");
          }
        })
        .catch((error) =>
          console.log(error + "Echec lors de la récupération des publications.")
        );
    },

    editPost(postId) {
      console.log(postId);
      let formData = new FormData();
      if (this.postModified.content) {
        formData.append("content", this.postModified.content);
      }
      if (this.postModified.image) {
        formData.append("image", this.postModified.image);
      }
      console.log("test", formData.get("content"));
      console.log("test", formData.get("image"));
      axios
        .put("http://localhost:3000/api/posts/" + postId, formData, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          this.postModified = "";
          location.reload();
        })
        .catch((error) => console.log(error));
    },

    deletePost(postId) {
      if (
        window.confirm("Etes-vous sûr de vouloir supprimer votre publication ?")
      ) {
        axios
          .delete("http://localhost:3000/api/posts/" + postId, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            alert("Publication supprimée !");
            this.getAllPosts();
          })
          .catch((error) => console.log(error));
      }
    },
    onFileSelected(event) {
      console.log(event);
      this.postModified.image =
        event.target.files[0] || event.dataTransfer.files;
      console.log(this.postModified.image);
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 30px;
}
</style>
