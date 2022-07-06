<template>
 <div class="container"> 
   <FeedHeader/>
   <CreatePost @postCreated="postCreated"/>
   <Posts ref="monWall"/>


  </div>
</template>

<script>
import FeedHeader from '../components/FeedHeader.vue';
import CreatePost from '../components/CreatePost.vue';
import Posts from '../components/Posts.vue'



export default {
  name: "Feed",
  components: {
    FeedHeader,
    CreatePost,
    Posts
},
  data() {
    return {};
  },

  methods: {
    postCreated () {
      alert ("Votre publication sera publié")
      const Wall =this.$refs.monWall
      Wall.getAllPosts ();

    }
  },
};
</script>
<style lang ="scss">
</style>


