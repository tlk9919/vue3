<script setup>
import {TresCanvas, useRenderLoop} from "@tresjs/core";
import {OrbitControls, Html} from "@tresjs/cientos";
import {AdditiveBlending, NoToneMapping, SRGBColorSpace, Vector2} from "three";
import {ref} from "vue";
import LoginFrom from "@/pages/NewLoginPage/components/LoginFrom.vue";
import PrettyWoman from "@/pages/NewLoginPage/components/PrettyWoman.vue";

const para = {
  count: 1000,
  size: 150,
  color: "#ffff00"
}
const shader = {
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,
  vertexShader: `
  uniform float uPixelRatio;
  uniform float uSize;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    gl_PointSize = uSize*uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
  }
  `,
  fragmentShader: `
   void main() {
       vec2 coord = gl_PointCoord - vec2(0.5);
       float distance = length(coord);

       // Discard fragments outside the star radius
       if (distance > 0.5) {
           discard;
       }

       // Center glow intensity
       float glow = 1.0 - smoothstep(0.4, 0.5, distance);

       // Star color gradient: white at the center, yellow toward edges
       vec3 starColor = mix(vec3(1.0, 1.0, 0.8), vec3(1.0, 0.9, 0.5), distance * 2.0);

       // Final color with glow effect
       gl_FragColor = vec4(starColor, glow);
   }
`,
  uniforms: {
    uSize: {value: para.size},
    uPixelRatio: {value: Math.min(window.devicePixelRatio, 2)},
    uTime: {value: 0},
  }
}


const gl = {
  clearColor: "#000000",
  shadows: true,
  alpha: false,
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
onLoop(({delta, elapsed}) => {
  if (MySky.value) {
    MySky.value.rotation.y -= delta * 0.1
    // shader.uniforms.uTime.value = elapsed
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
      <TresShaderMaterial
          v-bind="shader"
      />
      <!--            <TresPointsMaterial-->
      <!--                :color="para.color"-->
      <!--                :size="para.size"/>-->
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
