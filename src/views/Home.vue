<template>
  <div class="flex-row page-main">
    <drawer-search @closeSearch="changeIsSearch" v-if="isSearch" />
    <drawer-details @searchPlaces="changeIsSearch" v-else :content="drawerInformations" />

    <div class="page-main__container">
      <div class="page-main__content">
        <div class="page-main__temperature-buttons flex-row">
          <round-button class="mr-sm" :content="{ type: 'celsius', text: 'ºC' }" />
          <round-button class="ml-sm" :content="{ type: 'farenheit', text: 'ºF' }" />
        </div>

        <div class="flex-row mt-lg page-main__cards-week">
          <an-card-temperature-week v-for="(city, index) in weekInformationsData" :key="index" :content="{ day: 'Today', maxTemperature: city.max_temp, minTemperature: city.min_temp, stateAbbr: city.weather_state_abbr}" />
        </div>

        <div class="page-main__infos-today">
          <p class="page-main__text">Today's Hightlights</p>
          <div class="flex-row mt-lg page-main__cards-today">
            <an-card-today-information :content="{ title: 'Wind status', bodyNumber: '7', bodyText: 'mph', footerIcon: 'c', footerText: 'WSW' }">
              <template v-slot:footer>
                <div class="mt-lg">
                  <div class="page-main__cards-footer flex-row">
                    <span class="mr-sm"><svg class="page-main__near-me" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3L3 10.5v1l6.8 2.7 2.7 6.8h1L21 3z"/></svg></span>
                    <p>WSW</p>
                  </div>
                </div>
              </template>
            </an-card-today-information>

            <an-card-today-information :content="{ title: 'Humidty', bodyNumber: '84', bodyText: '%', footerIcon: 'c', footerText: 'WSW' }">
              <template v-slot:footer>
                <div class="page-main__cards-footer flex-row">
                 <p>progress bar</p>
                </div>
              </template>
            </an-card-today-information>
          </div>

          <div class="flex-row mt-lg page-main__cards-today">
            <an-card-today-information :content="{ title: 'Visibility', bodyNumber: '6,4', bodyText: 'miles' }" />
            <an-card-today-information :content="{ title: 'Air Pressure', bodyNumber: '998', bodyText: 'mb' }" />
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import RoundButton from '../components/RoundButton.vue'
import AnCardTemperatureWeek from '../components/AnCardTemperatureWeek.vue'
import AnCardTodayInformation from '../components/AnCardTodayInformation.vue'
import DrawerSearch from '../components/DrawerSearch.vue'
import DrawerDetails from '../components/DrawerDetails.vue'
import { mapGetters, mapActions } from 'vuex'
import formatTemperature from '../helpers/methods/formatTemperature'

export default {
  components: {
    RoundButton,
    AnCardTemperatureWeek,
    AnCardTodayInformation,
    DrawerSearch,
    DrawerDetails
  },

  data () {
    return {
      values: {
        id: 44418
      },

      drawerInformations: {},
      weekInformationsData: [],

      isSearch: false
    }
  },

  computed: {
    ...mapGetters({
      cityInformation: 'weather/cityInformation',
      weekInformations: 'weather/weekInformations'
    })
  },

  methods: {
    ...mapActions({
      weather: 'weather/fetchCity'
    }),

    changeIsSearch () {
      this.isSearch = !this.isSearch
    },

    async setDrawerValues () {
      const todayInformation = await this.cityInformation.consolidated_weather[0]
      const drawerValues = {
        temperature: formatTemperature(todayInformation.the_temp),
        day: 'Fri, 5 Jun',
        city: this.cityInformation.title,
        link: `https://www.metaweather.com/static/img/weather/${todayInformation.weather_state_abbr}.svg`
      }

      this.drawerInformations = drawerValues
    },

    formatValues () {
      for (const key in this.weekInformationsData) {
        this.weekInformationsData[key].max_temp = `${formatTemperature(this.weekInformationsData[key].max_temp)}ºC`
        this.weekInformationsData[key].min_temp = `${formatTemperature(this.weekInformationsData[key].min_temp)}ºC`
      }
    },

    async removeFirstElement () {
      this.weekInformationsData = await this.weekInformations
      this.weekInformationsData.shift()
      this.formatValues()
    },

    async setValues () {
      await this.weather(this.values.id)
      await this.setDrawerValues()
      await this.weekInformations
      this.removeFirstElement()
    }

  },

  async created () {
    this.setValues()
  }
}
</script>

<style lang="scss">
@import "./src/scss/variables.scss";

.page-main {
    width: 100%;

    &__container {
      margin: 32px auto;
      padding-left: 428px;
    }

    &__content {
      width: 860px;
    }

    &__temperature-buttons {
      justify-content: flex-end;
    }

    &__cards-week {
      justify-content: space-between;
    }

    &__infos-today {
      margin-top: 64px;
    }

    &__text {
      font-size: 20px;
      color: $white;
    }

    &__cards-today {
      justify-content: space-between;
    }

    &__cards-footer {
      align-items: center;
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
    }

    &__near-me {
      fill: $white;
      background-color: $grey2;
      padding: 4px;
      border-radius: 50%;
    }
  }

</style>
