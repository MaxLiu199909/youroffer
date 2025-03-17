import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 如果使用自定义域名，base可以设置为'/'，否则使用仓库名称
  base: '/',  // 使用自定义域名时的配置
  server: {
    port: 3000,
    open: true
  }
})