<template>
  <div class="page-container">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <span class="title">商品管理</span>
          <el-button type="primary" @click="handleAdd">添加商品</el-button>
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
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑商品对话框 -->
    <el-dialog
      :title="dialogType === 'add' ? '添加商品' : '编辑商品'"
      v-model="dialogVisible"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="form.category" placeholder="请选择类别">
            <el-option
              v-for="item in categories"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input-number v-model="form.stock" :min="0" :precision="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 删除确认对话框 -->
    <el-dialog
      v-model="deleteVisible"
      title="提示"
      width="300px"
    >
      <span>确定要删除该商品吗？</span>
      <template #footer>
        <span>
          <el-button @click="deleteVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDelete">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 消息对话框 -->
    <message-dialog ref="messageDialogRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import MessageDialog from '@/components/MessageDialog.vue'

const productStore = useProductStore()
const products = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogType = ref('add')
const formRef = ref(null)
const messageDialogRef = ref(null)
// 添加删除相关的响应式变量
const deleteVisible = ref(false)
const deleteRow = ref(null)

// 商品类别选项
const categories = ['电子产品', '服装', '食品', '图书', '其他']

// 表单数据
const form = ref({
  name: '',
  category: '',
  price: 0,
  stock: 0
})

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择商品类别', trigger: 'change' }],
  price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
  stock: [{ required: true, message: '请输入商品库存', trigger: 'blur' }]
}

const showMessage = (message) => {
  messageDialogRef.value?.showMessage(message)
}

// 获取商品列表
const fetchData = async () => {
  loading.value = true
  try {
    await productStore.fetchProducts()
    products.value = productStore.products
  } catch (error) {
    showMessage('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 打开添加商品对话框
const handleAdd = () => {
  dialogType.value = 'add'
  form.value = {
    name: '',
    category: '',
    price: 0,
    stock: 0
  }
  dialogVisible.value = true
}

// 打开编辑商品对话框
const handleEdit = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  dialogVisible.value = true
}

// 修改删除相关的方法
const handleDelete = (row) => {
  deleteRow.value = row
  deleteVisible.value = true
}

const confirmDelete = async () => {
  try {
    await productStore.deleteProduct(deleteRow.value.id)
    showMessage('删除商品成功')
    deleteVisible.value = false
    fetchData()
  } catch (error) {
    showMessage(error.message || '删除失败')
  }
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogType.value === 'add') {
          await productStore.addProduct(form.value)
          showMessage('添加商品成功')
        } else {
          await productStore.updateProduct(form.value.id, form.value)
          showMessage('更新商���成功')
        }
        dialogVisible.value = false
        fetchData()
      } catch (error) {
        showMessage(error.message || '操作失败')
      }
    }
  })
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.el-form-item {
  margin-bottom: 20px;
}
</style>