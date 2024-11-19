<script setup lang="ts" name="LogsDetails">
defineProps(['id','title','content'])
</script>

<template>
  <ul class="logs-list">
    <li>编号:{{id}}</li>
    <li>标题：{{ title }}</li>
    <li>内容：{{ content }}</li>
  </ul>
</template>

<style scoped>

</style>