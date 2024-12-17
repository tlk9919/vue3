<script setup>
import NavBar from "@/pages/InfoPage/components/NavBar.vue"
import SideMenu from "@/pages/InfoPage/components/SideMenu.vue"
import MainView from "@/pages/InfoPage/components/MainView.vue"
import { onMounted, ref } from "vue"
import { useMenuStore } from "@/stores/menuStore.js"
import { useUserStore } from "@/stores/userStore"
import { useRouter } from 'vue-router'
import MessageDialog from '@/components/MessageDialog.vue'
import { SwitchButton } from '@element-plus/icons-vue'

const menuStore = useMenuStore()
const userStore = useUserStore()
const router = useRouter()
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

onMounted(() => {
  menuStore.loadMenu()
  showMessage('欢迎使用后台管理系统')
})
</script>

<template>
  <div class="info-page">
    <el-header height="60px">
      <div class="header-container">
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
    </el-header>
    <el-container class="main-container">
      <el-aside width="200px">
        <SideMenu/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    
    <!-- 添加消息对话框 -->
    <message-dialog ref="messageDialogRef" />
  </div>
</template>

<style scoped>
.info-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-container {
  flex: 1;
  display: flex;
}

.el-header {
  padding: 0;
  height: 60px !important;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
}

.header-container {
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
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

.el-aside {
  width: 200px;
  background-color: #304156;
  flex-shrink: 0;
}

.el-main {
  padding: 20px;
  background-color: #f0f2f5;
  flex: 1;
}
</style>
