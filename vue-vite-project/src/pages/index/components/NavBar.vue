<script setup>

import NavItems from "./NavItems.vue";
import {ref} from "vue";

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header
      class="fixed top-0 left-0 right-0 z-50 bg-black/90"
  >
    <div
        class="max-w-7xl mx-auto"
    >
      <div
          class="flex justify-between items-center py-5 mx-auto c-space"
      >
        <a href="/" class="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
          CDUTETC
        </a>
<!--        text-neutral-400:-->
<!--        这是一个 Tailwind CSS 类，用于设置文本的颜色。neutral-400 是 Tailwind 中的一个中性颜色等级，通常表示一种灰色调。-->
<!--        text- 前缀表示该类应用于文本颜色。-->
        <button
            @click="toggleMenu" class="text-neutral-400 hover:text-white sm:hidden"
        >
<!--          sm:hidden:-->
<!--          这是一个 Tailwind CSS 类，结合了响应式设计。-->
<!--          sm: 前缀表示这个样式只在小屏幕尺寸及以上的设备上生效。-->
<!--          hidden 类表示该元素将被隐藏。-->
<!--          所以，sm:hidden 意味着在小屏幕及以上的设备上，应用此类的元素将被隐藏；在更小屏幕上，元素将可见（默认情况下不应用 hidden）。-->
          <img :src="[isOpen?'close.svg':'menu.svg']" alt="menu icon" class="w-6 h-6">
        </button>
        <nav class="hidden sm:flex">
          <NavItems/>
        </nav>
      </div>
    </div>
    <div
        :class="[isOpen?'nav-sidebar max-h-screen':'nav-sidebar max-h-0']"
    >
      <nav class="p-5">
        <NavItems/>
      </nav>
    </div>

  </header>


</template>

<style scoped>

</style>
