import {createApp} from 'vue'
import {createPinia} from "pinia";
import './style.css'
import App from './App.vue'
import router from '../src/router/index.js'
import axios from '@/utils/axios.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


// createApp(App).use(router).mount('#app')
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(pinia)
app.use(router)
app.mount('#app')
