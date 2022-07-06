<template>
  <div class="container">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
.container {
font-family: 'Lato', sans-serif;
}
</style>

