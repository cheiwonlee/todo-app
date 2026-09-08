// JS에서 설정 파일들은 대부분 Xxx.config.js로 끝남
// 설정파일이 없으면 vite를 사용하는 개발자가 vite 내부 코드를 직접 건드려서 변경해야함
// 설정 파일을 통해 정해진 옵션값을 사용하면 내부적으로 해당 옵션으로 동작하도록 적용해주는 파일

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  }
})
