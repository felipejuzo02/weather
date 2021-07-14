import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import scss from './scss/app.scss'
import helpers from './helpers/index.js'

createApp(App).use(store).use(scss).use(router).use(helpers).mount('#app')
