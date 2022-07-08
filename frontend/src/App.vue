<template>
  <div class="container">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
.container {
font-family: 'Lato', sans-serif;
}
body {
  --color-primary : #FD2D01;
  --color-secondary: #FFD7D7;
  --color-tertiary: #4E5166;
}
</style>

