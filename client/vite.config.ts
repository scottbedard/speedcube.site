import { defineConfig } from 'vite'
import path from 'path'
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
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    hmr: {
      host: 'localhost'
    }
  }
})
