import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'//path 用于处理和操作文件路径
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: { //resolve 配置项是用于控制模块解析规则的
    alias: {
      '@':path.resolve(__dirname,'./src')//这里将 @ 映射为 ./src 目录的绝对路径
    }
  }
})
