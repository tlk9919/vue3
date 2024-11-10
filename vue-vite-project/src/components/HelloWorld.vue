<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})
// defineProps:
//     这是 <script setup> 的一个特性，用于定义组件的 props。在这里，msg 被定义为一个字符串类型的 prop。
// 组件外部可以通过传递 msg prop 来向该组件传递信息。
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
<!--    @click是 v-on:click 的简写形式。以下是它的详细解释：-->
<!--    功能-->
<!--    事件监听: @click 使得 Vue 组件能够响应用户的点击操作。-->
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
