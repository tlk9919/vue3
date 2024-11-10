<script setup>
import {onMounted, ref} from "vue";

const a = ref(100);
const b = ref(10);

const add = () => {
  a.value += 10;
  b.value += 5;
}
onMounted(() => {
  a.value = 0;
  b.value = 0;
})
</script>

<template>
  <h1>hi</h1>
  <h1>{{ a }}</h1>
  <h1>{{ b }}</h1>
  <button @click="add">add</button>

</template>

<style scoped>

</style>
