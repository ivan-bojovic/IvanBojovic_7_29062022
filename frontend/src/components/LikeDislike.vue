<template>
  <div class="thumbs">
    <font-awesome-icon
      icon="thumbs-up"
      aria-label="J'aime le post"
      title="aimer post"
      :class="userHasLiked ? 'liked' : ''"
      @click="likePost"
    />
    <span> {{ post.likes }}</span>

    <font-awesome-icon
      icon="thumbs-down"
      aria-label="Je n'aime pas le post"
      title="pas aimer post"
      :class="userHasDisliked ? 'disliked' : ''"
      @click="dislikePost"
    />
    <span>{{ post.dislikes }}</span>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "LikeDislike",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return;
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
    userHasLiked() {
      return this.post.usersLiked.indexOf(this.userData.data.userId) !== -1;
    },
    userHasDisliked() {
      return this.post.usersDisliked.indexOf(this.userData.data.userId) !== -1;
    },
  },
  methods: {
    // envoi du like au back-end
    likePost() {
      console.log(this.userData.data);
      axios
        .post(
          `http://localhost:3000/api/posts/${this.post._id}/like`,
          {
            userId: this.userData.data.userId,
            like: this.userHasLiked ? 0 : 1,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },
    dislikePost() {
      console.log(this.userData.data);
      axios
        .post(
          `http://localhost:3000/api/posts/${this.post._id}/like`,
          {
            userId: this.userData.data.userId,
            like: this.userHasDisliked ? 0 : -1,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.thumbs {
  display: flex;
  gap: 50px;
  align-items: center;
  justify-items: center;
  background-color: var(--color-secondary);
  padding-left: 5px;
}
.liked,
.disliked {
  color: var(--color-primary);
}
.thumbs span {
  color: var(--color-tertiary);
}
</style>
