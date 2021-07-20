<template>
  <an-card class="cardTodayInformation">
    <template v-slot:header>
      <p>{{ content.title }}</p>
    </template>

    <template v-slot:body>
      <p class="cardTodayInformation__text mb-md"><span class="cardTodayInformation__text--bold mr-sm">{{ content.bodyNumber }}</span>{{ content.bodyText }}</p>
    </template>

    <template v-slot:footer>
      <slot name="footer" />
    </template>

  </an-card>
</template>

<script>
import AnCard from './AnCard.vue'

export default {
  components: {
    AnCard
  },

  props: {
    content: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .cardTodayInformation {
    width: 376px;
    text-align: center;
    color: $white;
    position: relative;

    &__text {
      font-size: 36px;

      &--bold {
        font-weight: bold;
        font-size: 72px;
      }
    }
  }

  @media (max-width: 1280px){
    .cardTodayInformation {
    width: 100%;
    }
  }

</style>
