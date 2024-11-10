<script setup>
import {TresCanvas} from "@tresjs/core";
import {OrbitControls} from "@tresjs/cientos";
// 导入 TresCanvas: 从 @tresjs/core 中导入 TresCanvas，这是用于创建 3D 渲染的画布。
// 导入 OrbitControls: 从 @tresjs/cientos 中导入 OrbitControls，用于实现相机的旋转和缩放功能，使用户可以自由移动视角。
const parameters={
  count:100,
  size:0.09
//   count: 生成的点的数量（100个）。
// size: 点的大小（0.09）。
}
const generatorGalaxy=()=>{
  const positions=new Float32Array(parameters.count*3)
  // 创建 Float32Array: 创建一个新的 Float32Array，长度为 parameters.count * 3，用于存储每个点的 x、y 和 z 坐标。
  for (let i=0;i<parameters.count;i++){
    const i3=i*3
    positions[i3]=Math.random()
    positions[i3]=Math.random()
    positions[i3]=Math.random()
  }
//   循环生成坐标: 通过 for 循环迭代 parameters.count 次，生成随机坐标。
// const i3 = i * 3;: 计算当前点在 positions 数组中的索引。
// positions[i3], positions[i3 + 1], positions[i3 + 2]: 为每个点的 x、y 和 z 坐标分配随机值（在 0 到 1 之间）。
      return positions
  // 返回位置数组: 函数结束时返回生成的 positions 数组，包含所有点的坐标。
}
</script>

<template>
<TresCanvas window-size>
<!--  创建一个 3D 渲染的画布，window-size 属性表示画布会根据窗口大小自动调整。-->
  <TresPerspectiveCamera :position="[3,3,3]" :look-at="[0,0,0]"></TresPerspectiveCamera>
<!--  设置透视相机: 使用 TresPerspectiveCamera 组件设置相机的位置和视角。-->
<!--  :position="[3,3,3]": 相机的位置为 (3, 3, 3)。-->
<!--  :look-at="[0,0,0]": 相机瞄准原点 (0, 0, 0),这是 3D 空间的中心。-->
  <OrbitControls></OrbitControls>
<!--  添加 OrbitControls 组件，允许用户通过鼠标交互来控制相机的旋转和缩放。-->
  <TresPoints>
<!--    创建一个 TresPoints 组件，用于显示生成的点。-->
  <TresEdgesGeometry :position="[positions,3]"></TresEdgesGeometry>
<!--    使用 TresEdgesGeometry 组件来定义点的几何形状。-->
<!--    :position="[positions, 3]": 将之前生成的 positions 数组传入，并指定每个点的尺寸。-->
  <TresMeshBasicMaterial :size="parameters.size" color="#ffff00"></TresMeshBasicMaterial>
  </TresPoints>
</TresCanvas>
</template>

<style scoped>

</style>