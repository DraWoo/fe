import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    https: {
      key: '/opt/homebrew/etc/nginx/local.key',
      cert: '/opt/homebrew/etc/nginx/local.crt',
    },
    port: 8086, // 프론트엔드 서버 포트를 8086으로 설정
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8085', // 백엔드 서버 주소를 http://localhost:8085로 설정
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
