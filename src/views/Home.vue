<template>
  <div class="flex-row page-main">
    <drawer-search @closeSearch="changeIsSearch" v-if="isSearch" @search="searchCities">
      <template v-slot:search>
        <div class="page-main__search-list mx-lg">
          <search-item v-for="(city, index) in cities" :key="index" :cityName="city.title" @citySelect="citySelect(city)" />
        </div>
      </template>
    </drawer-search>
    <drawer-details @searchPlaces="changeIsSearch" v-else :content="drawerInfos" />

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
          <p class="page-main__text mt-lg">Today's Hightlights</p>
          <div class="flex-row mt-lg page-main__cards-today">
            <an-card-today-information :content="windStatus">
              <template v-slot:footer>
                <div class="page-main__cards-footer">
                  <div class="page-main__container-footer flex-row">
                    <span class="mr-sm"><svg class="page-main__near-me" :style="`--prog: ${degress}deg`" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 3L3 10.5v1l6.8 2.7 2.7 6.8h1L21 3z"/></svg></span>
                    <p>{{ this.todayInformation.wind_direction_compass }}</p>
                  </div>
                </div>
              </template>
            </an-card-today-information>

            <an-card-today-information :content="humidty">
              <template v-slot:footer>
                <div class="page-main__cards-footer">
                  <div class="page-main__container-footer flex-row">
                    <div class="page-main__progress-bar">
                      <div class="page-main__progress-bar-status" :style="`--prog: ${this.todayInformation.humidity}%`" />
                    </div>
                  </div>
                </div>
              </template>
            </an-card-today-information>
          </div>

          <div class="flex-row mt-lg page-main__cards-today">
            <an-card-today-information :content="visibility" />
            <an-card-today-information :content="airPressure" />
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
import SearchItem from '../components/SearchItem.vue'

export default {
  components: {
    RoundButton,
    AnCardTemperatureWeek,
    AnCardTodayInformation,
    DrawerSearch,
    DrawerDetails,
    SearchItem
  },

  data () {
    return {
      values: {
        id: 2487956
      },

      weekInformationsData: [],
      isSearch: false,
      valueSearch: ''
    }
  },

  computed: {
    ...mapGetters({
      cityInformation: 'weather/cityInformation',
      weekInformations: 'weather/weekInformations',
      todayInformation: 'weather/todayInformation',
      cities: 'weather/fetchCities'
    }),

    drawerInfos () {
      return {
        temperature: formatTemperature(this.todayInformation.the_temp),
        day: 'Fri, 5 Jun',
        city: this.cityInformation.title,
        link: `https://www.metaweather.com/static/img/weather/${this.todayInformation.weather_state_abbr}.svg`
      }
    },

    windStatus () {
      return {
        title: 'Wind status',
        bodyNumber: formatTemperature(this.todayInformation.wind_speed),
        bodyText: 'mph'
      }
    },

    humidty () {
      return {
        title: 'Humidty',
        bodyNumber: this.todayInformation.humidity,
        bodyText: '%'
      }
    },

    visibility () {
      return {
        title: 'Visibility',
        bodyNumber: this.todayInformation.visibility.toFixed(1),
        bodyText: 'miles'
      }
    },

    airPressure () {
      return {
        title: 'Air Pressure',
        bodyNumber: formatTemperature(this.todayInformation.air_pressure),
        bodyText: 'mb'
      }
    },

    degress () {
      if (this.todayInformation.wind_direction_compass === 'N') {
        return -43.5
      } else if (this.todayInformation.wind_direction_compass === 'NNE') {
        return -21
      } else if (this.todayInformation.wind_direction_compass === 'NE') {
        return 1.5
      } else if (this.todayInformation.wind_direction_compass === 'ENE') {
        return 24
      } else if (this.todayInformation.wind_direction_compass === 'E') {
        return 48.5
      } else if (this.todayInformation.wind_direction_compass === 'ESE') {
        return 71
      } else if (this.todayInformation.wind_direction_compass === 'SE') {
        return 93.5
      } else if (this.todayInformation.wind_direction_compass === 'SSE') {
        return 116
      } else if (this.todayInformation.wind_direction_compass === 'S') {
        return 138.5
      } else if (this.todayInformation.wind_direction_compass === 'SSW') {
        return 161
      } else if (this.todayInformation.wind_direction_compass === 'SW') {
        return 183.5
      } else if (this.todayInformation.wind_direction_compass === 'WSW') {
        return 206
      } else if (this.todayInformation.wind_direction_compass === 'W') {
        return 228.5
      } else if (this.todayInformation.wind_direction_compass === 'WNW') {
        return 251
      } else if (this.todayInformation.wind_direction_compass === 'NW') {
        return 273.5
      } else {
        return 296
      }
    }
  },

  methods: {
    ...mapActions({
      fetchCity: 'weather/fetchCity',
      fetchCities: 'weather/fetchCities'
    }),

    formatTemperature,

    changeIsSearch () {
      this.isSearch = !this.isSearch
    },

    async searchCities (value) {
      event.preventDefault()
      if (value) {
        await this.fetchCities(value)
      }
    },

    async citySelect (city) {
      this.values.id = city.woeid
      await await this.fetchCity(this.values.id)
      this.changeIsSearch()
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
      await this.fetchCity(this.values.id)
      this.removeFirstElement()
    }

  },

  created () {
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

    &__search-list {
      padding-top: 18px;
    }

    &__temperature-buttons {
      justify-content: flex-end;
    }

    &__cards-week {
      justify-content: space-between;
    }

    &__infos-todayInformation {
      margin-top: 64px;
    }

    &__text {
      font-size: 20px;
      color: $white;
    }

    &__cards-today {
      justify-content: space-between;
    }

    &__progress-bar {
      position: relative;
      width: 80%;
      height: 8px;
      background-color: $grey2;
      border-radius: 5px;
    }

    &__progress-bar-status {
      position: relative;
      width: var(--prog);
      height: 8px;
      background-color: #FFEC65;
      border-radius: 5px;
      z-index: 2;
    }

    &__cards-footer {
      position: relative;
      width: 100%;
    }

    &__container-footer {
      justify-content: center;
      margin: 0 auto;
      align-items: center;
    }

    &__near-me {
      fill: $white;
      background-color: $grey2;
      padding: 4px;
      border-radius: 50%;
      transform: rotate(var(--prog));
    }
  }

</style>
