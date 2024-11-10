<script>
import {ref} from 'vue'

export default {
  name: "component03",
  setup() {
    const name = ref('')
    return {
      name
    }
  }
}
// setup():
// 在组合式 API 中，状态通过 setup 函数定义，使用 ref 或 reactive 来创建响应式数据。
// const name = ref('')：使用 ref 创建一个响应式引用，初始值为空字符串。
// 在模板中需要通过 name.value 访问值，但在 setup 中返回的对象会自动处理
</script>

<template>
  <div>
    <p>hello,{{ name }}</p>
    <input type="text" v-model="name" placeholder="请输入内容"/>
  </div>

</template>

<style scoped>

</style>