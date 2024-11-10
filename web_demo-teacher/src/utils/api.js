import axios from "axios";

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

//拦截器
instance.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

export default instance
