<template>
  <button class="roundButton" :class="roundButtonClasses">
    <slot name="icon">
      {{ content.text }}
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    roundButtonClasses () {
      if (this.content.type === 'locale') {
        return 'roundButton--locale'
      } else if (this.content.type === 'celsius') {
        return 'roundButton--celsius'
      }

      return 'roundButton--fahrenheit'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .roundButton {
    width: 40px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 50%;
    border-color: transparent;

    &--celsius {
      color: $secundary;
      background-color: $white;
    }

    &--fahrenheit {
      color: $white;
      background-color: $grey3;
    }

    &--locale {
      color: $white;
      background-color: $grey2;
    }
  }
</style>
