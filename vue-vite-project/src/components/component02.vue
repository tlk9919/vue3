<script>
export default {
  name: "component02",
  data() {
    return {
      name: ''
    }
  }
}
// 在选项式 API 中，组件的响应式数据是通过 data 方法定义的。
// data() 方法返回一个对象，其中的属性（如 name）会自动成为响应式的。
// 在模板中，可以直接使用 name。
</script>

<template>
  <div>
    <p>hello,{{ name }}</p>
    <input type="text" v-model="name" placeholder="请输入内容"/>
  </div>
</template>

<style scoped>

</style>