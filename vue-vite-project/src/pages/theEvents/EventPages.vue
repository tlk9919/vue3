<script>
import {TresCanvas} from "@tresjs/core";
// 从 Tres.js 核心库中导入 TresCanvas 组件，用于创建 3D 场景的画布。
import {OrbitControlsEventMap} from "@tresjs/cientos";
// 从 Tres.js 的 Cientos 组件库中导入 OrbitControlsEventMap，用于处理相机的控制事件。
import {BasicShadowMap,NoToneMapping,SRGBColorSpace} from "three";
// 从 Three.js 导入一些常量：
// BasicShadowMap：用于设置基础阴影映射类型。
// NoToneMapping：表示不使用色调映射。
// SRGBColorSpace：用于设置色彩空间为 sRGB。
const gl = {
  clearColor: "#202020",// clearColor: 背景颜色。
  shadows: true,// shadows: 开启阴影效果。
  alpha: false,// alpha: 设置为 false，表示不使用透明背景。
  shadowMapType: BasicShadowMap,//shadowMapType: 使用基础阴影映射
  outputColorSpace: SRGBColorSpace,// outputColorSpace: 输出颜色空间为 sRGB。
  toneMapping: NoToneMapping// toneMapping: 不进行色调映射处理。
}
const onClick = (event) => {
  console.log(event)
  // event.object.material.color.set('#008080')
  // event.object.scale.set(1.1,1.1,1.1)
//   event 参数包含了关于事件的详细信息，比如哪个对象被点击了。
// console.log(event); 会在控制台输出事件信息。
}
const onPointerEnter = (event) => {
  event.object.material.color.set('#008080')//改变对象的颜色为青色
  event.object.scale.set(1.1,1.1,1.1)//增加对象的缩放。

}
const onPointerLeave= (event) => {
  event.object.material.color.set('#efefef')
  event.object.scale.set(1,1,1)
  //对象的颜色改回原来的颜色（浅灰色），并将缩放恢复为原始大小。
}
</script>

<template>
  <TresCanvas
      v-bind="gl"
      window-size>
<!--    创建一个 TresCanvas 元素，使用之前定义的 gl 配置对象。-->
<!--    window-size 属性指示画布适应窗口大小。-->
    <TresPerspectiveCamera/>
<!--    创建一个透视相机，提供 3D 视图。-->
    <OrbitControls/>
<!--    添加相机控制，使用户可以旋转、缩放和移动视图。-->
    <template v-for="x in [-2.5,0,2.5]">
<!--      使用 v-for 循环生成一个范围内的 x 坐标。-->
      <template v-for="y in [-2.5,0,2.5]">
        <TresMesh
            v-for="z in [-2.5,0,2.5]"
            :key="[x,y,z]"
            :position="[x,y,z]"
            @click="onClick"
            @pointer-enter="onPointerEnter"
            @pointer-move="onPointerMove"
            @pointer-leave="onPointerLeave"
        >
          <TresBoxGeometry
              :args="[1,1,1]"/>
<!--          创建一个立方体几何体，边长为 1。-->
          <TresMeshToonMaterial
              color="#efefef"/>
<!--          创建一个使用卡通风格的材质，初始颜色为浅灰色。-->
        </TresMesh>
      </template>
    </template>
    <TresDirectionalLight
        :intensity="1"/>
<!--    添加一个方向光，光强度为 1，照亮场景。-->
    <TresAmbientLight
        :intensity="1"/>
<!--    添加环境光，提供均匀的照明，光强度同样为-->
  </TresCanvas>

</template>

<style scoped>

</style>
