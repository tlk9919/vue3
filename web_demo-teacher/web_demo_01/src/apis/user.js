import http from '@/utils/axios.js'

export function login(username, password) {
    return http.post('/login', {username, password})
}

export function logout() {
    return http.post('/logout')
}
