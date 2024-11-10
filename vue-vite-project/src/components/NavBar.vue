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
<!--    固定定位: fixed 类将头部固定在页面的顶部，不随页面滚动而移动。-->
<!--    位置: top-0 left-0 right-0 表示头部在页面的上方和左右两侧都紧贴边缘。-->
<!--    层级: z-50 设置 z-index，确保该头部在其他元素之上。-->
<!--    背景颜色: bg-black/90 设置背景色为黑色，并具有 90% 的不透明度。-->
    <div
        class="max-w-7xl mx-auto"
    >
<!--      居中对齐: mx-auto 使容器在水平方向上居中。-->
      <div
          class="flex justify-between items-center py-5 mx-auto c-space"
      >
<!--        Flexbox 布局: flex 使用 Flexbox 使子元素在一行内排列。-->
<!--        空间分布: justify-between 在子元素之间均匀分布空间，第一个子元素靠左，最后一个子元素靠右。-->
<!--        垂直居中: items-center 垂直方向上使子元素居中对齐。-->
<!--        内边距: py-5 为上下方向设置内边距。-->
<!--        额外类: c-space 可能是自定义的类，用于额外的样式设置。
含义: py 是 "padding-y" 的缩写，表示在上下（y 轴）方向上设置内边距。-->
        <a href="/" class="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
          CDUTETC
        </a>
<!--        字体大小: text-xl 设置文本大小为较大,xl 是 "extra large" 的缩写，表示较大的字体大小。。-->
<!--        悬停效果: hover:text-white 在鼠标悬停时将文本颜色变为白色。-->
<!--        过渡效果: transition-colors 为颜色变化添加平滑过渡效果。-->
        <button
            @click="toggleMenu" class="text-neutral-400 hover:text-white sm:hidden"
        >
          <img :src="[isOpen?'close.svg':'menu.svg']" alt="menu icon" class="w-6 h-6">
<!--          [isOpen ? 'close.svg' : 'menu.svg']-->
<!--          三元运算符: 这是一个 JavaScript 的三元运算符，用于根据条件返回不同的值。-->
<!--          条件: isOpen 是一个响应式变量，表示菜单是否打开。-->
<!--          结果:-->
<!--          如果 isOpen 为 true，返回 'close.svg'，表示显示“关闭”图标。-->
<!--          如果 isOpen 为 false，返回 'menu.svg'，表示显示“菜单”图标。-->
        </button>
        <nav class="hidden sm:flex">
          <NavItems/>
        </nav>
      </div>
    </div>
    <div
        :class="[isOpen?'nav-sidebar max-h-screen':'nav-sidebar max-h-0']"
    >
<!--      :class-->
<!--      动态绑定: : 是 v-bind 的简写，表示要动态绑定类名。在这里，class 属性将根据条件动态设置。
如果 isOpen 为 true，则绑定类 nav-sidebar max-h-screen，表示菜单打开并占满屏幕高度。
如果 isOpen 为 false，则绑定类 nav-sidebar max-h-0，表示菜单关闭，最大高度为零。-->
      <nav class="p-5">
        <NavItems/>
      </nav>
    </div>

  </header>


</template>

<style scoped>

</style>
