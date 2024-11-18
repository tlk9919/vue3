import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {templateCompilerOptions} from "@tresjs/core";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue({
        ...templateCompilerOptions
    })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5050',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "")
            },
        }
    }
})
