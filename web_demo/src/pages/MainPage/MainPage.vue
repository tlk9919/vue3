<script setup>

</script>

<template>
  <div class="main-container">
    <div class="content">
      <h1>MainPage</h1>
      <router-link to="/newlogin">登陆</router-link>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 1.5rem;
  color: #333;
}

.router-link-active,
a {
  color: #409EFF;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #409EFF;
  border-radius: 4px;
  transition: all 0.3s ease;
}

a:hover {
  background-color: #409EFF;
  color: white;
}
</style>
