<template>
  <div class="nav-bar">
    <div class="left">
      <span class="title">后台管理系统</span>
    </div>
    <div class="right">
      <el-button type="danger" link @click="handleLogout">
        <el-icon><SwitchButton /></el-icon>
        退出登录
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import MessageDialog from '@/components/MessageDialog.vue'
import { ref } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const messageDialogRef = ref(null)

const showMessage = (message) => {
  messageDialogRef.value?.showMessage(message)
}

const handleLogout = async () => {
  try {
    await userStore.clearUserInfo()
    showMessage('退出登录成功')
    setTimeout(() => {
      router.push('/newlogin')
    }, 1500)
  } catch (error) {
    showMessage(error.message || '退出失败')
  }
}
</script>

<style scoped>
.nav-bar {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.left {
  display: flex;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-left: 10px;
}

.right {
  display: flex;
  align-items: center;
}

.el-button {
  display: flex;
  align-items: center;
  gap: 4px;
}

.el-icon {
  margin-right: 4px;
}
</style>
