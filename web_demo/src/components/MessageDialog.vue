<template>
  <el-dialog
    v-model="visible"
    width="300px"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #default>
      <div class="message-content">{{ message }}</div>
    </template>
    <template #footer>
      <span>
        <el-button type="primary" @click="visible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')

// 暴露给父组件的方法
const showMessage = (msg) => {
  message.value = msg
  visible.value = true
}

defineExpose({
  showMessage
})
</script>

<style scoped>
.message-content {
  text-align: center;
  padding: 20px 0;
}
</style> 