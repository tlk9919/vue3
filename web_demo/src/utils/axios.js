import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";

//创建一个axios的实例
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


//请求拦截器
instance.interceptors.request.use(
    config => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    console.log('发送请求:', {
        url: config.url,
        token: token  // 检查 token 是否存在
    })
    if (token) {
        // 如果存在 token，则将其添加到请求头中的 Authorization 字段
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},
    (e) => {
        return Promise.reject(e)
    }
)


//响应拦截器
instance.interceptors.response.use(
    response => {
    return response.data
},
    error => {
    return Promise.reject(error)
}
)

export default instance
