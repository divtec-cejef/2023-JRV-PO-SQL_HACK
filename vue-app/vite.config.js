import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  compilerOptions: {
    isCustomElement: tagName => {
      return tagName === 'vue-advanced-chat' || tagName === 'emoji-picker'
    }
  },
  base: '/sqlhack',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})


