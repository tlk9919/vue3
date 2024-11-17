import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from '../src/router/index.js'
import axios from '@/utils/api.js'

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(router)
app.mount('#app')
