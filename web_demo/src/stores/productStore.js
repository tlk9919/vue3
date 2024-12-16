import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getProducts as getProductsAPI,
    addProduct as addProductAPI,
    updateProduct as updateProductAPI,
    deleteProduct as deleteProductAPI,
    getProductStats as getProductStatsAPI,
    getChartData as getChartDataAPI
} from '@/apis/product.js'

export const useProductStore = defineStore('product', () => {
    // state
    const products = ref([])
    const statistics = ref({})
    const chartData = ref({})

    // actions
    // 获取商品列表
    const fetchProducts = async () => {
        try {
            const res = await getProductsAPI()
            products.value = res
            return res
        } catch (error) {
            throw new Error('获取商品列表失败，请稍后重试')
        }
    }

    // 添加商品
    const addProduct = async (productData) => {
        try {
            const res = await addProductAPI(productData)
            products.value.push(res)
            return res
        } catch (error) {
            throw new Error('添加商品失败，请检查输入数据')
        }
    }

    // 更新商品
    const updateProduct = async (productId, productData) => {
        try {
            const res = await updateProductAPI(productId, productData)
            const index = products.value.findIndex(product => product.id === productId)
            if (index !== -1) {
                products.value[index] = res
            }
            return res
        } catch (error) {
            throw new Error('更新商品失败，请检查输入数据')
        }
    }

    // 删除商品
    const deleteProduct = async (productId) => {
        try {
            await deleteProductAPI(productId)
            const index = products.value.findIndex(product => product.id === productId)
            if (index !== -1) {
                products.value.splice(index, 1)
            }
            return true
        } catch (error) {
            throw new Error('删除商品失败，请稍后重试')
        }
    }

    // 获取商品统计数据
    const fetchProductStats = async () => {
        try {
            const res = await getProductStatsAPI()
            statistics.value = res
            return res
        } catch (error) {
            throw new Error('获取商品统计数据失败：' + error.message)
        }
    }

    // 获取图表数据
    const fetchChartData = async () => {
        try {
            const res = await getChartDataAPI()
            chartData.value = res
            return res
        } catch (error) {
            throw new Error('获取图表数据失败：' + error.message)
        }
    }

    return {
        products,
        statistics,
        chartData,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProductStats,
        fetchChartData
    }
}, {
    persist: true
}) 