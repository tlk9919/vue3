<script>
import {ref} from 'vue';
import http from '@/utils/api.js'
// import {useRouter} from "vue-router";
import router from "@/router/index.js"

export default {
  setup() {
    // const router = useRouter()
    const password = ref('')
    const username = ref('')
    const handleLogin = async () => {
      try {
        const response = await http.post("/login", {
          username: username.value,
          password: password.value
        })
        console.log(response)
        if (response.accessToken) {
          console.log("a")
          localStorage.setItem('userToken', response.accessToken)
          await router.push('/dashboard')
        }
      } catch (err) {
        console.error(err)
      }
    }

    return {
      username,
      password,
      handleLogin
    }
  }
}

</script>

<template>
  <div style="display: flex;align-items: center;justify-content: center;height: 100vh;">
    <div
        style="background-color: white;padding: 40px;border-radius: 8px;box-shadow: 0 4px 8px rgba(0,0,0,0.1);max-width: 400px;width: 100%"
    >
      <h1
          style="text-align: center;color: #d81b60;font-size: 24px;margin-bottom: 20px;"
      >登陆</h1>
      <p
          style="text-align: center;color: #666;font-size: 14px;margin-bottom: 20px;"
      >每一次登陆都是与你的邂逅。</p>
      <form
          style="display: flex;flex-direction: column;"
          v-on:submit.prevent
      >
        <input type="text" v-model="username" placeholder="用户名"
               style="margin-bottom: 20px;padding:10px;border:1px solid #ccc;border-radius: 4px;font-size: 16px"
        />
        <input type="password" v-model="password" placeholder="密码"
               style="margin-bottom: 20px;padding:10px;border:1px solid #ccc;border-radius: 4px;font-size: 16px"
        />
        <div
            style="display: flex;justify-content: space-between;align-items:center;margin-bottom: 20px;"
        >
          <label
              style="font-size: 14px;color: #666;"
          >
            <input type="checkbox" style="margin-right: 5px"/>
            记住密码
          </label>
          <a href="#" style="font-size: 14px;color: #d81b60;text-decoration:none;">
            忘记密码/注册
          </a>
        </div>
        <button type="primary" @click="handleLogin"
                style="background-color: #d81b60;color:white;padding: 10px;border:none;border-radius:4px;font-size: 16px;cursor:pointer;">
          登陆
        </button>
      </form>

    </div>

  </div>

</template>

<style scoped>

</style>
