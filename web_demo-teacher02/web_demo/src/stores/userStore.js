import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {
    login as loginAPI,
    logout as logoutAPI,
    getUsers as getUsersAPI,
    addUser as addUserAPI,
    updateUser as updateUserAPI,
    deleteUser as deleteUserAPI
} from '@/apis/user.js'

export const useUserStore = defineStore('user', () => {
    //state
    const userInfo = ref({})
    const users = ref([])

    //getters
    const getUserToken = computed(() => {
        return userInfo.value.token
    })
    //actions
    const getUserInfo = async ({username, password}) => {
        try {
            console.log('Store 尝试登录:', { username, password })
            const res = await loginAPI(username, password)
            console.log('Store 登录响应:', res)
            userInfo.value.token = res.accessToken
            return res
        } catch (error) {
            console.error('Store 登录错误:', error)
            throw new Error('登录失败：' + error.message)
        }
    }
    const clearUserInfo = async () => {
        try {
            await logoutAPI()
            userInfo.value = {}
            return true
        } catch (error) {
            throw new Error('登出失败：' + error.message)
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await getUsersAPI()
            users.value = res
            return res
        } catch (error) {
            throw new Error('获取用户列表失败：' + error.message)
        }
    }

    // actions
    const addUser = async (userData) => {
        try {
            const res = await addUserAPI(userData)
            users.value.push(res)
            return res
        } catch (error) {
            throw new Error('添加用户失败：' + error.message)
        }
    }

    const updateUser = async (userId, userData) => {
        try {
            const res = await updateUserAPI(userId, userData)
            const index = users.value.findIndex(user => user.id === userId)
            if (index !== -1) {
                users.value[index] = res
            }
            return res
        } catch (error) {
            throw new Error('更新用户失败：' + error.message)
        }
    }

    const deleteUser = async (userId) => {
        try {
            await deleteUserAPI(userId)
            const index = users.value.findIndex(user => user.id === userId)
            if (index !== -1) {
                users.value.splice(index, 1)
            }
            return true
        } catch (error) {
            throw new Error('删除用户失败：' + error.message)
        }
    }

    return {userInfo, users, getUserInfo, clearUserInfo, getUserToken, fetchUsers, addUser, updateUser, deleteUser}
}, {
    //数据持久化
    persist: true,
})
