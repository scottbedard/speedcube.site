import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: '/src/main.ts'
    }
  },
  plugins: [
    vue()
  ],
  server: {
    hmr: {
      host: 'localhost'
    }
  }
})
