<template>
  <div class="card py-md">
    <slot name="header" />
    <slot name="body" />
    <slot name="footer" />
  </div>
</template>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .card {
    display: flex;
    flex-direction: column;
    background-color: $secundary;
  }
</style>
