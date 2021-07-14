import { createStore } from 'vuex'
import weather from './module/weather.js'

export default createStore({
  modules: {
    weather
  }
})
