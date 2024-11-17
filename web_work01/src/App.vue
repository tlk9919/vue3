<script lang="ts" setup name="App">
import Header from '@/components/Header.vue';
</script>
<template>
  <div class="app">
  <Header></Header>
  <h2 class="title">Admin——管理后台系统</h2>
  <div class="navigate">
    <!-- 字符串写法 -->
    <RouterLink to="/home" active-class="active">主页</RouterLink>
    <!-- 对象写法-名字跳转 -->
    <RouterLink :to="{name:'menu'}" active-class="active">菜单</RouterLink>
    <!-- 对象写法-路径跳转 -->
    <RouterLink  :to="{path:'/about'}" active-class="active">关于</RouterLink>
  </div>
  <div class="main-content">
<!-- 具体组件-->
    <RouterView>  </RouterView>
  </div>
  </div>
</template>

<style scoped>
.navigate {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.navigate a {
  display: block;
  text-align: center;
  width: 90px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: gray;
  text-decoration: none;
  color: white;
  font-size: 18px;
  letter-spacing: 5px;
}

.navigate a.active {
  background-color: #64967E;
  color: #ffc268;
  font-weight: 900;
  text-shadow: 0 1px black;
  font-family: 微软雅黑;
}
.title {
  text-align: center;
  word-spacing: 5px;
  margin: 30px 0;
  height: 70px;
  line-height: 70px;
  background-image: linear-gradient(45deg, gray, white);
  border-radius: 10px;
  box-shadow: 0 2px;
  font-size: 30px;
}
.main-content {
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  width: 100%;
  height: 400px;
  border: 1px solid;
}
</style>