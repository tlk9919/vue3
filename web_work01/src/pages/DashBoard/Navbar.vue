<template>
  <!-- Header 组件 -->
  <Header></Header>

  <!-- 退出登录按钮 -->
  <button @click="handleLogout" class="logout-button">退出登录</button>

  <!-- 导航栏 -->
  <div class="navigate">
    <ul>
      <li><RouterLink to="/home" active-class="active">主页</RouterLink></li>
      <li><RouterLink :to="{name:'menu'}" active-class="active">菜单</RouterLink></li>
      <RouterLink :to="{path:'/log'}" active-class="active">日志</RouterLink>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
import { useRouter } from 'vue-router';

// 获取路由实例
const router = useRouter();

// 退出登录的处理函数
const handleLogout = () => {
  // 清除本地存储的 token
  localStorage.removeItem('userToken');

  // 跳转到登录页面
  router.push('/'); // 根据你登录页面的路由地址调整
};
</script>

<style scoped>

</style>
