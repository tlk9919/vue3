import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";

const instance = axios.create({
    //baseURL 访问路径的前缀
    //timeout 请求超时的时间
    //headers 统一设置的全局请求头
    baseURL: '/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})
instance.interceptors.request.use(config => {
    const userStore = useUserStore();
    // const token = userStore.getUserToken()
    const token=userStore.userInfo.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))
//拦截器
instance.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

export default instance
