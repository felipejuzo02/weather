<template>
  <div class="drawer">
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .drawer {
    position: fixed;
    width: 428px;
    height: 100vh;
    background-color: $secundary;
    box-sizing: border-box;
  }
</style>
