<template>
  <drawer-structure class="py-lg drawer-search">
    <template v-slot:default>
      <div class="px-lg">
        <button class="drawer-search__button-done px-md" @click="closeSearch">X</button>

        <form class="flex-row pt-lg drawer-search__form">
          <input v-model="search" type="text" class="drawer-search__search px-md" placeholder="Search for a city...">
          <button class="drawer-search__button-search px-md" @click="searchCities(search)">Search</button>
        </form>
      </div>

      <slot name="search" :search="search" />
    </template>
  </drawer-structure>

</template>

<script>
import DrawerStructure from './DrawerStructure.vue'

export default {
  components: {
    DrawerStructure
  },

  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      search: ''
    }
  },

  methods: {
    closeSearch () {
      this.$emit('closeSearch')
    },

    searchCities (search) {
      this.$emit('search', search)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "./src/scss/variables.scss";

  .drawer-search {
    position: fixed;

    &__button-done {
      background-color: transparent;
      font-size: 16px;
      font-weight: bold;
      border: none;
      color: white;
      position: absolute;
      right: 32px;
      cursor: pointer;
    }

    &__form {
      justify-content: space-between;
    }

    &__search {
      width: 100%;
      margin-right: 4px;
      background: transparent;
      border: 2px solid $grey2;
      color: $grey1;
      font-size: 16px;
      height: 38px;
    }

    &__button-search {
      background-color: #3C47E9;
      color: $white;
      border: none;
      cursor: pointer;
    }
  }

  @media (max-width: 1280px){
    .drawer-search {
      width: 100%;
      height: 100vh;
      position: relative;
    }
  }

</style>
