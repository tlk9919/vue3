<script>
export default {
  name: "optionsTest",
  data(){
    return {
      a: 100,
      b: 10
    }
  },
  methods:{
    add(){
      this.a+=10;
      this.b+=5;
    }
   },
   mounted(){
     this.a=0;
    this.b=0;
   }
}
</script>

<template>
  <h1>hi</h1>
  <h1>{{a}}</h1>
  <h1>{{b}}</h1>
  <button @click="add">add</button>
</template>

<style scoped>

</style>