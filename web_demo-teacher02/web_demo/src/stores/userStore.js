import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {login as loginAPI, logout as logoutAPI} from '@/apis/user.js'

export const useUserStore = defineStore('userStore', () => {
    //state
    const userInfo = ref({})

    //getters
    const getUserToken = computed(() => {
        return userInfo.value.token
    })
    //actions
    const getUserInfo = async ({username, password}) => {
        await loginAPI(username, password)
            .then(res => {
                console.log(res)
                userInfo.value.token = res.accessToken
            })
    }
    const clearUserInfo = () => {
        userInfo.value = {}
    }

    return {userInfo, getUserInfo, clearUserInfo, getUserToken}
}, {
    //数据持久化
    persist: true,
})
