import http from '@/utils/axios'

// 登录
export const login = async (username, password) => {
    const response = await http.post('/login', { username, password })
    return response
}

// 退出登录
export const logout = async () => {
    const response = await http.post('/logout')
    return response
}

// 获取用户列表
export const getUsers = async () => {
    const response = await http.get('/users')
    return response
}

// 添加用户
export const addUser = async (userData) => {
    const response = await http.post('/users', userData)
    return response
}

// 更新用户
export const updateUser = async (userId, userData) => {
    const response = await http.put(`/users/${userId}`, userData)
    return response
}

// 删除用户
export const deleteUser = async (userId) => {
    const response = await http.delete(`/users/${userId}`)
    return response
}
