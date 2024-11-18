import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {login as loginAPI, logout as logoutAPI} from '@/apis/user.js'

export const useUserStore = defineStore('userStore', () => {
    const userInfo = ref({})
    const getUserToken = computed(() => {
        return userInfo.value.token
    })
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
    return {
        userInfo, getUserInfo, clearUserInfo, getUserToken
    }
})
