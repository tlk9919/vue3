<script>
import {onMounted, ref} from "vue";

export default {
  name: "compositionWithOutSetupTest",
  setup() {
    const a=ref(100);
    const b = ref(10);
    const add=()=>{
      a.value+=10;
      b.value+=5;
    }
    onMounted(()=>{
      a.value=0
      b.value=0
    })
    return {
      a,b,add
    }
  },
}
</script>

<template>

</template>

<style scoped>

</style>