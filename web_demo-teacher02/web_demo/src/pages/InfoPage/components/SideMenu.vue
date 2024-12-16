<script>
import {computed} from "vue";
import {useMenuStore} from "@/stores/menuStore.js";
import {useRoute} from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const menuStore = useMenuStore();
    const activePath = computed(() => route.path)
    const menuItems = computed(() => menuStore.menu)
    console.log(menuItems)
    return {
      activePath, menuItems
    }
  }
}
</script>

<template>
  <el-menu 
    router 
    :default-active="activePath"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
  >
    <template v-for="menu in menuItems" :key="menu.path">
      <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path">
        <template #title>{{ menu.title || menu.name }}</template>
        <el-menu-item v-for="sub in menu.children" :key="sub.path" :index="sub.path">
          {{ sub.title || sub.name }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="menu.path">
        {{ menu.title || menu.name }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
.el-menu {
  border-right: none;
  height: 100%;
}

:deep(.el-sub-menu .el-sub-menu__title) {
  color: #fff;
}

:deep(.el-sub-menu .el-sub-menu__title:hover) {
  background-color: #263445;
}

:deep(.el-menu-item) {
  color: #fff;
}

:deep(.el-menu-item:hover) {
  background-color: #263445;
}

:deep(.el-menu-item.is-active) {
  background-color: #263445;
}
</style>
