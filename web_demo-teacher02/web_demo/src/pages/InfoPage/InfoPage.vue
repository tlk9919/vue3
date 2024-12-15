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
  <el-container class="info-page-container">
    <el-header height="60px">
      <NavBar/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideMenu/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>


</template>

<style scoped>
.info-page-container {
  height: 100vh;
  width: 100vw;
}

.el-header {
  padding: 0;
  height: 60px !important;
}

.el-aside {
  width: 200px;
}

.el-main {
  padding: 0;
  width: calc(100% - 200px);
  overflow-x: hidden;
}
</style>
