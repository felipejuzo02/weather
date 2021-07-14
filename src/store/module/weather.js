import axios from 'axios'

axios.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/'

const state = {
  city: {}
}

const getters = {
  cityInformation: state => state.city,
  weekInformations: state => state.city.consolidated_weather
}

const mutations = {
  setCity (state, data) {
    state.city = data
  }
}

const actions = {
  async fetchCity ({ commit }, id) {
    const { data } = await axios({
      method: 'GET',
      url: `location/${id}`
    })

    commit('setCity', data)
  }
}

export default {
  namespaced: true,

  state,
  getters,
  mutations,
  actions
}
