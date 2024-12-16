<script>
import {ref} from "vue";
import http from '@/utils/axios.js'
import {useRouter} from "vue-router";
import router from "@/router/index.js";

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const login = async () => {
      try {
        const response = await http.post('/login', {
          username: username.value,
          password: password.value
        })
        console.log(response)
        if (response.accessToken) {
          localStorage.setItem('userToken', response.accessToken)
          await router.push('/dashboard')

        }
      } catch (error) {
        console.error(error)
        console.log('登陆失败')
      }
    }
    return {
      password,
      username,
      login
    }
  }
}
</script>

<template>
  <h1>LoginPage</h1>
  <div>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="password" v-model="password">
    <button @click="login">登陆</button>
  </div>
</template>

<style scoped>

</style>
