<template>
  <div class="page-container">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>添加用户
          </el-button>
        </div>
      </template>

      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="phone" label="电话" width="130" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      v-model="dialogVisible"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="form.age" :min="1" :max="120" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 删除确认对话框 -->
    <el-dialog
      v-model="deleteVisible"
      title="提示"
      width="300px"
    >
      <span>确定要删除该用户吗？</span>
      <template #footer>
        <span>
          <el-button @click="deleteVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDelete">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 使用 MessageDialog 组件替代原来的消息对话框 -->
    <message-dialog ref="messageDialogRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/axios.js'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore'
import MessageDialog from '@/components/MessageDialog.vue'

const userStore = useUserStore()
const tableData = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogType = ref('add')
const formRef = ref(null)
const deleteVisible = ref(false)
const deleteRow = ref(null)
const messageDialogRef = ref(null)

const form = ref({
  name: '',
  age: 18,
  address: '',
  phone: ''
})

const rules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }]
}

const showMessage = (message) => {
  messageDialogRef.value?.showMessage(message)
}

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get('/users')
    tableData.value = response
  } catch (error) {
    showMessage('获取数据失败')
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  dialogType.value = 'add'
  form.value = {
    name: '',
    age: 18,
    address: '',
    phone: ''
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  deleteRow.value = row
  deleteVisible.value = true
}

const confirmDelete = async () => {
  try {
    await userStore.deleteUser(deleteRow.value.id)
    showMessage('删除成功')
    deleteVisible.value = false
    fetchData()
  } catch (error) {
    showMessage(error.message || '删除失败')
  }
}

const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogType.value === 'add') {
          await userStore.addUser(form.value)
          showMessage('添加成功')
        } else {
          await userStore.updateUser(form.value.id, form.value)
          showMessage('编辑成���')
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
</style>
