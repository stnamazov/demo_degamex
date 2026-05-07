import { createApp } from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.component(VueCountdown.name, VueCountdown)
app.mount('#app')