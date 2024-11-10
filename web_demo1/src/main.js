import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

//创建一个应用
const app = createApp(App)
// 用于配置全局属性,将 axios 添加到 Vue 实例的全局属性中，从而可以在 Vue 组件的任何地方访问 axios
app.config.globalProperties.$http = axios
//使用路由器
app.use(router)

//挂载整个应用到app容器中
app.mount('#app')
// createApp(App).mount('#app')
