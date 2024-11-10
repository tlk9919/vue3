<script setup>
import {navLinks} from "../assets/menu";
// 省略后缀: 在导入模块时，如果路径指向的是一个 JavaScript 文件（例如 .js、.ts 等），可以省略后缀。Node.js 和现代前端工具（如 Vite、Webpack）会自动识别文件类型，因此 import { navLinks } from "../assets/menu"; 是有效的，前提是 menu 文件在相应的路径下存在。

import {ref} from "vue";
const menus = ref(navLinks)
</script>
<template>
  <ul class="nav-ul">
    <li v-for="menu in menus" :key="menu.id" class="nav-li">
<!--      v-for: 这是 Vue 的指令，用于遍历数组或对象。在这个例子中，menu in menus 表示遍历 menus 数组中的每一个元素，并将当前元素赋值给变量 menu。-->

<!--      :key: :key 是一个特殊的属性，用于给每个列表项一个唯一标识符。在这里，menu.id 是每个菜单项的唯一 ID。这有助于 Vue 在更新和渲染列表时进行优化，确保它能正确识别每个元素。-->
      <a :href="menu.href" @click="()=>{}" class="nav-li_a">{{ menu.name }}</a>
<!--      : 表示这是一个动态绑定属性，Vue 会根据 menu.href 的值来设置链接的目标地址。这里 menu.href 是当前菜单项的 URL。-->
<!--      没有 :: 如果没有 :，则 href 属性会被视为静态字符串。例如，href="http://example.com" 将始终指向该地址，而不会根据数据动态变化。
          这里 @click 用于绑定点击事件，()=>{} 表示一个空的箭头函数。可以在这里添加具体的事件处理逻辑，如导航或其他操作。-->
    </li>
  </ul>
</template>

<style scoped>

</style>
