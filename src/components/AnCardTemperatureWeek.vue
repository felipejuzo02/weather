<template>
  <an-card class="cardTemperature py-md">
    <template v-slot:header>
      <p>{{ content.day }}</p>
    </template>

    <template v-slot:body>
      <img class="cardTemperature__image" :src="linkImage" alt="Thundersorm">
    </template>

    <template v-slot:footer>
      <div class="cardTemperature__footer">
        <p>{{ content.maxTemperature }}</p>
        <p class="cardTemperature__footer--grey">{{ content.minTemperature }}</p>
      </div>
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
      default: () => ({})
    }
  },

  data () {
    return {
      linkImage: `https://www.metaweather.com/static/img/weather/${this.content.stateAbbr}.svg`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .cardTemperature {
    width: 160px;
    height: 184px;
    text-align: center;
    color: $white;

    &__image {
      width: 70px;
      margin: 20px auto 40px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-around;

      &--grey {
        color: $grey1;
      }
    }
  }

</style>
