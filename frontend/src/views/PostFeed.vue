<template>
  <div class="container">
    <HeaderLogo />
    <FeedHeader />
    <CreatePost @postCreated="postCreated" />
    <PostsList ref="monWall" />
  </div>
</template>

<script>
import FeedHeader from "@/components/FeedHeader.vue";
import CreatePost from "@/components/CreatePost.vue";
import PostsList from "@/components/PostsList.vue";
import HeaderLogo from "@/components/HeaderLogo.vue";
import { mapState } from "vuex";

export default {
  name: "PostFeed",
  components: {
    FeedHeader,
    CreatePost,
    PostsList,
    HeaderLogo,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
  },
  mounted() {
    console.log(this.userData);
    if (!this.userData) this.$router.push("/");
  },

  methods: {
    postCreated() {
      alert("Votre publication sera publié");
      const Wall = this.$refs.monWall;
      Wall.getAllPosts();
    },
  },
};
</script>
<style></style>
