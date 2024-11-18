<script setup>
import {TresCanvas, useRenderLoop} from "@tresjs/core";
import {OrbitControls, Html} from "@tresjs/cientos";
import {NoToneMapping, SRGBColorSpace} from "three";
import {ref} from "vue";
import LoginFrom from "@/pages/NewLoginPage/components/LoginFrom.vue";
import PrettyWoman from "@/pages/NewLoginPage/components/PrettyWoman.vue";

const gl = {
  clearColor: "#000000",
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

const para = {
  count: 1000,
  size: 0.2,
  color: "#ffff00"
}
const initSky = () => {
  const vertices = new Float32Array(para.count * 3)
  for (let i = 0; i < para.count; i++) {
    const i3 = i * 3
    vertices[i3] = (Math.random() - 0.5) * 100
    vertices[i3 + 1] = (Math.random() - 0.5) * 100
    vertices[i3 + 2] = (Math.random() - 0.5) * 100
  }
  return vertices
}
let position = ref('')
position.value = initSky()
const {onLoop} = useRenderLoop()
const MySky = ref(null)
onLoop(({delta}) => {
  if (MySky.value) {
    MySky.value.rotation.y -= delta * 0.1
  }
})
</script>

<template>
  <TresCanvas
      window-size
      v-bind="gl">
    <TresPerspectiveCamera
        :position="[0,0,20]"
        :look-at="[0,0,0]"/>
    <OrbitControls/>
    <TresAmbientLight intensity="0.5"/>
    <TresDirectionalLight
        :position="[1,1,1]"
        intensity="1"/>
    <TresPoints ref="MySky">
      <TresBufferGeometry
          :position="[position,3]"
      />
      <TresPointsMaterial
          :color="para.color"
          :size="para.size"/>
    </TresPoints>
    <Html
        center
        transform
        :distance-factor="10"
        :position="[0,0,0]"
        :scale="[0.75,0.75,0.75]"
    >
    <LoginFrom/>
    </Html>
    <Html
        center
        transform
        :distance-factor="10"
        :position="[0,0,-0.01]"
        :scale="[0.75,0.75,0.75]"
    >
    <PrettyWoman/>
    </Html>

  </TresCanvas>

</template>

<style scoped>

</style>
