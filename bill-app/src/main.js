import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'

import App from './App.vue'
import BButton from '@/components/BButton.vue'
import router from './router'
import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BButton', BButton)

app.mount('#app')
