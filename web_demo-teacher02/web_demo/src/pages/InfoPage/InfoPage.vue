<script>

import NavBar from "@/pages/InfoPage/components/NavBar.vue";
import SideMenu from "@/pages/InfoPage/components/SideMenu.vue";
import MainView from "@/pages/InfoPage/components/MainView.vue";
import {onMounted} from "vue";
import {useMenuStore} from "@/stores/menuStore.js";

export default {

  //注册组件
  components: {NavBar, SideMenu, MainView},

  setup() {
    // 引入状态管理
    const menuStore = useMenuStore()
    onMounted(() => {
      menuStore.loadMenu();
    })

    return {NavBar, SideMenu, MainView}

  }
}
</script>

<template>
  <div class="info-page">
    <el-header height="60px">
      <NavBar/>
    </el-header>
    <el-container class="main-container">
      <el-aside width="200px">
        <SideMenu/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
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
