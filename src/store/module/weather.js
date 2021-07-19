import axios from 'axios'

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/'

const state = {
  city: {},
  consolidatedWeather: [],
  todayInformation: {},
  cities: []
}

const getters = {
  cityInformation: state => state.city,
  weekInformations: state => state.consolidatedWeather,
  todayInformation: state => state.todayInformation,
  fetchCities: state => state.cities
}

const mutations = {
  setCity (state, data) {
    state.city = data
    state.consolidatedWeather = data.consolidated_weather
    state.todayInformation = data.consolidated_weather[0]
  },

  setCities (state, data) {
    state.cities = data
  }
}

const actions = {
  async fetchCity ({ commit }, id) {
    const { data } = await axios({
      method: 'GET',
      url: `location/${id}`
    })

    commit('setCity', data)
  },

  async fetchCities ({ commit }, params) {
    const { data } = await axios({
      method: 'GET',
      url: `location/search/?query=${params}`
    })

    commit('setCities', data)
  }
}

export default {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
