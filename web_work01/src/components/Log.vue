<script setup lang="ts" name="Log">
import {reactive} from "vue";
  const logsList=reactive([
    {id:'001',title:'运行日志',content:'正在运行'},
    {id:'002',title:'开机日志',content:'开机信息'},
    {id:'003',title:'故障日志',content:'发生故障'}
  ])
</script>
<template>
  <h2>后台日志</h2>
<!--  导航区-->
  <div class="log">
    <ul>
      <li v-for="log in logsList" :key="log.id">
        <RouterLink :to="{
        name: 'logs',
        params: {
          id: log.id,
          title: log.title,
          content: log.content,
        }
        }">{{log.title}}</RouterLink>
      </li>
    </ul>
<!--    展示区-->
    <div class="log-content">
    <RouterView></RouterView>
  </div>

  </div>
</template>

<style scoped>


</style>