<template class="search-item">
  <div class="search-item__container flex-row" @click="$emit('citySelect')">
    <p class="search-item__city-name">{{ cityName }}</p>
    <svg class="search-item__arrow" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.6 7.4l4.6 4.6-4.6 4.6L10 18l6-6z"/></svg>
  </div>
</template>

<script>
export default {
  props: {
    cityName: {
      type: String,
      default: ''
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .search-item {
    background: red;

    &__container {
      padding: 14px 4px;
      align-content: center;
      justify-content: space-between;
      cursor: pointer;
    }

    &__container:hover {
      border: 1px solid $grey2;
    }

    &__container:hover > &__arrow {
      display: inline;
    }

    &__city-name {
      color: $white;
    }

    &__arrow {
      fill: $grey2;
      display: none;
    }
  }
</style>
