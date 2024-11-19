<template>
  <div class="dashboard">
    <Navbar />  <!-- 引入导航栏组件 -->
    <div class="main-content">
      <div class="content-box">
        <!-- 这里根据路由显示不同的内容 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/pages/DashBoard/Navbar.vue";
</script>

<style scoped>

</style>
