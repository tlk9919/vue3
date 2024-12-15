import http from '@/utils/axios.js'

export const fetchMenu = async () => {
    try {
        const res = await http.get('/menu')
        return res
    } catch (error) {
        console.error('menu.js中异常报错',error)
        throw error;
    }
}
