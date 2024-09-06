import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入node提供内置模块path:可以获取绝对路径
import path from 'path'

/* // 配置别名方式二：导入 
import { fileURLToPath, URL } from 'node:url' */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  /* // 配置别名方式二：配置
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  } */
})
