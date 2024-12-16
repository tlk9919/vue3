import http from '@/utils/axios'

// 获取商品列表
export const getProducts = async () => {
    const response = await http.get('/page3-data')
    return response
}

// 添加商品
export const addProduct = async (productData) => {
    const response = await http.post('/page3-data', productData)
    return response
}

// 更新商品
export const updateProduct = async (productId, productData) => {
    const response = await http.put(`/page3-data/${productId}`, productData)
    return response
}

// 删除商品
export const deleteProduct = async (productId) => {
    const response = await http.delete(`/page3-data/${productId}`)
    return response
}

// 获取商品统计数据
export const getProductStats = async () => {
    const response = await http.get('/page2-data')
    return response
}

// 获取商品图表数据
export const getChartData = async () => {
    const response = await http.get('/data')
    return response
} 