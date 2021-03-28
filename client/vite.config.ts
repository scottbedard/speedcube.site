import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    manifest: true,
    outDir: '../public/dist',
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
