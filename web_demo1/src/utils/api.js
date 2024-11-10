import axios    from "axios";

const instance = axios.create({
    //baseURL 访问路径前缀
    //timeout  请求超时时间
    //headers 设置请求的全局请求头
    baseURL: "/api",
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    }
})
export default instance;