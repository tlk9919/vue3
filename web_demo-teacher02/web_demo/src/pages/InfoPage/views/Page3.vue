<template>
  <div class="page-container">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <span class="title">商品管理</span>
        </div>
      </template>

      <el-table 
        :data="products" 
        border 
        v-loading="loading"
        height="calc(100vh - 220px)"
      >
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="category" label="类别" width="120" />
        <el-table-column prop="price" label="价格" width="120">
          <template #default="{ row }">
            ¥{{ row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="120">
          <template #default="{ row }">
            <el-tag :type="row.stock < 50 ? 'danger' : 'success'">
              {{ row.stock }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/axios.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const products = ref([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get('/page3-data')
    products.value = response.recentProducts
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const handleAdd = async (formData) => {
  try {
    await axios.post('/page3-data', formData)
    ElMessage.success('添加成功')
    fetchData()
  } catch (error) {
    ElMessage.error('添加失败')
  }
}

const handleEdit = async (id, formData) => {
  try {
    await axios.put(`/page3-data/${id}`, formData)
    ElMessage.success('更新成功')
    fetchData()
  } catch (error) {
    ElMessage.error('更新失败')
  }
}

const handleDelete = async (id) => {
  try {
    await axios.delete(`/page3-data/${id}`)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.page-container {
  padding: 20px;
  box-sizing: border-box;
}

.main-card {
  height: auto;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-table) {
  height: 600px;
}
</style>
