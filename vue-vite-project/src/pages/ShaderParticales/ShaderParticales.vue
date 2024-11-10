<script setup>
import {TresCanvas ,useRenderLoop} from "@tresjs/core";
// useRenderLoop 是 Tres.js 中的一个函数，用于设置和管理渲染循环。在 WebGL 应用程序中，渲染循环是一个不断执行的过程，每一帧都会更新场景和重新渲染。
import {OrbitControls} from "@tresjs/cientos";
import {AdditiveBlending} from "three";
//则是一种用于混合颜色的模式，通常在处理透明效果时使用。
import *as THREE from "three";
const gl={
  clearColor:'#000',
  shadows:true,
  alpha:false,
}
//粒子参数
const paras ={
  count:3000,
}
//生成粒子
const generaterParticales =()=>{}

</script>

<template>

</template>

<style scoped>

</style>