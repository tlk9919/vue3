<script>
// route router
import {useRouter, useRoute} from "vue-router";
import {computed} from "vue";

export default {
  setup() {
    //用于跳转的路由对象
    const router = useRouter();
    //用于获取路由配置信息的路由
    const route = useRoute();

    const breadcrumbs = computed(() => {

      const paths = route.path.split('/').filter(item => item)
      //    /a/b/c/d 会变成 ['a', 'b', 'c', 'd']。

      return paths.map((_, index) => ({
        name: paths[index],
        path: '/' + paths.slice(0, index + 1).join('/'),
      }))
    })

    const navigateTo = (path) => router.push(path)

    return {breadcrumbs, navigateTo}
  }
}

</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="index"
        @click="navigateTo(item.path)"
        style="cursor: pointer;color:#409eff"
       >
      {{ item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style scoped>
</style>
