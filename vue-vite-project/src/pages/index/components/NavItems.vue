<script setup>
import {navLinks} from "../assets/menu";
import {ref} from "vue";
const menus = ref(navLinks)
</script>
<template>
  <ul class="nav-ul">
    <li v-for="menu in menus" :key="menu.id" class="nav-li">
      <a :href="menu.href" @click="()=>{}" class="nav-li_a">{{ menu.name }}</a>
    </li>
  </ul>
</template>

<style scoped>

</style>
