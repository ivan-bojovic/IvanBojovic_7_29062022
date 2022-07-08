<template>
  <div class="container">
    <FeedHeader />
    <CreatePost @postCreated="postCreated" />
    <PostsList ref="monWall" />
  </div>
</template>

<script>
import FeedHeader from "../components/FeedHeader.vue";
import CreatePost from "../components/CreatePost.vue";
import PostsList from "../components/PostsList.vue";

export default {
  name: "PostFeed",
  components: {
    FeedHeader,
    CreatePost,
    PostsList,
  },
  data() {
    return {};
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
