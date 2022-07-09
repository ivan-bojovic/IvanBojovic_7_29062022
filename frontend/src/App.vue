<template>
  <div class="container">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("checkUserData");
  },
};
</script>

<style lang="scss">
.container {
  font-family: "Lato", sans-serif;
}
body {
  --color-primary: #fd2d01;
  --color-secondary: #ffd7d7;
  --color-tertiary: #4e5166;
}
</style>
