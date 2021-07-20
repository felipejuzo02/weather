<template>
  <drawer-structure class="py-lg drawer-details">
    <template v-slot:default>
      <div>
        <div class="px-lg drawer-details__header flex-row">
          <button class="drawer-details__search-button px-sm" @click="searchPlaces">Search for places</button>
          <round-button :content="{ type: 'locale' }">
            <template v-slot:icon>
              <svg class="drawer-details__icon-locale" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 3a9 9 0 00-8-8V1h-2v2a9 9 0 00-8 8H1v2h2a9 9 0 008 8v2h2v-2a9 9 0 008-8h2v-2h-2zm-9 8a7 7 0 110-14 7 7 0 010 14z"/></svg>
            </template>
          </round-button>
        </div>
      </div>

      <div class="drawer-details__content">
        <img :src="content.link" alt="shower" class="drawer-details__main-image mt-lg">
        <div class="drawer-details__informations">
          <p class="drawer-details__temperature my-lg">{{ content.temperature }}<span class="drawer-details__temperature--type">ºC</span></p>
          <p class="drawer-details__weather">{{ content.weather }}</p>

          <div class="drawer-details__infos">
            <div class="drawer-details__today mt-lg">
              <p class="ml-sm">{{ content.day }}</p>
            </div>

            <div class="drawer-details__footer flex-row mt-md">
              <p class="mr-sm"><svg class="drawer-details__svg" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2a7 7 0 00-7 7c0 5.3 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg></p>
              <p class="ml-sm">{{ content.city }}</p>
            </div>
          </div>
        </div>
      </div>

    </template>
  </drawer-structure>

</template>

<script>
import DrawerStructure from './DrawerStructure.vue'
import RoundButton from './RoundButton.vue'

export default {
  components: {
    DrawerStructure,
    RoundButton
  },

  props: {
    content: {
      type: Object,
      default: () => {},
      required: true
    }
  },

  methods: {
    searchPlaces () {
      this.$emit('searchPlaces')
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .drawer-details {
    position: fixed;

    &__header {
      justify-content: space-between;
    }

    &__search-button {
      background-color: $grey2;
      color: $white;
      border: none;
      cursor: pointer;
    }

    &__image-container {
      width: 100%;
      overflow: hidden;
      position: relative;
      max-width: 524px;
    }

    &__icon-locale {
      fill: $white;
    }

    &__content {
      text-align: center;
      overflow: hidden;
    }

    &__content::before {
      background-image: url('../assets/Cloud-background.png');
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
      top: 120px;
      bottom: 0;
      left: 0;
      right: 0;
      content: '';
      opacity: .1;
    }

    &__informations {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__main-image {
      margin-top: 72px;
      width: 144px;

    }

    &__temperature {
      color: $white;
      font-size: 102px;

      &--type {
        font-size: 28px;
        color: $grey1;
      }
    }

    &__weather {
      font-size: 24px;
      color: $grey1;
    }

    &__infos {
      color: $grey1;
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
    }

    &__today {
      justify-content: center;
    }

    &__footer {
      justify-content: center;
    }

    &__svg {
      fill: $grey1;
    }
  }

  @media (max-width: 1280px){
    .drawer-details {
      width: 100%;
      height: 100vh;
      position: relative;

      &__image-background {
        position: relative;

        margin-left: -54px;
        width: 524px;
        opacity: 0.1;
        overflow: hidden;
      }
    }
  }

</style>
