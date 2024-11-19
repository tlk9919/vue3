<script setup lang="ts" name="Header">
import { ref, onMounted } from 'vue';

const username = ref('');

// 获取用户名
onMounted(() => {
  const storedUsername = localStorage.getItem('username');
  console.log('Stored Username:', storedUsername);  // 调试信息，查看获取的用户名
  if (storedUsername) {
    username.value = storedUsername;  // 设置用户名
  } else {
    username.value = '管理员';  // 默认值
  }
});
</script>

<template>
  <h2>欢迎你，<span :style="{ color: 'green' }">{{ username }}</span>来到后台管理系统</h2>
</template>

<style scoped>

</style>
